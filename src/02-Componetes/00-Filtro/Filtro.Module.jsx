import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import { setFiltro } from '../../01-Reducer/00-Filtro/filtroSlice'

const FiltroModule = () => {
    let { informacion } = useSelector(state => state.listadoProfesores)
    let depurarOpciones = informacion.filter((data, index, j) =>
        index === j.findIndex((t) => (t.id === data.id && t.escuelaFacultad === data.escuelaFacultad))
    )
    let ordenarData = depurarOpciones.sort()
    let opciones = ordenarData.map((item, i) => {
        let { escuelaFacultad } = item
        return (
            escuelaFacultad
        )
    })
    let ordenarOpciones = opciones.sort()
    let pintarOpciones = ordenarOpciones.map((item, i) => {
        return (
            <option key={i} value={item}>{item}</option>
        )
    })
    const dispatch = useDispatch()
    const initialState = { nombre: '', cargo: '' }
    const [campos, setCampos] = useState(initialState)
    let { nombre, cargo } = campos
    const handleChange = (e) => {
        let { name, type, value, checked } = e.target
        setCampos((old) => ({
            ...old,
            [name]: type === 'checkbox' ? checked : value
        }))
    }
    const limpiarFiltro = (e) => {
        e.preventDefault()
        dispatch(setFiltro({
            nombre: "",
            cargo: ""
        }))
        setCampos(initialState)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setFiltro({
            nombre: nombre,
            cargo: cargo
        }))
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center">
                <div className="col-sm-4">
                    <input
                        className='form-control rounded-0'
                        placeholder='Nombre'
                        type="text"
                        name='nombre'
                        id='nombre'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-sm-4">
                    <select
                        className='form-select rounded-0'
                        name='cargo'
                        id='cargo'
                        value={cargo}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione</option>
                        {pintarOpciones}
                    </select>
                </div>
                <div className="col-sm-3">
                    <button className='btn btn-primary rounded-0'>
                        Buscar
                    </button>
                    <button className='btn btn-danger rounded-0' onClick={limpiarFiltro}>
                        Limpiar
                    </button>
                </div>
            </div>
        </form>
    )
}
export default FiltroModule
