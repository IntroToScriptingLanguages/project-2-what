var essay = document.getElementById('essay');
var textarea = document.getElementById('what');
var text = "";
var stop = document.getElementById('stop');
var instruct = document.getElementById('instruct');
var form = document.getElementsByTagName('form')[0];
var pause = false;

textarea.addEventListener('change', function() {
   text = getText();
   essay.innerHTML = essay.innerHTML + text;
   console.log(text);
}, false);


function getText() { //Gets the text from the textarea
  var text_to_get = textarea.value;
  textarea.value = "";
  return text_to_get;
}
