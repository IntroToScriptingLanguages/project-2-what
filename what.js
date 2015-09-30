var essay = document.getElementById('essay');
var textarea = document.getElementById('what');
var text = "";
var stop = document.getElementById('stop');
var instruct = document.getElementById('instruct');
var form = document.getElementsByTagName('form')[0];
var pause = false;
var mode = 'start';

//All the words the AI will use to build the sentence!

textarea.addEventListener('change', function() {
  if (mode != 'start')
  {
      text = getText();
      essay.innerHTML = essay.innerHTML + " " + text;
  }

  getNextPlan();
}, false);

function getNextPlan(){ //The AI will choose the next word of the sentence and what you should type, based on the mode.

}



function getText() { //Gets the text from the textarea
  var text_to_get = textarea.value;
  textarea.value = "";
  return text_to_get;
}
