# 📧 SISTEMA DE EMAIL NOTIFICATIONS - PREHOUSES

## Configuración de SendGrid (Recomendado)

### 1. Crear Cuenta en SendGrid
1. Visita https://sendgrid.com/
2. Regístrate (plan gratuito: 100 emails/día)
3. Verifica tu email

### 2. Obtener API Key
1. Ve a Settings > API Keys
2. Crea una nueva API Key con permisos "Full Access"
3. Copia la API Key (solo se muestra una vez)

### 3. Verificar Dominio/Email
1. Ve a Settings > Sender Authentication
2. Verifica tu dominio o email (prehouses24h@gmail.com)

---

## Tipos de Emails Automáticos

### 1. **Bienvenida** (Nuevo Usuario)
- **Trigger:** Usuario se registra
- **Destinatario:** Usuario nuevo
- **Contenido:**
  - Bienvenida a Prehouses
  - Guía rápida de uso
  - Enlace al catálogo

### 2. **Aprobación de Empresa**
- **Trigger:** Admin aprueba empresa
- **Destinatario:** Empresa
- **Contenido:**
  - Confirmación de aprobación
  - Acceso al dashboard
  - Instrucciones para publicar casas

### 3. **Nuevo Lead** (Consulta)
- **Trigger:** Usuario envía formulario de contacto
- **Destinatario:** Empresa propietaria de la casa
- **Contenido:**
  - Datos del lead (nombre, email, teléfono)
  - Mensaje del usuario
  - Enlace a dashboard para responder

### 4. **Confirmación de Consulta**
- **Trigger:** Usuario envía formulario
- **Destinatario:** Usuario
- **Contenido:**
  - Confirmación de envío
  - Datos de la casa consultada
  - Tiempo estimado de respuesta

### 5. **Nueva Casa Publicada**
- **Trigger:** Empresa publica casa
- **Destinatario:** Usuarios con alertas activas
- **Contenido:**
  - Detalles de la nueva casa
  - Enlace a la ficha
  - Opción de desactivar alertas

### 6. **Recordatorio de Actividad**
- **Trigger:** Usuario inactivo 30 días
- **Destinatario:** Usuario
- **Contenido:**
  - Nuevas casas añadidas
  - Ofertas destacadas
  - Invitación a volver

---

## Implementación con Firebase Functions

### Opción 1: Firebase Functions (Recomendado para producción)

```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.key);

// 1. Email de Bienvenida
exports.sendWelcomeEmail = functions.firestore
    .document('users/{userId}')
    .onCreate(async (snap, context) => {
        const user = snap.data();
        
        const msg = {
            to: user.email,
            from: 'prehouses24h@gmail.com',
            subject: '¡Bienvenido a Prehouses!',
            html: `
                <h1>¡Hola ${user.displayName || 'Usuario'}!</h1>
                <p>Bienvenido a Prehouses, tu plataforma de casas prefabricadas.</p>
                <p><a href="https://prehouses-es-9ybg.onrender.com/catalogo.html">Explora nuestro catálogo</a></p>
            `
        };
        
        await sgMail.send(msg);
    });

// 2. Email de Nuevo Lead
exports.sendLeadNotification = functions.firestore
    .document('leads/{leadId}')
    .onCreate(async (snap, context) => {
        const lead = snap.data();
        
        // Get company email
        const companyDoc = await admin.firestore()
            .collection('users')
            .doc(lead.companyId)
            .get();
        
        const company = companyDoc.data();
        
        const msg = {
            to: company.email,
            from: 'prehouses24h@gmail.com',
            subject: `Nuevo Lead: ${lead.houseTitle}`,
            html: `
                <h2>¡Nuevo Lead Recibido!</h2>
                <p><strong>Casa:</strong> ${lead.houseTitle}</p>
                <p><strong>Cliente:</strong> ${lead.userName}</p>
                <p><strong>Email:</strong> ${lead.userEmail}</p>
                <p><strong>Teléfono:</strong> ${lead.userPhone}</p>
                <p><strong>Mensaje:</strong> ${lead.message}</p>
                <p><a href="https://prehouses-es-9ybg.onrender.com/dashboard-empresa.html#leadsSection">Ver en Dashboard</a></p>
            `
        };
        
        await sgMail.send(msg);
        
        // Send confirmation to user
        const userMsg = {
            to: lead.userEmail,
            from: 'prehouses24h@gmail.com',
            subject: 'Consulta Recibida - Prehouses',
            html: `
                <h2>¡Consulta Recibida!</h2>
                <p>Hola ${lead.userName},</p>
                <p>Hemos recibido tu consulta sobre <strong>${lead.houseTitle}</strong>.</p>
                <p>La empresa se pondrá en contacto contigo en breve.</p>
                <p>Gracias por usar Prehouses.</p>
            `
        };
        
        await sgMail.send(userMsg);
    });

// 3. Email de Aprobación de Empresa
exports.sendCompanyApproval = functions.firestore
    .document('users/{userId}')
    .onUpdate(async (change, context) => {
        const before = change.before.data();
        const after = change.after.data();
        
        // Check if status changed to approved
        if (before.status !== 'approved' && after.status === 'approved' && after.userType === 'empresa') {
            const msg = {
                to: after.email,
                from: 'prehouses24h@gmail.com',
                subject: '¡Empresa Aprobada en Prehouses!',
                html: `
                    <h2>¡Felicidades ${after.name}!</h2>
                    <p>Tu empresa ha sido aprobada en Prehouses.</p>
                    <p>Ya puedes empezar a publicar tus casas.</p>
                    <p><a href="https://prehouses-es-9ybg.onrender.com/dashboard-empresa.html">Acceder a Dashboard</a></p>
                `
            };
            
            await sgMail.send(msg);
        }
    });
```

