const redis = require("redis");
const client = redis.createClient({
    url: `redis://redis02:6379`,
});

client.on("error", (err) => {
    console.error("Redis error de conexion:", err);
});

client
    .connect()
    .then(() => {
        console.log("Conectado-->> Redis");
    })
    .catch((err) => {
        console.error("Error conexion a Redis:", err);
    });

const cache = (req, res, next) => {
    res.on("finish", async () => {
        if (!client.isOpen) {
            console.error("Redis client -->> No conectado.");
            return;
        }
        const key = `${req.method}: ${Date.now()
            }: ${req.originalUrl}`;
        const logEntry = JSON.stringify({
            time: new Date(),
            req: {
                method: req.method,
                path: req.route.path,
                url: req.originalUrl,
                headers: req.headers,
                query: req.query,
                params: req.params,
                body: req.body,
            },
            res: {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
            },
        });
        try {
            await client.set(key, logEntry, "EX", 60 * 60 * 24);
            // Recuperar el valor almacenado para verificar que se guardó correctamente
            const value = await client.get(key);
            if (value) {
                console.log("Almacenamiento exitoso:", value);
            } else {
                console.error("No se encontró ningún valor para la clave:", key);
            }
        } catch (err) {
            console.error("Error al salvar:", err);
        }
    });
    next();
};

module.exports = cache;