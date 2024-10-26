document.addEventListener('DOMContentLoaded', function() {
    header = document.createElement('header');
    nav = document.createElement('nav');
    logo = document.createElement('div');
    logo.className = 'logo';
    const sysLanguage = navigator.language || navigator.userLanguage;
    const initLanguage = localStorage.getItem('language') || sysLanguage;
    console.log("我在insertHeader.js中，当前语言是：", initLanguage);
    nav.appendChild(logo);
    if (document.location.pathname.endsWith('index.html')) {
        sourceDir = '';
        logo.innerHTML = '<a href="./index.html">LearnCode</a>';
    } else {
        sourceDir = '';
        logo.innerHTML = '<a href="../index.html">LearnCode</a>';
    }
    
    ul = document.createElement('ul');
    li1 = document.createElement('li');
    a1 = document.createElement('a');
    a1.href = `.${sourceDir}/myProjects.html`;
    a1.innerText = initLanguage === 'zh-CN' ? '我的学习' : 'My Learning';
    li1.appendChild(a1);

    li2 = document.createElement('li');
    a2 = document.createElement('a');
    a2.href = `.${sourceDir}/projectsExplore.html`;
    a2.innerText = initLanguage === 'zh-CN' ? '项目探索' : 'Projects Explore';
    li2.appendChild(a2);

    li3 = document.createElement('li');
    a3 = document.createElement('a');
    a3.href = `.${sourceDir}/document.html`;
    a3.innerText = initLanguage === 'zh-CN' ? '文档库' : 'Document Library';
    li3.appendChild(a3);

    li4 = document.createElement('li');
    a4 = document.createElement('a');
    a4.href = `.${sourceDir}/personCenter.html`;
    a4.innerText = initLanguage === 'zh-CN' ? '个人中心' : 'Personal Center';
    li4.appendChild(a4);

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    nav.appendChild(ul);

    ul2 = document.createElement('ul');
    liLogin = document.createElement('li');
    aLogin = document.createElement('a');
    aLogin.href = `.${sourceDir}/login.html`;
    aLogin.className = 'sign-in';
    aLogin.innerText = initLanguage === 'zh-CN' ? '登录' : 'Login';
    liLogin.appendChild(aLogin);
    ul2.appendChild(liLogin);
    nav.appendChild(ul2);

    header.appendChild(nav);
    backgroundDiv = document.createElement('div');
    backgroundDiv.className = 'header-background';

    // divWrapper = document.createElement('div');
    // divWrapper.className = 'wrapper';
    const body = document.body;
    // body.insertBefore(divWrapper, body.firstChild);
    body.insertBefore(backgroundDiv, body.firstChild);
    body.insertBefore(header, body.firstChild);
});