"use strict"

// TODO: Add bootstrap modal

var gLastRes = null

$(init)
// $(document).ready(init)
$(".btn-start").on('click', onStartGuessing)
$(".btn-yes").on('click', { ans: "yes" }, onUserResponse)
$(".btn-no").on('click', { ans: "no" }, onUserResponse)
$(".btn-add-guess").on('click', onAddGuess)

function init() {
  createQuestsTree()
}

function onStartGuessing() {
  $(".game-start").hide()
  renderQuest()
  $(".quest").show()
}

function renderQuest() {
  const currQuest = getCurrQuest()
  $(".game-quest").text(currQuest.txt)
}

function onUserResponse(ev) {
  animateRotate(-360)
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === "yes") {
      alert("Yes, I knew it!")
      onRestartGame()
    } else {
      alert("I dont know...teach me!")
      $(".quest").hide()
      $(".new-quest").show()
    }
  } else {
    gLastRes = res
    moveToNextQuest(gLastRes) // yes||no
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  // Gets the inputs' values
  var newGuess = $("#newGuess").val()
  var newQuest = $("#newQuest").val()
  // Verifies newQuest && newGuess has values before submitting
  if (!newGuess || !newQuest) return
  // Calls the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame()
}

function onRestartGame() {
  createQuestsTree()
  $(".quest").hide()
  $(".new-quest").hide()
  $(".game-start").show()
  gLastRes = null
}

function animateRotate(angle) {
  var $elem = $("header img")

  // we use a pseudo object for the animation
  // (starts from `0` to `angle`), you can name it as you want
  $({ deg: 0 }).animate(
    { deg: angle },
    {
      duration: 2000,
      step: function (now) {
        // in the step-callback (that is fired each step of the animation),
        // you can use the `now` paramter which contains the current
        // animation-position (`0` up to `angle`)
        $elem.css({
          transform: "rotate(" + now + "deg)",
        })
      },
    }
  )
}
