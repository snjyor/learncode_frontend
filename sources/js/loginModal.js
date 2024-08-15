document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.wrapper');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');
    const signInBtn = document.querySelector('.sign-in');
    const closeBtn = document.querySelector('.close-icon');

    registerLink.addEventListener('click', function() {
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', function() {
        wrapper.classList.remove('active');
    });

    signInBtn.addEventListener('click', function() {
        wrapper.classList.add('active-popup');
        signInBtn.style.display = 'none';
    });

    closeBtn.addEventListener('click', function() {
        wrapper.classList.remove('active-popup');
        wrapper.classList.remove('active');
        signInBtn.style.display = 'block';
        const referPage = document.referrer;
        if (referPage) {
            window.location.href = referPage;
        } else {
            wrapper.classList.add('letter-rain');
        }
    });
});
