


function Quiz(questions) {
    console.log("in quiz")
    console.log(questions.length)
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
    
}

Quiz.prototype.guess = function(answer) {
    if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};


var QuizUI = {

    displayStart: function() {

        console.log("in displayStart");

       try {
                this.startHandler("start");
            }           
        catch(err) {
                
                QuizUI.displayNext();
            }
                 
        

    },


    displayNext: function () {

        console.log("in displayNext");
        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function() {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

        for(var i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
        }
    },
    displayScore: function() {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2> Your score is: " + quiz.score + "</h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },
    
    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },

    startHandler: function(id) {
        var button = document.getElementById(id);
        
        if (button == null){

            QuizUI.displayNext();
            
            } else {

             button.onclick = function() {
            
               Start();

             }
            
            
        }
        
    },
    
    displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
    }
};


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};


var allQuestions = new Array()
var newquestions = new Array()
var questions = new Array()
var quiz

 var jsonPromise = $.getJSON('questions.json',function(data){
        
        console.log('json loaded successfully');
        console.log(data)
        allQuestions = data.questions   
        
        console.log(allQuestions[0].question)
        console.log(allQuestions[0].a)
        console.log(allQuestions[0].correct)
   
        allQuestions.forEach(function(element) {
        console.log(element);
        questions.push(new Question(element.question, [ element.a, element.b, element.c, element.d ], element.correct))
        
        
});
      

    }).error(function(){
        console.log('error: json not loaded');
    })





function Start() {

  

 window.location.href = '/quiz.html';
 QuizUI.displayNext();
 
 

 

}


jsonPromise.done(function(data) {
    // success
    questions.forEach(function(element) {

        console.log(element);


    });

    quiz = new Quiz(questions);
    QuizUI.displayStart();
    
});

jsonPromise.fail(function(reason) {
    // it failed... handle it
});

// other stuff ....

jsonPromise.then(function(data) {
    // do moar stuff with data
    // will perhaps fire instantly, since the deferred may already be resolved.

    
});


