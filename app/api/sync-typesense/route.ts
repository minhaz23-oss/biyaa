import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/admin';
import { initializeBiodataCollection } from '@/lib/typesense/client';
import { bulkIndexBiodataDocuments } from '@/lib/typesense/search';

export async function POST(request: NextRequest) {
  try {
    // Add basic protection (optional - you can enhance this)
    const adminKey = request.headers.get('x-admin-key');
    if (process.env.NODE_ENV === 'production' && adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.log('Starting Typesense sync...');
    
    // Initialize collection if it doesn't exist
    const initResult = await initializeBiodataCollection();
    if (!initResult.success) {
      throw new Error('Failed to initialize Typesense collection');
    }
    
    // Fetch all biodata from Firestore
    const snapshot = await db.collection('biodata').get();
    
    if (snapshot.empty) {
      return NextResponse.json({ 
        success: true, 
        message: 'No biodata found in Firestore to sync',
        totalSynced: 0 
      });
    }
    
    // Transform Firestore documents for Typesense
    const biodataDocuments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`Found ${biodataDocuments.length} documents to sync`);
    
    // Bulk index to Typesense
    const indexResult = await bulkIndexBiodataDocuments(biodataDocuments);
    
    if (!indexResult.success) {
      throw new Error('Failed to index documents in Typesense');
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully synced biodata to Typesense',
      totalSynced: indexResult.totalIndexed || biodataDocuments.length
    });
    
  } catch (error: any) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to sync data with Typesense' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Typesense sync endpoint. Use POST to sync data.',
    endpoints: {
      'POST /api/sync-typesense': 'Sync all Firestore biodata to Typesense'
    }
  });
}
