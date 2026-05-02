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

export const getFirestoreStats = async () => {
  try {
    const visitsRef = collection(db, VISITS_COLLECTION);
    
    // Total visits
    const totalSnapshot = await getCountFromServer(visitsRef);
    const total = totalSnapshot.data().count;

    // Today's visits
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayQuery = query(visitsRef, where('timestamp', '>=', Timestamp.fromDate(startOfToday)));
    const todaySnapshot = await getCountFromServer(todayQuery);
    const today = todaySnapshot.data().count;

    // Last 7 days (Simplified for charts)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentQuery = query(visitsRef, where('timestamp', '>=', Timestamp.fromDate(sevenDaysAgo)), orderBy('timestamp', 'desc'));
    const recentDocs = await getDocs(recentQuery);
    
    const visitsByDayMap = {};
    recentDocs.forEach(doc => {
      const date = doc.data().timestamp.toDate().toISOString().split('T')[0];
      visitsByDayMap[date] = (visitsByDayMap[date] || 0) + 1;
    });

    const visitsByDay = Object.entries(visitsByDayMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Device breakdown
    const devicesMap = {};
    recentDocs.forEach(doc => {
      const ua = doc.data().userAgent || '';
      const device = ua.includes('Mobile') ? 'Mobile' : (ua.includes('Tablet') ? 'Tablet' : 'Desktop');
      devicesMap[device] = (devicesMap[device] || 0) + 1;
    });
    const devices = Object.entries(devicesMap).map(([device, count]) => ({ device, count }));

    // Top referrers
    const referrersMap = {};
    recentDocs.forEach(doc => {
      const ref = doc.data().referrer || 'direct';
      referrersMap[ref] = (referrersMap[ref] || 0) + 1;
    });
    const topReferrers = Object.entries(referrersMap)
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return { total, today, unique: total, visitsByDay, topReferrers, devices };
  } catch (err) {
    console.error('[FIREBASE] Fetching stats failed:', err);
    throw err;
  }
};

export const getRecentVisitsFirestore = async (limitCount = 50) => {
  try {
    const q = query(collection(db, VISITS_COLLECTION), orderBy('timestamp', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    }));
  } catch (err) {
    console.error('[FIREBASE] Fetching visits failed:', err);
    throw err;
  }
};
