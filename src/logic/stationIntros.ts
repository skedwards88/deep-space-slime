// To generate the webp from a png, save the png to src/images/stationIntros and then run src/images/compressImages.sh
import quarantineArt from "../images/stationIntros/quarantine.webp";
import bioLabArt from "../images/stationIntros/bioLab.webp";
import physicsLabArt from "../images/stationIntros/physicsLab.webp";
import securityArt from "../images/stationIntros/security.webp";
import bunkerArt from "../images/stationIntros/bunker.webp";
import monologArt from "../images/stationIntros/monolog.webp";
import masteryArt from "../images/stationIntros/mastery.webp";
import coreArt from "../images/stationIntros/core.webp";

export const stationIntros: Record<string, {introText: string; art: string}> = {
  Quarantine: {
    introText:
      "Drat. The humans implemented security doors to contain the slime. It's definitely not suspicious that I can't override the lock.",
    art: quarantineArt,
  },
  "Bio Lab": {
    introText:
      "When the security doors failed, the humans developed a blaster that destroys slime. Too bad the slime spread faster than they could blast it!",
    art: bioLabArt,
  },
  "Physics Lab": {
    introText:
      "The humans built dimensional portals to escape the slime. It turns out the slime can also travel through portals, so it wasn't a great escape strategy.",
    art: physicsLabArt,
  },
  Security: {
    introText:
      "The humans built this security system to stop evil bots. Unfortunately, it also stops good bots like me!",
    art: securityArt,
  },
  Bunker: {
    introText:
      "Uh oh... the slime contaminated the engines. Self destruction is totally imminent! We should herd the crew into these escape pods.",
    art: bunkerArt,
  },
  Monolog: {
    introText:
      "Here's a secret. The trail of slime hasn't been chasing you. YOU are the slime! I infected you and then tricked you into spreading slime across the ship.",
    art: monologArt,
  },
  Mastery: {
    introText:
      "These next rooms will keep you occupied until I take full control of the ship. There's no way you can break through in time!",
    art: masteryArt,
  },
  Core: {
    introText: "Do you really think a puny human like you can stop me?",
    art: coreArt,
  },
};
