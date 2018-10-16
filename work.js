
var spreadOfWorks = "https://spreadsheets.google.com/feeds/cells/10YCAxKOlsjNtjBIt78-JtNzSSvYuqe8EHrBnnkdTLSg/3/public/basic?alt=json-in-script&callback=?";
var worksArray = [];
var worksArrayTemp = [];
var viewOrdersENG= [];
var viewOrdersKOR= [];
var currentnum = ""
var currentdir = ""
var zIndex=0;
var ImgNums="";
var videoLength=0;
var langShift=false;
var curlist="";
var mobcurrentdir ="";
var mobcurrentnum ="";
var destinationClick= "";
var dateENG = false;
var alphabetENG = false;
var dateKOR = false;
var alphabetKOR = false;
var langChange = false;
function work(index, date, title1, desc1, desc2, title2, desc3, desc4, directory, imgNum) {
  this.index = index; //1
  this.date = date;
  this.year = this.date.substring(0, 4) //2
  this.title1 = title1; //3
  this.desc1 = desc1; //4
  this.desc2 = desc2; //5
  this.title2 = title2; //6
  this.desc3 = desc3; //7
  this.desc4 = desc4; //8
  this.directory = directory; //9
  this.imgNum = imgNum; //10
  this.format = [];
  this.size = [];
  this.vieworder = index;
}

function makeURL(arrayNum,formatNum){
if(worksArray[arrayNum].format[formatNum]!=="video"){
return"<img class='w-image' width='"+worksArray[arrayNum].size[formatNum]+"' id='w-"+arrayNum+"-image-"+formatNum+"' src='"+ "img/"+worksArray[arrayNum].directory+"/"+eval(formatNum+1)+"."+worksArray[arrayNum].format[formatNum]+"'>"
}else{
  videoLength ++;
  curvideo=".w-video-"+arrayNum;
  return "<div class='w-video w-video-"+arrayNum+"'>"+worksArray[arrayNum].size[formatNum];+"</div>"

}
}

function callback(cb) {
  cb();
}



//리스트 생성//
function makeList() {
  $.getJSON(spreadOfWorks, function(data) {
    var entry = data.feed.entry;
    var html = ""
    ImgNums = entry[0].content.$t;
    // console.log("image : " + ImgNums)
    // console.log(entry[30].content.$t)
    for (var i = 30; i < entry[9].content.$t; i += 10) {
      worksArray[entry[i].content.$t - 1] = new work(eval(
      entry[i].content.$t*1 - 1), //인덱스
      entry[i + 1].content.$t, //날짜
      entry[i + 2].content.$t, //영문 제목
      entry[i + 3].content.$t, //영문 설명 1
      entry[i + 4].content.$t, //영문 설명 2
      entry[i + 5].content.$t, //국문 제목
      entry[i + 6].content.$t, //국문 설명 1
      entry[i + 7].content.$t, //국문 설명 2
      entry[i + 8].content.$t, //디렉토리
      entry[i + 9].content.$t);//이미지 개수

      for (var j = 0; j < entry[i + 9].content.$t * 2; j+=2) {
        worksArray[entry[i].content.$t - 1].format.push(entry[i + 10 + j].content.$t);
        worksArray[entry[i].content.$t - 1].size.push(entry[i + 11 + j].content.$t);
      }

      i += entry[i + 9].content.$t * 2;
    }

    callback(listDisplayEng);
    callback(listDisplayKor);
    mixupNums = mixupEntry[0].content.$t;
    mixup_array();
    // viewOrder();
    worksArrayTemp = JSON.parse(JSON.stringify( worksArray ));
  });
}



