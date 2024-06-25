const $ = (elem) => document.querySelector(elem);

const createElem = (tagName, props = {}) => {
  const el = document.createElement(tagName);
  return Object.assign(el, props);
};

const getRandomNum = (max) => Math.floor(Math.random() * max) + 1;

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const size = urlParams.get('gridSize') || defaultSize;

const defaultSize = 10;
const size = defaultSize;
const maxSize = size * size;

$('.grid-container').style.gridTemplateColumns = `repeat(${size}, 1fr)`;
$('.grid-container').style.gridTemplateRows = `repeat(${size}, 1fr)`;

const grid = Array(maxSize).fill({});

grid.forEach((_, index) => {
  const x = index % size + 1;
  const y = Math.floor(index / size) + 1;
  const gridItemProps = {
    className: 'grid-item',
    textContent: `${x},${y}`,
    id: `item_${index + 1}`
  };
  const gridItem = createElem('div', gridItemProps);
  gridItem.setAttribute('data-x', x);
  gridItem.setAttribute('data-y', y);

  $('.grid-container').appendChild(gridItem);
});

const updateItemState = (n, action) => {
  $(`#item_${n}`).classList[action]('active');
}

let currentPos = getRandomNum(maxSize);
updateItemState(currentPos, 'add');

const keyMappings = { w: 'up', s: 'down', a: 'left', d: 'right' };
const keysArray = Object.keys(keyMappings);
const randomIndex = Math.floor(Math.random() * keysArray.length);
let currentKey = keysArray[randomIndex];

const getNextPos = (pos) => {
  const mappings = {
    up: pos <= size ? pos + (maxSize) - size : pos - size,
    down: pos > (maxSize) - size ? pos - (maxSize) + size : pos + size,
    left: pos % size === 1 ? pos + size - 1 : pos - 1,
    right: pos % size === 0 ? pos - size + 1 : pos + 1,
  }
  const dir = keyMappings[currentKey];
  return mappings[dir] || pos;
};

window.addEventListener('keydown', (e) => {
  currentKey = keyMappings?.[e.key] ? e.key : currentKey;
});

setInterval(() => {
  const nextPos = getNextPos(currentPos);
  updateItemState(currentPos, 'remove');
  currentPos = nextPos;
  updateItemState(currentPos, 'add');
}, 1000);

// $('.display').textContent = keys[randomItem];
