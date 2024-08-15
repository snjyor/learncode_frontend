document.addEventListener('DOMContentLoaded', () => {
    divRain = document.createElement('div');
    divRain.id = 'rain';
    document.body.appendChild(divRain);
    const rain = document.getElementById('rain');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789I!@#$%^&*()_+-=œ∑´®†¥¨ˆøπ“‘«åß∂ƒ©˙∆˚¬…æΩ≈ç√∫µ≤≥÷';
    const words = ['Control', 'AI', 'Array', 'DevOps', 'Go', 'XML', 'ETH', 'Queue', 'PHP', 'Bitbucket', 'SSL', 'Function', 'Branch', 
        'C#', 'Kotlin', 'List', 'MySQL', 'AJAX', 'BDD', 'Dictionary', 'Binary', 'HTTPS', 'BTC', 'Class', 'NoSQL', 'Ruby', 
        'BNB', 'JSON', 'Request', 'Container', 'Security', 'Data', 'Rust', 'GCP', 'Review', 'ML', 'HTTP', 'System', 'JavaScript', 
        'Commit', 'AWS', 'Solidity', 'OAuth', 'Stack', 'API', 'Framework', 'Automation', 'Merge', 'Docker', 'Python', 'Version', 
        'Object', 'TypeScript', 'Azure', 'GraphQL', 'GitLab', 'Unit', 'CI/CD', 'Jenkins', 'Encryption', 'Algorithm', 'Tree', 'HTML', 
        'SQLite', 'Set', 'Module', 'DL', 'Travis', 'Hash', 'Database', 'GitHub', 'Git', 'CircleCI', 'GPT', 'Pull', 'Redis', 
        'Kubernetes', 'Package', 'Code', 'TDD', 'Service', 'Ethereum', 'Java', 'Microservice', 'PostgreSQL', 'JWT', 'MongoDB', 
        'Swift', 'SQL', 'Selenium', 'CSS', 'UDP', 'Cloud', 'TLS', 'REST', 'C++', 'SOL', 'TCP']
    const lettersArray = letters.split('');
    words.push(...lettersArray);
    const fonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'];
    const config = {
        minSpeed: 1, // Minimum fall duration in seconds
        maxSpeed: 4, // Maximum fall duration in seconds
        spawnInterval: 30, // Milliseconds between each raindrop spawn
        maxRaindrops: 300 // Maximum number of raindrops on screen
    };


    function createRaindrop() {
        if (document.querySelectorAll('.raindrop').length >= config.maxRaindrops) {
            return; // Don't create more raindrops if we've reached the limit
        }

        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        raindrop.style.left = `${Math.random() * 100}vw`;
        raindrop.style.fontSize = `${Math.random() * 20 + 10}px`;
        raindrop.style.opacity = Math.random() * 0.5 + 0.5;
        
        // Set a consistent fall speed
        const fallDuration = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
        raindrop.style.animationDuration = `${fallDuration}s`;
        
        raindrop.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
        raindrop.textContent = words[Math.floor(Math.random() * words.length)];
        
        rain.appendChild(raindrop);

        // Remove the raindrop after it finishes falling
        setTimeout(() => {
            raindrop.remove();
        }, fallDuration * 1000);
    }
    const rainInterval = setInterval(createRaindrop, config.spawnInterval);
});
