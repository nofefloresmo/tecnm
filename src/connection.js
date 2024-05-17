const mongoose = require("mongoose"); // Módulo para interactuar con MongoDB
const redis = require("redis"); // Módulo para interactuar con Redis

async function connect() {
    try {
        // Conexión a MongoDB
        await mongoose.connect(
            "mongodb://mongo01:27017,mongo02:27017,mongo03:27017/tecnm?replicaSet=replica01"
        );
        console.log("Conectado a MongoDB ReplicaSet"); // Mensaje de éxito en la conexión
    } catch (error) {
        console.error("Error al conectar a MongoDB ReplicaSet:", error); // Mensaje de error en la conexión
    }

    // Configuración de Redis
    const redisClient = redis.createClient({
        url: `redis://redis02:6379`,
    });

    redisClient.on("error", (err) => {
        console.error("Error en la conexión a Redis:", err); // Mensaje de error en la conexión a Redis
    });

    redisClient
        .connect()
        .then(() => {
            console.log("Conectado a Redis");
        })
        .catch((err) => {
            console.error("No se pudo conectar a Redis:", err);
        });

    // Exportamos las instancias de mongoose y redisClient para usarlas en otras partes de la aplicación
    return { mongoose, redisClient };
}

module.exports = { connect };