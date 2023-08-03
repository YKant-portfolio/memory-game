import React from 'react';
import { useEffect, useState } from 'react';
import { generateArr } from '../../hook/CreateArrayShuffling';
import { ICard } from '../../types';
import { Board } from '../Board/Board';
import { Modal } from '../Modal/Modal';
import './App.css';

const TOTAL_ATTEMPTS = 40;

function pluralizeWord(number: number, words: string[]) {
  const cases = [2, 0, 1, 1, 1, 2];
  const wordForm = words[number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]];
  return `${number} ${wordForm}`;
}

export const App = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [countMoves, setCountMoves] = useState(0);
  const [countPairCards, setCountPairCards] = useState(0);
  const [disabled, setDisabled] = useState(true);

  const newGame = () => {
    const gameCards = generateArr();
    setCards([...gameCards]);
    setCountMoves(0);
    setCountPairCards(0);
  };

  useEffect(() => {
    newGame();
  }, []);

  const selectCards = (cardId: string) => {
    if (disabled) {
      if (selectedCards.includes(cardId)) {
        return false;
      }

      if (selectedCards.length === 2) {
        const [firstCardId, secondCardId] = selectedCards;
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.id === firstCardId || card.id === secondCardId) {
              return { ...card, isSelect: false };
            }
            return card;
          }),
        );
        setSelectedCards([]);
      }

      setCards((prevCards) =>
        prevCards.map((card) => {
          if (card.id === cardId) {
            return { ...card, isSelect: true };
          }
          return card;
        }),
      );
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const trackMove = () => {
    setCountMoves(countMoves + 1);
  };

  const checkCards = (cardId: string[]) => {
    const [firstId, secondId] = cardId;
    const firstCard = cards.find(({ id }) => firstId === id);
    const secondCard = cards.find(({ id }) => secondId === id);
    if (!firstCard || !secondCard) {
      return false;
    }

    if (firstCard.image === secondCard.image) {
      firstCard.isMatching = true;
      secondCard.isMatching = true;
      setCountPairCards(countPairCards + 1);
    }

    setTimeout(() => {
      firstCard.isSelect = false;
      secondCard.isSelect = false;
    }, 0);
    trackMove();
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      checkCards(selectedCards);
      setDisabled(false);
      setTimeout(() => {
        setDisabled(true);
      }, 0);
      setSelectedCards([]);
    }
  }, [selectedCards]);

  const arrMove = ['ход', 'хода', 'ходов'];
  const move = pluralizeWord(countMoves, arrMove);

  return (
    <div className="container">
      <main className="main">
        <h1 className="app__h1">Memory</h1>
        <p className="table-of-moves">
          {' '}
          сделано ходов <span className="table-num">{countMoves}</span>
        </p>
        <Board cards={cards} selectCards={selectCards} />
        <p className="table-of-attempts">
          {' '}
          осталось попыток <span className="table-num">{TOTAL_ATTEMPTS - countMoves}</span>
        </p>
      </main>
      {countMoves === TOTAL_ATTEMPTS && <Modal reset={newGame}>Увы, вы проиграли у вас кончились ходы</Modal>}
      {cards.length / 2 === countPairCards && <Modal reset={newGame}>Ура, ВЫ выиграли! это заняло {move} </Modal>}
    </div>
  );
};
