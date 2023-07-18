import React, { useRef, useState, useEffect } from "react";
import { Tabla } from "./Tabla";
import { v4 as uuid } from 'uuid'


const KEY = 'todolist-todos';//nombre del arreglo en el local storage

export function Estudiante() {
    const [todos, setTodos] = useState(
        JSON.parse(localStorage.getItem(KEY)) ? JSON.parse(localStorage.getItem(KEY)) : []
    );
    const nomRef = useRef();
    const apellRef = useRef();
    const rutRef = useRef();
    const asignRef = useRef();
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);//cuando cambie el todos se guarda en localStorage
    const agregaTarea = () => {
        //console.log("Agregando tarea");
        const nombre = nomRef.current.value;
        const apellido = apellRef.current.value;
        const rut = rutRef.current.value;
        const asignatura = asignRef.current.value;
        const id = uuid();
        if (nombre === '' && apellido === '' && rut === '' && asignatura === '') return;
        setTodos((prevTodos) => {
            const newTask = {
                id: id,
                nombre: nombre,
                apellido: apellido,
                rut: rut,
                asignatura: asignatura,
                complete: false
            }
            return [...prevTodos, newTask]
        });
        nomRef.current.value = "";
        apellRef.current.value = "";
        rutRef.current.value = "";
        asignRef.current.value = "";
    }
    const ResumenTareas = () => {
        const cantidad = cantidadTareas();
        if (cantidad > 0) {
            return (<div className="alert alert-info mt-3">
                {cantidad} alumnos registrados!
            </div>);
        } else {
            return (<div className="alert alert-info mt-3">
                no hay alumnos registrados!
            </div>);
        }
    }
    const cantidadTareas = () => {
        return todos.filter((todo) => !todo.complete).length;
    }

    const cambiarEstadoTarea = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.complete = !todo.complete;
        setTodos(newTodos);
    }

    const eliminarTareasCompletadas = () => {
        const newTodos = todos.filter((todo) => !todo.complete);
        setTodos(newTodos);
    }
    
    const guardar = (id, nombre, apellido, rut, asignatura) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.nombre = nombre;
        todo.apellido = apellido;
        todo.rut = rut;
        todo.asignatura = asignatura;
        setTodos(newTodos);
    };



    return (
        <>
            <h1>Registro asignatura</h1>
            <div className="input-group mb-3 mt-4">
                <input ref={nomRef} placeholder="Ingrese un nombre" className="form-control" type="text" name="" dir="">
                </input>
            </div>
            <div className="input-group mb-3 mt-4">
                <input ref={apellRef} placeholder="Ingrese un apellido" className="form-control" type="text" name="" dir="">
                </input>
            </div>
            <div className="input-group mb-3 mt-4">
                <input ref={rutRef} placeholder="Ingrese un rut" className="form-control" type="text" name="" dir="">
                </input>
            </div>
            <div className="input-group mb-3 mt-4">
                <input ref={asignRef} placeholder="Ingrese una asignatura " className="form-control" type="text" name="" dir="">
                </input>
            </div>
            <div className="input-group mb-3 mt-4">
                <button onClick={agregaTarea} className="btn btn-success ms-2"><i className="bi bi-plus-circle-fill">
                </i></button>
                <button onClick={eliminarTareasCompletadas} className="btn btn-danger ms-2"><i className="bi bi-trash">
                </i></button>


            </div>

            <table className = "table table-striped table-bordered lg-12">
            <thead>
                <tr>
                    <th>      </th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>RUT</th>
                    <th>Asignatura</th>
                    <th>         </th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => <Tabla todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea} guardar={guardar}></Tabla>)}
            </tbody>
            </table> 
            <ResumenTareas />
        </>
    );
}