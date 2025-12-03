# Configuración de Firebase para Prehouses

## Paso 1: Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click en "Agregar proyecto" o "Add project"
3. Nombre del proyecto: `prehouses` (o el que prefieras)
4. Acepta los términos y click en "Continuar"
5. Desactiva Google Analytics (opcional) y click en "Crear proyecto"
6. Espera a que se cree el proyecto

## Paso 2: Registrar App Web

1. En la página principal del proyecto, click en el icono `</>` (Web)
2. Nombre de la app: `Prehouses Web`
3. **NO** marcar "Firebase Hosting"
4. Click en "Registrar app"
5. **COPIA** el código de configuración que aparece (lo necesitarás en el Paso 5)
6. Click en "Continuar a la consola"

## Paso 3: Activar Authentication

1. En el menú lateral, click en "Authentication"
2. Click en "Comenzar" o "Get started"
3. En la pestaña "Sign-in method", activa:
   - **Email/Password**: Click en "Email/Password" → Activar → Guardar
   - **Google**: Click en "Google" → Activar → Selecciona un email de soporte → Guardar

## Paso 4: Activar Firestore Database

1. En el menú lateral, click en "Firestore Database"
2. Click en "Crear base de datos"
3. Selecciona "Comenzar en modo de **producción**"
4. Elige la ubicación: `europe-west` (más cercano a España)
5. Click en "Habilitar"

### Configurar Reglas de Seguridad

Una vez creada la base de datos:
1. Ve a la pestaña "Reglas" (Rules)
2. Reemplaza el contenido con estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios solo pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Todos pueden leer casas publicadas
    match /houses/{houseId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click en "Publicar"

## Paso 5: Configurar el Proyecto

1. Abre el archivo `js/firebase-config.js`
2. Reemplaza los valores de configuración con los que copiaste en el Paso 2:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",              // Ej: "AIzaSyC..."
    authDomain: "TU_PROJECT_ID.firebaseapp.com",  // Ej: "prehouses-12345.firebaseapp.com"
    projectId: "TU_PROJECT_ID",             // Ej: "prehouses-12345"
    storageBucket: "TU_PROJECT_ID.appspot.com",   // Ej: "prehouses-12345.appspot.com"
    messagingSenderId: "TU_MESSAGING_SENDER_ID",  // Ej: "123456789"
    appId: "TU_APP_ID"                      // Ej: "1:123456789:web:abc..."
};
```

3. Guarda el archivo

## Paso 6: Probar la Aplicación

1. Abre `usuarios.html` en tu navegador
2. Intenta registrarte con email y contraseña
3. Intenta iniciar sesión con Google
4. Verifica que los usuarios aparecen en Firebase Console > Authentication

## Panel de Administración

Para gestionar usuarios:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Click en "Authentication" en el menú lateral
4. Aquí verás:
   - Lista de todos los usuarios registrados
   - Email, método de login, fecha de creación
   - Opciones para eliminar o deshabilitar usuarios

Para ver datos en la base de datos:

1. Click en "Firestore Database" en el menú lateral
2. Verás las colecciones `users` con todos los datos
3. Puedes editar, eliminar o exportar datos

## Exportar Datos de Usuarios

1. Ve a Authentication > Users
2. Click en los 3 puntos (⋮) arriba a la derecha
3. Click en "Download CSV" para descargar la lista de usuarios

## Límites del Plan Gratuito (Spark)

- ✅ 50,000 usuarios activos/mes
- ✅ 1 GB almacenamiento Firestore
- ✅ 50,000 lecturas/día
- ✅ 20,000 escrituras/día
- ✅ Authentication ilimitado

**Para tu proyecto:** Suficiente para miles de usuarios sin coste.

## Soporte

Si tienes problemas:
1. Verifica que copiaste correctamente la configuración
2. Revisa la consola del navegador (F12) para ver errores
3. Verifica que activaste Email/Password y Google en Authentication
4. Asegúrate de que las reglas de Firestore están publicadas

## Próximos Pasos

Una vez configurado Firebase:
- Los usuarios podrán registrarse e iniciar sesión
- Los datos se guardarán automáticamente en Firestore
- Podrás ver y gestionar usuarios desde Firebase Console
- El sistema estará listo para añadir funcionalidades como favoritos y alertas
