FROM python:3.11-slim

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos los requerimientos indicando la carpeta backend
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos la carpeta backend COMPLETA dentro de /app/backend
# Esto es lo que arregla el error de "ModuleNotFoundError"
COPY backend/ ./backend/

# Comando para arrancar la aplicación
# Fíjate que ahora llamamos a backend.main:app
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]