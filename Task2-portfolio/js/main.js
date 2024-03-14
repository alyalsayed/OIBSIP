const typedTextElement = document.querySelector(".typed-text-output");

const textToType = document.querySelector(".typed-text").textContent;

const parts = textToType.split(",").map((part) => part.trim());

let index = 0;
let isTyping = true;

// Function to type text
const typeText = () => {
  if (isTyping) {
    typedTextElement.textContent = parts[index].slice(
      0,
      typedTextElement.textContent.length + 1
    );
    if (typedTextElement.textContent === parts[index]) {
      isTyping = false;
      setTimeout(deleteText, 100);
    } else {
      setTimeout(typeText, 100);
    }
  }
};

// Function to delete text
const deleteText = () => {
  if (!isTyping && typedTextElement.textContent.length > 0) {
    typedTextElement.textContent = typedTextElement.textContent.slice(
      0,
      typedTextElement.textContent.length - 1
    );
    setTimeout(deleteText, 100);
  } else {
    index++;
    if (index < parts.length) {
      isTyping = true;
      setTimeout(typeText, 50);
    }
  }
};

// Start typing
setTimeout(typeText, 100);
