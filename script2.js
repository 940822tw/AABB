var cl = "eng"
var ti = "txt-img"
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
    colorArray[4] = SettingEntry[16].content.$t;
    colorArray[1] = SettingEntry[20].content.$t;
    wrapper.style.setProperty("--level-3", colorArray[3]);
    wrapper.style.setProperty("--level-2", colorArray[2]);
    wrapper.style.setProperty("--level-2-1", colorArray[4]);
    wrapper.style.setProperty("--level-1", colorArray[1]);
  } else
  if (colorArray[0] == "DEFAULT") {
    $("html body").css({
      "opacity": 1
    })
    colorArray[3] = "#000";
    colorArray[2] = "#CCC";
    colorArray[4] = "#CCC";
    colorArray[1] = "#FFF";
    wrapper.style.setProperty("--level-3", colorArray[3]);
    wrapper.style.setProperty("--level-2-1", colorArray[4]);
    wrapper.style.setProperty("--level-2", colorArray[2]);
    wrapper.style.setProperty("--level-1", colorArray[1]);
  } else
  if (colorArray[0] == "RANDOM - TRANSITION") {
    colorArray[3] = SettingEntry[8].content.$t;
    colorArray[2] = SettingEntry[12].content.$t;
    colorArray[4] = SettingEntry[16].content.$t;

    wrapper.style.setProperty("--level-2-1", colorArray[4]);
    wrapper.style.setProperty("--level-3", colorArray[3]);
    wrapper.style.setProperty("--level-2", colorArray[2]);

    transtionArray();
  } else
  if(colorArray[0] == "RANDOM"){

    colorArray[3] = SettingEntry[8].content.$t;
    colorArray[2] = SettingEntry[12].content.$t;
    colorArray[4] = SettingEntry[16].content.$t;

    wrapper.style.setProperty("--level-2-1", colorArray[4]);
    wrapper.style.setProperty("--level-3", colorArray[3]);
    wrapper.style.setProperty("--level-2", colorArray[2]);

    blinkArray();
  }

  //사이트 웨이트

  weight = SettingEntry[24].content.$t;
  wrapper.style.setProperty("--weight", weight);

drawClosebtn(".info-close");
})





var transitionBackground = []
var transitionOrder = 1;
var spreadOfTrans = "https://spreadsheets.google.com/feeds/cells/10YCAxKOlsjNtjBIt78-JtNzSSvYuqe8EHrBnnkdTLSg/6/public/basic?alt=json-in-script&callback=?";
var transitionTime = 50000;
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

function blinkArray() {

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
    blinkMotion()
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
  $("#info").css({"transition":"background-color 10s"});
  $("#wrapper").css({"transition":"background-color 10s"});
  $("#left").css({"transition":"background-color 10s"});
  $("#right").css({"transition":"background-color 10s"});
  $(".bg").css({"transition":"background-color 10s"});
  $("header").css({"transition":"background-color 10s"});
  $(".w-wrapper").css({"transition":"background-color 10s"});
  $(".l-infomation").css({"transition":"background-color 10s"});
  $(".l-news").css({"transition":"background-color 10s"});
  $(".w-list-wrapper").css({"transition":"background-color 10s"});
  $(".l-header").css({"transition":"background-color 10s"});
  $(".n-col input").css({"transition":"color 1s"});
  $("#g-wrapper").css({"transition":"background-color 10s"});

  // $("html body").animate({backgroundColor: transitionBackground[transitionOrder]}, 100, 'linear');
  checkNumber();
  wrapper.style.setProperty("--level-1", transitionBackground[transitionOrder]);

}

function blinkMotion() {
  checkNumber();
  wrapper.style.setProperty("--level-1", transitionBackground[transitionOrder]);

}


function drawClosebtn(obj) {
  var btn=''
      btn+= '<div class="btn-wrapper">'
      btn+= '<svg class="close-svg close-svg-lv-3" height="36" xmlns="http://www.w3.org/2000/svg">'
      btn+= '<line x1="0" y1="0" x2="36" y2="36" style="stroke:'+colorArray[3]+';stroke-width:1.1"/>'
      btn+= '<line x1="36" y1="0" x2="0" y2="36" style="stroke:'+colorArray[3]+';stroke-width:1.1"/>'
      btn+= '</svg></div>'
  var btn_hover=''
      btn_hover+= '<div class="btn-hover-wrapper">'
      btn_hover+= '<svg class="close-svg close-svg-lv-2" height="36" xmlns="http://www.w3.org/2000/svg">'
      btn_hover+= '<line x1="0" y1="0" x2="36" y2="36" style="stroke:'+colorArray[2]+';stroke-width:1.1"/>'
      btn_hover+= '<line x1="36" y1="0" x2="0" y2="36" style="stroke:'+colorArray[2]+';stroke-width:1.1"/>'
      btn_hover+= '</svg></div>'
      $(obj).append(btn_hover);
$(obj).append(btn);

      }




function bgw(obj){
  $(id).animate({
    width: "100vw"
  }, 100);
}


function txtimg(){
  if(ti=="txt-img"){
    ti="img-txt";
    $("#left").css({"z-index":"0"});
    $("#left").css({"left":"calc(50vw)"});
    $("#g-wrapper").css({"z-index":"9999"});
    $("#g-wrapper").css({"right":"calc(50vw - 1px)"});
    $("#g-wrapper").css({"position":"fixed"});
    $("#g-wrapper").css({"border-right":"none"});
    $(".g-element").css({"border-left":"none"});
    $(".g-element").css({"border-right":"1px solid var(--level-3)"});
    $("#btntxtimg-kor").html("TXT/IMG")
    $("#btntxtimg-eng").html("TXT/IMG")

  }else{
    ti="txt-img";
    $("#left").css({"z-index":"9999"});
    $("#left").css({"left":"0"});
    $("#g-wrapper").css({"z-index":"0"});
    $("#g-wrapper").css({"right":"0"});
    $("#g-wrapper").css({"position":"static"});
    $("#g-wrapper").css({"border-right":"1px solid var(--level-3)"});
    $(".g-element").css({"border-left":"1px solid var(--level-3)"});
    $(".g-element").css({"border-right":"none"});
    $("#btntxtimg-kor").html("IMG/TXT")
    $("#btntxtimg-eng").html("IMG/TXT")
  }
}

function scrolltoTop(a,b){
  $(a).animate({
	scrollTop: 0
}, b);
}

function ini(){
if(infoToggle){toggle_info()};
if(currentnum){toggle_work(currentnum,currentdir)}
scrolltoTop("#left",300)
scrolltoTop("#w-eng",300)
scrolltoTop("#right",300)
scrolltoTop("#g-wrapper",300)
}
