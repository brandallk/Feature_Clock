// This module initializes the clock app and controls the UI, i.e. the buttons
// and their event handlers. As currently written, this module requires jQuery.
// Note: Because index.html loads jQuery from the Google CDN, the app will "break"
// if it's run offline.

const app = function($) {
  function init() {

    $("#start").show();  // START button is visible when app loads
    $("#stop").hide();   // STOP button is hidden when app loads

    // Click handler for the "forward", "fastForward", "reverse", and "fastReverse" buttons
    $(".button", ".options").click(function() {
      if(!clock.isRunning) { // Prevent speed or direction reset if clock is running

        // The button clicked -- e.g. ">"
        const $target = $(this);

        // The button representing the same clock animation direction as the clicked
        // button, but a different animation speed -- e.g. ">>"
        const $targetSibling = $target.siblings();

        // The two buttons representing clock animation in the opposite direction
        // -- e.g. "<" and "<<"
        const $oppDirectionButton1 = $target.parent().siblings().children().first();
        const $oppDirectionButton2 = $target.parent().siblings().children().last();

        // Set the clock animation speed
        if($target.hasClass("fast")) {
          clock.setSpeed("fast");
        } else {
          clock.setSpeed("normal");
        }

        // Assign (or reassign) class "selected" to the button clicked and remove
        // class "selected" from the other 3 buttons.
        if($target.hasClass("selected") || $targetSibling.hasClass("selected")) {
          // A change in clock animation direction has not been selected
          clock.keepSameDirection();
          if($targetSibling.hasClass("selected")) {
            $target.addClass("selected");
            $targetSibling.removeClass("selected");
          }
        } else {
          // A change in clock animation direction has been selected
          clock.changeDirection();
          $target.addClass("selected");
          $oppDirectionButton1.removeClass("selected");
          $oppDirectionButton2.removeClass("selected");

          // Prevent >1 change of direction selection (e.g. when reverse direction
          // is already selected, user clicks "forward" then "reverse" without )
          // with clock stopped, which would cause direction to change unexpectedly
          // when clock is run. Forcing the clock to run whenever a new direction
          // is selected prevents this bug.
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
      // invisibly triggering a fresh "click" event on whichever direction button
      // ("<", "<<", ">", or ">>") is currently selected.
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
