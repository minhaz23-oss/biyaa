import Typesense from 'typesense';

// Typesense client configuration
export const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || 'localhost',
      port: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT || '8108'),
      protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL || 'http'
    }
  ],
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_API_KEY || 'xyz',
  connectionTimeoutSeconds: 2
});

// Admin client for server-side operations (indexing, schema management)
export const typesenseAdminClient = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST || 'localhost',
      port: parseInt(process.env.TYPESENSE_PORT || '8108'),
      protocol: process.env.TYPESENSE_PROTOCOL || 'http'
    }
  ],
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY || 'xyz',
  connectionTimeoutSeconds: 10
});

// Collection schema for biodata
export const biodataSchema: any = {
  name: 'biodata',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'fullName', type: 'string' },
    { name: 'biodataType', type: 'string', facet: true },
    { name: 'maritalStatus', type: 'string', facet: true },
    { name: 'age', type: 'int32', facet: true },
    { name: 'height', type: 'string', facet: true },
    { name: 'complexion', type: 'string', facet: true },
    { name: 'profession', type: 'string', facet: true },
    { name: 'occupation', type: 'string', facet: true },
    { name: 'familyStatus', type: 'string', facet: true },
    { name: 'presentDivision', type: 'string', facet: true },
    { name: 'presentDistrict', type: 'string', facet: true },
    { name: 'presentUpazilla', type: 'string', facet: true },
    { name: 'address', type: 'string', optional: true },
    { name: 'location', type: 'string', optional: true },
    { name: 'displayName', type: 'string', optional: true },
    { name: 'birthYear', type: 'string', optional: true },
    { name: 'createdAt', type: 'int64' }
  ],
  default_sorting_field: 'createdAt'
};

// Helper function to initialize collection
export const initializeBiodataCollection = async () => {
  try {
    console.log('Initializing Typesense collection...');
    console.log('Typesense config:', {
      host: process.env.TYPESENSE_HOST,
      port: process.env.TYPESENSE_PORT,
      protocol: process.env.TYPESENSE_PROTOCOL,
      hasApiKey: !!process.env.TYPESENSE_ADMIN_API_KEY
    });
    
    // Try to get the collection first
    try {
      console.log('Checking if collection exists...');
      await typesenseAdminClient.collections('biodata').retrieve();
      console.log('Biodata collection already exists');
      return { success: true, message: 'Collection exists' };
    } catch (error: any) {
      console.log('Collection check error:', {
        httpStatus: error.httpStatus,
        message: error.message,
        details: error
      });
      
      if (error.httpStatus === 404) {
        // Collection doesn't exist, create it
        console.log('Creating new collection...');
        await typesenseAdminClient.collections().create(biodataSchema);
        console.log('Biodata collection created successfully');
        return { success: true, message: 'Collection created' };
      }
      
      // If it's not a 404, there's a connection or auth issue
      throw error;
    }
  } catch (error: any) {
    console.error('Error initializing biodata collection:', {
      message: error.message,
      httpStatus: error.httpStatus,
      details: error
    });
    
    let errorMessage = 'Failed to connect to Typesense';
    
    if (error.httpStatus === 401) {
      errorMessage = 'Invalid Typesense API key';
    } else if (error.httpStatus === 403) {
      errorMessage = 'Typesense API key lacks required permissions';
    } else if (error.code === 'ENOTFOUND' || error.message?.includes('getaddrinfo')) {
      errorMessage = 'Invalid Typesense hostname or connection failed';
    } else if (error.message?.includes('timeout')) {
      errorMessage = 'Connection to Typesense timed out';
    }
    
    return { success: false, error: errorMessage, details: error.message };
  }
};
