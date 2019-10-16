
d3.json("dev_02.json").then((d,i)=>{
  const value = Object.entries(d[0]).map(([key,value]) => {
    return value
  })
  const key = Object.entries(d[0]).map(([key,value]) => {
    return key
  })
  let width = 1000,height=800;
  /* let color = d3.scaleLinear()
                 .domain([d3.min(value),d3.max(value)])
                 .range(["#e09c09","#4a68ed","blue"])
   var color = d3.scaleQuantize()
     .domain([d3.min(value),d3.max(value)])
     .range(["#e09c09","#4a68ed","#4451e3"]);
  */
  let color=[
    {d1:"#406ac7"},
    {d1:"red"},
    {d1:"#f7ab07"}
  ]
  let svg = d3.select("body").append("svg")
              .attr("width",width)
              .attr("height",height);
  let data = d3.pie().sort(null).value(function(d,i){
                return d
              })(value);
  let segmant = d3.arc()
                  .innerRadius(0)
                  .outerRadius(190)
                  .padAngle(20)
                  .padRadius(20);
  let tempColor;
  let section =  svg.append("g").attr("transform","translate(250,250)")
                    .selectAll("path").data(data).enter()
                    .append("path")
                    .attr("d",segmant)
                    .attr("fill",function(d,i){
                      return color[i].d1;
                    })
  let tooltips = d3.select("body")
                   .append("div")
                   .style("position","absolute")
                   .style("padding","0 10px")
                   .style("background","white")
                   .style("opacity",0);
  let label = d3.select("g").selectAll("text").data(data).enter()
              .append("text").each(function(d){
              let center = segmant.centroid(d);
              d3.select(this)
                .attr("x",center[0]-29)
                .attr("y",center[1])
                .attr("class","text")
                .text((d.value/7*100).toFixed(1)+"%")
              })
              .on("mouseover",function(d,i){
                tooltips.transition()
                        .duration(200)
                        .style('opacity',.9)
                tooltips.html(value[i])
                .style("left" , (d3.event.pageX-35) + "px")
                .style("top", (d3.event.pageY-30) + "px")
                tempColor = this.style.fill
                d3.select(this)
                  .style("fill","yellow")
              })
              .on("mouseout",function(d){
                tempColor = this.style.fill
                d3.select(this)
                  .style("fill","white")
              })


  let legends = svg.append("g").attr("transform","translate(600,220)")
                   .selectAll(".legeneds").data(value).enter().append("g")
                   .classed("legeneds",true).attr("transform",function(d,i){
                      return "translate(10,"+ (i-1) *30 + ")"
                   });
    legends.append("circle").attr("cx",15).attr("cy",10).attr("r",10)
           .attr("fill",function(d,i){
              return color[i].d1;
           });
    legends.append("text").text(function(d,i){
      return key[i]
    })
    .attr("fill",function(d,i){
        return  color[i].d1;
      })
    .attr("x",30)
    .attr("y",15);
})
