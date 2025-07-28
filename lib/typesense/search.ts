"use server";

import { typesenseClient, typesenseAdminClient } from './client';

// Search filters interface (same as your existing one)
interface SearchFilters {
  biodataType?: string;
  maritalStatus?: string;
  division?: string;
  district?: string;
  upazilla?: string;
  complexion?: string;
  familyStatus?: string;
  height?: string;
  age?: string;
  profession?: string;
  [key: string]: any;
}

// Transform your existing biodata document for Typesense
const transformBiodataForTypesense = (doc: any) => {
  const data = doc.data ? doc.data() : doc;
  const currentYear = new Date().getFullYear();
  
  return {
    id: doc.id || Math.random().toString(36),
    fullName: data.fullName || 'Anonymous',
    biodataType: data.biodataType || '',
    maritalStatus: data.maritalStatus || '',
    age: data.birthYear ? currentYear - parseInt(data.birthYear) : 0,
    height: data.height || '',
    complexion: data.complexion || '',
    profession: data.profession || data.occupation || '',
    occupation: data.occupation || '',
    familyStatus: data.familyStatus || '',
    presentDivision: data.presentDivision || '',
    presentDistrict: data.presentDistrict || '',
    presentUpazilla: data.presentUpazilla || '',
    address: data.address || '',
    location: `${data.presentDistrict || ''}, ${data.presentDivision || ''}`.replace(/^, |, $/, ''),
    displayName: data.fullName || 'Anonymous',
    birthYear: data.birthYear || '',
    createdAt: data.createdAt ? (typeof data.createdAt === 'object' ? Date.now() : data.createdAt) : Date.now(),
    updatedAt: data.updatedAt ? (typeof data.updatedAt === 'object' ? Date.now() : data.updatedAt) : Date.now()
  };
};

// Index a single biodata document
export const indexBiodataDocument = async (biodataDoc: any) => {
  try {
    const transformedDoc = transformBiodataForTypesense(biodataDoc);
    
    await typesenseAdminClient
      .collections('biodata')
      .documents()
      .upsert(transformedDoc);
    
    console.log('Document indexed successfully:', transformedDoc.id);
    return { success: true };
  } catch (error) {
    console.error('Error indexing document:', error);
    return { success: false, error };
  }
};

// Bulk index biodata documents from Firestore
export const bulkIndexBiodataDocuments = async (biodataDocuments: any[]) => {
  try {
    const transformedDocs = biodataDocuments.map(transformBiodataForTypesense);
    
    // Import in batches to avoid timeout
    const batchSize = 100;
    const batches = [];
    
    for (let i = 0; i < transformedDocs.length; i += batchSize) {
      batches.push(transformedDocs.slice(i, i + batchSize));
    }
    
    for (const batch of batches) {
      await typesenseAdminClient
        .collections('biodata')
        .documents()
        .import(batch, { action: 'upsert' });
      
      console.log(`Indexed batch of ${batch.length} documents`);
    }
    
    return { success: true, totalIndexed: transformedDocs.length };
  } catch (error) {
    console.error('Error bulk indexing documents:', error);
    return { success: false, error };
  }
};

