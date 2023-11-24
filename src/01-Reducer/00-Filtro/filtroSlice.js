import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    nombre: '',
    cargo: ''
}

export const filtroSlice = createSlice({
    name: 'filtro',
    initialState: initialState,
    reducers: {
        setFiltro: (state, action) => {
            state.nombre = action.payload.nombre;
            state.cargo = action.payload.cargo;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setFiltro } = filtroSlice.actions

export default filtroSlice.reducer