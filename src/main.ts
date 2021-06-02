import { Loader } from "@pixi/loaders";
import { Application, Container, Resource, settings, SCALE_MODES, Sprite, Ticker, BitmapText, Texture } from "pixi.js";
import { Key } from "./util/keyboard";
import { Adaptive } from "./util/viewport";

type TextureResource = Resource & { texture: Texture };

const WIDTH = 320;
const HEIGHT = 240;

settings.RESOLUTION = Math.floor(window.devicePixelRatio);
settings.SCALE_MODE = SCALE_MODES.NEAREST;

const app = new Application({width: WIDTH, height: HEIGHT });
app.view.style.imageRendering = "pixelated";
Adaptive.window(app.view);

Loader.shared.add("titil_logo.png", "assets/titil_logo_x8_white.png");
Loader.shared.add('TinyUnicode', 'assets/font/TinyUnicode.fnt');

export function main(): Promise<Application> {
  document.body.appendChild(app.view);

  Key.get("F").press(() => {
    if (document.fullscreenElement === null) {
      app.view.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  })

  return new Promise<Application>((resolve, _reject) => {
    Loader.shared.load((_loader: Loader, resources: {[index: string]: Resource}) => {
      setup(resources);
      resolve(app);
    });
  });
}

export function setup(resources: {[index: string] : Resource}): Container {
  const stage = new Container();

  const resource = resources["titil_logo.png"] as TextureResource;
  const logoSprite = Sprite.from(resource.texture);
  logoSprite.position.set(WIDTH / 2, HEIGHT / 2);
  logoSprite.anchor.set(0.5, 0.5);
  stage.addChild(logoSprite);

  const text = new BitmapText("PixiJS TypeScript Starter by", {
    fontName: "TinyUnicode",
    align: "center"
  });
  text.position.set(WIDTH / 2, HEIGHT / 2 - logoSprite.height / 2 - 5);
  text.anchor.set(0.5)
  stage.addChild(text)

  Ticker.shared.add(() => app.renderer.render(stage));

  return stage;
}
