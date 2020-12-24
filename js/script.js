const DATA = [{
    questions: 'В каком году вышел фильм "Бойцовский клуб"',
    answers: [{
        id: '1',
        value: '1999',
        correct: true,
      },
      {
        id: '2',
        value: '1995',
        correct: false,
      },
      {
        id: '3',
        value: '2001',
        correct: false,
      },
    ]
  },
  {
    questions: 'По роману какого писателя был снят фильм?',
    answers: [{
        id: '4',
        value: 'Ирвин Уэлш',
        correct: false,
      },
      {
        id: '5',
        value: 'Чак Паланик',
        correct: true,
      },
      {
        id: '6',
        value: 'Чарльз Буковски',
        correct: false,
      },
    ]
  },
  {
    questions: 'Какое первое правило бойцовского клуба?',
    answers: [{
        id: '7',
        value: 'Никому не рассказывать о Бойцовском клубе',
        correct: true,
      },
      {
        id: '8',
        value: 'Никогда никому не рассказывать о Бойцовском клубе',
        correct: false,
      },
      {
        id: '9',
        value: 'В схватке участвуют только двое',
        correct: false,
      },
    ]
  },
];

let localResults = {};

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');

const renderQuestions = (index) => {
  renderIndicator(index + 1);

  questions.dataset.currentStep = index;

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

const renderResults = () => {
  let content = '';

  const getClassName = (answer, questionIndex) => {
    let classname = '';

    if (!answer.correct && answer.id === localResults[questionIndex]) {
      classname = 'answer--invalid';
    } else if (answer.correct) {
      classname = 'answer--valid'
    }
    return classname;
  };
  const getAnswers = (questionIndex) => DATA[questionIndex].answers
    .map((answer) => `<li class=${getClassName(answer, questionIndex)}>${answer.value}</li>`)
    .join('');

  DATA.forEach((question, index) => {
    content += `
    <div class="quiz-results-item">
      <div class="quiz-results-item__question">${question.questions}</div>
      <ul class="quiz-results-item__answers">${getAnswers(index)}</ul>
    </div>
    `;
  });

  results.innerHTML = content;
};

const renderIndicator = (currentStep) => {
  indicator.innerHTML = `${currentStep}/${DATA.length}`;
};

quiz.addEventListener('change', (event) => {
  if (event.target.classList.contains('answer-input')) {
    localResults[event.target.name] = event.target.value;
    btnNext.disabled = false;
  };
});

quiz.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-next')) {
    const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;

    if (DATA.length === nextQuestionIndex) {
      questions.classList.add('question--hidden');
      indicator.classList.add('indicator--hidden');
      results.classList.add('results--visible');
      btnNext.classList.add('btn-next--hidden');
      btnRestart.classList.add('btn-restart--visible');
      renderResults();
    } else {
      renderQuestions(nextQuestionIndex);
    }

    btnNext.disabled = true;
  };
  if (event.target.classList.contains('btn-restart')) {
    localResults = {};
    results.innerHTML = '';

    questions.classList.remove('question--hidden');
    indicator.classList.remove('indicator--hidden');
    results.classList.remove('results--visible');
    btnNext.classList.remove('btn-next--hidden');
    btnRestart.classList.remove('btn-restart--visible');

    renderQuestions(0);
  };
});

renderQuestions(0);