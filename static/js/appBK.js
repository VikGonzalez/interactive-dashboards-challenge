d3.json("./data/samples.json").then(f=> console.log(f.samples));

//  CREAR LISTA
let options = d3.json("./data/samples.json").then((d=>{
    let subjectIds = [];

    let select = document.getElementById("#selDataset")

    let s = Object.values(d.samples);
    let dropdownList = s.forEach(el => {return el.id})

    console.log(options)

    for (var i = 0; i < options.lenght; i++) {
        let opt = options[i];
        let el = document.createElement("option")

        el.value = opt;

        select.appendChild(el)
    };

function buildPlot() {
    d3.json("./data/samples.json").then((d)=> {
        let preset = "1510";

        let samples = d.samples;
        let filteredResult = samples.filter(sampleObject => sampleObject.id == preset);
        let result = filteredResult[0];

        let sampleValues = result.sample_values.slice(0,10);
        let otuIds = result.otu_ids.slice(0,10);
        let otuLabels = result.otu_labels.slice(0,10);

        let trace = {
            x:otuIds,
            y:sampleValues,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };

        let plotData = [trace];

        let layOut = {
            title: "Top 10 OTUS",
            yAxis: {title: "OTU ID"}
        };
        // DEFINIR EL PLOT A UTILIZAR
        Plotly.newPlot("bar", plotData, layOut);
        console.log(result);
        console.log(sampleValues);
        console.log(otuIds);
        console.log(otuLabels);
    });
};

buildPlot();
// CREAR ESCUCHADOR Y ALMACENARLA !!!!!REVISAR EL ID
let choice = d3.selectAll("#selDataset").on("change", getData);

// CREAR FUNCION PARA TRAER DATA
function getData() {

    let dropdownMenu = d3.select("#selDataset");
    // EXTRAE LA INFORMACIÓN QUE INGRESO EL USUARIO
    let subjectIds = dropdownMenu.property("value");


    let options = d3.json("./data/samples.json").then((d)=>{
        let subjectIds = [];

        let select = document.getElementById("#selDataset");

        let s = Object.values(d.samples);
        let dropdownList = s.forEach(el => {return el.id})

        console.log(options)

        for(var i = 0; i < options.lenght; i++) {
            let opt = options[i];
            let el = document.createElement("option");

            el.value = opt;

            select.appendChild(el)
        }
    });
    }   
}));
