use('tecnm')
db.alumnos.insertMany(
    [
        {
            "_id": "CURP001",
            "nctrl": "20180001",
            "nombre": "Ana L. Martínez",
            "carrera": "Ingeniería en Sistemas Computacionales",
            "tecnologico": "TecNM Campus Monterrey",
            "planDeEstudios": "Plan001",
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
            "planDeEstudios": "Plan001",
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
            "planDeEstudios": "Plan001",
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
            "planDeEstudios": "Plan001",
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
            "planDeEstudios": "Plan001",
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
            "planDeEstudios": "Plan001"
        },
        {
            "_id": "MEC001",
            "nombre": "Termodinámica",
            "carrera": "Ingeniería Mecatrónica",
            "descripcion": "Fundamentos de la termodinámica y sus aplicaciones",
            "planDeEstudios": "Plan001"
        },
        {
            "_id": "IND001",
            "nombre": "Optimización de Procesos",
            "carrera": "Ingeniería Industrial",
            "descripcion": "Técnicas de optimización y mejora continua en procesos industriales",
            "planDeEstudios": "Plan001"
        },
        {
            "_id": "ELE001",
            "nombre": "Circuitos Eléctricos",
            "carrera": "Ingeniería Electrónica",
            "descripcion": "Análisis de circuitos en corriente alterna y continua",
            "planDeEstudios": "Plan001"
        },
        {
            "_id": "CIV001",
            "nombre": "Estructuras de Concreto",
            "carrera": "Ingeniería Civil",
            "descripcion": "Diseño y análisis de estructuras de concreto armado",
            "planDeEstudios": "Plan001"
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

db.planDeEstudios.insertMany(
    [
        {
            "_id": "Plan001",
            "carrera": "Ingeniería en Sistemas Computacionales",
            "materias": ["MAT001", "IND001", "CIV001", "MEC001", "ELE001"],
            "totalCreditos": 240
        }
    ]
)