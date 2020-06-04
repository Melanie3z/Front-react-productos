import React, {Component} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';
import {URL} from './../../config/config';
import { Nav, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import CategoriaSelect from './../../components/CategoriaSelect';


const ProductoSchema = Yup.object().shape({
    nombre_producto: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Required'),
    referencia: Yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    precio: Yup.string()
        .required('Required'),
    peso: Yup.string()
        .required('Required'),
    id_categoria : Yup.string()
        .required('Required'),
    stock: Yup.string()
        .required('Required'),
});


class CrearProducto extends Component {

    constructor(props){
        super(props);
         this.state = {
            producto: '',
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
         }
    }

    producto = {
        nombre_producto : '',
        referencia : '',
        precio : '',
        peso : '', 
        id_categoria : '',
        stock : ''

    }

    

    guardar(value){
        axios({
            method: 'post',
            url: `${URL}/producto`,
            data : value
        }).then(respuesta=>{
             let datos = respuesta.data;

             if(datos.ok){
                this.setState({
                    sweetShow: true, 
                    sweetTitle: datos.mensaje,
                    sweetText: "Registro exitoso",
                    sweetType: "success"
                 });

             }else{
                 this.setState({
                    sweetShow: true,
                    sweetTitle: datos.error,
                    sweetText: "Fallo",
                    sweetType: "error"
                 });
             }
             
        });
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
                

                <Formik
                    initialValues={this.producto}
                    validationSchema={ProductoSchema}
                    onSubmit={value=>{
                        this.guardar(value);
                    }}
                >
                    {({ errors, touched }) => (

                        

                        <Form>
                            <h1>Crear Producto</h1>

                            <div className="row">
                                
                                <div className="col-6 form-group">
                                    <label>Nombre</label>
                                    <Field name="nombre_producto" className="form-control" />
                                    {errors.nombre_producto && touched.nombre_producto ? (
                                    <div className="text-danger" >{errors.nombre_producto}</div>
                                    ) : null}
                                </div>

                                <div className="col-6 form-group">
                                    <label>Referencia</label>
                                    <Field name="referencia" className="form-control" />
                                    {errors.referencia && touched.referencia ? (
                                    <div className="text-danger" >{errors.referencia}</div>
                                    ) : null}
                                </div>
                            
                                <div className="col-6 form-group">
                                    <label>Precio</label>                                   
                                    <Field name="precio" className="form-control"/>
                                    {errors.precio && touched.precio ? (
                                    <div className="text-danger" >{errors.precio}</div>
                                    ) : null}
                                </div>
                                                
                                <div className="col-6 form-group">
                                    <label>Peso</label>
                                    <Field name="peso" className="form-control"/>
                                    {errors.peso && touched.peso ? (
                                    <div className="text-danger" >{errors.peso}</div>
                                    ) : null}
                                </div>

                                <div className="col-6 form-group">
                                <label>Categoria</label>
                                <CategoriaSelect id_categoria ={this.state.producto.id_categoria } />
                                {errors.id_categoria  && touched.id_categoria  ? (
                                <div className="text-danger" >{errors.id_categoria }</div>
                                ) : null}
                                </div> 

                                <div className="col-6 form-group">
                                    <label>Stock</label>
                                    <Field name="stock" className="form-control"/>
                                    {errors.stock && touched.stock ? (
                                    <div className="text-danger" >{errors.stock}</div>
                                    ) : null}
                                </div>

                                <br/>
                                <br/>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-success float-right">Crear</button>
                                </div>
                            </div>  
                        </Form>
                    )}
            </Formik>
                <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/producto');
                    }}
                />
          </div>
        );
    }
}

export default CrearProducto;