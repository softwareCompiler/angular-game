
export class Container {
  restoreOnMove: any;
  getScore: any;


  constructor(config) {
    config.paint();

    this.restoreOnMove = () => {
      config.paint();
    };

  }

}

