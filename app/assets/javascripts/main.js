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

function drawCircles(data){
  var margin = 10,
    width = 6000,
    height = 1000;

  var nodes = [];
  var links = [];

  var filtered = data.filter(function(d) {
      return (d.lineID == 4 && d.hour == 00 && d.qtr == 1);
    });

  var temp = filtered.length;
  var count = 0;
  while (temp != 0){
    temp = Math.floor(temp / 2);
    count++;
  }

  console.log(count);

  var right = true;
  var cx = 0;
  var cy = 160;
  var tempi = 0;

  for (var i = 0; i < filtered.length; i++){
    if (right == true){
      if (tempi < count){
        cx = cx + 150;
        nodes.push({"station": filtered[i]['stationID'], "size": filtered[i]['statusN'], "cx": cx, "cy": cy});
        tempi++;
      }
      else{
        if (tempi == count){
          cy = cy + 100;
          nodes.push({"station": filtered[i]['stationID'], "size": filtered[i]['statusN'], "cx": cx, "cy": cy});
          right = false;
          tempi = 1;
        }
        else{}
      }
    }
    else{
      if (tempi < count){
        cx = cx - 150;
        nodes.push({"station": filtered[i]['stationID'], "size": filtered[i]['statusN'], "cx": cx, "cy": cy});
        tempi++;
      }
      else{
        if (tempi == count){
          cy = cy + 100;
          nodes.push({"station": filtered[i]['stationID'], "size": filtered[i]['statusN'], "cx": cx, "cy": cy});
          right = true;
          tempi = 1;
        }
        else{}
      }
    }
  }

  for (var j = 0; j < nodes.length - 1; j++){
    links.push({"source": j, "target": j+1});
  }


  var svg = d3.select('svg')
    .attr("width", width)
    .attr("height", height);

  var force = d3.layout.force()
    .size([width, height])
    .nodes(nodes)
    .links(links);

  force.linkDistance(250)
  force.friction(0.9)
  force.charge(-30)
    force.gravity(0.1);

  var link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
  .attr("stroke", "#59ADEB")
  .attr("stroke-width", 3);



  var node = svg.selectAll('.node')
    .data(nodes)
    .enter().append('circle')
    .attr('class', function(d,i) {return "line-square line-" +i +""});

  force.on('tick', function() {
    // if 19 (blank) mod 3 and not equal to 1 >= 4 three or more rows
    // 19, 5 circles each row (3) + 4 circles last row (1)



    node.attr("r", function(d, i){
      if (d.size == 0) {return 20}
      else if (d.size == 1) {return 40}
      else {return 60};
    })
        .attr("cx", function(d) {
      return d.cx;
    })
    .attr("cy", function(d){
      return d.cy;
    });

    link.attr("x1", function(d) { return d.source.cx; })
      .attr("y1", function(d) { return d.source.cy; })
      .attr("x2", function(d) { return d.target.cx; })
      .attr("y2", function(d) { return d.target.cy; });


});

force.start();


  /*
  d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .selectAll("circle")
    .data(filtered)
    .enter().append("circle")
    .attr("class", function(d,i) {return "line-square line-" +i +""})
    .attr("cx", function(d, i) {
      return (i+1) * 90;
    })
    .attr("cy", 160)
    .attr("r", function(d, i){
      if (d.statusN == 0) {return 20}
      else if (d.statusN == 1) {return 40}
      else {return 60};
    })
  */
}

function ready() {
  d3.csv("assets/line_stations.csv", lineNames);
  d3.csv("assets/traffic/collated_status_20140725.csv", drawCircles);
}
// d3.csv("data/collated_status_20140725.csv", function(data){
//         console.log( data.filter(function(d){ return d.lineID == 4;}))
//         });

$(document).ready(ready);
