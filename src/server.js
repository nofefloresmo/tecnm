const express = require("express");
const bodyParser = require("body-parser");
const db = require("./connection");
const rutaTecnm = require("./routes/rutastecnm");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/tecnm", rutaTecnm);

// Manejo de rutas incorrectas
app.use((req, res, next) => {
    res.status(404).send("Ruta no encontrada");
});

// Manejo de errores globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Ocurrió un error en el servidor");
});

// Conectar a la base de datos
db.connect()
    .then(() => {
        console.log("Conectado a la base de datos de forma exitosa");
        // Iniciar el servidor solo si la conexión a la base de datos es exitosa
        app.listen(PORT, () => {
            console.log("Server en http://localhost:" + PORT);
        });
    })
    .catch((err) => {
        console.error("Error al conectar a la base de datos:", err);
    });
