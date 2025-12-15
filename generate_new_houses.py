import random

# Generate 10 more house cards for the catalog
new_houses = [
    {
        'id': 'casa-moderna-120',
        'title': 'Casa Moderna 120m²',
        'price': '78000',
        'area': '120',
        'bedrooms': '3',
        'bathrooms': '2',
        'category': 'modular',
        'badge': 'Modular',
        'badge_color': '#2563eb',
        'image': 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=800&q=80'
    },
    {
        'id': 'casa-container-45',
        'title': 'Casa Container 45m²',
        'price': '32000',
        'area': '45',
        'bedrooms': '1',
        'bathrooms': '1',
        'category': 'container',
        'badge': 'Container',
        'badge_color': '#dc2626',
        'image': 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=800&q=80'
    },
    {
        'id': 'villa-lujo-250',
        'title': 'Villa de Lujo 250m²',
        'price': '195000',
        'area': '250',
        'bedrooms': '5',
        'bathrooms': '4',
        'category': 'hormigon',
        'badge': 'Premium',
        'badge_color': '#9333ea',
        'image': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
    },
    {
        'id': 'casa-acero-100',
        'title': 'Casa Acero Industrial 100m²',
        'price': '58000',
        'area': '100',
        'bedrooms': '2',
        'bathrooms': '2',
        'category': 'acero',
        'badge': 'Acero',
        'badge_color': '#64748b',
        'image': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    },
    {
        'id': 'casa-ecologica-95',
        'title': 'Casa Ecológica 95m²',
        'price': '67000',
        'area': '95',
        'bedrooms': '3',
        'bathrooms': '1',
        'category': 'ecologica',
        'badge': 'Ecológica',
        'badge_color': '#16a34a',
        'image': 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80'
    },
    {
        'id': 'mobile-home-premium-70',
        'title': 'Mobile Home Premium 70m²',
        'price': '45000',
        'area': '70',
        'bedrooms': '2',
        'bathrooms': '2',
        'category': 'movil',
        'badge': 'Mobile Home',
        'badge_color': '#f59e0b',
        'image': 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80'
    },
    {
        'id': 'casa-madera-rustica-130',
        'title': 'Casa Madera Rústica 130m²',
        'price': '82000',
        'area': '130',
        'bedrooms': '4',
        'bathrooms': '2',
        'category': 'madera',
        'badge': 'Madera',
        'badge_color': '#92400e',
        'image': 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'
    },
    {
        'id': 'casa-minimalista-85',
        'title': 'Casa Minimalista 85m²',
        'price': '54000',
        'area': '85',
        'bedrooms': '2',
        'bathrooms': '1',
        'category': 'modular',
        'badge': 'Minimalista',
        'badge_color': '#0891b2',
        'image': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    },
    {
        'id': 'casa-familiar-160',
        'title': 'Casa Familiar 160m²',
        'price': '98000',
        'area': '160',
        'bedrooms': '4',
        'bathrooms': '3',
        'category': 'hormigon',
        'badge': 'Familiar',
        'badge_color': '#2563eb',
        'image': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
    },
    {
        'id': 'tiny-house-deluxe-40',
        'title': 'Tiny House Deluxe 40m²',
        'price': '35000',
        'area': '40',
        'bedrooms': '1',
        'bathrooms': '1',
        'category': 'movil',
        'badge': 'Tiny House',
        'badge_color': '#ec4899',
        'image': 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=800&q=80'
    }
]

# Generate HTML for new house cards
html_cards = []
for house in new_houses:
    card_html = f'''
                <!-- {house['title']} -->
                <a href="detalle-casa.html?id={house['id']}" class="house-card" data-category="{house['category']}" data-price="{house['price']}"
                    style="text-decoration: none; color: inherit;">
                    <div class="house-image">
                        <span class="house-badge" style="background: {house['badge_color']}; color: white;">{house['badge']}</span>
                        <img src="{house['image']}" alt="{house['title']}">
                    </div>
                    <div class="house-content">
                        <div class="house-header">
                            <div class="house-price">{house['price']}€</div>
                        </div>
                        <h3 class="house-title">{house['title']}</h3>
                        <div class="house-specs">
                            <span><i class="fa-solid fa-ruler-combined"></i> {house['area']}m²</span>
                            <span><i class="fa-solid fa-bed"></i> {house['bedrooms']} Hab</span>
                            <span><i class="fa-solid fa-bath"></i> {house['bathrooms']} Baño</span>
                        </div>
                        <div class="house-footer">
                            <span class="btn btn-outline" style="width: 100%; text-align: center; display: block;">Ver Ficha Completa</span>
                        </div>
                    </div>
                </a>
'''
    html_cards.append(card_html)

# Save to file
with open('c:/Users/Gerard/.gemini/antigravity/playground/volatile-meteoroid/new_houses_html.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(html_cards))

print(f'[OK] Generated {len(new_houses)} new house cards')
print('[INFO] HTML saved to new_houses_html.txt')
print('[NEXT] Add these cards to catalogo.html after line 543 (after existing houses)')
