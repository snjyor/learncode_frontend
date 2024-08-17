
function languagesChanged() {
    // 点击切换语言时的事件
    const languageSelect = document.getElementById('language');
    const selectedLanguage = languageSelect.value;

    const localLanguage = selectedLanguage || localStorage.getItem('language');
    setLanguage(localLanguage);
    headerLanguageSwitch(localLanguage);
    localStorage.setItem('language', localLanguage);

    if (localLanguage === 'zh-CN') {
        document.body.classList.add('chinese');
    } else {
        document.body.classList.remove('chinese');
    }
    console.log('you have changed language to:', localLanguage);
}

function setLanguage(lang) {
    // 切换语言
    const elements = document.querySelectorAll('[langs]');
    elements.forEach(element => {
        const key = element.getAttribute('langs');
        if (languages[lang] && languages[lang][key]) {
            element.textContent = languages[lang][key];
        }
    });
}

function setDefaultLanguage() {
    // 初始化语言
    const sysLanguage = navigator.language || navigator.userLanguage;
    initLanguage = localStorage.getItem('language') || sysLanguage;
    setLanguage(initLanguage);
    console.log('current language:', initLanguage);
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
        languageSelect.value = initLanguage;
    }
    if (initLanguage === 'zh-CN') {
        document.body.classList.add('chinese');
    }
    headerLanguageSwitch(initLanguage);
}

function headerLanguageSwitch(language) {
    // 在初始化和切换语言时，切换header的语言
    const headers = document.getElementsByTagName('ul');
    loginBtn = document.getElementsByClassName('sign-in')[0];
    aElements = headers[0].getElementsByTagName('a');

    const enZhHeaders = [
        ['我的学习', 'My Learning'],
        ['项目探索', 'Projects Explore'],
        ['文档库', 'Document Library'],
        ['个人中心', 'Personal Center'],
    ]
    console.log("正在初始化header的语言", language);
    if (language === 'en') {
        loginBtn.innerText = 'Login';
        for (let i = 0; i < aElements.length; i++) {
            aElements[i].innerText = enZhHeaders[i][1];
        }
    } else {
        loginBtn.innerText = '登录';
        for (let i = 0; i < aElements.length; i++) {
            aElements[i].innerText = enZhHeaders[i][0];
        }
    }
}

window.onload = setDefaultLanguage;
