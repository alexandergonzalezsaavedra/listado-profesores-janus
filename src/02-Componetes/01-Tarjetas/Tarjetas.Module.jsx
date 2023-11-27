/* eslint-disable react-hooks/exhaustive-deps */
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setListado } from '../../01-Reducer/01-Listado/listadoProfesoresSlice'
const TarjetasModule = () => {
    let dispatch = useDispatch()
    const [listado, setListadoProfesores] = useState([])
    useEffect(() => {
        data()
    }, [])
    const data = async () => {
        try {
            let info = await fetch('https://gsb.urosario.edu.co/gsb_urosario_edu_co/media/janus/json/profesores-janus.json')
            let resInfo = await info.json()
            setListadoProfesores(resInfo.profesores)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        dispatch(setListado({
            informacion: listado
        }))
    }, [listado])
    const { nombre, cargo } = useSelector(state => state.infoFiltro)
    let resultado
    if (!nombre && !cargo) {
        resultado = listado
    } else {
        resultado = listado.filter((dato) => {
            return (
                dato.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replaceAll(/;/g, "").toLowerCase().includes(nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replaceAll(/;/g, "").toLowerCase())
                &&
                dato.escuelaFacultad.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replaceAll(/;/g, "").toLowerCase().includes(cargo.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replaceAll(/;/g, "").toLowerCase())
            )
        })
    }
    const Items = ({ currentItems }) => {
        return (
            <>
                {
                    currentItems &&
                    currentItems.map((item, i) => {
                        let { nombre, correo, escuelaFacultad, imagen } = item
                        let ruta = nombre.toLowerCase().replaceAll(" ", "-").replaceAll(",", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, '').replaceAll(/;/g, "")
                        return (
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-1 position-relative" key={i}>
                                <div className="IntegranteJanus">
                                    <div className="row">
                                        <div className="col-12 col-md-3 col-lg-3">
                                            <img src={imagen} alt={`Universidad del Rosario - ${nombre}`} />
                                        </div>
                                        <div className="col-12 col-md-9 col-lg-9 align-self-center py-1">
                                            <h4>{nombre}</h4>
                                            <p>
                                                <strong>Facultad o Escuela: </strong><span>{escuelaFacultad}</span>
                                                <br />
                                                <span><a href={`mailto:${correo}`}>{correo}</a></span>
                                            </p>
                                            <div className="mas-ficha position-absolute bottom-0 text-ligh">
                                                <a href={`https://urosario.edu.co/janus/nuestros-integrantes/profesor?${ruta}`}>+</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        );
    }
    const PaginatedItems = ({ itemsPerPage }) => {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = resultado.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(resultado.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % resultado.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    className="pagination d-flex justify-content-center my-3"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    activeLinkClassName="active"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                />
            </>
        );
    }
    return (
        <div className="row">
            {
                (() => {
                    if (resultado.length <= 0) {
                        return (
                            <h3>
                                Sin Coincidencias
                            </h3>
                        )
                    } else {
                        return (
                            <PaginatedItems itemsPerPage={8} />
                        )
                    }
                })()
            }
        </div>
    )
}
export default TarjetasModule