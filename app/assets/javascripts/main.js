var menu;
var lines;
var stations;
var this_line;
var this_lineID;
var nodes;
var links;
var margin,
  width,
  height;
var force;
var node;
var link;
var trunc;
var nb;
var svg;
var qtr;
var tempo;
var value;
var slider;

function get_lines(data){
  lines = data;
  menu = d3.select("#menu select")
           .on("change", change);

  menu.attr("class", "drop")

  menu.selectAll("option")
    .data(data)
    .enter().append("option")
    .text(function(d){ return d.lineName; })
    .attr("value", function(d){ return d.lineID});

  menu.property("value",4); //set option to C5

  lineNames();
}

function change(){
  d3.select("#line-names").selectAll("div").remove();
  lineNames();
  d3.select("#chart").selectAll("svg").remove();
  drawCircles();
}


function lineNames() {
  d3.csv("assets/line_stations.csv", function(data){
    this_lineID = menu.property("value");
    this_line = data.filter(function(d){return d.lineID == this_lineID});
    var lineLabels = d3.select("#line-names");

    var line_divs = lineLabels.selectAll("div")
    .data(this_line)
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

  });
}


function drawCircles(){
d3.csv("assets/traffic/january2015.csv", function(data){
  nodes = [];
links = [];

margin = 10,
  width = 950,
  height = 1000;

minute = "";
trunc = "0";

var filtered = data.filter(function(d) {
    return (d.lineID == parseInt(this_lineID) && d.hour == 00 && d.qtr == 2);
});


var nn = [];
var f;
for (var ii = 0; ii < filtered.length / 31; ii++){
  var temps = 0;
  var filters2 = filtered.filter(function(d){
      return (parseInt(d.stationID) == ii)
  })
  for (var k = 0; k < filters2.length; k++){
    temps += parseInt(filters2[k].statusN);
  }
  var t = Math.abs((temps / 31) * 10);
  if (t >= 0.0 && t < 4.66)	nn[ii] = 20;
  else if (t >= 4.66 && t < 8.22)	nn[ii] = 30;
  else	nn[ii] = 41;
}


  var temp = nn.length;
  var count = 0;
  while (temp != 0){
    temp = Math.floor(temp / 2);
    count++;
  }

  var right = true;
  var cx = 0;
  var cy = 160;
  var tempi = 0;

for (var i = 0; i < nn.length; i++){
  if (right == true){
    if (tempi < count){
      cx = cx + 150;
      nodes.push({"station": filtered[i]['stationID'], "size": nn[i], "cx": cx, "cy": cy});
      tempi++;
    }
    else{
      if (tempi == count){
        cy = cy + 130;
        nodes.push({"station": filtered[i]['stationID'], "size": nn[i], "cx": cx, "cy": cy});
        right = false;
        tempi = 1;
      }
      else{}
    }
  }
  else{
    if (tempi < count){
      cx = cx - 150;
      nodes.push({"station": filtered[i]['stationID'], "size": nn[i], "cx": cx, "cy": cy});
      tempi++;
    }
    else{
      if (tempi == count){
        cy = cy + 130;
        nodes.push({"station": filtered[i]['stationID'], "size": nn[i], "cx": cx, "cy": cy});
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


svg = d3.select('#chart').append('svg')
  .attr("width", width)
  .attr("height", height);

console.log(nodes);


force = d3.layout.force()
  .size([width, height])
  .nodes(nodes)
  .links(links);

force.linkDistance(250)
force.friction(0.9)
force.charge(-30)
  force.gravity(0.1);

link = svg.selectAll('.link')
  .data(links)
  .enter().append('line')
  .attr("stroke", "#A7AAAE")
  .style("stroke-dasharray", ("3, 3"))
  .attr("stroke-width", 2.5);


node = svg.selectAll('.node')
  .data(nodes)
  .enter().append('circle')
  .attr('class', function(d,i) {return "line-square line-" +i +""});

force.on('tick', function() {
  node.attr("r", function(d, i){
    return nn[i];
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
});


}

function drawSlider(data){
  slider = d3.slider().axis(
  d3.svg.axis().orient("top").ticks(23)
  .tickFormat(function(d){ return d + ":00"}))
  .min(0).max(23)
.step(0.25).value(0.50);

  d3.select('#slider').call(slider.on("slide", function(evt, value) {
  //var qtr;
  this.value = value;
  var minute;
  var hour;
  d3.select('#slider7text').text(function(d,i) {
    if (value - Math.floor(value) == 0.25){
      minute = "15";
      qtr = 1;
      hour = value - 0.25;
    }
    else if (value - Math.floor(value) == 0.50){
      minute = "30";
      qtr = 2;
      hour = value - 0.50;
    }
    else if (value - Math.floor(value) == 0.75){ minute = "45"; qtr = 3; hour = value - 0.75;}
    else { minute = "00"; qtr = 4; hour = value;}
    return Math.floor(value) + ":" + minute;
  });
  var filters = data.filter(function(d) {
    if (value >= 10){
      //var temp;
      if (qtr == 4){
        tempo = hour - 1;
      }
      else	tempo = hour;
      return (d.lineID == parseInt(this_lineID) && d.hour == tempo && d.qtr == qtr);
    }
    else{
      //var temp;
      if (qtr == 4){
        tempo = hour - 1;
      }
      else	tempo = trunc+hour;
      return (d.lineID == parseInt(this_lineID) && d.hour == (tempo) && d.qtr == qtr )
    }

  });

  //var station_length = filters.length / 31;
  nb = [];

  for (var ii = 0; ii < filters.length / 31; ii++){
    var sum = 0;
    var filters2 = filters.filter(function(d){
      return (parseInt(d.stationID) == ii)
    })
    for (var k = 0; k < filters2.length; k++){
      sum += parseInt(filters2[k].statusN);
    }
    var t = Math.abs((sum / 31) * 10);
    if (t >= 0.0 && t < 4.66)	nb[ii] = 20;
    else if (t >= 4.66 && t < 8.22)	nb[ii] = 30;
    else	nb[ii] = 41;
  }

  // transition here by editing radius of nodes
  // select all nodes? then edit radius

  //if (filters[i].statusN == 0){ nb[i] = 20}
  //else if (filters[i].statusN == 1){ nb[i] = 30}
  //else {nb[i] = 41};

  d3.selectAll("circle").transition().duration(700)
  .attr("r", function(d, i){
    return nb[i];
  });


}));
}


function ready() {
d3.csv("assets/line_names.csv", get_lines);
drawCircles();
d3.csv("assets/traffic/january2015.csv", drawSlider);
}
// d3.csv("data/collated_status_20140725.csv", function(data){
//         console.log( data.filter(function(d){ return d.lineID == 4;}))
//         });


$(document).ready(ready);
