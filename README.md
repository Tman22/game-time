# Cannonz

### The Team

* [Taylor Moore](https://github.com/Tman22)
* [Nicholas Dorans](https://github.com/NickyBobby)

### The Stack

* JavaScript
* HTML5 canvas
* Webpack
* Node
* Express
* Mocha/Chai

### Game Play

The point of the game is to hit all the targets on each level. You can rotate the cannon using the up/down arrows on the keyboard and press spacebar to shoot. The power bar on the left side of the screen goes up and down continuously and you have to time your shots just right to hit the targets.

![Cannonz](http://recordit.co/MTt0kmvPYy)

### Testing

Unit tests were written using Chai. They can be run by cloning down the project, then running `npm install` and `npm test`.

### Production

Play it for yourself right [here](tman22.github.io/game-time)!

### The Inspiration

We were inspired to make this game based off an old MS-DOS computer game from the early 90's called [Gorillas](https://en.wikipedia.org/wiki/Gorillas_(video_game)). Someone also made an exact replica of that exact game, which you can play right [here](http://theraccoonshare.com/GORILLAS.BAS/).

### Final Thoughts

The game turned out really well - not bad for only knowing JavaScript for 2 weeks prior to starting the project. We were particularly proud of our refactoring that enabled us to test every single function in the program. We also really like the difficulty level came ended up with. It's definitely not easy to clear all the targets in level 3 and that was by design. Our high score is 107, what's yours???

### Installation Details

To install the dependencies:

```
npm install
```

To fire up a development server:

```
npm start
```

Once the server is running, you can visit:

* `http://localhost:8080/webpack-dev-server/` to run your application.
* `http://localhost:8080/webpack-dev-server/test.html` to run your test suite in the browser.

To build the static files:

```js
npm run build
```


To run tests in Node:

```js
npm test
```
