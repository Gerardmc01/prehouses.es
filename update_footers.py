import os
import re

# El Footer "Rico" de 3 Columnas (2025)
RICH_FOOTER_2025 = """    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>Prehouses</h4>
                    <p style="color: var(--text-light); margin-bottom: 20px;">
                        El portal líder de casas prefabricadas en España.
                        Encuentra tu hogar ideal hoy mismo.
                    </p>
                    <div class="social-links" style="display: flex; gap: 15px; font-size: 1.2rem; margin-top: 10px;">
                        <a href="#" style="color: var(--text-light);"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" style="color: var(--text-light);"><i class="fa-brands fa-facebook"></i></a>
                        <a href="#" style="color: var(--text-light);"><i class="fa-brands fa-twitter"></i></a>
                    </div>
                </div>

                <div class="footer-col">
                    <h4>Explorar</h4>
                    <ul>
                        <li><a href="catalogo.html">Casas de Hormigón</a></li>
                        <li><a href="catalogo.html">Casas de Madera</a></li>
                        <li><a href="catalogo.html">Casas Modulares</a></li>
                        <li><a href="catalogo.html">Mobile Homes</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="aviso-legal.html">Aviso Legal</a></li>
                        <li><a href="privacidad.html">Política de Privacidad</a></li>
                        <li><a href="cookies.html">Cookies</a></li>
                        <li><a href="empresas.html">Acceso Empresas</a></li>
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
    # Ignorar componentes parciales para no romper includes si los hay
    ignore = ['admin-fix.html', 'append_footers.py', 'update_footers.py']
    
    footer_pattern = re.compile(r'<footer.*?>.*?</footer>', re.DOTALL | re.IGNORECASE)
    
    updated_files = []
    
    for filename in files:
        if filename in ignore: continue
        
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if footer_pattern.search(content):
            new_content = footer_pattern.sub(RICH_FOOTER_2025, content)
            
            if new_content != content:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                updated_files.append(filename)
                print(f"✅ Footer enriquecido (3 cols) en: {filename}")
            else:
                print(f"ℹ️ {filename} ya está actualizado.")
        else:
            print(f"⚠️ {filename} sin footer (usar append_footers.py si es necesario).")

    print(f"\nResumen: {len(updated_files)} archivos actualizados al diseño de 3 columnas.")

if __name__ == "__main__":
    normalize_footers()