### Configurar Firebase Functions:

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar functions
firebase init functions

# Instalar dependencias
cd functions
npm install @sendgrid/mail

# Configurar API Key
firebase functions:config:set sendgrid.key="TU_API_KEY_AQUI"

# Deploy
firebase deploy --only functions
```

---

## Opción 2: Cliente-Side (Temporal, para desarrollo)

```javascript
// js/email-notifications.js
// NOTA: Esto expone la API key, solo para desarrollo

async function sendEmail(to, subject, html) {
    const SENDGRID_API_KEY = 'TU_API_KEY'; // ¡NO HACER ESTO EN PRODUCCIÓN!
    
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personalizations: [{
                to: [{ email: to }]
            }],
            from: { email: 'prehouses24h@gmail.com' },
            subject: subject,
            content: [{
                type: 'text/html',
                value: html
            }]
        })
    });
    
    return response.ok;
}

// Uso:
async function sendLeadEmail(leadData) {
    await sendEmail(
        leadData.companyEmail,
        `Nuevo Lead: ${leadData.houseTitle}`,
        `<h2>Nuevo Lead</h2><p>Cliente: ${leadData.userName}</p>`
    );
}
```

---

## Templates de Email (HTML)

### Template Base:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f9fafb; }
        .button { background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏠 Prehouses</h1>
        </div>
        <div class="content">
            <!-- CONTENIDO AQUÍ -->
        </div>
        <div class="footer">
            <p>&copy; 2024 Prehouses. Todos los derechos reservados.</p>
            <p><a href="https://prehouses-es-9ybg.onrender.com/privacidad.html">Política de Privacidad</a></p>
        </div>
    </div>
</body>
</html>
```

---

## Próximos Pasos

1. **Crear cuenta SendGrid** (gratuita)
2. **Obtener API Key**
3. **Configurar Firebase Functions** (recomendado)
4. **O usar implementación cliente** (temporal)
5. **Testear emails**
6. **Monitorear entregas**

---

## Costes

- **SendGrid Free:** 100 emails/día (suficiente para empezar)
- **SendGrid Essentials:** 15$/mes - 50,000 emails/mes
- **Firebase Functions:** Gratis hasta 2M invocaciones/mes

---

## Alternativas a SendGrid

1. **Mailgun** - Similar a SendGrid
2. **AWS SES** - Muy económico (0.10$/1000 emails)
3. **Resend** - Moderno, fácil de usar
4. **Brevo (Sendinblue)** - 300 emails/día gratis

---

**Recomendación:** Empezar con SendGrid Free + Firebase Functions
