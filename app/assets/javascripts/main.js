// var menu;
// var lines;
// var stations;
// var this_line;
// var this_lineID;
// var nodes;
// var links;
// var margin,
//   width,
//   height;
// var force;
// var node;
// var link;
// var trunc;
// var nb;
// var svg;
// var qtr;
// var tempo;
// var value;
// var slider;
//
// function get_lines(data){
//   lines = data;
//   menu = d3.select("#menu select")
//            .on("change", change);
//
//   menu.attr("class", "drop")
//
//   menu.selectAll("option")
//     .data(data)
//     .enter().append("option")
//     .text(function(d){ return d.lineName; })
//     .attr("value", function(d){ return d.lineID});
//
//   menu.property("value",4); //set option to C5
//
//   lineNames();
// }
//
// function change(){
//   d3.select("#line-names").selectAll("div").remove();
//   lineNames();
//   d3.select("#chart").selectAll("svg").remove();
//   drawCircles();
// }
//
//
// function lineNames() {
//   d3.csv("assets/line_stations.csv", function(data){
//     this_lineID = menu.property("value");
//     this_line = data.filter(function(d){return d.lineID == this_lineID});
//     var lineLabels = d3.select("#line-names");
//
//     var line_divs = lineLabels.selectAll("div")
//     .data(this_line)
//     .enter()
//     .append("div")
//       .attr("class", function(d) { return "line-row" })
//       .attr("id", function(d,i) { return "line-row-" + i});
//
//
//     line_divs.append("div")
//       .attr("id", function(d,i) {return "line-square-" +i})
//       .attr("class", function(d,i) {return "line-square line-" +i +""});
//
//       line_divs.append("div")
//       .text( function(d) {
//          return d.stationName;
//         })
//       .attr('class', function(d) { return "line-label"});
//
//   });
// }
//
//
// function drawCircles(){
// d3.csv("assets/traffic/january2015.csv", function(data){
//   nodes = [];
// links = [];
//
// margin = 10,
//   width = 950,
//   height = 1000;
//
// minute = "";
// trunc = "0";
//
// var filtered = data.filter(function(d) {
//     return (d.lineID == parseInt(this_lineID) && d.hour == 00 && d.qtr == 2);
// });
//
//
// var nn = [];
// var f;
// for (var ii = 0; ii < filtered.length / 31; ii++){
//   var temps = 0;
//   var filters2 = filtered.filter(function(d){
//       return (parseInt(d.stationID) == ii)
//   })
//   for (var k = 0; k < filters2.length; k++){
//     temps += parseInt(filters2[k].statusN);
//   }
//   var t = Math.abs((temps / 31) * 10);
//   if (t >= 0.0 && t < 4.66)	nn[ii] = 20;
//   else if (t >= 4.66 && t < 8.22)	nn[ii] = 30;
//   else	nn[ii] = 41;
// }
//
//
//   var temp = nn.length;
//   var count = 0;
//   while (temp != 0){
//     temp = Math.floor(temp / 2);
//     count++;
//   }
//
//   var right = true;
//   var cx = 0;
//   var cy = 160;
//   var tempi = 0;
//
// for (var i = 0; i < nn.length; i++){
//   if (right == true){
//     if (tempi < count){
//       cx = cx + 150;
//       nodes.push({"station": filtered[i]['stationID'], "size": nn[i], "cx": cx, "cy": cy});
//       tempi++;
//     }
//     else{
//       if (tempi == count){
//         cy = cy + 130;
//         nodes.push({"station": filtered[i]['stationID'], "size": nn[i], "cx": cx, "cy": cy});
//         right = false;
//         tempi = 1;
//       }
//       else{}
//     }
//   }
//   else{
//     if (tempi < count){
//       cx = cx - 150;
//       nodes.push({"station": filtered[i]['stationID'], "size": nn[i], "cx": cx, "cy": cy});
//       tempi++;
//     }
//     else{
//       if (tempi == count){
//         cy = cy + 130;
//         nodes.push({"station": filtered[i]['stationID'], "size": nn[i], "cx": cx, "cy": cy});
//         right = true;
//         tempi = 1;
//       }
//       else{}
//     }
//   }
// }
//
// for (var j = 0; j < nodes.length - 1; j++){
//   links.push({"source": j, "target": j+1});
// }
//
//
// svg = d3.select('#chart').append('svg')
//   .attr("width", width)
//   .attr("height", height);
//
// console.log(nodes);
//
//
// force = d3.layout.force()
//   .size([width, height])
//   .nodes(nodes)
//   .links(links);
//
// force.linkDistance(250)
// force.friction(0.9)
// force.charge(-30)
//   force.gravity(0.1);
//
// link = svg.selectAll('.link')
//   .data(links)
//   .enter().append('line')
//   .attr("stroke", "#A7AAAE")
//   .style("stroke-dasharray", ("3, 3"))
//   .attr("stroke-width", 2.5);
//
//
// node = svg.selectAll('.node')
//   .data(nodes)
//   .enter().append('circle')
//   .attr('class', function(d,i) {return "line-square line-" +i +""});
//
// force.on('tick', function() {
//   node.attr("r", function(d, i){
//     return nn[i];
//   })
//       .attr("cx", function(d) {
//     return d.cx;
//   })
//   .attr("cy", function(d){
//     return d.cy;
//   });
//
//   link.attr("x1", function(d) { return d.source.cx; })
//     .attr("y1", function(d) { return d.source.cy; })
//     .attr("x2", function(d) { return d.target.cx; })
//     .attr("y2", function(d) { return d.target.cy; });
// });
//
// force.start();
// });
//
//
// }
//
// function drawSlider(data){
//   slider = d3.slider().axis(
//   d3.svg.axis().orient("top").ticks(23)
//   .tickFormat(function(d){ return d + ":00"}))
//   .min(0).max(23)
// .step(0.25).value(0.50);
//
//   d3.select('#slider').call(slider.on("slide", function(evt, value) {
//   //var qtr;
//   this.value = value;
//   var minute;
//   var hour;
//   d3.select('#slider7text').text(function(d,i) {
//     if (value - Math.floor(value) == 0.25){
//       minute = "15";
//       qtr = 1;
//       hour = value - 0.25;
//     }
//     else if (value - Math.floor(value) == 0.50){
//       minute = "30";
//       qtr = 2;
//       hour = value - 0.50;
//     }
//     else if (value - Math.floor(value) == 0.75){ minute = "45"; qtr = 3; hour = value - 0.75;}
//     else { minute = "00"; qtr = 4; hour = value;}
//     return Math.floor(value) + ":" + minute;
//   });
//   var filters = data.filter(function(d) {
//     if (value >= 10){
//       //var temp;
//       if (qtr == 4){
//         tempo = hour - 1;
//       }
//       else	tempo = hour;
//       return (d.lineID == parseInt(this_lineID) && d.hour == tempo && d.qtr == qtr);
//     }
//     else{
//       //var temp;
//       if (qtr == 4){
//         tempo = hour - 1;
//       }
//       else	tempo = trunc+hour;
//       return (d.lineID == parseInt(this_lineID) && d.hour == (tempo) && d.qtr == qtr )
//     }
//
//   });
//
//   //var station_length = filters.length / 31;
//   nb = [];
//
//   for (var ii = 0; ii < filters.length / 31; ii++){
//     var sum = 0;
//     var filters2 = filters.filter(function(d){
//       return (parseInt(d.stationID) == ii)
//     })
//     for (var k = 0; k < filters2.length; k++){
//       sum += parseInt(filters2[k].statusN);
//     }
//     var t = Math.abs((sum / 31) * 10);
//     if (t >= 0.0 && t < 4.66)	nb[ii] = 20;
//     else if (t >= 4.66 && t < 8.22)	nb[ii] = 30;
//     else	nb[ii] = 41;
//   }
//
//   // transition here by editing radius of nodes
//   // select all nodes? then edit radius
//
//   //if (filters[i].statusN == 0){ nb[i] = 20}
//   //else if (filters[i].statusN == 1){ nb[i] = 30}
//   //else {nb[i] = 41};
//
//   d3.selectAll("circle").transition().duration(700)
//   .attr("r", function(d, i){
//     return nb[i];
//   });
//
//
// }));
// }
//
//
// function ready() {
// d3.csv("assets/line_names.csv", get_lines);
// drawCircles();
// d3.csv("assets/traffic/january2015.csv", drawSlider);
// }
// // d3.csv("data/collated_status_20140725.csv", function(data){
// //         console.log( data.filter(function(d){ return d.lineID == 4;}))
// //         });
//
//
// $(document).ready(ready);
//bubble
function bubbleSort(arr){
   var len = arr.length;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       if(arr[j-1]>arr[j]){
           var temp = arr[j-1];
           arr[j-1] = arr[j];
           arr[j] = temp;
        }
        alert(arr);
     }

   }
   return arr;
}

