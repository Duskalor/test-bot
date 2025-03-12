# Usar la imagen oficial de Playwright v1.51.0-jammy
FROM mcr.microsoft.com/playwright:v1.51.0-jammy

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalar las dependencias de Node.js
RUN npm install

# Ejecutar el script principal
CMD ["npm", "start"]