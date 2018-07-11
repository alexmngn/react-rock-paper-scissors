# react-rock-paper-scissors

This is a project example of the game "Rock Paper Scissors" built with React.js.

<img width="320" src="https://cloud.githubusercontent.com/assets/4203845/24133009/166cc59c-0e3d-11e7-92a3-650a677d9c03.png">

The architecture is feature-based and follows the recommendation from the article I wrote on Medium: [How to better organize your React applications?](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)

It can easily be extended to different versions of the game, such as "Rock Paper Scissors Lizard Spock"

The project has unit tests which only covers the main game features.

You can fork and clone the project and run `npm install` to install the external dependencies.
This project has been tested with node v7.7.1 and npm 4.1.2.

## Helpful commands

You have the following CLI commands available:

- `npm run start` Runs the project with `webpack-dev-server` and serves it on http://localhost:3333

- `npm run test`: Runs unit tests via Karma, in Chrome by default

- `npm run lint`: Runs ESLint against your source and config files

- `npm run build` Runs Webpack build

- `npm run serve` Serves the `build/` folder contents
