async function build() {
    const df = await d3.csv("df.csv");

    var dimension = {
        width: window.innerWidth*0.8,
        height: window.innerWidth*0.8,
        margin: {
            top: 50,
            right: 10,
            bottom: 10,
            left: 55
        }
    }

    dimension.boundedWidth = dimension.width
        - dimension.margin.right
        - dimension.margin.left;

    dimension.boundedHeight = dimension.height
        - dimension.margin.top
        - dimension.margin.bottom;

    // console.table(df);
    const new_df = Object.entries(df)
        .map((elem, y, lst) => {
            const uel = df.columns.slice(1);
            const vel = Object.values(elem[1])[0];
            return uel
                .map((uelId, x) => ({
                    id: `${vel}-${uelId}`,
                    x,
                    y,
                    weight: parseInt(elem[1][uelId] || "0"),
                }))
                .slice(0, lst.length);
        })
        .slice(0, Object.entries(df).length - 1)
        .flat();


    const colNames = df.columns.slice(1);
    const rowNames = Object.values(df)
        .map((value) => Object.values(value)[0])
        .slice(0, df.length);

    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimension.width)
        .attr("height", dimension.height)

    const bounds = wrapper.append("g")
        .style("transform",`translate(${dimension.margin.left}px,${dimension.margin.top}px)`);
    // console.log(adjacencyMatrix(nodes,edges));
    const pole = bounds
        .selectAll("rect")
        .data(new_df)
        .enter()
        .append("rect")
        .attr("class","grid")
        .attr("width",25)
        .attr("height",25)
        .attr("x", d=>d.x*25)
        .attr("y", d=>d.y*25)
        .style("fill-opacity", d=>d.weight*0.2)

    const namesX = wrapper
        .append("g")
        .attr("transform","translate(55,25)")
        .selectAll("text")
        .data(colNames)
        .enter()
        .append("text")
        .attr("y",(d,i)=> i*25+12.5)
        .text(d=>d.id)
        .style("text-anchor","middle")
        .attr("transform", "rotate(270)");

    const namesY = wrapper
        .append("g")
        .attr("transform","translate(45,50)")
        .selectAll("text")
        .data(rowNames)
        .enter()
        .append("text")
        .attr("y",(d,i)=> i*25+12.5)
        .text(d=>d.id)
        .style("text-anchor","end");
}
build();