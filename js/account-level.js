// account-level.js - Sistema de Niveles de Cuenta para Usuarios

class AccountLevelSystem {
    constructor(userId) {
        this.userId = userId;
        this.userRef = db.collection('users').doc(userId);
        this.currentLevel = 1;
        this.currentProgress = 0;
        this.missions = {};
    }

    // Inicializar sistema de niveles para un usuario
    async initialize() {
        const userDoc = await this.userRef.get();
        const userData = userDoc.data();

        // Si no existe estructura de niveles, crearla
        if (!userData.accountLevel) {
            await this.userRef.update({
                accountLevel: {
                    level: 1,
                    progress: 0,
                    profileImage: null,
                    missions: {
                        level1: {
                            verifyPhone: { completed: false, progress: 0 },
                            likeThreeHouses: { completed: false, progress: 0, count: 0 },
                            visitThreeDays: { completed: false, progress: 0, visitDays: [], lastVisit: null }
                        }
                    },
                    stats: {
                        totalMissionsCompleted: 0,
                        levelUpDate: null
                    }
                }
            });
        }

        // Cargar datos actuales
        await this.loadCurrentData();
    }

    // Cargar datos actuales del usuario
    async loadCurrentData() {
        const userDoc = await this.userRef.get();
        const userData = userDoc.data();

        if (userData.accountLevel) {
            this.currentLevel = userData.accountLevel.level || 1;
            this.currentProgress = userData.accountLevel.progress || 0;
            this.missions = userData.accountLevel.missions || {};
        }
    }

    // Obtener misiones del nivel actual
    getCurrentMissions() {
        const levelKey = `level${this.currentLevel}`;
        return this.missions[levelKey] || {};
    }

    // Calcular progreso total basado en misiones completadas
    calculateProgress() {
        const missions = this.getCurrentMissions();
        const missionKeys = Object.keys(missions);
        const totalMissions = missionKeys.length;

        if (totalMissions === 0) return 0;

        const completedMissions = missionKeys.filter(key => missions[key].completed).length;
        return Math.round((completedMissions / totalMissions) * 100);
    }

    // Verificar teléfono (Misión 1)
    async completePhoneVerification(phoneNumber) {
        const levelKey = `level${this.currentLevel}`;

        await this.userRef.update({
            [`accountLevel.missions.${levelKey}.verifyPhone.completed`]: true,
            [`accountLevel.missions.${levelKey}.verifyPhone.progress`]: 100,
            [`accountLevel.phoneNumber`]: phoneNumber,
            [`accountLevel.phoneVerified`]: true
        });

        await this.checkLevelUp();
    }

    // Dar like a una casa (Misión 2)
    async incrementLikeCount() {
        const levelKey = `level${this.currentLevel}`;
        const missions = this.getCurrentMissions();
        const currentCount = missions.likeThreeHouses?.count || 0;
        const newCount = currentCount + 1;

        const updates = {
            [`accountLevel.missions.${levelKey}.likeThreeHouses.count`]: newCount,
            [`accountLevel.missions.${levelKey}.likeThreeHouses.progress`]: Math.min((newCount / 3) * 100, 100)
        };

        if (newCount >= 3) {
            updates[`accountLevel.missions.${levelKey}.likeThreeHouses.completed`] = true;
        }

        await this.userRef.update(updates);
        await this.checkLevelUp();
    }

