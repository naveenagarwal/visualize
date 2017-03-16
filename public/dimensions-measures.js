$(".analyze").click(function(){
  var el = $(this);
  var url = el.prev().val();

  $.ajax({
    url: url,
    dataType: "json",
    data: { request_type: "analyze" }
  }).success(function(data){
    var html = "<option value=''>Select Major</option>";
    for(m in data.measures){
      html += "<option title='" + m + "' value='" + m + "' data-options='" + JSON.stringify(data.measures[m]) + "'>" + m + "</option>";
    }
    el.parent().parent().find(".measures").empty().append(html);

    html = ''
    for(var i=0; i < data.dimensions.length; i++){
      html += "<option title='" + data.dimensions[i] + "' value='" + data.dimensions[i] + "'>" + data.dimensions[i] + "</option>"
    }
    el.parent().parent().find(".dimensions").empty().append(html);

  }).error(function(err){
    console.log(err);
    alert("error");
  });
});

$(".measures").on("change", function(){
  var el = $(this);
  var options = el.children('option:selected').data("options")

  if(options === undefined){
    el.parent().parent().find(".select-measures").empty().append('');
    return;
  }

  var html = "";
  for(var i=0; i < options.length; i++){
    html += "<option title='" + options[i] + "' value='" + options[i] + "'>" + options[i] + "</option>"
  }
  el.parent().parent().find(".select-measures").empty().append(html);
});

$(".plot").click(function(){
  var el = $(this).parent().parent().parent();
  var data = {
    measure_type: el.find(".measures:first").val(),
    measures: el.find(".select-measures:first").val(),
    dimensions: el.find(".dimensions:first").val(),
    request_type: "plot_graph"
  };

  if(!data.dimensions){
    alert("select one dimension at least.");
    return
  }

  $.ajax({
    url: el.find(".url").val(),
    data: data,
    dataType: "json"
  }).success(function(data){
    console.log(el);
    plotBarGraph(data, el);
  }).error(function(err){
    console.log(err);
    alert("error");
  })
});
