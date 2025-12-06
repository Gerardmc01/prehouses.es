// Support Widget Logic
document.addEventListener('DOMContentLoaded', () => {
    injectSupportWidget();
});

function injectSupportWidget() {
    // Create styles
    const style = document.createElement('style');
    style.textContent = `
        .support-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: #2563eb;
            color: white;
            border-radius: 50%;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            z-index: 9999;
            transition: all 0.3s;
            border: none;
        }

        .support-btn:hover {
            transform: scale(1.1);
            background: #1d4ed8;
        }

        .support-modal {
            display: none;
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 350px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            z-index: 9999;
            overflow: hidden;
            animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .support-header {
            background: #2563eb;
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .support-body {
            padding: 20px;
        }

        .support-input {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-family: inherit;
        }

        .support-submit {
            width: 100%;
            padding: 12px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
        }

        .support-submit:hover {
            background: #1d4ed8;
        }
    `;
    document.head.appendChild(style);

    // Create Button
    const btn = document.createElement('button');
    btn.className = 'support-btn';
    btn.innerHTML = '<i class="fa-solid fa-headset"></i>';
    btn.onclick = toggleSupportModal;
    document.body.appendChild(btn);

    // Create Modal
    const modal = document.createElement('div');
    modal.className = 'support-modal';
    modal.id = 'supportModal';
    modal.innerHTML = `
        <div class="support-header">
            <h3 style="margin:0; font-size: 1.1rem;">Soporte Prehouses</h3>
            <button onclick="toggleSupportModal()" style="background:none; border:none; color:white; cursor:pointer;">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
        <div class="support-body">
            <p style="margin-bottom: 15px; font-size: 0.9rem; color: #64748b;">
                ¿Tienes algún problema? Cuéntanos y lo solucionaremos.
            </p>
            <form onsubmit="submitTicket(event)">
                <select class="support-input" id="ticketType" required>
                    <option value="bug">🐛 Reportar Error</option>
                    <option value="help">❓ Ayuda / Consulta</option>
                    <option value="suggestion">💡 Sugerencia</option>
                </select>
                <textarea class="support-input" id="ticketMessage" rows="4" placeholder="Describe el problema..." required></textarea>
                <input type="email" class="support-input" id="ticketEmail" placeholder="Tu email de contacto" required>
                <button type="submit" class="support-submit">Enviar Ticket</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function toggleSupportModal() {
    const modal = document.getElementById('supportModal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        // Auto-fill email if logged in
        if (firebase.auth().currentUser) {
            document.getElementById('ticketEmail').value = firebase.auth().currentUser.email;
        }
    }
}

async function submitTicket(event) {
    event.preventDefault();
    const type = document.getElementById('ticketType').value;
    const message = document.getElementById('ticketMessage').value;
    const email = document.getElementById('ticketEmail').value;
    const btn = event.target.querySelector('button');

    const originalText = btn.innerText;
    btn.innerText = 'Enviando...';
    btn.disabled = true;

    try {
        await db.collection('tickets').add({
            type,
            message,
            email,
            status: 'new',
            url: window.location.href,
            userId: firebase.auth().currentUser ? firebase.auth().currentUser.uid : 'anonymous',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert('✅ Ticket enviado correctamente. Te contactaremos pronto.');
        toggleSupportModal();
        event.target.reset();
    } catch (error) {
        console.error('Error sending ticket:', error);
        alert('❌ Error al enviar el ticket. Inténtalo de nuevo.');
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}
