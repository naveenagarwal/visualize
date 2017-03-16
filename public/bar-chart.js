// var data = [23, 13, 21, 14, 37, 15, 18, 34, 30];
var data = [
  { name: "Men", value: 20 },
  { name: "Women", value: 10 },
  { name: "Average", value: 15 },

];


var plotBarGraph = function(data, el){
  if(el){
    el.find(".chart").html('');
  }
  console.log(data);
  var dataArray = []
  for(k in data){
    dataArray.push([k, data[k]]);
  }

  var chart = c3.generate({
      bindto: '#chart-1',
      data: {
          columns: dataArray, //data.map(function(d){ return [ d.name, d.value ] }),
          type: 'bar'
      },

  });

}

// plotGraph(data);