const matrixRain = {
  init: function () {
    console.log("Hello world, I'm matrixRain.js 🌧️");

    // stop the animation left over by a previous call, 'cause `init()` is called again each time the user switches mode
    matrixRain.stop();

    matrixRain.canvas = document.getElementById("matrix-rain-canvas");

    // there is no canvas on this page, so there is nothing to animate
    if (!matrixRain.canvas) return;

    matrixRain.context = matrixRain.canvas.getContext("2d");

    // the browser can't provide a 2D context
    if (!matrixRain.context) return;

    // set the canvas's layout
    matrixRain.canvas.style.position = "fixed";
    matrixRain.canvas.style.top = "0";
    matrixRain.canvas.style.left = "0";
    matrixRain.canvas.width = window.innerWidth;
    matrixRain.canvas.height = window.innerHeight;
    matrixRain.canvas.style.zIndex = "-1";

    // set the font size
    matrixRain.fontSize = 16;

    // calculate how many character can fit on the screen horizontally by dividing the width of the canvas with the font size
    matrixRain.columns = Math.ceil(
        matrixRain.canvas.width / matrixRain.fontSize,
    );

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

    // create an array to keep track of the current vertical position (y-coordinate) of the "drops" in the matrix rain animation
    // each element in the array corresponds to a column on the screen, and its value represents the y-coordinate of the character currently falling in that column
    matrixRain.drops = [];

    // the index of an element represent its coordinates on the X-axis and the value of a element represent its coordinates on the Y-axis
    for (let index = 0; index < matrixRain.columns; index++) {
      // initially, each column has its character starting at the top of the screen
      matrixRain.drops[index] = 1;
    }

    // pause the animation when the tab is hidden and resume it when it becomes visible again
    // the handler is always the same function reference, so calling `init()` several times never stacks duplicate listeners
    document.addEventListener(
        "visibilitychange",
        matrixRain.handleVisibilityChange,
    );

    // don't start if the page was opened in a background tab, `matrixRain.handleVisibilityChange()` starts it once the tab is visible
    if (!document.hidden) {
      matrixRain.start();
    }
  },
  /**
   * Starts the matrix rain animation, unless it is already running.
   * @return {void}
   */
  start: function () {
    // console.log("matrixRain.start()");

    // already running, starting a second interval would make the rain fall twice as fast
    if (matrixRain.intervalID) return;

    // calls `matrixRain.draw()` every 80 milliseconds
    matrixRain.intervalID = setInterval(matrixRain.draw, 80);
  },
  /**
   * Stops the matrix rain animation. Safe to call when it isn't running.
   * @return {void}
   */
  stop: function () {
    // console.log("matrixRain.stop()");

    clearInterval(matrixRain.intervalID);
    matrixRain.intervalID = null;
  },
  /**
   * Pauses the animation when the tab is hidden and resumes it when the tab becomes visible again, to avoid wasting CPU and battery on a canvas nobody can see.
   * @return {void}
   */
  handleVisibilityChange: function () {
    // console.log("matrixRain.handleVisibilityChange()");

    // no canvas on this page, nothing to pause or resume
    if (!matrixRain.canvas) return;

    if (document.hidden) {
      matrixRain.stop();
    } else {
      matrixRain.start();
    }
  },
  /**
   * Draws one frame of the matrix rain animation.
   * @return {void}
   */
  draw: function () {
    // console.log("matrixRain.draw()");

    // draw, over `matrixRain.canvas`, a transparent rectangle to fade out the already drawn characters
    matrixRain.context.fillStyle = "rgba(0, 0, 0, 0.05)";
    matrixRain.context.fillRect(
        0,
        0,
        matrixRain.canvas.width,
        matrixRain.canvas.height,
    );

    // set the color of the falling characters with the value returned by `matrixRain.getFontColorHexadecimalValue()`
    matrixRain.context.fillStyle = matrixRain.getFontColorHexadecimalValue();

    // set the font size and the font family of the falling characters
    matrixRain.context.font = matrixRain.fontSize + "px Fira Mono";

    // generate a random character for each of `matrixRain.drops`
    for (let index = 0; index < matrixRain.drops.length; index++) {
      // pick a random character from `matrixRain.characters`
      const fallingCharacter = matrixRain.characters.charAt(
          Math.floor(Math.random() * matrixRain.characters.length),
      );

      // draw the character on the screen
      // the first argument is the character, the second one is the x-coordinate and the third one is the y-coordinate
      // multiply the coordinates by `matrixRain.fontSize` to get the perfect spacing
      matrixRain.context.fillText(
          fallingCharacter,
          index * matrixRain.fontSize,
          matrixRain.drops[index] * matrixRain.fontSize,
      );

      // the drop touched the bottom border of the canvas, so there is a small chance it starts again from the top
      if (
          matrixRain.drops[index] * matrixRain.fontSize >
          matrixRain.canvas.height &&
          Math.random() > 0.975
      ) {
        // set its y-coordinate to 0 so it can start from the top of the canvas again
        matrixRain.drops[index] = 0;
      }

      // increment the value of the Y-axis so in the next frame it will be drawn one step lower
      matrixRain.drops[index]++;
    }
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