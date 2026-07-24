const toggleButton = document.getElementById('darkModeToggle');
const body = document.body;
const gmailIcon = document.getElementById('gmailIcon');
const githubIcon = document.getElementById('githubIcon');
const linkedinIcon = document.getElementById('linkedinIcon');

toggleButton.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        toggleButton.src = 'assets/images/light-button.png';
        gmailIcon.src = 'assets/images/gmail-white.png';
        githubIcon.src = 'assets/images/github-white.png';
        linkedinIcon.src = 'assets/images/linkedin-white.png';
    } else {
        toggleButton.src = 'assets/images/dark-button.png';
        gmailIcon.src = 'assets/images/gmail-black.png';
        githubIcon.src = 'assets/images/github-black.png';
        linkedinIcon.src = 'assets/images/linkedin-black.png';
    }
});
