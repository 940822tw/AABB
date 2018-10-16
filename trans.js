var transitionBackground = []
var transitionOrder = 0;
var spreadOfTrans = "https://spreadsheets.google.com/feeds/cells/10YCAxKOlsjNtjBIt78-JtNzSSvYuqe8EHrBnnkdTLSg/6/public/basic?alt=json-in-script&callback=?";
var transitionTime;
var transitionLength = 3000;

function transtionArray() {
  $.getJSON(spreadOfTrans, function(data) {
    var entry = data.feed.entry;
    transitionLength=entry[4].content.$t;
    for(var i=0; i<transitionLength; i++){
      transitionBackground[i]=entry[eval(9+4*i)].content.$t;
    }
    transitionTime=entry[3].content.$t;
    setInterval(transitionMotion, transitionTime);
})}

function checkNumber(a){if(a==transitionLength){a=0;}else{transitionOrder++}}

function transitionMotion(){
    $("html body").animate({backgroundColor: transitionBackground[transitionOrder]}, 'slow');
    checkNumber(transitionOrder);
    console.log(transitionTime);
}

transtionArray();
