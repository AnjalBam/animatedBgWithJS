const animatedContainer = document.getElementById("animate-bg");

//window dimensions
let screenWidth = $(window).width();
let screenHeight = $(window).height();

//Higher the value slower the speed;
let animateSpeed = 20;

// random number generator between limits;
const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//returns random position on screen
const getRandomPosX = () => getRandomNum(0, screenWidth);
const getRandomPosY = () => getRandomNum(0, screenHeight);

let bgImages = [
  "./img/circle.png",
  "./img/pentagon.png",
  "./img/circle.png",
  "./img/pentagon.png",
  "./img/plus2.png",
  "./img/rounded-rectangle.png",
  "./img/plus2.png",
  "./img/rounded-rectangle.png",
  "./img/triangle.png",
  "./img/plus2.png",
  "./img/triangle.png",
  "./img/plus2.png",
  "./img/Union.png",
  "./img/plus2.png",
  "./img/Union.png",
];

//initial x and y position for our bg images
let initialPosX = [];
let initialPosY = [];
const getPosX = (index) => initialPosX[index];
const getPosY = (index) => initialPosY[index];

//gets random speed every tm
// const getRandomSpeed = () => Math.floor(Math.random() * 5);

const setInitialPos = () => {
  for (let i = 0; i < bgImages.length; i++) {
    initialPosX[i] = getRandomPosX();
    initialPosY[i] = getRandomPosY();
    // console.log(
    //   `initialPosX: ${initialPosX[i]}, initialPosY: ${initialPosY[i]}`
    // );
  }
};

//returns string for the background property
//setting up images in background
const getBg = () => {
  let finalValue = "";
  for (let i = 0; i < bgImages.length; i++) {
    if (i === bgImages.length - 1) {
      finalValue = finalValue + 'no-repeat url("' + bgImages[i] + '") ';
    } else finalValue = finalValue + 'no-repeat url("' + bgImages[i] + '"), ';
  }
  return finalValue;
};

//returns random backgroundPosition on every call
const getBgPos = () => {
  let finalPos = "";
  for (let i = 0; i < bgImages.length; i++) {
    if (i === bgImages.length - 1) {
      finalPos += initialPosX[i] + "px " + initialPosY[i] + "px";
    } else {
      finalPos += initialPosX[i] + "px " + initialPosY[i] + "px, ";
    }
  }
  return finalPos;
};

// this sets random background
const setRandomPosition = () => {
  setInitialPos();
  animatedContainer.style.background = getBg();
  animatedContainer.style.backgroundPosition = getBgPos();
};

const setPosition = (position) => {
  animatedContainer.style.backgroundPosition = position;
};
dx = [];
dy = [];

const setSpeed = () => {
  for (let i = 0; i < bgImages.length; i++) {
    dx[i] = getRandomNum(-2, -2);
    dy[i] = getRandomNum(-2, -2);
  }
};
let index = 0;

const animateImage = (index = 0) => {
  // dx[index] = getRandomNum(1, 3);
  // dy[index] = getRandomNum(1, 3);
  if (dx[index] === 0) {
    dx[index] = 1;
  }
  if (dy[index] === 0) {
    dy[index] = 1;
  }
  if (initialPosX[index] >= screenWidth) {
    dx[index] = -dx[index];
  } else if (initialPosX[index] <= 0) {
    dx[index] = -dx[index];
  }
  if (initialPosY[index] >= screenHeight) {
    dy[index] = -dy[index];
  } else if (initialPosY[index] <= 0) {
    dy[index] = -dy[index];
  }
  initialPosX[index] += dx[index];
  initialPosY[index] += dy[index];
  let newBgPos = getBgPos();
  setPosition(newBgPos);
  // console.log(`dx: ${dx[index]}, dy: ${dy[index]}`);
};

const animateBackground = () => {
  for (let i = 0; i < bgImages.length; i++) {
    animateImage(i);
  }
};

window.onload = () => {
  setRandomPosition();
  setSpeed();
  setInterval(() => {
    animateBackground();
  }, animateSpeed);
};
