"use server";

import { db } from "@/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * Add a biodata to user's favorites
 */
export const addToFavorites = async (userId: string, biodataId: string) => {
  try {
    if (!userId || !biodataId) {
      return { 
        success: false, 
        message: "User ID and Biodata ID are required." 
      };
    }

    // Check if biodata exists
    const biodataDoc = await db.collection("biodata").doc(biodataId).get();
    if (!biodataDoc.exists) {
      return { 
        success: false, 
        message: "Biodata not found." 
      };
    }

    // Get user's current favorites
    const userDoc = await db.collection("users").doc(userId).get();
    
    if (!userDoc.exists) {
      return { 
        success: false, 
        message: "User not found." 
      };
    }

    const userData = userDoc.data();
    const currentFavorites = userData?.favorites || [];

    // Check if already in favorites
    if (currentFavorites.includes(biodataId)) {
      return { 
        success: false, 
        message: "Already in favorites." 
      };
    }

    // Add to favorites array
    await db.collection("users").doc(userId).update({
      favorites: FieldValue.arrayUnion(biodataId),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return {
      success: true,
      message: "Added to favorites successfully!",
    };
  } catch (error: any) {
    console.error("Error adding to favorites:", error);
    return {
      success: false,
      message: error.message || "Failed to add to favorites.",
    };
  }
};

/**
 * Remove a biodata from user's favorites
 */
export const removeFromFavorites = async (userId: string, biodataId: string) => {
  try {
    if (!userId || !biodataId) {
      return { 
        success: false, 
        message: "User ID and Biodata ID are required." 
      };
    }

    // Remove from favorites array
    await db.collection("users").doc(userId).update({
      favorites: FieldValue.arrayRemove(biodataId),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return {
      success: true,
      message: "Removed from favorites successfully!",
    };
  } catch (error: any) {
    console.error("Error removing from favorites:", error);
    return {
      success: false,
      message: error.message || "Failed to remove from favorites.",
    };
  }
};

/**
 * Get user's favorite biodata IDs
 */
export const getFavorites = async (userId: string) => {
  try {
    if (!userId) {
      return { 
        success: false, 
        message: "User ID is required.",
        data: []
      };
    }

    const userDoc = await db.collection("users").doc(userId).get();
    
    if (!userDoc.exists) {
      return { 
        success: false, 
        message: "User not found.",
        data: []
      };
    }

    const userData = userDoc.data();
    const favorites = userData?.favorites || [];

    return {
      success: true,
      data: favorites,
    };
  } catch (error: any) {
    console.error("Error getting favorites:", error);
    return {
      success: false,
      message: error.message || "Failed to get favorites.",
      data: []
    };
  }
};

/**
 * Get detailed biodata for user's favorites
 */
export const getFavoriteBiodataDetails = async (userId: string) => {
  try {
    if (!userId) {
      return { 
        success: false, 
        message: "User ID is required.",
        data: []
      };
    }

    // First get the user's favorites
    const favoritesResult = await getFavorites(userId);
    
    if (!favoritesResult.success || favoritesResult.data.length === 0) {
      return {
        success: true,
        data: [],
        message: "No favorites found."
      };
    }

    // Get biodata details for each favorite
    const biodataPromises = favoritesResult.data.map(async (biodataId: string) => {
      try {
        const biodataDoc = await db.collection("biodata").doc(biodataId).get();
        if (biodataDoc.exists) {
          const rawData = biodataDoc.data();
          // Convert any non-serializable data (like Firestore Timestamps) to plain objects
          const biodata = JSON.parse(JSON.stringify({ id: biodataDoc.id, ...rawData }));
          return biodata;
        }
        return null;
      } catch (error) {
        console.error(`Error fetching biodata ${biodataId}:`, error);
        return null;
      }
    });

    const biodataResults = await Promise.all(biodataPromises);
    const validBiodata = biodataResults.filter(biodata => biodata !== null);

    return {
      success: true,
      data: validBiodata,
      message: `Found ${validBiodata.length} favorite profiles.`
    };
  } catch (error: any) {
    console.error("Error getting favorite biodata details:", error);
    return {
      success: false,
      message: error.message || "Failed to get favorite biodata details.",
      data: []
    };
  }
};

/**
 * Check if a biodata is in user's favorites
 */
export const isInFavorites = async (userId: string, biodataId: string) => {
  try {
    if (!userId || !biodataId) {
      return { 
        success: false, 
        message: "User ID and Biodata ID are required.",
        isFavorite: false
      };
    }

    const favoritesResult = await getFavorites(userId);
    
    if (!favoritesResult.success) {
      return {
        success: false,
        message: favoritesResult.message,
        isFavorite: false
      };
    }

    const isFavorite = favoritesResult.data.includes(biodataId);

    return {
      success: true,
      isFavorite: isFavorite,
    };
  } catch (error: any) {
    console.error("Error checking if in favorites:", error);
    return {
      success: false,
      message: error.message || "Failed to check favorites status.",
      isFavorite: false
    };
  }
};

/**
 * Add a biodata to user's ignore list
 */
export const addToIgnoreList = async (userId: string, biodataId: string) => {
  try {
    if (!userId || !biodataId) {
      return { 
        success: false, 
        message: "User ID and Biodata ID are required." 
      };
    }

    // Check if biodata exists
    const biodataDoc = await db.collection("biodata").doc(biodataId).get();
    if (!biodataDoc.exists) {
      return { 
        success: false, 
        message: "Biodata not found." 
      };
    }

    // Get user's current ignore list
    const userDoc = await db.collection("users").doc(userId).get();
    
    if (!userDoc.exists) {
      return { 
        success: false, 
        message: "User not found." 
      };
    }

    const userData = userDoc.data();
    const currentIgnoreList = userData?.ignoreList || [];

    // Check if already in ignore list
    if (currentIgnoreList.includes(biodataId)) {
      return { 
        success: false, 
        message: "Already in ignore list." 
      };
    }

    // Add to ignore list array and remove from favorites if present
    const updateData: any = {
      ignoreList: FieldValue.arrayUnion(biodataId),
      updatedAt: FieldValue.serverTimestamp(),
    };

    // Also remove from favorites if it exists there
    const currentFavorites = userData?.favorites || [];
    if (currentFavorites.includes(biodataId)) {
      updateData.favorites = FieldValue.arrayRemove(biodataId);
    }

    await db.collection("users").doc(userId).update(updateData);

    return {
      success: true,
      message: "Added to ignore list successfully!",
    };
  } catch (error: any) {
    console.error("Error adding to ignore list:", error);
    return {
      success: false,
      message: error.message || "Failed to add to ignore list.",
    };
  }
};

/**
 * Remove a biodata from user's ignore list
 */
export const removeFromIgnoreList = async (userId: string, biodataId: string) => {
  try {
    if (!userId || !biodataId) {
      return { 
        success: false, 
        message: "User ID and Biodata ID are required." 
      };
    }

    // Remove from ignore list array
    await db.collection("users").doc(userId).update({
      ignoreList: FieldValue.arrayRemove(biodataId),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return {
      success: true,
      message: "Removed from ignore list successfully!",
    };
  } catch (error: any) {
    console.error("Error removing from ignore list:", error);
    return {
      success: false,
      message: error.message || "Failed to remove from ignore list.",
    };
  }
};

/**
 * Get user's ignored biodata IDs
 */
export const getIgnoreList = async (userId: string) => {
  try {
    if (!userId) {
      return { 
        success: false, 
        message: "User ID is required.",
        data: []
      };
    }

    const userDoc = await db.collection("users").doc(userId).get();
    
    if (!userDoc.exists) {
      return { 
        success: false, 
        message: "User not found.",
        data: []
      };
    }

    const userData = userDoc.data();
    const ignoreList = userData?.ignoreList || [];

    return {
      success: true,
      data: ignoreList,
    };
  } catch (error: any) {
    console.error("Error getting ignore list:", error);
    return {
      success: false,
      message: error.message || "Failed to get ignore list.",
      data: []
    };
  }
};

/**
 * Get detailed biodata for user's ignore list
 */
export const getIgnoredBiodataDetails = async (userId: string) => {
  try {
    if (!userId) {
      return { 
        success: false, 
        message: "User ID is required.",
        data: []
      };
    }

    // First get the user's ignore list
    const ignoreListResult = await getIgnoreList(userId);
    
    if (!ignoreListResult.success || ignoreListResult.data.length === 0) {
      return {
        success: true,
        data: [],
        message: "No ignored profiles found."
      };
    }

    // Get biodata details for each ignored item
    const biodataPromises = ignoreListResult.data.map(async (biodataId: string) => {
      try {
        const biodataDoc = await db.collection("biodata").doc(biodataId).get();
        if (biodataDoc.exists) {
          const rawData = biodataDoc.data();
          // Convert any non-serializable data (like Firestore Timestamps) to plain objects
          const biodata = JSON.parse(JSON.stringify({ id: biodataDoc.id, ...rawData }));
          return biodata;
        }
        return null;
      } catch (error) {
        console.error(`Error fetching biodata ${biodataId}:`, error);
        return null;
      }
    });

    const biodataResults = await Promise.all(biodataPromises);
    const validBiodata = biodataResults.filter(biodata => biodata !== null);

    return {
      success: true,
      data: validBiodata,
      message: `Found ${validBiodata.length} ignored profiles.`
    };
  } catch (error: any) {
    console.error("Error getting ignored biodata details:", error);
    return {
      success: false,
      message: error.message || "Failed to get ignored biodata details.",
      data: []
    };
  }
};

/**
 * Check if a biodata is in user's ignore list
 */
export const isInIgnoreList = async (userId: string, biodataId: string) => {
  try {
    if (!userId || !biodataId) {
      return { 
        success: false, 
        message: "User ID and Biodata ID are required.",
        isIgnored: false
      };
    }

    const ignoreListResult = await getIgnoreList(userId);
    
    if (!ignoreListResult.success) {
      return {
        success: false,
        message: ignoreListResult.message,
        isIgnored: false
      };
    }

    const isIgnored = ignoreListResult.data.includes(biodataId);

    return {
      success: true,
      isIgnored: isIgnored,
    };
  } catch (error: any) {
    console.error("Error checking if in ignore list:", error);
    return {
      success: false,
      message: error.message || "Failed to check ignore list status.",
      isIgnored: false
    };
  }
};
