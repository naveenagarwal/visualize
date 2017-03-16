$(".analyze-sankey").click(function(){
  var el = $(this);
  var url = el.prev().val();

  $.ajax({
    url: url,
    dataType: "json",
    data: { request_type: "analyze" }
  }).success(function(data){
    var htmlSources = "",
      htmlTargets = "",
      i;

    for(i=0; i < data.sources.length; i++){
      htmlSources += "<option title='" + data.sources[i] + "' value='" + data.sources[i] + "'>" + data.sources[i] + "</option>";
    }
    for(i=0; i < data.targets.length; i++){
      htmlTargets += "<option title='" + data.targets[i] + "' value='" + data.targets[i] + "'>" + data.targets[i] + "</option>";
    }

    el.parent().parent().find(".select-sources").empty().append(htmlSources);
    el.parent().parent().find(".select-targets").empty().append(htmlTargets);

  }).error(function(err){
    console.log(err);
    alert("error");
  });
});


$(".plot-sankey").click(function(){
  var el = $(this).parent().parent().parent();

  var data = {
    sources: el.find(".select-sources:first").val(),
    targets: el.find(".select-targets:first").val(),
    request_type: "plot_graph"
  };

  $.ajax({
    url: el.find(".url-sankey").val(),
    data: data,
    dataType: "json"
  }).success(function(data){

    plotSankeyGraph(data, el, "Widgets");
  }).error(function(err){
    console.log(err);
    alert("error");
  })
});
