
// IMPORTAR JSON
d3.json("./data/samples.json").then(f=> 
    console.log(f.samples)
    );

//  CREAR LISTA
let options = d3.json("./data/samples.json").then((d=>{
    let subjectIds = [];

    let select = document.getElementById("#selDataset")

    let s = Object.values(d.samples);
    let dropdownList = s.forEach(el => {return el.id})

    console.log(options)

    for (let i = 0; i < options.lenght; i++) {
        let opt = options[i];
        let el = document.createElement("option")

        el.value = opt;

        select.appendChild(el)
    };

function buildBarPlot() {
    d3.json("./data/samples.json").then((d)=> {
        let preset = "940";

        let samples = d.samples;
        let filteredResult = samples.filter(sampleObject => sampleObject.id == preset);
        let result = filteredResult[0];
        // RANKEAR TOP TEN
        let sampleValues = result.sample_values.slice(0,10);
        let otuIds = result.otu_ids.slice(0,10);
        let otuLabels = result.otu_labels.slice(0,10);

        // TRACE FOR OTUS DATA
        let trace = {
            y:otuIds,
            name: name,
            x:sampleValues,
            width: 100,
            // name: "name",
            // text: otuLabels,
            type: "bar",
            orientation: "h"
        };
        // ASIGNAR DATA
        let plotData = [trace];
        // APLICAR EL GROUP BAR AL LAYOUT
        let plotLayOut = {
            title: "Top 10 OTUS",
            width: 1000,
            height: 1000,

            yaxis: {title: "OTU ID"}
        };
        // DEFINIR EL PLOT A UTILIZAR CON EL DIV TAG ID "BAR"
        Plotly.newPlot("bar", plotData, plotLayOut);
        console.log(result);
        console.log(sampleValues);
        console.log(otuIds);
        console.log(otuLabels);
    });
};

buildBarPlot();

function buildBubblePlot() {
    d3.json("./data/samples.json").then((d)=> {
        let preset = "1510";

        let samples = d.samples;
        let filteredResult = samples.filter(sampleObject => sampleObject.id == preset);
        let result = filteredResult[0];
        // RANKEAR TOP TEN
        let sampleValues = result.sample_values.slice(0,10);
        let otuIds = result.otu_ids.slice(0,10);
        let otuLabels = result.otu_labels.slice(0,10);

        // TRACE FOR OTUS DATA
        let trace = {
            y:otuIds,
            x:sampleValues,
            text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
            mode: 'markers',
            marker: {
              color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
              size: [40, 60, 80, 100]
            }
          };
          
          let plotData = [trace];
          
          let plotLayOut = {
            title: 'Bubble Chart Hover Text',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.buildBubblePlot('bubble', plotData, plotLayOut);

    });
};

buildBubblePlott();


// CREAR FUNCION PARA TRAER DATA
function getData() {
    let selectedOption = d3.select("#selDataset").node().value;
    // CREAR ESCUCHADOR Y ALMACENARLA !!!!!REVISAR EL ID
    let choice = d3.selectAll("#selDataset").on("change", getData);
    // ASIGNAR A UNA VARIABLE LA INFORMACIÓN QUE INGRESO EL USUARIO
    let subjectIds = selectedOption.property("value");


    let options = d3.json("./data/samples.json").then((d)=>{
        let subjectIds = [];

        let select = document.getElementById("#selDataset");

        let s = Object.values(d.samples);
        let dropdownList = s.forEach(el => {return el.id})

        console.log(options)

        for( i = 0; i < options.lenght; i++) {
            let opt = options[i];
            let el = document.createElement("option");

            el.value = opt;

            select.appendChild(el)
        }
    });
    }   
}));
