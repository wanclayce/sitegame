const items = document.querySelectorAll('.carousel-item');

items.forEach((item, index) => {
    const angle = (index / items.length) * 360;
    item.style.transform = `rotateY(${angle}deg) translateZ(300px)`;
    item.addEventListener('click', () => explodeImage(item));
});

function explodeImage(image) {
    const rect = image.getBoundingClientRect();
    const pieceSize = 20;
    const rows = Math.ceil(rect.height / pieceSize);
    const cols = Math.ceil(rect.width / pieceSize);

    const pieces = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement('div');
            piece.style.width = `${pieceSize}px`;
            piece.style.height = `${pieceSize}px`;
            piece.style.position = 'absolute';
            piece.style.backgroundImage = `url(${image.src})`;
            piece.style.backgroundSize = `${rect.width}px ${rect.height}px`;
            piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
            piece.style.left = `${rect.left + col * pieceSize}px`;
            piece.style.top = `${rect.top + row * pieceSize}px`;
            pieces.push(piece);
            document.body.appendChild(piece);
        }
    }

    gsap.to(pieces, {
        duration: 1,
        x: () => gsap.utils.random(-200, 200),
        y: () => gsap.utils.random(-200, 200),
        opacity: 0,
        rotation: () => gsap.utils.random(-360, 360),
        onComplete: () => {
            pieces.forEach(piece => piece.remove());
        }
    });

    image.style.visibility = 'hidden';
}