// BFS on  Weighted Graph

function findCheapestPrice(n, flights, src, dst, k) {
  // add your solution here
  //   if (k === 0) return -1;

  const visited = new Array(n).fill(Number.MAX_VALUE);

  const adjacent = new Map();

  visited[src] = 0;

  for (const [from, to, price] of flights) {
    if (!adjacent.has(from)) {
      adjacent.set(from, []);
    }
    adjacent.get(from).push([to, price]);
  }

  const queue = [[src, 0]];

  k++;

  while (k-- > 0 && queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [currNode, currPrice] = queue.shift();
      if (adjacent.has(currNode)) {
        for (const [nextNode, nextPrice] of adjacent.get(currNode)) {
          const newPrice = currPrice + nextPrice;
          if (newPrice < visited[nextNode]) {
            visited[nextNode] = newPrice;
            queue.push([nextNode, newPrice]);
          }
        }
      }
    }
  }

  if (visited[dst] === Number.MAX_VALUE) {
    return -1;
  } else return visited[dst];
}

// Test case 1
const flights1 = [
  [0, 1, 100],
  [1, 2, 100],
  [2, 0, 100],
  [1, 3, 600],
  [2, 3, 200],
];
console.log(
  "Actual: " + findCheapestPrice(4, flights1, 0, 3, 1) + ", Expected: 700"
);

// Test case 2
const flights2 = [
  [0, 1, 100],
  [1, 2, 100],
  [2, 0, 100],
  [1, 3, 600],
  [2, 3, 200],
];
console.log(
  "Actual: " + findCheapestPrice(4, flights2, 0, 3, 0) + ", Expected: -1"
);

// Test case 3
const flights3 = [
  [0, 1, 100],
  [1, 2, 100],
  [0, 2, 500],
];
console.log(
  "Actual: " + findCheapestPrice(3, flights3, 0, 2, 0) + ", Expected: 500"
);

/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
