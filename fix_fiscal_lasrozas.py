import re

# Product data for the two missing pages
products = {
    'fiscal': {
        'title': 'Casa Fiscal 90m²',
        'price_display': '52.000€ <span style="font-size: 1rem; color: var(--text-light); font-weight: 400;">(IVA no incluido)</span>',
        'area': '90',
        'bedrooms': '3',
        'bathrooms': '2',
        'delivery': 'Entrega 2 meses',
        'main_image': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        'tags': '<span style="background: white; color: var(--primary); padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600; border: 2px solid var(--primary);">Acero</span><span style="background: #f0fdf4; color: #16a34a; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">Económica</span>',
        'description': '<p style="line-height: 1.8; color: var(--text-light);">Casa de acero con excelente relación calidad-precio. Resistente y duradera.</p><br><p style="line-height: 1.8; color: var(--text-light);">Con <strong>3 habitaciones y 2 baños</strong> en 90 m², ideal para familias que buscan economía sin renunciar a calidad.</p>'
    },
    'las-rozas': {
        'title': 'Modelo Las Rozas 110m²',
        'price_display': '75.000€ <span style="font-size: 1rem; color: var(--text-light); font-weight: 400;">(IVA no incluido)</span>',
        'area': '110',
        'bedrooms': '3',
        'bathrooms': '2',
        'delivery': 'Entrega 3 meses',
        'main_image': 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
        'tags': '<span style="background: white; color: var(--primary); padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600; border: 2px solid var(--primary);">Modular</span><span style="background: #eff6ff; color: #2563eb; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">Familiar</span>',
        'description': '<p style="line-height: 1.8; color: var(--text-light);">Casa modular diseñada para el confort familiar con espacios bien distribuidos.</p><br><p style="line-height: 1.8; color: var(--text-light);">Con <strong>3 habitaciones y 2 baños</strong> en 110 m², perfecta para familias que buscan calidad de vida.</p>'
    }
}

