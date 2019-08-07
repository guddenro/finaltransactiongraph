/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['knockout', 'ojs/ojbootstrap', 'ojs/ojvalidation-base', 'ojs/ojarraydataprovider',
'jquery','text!data/data.json',
'ojs/ojknockout', 'ojs/ojvalidation-datetime', 'ojs/ojchart',
 'ojs/ojtoolbar', 'ojs/ojlabel',],
 function(ko, Bootstrap, validationBase,ArrayDataProvider,$,file) {
    
  
  function ChartModel() {
       var self = this;

      //parsing of file
       data = JSON.parse(file);
       var i,j;
       //system date
       var now = new Date();
       
       var mixedseries = [];
       var flag =0,flagOfSixHour =0;
       for(i = 0 ; i<data.length; i++)
       {        
        flagOfSixHour = 0;
        mixedseries.push({name:data[i].serviceType,items:[]});
        for(j = data[i].transactions.length-1 ; j>=0 ; j--)
        {
           
            var jsonFileTime = new Date(data[i].transactions[j].transactionRequestDateTime);
           var jsonUTCTime = jsonFileTime.getTime() + (jsonFileTime.getTimezoneOffset() * 60000);
        
              
             if((now-(new Date(jsonUTCTime))<=21600000))  
              {
                flagOfSixHour=1;
                mixedseries[i]["items"].push({x:new Date(jsonUTCTime),y:data[i].transactions[j].count});
              }            
        }
       
        if(flagOfSixHour == 0)
        {
                    
          var presentTime = now.getHours();
          console.log("present hours is:"+presentTime);
          var pastSixHourTime = now.getHours()-6;
         // console.log("date of today is"+todayDate);
          for(var k = pastSixHourTime; k<=presentTime; k++){
              console.log("past hour data is:"+k);
              //alert("i am k="+k);
              var date = new Date();
              date.setHours(k);
              var dd = String(date.getDate()).padStart(2, '0');
              var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
              var yyyy = date.getFullYear();  
              var pastSixHourDate = yyyy+"-"+mm+"-"+dd;
              //console.log("past six hour data:"+pastSixHourDate);
              //if(k>=0)
              mixedseries[i]["items"].push({x:date.getTime(),y:0});
          }
                   
        }
        
      
       } 
       console.log(mixedseries);
      this.orientationValue = ko.observable('vertical');
      this.lineTypeValue = ko.observable('stepped');
      this.timeAxisTypeValue = ko.observable('skipGaps');
      this.mixedSeriesValue = ko.observableArray(mixedseries);
      var mixedGroups = ["Group A", "Group B", "Group C", "Group D"];
      this.mixedGroupsValue = ko.observableArray(mixedGroups);
      
    }

var chartModel = new ChartModel();

return chartModel;
    
  }
);
