



var addquestions = new Array();
var newaddquestions = new Array();
var qcount = 0;
var qjsonPromise;



function NewQuestions() {
 
 
    window.location.href = '/addquestions.html';
   
    
   }


function MainPage() {

    window.location.href = '/index.html';


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
    
      MainPage();
  
}


function getQuestions() { qjsonPromise = $.getJSON(qloc + 'questions.json',function(data){
    
    
   
    console.log(data)
    newaddquestions = data;
    console.log(newaddquestions)
    console.log(newaddquestions.questions.length)
  
}).error(function(){
    console.log('error: json not loaded');
})

qjsonPromise.done(function(data) {

console.log("Questions done")

console.log (qcount)
document.getElementById('total').innerHTML = "Total Questions: " + newaddquestions.questions.length
    

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
       
               
        SendQuestions(newaddquestions);

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
        console.log(element[0].name)
        console.log(newaddquestions.questions.length)

        element.question, [ element.a, element.b, element.c, element.d ], element.correct
        var obj = new Object();
        obj.topic = element[0].value;
        obj.question  = element[1].value;
        obj.correct = element[2].value;
        obj.a = element[3].value;
        obj.b = element[4].value;
        obj.c = element[5].value;
        obj.d = element[6].value;
        
        var jsonString= JSON.stringify(obj);    

        newaddquestions.questions.push(obj)
        console.log(newaddquestions.questions.length)
        console.log(newaddquestions)
        qcount++

        document.getElementById('added').innerHTML = qcount + " Questions Added"
        document.getElementById('total').innerHTML = "Total Questions: " + newaddquestions.questions.length

        // clear form

        $("#nq")[0].reset();
        
}