// This module initializes the clock app and controls the UI, i.e. the buttons
// and their event handlers. As currently written, this module requires jQuery.
// Note: Because index.html loads jQuery from the Google CDN, the app will "break"
// if it's run offline.

const app = function($) {

  function init() {

    // Increment for the digital time-display. (This default value changes to +1
    // or -1 when timer starts).
    let increment = 0;

    // Name for the setInterval() function used to start the digital timer. (It
    // must be named so it can be cleared with clearInterval().)
    let interval = null;

    // Get default values from the clockTime.js module and use them to set the
    // digital display's initial state.
    let time = clockTime.getClockTime();
    $("#hours").text(time.hours);
    $("#minutes").text(time.minutes);
    $("#seconds").text(time.seconds);

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
        const $oppDirectionButtons = $target.parent().siblings().children();

        // Set time-flow direction in the clockTime.js module
        if($target.parent().hasClass("forwardDirection")) {
          clockTime.setDirection("forward");
        } else if($target.parent().hasClass("reverseDirection")) {
          clockTime.setDirection("reverse");
        }

        // Set the clock animation speed
        if($target.hasClass("fast")) {
          clock.setSpeed("fast");
        } else {
          clock.setSpeed("normal");
        }

        // If a change in clock animation direction was not selected...
        if($target.hasClass("selected") || $targetSibling.hasClass("selected")) {
          // Don't change the direction.
          clock.keepSameDirection();
          // But do reassign the "selected" class if a new button was clicked.
          if($targetSibling.hasClass("selected")) {
            $target.addClass("selected");
            $targetSibling.removeClass("selected");
          }
        } else {
          // A change in clock animation direction was selected, so change direction.
          clock.changeDirection();
          // Then add the "selected" class to the button clicked on...
          $target.addClass("selected");
          // And remove "selected" class from whichever button was previously "selected".
          $oppDirectionButtons.each(function() {
            $(this).removeClass("selected");
          });

          // Prevent >1 change-of-direction selection with clock stopped (as e.g.
          // when, with reverse direction already selected, user clicks "forward"
          // then "reverse" without clicking "START" in between), which would cause
          // direction to change unexpectedly when clock is run. Forcing the clock
          // to run whenever a new direction is selected prevents this behavior.
          $("#start").trigger("click");
        }
      }
    });

    // When START button is clicked...
    $("#start").click(function() {
      // Set the digital timer to either increment or decrement based on its
      // current time-flow direction setting.
      if (clockTime.getDirection() == "forward") { increment = 1; }
      else if (clockTime.getDirection() == "reverse") { increment = -1; }

      // Use the clockTime.js module to get and display time in the digital display.
      const clockInterval = clock.getTickInterval(); // Either normal or "fast" speed.
      // Update the digital display once per clockInterval.
      interval = setInterval(function() {
        clockTime.timer(increment);
        time = clockTime.getClockTime();
        $("#hours").text(time.hours);
        $("#minutes").text(time.minutes);
        $("#seconds").text(time.seconds);
      }, clockInterval);

      // Delay the clock animation for one "tick" interval to keep it in sync
      // with the digital display.
      setTimeout(clock.start(), clockInterval);

      // Hide START button; show STOP button.
      $(this).toggle();
      $("#stop").toggle();

      // Can't reset clock, speed, or direction if clock is running.
      $("#reset").addClass("disabled"); // Disable RESET button.
      // Disable all the arrow buttons except the one "selected".
      $(".options .button:not(.selected)").addClass("disabled");
    });

    // When STOP button is clicked...
    $("#stop").click(function() {
      clearInterval(interval); // Stop the digital timer.
      clock.stop();            // Stop the clock animation.
      $(this).toggle();        // Hide the STOP button.
      $("#start").toggle();    // Show the START button.

      // Can reset clock, speed, and/or direction if clock is stopped.
      $("#reset").removeClass("disabled");
      $(".options .button").removeClass("disabled");

      // Prevent unexpected direction change next time the clock starts by
      // invisibly triggering a fresh "click" event on whichever direction button
      // ("<", "<<", ">", or ">>") is currently selected.
      $(".button", ".options").each(function() {
        if($(this).hasClass("selected")) {
          $(this).trigger("click");
        }
      });
    });

    // When RESET button is clicked...
    $("#reset").click(function() {
      if(!clock.isRunning) { // (Only allow reset if clock is stopped.)

        // ... reset all gears back to original rotation position.
        clock.reset();

        // And reset the digital time display.
        clockTime.resetTime();
        clockTime.getClockTime();
        $("#hours").text("12");
        $("#minutes").text("00");
        $("#seconds").text("00");
      }
    });
  }

  return {
    init : init
  }
}(jQuery);
