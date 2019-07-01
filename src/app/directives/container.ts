export class Container {
  restoreOnMove: any;

  constructor(config) {
    config.paint();
    this.restoreOnMove = config.paint;
  }
}

