const mongoose = require("mongoose"); // Módulo para interactuar con MongoDB
const redis = require("redis"); // Módulo para interactuar con Redis
const Docker = require("dockerode"); // Módulo para interactuar con Docker

async function connect() {
    try {
        // Conexión a MongoDB
        await mongoose.connect(
            "mongodb://mongo01:27017,mongo02:27017,mongo03:27017/tecnm?replicaSet=replica01"
        );
        console.log("Conectado a MongoDB ReplicaSet de forma exitosa"); // Mensaje de éxito en la conexión
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
            console.log("Conectado a Redis de forma exitosa");
        })
        .catch((err) => {
            console.error("No se pudo conectar a Redis:", err);
        });

    // Crear una instancia de Docker
    const docker = new Docker({ socketPath: '/var/run/docker.sock' });

    // Eliminar el contenedor mongo-init-replica-1
    docker.getContainer('caso-mongo-init-replica-1').remove({ force: true }, (err, data) => {
        if (err) {
            console.error(`Error al eliminar el contenedor caso-mongo-init-replica-1: ${err.message}`);
        } else {
            console.log('Contenedor temporal caso-mongo-init-replica-1 eliminado');
        }
    });

    // Exportamos las instancias de mongoose y redisClient para usarlas en otras partes de la aplicación
    return { mongoose, redisClient };
}

module.exports = { connect };