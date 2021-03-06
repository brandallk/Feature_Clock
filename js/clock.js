// This module runs the animation of the clock SVG. It requires the rotator.js
// module to create the "rotator objects".
// Notes:
// 1.   The SVG x- and y- coordinates represented by the variables "svgXCoord" and
// "svgYCoord" identify the center of the rotating element in question in the
// SVG coordinate system. They are easily derived by looking at the original
// Adobe Illustrator file from which the SVG was created and copying the X- and
// Y- coordinates (in px) of the corresponding element in the Illustrator file.
// For a discussion on how SVG coordinates work, see this helpful 3-part blog article:
// https://sarasoueidan.com/blog/svg-coordinate-systems/
// and also https://css-tricks.com/transforms-on-svg-elements/
// 2.   The names for the various rotating elements correspond to the layer names
// in the Adobe Illustrator file from which the clock SVG was created.
// 3.   The turn-rate ratios of the various rotating elements are fairly self-evident
// except for those of the "seconds" group (D1, D2, and D3). These 3 gears are
// designed to multiply the outer-wheel's turn-rate by a factor of 60 in 3 steps.
// So each multiplies the turn-rate by a factor of 60^(1/3) for a combined step-up
// factor of (60^(1/3))^3 = 60.
// 4.   The rate at which the clock runs is controlled by the "tickInterval"
// variable. If it is set to 1000 (ms), then the clock runs at normal speed. If
// if is set to <1000, the clock will run at abnormally fast speed.
// 5.   The clock gears seem to get out of sync in the animation if you run it
// faster than about 200ms per tickInterval. This seems to be because of the
// sampling rate the browser uses to render the image.
//
// Future work: Need to add methods to "clock" for getting, setting, and resetting
// the time so it can be matched to a digital display and changed interactively,
// or set automatically according to local time.

const clock = function() {

  // VARIABLES-----------------------------------------------------------------
  let tickInterval    = 1000; // (Default) number of miliseconds per clock "tick"
  const twelveHours   = 12 * 60 * 60,  // 12 hours in seconds
        oneHour       = twelveHours / 12, // 1 hour in seconds
        isRunning     = false;            // Tracks whether clock is running
  let   $changeDirection = false;         // Tracks rotation direction change

  // Degrees of rotation per clock tick defined for each rotating element
  const increment = {
    A1Inner   : -(360 / twelveHours),  // counterclockwise (one turn per 12hrs)
    A1Outer   : 360 / twelveHours,     // clockwise
    A2Spokes  : -(360 / twelveHours),  // counterclockwise
    hours     : 360 / twelveHours,     // clockwise
    minutesC1 : -(360 / oneHour),      // counterclockwise (one turn per 1hr)
    minutes   : 360 / oneHour,         // clockwise
    secondsD1 : -(360 / (oneHour / Math.pow(60, (1/3)))), // counterclockwise
    secondsD2 : 360 / (oneHour / Math.pow(60, (2/3))),    // clockwise
    secondsD3 : -(360 / (oneHour / 60)),                  // counterclockwise
    seconds   : 360 / (oneHour / 60)   // clockwise (one turn per minute)
  }

  // ROTATOR OBJECTS-----------------------------------------------------------
  const rotators = [];  // An array to collect all the rotating elements
  rotators[0] = new rotator.Rotator("#A1Inner", increment.A1Inner, 322.822, 322.824, tickInterval);
  rotators[1] = new rotator.Rotator("#A1Outer", increment.A1Outer, 322.822, 322.824, tickInterval);
  rotators[2] = new rotator.Rotator("#A2Spokes", increment.A2Spokes, 322.822, 322.824, tickInterval);
  rotators[3] = new rotator.Rotator("#Hours", increment.hours, 181.297, 241.115, tickInterval);
  rotators[4] = new rotator.Rotator("#MinutesC1", increment.minutesC1, 438.187, 340.738, tickInterval);
  rotators[5] = new rotator.Rotator("#Minutes", increment.minutes, 464.347, 241.115, tickInterval);
  rotators[6] = new rotator.Rotator("#SecondsD1", increment.secondsD1, 109.378, 447.193, tickInterval);
  rotators[7] = new rotator.Rotator("#SecondsD2", increment.secondsD2, 173.202, 444.138, tickInterval);
  rotators[8] = new rotator.Rotator("#SecondsD3", increment.secondsD3, 222.033, 486.261, tickInterval);
  rotators[9] = new rotator.Rotator("#Seconds", increment.seconds, 322.822, 486.243, tickInterval);

  // PUBLIC METHODS------------------------------------------------------------
  function setTickInterval(interval) {
    tickInterval = interval;
  }
  function getTickInterval() {
    return tickInterval;
  }
  function setSpeed(speed) {
    if(speed == "normal") {
      setTickInterval(1000); // Miliseconds per "tick" stays at default value
    } else {
      setTickInterval(200);  // Fast speed: 200 miliseconds per clock "tick"
    }
  }
  function keepSameDirection() {
    $changeDirection = false;
  }
  function changeDirection() {
    $changeDirection = true;
  }
  function startSameDirection() {
    // Call the start() method on each object in the "rotators" array
    rotators.forEach(function(rotator) {
      rotator.setTickInterval(tickInterval); // Set to either normal or fast speed
      rotator.setDirection(1); // Don't change rotation direction
      rotator.start();
    });
  }
  function startOppositeDirection() {
    // Call the start() method on each object in the "rotators" array
    rotators.forEach(function(rotator) {
      rotator.setTickInterval(tickInterval); // Set to either normal or fast speed
      rotator.setDirection(-1); // Change rotation direction
      rotator.start();
    });
  }
  function start() {
    if($changeDirection) {
      startOppositeDirection();
    } else {
      startSameDirection();
    }
    this.isRunning = true;
  }
  function stop() {
    // Call the stop() method on each object in the "rotators" array
    rotators.forEach(function(rotator) {
      rotator.stop();
    });
    this.isRunning = false;
  }
  function reset() {
    rotators.forEach(function(rotator) {
      rotator.reset();
    });
  }

  return {
    isRunning : isRunning,
    getTickInterval : getTickInterval,
    setSpeed : setSpeed,
    keepSameDirection : keepSameDirection,
    changeDirection : changeDirection,
    start     : start,
    stop      : stop,
    reset     : reset
  };

}();
