import re

# Template HTML content for product detail pages
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

# Product data for each house
products = {
    'nordic': {
        'title': 'Modelo Nordic Eco 80m²',
        'price_display': '45.000€ <span style="font-size: 1rem; color: var(--text-light); font-weight: 400;">(IVA no incluido)</span>',
        'area': '80',
        'bedrooms': '2',
        'bathrooms': '1',
        'delivery': 'Entrega 2 meses',
        'main_image': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'tags': '<span style="background: white; color: var(--primary); padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600; border: 2px solid var(--primary);">Madera</span><span style="background: #f0fdf4; color: #16a34a; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">Ecológica</span>',
        'description': '<p style="line-height: 1.8; color: var(--text-light);">Casa prefabricada de madera con diseño nórdico moderno. Perfecta para quienes buscan una vivienda sostenible y acogedora.</p><br><p style="line-height: 1.8; color: var(--text-light);">Con <strong>2 habitaciones y 1 baño</strong> en 80 m², ideal para parejas o pequeñas familias que valoran la naturaleza.</p>'
    },
    'elite': {
        'title': 'Residencia Elite 200m²',
        'price_display': '150.000€ <span style="font-size: 1rem; color: var(--text-light); font-weight: 400;">(IVA no incluido)</span>',
        'area': '200',
        'bedrooms': '5',
        'bathrooms': '3',
        'delivery': 'Entrega 6 meses',
        'main_image': 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80',
        'tags': '<span style="background: white; color: var(--primary); padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600; border: 2px solid var(--primary);">Hormigón</span><span style="background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">Premium</span>',
        'description': '<p style="line-height: 1.8; color: var(--text-light);">Residencia de lujo en hormigón con acabados premium. Diseñada para quienes no renuncian a nada.</p><br><p style="line-height: 1.8; color: var(--text-light);">Con <strong>5 habitaciones y 3 baños</strong> distribuidos en 200 m², perfecta para familias grandes que buscan el máximo confort.</p>'
    },
    'horizon': {
        'title': 'Casa Horizon 120m²',
        'price_display': '85.000€ <span style="font-size: 1rem; color: var(--text-light); font-weight: 400;">(IVA no incluido)</span>',
        'area': '120',
        'bedrooms': '3',
        'bathrooms': '2',
        'delivery': 'Entrega 4 meses',
        'main_image': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'tags': '<span style="background: white; color: var(--primary); padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600; border: 2px solid var(--primary);">Modular</span><span style="background: #eff6ff; color: #2563eb; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">Familiar</span>',
        'description': '<p style="line-height: 1.8; color: var(--text-light);">Casa modular con diseño contemporáneo y espacios amplios. Perfecta para familias modernas.</p><br><p style="line-height: 1.8; color: var(--text-light);">Con <strong>3 habitaciones y 2 baños</strong> en 120 m², ofrece el equilibrio perfecto entre espacio y funcionalidad.</p>'
    },
    'tiny': {
        'title': 'Tiny House 35m²',
        'price_display': '28.000€ <span style="font-size: 1rem; color: var(--text-light); font-weight: 400;">(IVA no incluido)</span>',
        'area': '35',
        'bedrooms': '1',
        'bathrooms': '1',
        'delivery': 'Entrega 1 mes',
        'main_image': 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=1200&q=80',
        'tags': '<span style="background: white; color: var(--primary); padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600; border: 2px solid var(--primary);">Madera</span><span style="background: #f0fdf4; color: #16a34a; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">Compacta</span>',
        'description': '<p style="line-height: 1.8; color: var(--text-light);">Tiny House perfecta para vida minimalista. Diseño inteligente que aprovecha cada metro cuadrado.</p><br><p style="line-height: 1.8; color: var(--text-light);">Con <strong>1 habitación y 1 baño</strong> en solo 35 m², ideal para solteros o parejas que buscan simplicidad.</p>'
    },
    'villa': {
        'title': 'Villa Mediterránea 180m²',
        'price_display': '120.000€ <span style="font-size: 1rem; color: var(--text-light); font-weight: 400;">(IVA no incluido)</span>',
        'area': '180',
        'bedrooms': '4',
        'bathrooms': '3',
        'delivery': 'Entrega 5 meses',
        'main_image': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'tags': '<span style="background: white; color: var(--primary); padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600; border: 2px solid var(--primary);">Hormigón</span><span style="background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">Mediterránea</span>',
        'description': '<p style="line-height: 1.8; color: var(--text-light);">Villa de estilo mediterráneo con amplias terrazas y espacios luminosos.</p><br><p style="line-height: 1.8; color: var(--text-light);">Con <strong>4 habitaciones y 3 baños</strong> en 180 m², perfecta para disfrutar del clima mediterráneo.</p>'
    },
    'wood': {
        'title': 'Casa Wood Premium 150m²',
        'price_display': '95.000€ <span style="font-size: 1rem; color: var(--text-light); font-weight: 400;">(IVA no incluido)</span>',
        'area': '150',
        'bedrooms': '4',
        'bathrooms': '2',
        'delivery': 'Entrega 3 meses',
        'main_image': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'tags': '<span style="background: white; color: var(--primary); padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600; border: 2px solid var(--primary);">Madera</span><span style="background: #f0fdf4; color: #16a34a; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">Premium</span>',
        'description': '<p style="line-height: 1.8; color: var(--text-light);">Casa de madera premium con acabados de alta calidad y diseño elegante.</p><br><p style="line-height: 1.8; color: var(--text-light);">Con <strong>4 habitaciones y 2 baños</strong> en 150 m², combina calidez natural con confort moderno.</p>'
    },
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
    },
    'mh-diseno': {
        'title': 'Mobile Home Diseño 60m²',
        'price_display': '38.000€ <span style="font-size: 1rem; color: var(--text-light); font-weight: 400;">(IVA no incluido)</span>',
        'area': '60',
        'bedrooms': '2',
        'bathrooms': '1',
        'delivery': 'Entrega 1 mes',
        'main_image': 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80',
        'tags': '<span style="background: white; color: var(--primary); padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600; border: 2px solid var(--primary);">Mobile Home</span><span style="background: #eff6ff; color: #2563eb; padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">Versátil</span>',
        'description': '<p style="line-height: 1.8; color: var(--text-light);">Mobile Home con diseño moderno y funcional. Perfecta para terrenos de camping o segunda residencia.</p><br><p style="line-height: 1.8; color: var(--text-light);">Con <strong>2 habitaciones y 1 baño</strong> en 60 m², ofrece movilidad sin renunciar al confort.</p>'
    }
}

# Process each file
for house_key, data in products.items():
    filename = f'detalle-casa-{house_key}.html'
    filepath = f'c:/Users/Gerard/.gemini/antigravity/playground/volatile-meteoroid/{filename}'
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find where to insert (after mobile menu closing div, before first script tag)
        pattern = r'(</div>\s*</div>\s*<script>)'
        
        # Generate product HTML from template
        product_html = product_template.format(**data)
        
        # Insert the product content
        new_content = re.sub(pattern, r'</div>\n' + product_html + '\n    <script>', content, count=1)
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f'[OK] Updated {filename}')
    except Exception as e:
        print(f'[ERROR] Error with {filename}: {e}')

print('\n[DONE] All product pages updated!')
