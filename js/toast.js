// Toast Notification System for Prehouses
// Modern, non-intrusive notifications

// CSS to add to styles.css or inline
const toastStyles = `
<style>
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.toast {
    background: white;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 300px;
    max-width: 400px;
    animation: slideIn 0.3s ease-out;
    border-left: 4px solid;
}

.toast.success {
    border-left-color: #16a34a;
}

.toast.error {
    border-left-color: #dc2626;
}

.toast.warning {
    border-left-color: #f59e0b;
}

.toast.info {
    border-left-color: #2563eb;
}

.toast-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
}

.toast.success .toast-icon {
    color: #16a34a;
}

.toast.error .toast-icon {
    color: #dc2626;
}

.toast.warning .toast-icon {
    color: #f59e0b;
}

.toast.info .toast-icon {
    color: #2563eb;
}

.toast-content {
    flex: 1;
}

.toast-title {
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--secondary);
}

.toast-message {
    font-size: 0.9rem;
    color: var(--text-light);
}

.toast-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: var(--text-light);
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background 0.2s;
}

.toast-close:hover {
    background: rgba(0,0,0,0.05);
}

@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(400px);
        opacity: 0;
    }
}

.toast.removing {
    animation: slideOut 0.3s ease-in forwards;
}

@media (max-width: 768px) {
    .toast-container {
        top: 10px;
        right: 10px;
        left: 10px;
    }
    
    .toast {
        min-width: auto;
        max-width: none;
    }
}
</style>
`;

// Toast Manager Class
class ToastManager {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        // Add styles
        if (!document.getElementById('toast-styles')) {
            const styleEl = document.createElement('div');
            styleEl.id = 'toast-styles';
            styleEl.innerHTML = toastStyles;
            document.head.appendChild(styleEl);
        }

        // Create container
        if (!document.querySelector('.toast-container')) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        } else {
            this.container = document.querySelector('.toast-container');
        }
    }

    show(type, title, message, duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '<i class="fa-solid fa-circle-check"></i>',
            error: '<i class="fa-solid fa-circle-xmark"></i>',
            warning: '<i class="fa-solid fa-triangle-exclamation"></i>',
            info: '<i class="fa-solid fa-circle-info"></i>'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                ${message ? `<div class="toast-message">${message}</div>` : ''}
            </div>
            <button class="toast-close" onclick="this.closest('.toast').remove()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

        this.container.appendChild(toast);

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                toast.classList.add('removing');
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }

        return toast;
    }

    success(title, message, duration) {
        return this.show('success', title, message, duration);
    }

    error(title, message, duration) {
        return this.show('error', title, message, duration);
    }

    warning(title, message, duration) {
        return this.show('warning', title, message, duration);
    }

    info(title, message, duration) {
        return this.show('info', title, message, duration);
    }

    clear() {
        this.container.innerHTML = '';
    }
}

// Create global instance
const toast = new ToastManager();

// Usage Examples:
/*
// Success
toast.success('¡Éxito!', 'Casa publicada correctamente');

// Error
toast.error('Error', 'No se pudo guardar los cambios');

// Warning
toast.warning('Atención', 'Debes completar todos los campos');

// Info
toast.info('Información', 'Tu cuenta está pendiente de aprobación');

// Custom duration (in milliseconds)
toast.success('Guardado', 'Cambios guardados correctamente', 3000);

// Persistent (no auto-close)
toast.error('Error crítico', 'Contacta con soporte', 0);

// Clear all toasts
toast.clear();
*/

// Replace all alert() calls with toast
// Example migration:
/*
// Before:
alert('Casa publicada correctamente');

// After:
toast.success('¡Éxito!', 'Casa publicada correctamente');

// Before:
alert('Error al guardar');

// After:
toast.error('Error', 'No se pudo guardar los cambios');
*/