//selection
function selectionSort(arr){
  var minIdx, temp,
      len = arr.length;
  var b = [];
  for(var i = 0; i < len; i++) {

    minIdx = i;
    for(var  j = i+1; j<len; j++){
       if(arr[j]<arr[minIdx]){
          minIdx = j;
       }
    }
    temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
    alert("Selection Sort in Progress: " + arr.join(", "));

  }

  return arr;

}

//insertion
function insertionSort(items) {
    var len     = items.length,     // number of items in the array
        value,                      // the value currently being compared
        i,                          // index into unsorted section
        j;

    for (i=0; i < len; i++) {
        value = items[i];
        alert("We will now insert " + value);
        for (j=i-1; j > -1 && items[j] > value; j--) {
            items[j+1] = items[j];
        }
        items[j+1] = value;
        alert(items.slice(0,i+1));

    }
    alert("Yippee! The array is now sorted!")
    return items;
}

//merge
function merge(left, right){

    var result  = [],
        il      = 0,
        ir      = 0;

    while (il < left.length && ir < right.length){
        if (left[il] < right[ir]){
            result.push(left[il++]);

        } else {
            result.push(right[ir++]);

        }
    }
    var tmp =result.concat(left.slice(il)).concat(right.slice(ir));
    alert(tmp);
    return tmp;
}

