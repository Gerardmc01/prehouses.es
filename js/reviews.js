// Reviews System for Prehouses
// Add this to any product detail page

// HTML to add in product detail pages (after description):
/*
<div class="reviews-section" style="margin-top: 60px;">
    <h2 style="margin-bottom: 30px; color: var(--secondary);">
        <i class="fa-solid fa-star"></i> Valoraciones y Opiniones
    </h2>
    
    <!-- Average Rating -->
    <div class="rating-summary" style="background: #f8fafc; padding: 30px; border-radius: 16px; margin-bottom: 30px;">
        <div style="display: flex; align-items: center; gap: 30px;">
            <div style="text-align: center;">
                <div style="font-size: 3rem; font-weight: 800; color: var(--primary);" id="avgRating">0.0</div>
                <div class="stars" id="avgStars"></div>
                <div style="color: var(--text-light); margin-top: 5px;" id="totalReviews">0 valoraciones</div>
            </div>
            <div style="flex: 1;">
                <div id="ratingBars"></div>
            </div>
        </div>
    </div>

    <!-- Write Review Button -->
    <button onclick="openReviewModal()" class="btn btn-primary" style="margin-bottom: 30px;">
        <i class="fa-solid fa-pen"></i> Escribir Valoración
    </button>

    <!-- Reviews List -->
    <div id="reviewsList"></div>
</div>

<!-- Review Modal -->
<div id="reviewModal" class="modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 2000; align-items: center; justify-content: center;">
    <div class="modal-content" style="background: white; padding: 40px; border-radius: 20px; width: 90%; max-width: 600px; position: relative;">
        <span onclick="closeReviewModal()" style="position: absolute; top: 15px; right: 20px; cursor: pointer; font-size: 1.5rem;">&times;</span>
        <h2 style="margin-bottom: 20px;">Escribe tu Valoración</h2>
        <form id="reviewForm" onsubmit="submitReview(event)">
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; font-weight: 600;">Puntuación</label>
                <div class="rating-input" style="font-size: 2rem;">
                    <i class="fa-regular fa-star" data-rating="1" onclick="setRating(1)"></i>
                    <i class="fa-regular fa-star" data-rating="2" onclick="setRating(2)"></i>
                    <i class="fa-regular fa-star" data-rating="3" onclick="setRating(3)"></i>
                    <i class="fa-regular fa-star" data-rating="4" onclick="setRating(4)"></i>
                    <i class="fa-regular fa-star" data-rating="5" onclick="setRating(5)"></i>
                </div>
                <input type="hidden" id="ratingValue" required>
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; font-weight: 600;">Título</label>
                <input type="text" id="reviewTitle" required placeholder="Resumen de tu experiencia" style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; font-weight: 600;">Comentario</label>
                <textarea id="reviewComment" required rows="5" placeholder="Cuéntanos tu experiencia con esta casa..." style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Publicar Valoración</button>
        </form>
    </div>
</div>
*/

// JavaScript Functions
let selectedRating = 0;

function setRating(rating) {
    selectedRating = rating;
    document.getElementById('ratingValue').value = rating;

    const stars = document.querySelectorAll('.rating-input i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.className = 'fa-solid fa-star';
            star.style.color = '#fbbf24';
        } else {
            star.className = 'fa-regular fa-star';
            star.style.color = '#d1d5db';
        }
    });
}

function openReviewModal() {
    if (!currentUser) {
        alert('Debes iniciar sesión para escribir una valoración');
        window.location.href = 'usuarios.html';
        return;
    }
    document.getElementById('reviewModal').style.display = 'flex';
}

function closeReviewModal() {
    document.getElementById('reviewModal').style.display = 'none';
    document.getElementById('reviewForm').reset();
    selectedRating = 0;
    setRating(0);
}

