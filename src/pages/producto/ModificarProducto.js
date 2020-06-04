import React, {Component} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';
import {URL} from './../../config/config';
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


class ModificarProducto extends Component {

    constructor(props){
        super(props);
         this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            producto : null
            
         }
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/producto/${id}`,
        }).then(respuesta=>{
            let r = respuesta.data; 
            this.setState({
                producto : r.data
            });
            
        }).catch(error=>{
            alert("Error al listar");
        });
    }
 
    modificar(value){
        axios({
            method: 'put',
            url: `${URL}/producto/${this.state.producto.id}`,
            data : value
        }).then(respuesta=>{
             let datos = respuesta.data;

             if(datos.ok){
                this.setState({
                    sweetShow: true, 
                    sweetTitle: datos.mensaje,
                    sweetText: "se modifico con exito",
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

    formulario(){
         return(
            <Formik
                initialValues={this.state.producto}
                validationSchema={ProductoSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <h1>Modificar Producto</h1>

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
                                <button type="submit" className="btn btn-warning float-right">Modificar</button>
                            </div>
                        </div>  
                    </Form>
                    )}
            </Formik>
         );
    }

    render(){

        return(

            <div>
               {
                   this.state.producto != null ? this.formulario() : ''
               }
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

export default ModificarProducto;