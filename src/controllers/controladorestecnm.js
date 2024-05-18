// src/controllers/controladorestecnm.js
const { Alumno, Docente, Materia, Grupo, Aula, Plandeestudios } = require("../models/tecnm");

// Q1. Listar las materias que un alumno ha cursado.
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

// Q2. Listar los alumnos que están cursando una materia específica de un grupo específico.
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

// Q3. Listar las calificaciones de un alumno en todas sus materias cursadas.
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

// Q4. Listar los docentes que imparten una materia específica.
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

// Q5. Listar los alumnos que han obtenido una calificación superior a 90 en una materia específica.
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

// Q6. Listar los grupos que correspondan a una materia específica.
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

// Q7. Listar las materias que cursa un alumno en específico (horario).
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

// Q8. Listar las materias que faltan por cursar a un alumno en específico.
const listarMateriasFaltantesPorAlumno = async (req, res) => {
    try {
        const alumnoId = req.params.id;
        const materiasFaltantes = await Alumno.aggregate([
            { $match: { "_id": alumnoId } },
            {
                $lookup: {
                    from: "plandeestudios",
                    localField: "plandeestudios",
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

// Q9. Listar las materias que imparte un docente en específico, junto con los alumnos que cursan cada una de las materias.
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

// Métodos CRUD para Alumno
const obtenerAlumnos = async (req, res) => {
    try {
        const alumnos = await Alumno.find();
        res.json(alumnos);
    } catch (error) {
        console.error("Error al obtener los alumnos:", error);
        res.status(500).send("Hubo un error al obtener los alumnos");
    }
};

const obtenerAlumno = async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);
        if (!alumno) {
            return res.status(404).send("Alumno no encontrado");
        }
        res.json(alumno);
    } catch (error) {
        console.error("Error al obtener el alumno:", error);
        res.status(500).send("Hubo un error al obtener el alumno");
    }
};

const crearAlumno = async (req, res) => {
    try {
        const nuevoAlumno = new Alumno(req.body);
        await nuevoAlumno.save();
        res.status(201).json(nuevoAlumno);
    } catch (error) {
        console.error("Error al crear el alumno:", error);
        res.status(500).send("Hubo un error al crear el alumno");
    }
};

const actualizarAlumno = async (req, res) => {
    try {
        const alumnoId = req.params.id;
        const alumnoActualizado = await Alumno.findByIdAndUpdate(alumnoId, req.body, { new: true });
        if (!alumnoActualizado) {
            return res.status(404).send("Alumno no encontrado");
        }
        res.json(alumnoActualizado);
    } catch (error) {
        console.error("Error al actualizar el alumno:", error);
        res.status(500).send("Hubo un error al actualizar el alumno");
    }
};

const eliminarAlumno = async (req, res) => {
    try {
        const alumnoId = req.params.id;
        const alumnoEliminado = await Alumno.findByIdAndDelete(alumnoId);
        if (!alumnoEliminado) {
            return res.status(404).send("Alumno no encontrado");
        }
        res.json(alumnoEliminado);
    } catch (error) {
        console.error("Error al eliminar el alumno:", error);
        res.status(500).send("Hubo un error al eliminar el alumno");
    }
};

// Métodos CRUD para Docente
const obtenerDocentes = async (req, res) => {
    try {
        const docentes = await Docente.find();
        res.json(docentes);
    } catch (error) {
        console.error("Error al obtener los docentes:", error);
        res.status(500).send("Hubo un error al obtener los docentes");
    }
};

const obtenerDocente = async (req, res) => {
    try {
        const docente = await Docente.findById(req.params.id);
        if (!docente) {
            return res.status(404).send("Docente no encontrado");
        }
        res.json(docente);
    } catch (error) {
        console.error("Error al obtener el docente:", error);
        res.status(500).send("Hubo un error al obtener el docente");
    }
};

const crearDocente = async (req, res) => {
    try {
        const nuevoDocente = new Docente(req.body);
        await nuevoDocente.save();
        res.status(201).json(nuevoDocente);
    } catch (error) {
        console.error("Error al crear el docente:", error);
        res.status(500).send("Hubo un error al crear el docente");
    }
};

const actualizarDocente = async (req, res) => {
    try {
        const docenteId = req.params.id;
        const docenteActualizado = await Docente.findByIdAndUpdate(docenteId, req.body, { new: true });
        if (!docenteActualizado) {
            return res.status(404).send("Docente no encontrado");
        }
        res.json(docenteActualizado);
    } catch (error) {
        console.error("Error al actualizar el docente:", error);
        res.status(500).send("Hubo un error al actualizar el docente");
    }
};

const eliminarDocente = async (req, res) => {
    try {
        const docenteId = req.params.id;
        const docenteEliminado = await Docente.findByIdAndDelete(docenteId);
        if (!docenteEliminado) {
            return res.status(404).send("Docente no encontrado");
        }
        res.json(docenteEliminado);
    } catch (error) {
        console.error("Error al eliminar el docente:", error);
        res.status(500).send("Hubo un error al eliminar el docente");
    }
};

// Métodos CRUD para Materia
const obtenerMaterias = async (req, res) => {
    try {
        const materias = await Materia.find();
        res.json(materias);
    } catch (error) {
        console.error("Error al obtener las materias:", error);
        res.status(500).send("Hubo un error al obtener las materias");
    }
};

const obtenerMateria = async (req, res) => {
    try {
        const materia = await Materia.findById(req.params.id);
        if (!materia) {
            return res.status(404).send("Materia no encontrada");
        }
        res.json(materia);
    } catch (error) {
        console.error("Error al obtener la materia:", error);
        res.status(500).send("Hubo un error al obtener la materia");
    }
};

const crearMateria = async (req, res) => {
    try {
        const nuevaMateria = new Materia(req.body);
        await nuevaMateria.save();
        res.status(201).json(nuevaMateria);
    } catch (error) {
        console.error("Error al crear la materia:", error);
        res.status(500).send("Hubo un error al crear la materia");
    }
};

const actualizarMateria = async (req, res) => {
    try {
        const materiaId = req.params.id;
        const materiaActualizada = await Materia.findByIdAndUpdate(materiaId, req.body, { new: true });
        if (!materiaActualizada) {
            return res.status(404).send("Materia no encontrada");
        }
        res.json(materiaActualizada);
    } catch (error) {
        console.error("Error al actualizar la materia:", error);
        res.status(500).send("Hubo un error al actualizar la materia");
    }
};

const eliminarMateria = async (req, res) => {
    try {
        const materiaId = req.params.id;
        const materiaEliminada = await Materia.findByIdAndDelete(materiaId);
        if (!materiaEliminada) {
            return res.status(404).send("Materia no encontrada");
        }
        res.json(materiaEliminada);
    } catch (error) {
        console.error("Error al eliminar la materia:", error);
        res.status(500).send("Hubo un error al eliminar la materia");
    }
};

// Métodos CRUD para Grupo
const obtenerGrupos = async (req, res) => {
    try {
        const grupos = await Grupo.find();
        res.json(grupos);
    } catch (error) {
        console.error("Error al obtener los grupos:", error);
        res.status(500).send("Hubo un error al obtener los grupos");
    }
};

const obtenerGrupo = async (req, res) => {
    try {
        const grupo = await Grupo.findById(req.params.id);
        if (!grupo) {
            return res.status(404).send("Grupo no encontrado");
        }
        res.json(grupo);
    } catch (error) {
        console.error("Error al obtener el grupo:", error);
        res.status(500).send("Hubo un error al obtener el grupo");
    }
};

const crearGrupo = async (req, res) => {
    try {
        const nuevoGrupo = new Grupo(req.body);
        await nuevoGrupo.save();
        res.status(201).json(nuevoGrupo);
    } catch (error) {
        console.error("Error al crear el grupo:", error);
        res.status(500).send("Hubo un error al crear el grupo");
    }
};

const actualizarGrupo = async (req, res) => {
    try {
        const grupoId = req.params.id;
        const grupoActualizado = await Grupo.findByIdAndUpdate(grupoId, req.body, { new: true });
        if (!grupoActualizado) {
            return res.status(404).send("Grupo no encontrado");
        }
        res.json(grupoActualizado);
    } catch (error) {
        console.error("Error al actualizar el grupo:", error);
        res.status(500).send("Hubo un error al actualizar el grupo");
    }
};

const eliminarGrupo = async (req, res) => {
    try {
        const grupoId = req.params.id;
        const grupoEliminado = await Grupo.findByIdAndDelete(grupoId);
        if (!grupoEliminado) {
            return res.status(404).send("Grupo no encontrado");
        }
        res.json(grupoEliminado);
    } catch (error) {
        console.error("Error al eliminar el grupo:", error);
        res.status(500).send("Hubo un error al eliminar el grupo");
    }
};

// Métodos CRUD para Aula
const obtenerAulas = async (req, res) => {
    try {
        const aulas = await Aula.find();
        res.json(aulas);
    } catch (error) {
        console.error("Error al obtener las aulas:", error);
        res.status(500).send("Hubo un error al obtener las aulas");
    }
};

const obtenerAula = async (req, res) => {
    try {
        const aula = await Aula.findById(req.params.id);
        if (!aula) {
            return res.status(404).send("Aula no encontrada");
        }
        res.json(aula);
    } catch (error) {
        console.error("Error al obtener el aula:", error);
        res.status(500).send("Hubo un error al obtener el aula");
    }
};

const crearAula = async (req, res) => {
    try {
        const nuevaAula = new Aula(req.body);
        await nuevaAula.save();
        res.status(201).json(nuevaAula);
    } catch (error) {
        console.error("Error al crear el aula:", error);
        res.status(500).send("Hubo un error al crear el aula");
    }
};

const actualizarAula = async (req, res) => {
    try {
        const aulaId = req.params.id;
        const aulaActualizada = await Aula.findByIdAndUpdate(aulaId, req.body, { new: true });
        if (!aulaActualizada) {
            return res.status(404).send("Aula no encontrada");
        }
        res.json(aulaActualizada);
    } catch (error) {
        console.error("Error al actualizar el aula:", error);
        res.status(500).send("Hubo un error al actualizar el aula");
    }
};

const eliminarAula = async (req, res) => {
    try {
        const aulaId = req.params.id;
        const aulaEliminada = await Aula.findByIdAndDelete(aulaId);
        if (!aulaEliminada) {
            return res.status(404).send("Aula no encontrada");
        }
        res.json(aulaEliminada);
    } catch (error) {
        console.error("Error al eliminar el aula:", error);
        res.status(500).send("Hubo un error al eliminar el aula");
    }
};

// Métodos CRUD para plandeestudios
const obtenerPlanesDeEstudio = async (req, res) => {
    try {
        const planesDeEstudio = await Plandeestudios.find();
        res.json(planesDeEstudio);
    } catch (error) {
        console.error("Error al obtener los planes de estudio:", error);
        res.status(500).send("Hubo un error al obtener los planes de estudio");
    }
};

const obtenerplandeestudios = async (req, res) => {
    try {
        const plandeestudios = await Plandeestudios.findById(req.params.id);
        if (!plandeestudios) {
            return res.status(404).send("Plan de estudios no encontrado");
        }
        res.json(plandeestudios);
    } catch (error) {
        console.error("Error al obtener el plan de estudios:", error);
        res.status(500).send("Hubo un error al obtener el plan de estudios");
    }
};

const crearplandeestudios = async (req, res) => {
    try {
        const nuevoPlan = new Plandeestudios(req.body);
        await nuevoPlan.save();
        res.status(201).json(nuevoPlan);
    } catch (error) {
        console.error("Error al crear el plan de estudios:", error);
        res.status(500).send("Hubo un error al crear el plan de estudios");
    }
};

const actualizarplandeestudios = async (req, res) => {
    try {
        const planId = req.params.id;
        const planActualizado = await Plandeestudios.findByIdAndUpdate(planId, req.body, { new: true });
        if (!planActualizado) {
            return res.status(404).send("Plan de estudios no encontrado");
        }
        res.json(planActualizado);
    } catch (error) {
        console.error("Error al actualizar el plan de estudios:", error);
        res.status(500).send("Hubo un error al actualizar el plan de estudios");
    }
};

const eliminarplandeestudios = async (req, res) => {
    try {
        const planId = req.params.id;
        const planEliminado = await Plandeestudios.findByIdAndDelete(planId);
        if (!planEliminado) {
            return res.status(404).send("Plan de estudios no encontrado");
        }
        res.json(planEliminado);
    } catch (error) {
        console.error("Error al eliminar el plan de estudios:", error);
        res.status(500).send("Hubo un error al eliminar el plan de estudios");
    }
};

// CONTROLADOR de importación de datos de prueba
const importarDatos = async (req, res) => {
    try {
        // Datos de prueba
        const alumnos = [
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
        ];

        const docentes = [
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
        ];

        const materias = [
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
        ];

        const grupos = [
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
        ];

        const aulas = [
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
        ];

        const planesDeEstudio = [
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
        ];

        // Inserción de datos
        await Alumno.insertMany(alumnos);
        await Docente.insertMany(docentes);
        await Materia.insertMany(materias);
        await Grupo.insertMany(grupos);
        await Aula.insertMany(aulas);
        await Plandeestudios.insertMany(planesDeEstudio);

        res.status(201).send("Datos importados exitosamente");
    } catch (error) {
        if (error.code === 11000) {
            // Error de duplicación de clave
            console.error("Error de duplicación:", error);
            res.status(409).send("Error: Datos duplicados encontrados");
        } else {
            // Cualquier otro tipo de error
            console.error("Error al importar los datos:", error);
            res.status(500).send("Hubo un error al importar los datos");
        }
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
    listarMateriasYAlumnosPorDocente,
    obtenerAlumno,
    obtenerAlumnos,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno,
    obtenerDocente,
    obtenerDocentes,
    crearDocente,
    actualizarDocente,
    eliminarDocente,
    obtenerMateria,
    obtenerMaterias,
    crearMateria,
    actualizarMateria,
    eliminarMateria,
    obtenerGrupo,
    obtenerGrupos,
    crearGrupo,
    actualizarGrupo,
    eliminarGrupo,
    obtenerAula,
    obtenerAulas,
    crearAula,
    actualizarAula,
    eliminarAula,
    obtenerplandeestudios,
    obtenerPlanesDeEstudio,
    crearplandeestudios,
    actualizarplandeestudios,
    eliminarplandeestudios,
    importarDatos
};
