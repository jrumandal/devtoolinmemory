function inizia () {
  var memory = new Memory();
  memory.init();
  memory.initGame();
}

$(document).ready(() => {
  inizia();

  console.log(Object.assign)
});
