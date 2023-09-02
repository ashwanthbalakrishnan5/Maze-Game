function generateMaze(width, height, start, end) {
  const maze = new Array(height * 2 + 1)
    .fill(null)
    .map(() => new Array(width * 2 + 1).fill(true));

  const stack = [{ x: start[0] * 2 + 1, y: start[1] * 2 + 1 }];

  while (stack.length > 0) {
    const { x, y } = stack[stack.length - 1];
    maze[y][x] = false;

    const directions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];
    shuffleArray(directions);

    let found = false;
    for (const { dx, dy } of directions) {
      const nx = x + dx * 2;
      const ny = y + dy * 2;

      if (
        nx >= 0 &&
        nx < width * 2 + 1 &&
        ny >= 0 &&
        ny < height * 2 + 1 &&
        maze[ny][nx]
      ) {
        maze[y + dy][x + dx] = false;
        stack.push({ x: nx, y: ny });
        found = true;
        break;
      }
    }

    if (!found) {
      stack.pop();
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

const mazeContainer = document.createElement("div");
mazeContainer.style.display = "grid";
mazeContainer.style.gridTemplateColumns = `repeat(${mazeWidth * 2 + 1}, 20px)`;

for (let y = 0; y < maze.length; y++) {
  for (let x = 0; x < maze[y].length; x++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.style.backgroundColor = maze[y][x] ? "black" : "white";
    mazeContainer.appendChild(cell);
  }
}

document.body.appendChild(mazeContainer);

// document.getElementById("generateButton").addEventListener("click", function () {
//   const mazeSizeInput = document.getElementById("mazeSize");
//   const mazeSize = parseInt(mazeSizeInput.value);

//   if (!isNaN(mazeSize)) {
//     const mazeStart = [0, 0];
//     const mazeEnd = [mazeSize - 1, mazeSize - 1];

//     const maze = generateMaze(mazeSize, mazeSize, mazeStart, mazeEnd);
//     const mazeContainer = document.getElementById("mazeContainer");
//     mazeContainer.innerHTML = "";
//     mazeContainer.style.display = "grid";
//     mazeContainer.style.gridTemplateColumns = `repeat(${mazeSize * 2 + 1}, 20px)`;

//     for (let y = 0; y < maze.length; y++) {
//       for (let x = 0; x < maze[y].length; x++) {
//         const cell = document.createElement("div");
//         cell.className = "cell";
//         cell.style.backgroundColor = maze[y][x] ? "black" : "white";
//         mazeContainer.appendChild(cell);
//       }
//     }
//   }
// });
