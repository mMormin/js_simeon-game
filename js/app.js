/**
 *
 * Code fourni
 */
const app = {
  goButton: document.getElementById("go"),
  playground: document.getElementById("playground"),
  messageDiv: document.getElementById("message"),
  // just a utility var to remember all the colors
  colors: ["red", "green", "blue", "yellow"],

  // this var will contain the sequence said by Simon
  sequence: [],

  indice: 0,

  score: 0,

  drawCells: function () {
    for (const color of app.colors) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.id = color;
      cell.style.backgroundColor = color;
      app.playground.appendChild(cell);
      cell.addEventListener("click", app.hundleColorClick);
      cell.addEventListener("click", app.hundleColorClick);
    }
  },

  bumpCell: function (color) {
    // let's modify the syle directly
    document.getElementById(color).style.borderWidth = "45px";
    // and reset the same style, after a small pause (150 ms)
    setTimeout(() => {
      document.getElementById(color).style.borderWidth = "0";
    }, 150);
  },

  newGame: function () {
    app.messageDiv.classList.add("show");
    app.messageDiv.classList.remove("hide");
    app.goButton.classList.add("hide");
    app.goButton.classList.remove("show");
    // start by reseting the sequence
    app.sequence = [];
    // make it 3 times :
    for (let index = 0; index < 3; index++) {
      // get a random number between 0 and 3
      let random = Math.floor(Math.random() * 4);
      // add the corresponding color to the sequence
      app.sequence.push(app.colors[random]);
    }

    // start the "Simon Says" sequence
    app.togglePlayerTurn();
    app.simonSays(app.sequence);

  },

  togglePlayerTurn: function () {
    if (app.playground.classList.contains("answer")) {
      app.playground.classList.add("wait");
      app.playground.classList.remove("answer");
    } else if (app.playground.classList.contains("wait")) {
      app.playground.classList.add("answer");
      app.playground.classList.remove("wait");
    }
  },

  simonSays: function (sequence) {
    app.showMessage("Simon says ...");

    if (sequence && sequence.length) {
      // after 1000ms, bump the first cell
      setTimeout(app.bumpCell, 1000, sequence[0]);
      // plays the rest of the sequence after a longer pause
      setTimeout(app.simonSays, 600, sequence.slice(1));
    } else {
      setTimeout(() => {
        app.showMessage("You say ...");
        app.togglePlayerTurn();
      }, 1000);
    }
  },

  hundleColorClick: function (e) {
    e.preventDefault();
    app.bumpCell(e.target.id);
    if (e.target.id === app.sequence[app.indice]) {
      app.indice++;
      if (app.sequence.length === app.indice) {
        app.nextMove();
        app.indice = 0;
        app.score++;
      }
    } else {
      app.gameOver();
      app.indice = 0;
    }
  },

  nextMove: function () {
    let random = Math.floor(Math.random() * 4);
    app.sequence.push(app.colors[random]);
    app.togglePlayerTurn();
    app.simonSays(app.sequence);
  },

  gameOver: function () {
    alert("Partie terminée. Votre score est : " + app.score + " !");
    app.messageDiv.classList.add("hide");
    app.messageDiv.classList.remove("show");
    app.goButton.classList.add("show");
    app.goButton.classList.remove("hide");
    app.sequence = [];
  },

  init: function () {
    console.log("init");
    app.drawCells();

    // listen click on the "go" button
    app.goButton.addEventListener("click", app.newGame);
  },

  /** Fin du code fourni. Après, c'est à toi de jouer! */

  showMessage: function (message) {
    document.getElementById("message").innerHTML = message;
  },
};

document.addEventListener("'domContentLoaded'", app.init());
