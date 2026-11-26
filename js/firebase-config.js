/* ============================================================
   axomexam — Firebase web config (leaderboard)

   These values are PUBLIC. They are shipped to every browser that
   uses the leaderboard, and Firebase is designed to expose them
   (access is controlled by Firestore security rules, not by
   hiding this object). Never put a service-account key or any
   `private_key` here.

   Loaded on demand by the leaderboard code; not referenced by the
   page templates, so it stays out of the site-wide asset stamping.
   ============================================================ */
window.AXOMEXAM_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAlmGaUIxWWwe2_z2eHC_YcrtPymBSyAgI",
  authDomain: "axomexam-leaderboard.firebaseapp.com",
  projectId: "axomexam-leaderboard",
  storageBucket: "axomexam-leaderboard.firebasestorage.app",
  messagingSenderId: "193174392803",
  appId: "1:193174392803:web:d648ced70baaaa88c9dad6",
};
