import React, {Component} from 'react';
import axios from 'axios';
import {
    Field
} from 'formik';

import {URL,TOKEN} from '../../config/config';

class IdasignaturaSelect extends Component{

    constructor(props){
        super(props);
        this.state = {
            asignatura : []
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: `${URL}/Asignatura/select_a`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
        }).then(respuesta=>{
            let datos = respuesta.data;
            if(datos.ok){
                this.setState({
                    asignatura : datos.data
                });
            }else{
                console.log("no");
            }
        });
    }

    listar(){
        if(this.state.asignatura.length > 0){
            let idasignatura  = this.props.idasignatura;

            return this.state.asignatura.map((e, i)=>
                <option value={idasignatura} key={i} value={e.idasignatura}> {e.nombre} </option>
            );

        }
    }

    render(){
        return (
            <Field component="select" name="idasignatura" className="form-control">
                <option value="">Seleccionar</option>
                {this.listar()}
            </Field>
        );
    }
}

export default IdasignaturaSelect;