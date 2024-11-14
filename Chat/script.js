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
const loginForm = document.getElementById('loginForm');
const chatWindow = document.getElementById('chatWindow');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const submitButton = document.getElementById('submitButton');
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

// Function to send a message to Firebase
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

// Handle Login / Sign Up when the submit button is clicked
submitButton.addEventListener('click', () => {
  const username = document.getElementById('usernameInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();

  if (username && password) {
    // Check if user already exists by trying to log in
    const dummyEmail = `${username}@cookiechat.com`;  // Create a dummy email to register or log in with Firebase

    auth.signInWithEmailAndPassword(dummyEmail, password)
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          // If user not found, create a new user
          auth.createUserWithEmailAndPassword(dummyEmail, password)
            .then(userCredential => {
              // After signing up, set the displayName to the entered username
              userCredential.user.updateProfile({
                displayName: username
              });
              alert("Signed up successfully!");
            })
            .catch(error => {
              console.error(error.message);
              alert("Error signing up!");
            });
        } else {
          console.error(error.message);
          alert("Error logging in!");
        }
      });
  } else {
    alert("Please enter a username and password.");
  }
});

// Handle Auth State Changes
auth.onAuthStateChanged(user => {
  if (user) {
    userInfo.textContent = `Logged in as: ${user.displayName}`;
    loginForm.style.display = "none"; // Hide the login form
    document.querySelector(".chat-container").style.display = "block"; // Show chat container
  } else {
    userInfo.textContent = "Not logged in";
    loginForm.style.display = "block"; // Show the login form
    document.querySelector(".chat-container").style.display = "none"; // Hide chat container
  }
});
