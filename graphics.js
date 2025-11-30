/* Shared Graphics JS */

document.addEventListener('DOMContentLoaded', () => {
    /* Switch Color */
    const colorBtn = document.getElementById('color');
    const pagination = document.getElementsByClassName('da-pagination');

    if (colorBtn) {
        colorBtn.addEventListener('click', function () {
            this.classList.toggle('secondary');
            this.classList.toggle('primary'); // Toggle primary as well to switch back
            
            // Toggle body class for global theme usage if needed
            document.body.classList.toggle('theme-secondary');

            if (pagination.length > 0) {
                pagination[0].classList.toggle('secondary');
            }
        });
    }

    /* Pagination */
    const paginationLinks = document.querySelectorAll('.da-pagination li');
    const activeDot = document.querySelector('.da-pagination .active');

    if (paginationLinks.length > 0 && activeDot) {
        paginationLinks.forEach((link) => {
            link.addEventListener('click', function (e) {
                if (!this.classList.contains('arrow') && !this.classList.contains('current')) {
                    // Remove current class from all
                    paginationLinks.forEach(el => el.classList.remove("current"));
                    
                    // Add current class to clicked
                    this.classList.add("current");
                    
                    // Move the active dot
                    // We need to calculate position relative to the UL
                    // The 'left' property in CSS is what moves it.
                    // The original code used offsetLeft.
                    
                    // In the original CSS, .active starts at left: 80px (desktop)
                    // We need to adjust based on the clicked item's position.
                    // A simple approximation based on index or offsetLeft:
                    
                    activeDot.style.left = this.offsetLeft + "px";
                    
                    // Optional: Play audio if you want to keep that feature
                    // var audio = new Audio('https://freesound.org/data/previews/455/455125_9415332-lq.mp3');
                    // audio.play();
                }
            });
        });
    }
});
