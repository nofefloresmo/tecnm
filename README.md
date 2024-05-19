# **TECNM**
# **1. Incluir estructura del proyecto**
  ```js
  /*
  /CASO
  |---/.vscode
  |---/node_modules
  |---/src
  |   |---/controllers
  |   |   |---controladorestecnm.js
  |   |---/middleware
  |   |   |---logger.js
  |   |---/models
  |   |   |---tecnm.js
  |   |---/routes
  |   |   |---rutastecnm.js
  |   |   |---connection.js
  |   |---server.js
  |---/.dockerignore
  |---/.gitignore
  |---/docker-compose.yml
  |---/Dockerfile
  |---/Dockerfile.mongo-init
  |---/init-replica.sh
  |---/package-lock.json
  |---/package.json
  |---/README.md
  */
  ```
# **2. Modelado de datos (MongoDB, Redis)**
  ## Mongo
  ### Alumnos
  ```json
  {
    "_id": "string",
    "nctrl": "string",
    "nombre": "string",
    "carrera": "string",
    "tecnologico": "string",
    "planDeEstudios": "string",
    "expedienteAcademico": [
      {
        "materia": "string",
        "calificacion": "number",
        "semestre": "string"
      }
    ],
    "horario": ["string"]
  }
  ```
  ### Docentes
  ```json
  {
    "_id": "string",
    "nombre": "string",
    "carrera": "string",
    "tecnologico": "string",
    "materiasImpartidas": [
      {
        "materia": "string",
        "grupo": "string",
        "semestre": "string"
      }
    ]
  }
  ```
  ### Materias
  ```json
  {
    "_id": "string",
    "nombre": "string",
    "carrera": "string",
    "descripcion": "string",
    "planDeEstudios": "string"
  }
  ```
  ### Grupos
  ```json
  {
    "_id": "string",
    "materia": "string",
    "docente": "string",
    "estudiantes": ["string"],
    "aula": "string",
    "horario": {
      "dia": "string",
      "horaInicio": "string",
      "horaFin": "string"
    }
  }
  ```
  ### Aulas
  ```json
  {
    "_id": "string",
    "edificio": "string",
    "gruposAtendidos": ["string"],
    "descripcionEquipamiento": "string"
  }
  ```
  ### Plan de estudios
  ```json
  {
    "_id": "string",
    "carrera": "string",
    "materias": ["string"],
    "totalCreditos": "number"
  }
  ```
  ## Redis
  > Redis se utiliza para almacenar caché de peticiones y respuestas de la API. La estructura de los datos en Redis es la siguiente:
  ### request:<timestamp>:
  > Almacena los detalles de la petición.
  ```json
  {
    "method": "string",
    "path": "string",
    "body": "object",
    "query": "object",
    "params": "object"
  }
  ```
  ### response:<timestamp>:
  > Almacena los detalles de la respuesta.
  ```json
  {
    "data": "object",
    "status": "number"
  }
  ```
# **3. Tabla de endpoints**
  ```markdown
| Método | Endpoint                                           | Descripción |
|--------|----------------------------------------------------|-------------|
| GET    | /tecnm/alumnos/:alumnoId/materias                  | Q1          |
| GET    | /tecnm/grupos/:grupoId/materias/:materiaId/alumnos | Q2          |
| GET    | /tecnm/alumnos/:alumnoId/calificaciones            | Q3          |
| GET    | /tecnm/materias/:materiaId/docentes                | Q4          |
| GET    | /tecnm/materias/:materiaId/alumnos/calificaciones  | Q5          |
| GET    | /tecnm/materias/:materiaId/grupos                  | Q6          |
| GET    | /tecnm/alumnos/:alumnoId/horario                   | Q7          |
| GET    | /tecnm/alumnos/:alumnoId/materias/faltantes        | Q8          |
| GET    | /tecnm/docentes/:docenteId/materias                | Q9          |
| GET    | /tecnm/alumnos                                     | Todos       |
| GET    | /tecnm/alumnos/:id                                 | Uno         |
| POST   | /tecnm/alumnos                                     | Crear       |
| PUT    | /tecnm/alumnos/:id                                 | Actualizar  |
| DELETE | /tecnm/alumnos/:id                                 | Eliminar    |
| GET    | /tecnm/docentes                                    | Todos       |
| GET    | /tecnm/docentes/:id                                | Uno         |
| POST   | /tecnm/docentes                                    | Crear       |
| PUT    | /tecnm/docentes/:id                                | Actualizar  |
| DELETE | /tecnm/docentes/:id                                | Eliminar    |
| GET    | /tecnm/materias                                    | Todos       |
| GET    | /tecnm/materias/:id                                | Uno         |
| POST   | /tecnm/materias                                    | Crear       |
| PUT    | /tecnm/materias/:id                                | Actualizar  |
| DELETE | /tecnm/materias/:id                                | Eliminar    |
| GET    | /tecnm/grupos                                      | Todos       |
| GET    | /tecnm/grupos/:id                                  | Uno         |
| POST   | /tecnm/grupos                                      | Crear       |
| PUT    | /tecnm/grupos/:id                                  | Actualizar  |
| DELETE | /tecnm/grupos/:id                                  | Eliminar    |
| GET    | /tecnm/aulas                                       | Todos       |
| GET    | /tecnm/aulas/:id                                   | Uno         |
| POST   | /tecnm/aulas                                       | Crear       |
| PUT    | /tecnm/aulas/:id                                   | Actualizar  |
| DELETE | /tecnm/aulas/:id                                   | Eliminar    |
| GET    | /tecnm/plan-de-estudios                            | Todos       |
| GET    | /tecnm/plan-de-estudios/:id                        | Uno         |
| POST   | /tecnm/plan-de-estudios                            | Crear       |
| PUT    | /tecnm/plan-de-estudios/:id                        | Actualizar  |
| DELETE | /tecnm/plan-de-estudios/:id                        | Eliminar    |
```
  ### Descripción de las querys:
  - **Q1** Listar las materias que un alumno ha cursado.
  - **Q2** Listar los alumnos que están cursando una materia específica de un grupo específico.
  - **Q3** Listar las calificaciones de un alumno en todas sus materias cursadas.
  - **Q4** Listar los docentes que imparten una materia específica.
  - **Q5** Listar los alumnos que han obtenido una calificación superior a 90 en una materia específica.
  - **Q6** Listar los grupos que corresponden a una materia específica.
  - **Q7** Listar las materias que cursa un alumno en específico (horario).
  - **Q8** Listar las materias que faltan por cursar a un alumno en específico.
  - **Q9** Listar las materias que imparte un docente en específico, junto con los alumnos que cursan cada una de las materias.
