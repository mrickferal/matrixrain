const matrixRain = {
  init: function () {
    console.log("Hello world, I'm matrixRain.js 🌧️");

    // clear the inerval of the setInterval() method
    clearInterval(matrixRain.intervalID);

    matrixRain.canvas = document.getElementById("matrix-rain-canvas");
    if (matrixRain.canvas) {
      matrixRain.context = matrixRain.canvas.getContext("2d");

      // set the canvas's layout
      matrixRain.canvas.style.position = "fixed";
      matrixRain.canvas.style.top = "0";
      matrixRain.canvas.style.left = "0";
      matrixRain.canvas.width = window.innerWidth;
      matrixRain.canvas.height = window.innerHeight;
      matrixRain.canvas.style.zIndex = "0";

      // set the font size
      matrixRain.fontSize = 16;

      // calculate how many character can fit on the screen horizontally by dividing the width of the canvas with the font size
      matrixRain.columns = matrixRain.canvas.width / matrixRain.fontSize;

      // set the characters that are going to be display by the animation
      matrixRain.latinCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      matrixRain.katakanaCharacters =
        "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴ";
      matrixRain.numbers = "0123456789";

      // combine the arrays to create our set of data
      matrixRain.characters =
        matrixRain.latinCharacters +
        matrixRain.katakanaCharacters +
        matrixRain.numbers;

      // create an array to keep track of the current vertical position (y-coordinate) of the 'drops' in the matrix rain animation
      // each element in the array corresponds to a column on the screen, and its value represents the y-coordinate of the character currently falling in that column
      matrixRain.drops = [];

      // the index of a element represent its coordinates on the X-axis and the value of a element represent its coordinates on the Y-axis
      for (let index = 0; index < matrixRain.columns; index++) {
        // set the y-coordinates to every x-coordinates according to the matrixRain.drops index
        // initially, each column has its character starting at the top of the screen
        matrixRain.drops[index] = 1;
      }

      // start the matrix rain animation
      matrixRain.start();
    }
  },
  /**
   * Starts the matrix rain animation.
   * @return {void}
   */
  start: function () {
    // console.log("matrixRain.start()");

    // draw the canvas
    const draw = () => {
      // draw, over `matrixRain.canvas`, a transparent rentangle to fade out the already draw `matrixRain.fallingCharacters`
      matrixRain.context.fillStyle = "rgba(0, 0, 0, 0.05)";
      matrixRain.context.fillRect(
        0,
        0,
        matrixRain.canvas.width,
        matrixRain.canvas.height
      );

      // set the color of `matrixRain.fallingCharacters` width the value returned by `matrixRain.getFontColorHexadecimalValue()`
      matrixRain.context.fillStyle = matrixRain.getFontColorHexadecimalValue();

      // set the font size and the font family of `matrixRain.fallingCharacters`
      matrixRain.context.font = matrixRain.fontSize + "px Fira Mono";

      // generate a random character from each `matrixRain.drops`
      for (let index = 0; index < matrixRain.drops.length; index++) {
        // create `matrixRain.fallingCharacters` (which is one character) by generating a random character from `matrixRain.characters` with the return of `charAt()` who is called with a number in argument
        // the number with which the `charAt()` is called in argument is the result of `Math.floor()` who is called with `Math.random()` multiply by the length of `matrixRain.characters` in argument
        matrixRain.fallingCharacters = matrixRain.characters.charAt(
          Math.floor(Math.random() * matrixRain.characters.length)
        );
        // draw the character on the screen
        // the first one is the character, the second one is the x-coordinates and the third one is the y-coordinates
        // multiply the coordinates by matrixRain.fontSize to get the perfect spacing
        matrixRain.context.fillText(
          matrixRain.fallingCharacters,
          index * matrixRain.fontSize,
          matrixRain.drops[index] * matrixRain.fontSize
        );

        // `matrixRain.drops` toutch the bottom border of the viewport
        // `matrixRain.drops` y-coordinates is greater than `matrixRain.canvas.height`
        if (
          matrixRain.drops[index] * matrixRain.fontSize >
            matrixRain.canvas.height &&
          Math.random() > 0.975
        ) {
          // set its y-coordinate to 0 so it can start from the top of the viewport again
          matrixRain.drops[index] = 0;
        }

        // increment the value of the Y-axis so in the next iteration its will be draw one step donwer
        matrixRain.drops[index]++;
      }
    };

    // calls `draw()` every 30 milliseconds
    matrixRain.intervalID = setInterval(draw, 80);
  },
  /**
   * Returns the hexadecimal value of the font color defined in 'app.js'.
   * @return {String}
   */
  getFontColorHexadecimalValue: function () {
    // console.log("matrixRain.getFontColorHexadecimalValue()");

    return app.colors.lime;
  },
};
