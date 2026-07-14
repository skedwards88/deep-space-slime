import quarantineArt from "../images/stationIntros/quarantine.webp";

export const stationIntros: Record<string, {introText: string; art: string}> = {
  Quarantine: {
    introText: "Drat. The humans implemented security doors to contain the slime. It's definately not suspicious that I can't overide the lock.",
    art: quarantineArt,
  },
  "Bio Lab": {
    introText: "When the security doors failed, the humans developed a blaster that destroys slime. Too bad the slime spread faster than they could blast it!",
    art: todo,
  },
  "Physics Lab": {
    introText: "The humans built dimensional portals to escape the slime. It turns out the slime can also travel through portals, so it wasn't a great escape strategy.",
    art: todo,
  },
  Security: {
    introText: "The humans built this security system to stop evil bots. Unfortunately, it also stops good bots like me!",
    art: todo,
  },
  Bunker: {
    introText: "Uh oh... the slime contaminated the engines. Self destruction is totally imminent! We should herd the crew into these escape pods.",
    art: todo,
  },
  Monolog: {
    introText: "Here's a secret. The trail of slime hasn't been chasing you. YOU are the slime! I infected you and then tricked you into spreading slime across the ship.",
    art: todo,
  },
  Mastery: {
    introText: "These next rooms will keep you occupied until I take full control of the ship. There's no way you can break through in time!",
    art: todo,
  },
  Core: {
    introText: "Do you really think a puny human like you can stop me?",
    art: todo,
  },
};
