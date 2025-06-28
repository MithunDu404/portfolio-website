let chatOpen = false;

function toggleChat() {
  const container = document.getElementById("chatContainer");
  const button = document.getElementById("botButton");

  chatOpen = !chatOpen;

  if (chatOpen) {
    container.classList.add("active");
    button.style.opacity = "0";
    button.style.pointerEvents = "none";
    document.getElementById("messageInput").focus();
  } else {
    container.classList.remove("active");
    setTimeout(() => {
      button.style.opacity = "1";
      button.style.pointerEvents = "auto";
    }, 200);
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function addMessage(content, isUser = false) {
  const messagesContainer = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isUser ? "user" : "bot"}`;

  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  messageDiv.innerHTML = `
                <div class="message-bubble">${content}</div>
                <div class="message-time">${timeString}</div>
            `;

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
  document.getElementById("typingIndicator").style.display = "block";
  document.getElementById("chatMessages").scrollTop =
    document.getElementById("chatMessages").scrollHeight;
}

function hideTypingIndicator() {
  document.getElementById("typingIndicator").style.display = "none";
}

async function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();

  if (!message) return;

  // Add user message
  addMessage(message, true);
  input.value = "";

  // Show typing indicator
  showTypingIndicator();

  try {
    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message }),
    });

    const data = await response.json();

    // Simulate some delay for more natural feel
    setTimeout(() => {
      hideTypingIndicator();
      addMessage(data.response);
    }, 800);
  } catch (error) {
    hideTypingIndicator();
    addMessage(
      "Sorry, I'm having trouble connecting right now. Please try again later."
    );
    console.error("Error:", error);
  }
}

// Initialize chat
document.addEventListener("DOMContentLoaded", function () {
  // Auto-scroll to bottom
  const messagesContainer = document.getElementById("chatMessages");
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
