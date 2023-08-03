import React from 'react';
import './Modal.css';

interface Props {
  children: string | React.ReactNode;
  reset: () => void;
}

export const Modal = ({ reset, children }: Props) => {
  return (
    <div className="modal">
      <div className="modal__description">{children}</div>
      <button className="modal__btn" onClick={reset}>
        сыграть еще
      </button>
    </div>
  );
};
