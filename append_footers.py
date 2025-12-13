import os

# El Footer Estándar
FOOTER_HTML = """
    <!-- Footer Global (Injected) -->
    <footer>
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
    </footer>
"""

# Archivos específicos que sabemos que les falta el footer
TARGET_FILES = [
    'detalle-casa-mh-diseno.html',
    'detalle-casa-las-rozas.html',
    'detalle-casa-fiscal.html',
    'asesor.html',
    'detalle-casa.html'
]

def append_footers():
    for filename in TARGET_FILES:
        if not os.path.exists(filename):
            print(f"Skipping {filename} (not found)")
            continue
            
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Si ya tiene footer (doble check), saltar
        if '<footer' in content: 
            print(f"{filename} already has footer. Skipping.")
            continue
            
        # Inserción inteligente: Antes de los scripts de Firebase o Comparison
        # Buscamos un punto de anclaje común. 
        # En mis fichas nuevas puse '<!-- Comparison Components -->' o '<script src="https://www.gstatic.com'
        
        insertion_point = -1
        
        # Preferencia 1: Antes del overlay del drawer
        if '<div class="comparison-drawer-overlay"' in content:
             insertion_point = content.find('<div class="comparison-drawer-overlay"')
             
        # Preferencia 2: Antes de Firebase SDK
        elif '<script src="https://www.gstatic.com' in content:
             insertion_point = content.find('<script src="https://www.gstatic.com')
        
        # Preferencia 3: Antes del body
        elif '</body>' in content:
             insertion_point = content.find('</body>')
             
        if insertion_point != -1:
            new_content = content[:insertion_point] + FOOTER_HTML + content[insertion_point:]
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✅ Footer inyectado exitosamente en: {filename}")
        else:
            print(f"❌ No se pudo encontrar punto de inserción para {filename}")

if __name__ == "__main__":
    append_footers()
