import React, { Component } from 'react';
import axios from 'axios';
import { Field } from 'formik';
import {URL} from './../config/config';

class CategoriaSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoria: []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `${URL}/producto`,
        }).then(respuesta => { 
            let datos = respuesta.data;

            if (datos.ok) {
                this.setState({
                    categoria: datos.data_categorias 
                });
            }

        });
    }

    listar() {
        if (this.state.categoria.length > 0) { 
            let id = this.props.id_categoria;
            return this.state.categoria.map((e, i) =>
                <option value={id} key={i} value={e.id_categoria}>{e.nombre_categoria}</option>
            );

        }
    }

    render() {
        return (
            <Field component="select" id="id_categoria" name="id_categoria" className="form-control">
                <option value="">Seleccionar</option>
                {this.listar()}
            </Field>
        );

    }
}

export default CategoriaSelect;