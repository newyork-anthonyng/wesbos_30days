const instruments = {
  65: {
    audio: "./sounds/clap.wav",
    key: "A",
    description: "Clap"
  },
  83: {
    audio: "./sounds/hihat.wav",
    key: "S",
    description: "HiHat"
  },
  68: {
    audio: "./sounds/kick.wav",
    key: "D",
    description: "Kick"
  },
  70: {
    audio: "./sounds/openhat.wav",
    key: "F",
    description: "OpenHat"
  },
  71: {
    audio: "./sounds/boom.wav",
    key: "G",
    description: "Boom"
  },
  72: {
    audio: "./sounds/ride.wav",
    key: "H",
    description: "Ride"
  },
  74: {
    audio: "./sounds/snare.wav",
    key: "J",
    description: "Snare"
  },
  75: {
    audio: "./sounds/tom.wav",
    key: "K",
    description: "Tom"
  },
  76: {
    audio: "./sounds/tink.wav",
    key: "L",
    description: "Tink"
  }
};

function init() {
  // Initialize all nodes
  const fragment = document.createDocumentFragment();
  const keys = Object.keys(instruments);
  const template = document.getElementById("instrument-template");

  keys.forEach(key => {
    const clone = document.importNode(template.content, true);
    const containerNode = clone.querySelector(".instrument");
    containerNode.setAttribute("data-key", key);

    const keyNode = clone.querySelector(".instrument--key");
    keyNode.textContent = instruments[key].key;

    const descriptionNode = clone.querySelector(".instrument--description");
    descriptionNode.textContent = instruments[key].description;

    fragment.appendChild(clone);
  });

  document.querySelector("main").appendChild(fragment);
  const instrumentNodes = Array.prototype.slice.call(
    document.querySelectorAll(".instrument")
  );
  instrumentNodes.forEach(node => {
    instruments[node.getAttribute("data-key")].node = node;

    node.addEventListener("transitionend", function(e) {
      node.classList.remove("instrument__playing");
    });

    node.addEventListener("click", function() {
      const clicked = this.getAttribute("data-key");
      const audio = new Audio(instruments[clicked].audio);
      audio.play();

      this.classList.add("instrument__playing");
    });

    const ENTER_KEY = 13;
    const SPACE_KEY = 32;
    node.addEventListener("keypress", function(e) {
      if (e.which === ENTER_KEY || e.which === SPACE_KEY) {
        e.preventDefault();

        const clicked = this.getAttribute("data-key");
        const audio = new Audio(instruments[clicked].audio);
        audio.play();
  
        this.classList.add("instrument__playing");
      }
    });
  });

  document.addEventListener("keydown", e => {
    if (keys.indexOf(`${e.which}`) === -1) {
      return;
    }

    // Play audio
    const audio = new Audio(instruments[e.which].audio);
    audio.play();

    // Animate button
    const currentNode = instruments[e.which].node;
    currentNode.classList.add("instrument__playing");
  });
}

init();