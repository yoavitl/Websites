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
  "no": "condol"
}, {
  "name": "האם בעל האזרחות עזב את פולין לפני 19.01.1951?",
  "yes": "next",
  "no": "congrats"
}, {
  "name": "האם בעל האזרחות שירת בצבא הישראלי, או בכל צבא שאינו פולני, לפני 19.01.1951?",
  "yes": "last",
  "no": "next"
}, {
  "name": "האם בעל האזרחות עבד בשירות המדינה (כולל תפקידים בעלי משרה ציבורית, כגון דוור)  לפני 19.01.1951?",
  "yes": "last",
  "no": "next"
}, {
  "name": "במקרה שבעל האזרחות הפולנית קיבל אזרחות ישראלית או אזרחות אחרת שאינה פולנית לפני 19.01.1951, האן היה מעל גיל 50 בזמן קבלת האזרחות האחרת? ",
  "yes": "last",
  "no": "next"
}, {
  "name": "האם בעלת האזרחות התחתנה עם אזרח שאינו פולני לפני 19.01.1951?",
  "yes": "last",
  "no": "next"
}, {
  "name": "במקרה שבעלה של בעלת האזרחות היה אזרח פולני, האם איבד את אזרחותו לפני 19.01.1951?",
  "yes": "last",
  "no": "congrats"
}, {
  "name": "האם בנו או בתו של בעל האזרחות היו מעל גיל 18 בזמן התרחשות המקרים המתוארים לעיל?",
  "yes": "congrats",
  "no": "condol"
}];

// Start

var $name = $('.name'),
    $generate = $('.generate'),
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

    $score.hide();
    $nextq.hide();
    $name.show();
    $options.show();

  // if there are no more questions, thank the user for playing and give the option to tweet the score
  
  } else {
    $thanks.show().append('<a href="index#contact"> להשארת פרטי קשר </a>');
  }

  $generate.hide();
}

// the event handler that determines whether the user's selection was right

$('.choice').click(function(e) {
  var chosenAnswer = e.target.id;  
  $name.hide();
  $options.hide();

  // first of all what to do if yes and if no
  if (chosenAnswer == 'yes') {
    if (yes == "congrats") {
      score += 100;
      $congrats.show();
    }
    else if (yes == "last") {
      score += 1;
      counter = 8; 
      $nextq.show();
      $generate.show();
    }
    else {
      score += 1;
      $nextq.show();
      $generate.show();
    }
  } 
  else {
    if (no == "condol") {
      score += 100;
      $condol.show();
    }
    else if (no == "congrats") {
      score += 100;
      $congrats.show();
    }
  }
  counter++;
  trekApp.generate();
});

$(document).ready(function() {
  trekApp.init();
});

$generate.on('click', function() {
  trekApp.generate();
});
