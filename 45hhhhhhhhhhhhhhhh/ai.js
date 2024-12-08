const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

const apiKey = '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';
let messageHistory = [
    { role: "system", content: "You are a helpful AI assistant, you are ¨Cookie AI¨ made by Cookie Edition do not repeatly say you are Cookie AI only mention in for the first time speaking to the user and also whenever the user asks what you are." },
    { role: "assistant", content: "You will do whatever the user tells you and respond in short sentances. Simple and straight forward answers, maybe only 2-3 sentances but if the sentance requires more to fully explain do so. Also make sure to use html to make a more organized text if anything is numbered or bulleted answer wise and also if anything is in ** its bold. MAKE SURE TO USE HTML" }
];

let sessionMemory = {
    userName: '', 
    favoriteColor: '', 
    lastResult: null,
    facts: {},
    userQuestions: []
};

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

// Show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.createElement('p');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.innerHTML = '<strong>AI:</strong> Typing...';
    chatContainer.appendChild(typingIndicator);
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) typingIndicator.remove();
}

// Update session memory
function updateSessionMemory(key, value) {
    sessionMemory[key] = value;
}

// Send a message to the AI and process the response
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    addMessage("You", userMessage);
    userInput.value = '';
    messageHistory.push({ role: "user", content: userMessage });

    showTypingIndicator();

    try {
        let responseMessage = '';

        // Handle specific user input patterns
        if (/^\d+\s*[\+\-\*\/]\s*\d+$/.test(userMessage)) {
            const result = eval(userMessage);
            responseMessage = `The result of ${userMessage} is ${result}.`;
            updateSessionMemory('lastResult', result);
        } else if (userMessage.toLowerCase().includes('add')) {
            const lastResult = sessionMemory.lastResult || 0;
            const addValue = parseFloat(userMessage.match(/\d+/)[0]);
            const newResult = lastResult + addValue;
            responseMessage = `Adding ${addValue} to ${lastResult} gives ${newResult}.`;
            updateSessionMemory('lastResult', newResult);
        } else if (userMessage.toLowerCase().includes('my name is')) {
            const name = userMessage.split('is')[1].trim();
            sessionMemory.userName = name;
            responseMessage = `Nice to meet you, ${name}!`;
            updateSessionMemory('userName', name);
        } else if (userMessage.toLowerCase().includes('remember that')) {
            const fact = userMessage.split('remember that')[1].trim();
            sessionMemory.facts[fact] = true;
            responseMessage = `Got it! I'll remember that: "${fact}".`;
        } else if (userMessage.toLowerCase().includes('what do you remember')) {
            const facts = Object.keys(sessionMemory.facts);
            responseMessage = facts.length > 0 ? `I remember these things: ${facts.join(', ')}.` : "I don't remember anything yet.";
        } else {
            // Call the AI API for other types of messages
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "llama-3.1-70b-versatile",
                    messages: messageHistory,
                    temperature: 0.9,
                    max_tokens: 1024,
                    stream: false
                })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            responseMessage = data.choices[0].message.content;
        }

        removeTypingIndicator();
        addMessage("AI", responseMessage);
        messageHistory.push({ role: "assistant", content: responseMessage });
    } catch (error) {
        removeTypingIndicator();
        addMessage("Error", `Failed to get AI response. Details: ${error.message}`);
    }
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
