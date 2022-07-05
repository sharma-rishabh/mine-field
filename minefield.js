(function () {
  const getAdjacentElements = (id) => {
    const elements = [];
    const top = document.getElementById(id + 10);
    const bottom = document.getElementById(id - 10);

    const leftId = (id - 1) % 10 === 0 ? '' : id - 1;
    const left = document.getElementById(leftId);

    const rightId = id % 10 === 0 ? '' : id + 1;
    const right = document.getElementById(rightId);

    if (top) {
      elements.push(top);
    }
    if (bottom) {
      elements.push(bottom);
    }
    if (left) {
      elements.push(left);
    }
    if (right) {
      elements.push(right);
    }

    return elements;
  };

  const removeColors = (elements) => {
    elements.forEach(element => {
      element.style['background-color'] = 'white';
    })
  };

  const addEventListeners = (currentId, adjacentElements) => {
    adjacentElements.forEach(element => {
      element.addEventListener('click', minesweeper);
    });
  };

  const removeEventListeners = (adjacentElements, currentElement) => {
    const listeningElements = adjacentElements;
    listeningElements.forEach(element => {
      element.removeEventListener('click', minesweeper);
    });

  };

  const getColor = (validMoves, move) => {
    return isMoveValid(validMoves, move) ? 'green' : 'red';
  };

  const isMoveValid = (validMoves, move) => {
    return validMoves.includes(move);
  };

  const endGame = (adjacentElements, id) => {
    removeEventListeners(adjacentElements);
    adjacentElements = getAdjacentElements(id);
    removeEventListeners(adjacentElements);
    removeColors(adjacentElements);
  };

  const showWinMessage = () => {
    const winDiv = document.getElementById('winning-message');
    winDiv.style['display'] = 'block';
  };

  const showLoseMessage = () => {
    const loseDiv = document.getElementById('losing-message');
    loseDiv.style['display'] = 'block';
  };

  let moves = 0;
  let adjacentElements = [];

  const minesweeper = (event) => {
    moves++;
    const validMoves = [9, 19, 29, 39, 49, 48, 47, 37, 27, 26, 25, 24, 23, 33, 43, 53, 54, 55, 65, 75, 76, 77, 87, 97];
    const target = event.target;
    const id = +target.id;

    if (moves > 0) {
      const grid = event.path[1];
      grid.removeEventListener('click', minesweeper);
    }

    const color = getColor(validMoves, id);
    target.style['background-color'] = color;

    if (!isMoveValid(validMoves, id)) {
      endGame(adjacentElements, id);
      showLoseMessage();
      return;
    }

    if (id === 97) {
      endGame(adjacentElements, id);
      showWinMessage();
      return;
    }

    removeEventListeners(adjacentElements);
    adjacentElements = getAdjacentElements(id);
    addEventListeners(id, adjacentElements);
    removeColors(adjacentElements);
  }

  window.onload = () => {
    const game = document.getElementById('bottom-grid');
    game.addEventListener('click', minesweeper);
  }
})();