# 🔍 CHECKLIST DE AUDITORÍA COMPLETA - PREHOUSES

## ESTADO: EN PROGRESO
**Fecha:** 15 Diciembre 2024, 23:23

---

## 1. NAVEGACIÓN PRINCIPAL

### Navbar (Todas las páginas)
- [ ] Logo → index.html
- [ ] Inicio → index.html
- [ ] Catálogo → catalogo.html
- [ ] Blog → blog.html
- [ ] **Asesor IA → asesor.html** ❌ NO EXISTE
- [ ] Acceso Empresas → empresas.html
- [ ] Acceso Usuarios → usuarios.html
- [ ] Mobile menu toggle

### Footer (Todas las páginas)
- [ ] Enlaces a redes sociales
- [ ] Enlaces legales (privacidad, términos)
- [ ] Copyright

---

## 2. PÁGINA PRINCIPAL (index.html)

### Hero Section
- [ ] Buscador funcional
- [ ] Botón "Buscar Casa" → catalogo.html con filtro
- [ ] **Enlace "Asesor IA"** ❌ NO EXISTE

### Categorías
- [ ] 6 categorías clicables → catalogo.html con filtro

### Casas Destacadas
- [ ] Cards clicables → detalle-casa-*.html
- [ ] Botón "Ver Catálogo Completo" → catalogo.html

---

## 3. CATÁLOGO (catalogo.html)

### Filtros
- [ ] Filtro "Todas"
- [ ] Filtro por categoría (madera, hormigón, acero, etc.)
- [ ] Filtros funcionales (JavaScript)

### Casas (20 total)
- [ ] 10 casas estáticas con enlaces a fichas
- [ ] 10 casas nuevas añadidas
- [ ] Todas clickeables → detalle-casa.html?id=X

### Casas Dinámicas (Firestore)
- [ ] Carga de casas desde Firestore
- [ ] Renderizado correcto
- [ ] Enlaces funcionales

---

## 4. FICHAS DE PRODUCTO (10 páginas)

### detalle-casa-granito.html ✅
- [ ] Contenido HTML completo
- [ ] Galería de imágenes
- [ ] Formulario de contacto
- [ ] Función sendLead()
- [ ] Firebase integrado

### detalle-casa-nordic.html
- [ ] Contenido HTML completo
- [ ] Galería de imágenes
- [ ] Formulario de contacto
- [ ] Función sendLead()

### detalle-casa-elite.html
- [ ] Contenido HTML completo
- [ ] Galería de imágenes
- [ ] Formulario de contacto
- [ ] Función sendLead()

### detalle-casa-horizon.html
- [ ] Contenido HTML completo
- [ ] Galería de imágenes
- [ ] Formulario de contacto
- [ ] Función sendLead()

### detalle-casa-tiny.html
- [ ] Contenido HTML completo
- [ ] Galería de imágenes
- [ ] Formulario de contacto
- [ ] Función sendLead()

### detalle-casa-villa.html
- [ ] Contenido HTML completo
- [ ] Galería de imágenes
- [ ] Formulario de contacto
- [ ] Función sendLead()

### detalle-casa-wood.html
- [ ] Contenido HTML completo
- [ ] Galería de imágenes
- [ ] Formulario de contacto
- [ ] Función sendLead()

### detalle-casa-fiscal.html
- [ ] Contenido HTML completo
- [ ] Galería de imágenes
- [ ] Formulario de contacto
- [ ] Función sendLead()

### detalle-casa-las-rozas.html
- [ ] Contenido HTML completo
- [ ] Galería de imágenes
- [ ] Formulario de contacto
- [ ] Función sendLead()

### detalle-casa-mh-diseno.html
- [ ] Contenido HTML completo
- [ ] Galería de imágenes
- [ ] Formulario de contacto
- [ ] Función sendLead()

---

## 5. AUTENTICACIÓN

### usuarios.html
- [ ] Formulario de login
- [ ] Formulario de registro
- [ ] Google Sign-In
- [ ] Validación de campos
- [ ] Redirección a dashboard-usuario.html
- [ ] Mensajes de error

### empresas.html
- [ ] Formulario de login
- [ ] Formulario de registro empresa
- [ ] Google Sign-In
- [ ] Campos empresa (CIF, nombre, etc.)
- [ ] Redirección a dashboard-empresa.html
- [ ] Mensajes de error

---

## 6. DASHBOARD USUARIO (dashboard-usuario.html)

### Sidebar
- [ ] Logo → index.html
- [ ] Dashboard (activo)
- [ ] Favoritos
- [ ] Mensajes
- [ ] Alertas
- [ ] Cerrar Sesión

### Estadísticas
- [ ] Favoritos guardados (contador)
- [ ] Consultas enviadas (contador)
- [ ] Alertas activas (contador)

### Favoritos
- [ ] Lista de casas favoritas
- [ ] Botón eliminar favorito
- [ ] Enlace a ficha de casa
- [ ] Mensaje si no hay favoritos

### Mensajes
- [ ] Historial de consultas
- [ ] Datos de la casa consultada
- [ ] Mensaje enviado
- [ ] Fecha

### Alertas
- [ ] Lista de alertas activas
- [ ] Botón desactivar alerta

---

## 7. DASHBOARD EMPRESA (dashboard-empresa.html)

### Sidebar
- [ ] Logo → index.html
- [ ] Dashboard (activo)
- [ ] Mis Casas
- [ ] Mensajes
- [ ] Publicar Casa → publicar-casa.html
- [ ] Cerrar Sesión

### Banner de Estado
- [ ] Pendiente de aprobación (amarillo)
- [ ] Aprobado (verde)
- [ ] Rechazado (rojo)

