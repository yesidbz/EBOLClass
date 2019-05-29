import React, {Component} from 'react';
import axios from 'axios';
import {
    Field
} from 'formik';

import {URL,TOKEN} from '../../config/config';

class PlaneacionSelect extends Component{

    constructor(props){
        super(props);
        this.state = {
            planeacion : []
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: `${URL}/Asignatura/selectpl`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
        }).then(respuesta=>{
            let datos = respuesta.data;
            if(datos.ok){
                this.setState({
                planeacion : datos.data
                });
            }else{
                console.log("no");
            }
        });
    }

    listar(){
        if(this.state.planeacion.length > 0){
            let idplaneacion  = this.props.idplaneacion;

            return this.state.planeacion.map((e, i)=>
                <option value={idplaneacion} key={i} value={e.idplaneacion}> {e.idplaneacion} </option>
            );

        }
    }

    render(){
        return (
            <Field component="select" name="id_planeacion" className="form-control">
                <option value="">Seleccionar</option>
                {this.listar()}
            </Field>
        );
    }
}

export default PlaneacionSelect;