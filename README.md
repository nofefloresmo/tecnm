# TecNM
- **Incluir estructura del proyecto.**
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
- **Modelado de datos (MongoDB, Redis).**
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
- **Tabla de endpoints.**
	```markdown
	| Método | Endpoint                                      | Descripción                                                |
	|--------|-----------------------------------------------|------------------------------------------------------------|
	| GET    | /tecnm/alumnos/:id/materias                   | Listar las materias que un alumno ha cursado               |
	| GET    | /tecnm/grupos/:grupoId/materias/:materiaId/alumnos | Listar los alumnos que están cursando una materia específica de un grupo específico |
	| GET    | /tecnm/alumnos/:id/calificaciones             | Listar las calificaciones de un alumno en todas sus materias cursadas |
	| GET    | /tecnm/materias/:materiaId/docentes           | Listar los docentes que imparten una materia específica     |
	| GET    | /tecnm/materias/:materiaId/alumnos/calificaciones | Listar los alumnos que han obtenido una calificación superior a 90 en una materia específica |
	| GET    | /tecnm/materias/:materiaId/grupos             | Listar los grupos que corresponden a una materia específica |
	| GET    | /tecnm/alumnos/:id/horario                    | Listar las materias que cursa un alumno en específico (horario) |
	| GET    | /tecnm/alumnos/:id/materias/faltantes         | Listar las materias que faltan por cursar a un alumno en específico |
	| GET    | /tecnm/docentes/:id/materias                  | Listar las materias que imparte un docente en específico, junto con los alumnos que cursan cada una de las materias |
	| GET    | /tecnm/alumnos                                | Obtener todos los alumnos                                   |
	| GET    | /tecnm/alumnos/:id                            | Obtener un alumno por ID                                    |
	| POST   | /tecnm/alumnos                                | Crear un nuevo alumno                                       |
	| PUT    | /tecnm/alumnos/:id                            | Actualizar un alumno por ID                                 |
	| DELETE | /tecnm/alumnos/:id                            | Eliminar un alumno por ID                                   |
	| GET    | /tecnm/docentes                               | Obtener todos los docentes                                  |
	| GET    | /tecnm/docentes/:id                           | Obtener un docente por ID                                   |
	| POST   | /tecnm/docentes                               | Crear un nuevo docente                                      |
	| PUT    | /tecnm/docentes/:id                           | Actualizar un docente por ID                                |
	| DELETE | /tecnm/docentes/:id                           | Eliminar un docente por ID                                  |
	| GET    | /tecnm/materias                               | Obtener todas las materias                                  |
	| GET    | /tecnm/materias/:id                           | Obtener una materia por ID                                  |
	| POST   | /tecnm/materias                               | Crear una nueva materia                                     |
	| PUT    | /tecnm/materias/:id                           | Actualizar una materia por ID                               |
	| DELETE | /tecnm/materias/:id                           | Eliminar una materia por ID                                 |
	| GET    | /tecnm/grupos                                 | Obtener todos los grupos                                    |
	| GET    | /tecnm/grupos/:id                             | Obtener un grupo por ID                                     |
	| POST   | /tecnm/grupos                                 | Crear un nuevo grupo                                        |
	| PUT    | /tecnm/grupos/:id                             | Actualizar un grupo por ID                                  |
	| DELETE | /tecnm/grupos/:id                             | Eliminar un grupo por ID                                    |
	| GET    | /tecnm/aulas                                  | Obtener todas las aulas                                     |
	| GET    | /tecnm/aulas/:id                              | Obtener un aula por ID                                      |
	| POST   | /tecnm/aulas                                  | Crear una nueva aula                                        |
	| PUT    | /tecnm/aulas/:id                              | Actualizar un aula por ID                                   |
	| DELETE | /tecnm/aulas/:id                              | Eliminar un aula por ID                                     |
	| GET    | /tecnm/plan-de-estudios                       | Obtener todos los planes de estudios                        |
	| GET    | /tecnm/plan-de-estudios/:id                   | Obtener un plan de estudios por ID                          |
	| POST   | /tecnm/plan-de-estudios                       | Crear un nuevo plan de estudios                             |
	| PUT    | /tecnm/plan-de-estudios/:id                   | Actualizar un plan de estudios por ID                       |
	| DELETE | /tecnm/plan-de-estudios/:id                   | Eliminar un plan de estudios por ID                         |
	```
- **Códigos y procedimientos documentados.**
- **Dockerfile.**
- **docker-compose.yml.**
- **Escenario de datos.**
- **JSON Postman para probar todas las querys de la colección.**
