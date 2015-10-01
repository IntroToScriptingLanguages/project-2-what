var essay = document.getElementById('essay');
var textarea = document.getElementById('what');
var text = "";
var stop = document.getElementById('stop');
var instruct = document.getElementById('instruct');
var form = document.getElementsByTagName('form')[0];
var pause = false;
var temp_int; //Used for randomizing

var mode = 'start'; //Our mode!
var fragment = false; //If we're in a sentence fragment after a preposition.
var paragraph = 4; //How many sentences per paragraph
var sentence = 1; //The sentence we're on.  Once we hit paragraph at the end of sentence we move onto another paragraph.

//All the words the AI will use:

var noun = ['cat', 'dog', 'car', 'house', 'tree', 'ball', 'water', 'plane', 'nurse', 'star',
            'dragon', 'stapler', 'pencil', 'book', 'computer', 'mouse', 'tail', 'light', 'chair', 'gun',
            'Charmander', 'Bulbasaur', 'Squirtle', 'file', 'leaf', 'orange', 'apple', 'banana', 'potato', 'sword',
            'desk', 'ocean', 'movie', 'tower', 'farm', 'painting', 'bar', 'TV', 'radio', 'doctor'
            'lawyer', 'teacher', 'cloud', 'mountain', 'thunderstorm', 'refrigerator', 'raindrop', 'pillow', 'spider', 'actor']; //50 elements

var verb_object = ['climbed up', 'crawled to', 'ate', 'stabbed', 'looked at', 'bit', 'entered', 'drove', 'fell in love with', 'broke',
            'found', 'landed on', 'wore', 'taught', 'read to', 'wrote on', 'drew on', 'discovered', 'played with', 'escaped from',
            'visited', 'met', 'repaired', 'sang to', 'lost']; //25 elements, returns a verb with an object

var verb_none = ['cried', 'fell', 'crashed', 'slept', 'woke up', 'died', 'was created', 'screamed']; //8 elements, no object after

var verb_adj = ['was', 'became', 'grew', 'turned', 'felt'
]; //5 elements, verbs that end in adjective

var adjective = [ 'red', 'blue', 'sad', 'happy', 'hot', 'cold', 'fat', 'green', 'angry', 'steamy',
'bored', 'angry', 'high', 'low', 'flat', 'dry', 'hilarious', 'stupid', 'stormy', 'watery',
'fierce', 'sharp', 'dull', 'bright', 'dark', 'invisible', 'violent', 'evil', 'good', 'kind',
'brutal', 'easy', 'hard', 'elegant', 'beautiful', 'timid', 'massive', 'mutated', 'small', 'big'
]; //40 elements, describes things

var conjunction = [ 'for', 'and', 'nor', 'but', 'or', 'yet', 'so', 'while', 'if', 'therefore'
] //10 elements, connects two sentences, put comma before

var preposition = [ 'about', 'at', 'besides', 'for', 'onto', 'to', 'with', 'before', 'during', 'like',
'from', 'between', 'under', 'without', 'until', 'on', 'against', 'opposite', 'toward', 'after'
] //20 elements, connects with another noun

var transition = [ 'first', 'alternatively', 'furthermore', 'finally', 'as a matter of fact', 'for example', 'what is more', 'additionally', 'particularly', 'similarly',
'namely', 'to put it in another way', 'specifically', 'but', 'however', 'nevertheless', 'though', 'either way', 'at least', 'at most',
'consequently', 'if so', 'under those circumstances', 'eventually', 'previously', 'in conclusion', 'inevitably', 'therefore', 'regardless', 'surprisingly'
] //30 elements, begin sentences with these

textarea.addEventListener('change', function() {
  text = getText();
  if (mode != 'start' || text == 'start' || text == 'Start')
  {
      printText();
      changeMode();
      AIType();
      changeMode();
      playerType();
  }

}, false);

