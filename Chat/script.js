// Firebase Configuration (Replace with your Firebase config values)
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
const auth = firebase.auth();

// Get elements from the DOM
const chatWindow = document.getElementById('chatWindow');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const logoutButton = document.getElementById('logoutButton');
const userInfo = document.getElementById('userInfo');

// Function to add a message to the chat window
function addMessage(messageId, username, text, timestamp) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message');
  
  const messageContent = document.createElement('span');
  messageContent.textContent = `[${timestamp}] ${username}: ${text}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteMessage(messageId, username));

  messageDiv.appendChild(messageContent);
  messageDiv.appendChild(deleteButton);
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
}

// Function to send message to Firebase
function sendMessage() {
  const message = messageInput.value.trim();
  if (message && auth.currentUser) {
    const username = auth.currentUser.displayName || "Anonymous";
    const timestamp = new Date().toLocaleTimeString();
    db.ref("messages").push({
      username: username,
      text: message,
      timestamp: timestamp,
      userId: auth.currentUser.uid
    });
    messageInput.value = ''; // Clear the input field
  }
}

// Function to delete a message from Firebase
function deleteMessage(messageId, messageOwner) {
  if (auth.currentUser.displayName === "Cookie Edition" || messageOwner === auth.currentUser.displayName) {
    db.ref("messages").child(messageId).remove();
  } else {
    alert("You can only delete your own messages.");
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
  addMessage(snapshot.key, messageData.username, messageData.text, messageData.timestamp);
});

// Handle Login
signupButton.addEventListener('click', () => {
  const email = prompt('Enter your email:');
  const password = prompt('Enter your password:');
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      userCredential.user.updateProfile({
        displayName: email.split('@')[0] // Use email prefix as username
      });
      alert("Signed up successfully!");
    })
    .catch(error => {
      console.error(error.message);
      alert("Error signing up!");
    });
});

// Handle Login
loginButton.addEventListener('click', () => {
  const email = prompt('Enter your email:');
  const password = prompt('Enter your password:');
  auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      console.error(error.message);
      alert("Error logging in!");
    });
});

// Handle Logout
logoutButton.addEventListener('click', () => {
  auth.signOut()
    .then(() => {
      alert("Logged out!");
    })
    .catch(error => {
      console.error(error.message);
    });
});

// Handle Auth State Changes
auth.onAuthStateChanged(user => {
  if (user) {
    userInfo.textContent = `Logged in as: ${user.displayName}`;
  } else {
    userInfo.textContent = "Not logged in";
  }
});