# **4. Códigos y procedimientos documentados**
## **Controladores**
### **controladorestecnm.js**
- **listarMateriasCursadasPorAlumno**: Esta función utiliza un `aggregate` de MongoDB para buscar las materias cursadas por un alumno específico y proyectar los detalles relevantes.
  ```js
  const listarMateriasCursadasPorAlumno = async (req, res) => {
      try {
          const alumnoId = req.params.id;
          const alumno = await Alumno.aggregate([
              { $match: { "_id": alumnoId } },
              { $unwind: "$expedienteAcademico" },
              {
                  $lookup: {
                      from: "materias",
                      localField: "expedienteAcademico.materia",
                      foreignField: "_id",
                      as: "materiaDetalles"
                  }
              },
              { $unwind: "$materiaDetalles" },
              {
                  $project: {
                      "nombreAlumno": "$nombre",
                      "materia": "$materiaDetalles.nombre",
                      "descripcion": "$materiaDetalles.descripcion",
                      "calificacion": "$expedienteAcademico.calificacion",
                      "semestre": "$expedienteAcademico.semestre"
                  }
              }
          ]);

          if (!alumno || alumno.length === 0) {
              return res.status(404).send("Alumno no encontrado");
          }

          res.json(alumno);
        } catch (error) {
          console.error("Error al obtener las materias del alumno:", error);
          res.status(500).send("Hubo un error al obtener las materias del alumno");
      }
  };
  ```
- **Aquí van las consultas restantes**: Se sigue la misma estructura para las demás consultas GET, POST, PUT y DELETE, documentando brevemente cada una de ellas.
  ```js
  const listarAlumnosPorMateriaYGrupo = async (req, res) => {
      // Descripción de la función...
  };
  const listarCalificacionesPorAlumno = async (req, res) => {
      // Descripción de la función...
  };
  const listarDocentesPorMateria = async (req, res) => {
      // Descripción de la función...
  };
  const listarAlumnosConCalificacionSuperior = async (req, res) => {
      // Descripción de la función...
  };
  const listarGruposPorMateria = async (req, res) => {
      // Descripción de la función...
  };
  const listarMateriasPorHorarioAlumno = async (req, res) => {
      // Descripción de la función...
  };
  const listarMateriasFaltantesPorAlumno = async (req, res) => {
      // Descripción de la función...
  };
  const listarMateriasYAlumnosPorDocente = async (req, res) => {
      // Descripción de la función...
  };
  const obtenerAlumnos = async (req, res) => {
      // Descripción de la función...
  };
  const obtenerAlumno = async (req, res) => {
      // Descripción de la función...
  };
  const crearAlumno = async (req, res) => {
      // Descripción de la función...
  };
  const actualizarAlumno = async (req, res) => {
      // Descripción de la función...
  };
  const eliminarAlumno = async (req, res) => {
      // Descripción de la función...
  };

  // > Se sigue la misma estructura para las entidades: Docente, Materia, Grupo, Aula, PlanDeEstudios.

  // CONTROLADOR de importación de datos de prueba
  const importarDatos = async (req, res) => {
      try {
          // Datos de prueba
          const alumnos = [
            // Datos
          ];
          const docentes = [
            // Datos
          ];
          const materias = [
            // Datos
          ];
          const grupos = [
            // Datos
          ];
          const aulas = [
            // Datos
          ];
          const planesDeEstudio = [
            // Datos
          ];

          // Inserción de datos
          await Alumno.insertMany(alumnos);
          await Docente.insertMany(docentes);
          await Materia.insertMany(materias);
          await Grupo.insertMany(grupos);
          await Aula.insertMany(aulas);
          await Plandeestudios.insertMany(planesDeEstudio);

          res.status(201).send("Datos importados exitosamente");
      } catch (error) {
          if (error.code === 11000) {
              // Error de duplicación de clave
              console.error("Error de duplicación:", error);
              res.status(409).send("Error: Datos duplicados encontrados");
          } else {
              // Cualquier otro tipo de error
              console.error("Error al importar los datos:", error);
              res.status(500).send("Hubo un error al importar los datos");
          }
      }
  };

  module.exports = {
      listarMateriasCursadasPorAlumno,
      listarAlumnosPorMateriaYGrupo,
      listarCalificacionesPorAlumno,
      listarDocentesPorMateria,
      listarAlumnosConCalificacionSuperior,
      listarGruposPorMateria,
      listarMateriasPorHorarioAlumno,
      listarMateriasFaltantesPorAlumno,
      listarMateriasYAlumnosPorDocente,
      obtenerAlumno,
      obtenerAlumnos,
      crearAlumno,
      actualizarAlumno,
      eliminarAlumno,
      obtenerDocente,
      obtenerDocentes,
      crearDocente,
      actualizarDocente,
      eliminarDocente,
      obtenerMateria,
      obtenerMaterias,
      crearMateria,
      actualizarMateria,
      eliminarMateria,
      obtenerGrupo,
      obtenerGrupos,
      crearGrupo,
      actualizarGrupo,
      eliminarGrupo,
      obtenerAula,
      obtenerAulas,
      crearAula,
      actualizarAula,
      eliminarAula,
      obtenerplandeestudios,
      obtenerPlanesDeEstudio,
      crearplandeestudios,
      actualizarplandeestudios,
      eliminarplandeestudios,
      importarDatos
  };
  ```
