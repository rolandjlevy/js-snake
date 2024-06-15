const $ = (elem) => document.querySelector(elem);

const createElem = (tagName, props = {}) => {
  const el = document.createElement(tagName);
  return Object.assign(el, props);
};

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);

const defaultSize = 5;
const size = defaultSize; // urlParams.get('gridSize') || defaultSize;

const matrix = Array(size * size).fill({});

$('.grid-container').style.gridTemplateColumns = `repeat(${size}, 1fr)`;
$('.grid-container').style.gridTemplateRows = `repeat(${size}, 1fr)`;

matrix.forEach((item, index) => {
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

let currentItemNum = getRandomNum(size * size);

handleGridItemState(currentItemNum, 'add');

const keysMap = new Map([
  ["w", -size],
  ["s", size],
  ["a", -1],
  ["d", 1]
]);

window.addEventListener('keydown', (e) => {
  const inc = keysMap.get(e.key) || 0;
  // if ((currentItemNum + inc) % size !== 0) {
    handleGridItemState(currentItemNum, 'remove');
    currentItemNum += inc;
    handleGridItemState(currentItemNum, 'add');
  // }
  console.log((currentItemNum + inc) % size);
});
