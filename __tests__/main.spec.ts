import { mocked } from "ts-jest/utils";
import { BaseTexture, Resource, Texture } from "@pixi/core";
import { Loader } from "@pixi/loaders";
import { setup } from "../src/main";
import { BitmapText, Text } from "pixi.js";

jest.mock('pixi.js', () => {
  return {
    ...jest.requireActual("pixi.js"),
    BitmapText: jest.fn().mockImplementation(() => {
      return new Text("mocked text");
    })
  };
});

beforeEach(() => {
  const mockBitmapText = mocked(BitmapText, true);
  mockBitmapText.mockClear();
});

describe("stage", () => {
  test("setup", () => {
    const resourceMock = jest.fn().mockImplementation(() => {
      const baseTexture = new BaseTexture();
      baseTexture.setSize(1024, 1024);
      return {
        texture: new Texture(baseTexture)
      };
    });
    const resources: {[index: string]: Resource} = {};
    for (const res in Loader.shared.resources) {
      resources[res] = new resourceMock();
    }
    const stage = setup(resources);
    expect(stage.children.length).toBe(2);
  }); 
});