## **Rutas**
### **rutastecnm.js**
- **Definición de Rutas**: Este archivo define las rutas para la API utilizando Express y los controladores correspondientes.
  ```js
  const express = require("express");
  const router = express.Router();
  const logger = require("../middleware/logger");
  const tecnmController = require("../controllers/controladorestecnm");

  // Q1. Listar las materias que un alumno ha cursado.
  router.get("/alumnos/:id/materias", logger, tecnmController.listarMateriasCursadasPorAlumno);
  // Q2. Listar los alumnos que están cursando una materia específica de un grupo específico.
  router.get("/grupos/:grupoId/materias/:materiaId/alumnos", logger, tecnmController.listarAlumnosPorMateriaYGrupo);
  // Q3. Listar las calificaciones de un alumno en todas sus materias cursadas.
  router.get("/alumnos/:id/calificaciones", logger, tecnmController.listarCalificacionesPorAlumno);
  // Q4. Listar los docentes que imparten una materia específica.
  router.get("/materias/:materiaId/docentes", logger, tecnmController.listarDocentesPorMateria);
  // Q5. Listar los alumnos que han obtenido una calificación superior a 90 en una materia específica.
  router.get("/materias/:materiaId/alumnos/calificaciones", logger, tecnmController.listarAlumnosConCalificacionSuperior);
  // Q6. Listar los grupos que correspondan a una materia específica.
  router.get("/materias/:materiaId/grupos", logger, tecnmController.listarGruposPorMateria);
  // Q7. Listar las materias que cursa un alumno en específico (horario).
  router.get("/alumnos/:id/horario", logger, tecnmController.listarMateriasPorHorarioAlumno);
  // Q8. Listar las materias que faltan por cursar a un alumno en específico.
  router.get("/alumnos/:id/materias/faltantes", logger, tecnmController.listarMateriasFaltantesPorAlumno);
  // Q9. Listar las materias que imparte un docente en específico, junto con los alumnos que cursan cada una de las materias.
  router.get("/docentes/:id/materias", logger, tecnmController.listarMateriasYAlumnosPorDocente);
  // CRUD Routes para alumnos
  router.get("/alumnos", logger, tecnmController.obtenerAlumnos);
  router.get("/alumnos/:id", logger, tecnmController.obtenerAlumno);
  router.post("/alumnos", logger, tecnmController.crearAlumno);
  router.put("/alumnos/:id", logger, tecnmController.actualizarAlumno);
  router.delete("/alumnos/:id", logger, tecnmController.eliminarAlumno);

  // Se sigue la misma estructura para las entidades: Docentes, Materias, Grupos, Aulas, Plan de Estudios.

  // RUTA para importación de datos de prueba
  router.post("/importar-datos", tecnmController.importarDatos);
  
  module.exports = router;
  ```
## **Modelos**
### **tecnm.js**
- **Definición de Modelos**: Este archivo define los esquemas y modelos de Mongoose para cada entidad del proyecto.
  ```js
  const mongoose = require("mongoose");

  const alumnoSchema = new mongoose.Schema({
      _id: String,
      nctrl: String,
      nombre: String,
      carrera: String,
      tecnologico: String,
      planDeEstudios: String,
      expedienteAcademico: [
          {
              materia: String,
              calificacion: Number,
              semestre: String
          }
      ],
      horario: [String]
  });

  const docenteSchema = new mongoose.Schema({
      _id: String,
      nombre: String,
      carrera: String,
      tecnologico: String,
      materiasImpartidas: [
          {
              materia: String,
              grupo: String,
              semestre: String
          }
      ]
  });

  // > Se siguen definiendo los esquemas para las entidades: Materia, Grupo, Aula, Plan de Estudios.

  const Alumno = mongoose.model("Alumno", alumnoSchema);
  const Docente = mongoose.model("Docente", docenteSchema);
  const Materia = mongoose.model("Materia", materiaSchema);
  const Grupo = mongoose.model("Grupo", grupoSchema);
  const Aula = mongoose.model("Aula", aulaSchema);
  const Plandeestudios = mongoose.model("Plandeestudios", planDeEstudiosSchema);

  module.exports = { Alumno, Docente, Materia, Grupo, Aula, Plandeestudios };
  ```
## **Middleware**
### **logger.js**
- **Middleware de Registro**: Este archivo define un middleware para registrar las peticiones HTTP.
  ```js
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
          console.log("Conectado a cliente de Redis de forma exitosa");
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
          const key = `${req.method}:${Date.now()
              }:${req.originalUrl}`;
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
  ```
## **Conexión**
### **connection.js**
- **Conexión a MongoDB y Redis**: Este archivo maneja la conexión a las bases de datos MongoDB y Redis.
  ```js
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
  ```
## **Dockerfile**
### **Dockerfile**
- **Configuración del Dockerfile**: Este archivo define cómo se construye la imagen de Docker para el proyecto.
  ```dockerfile
  FROM node
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  EXPOSE 3000
  CMD ["npm", "start"]
  ```