function mergeSort(items){


    // Terminal case: 0 or 1 item arrays don't need sorting
    if (items.length < 2) {
        return items;
    }

    var middle = Math.floor(items.length / 2),
        left    = items.slice(0, middle),
        right   = items.slice(middle);
        alert(left);
        alert(right);

    return merge(mergeSort(left), mergeSort(right));
}

//quick
function quickSort(items) {
    quickSort1(items, 0, items.length-1);
}

function quickSort1(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort1(items, left, index - 1);
        }
        if (index < right) {
            quickSort1(items, index, right);
        }
    }
    return items;
}

function partition(items, left, right) {
    var pivot   = items[left],
        i       = left,
        j       = right,
        mid =  Math.floor((right + left) / 2);
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
        alert(items);
    }

    return i;
}


function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

//bucket

function bucketSort(array, bucketSize) {
  if (array.length === 0) {
    return array;
  }
  //maxValue
  var i;
  var minValue = array[0];
  var maxValue = array[0];
  for (i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }

  //buckets
  var BUCKET_SIZE = 10;
  bucketSize = BUCKET_SIZE;
  var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  var buckets = new Array(bucketCount);
  for (i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }

  //Input array values into buckets
  for (i = 0; i < array.length; i++) {
    buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
  }

  array.length = 0;
  for (i = 0; i < buckets.length; i++) {
    if(buckets[i]!=null) {

    }
    insertionSort1(buckets[i]);

    for (var j = 0; j < buckets[i].length; j++) {
      array.push(buckets[i][j]);
      alert(array);
    }

  }

  return array;
}

