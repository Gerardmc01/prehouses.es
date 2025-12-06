// Authentication Logic for Prehouses
// Handles registration, login, and Google authentication

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => errorDiv.style.display = 'none', 5000);
    } else {
        alert('❌ ' + message);
    }
}

// Show success message
function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        setTimeout(() => successDiv.style.display = 'none', 5000);
    } else {
        alert('✅ ' + message);
    }
}

// Register with email and password
async function registerWithEmail(email, password, name, userType, companyData = null) {
    try {
        // Create user in Firebase Auth
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Update profile with name
        await user.updateProfile({
            displayName: name
        });

        // Prepare user data
        const userData = {
            name: name,
            email: email,
            userType: userType, // 'individual' or 'empresa'
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            favoritos: [],
            consultas: 0,
            alertas: 0
        };

        // Add company-specific data and status
        if (userType === 'empresa' && companyData) {
            console.log('Registering as EMPRESA with data:', companyData);
            userData.cif = companyData.cif;
            userData.phone = companyData.phone;
            userData.website = companyData.website;
            userData.status = 'pending'; // pending, approved, rejected
            userData.casasPublicadas = 0;
            userData.visualizaciones = 0;
        }

        console.log('Saving user data to Firestore:', userData);

        // Save additional data in Firestore
        await db.collection('users').doc(user.uid).set(userData);

        console.log('User data saved successfully!');

        // Send verification email
        await user.sendEmailVerification();

        // Different messages based on user type
        if (userType === 'empresa') {
            showSuccess('✅ Solicitud enviada! Revisaremos tu empresa y te contactaremos en 24-48h. Revisa tu email (y SPAM) para verificar tu cuenta.');
        } else {
            showSuccess('✅ Cuenta creada! Revisa tu email (y carpeta de SPAM) para verificar tu cuenta.');
        }

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
            const redirectUrl = userType === 'empresa' ? 'dashboard-empresa.html' : 'dashboard-usuario.html';
            window.location.href = redirectUrl;
        }, 2000);

    } catch (error) {
        console.error('Error en registro:', error);
        let errorMessage = 'Error al crear la cuenta';

        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Este email ya está registrado. Usa "¿Olvidaste tu contraseña?" para recuperar acceso.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'El email no es válido.';
        }

        showError(errorMessage);
        throw error;
    }
}

// Login with email and password
async function loginWithEmail(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Get user data from Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.exists ? userDoc.data() : {};

        showSuccess('✅ Sesión iniciada correctamente!');

        // Redirect based on user type
        setTimeout(() => {
            const redirectUrl = userData.userType === 'empresa' ? 'dashboard-empresa.html' : 'dashboard-usuario.html';
            window.location.href = redirectUrl;
        }, 1000);

    } catch (error) {
        console.error('Error en login:', error);
        let errorMessage = 'Error al iniciar sesión';

        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No existe una cuenta con este email.';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Contraseña incorrecta.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'El email no es válido.';
        } else if (error.code === 'auth/user-disabled') {
            errorMessage = 'Esta cuenta ha sido deshabilitada.';
        }

        showError(errorMessage);
        throw error;
    }
}

// Login with Google
async function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });

    try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;

        // Check if user exists in Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();

        if (!userDoc.exists) {
            // New user - create profile
            await db.collection('users').doc(user.uid).set({
                name: user.displayName,
                email: user.email,
                userType: 'individual', // Default to individual
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                favoritos: [],
                consultas: 0,
                alertas: 0
            });
        }

        const userData = userDoc.exists ? userDoc.data() : { userType: 'individual' };

        showSuccess('✅ Sesión iniciada con Google!');

        // Redirect based on user type
        setTimeout(() => {
            const redirectUrl = userData.userType === 'empresa' ? 'dashboard-empresa.html' : 'dashboard-usuario.html';
            window.location.href = redirectUrl;
        }, 1000);

    } catch (error) {
        console.error('Error con Google:', error);
        let errorMessage = 'Error al iniciar sesión con Google';

        if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Inicio de sesión cancelado.';
        } else if (error.code === 'auth/popup-blocked') {
            errorMessage = 'Popup bloqueado. Permite popups para este sitio.';
        }

        showError(errorMessage);
        throw error;
    }
}

// Reset password
async function resetPassword(email) {
    try {
        await auth.sendPasswordResetEmail(email);
        showSuccess('✅ Email de recuperación enviado! Revisa tu bandeja de entrada (y SPAM).');
    } catch (error) {
        console.error('Error:', error);
        let errorMessage = 'Error al enviar email de recuperación';

        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No existe una cuenta con este email.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'El email no es válido.';
        }

        showError(errorMessage);
        throw error;
    }
}

// Update user navbar when logged in
auth.onAuthStateChanged(async (user) => {
    const navLinks = document.querySelector('.nav-links');

    if (user && navLinks) {
        try {
            // Get user data
            const userDoc = await db.collection('users').doc(user.uid).get();
            const userData = userDoc.exists ? userDoc.data() : {};

            // Update navbar - find the "Acceso Usuarios" button
            const accessButtons = navLinks.querySelectorAll('a[href="usuarios.html"]');
            accessButtons.forEach(btn => {
                if (btn.classList.contains('btn-primary')) {
                    btn.textContent = `👤 ${userData.name || user.displayName || 'Mi Cuenta'}`;
                    btn.href = userData.userType === 'empresa' ? 'dashboard-empresa.html' : 'dashboard-usuario.html';
                }
            });
        } catch (error) {
            console.error('Error updating navbar:', error);
        }
    }
});
