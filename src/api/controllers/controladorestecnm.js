// src/api/controllers/tecnmController.js
const { Alumno, Docente, Materia, Grupo, Aula, PlanDeEstudios } = require("../models/tecnm");

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

const listarAlumnosPorMateriaYGrupo = async (req, res) => {
    try {
        const grupoId = req.params.grupoId;
        const materiaId = req.params.materiaId;
        const grupo = await Grupo.aggregate([
            { $match: { "_id": grupoId, "materia": materiaId } },
            {
                $lookup: {
                    from: "alumnos",
                    localField: "estudiantes",
                    foreignField: "_id",
                    as: "detallesEstudiantes"
                }
            },
            { $unwind: "$detallesEstudiantes" },
            {
                $project: {
                    "nombreEstudiante": "$detallesEstudiantes.nombre",
                    "carreraEstudiante": "$detallesEstudiantes.carrera",
                    "_id": 0
                }
            }
        ]);

        if (!grupo || grupo.length === 0) {
            return res.status(404).send("Grupo o materia no encontrado");
        }

        res.json(grupo);
    } catch (error) {
        console.error("Error al obtener los alumnos del grupo:", error);
        res.status(500).send("Hubo un error al obtener los alumnos");
    }
};

const listarCalificacionesPorAlumno = async (req, res) => {
    try {
        const alumnoId = req.params.id;
        const calificaciones = await Alumno.aggregate([
            { $match: { "_id": alumnoId } },
            { $unwind: "$expedienteAcademico" },
            {
                $lookup: {
                    from: "materias",
                    localField: "expedienteAcademico.materia",
                    foreignField: "_id",
                    as: "infoMateria"
                }
            },
            { $unwind: "$infoMateria" },
            {
                $project: {
                    "materiaId": "$expedienteAcademico.materia",
                    "nombreMateria": "$infoMateria.nombre",
                    "calificacion": "$expedienteAcademico.calificacion",
                    "semestre": "$expedienteAcademico.semestre",
                    "_id": 0
                }
            }
        ]);

        if (!calificaciones || calificaciones.length === 0) {
            return res.status(404).send("Alumno o calificaciones no encontradas");
        }

        res.json(calificaciones);
    } catch (error) {
        console.error("Error al obtener las calificaciones del alumno:", error);
        res.status(500).send("Hubo un error al obtener las calificaciones del alumno");
    }
};

const listarDocentesPorMateria = async (req, res) => {
    try {
        const materiaId = req.params.materiaId;
        const docentes = await Docente.aggregate([
            { $match: { "materiasImpartidas.materia": materiaId } },
            { $unwind: "$materiasImpartidas" },
            { $match: { "materiasImpartidas.materia": materiaId } },
            {
                $lookup: {
                    from: "materias",
                    localField: "materiasImpartidas.materia",
                    foreignField: "_id",
                    as: "infoMateria"
                }
            },
            { $unwind: "$infoMateria" },
            {
                $project: {
                    "nombreDocente": "$nombre",
                    "materia": "$infoMateria.nombre",
                    "descripcionMateria": "$infoMateria.descripcion",
                    "semestre": "$materiasImpartidas.semestre",
                    "_id": 0
                }
            }
        ]);

        if (!docentes || docentes.length === 0) {
            return res.status(404).send("No se encontraron docentes para la materia especificada");
        }

        res.json(docentes);
    } catch (error) {
        console.error("Error al obtener los docentes de la materia:", error);
        res.status(500).send("Hubo un error al obtener los docentes");
    }
};

const listarAlumnosConCalificacionSuperior = async (req, res) => {
    try {
        const materiaId = req.params.materiaId;
        const alumnos = await Alumno.aggregate([
            { $unwind: "$expedienteAcademico" },
            {
                $match: {
                    "expedienteAcademico.materia": materiaId,
                    "expedienteAcademico.calificacion": { $gte: 90 }
                }
            },
            {
                $lookup: {
                    from: "materias",
                    localField: "expedienteAcademico.materia",
                    foreignField: "_id",
                    as: "infoMateria"
                }
            },
            { $unwind: "$infoMateria" },
            {
                $project: {
                    "nombreAlumno": "$nombre",
                    "nctrl": "$nctrl",
                    "carrera": "$carrera",
                    "tecnologico": "$tecnologico",
                    "materia": "$infoMateria.nombre",
                    "calificacion": "$expedienteAcademico.calificacion",
                    "semestre": "$expedienteAcademico.semestre"
                }
            }
        ]);

        if (!alumnos || alumnos.length === 0) {
            return res.status(404).send("No se encontraron alumnos con calificaciones superiores a 90 en la materia especificada");
        }

        res.json(alumnos);
    } catch (error) {
        console.error("Error al obtener los alumnos con calificaciones superiores a 90:", error);
        res.status(500).send("Hubo un error al obtener los alumnos");
    }
};

const listarGruposPorMateria = async (req, res) => {
    try {
        const materiaId = req.params.materiaId;
        const grupos = await Grupo.aggregate([
            { $match: { "materia": materiaId } },
            {
                $lookup: {
                    from: "docentes",
                    localField: "docente",
                    foreignField: "_id",
                    as: "infoDocente"
                }
            },
            {
                $lookup: {
                    from: "aulas",
                    localField: "aula",
                    foreignField: "_id",
                    as: "infoAula"
                }
            },
            { $unwind: "$infoDocente" },
            { $unwind: "$infoAula" },
            {
                $project: {
                    "grupoId": "$_id",
                    "docenteNombre": "$infoDocente.nombre",
                    "aulaEdificio": "$infoAula.edificio",
                    "aulaDescripcion": "$infoAula.descripcionEquipamiento",
                    "estudiantes": 1,
                    "horario": 1
                }
            }
        ]);

        if (!grupos || grupos.length === 0) {
            return res.status(404).send("No se encontraron grupos para la materia especificada");
        }

        res.json(grupos);
    } catch (error) {
        console.error("Error al obtener los grupos de la materia:", error);
        res.status(500).send("Hubo un error al obtener los grupos");
    }
};

