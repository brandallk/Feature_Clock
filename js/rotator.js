// This module creates a Rotator class to be instatiated for each rotating element
// (i.e. gear) in the clock. It returns a rotator.Rotator object that is used in
// the clock.js module. It contains the basic methods for rotating elements,
// starting rotation, stopping rotation, changing rotation speed and direction,
// and reseting to original position.
// Notes:
// 1.   The setInterval() function must be given a name because you need the name
// in order to use clearInterval(). That is why the Rotator class includes an
// "interval" variable that is initially set to null.
// 2.   The rotate() method in the Rotator class had to have "this" rebound to it
// (at the bottom of the constructor block) because when the start() method
// calls rotate() inside setInterval(), rotate() loses its reference to "this".
// Without rebinding "this", all of the "this" references in rotate() were
// undefined.
// 3.   As currently written, this module requires jQuery.
// Note: Because index.html loads jQuery from the Google CDN, the app will "break"
// if it's run offline.

var rotator = function($) {
  class Rotator {
    constructor(selector, increment, svgXCoord, svgYCoord, tickInterval) {
      this.selector     = selector;   // Rotating element's CSS selector for jQuery use
      this.rotation     = 0;          // Accumulates amount of rotation in degrees
      this.increment    = increment; // Degrees of rotation per clock tick
      this.interval     = null;       // Name for the setInterval function
      this.svgXCoord    = svgXCoord; // SVG x-coordinate for the rotator's center
      this.svgYCoord    = svgYCoord; // SVG y-coordinate for the rotator's center
      this.tickInterval = tickInterval; // Number of miliseconds per clock "tick"
      this.rotate       = this.rotate.bind(this);
    }
    setTickInterval(tick) {
      // Adjust for either "normal" or "fast" clock animation speed, depending
      // on the value passed in for "tick"
      this.tickInterval = tick;
    }
    setDirection(direction) {
      // Controls whether the rotation is clockwise or counterclockwise. The "direction"
      // argument must be either 1 or -1. If direction=1, the next time the clock
      // starts, rotation will be in the same direction as the last time the clock
      // started. If direction=(-1), the next time the clock starts, rotation
      // direction will change.
      this.increment = this.increment * direction;
    }
    rotate() {
      this.rotation += this.increment;
      // Add a "transform: rotate()" attribute to the selected SVG element
      $(this.selector).attr("transform",
        "rotate(" + this.rotation + " " + this.svgXCoord + " " + this.svgYCoord + ")");
    }
    start() {
      // Commence rotating the SVG element by the increment angle once per tickInterval
      this.interval = setInterval(this.rotate, this.tickInterval);
    }
    stop() {
      clearInterval(this.interval);
    }
    reset() {
      // Use "transform: rotate()" attribute to set rotation angle back to original
      // position
      this.rotation = 0;
      $(this.selector).attr("transform",
        "rotate(" + this.rotation + " " + this.svgXCoord + " " + this.svgYCoord + ")");
    }
  }

  return {
    Rotator : Rotator
  }

}(jQuery);
