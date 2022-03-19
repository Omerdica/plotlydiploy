
var sortedCities = cityGrowths.sort((a,b) => a.Increase_from_2016 - b.Increase_from_2016).reverse();

var topFiveCityNames = cityGrowths.map(city => city.City);

var topFiveCityGrowths = cityGrowths.map(city => parseInt(city.Increase_from_2016));

var topFiveCityNames1 =topFiveCityNames.slice(0,5);
var topFiveCityGrowths1 = topFiveCityGrowths.slice(0,5);


 
 var trace = {
     x: topFiveCityNames1,
     y: topFiveCityGrowths1,
     type: "bar"
   };
   var data = [trace];
   var layout = {
     title: "Most Rapidly Growing Cities",
     xaxis: {title: "City" },
     yaxis: {title: "Population Growth, 2016-2017"}
   };
   Plotly.newPlot("bar-plot", data, layout);

 function newFunction() {
    console.log(topFiveCities);
 }
