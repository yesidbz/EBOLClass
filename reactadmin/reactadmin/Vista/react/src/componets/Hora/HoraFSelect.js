import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from '../../config/config';


class HoraFSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
        hora: []
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/Hora/select_h`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                hora : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.hora.length > 0 ){
        let id_hora = this.props.id_hora;
    
            return this.state.hora.map((e , i) => 
               <option value={id_hora}   key={i} value={e.id_hora}> {e.Hora} </option>
               );
    }
}  

    render(){
        return(
            <Field component="select" name="hora_f" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default HoraFSelect;