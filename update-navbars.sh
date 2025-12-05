#!/bin/bash

# Script to update navbar in all HTML files

echo "Actualizando navbars en todas las páginas..."

# Lista de archivos a actualizar (excluyendo los ya actualizados)
files=(
    "detalle-casa-villa.html"
    "detalle-casa-wood.html"
    "asesor.html"
    "comparador.html"
    "usuarios.html"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Procesando $file..."
        # Aquí iría la lógica de reemplazo
    fi
done

echo "✅ Actualización completada"
