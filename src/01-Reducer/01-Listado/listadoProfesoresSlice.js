import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    informacion: []
}

export const listadoSlice = createSlice({
    name: 'listado',
    initialState: initialState,
    reducers: {
        setListado: (state, action) => {
            state.informacion = action.payload.informacion
        }
    },
})
// Action creators are generated for each case reducer function
export const { setListado } = listadoSlice.actions
export default listadoSlice.reducer