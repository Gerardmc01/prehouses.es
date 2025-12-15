// Input Validators for Prehouses
// Client-side validation functions

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate Spanish phone number
 * @param {string} phone - Phone to validate
 * @returns {boolean} Is valid
 */
function isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    // Spanish mobile: 6XX XXX XXX or 7XX XXX XXX (9 digits)
    // Spanish landline: 9XX XXX XXX (9 digits)
    return /^[679]\d{8}$/.test(cleaned);
}

/**
 * Validate Spanish CIF/NIF
 * @param {string} cif - CIF/NIF to validate
 * @returns {boolean} Is valid
 */
function isValidCIF(cif) {
    if (!cif || cif.length < 9) return false;

    const cifRegex = /^[ABCDEFGHJNPQRSUVW]\d{7}[0-9A-J]$/;
    const nifRegex = /^\d{8}[A-Z]$/;
    const nieRegex = /^[XYZ]\d{7}[A-Z]$/;

    return cifRegex.test(cif) || nifRegex.test(cif) || nieRegex.test(cif);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with strength and errors
 */
function validatePassword(password) {
    const result = {
        isValid: true,
        strength: 0,
        errors: []
    };

    if (!password) {
        result.isValid = false;
        result.errors.push('La contraseña es obligatoria');
        return result;
    }

    if (password.length < 8) {
        result.isValid = false;
        result.errors.push('Mínimo 8 caracteres');
    } else {
        result.strength += 1;
    }

    if (!/[a-z]/.test(password)) {
        result.errors.push('Debe contener minúsculas');
    } else {
        result.strength += 1;
    }

    if (!/[A-Z]/.test(password)) {
        result.errors.push('Debe contener mayúsculas');
    } else {
        result.strength += 1;
    }

    if (!/\d/.test(password)) {
        result.errors.push('Debe contener números');
    } else {
        result.strength += 1;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        result.errors.push('Debe contener caracteres especiales');
    } else {
        result.strength += 1;
    }

    result.isValid = result.errors.length === 0;

    return result;
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate price (positive number)
 * @param {number|string} price - Price to validate
 * @returns {boolean} Is valid
 */
function isValidPrice(price) {
    const num = parseFloat(price);
    return !isNaN(num) && num > 0;
}

/**
 * Validate area (positive number)
 * @param {number|string} area - Area in m² to validate
 * @returns {boolean} Is valid
 */
function isValidArea(area) {
    const num = parseFloat(area);
    return !isNaN(num) && num > 0 && num <= 10000; // Max 10,000 m²
}

/**
 * Validate number of rooms (0-20)
 * @param {number|string} rooms - Number of rooms
 * @returns {boolean} Is valid
 */
function isValidRooms(rooms) {
    const num = parseInt(rooms);
    return !isNaN(num) && num >= 0 && num <= 20;
}

/**
 * Validate text length
 * @param {string} text - Text to validate
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @returns {boolean} Is valid
 */
function isValidTextLength(text, minLength = 1, maxLength = 1000) {
    if (!text) return minLength === 0;
    return text.length >= minLength && text.length <= maxLength;
}

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} Is valid
 */
function isRequired(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
}

/**
 * Validate image URL
 * @param {string} url - Image URL to validate
 * @returns {boolean} Is valid
 */
function isValidImageURL(url) {
    if (!isValidURL(url)) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowerUrl.includes(ext)) ||
        lowerUrl.includes('unsplash.com') ||
        lowerUrl.includes('images');
}

/**
 * Validate year (1900-2100)
 * @param {number|string} year - Year to validate
 * @returns {boolean} Is valid
 */
function isValidYear(year) {
    const num = parseInt(year);
    return !isNaN(num) && num >= 1900 && num <= 2100;
}

/**
 * Sanitize and validate house data
 * @param {object} data - House data to validate
 * @returns {object} Validation result
 */
