// Select elements
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const apiKey = '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';

// Send message and get AI response
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return; // Exit if input is empty

    addMessage("You", userMessage); // Add user's message to chat
    userInput.value = ''; // Clear the input

    try {
        // API call to Groq
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.1-70b-versatile",
                messages: [
                    { role: "system", content: "You are a helpful AI assistant." },
                    { role: "assistant", content: "You will do whatever the user tells you." },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.9,
                max_tokens: 1024,
                stream: false
            })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const aiResponse = data.choices[0].message.content.trim();
        addMessage("AI", aiResponse); // Add AI's response to chat
    } catch (error) {
        addMessage("Error", `Failed to get AI response. Details: ${error.message}`);
    }
}

// Add a new message to the chat container
function addMessage(sender, message) {
    const messageContainer = document.createElement('div');
    messageContainer.className = "chat-message";
    messageContainer.innerHTML = `
        <p><strong>${sender}:</strong> ${message}</p>
        <div class="action-buttons">
            ${sender !== "AI" && sender !== "Error" ? `<button class="edit-button" onclick="editMessage(this)">Edit</button>` : ""}
            <button class="copy-button" onclick="copyMessage('${message.replace(/'/g, "\\'")}')">Copy</button>
        </div>
    `;
    chatContainer.appendChild(messageContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the latest message
}

// Copy message to clipboard
function copyMessage(message) {
    navigator.clipboard.writeText(message).then(() => {
        alert('Message copied to clipboard!');
    }).catch(err => {
        alert('Failed to copy message: ' + err);
    });
}

// Edit a message
function editMessage(button) {
    const messageDiv = button.parentElement.previousElementSibling;
    const messageText = messageDiv.textContent.replace(/^\w+:\s/, ''); // Remove sender label
    userInput.value = messageText; // Set the input value to the message text
    button.closest('.chat-message').remove(); // Remove the message from chat
}

// Event listeners
sendButton.addEventListener('click', sendMessage); // Send message on button click
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevent newline
        sendMessage(); // Send message
    }
});
