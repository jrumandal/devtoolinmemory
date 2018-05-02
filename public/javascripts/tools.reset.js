function reset () {
  this.memory.$cards.find('.back h1').text('');
  this.memory.initGame();
}

Memory.prototype.reset = reset;
