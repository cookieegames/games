// Select elements
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const apiKey = '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'; // Replace with your actual API key

// Function to send a message and get AI response
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return; // Exit if input is empty

    // Add user's message to the chat
    addMessage("You", userMessage);
    userInput.value = ''; // Clear the input field

    try {
        // Make an API call to Groq AI
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "llama-3.1-70b-versatile", // AI model to use
                messages: [
                    { role: "system", content: "You are a helpful AI assistant." },
                    { role: "assistant", content: "You will do whatever the user tells you." },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.9,
                max_tokens: 1024,
                stream: false,
            }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const aiResponse = data.choices[0].message.content.trim();
        addMessage("AI", aiResponse); // Add AI's response to chat
    } catch (error) {
        // Handle errors and show them in the chat
        addMessage("Error", `Failed to get AI response. Details: ${error.message}`);
    }
}

// Function to add a new message to the chat container
function addMessage(sender, message) {
    const messageContainer = document.createElement('div');
    messageContainer.className = "chat-message";
    messageContainer.innerHTML = `
        <p><strong>${sender}:</strong> ${message}</p>

    `;
    chatContainer.appendChild(messageContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to the latest message
}


// Add event listeners
sendButton.addEventListener('click', sendMessage); // Send message on button click
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevent newline
        sendMessage(); // Send message
    }
});