function AIType(){ //The AI will choose the next word of the sentence, based on the mode, AI turn
   switch (mode) { //These are all the possible "modes"
       case 'subject': //Choose a noun, slap it here!
          text = noun[randomInt(49)];
          break;
       case 'verb_obj': //Choose a verb with an object
            text = verb_object[randomInt(24)];
            break;
       case 'verb_none': //Choose a verb with nothing at the end
            text = verb_none[randomInt(7)];
            break;
       case 'verb_adj': //Choose a verb with an adjective
            text = verb_adj[randomInt(4)];
            break;
       case 'object': //Choose a noun, slap it here!
             text = noun[randomInt(49)];
             break;
       case 'adjective': //Choose an adjective
             text = adjective[randomInt(39)];
             break;
       case 'possessive': //Choose a noun to describe another noun!
             text = noun[randomInt(49)];
             break;
       case 'preposition': //Choose a preposition
             text = preposition[randomInt(19)];
             break;
       case 'conjunction': //Choose a conjunction
             text = conjunction[randomInt(9)];
             break;
       case 'transition': //Choose a transition
             text = transition[randomInt(29)];
             break;
       case 'desc_adjective': //Choose an adjective that describes the subject
             text = adjective[randomInt(39)];
             break;
   }
   printText();
}

function changeMode(){ //Changes the mode based on the current one.  Also handles punctuation.
  switch (mode) { //These are all the possible "modes"
      case 'start': //Start with the subject!
           mode = 'subject';
           break;
      case 'subject': //75% object verb, 15% adjective verb, 10% nothing verb.  If preposition, 50% object verb, 50% nothing verb.
           temp_int = randomInt(99);
           if (fragment == false)
           {
             if (temp_int < 75)
             {
                mode = 'verb_obj';
             }
             else if (temp_int < 90)
             {
                mode = 'verb_adj';
             }
             else {
                mode = 'verb_none';
             }
           }
           else
           {
             if (temp_int < 50)
             {
                mode = 'verb_obj';
             }
             else {
                mode = 'verb_none';
             }
           }
           break;
      case 'verb_obj': //30% adjective, 30% possessive, 40% object.  If a preposition, end the sentence.
            temp_int = randomInt(99);
            if (fragment == false)
            {
              if (temp_int < 30)
              {
                 mode = 'adjective';
              }
              else if (temp_int < 60)
                 mode = 'possessive';
              else {
                 mode = 'object';
              }
            }
            else {
              endSentence();
              fragment = false;
            }
           break;
      case 'verb_none': //40% end sentence, 30% preposition, 30% conjunction.  If a preposition, end sentence
            temp_int = randomInt(99);
            if (fragment == false)
            {
              if (temp_int < 40)
              {
                 endSentence();
              }
              else if (temp_int < 70)
                 mode = 'preposition';
              else {
                 mode = 'conjunction';
              }
            }
            else {
              endSentence();
              fragment = false;
            }
           break;
      case 'verb_adj': //100% desc_adjective;
           mode = 'desc_adjective';
           break;
      case 'object': //40% end sentence, 30% preposition, 30% conjunction.  If a preposition, end sentence
            temp_int = randomInt(99);
            if (temp_int < 40)
            {
               endSentence();
            }
            else if (temp_int < 70)
               mode = 'preposition';
            else {
               mode = 'conjunction';
            }
            break;
      case 'adjective': //70% object, 30% adjective
            temp_int = randomInt(99);
            if (temp_int < 70)
            {
               mode = 'object';
            }
            else {
               mode = 'adjective';
            }
            break;
      case 'possessive': //70% object, 30% adjective
            temp_int = randomInt(99);
            if (temp_int < 70)
            {
               mode = 'object';
            }
            else {
               mode = 'adjective';
            }
            break;
      case 'preposition': //Set fragment to true.  100% subject
            mode = 'subject';
            fragment = true;
            break;
      case 'conjunction': //100% subject
            mode = 'subject';
            break;
      case 'transition': //100% subject
            mode = 'subject';
            break;
      case 'desc_adjective': //60% end sentence, 40% conjunction.  If a preposition, end sentence
            temp_int = randomInt(99);
            if (temp_int < 60)
            {
               endSentence();
            }
            else {
               mode = 'conjunction';
            }
            break;
  }
  console.log(mode);
}

function printText(){ //Prints the text in "Text", adding it to the essay
  if (mode == 'conjunction')
     essay.innerHTML += ", " + text;
  else if (mode == 'possessive')
     essay.innerHTML += " " + text + "'s";
  else if (mode == 'transition')
     essay.innerHTML += " " + text + ",";
  else
     essay.innerHTML += " " + text;
}

function playerType(){ //Changes the instructions under 'instruct', based on the current mode, player's turn


}

function randomInt(num){ //Returns a random integer from 0 to num (inclusive)
  return Math.floor((Math.random() * num)) + 1;
}

function endSentence(){ //Ends the current sentence

}

function getText() { //Gets the text from the textarea
  var text_to_get = textarea.value;
  textarea.value = "";
  return text_to_get;
}
