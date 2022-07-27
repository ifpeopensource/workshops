import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';

// https://kaboomjs.com/

// Inicializa a biblioteca kaboom
kaboom({
  width: window.innerWidth - 4,
  height: window.innerHeight - 4,
  background: [150, 150, 255],
});

// Carrega sprite do IFOS
loadSprite('ifos', './assets/sprites/ifos.png');

scene('game', () => {
  // TODO: Game
});

scene('game_over', (score) => {
  const gameOverMsg = add([
    text('Game over!\n' + score),
    origin('center'),
    pos(center()),
    area(),
  ]);

  add([
    'tryAgain',
    rect(100, 60),
    outline(4),
    text('Try again'),
    origin('center'),
    pos(gameOverMsg.pos.x, gameOverMsg.pos.y + gameOverMsg.height + 20),
    area(),
  ]);

  onClick('tryAgain', () => {
    go('game');
  });
});

scene('menu', () => {
  add([
    'startButton',
    rect(100, 60),
    outline(4),
    text('Start'),
    origin('center'),
    pos(center()),
    area(),
  ]);

  onClick('startButton', () => {
    go('game');
  });
});

go('menu');
