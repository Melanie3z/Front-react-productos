import React, { Component } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import { URL } from './../../config/config';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SweetAlert from 'sweetalert-react';

class ModalEliminar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            producto: [],
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
        };
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal

        });

        setTimeout(() => {
            window.location = "/producto";
        }, 300);
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            modal: newProps.modal_eliminar,
            producto: newProps.producto
        });
    }

    eliminar(value) {

        axios({
            method: "delete",
            url: `${URL}/producto/${this.state.producto.id}`,

            data: value

        }).then(respuesta => {
            let datos = respuesta.data;

            if (datos.ok) {
                this.setState({
                    sweetShow: true,
                    sweetText: datos.mensaje,
                    sweetTitle: "Se eliminó correctamete",
                    sweetType: "success",

                });

                setTimeout(() => {
                    window.location = "/producto";
                }, 300);
                this.toggle();

                if (!this.SweetAlert) {
                    return;
                }

            } else {
                setTimeout(() => {
                    if (!this.SweetAlert) {
                        return;
                    }
                    this.setState({
                        sweetShow: true,
                        sweetText: datos.error,
                        sweetTitle: "Hubo problemas con la eliminación",
                        sweetType: "error"
                    });
                }, 100);
            }
        });
    }


    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} />
                    <ModalBody>
                        <Formik
                            initialValues={this.state.producto}
                            onSubmit={value => {
                                this.eliminar(value);
                            }}
                        >
                            {(
                                <Form>
                                    <center>
                                        <h3>¿Esta seguro que desea eliminar el producto?</h3>
                                    </center>

                                    <div className="row">
                                        <div className="col-12">


                                            <div className="col-12 form-group"></div>

                                            <center>
                                                <p>Esta opción es irreversible</p>
                                            </center>

                                        </div>
                                    </div>
                                    <br />
                                    <div className="col-1" />
                                    <div className="col-9">
                                        <ModalFooter>
                                            <Button type="submit" color="info" >
                                                Eliminar
                    </Button>
                                            <Button color="danger" onClick={this.toggle}>
                                                Cancelar
                    </Button>
                                        </ModalFooter>
                                    </div>
                                    <div className="col-2" />
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </Modal>

                <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => this.setState({ sweetShow: false })}
                />

            </div>
        );
    }
}

export default ModalEliminar;