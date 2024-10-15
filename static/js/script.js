async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    const sendIcon = document.getElementById("sendIcon");

    const message = userInput.innerText.trim(); 

    if (message === "") return;

    userInput.setAttribute("contenteditable", "false");
    sendButton.disabled = true;
    sendIcon.src = "static/images/stop.png";

    appendMessage(message, "user-message");
    userInput.innerText = "";

    loadingBotResponse();

    try {
        const response = await fetch("/writer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_input: message }),
        });

        if (!response.ok) {
            console.error("Error:", response.statusText);
            streamBotResponse("Error: " + response.statusText);
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        streamBotResponse("");
        const messageContainers = document.querySelectorAll(".bot-message-container");
          const messageContainer = messageContainers[messageContainers.length - 1];

        let resultText = messageContainer.querySelector(".bot-message");

        let done = false;
        while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;

            if (value) {
                console.log("decoder")
                console.log(decoder)
                const chunk = decoder.decode(value);
                console.log("chunk")
                console.log(chunk)
                const lines = chunk.split("\n");
                console.log("lines")
                console.log(lines)
                const parsedLines = lines
                .map((line) => line.replace(/^data: /, ""))
                .filter((line) => line !== "[DONE]")
                console.log("parsedLines")
                console.log(parsedLines)
                
                for (const parsedLine of parsedLines) {
                      console.log(parsedLine);
                      resultText.innerHTML += parsedLine; 
                }
            }
        }
          const loadingMessage = document.getElementById("loading-message");
          if (loadingMessage) {
                loadingMessage.remove(); 
          }
    } catch (error) {
        console.error("Error during message sending:", error);
        streamBotResponse("Error: Something went wrong.");
    } finally {
        userInput.setAttribute("contenteditable", "true"); 
        sendButton.disabled = false;
        sendIcon.src = "static/images/icons8-arrow-100.png"; 
    }
}

function streamBotResponse(chunk) {
    const chatContainer = document.getElementById("chat-container");

    let messageContainer = document.createElement("div");
    messageContainer.classList.add("bot-message-container");

    const botIconContainer = document.createElement("div");
    botIconContainer.classList.add("bot-icon-container");

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "bot-message");

    messageContainer.appendChild(messageElement);

    const actionButtonContainer = document.createElement("div");
    actionButtonContainer.classList.add("action-button-container");
    actionButtonContainer.style.opacity = "0"; 

    const copyButton = createCopyButton(messageElement);

    actionButtonContainer.appendChild(copyButton);

    messageContainer.appendChild(actionButtonContainer);

    messageContainer.onmouseover = () => {
          actionButtonContainer.style.opacity = "1";
    };
    messageContainer.onmouseout = () => {
          actionButtonContainer.style.opacity = "0";
    };

    chatContainer.appendChild(messageContainer);

    messageElement.innerHTML += chunk;

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function cleanInput() {
    const userInput = document.getElementById("userInput");
    userInput.innerHTML = userInput.innerHTML.replace(/<span[^>]*>(.*?)<\/span>/g, "$1");
}

function appendMessage(content, className) {
    const chatContainer = document.getElementById("chat-container");

    const messageContainer = document.createElement("div");
    messageContainer.classList.add(`${className}-container`); 

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", className);
    messageElement.textContent = content;

    messageContainer.appendChild(messageElement);

    chatContainer.appendChild(messageContainer);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function loadingBotResponse(responseText) {
    const chatContainer = document.getElementById("chat-container");
    const loadingMessageContainer = document.createElement("div");
    loadingMessageContainer.classList.add("bot-loading-message-container");
    loadingMessageContainer.textContent = "Writing";
    loadingMessageContainer.id = "loading-message";
    chatContainer.appendChild(loadingMessageContainer);
}

function createCopyButton(messageElement) {
    const copyButton = document.createElement("button");
    copyButton.classList.add("copy-button");

    const copyIcon = document.createElement("img");
    copyIcon.src = "static/images/copy.png"; 
    copyIcon.classList.add("action-icon");
    copyButton.appendChild(copyIcon);
    copyButton.onclick = () => {
          copyToClipboard(messageElement.textContent);
          changeIconTemporary(copyIcon, "static/images/copy-checked.png", 3000); 
    };

    return copyButton;
}

function copyToClipboard(text) {
    navigator.clipboard
          .writeText(text)
          .then(() => {})
          .catch((err) => {
                console.error("Failed to copy: ", err);
          });
}

function handleKeyPress(event) {
    const sendButton = document.getElementById("sendButton");

    if (event.key === "Enter" && !sendButton.disabled) {
          event.preventDefault(); 
          sendMessage(); 
    }
}

function checkInput() {
    const userInput = document.getElementById("userInput").textContent.trim();
    const sendButton = document.getElementById("sendButton");

    if (userInput.length > 0) {
          sendButton.style.backgroundImage = "linear-gradient(111.8deg, rgb(0, 104, 155) 19.8%, rgb(0, 173, 239) 92.1%)"; 
    } else {
          sendButton.style.backgroundImage = "linear-gradient(45deg, rgb(91 153 207), rgb(144 222 255))"; 
    }
}

function handlePaste(event) {
    event.preventDefault();

    const text = event.clipboardData.getData("text/plain");

    document.execCommand("insertText", false, text);
}