import React, {Component} from 'react';
import axios from 'axios';
import {
    Field
} from 'formik';

import {URL,TOKEN} from '../../config/config';

export default class IddimensionSelect extends Component{

    constructor(props){
        super(props);
        this.state = {
            dimension : []
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: `${URL}/Dimensiones/select`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
        }).then(respuesta=>{
            let datos = respuesta.data;
            if(datos.ok){
                this.setState({
                    dimension : datos.data
                });
            }else{
                console.log(datos);
            }
        });
    }

    listar(){
        if(this.state.dimension.length > 0){
            return this.state.dimension.map((e, i)=>
                <option key={i} value={e.iddimension}> {e.porcentaje} </option>
            );

        }
    }

    render(){
        return (
            <Field component="select" name="id_dimension" className="form-control">
                <option>Seleccionar</option>
                {this.listar()}
            </Field>
        );
    }
}
