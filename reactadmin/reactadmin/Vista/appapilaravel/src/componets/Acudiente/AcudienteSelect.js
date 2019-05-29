import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from '../../config/config';


class AcudienteSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
         acudiente: [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/AcudienteSelect/select_a`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                  acudiente : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.acudiente.length > 0 ){
    let id = this.props.id;
        return this.state.acudiente.map((e , i) => 
           <option value={id}   key={i} value={e.id}>{e.documento}</option>
           );
    }
}  

    render(){
        return(
            <Field component="select" name="id_acudiente" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default AcudienteSelect;