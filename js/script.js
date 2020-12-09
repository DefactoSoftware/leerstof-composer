$(function () {
  save = function () {
    html2canvas(document.querySelector("#container")).then(canvas => {
      canvas.toBlob(function (blob) {
        let filename = prompt('Enter file name');

        if (!filename) {
          filename = "untitled";
        }

        saveAs(blob, filename + ".png");
      });
    });
  };

  add_item = function (focused_li, e) {
    e.preventDefault();
    e.stopPropagation();

    $("<li>").addClass("li").prop("contenteditable", true).insertAfter(focused_li).focus();
  };

  remove_item = function (focused_li, e) {
    e.stopPropagation();
    focused_li.find("br:last-child").remove();

    if (focused_li.is(':empty') && $("li").length > 1) {
      if (prev_item(focused_li, e) != false) {
        focused_li.remove();
      } else if (!next_item(focused_li, e) != false) {
        focused_li.remove();
      }
    }
  };

  prev_item = function (focused_li, e) {
    e.preventDefault();
    if (focused_li.prev().length) {
      focused_li.prev().focus();
    } else {
      return false;
    }
  };

  next_item = function (focused_li, e) {
    e.preventDefault();
    if (focused_li.next().length) {
      focused_li.next().focus();
    } else {
      return false;
    }
  };

  $(".list").on("keydown", function (e) {
    var focused_li = document.activeElement;

    if (e.keyCode === 13) { // return
      add_item($(focused_li), e);
    }

    if (e.keyCode === 38) { // up
      prev_item($(focused_li), e);
    }

    if (e.keyCode === 40) { // down
      next_item($(focused_li), e);
    }

    if (e.keyCode === 8) { // backspace
      remove_item($(focused_li), e);
    }
  });
});
