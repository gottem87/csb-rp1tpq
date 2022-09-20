import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Level from "./Level/Level.js";
import Player from "./Player/Player.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Level: new Level({
    x: 396.3540364448028,
    y: 392.0000000000001,
    direction: 90,
    costumeNumber: 5,
    size: 400,
    visible: true,
    layerOrder: 2
  }),
  Player: new Player({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 5,
    size: 100,
    visible: true,
    layerOrder: 1
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
