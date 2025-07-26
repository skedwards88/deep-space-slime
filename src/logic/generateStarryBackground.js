const fs = require("fs");
const path = require("path");

const NUM_STARS = 200;
const RADIUS_RANGE = [1, 2];
const DURATION_RANGE = [3, 8];
const DELAY_RANGE = [0, 8];
const POSITION_RANGE = [1, 99];

function pickRandomBetween(number1, number2) {
  const min = Math.min(number1, number2);
  const max = Math.max(number1, number2);

  return (min + Math.random() * (max - min)).toFixed(2);
}

function makeStar() {
  const startingX = pickRandomBetween(...POSITION_RANGE);
  const startingY = pickRandomBetween(...POSITION_RANGE);
  const radius = pickRandomBetween(...RADIUS_RANGE);
  const duration = pickRandomBetween(...DURATION_RANGE);
  const delay = pickRandomBetween(...DELAY_RANGE);

  return `<use href="#star" r="${radius}" x="${startingX}%" y="${startingY}%" fill="white" style="animation-duration:${duration}s; animation-delay:-${delay}s;" class="twinkle"/>`;
}

function generateStarryBackground() {
  const stars = Array.from({length: NUM_STARS}, () => makeStar());

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

<defs>
  <circle id ="star" cx="1" cy="1" r="1" fill="white" />
  <style>
    @keyframes twinkle {
      0%,
      100% { opacity: 0.2; }
      50% { opacity: 1; }
    }

    .twinkle {
      animation-name: twinkle;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }
  </style>
</defs>

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
