let currentOpenSubmenu = null;

document.addEventListener('DOMContentLoaded', function() {
    var menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            var submenu = this.nextElementSibling;

            var isVisible = submenu.style.display === 'block';
            
            document.querySelectorAll('.submenu').forEach(function(sub) {
                sub.style.display = 'none';
            });
            
            if (!isVisible) {
                submenu.style.display = 'block';
            }
        });
    });

    var submenuItems = document.querySelectorAll('.submenu a');
    submenuItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            var language = this.getAttribute('data-language');
            var url = new URL(this.href);
            url.searchParams.set('language', language);
            window.location.href = url.toString();

        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 获取 URL 中的 language 参数
    const urlParams = new URLSearchParams(window.location.search);
    const language = urlParams.get('language');
    console.log('language:', language)
    // 构建带有 language 参数的请求 URL
    const requestUrl = `http://127.0.0.1:5000/quiz/list?language=${language}`;
    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            const questionsContainer = document.getElementById('questions-container');
            data = data.data
            for (let index = 0; index < data.length; index++) {    
                const item = data[index]
                console.log(item)
                const column = document.createElement('div');
                column.className = 'column';

                const questionDiv = document.createElement('div');
                questionDiv.className = 'question';

                const questionTitle = document.createElement('h3');
                questionTitle.textContent = `${index + 1}. ${item.question}`;
                questionDiv.appendChild(questionTitle);

                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'options';

                item.options.forEach(option => {
                    const optionDiv = document.createElement('div');
                    optionDiv.className = 'option';

                    const label = document.createElement('label');

                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = `q${item.id}`;
                    input.value = option.value;

                    label.appendChild(input);
                    label.appendChild(document.createTextNode(`${option.value}: ${option.text}`));
                    optionDiv.appendChild(label);
                    optionsDiv.appendChild(optionDiv);
                });

                questionDiv.appendChild(optionsDiv);
                column.appendChild(questionDiv);
                questionsContainer.appendChild(column);
            };
            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.className = 'submit-quiz';
            submitButton.textContent = '提交';
            questionsContainer.appendChild(submitButton);
        })
        .catch(error => console.error('Error fetching questions:', error));
});


document.addEventListener('submit-quiz', function() {
    const questions = document.querySelectorAll('.question');
    const answers = [];

    questions.forEach(question => {
        const questionId = question.id;
        const selectedOption = question.querySelector('input[type="radio"]:checked');

        if (selectedOption) {
            answers.push({
                questionId: questionId,
                optionValue: selectedOption.value
            });
        }
    });

    const apiUrl = `${process.env.API_URL}/submit-quiz`;
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Quiz submitted successfully!');
    })
    .catch(error => {
        console.error('Error submitting quiz:', error);
        alert('Failed to submit quiz. Please try again.');
    });
});
