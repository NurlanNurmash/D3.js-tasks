async function drawBar(tempAccessor) {
    //Accessor
    const dataset = await d3.json("./my_weather_data.json")
    // const tempAccessor= d => d.temperature;
    const yAccessor = d => d.length;

    const width = 700
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

    //first we need to clear the wrapper after append
    const parent = d3.select("#wrapper")
    parent.selectAll('*').remove()

    const wrapper = parent
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);

    const bounds = wrapper.append("g")
        .style("translate", `translate(${dimensions.margin.left}+px,${dimensions.margin.top}px)`);

    const xScaler = d3.scaleLinear()
        .domain(d3.extent(dataset, tempAccessor))
        .range([75, dimensions.boundedWidth])
        .nice()

    const binsGen = d3.bin()
        .domain(xScaler.domain())
        .value(tempAccessor)
        .thresholds(8);

    const bins = binsGen(dataset);
    console.log(bins);

    const yScaler = d3.scaleLinear()
        .domain([0, d3.max(bins, yAccessor)])
        .range([dimensions.boundedHeight, 20])

    const binGroup = bounds.append("g");
    const binGroups = binGroup.selectAll("g")
        .data(bins)
        .enter()
        .append("g");


    const barPadding = 1
    const barRect = binGroups.append("rect")
        .attr("x", d => xScaler(d.x0) + barPadding / 2)
        .attr("y", d => yScaler(yAccessor(d)))
        .attr("width", d => d3.max([0, xScaler(d.x1) - xScaler(d.x0) - barPadding]))
        .attr("height", d => dimensions.boundedHeight - yScaler(yAccessor(d)))
        .attr("fill", "#AAAAEE");

    const mean = d3.mean(dataset, tempAccessor);
    console.log(mean);
    const meanLine = bounds.append("line")
        .attr("x1", xScaler(mean))
        .attr("x2", xScaler(mean))
        .attr("y1", -15)
        .attr("y2", dimensions.boundedHeight)
        .attr("stroke", "black")
        .attr("stroke-dasharray", "2px 4px");

    const meanLabel = bounds.append("text")
        .attr("x", xScaler(mean))
        .attr("y", 10)
        .text("Mean")
        .attr("fill", "maroon")
        .attr("font-size", "12px")
        .attr("text-anchor", "middle");

    const xAxisGen = d3.axisBottom()
        .scale(xScaler);
    const xAxis = bounds.append("g")
        .call(xAxisGen)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`);

    const barText = binGroups.filter(yAccessor)
        .append("text")
        .attr("x", d => xScaler(d.x0) + (xScaler(d.x1) - xScaler(d.x0)) / 2)
        .attr("y", d => yScaler(yAccessor(d)) - 5)
        .text(yAccessor)
        .attr("fill", "darkgrey")
        .attr("font-size", "12px")
        .attr("text-anchor", "middle");

    var y = d3.scaleLinear()
        .domain([0, d3.max(bins, function (d) {
            return d.length;
        })])
        .range([dimensions.boundedHeight, 20])

    bounds.append("g")
        .attr("transform", "translate(" + 75 + "," + 0 + ")")
        .call(d3.axisLeft(y));
    bounds.append('text')
        .attr("y", 40)
        .attr("x", -dimensions.boundedHeight / 2)
        .attr("transform", "rotate(-90)")
        .text("Count")
    bounds.append('text')
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", width * 0.59)
        .text("Temperature")
}


const AccessorMax = d => d.temperatureMax;
const AccessorMin = d => d.temperatureMin;
const AccessorLow = d => d.temperatureLow;
const AccessorHigh = d => d.temperatureHigh;
drawBar(AccessorMin)
