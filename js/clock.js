// This module runs the animation of the clock SVG. It is an IIFE following the
// "revealing module pattern". It includes an internal "Rotator" class so that
// the various rotating elements can be created succinctly as instances of that
// class. The module exposes only two public methods: "start" and "stop".
// Notes:
// 1.   The setInterval function must be given a name because you need the name
// in order to use clearInterval. That is why the Rotator class includes an
// "interval" variable that is initially set to null.
// 2.   The rotate() method in the Rotator class had to have "this" rebound to it
// (at the bottom of the constructor function) because when the start() method
// calls rotate() inside setInterval(), rotate loses its reference to "this".
// Without rebinding "this", all of the "this" references in rotate() were
// undefined.
// 3.   As currently written, this module requires jQuery because it's used in the
// rotate() method -- but only on one line. The module could easily be rewritten
// using vanilla JavaScript to select the DOM elements and use JavaScript's
// setAttribute() method rather than jQuery's attr() method.
// 4.   The SVG x- and y- coordinates represented by the variables "svgXCoord" and
// "svgYCoord" identify the center of the rotating element in question in the
// SVG coordinate system. They are easily derived by looking at the original
// Adobe Illustrator file from which the SVG was created and copying the X- and
// Y- coordinates (in px) of the corresponding element in the Illustrator file.
// For a discussion on how SVG coordinates work, see this helpful 3-part blog article:
// https://sarasoueidan.com/blog/svg-coordinate-systems/
// and also https://css-tricks.com/transforms-on-svg-elements/
// 5.   The names for the various rotating elements correspond to the layer names
// in the Adobe Illustrator file from which the clock SVG was created.
// 6.   The turn-rate ratios of the various rotating elements is fairly self-evident
// except for those of the "seconds" group (D1, D2, and D3). These 3 gears are
// designed to multiply the outer-wheel's turn-rate by a factor of 60 in 3 steps.
// So each multiplies the turn-rate by a factor of 60^(1/3) for a combined step-up
// factor of (60^(1/3))^3 = 60.
// 7.   The rate at which the clock runs is controlled by the "tickInterval"
// variable. If it is set to 1000 (ms), then the clock runs at normal speed. If
// if is set to <1000, the clock will run at fast-forward speed.
// 8.   The clock module's "start" and "stop" methods are assigned to index.html's
// "start" and "stop" buttons in a script tag at the bottom of the html. So
// clicking these buttons is what starts and stops the animation. It might be
// cleaner to move the event handlers inside the clock module somehow, and then
// define a single public method "init" which would be used to initiate the app.
// 9.   The clock gears seem to get out of sync in the animation if you run it
// faster than about 300ms per tickInterval. This seems to be because of the
// sampling rate the browser uses to render the image.
//
// Future work: Need to add methods to "clock" for getting and setting the time,
// resetting the time, and for setting the clock animation speed.

const clock = function() {

  // VARIABLES-----------------------------------------------------------------
  const tickInterval = 300; // Number of miliseconds per clock "tick"
  const twelveHours = 12 * 60 * 60; // 12 hours in seconds
  const oneHour = twelveHours / 12; // 1 hour in seconds

  // Degrees of rotation per clock tick defined for each rotating element
  const increment = {
    A1Inner : -(360 / twelveHours),   // counterclockwise (one turn per 12hrs)
    A1Outer : 360 / twelveHours,      // clockwise
    A2Spokes : -(360 / twelveHours),  // counterclockwise
    hours : 360 / twelveHours,        // clockwise
    minutesC1 : -(360 / oneHour),     // counterclockwise (one turn per 1hr)
    minutes : 360 / oneHour,          // clockwise
    secondsD1 : -(360 / (oneHour / Math.pow(60, (1/3)))), // counterclockwise
    secondsD2 : 360 / (oneHour / Math.pow(60, (2/3))),    // clockwise
    secondsD3 : -(360 / (oneHour / 60)),                  // counterclockwise
    seconds : 360 / (oneHour / 60)    // clockwise (one turn per minute)
  }

  // ROTATOR CLASS-------------------------------------------------------------
  class Rotator {
    constructor(selector, increment, svgXCoord, svgYCoord) {
      this.selector = selector;   // Rotating element's CSS selector for jQuery use
      this.rotation = 0;          // Accumulates amount of rotation in degrees
      this.increment = increment; // Degrees of rotation per clock tick
      this.interval = null;       // Name for the setInterval function
      this.svgXCoord = svgXCoord; // SVG x-coordinate for the rotator's center
      this.svgYCoord = svgYCoord; // SVG y-coordinate for the rotator's center
      this.rotate = this.rotate.bind(this);
    }
    rotate() {
      this.rotation += this.increment;
      // Add a "transform: rotate()" attribute to the selected SVG element
      jQuery(this.selector).attr("transform",
        "rotate(" + this.rotation + " " + this.svgXCoord + " " + this.svgYCoord + ")");
    }
    start() {
      // Commence rotating the SVG element by the increment angle once per tickInterval
      this.interval = setInterval(this.rotate, tickInterval);
    }
    stop() {
      clearInterval(this.interval);
    }
  }

  // ROTATOR OBJECTS-----------------------------------------------------------
  const rotators = [];  // An array to collect all the rotating elements
  rotators[0] = new Rotator("#A1Inner", increment.A1Inner, 322.822, 322.824);
  rotators[1] = new Rotator("#A1Outer", increment.A1Outer, 322.822, 322.824);
  rotators[2] = new Rotator("#A2Spokes", increment.A2Spokes, 322.822, 322.824);
  rotators[3] = new Rotator("#Hours", increment.hours, 181.297, 241.115);
  rotators[4] = new Rotator("#MinutesC1", increment.minutesC1, 438.187, 340.738);
  rotators[5] = new Rotator("#Minutes", increment.minutes, 464.347, 241.115);
  rotators[6] = new Rotator("#SecondsD1", increment.secondsD1, 109.378, 447.193);
  rotators[7] = new Rotator("#SecondsD2", increment.secondsD2, 173.202, 444.138);
  rotators[8] = new Rotator("#SecondsD3", increment.secondsD3, 222.033, 486.261);
  rotators[9] = new Rotator("#Seconds", increment.seconds, 322.822, 486.243);

  // PUBLIC METHODS------------------------------------------------------------
  function start() {
    // Call the start() method on each object in the "rotators" array
    rotators.forEach(function(rotator) {
      rotator.start();
    });
  }
  function stop() {
    // Call the stop() method on each object in the "rotators" array
    rotators.forEach(function(rotator) {
      rotator.stop();
    });
  }

  return {
    start : start,
    stop : stop
  };

}();
