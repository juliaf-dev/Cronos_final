import React from 'react';
import '../../src/css/Main.css';
import Header from '../components/Header';
import FlashcardRandon from '../components/FlashcardRandon';
import ResumoCarosel from '../components/ResumoCarosel';

const Main = ({ navegarParaMateria }) => {
  const materiasData = [
    { id: 1, nome: "História" },
    { id: 2, nome: "Geografia" },
    { id: 3, nome: "Filosofia" },
    { id: 4, nome: "Sociologia" }
  ];

  return (
    <div className="main-container">
     <div className="main-body">

      <p className="slogan">
        "Desafie sua mente, explore novas ideias e aprenda de forma ativa: sua jornada de conhecimento começa aqui!"
      </p>
      <FlashcardRandon/>
      <ResumoCarosel/>
     

      <div className="disciplinas">
        <h3>Estude por Disciplina</h3>
        <div className="disciplinas-grid">
          {materiasData.map(materia => (
          <div
            key={materia.id}
            className="disciplina-card"
            onClick={() => navegarParaMateria(materia)}
          >
            <h2>{materia.nome}</h2>
          </div>
        ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Main;
