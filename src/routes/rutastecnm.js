// src/api/routes/rutastecnm.js
const express = require("express");
const router = express.Router();
//const cache = require("./cache");
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

module.exports = router;
