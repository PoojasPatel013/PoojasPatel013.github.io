/* 404 / Loading Animation JS */
document.addEventListener('DOMContentLoaded', () => {
    const loadingAnimation = document.getElementById('loading-animation');
    const noDataMessage = document.getElementById('no-data-message');

    if (loadingAnimation && noDataMessage) {
        setTimeout(() => {
            loadingAnimation.style.display = 'none';
            noDataMessage.style.display = 'block';
            noDataMessage.classList.add('fade-in'); // Add fade-in effect
        }, 5000); // 5 seconds
    }
});
