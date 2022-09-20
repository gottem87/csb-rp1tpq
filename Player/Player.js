/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Player/costumes/costume1.svg", {
        x: 17.75,
        y: 17.75
      }),
      new Costume("costume2", "./Player/costumes/costume2.svg", {
        x: 12.75,
        y: 12.75
      }),
      new Costume("costume3", "./Player/costumes/costume3.svg", {
        x: 12.75,
        y: 12.75
      }),
      new Costume("costume4", "./Player/costumes/costume4.svg", {
        x: 12.75,
        y: 12.75
      }),
      new Costume("costume5", "./Player/costumes/costume5.svg", {
        x: 12.75,
        y: 12.75
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "end game" },
        this.whenIReceiveEndGame
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked5)
    ];

    this.vars.xv = 2.9751115546086646e-24;
    this.vars.yv = 0;
    this.vars.jumpPower = 9;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.vars.xv = 0;
    this.vars.yv = 0;
  }

  *tick() {
    if (this.keyPressed("d") || this.keyPressed("right arrow")) {
      this.vars.xv += 1;
    }
    if (this.keyPressed("left arrow") || this.keyPressed("a")) {
      this.vars.xv += -1;
    }
    this.x += this.vars.xv;
    this.vars.xv = this.vars.xv * 0.9;
    if (this.touching(Color.rgb(0, 0, 0))) {
      this.y += 1;
      if (this.touching(Color.rgb(0, 0, 0))) {
        this.y += 1;
        if (this.touching(Color.rgb(0, 0, 0))) {
          this.y += 1;
          if (this.touching(Color.rgb(0, 0, 0))) {
            this.y += 1;
            if (this.touching(Color.rgb(0, 0, 0))) {
              this.y += 1;
              if (this.touching(Color.rgb(0, 0, 0))) {
                this.x += this.vars.xv * -1;
                this.y += -5;
                if (this.keyPressed("up arrow") || this.keyPressed("w")) {
                  if (this.vars.xv > 0) {
                    this.vars.xv = -10;
                  } else {
                    this.vars.xv = this.vars.jumpPower * 2.6;
                  }
                  this.vars.yv = this.vars.jumpPower * 2.6;
                } else {
                  this.vars.xv = 0;
                }
              }
            }
          }
        }
      }
    }
    this.vars.yv += -1;
    this.y += this.vars.yv;
    if (this.touching(Color.rgb(0, 0, 0))) {
      this.y += this.vars.yv * -1;
      this.vars.yv = 0;
    }
    this.y += -1;
    if (
      (this.keyPressed("w") || this.keyPressed("up arrow")) &&
      this.touching(Color.rgb(0, 0, 0))
    ) {
      this.vars.yv = this.vars.jumpPower * 2.6;
    }
    this.y += 1;
    this.stage.vars.scollx += this.x * -1;
    this.stage.vars.scrolly += this.y * -1;
    this.goto(0, 0);
    if (this.touching(Color.rgb(255, 0, 0)) || this.stage.vars.scrolly > 1000) {
      this.stage.vars.scollx = 784;
      this.stage.vars.scrolly = 80;
    }
    if (this.touching(Color.rgb(16, 0, 255))) {
      this.broadcast("next level");
    }
  }

  *whenIReceiveTick() {
    yield* this.tick();
  }

  *whenGreenFlagClicked2() {
    this.watchers.jumpPower.visible = false;
  }

  *whenIReceiveEndGame() {
    this.visible = false;
    this.watchers.jumpPower.visible = false;
  }

  *whenGreenFlagClicked3() {
    this.visible = true;
    this.goto(0, 0);
    while (true) {
      this.broadcast("tick");
      yield;
    }
  }

  *whenGreenFlagClicked4() {
    while (true) {
      if (this.touching("mouse")) {
        yield* this.askAndWait("costume");
      }
      this.costume = this.answer;
      yield;
    }
  }

  *whenGreenFlagClicked5() {
    while (true) {
      if (this.keyPressed("x")) {
        this.costumeNumber += 1;
        while (!!this.keyPressed("x")) {
          yield;
        }
      }
      if (this.keyPressed("z")) {
        this.costume = this.costumeNumber - 1;
        while (!!this.keyPressed("z")) {
          yield;
        }
      }
      yield;
    }
  }
}
