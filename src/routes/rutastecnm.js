// src/routes/rutastecnm.js
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

// CRUD Routes para docentes
router.get("/docentes", logger, tecnmController.obtenerDocentes);
router.get("/docentes/:id", logger, tecnmController.obtenerDocente);
router.post("/docentes", logger, tecnmController.crearDocente);
router.put("/docentes/:id", logger, tecnmController.actualizarDocente);
router.delete("/docentes/:id", logger, tecnmController.eliminarDocente);

// CRUD Routes para materias
router.get("/materias", logger, tecnmController.obtenerMaterias);
router.get("/materias/:id", logger, tecnmController.obtenerMateria);
router.post("/materias", logger, tecnmController.crearMateria);
router.put("/materias/:id", logger, tecnmController.actualizarMateria);
router.delete("/materias/:id", logger, tecnmController.eliminarMateria);

// CRUD Routes para grupos
router.get("/grupos", logger, tecnmController.obtenerGrupos);
router.get("/grupos/:id", logger, tecnmController.obtenerGrupo);
router.post("/grupos", logger, tecnmController.crearGrupo);
router.put("/grupos/:id", logger, tecnmController.actualizarGrupo);
router.delete("/grupos/:id", logger, tecnmController.eliminarGrupo);

// CRUD Routes para aulas
router.get("/aulas", logger, tecnmController.obtenerAulas);
router.get("/aulas/:id", logger, tecnmController.obtenerAula);
router.post("/aulas", logger, tecnmController.crearAula);
router.put("/aulas/:id", logger, tecnmController.actualizarAula);
router.delete("/aulas/:id", logger, tecnmController.eliminarAula);

// CRUD Routes para planes de estudios
router.get("/planes-de-estudios", logger, tecnmController.obtenerPlanesDeEstudio);
router.get("/planes-de-estudios/:id", logger, tecnmController.obtenerplandeestudios);
router.post("/planes-de-estudios", logger, tecnmController.crearplandeestudios);
router.put("/planes-de-estudios/:id", logger, tecnmController.actualizarplandeestudios);
router.delete("/planes-de-estudios/:id", logger, tecnmController.eliminarplandeestudios);

// RUTA para importación de datos de prueba
router.post("/importar-datos", tecnmController.importarDatos);

module.exports = router;
