// Robot controller implementation

import { robotControl, Direction } from "./robot-api.js";

const rc = robotControl("../resources/room-layout-1.txt");
// const marix = "../resources/room-layout-1.txt";
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

const directions = [-1, 0, 1, 0, -1];
const visited = new Set();
cleanRoom(api);
rc.evaluateResult();

function depthFirstSearch(x, y, currentDir, robot) {
  visited.add(`${x}-${y}`);

  for (let k = 0; k < 4; ++k) {
    const newDir = (currentDir + k) % 4;

    const newX = x + directions[newDir];
    const newY = y + directions[newDir + 1];

    if (!visited.has(`${newX}-${newY}`) && robot.move()) {
      depthFirstSearch(newX, newY, newDir, robot);

      robot.turnRight();
      robot.turnRight();
      robot.move();
      robot.turnRight();
      robot.turnRight();
    }

    robot.turnRight();
  }
}

function cleanRoom(api) {
  var currentDir = api.getDirection();
  var x = api.getPosition().x;
  var y = api.getPosition().y;
  console.log(api.move());
  var c;

  depthFirstSearch(x, y, 0, api);
}
