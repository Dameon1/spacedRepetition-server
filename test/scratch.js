
'use strict';
let router;
let something;
let index;
let User;
let answeredQuestion;
let userAnswer;
let user;
let answeredQuestionIndex;

router.post('/?register', (req, res, next)=>{





  something
    .then(({user,questions}) => {
      user.questions = questions.map((question,index)=>({
        question: question.question,
        memoryStrength: 1,
        next: index === question.length-1? null : index+1

      }));
    });
});

router.get('/next',(req, res, next) =>{
  something
    .then(user => res.json(user.questions[user.head]));});


/**
 * save the value of the current head
 * save the node that you just answered
 * finde the location of the answered node based on mValue
 * 
 * change the current head to whoever answered node's next
 * pointer is addressed to 
 * 
 * find the insertion point
 * insert the node by changeing the next pointer
 */

router .post('/answer', (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      const answeredQuestionIndex = user.head;
      const answeredQuestion = user.questions[answeredQuestionIndex];
      if (userAnswer === 'correct'){
        //set the mValue for answeredQuestion.mValue;

      } else {
        //set the mValue for answeredQuestion.mValue;
      }
    });
  //change the current head to the index of the answered node
  user.head =answeredQuestion.next;
});

//Find the insertion point
let currentQuestion = answeredQuestion;
for (let i = 0; i < answeredQuestion.mValue; i++) {
  const nextIndex =currentQuestion.next;
  currentQuestion = user.questions[nextIndex];
}

//insert the node
answeredQuestion.next = currentQuestion.nextcurrentQuestion.next = answeredQuestionIndex;
return user.save();

  