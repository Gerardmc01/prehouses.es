import os
import re

# El Footer Estándar 2025 Definitivo
STANDARD_FOOTER = """    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>Prehouses</h4>
                    <p style="color: var(--text-light); margin-bottom: 20px;">
                        El portal líder de casas prefabricadas en España.
                    </p>
                </div>
                <div class="footer-col">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="aviso-legal.html">Aviso Legal</a></li>
                        <li><a href="privacidad.html">Política de Privacidad</a></li>
                        <li><a href="cookies.html">Cookies</a></li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; 2025 Prehouses. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>"""

def normalize_footers():
    files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    # Regex para capturar cualquier footer existente
    # Busca desde <footer hasta </footer>, incluyendo atributos y espacios
    footer_pattern = re.compile(r'<footer.*?>.*?</footer>', re.DOTALL | re.IGNORECASE)
    
    updated_files = []
    
    for filename in files:
        if filename == 'admin-fix.html': continue # Skip tools
        
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Check if footer exists
        if footer_pattern.search(content):
            new_content = footer_pattern.sub(STANDARD_FOOTER, content)
            
            # Solo escribir si hubo cambio real
            if new_content != content:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                updated_files.append(filename)
                print(f"✅ Footer actualizado en: {filename}")
            else:
                print(f"ℹ️ {filename} ya tenía el footer correcto.")
        else:
            print(f"⚠️ {filename} NO tiene etiqueta <footer>. Se omite.")

    print(f"\nResumen: {len(updated_files)} archivos actualizados.")

if __name__ == "__main__":
    normalize_footers()
