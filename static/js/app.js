
d3.json("./data/samples.json").then((importedData) => {
    console.log("importedEntireData", importedData);
    let navelData = importedData
    let sampleData = navelData.samples
    let meta = navelData.metadata
  
    let masterId = sampleData[0].id
  
    function makePlotsTable () {
  
      let dataPlot = []
  
      
      sampleData.forEach(navelSample => {
        if (masterId === navelSample.id) {
          dataPlot.push(navelSample.sample_values);
          dataPlot.push(navelSample.otu_ids);
          dataPlot.push(navelSample.otu_labels);
      
        }  
      });
      console.log("gotSampleDataSucceeded", dataPlot)
  
      let metaTable = []
  
  
      meta.forEach(subjectMeta => {
        if (masterId === subjectMeta.id) {
          metaTable.push(subjectMeta.ethnicity)
        }
      });
  
      console.log("metaTable", metaTable)
      console.log("masterID", masterId)
      console.log("meta", meta)
  
      // DEFINIR NOMBRE DE ETIQUETAS PARA SAMPLE ID
      let yFor = dataPlot[1].map(function(el){
        return "OTU" + String(el)
      });
  
      // CREAR TRACE PARA BAR PLOT
      let barTrace = [{
        x:dataPlot[0].slice(0,10).reverse(),
        y: yFor.slice(0,10).reverse(),
        text: dataPlot[2].slice(0,10),
        type: "bar",
  
        orientation: "h"
      }];
      // CREAR LAYOUT PARA BAR PLOT
      let barLayout = {
        title: "Top 10 OTUs Found",
        colorway: ['#f3cec9', '#e7a4b6', '#cd7eaf', '#a262a9', '#6f4d96', '#3d3b72', '#182844'],
        xaxis: {title: "OTU Value"}
      };
      // CREAR BAR PLOT 
      Plotly.newPlot("bar", barTrace, barLayout);
  
      // CREAR TRACE PARA BUBBLE PLOT 
      let bubbleTrace = [{
        x: dataPlot[1],
        y: dataPlot [0],
        text: dataPlot[2], 
        mode: "markers",
        marker: {
      color: [35, 10, 50, 40, 18, 30],
      colorscale: [[0, 'rgb(200, 255, 200)'], [1, 'rgb(0, 100, 0)']],
      cmin: 0,
      cmax: 50,
      size: [600, 1200, 800, 400, 1500, 2000],
      sizemode: 'area',
      showscale: true,
      colorbar: {
        thickness: 10,
        y: 0.5,
        ypad: 0,
        title: 'Tree Density',
        titleside: 'bottom',
        outlinewidth: 1,
        outlinecolor: 'black',
        tickfont: {
          family: 'Lato',
          size: 14,
          color: 'green'
        }
      }
  }
      }];
      // CREAR LAYOUT PARA BUBBLE PLOT
      let bubbleLayout = {
        title: "Subject´s OTUs population",
        yaxis: {title: "OTU Value"},
        xaxis: {title: "OTU ID"},
        colorway: ['#f3cec9', '#e7a4b6', '#cd7eaf', '#a262a9', '#6f4d96', '#3d3b72', '#182844']
        
      };
      // CREAR BUBBLE PLOT 
      Plotly.newPlot("bubble", bubbleTrace, bubbleLayout); 
  
    };
      // CREAR TABLA 
    makePlotsTable();
  
  });