product_template = '''
    <!-- Product Detail Section -->
    <div class="container" style="padding: 140px 20px 80px; max-width: 1400px;">
        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 50px;">
            
            <!-- Left Column: Gallery & Info -->
            <div>
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <div style="border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 500px;">
                        <img src="{main_image}" alt="{title}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
                        <div style="border-radius: 12px; overflow: hidden; cursor: pointer; height: 100px; opacity: 1; box-shadow: 0 0 0 3px var(--primary);">
                            <img src="{main_image}" alt="Vista Principal" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="border-radius: 12px; overflow: hidden; cursor: pointer; height: 100px; opacity: 0.7;">
                            <img src="{main_image}" alt="Vista 2" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="border-radius: 12px; overflow: hidden; cursor: pointer; height: 100px; opacity: 0.7;">
                            <img src="{main_image}" alt="Vista 3" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="border-radius: 12px; overflow: hidden; cursor: pointer; height: 100px; opacity: 0.7;">
                            <img src="{main_image}" alt="Vista 4" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                    </div>
                </div>

                <div style="margin-top: 40px;">
                    <div style="display: flex; gap: 10px; margin-bottom: 30px;">
                        {tags}
                    </div>
                    <h1 style="font-size: 2.5rem; color: var(--secondary); margin-bottom: 10px; line-height: 1.2;">{title}</h1>
                    <div style="font-size: 2rem; color: var(--primary); font-weight: 800; margin-bottom: 20px;">{price_display}</div>

                    <div style="background: #f8fafc; padding: 30px; border-radius: 16px; margin-bottom: 30px;">
                        <h3 style="margin-bottom: 20px; color: var(--secondary);"><i class="fa-solid fa-list-check"></i> Características Principales</h3>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                            <div style="display: flex; align-items: center; gap: 10px;"><i class="fa-solid fa-ruler-combined" style="color: var(--primary);"></i> {area} m² construidos</div>
                            <div style="display: flex; align-items: center; gap: 10px;"><i class="fa-solid fa-bed" style="color: var(--primary);"></i> {bedrooms} Habitaciones</div>
                            <div style="display: flex; align-items: center; gap: 10px;"><i class="fa-solid fa-bath" style="color: var(--primary);"></i> {bathrooms} Baño(s)</div>
                            <div style="display: flex; align-items: center; gap: 10px;"><i class="fa-solid fa-clock" style="color: var(--primary);"></i> {delivery}</div>
                            <div style="display: flex; align-items: center; gap: 10px;"><i class="fa-solid fa-shield-halved" style="color: var(--primary);"></i> Alta durabilidad</div>
                            <div style="display: flex; align-items: center; gap: 10px;"><i class="fa-solid fa-leaf" style="color: var(--primary);"></i> Eficiencia energética</div>
                        </div>
                    </div>

                    <div>
                        <h3 style="margin-bottom: 15px; color: var(--secondary);">Descripción del Modelo</h3>
                        {description}
                    </div>
                </div>
            </div>

            <!-- Right Column: Contact Form -->
            <div>
                <div style="background: white; padding: 30px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: sticky; top: 140px;">
                    <h3 style="margin-bottom: 10px;">Contactar Fabricante</h3>
                    <p style="margin-bottom: 20px; font-size: 0.9rem; color: var(--text-light);">
                        Solicita más información o un presupuesto personalizado.
                    </p>
                    <form onsubmit="event.preventDefault(); sendLead();">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nombre Completo</label>
                            <input type="text" id="leadName" placeholder="Tu nombre" style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Email</label>
                            <input type="email" id="leadEmail" placeholder="tu@email.com" style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Teléfono</label>
                            <input type="tel" id="leadPhone" placeholder="+34 600 000 000" style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Mensaje</label>
                            <textarea id="leadMessage" rows="4" placeholder="Hola, estoy interesado en {title}..." style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Enviar Solicitud</button>
                        <p style="margin-top: 15px; font-size: 0.8rem; text-align: center; color: var(--text-light);">
                            Al enviar aceptas nuestra política de privacidad.
                        </p>
                    </form>
                </div>
            </div>

        </div>
    </div>

    <!-- Footer -->
    <footer style="background: var(--secondary); color: white; padding: 40px 0; text-align: center;">
        <div class="container">
            <p>&copy; 2024 Prehouses. Todos los derechos reservados.</p>
        </div>
    </footer>
'''

sendlead_function = '''
        async function sendLead() {
            const name = document.getElementById('leadName').value.trim();
            const email = document.getElementById('leadEmail').value.trim();
            const phone = document.getElementById('leadPhone').value.trim();
            const message = document.getElementById('leadMessage').value.trim();

            if (!name || !email || !phone || !message) {
                alert('Por favor, rellena todos los campos.');
                return;
            }

            try {
                await db.collection('leads').add({
                    userId: currentUser ? currentUser.uid : null,
                    userName: name,
                    userEmail: email,
                    userPhone: phone,
                    message: message,
                    houseId: houseId,
                    houseTitle: currentHouse.title,
                    companyId: currentHouse.companyId,
                    status: 'new',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                alert('Solicitud enviada! Nos pondremos en contacto contigo pronto.');
                document.getElementById('leadMessage').value = '';
            } catch (error) {
                console.error(error);
                alert('Error al enviar. Intentalo de nuevo.');
            }
        }
'''

for house_key, data in products.items():
    filename = f'detalle-casa-{house_key}.html'
    filepath = f'c:/Users/Gerard/.gemini/antigravity/playground/volatile-meteoroid/{filename}'
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Insert product HTML before the first script tag after mobile menu
        pattern = r'(</div>\s*<script>)'
        product_html = product_template.format(**data)
        new_content = re.sub(pattern, '</div>\n' + product_html + '\n    <script>', content, count=1)
        
        # Add sendLead function before the closing script tag
        pattern2 = r'(</script>\s*</body>)'
        new_content = re.sub(pattern2, sendlead_function + '\n    </script>\n</body>', new_content, count=1)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f'[OK] Fixed {filename}')
    except Exception as e:
        print(f'[ERROR] {filename}: {e}')

print('\n[DONE] Fiscal and Las Rozas pages fixed!')