// Search biodata using Typesense
export const searchBiodataWithTypesense = async (
  filters: SearchFilters,
  page: number = 1,
  pageSize: number = 20,
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc',
  userId?: string // Optional userId to filter out ignored profiles
) => {
  try {
    // Build filter query
    const filterConditions: string[] = [];
    
    // Handle each filter
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        switch (key) {
          case 'age':
            if (value.includes('_')) {
              const [minAge, maxAge] = value.split('_');
              if (maxAge === 'plus') {
                filterConditions.push(`age:>=${minAge}`);
              } else {
                filterConditions.push(`age:>=${minAge} && age:<=${maxAge}`);
              }
            }
            break;
          case 'height':
            // Convert height format (5_6 -> 5'6")
            if (value.includes('_')) {
              const heightValue = value.replace('_', "'") + '"';
              filterConditions.push(`height:=${heightValue}`);
            }
            break;
          case 'division':
            filterConditions.push(`presentDivision:=${value}`);
            break;
          case 'district':
            filterConditions.push(`presentDistrict:=${value}`);
            break;
          case 'upazilla':
            filterConditions.push(`presentUpazilla:=${value}`);
            break;
          case 'profession':
            filterConditions.push(`occupation:=${value}`);
            break;
          default:
            filterConditions.push(`${key}:=${value}`);
        }
      }
    });
    
    const searchParameters = {
      q: '*', // Match all documents
      query_by: 'fullName,occupation,presentDistrict,presentDivision',
      filter_by: filterConditions.join(' && ') || undefined,
      sort_by: `${sortBy}:${sortOrder}`,
      page: page,
      per_page: Math.min(pageSize, 50), // Limit max page size
      facet_by: 'biodataType,maritalStatus,presentDivision,presentDistrict,complexion,familyStatus,occupation'
    };
    
    console.log('Typesense search parameters:', searchParameters);
    
    const searchResults = await typesenseClient
      .collections('biodata')
      .documents()
      .search(searchParameters);
    
    // Transform results to match your existing format
    let transformedResults = searchResults.hits?.map((hit: any) => ({
      id: hit.document.id,
      displayName: hit.document.displayName,
      fullName: hit.document.fullName,
      age: hit.document.age,
      location: hit.document.location,
      occupation: hit.document.occupation,
      maritalStatus: hit.document.maritalStatus,
      height: hit.document.height,
      biodataType: hit.document.biodataType,
      complexion: hit.document.complexion,
      familyStatus: hit.document.familyStatus,
      // Add other fields as needed
    })) || [];
    
    // Filter out ignored profiles if userId is provided
    if (userId && transformedResults.length > 0) {
      try {
        const { getIgnoreList } = await import('@/lib/actions/user.actions');
        const ignoreListResult = await getIgnoreList(userId);
        
        if (ignoreListResult.success && ignoreListResult.data.length > 0) {
          const ignoredIds = new Set(ignoreListResult.data);
          transformedResults = transformedResults.filter(result => !ignoredIds.has(result.id));
        }
      } catch (error) {
        console.error('Error filtering ignored profiles:', error);
        // Continue without filtering if there's an error
      }
    }
    
    const totalCount = searchResults.found || 0;
    const totalPages = Math.ceil(totalCount / pageSize);
    
    return {
      success: true,
      data: transformedResults,
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      facets: searchResults.facet_counts || []
    };
    
  } catch (error: any) {
    console.error('Typesense search error:', error);
    
    let errorMessage = 'Failed to search biodata.';
    if (error.message && error.message.includes('Could not connect')) {
      errorMessage = 'Search service unavailable. Please try again later.';
    }
    
    return {
      success: false,
      message: errorMessage,
      data: [],
      totalCount: 0,
      currentPage: page,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }
};

// Delete a document from Typesense
export const deleteBiodataFromTypesense = async (documentId: string) => {
  try {
    await typesenseAdminClient
      .collections('biodata')
      .documents(documentId)
      .delete();
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting document from Typesense:', error);
    return { success: false, error };
  }
};

// Get search suggestions (autocomplete)
export const getBiodataSuggestionsFromTypesense = async (
  query: string,
  field: string = 'fullName',
  limit: number = 10
) => {
  try {
    if (!query || query.length < 2) {
      return { success: true, data: [] };
    }
    
    const searchResults = await typesenseClient
      .collections('biodata')
      .documents()
      .search({
        q: query,
        query_by: field,
        per_page: limit,
        prefix: true // Enable prefix matching for autocomplete
      });
    
    const suggestions = searchResults.hits?.map((hit: any) => hit.document[field]) || [];
    
    return {
      success: true,
      data: [...new Set(suggestions)], // Remove duplicates
    };
  } catch (error) {
    console.error('Error getting suggestions from Typesense:', error);
    return {
      success: false,
      message: 'Failed to get suggestions.',
      data: [],
    };
  }
};
