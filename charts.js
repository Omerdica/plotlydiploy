function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

}

// Demographics Panel
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    var samples1 = data.samples;
     console.log(samples1);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var idsamplenumber = samples1.filter(data => data.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = idsamplenumber[0];
    console.log(result);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuids = result.otu_ids;
    console.log(otuids);
    var otulabels = result.otu_labels;
    console.log(otulabels);
    var samplevalues = result.sample_values;
    console.log(samplevalues);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order
    //  so the otu_ids with the most bacteria are last.

    var yticks = otuids.slice(0,10).map(id => "OTU" + id).reverse();

     console.log(yticks);


    // // 8. Create the trace for the bar chart.
    //  var trace1 = {
    //    x: samplevalues.map(row => row.sample_values),
    //    y: yticks.map(row => row.otu_ids),
    //    text: otulabels.map(row => row.otu_labels),
    //    type: "bar",
    //    horizontal: true,
    //  };

    //  var barData = [trace1]

     var barData = [{
       x: samplevalues.slice(0,10).reverse(),
       y: yticks,
       text : otulabels.slice(0,10).reverse(),
       orientation: "h",
       type:  "bar",
     }];

    // 9. Create the layout for the bar chart.
    var barLayout = {
      title : "Top 10 Bacteria Cultures Found",
      paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
      //xaxis: {
      //tickvals: [0,50,100,150],
      //yaxis : yticks,
      //tickvals: [0,1,2,3,4,5,6,7,8,9],
     //}
    };

    // 10. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bar", barData, barLayout);

  //    // 1. Create the trace for the bubble chart.
          var bubbleData = [{
             x: otuids,
             y: samplevalues,
             text: otulabels,
             mode : 'markers',
             marker: {
               size: samplevalues,
               color: otuids,
               colorscale: "Earth",
               type: "heatmap"

             }
            }];
  //    // 2. Create the layout for the bubble chart.
        var bubbleLayout = {
          title: "Bacteria Cultures Per Sample",
          xaxis: {
            title: "OTU ID"},
          hovermode: "closest",
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent"
          // body: {
          //   background: "Blues"
          //   }

  };

  //    // 3. Use Plotly to plot the data with the layout.
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        // 1. Create a variable that filters the metadata array for the object with the desired sample number.
        var metadata_1 = data.metadata.filter(data => data.id == sample);
        console.log(metadata_1);
       // 2. Create a variable that holds the first sample in the metadata array.
        var samp_meta = metadata_1[0];
        console.log(samp_meta);
       // 3. Create a variable that holds the washing frequency.
        var freq = metadata_1[0].wfreq;
        console.log(freq)
  //    // 4. Create the trace for the gauge chart.
      var gaugeData = [{
        domain: { X:[0, 1], y:[0,1]},
        value: freq,
        title: {text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", 
        textcolor: "Blue"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range:[null,10], tickwidth: 2, tickcolor: "black"},
          bar: { color: "black" },
          steps: [{range :[0,2], color: "red"},
                  {range: [2,4], color: "orange"},
                  {range: [4,6], color: "yellow"},
                  {range: [6,8], color: "lime"},
                  {range: [8,10], color: "green"}, 
                ],
         
        }

       
    }];

  //    // 5. Create the layout for the gauge chart.
        var gaugeLayout = {
          width: 500,
          height: 400,
          margin: {t:0, b:0},
          paper_bgcolor: "transparent"

      };

  //    // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge", gaugeData, gaugeLayout);

     });
   }
  
  
