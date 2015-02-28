function lineNames(data) {
  var lineLabels = d3.select("#line-names");


  var line_divs = lineLabels.selectAll("div")
    .data(data.filter(function(d){ return d.lineID == 4;}))
    .enter()
    .append("div")
      .attr("class", function(d) { return "line-row" })
      .attr("id", function(d,i) { return "line-row-" + i});

  line_divs.append("div")
    .attr("id", function(d,i) {return "line-square-" +i})
    .attr("class", function(d,i) {return "line-square line-" +i +""});

  line_divs.append("div")
    .text( function(d) {
         return d.stationName;
      })
    .attr('class', function(d) { return "line-label"});
}
function ready() {
  d3.csv("assets/line_stations.csv", lineNames);
}
// d3.csv("data/collated_status_20140725.csv", function(data){
//         console.log( data.filter(function(d){ return d.lineID == 4;}))
//         });

$(document).ready(ready);
