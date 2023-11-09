// game state - turns, players, etc...

const gameState = {
    playerCount: 2,
    turn: 0,
    gameOver: false,
  };
  // players object - keep track of player elements/hp
  
  const enemyDamage = document.getElementById('SFX_PlayerDamage');
  
  // keep track of player HTML elements
  const players = {
    one: {
      hitPointElement: document.getElementById('playerOneHealth'),
      button: document.getElementById('playerOneAttack'),
      sprite: document.getElementById('playerOneSprite'),
      frames: ['./images/R_Idle.png', './images/R_Attack.png'],
    },
    two: {
      hitPointElement: document.getElementById('playerTwoHealth'),
      button: document.getElementById('playerTwoAttack'),
      sprite: document.getElementById('playerTwoSprite'),
      frames: ['./images/L_Idle.png', './images/L_Attack.png'],
    },
  };
  
  // checks user hp is below zero
  function checkIfGameOver() {
    // get hitpoints
    const playerOneHp = +players.one.hitPointElement.innerText;
    const playerTwoHp = +players.two.hitPointElement.innerText;
    // check if hp has reached zero
    if (playerOneHp <= 0 || playerTwoHp <= 0) {
      window.alert('GAME OVER');
    }
  }
  // switch button clickability
  function changeUserTurn() {
    gameState.turn += 1;
    gameState.turn %= 2;
    if (gameState.turn === 0) {
      // player one turn
  
      // enable button 1
      players.one.button.disabled = true;
      players.one.button.classList.toggle('inactive');
      players.one.button.classList.toggle('active');
  
      // disable button 2
      players.two.button.disabled = false;
      players.two.button.classList.toggle('active');
      players.two.button.classList.toggle('inactive');
    } else {
      // player two turn
  
      // enable button 2
      players.two.button.disabled = true;
      players.two.button.classList.toggle('inactive');
      players.two.button.classList.toggle('active');
  
      // disable button one
      players.one.button.disabled = false;
      players.one.button.classList.toggle('active');
      players.one.button.classList.toggle('inactive');
    }
  }
  // handle player one attacking player two
  function attackPlayerOne() {
    // play audio
    enemyDamage.play();
    // attack animation
    players.one.sprite.src = players.one.frames[1];
    players.one.sprite.classList.toggle('attack');
    players.two.sprite.classList.toggle('damage');
    // reset animation
    function playerOneAnimation() {
      players.two.sprite.classList.toggle('damage');
      players.one.sprite.classList.toggle('idle');
  
      players.one.sprite.src = players.one.frames[0];
      players.one.sprite.classList.toggle('attack');
      players.one.sprite.classList.toggle('idle');
      checkIfGameOver();
    }
    setTimeout(playerOneAnimation, 350);
    players.two.hitPointElement.innerText -= 10;
    if (Number(players.two.hitPointElement.innerText) <= 0) {
      players.two.hitPointElement.innerText = 0;
    }
    changeUserTurn();
  }
  
  // handle player two attacking player one
  function attackPlayerTwo() {
    // audio play
    enemyDamage.play();
    // attack animation
    players.two.sprite.src = players.two.frames[1];
    players.two.sprite.classList.toggle('attack');
    players.one.sprite.classList.toggle('damage');
    // reset animation
    function playerTwoAnimation() {
      players.one.sprite.classList.toggle('damage');
      players.two.sprite.classList.toggle('idle');
  
      players.two.sprite.src = players.two.frames[0];
      players.two.sprite.classList.toggle('attack');
      players.two.sprite.classList.toggle('idle');
      checkIfGameOver();
    }
    setTimeout(playerTwoAnimation, 350);
    players.one.hitPointElement.innerText -= 10;
    if (Number(players.one.hitPointElement.innerText) <= 0) {
      players.one.hitPointElement.innerText = 0;
    }
  
    changeUserTurn();
  }
  
  document.body.classList.add('body-background');