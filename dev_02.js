
d3.json("dev_02.json").then((d,i)=>{
  const transformedData = Object.entries(d[0]).map(([key,value]) => {
    return value
  })
  const transformedKey = Object.entries(d[0]).map(([key,value]) => {
    return key
  })
  let width = 1000,height=800;
  // let color = d3.scaleLinear()
  //               .domain([d3.min(transformedData),d3.max(transformedData)])
  //               .range(["#e09c09","#4a68ed","blue"])
  var color = d3.scaleQuantize()
    .domain([d3.min(transformedData),d3.max(transformedData)])
    .range(["#e09c09","#4a68ed","#4451e3"]);
  let svg = d3.select("body").append("svg")
              .attr("width",width)
              .attr("height",height);
  let data = d3.pie().sort(null).value(function(d,i){
                return d
              })(transformedData);

  let segmant = d3.arc()
                  .innerRadius(0)
                  .outerRadius(190)
                  .padAngle(20)
                  .padRadius(20);

  let section = svg.append("g").attr("transform","translate(250,250)")
                      .selectAll("path").data(data).enter()
                      .append("path")
                      .attr("d",segmant)
                      .attr("fill",function(d,i){
                        return color(d.value)
                      })

  let label = d3.select("g").selectAll("text").data(data).enter()
              .append("text").each(function(d){
              let center = segmant.centroid(d);
              d3.select(this)
                .attr("x",center[0])
                .attr("y",center[1])
                .attr("class","text")
                .text(d.value/4*100 +"%")
              }).on("mousemove",function(d){

              })

  let legends = svg.append("g").attr("transform","translate(600,220)")
                   .selectAll(".legeneds").data(transformedData).enter().append("g")
                   .classed("legeneds",true).attr("transform",function(d,i){
                      return "translate(10,"+ (i-1) *30 + ")"
                   });
    legends.append("circle").attr("cx",15).attr("cy",10).attr("r",10)
           .attr("fill",function(d,i){
              return color(d);
           });
    legends.append("text").text(function(d,i){
      return transformedKey[i]
    })
    .attr("fill",function(d){
        return color(d)
      })
    .attr("x",30)
    .attr("y",15);



})
