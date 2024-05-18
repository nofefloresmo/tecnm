# TecNM
1. Incluir estructura del proyecto.
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
2. Modelado de datos (MongoDB, Redis).
  ## Mongo
    #### Alumnos
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
- request:<timestamp>: 
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
- response:<timestamp>: 
  > Almacena los detalles de la respuesta.
  ```json
  {
    "data": "object",
    "status": "number"
  }
  ```
3. Tabla de endpoints.
4. Códigos y procedimientos documentados.
5. Dockerfile.
6. docker-compose.yml.
7. Escenario de datos.
8. JSON Postman para probar todas las querys de la colección.
