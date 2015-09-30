var essay = document.getElementById('essay');
var textarea = document.getElementById('what');
var stop = document.getElementById('stop');
var instruct = document.getElementById('instruct');
var form = document.getElementsByTagName('form')[0];
var pause = false;
var input = "";

textarea.addEventListener('change', function() {
   form.submit();
   input = getInput();
   essay.innerHTML += "input";
}, false);
essay.innerHTML += "input";

function getInput() { //Returns input from the event
  var what = location.search;
  what = what.replace('?what=', '');
  what = what.replace(/\+/g, ' ');
  what = decodeURIComponent(what);
  return what;
}
