const DATA = [{
    questions: 'Вопрос 1',
    answers: [{
        id: '1',
        value: 'Ответ 1',
        correct: true,
      },
      {
        id: '2',
        value: 'Ответ 2',
        correct: false,
      },
      {
        id: '3',
        value: 'Ответ 3',
        correct: false,
      },
    ]
  },
  {
    questions: 'Вопрос 2',
    answers: [{
        id: '4',
        value: 'Ответ 4',
        correct: false,
      },
      {
        id: '5',
        value: 'Ответ 5',
        correct: true,
      },
    ]
  },
];

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');

const renderQuestions = (index) => {
  const renderAnswers = () => DATA[index].answers
    .map((answer) => `
      <li>
        <label>
          <input class="answer-input" type="radio" name=${index} value=${answer.id}>
          ${answer.value}
        </label>
      </li>
    `)
    .join('');

  questions.innerHTML = `
  <div class="quiz-questions-item">
    <div class="quiz-questions-item__question">${DATA[index].questions}</div>
    <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
  </div>
  `;
};

// const renderResults = {} => {};
// const renderIndicator = {} => {};

quiz.addEventListener('change', (event) => {

});

quiz.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-next')) {
    console.log('Далее');
  };
  if (event.target.classList.contains('btn-restart')) {
    console.log('С начала');
  };
});

renderQuestions(0);