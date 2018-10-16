var cl = "eng"

$("body").animate({
  scrollTop: 0
}, "fast");
$("#left").animate({
  scrollTop: 0
}, "fast");
$("#right").animate({
  scrollTop: 0
}, "fast");


function ls() {
  if (cl == "eng") {
    $('[data-lang="eng"]').addClass('invis');
    $('[data-lang="kor"]').removeClass('invis');
    cl = "kor";
  } else
  if (cl == "kor") {
    $('[data-lang="kor"]').addClass('invis');
    $('[data-lang="eng"]').removeClass('invis');
    cl = "eng";
  }
}

function invis() {
  for (var i in arguments) {
    $(arguments[i]).addClass('invis');
    $(arguments[i]).removeClass('vis');
  }
}

function vis() {
  for (var i in arguments) {
    $(arguments[i]).addClass('vis');
    $(arguments[i]).removeClass('invis');
  }
}


function deactivated() {
  for (var i in arguments) {
    $(arguments[i]).addClass('deactivated');
    $(arguments[i]).removeClass('activated');
  }
}


function activated() {
  for (var i in arguments) {
    $(arguments[i]).addClass('activated');
    $(arguments[i]).removeClass('deactivated');
  }
}


 
function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

var colorArray = [];
var stateArray = [];
var weight;
var spreadOfColor = "https://spreadsheets.google.com/feeds/cells/10YCAxKOlsjNtjBIt78-JtNzSSvYuqe8EHrBnnkdTLSg/5/public/basic?alt=json-in-script&callback=?";
$.getJSON(spreadOfColor, function(data) {
  SettingEntry = data.feed.entry;

  //사이트 상태
  stateArray[0] = SettingEntry[1].content.$t;
  if (stateArray[0] == "MAINTENANCE") {
    document.write("🚧 The site is under maintenance.")
  } else if (stateArray[0] == "CLOSE") {
    document.write("The site has been removed or closed temporarily.")
  }

  //사이트 컬러
  var wrapper = document.querySelector('#wrapper');
  colorArray[0] = SettingEntry[3].content.$t;
  if (colorArray[0] == "SHEET") {
    $("html body").css({
      "opacity": 1
    })
    colorArray[3] = SettingEntry[8].content.$t;
    colorArray[2] = SettingEntry[12].content.$t;
    colorArray[1] = SettingEntry[16].content.$t;
    wrapper.style.setProperty("--level-3", colorArray[3]);
    wrapper.style.setProperty("--level-2", colorArray[2]);
    wrapper.style.setProperty("--level-1", colorArray[1]);
  } else
  if (colorArray[0] == "DEFAULT") {
    $("html body").css({
      "opacity": 1
    })
    colorArray[3] = "#000";
    colorArray[2] = "#CCC";
    colorArray[1] = "#FFF";
    wrapper.style.setProperty("--level-3", colorArray[3]);
    wrapper.style.setProperty("--level-2", colorArray[2]);
    wrapper.style.setProperty("--level-1", colorArray[1]);
  } else if (colorArray[0] == "RANDOM") {
    colorArray[3] = "#000";
    colorArray[2] = "#CCC";
    // colorArray[1]="transparent";
    wrapper.style.setProperty("--level-3", colorArray[3]);
    wrapper.style.setProperty("--level-2", colorArray[2]);
    // wrapper.style.setProperty("--level-1", colorArray[1]);
    console.log("random");
    transtionArray();
  }

  //사이트 웨이트

  weight = SettingEntry[20].content.$t;
  wrapper.style.setProperty("--weight", weight);


})





var transitionBackground = []
var transitionOrder = 1;
var spreadOfTrans = "https://spreadsheets.google.com/feeds/cells/10YCAxKOlsjNtjBIt78-JtNzSSvYuqe8EHrBnnkdTLSg/6/public/basic?alt=json-in-script&callback=?";
var transitionTime = 5000;
var transitionLength;


function transtionArray() {


  $.getJSON(spreadOfTrans, function(data) {
    var entry = data.feed.entry;
    transitionLength = entry[4].content.$t;
    transitionTime = entry[3].content.$t;
    for (var i = 0; i < transitionLength; i++) {
      transitionBackground[i] = entry[eval(9 + 4 * i)].content.$t;
    }
    shuffle(transitionBackground);
    $("html body").css({
      "opacity": 1
    })
    wrapper.style.setProperty("--level-1", transitionBackground[transitionOrder]);
    setInterval(transitionMotion, transitionTime);
  })


}

function checkNumber() {
  if (transitionOrder == transitionLength - 1) {
    transitionOrder = 0;
  } else {
    transitionOrder++
  }
}

function transitionMotion() {
  // $("#left").css({"transition":"background-color 1s"});
  // $("#right").css({"transition":"background-color 1s"});
  // $(".w-wrapper").css({"transition":"background-color 1s"});
  // $(".l-infomation").css({"transition":"background-color 1s"});
  // $(".l-news").css({"transition":"background-color 1s"});
  // $(".w-list-wrapper").css({"transition":"background-color 1s"});
  // $(".l-header").css({"transition":"background-color 1s"});
  // $(".n-col input").css({"transition":"color 1s"});
  checkNumber();
  wrapper.style.setProperty("--level-1", transitionBackground[transitionOrder]);

}
