// some standard initializations; don't mess with these

var counter = 0,
    score = 0;

var content = [{
  "name": "האם הוריך, או הורי הוריך, החזיקו באזרחות פולנית לאחר 19.01.1951?",
  "yes": "congrats",
  "no": "next"
}, {
  "name": "האם הוריך, או הורי הוריך, החזיקו אי פעם  באזרחות פולנית?",
  "yes": "next",
  "no": "condol"
}, {
  "name": "האם בעל האזרחות התגורר בפולין לאחר 20.1.1920?",
  "yes": "next",
  "no": "next"
}, {
  "name": "האם בעל האזרחות עזב את פולין לפני 19.01.1951?",
  "yes": "congrats",
  "no": "next"
}, {
  "name": "האם בעל האזרחות שירת בצבא הישראלי, או בכל צבא שאינו פולני, לפני 19.01.1951?",
  "yes": "next"
}, {
  "name": "האם בעל האזרחות עבד בשירות המדינה (כולל תפקידים בעלי משרה ציבורית, כגון דוור)  לפני 19.01.1951?",
  "yes": "next"
}, {
  "name": "במקרה שבעל האזרחות הפולנית קיבל אזרחות ישראלית או אזרחות אחרת שאינה פולנית לפני 19.01.1951, האן היה מעל גיל 50 בזמן קבלת האזרחות האחרת? ",
  "yes": "next"
}, {
  "name": "האם בעלת האזרחות התחתנה עם אזרח שאינו פולני לפני 19.01.1951?",
  "yes": "next"
}, {
  "name": "במקרה שבעלה של בעלת האזרחות היה אזרח פולני, האם איבד את אזרחותו לפני 19.01.1951?",
  "yes": "congrats"
}, {
  "name": "האם בנו או בתו של בעל האזרחות היו מעל גיל 18 בזמן התרחשות המקרים המתוארים לעיל?",
  "yes": "congrats",
  "no": "condol"
}];

// Start

var $name = $('.name'),
    $generate = $('.generate'),
    $result = $('.results'),
    $score = $('.score'),
    $thanks = $('.thanks'),
    $home = $('.home'),
    $options = $('.options'),
    $congrats = $('.congrats'),
    $condol = $('.condol'),
    $nextq = $('.nextq');

var trekApp = {};

// intializing the trekapp:

trekApp.init = function() {
  var selection = content[counter];
  yes = selection["yes"];
  no = selection["no"];
  $name.html(selection["name"]);
  $generate.hide();
  $result.hide();
  $score.hide();
  $thanks.hide();
  $home.hide();
  $congrats.hide();
  $condol.hide();
  $nextq.hide();
}

// the function for moving through the quiz

trekApp.generate = function() {

  // if there are still questions remaining, show the next one
  
  if (score < 5) {
    var selection = content[counter];
    $name.html(selection["name"]);
    yes = selection["yes"]; 
    no = selection["no"];

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
  console.log(chosenAnswer)
  $result.show();
  $score.show();
  $name.hide();
  $options.hide();

  // setting up "full sentence" values for each type -- add else if statements if you have more than two possibilities
  
  if (yes == "congrats") {
    score += 100;
    $congrats.show();
  }
  else{
    score += 1;
    $nextq.show
  }
   
  // tell the user whether they're right or wrong, and add a point to the score if they're right

  if (chosenAnswer == yes) {
    $result.html("<span class='right'>מצויין</span>  ");
    score++;
  } else {
    $result.html("<span class='wrong'>לצערי</span> ");
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
