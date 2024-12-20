function generateMaze(width, height, start, end) {
  const maze = new Array(height * 2 + 1)
    .fill(null)
    .map(() => new Array(width * 2 + 1).fill(true));

  const walls = [];
  const addWalls = (x, y) => {
    const directions = [
      { dx: 2, dy: 0 },
      { dx: -2, dy: 0 },
      { dx: 0, dy: 2 },
      { dx: 0, dy: -2 },
    ];
    directions.forEach(({ dx, dy }) => {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx > 0 &&
        nx < width * 2 &&
        ny > 0 &&
        ny < height * 2 &&
        maze[ny][nx]
      ) {
        walls.push({ x: nx, y: ny, px: x, py: y });
      }
    });
  };

  maze[start[1] * 2 + 1][start[0] * 2 + 1] = false;
  addWalls(start[0] * 2 + 1, start[1] * 2 + 1);

  while (walls.length > 0) {
    const wallIndex = Math.floor(Math.random() * walls.length);
    const { x, y, px, py } = walls[wallIndex];
    walls.splice(wallIndex, 1);

    if (maze[y][x]) {
      maze[y][x] = false;
      maze[(y + py) / 2][(x + px) / 2] = false;
      addWalls(x, y);
    }
  }

  maze[start[1] * 2 + 1][start[0] * 2 + 1] = false;
  maze[end[1] * 2 + 1][end[0] * 2 + 1] = false;

  return maze;
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const mazeWidth = getQueryParam("width");
const mazeHeight = getQueryParam("height");
const mazeStart = [0, 0];
const mazeEnd = [mazeWidth - 1, mazeHeight - 1];

const maze = generateMaze(mazeWidth, mazeHeight, mazeStart, mazeEnd);

const mazeContainer = document.getElementById('mazeContainer');
mazeContainer.style.display = "grid";
mazeContainer.style.gridTemplateColumns = `repeat(${mazeWidth * 2 + 1}, 20px)`;

const containerWidth = (mazeWidth * 2 + 1) * 20;
mazeContainer.style.width = `${containerWidth}px`;

mazeContainer.style.position = "absolute";
mazeContainer.style.left = "50%";
mazeContainer.style.transform = "translateX(-50%)";

for (let y = 0; y < maze.length; y++) {
  for (let x = 0; x < maze[y].length; x++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.style.backgroundColor = maze[y][x] ? "black" : "white";
    if (x === 1 && y === 1) {
      cell.style.backgroundColor = "green";
    }
    else if (x === mazeWidth * 2 && y === mazeHeight * 2 - 1) {
      cell.style.backgroundColor = "white";
    }
    mazeContainer.appendChild(cell);
  }
}

document.body.appendChild(mazeContainer);

let playerPosition = [1, 1]

function isValidMove(x, y) {
  if (x < 0 || x >= mazeWidth * 2 + 1 || y < 0 || y >= mazeHeight * 2 + 1) {
    return false;
  }
  else if (x === mazeWidth * 2 && y === mazeHeight * 2 - 1) {
    return true;
  }
  return maze[y][x] === false;
}

function movePlayer(dx, dy) {
  const newX = playerPosition[0] + dx;
  const newY = playerPosition[1] + dy;
  if (isValidMove(newX, newY)) {

    previousIndex = playerPosition[1] * (mazeWidth * 2 + 1) + playerPosition[0];
    currentIndex = newY * (mazeWidth * 2 + 1) + newX;

    const previousCell = mazeContainer.children[previousIndex]; 
    const currentCell = mazeContainer.children[currentIndex];

    previousCell.style.transition = "background-color 0.3s ease-in-out";
    currentCell.style.transition = "background-color 0.3s ease-in-out";

    previousCell.style.backgroundColor = maze[playerPosition[1]][playerPosition[0]] ? "black" : "white";
    currentCell.style.backgroundColor = "green";

    playerPosition = [newX, newY];

    if (playerPosition[0] === mazeWidth * 2 && playerPosition[1] === mazeHeight * 2 - 1) {
      alert("Congratulations! You reached the end of the maze!");
    }
  }
}

document.addEventListener('keydown', function(e) {
    var code = e.which || e.keyCode;
    if (code == '38') {
      movePlayer(0, -1);
    }
    else if (code == '40') {
      movePlayer(0, 1);
    }
    else if (code == '37') {
      movePlayer(-1, 0);
    }
    else if (code == '39') {
      movePlayer(1, 0);
    }
})
