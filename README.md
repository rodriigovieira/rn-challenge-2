# Expenses Tracker

This is the second challenge of the React Native mastermind.

This is a simple application for my personal use that helps you create the habit of being aware of your dialy expenses. The goal is to make you aware of everything that you receive and that you spend, by adding each of these small transactions every time.

It features a simple Firebase integration, and all the data is fetched from a public Firebase project.

# Screenshots

<img src="/assets_github/HomePage.jpeg" height="490"> <img src="/assets_github/CreateExpenseGreen.jpeg" height="490"> <img src="/assets_github/CreateExpenseRed.jpeg" height="490">
<br />
<img src="/assets_github/ExpensesPage.jpeg" height="490"> <img src="/assets_github/Drawer.jpeg" height="490"> <img src="/assets_github/HomePageError.jpeg" height="490">

# Installation

To install this application, first you have to make sure that you have set your environment to support React Native.

For information on how to set up react-native, see the official documentation: https://facebook.github.io/react-native/docs/getting-started

First, clone this repository. Execute this command:

```
git clone https://github.com/rodriigovieira/rn-challenge-2
```

Then, install all dependencies of this project. Execute this command:

```
yarn install
```

PS: this command assumes you have yarn installed globally. If you don't, simply run `npm -g install yarn`.

Finally, to start the project, run one of the following commands:

```
yarn ios
```

OR

```
yarn android
```

`yarn ios` will build the project in the iOS simulator. You must be on a Mac and have XCode installed.

`yarn android` will build the project in the Android simulator. You must have either Android Studio or some other software to run the Android Emulator.
