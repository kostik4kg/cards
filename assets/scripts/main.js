let sceneGame = new GameScene();

let config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  rows: 3,
  cols: 3,
  cards: [1,2,3,4,5,6,7,8,9],
  cardsBonus: { card1: 1, card2: 3, card3: 5, card4: 10,},
  scene: [sceneGame],
  backgroundColor: '#BF3030',
};

let game = new Phaser.Game(config);