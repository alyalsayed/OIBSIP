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
      setTimeout(deleteText, 1000); // Pause before deleting
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
    isTyping = true;
    index = (index + 1) % parts.length; 
    setTimeout(typeText, 50);
  }
};

// Start typing
setTimeout(typeText, 100);

fetch('js/projects.json')
.then(response => response.json())
.then(data => {
    const projectContainer = document.querySelector('#projects .row');
    data.forEach(project => {
        const projectCard = document.getElementById('project-template').cloneNode(true);
        projectCard.style.display = 'block';
        projectCard.querySelector('.card-img-top').src = project.image;
        projectCard.querySelector('.card-title').textContent = project.title;
        projectCard.querySelector('.card-text').textContent = project.description;

         // Check if live link exists; if not, use GitHub link
         const liveLinkBtn = projectCard.querySelector('.live-link');
         if (project.live_link && project.live_link.trim() !== "") {
             liveLinkBtn.href = project.live_link;
             liveLinkBtn.style.display = 'inline-block'; // Show button if live link exists
         } else {
             liveLinkBtn.href = project.github_link; // Use GitHub link instead
             liveLinkBtn.style.display = 'inline-block'; // Show button
         }

        projectCard.querySelector('.btn-outline-secondary').href = project.github_link;
        projectCard.querySelector('.text-muted').textContent = project.skills.join(', ');
        projectContainer.appendChild(projectCard);
    });
})
.catch(error => console.error('Error fetching the projects:', error));
