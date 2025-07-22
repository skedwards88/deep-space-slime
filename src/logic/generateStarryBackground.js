const fs = require("fs");
const path = require("path");

const NUM_STARS = 100;
const RADIUS_RANGE = [1, 2];
const OPACITY_RANGE = [0.8, 1];
const DURATION_RANGE = [30, 60];
const DELAY_RANGE = [0, 30];
const STARTING_RANGES = [
  {x: [1, 10], y: [0, 100]},
  {x: [90, 100], y: [0, 100]},
  {x: [0, 100], y: [0, 10]},
  {x: [0, 100], y: [90, 100]},
];

function pickRandomBetween(number1, number2) {
  const min = Math.min(number1, number2);
  const max = Math.max(number1, number2);

  return min + Math.random() * (max - min);
}

function makeStar(index) {
  const startingRange = STARTING_RANGES[index % STARTING_RANGES.length];
  const startingX = pickRandomBetween(...startingRange.x);
  const startingY = pickRandomBetween(...startingRange.y);
  const radius = pickRandomBetween(...RADIUS_RANGE);
  const startingOpacity = pickRandomBetween(...OPACITY_RANGE);
  const duration = pickRandomBetween(...DURATION_RANGE);
  const delay = pickRandomBetween(...DELAY_RANGE);

  return `<circle r="${radius}" fill="white">

<animate
  attributeName="fill-opacity"
  from="${startingOpacity}"
  to="0"
  dur="${duration}s"
  begin="-${delay}s"
  repeatCount="indefinite"
/>

<animate
  attributeName="cx"
  from="${startingX}%"
  to="50%"
  dur="${duration}s"
  begin="-${delay}s"
  repeatCount="indefinite"
/>

<animate 
  attributeName="cy"
  from="${startingY}%"
  to="50%"
  dur="${duration}s"
  begin="-${delay}s"
  repeatCount="indefinite"
/>

</circle>`;
}

function generateStarryBackground() {
  const stars = Array.from({length: NUM_STARS}, (_, index) => makeStar(index));

  const svg = `<!-- Generated via generateStarryBackground.js -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="none"
  style="
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -1;"
>

<rect width="100%" height="100%" fill="black" stroke-width="1"/>

${stars.join("\n")}
</svg>`;

  const backgroundFile = path.join(
    __dirname,
    "..",
    "images",
    "starryBackground.svg",
  );

  fs.writeFile(backgroundFile, svg, (error) => {
    if (error) {
      console.error("Failed to write file:", error);
    } else {
      console.log("SVG generated");
    }
  });
}

generateStarryBackground();
