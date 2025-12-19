const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function run() {
  console.log("🧹 Limpiando casas antiguas...");
  const snap = await db.collection('houses').get();
  for (const doc of snap.docs) {
    await doc.ref.delete();
  }
  console.log("✅ Base de datos limpia.");

  console.log("🏠 Subiendo 'Casa Hormigón y Acero 80 m²'...");
  await db.collection('houses').add({
    title: "Casa Hormigón y Acero 80 m²",
    price: 84500,
    area: 80,
    rooms: 3,
    bathrooms: 2,
    location: "España",
    description: "Casa de hormigón con estructuras de acero. Vivienda minimalista con certificado energético superior. Personalizable en acabados de piedra natural o artificial. Ventanas Climalit y diseño de espacio abierto.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6191da1128?q=80&w=2070",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
      "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=2070",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974",
      "https://images.unsplash.com/photo-1600585154542-63ef0085a6cf?q=80&w=2070"
    ],
    companyId: "fabrica_casas",
    companyName: "La Fábrica de Casas",
    contactEmail: "info@lafabricadecasas.es",
    companyWeb: "https://lafabricadecasas.es/",
    category: "hormigon",
    featured: true,
    createdAt: new Date()
  });
  console.log("🚀 Primera casa real publicada con éxito.");
  process.exit();
}

run();
