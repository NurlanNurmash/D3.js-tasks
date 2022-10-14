async function drawscatter() {
    let data1 = []
    let data2 = []
    max = 100
    min = 10
    for (let i = 0; i<50; i++){
        data1.push({'X' : Math.floor(Math.random() * (max - min + 1) + min),
            'Y' : Math.floor(Math.random() * (max - min + 1) + min)
        })
    }
    for (let i = 0; i<50; i++){
        data2.push({'X' : Math.floor(Math.random() * (max - (min+10) + 1) + (min+10)),
            'Y' : Math.floor(Math.random() * (max - (min+10) + 1) + (min+10))
        })
    }
    // console.log(data1)
    // console.log(data2
    const parent = d3.select("#wrapper")
    parent.selectAll('*').remove()

    var width = 700; height = 500
    var spacing = 100;
    var svg = parent.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate("+ spacing/2 + "," + spacing/2 + ")")

    var xScaler = d3.scaleLinear()
        .domain([d3.min(data1, function(d){return d.X}), d3.max(data1, function(d){return d.X;})+10])
        .range([0, width-spacing-50]);
    var yScaler = d3.scaleLinear()
        .domain([0, d3.max(data1, function(d){return d.Y})+10])
        .range([height-spacing, 0])
    var xAxis = d3.axisBottom(xScaler)
    var yAxis = d3.axisLeft(yScaler)

    svg.append("g")
        .attr("transform", "translate(0, " + (height-spacing) + ")")
        .call(xAxis)
    svg.append("g").call(yAxis)

    var dots = svg.append("g")
        .selectAll("dot")
        .data(data1);
    dots.enter().append("circle")
        .attr("cx", function(d) {return xScaler(d.X);})
        .attr("cy", function(d) {return yScaler(d.Y);})
        .attr("r", 5)
        .style("fill", "green")
    svg.append('text')
        .attr("x", height/2)
        .attr("y", height-60)
        .text("X")
    svg.append('text')
        .attr("y", height/2.5)
        .attr("x", -40)
        .text("Y")
    svg.append('text')
        .attr("y", -20)
        .attr("x", width/3)
        .style("font-size", "20px")
        .text("Scatter Plot")
    svg.append("circle")
        .attr("cx",width-140)
        .attr("cy",0)
        .attr("r", 4)
        .style("fill", "green")
    svg.append("text")
        .attr("x", width-130)
        .attr("y", 0)
        .text("First Data")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")
    svg.append("circle")
        .attr("cx",width-140)
        .attr("cy",20)
        .attr("r", 4)
        .style("fill", "red")
    svg.append("text")
        .attr("x", width-130)
        .attr("y", 20)
        .text("Second Data")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")

    var dots2 = svg.append("g")
        .selectAll("dot")
        .data(data2);
    dots2.enter().append("circle")
        .attr("cx", function(d) {return xScaler(d.X);})
        .attr("cy", function(d) {return yScaler(d.Y);})
        .attr("r", 5)
        .style("fill", "red")
}
async function clear(){
    // console.log(data1)
    // console.log(data2
    const parent = d3.select("#wrapper")
    parent.selectAll('*').remove()

    var width = 700;
    var height = 500;
    var spacing = 100;
    var svg = parent.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate("+ spacing/2 + "," + spacing/2 + ")")

    var xScaler = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width-spacing-50]);
    var yScaler = d3.scaleLinear()
        .domain([0, 100])
        .range([height-spacing, 0])
    var xAxis = d3.axisBottom(xScaler)
    var yAxis = d3.axisLeft(yScaler)

    svg.append("g")
        .attr("transform", "translate(0, " + (height-spacing) + ")")
        .call(xAxis)
    svg.append("g").call(yAxis)

    svg.append('text')
        .attr("x", height/2)
        .attr("y", height-60)
        .text("X")
    svg.append('text')
        .attr("y", height/2.5)
        .attr("x", -40)
        .text("Y")
    svg.append('text')
        .attr("y", -20)
        .attr("x", width/3)
        .style("font-size", "20px")
        .text("Scatter Plot")
}
clear()

