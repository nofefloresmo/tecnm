# **Incluir estructura del proyecto.**
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
# **Modelado de datos (MongoDB, Redis).**
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
# **Tabla de endpoints.**
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
    - **Q1** Listar las materias que un alumno ha cursado.
    - **Q2** Listar los alumnos que están cursando una materia específica de un grupo específico.
    - **Q3** Listar las calificaciones de un alumno en todas sus materias cursadas.
    - **Q4** Listar los docentes que imparten una materia específica.
    - **Q5** Listar los alumnos que han obtenido una calificación superior a 90 en una materia específica.
    - **Q6** Listar los grupos que corresponden a una materia específica.
    - **Q7** Listar las materias que cursa un alumno en específico (horario).
    - **Q8** Listar las materias que faltan por cursar a un alumno en específico.
    - **Q9** Listar las materias que imparte un docente en específico, junto con los alumnos que cursan cada una de las materias.
# **Códigos y procedimientos documentados.**
# **Dockerfile.**
    ```dockerfile
    FROM node
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    EXPOSE 3000
    CMD ["npm", "start"]
    ```
# **docker-compose.yml.**
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
# **Escenario de datos.**
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
# **JSON Postman para probar todas las querys de la colección.**
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
