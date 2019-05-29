import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from '../../config/config';


class EstudianteSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
         estudiante: [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/EstudianteSelect/select_e`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                  estudiante : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.estudiante.length > 0 ){
        let id = this.props.id;
    
            return this.state.estudiante.map((e , i) => 
               <option value={id}   key={i} value={e.id}> {e.Primer_nombre}</option>
               );
    }
}  

    render(){
        return(
            <Field component="select" name="idestudiante" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default EstudianteSelect;