(function () {
    'use strict';
    //Quiz application
    //An array of questions and answers
    var questions = [
        ['what is HTML?', 'programing langua', 'coding', 'game', 'hyper text markup language', ],
        ['which one is a racing game?', 'need for speed', 'fifa_13', 'super_mario', 'hangman', ],
        ['what is java?', 'prog language', 'markup', 'song', 'class', ],
        ['who is a comedian?', 'Trevor Noah', 'Shakira', 'Shaka', 'Neo']
      ],
      count = 3,
      isArray,
      quizElement = document.getElementById('quiz'),
      nextElement = quizElement.querySelector('button.next'),
      previousElement = quizElement.querySelector('button.previous'),
      resetElement = quizElement.querySelector('button.reset');
  
    isArray = Array.isArray || function (obj) {
      return !!obj && typeof obj === 'object' && typeof obj.length === 'number' && Object.prototype.toString.call(obj) === '[object Array]';
    };
  
    //prints out question and answers
    function print(message) {
      var outputDiv = quizElement.querySelector('.question-box');
      outputDiv.innerHTML = message;
    }
  
    function printQuestion(index) {
      if (typeof index !== 'number' || index < 0 || index >= questions.length) {
        console.error('It is not a valid question!');
        return false;
      }
      var question = questions[index],
        html = '<div class="question"><h3>' + question[0] + '</h3><p><ol>',
        i = 1,
        len = question.length;
  
      for (; i < len; i += 1) {
        html += '<li><input type="radio" name="question-' + index + '" value="' + i + '" />' + question[i] + '</li>';
      }
      html += '</ol></p></div>';
      print(html);
    }
  
    function randomQuestionIndex(chosen) {
      if (!isArray(chosen)) {
        chosen = [];
      }
      if (count === chosen.length) {
        return chosen;
      }
      var randomIndex = Math.floor(Math.random() * questions.length);
      if (-1 === chosen.indexOf(randomIndex)) {
        chosen.push(randomIndex);
      }
      return randomQuestionIndex(chosen);
    }
  
    var currrentIndex,
      currrentList;
  
    function buttons() {
      if (currrentIndex === 0) {
        previousElement.setAttribute('disabled', true);
      } else {
        previousElement.removeAttribute('disabled');
      }
  
      if (currrentIndex === count - 1) {
        nextElement.setAttribute('disabled', true);
      } else {
        nextElement.removeAttribute('disabled');
      }
    }
  
    function next() {
      if (currrentIndex < count - 1) {
        currrentIndex++;
        printQuestion(currrentList[currrentIndex]);
        buttons();
      }
    }
  
    function previous() {
      if (currrentIndex > 0) {
        currrentIndex--;
        printQuestion(currrentList[currrentIndex]);
        buttons();
      }
    }
  
    function start() {
      currrentIndex = -1;
      currrentList = randomQuestionIndex();
      next();
    }
  
    start();
  
    nextElement.addEventListener('click', next);
    previousElement.addEventListener('click', previous);
    resetElement.addEventListener('click', start);
  }());