export function generateSeed(roomName: string, encodedPuzzle: string): string {
  // Convert any spaces in the name to + to be able to pass in a query parameter
  const sanitizedName = roomName.replaceAll(" ", "+");

  return `custom-${sanitizedName}_${encodedPuzzle}`;
}
