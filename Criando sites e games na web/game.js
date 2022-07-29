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
  // Cria o chão
  // rect(): Cria um retângulo
  // outline(): Desenha um contorno
  // color(): Define a cor do fundo
  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(2),
    area(),
    solid(),
    color(127, 200, 255),
  ]);

  // Cria um jogador
  // add() : adiciona um novo elemento no jogo
  //  sprite(): define o sprite do elemento
  //  pos(): define a posição do elemento
  //  area(): define que o elemento possui uma caixa de colisão, ou seja, possui área
  //  body(): torna o elemento um corpo físico, fazendo ele sofrer efeitos da gravidade
  const player = add([sprite('ifos'), pos(50, 400), area(), body()]);

  function playerJump() {
    // Apenas pula se o jogador estiver no chão
    if (player.isGrounded()) {
      player.jump(800);
    } else {
      player.doubleJump();
    }
  }

  // Executa a função de pulo quando o jogador pressiona a barra de espaço, "w", seta pra cima ou clica na tela
  onKeyPress('space', playerJump);
  onKeyPress('w', playerJump);
  onKeyPress('up', playerJump);
  onClick(playerJump);

  /**
   * OBSTÁCULOS
   */

  function spawnObstacles() {
    // Cria um obstáculo
    //  origin(): define a origem do sprite
    //    "botleft" -> bottom left = baixo e à esquerda
    //  move(direção, velocidade): define o movimento do sprite
    //    "LEFT" -> move para a esquerda infinitamente
    //  cleanup(): define que o sprite será removido da cena quando sair da tela
    add([
      rect(48, rand(32, 96)),
      area(),
      solid(),
      outline(4),
      pos(width(), height() - 48),
      origin('botleft'),
      color(255, 180, 255),
      move(LEFT, 240),
      cleanup(),
      'obstacle',
    ]);

    wait(rand(1, 2), spawnObstacles);
  }

  spawnObstacles();

  // Cria placar
  let score = 0;
  const scoreLabel = add([text(score), pos(24, 24)]);

  // Adiciona um ponto em cada frame do jogo
  onUpdate(() => {
    score++;
    scoreLabel.text = score;
  });

  // Executa a função quando o jogador colidir com algo que possui a tag "obstacle"
  player.onCollide('obstacle', () => {
    burp(); // Toca o som de burp
    addKaboom(player.pos); // Adiciona um efeito de explosão ao jogador
    shake(); // Treme a tela
    player.destroy(); // Destrói o jogador
    wait(1, () => {
      go('game_over', score); // Vai para a cena de game over após 1 segundo
    });
  });
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
