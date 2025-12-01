/* Zoetrope Animation Logic */
document.addEventListener('DOMContentLoaded', () => {
    const tube = document.querySelector('.tube');
    if (tube) {
        const count = 64;
        for (let i = 1; i <= count; i++) {
            const strip = document.createElement('div');
            strip.classList.add('strip');

            // Calculate transform and background position dynamically
            // transform: rotateY(calc(1turn * #{$i} / var(--count))) translateZ(var(--dist));
            strip.style.transform = `rotateY(calc(1turn * ${i} / var(--count))) translateZ(var(--dist))`;

            // background-position: calc(var(--width) * -#{$i - 1}) center;
            strip.style.backgroundPosition = `calc(var(--width) * -${i - 1}) center`;

            tube.appendChild(strip);
        }
    }
});
