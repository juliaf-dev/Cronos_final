
import React from "react";
import '../css/Header.css'; // Você pode manter separado ou reutilizar o Main.css se preferir
import logo from "../assets/logo/logocronos.png";
import MateriasDropdown from './MateriasDropdown';
import Search from './Searchbox';
import NotifIcon from './NotfIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const Header = ({navegarParaMateria, voltarParaMain}) => {
   

  return (
    <header className="navbar">
      <div className="nav-left">
       <img className="logo" src={logo} alt="logo do projeto" onClick={voltarParaMain}/>
            <MateriasDropdown navegarParaMateria={navegarParaMateria} />
        <button>Flashcards</button>
        <button>Resumos</button>
      </div>
      <div className="nav-right">
        <Search  />

        <NotifIcon/>
        <button><FontAwesomeIcon icon={faUser} /> <br /> User </button>
      </div>
    </header>
  );
};

export default Header;
