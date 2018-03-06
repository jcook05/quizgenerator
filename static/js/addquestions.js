



var addquestions = new Array();
var newaddquestions = new Array();
var qcount = 0;
var qjsonPromise;



function NewQuestions() {
 
 
    window.location.href = '/addquestions.html';
   
    
   }




   function SendQuestions(data) { 
    
    console.log("first questions")
    console.log(data)

    $.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
          data:  JSON.stringify(data),
          dataType: 'json',
          contentType: 'application/json',
	      success: function (response) {
					console.log(response);
	      },
	      error: function () {
	          alert("error");
	      }
	  });
    
  
}


function getQuestions() { qjsonPromise = $.getJSON(qloc + 'questions.json',function(data){
                
    
    currentQuestions = data.questions   
    
    console.log(currentQuestions[0].question)
    console.log(currentQuestions[0].a)
    console.log(currentQuestions[0].correct)

    currentQuestions.forEach(function(element) {
    //console.log(element);
    
    
    addquestions.push(new Question(element.topic, element.question, [ element.a, element.b, element.c, element.d ], element.correct))

    
    
});
  
}).error(function(){
    console.log('error: json not loaded');
})

qjsonPromise.done(function(data) {

console.log("Questions done")
console.log(addquestions.length)
console.log (qcount)
document.getElementById('total').innerHTML = "Total Questions: " + addquestions.length
    

// success
//addquestions.forEach(function(element) {

//    console.log(element);
//});

});

qjsonPromise.fail(function(reason) {
// it failed... handle it
});

// other stuff ....

qjsonPromise.then(function(data) {
// do moar stuff with data
// will perhaps fire instantly, since the deferred may already be resolved.

});

}


function AddNewQuestions() {


    getQuestions();

    console.log("need some functions")
    console.log(qcount)

    

    $('#finish').click(function (event) {
       
               
        SendQuestions(addquestions);

        return false;
            
        })

    $('#save').click(function (event) {
       
        var serializedArr = $("#nq").serializeArray();

        console.log("calling question review")
        console.log(serializedArr)
        
        QuestionReview(serializedArr);

        return false;
            
        })
        
    $('#cancel').click(function () {
        //GenerateQuestions();
        console.log("going back")
        history.go(-1)
        return false;
       
        });    


}


function QuestionReview(element) {

        

        console.log("Modal to review questions and edit or submit")
        console.log(element)
        console.log(addquestions.length)
        addquestions.push(new Question(element.topic, element.question, [ element.a, element.b, element.c, element.d ], element.correct))
        console.log(addquestions.length)
        qcount++

        document.getElementById('added').innerHTML = qcount + " Questions Added"
        document.getElementById('total').innerHTML = "Total Questions: " + addquestions.length

        // clear form

        $("#nq")[0].reset();
        
}