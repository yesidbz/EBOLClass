import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router,Link } from "react-router-dom";
import  Routes  from "./Routes";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';


class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    return (
      <Router>
       
<div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Estudiantes Depurados</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              Estudiantes
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
              <Link className="nav-link" to="/Estudiante">Estudiantes</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/Estudiante/crear">Registrar Estudiantes</Link>
              </DropdownItem>
              </DropdownMenu>
              </UncontrolledDropdown>
              </NavItem>

              <NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              Docente
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
              <Link className="nav-link" to="/docentes">Docentes</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/docentes/crear">Crear Docentes</Link>
              </DropdownItem>
              </DropdownMenu>
              </UncontrolledDropdown>
              </NavItem>


              <NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              Acudiente
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
              <Link className="nav-link" to="/Acudiente">Acudiente</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/Acudiente/crear">Registrar Acudiente</Link>
              </DropdownItem>
              </DropdownMenu>
              </UncontrolledDropdown>
              </NavItem>


              <NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              Grupos
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
              <Link className="nav-link" to="/Grupo">Grupos</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/Grupo/crear">Registrar Grupos</Link>
              </DropdownItem>
              </DropdownMenu>
              </UncontrolledDropdown>
              </NavItem>


              <NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              Grados
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
              <Link className="nav-link" to="/Grado">Grados</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/Grado/crear">Registrar Grados</Link>
              </DropdownItem>
              </DropdownMenu>
              </UncontrolledDropdown>
              </NavItem>


              <NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              Salon
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
              <Link className="nav-link" to="/Salon">Salon</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/Salon/crear">Registrar Salon</Link>
              </DropdownItem>
              </DropdownMenu>
              </UncontrolledDropdown>
              </NavItem>

              <NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              Jornada
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
              <Link className="nav-link" to="/Jornada">Jornada</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/Jornada/crear">Registrar Jornada</Link>
              </DropdownItem>
              </DropdownMenu>
              </UncontrolledDropdown>
              </NavItem>
              
              
              <NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              Area
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
              <Link className="nav-link" to="/Area">Area</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/Area/crear">Registrar Area</Link>
              </DropdownItem>
              </DropdownMenu>
              </UncontrolledDropdown>
              </NavItem>

              <NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              Asignatura
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
              <Link className="nav-link" to="/Materia">Asignatura</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/Materia/crear">Registrar Asignatura</Link>
              </DropdownItem>
              </DropdownMenu>
              </UncontrolledDropdown>
              </NavItem>


              <NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              Datos
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
              <Link className="nav-link" to="/Departamento">Departamento</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/Departamento/crear">Registrar Departamento</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/Municipio">Municipio</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/Municipio/crear">Registrar Municipio</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/Tipodocumento">Tipo de documento</Link>
              </DropdownItem>
              <DropdownItem>
              <Link className="nav-link" to="/Tipodocumento/crear">Registrar Tipo de documento</Link>
              </DropdownItem>
              </DropdownMenu>
              </UncontrolledDropdown>
              </NavItem>


              <NavItem>
                <Link className="nav-link" to="/login/index">Login</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="container">
           <Routes/>
        </div>
      </div>
      </Router>
      
    );
  }
}
         
export default App;