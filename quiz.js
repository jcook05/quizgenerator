


function Quiz(questions, callback) {
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

var QuizUI;

function NewQuizUI(currentquiz) {
    
    delete QuizUI;
    QuizUI = {

    displayStart: function(currentquiz) {

        console.log("in displayStart");

       try {
                this.startHandler("start", currentquiz);
                this.ec2Handler("ec2", currentquiz);
            }           
        catch(err) {
                
                QuizUI.displayNext(currentquiz);
            }    
    },


    displayNext: function (currentquiz) {

        console.log("in displayNext");
        if (currentquiz.hasEnded()) {
            this.displayScore(currentquiz);
        } else {
            this.displayQuestion(currentquiz);
            this.displayChoices(currentquiz);
            this.displayProgress(currentquiz);
        }
    },
    displayQuestion: function(currentquiz) {
        this.populateIdWithHTML("question", currentquiz.getCurrentQuestion().text);
    },
    displayChoices: function(currentquiz) {
        var choices = currentquiz.getCurrentQuestion().choices;

        for(var i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i], currentquiz);
        }
    },
    displayScore: function(currentquiz) {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2> Your score is: " + currentquiz.score + "</h2>";
        this.populateIdWithHTML("quiz", gameOverHTML);
    },
    
    populateIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess, currentquiz) {
        var button = document.getElementById(id);
        button.onclick = function() {
            currentquiz.guess(guess);
            QuizUI.displayNext(currentquiz);
        }
    },

    startHandler: function(id, currentquiz) {
        var button = document.getElementById(id);
        
        if (button == null){

            QuizUI.displayNext(currentquiz);
            
            } else {

             button.onclick = function() {
            
               Start(currentquiz, topic);

             }
            
            
        }
        
    },
    ec2Handler: function(id,curentquiz) {
        var button = document.getElementById(id);
        
        if (button == null){

            QuizUI.displayNext(currentquiz);
            
            } else {

             button.onclick = function() {
            
               Ec2();

             }
            
            
        }
        
    },
    
    displayProgress: function(currentquiz) {
        var currentQuestionNumber = currentquiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + currentquiz.questions.length);
    }

  
};


}

function Question(topic, text, choices, answer) {
    this.topic = topic;
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
var jsonPromise;
var topic;

var quiz

function LoadAllQuestions() {jsonPromise = $.getJSON('questions.json',function(data){
        
        console.log('json loaded successfully');
        console.log(data)
        allQuestions = data.questions   
        
        console.log(allQuestions[0].question)
        console.log(allQuestions[0].a)
        console.log(allQuestions[0].correct)
   
        allQuestions.forEach(function(element) {
        console.log(element);
        questions.push(new Question(element.topic, element.question, [ element.a, element.b, element.c, element.d ], element.correct))
        
        
});
      

    }).error(function(){
        console.log('error: json not loaded');
    })


jsonPromise.done(function(data) {
    // success
    questions.forEach(function(element) {

        console.log(element);


    });

    quiz = new Quiz(questions);
    console.log(quiz)
    topic = "all";
    
});

jsonPromise.fail(function(reason) {
    // it failed... handle it
});

// other stuff ....

jsonPromise.then(function(data) {
    // do moar stuff with data
    // will perhaps fire instantly, since the deferred may already be resolved.
    NewQuizUI(quiz);
    QuizUI.displayStart(quiz);
    
});

}


function Start(currentquiz,topic) {
 
 
 console.log(currentquiz)


 window.location.href = '/quiz.html';

 LoadAllQuestions();

 QuizUI.displayNext(currentquiz);
 
}




//$('ec2').click(function () {
    //callFunction();
  //  console.log("clicked")
//});

function Ec2() {

var ec2questions = new Array();
var ec2quiz;


console.log("in EC2");

QuestionUpdate("EC2",function(result) 
{
       console.log(result)
       ec2questions = result;
});

console.log("returned");


NewQuiz(ec2questions,function(result) 
{
       console.log(result)
       
});




QuizUI.displayStart(ec2quiz)

//window.location.href = '/quiz.html';


//Start(ec2quiz);

//window.location.href = '/quiz.html';


}

function NewQuiz(currentquestions, callback) {

    var newquiz;

    newquiz = new Quiz(currentquestions);

    console.log(newquiz);

    NewQuizUI(newquiz);


    callback(newquiz);


}

function QuestionUpdate(topic, callback)  {

    console.log("In question update")

   // update questions
   var newquestions = new Array();
   questions.forEach(function(element) {
        console.log(element);
        questions.push(new Question(element.question, [ element.a, element.b, element.c, element.d ], element.correct))
        if(element.topic == topic) {

            newquestions.push(element)

        }
        
});

   console.log(newquestions.length)
   callback(newquestions)

}




