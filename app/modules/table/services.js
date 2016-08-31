var services = angular.module('Table.services', [])
.factory('TableDataService', ['$q', '$http', function($q, $http){
	return {
		
		getDogAduption: function(){
			var defer = $q.defer(), 
				self  = this;

			$http({
				'method': 'GET', 
				'url': 'assets/dog-data-aduption.json'
			}).then(function(response){
				self.dogAduption = response.data;
				defer.resolve(response.data);
			});

			return defer.promise;
		},
	}

}])
.factory('TableChartService', ['TableDataService', function(TableDataService){
	return{
		charts: [],

		
		getWholeData: function(dataName){
			this[dataName] = TableDataService[dataName];
			return TableDataService[dataName];
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

		pieConfig: function(dataName, service){
		
			var data   	   = service[dataName],
				series 	   = [];

			// console.log(data);

			
			// loop through properties of an object
			for(var d in data){
				var entry = data[0];
				
				var seriesObj= {
					name: entry["Dog Breed"],
					data: [
						{
							name: "Baby",
							y: entry["Baby"]
						},
						{
							name:"Young",
							y:entry["Young"]
						},
						{
							name: "Adult",
							y: entry["Adult"]},
						{
							name:"Senior",	
							y:entry["Senior"]}
					]
				} 
				series.push(seriesObj);
				
			} 

			return {
				options:{
					dataLabels: {
						enabled: false,
					},
		        	chart: {
			            type: 'pie'
			        }
		        },
		        title: {
		            text: 'Number of Avaliable Dogs for Aduption by Age Group' 
		        },
		        tooltip: {
		        	style: {
		        		padding: 10,
		        		fontWeight: 'bold'
		        	},
		            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                	distance:-25,
		                    enabled: false,
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    }
		                }
		            }
		        },
		        exporting: {
		        	enabled: false
		        },

		        series: series
		    }
		},

		barConfig: function(dataName, service, size){

			var data= service[dataName],
				series= [], 
				categories= [];

			//build year
			for(var p in data[0]){
				var value = data[0][p];
					// dogProps = Object.keys(value),
					// lastFourProperty= dogProps[dogProps.length - 1];


				if(typeof value == 'number'){
					var type= p.substring(0, 6);
					
					categories.push(type); 
					
				}
			}  


			//build series
			//iterate through each property of the data
			for(var p in data){
				var entry= data[p]; 

				// console.log(entry); = 16 objects

				var seriesObj= {
					name: entry["Dog Breed"],
					data: [
						{
							name: "Baby",
							y: entry["Baby"]
						},
						{
							name:"Young",
							y:entry["Young"]
						},
						{
							name: "Adult",
							y: entry["Adult"]},
						{
							name:"Senior",	
							y:entry["Senior"]}
					]
				} 
				series.push(seriesObj);
			}

			return {
				options: {
			      	chart: {
		        		type: 'column'
			      	},
			      	tooltip: {
			          	style: {
			              padding: 10,
			              fontWeight: 'bold'
			          }
			      	},
			      	exporting: {
					    enabled: false
					},
					credits: false
			  	},
			  	//Series object (optional) - a list of series using normal Highcharts series options.
				series: series,
				//Title configuration (optional)
				title: {
				    text: ''
				},
				//Boolean to control showing loading status on chart (optional)
				//Could be a string if you want to show specific loading text.
				loading: false,
				xAxis: {
					title: {
						text: 'Age'
					},
					categories: categories
				},
				yAxis: {
		            title: {
		                text: 'Number of Dogs'
		            },
		            labels: {
	                	formatter: function () {
		                    return this.axis.defaultLabelFormatter.call(this).replace('T', '');
		                }            
		            }
				},
			  	//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
			  	useHighStocks: false,
			  	//size (optional) if left out the chart will default to size of the div or something sensible.
			  	size: size
			}

			
		},
	}

}]);   