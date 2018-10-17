var infoToggle = false;

var info = {
  eng_1: '',
  eng_2: '',
  kor_1: '',
  kor_2: '',
  footer_1: '',
  footer_2: ''
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
    $("#info-1 [data-lang='eng']").append(entry[2].content.$t);
    $("#info-2 [data-lang='eng']").append(entry[3].content.$t);
    $("#info-1 [data-lang='kor']").append(entry[4].content.$t);
    $("#info-2 [data-lang='kor']").append(entry[5].content.$t);
    $("footer [data-lang='eng']").append(entry[9].content.$t);
    $("footer [data-lang='kor']").append(entry[8].content.$t);
  });
}

infoDisplay();

function autoHeightAnimate(element, time) {
  var curHeight = element.height(), // Get Default Height
    autoHeight = element.css('height', 'auto').height(); // Get Auto Height
  element.height(curHeight); // Reset to Default Height
  element.stop().animate({
    height: autoHeight
  }, time); // Animate to Auto Height
}

function toggle_info() {
  if (!infoToggle) {
    setTimeout(function() {
      dropdown("#info", 400);
      infoToggle = !infoToggle
    }, 0);
    selected(".h-profile a")
  } else {
    close_info();
    selected(null)
  }
}

function close_info() {
  dropup("#info", 400)
  infoToggle = false;
}

function dropdown(id, time) {
  var curHeight = $(id).height(),
    autoHeight = $(id).css('height', 'auto').height() + 49;
  $(id).height(curHeight);
  $(id).animate({
    paddingTop: "5px",
  }, 0);
  $(id).animate({
    height: autoHeight,
  }, time);
  // $(id)
  //   .css("border-bottom-color", colorArray[3])
  //   .css("border-bottom-style", "solid")
  //   .css("border-bottom-width", "1px");
}

function dropup(id, time) {
  $(id).animate({
    height: 0,
  }, time);

  $(id).animate({
    paddingTop: "0px",
  }, 0);


  $(id)
    // .css("border-bottom-width", "0px");

}


function selected(id){
  $(".h-profile a").removeClass("h-sel");
  if(id!=null){$(id).addClass("h-sel");}
}