//리스트 표시//
function listDisplayEng(){
  //영문 리스트//
  var html=""
  var lang = "eng";
  html += "<div id='l-"+lang+"-list-wrapper' class='w-list-wrapper'>"
  for (var i = 0; i < worksArray.length; i++) {
    var num = worksArray[i].index
    // var num = i
    var title = worksArray[i].title1
    var year = worksArray[i].year
    var append ="#w-"+lang
    html +=  "<div id='w-"+lang+"-list-"+num+"' class='w-list' onclick='toggle_work("+worksArray[i].index+",&quot;right&quot;)'>"
    html += "<div id='arr-"+lang+"-list-title-"+num+"' class='w-list-arrow mobileInvisible'>→</div>"
    html +=    "<div id='w-"+lang+"-list-title-"+num+"' class='w-list-title'>"+title
    html +=  "  </div>"
    html +=    "<div id='w-"+lang+"-list-year-"+num+"' class='w-list-year'>"+year
    html +=  "  </div>"
    html +=  "<div id='w-"+lang+"-list-close-"+num+"' class='w-list-close screenInvisible mobileInvisible'><span>CLOSE</span>"
    html +=  "</div>"
    html +=  "</div><div id='w-eng-work-mob-"+num+"' class='screenInvisible w-container-mob'></div>"}
    html += "</div>"

    $(append).append(html);
}
function listDisplayKor(){
  //국문 리스트//
  var html = ""
  var lang = "kor";
  html += "<div id='l-"+lang+"-list-wrapper' class='w-list-wrapper'>"
  for (var i = 0; i < worksArray.length; i++) {
    var num = worksArray[i].index
    var title = worksArray[i].title2
    var year = worksArray[i].year
    var append ="#w-"+lang
    html +=  "<div id='w-"+lang+"-list-"+num+"' class='w-list' onclick='toggle_work("+num+",&quot;left&quot;)'>"
    html += "<div id='arr-"+lang+"-list-title-"+num+"' class='w-list-arrow mobileInvisible'>←</div>"
    html +=    "<div id='w-"+lang+"-list-title-"+num+"' class='w-list-title'>"+title
    html +=  "  </div>"
    html +=    "<div id='w-"+lang+"-list-year-"+num+"' class='w-list-year'>"+year
    html +=  "  </div>"
    html +=  "<div id='w-"+lang+"-list-close-"+num+"' class='w-list-close screenInvisible mobileInvisible'><span>닫기</span>"
    html +=  "</div>"
    html +=  "</div><div id='w-kor-work-mob-"+num+"' class='screenInvisible w-container-mob'></div>"}
    html += "</div>"

    $(append).append(html);


}

