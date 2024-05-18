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
- **Códigos y procedimientos documentados.**
- **Dockerfile.**
	```dockerfile
	FROM node
	WORKDIR /app
	COPY package*.json ./
	RUN npm install
	COPY . .
	EXPOSE 3000
	CMD ["npm", "start"]
	```
- **docker-compose.yml.**
- **Escenario de datos.**
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
- **JSON Postman para probar todas las querys de la colección.**
