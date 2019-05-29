import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from '../../config/config';


class JornadaSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
        jornada: []
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/Jornadas/select_jo`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                jornada : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.jornada.length > 0 ){
        let id_jornada = this.props.id_jornada;
    
            return this.state.jornada.map((e , i) => 
               <option value={id_jornada}   key={i} value={e.id_jornada}> {e.nombre} </option>
               );
    }
}  

    render(){
        return(
            <Field component="select" name="id_jornada" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default JornadaSelect;