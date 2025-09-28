import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';

let response = await fetch('/grid.json');
let gameField = await response.json();

(async () => {
  const app = new PIXI.Application();
  await app.init({
    view: document.getElementById('game'),
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000,
    resizeTo: window
  });

  // Вьюпорт для перетаскивания, зума и тп
  const viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    events: app.renderer.events
  });

  app.stage.addChild(viewport);

  viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate();

  // отступ от краев экрана
  const MARGIN = 80;
  // размеры гекса в пикселях
  const HEX_HEIGHT = 266;
  const HEX_WIDTH = 234;
  // отступ между гексами
  const SPACING  = 0;

  const texture = await PIXI.Assets.load('/hex.png');

  // Масштаб гекса (0.5 = 50% от оригинала)
  const scale = 0.5;

  // Расстояния центров для pointy-top
  const horizontalOffset = HEX_WIDTH * scale + SPACING;
  const verticalOffset  = HEX_HEIGHT * scale * 0.75 + SPACING; // один ряд занимает 0.75 высоты гекса

  gameField.forEach(cell => {
    const {x, y, tint} = cell;
    const xOffset = x * horizontalOffset + (y % 2 ? horizontalOffset / 2 : 0); // каждый второй ряд смещен на половину по горизонтали
    const yOffset = y * verticalOffset;

    const hex = new PIXI.Sprite(texture);

    if (tint !== undefined) {
      hex.tint = tint; // применяем цвет, если указан
    }

    hex.scale.set(scale);
    hex.stroke = 0xFF0000;

    hex.x = xOffset + MARGIN;
    hex.y = yOffset + MARGIN;
    hex.anchor.set(0.5); // размещаем гексы от их центра (не обязательно, можно и от угла)

    hex.eventMode = 'static';
    hex.cursor = 'pointer';

    // возвращаем координаты гекса при клике
    hex.on('pointerdown', () => {
      console.log(`clicked x= ${x}, y= ${y}`);
      hex.tint = 0xff7777;
    });

    viewport.addChild(hex);
  });

  viewport.fit();
  viewport.moveCenter(viewport.worldWidth / 2, viewport.worldHeight / 2);
  window.addEventListener('resize', () => {
    viewport.resize(window.innerWidth, window.innerHeight);
    viewport.fit();
    viewport.moveCenter(viewport.worldWidth / 2, viewport.worldHeight / 2);
  });

})();

