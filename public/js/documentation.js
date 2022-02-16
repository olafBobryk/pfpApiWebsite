let copyNot = document.getElementById("copied");

function copy(span){
    var copyText = span.textContent.replace('✁','');
    var textArea = document.createElement("textarea");
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    copyNot.style.opacity = 1;
}

function changeOp(){
  copyNot.style.opacity = 0;
}