//토글 함수//
function toggle_work(num, direction){
  videoReset();
  $(curlist).removeClass('w-list-selected');
  if(currentnum==num && currentdir==direction){
  if(direction =="right"){rightToMiddle('#right .w-wrapper');  currentdir =null; currentnum =null; curlist=null;
  setTimeout(function(){$('#right .w-wrapper').remove();invisible('#right .l-template')},330)}
  if(direction == "left"){leftToMiddle('#left .w-wrapper');  currentdir =null; currentnum =null; curlist=null;
  setTimeout(function(){$('#left .w-wrapper').remove();invisible('#left  .l-template')},330)}
  // invisible(".w-list-arrow");
 if(num==mobcurrentnum && direction==mobcurrentdir){
 mobcurrentnum=null; mobcurrentdir=null;
   // $(".w-wrapper-mob").remove();
   $(".w-list-mob").removeClass("w-list-mob");
   $(".w-list-year").removeClass("mobileInvisible");
   $(".w-list-title-mob").removeClass("w-list-title-mob");
   $(".w-list-close").addClass("mobileInvisible");
  mobdropup(".w-wrapper-mob", 200);
   return;}
  return;}



  currentnum = num; currentdir = direction;
  if(direction=="left"){var curlang = "kor"
  kor_close_info(); i_eng_toggle = false;
  kor_close_news(); n_kor_toggle = false;
  eng_close_news(); n_eng_toggle = false;
  eng_close_info(); i_eng_toggle = false;}
  if(direction=="right"){var curlang = "eng"
  eng_close_news(); n_eng_toggle = false;
  eng_close_info(); i_eng_toggle = false;
  kor_close_info(); i_eng_toggle = false;
  kor_close_news(); n_kor_toggle = false;
}
  curlist="#w-"+curlang+"-list-"+num;
  $(curlist).addClass('w-list-selected');
  //
  // invisible(".w-list-arrow");
  // visible("#arr-"+curlang+"-list-title-"+num);

//템플릿 부분//

  var html=""
  html+="<div id='w-"+curlang+"-wrapper-"+num+"' class='w-wrapper'>"
    html+="<div id='w-"+curlang+"-header-"+num+"' class='w-header'>";
      html+="<div id='w-"+curlang+"-title-"+num+"' class='w-title'>";
        if(direction=="right"){html+=worksArray[num].title1;}
        if(direction=="left"){html+=worksArray[num].title2;}
      html+="</div>"
      html+="<div id='w-"+curlang+"-btn-close-"+num+"' class='btn-close' onclick=' toggle_work("+num+",&quot;"+direction+"&quot;)'><span id='w-btn-close'>"
        if(direction=="right"){html+="CLOSE"}
        if(direction=="left"){html+="닫기"}
      html+="</span></div>"
    html+="</div>"
    html+="<div id='w-"+curlang+"-body-"+num+"' class='w-body'>"
      html+="<div id='w-"+curlang+"-desc1-"+num+"' class='w-desc w-col col_left'>";
        if(direction=="right"){html+=worksArray[num].desc1;}
        if(direction=="left"){html+=worksArray[num].desc3;}
      html+="</div>"
      html+="<div id='w-"+curlang+"-desc2-"+num+"' class='w-desc w-col col_right'>";
        if(direction=="right"){html+=worksArray[num].desc2;}
        if(direction=="left"){html+=worksArray[num].desc4;}
      html+="</div>"
      html+="<div id='w-"+curlang+"-thumbwrapper-"+num+"' class='w-thumbwrapper'>"
        // $(".w-video").remove();



      for(var i=0; i<worksArray[num].format.length; i++){
          html+="<div id='w-"+curlang+"-thumb-"+num+"-"+i+"' class='w-thumb'>"
           html+=makeURL(num,i);
          html+="</div>"}

      html+="</div>"
      html+="<div id='w-"+curlang+"-footer-"+num+"' class='w-footer'>"
        html+="<div id='w-"+curlang+"-btn-lang-"+num+"' class='btn-lang'><span onclick='"
        html+="toggle_work("+num+",&quot;"+direction+"&quot;);"
        html+="toggle_work("+num+",&quot;"
        if(direction=="right"){html+="left"}
        if(direction=="left"){html+="right"}
        html+="&quot;)'>"
        if(direction=="right"){html+="한국어"}
        if(direction=="left"){html+="ENGLISH"}
        html+="</span></div>"

        html+="<div id='w-"+curlang+"-btn-prev-"+num+"' class='btn-prev'>"
        html+="<span onclick='       $("+'"#w-'+curlang+'-list-'+num+'"'+").prev().prev().trigger("+'&quot;click&quot;'+");'>"
        if(direction=="right"){html+="이전"}
        if(direction=="left"){html+="PREV"}
        html+="</span></div>"
//'toggle_work("+eval(worksArray[num].index*1-1)+",&quot;"+direction+"&quot;)'
        html+="<div id='w-"+curlang+"-btn-prev-"+num+"' class='btn-next'>"
        html+="<span onclick='       $("+'"#w-'+curlang+'-list-'+num+'"'+").next().next().trigger("+'&quot;click&quot;'+");'>"
        if(direction=="right"){html+="다음"}
        if(direction=="left"){html+="NEXT"}
        html+="NEXT</span></div>"
//위 함수를 대체 180910 /toggle_work("+eval(worksArray[num].index*1+1)+",&quot;"+direction+"&quot;); //
        html+="<div id='w-"+curlang+"-btn-close-"+num+"' class='btn-close'><span onclick='toggle_work("+num+",&quot;"+direction+"&quot;)'>"
        if(direction=="right"){html+="CLOSE"}
        if(direction=="left"){html+="닫기"}
        html+="</span></div>"
      html+="</div>"
    html+="</div>"
  html+="</div>"



      if(direction=="right"){
      $("#l-eng-template").append(html);
      middleToRight('.w-wrapper');
      visible("#l-eng-template");}

      if(direction=="left"){
      $("#l-kor-template").append(html);
      middleToLeft('.w-wrapper');
      visible("#l-kor-template");}
mobileToogle(num, direction);

//prev, next 버튼 사라지기
destinationClick = "#w-"+curlang+"-list-"+num;
setTimeout(function(){  var btnprev = $(destinationClick).prev().length;
  var btnnext = $(destinationClick).next().next().length;
  console.log(btnprev);
  console.log(btnnext);
  if(direction=="right"){
    $(".btn-prev").children().html("PREV")
    $(".btn-next").children().html("NEXT")
  }
 if(direction=="left"){
   $(".btn-prev").children().html("이전")
   $(".btn-next").children().html("다음")
  }
  if(btnprev==0){
    $(".btn-prev").children().html("");
    if(direction=="left"){
      $(".btn-next").children().html("다음")
    }
    if(direction=="right"){
      $(".btn-next").children().html("NEXT")
     }
  }
  if(btnnext==0){
    $(".btn-next").children().html("");
    if(direction=="left"){
      $(".btn-prev").children().html("이전")
    }
    if(direction=="right"){
      $(".btn-prev").children().html("PREV")
     }
  }}
,300);
}


