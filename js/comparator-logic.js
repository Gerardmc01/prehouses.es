// js/comparator-logic.js

// Initialize
if (!localStorage.getItem('comparisonList')) {
    localStorage.setItem('comparisonList', JSON.stringify([]));
}

// Add to comparison
function addToComparison(house) {
    let list = JSON.parse(localStorage.getItem('comparisonList') || '[]');

    // Check dupe
    if (list.find(h => h.id === house.id)) {
        showToast('Esta casa ya está en el comparador', 'info');
        return;
    }

    // Check limit
    if (list.length >= 3) {
        showToast('Máximo 3 casas para comparar. Elimina una primero.', 'error');
        return;
    }

    // Add formatted
    list.push({
        id: house.id,
        title: house.title,
        price: parseInt(house.price).toLocaleString() + '€',
        image: Array.isArray(house.images) ? house.images[0] : (house.image || ''),
        area: house.area + 'm²',
        rooms: house.bedrooms + ' Hab',
        baths: house.bathrooms + ' Baños',
        category: house.category,
        link: `detalle-casa.html?id=${house.id}`
    });

    localStorage.setItem('comparisonList', JSON.stringify(list));
    showToast('Añadido al comparador', 'success');
    updateFloatingBar();
}

// Remove
function removeFromComparison(id) {
    let list = JSON.parse(localStorage.getItem('comparisonList') || '[]');
    list = list.filter(item => item.id !== id);
    localStorage.setItem('comparisonList', JSON.stringify(list));
    updateFloatingBar();

    // If on comparator page, call renderTable if it exists (it's defined in comparador.html)
    if (typeof renderTable === 'function') {
        renderTable();
    }
}

// Floating Bar Logic
function updateFloatingBar() {
    let list = JSON.parse(localStorage.getItem('comparisonList') || '[]');
    let bar = document.getElementById('comparisonFloatingBar');

    if (list.length > 0 && !window.location.pathname.includes('comparador.html')) {
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'comparisonFloatingBar';
            bar.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background:white;
                padding: 15px 30px;
                border-radius: 50px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 20px;
                border: 1px solid var(--primary);
                animation: slideUp 0.3s ease-out;
            `;
            // Add keyframes if not exists
            if (!document.getElementById('slideUpStyle')) {
                const style = document.createElement('style');
                style.id = 'slideUpStyle';
                style.innerHTML = `@keyframes slideUp { from { transform: translate(-50%, 100%); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }`;
                document.head.appendChild(style);
            }
            document.body.appendChild(bar);
        }
        bar.innerHTML = `
            <span style="font-weight:600; color:var(--primary);">${list.length} casa(s) seleccionada(s)</span>
            <a href="comparador.html" class="btn btn-sm btn-primary" style="text-decoration:none;">Comparar Ahora</a>
            <button onclick="clearComparison()" style="background:none; border:none; cursor:pointer; color:#ef4444; font-size:1.2rem;"><i class="fa-solid fa-times"></i></button>
        `;
        bar.style.display = 'flex';
    } else if (bar) {
        bar.style.display = 'none';
    }
}

function clearComparison() {
    localStorage.setItem('comparisonList', '[]');
    updateFloatingBar();
}

// Run on load
document.addEventListener('DOMContentLoaded', updateFloatingBar);