function insertionSort1(items) {
    var len     = items.length,
        value,
        i,
        j;

    for (i=0; i < len; i++) {
        value = items[i];
        for (j=i-1; j > -1 && items[j] > value; j--) {
            items[j+1] = items[j];
        }
        items[j+1] = value;

    }
    return items;
}

//radix


function radixSort(array, maxDigitSymbols) {
  var counter = [[]];
        var mod = 10;
        var dev = 1;
        for (var i = 0; i < maxDigitSymbols; i++, dev *= 10, mod *= 10) {
            for(var j = 0; j < array.length; j++) {
                var bucket = parseInt((array[j] % mod) / dev);
              if(counter[bucket]==null) {
                counter[bucket] = [];
              }
              counter[bucket].push(array[j]);
            }
            var pos = 0;
            for(var j = 0; j < counter.length; j++) {
                var value = null;
              if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                    array[pos++] = value;
                }
              }
            }
          alert(array);
        }
}



  function isSorted(v){
      for(var i=1; i<v.length; i++) {
          if (v[i-1] > v[i]) { return false; }
      }
      return true;
  }

  function bogosort(v) {
      var sorted = false;
      while(sorted == false){
          v = shuffle(v);
          sorted = isSorted(v);
      }
      return v;
  }


  function shuffle(a) {

        for (var i=a.length-1; i>0; i--) {
            // j is a random integer [0-i]
            var j = Math.floor(Math.random()*(i+1));
            swap(a, j, i);
        }
        alert(a);
        return a;
    }

window.onload += function () {


  // var a=[2,1,4,7,5];
  document.getElementById("play1").addEventListener("click", function() {
    var a;

    a = document.getElementById("bubble").value;
    var b = a.split(',').map(Number);
    alert(b);
    bubbleSort(b);
    document.getElementById("bs").innerHTML=(b.join(", "));
  });


  document.getElementById("play2").addEventListener("click", function() {
    var a;

    a = document.getElementById("selection").value;
    var b = a.split(',').map(Number);
    alert("Time to sort using my fantastic selection sort! Array: " + b);
    selectionSort(b);
    //console.log(c);
    document.getElementById("ss").innerHTML=(b.join(", "));
  });


  document.getElementById("play3").addEventListener("click", function() {
    var a;

    a = document.getElementById("insert").value;
    var b = a.split(',').map(Number);
    console.log(b);
    insertionSort(b);
    document.getElementById("is").innerHTML=(b.join(", "));
  });



  document.getElementById("play4").addEventListener("click", function() {
    var a = [];
    var b =[];
    //var c= [];
    alert("We recursively slice the array until only one element is remaining.")
    a = document.getElementById("merge").value;

    b = mergeSort(a.split(',').map(Number));
    console.log(b);
    document.getElementById("ms").innerHTML=(b.join(", "));

  });



  document.getElementById("play5").addEventListener("click", function() {
    var a;

    a = document.getElementById("quick").value;
    var b = a.split(',').map(Number);
    quickSort(b);
    document.getElementById("qs").innerHTML=(b.join(", "));
  });



  document.getElementById("play6").addEventListener("click", function() {
    var a;

    a = document.getElementById("bucket").value;
    var b = a.split(',').map(Number);
    bucketSort(b,0,b.length,10);
    document.getElementById("bs2").innerHTML=(b.join(", "));
  });


  document.getElementById("play7").addEventListener("click", function() {
    var a;
    var num;

    a = document.getElementById("radix").value;
    var b = a.split(',').map(Number);
    for(var i =0; i<b.length; i++) {
      if (b[i]>1000) {
        document.getElementById("rs").innerHTML="Oops, only enter values less than 1000."
      }
      else {
        radixSort(b, 3);
        document.getElementById("rs").innerHTML=(b.join(", "));
      }
    }
  });



  document.getElementById("play8").addEventListener("click", function() {
    var a;
    var num;

    a = document.getElementById("bogo").value;
    var b = a.split(',').map(Number);
    bogosort(b);
    document.getElementById("bs3").innerHTML=(b.join(", "));
  });


};
