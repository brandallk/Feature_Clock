// A module to track and report clock time.

const clockTime = function() {
  // let clockTime = 3; // 12:00:03
  // let clockTime = 303; // 12:05:03
  // let clockTime = 903; // 12:15:03
  let clockTime = 3903; // 01:05:03
  // let clockTime = 46801; // 13:00:01 = 01:00:01
  let formattedClockTime = {
    hours: "12",
    minutes: "00",
    seconds: "00"
  };

  // Update clockTime variable by +1sec (forward direction) or -1sec (reverse
  // direction) for each elapsed tickInterval.
  function timer(increment) {
    // Add increment (either +1sec or -1sec) to variable clockTime
  }
  function startTimer(direction, tickInterval) {
    // If direction=forward, call timer(+1sec) every tickInterval
    // If direction=reverse, call timer(-1sec) every tickInterval
  }
  function stopTimer() {
    // clearInterval()
  }
  function resetTimer() {
    // reset time to 0
  }

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

  // Convert current (unformatted) clockTime integer into formattedClockTime
  function formatTime() {

    let seconds = clockTime;
    let minutes = Math.floor( clockTime / 60 );
    let hours = Math.floor( clockTime / ( 60*60 ) );

    console.log(hours + ", " + minutes + ", " + seconds);

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
    // Otherwise, if no more than 12 hours have passed, i.e. hours <= 12...
    else if ( hours <= 12 ) {
      // ...change the seconds
      seconds = seconds % 60;
      formattedClockTime.seconds = formatTimeRange( seconds );
      // ...change the minutes
      minutes = minutes % 60;
      formattedClockTime.minutes = formatTimeRange( minutes );
      // ...and change the hours
      formattedClockTime.hours = formatTimeRange( hours );
    }
    // Otherwise, if more than 12 hours have passed, i.e. hours > 12...
    else if ( hours > 12 ) {
      // ...reset the clock to 0
      // ...and restart the timer
    }

    return formattedClockTime;
  }

  function getClockTime() {
    return formatTime();
    // return formattedClockTime;
  }

  return {
    startTimer   : startTimer,  // Call this with direction, tickInterval when clock starts running
    stopTimer    : stopTimer,   // Call this when clock stops running (Pause clockTime)
    resetTimer   : resetTimer,  // Call this when RESET button is clicked
    getClockTime : getClockTime // Call this every tick to update digital display
  };

}();
