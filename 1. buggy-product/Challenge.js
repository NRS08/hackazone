// versions would be a 1D array with either '0' or '1' as its elements.
// '0' indicates the version is bug-free and '1' indicates the version is buggy.
// (Ex - For input [0, 0, 1, 1, 1], the bug was introduced in version 2 and the function should return 1)

function lastBugFreeVersion(versions) {
  // Your implementation here
  var n = versions.length;
  var i = 0,
    j = n - 1;
  while (i < j) {
    var mid = (i + j) / 2;
    mid = Math.floor(mid);
    if (versions[mid] === 1) j = mid;
    else i = mid + 1;
  }
  return j;
}

console.log(lastBugFreeVersion([0, 0, 1, 1, 1]));
