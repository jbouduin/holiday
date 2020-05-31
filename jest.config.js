module.exports = {
  "roots": [
    "./packages/holidays",
    "./packages/holidays-http",
    './packages/holidays-lib'
  ],
  "testMatch": [
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
