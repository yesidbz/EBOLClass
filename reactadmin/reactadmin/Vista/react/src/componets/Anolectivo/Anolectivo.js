import React , {Component} from 'react'; 
import axios from 'axios';
import {Field} from 'formik';
import {URL,TOKEN} from '../../config/config';


class AnolectivoSelect extends Component{

constructor(props) {
  super(props);
    this.state = {
         anolectivo : [] 
    }
}

componentDidMount(){
    axios({
        method: 'get',
        url: `${URL}/AnolectivoSelect/select_ano`,
         headers: {
              "Authorization": "bearer "+TOKEN
        }
        }).then(respuesta=>{

       let datos  = respuesta.data ; 
       if(datos.ok){
              this.setState({
                  anolectivo : datos.data
              });
            }
          else {
              console.log("no");
          }    
       
      });
}
 

listar (){

    if(this.state.anolectivo.length > 0 ){
    let idano = this.props.idano;
        return this.state.anolectivo.map((e , i) => 
           <option value={idano}   key={i} value={e.idano}> {e.anoelectivo}</option>
           );
    }
}  

    render(){
        return(
            <Field component="select" name="idano" className="form-control">
              <option value="">Seleccionar</option>
           {this.listar()} 
    
          </Field>
        );
    }
}

export default AnolectivoSelect;