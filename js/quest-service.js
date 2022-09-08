const KEY = "questDB"
var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  gQuestsTree = _loadQuestsTreeFromStorage()
  if (!gQuestsTree) {
    gQuestsTree = createQuest("Male?")
    gQuestsTree.yes = createQuest("Gandhi")
    gQuestsTree.no = createQuest("Rita")
  }
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  var newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest
  gPrevQuest[lastRes] = newQuest

  gCurrQuest = gQuestsTree
  _saveQuestsToStorage()
}

function createQuest(txt) {
  return {
    txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res] // either 'yes' || 'no'
}

function getCurrQuest() {
  return gCurrQuest
}

function _saveQuestsToStorage() {
  saveToStorage(KEY, gQuestsTree)
}

function _loadQuestsTreeFromStorage() {
  return loadFromStorage(KEY)
}