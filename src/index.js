module.exports = function count(s, pairs) {
  let N = 1;
  let cache = 0;
  let step = [];
  let step2 = [];
  let result = 0;

  for (let i = 0, len = pairs.length; i < len; i += 1) {
    N *= pairs[i][0] ** pairs[i][1];
  }
  if (N > 9999999) {
    return 0;
  }

  for (let j = 0, len = s.length; j < len; j += 1) {
    if (s[j] === '0' && j === 0) {
      for (let k = 0; k < N; k += 1) {
        cache = k + j;

        if (nod(N, cache) !== 1) {
          step.push(k);
        }
      }
    } else if (s[j] === '1' && j === 0) {
      for (let k = 0; k < N; k += 1) {
        cache = k + j;

        if (nod(N, cache) === 1) {
          step.push(k);
        }
      }
    } else if (s[j] === '0') {
      for (let k = 0; k <= N; k += 1) {
        cache = k + j;

        if (nod(N, cache) !== 1 && step.includes(k)) {
          step2.push(k);
        }
      }

      step = step2;
      step2 = [];
    } else if (s[j] === '1') {
      for (let k = 0; k <= N; k += 1) {
        cache = k + j;

        if (nod(N, cache) === 1 && step.includes(k)) {
          step2.push(k);
        }
      }

      step = step2;
      step2 = [];
    }
  }

  result = step.length % 10000000007;
  return result;
};

function nod(a, b) {
  if (b === 0) return a;
  return nod(b, a % b);
}
