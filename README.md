# Proyecto de Scraping con Express y Telegram

Este proyecto es un servidor en Node.js con Express que realiza scraping de datos y envía notificaciones a través de Telegram. Incluye protección de seguridad con Helmet, registro de peticiones con Morgan, y almacenamiento en caché.

## Requisitos

- Node.js 20 o superior
- Un archivo `.env` con la variable `PORT`
- Dependencias instaladas con `npm install`

## Instalación

1. Clona este repositorio:
   ```sh
   git clone https://github.com/Duskalor/test-bot.git
   cd test-bot
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Crea un archivo `.env` y define el puerto:
   ```env
   PORT=3100
   ```

## Uso

### Iniciar el servidor

```sh
npm run dev
```

El servidor se ejecutará en `http://localhost:3100`.

### Endpoints

| Método | Ruta             | Descripción                             |
| ------ | ---------------- | --------------------------------------- |
| GET    | `/iniciar-bot`   | Inicia el bot de scraping cada 12 horas |
| GET    | `/detener-bot`   | Detiene el bot de scraping              |
| GET    | `/get-data`      | Obtiene los datos almacenados           |
| GET    | `/test-telegram` | Envía los datos obtenidos a Telegram    |

## Tecnologías utilizadas

- **Express**: Framework web para Node.js
- **dotenv**: Carga variables de entorno desde un archivo `.env`
- **CORS**: Permite el acceso de diferentes orígenes
- **Helmet**: Mejora la seguridad de la API
- **Morgan**: Middleware para registro de peticiones
- **Telegram API**: Para enviar mensajes con datos extraídos

## Autor

Desarrollado por [Tu Nombre](https://github.com/Duskalor).

## Licencia

Este proyecto está bajo la licencia MIT.
