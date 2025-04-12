import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const JavaScriptCodeExamples: React.FC = () => {
  // Примеры кода лучше вынести в отдельные переменные или даже файлы
  const coercionExample = `
console.log([] + {}); // "[object Object]"
console.log({} + []); // 0 (в некоторых средах) или NaN - зависит от интерпретации {} как блока или объекта
console.log('5' + 3);   // "53" (конкатенация)
console.log('5' - 3);   // 2 (преобразование к числу)
  `

  const thisExample = `
const user = {
  name: 'Alice',
  greetRegular: function() { console.log(\`Hello, I'm \${this.name}\`); },
  greetArrow: () => { console.log(\`Hello, I'm \${this.name}\`); } // 'this' здесь будет другим! (window или undefined)
};

user.greetRegular(); // "Hello, I'm Alice"
user.greetArrow();   // "Hello, I'm undefined" (или ошибка, в зависимости от контекста)

const greet = user.greetRegular;
greet(); // "Hello, I'm undefined" (или ошибка, this потерян)
  `

  return (
    <section id="examples" className="p-6 border rounded-lg bg-slate-800/40 border-slate-700/50">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-400">Примеры Кода</h2>
      <div className="space-y-6 prose text-gray-300 prose-invert max-w-none">
        {/*
          - Иллюстрирующие основные концепции.
          - Демонстрирующие проблемы и "странности", упомянутые в критике.
          - Показывающие "хорошие" и "плохие" практики.
        */}
        <div>
          <h4 className="font-semibold">Пример 1: Неявное приведение типов</h4>
          <pre>
            <code className="language-javascript">{coercionExample}</code>
          </pre>
          <p className="text-sm italic">
            Комментарий: Обратите внимание на непредсказуемость при сложении и разность с вычитанием.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Пример 2: Поведение `this`</h4>
          <pre>
            <code className="language-javascript">{thisExample}</code>
          </pre>
          <p className="text-sm italic">
            Комментарий: Контекст `this` теряется при передаче метода как колбэка и ведет себя иначе в стрелочных
            функциях.
          </p>
        </div>

        {/* ... другие примеры ... */}
      </div>
    </section>
  )
}

export default JavaScriptCodeExamples
