// some standard initializations; don't mess with these

var counter = 0,
    score = 0;

// your quiz data should go into this variable in object form -- one object per item. sample format below:

/* 

{
  "name": "Nomad's Dream",
  "type": "trek"
}

*/

var content = [{"name":"עצמאות פולנית","answer":"yes"},{"name":"אחד מבני המשפחה הוא יליד פולין אחרי 99","answer":"no"},
               {"name":"אני חושב שכן","answer":"yes"},{"האם אתה אישה?":"Dangerous Liasion","answer":"no"},{"name":"למהלא?","answer":"yes"}];

// assigning the commonly accessed dom elements to variables

var $name = $('.name'),
    $generate = $('.generate'),
    $result = $('.results'),
    $score = $('.score'),
    $thanks = $('.thanks'),
    $options = $('.options');

var trekApp = {};

// the initial state of the quiz:
// starts off by showing the "name" value in the first item in the data object
// hides the 'next' button, results, score and 'thanks for playing' html as a default

trekApp.init = function() {
  var selection = content[counter];
  type = selection["answer"];
  $name.html(selection["name"]);
  $generate.hide();
  $result.hide();
  $score.hide();
  $thanks.hide();
}

// the function for moving through the quiz

trekApp.generate = function() {

  // if there are still questions remaining, show the next one
  
  if (counter < content.length) {
    var selection = content[counter];
    $name.html(selection["name"]);
    type = selection["answer"];  

    $result.hide();
    $score.hide();
    $name.show();
    $options.show();

  // if there are no more questions, thank the user for playing and give the option to tweet the score
  
  } else {
    $thanks.show().append("ענית על  " + score + "תשובות שמקנות לך את הזכות לדרכון");
  }

  $generate.hide();
}

// the event handler that determines whether the user's selection was right

$('.choice').click(function(e) {
  var chosenAnswer = e.target.id;  
  $result.show();
  $score.show();
  $name.hide();
  $options.hide();
  console.log(chosenAnswer)

  // setting up "full sentence" values for each type -- add else if statements if you have more than two possibilities
  
  if (type == "yes") {
    fullAnswer = "ברכותיי אתה זכאי";
  } else {
    fullAnswer = "בוא נשאל עוד מספר שאלות";
  }
   
  // tell the user whether they're right or wrong, and add a point to the score if they're right

  if (chosenAnswer == type) {
    $result.html("<span class='right'>מצויין</span>  " + fullAnswer + ".");
    score++;
  } else {
    $result.html("<span class='wrong'>לצערי</span> " + fullAnswer + ".");
  }
  counter++;
  $score.html("You're " + score + " for " + counter + ".");
  $generate.show();
  
});

$(document).ready(function() {
  trekApp.init();
});

$generate.on('click', function() {
  trekApp.generate();
});
