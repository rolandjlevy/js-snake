const $ = (elem) => document.querySelector(elem);

const createElem = (tagName, props = {}) => {
  const el = document.createElement(tagName);
  return Object.assign(el, props);
};

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);

const defaultSize = 5;
const size = defaultSize; // urlParams.get('gridSize') || defaultSize;
const maxSize = size * size;

const matrix = Array(maxSize).fill({});

$('.grid-container').style.gridTemplateColumns = `repeat(${size}, 1fr)`;
$('.grid-container').style.gridTemplateRows = `repeat(${size}, 1fr)`;

matrix.forEach((_, index) => {
  const gridItemProps = { 
    className: 'grid-item', 
    textContent: index + 1, 
    id: `item_${index + 1}` 
  };
  const gridItem = createElem('div', gridItemProps);
  $('.grid-container').appendChild(gridItem);
});

const getRandomNum = (max) => Math.floor(Math.random() * max) + 1;

const handleGridItemState = (n, action) => {
  $(`#item_${n}`).classList[action]('active');
}

let currentPos = getRandomNum(maxSize);

handleGridItemState(currentPos, 'add');

const getNextPos = (key, currentPos) => {
  const mappings = {
    a: currentPos % size === 1 ? currentPos + size - 1 : currentPos - 1,
    d: currentPos % size === 0 ? currentPos - size + 1 : currentPos + 1,
    w: currentPos <= size ? currentPos + (maxSize) - size : currentPos - size,
    s: currentPos > (maxSize) - size ? currentPos - (maxSize) + size : currentPos + size
  }
  return mappings?.[key] || currentPos;
}

window.addEventListener('keydown', (e) => {
  const nextPos = getNextPos(e.key, currentPos);
  handleGridItemState(currentPos, 'remove');
  currentPos = nextPos;
  handleGridItemState(currentPos, 'add');
});
