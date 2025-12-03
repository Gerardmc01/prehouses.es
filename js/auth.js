// Authentication Functions

// Login con Google
async function loginWithGoogle() {
    try {
        const result = await auth.signInWithPopup(googleProvider);
        const user = result.user;

        // Guardar/actualizar usuario en Firestore
        await saveUserToFirestore(user, 'individual');

        // Redirigir al dashboard
        window.location.href = 'dashboard-usuario.html';
    } catch (error) {
        console.error('Error en login con Google:', error);
        showError('Error al iniciar sesión con Google. Inténtalo de nuevo.');
    }
}

// Registro con Email/Password
async function registerWithEmail(email, password, displayName, userType) {
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        const user = result.user;

        // Actualizar nombre de usuario
        await user.updateProfile({
            displayName: displayName
        });

        // Guardar usuario en Firestore
        await saveUserToFirestore(user, userType, displayName);

        // Redirigir según tipo de usuario
        const redirectUrl = userType === 'empresa' ? 'dashboard-empresa.html' : 'dashboard-usuario.html';
        window.location.href = redirectUrl;
    } catch (error) {
        console.error('Error en registro:', error);
        let errorMessage = 'Error al crear la cuenta.';

        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Este email ya está registrado.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'El email no es válido.';
        }

        showError(errorMessage);
    }
}

// Login con Email/Password
async function loginWithEmail(email, password) {
    try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        const user = result.user;

        // Obtener tipo de usuario de Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userType = userDoc.exists ? userDoc.data().userType : 'individual';

        // Redirigir según tipo de usuario
        const redirectUrl = userType === 'empresa' ? 'dashboard-empresa.html' : 'dashboard-usuario.html';
        window.location.href = redirectUrl;
    } catch (error) {
        console.error('Error en login:', error);
        let errorMessage = 'Error al iniciar sesión.';

        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            errorMessage = 'Email o contraseña incorrectos.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'El email no es válido.';
        }

        showError(errorMessage);
    }
}

// Guardar usuario en Firestore
async function saveUserToFirestore(user, userType, displayName = null) {
    const userData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName || user.displayName || 'Usuario',
        userType: userType,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Añadir campos específicos según tipo de usuario
    if (userType === 'individual') {
        userData.favorites = [];
        userData.alerts = {
            enabled: false,
            maxPrice: null,
            materials: []
        };
    } else if (userType === 'empresa') {
        userData.companyName = displayName || user.displayName || 'Empresa';
        userData.publishedHouses = [];
        userData.subscription = 'free';
    }

    // Usar set con merge para no sobrescribir datos existentes
    await db.collection('users').doc(user.uid).set(userData, { merge: true });
}

// Logout
async function logout() {
    try {
        await auth.signOut();
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        showError('Error al cerrar sesión.');
    }
}

// Verificar si el usuario está autenticado
function checkAuth(requiredUserType = null) {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Usuario autenticado
                if (requiredUserType) {
                    // Verificar tipo de usuario
                    const userDoc = await db.collection('users').doc(user.uid).get();
                    const userType = userDoc.exists ? userDoc.data().userType : null;

                    if (userType === requiredUserType) {
                        resolve(user);
                    } else {
                        // Tipo de usuario incorrecto, redirigir
                        const correctUrl = userType === 'empresa' ? 'dashboard-empresa.html' : 'dashboard-usuario.html';
                        window.location.href = correctUrl;
                        reject('Tipo de usuario incorrecto');
                    }
                } else {
                    resolve(user);
                }
            } else {
                // No autenticado, redirigir a login
                window.location.href = 'usuarios.html';
                reject('No autenticado');
            }
        });
    });
}

// Recuperar contraseña
async function resetPassword(email) {
    try {
        await auth.sendPasswordResetEmail(email);
        showSuccess('Se ha enviado un email para restablecer tu contraseña.');
    } catch (error) {
        console.error('Error al enviar email de recuperación:', error);
        let errorMessage = 'Error al enviar el email.';

        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No existe una cuenta con este email.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'El email no es válido.';
        }

        showError(errorMessage);
    }
}

// Utilidades para mostrar mensajes
function showError(message) {
    // Puedes personalizar esto con un modal o toast
    alert(message);
}

function showSuccess(message) {
    // Puedes personalizar esto con un modal o toast
    alert(message);
}
