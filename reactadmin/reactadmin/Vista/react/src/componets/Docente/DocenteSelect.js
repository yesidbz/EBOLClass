import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from '../../config/config';


class DocenteSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
         docente: [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/DocenteSelect/select_a`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                  docente : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.docente.length > 0 ){
        let iddocente = this.props.iddocente;
    
            return this.state.docente.map((e , i) => 
               <option value={iddocente}   key={i} value={e.iddocente}> {e.documento_docente}</option>
               );
    }
}  

    render(){
        return(
            <Field component="select" name="iddocente" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default DocenteSelect;