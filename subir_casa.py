#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Inicializar Firebase Admin
try:
    cred = credentials.Certificate('serviceAccountKey.json')
    firebase_admin.initialize_app(cred)
except:
    print("⚠️  No se encontró serviceAccountKey.json")
    print("Usando credenciales por defecto...")
    firebase_admin.initialize_app()

db = firestore.client()

# Datos de la casa
house_data = {
    'title': 'Casa Hormigón y Acero 80 m²',
    'price': 84500,
    'area': 80,
    'rooms': 3,
    'bathrooms': 2,
    'location': 'España',
    'description': '''Todos nuestros diseño de casas prefabricadas serán adaptados a las necesidades del cliente y al espacio que éste tenga.

Tenemos los precios más competitivos del mercado en cuanto a casas prefabricadas de hormigón con estructuras de acero. Son viviendas únicas a un precio inferior a la media de las casas construidas hoy en día.

Como podéis ver en este modelo hemos optado por la elección de un espacio abierto y muy minimalista que obtiene el certificado energético superior a los de la media.

Puedes consultar entre diversas opciones de revestimiento interiores, exteriores, piedra artificial, piedra natural, entre otros.

Características:
• Casa con tres habitaciones.
• Salón – comedor.
• Cuartos de baños al gusto del cliente.
• Cocina con azulejos personalizables.
• Suelos elegir entre una gran variedad.
• Ventanas de aluminio y cristales Climalit.

Si tienes alguna duda escribe a info@lafabricadecasas.es''',
    'images': [
        'img/houses/hormigon_acero_1.jpg',
        'img/houses/hormigon_acero_2.png',
        'img/houses/hormigon_acero_3.jpg',
        'img/houses/hormigon_acero_4.png',
        'img/houses/hormigon_acero_5.png'
    ],
    'companyId': 'la_fabrica_casas',
    'companyName': 'La Fábrica de Casas',
    'contactEmail': 'info@lafabricadecasas.es',
    'companyWeb': 'https://lafabricadecasas.es/',
    'category': 'hormigon',
    'featured': True,
    'createdAt': firestore.SERVER_TIMESTAMP
}

print("🔥 Limpiando base de datos...")
houses_ref = db.collection('houses')
docs = houses_ref.stream()
deleted = 0
for doc in docs:
    doc.reference.delete()
    deleted += 1

print(f"✅ Eliminadas {deleted} casas antiguas")

print("🏠 Añadiendo casa real...")
doc_ref = houses_ref.add(house_data)
print(f"✅ Casa añadida con ID: {doc_ref[1].id}")
print("\n🎉 ¡PROCESO COMPLETADO!")
print("Abre index.html o catalogo.html para ver la casa")
