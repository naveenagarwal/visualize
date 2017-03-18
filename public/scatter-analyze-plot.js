$(".analyze-scatter").click(function(){
  var el = $(this);
  var url = el.prev().val();

  $.ajax({
    url: url,
    dataType: "json",
    data: { request_type: "analyze" }
  }).success(function(data){
    var htmlXAxis = "",
      htmlYAxis = "",
      i;

    for(i=0; i < data.x_y_axis.length; i++){
      htmlXAxis += "<option title='" + data.x_y_axis[i] + "' value='" + data.x_y_axis[i] + "'>" + data.x_y_axis[i] + "</option>";
      htmlYAxis += "<option title='" + data.x_y_axis[i] + "' value='" + data.x_y_axis[i] + "'>" + data.x_y_axis[i] + "</option>";
    }

    el.parent().parent().find(".select-x-axis").empty().append(htmlXAxis);
    el.parent().parent().find(".select-y-axis").empty().append(htmlYAxis);

  }).error(function(err){
    console.log(err);
    alert("error");
  });
});


$(".plot-scatter").click(function(){
  var el = $(this).parent().parent().parent();

  var data = {
    x: el.find(".select-x-axis:first").val(),
    y: el.find(".select-y-axis:first").val(),
    // x: escape(el.find(".select-x-axis:first").val()),
    // y: escape(el.find(".select-y-axis:first").val()),
    request_type: "plot_graph"
  };

  $.ajax({
    url: el.find(".url-scatter").val(),
    data: data,
    dataType: "json"
  }).success(function(data){
    if(data.error){
      alert(data.message);
    }else{
      plotScatterGraph(data.dataArray, data.label, el);
    }
  }).error(function(err){
    console.log(err);
    alert("error");
  })
});
