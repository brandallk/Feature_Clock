// This module initializes the clock app and controls the UI, i.e. the buttons
// and their event handlers. As currently written, this module requires jQuery.
// Note: Because index.html loads jQuery from the Google CDN, the app will "brdak"
// if it's run offline.

const app = function($) {
  function init() {

    $("#start").show();  // START button is visible when app loads
    $("#stop").hide();   // STOP button is hidden when app loads

    $("#forward").click(function() {
      if($("#forward").hasClass("selected")) { // If "forward" is already selected,
        clock.keepSameDirection();             // don't change direction.
      } else {                                 // But if "reverse" is selected...
        $("#forward").addClass("selected");
        $("#reverse").removeClass("selected");
        clock.changeDirection();               // ...then change direction.
      }
    });

    $("#reverse").click(function() {
      if($("#reverse").hasClass("selected")) { // If "reverse" is already selected,
        clock.keepSameDirection();             // don't change direction.
      } else {                                 // But if "forward" is selected...
        $("#reverse").addClass("selected");
        $("#forward").removeClass("selected");
        clock.changeDirection();               // ...then change direction.
      }
    });

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

      // Prevent unexpected direction change by triggering a fresh "click" event
      // on whichever direction button is currently selected.
      if($("#forward").hasClass("selected")) {
        $("#forward").trigger("click");
      }
      if($("#reverse").hasClass("selected")) {
        $("#reverse").trigger("click");
      }
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
}(jQuery);
