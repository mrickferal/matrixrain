const app = {
  init: function () {
    console.log("Hello world, I'm app.js 👑");

    // all the colors of the app are set in CSS variables
    // get the value of the CSS variables
    app.colors = {
      lime: getComputedStyle(document.documentElement).getPropertyValue(
        "--lime"
      ),
    };

    // load the module used in the app
    matrixRain.init();
  },
};

document.addEventListener("DOMContentLoaded", app.init);
