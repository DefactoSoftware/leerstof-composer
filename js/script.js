save = function () {
  html2canvas(document.querySelector("#container")).then(canvas => {
    canvas.toBlob(function (blob) {
      let filename = prompt('Enter file name');
      saveAs(blob, filename + ".png");
    });
  });
};

emphasize = function () {
  document.execCommand('bold');
};

add_item = function (focussed_li) {
  const li = document.createElement("li");
  li.setAttribute("contenteditable", "true");
  li.setAttribute("class", "li");
  insertAfter(li, focussed_li);
  li.focus();
};

insertAfter = function (newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

document.querySelector(".list").addEventListener("keydown", function (e) {
  var focussed_li = document.activeElement;
  if (e.keyCode === 13) {
    e.preventDefault();
    e.stopPropagation();
    add_item(focussed_li);
  }
});
