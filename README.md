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
	- **Q1**
		> Listar las materias que un alumno ha cursado.
	- **Q2**
		> Listar los alumnos que están cursando una materia específica de un grupo específico.
	```
	- **Q3**
		> Listar las calificaciones de un alumno en todas sus materias cursadas.
	- **Q4**
		> Listar los docentes que imparten una materia específica.
	- **Q5**
		> Listar los alumnos que han obtenido una calificación superior a 90 en una materia específica.
	- **Q6**
		> Listar los grupos que corresponden a una materia específica.
	- **Q7**
		> Listar las materias que cursa un alumno en específico (horario).
	- **Q8**
		> Listar las materias que faltan por cursar a un alumno en específico.
	- **Q9**
		> Listar las materias que imparte un docente en específico, junto con los alumnos que cursan cada una de las materias.
- **Códigos y procedimientos documentados.**
- **Dockerfile.**
- **docker-compose.yml.**
- **Escenario de datos.**
- **JSON Postman para probar todas las querys de la colección.**
