// Firebase Configuration for Prehouses
// Configuración de Firebase para el sistema de autenticación

const firebaseConfig = {
    apiKey: "AIzaSyA9cOlnbxJv9t-bEgiPQJOPgj7gR0v5xwc",
    authDomain: "prehouses-b224d.firebaseapp.com",
    projectId: "prehouses-b224d",
    storageBucket: "prehouses-b224d.firebasestorage.app",
    messagingSenderId: "996192688774",
    appId: "1:996192688774:web:00bdafc2e2ddc26bcd8f07",
    measurementId: "G-0PL4DH2ZGL"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Exportar servicios
const auth = firebase.auth();
const db = firebase.firestore();

console.log('✅ Firebase inicializado correctamente para Prehouses');
