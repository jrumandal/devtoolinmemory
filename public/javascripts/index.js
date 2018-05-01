function Memory () {
  this.$cards = $('.flip-container');
  this.couples = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  this.selected = {
    first: undefined, second: undefined
  };

  this.initGame = function initGame () {
    this.bindEvents();

    this.couples.forEach(letter => {
      this.assignCard(letter);
      this.assignCard(letter);
    });
  };

  this.assignCard = function assignCard (item) {
    var cartaEstratta = 0;
    var $h1 = $(this.$cards[cartaEstratta]).find('.back h1');
    while ($h1.text().length > 0) $h1 = $(this.$cards[cartaEstratta = parseInt(Math.random() * 100 % this.$cards.length, 10)]).find('.back h1');
    $h1.text(item);
    console.log(item, cartaEstratta);
  };

  this.bindEvents = function bindEvents () {
    var that = this;
    this.$cards.on('click', function () {
      if ($(this).hasClass('blocked')) return;
      $(this).toggleClass('hover');
      that.selected[(that.selected.first === undefined) ? 'first' : 'second'] = $(this);
      if (that.selected.second !== undefined) {
        setTimeout(function () {
          if (that.isCouple()) that.blockCards();
          that.resetSelection();
        }, 500);
      }
    });
  };

  this.isCouple = function isCouple () {
    var firstItem = this.selected.first.find('.back h1').text();
    var secondItem = this.selected.second.find('.back h1').text();
    return firstItem === secondItem;
  };

  this.resetSelection = function resetSelection () {
    this.selected.first.removeClass('hover');
    this.selected.second.removeClass('hover');
    this.selected = {};
  };

  this.blockCards = function blockCards () {
    this.selected.first.addClass('blocked');
    this.selected.second.addClass('blocked');
  };
}

$(document).ready(function () {
  var p = new Memory();
  p.initGame();
});
