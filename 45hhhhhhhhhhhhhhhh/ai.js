const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const apiKey = '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';

// Send a message to the AI and process the response
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    addMessage("You", userMessage);
    userInput.value = '';

    try {
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
        const aiResponse = data.choices[0].message.content;
        addMessage("AI", aiResponse);
    } catch (error) {
        addMessage("Error", `Failed to get AI response. Details: ${error.message}`);
    }
}

// Add a message to the chat container
function addMessage(sender, message) {
    const messageContainer = document.createElement('div');
    messageContainer.className = "chat-message";
    messageContainer.innerHTML = `
        <p><strong>${sender}:</strong> ${message}</p>
    `;
    chatContainer.appendChild(messageContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}




// Add event listener to the send button
sendButton.addEventListener('click', sendMessage);

// Add event listener for Enter key (submit message)
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