function validateHouseData(data) {
    const errors = [];

    if (!isRequired(data.title)) {
        errors.push('El título es obligatorio');
    } else if (!isValidTextLength(data.title, 5, 100)) {
        errors.push('El título debe tener entre 5 y 100 caracteres');
    }

    if (!isValidPrice(data.price)) {
        errors.push('El precio debe ser un número positivo');
    }

    if (!isValidArea(data.area)) {
        errors.push('La superficie debe ser un número positivo');
    }

    if (!isValidRooms(data.bedrooms)) {
        errors.push('El número de habitaciones no es válido');
    }

    if (!isValidRooms(data.bathrooms)) {
        errors.push('El número de baños no es válido');
    }

    if (!isRequired(data.category)) {
        errors.push('La categoría es obligatoria');
    }

    if (!isRequired(data.description)) {
        errors.push('La descripción es obligatoria');
    } else if (!isValidTextLength(data.description, 50, 5000)) {
        errors.push('La descripción debe tener entre 50 y 5000 caracteres');
    }

    if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
        errors.push('Debes añadir al menos una imagen');
    } else {
        data.images.forEach((url, index) => {
            if (!isValidImageURL(url)) {
                errors.push(`La imagen ${index + 1} no es una URL válida`);
            }
        });
    }

    if (data.year && !isValidYear(data.year)) {
        errors.push('El año no es válido');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Validate user registration data
 * @param {object} data - User data to validate
 * @returns {object} Validation result
 */
function validateUserData(data) {
    const errors = [];

    if (!isRequired(data.name)) {
        errors.push('El nombre es obligatorio');
    } else if (!isValidTextLength(data.name, 2, 100)) {
        errors.push('El nombre debe tener entre 2 y 100 caracteres');
    }

    if (!isValidEmail(data.email)) {
        errors.push('El email no es válido');
    }

    if (data.phone && !isValidPhone(data.phone)) {
        errors.push('El teléfono no es válido');
    }

    if (data.password) {
        const passwordValidation = validatePassword(data.password);
        if (!passwordValidation.isValid) {
            errors.push(...passwordValidation.errors);
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Validate company data
 * @param {object} data - Company data to validate
 * @returns {object} Validation result
 */
function validateCompanyData(data) {
    const errors = [];

    if (!isRequired(data.name)) {
        errors.push('El nombre de la empresa es obligatorio');
    }

    if (!isValidEmail(data.email)) {
        errors.push('El email no es válido');
    }

    if (!isValidPhone(data.phone)) {
        errors.push('El teléfono no es válido');
    }

    if (data.cif && !isValidCIF(data.cif)) {
        errors.push('El CIF/NIF no es válido');
    }

    if (data.website && !isValidURL(data.website)) {
        errors.push('El sitio web no es una URL válida');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Validate lead/contact form data
 * @param {object} data - Lead data to validate
 * @returns {object} Validation result
 */
function validateLeadData(data) {
    const errors = [];

    if (!isRequired(data.name)) {
        errors.push('El nombre es obligatorio');
    }

    if (!isValidEmail(data.email)) {
        errors.push('El email no es válido');
    }

    if (!isValidPhone(data.phone)) {
        errors.push('El teléfono no es válido');
    }

    if (!isRequired(data.message)) {
        errors.push('El mensaje es obligatorio');
    } else if (!isValidTextLength(data.message, 10, 1000)) {
        errors.push('El mensaje debe tener entre 10 y 1000 caracteres');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Show validation errors in form
 * @param {string} formSelector - Form selector
 * @param {array} errors - Array of error messages
 */
function showValidationErrors(formSelector, errors) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    // Remove existing error messages
    form.querySelectorAll('.validation-error').forEach(el => el.remove());

    // Create error container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'validation-error';
    errorContainer.style.cssText = `
        background: #fee2e2;
        border: 1px solid #ef4444;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 20px;
        color: #991b1b;
    `;

    errorContainer.innerHTML = `
        <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores de validación:</strong>
        <ul style="margin: 10px 0 0 20px;">
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
    `;

    form.insertBefore(errorContainer, form.firstChild);

    // Scroll to errors
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        isValidPhone,
        isValidCIF,
        validatePassword,
        isValidURL,
        isValidPrice,
        isValidArea,
        isValidRooms,
        isValidTextLength,
        isRequired,
        isValidImageURL,
        isValidYear,
        validateHouseData,
        validateUserData,
        validateCompanyData,
        validateLeadData,
        showValidationErrors
    };
}
