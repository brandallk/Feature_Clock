// A module to track and report clock time.

const clockTime = function() {
  let clockTime = 0;
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
  function formatTime() {
    // Convert current (unformatted) clockTime integer into formattedClockTime
    return formattedClockTime;
  }
  function getClockTime() {
    formatTime();
    return formattedClockTime;
  }

  return {
    startTimer : startTimer, // Call this with direction, tickInterval when clock starts running
    stopTimer : stopTimer, // Call this when clock stops running (Pause clockTime)
    getClockTime : getClockTime // Call this every tick to update digital display
  };

}();
