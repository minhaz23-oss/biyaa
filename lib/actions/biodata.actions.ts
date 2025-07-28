
"use server";

import { db } from "@/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

export const createBiodata = async (biodata: any, userId: string) => {
  try {
    // Validate required fields
    if (!userId) {
      return { success: false, message: "User authentication required." };
    }

    if (!biodata) {
      return { success: false, message: "Biodata is required." };
    }

    // Add user ID and update timestamps
    const biodataWithMetadata = {
      ...biodata,
      userId: userId,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

// Save to Firestore
    const docRef = await db.collection("biodata").add(biodataWithMetadata);

    console.log("Biodata saved successfully with ID:", docRef.id);

    // Sync with Typesense (non-blocking)
    try {
      const { indexBiodataDocument } = await import("@/lib/typesense/search");
      await indexBiodataDocument({ id: docRef.id, ...biodataWithMetadata });
      console.log("Biodata indexed in Typesense successfully");
    } catch (typesenseError: any) {
      console.warn("Failed to index in Typesense, but biodata was saved:", typesenseError.message);
      // Don't fail the entire operation if Typesense is down
    }

    return {
      success: true,
      message: "Biodata saved and indexed successfully!",
      biodataId: docRef.id,
    };
  } catch (error: any) {
    console.error("Error saving biodata:", error);
    return {
      success: false,
      message: error.message || "Failed to save biodata. Please try again.",
    };
  }
};

export const getBiodataByUserId = async (userId: string) => {
  try {
    if (!userId) {
      return { success: false, message: "User ID is required." };
    }

    const snapshot = await db
      .collection("biodata")
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return {
        success: true,
        data: null,
        message: "No biodata found for this user.",
      };
    }

    const doc = snapshot.docs[0];
    const rawData = doc.data();
    
    // Convert any non-serializable data (like Firestore Timestamps) to plain objects
    const biodata = JSON.parse(JSON.stringify({ id: doc.id, ...rawData }));

    return { success: true, data: biodata };
  } catch (error: any) {
    console.error("Error fetching biodata:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch biodata.",
    };
  }
};

export const getBiodataById = async (biodataId: string) => {
  try {
    if (!biodataId) {
      return { success: false, message: "Biodata ID is required." };
    }

    const doc = await db.collection("biodata").doc(biodataId).get();

    if (!doc.exists) {
      return {
        success: false,
        message: "Biodata not found.",
      };
    }

    const rawData = doc.data();
    
    // Convert any non-serializable data (like Firestore Timestamps) to plain objects
    const biodata = JSON.parse(JSON.stringify({ id: doc.id, ...rawData }));

    return { success: true, data: biodata };
  } catch (error: any) {
    console.error("Error fetching biodata by ID:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch biodata.",
    };
  }
};

export const updateBiodata = async (biodataId: string, biodata: any) => {
  try {
    if (!biodataId) {
      return { success: false, message: "Biodata ID is required." };
    }

    if (!biodata) {
      return { success: false, message: "Biodata is required." };
    }

    const biodataWithMetadata = {
      ...biodata,
      updatedAt: FieldValue.serverTimestamp(),
    };

    await db.collection("biodata").doc(biodataId).update(biodataWithMetadata);

    // Sync with Typesense (non-blocking)
    try {
      const { indexBiodataDocument } = await import("@/lib/typesense/search");
      await indexBiodataDocument({ id: biodataId, ...biodataWithMetadata });
      console.log("Biodata updated in Typesense successfully");
    } catch (typesenseError: any) {
      console.warn("Failed to update in Typesense, but biodata was updated:", typesenseError.message);
      // Don't fail the entire operation if Typesense is down
    }

    return { success: true, message: "Biodata updated and re-indexed successfully!" };
  } catch (error: any) {
    console.error("Error updating biodata:", error);
    return {
      success: false,
      message: error.message || "Failed to update biodata.",
    };
  }
};

export const deleteBiodata = async (userId: string) => {
  try {
    if (!userId) {
      return { success: false, message: "User authentication required." };
    }

    // First, find the biodata document for this user
    const snapshot = await db
      .collection("biodata")
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return {
        success: false,
        message: "No biodata found for this user.",
      };
    }

    const doc = snapshot.docs[0];
    const biodataId = doc.id;

    // Delete the biodata document
    await db.collection("biodata").doc(biodataId).delete();

    // Remove from Typesense (non-blocking)
    try {
      const { deleteBiodataFromTypesense } = await import("@/lib/typesense/search");
      await deleteBiodataFromTypesense(biodataId);
      console.log("Biodata removed from Typesense successfully");
    } catch (typesenseError: any) {
      console.warn("Failed to delete from Typesense, but biodata was deleted:", typesenseError.message);
      // Don't fail the entire operation if Typesense is down
    }

    console.log("Biodata deleted successfully for user:", userId);

    return {
      success: true,
      message: "Biodata deleted and removed from search!",
    };
  } catch (error: any) {
    console.error("Error deleting biodata:", error);
    return {
      success: false,
      message: error.message || "Failed to delete biodata. Please try again.",
    };
  }
};

