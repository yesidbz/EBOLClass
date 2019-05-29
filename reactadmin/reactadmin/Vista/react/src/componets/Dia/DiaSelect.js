import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from '../../config/config';


class DiaSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
        dia: []
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/Dias/select_d`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                dia : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.dia.length > 0 ){
        let Id_dia = this.props.Id_dia;
    
            return this.state.dia.map((e , i) => 
               <option value={Id_dia}   key={i} value={e.Id_dia}> {e.Nombre} {e.Nombre > e.Nombre   } </option>
               );
    }
}  

    render(){
        return(
            <Field component="select" name="dias_semana" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default DiaSelect;