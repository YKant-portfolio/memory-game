import React from 'react';
import { ICard } from '../../types';
import { Card } from '../Card/Card';
import { EmptyField } from '../EmptyField/EmptyField';
import './Board.css';

interface Props {
  cards: ICard[];
  selectCards: (id: string) => void;
  alt?: string;
}

export const Board = ({ cards, selectCards }: Props) => {
  return (
    <div className="board">
      {cards.map((card) =>
        card.isMatching ? <EmptyField key={card.id} /> : <Card key={card.id} onClick={selectCards} {...card} />,
      )}
    </div>
  );
};
