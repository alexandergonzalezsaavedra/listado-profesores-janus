import { configureStore } from '@reduxjs/toolkit'

import filtroReducer from '../01-Reducer/00-Filtro/filtroSlice'
import listadoReducer from '../01-Reducer/01-Listado/listadoProfesoresSlice'

export const store = configureStore({
    reducer: {
        infoFiltro: filtroReducer,
        listadoProfesores: listadoReducer
    },
})