### **Dockerfile.mongo-init**
- **Configuración del Dockerfile para inicializar el ReplicaSet de MongoDB**: Este archivo define cómo se construye la imagen de Docker para la inicialización del ReplicaSet de MongoDB.
  ```dockerfile
  FROM mongo:latest
  COPY init-replica.sh /init-replica.sh
  RUN chmod +x /init-replica.sh
  CMD [ "bash", "-c", "/init-replica.sh & exec mongod --replSet replica01" ]
  ```
#### **init-replica.sh**
- **Archivo ejecutable que contiene los comandos de incialización del ReplicaSet de MongoDB**: Este archivo se ejecuta en una instancia shell del futuro contenedor primario del ReplicaSet de MongoDB.
  ```bash
  echo "Esperando a que MongoDB esté listo..."
  until mongosh --host mongo01 --eval "print(\"conexion exitosa\")"; do
    sleep 5
  done
  echo "Inicializando el replicaset..."
  mongosh --host mongo01 <<EOF
  rs.initiate({
    _id: 'replica01',
    members: [
      { _id: 0, host: 'mongo01:27017' },
      { _id: 1, host: 'mongo02:27017' },
      { _id: 2, host: 'mongo03:27017' }
    ]
  })
  EOF
  echo "Replicaset inicializado."
  exit 0
  ```
## **Docker Compose**
### **docker-compose.yml**
- **Configuración de Docker Compose**: Este archivo define los servicios necesarios para el proyecto, incluyendo MongoDB, Redis y la aplicación Node.js.
  ```yaml
  version: '3.8'

  services:
    app:
      build: .
      ports:
        - "3000:3000"
      depends_on:
        - redis02
        - mongo01
        - mongo02
        - mongo03
        - mongo-init-replica
      networks:
        - red02
      volumes:
        - /var/run/docker.sock:/var/run/docker.sock

    redis02:
      image: redis
      ports:
        - "6379:6379"
      networks:
        - red02

    mongo01:
      image: mongo:latest
      command: [ "mongod", "--replSet", "replica01" ]
      ports:
        - "27020:27017"
      networks:
        - red02

    mongo02:
      image: mongo:latest
      command: [ "mongod", "--replSet", "replica01" ]
      ports:
        - "27021:27017"
      networks:
        - red02

    mongo03:
      image: mongo:latest
      command: [ "mongod", "--replSet", "replica01" ]
      ports:
        - "27022:27017"
      networks:
        - red02

    mongo-init-replica:
      build:
        context: .
        dockerfile: Dockerfile.mongo-init
      depends_on:
        - mongo01
        - mongo02
        - mongo03
      networks:
        - red02

  networks:
    red02:
  ```
## **JSON Postman**
- **JSON Postman**: Este archivo contiene todas las peticiones necesarias para probar la API en Postman.
  ```json
  {
    "info": {
      "_postman_id": "34d735d8-9f57-444e-b2f8-92ba991f365c",
      "name": "TECNM",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
      "_exporter_id": "28686888"
    },
    "item": [
      // SUBCARPETAS CON PETICIONES DE: IMPORT DE DATOS, QUERYS Y CRUD's DE ENTIDADES.
    ]
  }
  ```
