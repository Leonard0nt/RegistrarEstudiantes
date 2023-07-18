import React, { useRef, useState, useEffect } from "react";
import { Estudiante } from "./Estudiante";




export function Tabla({ todo, cambiarEstado, guardar}) {
    const { id, nombre, apellido, rut, asignatura, complete } = todo;

    const fnCambiarEstado = () => {
        cambiarEstado(id);
    }

    const [isEditing, setIsEditing] = useState(false);

    const nombreRef = useRef();
    const apellidoRef = useRef();
    const rutRef = useRef();
    const asignaturaRef = useRef();

    const editarTarea = () => {
        setIsEditing(true);
    };

    const cancelarEdicion = () => {
        setIsEditing(false)
    }

    const guardarEdicion = () => {
        const nombre = nombreRef.current.value;
        const apellido = apellidoRef.current.value;
        const rut = rutRef.current.value;
        const asignatura = asignaturaRef.current.value;
        guardar(id,nombre,apellido,rut,asignatura)
        setIsEditing(false)
    }
        return (
            <tr>
                <td>
                    <input
                        className="form-check-input"
                        onChange={fnCambiarEstado}
                        checked={complete}
                        type="checkbox"
                    />
                </td>
                {isEditing ? (
                    <>
                        <td>
                            <input ref={nombreRef} defaultValue={nombre} />
                        </td>
                        <td>
                            <input ref={apellidoRef} defaultValue={apellido} />
                        </td>
                        <td>
                            <input ref={rutRef} defaultValue={rut} />
                        </td>
                        <td>
                            <input ref={asignaturaRef} defaultValue={asignatura} />
                        </td>
                        <td>
                            <a href="#" onClick ={guardarEdicion}>Guardar</a>
                            <br />
                            <a href="#" onClick={cancelarEdicion}>Cancelar</a>
                        </td>
                    </>
                ) : (
                    <>
                        <td>{nombre}</td>
                        <td>{apellido}</td>
                        <td>{rut}</td>
                        <td>{asignatura}</td>
                        <td><a href="#" onClick={editarTarea}>Editar</a></td>
                    </>
                )}
            </tr>
        );
    }