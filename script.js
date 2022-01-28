const wordGrid = document.getElementById('wordGrid')
const keyboard = document.getElementById('keyboard')
const keys = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  'ENTER',
  'ERASE',
]
let typedWord = ''
let correctWord = 'crapy'
let checkedCorrect = false
let win = false

// Draw result grid
for (let i = 0; i < 5; i++) {
  const letterBox = document.createElement('div')
  letterBox.classList.add('letter-box')
  letterBox.id = i
  letterBox.innerText = ''

  wordGrid.appendChild(letterBox)
}

// Draw keyboard
keys.forEach(key => {
  const keyEl = document.createElement('div')
  keyEl.id = key
  keyEl.classList.add('key')
  keyEl.innerText = key
  keyEl.setAttribute('onclick', `keypress("${key}")`)

  if (key == 'ERASE') {
    keyEl.innerHTML = '<i class="fas fa-backspace"></i>'
    keyEl.classList.add('wide')
  }
  if (key == 'ENTER') {
    keyEl.classList.add('extra-wide')
  }

  keyboard.appendChild(keyEl)
})

// Triggers when key is pressed on the keyboard
function keypress(key) {
  if (key == 'ENTER') {
    enter()
    return
  }
  if (key == 'ERASE') {
    erase()
    return
  }

  typedWord = typedWord + key
  redrawLetters()
}

// Utilities
function enter() {
  if (checkedCorrect) return

  const letterBoxes = document.querySelectorAll('.letter-box')

  if (typedWord.length !== 5) return

  let splittedTypedWord = typedWord.split('')

  splittedTypedWord.forEach((w, i) => {
    if (correctWord.includes(w)) {
      letterBoxes[i].className = 'letter-box notrightspot'

      if (correctWord[i] === w) {
        letterBoxes[i].className = 'letter-box correct'
      }
    } else {
      letterBoxes[i].className = 'letter-box wrong'
    }
  })

  checkedCorrect = true
  if (typedWord == correctWord) {
    win = true
  } else {
    win = false
  }

  checkWin()
}

function erase() {
  if (checkedCorrect) return
  let letterBoxes = document.querySelectorAll('.letter-box')
  let filteredBoxes = []

  letterBoxes.forEach(box => {
    if (box.innerText === '') return
    filteredBoxes.push(box)
  })

  filteredBoxes.at(-1).innerText = ''
  filteredBoxes.at(-1).className = 'letter-box'

  let updatedTypedWord = typedWord.split('')
  updatedTypedWord[updatedTypedWord.length - 1] = ''

  typedWord = updatedTypedWord.join('')
}

function redrawLetters() {
  const splittedWord = typedWord.split('')
  splittedWord.forEach((w, i) => {
    const letterBoxes = document.querySelectorAll('.letter-box')
    if (i == 6) return

    letterBoxes[i].innerText = w
    letterBoxes[i].classList.add('typed')
  })
}

function checkWin() {
  if (win) {
    document.querySelector('.modal-wrapper').classList.add('show')
  } else {
    document.querySelector('.modal-wrapper').classList.remove('show')
  }
}

// Replay event
document.querySelector('#replay').addEventListener('click', () => {
  window.location.reload()
})
