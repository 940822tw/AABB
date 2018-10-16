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
var curlist_1="";
var curlist_2="";
var mobcurrentdir ="";
var mobcurrentnum ="";
var destinationClick= "";
var dateENG = false;
var alphabetENG = false;
var dateKOR = false;
var alphabetKOR = false;
var langChange = false;

function callback(cb,a) {
  cb(a);
}

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


//리스트 생성//
function makeList() {
  $.getJSON(spreadOfWorks, function(data) {
    var entry = data.feed.entry;
    var html = ""
    ImgNums = entry[0].content.$t;
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

    callback(listDisplay,"eng");
    callback(listDisplay,"kor");
    callback(grid);
    worksArrayTemp = JSON.parse(JSON.stringify( worksArray ));
  });
}



//리스트 표시//
function listDisplay(lang){
  var html=""
  html += "<div id='l-"+lang+"-list-wrapper' class='w-list-wrapper"
  if(lang=="kor"){html+=" invis"}
  html+="' data-lang='"+lang+"'>"
  for (var i = 0; i < worksArray.length; i++) {
    var num = worksArray[i].index
    var titleENG = worksArray[i].title1
    var titleKOR = worksArray[i].title2
    var year = worksArray[i].year
    var append ="#w-"+lang
    html +=  "<div id='w-"+lang+"-list-"+num+"' class='w-list' onclick='toggle_work("+worksArray[i].index+",&quot;right&quot;)' onmouseover='gridColorAdd("+i+")' onmouseout='gridColorRemove("+i+")'>"
    html += "<div id='arr-"+lang+"-list-title-"+num+"' class='w-list-arrow mobileInvis'></div>"
    html +=    "<div id='w-"+lang+"-list-title-"+num+"' class='w-list-title'>"
    if(lang=="eng"){html+=titleENG}
    if(lang=="kor"){html+=titleKOR}
    html +=  "  </div>"
    html +=    "<div id='w-"+lang+"-list-year-"+num+"' class='w-list-year'>"+year
    html +=  "  </div>"
    html +=  "<div id='w-"+lang+"-list-close-"+num+"' class='w-list-close screenInvis mobileInvis'><span>CLOSE</span>"
    html +=  "</div>"
    html +=  "</div><div id='w-eng-work-mob-"+num+"' class='screenInvis w-container-mob'></div>"}
    html += "</div>"
    $(append).append(html);

    if(worksArray.length%3!=0){
      for (var i = 0; i < 3-worksArray.length%3; i++) {
        var html=""
        html+="<div></div><div id='w-dummy-"+i+"' class='w-list dummylist'>"
        html+="</div>"
        }
    }
    append="#l-"+lang+"-list-wrapper"
    $(append).append(html);

}

//그리드 생성
function grid(){
  var html=""
  var append = "#right"
  html+="<div id='g-wrapper'>"
   for (var i = 0; i < worksArray.length; i++) {
    html+="<div id='grid-"+i+"' class='g-element' onmouseover='gridColorAdd("+i+")' onmouseout='gridColorRemove("+i+")'>"
    html+="<span class='helper'></span><img src='img/"+worksArray[i].directory+"/1."+worksArray[i].format[0]+"' onclick='toggle_work("+i+",&quot;right&quot;)'>"
    html+="</div>"
   }
  html+="</div>"

    $(append).append(html);
    if(worksArray.length%3!=0){
      for (var i = 0; i < 3-worksArray.length%3; i++) {
        var html=""
        var append = "#g-wrapper"
        html+="<div id='grid-dummy-"+i+"' class='g-element'>"
            html+="<span class='helper'></span><img src='img/"+worksArray[i].directory+"/1."+worksArray[i].format[0]+"' style='visibility:hidden'>"
        html+="</div>"
        }
    }
    $(append).append(html);
}
grid();

function gridColorAdd(num){
  var obj = "#w-eng-list-"+num;
  var obj2 = "#w-kor-list-"+num;
  var obj3 = "#grid-"+num;
  $(obj).addClass('w-hovered');
  $(obj2).addClass('w-hovered');
  $(obj3).addClass('w-hovered');
}
function gridColorRemove(num){
  var obj = "#w-eng-list-"+num
  var obj2 = "#w-kor-list-"+num
  var obj3 = "#grid-"+num;
  $(obj).removeClass('w-hovered');
  $(obj2).removeClass('w-hovered');
  $(obj3).removeClass('w-hovered');
}

