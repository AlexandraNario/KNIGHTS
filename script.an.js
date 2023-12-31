// these values are set at the beginning
// and then used throughout the game
let gameState = {
    players: 2,
    whoseTurn: 1,
    gameOver: false
}
//class list for background image that is defined in CSS
document.body.classList.add("body-background");

//function that tracks whose turn it is and have that reflect on the 'Attack' button
//the button of the player whose turn it it should be grey 
//the button of the player being attacked should be red (or not grey)
//button should switch in appearance after each players turn (most likely use toggle here)

function changePlayer() {
    // if the current player is player 1 at the end of a move
    if (gameState.whoseTurn === 1) {
        let playerTwoHealth = document.getElementById("playerTwoHealth");
        // conversts the innerHTML from string to a number and stores it in a variable
        let playerTwoHealthNum = Number(playerTwoHealth.innerHTML);
        // reduces by 10
        playerTwoHealthNum -= 10;
        // resets the HTML to the new value
        playerTwoHealth.innerHTML = playerTwoHealthNum;

        // checks if the player has reached 0 health
        if (playerTwoHealthNum <= 0) {
            // ensures health does not dig into the negative
            playerTwoHealth = 0;
            // ends the game
            gameOver();
        }
        else {
            // switch to the next player and change the UI's display / behavior
            gameState.whoseTurn = 2;

            // grabs the 'playerName' element and changes the player's turn display
            let playerName = document.getElementById("playerName");
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
     }
    else { //added an else block to handle the case when the second player attacks
        //to ge the health element of the first player
        let playerOneHealth = document.getElementById("playerOneHealth");
        //get the number value of health 
        let playerOneHealthNum = Number(playerOneHealth.innerHTML); 
        //reduces by 10
        playerOneHealthNum -= 10; 
      // update the health element to a new value
        playerOneHealth.innerHTML = playerOneHealthNum; 

        //check if the player has reached zero health
        if (playerOneHealthNum <= 0) {
            //ensure health doesn't go into the negatives
            playerOneHealth = 0;
            //end the game
            gameOver();
        }
        else {
            //switch the turn to first player
      gameState.whoseTurn = 1;
        // gets the name element of the current player and changes the players turn display
      let playerName = document.getElementById("playerName"); 
      playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
    }
}


// if a player's health reaches 0 at the end of a turn, the game ends
// and the winner is announced
function gameOver() {
    let title = document.getElementById("title");
    title.style = "display: none;";
    let playerTurnDisplay = document.getElementById("playerTurn");
    playerTurnDisplay.style = "display: none;";

    let winningPlayer = document.getElementById("winningPlayer");
    winningPlayer.innerHTML = `Player ${gameState.whoseTurn} wins!`

    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style = "display: flex; flex-direction: column;";
}

// function that allows the player two attack button to reduce the player two's
// health
function attackPlayerTwo() {
    // compartmentalized function that will switch the player 2 attack button to inactive
    // and player 1 attack button to active using DOM manipulation
    // this also DISABLES the button, meaning they are not interactable
    function changeButtonStatus() {
        let playerTwoAttackButton = document.getElementById("playerTwoAttack");
        //playerTwoAttackButton.disabled = true;
        //playerTwoAttackButton.classList.add("inactive");
       // playerTwoAttackButton.classList.remove("active");
       //going to remove these lines and test how to toggle the inactive class on the button
       playerTwoAttackButton.classList.toggle("inactive")


        let playerOneAttackButton = document.getElementById("playerOneAttack");
        //playerOneAttackButton.disabled = false;
       // playerOneAttackButton.classList.add("active");
        //playerOneAttackButton.classList.remove("inactive");
        //removing this lines and added a line to toggle the inactive class 
        playerOneAttackButton.classList.toggle("inactive");
    
    }

    // commpartmentalized function that changes the player 1's sprite using the array
    // containing multiple images
    function animatePlayer() {
        // an array containing the images using in player one's animation
        // the indices are later used to cycle / "animate" when the player attacks
        let playerOneFrames = [
            "./images/R_Idle.png",
            "./images/R_Attack.png"
        ];

        let playerSprite = document.getElementById("playerOneSprite");
        // function we will call in setTimeout, before the frames change back
        // the idle stance
        // in other words, we set to the attack sprite, wait 3 seconds,
        // then set it back to the idle sprite
        playerSprite.src = playerOneFrames[1];
        
        // removes the 'idle' class from the player sprite
        playerSprite.classList.remove("idle");
        // adds the 'attack' class to the player sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        playerSprite.classList.add("attack");

        // grabs the enemy sprite
        let enemySprite = document.getElementById("playerTwoSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        // removes the 'idle' class from the enemy sprite
        enemySprite.classList.remove("idle");
        // adds the 'attack' class to the enemy sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        enemySprite.classList.add("damage");
        // sound that plays when enemy takes damage
        enemyDamage.play();

        // the function we will call in the setTimeOut method below
        // after 350 milliseconds
        // this function will execute this block of code
        function changePlayerOneSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerOneFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }

        setTimeout(changePlayerOneSprite, 350);
    }

    // for easy reading,
    // we do not include ALL of the above code within this condition
    // instead, we create higher-order functions to keep the code neat and readable
    if (gameState.whoseTurn === 1) {
        animatePlayer();
        changeButtonStatus();
        changePlayer();
    }
}

function attackPlayerOne() {
    if (gameState.whoseTurn === 2) {
        let playerOneHealth = document.getElementById("playerOneHealth");
        let playerOneHealthNum = Number(playerOneHealth.innerHTML);
        playerOneHealthNum -= 10;
        playerOneHealth.innerHTML = playerOneHealthNum;

        if (playerOneHealthNum <= 0) {
            playerOneHealth.innerHTML = 0;
            gameOver();
        } else {
            changePlayer();
        }
    }
}