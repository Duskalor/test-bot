# Usa una imagen oficial de Node con Playwright
FROM mcr.microsoft.com/playwright:v1.51.0-jammy

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package.json  ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto (ajústalo según tu app)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm","run" ,"dev"]
