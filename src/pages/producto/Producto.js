import React, {Component} from 'react';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';
import {URL} from './../../config/config';
import { Nav, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import { FaEdit, FaTrash} from "react-icons/fa";
import ModalEliminar from "./ModalEliminar";


class Producto extends Component {

    constructor(props){
        super(props); 
        this.state =  {
            productos : [],
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            modal_eliminar: false
        }
    }

    llamar_listar(){
        axios({
            method: 'get',
            url: `${URL}/producto`,
        }).then(respuesta=>{
            let r = respuesta.data; 
            this.setState({
                productos : r.data,
                modal_eliminar: false,
            });
        }).catch(error=>{
            alert("Error al listar");
        });
    }

    editar(id){
        this.props.history.push(`/producto/modificar/${id}`);
        this.setState({
            modal_eliminar: false,
            });
        
    }

    modal_eliminar(id) {
        axios({
          method: "get",
          url: `${URL}/producto/${id}`,
          })
          .then(respuesta => {
            let r = respuesta.data;
            this.setState({
            productos: r.data,
            modal_eliminar: true,
            });
            })
          .catch(error => {
            console.log(error);
        });
       }
    
    componentDidMount(){
        this.llamar_listar();
    }

    boton_estado(clase, texto, id){
        return (<button onClick={()=>{
            this.cambiar_estado(id);
        }} className={clase}>{texto}</button>)
    }

    listar(){
        if(this.state.productos.length > 0){ 
            return this.state.productos.map((e, i)=>
            <tr key={i}>
                <td>{e.nombre_producto}</td>
                <td>{e.referencia}</td>
                <td>{e.precio}</td>
                <td>{e.peso}</td>
                <td>{e.id_categoria }</td>
                <td>{e.stock}</td>
                <td>
                    <button onClick={()=>this.editar(e.id)} className="btn btn-primary"><FaEdit /></button>
                <span />
                <span />
                <button onClick={() => this.modal_eliminar(e.id)} className="btn btn-danger" ><FaTrash /></button>

                </td>
            </tr>
            );
        }
    }
    
    cargando(){
        return(
            <tr>
                <td colSpan="7" className="text-center" ><img src="/ajax-loader.gif" /></td>
            </tr>
        );
    }

    render(){
        return(
            <div>
                 <hr/>
                <Nav>

                <NavItem>
                    <Link className="nav-link" to="/producto">Productos</Link>
                </NavItem>

                <NavItem>
                    <Link className="nav-link" to="/producto/crear">Crear Productos</Link>
                </NavItem>

                </Nav>
                <hr/>
                <br/>

                <h1>Productos</h1>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Referencia</th>
                            <th>Precio</th>
                            <th>Peso</th>
                            <th>Categoria</th>
                            <th>Stock</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.listar()==null?this.cargando():this.listar()}
                    </tbody>
                </table>
                <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => this.setState({sweetShow: false })}
               />

            <ModalEliminar
             modal_eliminar={this.state.modal_eliminar}
             producto={this.state.productos} />


            </div>
           
        );
    }
}

export default Producto;