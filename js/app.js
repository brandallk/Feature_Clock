// This module initializes the clock app and controls the UI, i.e. the buttons
// and their event handlers. As currently written, this module requires jQuery.
// Note: Because index.html loads jQuery from the Google CDN, the app will "break"
// if it's run offline.

const app = function($) {
  function init() {

    $("#start").show();  // START button is visible when app loads
    $("#stop").hide();   // STOP button is hidden when app loads

    $("#forward").click(function() { // When ">" button is clicked...
      if(!clock.isRunning) { // Prevent speed or direction reset if clock is running
        clock.setSpeed("normal");
        // If "forward" is already selected, don't change direction. But do toggle
        // button "selected" status if necessary.
        if($("#forward").hasClass("selected") || $("#fastForward").hasClass("selected")) {
          clock.keepSameDirection();
          if($("#fastForward").hasClass("selected")) {
            $("#forward").addClass("selected");
            $("#fastForward").removeClass("selected");
          }
        } else { // And if "reverse" was last selected...
          $("#forward").addClass("selected");    // Toggle button "selected" status
          $("#reverse").removeClass("selected");
          $("#fastReverse").removeClass("selected");
          clock.changeDirection();              // and also change direction.

          // Prevent >1 change of direction selection (e.g. "forward" then "reverse")
          // with clock stopped, which would cause direction to change unexpectedly
          // when clock is run. Forcing the clock to run whenever a new direction
          // is selected prevents this bug.
          $("#start").trigger("click");
        }
      }
    });

    $("#fastForward").click(function() { // When ">>" button is clicked...
      if(!clock.isRunning) { // Prevent speed or direction reset if clock is running
        clock.setSpeed("fast");
        // If "forward" is already selected, don't change direction. But do toggle
        // button "selected" status if necessary.
        if($("#forward").hasClass("selected") || $("#fastForward").hasClass("selected")) {
          clock.keepSameDirection();
          if($("#forward").hasClass("selected")) {
            $("#fastForward").addClass("selected");
            $("#forward").removeClass("selected");
          }
        } else { // And if "reverse" was last selected...
          $("#fastForward").addClass("selected");    // Toggle button "selected" status
          $("#reverse").removeClass("selected");
          $("#fastReverse").removeClass("selected");
          clock.changeDirection();                   // and also change direction.
          $("#start").trigger("click");
        }
      }
    });

    $("#reverse").click(function() { // When "<" button is clicked...
      if(!clock.isRunning) { // Prevent speed or direction reset if clock is running
        clock.setSpeed("normal");
        // If "reverse" is already selected, don't change direction. But do toggle
        // button "selected" status if necessary.
        if($("#reverse").hasClass("selected") || $("#fastReverse").hasClass("selected")) {
          clock.keepSameDirection();
          if($("#fastReverse").hasClass("selected")) {
            $("#reverse").addClass("selected");
            $("#fastReverse").removeClass("selected");
          }
        } else { // And if "forward" was last selected...
          $("#reverse").addClass("selected");    // Toggle button "selected" status
          $("#forward").removeClass("selected");
          $("#fastForward").removeClass("selected");
          clock.changeDirection();              // and also change direction.
          $("#start").trigger("click");
        }
      }
    });

    $("#fastReverse").click(function() { // When "<<" button is clicked...
      if(!clock.isRunning) { // Prevent speed or direction reset if clock is running
        clock.setSpeed("fast");
        // If "reverse" is already selected, don't change direction. But do toggle
        // button "selected" status if necessary.
        if($("#reverse").hasClass("selected") || $("#fastReverse").hasClass("selected")) {
          clock.keepSameDirection();
          if($("#reverse").hasClass("selected")) {
            $("#fastReverse").addClass("selected");
            $("#reverse").removeClass("selected");
          }
        } else { // And if "forward" was last selected...
          $("#fastReverse").addClass("selected");    // Toggle button "selected" status
          $("#forward").removeClass("selected");
          $("#fastForward").removeClass("selected");
          clock.changeDirection();                  // and also change direction.
          $("#start").trigger("click");
        }
      }
    });

    // When START button is clicked, start clock animation, hide START button,
    // and show STOP button
    $("#start").click(function() {
      clock.start();
      $(this).toggle();
      $("#stop").toggle();

      // Can't reset clock, speed, or direction if clock is running
      $("#reset").addClass("disabled");
      $(".options .button").addClass("disabled");
      $(".options .selected").removeClass("disabled");
    });

    // When STOP button is clicked, stop clock animation, hide STOP button,
    // and show START button
    $("#stop").click(function() {
      clock.stop();
      $(this).toggle();
      $("#start").toggle();

      // Can reset clock, speed, and/or direction if clock is stopped
      $("#reset").removeClass("disabled");
      $(".options .button").removeClass("disabled");

      // Prevent unexpected direction change next time the clock starts by
      // silently triggering a fresh "click" event on whichever direction button
      // ("<" or ">") is currently selected.
      if($("#forward").hasClass("selected")) {
        $("#forward").trigger("click");
      }
      if($("#fastForward").hasClass("selected")) {
        $("#fastForward").trigger("click");
      }
      if($("#reverse").hasClass("selected")) {
        $("#reverse").trigger("click");
      }
      if($("#fastReverse").hasClass("selected")) {
        $("#fastReverse").trigger("click");
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
