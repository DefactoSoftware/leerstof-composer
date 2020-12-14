$(function () {

  var focused_li = $();

  nav = function () {
    const nav = ["index", "list", "quote", "video", "poll"];

    $.each(nav, function (index, value) {
      $(".nav").append("<a href='" + value + ".html' class='" + value + "'>" + value + "</a>")
      if (~window.location.pathname.indexOf(value)) {
        $("." + value).addClass("active");
      } else if (window.location.pathname === "/") {
        $(".index").addClass("active");
      }
    });
  }

  build_theme_switcher = function (themecount) {
    for (var theme = 1; theme <= themecount; theme++) {
      $(".themes").append("<span class='theme-" + theme + "'><span class='element emphasis'></span><span class='element text'></span><span class='element background'></span></span>")
    }
  }

  $(".themes").on("click", "span", function () {
    $("body").prop("class", this.classList);
    doc_change(true);
  });

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

    $("<li>").prop("contenteditable", true).insertAfter(focused_li).focus();
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

  doc_change = function (bool) {
    $(".save").prop("disabled", !bool);
  }

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

  $(document).on("input", function () {
    doc_change(true);
  });

  document.onselectionchange = () => {
    var sel = window.getSelection().getRangeAt(0);

    if (sel.startOffset != sel.endOffset) {
      $(".text-style button").each(function () {
        $(this).prop("disabled", false);
      });
    } else {
      $(".text-style button").each(function () {
        $(this).prop("disabled", true);
      });
    }
  };

  $(".save").on("click", function () {
    doc_change(false);
  });

  $("ol, ul").on("keydown click", function (e) {
    if ($(document.activeElement).is("li")) {
      focused_li = $(document.activeElement)
    }

    if (e.keyCode === 13) { // return
      add_item(focused_li, e);
    }

    if (e.keyCode === 38) { // up
      prev_item(focused_li, e);
    }

    if (e.keyCode === 40) { // down
      next_item(focused_li, e);
    }

    if (e.keyCode === 8) { // backspace
      remove_item(focused_li, e);
    }
  });

  $(document).on("click", ".qa > span:not(.active)", function () {
    $(".content").toggleClass("question-screen answers-screen");
    $(".qa > span").each(function () {
      $(this).toggleClass("active");
    });
  });

  $(document).on("click", ".buttons .correct", function (e) {
    if (focused_li.hasClass("correct")) {
      focused_li.removeClass("correct");
      $(this).removeClass("active");
    } else {
      $("li.correct").removeClass("correct");
      focused_li.addClass("correct");
      $(this).addClass("active");
    }
  });

  $(document).on("focus", ".answers li", function () {
    if ($(this).hasClass("correct")) {
      console.log("clicked correct li");
      $("button.correct").addClass("active");
    } else {
      console.log("clicked not correct li");
      $("button.correct").removeClass("active");
    }
  })

  $(document).on("blur", ".question li.correct", function () {
    $("button.correct").removeClass("active");
  })

  set_video_url = function () {
    let yt_id = prompt('Enter Youtube ID');

    if (!yt_id) {
      yt_id = "TxBj8R7XKe4";
    }

    $("iframe").prop("src", "https://www.youtube.com/embed/" + yt_id + "?autoplay=1&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0");
  }

  nav();
  build_theme_switcher(3);

  $(".text-style button").each(function () {
    $(this).prop("disabled", true);
  });

  $(".logo, .logo-sm").append(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256.73 45.81"><polygon points="9.28 1.21 0 1.21 0 44.6 22.8 44.6 22.8 35.05 9.28 35.05 9.28 1.21"/><polygon points="25.16 44.6 49.85 44.6 49.85 35.05 36.44 35.05 36.44 27.57 49.1 27.57 49.1 18.01 36.44 18.01 36.44 10.76 49.85 10.76 49.85 1.21 25.16 1.21 25.16 44.6"/><polygon points="54.51 44.6 79.2 44.6 79.2 35.05 65.79 35.05 65.79 27.57 78.45 27.57 78.45 18.01 65.79 18.01 65.79 10.76 79.2 10.76 79.2 1.21 54.51 1.21 54.51 44.6"/><path d="M113.35,22.65a12.7,12.7,0,0,0,2.39-8,15,15,0,0,0-.89-5.18,12.38,12.38,0,0,0-2.65-4.26,12.17,12.17,0,0,0-4.46-2.91,17.2,17.2,0,0,0-6.33-1.06H83.86V44.6H95.14V27.91L105.9,44.6h14L106.3,26.82A12,12,0,0,0,113.35,22.65Zm-11-3.43a8.23,8.23,0,0,1-5.12,1.38H95.14V9.9h2.13a8.23,8.23,0,0,1,5.12,1.38,4.71,4.71,0,0,1,1.78,4A4.71,4.71,0,0,1,102.39,19.22Z"/><path d="M140.66,18.13q-1.38-.46-2.79-.87a14.06,14.06,0,0,1-2.53-1A5.92,5.92,0,0,1,133.52,15a2.69,2.69,0,0,1-.69-1.9,3.22,3.22,0,0,1,1.38-2.7,5.82,5.82,0,0,1,3.57-1,9.8,9.8,0,0,1,3.57.72A13.88,13.88,0,0,1,145,12.32l4.49-8.81A30,30,0,0,0,142.79.89,27.58,27.58,0,0,0,136.06,0a17.85,17.85,0,0,0-6.25,1,13.47,13.47,0,0,0-4.72,2.9,13.14,13.14,0,0,0-3,4.49A15.38,15.38,0,0,0,121,14.27a12.29,12.29,0,0,0,1,5.32,10.26,10.26,0,0,0,2.65,3.49,13.3,13.3,0,0,0,3.74,2.21q2.1.84,4.29,1.53c1.23.42,2.27.8,3.13,1.15A9.13,9.13,0,0,1,138,29.09a3.71,3.71,0,0,1,1.15,1.32,3.91,3.91,0,0,1,.34,1.7A3.85,3.85,0,0,1,138.1,35,5.85,5.85,0,0,1,134,36.25a12,12,0,0,1-4.89-1.09,19.38,19.38,0,0,1-5-3.34l-4.84,9.1a26.16,26.16,0,0,0,15.25,4.89,22,22,0,0,0,7.11-1.07,15.06,15.06,0,0,0,5.29-3,12.47,12.47,0,0,0,3.28-4.63,15.59,15.59,0,0,0,1.13-6,12.18,12.18,0,0,0-2.56-8Q146.19,20,140.66,18.13Z"/><polygon points="180.94 1.21 155.93 1.21 151.13 10.76 160.4 10.76 160.4 44.6 171.68 44.6 171.68 10.76 180.94 10.76 180.94 1.21"/><path d="M221.43,6.62a22.86,22.86,0,0,0-7.63-4.86,27.5,27.5,0,0,0-19.36,0,22.42,22.42,0,0,0-14.3,21.14,22.34,22.34,0,0,0,14.3,21.15,27.5,27.5,0,0,0,19.36,0,22.86,22.86,0,0,0,7.63-4.86,22.26,22.26,0,0,0,5-7.28,22.81,22.81,0,0,0,1.78-9,22.8,22.8,0,0,0-1.78-9A22.26,22.26,0,0,0,221.43,6.62Zm-6,21.06a11.88,11.88,0,0,1-2.67,3.8,12.69,12.69,0,0,1-13.3,2.5,12,12,0,0,1-3.88-2.5,12.31,12.31,0,0,1-2.65-3.8,12.12,12.12,0,0,1,0-9.55,12.19,12.19,0,0,1,2.65-3.8,12,12,0,0,1,3.88-2.5,12.56,12.56,0,0,1,13.3,2.5,11.77,11.77,0,0,1,2.67,3.8,11.44,11.44,0,0,1,1,4.77A11.45,11.45,0,0,1,215.41,27.68Z"/><polygon points="256.73 10.76 256.73 1.21 231.87 1.21 231.87 44.6 243.15 44.6 243.15 27.57 255.53 27.57 255.53 18.01 243.15 18.01 243.15 10.76 256.73 10.76"/></svg>`);
  $(".next_btn").append(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 44 44"><path d="M0,0v44h44V0H0z M25.3,33.7V26H8v-8h17.3v-7.7L38,22L25.3,33.7z"/></svg>`);
  $(".next_indicator").append(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 23.4"><path d="M17.3,23.4V15.7H0v-8H17.3V0L30,11.7Z"/></svg>`);

});
