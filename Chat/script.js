// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyARKemfrM6qC2rY5uo0nFxn4BV20MrXmAc",
  authDomain: "cookiechat-8c1fc.firebaseapp.com",
  databaseURL: "https://cookiechat-8c1fc-default-rtdb.firebaseio.com",
  projectId: "cookiechat-8c1fc",
  storageBucket: "cookiechat-8c1fc.firebaseapp.com",
  messagingSenderId: "161932804552",
  appId: "1:161932804552:web:acc3963358e8d6bd4080fd",
  measurementId: "G-5FRPWXVS7F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Get elements from the DOM
const chatWindow = document.getElementById('chatWindow');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Function to add a message to the chat window
function addMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message');
  messageDiv.textContent = message;
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
}

// Function to send message to Firebase
function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    db.ref("messages").push({ text: message }); // Push message to Firebase
    messageInput.value = ''; // Clear the input field
  }
}

// Event listener for Send button
sendButton.addEventListener('click', sendMessage);

// Event listener for Enter key
messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// Listen for new messages added to Firebase and display them
db.ref("messages").on("child_added", snapshot => {
  const messageData = snapshot.val();
  addMessage(messageData.text); // Add message to chat window
});

