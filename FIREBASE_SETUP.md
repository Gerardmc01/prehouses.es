# 🔥 GUÍA COMPLETA DE FIREBASE - PREHOUSES

## ✅ Estado Actual del Sistema

### 🎯 Funcionalidades Implementadas

#### 1. **Sistema de Autenticación Completo**
- ✅ Registro con email y contraseña
- ✅ Login con email
- ✅ Login con Google (1 click)
- ✅ Recuperación de contraseña
- ✅ Verificación de email automática
- ✅ Diferenciación entre usuarios y empresas

#### 2. **Base de Datos Firestore**
- ✅ Almacenamiento de perfiles de usuario
- ✅ Colección `users` con datos completos
- ✅ Reglas de seguridad configuradas
- ✅ Sincronización en tiempo real

#### 3. **Dashboards Personalizados**
- ✅ **Dashboard Usuario** (`dashboard-usuario.html`)
  - Estadísticas personales
  - Casas favoritas
  - Consultas enviadas
  - Información de cuenta
  
- ✅ **Dashboard Empresa** (`dashboard-empresa.html`)
  - Casas publicadas
  - Visualizaciones
  - Consultas recibidas
  - Valoraciones

#### 4. **Emails Automáticos**
- ✅ Email de verificación de cuenta
- ✅ Email de recuperación de contraseña
- ✅ Email de cambio de dirección

---

## 📊 Panel de Administración Firebase

### Ver Usuarios Registrados

1. **URL:** https://console.firebase.google.com/
2. Selecciona proyecto **"Prehouses"**
3. Click en **"Authentication"** → **"Users"**

**Aquí verás:**
- 📧 Email de cada usuario
- 📅 Fecha de registro
- 🕐 Último acceso
- 🔑 Método de login (Email o Google)
- ✅ Estado de verificación

### Ver Base de Datos

1. Click en **"Firestore Database"**
2. Verás la colección **"users"**
3. Click en cualquier documento para ver:
   - Nombre
   - Email
   - Tipo (usuario/empresa)
   - Fecha de registro
   - Favoritos
   - Consultas

---

## 🎨 Personalización de Emails (IMPORTANTE)

### Configurar Plantillas de Email

1. Ve a **Firebase Console** → **Authentication** → **Templates**

#### A) **Verificación de Email**
```
Nombre del remitente: Prehouses
Asunto: Verifica tu cuenta en Prehouses
```

#### B) **Recuperación de Contraseña**
```
Nombre del remitente: Prehouses
Asunto: Recupera tu contraseña - Prehouses
```

#### C) **Cambio de Email**
```
Nombre del remitente: Prehouses
Asunto: Confirma tu nuevo email - Prehouses
```

---

## 🚀 Cómo Funciona el Sistema

### Flujo de Registro

1. Usuario va a `/usuarios.html`
2. Rellena el formulario de registro
3. Firebase crea la cuenta
4. Se guarda en Firestore con datos adicionales:
   ```javascript
   {
     name: "Juan Pérez",
     email: "juan@example.com",
     userType: "usuario", // o "empresa"
     createdAt: timestamp,
     favoritos: [],
     consultas: 0
   }
   ```
5. Se envía email de verificación automático
6. Usuario es redirigido a su dashboard

### Flujo de Login

1. Usuario introduce email y contraseña
2. Firebase valida las credenciales
3. Se obtienen datos de Firestore
4. Redirección según tipo:
   - **Usuario** → `dashboard-usuario.html`
   - **Empresa** → `dashboard-empresa.html`

---

## 📁 Estructura de Archivos

```
prehouses.es/
├── js/
│   ├── firebase-config.js    # Configuración de Firebase
│   └── auth.js                # Lógica de autenticación
├── usuarios.html              # Página de login/registro
├── dashboard-usuario.html     # Panel de usuario
├── dashboard-empresa.html     # Panel de empresa
└── ...
```

---

## 🔐 Seguridad

### Reglas de Firestore Configuradas

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Solo el usuario puede ver/editar sus datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Todos pueden ver casas, solo autenticados pueden escribir
    match /casas/{casaId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📈 Próximas Funcionalidades (Roadmap)

### Fase 1 - Sistema de Favoritos
- [ ] Botón "❤️ Guardar" en cada casa
- [ ] Lista de favoritos en dashboard
- [ ] Notificaciones de cambios de precio

### Fase 2 - Sistema de Consultas
- [ ] Formulario de contacto en fichas de producto
- [ ] Bandeja de entrada para empresas
- [ ] Notificaciones por email

### Fase 3 - Publicación de Casas (Empresas)
- [ ] Formulario para subir casas
- [ ] Gestión de imágenes
- [ ] Edición y eliminación

### Fase 4 - Sistema de Valoraciones
- [ ] Usuarios pueden valorar empresas
- [ ] Puntuación media visible
- [ ] Comentarios y reseñas

---

## 🆘 Solución de Problemas

### Error: "Email already in use"
**Solución:** El email ya está registrado. Usa "¿Olvidaste tu contraseña?" para recuperar acceso.

### Error: "Weak password"
**Solución:** La contraseña debe tener mínimo 6 caracteres.

### No recibo el email de verificación
**Solución:** 
1. Revisa spam/correo no deseado
2. Espera 5 minutos
3. Click en "Reenviar email de verificación" en el dashboard

### La página se queda en blanco
**Solución:**
1. Abre la consola del navegador (F12)
2. Revisa errores en la pestaña "Console"
3. Verifica que Firebase esté inicializado correctamente

---

## 📞 Contacto y Soporte

- **Email de soporte:** prehouses24h@gmail.com
- **Firebase Console:** https://console.firebase.google.com/
- **Proyecto:** Prehouses (prehouses-b224d)

---

## ✅ Checklist de Configuración

- [x] Proyecto Firebase creado
- [x] Authentication activado (Email + Google)
- [x] Firestore Database creado
- [x] Reglas de seguridad configuradas
- [x] App Web registrada
- [x] Credenciales integradas en el código
- [ ] **Plantillas de email personalizadas** ← PENDIENTE (hazlo tú)
- [x] Dashboards creados
- [x] Sistema de login/registro funcionando

---

**Última actualización:** 4 de diciembre de 2024
**Versión:** 1.0 PRO
