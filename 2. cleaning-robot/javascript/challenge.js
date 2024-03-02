// Robot controller implementation

import { robotControl, Direction } from "./robot-api.js";

const rc = robotControl("../resources/room-layout-1.txt");
const marix = "../resources/room-layout-1.txt";
const api = rc.robotApi;

// Robot API
//
// api.move(); // move robot one step forward
// api.turnLeft(); // turn robot 90 degrees to the left
// api.turnRight(); // turn robot 90 degrees to the right
// api.getDirection(); // return the current direction, e.g. Direction.RIGHT
// api.isBarrierAhead(); // true -> barrier ahead
// api.getPosition(); // returns the current robot position, e.g. { x: 1, y: 2 }
// api.getPositionAhead(); // returns the position in front of the robot, doesn't check if a barrier

// const cleaned = {};
// function cleanRooms(api) {
//   // TODO add code here
//   var x = api.getPosition().x;
//   var y = api.getPosition().y;
//   if (cleaned[x + " : " + y] === true) return;
//   else {
//     cleaned[x + " : " + y] = true;

//     // visit all non-clean adjacent squares
//     cleanRooms(api)
//   }
// }
// var cleanRooms = function (robot) {
//   let dir = 0;

//   const cleaned = {};
//   const flipDir = (d) => (d + 2) % 4;
//   const turnRight = () => {
//     robot.turnRight();
//     dir = (dir + 1) % 4;
//   };
//   const setDir = (newDir) => {
//     while (dir !== newDir) turnRight();
//   };

//   const recurse = (x, y, moveDir) => {
//     // robot.clean();

//     if (cleaned[x + " : " + y] === true) return;
//     moveDir >= 0 && setDir(moveDir);

//     if (moveDir >= 0 && !robot.move()) {
//       return;
//     } else {
//       cleaned[x + " : " + y] = true;

//       // visit all non-clean adjacent squares
//       recurse(x, y - 1, 0);
//       recurse(x + 1, y, 1);
//       recurse(x, y + 1, 2);
//       recurse(x - 1, y, 3);
//     }

//     // move back to our last square
//     moveDir >= 0 && setDir(flipDir(moveDir));
//     moveDir >= 0 && robot.move();
//   };
// };

cleanRoom(api);
rc.evaluateResult();

// Directions for the robot to move: up, right, down, and left
const directions = [-1, 0, 1, 0, -1];

// Set to keep track of visited cells to avoid cleaning the same cell multiple times
const visited = {};

// Recursive depth-first search (DFS) function to clean the room
function depthFirstSearch(x, y, currentDir, robot) {
  // Mark the current cell as visited by adding it to the visited set
  visited[x + " : " + y] = true;
  // Clean the current cell
  //   robot.clean();

  // Explore all four directions: up, right, down, and left
  for (let k = 0; k < 4; ++k) {
    // Calculate new direction after turning right 'k' times from current direction
    const newDir = (currentDir + k) % 4;
    // Get the new cell coordinates based on the direction
    const newX = x + directions[newDir];
    const newY = y + directions[newDir + 1];

    // If the new cell has not been visited and is not blocked
    if (!visited.has(`${newX}-${newY}`) && robot.move()) {
      // Recur to clean the new cell
      depthFirstSearch(newX, newY, newDir, robot);

      // Backtrack to the previous cell, facing the same direction as before
      robot.turnRight();
      robot.turnRight();
      robot.move();
      robot.turnRight();
      robot.turnRight();
    }
    // Turn the robot to the right (next direction)
    robot.turnRight();
  }
}

function cleanRoom(api) {
  // Start DFS from the initial cell (0, 0) facing up (direction index 0)
  depthFirstSearch(0, 0, 0, robot);
}
