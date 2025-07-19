const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';
  input.focus();

  // Show loading message
  const loadingMsg = appendMessage('bot', '⏳ Gemini is typing...');
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();

    // Remove loading message
    if (loadingMsg && loadingMsg.parentNode) {
      loadingMsg.parentNode.removeChild(loadingMsg);
    }
    appendMessage('bot', data.output || data.error || 'No response from Gemini');
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    if (loadingMsg && loadingMsg.parentNode) {
      loadingMsg.parentNode.removeChild(loadingMsg);
    }
    appendMessage('bot', 'Please try again later.');
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
