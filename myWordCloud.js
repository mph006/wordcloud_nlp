function getTags(rawWords){

  return {
    "words":new Lexer().lex(rawWords),
    "tags":new POSTagger().tag(new Lexer().lex(rawWords))
  }
}

function filterPhrases(tags){
  var verbs = ["VB","VBD","VBG","VBN","VBP","VBZ"];
  var nouns = ["NN","NNP","NNPS","NNS"];
  var junk = [",",".",":","$","#",'"',"(",")","SYM"]
  var phrase = [];
  var phrases = [];
  var inPhrase = false;
  for(var i=0; i<tags.length; i++){
    if(junk.indexOf(tags[i][1])>-1){
      inPhrase =false;
      phrase = [];
      continue;
    }
    else if(verbs.indexOf(tags[i][1])>-1 || inPhrase){
      phrase.push(tags[i][0]);
      //console.log("got a verb",phrase);
      inPhrase = true;
      if(nouns.indexOf(tags[i][1])>-1){
       // console.log("got a noun",phrase);
        inPhrase = false;
        phrase = phrase.join(" ");
        phrases.push(phrase);
        phrase = [];
      }
    }
  }
  //phrases = getSentiment(phrases);
  //return phrases.map(function(d) {return {text: d, size: 25, sentiment:compendium.analyse(d)[0].profile.sentiment};});
  return phrases.map(function(d) {return {text: d, size: 15 + Math.random() * 25};});
}

function renderCloud(){
  if (document.getElementById("svg-wrapper")!==null){
    document.getElementById("svg-wrapper").remove();
  }
  var tokens = filterPhrases(getTags(document.getElementById("input-text").value)["tags"]);
  var cloudContainer = document.getElementById("cloud-container");
  var width = cloudContainer.offsetWidth;
  var height = cloudContainer.offsetHeight;
  var fill = d3.scale.category20();
  var phrases;
  (tokens.length<1)? phrases=[{text:"No action phrases detected",size:25}]:
                      phrases = tokens;

  d3.layout.cloud().size([width, height])
      .words(phrases)
      .rotate(function() { return ~~(Math.random() * 2); })
      .font("Helvetica")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
      d3.select("#cloud-container").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id","svg-wrapper")
      .append("g")
        .attr("transform", "translate("+(width/2)+","+height/2+")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("fill", function(d, i) { return fill(i); })
        .style("stroke-width","1px")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.text; })
        .transition()
        .duration(1000)
        .style("font-size", function(d) {return d.size + "px"; })
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        });
    }
}

window.onload = renderCloud();

