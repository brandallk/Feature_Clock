// This module creates a digital timer that will run in sync with the clock
// animation created by the clock.js module, with its output formatted as
// hh:mm:ss (hh=hours, mm=minutes, ss= seconds). It also includes, with its
// setDirection() and getDirection() methods, functionality to track the
// forward vs. reverse direction of time-flow/clock-animation independently of
// the clock.js module.

const clockTime = function() {
  // Default time values
  let clockTime = 0;
  let formattedClockTime = {
    hours: "12",
    minutes: "00",
    seconds: "00"
  };

  let timerDirection = "forward"; // Default time-flow direction

  // Set time-flow direction to either "forward" or "reverse"
  function setDirection(direction) {
    timerDirection = direction;
  }

  // Report currently-set time-flow direction
  function getDirection() {
    return timerDirection;
  }

  // Update clockTime variable by +1sec (forward direction) or -1sec (reverse
  // direction) for each elapsed tickInterval.
  function timer(increment) {
    // Add increment passed as argument (either +1sec or -1sec) to clockTime
    clockTime += increment;
  }

  // Reset the time when it passes 12:00:00 in either forward or reverse direction.
  function resetTime(reversingPastZero = false) { // Forward is default.
    // For forward direction, i.e. clock has run for 12 hours and is continuing.
    if(!reversingPastZero) {
      // Reset time to 0.
      clockTime = 0;
      formattedClockTime = {
        hours: "12",
        minutes: "00",
        seconds: "00"
      };
    } else { // For reverse direction, i.e. clock has run backwards to "zero".
      // Reset time to 11:59:59.
      clockTime = 11*60*60 + 59*60 + 59; // 11hrs, 59min, 59sec in seconds.
    }
  }

  // Helper function used in getClockTime(), below.
  function formatTimeRange(unformatted) {
    // If less than 10 units of the given time Range have passed, e.g. hours < 10...
    if ( unformatted < 10 ) {
      // ...only change the 2nd digit
      return "0" + unformatted;
    } else {
    // Otherwise change both digits.
      return unformatted;
    }
  }

  // Get and convert current (unformatted) clockTime in seconds to hh:mm:ss
  // formattedClockTime.
  function getClockTime() {

    // If clockTime is negative (i.e. if the clock has been run reverse-direction
    // past zero), call resetTime() with its "reversingPastZero" argument set to
    // "true"...
    if( clockTime < 0 ) {
      resetTime(true);
      // ... and call the present function recursively.
      getClockTime();
    }

    // A set of variables to help make the time-logic that follows easier to reason
    // about.
    let seconds = clockTime;
    let minutes = Math.floor( clockTime / 60 );
    let hours = Math.floor( clockTime / ( 60*60 ) );

    // console.log(hours + ", " + minutes + ", " + seconds); // (for debugging)

    // If less than one minute has passed, i.e. minutes < 1...
    if ( minutes < 1 ) {
      // ...only change the seconds
      formattedClockTime.seconds = formatTimeRange( seconds );
    }
    // Otherwise, if less than one hour has passed, i.e. hours < 1...
    else if ( hours < 1) {
      // ...change the seconds
      seconds = seconds % 60;
      formattedClockTime.seconds = formatTimeRange( seconds );
      // ...and change the minutes.
      formattedClockTime.minutes = formatTimeRange( minutes );
    }
    // Otherwise, if less than 12 hours have passed, i.e. hours < 12...
    else if ( hours < 12 ) {
      // ...change the seconds
      seconds = seconds % 60;
      formattedClockTime.seconds = formatTimeRange( seconds );
      // ...change the minutes
      minutes = minutes % 60;
      formattedClockTime.minutes = formatTimeRange( minutes );
      // ...and change the hours
      formattedClockTime.hours = formatTimeRange( hours );
    }
    // Otherwise, if 12 hours have passed, i.e. hours >= 12...
    else if ( hours >= 12 ) {
      // ...reset the clock to 0
      resetTime();
      // ...and get time again
      getClockTime();
    }

    return formattedClockTime;
  }

  return {
    setDirection : setDirection,
    getDirection : getDirection,
    timer        : timer,
    resetTime    : resetTime,
    getClockTime : getClockTime
  };

}();
