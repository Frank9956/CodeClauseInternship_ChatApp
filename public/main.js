window.addEventListener('load', () => {

  setTimeout(() => {
    const loadingContainer = document.getElementById('loadingContainer');
    const mainContent = document.getElementById('login-page');

    loadingContainer.style.display = 'none';
    mainContent.style.display = 'flex';
  }, 500);
});


const socket = io()

const userNumber = document.getElementById('user-number')
const chatContainer = document.getElementById('chat-container')
const messageForm = document.getElementById('messageForm')
const nameInput = document.getElementById('nameInput')
const userInput = document.getElementById('userInput')
const message = document.getElementById('messageInput')

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  sendMessage()
})

function sendMessage() {

  if (message.value === '') return
  console.log(message.value)

  const data = {
    name: nameInput.value,
    message: message.value,
    dateTime: new Date(),
  }

  socket.emit('message', data)
  addMessage(true, data)
  message.value = ''

}


socket.on('chat-message', (data) => {
  addMessage(false, data)
})

socket.on('user-Number', (data) => {
  userNumber.innerText = `Total Active Session(s): ${data}`
})


function addMessage(sendermessage, data) {
  clearfeedback()
  const element = `
  <div class="${sendermessage ? 'chatSend' : 'chatRecive'}" id="chatmessage">
  <p id="messages"> ${data.message}
  <span>${data.name}</span>
  </p>
  
  </div>`
  chatContainer.innerHTML += element

  scrollbottom()
}

function scrollbottom() {
  chatContainer.scrollTo(0, chatContainer.scrollHeight)
}

message.addEventListener('focus', (e) => {
  socket.emit('feedback', {
    feedback: `${nameInput.value} is typing a message`,
  })
})
message.addEventListener('keypress', (e) => {
  socket.emit('feedback', {
    feedback: `${nameInput.value} is typing a message`,
  })
})
message.addEventListener('blur', (e) => {
  socket.emit('feedback', {
    feedback: '',
  })
})

socket.on('feedback', (data) => {
  clearfeedback()
  const element = `
  <li class= "message-feedback">
  <p class = "feedback" id= "feedback">${data.feedback}</p>
  </li>
  `
  userInput.innerHTML += element

})

function clearfeedback() {
  document.querySelectorAll('li.message-feedback').forEach(element => {
    element.parentNode.removeChild(element)
  })
}


const loginForm = document.getElementById('login-page');
const userNameInput = document.getElementById('userNameInput');
const logoutForm = document.getElementById('chat-page');


function login() {

  if (userNameInput.value === '') return
  if (nameInput.value === '') return
  loginForm.style.display = 'none';
  logoutForm.style.display = 'flex';

}


function logout() {

  loginForm.style.display = 'flex';
  logoutForm.style.display = 'none';
  nameInput.value = ''
  location.reload();
}

