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
    this.cardArr = this.createCardArray();
    this.createCard();
    this.initCards();
    this.createScore();
    this.start();
    console.log(this.cardArr);
  }
  createScore() {
    this.timerText = this.add.text(10,50,'score: ');
  }
  start() {
    this.cardOpened = [];
    this.openedCardCount = 0;
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
    if(card.opened) {
      card.close();
    }
    else {
      if (this.openedCardCount <= 2) {
        card.open();
        this.cardOpened.push(card);
        console.log(card.valueRandom);
        this.openedCardCount++;
      }
      else{
        card.open();
        let a = this.cardOpened.filter(i => {
          if (i.valueRandom === this.cardOpened[0].valueRandom) {return true;}
          else return false;
        });
        // this.cardOpened.forEach(card => {
        //   card.close();
        // })
        console.log(a);
        this.openedCardCount = 0;
        this.cardOpened = [];
      }
      // card.open();
    }
  }
  getCardPosition () {
    let position = [];
    let cardTexture = this.textures.get('card').getSourceImage();
    let cardWidth = cardTexture.width + 4;
    let cardHeight = cardTexture.height + 4;
    let offsetX = 150;
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