import os
import re

# Navbar estándar (copiado de index.html)
STANDARD_NAVBAR = """    <!-- Navbar -->
    <nav class="navbar">
        <div class="container nav-container">
            <a href="index.html" class="logo">
                <i class="fa-solid fa-house-chimney"></i> Prehouses
            </a>
            <ul class="nav-links">
                <li><a href="index.html">Inicio</a></li>
                <li><a href="catalogo.html">Catálogo</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="asesor.html" style="color: var(--primary); font-weight: 600;"><i
                            class="fa-solid fa-wand-magic-sparkles"></i> Asesor IA</a></li>
                <li><a href="empresas.html">Acceso Empresas</a></li>
                <li><a href="usuarios.html" class="btn btn-primary" style="padding: 10px 24px; color: white;">Acceso
                        Usuarios</a></li>
            </ul>
            <div class="mobile-menu-toggle" onclick="toggleMobileMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobileMenu">
        <ul>
            <li><a href="index.html">Inicio</a></li>
            <li><a href="catalogo.html">Catálogo</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="asesor.html" style="color: var(--primary); font-weight: 600;"><i
                        class="fa-solid fa-wand-magic-sparkles"></i> Asesor IA</a></li>
            <li><a href="empresas.html">Acceso Empresas</a></li>
            <li><a href="usuarios.html" class="btn btn-primary" style="width: 100%; margin-top: 20px;">Acceso
                    Usuarios</a></li>
        </ul>
    </div>

    <script>
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            const toggle = document.querySelector('.mobile-menu-toggle');
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        }
    </script>"""

def unify_navbars():
    files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    # Archivos que NO deben tener navbar público (admin, dashboards, login)
    skip_files = ['admin.html', 'dashboard-usuario.html', 'dashboard-empresa.html', 
                  'secret-admin-login.html', 'usuarios.html', 'admin-fix.html',
                  'publicar-casa.html', 'actualizar-tipo.html']
    
    # Regex para capturar desde <!-- Navbar --> hasta el cierre del script de toggleMobileMenu
    # O simplemente desde <nav class="navbar"> hasta </nav> si no hay mobile menu
    navbar_pattern = re.compile(
        r'(?:<!--\s*Navbar\s*-->)?\s*<nav class="navbar">.*?</nav>(?:.*?</script>)?',
        re.DOTALL | re.IGNORECASE
    )
    
    updated_files = []
    
    for filename in files:
        if filename in skip_files or filename == 'index.html':
            continue
        
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Buscar navbar
        match = navbar_pattern.search(content)
        if match:
            # Reemplazar con el navbar estándar
            new_content = content[:match.start()] + STANDARD_NAVBAR + content[match.end():]
            
            if new_content != content:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                updated_files.append(filename)
                print(f"✅ Navbar unificado en: {filename}")
            else:
                print(f"ℹ️ {filename} ya tiene el navbar correcto.")
        else:
            print(f"⚠️ {filename} no tiene navbar (se omite).")
    
    print(f"\n✅ Resumen: {len(updated_files)} archivos actualizados con navbar unificado.")

if __name__ == "__main__":
    unify_navbars()
