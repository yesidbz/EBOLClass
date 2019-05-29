import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from '../../config/config';


class AsignarSalonSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
        grado_grupo_alumno: [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/AsignarSalonSelect/select_as`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                grado_grupo_alumno : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.grado_grupo_alumno.length > 0 ){
        let id_grado_grupo_alumno = this.props.id_grado_grupo_alumno;
    
            return this.state.grado_grupo_alumno.map((e , i) => 
               <option value={id_grado_grupo_alumno}   key={i} value={e.id_grado_grupo_alumno}> {e.id_grado_grupo_alumno} </option>
               );
    }
}  

    render(){
        return(
            <Field component="select" name="id_grado_grupo_alumno" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default AsignarSalonSelect;