class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, value, valueRandom) {
    super(scene, 100, 100, 'card');
    this.scene = scene;
    this.value = value;
    this.valueRandom = valueRandom;
    this.opened = false;
    this.cardText = '';
    this.scene.add.existing(this);
    this.setInteractive();
    // this.on('pointerdown', this.open, this); 
  }
  init(position) {
    this.position = position;
    this.setPosition(position.x, position.y);
  }
  open(callback) {
    this.opened = true;
    this.flip(callback);
  }
  close() {
    if (this.opened) {
      this.opened = false;
      this.flip();
      this.cardText = '';
    }
  }
  flip(callback) {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: 'Linear',
      duration: 150,
      onComplete: () => {
        this.show(callback);
      }
    })
  }
  show(callback) {
    let texture = this.opened ? `card${this.valueRandom}` : 'card';
    this.setTexture(texture);

    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      ease: 'Linear',
      duration: 150,
      onComplete: () => {
        if (callback) {
          callback();
        }
      }
    })
  }
}