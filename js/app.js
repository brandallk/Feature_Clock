// This module initializes the clock app and controls the UI, i.e. the buttons
// and their event handlers

const app = function() {
  function init() {
    $("#start").show();  // START button is visible when app loads
    $("#stop").hide();   // STOP button is hidden when app loads

    // When START button is clicked, start clock animation, hide START button,
    // and show STOP button
    $("#start").click(function() {
      clock.start();
      $(this).toggle();
      $("#stop").toggle();
      $("#reset").addClass("disabled");
    });

    // When STOP button is clicked, stop clock animation, hide STOP button,
    // and show START button
    $("#stop").click(function() {
      clock.stop();
      $(this).toggle();
      $("#start").toggle();
      $("#reset").removeClass("disabled");
    });

    // When RESET button is clicked, reset all gears back to original rotation
    // position. Only allow reset if clock is stopped.
    $("#reset").click(function() {
      if(!clock.isRunning) {
        clock.reset();
      }
    });
  }

  return {
    init : init
  }
}();
