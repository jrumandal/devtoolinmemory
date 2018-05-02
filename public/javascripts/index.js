/**
 * Memory game object constructor that defines the essential elements and behaviors required to reproduce basic functionalities of the game.
 */
function Memory () {
  if (Object.assign !== undefined) console.log('You are running modern browser');
  /** List of element cards */
  this.$cards = $('.flip-container');
  /** Facecards array */
  this.couples = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  /** Object keyed to manage card selection */
  this.selected = {
    first: undefined, second: undefined
  };

  this.init = function () {
    this.bindEvents();
  };
  /** Method that should be called as first method after instantiation */
  this.initGame = function initGame () {
    this.couples.forEach((letter) => {
      this.assignCard(letter);
      this.assignCard(letter);
    });
  };
  /**
   * Method that assigns the passed item to a random card.
   * @param {string} item Item that's going to rappresent card's front face.
   */
  this.assignCard = function assignCard (item) {
    var cartaEstratta = 0;
    var $h1 = $(this.$cards[cartaEstratta]).find('.back h1');
    while ($h1.text().length > 0) $h1 = $(this.$cards[cartaEstratta = parseInt(Math.random() * 100 % this.$cards.length, 10)]).find('.back h1');
    $h1.text(item);
    console.log(item, cartaEstratta);
  };
  /** Method that binds basic functionalities of the game. */
  this.bindEvents = function bindEvents () {
    var that = this;
    this.$cards.on('click', function () {
      if ($(this).hasClass('blocked')) return; // ignore the card if already blocked
      $(this).toggleClass('hover');
      that.selected[(that.selected.first === undefined) ? 'first' : 'second'] = $(this);
      if (that.selected.second !== undefined) {
        setTimeout(function () {
          if (that.isCouple()) that.blockCards(); // check if couple is good
          that.resetSelection(); // reset virtual/temp selection
        }, 500);
      }
    });
  };
  /** Method to check if choosen cards have same identity */
  this.isCouple = function isCouple () {
    var firstItem = this.selected.first.find('.back h1').text();
    var secondItem = this.selected.second.find('.back h1').text();
    return firstItem === secondItem;
  };
  /** Method to reset current selection. */
  this.resetSelection = function resetSelection () {
    this.selected.first.removeClass('hover');
    this.selected.second.removeClass('hover');
    this.selected = {};
  };
  /** Method called to block a couple of cards. Usually called when this.isCouple is true */
  this.blockCards = function blockCards () {
    this.selected.first.addClass('blocked');
    this.selected.second.addClass('blocked');
  };
}