async function submitReview(event) {
    event.preventDefault();

    if (!currentUser) {
        alert('Debes iniciar sesión');
        return;
    }

    if (selectedRating === 0) {
        alert('Por favor, selecciona una puntuación');
        return;
    }

    const title = document.getElementById('reviewTitle').value.trim();
    const comment = document.getElementById('reviewComment').value.trim();

    try {
        // Get user data
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        const userData = userDoc.data();

        // Save review
        await db.collection('reviews').add({
            houseId: houseId,
            houseTitle: currentHouse.title,
            userId: currentUser.uid,
            userName: userData.displayName || currentUser.email.split('@')[0],
            userEmail: currentUser.email,
            rating: selectedRating,
            title: title,
            comment: comment,
            verified: false, // Admin can verify later
            helpful: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert('✅ ¡Valoración publicada! Gracias por tu opinión.');
        closeReviewModal();
        loadReviews(); // Reload reviews

    } catch (error) {
        console.error('Error submitting review:', error);
        alert('❌ Error al publicar la valoración. Inténtalo de nuevo.');
    }
}

async function loadReviews() {
    try {
        const reviewsSnap = await db.collection('reviews')
            .where('houseId', '==', houseId)
            .orderBy('createdAt', 'desc')
            .get();

        const reviews = [];
        reviewsSnap.forEach(doc => {
            reviews.push({ id: doc.id, ...doc.data() });
        });

        // Calculate average rating
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
            const avgRating = (totalRating / reviews.length).toFixed(1);

            document.getElementById('avgRating').textContent = avgRating;
            document.getElementById('totalReviews').textContent = `${reviews.length} valoracion${reviews.length !== 1 ? 'es' : ''}`;

            // Display stars
            document.getElementById('avgStars').innerHTML = generateStars(parseFloat(avgRating));

            // Rating distribution
            const distribution = [0, 0, 0, 0, 0];
            reviews.forEach(r => distribution[r.rating - 1]++);

            let barsHTML = '';
            for (let i = 4; i >= 0; i--) {
                const percentage = reviews.length > 0 ? (distribution[i] / reviews.length * 100) : 0;
                barsHTML += `
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                        <span style="width: 60px;">${i + 1} estrellas</span>
                        <div style="flex: 1; background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
                            <div style="width: ${percentage}%; background: var(--primary); height: 100%;"></div>
                        </div>
                        <span style="width: 40px; text-align: right; color: var(--text-light);">${distribution[i]}</span>
                    </div>
                `;
            }
            document.getElementById('ratingBars').innerHTML = barsHTML;
        }

        // Display reviews
        let reviewsHTML = '';
        reviews.forEach(review => {
            const date = review.createdAt ? new Date(review.createdAt.toDate()).toLocaleDateString('es-ES') : 'Reciente';
            reviewsHTML += `
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                        <div>
                            <div style="font-weight: 600; color: var(--secondary); margin-bottom: 5px;">${review.userName}</div>
                            <div style="font-size: 0.9rem; color: var(--text-light);">${date}</div>
                        </div>
                        <div>${generateStars(review.rating)}</div>
                    </div>
                    <h4 style="margin-bottom: 10px; color: var(--secondary);">${review.title}</h4>
                    <p style="color: var(--text-light); line-height: 1.6;">${review.comment}</p>
                    ${review.verified ? '<span style="color: #16a34a; font-size: 0.9rem;"><i class="fa-solid fa-check-circle"></i> Compra verificada</span>' : ''}
                </div>
            `;
        });

        document.getElementById('reviewsList').innerHTML = reviewsHTML || '<p style="text-align: center; color: var(--text-light); padding: 40px;">Aún no hay valoraciones. ¡Sé el primero en opinar!</p>';

    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

function generateStars(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += '<i class="fa-solid fa-star" style="color: #fbbf24;"></i>';
        } else if (i - 0.5 <= rating) {
            starsHTML += '<i class="fa-solid fa-star-half-stroke" style="color: #fbbf24;"></i>';
        } else {
            starsHTML += '<i class="fa-regular fa-star" style="color: #d1d5db;"></i>';
        }
    }
    return starsHTML;
}

// Call this on page load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof houseId !== 'undefined') {
        loadReviews();
    }
});