# **5. Dockerfile**
  ```dockerfile
FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```
# **6. docker-compose.yml**
  ```yaml
version: '3.8'

services:
app:
    build: .
    ports:
    - "3000:3000"
    depends_on:
    - redis02
    - mongo01
    - mongo02
    - mongo03
    - mongo-init-replica
    networks:
    - red02
    volumes:
    - /var/run/docker.sock:/var/run/docker.sock

redis02:
    image: redis
    ports:
    - "6379:6379"
    networks:
    - red02

mongo01:
    image: mongo:latest
    command: [ "mongod", "--replSet", "replica01" ]
    ports:
    - "27020:27017"
    networks:
    - red02

mongo02:
    image: mongo:latest
    command: [ "mongod", "--replSet", "replica01" ]
    ports:
    - "27021:27017"
    networks:
    - red02

mongo03:
    image: mongo:latest
    command: [ "mongod", "--replSet", "replica01" ]
    ports:
    - "27022:27017"
    networks:
    - red02

mongo-init-replica:
    build:
    context: .
    dockerfile: Dockerfile.mongo-init
    depends_on:
    - mongo01
    - mongo02
    - mongo03
    networks:
    - red02

networks:
red02:
```
# **7. Escenario de datos**
  ```js
use('tecnm')
db.alumnos.insertMany(
    [
        {
            "_id": "CURP001",
            "nctrl": "20180001",
            "nombre": "Ana L. Martínez",
            "carrera": "Ingeniería en Sistemas Computacionales",
            "tecnologico": "TecNM Campus Monterrey",
            "plandeestudios": "Plan001",
            "expedienteAcademico": [
                { "materia": "MAT001", "calificacion": 90, "semestre": "2020-1" },
                { "materia": "IND001", "calificacion": 75, "semestre": "2020-1" },
                { "materia": "CIV001", "calificacion": 95, "semestre": "2020-1" }
            ],
            "horario": ["G001", "G003", "G005"]
        },
        {
            "_id": "CURP002",
            "nctrl": "20180002",
            "nombre": "Juan Pérez",
            "carrera": "Ingeniería Mecatrónica",
            "tecnologico": "TecNM Campus Monterrey",
            "plandeestudios": "Plan001",
            "expedienteAcademico": [
                { "materia": "MEC001", "calificacion": 88, "semestre": "2020-1" },
                { "materia": "ELE001", "calificacion": 82, "semestre": "2020-1" }
            ],
            "horario": ["G002", "G004"]
        },
        {
            "_id": "CURP003",
            "nctrl": "20180003",
            "nombre": "María García",
            "carrera": "Ingeniería Industrial",
            "tecnologico": "TecNM Campus Guadalajara",
            "plandeestudios": "Plan001",
            "expedienteAcademico": [
                { "materia": "IND001", "calificacion": 75, "semestre": "2020-1" },
                { "materia": "MAT001", "calificacion": 90, "semestre": "2020-1" }
            ],
            "horario": ["G001", "G003"]
        },
        {
            "_id": "CURP004",
            "nctrl": "20180004",
            "nombre": "Carlos Vela",
            "carrera": "Ingeniería Electrónica",
            "tecnologico": "TecNM Campus Guadalajara",
            "plandeestudios": "Plan001",
            "expedienteAcademico": [
                { "materia": "ELE001", "calificacion": 82, "semestre": "2020-1" },
                { "materia": "MEC001", "calificacion": 88, "semestre": "2020-1" }
            ],
            "horario": ["G002", "G004"]
        },
        {
            "_id": "CURP005",
            "nctrl": "20180005",
            "nombre": "Sofía López",
            "carrera": "Ingeniería Civil",
            "tecnologico": "TecNM Campus México",
            "plandeestudios": "Plan001",
            "expedienteAcademico": [
                { "materia": "CIV001", "calificacion": 95, "semestre": "2020-1" },
                { "materia": "MAT001", "calificacion": 90, "semestre": "2020-1" }
            ],
            "horario": ["G001", "G005"]
        }
    ]
)

db.docentes.insertMany(
    [
        {
            "_id": "RFC001",
            "nombre": "Dr. José Ramírez",
            "carrera": "Ingeniería en Sistemas Computacionales",
            "tecnologico": "TecNM Campus Monterrey",
            "materiasImpartidas": [
                { "materia": "MAT001", "grupo": "G001", "semestre": "2023-1" },
                { "materia": "IND001", "grupo": "G003", "semestre": "2023-1" },
                { "materia": "ELE001", "grupo": "G004", "semestre": "2023-1" }
            ]
        },
        {
            "_id": "RFC002",
            "nombre": "Mtra. Laura Molina",
            "carrera": "Ingeniería Mecatrónica",
            "tecnologico": "TecNM Campus Monterrey",
            "materiasImpartidas": [
                { "materia": "MEC001", "grupo": "G002", "semestre": "2023-1" }
            ]
        },
        {
            "_id": "RFC003",
            "nombre": "Dr. Marco Antonio Solís",
            "carrera": "Ingeniería Industrial",
            "tecnologico": "TecNM Campus Guadalajara",
            "materiasImpartidas": [
                { "materia": "IND001", "grupo": "G003", "semestre": "2023-1" }
            ]
        },
        {
            "_id": "RFC004",
            "nombre": "Ing. Carmen Lugo",
            "carrera": "Ingeniería Electrónica",
            "tecnologico": "TecNM Campus Guadalajara",
            "materiasImpartidas": [
                { "materia": "ELE001", "grupo": "G004", "semestre": "2023-1" }
            ]
        },
        {
            "_id": "RFC005",
            "nombre": "Ing. Roberto Hernández",
            "carrera": "Ingeniería Civil",
            "tecnologico": "TecNM Campus México",
            "materiasImpartidas": [
                { "materia": "CIV001", "grupo": "G005", "semestre": "2023-1" }
            ]
        }
    ]
)

db.materias.insertMany(
    [
        {
            "_id": "MAT001",
            "nombre": "Álgebra Lineal",
            "carrera": "Ingeniería en Sistemas Computacionales",
            "descripcion": "Estudio de espacios vectoriales y transformaciones lineales",
            "plandeestudios": "Plan001"
        },
        {
            "_id": "MEC001",
            "nombre": "Termodinámica",
            "carrera": "Ingeniería Mecatrónica",
            "descripcion": "Fundamentos de la termodinámica y sus aplicaciones",
            "plandeestudios": "Plan001"
        },
        {
            "_id": "IND001",
            "nombre": "Optimización de Procesos",
            "carrera": "Ingeniería Industrial",
            "descripcion": "Técnicas de optimización y mejora continua en procesos industriales",
            "plandeestudios": "Plan001"
        },
        {
            "_id": "ELE001",
            "nombre": "Circuitos Eléctricos",
            "carrera": "Ingeniería Electrónica",
            "descripcion": "Análisis de circuitos en corriente alterna y continua",
            "plandeestudios": "Plan001"
        },
        {
            "_id": "CIV001",
            "nombre": "Estructuras de Concreto",
            "carrera": "Ingeniería Civil",
            "descripcion": "Diseño y análisis de estructuras de concreto armado",
            "plandeestudios": "Plan001"
        }
    ]
)

db.grupos.insertMany(
    [
        {
            "_id": "G001",
            "materia": "MAT001",
            "docente": "RFC001",
            "estudiantes": ["CURP001", "CURP003", "CURP005"],
            "aula": "A001",
            "horario": { "dia": "Lunes", "horaInicio": "10:00", "horaFin": "12:00" }
        },
        {
            "_id": "G002",
            "materia": "MEC001",
            "docente": "RFC002",
            "estudiantes": ["CURP002", "CURP004"],
            "aula": "A002",
            "horario": { "dia": "Martes", "horaInicio": "08:00", "horaFin": "10:00" }
        },
        {
            "_id": "G003",
            "materia": "IND001",
            "docente": "RFC003",
            "estudiantes": ["CURP003", "CURP001"],
            "aula": "A003",
            "horario": { "dia": "Miércoles", "horaInicio": "11:00", "horaFin": "13:00" }
        },
        {
            "_id": "G004",
            "materia": "ELE001",
            "docente": "RFC004",
            "estudiantes": ["CURP004", "CURP002"],
            "aula": "A004",
            "horario": { "dia": "Jueves", "horaInicio": "09:00", "horaFin": "11:00" }
        },
        {
            "_id": "G005",
            "materia": "CIV001",
            "docente": "RFC005",
            "estudiantes": ["CURP005", "CURP001"],
            "aula": "A005",
            "horario": { "dia": "Viernes", "horaInicio": "10:00", "horaFin": "12:00" }
        },
        {
            "_id": "G006",
            "materia": "IND001",
            "docente": "RFC001",
            "estudiantes": ["CURP001", "CURP003"],
            "aula": "A001",
            "horario": { "dia": "Martes", "horaInicio": "10:00", "horaFin": "12:00" }
        },
        {
            "_id": "G007",
            "materia": "ELE001",
            "docente": "RFC001",
            "estudiantes": ["CURP002", "CURP004"],
            "aula": "A002",
            "horario": { "dia": "Jueves", "horaInicio": "14:00", "horaFin": "16:00" }
        }
    ]
)

db.aulas.insertMany(
    [
        {
            "_id": "A001",
            "edificio": "Edificio de Ingenierías",
            "gruposAtendidos": ["G001", "G003"],
            "descripcionEquipamiento": "Pizarrón inteligente, proyector, 30 bancas."
        },
        {
            "_id": "A002",
            "edificio": "Edificio Central",
            "gruposAtendidos": ["G002"],
            "descripcionEquipamiento": "Pizarrón, sistema de audio, 50 bancas."
        },
        {
            "_id": "A003",
            "edificio": "Edificio de Ciencias",
            "gruposAtendidos": ["G004"],
            "descripcionEquipamiento": "Laboratorio equipado con osciloscopios y herramientas electrónicas."
        },
        {
            "_id": "A004",
            "edificio": "Edificio de Diseño",
            "gruposAtendidos": ["G005"],
            "descripcionEquipamiento": "Mesas de trabajo, material para maquetas, impresora 3D."
        },
        {
            "_id": "A005",
            "edificio": "Edificio Nuevo",
            "gruposAtendidos": ["G001", "G002", "G003", "G004", "G005"],
            "descripcionEquipamiento": "Pizarrón digital, Wi-Fi, aire acondicionado."
        }
    ]
)

db.plandeestudios.insertMany(
    [
        {
            "_id": "Plan001",
            "carrera": "Ingeniería en Sistemas Computacionales",
            "materias": ["MAT001", "IND001", "CIV001", "MEC001", "ELE001"],
            "totalCreditos": 240
        },
        {
            "_id": "Plan002",
            "carrera": "Ingeniería Mecatrónica",
            "materias": ["CIV001", "MEC001", "ELE001"],
            "totalCreditos": 160
        },
        {
            "_id": "Plan003",
            "carrera": "Ingeniería Industrial",
            "materias": ["MAT001", "CIV001", "MEC001", "ELE001"],
            "totalCreditos": 200
        }
    ]
)
```
# **8. JSON Postman para probar todas las querys de la colección**
  ```json
  {
    "info": {
      "_postman_id": "34d735d8-9f57-444e-b2f8-92ba991f365c",
      "name": "TECNM",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
      "_exporter_id": "28686888"
    },
    "item": [
      {
        "name": "IMPORT ESCENARIO",
        "item": [
          {
            "name": "importar datos de prueba",
            "request": {
              "method": "POST",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/importar-datos",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "importar-datos"
                ]
              }
            },
            "response": []
          }
        ],
        "description": "Importación de datos de prueba para el modelo \"tecnm\" para la colección de peticiones."
      },
      {
        "name": "QUERIES",
        "item": [
          {
            "name": "Q1. Listar las materias que un alumno ha cursado",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/alumnos/CURP001/materias",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "alumnos",
                  "CURP001",
                  "materias"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Q2. Listar los alumnos que están cursando una materia específica de un grupo específico",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/grupos/G001/materias/MAT001/alumnos",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "grupos",
                  "G001",
                  "materias",
                  "MAT001",
                  "alumnos"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Q3. Listar las calificaciones de un alumno en todas sus materias cursadas",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/alumnos/CURP001/calificaciones",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "alumnos",
                  "CURP001",
                  "calificaciones"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Q4. Listar los docentes que imparten una materia específica",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/materias/MAT001/docentes",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "materias",
                  "MAT001",
                  "docentes"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Q5. Listar los alumnos que han obtenido una calificación superior a 90 en una materia específica",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/materias/MAT001/alumnos/calificaciones",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "materias",
                  "MAT001",
                  "alumnos",
                  "calificaciones"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Q6. Listar los grupos que correspondan a una materia específica",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/materias/MAT001/grupos",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "materias",
                  "MAT001",
                  "grupos"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Q7. Listar las materias que cursa un alumno en específico (horario)",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/alumnos/CURP001/horario",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "alumnos",
                  "CURP001",
                  "horario"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Q8. Listar las materias que faltan por cursar a un alumno en específico",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/alumnos/CURP001/materias/faltantes",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "alumnos",
                  "CURP001",
                  "materias",
                  "faltantes"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Q9. Listar las materias que imparte un docente en específico, junto con los alumnos que cursan cada una de las materias",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/docentes/RFC001/materias",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "docentes",
                  "RFC001",
                  "materias"
                ]
              }
            },
            "response": []
          }
        ]
      },
      {
        "name": "ALUMNO (CRUD)",
        "item": [
          {
            "name": "Obtener Alumnos",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/alumnos",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "alumnos"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Obtener Alumno",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/alumnos/CURP001",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "alumnos",
                  "CURP001"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Crear Alumno",
            "request": {
              "method": "POST",
              "header": [
                {
                  "key": "Content-Type",
                  "value": "application/json"
                }
              ],
              "body": {
                "mode": "raw",
                "raw": "{\n    \"_id\": \"CURP006\",\n    \"nctrl\": \"20180006\",\n    \"nombre\": \"Luis Hernández\",\n    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n    \"tecnologico\": \"TecNM Campus Monterrey\",\n    \"planDeEstudios\": \"Plan001\",\n    \"expedienteAcademico\": [\n        { \"materia\": \"MAT001\", \"calificacion\": 90, \"semestre\": \"2020-1\" }\n    ],\n    \"horario\": [\"G001\"]\n}"
              },
              "url": {
                "raw": "http://localhost:3000/tecnm/alumnos",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "alumnos"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Actualizar Alumno",
            "request": {
              "method": "PUT",
              "header": [
                {
                  "key": "Content-Type",
                  "value": "application/json"
                }
              ],
              "body": {
                "mode": "raw",
                "raw": "{\n    \"nombre\": \"Luis Hernández Updated\",\n    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n    \"tecnologico\": \"TecNM Campus Monterrey Updated\"\n}"
              },
              "url": {
                "raw": "http://localhost:3000/tecnm/alumnos/CURP006",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "alumnos",
                  "CURP006"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Eliminar Alumno",
            "request": {
              "method": "DELETE",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/alumnos/CURP006",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "alumnos",
                  "CURP006"
                ]
              }
            },
            "response": []
          }
        ]
      },
      {
        "name": "DOCENTE (CRUD)",
        "item": [
          {
            "name": "Obtener Docentes",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/docentes",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "docentes"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Obtener Docente",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/docentes/RFC001",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "docentes",
                  "RFC001"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Crear Docente",
            "request": {
              "method": "POST",
              "header": [
                {
                  "key": "Content-Type",
                  "value": "application/json"
                }
              ],
              "body": {
                "mode": "raw",
                "raw": "{\n    \"_id\": \"RFC006\",\n    \"nombre\": \"Dr. Luis Ramírez\",\n    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n    \"tecnologico\": \"TecNM Campus Monterrey\",\n    \"materiasImpartidas\": [\n        { \"materia\": \"MAT001\", \"grupo\": \"G001\", \"semestre\": \"2023-1\" }\n    ]\n}"
              },
              "url": {
                "raw": "http://localhost:3000/tecnm/docentes",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "docentes"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Actualizar Docente",
            "request": {
              "method": "PUT",
              "header": [
                {
                  "key": "Content-Type",
                  "value": "application/json"
                }
              ],
              "body": {
                "mode": "raw",
                "raw": "{\n    \"nombre\": \"Dr. Luis Ramírez Updated\",\n    \"carrera\": \"Ingeniería en Sistemas Computacionales Updated\",\n    \"tecnologico\": \"TecNM Campus Monterrey Updated\"\n}"
              },
              "url": {
                "raw": "http://localhost:3000/tecnm/docentes/RFC006",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "docentes",
                  "RFC006"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Eliminar Docente",
            "request": {
              "method": "DELETE",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/docentes/RFC006",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "docentes",
                  "RFC006"
                ]
              }
            },
            "response": []
          }
        ]
      },
      {
        "name": "MATERIA (CRUD)",
        "item": [
          {
            "name": "Obtener Materias",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/materias",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "materias"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Obtener Materia",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/materias/MAT001",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "materias",
                  "MAT001"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Crear Materia",
            "request": {
              "method": "POST",
              "header": [
                {
                  "key": "Content-Type",
                  "value": "application/json"
                }
              ],
              "body": {
                "mode": "raw",
                "raw": "{\n    \"_id\": \"MAT006\",\n    \"nombre\": \"Cálculo Avanzado\",\n    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n    \"descripcion\": \"Estudio de funciones avanzadas y sus aplicaciones\",\n    \"planDeEstudios\": \"Plan001\"\n}"
              },
              "url": {
                "raw": "http://localhost:3000/tecnm/materias",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "materias"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Actualizar Materia",
            "request": {
              "method": "PUT",
              "header": [
                {
                  "key": "Content-Type",
                  "value": "application/json"
                }
              ],
              "body": {
                "mode": "raw",
                "raw": "{\n    \"nombre\": \"Cálculo Avanzado Updated\",\n    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n    \"descripcion\": \"Estudio de funciones avanzadas y sus aplicaciones Updated\",\n    \"planDeEstudios\": \"Plan001\"\n}"
              },
              "url": {
                "raw": "http://localhost:3000/tecnm/materias/MAT006",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "materias",
                  "MAT006"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Eliminar Materia",
            "request": {
              "method": "DELETE",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/materias/MAT006",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "materias",
                  "MAT006"
                ]
              }
            },
            "response": []
          }
        ]
      },
      {
        "name": "GRUPO (CRUD)",
        "item": [
          {
            "name": "Obtener Grupos",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/grupos",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "grupos"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Obtener Grupo",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/grupos/G001",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "grupos",
                  "G001"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Crear Grupo",
            "request": {
              "method": "POST",
              "header": [
                {
                  "key": "Content-Type",
                  "value": "application/json"
                }
              ],
              "body": {
                "mode": "raw",
                "raw": "{\n    \"_id\": \"G008\",\n    \"materia\": \"MAT002\",\n    \"docente\": \"RFC002\",\n    \"estudiantes\": [\"CURP001\", \"CURP002\"],\n    \"aula\": \"A001\",\n    \"horario\": { \"dia\": \"Lunes\", \"horaInicio\": \"12:00\", \"horaFin\": \"13:00\" }\n}"
              },
              "url": {
                "raw": "http://localhost:3000/tecnm/grupos",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "grupos"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Actualizar Grupo",
            "request": {
              "method": "PUT",
              "header": [
                {
                  "key": "Content-Type",
                  "value": "application/json"
                }
              ],
              "body": {
                "mode": "raw",
                "raw": "{\n    \"materia\": \"MAT004\",\n    \"docente\": \"RFC001\",\n    \"estudiantes\": [\"CURP003\", \"CURP004\"],\n    \"aula\": \"A001\",\n    \"horario\": { \"dia\": \"Martes\", \"horaInicio\": \"10:00\", \"horaFin\": \"12:00\" }\n}"
              },
              "url": {
                "raw": "http://localhost:3000/tecnm/grupos/G008",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "grupos",
                  "G008"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Eliminar Grupo",
            "request": {
              "method": "DELETE",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/grupos/G008",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "grupos",
                  "G008"
                ]
              }
            },
            "response": []
          }
        ]
      },
      {
        "name": "AULA (CRUD)",
        "item": [
          {
            "name": "Obtener Aulas",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/aulas",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "aulas"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Obtener Aula",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/aulas/A001",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "aulas",
                  "A001"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Crear Aula",
            "request": {
              "method": "POST",
              "header": [
                {
                  "key": "Content-Type",
                  "value": "application/json"
                }
              ],
              "body": {
                "mode": "raw",
                "raw": "{\n    \"_id\": \"A006\",\n    \"edificio\": \"Edificio Nuevo\",\n    \"gruposAtendidos\": [\"G001\", \"G002\"],\n    \"descripcionEquipamiento\": \"Pizarrón digital, Wi-Fi, aire acondicionado\"\n}"
              },
              "url": {
                "raw": "http://localhost:3000/tecnm/aulas",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "aulas"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Actualizar Aula",
            "request": {
              "method": "PUT",
              "header": [
                {
                  "key": "Content-Type",
                  "value": "application/json"
                }
              ],
              "body": {
                "mode": "raw",
                "raw": "{\n    \"edificio\": \"Edificio Nuevo Updated\",\n    \"gruposAtendidos\": [\"G003\", \"G004\"],\n    \"descripcionEquipamiento\": \"Pizarrón digital, Wi-Fi, aire acondicionado Updated\"\n}"
              },
              "url": {
                "raw": "http://localhost:3000/tecnm/aulas/A006",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "aulas",
                  "A006"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Eliminar Aula",
            "request": {
              "method": "DELETE",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/aulas/A006",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "aulas",
                  "A006"
                ]
              }
            },
            "response": []
          }
        ]
      },
      {
        "name": "PLAN DE ESTUDIOS (CRUD)",
        "item": [
          {
            "name": "Obtener Planes de Estudio",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/planes-de-estudios",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "planes-de-estudios"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Obtener Plan de Estudio",
            "request": {
              "method": "GET",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/planes-de-estudios/Plan001",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "planes-de-estudios",
                  "Plan001"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Crear Plan de Estudio",
            "request": {
              "method": "POST",
              "header": [
                {
                  "key": "Content-Type",
                  "value": "application/json"
                }
              ],
              "body": {
                "mode": "raw",
                "raw": "{\n    \"_id\": \"Plan004\",\n    \"carrera\": \"Ingeniería Química\",\n    \"materias\": [\"MAT001\", \"CIV001\", \"MEC001\", \"ELE001\"],\n    \"totalCreditos\": 200\n}"
              },
              "url": {
                "raw": "http://localhost:3000/tecnm/planes-de-estudios",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "planes-de-estudios"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Actualizar Plan de Estudio",
            "request": {
              "method": "PUT",
              "header": [
                {
                  "key": "Content-Type",
                  "value": "application/json"
                }
              ],
              "body": {
                "mode": "raw",
                "raw": "{\n    \"carrera\": \"Ingeniería Química\",\n    \"materias\": [\"MAT001\", \"CIV001\", \"MEC001\", \"ELE001\"],\n    \"totalCreditos\": 220\n}"
              },
              "url": {
                "raw": "http://localhost:3000/tecnm/planes-de-estudios/Plan004",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "planes-de-estudios",
                  "Plan004"
                ]
              }
            },
            "response": []
          },
          {
            "name": "Eliminar Plan de Estudio",
            "request": {
              "method": "DELETE",
              "header": [],
              "url": {
                "raw": "http://localhost:3000/tecnm/planes-de-estudios/Plan004",
                "protocol": "http",
                "host": [
                  "localhost"
                ],
                "port": "3000",
                "path": [
                  "tecnm",
                  "planes-de-estudios",
                  "Plan004"
                ]
              }
            },
            "response": []
          }
        ]
      }
    ]
  }  
  ```
# **EXTRA. auto-ReplicaSet**
  > Archivos extra necesarios para el levantamiento automático del replica-set mediante el uso de un contenedor temporal intermediario (mongo-init-replica).
  ## init-replica.sh
  ```bash
echo "Esperando a que MongoDB esté listo..."
until mongosh --host mongo01 --eval "print(\"conexion exitosa\")"; do
  sleep 5
done
echo "Inicializando el replicaset..."
mongosh --host mongo01 <<EOF
rs.initiate({
  _id: 'replica01',
  members: [
    { _id: 0, host: 'mongo01:27017' },
    { _id: 1, host: 'mongo02:27017' },
    { _id: 2, host: 'mongo03:27017' }
  ]
})
EOF
echo "Replicaset inicializado."
exit 0
```
  ## Dockerfile.mongo-init
  ```dockerfile
FROM mongo:latest
COPY init-replica.sh /init-replica.sh
RUN chmod +x /init-replica.sh
CMD [ "bash", "-c", "/init-replica.sh & exec mongod --replSet replica01" ]
```
`