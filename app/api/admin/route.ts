import { NextResponse } from 'next/server';
import { typesenseAdminClient, biodataSchema } from '@/lib/typesense/client';

export async function POST() {
  try {
    console.log('=== TESTING COLLECTION CREATION ===');
    
    // Test 1: List existing collections first
    console.log('Step 1: Listing existing collections...');
    const existingCollections = await typesenseAdminClient.collections().retrieve();
    console.log('Existing collections:', existingCollections);
    
    // Test 2: Check if our collection exists
    console.log('Step 2: Checking if biodata collection exists...');
    let collectionExists = false;
    try {
      const existing = await typesenseAdminClient.collections('biodata').retrieve();
      console.log('Biodata collection already exists:', existing);
      collectionExists = true;
      
      return NextResponse.json({
        success: true,
        message: 'Collection already exists',
        collection: existing,
        existingCollections
      });
    } catch (checkError: any) {
      console.log('Collection check result:', {
        message: checkError.message,
        name: checkError.name,
        constructor: checkError.constructor.name
      });
      
      // Check if it's a "not found" error by message or type
      if (checkError.message?.includes('Collection not found') || 
          checkError.name === 'ObjectNotFound' ||
          checkError.constructor.name === 'ObjectNotFound') {
        console.log('Collection does not exist (expected) - proceeding to create it');
        collectionExists = false;
      } else {
        console.log('Unexpected error during collection check');
        throw checkError; // Unexpected error
      }
    }
    
    // Only proceed if collection doesn't exist
    if (collectionExists) {
      return; // Already returned above
    }
    
    // Test 3: Create the collection
    console.log('Step 3: Creating biodata collection...');
    console.log('Schema to create:', JSON.stringify(biodataSchema, null, 2));
    
    const newCollection = await typesenseAdminClient.collections().create(biodataSchema);
    console.log('Collection created successfully:', newCollection);
    
    // Test 4: Verify creation
    console.log('Step 4: Verifying creation...');
    const verifyCollection = await typesenseAdminClient.collections('biodata').retrieve();
    console.log('Verification successful:', verifyCollection);
    
    return NextResponse.json({
      success: true,
      message: 'Collection created successfully',
      collection: newCollection,
      verification: verifyCollection
    });
    
  } catch (error: any) {
    console.error('=== COLLECTION CREATION FAILED ===');
    console.error('Error details:', {
      message: error.message,
      httpStatus: error.httpStatus,
      code: error.code,
      response: error.response,
      stack: error.stack
    });
    
    return NextResponse.json({
      success: false,
      error: error.message,
      httpStatus: error.httpStatus,
      code: error.code,
      details: error.response || error.stack
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    console.log('=== LISTING ALL COLLECTIONS ===');
    const collections = await typesenseAdminClient.collections().retrieve();
    console.log('All collections:', collections);
    
    return NextResponse.json({
      success: true,
      collections
    });
  } catch (error: any) {
    console.error('Failed to list collections:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
