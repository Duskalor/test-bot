import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 }); // TTL: 60 segundos

export const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl; // Usa la URL como clave
  const cachedData = cache.get(key);
  if (cachedData) {
    console.log('📌 Sirviendo desde caché');
    return res.json(cachedData);
  }
  next();
};
