// versions would be a 1D array with either '0' or '1' as its elements.
// '0' indicates the version is bug-free and '1' indicates the version is buggy.
// (Ex - For input [0, 0, 1, 1, 1], the bug was introduced in version 2 and the function should return 1)

// Binary Search

function lastBugFreeVersion(versions) {
  // Your implementation here
  var ans = versions.length;
  var n = versions.length;
  var i = 0,
    j = n - 1;
  while (i <= j) {
    var mid = i + (j - i) / 2;
    mid = Math.floor(mid);
    if (versions[mid] === 1) {
      ans = Math.min(ans, mid);
      j = mid - 1;
    } else i = mid + 1;
  }
  return ans - 1;
}

var ans = lastBugFreeVersion([0, 1, 1, 1, 1]);
console.log(ans);
