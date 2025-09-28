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

  // Add viewport
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

  const texture = await PIXI.Assets.load('/hex.png'); // <-- ваш PNG

  const scale = 0.5;
  console.log(scale);

  // Расстояния центров для pointy-top
  const horizontalOffset = HEX_WIDTH * scale + SPACING;
  const verticalOffset  = HEX_HEIGHT * scale * 0.75 + SPACING; // один ряд занимает 0.75 высоты гекса
  console.log('horizontal offset', horizontalOffset);
  console.log('vertical offset', verticalOffset);

  console.log(gameField);
  gameField.forEach(cell => {
    const {x, y, tint} = cell;
    const xOffset = x * horizontalOffset + (y % 2 ? horizontalOffset / 2 : 0); // каждый второй ряд смещен на половину
    const yOffset = y * verticalOffset;

    const hex = new PIXI.Sprite(texture);

    if (tint !== undefined) {
      hex.tint = tint; // применяем цвет, если указан
    }

    hex.scale.set(scale);
    hex.stroke = 0xFF0000;

    hex.x = xOffset + MARGIN;
    hex.y = yOffset + MARGIN;
    hex.anchor.set(0.5); // центрируем по координатам
    console.log('x',hex.x);
    console.log('y',hex.y);

    hex.eventMode = 'static';
    hex.cursor = 'pointer';

    // пример: при клике меняем оттенок
    hex.on('pointerdown', () => {
      console.log(`clicked y= ${y}, x= ${x}`);
      hex.tint = 0xff7777; // можно сбросить hex.tint = 0xFFFFFF;
    });

    // Change to viewport
    viewport.addChild(hex);
  });

  // After the loop, fit and center
  viewport.fit();
  viewport.moveCenter(viewport.worldWidth / 2, viewport.worldHeight / 2);

  // Handle resize
  window.addEventListener('resize', () => {
    viewport.resize(window.innerWidth, window.innerHeight);
    viewport.fit();
    viewport.moveCenter(viewport.worldWidth / 2, viewport.worldHeight / 2);
  });

})();