### Estadísticas
- [ ] Casas publicadas (contador desde Firestore)
- [ ] Leads recibidos (contador desde Firestore)
- [ ] Visualizaciones (contador)
- [ ] Valoración media (contador)

### Gestión de Inventario
- [ ] Botón "Publicar Propiedad" → publicar-casa.html
- [ ] Lista de casas propias
- [ ] Botón editar casa
- [ ] Botón eliminar casa
- [ ] Modal de edición funcional

### Leads
- [ ] Lista de mensajes recibidos
- [ ] Datos del cliente
- [ ] Botón "Responder por Email"
- [ ] Fecha del lead

### Perfil Empresa
- [ ] Formulario de edición
- [ ] Nombre comercial
- [ ] Teléfono
- [ ] CIF
- [ ] Sitio web
- [ ] Botón guardar cambios

---

## 8. PUBLICAR CASA (publicar-casa.html)

### Formulario
- [ ] Título
- [ ] Precio
- [ ] Superficie
- [ ] Habitaciones
- [ ] Baños
- [ ] Categoría (select)
- [ ] Tiempo de entrega
- [ ] Descripción
- [ ] URLs de imágenes
- [ ] Eficiencia energética
- [ ] Año de construcción
- [ ] Características

### Funcionalidad
- [ ] Validación de campos
- [ ] Guardado en Firestore
- [ ] Redirección a dashboard
- [ ] Mensaje de confirmación

---

## 9. ADMIN PANEL (admin.html)

### Acceso
- [ ] Verificación de email admin
- [ ] Redirección si no es admin

### Sidebar
- [ ] Dashboard
- [ ] Usuarios
- [ ] Empresas
- [ ] Casas
- [ ] Leads
- [ ] Cerrar Sesión

### Dashboard
- [ ] Estadísticas globales
- [ ] Total usuarios
- [ ] Total empresas
- [ ] Total casas
- [ ] Total leads
- [ ] Feed de actividad

### Gestión de Usuarios
- [ ] Lista de usuarios
- [ ] Ver detalles
- [ ] Eliminar usuario

### Gestión de Empresas
- [ ] Lista de empresas
- [ ] Estado (pendiente/aprobado/rechazado)
- [ ] Botón aprobar
- [ ] Botón rechazar
- [ ] Botón eliminar

### Gestión de Casas
- [ ] Lista de todas las casas
- [ ] Empresa propietaria
- [ ] Botón ver ficha
- [ ] Botón eliminar

### Gestión de Leads
- [ ] Lista de todos los leads
- [ ] Datos del cliente
- [ ] Casa consultada
- [ ] Empresa destinataria
- [ ] Fecha

---

## 10. BLOG

### blog.html
- [ ] Lista de artículos
- [ ] Enlaces a artículos individuales

### Artículos (3)
- [ ] blog-mejores-materiales-casas-prefabricadas.html
- [ ] blog-precios-casas-prefabricadas-2025.html
- [ ] blog-tramites-legales-casas-prefabricadas-espana.html

---

## 11. CALCULADORA (calculadora.html)

### Inputs
- [ ] Precio de la casa (input + slider)
- [ ] Entrada inicial (input + slider)
- [ ] Plazo (select)
- [ ] Tasa de interés (input + slider)

### Funcionalidad
- [ ] Sincronización input-slider
- [ ] Cálculo de cuota mensual
- [ ] Mostrar resultados
- [ ] Entrada inicial (€)
- [ ] Cantidad financiada (€)
- [ ] Total a pagar (€)

### Enlaces
- [ ] Botón "Ver Catálogo" → catalogo.html

---

## 12. DOCUMENTOS LEGALES

### privacidad.html
- [ ] Contenido completo
- [ ] Enlaces a otros documentos

### terminos.html
- [ ] Contenido completo
- [ ] Enlaces a otros documentos

### cookies.html (pendiente)
- [ ] Crear página

### aviso-legal.html (pendiente)
- [ ] Crear página

---

## 13. FUNCIONALIDADES FIREBASE

### Autenticación
- [ ] Login email/password
- [ ] Login Google
- [ ] Registro
- [ ] Logout
- [ ] Verificación de estado

### Firestore - Colecciones
- [ ] users (lectura/escritura)
- [ ] houses (lectura/escritura)
- [ ] leads (escritura)
- [ ] favorites (lectura/escritura)
- [ ] alerts (lectura/escritura)
- [ ] reviews (lectura/escritura)

---

## 14. SEO Y PERFORMANCE

### Meta Tags
- [ ] Title en todas las páginas
- [ ] Description en todas las páginas
- [ ] Keywords
- [ ] Open Graph
- [ ] Twitter Cards

### Archivos
- [ ] sitemap.xml ✅
- [ ] robots.txt ✅
- [ ] favicon

---

## 15. RESPONSIVE

### Breakpoints
- [ ] Desktop (>1024px)
- [ ] Tablet (768px-1024px)
- [ ] Mobile (< 768px)

### Mobile Menu
- [ ] Toggle funcional
- [ ] Enlaces correctos
- [ ] Cierre al hacer clic

---

## PROBLEMAS ENCONTRADOS

1. ❌ **asesor.html NO EXISTE** - Múltiples enlaces rotos
2. ❓ **cookies.html NO EXISTE** - Enlace en footer
3. ❓ **aviso-legal.html NO EXISTE** - Enlace en footer
4. ❓ Verificar que TODAS las fichas de producto tengan contenido

---

## PRÓXIMOS PASOS

1. Crear asesor.html (página simple o redirección)
2. Crear cookies.html
3. Crear aviso-legal.html
4. Verificar TODAS las fichas de producto una por una
5. Probar TODOS los formularios
6. Verificar TODAS las conexiones Firebase
