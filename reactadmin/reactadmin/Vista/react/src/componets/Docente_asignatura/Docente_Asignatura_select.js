import React, {Component} from 'react';
import axios from 'axios';
import {
    Field
} from 'formik';

import {URL,TOKEN} from '../../config/config';

class Docente_Asignatura_select extends Component{

    constructor(props){
        super(props);
        this.state = {
            das : []
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: `${URL}/Asignatura/selectda`,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
        }).then(respuesta=>{
            let datos = respuesta.data;
            if(datos.ok){
                this.setState({
                    das : datos.data
                });
            }else{
                console.log("no");
            }
        });
    }

    listar(){
        if(this.state.das.length > 0){
            let id_docente_asignatura  = this.props.id_docente_asignatura;

            return this.state.das.map((e, i)=>
                <option value={id_docente_asignatura} key={i} value={e.id_docente_asignatura}> {e.id_docente_asignatura} </option>
            );

        }
    }

    render(){
        return (
            <Field component="select" name="id_docente_asignatura" className="form-control">
                <option value="">Seleccionar</option>
                {this.listar()}
            </Field>
        );
    }
}

export default Docente_Asignatura_select;