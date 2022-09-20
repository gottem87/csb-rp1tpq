/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Level extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("dot", "./Level/costumes/dot.svg", { x: 2.5, y: 2.5 }),
      new Costume("test level", "./Level/costumes/test level.svg", {
        x: 365.21027,
        y: 34.80552
      }),
      new Costume("test level2", "./Level/costumes/test level2.svg", {
        x: 229.21027,
        y: -15.179519999999997
      }),
      new Costume("test level6", "./Level/costumes/test level6.svg", {
        x: 228.46026,
        y: -15.17951999999994
      }),
      new Costume("test level3", "./Level/costumes/test level3.svg", {
        x: 241.21026999999987,
        y: -4.509129999999857
      }),
      new Costume("test level4", "./Level/costumes/test level4.svg", {
        x: 254.21027,
        y: -4.509129999999999
      }),
      new Costume("test level5", "./Level/costumes/test level5.svg", {
        x: 229.21026,
        y: -15.179519999999968
      }),
      new Costume("costume1", "./Level/costumes/costume1.svg", {
        x: 264.75,
        y: 53.253556333808774
      }),
      new Costume("costume2", "./Level/costumes/costume2.svg", {
        x: 264.75,
        y: 53.2535563338088
      }),
      new Costume("costume3", "./Level/costumes/costume3.svg", {
        x: 264.75,
        y: 53.253556333808746
      }),
      new Costume("costume4", "./Level/costumes/costume4.svg", {
        x: 264.75,
        y: 53.25355633380869
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "next level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "game start" },
        this.whenIReceiveGameStart
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.costume = "dot";
    this.goto(1000, 114);
    this.size = 400;
    this.costume = "test level";
    this.stage.vars.scollx = 1000;
    this.stage.vars.scrolly = 114;
    while (true) {
      this.goto(this.stage.vars.scollx, this.stage.vars.scrolly);
      yield;
    }
  }

  *whenIReceiveNextLevel() {
    this.costumeNumber += 1;
    this.stage.vars.scollx = 885;
    this.stage.vars.scrolly = 361;
    this.goto(885, 361);
  }

  *whenIReceiveGameStart() {
    while (true) {
      if (this.costumeNumber == 9) {
        this.broadcast("end game");
        this.visible = false;
        /* TODO: Implement stop other scripts in sprite */ null;
        return;
      }
      yield;
    }
  }
}
