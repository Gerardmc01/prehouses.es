// Firebase Configuration
// IMPORTANTE: Reemplaza estos valores con los de tu proyecto Firebase
// Los obtendrás desde: Firebase Console > Project Settings > Your apps > Web app

const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "TU_PROJECT_ID.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT_ID.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Servicios de Firebase
const auth = firebase.auth();
const db = firebase.firestore();

// Configurar proveedor de Google
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});
