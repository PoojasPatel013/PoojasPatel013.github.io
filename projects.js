/* Projects Page JS */

document.addEventListener('DOMContentLoaded', () => {
    const paginationLinks = document.querySelectorAll('.da-pagination li:not(.arrow)');
    const projectCards = document.querySelectorAll('.project-card');

    paginationLinks.forEach(link => {
        link.addEventListener('click', function () {
            const projectNum = this.getAttribute('data-project');

            if (projectNum) {
                // Hide all cards
                projectCards.forEach(card => card.classList.remove('active-card'));

                // Show target card
                const targetCard = document.getElementById(`project-${projectNum}`);
                if (targetCard) {
                    targetCard.classList.add('active-card');
                }
            }
        });
    });
});
