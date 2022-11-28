async function drawBar(path, element, name) {

    const dataset = await d3.json(path)
    //Accessor
    const xAccessor = d => d.Comp1;
    const yAccessor = d => d.Comp2;
    console.log(yAccessor((dataset)))

    const width = 550
    let dimensions = {
        width: width,
        height: width * 0.6,
        margin: {
            top: 20,
            right: 30,
            bottom: 20,
            left: 30,
        },
    }
    dimensions.boundedWidth = dimensions.width
        - dimensions.margin.left
        - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height
        - dimensions.margin.top
        - dimensions.margin.bottom

    // 3. Draw canvas

    const wrapper = d3.select(element)
        .html("") // clear div before drawing
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);

    const bounds = wrapper.append("g")
        .style("translate",`translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`);

    const xScaler = d3.scaleLinear()
        .domain(d3.extent(dataset,xAccessor))
        .range([0,dimensions.boundedWidth + 10])
        .nice()


    const yScaler = d3.scaleLinear()
        .domain(d3.extent(dataset,yAccessor))
        .range([dimensions.boundedHeight,10])

    const xAxisGen = d3.axisBottom()
        .scale(xScaler);
    const xAxis = bounds.append("g")
        .call(xAxisGen)
        .attr("transform", `translate(${50},${dimensions.boundedHeight} )`);


    // y axis
    const yAxisGen = d3.axisLeft()
        .scale(yScaler);
    const yAxis = bounds.append("g")
        .call(yAxisGen)
        .attr("transform", `translate(${50}, 0)`);

    const xLabel = bounds.append("text")
        .attr("x",dimensions.boundedWidth - 30)
        .attr("y",dimensions.boundedHeight + 30)
        .text("Component2")
        .attr("fill","black")
        .attr("font-size","12px")
        .attr("text-anchor","middle");

    const yLabel = bounds.append("text")
        .attr("x",10)
        .attr("y",30)
        .attr('transform', 'translate(-5, 90)rotate(-90)')
        .text("Component 1")
        .attr("fill","black")
        .attr("font-size","12px")
        .attr("text-anchor","middle");

    const labels = bounds.append("text")
        .attr("x",250)
        .attr("y",100)
        .text("class 0")
        .attr("fill","red")
        .attr("font-size","12px")
        .attr("text-anchor","middle");

    const labels1 = bounds.append("text")
        .attr("x",250)
        .attr("y",110)
        .text("class 1")
        .attr("fill","green")
        .attr("font-size","12px")
        .attr("text-anchor","middle");

    const labels2 = bounds.append("text")
        .attr("x",250)
        .attr("y",120)
        .text("class 0")
        .attr("fill","blue")
        .attr("font-size","12px")
        .attr("text-anchor","middle");

    const chart = bounds.append("text")
        .attr("x",270)
        .attr("y",20)
        .text(name)
        .attr("fill","black")
        .attr("font-size","15px")
        .attr("text-anchor","middle");

    const scatter = bounds.append('g')
        .selectAll("dot")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScaler(d["Comp1"]) - 50; } )
        .attr("cy", function (d) { return yScaler(d["Comp2"]) + 50 - 4; } ) // - 4 is diameter
        .attr("r", 4)
        .attr("transform", "translate(" + 100 + "," + -50 + ")")
        .style("fill", function (d) { return d["Label"] == 0 ? "yellow" : d["Label"] == 1 ? "green" : "red"; });
}
const lst = ["./tsne.json", "./umap.json"]
const wrap = ["#wrapper", "#wrapper1"]
const name  = ["tsne", "umap"]
for (i in lst){
    drawBar(lst[i], wrap[i], name[i]);
}