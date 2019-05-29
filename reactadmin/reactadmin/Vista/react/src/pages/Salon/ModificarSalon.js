import React, {Component} from 'react';
import {URL, TOKEN} from './../../config/config';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import GrupoSelect from './../../componets/Grupo/Gruposelect'
import GradoSelect from './../../componets/Grado/Gradoselect'
import SweetAlert from 'sweetalert-react';
import axios from 'axios';

const SalonSchema = Yup.object().shape({
          // id_grado: Yup.string()
// .required('Campo requerido'),

   // id_grupo: Yup.string()
// .required('Campo requerido'),
});

class ModificarSalon extends Component {

    constructor(props){
        super(props);
        this.state = {
            sweetShow: false,
            sweetTitle: '',
            sweetText: '',
            sweetType: '',
            salon : null
        }
    }

    componentWillMount(){
        let id_grado_grupo = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/Salon/`+ id_grado_grupo,
            headers: {
                "Authorization": "bearer "+TOKEN
            }
          }).then(respuesta=>{
                let r = respuesta.data;
                this.setState({
                    salon : r.data
                });
          }).catch(error=>{
              alert("Error");
          });
    }


    volver(){
        this.props.history.push(`/Salon`);
    }
        modificar(value){
            axios({
                method: 'put',
                url: `${URL}/Salon/${this.state.salon.id_grado_grupo}`,
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
                        sweetTitle: "Genial",
                        sweetType: "success"
                    });
                        
                    }else{
                        this.setState({
                            sweetShow: true,
                            sweetText: datos.error,
                            sweetTitle: "Ops",
                            sweetType: "error"
                        });
                    }
              });
        }

        formulario(){
            return(
            <Formik
                initialValues={this.state.salon}
                validationSchema={SalonSchema}
                onSubmit={value=>{
                    this.modificar(value);
                }}
                >
                {({ errors, touched, values }) => (
                    <Form>
                        <div className="container">
                    <h1>Modificar salón</h1> 
                       
                      <div className="row">

  
  
  
                           <div className="col-6 form-group">
                           <label>Grado</label> 
                           <GradoSelect id_grado={this.state.salon.id_grado}/>
                           {errors.id_grado  && values.id_grado == ""  ? (
                          <div className="text-danger">{errors.id_grado }</div>
                          ) : null} 
                              </div>

                            <div className="col-6 form-group">
                           <label>Grupo</label> 
                           <GrupoSelect id_grupo={this.state.salon.id_grupo} />
                           {errors.id_grupo  && values.id_grupo == ""  ? (
                          <div className="text-danger">{errors.id_grupo }</div>
                          ) : null} 
                              </div>
                      
  
                    
                           < br/>
                           < br/>
                           < br/>
                            <div className="wrapp">
                            <div className = "col-1 form-group2">
                            <button type="submit" className="btn btn-success float-right">Modificar</button>
                            </div>

                            <div className = "col-1 form-group2">
                            <button onClick={()=>this.volver()} className="btn btn-danger">Cancelar</button>
                            </div> 
                            </div>
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
                this.state.salon != null ? this.formulario() : ''
            }
    <SweetAlert
                    show={this.state.sweetShow}
                    title={this.state.sweetTitle}
                    text={this.state.sweetText}
                    value={this.state.sweetType}
                    onConfirm={() => {
                        this.setState({ sweetShow: false })
                        this.props.history.push('/Salon');
                    }}
                />
    </div>
        );
    }
}

export default ModificarSalon;
