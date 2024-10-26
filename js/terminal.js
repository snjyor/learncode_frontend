require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs' }});

require(["vs/editor/editor.main"], function() {
    blankPlaceholder = "\n".repeat(80);
    var editor = monaco.editor.create(document.getElementById('editor'), {
        value: `console.log('Hello, world!')${blankPlaceholder}`,
        language: "javascript",
        theme: "vs-dark"
    });

    var languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', function() {
        monaco.editor.setModelLanguage(editor.getModel(), this.value);
    });

    document.getElementById('run-button').addEventListener('click', function() {
        var code = editor.getValue();
        var language = languageSelect.value;
        var output = document.getElementById('output');

        output.innerHTML = ''; // 清空之前的输出

        if (language === 'javascript') {
            try {
                // 重定向 console.log 到输出区域
                var oldLog = console.log;
                console.log = function() {
                    output.innerHTML += Array.from(arguments).join(' ') + '<br>';
                };

                eval(code);

                // 恢复 console.log
                console.log = oldLog;
            } catch (e) {
                output.innerHTML = 'Error: ' + e.message;
            }
        } else if (language === 'python') {
            output.innerHTML = '抱歉，浏览器无法直接运行 Python 代码。你可以使用 Pyodide 或其他在线 Python 解释器来实现此功能。';
        } else if (language === 'html') {
            var iframe = document.createElement('iframe');
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            output.innerHTML = '';
            output.appendChild(iframe);
            iframe.contentDocument.open();
            iframe.contentDocument.write(code);
            iframe.contentDocument.close();
        }
    });

    window.addEventListener('resize', function() {
        editor.layout();
    });
    
});