//토글 함수//
function toggle_work(num, direction){
  videoReset();
  $(curlist_1).removeClass('w-list-selected');
  $(curlist_2).removeClass('w-list-selected');
  if(currentnum==num && currentdir==direction){
  if(direction =="right"){rightToMiddle('#right .w-wrapper');  currentdir =null; currentnum =null; curlist=null;
  setTimeout(function(){$('#right .w-wrapper').remove();invis('#right .l-template')},330)}
  if(direction == "left"){leftToMiddle('#left .w-wrapper');  currentdir =null; currentnum =null; curlist=null;
  setTimeout(function(){$('#left .w-wrapper').remove();invis('#left  .l-template')},330)}
  // invis(".w-list-arrow");

 if(num==mobcurrentnum && direction==mobcurrentdir){
 mobcurrentnum=null; mobcurrentdir=null;
   // $(".w-wrapper-mob").remove();
   $(".w-list-mob").removeClass("w-list-mob");
   $(".w-list-year").removeClass("mobileInvis");
   $(".w-list-title-mob").removeClass("w-list-title-mob");
   $(".w-list-close").addClass("mobileInvis");
  mobdropup(".w-wrapper-mob", 200);
   return;}
  return;}

  curlist="#w-"+cl+"-list-"+num;
  curlist_1="#w-eng-list-"+num;
  curlist_2="#w-kor-list-"+num;

  $(curlist_1).addClass('w-list-selected');
  $(curlist_2).addClass('w-list-selected');
  //
  // invis(".w-list-arrow");
  // vis("#arr-"+cl+"-list-title-"+num);
  currentnum=num;
  currentdir=direction;

//템플릿 부분//

  var html=""
  html+="<div id='w-"+cl+"-wrapper-"+num+"' class='w-wrapper'>"
    html+="<div id='w-"+cl+"-body-"+num+"' class='w-body'>"
      html+="<div class='work-close-1' onclick='toggle_work("+num+",&quot;"+direction+"&quot;)'><img class='close-svg' src='img/close.svg'></div>"
      html+="<div id='w-"+cl+"-desc1-"+num+"' class='w-desc w-col'>";
      html+="<span data-lang='eng' class='w-title"
      if(cl=="kor"){html+=" invis"}
      html+="'>"+worksArray[num].title1+"</span>"
      html+="<span data-lang='kor' class='w-title"
      if(cl=="eng"){html+=" invis"}
      html+="'>"+worksArray[num].title2+"</span>"
      html+="<br><br>"

        // if(direction=="right"){html+=worksArray[num].desc1;}
        // if(direction=="right"){html+=worksArray[num].desc2;}
        // if(direction=="left"){html+=worksArray[num].desc3;}
        // if(direction=="left"){html+=worksArray[num].desc4;}
        html+="<span data-lang='eng' "
        if(cl=="kor"){html+="class='invis'"}
        html+=">"+worksArray[num].desc1+"</span>"

        html+="<span data-lang='kor' "
        if(cl=="eng"){html+="class='invis'"}
        html+=">"+worksArray[num].desc3+"</span>"

        html+="<br><br>"
        html+="<span data-lang='eng' "
        if(cl=="kor"){html+="class='invis'"}
        html+=">"+worksArray[num].desc2+"</span>"

        html+="<span data-lang='kor' "
        if(cl=="eng"){html+="class='invis'"}
        html+=">"+worksArray[num].desc4+"</span>"

      html+="</div>"
      html+="<div id='w-"+cl+"-thumbwrapper-"+num+"' class='w-thumbwrapper'>"
        // $(".w-video").remove();



      for(var i=0; i<worksArray[num].format.length; i++){
          html+="<div id='w-"+cl+"-thumb-"+num+"-"+i+"' class='w-thumb'>"
           html+=makeURL(num,i);
          html+="</div>"}

      html+="</div>"

      html+="<div id='w-"+cl+"-footer-"+num+"' class='w-footer'>"
        // html+="<div id='w-"+cl+"-btn-lang-"+num+"' class='btn-lang'><span onclick='"
        // html+="toggle_work("+num+",&quot;"+direction+"&quot;);"
        // html+="toggle_work("+num+",&quot;"
        // if(direction=="right"){html+="left"}
        // if(direction=="left"){html+="right"}
        // html+="&quot;)'>"
        // // if(direction=="right"){html+="한국어"}
        // // if(direction=="left"){html+="ENGLISH"}
        // html+="</span></div>"

        html+="<div id='w-"+cl+"-btn-prev-"+num+"' class='btn-prev'>"
        html+="<span onclick='$("+'"#w-'+cl+'-list-'+num+'"'+").prev().prev().trigger("+'&quot;click&quot;'+");'>"
        html+="<span data-lang='eng' class='"
        if(cl=="kor"){html+=" invis"}
        html+="'>이전</span>"
        html+="<span data-lang='kor' class='w-title"
        if(cl=="eng"){html+=" invis"}
        html+="'>PREV</span>"
        html+="</span></div>"

        //위 함수를 대체 180910 /toggle_work("+eval(worksArray[num].index*1+1)+",&quot;"+direction+"&quot;); //
        // html+="<div id='w-"+cl+"-btn-close-"+num+"' class='btn-close'><span onclick='toggle_work("+num+",&quot;"+direction+"&quot;)'>"
        // html+="<span data-lang='eng'>CLOSE</span><span data-lang='kor'>닫기</span>"
        // html+="</span></div>"
        html+="<div class='hollow'><span></span></div>"

//'toggle_work("+eval(worksArray[num].index*1-1)+",&quot;"+direction+"&quot;)'
        html+="<div id='w-"+cl+"-btn-prev-"+num+"' class='btn-next'>"
        html+="<span onclick='$("+'"#w-'+cl+'-list-'+num+'"'+").next().next().trigger("+'&quot;click&quot;'+");'>"
        // if(direction=="right"){html+="다음"}
        // if(direction=="left"){html+="NEXT"}
        html+="NEXT</span></div>"
        html+="<div class='work-close-2' onclick='toggle_work("+num+",&quot;"+direction+"&quot;)'><img class='close-svg' src='img/close.svg'></div>"
      html+="</div>"
    html+="</div>"
  html+="</div>"



      if(direction=="right"){
      $("#l-eng-template").append(html);
      middleToRight('.w-wrapper');
      vis("#l-eng-template");}

      if(direction=="left"){
      $("#l-kor-template").append(html);
      middleToLeft('.w-wrapper');
      vis("#l-kor-template");}
mobileToogle(num, direction);

 
//prev, next 버튼 사라지기
destinationClick = "#w-"+cl+"-list-"+num;
setTimeout(function(){
var btnprev = $(destinationClick).prev().length;
var btnnext = ""
if(num==worksArray.length-1){btnnext=0}else{btnnext=1}
    $(".hollow").html("&nbsp;&nbsp;");
    $(".btn-prev").children().html("<span data-lang='eng'>PREV</span><span data-lang='kor'>이전</span>")
    $(".btn-next").children().html("<span data-lang='eng'>NEXT</span><span data-lang='kor'>다음</span>")
  if(btnprev==0){
    $(".hollow").html("");
    $(".btn-prev").children().html("");
    $(".btn-next").children().html("<span data-lang='eng'>NEXT</span><span data-lang='kor'>다음</span>")
  }
  if(btnnext==0){
    $(".hollow").html("");
    $(".btn-prev").children().html("<span data-lang='eng'>PREV</span><span data-lang='kor'>이전</span>")
    $(".btn-next").children().html("");
  }

  if (cl == "eng") {
    $('[data-lang="kor"]').addClass('invis');
    $('[data-lang="eng"]').removeClass('invis');
    } else
  if (cl == "kor") {
    $('[data-lang="eng"]').addClass('invis');
    $('[data-lang="kor"]').removeClass('invis');
  }


},300);
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
  var mobcl ="";
  if (direction=="left") {mobcl="kor"}
  if (direction=="right") {mobcl="eng"}

    // $(".w-wrapper-mob").remove();
     destinationContainer="#w-"+mobcl+"-wrapper-mob-"+num;
     destinationWork="#w-"+mobcl+"-work-mob-"+num;
     destinationList="#w-"+mobcl+"-list-"+num;
     destinationListTitle="#w-"+mobcl+"-list-title-"+num;
     destinationListYear="#w-"+mobcl+"-list-year-"+num;
     destinationListClose="#w-"+mobcl+"-list-close-"+num;
    mobdropup(".w-wrapper-mob", 200);
////////////////////////////////////////////////
     $(".w-list-mob").removeClass("w-list-mob");
     $(".w-list-year").removeClass("mobileInvis");
     $(".w-list-title-mob").removeClass("w-list-title-mob");
     $(".w-list-close").addClass("mobileInvis");

    if(num==mobcurrentnum && direction==mobcurrentdir){
    mobcurrentnum=null; mobcurrentdir=null; return;}
///////////////////////////////////////////////
    mobcurrentnum = num;
    mobcurrentdir = direction;
    $(destinationList).addClass("w-list-mob");
    $(destinationListYear).addClass("mobileInvis");
    $(destinationListTitle).addClass("w-list-title-mob");
    $(destinationListClose).removeClass("mobileInvis");

    html +="<div id='w-"+mobcl+"-wrapper-mob-"+num+"'  class='w-wrapper-mob'>";
    html += "<div id='w-"+mobcl+"-desc1-mob-"+num+"' class='w-desc w-col col_left'>";
    if(direction=="right"){html+=worksArray[num].desc1;}
    if(direction=="left"){html+=worksArray[num].desc3;}
    html += "</div>";
    html+="<div id='w-"+mobcl+"-desc2-mob-"+num+"' class='w-desc w-col col_right'>";
      if(direction=="right"){html+=worksArray[num].desc2;}
      if(direction=="left"){html+=worksArray[num].desc4;}
    html+="</div>"



    for(var i=0; i<worksArray[num].format.length; i++){
        html+="<div id='w-"+mobcl+"-thumb-mob-"+num+"-"+i+"' class='w-thumb'>"
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



function videoReset(){
  setTimeout(function(){for(var i=0; i<$("iframe").length; i++){$("iframe")[i].src = "";}},200);
  videoLength=0;
}
