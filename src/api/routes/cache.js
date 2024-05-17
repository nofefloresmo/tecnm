// cache.js
const redis = require("redis");
const client = redis.createClient({
    socket: {
        port: 6379,
        host: "redis02",
    },
});

client.on("ready", () => {
    console.log("Connected to Redis");
});

const cache = async function (req, res, next) {
    let fecha = new Date();

    // Check if the Redis client is ready before sending commands
    if (client.status === "ready") {
        // Guarda la petición
        await client.set(
            "request:" + fecha.toISOString(),
            JSON.stringify({
                method: req.method,
                path: req.route.path,
                body: req.body,
                query: req.query,
                params: req.params,
            })
        );

        // Guarda la respuesta en un middleware posterior
        const oldSend = res.send;
        res.send = function (data) {
            client.set(
                "response:" + fecha.toISOString(),
                JSON.stringify({
                    data,
                    status: this.statusCode,
                })
            );
            oldSend.apply(res, arguments);
        };
    } else {
        console.error("Redis client is not ready");
    }

    next();
};

module.exports = cache;
