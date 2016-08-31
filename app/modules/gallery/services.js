var services = angular.module('Gallery.services', [])
.factory('GalleryDataService', ['$q', '$http', function($q, $http){
	return {
		// getGDPTop20: function(){
		// 	var defer = $q.defer(), 
		// 		self  = this;

		// 	$http({
		// 		'method': 'GET', 
		// 		'url': 'assets/gdp-data-total-top20.json'
		// 	}).then(function(response){
		// 		self.gdpTop20 = response.data;
		// 		defer.resolve(response.data);
		// 	});

		// 	return defer.promise;
		// },

		getGalleryImage: function(){
			var defer = $q.defer(), 
				self  = this;

			$http({
				'method': 'GET', 
				'url': 'assets/dog-gallery-images.json'
			}).then(function(response){
				self.galleryImage = response.data;
				defer.resolve(response.data);
			});

			return defer.promise;
		}

		
	}

}])
.factory('GalleryImageService', ['GalleryDataService', function(GalleryDataService){
	return{
		charts: [],

		
		getWholeData: function(dataName){
			this[dataName] = GalleryDataService[dataName];
			return GalleryDataService[dataName];
		},

		refreshCharts: function(dataName, force){
			if(!force){
				this.getWholeData(dataName);

			}
			// if no force: get whole data 
			//force: get only one country of data at a time (current object data after onclick)

			//after onclick: data= one rowData object 
			for(var i = 0; i < this.charts.length; i++){

				if(!angular.element(this.charts[i][0]).scope()){
					continue;
				}

				angular.element(this.charts[i][0]).scope().refresh(dataName);
			}
		},
		

		employChart: function(chart){
			this.charts.push(chart); 
		},
		 

		setRowData: function(dataName, rowData){
			this[dataName] = rowData;
			 // console.log(rowData);

			this.refreshCharts(dataName, true); 

		}, 

		// pieConfig: function(){
		// 	var data 	   = this.currentData,
		// 		seriesData = [];

		// 		// console.log(data);

		// 	//Goal: build series data for each country and 
		// 	// 	    their GDP for the last year in the entries



		// 	//loop through properties of an object
		// 	for(var d in data){
		// 		var entry = data[d];
				
		// 		var seriesObj= {
		// 			name: entry["Dog Breed"],
		// 			data: [
		// 				entry["Baby]"], 
		// 				entry["Young"],
		// 				entry["Adult"],
		// 				entry["Senior"], 
		// 			]
		// 		} 

		// 		seriesData.push(seriesObj);
		// 		// console.log(entry); 16 objects
		// 		// console.log(series);	
		// 	} 


		// 	return {
		// 		options:{
		//         	chart: {
		// 	            type: 'pie'
		// 	        }
		//         },
		//         title: {
		//             text: ''
		//         },
		//         tooltip: {
		//             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		//         },
		//         plotOptions: {
		//             pie: {
		//                 allowPointSelect: true,
		//                 cursor: 'pointer',
		//                 dataLabels: {
		//                     enabled: true,
		//                     format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		//                     style: {
		//                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		//                     }
		//                 }
		//             }
		//         },
		//         series: [{
		//             name: 'Countries',
		//             colorByPoint: true,
		//             data: seriesData
		//         }]
		//     }
		// },

		// pieConfig: function(dataName, service){
			

			
		// 	var data   	   = service[dataName],
		// 		series 	   = [];

		// 	// console.log(data);

			

		// 	//loop through properties of an object
		// 	for(var d in data){
		// 		var entry = data[d];
				
		// 		var seriesObj= {
		// 			name: entry["Dog Breed"],
		// 			data: [
		// 				{
		// 					name: "Baby",
		// 					y: entry["Baby"]
		// 				},
		// 				{
		// 					name:"Young",
		// 					y:entry["Young"]
		// 				},
		// 				{
		// 					name: "Adult",
		// 					y: entry["Adult"]},
		// 				{
		// 					name:"Senior",	
		// 					y:entry["Senior"]}
						

		// 				// entry["Baby"],
		// 				// entry["Young"],
		// 				// entry["Adult"],
		// 				// entry["Senior"]
		// 			]
		// 		} 

		// 		series.push(seriesObj);
		// 		// console.log(entry); 16 objects
		// 		// console.log(series);	
		// 	} 

		// 	//build year
		// 	for(var p in data[0]){
		// 		var value = data[0][p];
		// 			// dogProps = Object.keys(value),
		// 			// lastFourProperty= dogProps[dogProps.length - 1];


		// 		if(typeof value == 'number'){
		// 			var type= p.substring(0, 6);
		// 			console.log(type); 
					

		// 			// seriesObj.data.name.push(type);

		// 			// for(var c= 0; c<series.length; c++){
		// 			// 	var countryGDP = entry[year + " " + "[YR" + year + "]"];
		// 			// 	console.log(countryGDP); 
		// 			// 	seriesObj.data.name.push(type);
		// 			// }
		// 		}
		// 	} 


		// 	//build year
		// 	// for(var p in data[0]){
		// 	// 	var value = data[0][p];

		// 	// 	if(typeof value == 'number'){
		// 	// 		var year= p.substring(0, 4);
		// 	// 		// console.log(year); 

		// 	// 		for(var c= 0; c<series.length; c++){
		// 	// 			var countryGDP = entry[year + " " + "[YR" + year + "]"];
		// 	// 			// console.log(countryGDP); 
		// 	// 			seriesObj.data.push(countryGDP);
		// 	// 		}
		// 	// 	}
		// 	// } 



 			

  
		// 	// //loop through properties of an object
		// 	// for(var d in data){
		// 	// 	var entry = data[d]; 
				
		// 	// 	// console.log(entry); 16 objects
		// 	// 	// console.log(series);
				
		// 	// 	series.push({
		// 	// 		name: entry["Country Name"],
		// 	// 		data: [
						
		// 	// 			entry["2010 [YR2010]"], 
		// 	// 			entry["2011 [YR2011]"],
		// 	// 			entry["2012 [YR2012]"],
		// 	// 			entry["2013 [YR2013]"],
		// 	// 			entry["2014 [YR2014]"] 
		// 	// 		]
		// 	// 	})
		// 	// } 

		// 	// return { 
		// 	// 	options: {
		//  //            dataLabels: {
		//  //                enabled: false,
		//  //            }, 
		// 	//       	chart: {
		//  //        		type: 'pie'
		// 	//       	},
		// 	//       	plotOptions: { 
		//  //                pie: {
		//  //                	allowPointSelect: true,
		//  //                    dataLabels: {
		//  //                        distance: -25, //adjust this value to change label distance
		//  //                    	enabled: false,
		//  //                    	format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		//  //                   		 style: {
		//  //                        	color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		//  //                    	}
		//  //                    }
		//  //                }
		//  //            },
		// 	//       	tooltip: { 
		// 	//           	style: {
		// 	//               padding: 10,
		// 	//               fontWeight: 'bold'
		// 	//           }
		// 	//       	},
		// 	//       	exporting: {
		// 	// 		    enabled: false
		// 	// 		},
		// 	// 		credits: false
		// 	//   	},
		// 	//   	//Series object (optional) - a list of series using normal Highcharts series options.
		// 	// 	series: series,

		
		// 	// 	//Title configuration (optional)
		// 	// 	title: {
		// 	// 	    text: 'Most Recent Years'
		// 	// 	},
		// 	// 	//Boolean to control showing loading status on chart (optional)
		// 	// 	//Could be a string if you want to show specific loading text.
		// 	// 	loading: false,
		// 	//   	//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
		// 	//   	useHighStocks: false,
		// 	//   	//size (optional) if left out the chart will default to size of the div or something sensible.
		// 	//   	// size: size 
		// 	// };

		// 	return {
		// 		options:{
		//         	chart: {
		// 	            type: 'pie'
		// 	        }
		//         },
		//         title: {
		//             text: 'Number of Avaliable Dogs for Aduption by Age Group' 
		//         },
		//         tooltip: {
		//             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		//         },
		//         plotOptions: {
		//             pie: {
		//                 allowPointSelect: true,
		//                 cursor: 'pointer',
		//                 dataLabels: {
		//                     enabled: true,
		//                     format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		//                     style: {
		//                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		//                     }
		//                 }
		//             }
		//         },
		//         series: series
		//     }

		// 	// return config;
		// },

		// barConfig: function(dataName, service, size){

		// 	var data= service[dataName],
		// 		series= [], 
		// 		categories= [];

		// 		// console.log(data); = one array of 16 objects

		// 	//build year= categories = x-axis
		// 	// for(var p in data[0]){
		// 	// 	var value = data[0][p];

		// 	// 	if(typeof value == 'number'){
		// 	// 		var year= p.substring(0, 4);
		// 	// 		// console.log(year); 
		// 	// 		categories.push(year);
		// 	// 	}
		// 	// }

		// 	//build year
		// 	for(var p in data[0]){
		// 		var value = data[0][p];
		// 			// dogProps = Object.keys(value),
		// 			// lastFourProperty= dogProps[dogProps.length - 1];


		// 		if(typeof value == 'number'){
		// 			var type= p.substring(0, 6);
		// 			// 
		// 			categories.push(type); 
					
		// 			// seriesObj.data.name.push(type);

		// 			// for(var c= 0; c<series.length; c++){
		// 			// 	var countryGDP = entry[year + " " + "[YR" + year + "]"];
		// 			// 	console.log(countryGDP); 
		// 			// 	seriesObj.data.name.push(type);
		// 			// }
		// 		}
		// 	}  


		// 	//build series
		// 	//iterate through each property of the data
		// 	for(var p in data){
		// 		var entry= data[p];


		// 		// console.log(entry); = 16 objects

		// 		var seriesObj= {
		// 			name: entry["Dog Breed"],
		// 			data: [
		// 				{
		// 					name: "Baby",
		// 					y: entry["Baby"]
		// 				},
		// 				{
		// 					name:"Young",
		// 					y:entry["Young"]
		// 				},
		// 				{
		// 					name: "Adult",
		// 					y: entry["Adult"]},
		// 				{
		// 					name:"Senior",	
		// 					y:entry["Senior"]}
						

		// 				// entry["Baby"],
		// 				// entry["Young"],
		// 				// entry["Adult"],
		// 				// entry["Senior"]
		// 			]
		// 		} 

		// 		//iterate through each property of the entry
		// 		// for(var c in entry){
		// 		// 	var value = entry[c];

		// 		// 	if(typeof value == 'string'){
		// 		// 		seriesObj.data.push(value)
		// 		// 	}
		// 		// } 
		// 		series.push(seriesObj);
		// 	}

			





		// 	// var data   	   = service[dataName],
		// 	// 	series 	   = [],
		// 	// 	categories = [
					
		// 	// 		'2010',
		// 	// 		'2011',
		// 	// 		'2012',
		// 	// 		'2013',
		// 	// 		'2014'
		// 	// 	];

		// 	// 	//categories: x axis 
		// 	// 	//series: y axis 

		// 	// for(var d in data){
		// 	// 	var entry = data[d];
				
		// 	// 	series.push({
		// 	// 		name: entry["Country Name"],
		// 	// 		data: [
						
		// 	// 			entry["2010 [YR2010]"],
		// 	// 			entry["2011 [YR2011]"],
		// 	// 			entry["2012 [YR2012]"],
		// 	// 			entry["2013 [YR2013]"],
		// 	// 			entry["2014 [YR2014]"]
		// 	// 		]
		// 	// 	})
		// 	// }

		// 	return {
		// 		options: {
		// 	      	chart: {
		//         		type: 'column'
		// 	      	},
		// 	      	tooltip: {
		// 	          	style: {
		// 	              padding: 10,
		// 	              fontWeight: 'bold'
		// 	          }
		// 	      	},
		// 	      	exporting: {
		// 			    enabled: false
		// 			},
		// 			credits: false
		// 	  	},
		// 	  	//Series object (optional) - a list of series using normal Highcharts series options.
		// 		series: series,
		// 		//Title configuration (optional)
		// 		title: {
		// 		    text: ''
		// 		},
		// 		//Boolean to control showing loading status on chart (optional)
		// 		//Could be a string if you want to show specific loading text.
		// 		loading: false,
		// 		xAxis: {
		// 			title: {
		// 				text: 'Age'
		// 			},
		// 			categories: categories
		// 		},
		// 		yAxis: {
		//             title: {
		//                 text: 'Number of Dogs'
		//             },
		//             labels: {
	 //                	formatter: function () {
		//                     return this.axis.defaultLabelFormatter.call(this).replace('T', '');
		//                 }            
		//             }
		// 		},
		// 	  	//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
		// 	  	useHighStocks: false,
		// 	  	//size (optional) if left out the chart will default to size of the div or something sensible.
		// 	  	size: size
		// 	}

			
		// },

		

	}

}]);   