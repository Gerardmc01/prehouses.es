import re

# Files that need the sendLead function added
files_to_fix = [
    'detalle-casa-nordic.html',
    'detalle-casa-elite.html', 
    'detalle-casa-horizon.html',
    'detalle-casa-tiny.html',
    'detalle-casa-villa.html',
    'detalle-casa-wood.html',
    'detalle-casa-fiscal.html',
    'detalle-casa-las-rozas.html',
    'detalle-casa-mh-diseno.html'
]

# The sendLead function to add (if missing)
sendlead_function = '''
        async function sendLead() {
            const name = document.getElementById('leadName').value.trim();
            const email = document.getElementById('leadEmail').value.trim();
            const phone = document.getElementById('leadPhone').value.trim();
            const message = document.getElementById('leadMessage').value.trim();

            if (!name || !email || !phone || !message) {
                alert('⚠️ Por favor, rellena todos los campos.');
                return;
            }

            try {
                await db.collection('leads').add({
                    userId: currentUser ? currentUser.uid : null,
                    userName: name,
                    userEmail: email,
                    userPhone: phone,
                    message: message,
                    houseId: houseId,
                    houseTitle: currentHouse.title,
                    companyId: currentHouse.companyId,
                    status: 'new',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                alert('✅ ¡Solicitud enviada! Nos pondremos en contacto contigo pronto.');
                document.getElementById('leadMessage').value = '';
            } catch (error) {
                console.error(error);
                alert('❌ Error al enviar. Inténtalo de nuevo.');
            }
        }
'''

for filename in files_to_fix:
    filepath = f'c:/Users/Gerard/.gemini/antigravity/playground/volatile-meteoroid/{filename}'
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if sendLead already exists
        if 'async function sendLead()' in content:
            print(f'[SKIP] {filename} already has sendLead()')
            continue
        
        # Find where to insert (right after the auth.onAuthStateChanged block)
        # Look for the pattern where auth state changes and insert after it
        pattern = r'(auth\.onAuthStateChanged\([^}]+}\);)'
        
        if re.search(pattern, content):
            new_content = re.sub(pattern, r'\1' + sendlead_function, content, count=1)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f'[OK] Added sendLead() to {filename}')
        else:
            print(f'[WARN] Could not find insertion point in {filename}')
            
    except Exception as e:
        print(f'[ERROR] {filename}: {e}')

print('\n[DONE] Contact forms updated!')
