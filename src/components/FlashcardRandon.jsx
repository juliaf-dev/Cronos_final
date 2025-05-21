import React from 'react';
import '../css/FlashcardRandon.css'; // Você pode manter separado ou reutilizar o Main.css se preferir


const FlashcardRandon = () => {
  return (
  <div className="flashcard">
        <div className="flashcard-header">
          <span>História</span>
          <a href="#">Ver todos</a>
        </div>
        <div className="flashcard-question">Quem foi D. Pedro I ?</div>
        <a className="flashcard-answer" href="#">Ver resposta</a>
      </div>
);
};

export default FlashcardRandon;
