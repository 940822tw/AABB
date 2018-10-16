var i_eng_toggle = false;
var i_kor_toggle = false;
var n_eng_toggle = false;
var n_kor_toggle = false;

var info = {
  eng_1: '',
  eng_2: '',
  kor_1: '',
  kor_2: '',
  footer_1:'',
  footer_2:''
}

var spreadOfInfo = "https://spreadsheets.google.com/feeds/cells/10YCAxKOlsjNtjBIt78-JtNzSSvYuqe8EHrBnnkdTLSg/2/public/basic?alt=json-in-script&callback=?";

function infoDisplay() {
  $.getJSON(spreadOfInfo, function(data) {
    var entry = data.feed.entry;
    info.eng_1 = entry[2].content.$t
    info.eng_2 = entry[3].content.$t
    info.kor_1 = entry[4].content.$t
    info.kor_2 = entry[5].content.$t
    info.footer_1 = entry[8].content.$t
    info.footer_2 = entry[9].content.$t
    $("#i-eng-col-1").append(entry[2].content.$t);
    $("#i-eng-col-2").append(entry[3].content.$t);
    $("#i-kor-col-1").append(entry[4].content.$t);
    $("#i-kor-col-2").append(entry[5].content.$t);
    $("#f-eng").append(entry[9].content.$t);
    $("#f-kor").append(entry[8].content.$t);
  });
}
infoDisplay()

function autoHeightAnimate(element, time) {
  var curHeight = element.height(), // Get Default Height
    autoHeight = element.css('height', 'auto').height(); // Get Auto Height
  element.height(curHeight); // Reset to Default Height
  element.stop().animate({
    height: autoHeight
  }, time); // Animate to Auto Height
}

  function eng_toggle_info() {

    if (n_eng_toggle) {

      dropup("#n-eng", 300);
      selectedColorEng(null);
      n_eng_toggle = !n_eng_toggle;
      if (!i_eng_toggle) {
        setTimeout(function() {
          closeMixup()
          dropdown("#i-eng", 400);
          i_eng_toggle = !i_eng_toggle;
          selectedColorEng("#h-eng-btn-info")
        }, 300);
      } else {
        eng_close_info();
        selectedColorEng(null);
      }
    } else {
      if (!i_eng_toggle) {
        closeMixup()
        dropdown("#i-eng", 400);
        i_eng_toggle = !i_eng_toggle;
        selectedColorEng("#h-eng-btn-info")
      } else {
        eng_close_info();
        selectedColorEng(null)
      }
    }
  }



function kor_toggle_info() {
  if (n_kor_toggle) {
    dropup("#n-kor", 300);
    n_kor_toggle = !n_kor_toggle;
    selectedColorKor(null);
    if (!i_kor_toggle) {
      setTimeout(function() {
        dropdown("#i-kor", 400);
        i_kor_toggle = !i_kor_toggle;
        selectedColorKor("#h-kor-btn-info");
      }, 400);
    } else {
      kor_close_info();
      selectedColorKor(null);
    }
  } else {
    if (!i_kor_toggle) {
      dropdown("#i-kor", 400);
      i_kor_toggle = !i_kor_toggle;
      selectedColorKor("#h-kor-btn-info");
    } else {
      kor_close_info();
      selectedColorKor(null)
    }
  }
}

function eng_close_info() {

  dropup("#i-eng", 400)
  i_eng_toggle = !i_eng_toggle;
  selectedColorEng(null)
}

function kor_close_info() {
  dropup("#i-kor", 400)
  i_kor_toggle = !i_kor_toggle;
  selectedColorKor(null)
}



function eng_toggle_news() {

  if (i_eng_toggle){dropup("#i-eng", 400);
  selectedColorEng(null);
  i_eng_toggle = !i_eng_toggle;
  if (!n_eng_toggle) {
    setTimeout(function(){
    closeMixup();
    dropdown("#n-eng", 300);
    n_eng_toggle = !n_eng_toggle
    selectedColorEng("#h-eng-btn-news");},400);
  } else {
    eng_close_news();
    selectedColorEng(null);
  }
}else{
  if (!n_eng_toggle) {
    closeMixup()
    dropdown("#n-eng", 300);
    selectedColorEng("#h-eng-btn-news");
    n_eng_toggle = !n_eng_toggle;
  } else {
    eng_close_news();
    selectedColorEng(null);
  }
}
}

function kor_toggle_news() {

  if (i_kor_toggle){dropup("#i-kor", 400);
  selectedColorKor(null)
  i_kor_toggle = !i_kor_toggle;
  if (!n_kor_toggle) {
    setTimeout(function(){dropdown("#n-kor", 300);
    selectedColorKor("#h-kor-btn-news")
    n_kor_toggle = !n_kor_toggle},400);
  } else {
    kor_close_news();
    selectedColorKor(null)
  }
}else{
  if (!n_kor_toggle) {
    dropdown("#n-kor", 300);
    selectedColorKor("#h-kor-btn-news")
    n_kor_toggle = !n_kor_toggle;
  } else {
    kor_close_news();
    selectedColorEng(null);
  }
}
}

function eng_close_news() {
  dropup("#n-eng", 300);
  n_eng_toggle = !n_eng_toggle;
  selectedColorEng(null);
}

function kor_close_news() {
  dropup("#n-kor", 300);
  n_kor_toggle = !n_kor_toggle;
  selectedColorKor(null);
}



function dropdown(id, time) {
  var curHeight = $(id).height(),
    autoHeight = $(id).css('height', 'auto').height() + 35;
      if(id == "#l-eng-mixup"){autoHeight= screen.height-150;
       $("#left").animate({ scrollTop: 0 }, "slow");}
  $(id).height(curHeight);
  $(id).animate({
    paddingTop : "11px",
  }, 0);
  $(id).animate({
    height: autoHeight,
  }, time);
  if(id == "#l-eng-mixup"){

    $(id).animate({
      paddingBottom : "40vw",
    }, time);
  }

  $(id)
     .css("border-bottom-color", colorArray[3])
     .css("border-bottom-style", "solid")
     .css("border-bottom-width", "1px");
}

function dropup(id, time){
  if(id == "#l-eng-mixup"){time = 165}

  if(id == "#l-eng-mixup"){
       $(id).animate({
         paddingBottom : "0vw",
       }, time);
     }
  $(id).animate({
    height: 0,
  }, time);

  $(id).animate({
    paddingTop : "0px",
  }, 0);


  $(id)
     .css("border-bottom-width", "0px");


}


function selectedColorEng(id){
  $("#h-eng-btn-info").children().removeClass("h-selected");
  $("#h-eng-btn-news").children().removeClass("h-selected");
  $("#h-eng-btn-mixup").children().removeClass("h-selected");
  if(id!=null){$(id).children().addClass("h-selected");}
}

function selectedColorKor(id){
  $("#h-kor-btn-info").children().removeClass("h-selected");
  $("#h-kor-btn-news").children().removeClass("h-selected");
  $("#h-kor-btn-mixup").children().removeClass("h-selected");
  if(id!=null){$(id).children().addClass("h-selected");}
}