const listarMateriasPorHorarioAlumno = async (req, res) => {
    try {
        const alumnoId = req.params.id;
        const horario = await Alumno.aggregate([
            { $match: { "_id": alumnoId } },
            { $unwind: "$horario" },
            {
                $lookup: {
                    from: "grupos",
                    localField: "horario",
                    foreignField: "_id",
                    as: "grupoInfo"
                }
            },
            { $unwind: "$grupoInfo" },
            {
                $lookup: {
                    from: "docentes",
                    localField: "grupoInfo.docente",
                    foreignField: "_id",
                    as: "infoDocente"
                }
            },
            { $unwind: "$infoDocente" },
            {
                $lookup: {
                    from: "materias",
                    localField: "grupoInfo.materia",
                    foreignField: "_id",
                    as: "infoMateria"
                }
            },
            { $unwind: "$infoMateria" },
            {
                $project: {
                    "nombreMateria": "$infoMateria.nombre",
                    "nombreDocente": "$infoDocente.nombre",
                    "grupoId": "$grupoInfo._id",
                    "horario": "$grupoInfo.horario",
                    "aula": "$grupoInfo.aula"
                }
            }
        ]);

        if (!horario || horario.length === 0) {
            return res.status(404).send("No se encontraron materias para el alumno especificado");
        }

        res.json(horario);
    } catch (error) {
        console.error("Error al obtener el horario del alumno:", error);
        res.status(500).send("Hubo un error al obtener el horario del alumno");
    }
};

const listarMateriasFaltantesPorAlumno = async (req, res) => {
    try {
        const alumnoId = req.params.id;
        const materiasFaltantes = await Alumno.aggregate([
            { $match: { "_id": alumnoId } },
            {
                $lookup: {
                    from: "planDeEstudios",
                    localField: "planDeEstudios",
                    foreignField: "_id",
                    as: "planInfo"
                }
            },
            { $unwind: "$planInfo" },
            {
                $project: {
                    "materiasCursadas": "$expedienteAcademico.materia",
                    "materiasRequeridas": "$planInfo.materias"
                }
            },
            {
                $project: {
                    "materiasFaltantes": {
                        $setDifference: ["$materiasRequeridas", "$materiasCursadas"]
                    }
                }
            },
            {
                $lookup: {
                    from: "materias",
                    localField: "materiasFaltantes",
                    foreignField: "_id",
                    as: "infoMateriasFaltantes"
                }
            },
            {
                $project: {
                    "materiasFaltantes": "$infoMateriasFaltantes.nombre"
                }
            }
        ]);

        if (!materiasFaltantes || materiasFaltantes.length === 0) {
            return res.status(404).send("No se encontraron materias faltantes para el alumno especificado");
        }

        res.json(materiasFaltantes);
    } catch (error) {
        console.error("Error al obtener las materias faltantes del alumno:", error);
        res.status(500).send("Hubo un error al obtener las materias faltantes del alumno");
    }
};

const listarMateriasYAlumnosPorDocente = async (req, res) => {
    try {
        const docenteId = req.params.id;
        const materiasImpartidas = await Docente.aggregate([
            { $match: { "_id": docenteId } },
            {
                $lookup: {
                    from: "grupos",
                    localField: "_id",
                    foreignField: "docente",
                    as: "gruposImpartidos"
                }
            },
            { $unwind: "$gruposImpartidos" },
            {
                $lookup: {
                    from: "materias",
                    localField: "gruposImpartidos.materia",
                    foreignField: "_id",
                    as: "infoMateria"
                }
            },
            { $unwind: "$infoMateria" },
            {
                $lookup: {
                    from: "alumnos",
                    localField: "gruposImpartidos.estudiantes",
                    foreignField: "_id",
                    as: "alumnosEnGrupo"
                }
            },
            {
                $project: {
                    "nombreDocente": "$nombre",
                    "materiaId": "$infoMateria._id",
                    "nombreMateria": "$infoMateria.nombre",
                    "descripcionMateria": "$infoMateria.descripcion",
                    "alumnos": {
                        $map: {
                            input: "$alumnosEnGrupo",
                            as: "alumno",
                            in: {
                                "nombreAlumno": "$$alumno.nombre",
                                "nctrl": "$$alumno.nctrl"
                            }
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        materiaId: "$materiaId",
                        nombreMateria: "$nombreMateria",
                        descripcionMateria: "$descripcionMateria"
                    },
                    docente: { $first: "$nombreDocente" },
                    alumnos: { $first: "$alumnos" }
                }
            },
            { $sort: { "_id.materiaId": 1 } }
        ]);

        if (!materiasImpartidas || materiasImpartidas.length === 0) {
            return res.status(404).send("No se encontraron materias impartidas para el docente especificado");
        }

        res.json(materiasImpartidas);
    } catch (error) {
        console.error("Error al obtener las materias impartidas por el docente:", error);
        res.status(500).send("Hubo un error al obtener las materias impartidas por el docente");
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
    listarMateriasYAlumnosPorDocente
};
