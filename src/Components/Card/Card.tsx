import React from 'react';
import './Card.css';
import kc from '../../images/kc.svg';
import { ICard } from '../../types';

interface Props extends ICard {
  onClick: (id: string) => void;
}

export const Card = ({ image, onClick, isSelect, id }: Props) => {
  return (
    <div className={`card ${isSelect ? 'card__open' : ''}`} onClick={() => onClick(id)}>
      <img className="card__image" src={isSelect ? image : kc} alt={`image № ${id}`} />
    </div>
  );
};
