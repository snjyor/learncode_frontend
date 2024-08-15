document.addEventListener('DOMContentLoaded', () => {
        const rain = document.getElementById('rain');
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const fonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'];
        
        const config = {
            minSpeed: 1,
            maxSpeed: 3,
            letterCount: 200,
            trailLength: 5,
            mouseInfluenceRadius: 150,  // px
            mouseInfluenceStrength: 0.5  // 0-1, percentage of full strength
        };

        let mouseX = -1000, mouseY = -1000;
        let raindrops = [];

        function createRaindrop() {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            const left = Math.random() * window.innerWidth;
            raindrop.style.left = `${left}px`;
            raindrop.style.top = '-20px';  // Start above the viewport
            const fontSize = Math.random() * 20 + 10;
            raindrop.style.fontSize = `${fontSize}px`;
            
            const fallSpeed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
            
            const font = fonts[Math.floor(Math.random() * fonts.length)];
            raindrop.style.fontFamily = font;
            const letter = letters[Math.floor(Math.random() * letters.length)];
            raindrop.textContent = letter;
            
            rain.appendChild(raindrop);

            // Create trails
            for (let i = 1; i <= config.trailLength; i++) {
                const trail = document.createElement('div');
                trail.className = 'trail';
                trail.style.left = '0';
                trail.style.top = `-${i * fontSize * 1.2}px`;
                trail.style.fontSize = `${fontSize * 0.9}px`;
                trail.style.fontFamily = font;
                trail.textContent = letter;
                trail.style.animationDelay = `${i * 0.1}s`;
                raindrop.appendChild(trail);
            }

            return {
                element: raindrop,
                speed: fallSpeed,
                originalLeft: left
            };
        }

        function updateRaindrops() {
            for (let i = raindrops.length - 1; i >= 0; i--) {
                const raindrop = raindrops[i];
                const rect = raindrop.element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const dx = mouseX - centerX;
                const dy = mouseY - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                let newLeft = rect.left;
                if (distance < config.mouseInfluenceRadius) {
                    const influence = (1 - distance / config.mouseInfluenceRadius) * config.mouseInfluenceStrength;
                    newLeft += influence * dx;
                } else {
                    // Return to original path
                    newLeft += (raindrop.originalLeft - rect.left) * 0.1;
                }
                
                raindrop.element.style.left = `${newLeft}px`;
                raindrop.element.style.top = `${rect.top + raindrop.speed}px`;
                
                if (rect.top > window.innerHeight) {
                    rain.removeChild(raindrop.element);
                    raindrops.splice(i, 1);
                    raindrops.push(createRaindrop());
                }
            }
            
            requestAnimationFrame(updateRaindrops);
        }

        function initRain() {
            for (let i = 0; i < config.letterCount; i++) {
                raindrops.push(createRaindrop());
            }
            requestAnimationFrame(updateRaindrops);
        }

        initRain();

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener('mouseout', () => {
            mouseX = -1000;
            mouseY = -1000;
        });
    });
    