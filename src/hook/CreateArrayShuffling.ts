import { ICard } from '../types';
import firebase from '../images/firebase.svg';
import nginx from '../images/nginx.svg';
import nodejs from '../images/nodejs.svg';
import react from '../images/react.svg';
import redux from '../images/redux.svg';
import typescript from '../images/typescript.svg';
import webpuck from '../images/webpuck.svg';
import webstorm from '../images/webstorm.svg';

// хук для выноса логики создания массива рандомных карт

const preloadImages = (images: string[]) => {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const cardImages = [firebase, nginx, nodejs, react, redux, typescript, webpuck, webstorm];

preloadImages(cardImages);

const duplicateArray = (array: string[]): string[] =>
  array.reduce((res: string[], current) => res.concat([current, current]), []);

const shuffle = (array: string[]): string[] => {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const generateCards = (arr: string[]): ICard[] =>
  arr.map((item) => ({
    image: item,
    id: window.crypto.randomUUID(),
    isSelect: false,
    isMatching: false,
  }));

export const generateArr = () => {
  const arrayShuffling = shuffle(duplicateArray(cardImages));
  return generateCards(arrayShuffling);
};
