function inizia () {
  this.memory = new Memory();
  this.memory.init();
  this.memory.initGame();
}

$(document).ready(function () {
  inizia();
});