    // Registrar visita diaria (Misión 3)
    async registerDailyVisit() {
        const levelKey = `level${this.currentLevel}`;
        const missions = this.getCurrentMissions();
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        const visitDays = missions.visitThreeDays?.visitDays || [];
        const lastVisit = missions.visitThreeDays?.lastVisit;

        // Si ya visitó hoy, no hacer nada
        if (lastVisit === today) {
            return;
        }

        // Verificar si es consecutivo
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let newVisitDays = [];

        if (lastVisit === yesterdayStr) {
            // Es consecutivo, mantener racha
            newVisitDays = [...visitDays, today];
        } else {
            // No es consecutivo, reiniciar racha
            newVisitDays = [today];
        }

        // Limitar a últimos 3 días
        if (newVisitDays.length > 3) {
            newVisitDays = newVisitDays.slice(-3);
        }

        const consecutiveDays = newVisitDays.length;
        const updates = {
            [`accountLevel.missions.${levelKey}.visitThreeDays.visitDays`]: newVisitDays,
            [`accountLevel.missions.${levelKey}.visitThreeDays.lastVisit`]: today,
            [`accountLevel.missions.${levelKey}.visitThreeDays.progress`]: Math.min((consecutiveDays / 3) * 100, 100)
        };

        if (consecutiveDays >= 3) {
            updates[`accountLevel.missions.${levelKey}.visitThreeDays.completed`] = true;
        }

        await this.userRef.update(updates);
        await this.checkLevelUp();
    }

    // Verificar si debe subir de nivel
    async checkLevelUp() {
        await this.loadCurrentData();
        const progress = this.calculateProgress();

        if (progress >= 100 && this.currentLevel < 10) {
            await this.levelUp();
            return true;
        }
        return false;
    }

    // Subir de nivel
    async levelUp() {
        const newLevel = this.currentLevel + 1;
        const levelKey = `level${newLevel}`;

        // Crear misiones para el nuevo nivel
        const newMissions = this.generateMissionsForLevel(newLevel);

        await this.userRef.update({
            'accountLevel.level': newLevel,
            'accountLevel.progress': 0,
            [`accountLevel.missions.${levelKey}`]: newMissions,
            'accountLevel.stats.levelUpDate': firebase.firestore.FieldValue.serverTimestamp(),
            'accountLevel.stats.totalMissionsCompleted': firebase.firestore.FieldValue.increment(3)
        });

        this.currentLevel = newLevel;
        this.currentProgress = 0;

        // Mostrar celebración
        this.showLevelUpCelebration(newLevel);
    }

    // Generar misiones para un nivel específico
    generateMissionsForLevel(level) {
        // Por ahora, todos los niveles tienen las mismas misiones
        // Puedes personalizar esto más adelante
        return {
            verifyPhone: { completed: false, progress: 0 },
            likeThreeHouses: { completed: false, progress: 0, count: 0 },
            visitThreeDays: { completed: false, progress: 0, visitDays: [], lastVisit: null }
        };
    }

    // Mostrar celebración de subida de nivel
    showLevelUpCelebration(newLevel) {
        const modal = document.createElement('div');
        modal.id = 'levelUpModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 50px;
                border-radius: 24px;
                text-align: center;
                max-width: 500px;
                animation: scaleIn 0.5s ease;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            ">
                <div style="font-size: 80px; margin-bottom: 20px;">🎉</div>
                <h2 style="color: white; font-size: 2.5rem; margin-bottom: 15px;">
                    ¡Felicidades!
                </h2>
                <p style="color: rgba(255, 255, 255, 0.9); font-size: 1.3rem; margin-bottom: 30px;">
                    Has subido al <strong>Nivel ${newLevel}</strong>
                </p>
                <button onclick="document.getElementById('levelUpModal').remove(); location.reload();" 
                    style="
                        background: white;
                        color: #667eea;
                        border: none;
                        padding: 15px 40px;
                        border-radius: 50px;
                        font-size: 1.1rem;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s;
                    "
                    onmouseover="this.style.transform='scale(1.05)'"
                    onmouseout="this.style.transform='scale(1)'">
                    ¡Continuar!
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        // Añadir animaciones CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes scaleIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Subir foto de perfil
    async uploadProfileImage(imageUrl) {
        await this.userRef.update({
            'accountLevel.profileImage': imageUrl
        });
    }
}

// Exportar para uso global
window.AccountLevelSystem = AccountLevelSystem;
