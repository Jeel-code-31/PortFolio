import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  where,
  Timestamp,
  getCountFromServer
} from 'firebase/firestore';

const VISITS_COLLECTION = 'visits';

export const trackVisitFirestore = async (visitData) => {
  if (!db) {
    console.warn('[FIREBASE] Firestore not initialized. Skipping visit log.');
    return;
  }
  try {
    await addDoc(collection(db, VISITS_COLLECTION), {
      ...visitData,
      timestamp: Timestamp.now()
    });
    console.log('[FIREBASE] Visit logged successfully');
  } catch (err) {
    console.error('[FIREBASE] Tracking failed:', err);
  }
};