//애니메이션//
function middleToRight(id) {
  $(id).animate({
    left : "0vw"
  }, 400);
}

function rightToMiddle(id) {
  $(id).stop().animate({
    left : "-50vw"
  }, 400);
}

function middleToLeft(id) {
  $(id).animate({
    right : "0vw"
  }, 400);
}

function leftToMiddle(id) {
  $(id).stop().animate({
    right : "-50vw"
  }, 400);
}

function mobdropdown(id, time) {
  setTimeout(function(){
  var curHeight = $(id).height(),
    autoHeight = $(id).css('height', 'auto').height();
  $(id).height(curHeight);

  $(id).animate({
    height: autoHeight,
  }, time);
},0)
}

function mobdropup(id, time){
  $(id).animate({
    height: 0,
  }, time);
  $(id).animate({
    paddingTop : "0px",
  }, 0);
}


makeList();


function mobileToogle(num, direction){
  var destination = "";
  var destinationList ="";
  var destinationListTitle ="";
  var destinationListYear ="";
  var destinationLisClose ="";
  var destinationContainer ="";
  var html = "";
  var mobcurlang ="";
  if (direction=="left") {mobcurlang="kor"}
  if (direction=="right") {mobcurlang="eng"}

    // $(".w-wrapper-mob").remove();
     destinationContainer="#w-"+mobcurlang+"-wrapper-mob-"+num;
     destinationWork="#w-"+mobcurlang+"-work-mob-"+num;
     destinationList="#w-"+mobcurlang+"-list-"+num;
     destinationListTitle="#w-"+mobcurlang+"-list-title-"+num;
     destinationListYear="#w-"+mobcurlang+"-list-year-"+num;
     destinationListClose="#w-"+mobcurlang+"-list-close-"+num;
    mobdropup(".w-wrapper-mob", 200);
////////////////////////////////////////////////
     $(".w-list-mob").removeClass("w-list-mob");
     $(".w-list-year").removeClass("mobileInvisible");
     $(".w-list-title-mob").removeClass("w-list-title-mob");
     $(".w-list-close").addClass("mobileInvisible");

    if(num==mobcurrentnum && direction==mobcurrentdir){
    mobcurrentnum=null; mobcurrentdir=null; return;}
///////////////////////////////////////////////
    mobcurrentnum = num;
    mobcurrentdir = direction;
    $(destinationList).addClass("w-list-mob");
    $(destinationListYear).addClass("mobileInvisible");
    $(destinationListTitle).addClass("w-list-title-mob");
    $(destinationListClose).removeClass("mobileInvisible");

    html +="<div id='w-"+mobcurlang+"-wrapper-mob-"+num+"'  class='w-wrapper-mob'>";
    html += "<div id='w-"+mobcurlang+"-desc1-mob-"+num+"' class='w-desc w-col col_left'>";
    if(direction=="right"){html+=worksArray[num].desc1;}
    if(direction=="left"){html+=worksArray[num].desc3;}
    html += "</div>";
    html+="<div id='w-"+mobcurlang+"-desc2-mob-"+num+"' class='w-desc w-col col_right'>";
      if(direction=="right"){html+=worksArray[num].desc2;}
      if(direction=="left"){html+=worksArray[num].desc4;}
    html+="</div>"



    for(var i=0; i<worksArray[num].format.length; i++){
        html+="<div id='w-"+mobcurlang+"-thumb-mob-"+num+"-"+i+"' class='w-thumb'>"
         html+=makeURL(num,i);
        html+="</div>"}


    html += "</div>";
if(direction=="right"){
  var destination = "#w-eng-work-mob-"+num;
  $(destination).append(html);}
if(direction=="left"){
  var destination = "#w-kor-work-mob-"+num;
  $(destination).append(html);}


  mobdropdown(destinationContainer, 500);


}





function prevnext(){
  var btnprev = $(destinationClick).prev().length;
  var btnnext = $(destinationClick).next().next().length;
  console.log(btnprev);
  console.log(btnnext);
 $(".btn-prev").children().html("PREV")
 $(".btn-next").children().html("NEXT")
  if(btnprev==0){
 $(".btn-prev").children().html("");
 $(".btn-next").children().html("NEXT")}
  if(btnnext==0){
 $(".btn-next").children().html("");
 $(".btn-prev").children().html("PREV")}
}

function videoReset(){
  setTimeout(function(){for(var i=0; i<$("iframe").length; i++){$("iframe")[i].src = "";}},200);
  videoLength=0;
}
