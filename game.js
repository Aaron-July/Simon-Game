var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).ready(function() {
  // Hide the colored buttons and the level title initially
  $(".btn").hide();
  $("#start-btn").show();
  $("#restart-btn").hide();
  $("#level-title").text("CLICK START TO BEGIN");

  // Add click event handler for the start button
  $("#start-btn").click(function() {
    startGame();
  });

  // Add keypress event handler to start the game when any key is pressed
  $(document).keypress(function() {
    startGame();
  });

  // Add click event handler for the restart button
  $("#restart-btn").click(function() {
    startOver();
    startGame();
  });
});

function startGame() {
  if (!started) {
    // Show the colored buttons and the level title
    $(".btn").show();
    $("#starting-img").hide();
    $("#level-title").show();
    $("#start-btn").hide();
    $("#restart-btn").hide();

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}

// When Button Is Clicked
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("#restart-btn").show();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