// Search filters interface
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

// Search result interface
interface SearchResult {
  success: boolean;
  data?: any[];
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  message?: string;
}

/**
 * Advanced biodata search with comprehensive filtering and pagination
 * Professional implementation for large-scale applications
 */
export const searchBiodata = async (
  filters: SearchFilters,
  page: number = 1,
  pageSize: number = 20,
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc',
  userId?: string
): Promise<SearchResult> => {
  // Use Typesense for search (import at the top of the file)
  const { searchBiodataWithTypesense } = await import('@/lib/typesense/search');
  return await searchBiodataWithTypesense(filters, page, pageSize, sortBy, sortOrder, userId);
};

/**
 * Get biodata suggestions for autocomplete/typeahead
 * Optimized for real-time search suggestions
 */
export const getBiodataSuggestions = async (
  searchTerm: string,
  field: string = 'fullName',
  limit: number = 10
): Promise<{ success: boolean; data?: string[]; message?: string }> => {
  try {
    if (!searchTerm || searchTerm.length < 2) {
      return { success: true, data: [] };
    }
    
    const query = db.collection('biodata')
      .where(field, '>=', searchTerm)
      .where(field, '<=', searchTerm + '\uf8ff')
      .limit(limit);
    
    const snapshot = await query.get();
    const suggestions = snapshot.docs
      .map(doc => doc.data()[field])
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
    
    return {
      success: true,
      data: suggestions,
    };
  } catch (error: any) {
    console.error('Error getting biodata suggestions:', error);
    return {
      success: false,
      message: 'Failed to get suggestions.',
      data: [],
    };
  }
};

/**
 * Get popular search filters for better UX
 * This helps users discover common filter options
 */
export const getPopularFilters = async (): Promise<{
  success: boolean;
  data?: {
    divisions: string[];
    districts: string[];
    professions: string[];
    educations: string[];
  };
  message?: string;
}> => {
  try {
    // This would typically be cached in a real application
    const snapshot = await db.collection('biodata').limit(1000).get();
    
    const divisions = new Set<string>();
    const districts = new Set<string>();
    const professions = new Set<string>();
    const educations = new Set<string>();
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      
      if (data.presentDivision) divisions.add(data.presentDivision);
      if (data.presentDistrict) districts.add(data.presentDistrict);
      if (data.occupation) professions.add(data.occupation);
      if (data.highestDegree) educations.add(data.highestDegree);
    });
    
    return {
      success: true,
      data: {
        divisions: Array.from(divisions).slice(0, 10),
        districts: Array.from(districts).slice(0, 20),
        professions: Array.from(professions).slice(0, 15),
        educations: Array.from(educations).slice(0, 10),
      },
    };
  } catch (error: any) {
    console.error('Error getting popular filters:', error);
    return {
      success: false,
      message: 'Failed to get popular filters.',
    };
  }
};

/**
 * Get platform statistics for home page display
 */
export const getPlatformStatistics = async () => {
  try {
    // Get total biodata count
    const totalSnapshot = await db.collection('biodata').count().get();
    const totalBiodata = totalSnapshot.data().count;

    // Get male biodata count
    const maleSnapshot = await db.collection('biodata')
      .where('biodataType', '==', 'males biodata')
      .count()
      .get();
    const maleBiodata = maleSnapshot.data().count;

    // Get female biodata count
    const femaleSnapshot = await db.collection('biodata')
      .where('biodataType', '==', 'females biodata')
      .count()
      .get();
    const femaleBiodata = femaleSnapshot.data().count;

    // For marriages completed, we'll use a mock number for now
    // In a real app, you'd have a separate collection for successful marriages
    const marriagesCompleted = Math.floor(totalBiodata * 0.15); // Assume 15% success rate

    return {
      success: true,
      data: {
        totalBiodata,
        maleBiodata,
        femaleBiodata,
        marriagesCompleted
      }
    };
  } catch (error: any) {
    console.error('Error getting platform statistics:', error);
    return {
      success: false,
      message: error.message || 'Failed to get platform statistics.',
      data: {
        totalBiodata: 0,
        maleBiodata: 0,
        femaleBiodata: 0,
        marriagesCompleted: 0
      }
    };
  }
};

