let userScore= 0;
let comScore= 0;
const winningScore = 10;

const choices= document.querySelectorAll(".choice");
const msg= document.querySelector(".msg");
const userPoint= document.querySelector("#userPoint");
const comPoint= document.querySelector("#comPoint");

choices.forEach( (choice) => {
    choice.addEventListener("click", ()=> {
        if (userScore < winningScore && comScore < winningScore) {
            const userChoice = choice.getAttribute("id");
            playGame(userChoice);
        }
    })
})

const playGame= (userChoice) => {
    console.log(`User clicked ${userChoice}`);
    const comChoice= generateChoice();
    console.log(`Computer clicked ${comChoice}`)

    if(userChoice===comChoice){
        draw(userChoice);
    } else{
        let userWin= true;
        if(userChoice=== 'rock'){
            userWin= comChoice === 'paper'? false:true;
        }
        else if(userChoice=== 'paper'){
            userWin= comChoice === 'scissors'? false:true;
        }else if(userChoice=== 'scissors'){
            userWin= comChoice === 'rock'? false:true;
        }
        showWinner(userWin, userChoice, comChoice);
    }

    if (userScore === winningScore || comScore === winningScore) {
        displayFinalWinner();
    }
}

const generateChoice= () => {
    const option=['rock', 'paper', 'scissors'];
    const genID= Math.floor(Math.random()*3);
    return option[genID];
}

const draw= (userChoice) =>{
    console.log("It's a draw");
    msg.innerText= `It's a draw; \n You and Computer both used ${userChoice}`;
    msg.style.backgroundColor="#384E77";
} 

const showWinner= (userWin, userChoice, comChoice) => {
    if(userWin){
        userScore++;
        userPoint.innerText= userScore;
        console.log("You win");
        msg.innerText= `You won;\nYour ${userChoice} beat Computer's ${comChoice}`;
        msg.style.backgroundColor="green";
    }else{
        comScore++;
        comPoint.innerText= comScore;
        console.log("Computer win");
        msg.innerText= `Computer won;\nComputer's ${comChoice} beat your ${userChoice}`;
        msg.style.backgroundColor="red";
    }
}

const displayFinalWinner = () => {
    if (userScore === winningScore) {
        msg.innerHTML = `<p> 
        <i style="font-size: 1.5rem;"> Congrats! You are the final winner! 🎉</i>
        <br>
        <b> Final Score: You (${userScore}) - Computer (${comScore}) </b>
        <br><br>
        Click here to restart the game👆 </p>`;
        msg.style.backgroundColor = "green";
    } else if (comScore === winningScore) {
        msg.innerHTML = `<p>
        <i style="font-size: 1.5rem;">Bad luck! Computer is the final winner!👎 </i>
        <br>
        <b>Final Score: Computer (${comScore}) - You (${userScore}) </b>
        <br><br>
        Click here to restart the game👆 </p>`;
        msg.style.backgroundColor = "red";
    }

    msg.addEventListener("click", restartGame);
}

const restartGame = () => {
    userScore = 0;
    comScore = 0;
    userPoint.innerText = userScore;
    comPoint.innerText = comScore;
    msg.innerText = "Game restarted! Pick an option to play.";
    msg.style.backgroundColor = "#384E77";
    msg.removeEventListener("click", restartGame);
};