save = function () {
  html2canvas(document.querySelector("#container")).then(canvas => {
    canvas.toBlob(function (blob) {
      saveAs(blob, "screen.png");
    });
  });
};

emphasize = function () {
  document.execCommand('bold');
};

add_item = function () {
  const li = document.createElement("li");
  li.setAttribute("contenteditable", "true");
  li.setAttribute("class", "li");
  document.querySelector("ul").append(li);
  li.focus();
};

document.querySelector(".list").addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    e.stopPropagation();
    add_item();
  }
});
