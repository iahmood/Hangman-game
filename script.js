const wordListElement = document.querySelector('.word-list')
const incorrectLabel = document.querySelector('.incorrect-label b')
const keyboardContainer = document.querySelector('.keyboard-container')
const hangmanImageElement = document.querySelector('.image-box img')
const modal = document.querySelector('.modal')
const restartButton = modal.querySelector('button')

const wordList = [
  {
    word: 'jungle',
    hint: 'A dense forest in a tropical region.'
  },
  {
    word: 'compass',
    hint: 'A tool used for navigation, showing directions.'
  },
  {
    word: 'island',
    hint: 'A piece of land surrounded by water.'
  },
  {
    word: 'pyramid',
    hint: 'A monumental structure with a square base and triangular sides.'
  },
  {
    word: 'library',
    hint: 'A place where books are stored and available for reading.'
  },
  {
    word: 'volcano',
    hint: 'A mountain with a crater that can erupt with lava.'
  },
  {
    word: 'bridge',
    hint: 'A structure built to span physical obstacles, like a river.'
  },
  {
    word: 'tunnel',
    hint: 'An underground or underwater passage.'
  },
  {
    word: 'ocean',
    hint: 'A large body of salt water covering most of the Earth.'
  },
  {
    word: 'desert',
    hint: 'A barren area of landscape where little precipitation occurs.'
  },
  {
    word: 'museum',
    hint: 'A building where historical, scientific, or artistic objects are kept.'
  },
  {
    word: 'diamond',
    hint: 'A precious gemstone known for its hardness and brilliance.'
  },
  {
    word: 'glacier',
    hint: 'A slow-moving mass of ice formed by accumulated snow.'
  },
  {
    word: 'harbor',
    hint: 'A sheltered body of water where ships dock.'
  },
  {
    word: 'planet',
    hint: 'A celestial body orbiting a star, such as Earth.'
  },
  {
    word: 'factory',
    hint: 'A large building where goods are manufactured.'
  },
  {
    word: 'calendar',
    hint: 'A system of organizing days, weeks, and months.'
  },
  {
    word: 'electricity',
    hint: 'A form of energy resulting from the existence of charged particles.'
  },
  {
    word: 'bacteria',
    hint: 'Microscopic organisms that can be found in various environments.'
  },
  {
    word: 'aviation',
    hint: 'The design, development, and operation of aircraft.'
  },
  {
    word: 'oxygen',
    hint: 'A gas essential for breathing and combustion.'
  },
  {
    word: 'gravity',
    hint: 'The force that attracts objects toward the center of the Earth.'
  },
  {
    word: 'satellite',
    hint: 'An artificial body placed in orbit around a planet.'
  },
  {
    word: 'submarine',
    hint: 'A watercraft capable of underwater operation.'
  },
  {
    word: 'galaxy',
    hint: 'A system of stars, gas, and dust held together by gravity.'
  },
  {
    word: 'asteroid',
    hint: 'A small rocky body orbiting the sun.'
  },
  {
    word: 'horizon',
    hint: 'The line where the earths surface and the sky seem to meet.'
  },
  {
    word: 'hurricane',
    hint: 'A tropical storm with strong winds and heavy rain.'
  },
  {
    word: 'avalanche',
    hint: 'A mass of snow, ice, and rocks falling down a mountainside.'
  },
  {
    word: 'labyrinth',
    hint: 'A complicated irregular network of passages or paths; a maze.'
  },
  {
    word: 'mirage',
    hint: 'An optical illusion caused by atmospheric conditions.'
  },
  {
    word: 'tsunami',
    hint: 'A large ocean wave caused by an underwater earthquake.'
  },
  {
    word: 'oxygen',
    hint: 'A gas necessary for most living organisms to breathe.'
  },
  {
    word: 'compass',
    hint: 'An instrument used for navigation and orientation.'
  },
  {
    word: 'fossil',
    hint: 'Preserved remains or impression of a prehistoric organism.'
  },
  {
    word: 'quicksand',
    hint: 'A loose, wet sand that yields easily to pressure and can trap objects.'
  },
  {
    word: 'geyser',
    hint: 'A spring that throws jets of hot water and steam into the air.'
  },
  {
    word: 'stalactite',
    hint: 'A tapering structure hanging from the ceiling of a cave.'
  },
  {
    word: 'stalagmite',
    hint: 'A mound or column rising from the floor of a cave, formed by dripping water.'
  },
  {
    word: 'crystal',
    hint: 'A solid material whose atoms are arranged in a highly ordered structure.'
  },
  {
    word: 'refraction',
    hint: 'The bending of light as it passes from one medium to another.'
  },
  {
    word: 'fusion',
    hint: 'The process of combining two or more things into one.'
  },
  {
    word: 'vacuum',
    hint: 'A space entirely devoid of matter.'
  },
  {
    word: 'momentum',
    hint: 'The quantity of motion of a moving body.'
  },
  {
    word: 'voltage',
    hint: 'An electric potential difference between two points.'
  },
  {
    word: 'resonance',
    hint: 'The reinforcement of sound by reflection or by synchronous vibration.'
  },
  {
    word: 'eclipse',
    hint: 'An event where one celestial body moves into the shadow of another.'
  }
]

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount
const maxGuesses = 6

const render = () => {
  hangmanImageElement.src = `images/HANGMAN-${wrongGuessCount}.png`
  incorrectLabel.textContent = `${wrongGuessCount} / ${maxGuesses}`

  wordListElement.textContent = ''
  currentWord.split('').forEach((letter) => {
    const letterElement = document.createElement('li')
    letterElement.classList.add('letter')
    if (correctLetters.includes(letter)) {
      letterElement.textContent = letter
      letterElement.classList.add('guessed')
    }
    wordListElement.appendChild(letterElement)
  })
}

const resetGame = () => {
  correctLetters = []
  wrongGuessCount = 0

  keyboardContainer.querySelectorAll('button').forEach((btn) => {
    btn.disabled = false
  })

  modal.classList.remove('show')
  render()
}

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
  currentWord = word

  document.querySelector('.hint-label b').textContent = hint
  resetGame()
}

const gameOver = (isVictory) => {
  let modalText
  if (isVictory) {
    modalText = 'You found the word:'
  } else {
    modalText = 'The correct word was:'
  }

  const modalParagraph = modal.querySelector('p')
  modalParagraph.textContent = modalText
  const boldWord = document.createElement('b')
  boldWord.textContent = currentWord
  modalParagraph.appendChild(boldWord)

  let imagePath
  if (isVictory) {
    imagePath = 'images/Happy.webp'
  } else {
    imagePath = 'images/sad.webp'
  }
  modal.querySelector('img').src = imagePath

  let headerText
  if (isVictory) {
    headerText = 'Congrats!'
  } else {
    headerText = 'Game Over!'
  }
  modal.querySelector('h4').textContent = headerText
  modal.classList.add('show')
}

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    currentWord.split('').forEach((letter) => {
      if (letter === clickedLetter && !correctLetters.includes(letter)) {
        correctLetters.push(letter)
      }
    })
  } else {
    wrongGuessCount++
  }

  button.disabled = true
  render()

  if (wrongGuessCount === maxGuesses) return gameOver(false)
  if (correctLetters.length === currentWord.length) return gameOver(true)
}

for (let i = 97; i <= 122; i++) {
  const button = document.createElement('button')
  button.textContent = String.fromCharCode(i)
  keyboardContainer.appendChild(button)
  button.addEventListener('click', (e) =>
    initGame(e.target, String.fromCharCode(i))
  )
}

getRandomWord()
restartButton.addEventListener('click', getRandomWord)
