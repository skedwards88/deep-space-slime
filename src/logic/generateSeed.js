export function generateSeed(roomName, encodedPuzzle) {
  // Convert any spaces in the name to + to be able to pass in a query parameter
  const sanitizedName = roomName.replaceAll(" ", "+");

  return `${sanitizedName}_${encodedPuzzle}`;
}
