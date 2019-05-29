import React, {Component} from 'react'
import axios from 'axios';
import {URL,TOKEN} from './../../config/config';
import SweetAlert from 'sweetalert-react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



class DetalleSalon extends Component {
constructor (props){
    super(props);
    this.state= {
            salon :[],
            sweetShow : false ,
            sweetTitle : '',
            sweetText : '',
            sweetType : '',
            
            modal: false,name: '',team :'' ,country: ''


    };

    this.toggle = this.toggle.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}


toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleChangeName(event) {
    this.setState({name: event.target.value});
  }
  handleChangeTeam(event) {
    this.setState({team: event.target.value});
  }
  handleChangeCountry(event) {
    this.setState({country: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
     }


llamar_listar(){
    setTimeout(() => {
        let id_grado = this.props.match.params.id;
        axios({
            method: 'get',
            url: `${URL}/DetalleSalon/`+ id_grado,
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
    }, 100)
    
}

componentDidMount() {
    this.llamar_listar();
}


listar(){
if(this.state.salon.length > 0){
    return this.state.salon.map(
        (e ,i)=>
        
        <tr key={i} >
          <td>{e.id_grado_grupo}</td>
           <td>{e.id_grado}</td>
           <td>{e.id_grupo}</td>
        </tr>
        
        );    
//<Button color="danger" onClick={this.toggle}>Cancel</Button>
}

}



    



cargando(){
    return(<tr>
        <td colSpan="12" className="text-center"><img src="./giphy.gif"/></td>
        </tr>
        )
}

handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
      render(){
           return (
              <div>
              <h1>Detalle de salones por grado</h1>
              <table className="table table-bordered">
                 <thead>
                        <tr>
                                <th>Id grado-grupo</th>
                                <th>Grado</th>
                                <th>Grupo</th>
                        </tr>
                </thead>
                <tbody>
                {this.listar()==null?this.cargando():this.listar()}
                </tbody>
              </table>
              <div>
         
        <Modal isOpen={this.state.modal}>
        <form onSubmit={this.handleSubmit}>
          <ModalHeader>Detalles del estudiante</ModalHeader>
          <ModalBody>

          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>Cerrar</Button>
          </ModalFooter>
          </form>
        </Modal>
        </div>

              <SweetAlert
              show={this.state.sweetShow}
              title={this.state.sweetTitle}
              text={this.state.sweetText}
              value={this.state.sweetType}
              onConfirm={() => this.setState({ sweetShow: false })}
            />
  

              </div>
          );        

          
      }

}

export default DetalleSalon