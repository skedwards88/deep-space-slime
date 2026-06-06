const {pickRandomItemFromArray} = require("@skedwards88/word_logic");
const fs = require("fs");
const path = require("path");

const NUM_STARS = 200;
const TWINKLE_DURATION_RANGE = [3, 5];
const SHOOT_DURATION_RANGE = [45, 75];
const DELAY_RANGE = [0, 8];
const POSITION_RANGE = [1, 99];
const ANGLE_RANGE = [-360, 360];

function pickRandomBetween(number1, number2) {
  const min = Math.min(number1, number2);
  const max = Math.max(number1, number2);

  return (min + Math.random() * (max - min)).toFixed(2);
}

function makeStar() {
  const startingX = pickRandomBetween(...POSITION_RANGE);
  const startingY = pickRandomBetween(...POSITION_RANGE);
  const duration = pickRandomBetween(...TWINKLE_DURATION_RANGE);
  const delay = pickRandomBetween(...DELAY_RANGE);

  return `<use href="#star" x="${startingX}%" y="${startingY}%" fill="white" style="animation-duration:${duration}s; animation-delay:-${delay}s;" class="twinkle"/>`;
}

function makeShootingStar() {
  const startingX = pickRandomBetween(...POSITION_RANGE);
  const startingY = pickRandomBetween(...POSITION_RANGE);
  const duration = pickRandomBetween(...SHOOT_DURATION_RANGE);
  const delay = pickRandomBetween(...DELAY_RANGE);
  const angle = pickRandomBetween(...ANGLE_RANGE);
  const transformX = pickRandomItemFromArray([100, -100]);

  return `<use href="#shootingStar" x="${startingX}%" y="${startingY}%" fill="white" style="animation-duration:${duration}s; animation-delay:-${
    delay * 10
  }s; --angle:${angle}deg; --translateX:${transformX}%" class="shoot"/>`;
}

function generateStarryBackground() {
  const stars = Array.from({length: NUM_STARS}, () => makeStar());
  const shootingStars = Array.from({length: NUM_STARS * 0.2}, () =>
    makeShootingStar(),
  );

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
  <circle id ="star" cx="1" cy="1" r="2.0" fill="white" />
  <circle id ="shootingStar" cx="1" cy="1" r="2.5" fill="white" />
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

    @keyframes shoot {
      0% {
        transform: rotate(var(--angle)) translateX(0);
        opacity: 1;
      }
      2% {
        opacity: 1;
      }
      3% {
        transform: rotate(var(--angle)) translateX(var(--translateX));
        opacity: 0;
      }
      100% {
        transform: rotate(var(--angle)) translateX(var(--translateX));
        opacity: 0;
      }
    }

    .shoot {
      animation-name: shoot;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
      
  </style>
</defs>

<rect width="100%" height="100%" fill="black" stroke-width="1"/>

${stars.join("\n")}
${shootingStars.join("\n")}
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
