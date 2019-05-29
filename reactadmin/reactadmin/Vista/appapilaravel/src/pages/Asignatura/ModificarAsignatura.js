import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AreaSelect from './../../componets/Area/Areaselect'
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const AsignaturaSchema = Yup.object().shape({
   
});

class ModificarAsignatura extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            asignatura : null
        }
    }

    componentWillMount(){
        let idasignatura = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/Materia/`+ idasignatura,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    asignatura : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }

        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Materia/${this.state.asignatura.idasignatura}`,
                headers: {
                    "Authorization": "bearer "+TOKEN
                },
                data : value
              }).then(respuesta=>{
                let datos = respuesta.data;
                if(datos.ok){
                    this.setState({
                        sweetShow: true,
                        sweetText: datos.mensaje,
                        sweetTitle: "Hola",
                        sweetType: "success"
                    });
                        
                    }else{
                        this.setState({
                            sweetShow: true,
                            sweetText: datos.error,
                            sweetTitle: "Hola",
                            sweetType: "error"
                        });
                    }
              });
        }

        formulario(){
            return(
            <Formik
                initialValues={this.state.idasignatura}
                validationSchema={AsignaturaSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                    <h1>MODIFICAR ASIGNATURA</h1> 
                       
                      <div className="row">

  
                      <div className="col-12 form-group ">
                        <label>Nombre</label>
                        <Field name="nombre" className="form-control" />
                        {errors.nombre && touched.nombre ? (
                        <div className="text-danger">{errors.nombre}</div>
                        ) : null}   
                        </div>
  
                           <div className="col-6 form-group">
                           <label>idgrado</label> 
                           <AreaSelect id_area={this.state.asignatura.id_area}/>
                           {errors.id_area  && values.id_area == ""  ? (
                          <div className="text-danger">{errors.id_area }</div>
                          ) : null} 
                              </div>


                      
  
                    
                           < br/>
                           < br/>
                           < br/>
                              <div className = "col-1 form-group2">
                              <button type="submit" className="btn btn-success float-right">Modificar</button>
                              </div>
                      </div>
  
  
  
                              
                </Form>
                )}
        </Formik>);
        }

    render(){
        return(
            <div>
            {
                this.state.asignatura != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Materia');
                    }}
                />
    </div>
        );
    }
}

export default ModificarAsignatura;
