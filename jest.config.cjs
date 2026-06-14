module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-react", {runtime: "automatic"}],
          "@babel/preset-typescript",
        ],
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@skedwards88/shared-components|@skedwards88/word_logic)",
  ],
  moduleNameMapper: {
    "^(\\./.*)\\.js$": "$1",
  },
};
