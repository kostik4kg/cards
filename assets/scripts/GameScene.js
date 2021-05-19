class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  preload() {
    this.load.image('card', './assets/image/cards/card.png');
    this.load.image('card1', './assets/image/cards/card1.png');
    this.load.image('card2', './assets/image/cards/card2.png');
    this.load.image('card3', './assets/image/cards/card3.png');
    this.load.image('card4', './assets/image/cards/card4.png');
  }
  create () {
    this.createScore();
    this.createAttempts();
    this.start();
  }
  createScore() {
    this.score = 0;
    this.scoreText = this.add.text(10, 50, `score: ${this.score}`);
  }
  createAttempts() {
    this.attempt = 3;
    this.attemptText = this.add.text(10, 80, `attempts: ${this.attempt}`);
  }
  start() {
    this.cards = [];
    this.cardArr = this.createCardArray();
    console.log(this.cardArr);
    this.createCard();
    this.initCards();
    this.cardOpened = [];
    this.openedCardCount = 0;
    this.input.removeListener('pointerdown');
  }
  initCards () {
    let position = this.getCardPosition();

    this.cards.forEach(card => {
      card.init(position.pop())
    })
  }
  createCard() {
    this.cards = [];
    let index = 0;

    for (let val of config.cards) {
      this.cards.push(new Card(this, val, this.cardArr[index]));
      index++;
    }

    this.input.on('gameobjectdown', this.onCardClick, this);
  }
  onCardClick(pointer, card) {
    if (this.openedCardCount === 0 && !card.opened) {
      this.attemptText.setText(`attempts: ${this.attempt -= 1}`);
      card.open();
      this.cardOpened.push(card);
      this.openedCardCount++;
    }
    else if (this.openedCardCount <= 2 && !card.opened) {
        card.open();
        this.cardOpened.push(card);
        this.openedCardCount++;

        if (this.openedCardCount === 3) {
          this.openedCardCount = 0;
          
          this.cardOpened = this.cardOpened.filter(i => {
            if (i.valueRandom === this.cardOpened[0].valueRandom) { return true; }
            else return false;
          });
          if (this.cardOpened.length === 3) {
            card.open(this.isThreeCard.bind(this, this.cardOpened[0].valueRandom));
            }
          else {
            this.cardOpened = [];
          }
          this.restart(card);
        }
      } else {
        return false;
      }
  }
  restart(card) {
    card.open(this.isInputRest.bind(this));
  }
  isInputRest() {
    this.input.on('pointerdown', (pointer) => {
      this.cards.forEach(card => {
        card.destroy();
      });
      this.start();
    }, this);
  }
  isThreeCard(val) {
    if(val <= 2) {
      this.attemptText.setText(`attempts: ${this.attempt += config.cardsBonus[`card${val}`]}`);
    }
    else {
      this.scoreText.setText(`score: ${this.score += config.cardsBonus[`card${val}`]}`);
    }
    // this.timeoutText.setText(`time:${this.timeout}`);
    this.cardOpened = [];
  }
  getCardPosition () {
    let position = [];
    let cardTexture = this.textures.get('card').getSourceImage();
    let cardWidth = cardTexture.width + 4;
    let cardHeight = cardTexture.height + 4;
    let offsetX = (config.width - (cardWidth * 3)) / 2;
    let offsetY = 100;
    
    for (let row = 0; row < config.rows ; row++) {
      for (let col = 0; col < config.cols;col++) {
        position.push({
          x: offsetX + cardWidth * col,
          y: offsetY + cardHeight * row
        })
      }
    }
    return position;
  }
  createCardArray() {
    let cardArray = [];
    for (let i = 0; i< config.cards.length; i++) {
      cardArray.push(Phaser.Math.Between(1, 4));
    }
    return cardArray;
  }
}