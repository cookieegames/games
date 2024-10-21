document.getElementById('send-button').addEventListener('click', function() {
    let userInput = document.getElementById('user-input').value;
    
    if (userInput.trim()) {
        displayMessage(userInput, 'user');
        getBotResponse(userInput);
        document.getElementById('user-input').value = ''; // Clear input
    }
});

function displayMessage(message, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', sender);
    messageContainer.innerText = message;

    const chatBox = document.getElementById('chat-box');
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to bottom
}

function getBotResponse(userInput) {
    const response = generateResponse(userInput);
    setTimeout(() => {
        displayMessage(response, 'bot');
    }, 500); // Simulate a small delay to mimic "thinking"
}

function generateResponse(input) {
    input = input.toLowerCase();
    
    // Basic keyword matching
    if (input.includes('hello') || input.includes('hi')) {
        return "Hello! How can I help you today?";
    }
    if (input.includes('how are you')) {
        return "I'm just a bunch of code, but thanks for asking!";
    }
    if (input.includes('name')) {
        return "I'm your friendly neighborhood chatbot.";
    }
    if (input.includes('what can you do')) {
        return "I can answer simple questions, chat with you, and provide information based on predefined responses.";
    }
    if (input.includes('weather')) {
        return "I'm afraid I can't check the weather right now, but try asking something else!";
    }
    if (input.includes('bye') || input.includes('goodbye')) {
        return "Goodbye! Have a great day!";
    }
    
    // Fallback response for unknown questions
    return "Sorry, I don't understand that. Can you try asking something else?";
}
