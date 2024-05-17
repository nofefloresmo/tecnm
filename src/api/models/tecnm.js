const mongoose = require("mongoose");

// Define el esquema para Alumnos
const AlumnoSchema = new mongoose.Schema({
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

// Define el esquema para Docentes
const DocenteSchema = new mongoose.Schema({
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

// Define el esquema para Materias
const MateriaSchema = new mongoose.Schema({
    _id: String,
    nombre: String,
    carrera: String,
    descripcion: String,
    planDeEstudios: String
});

// Define el esquema para Grupos
const GrupoSchema = new mongoose.Schema({
    _id: String,
    materia: String,
    docente: String,
    estudiantes: [String],
    aula: String,
    horario: {
        dia: String,
        horaInicio: String,
        horaFin: String
    }
});

// Define el esquema para Aulas
const AulaSchema = new mongoose.Schema({
    _id: String,
    edificio: String,
    gruposAtendidos: [String],
    descripcionEquipamiento: String
});

// Define el esquema para Planes de Estudio
const PlanDeEstudiosSchema = new mongoose.Schema({
    _id: String,
    carrera: String,
    materias: [String],
    totalCreditos: Number
});

/* // Crea los modelos a partir de los esquemas, especificando los nombres de las colecciones en plural (excepto planDeEstudios)
const Alumno = mongoose.model("Alumno", AlumnoSchema, "alumnos");
const Docente = mongoose.model("Docente", DocenteSchema, "docentes");
const Materia = mongoose.model("Materia", MateriaSchema, "materias");
const Grupo = mongoose.model("Grupo", GrupoSchema, "grupos");
const Aula = mongoose.model("Aula", AulaSchema, "aulas");
const PlanDeEstudios = mongoose.model("PlanDeEstudios", PlanDeEstudiosSchema, "planDeEstudios"); */

// Crea los modelos a partir de los esquemas, especificando los nombres de las colecciones
const Alumno = mongoose.model("Alumno", AlumnoSchema);
const Docente = mongoose.model("Docente", DocenteSchema);
const Materia = mongoose.model("Materia", MateriaSchema);
const Grupo = mongoose.model("Grupo", GrupoSchema);
const Aula = mongoose.model("Aula", AulaSchema);
const PlanDeEstudios = mongoose.model("PlanDeEstudios", PlanDeEstudiosSchema);

module.exports = { Alumno, Docente, Materia, Grupo, Aula, PlanDeEstudios };