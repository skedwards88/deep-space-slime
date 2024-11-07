// Calculate how long the paths match before diverging
function scorePathMatch(path, comparisonPath) {
  let score = 0;
  for (let index = 0; index < path.length; index++) {
    if (path[index] === comparisonPath[index]) {
      score++;
    } else {
      break;
    }
  }
  return score;
}

export function updatePathWithHint(currentPath, possiblePaths) {
  // For each possible path, calculate how many indexes
  // match the current path before the paths diverge
  const scores = possiblePaths.map((comparisonPath) =>
    scorePathMatch(currentPath, comparisonPath),
  );

  // Select the possible paths that matched for the longest
  const maxScore = Math.max(...scores);
  const bestMatches = possiblePaths.filter(
    (_, index) => scores[index] === maxScore,
  );

  // Get the shortest of the best matches
  const bestMatch = bestMatches.reduce((previousPath, currentPath) =>
    previousPath.length > currentPath.length ? currentPath : previousPath,
  );

  // If the max score equals the current path length, just extend the current path by 1
  // Otherwise, backtrack to where the paths diverged, and then add 1
  return bestMatch.slice(0, maxScore + 1);
}
