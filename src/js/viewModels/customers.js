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
       //setting data with utc data
        var d = new Date(now.getTime()+now.getTimezoneOffset() * 60000);
        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = d.getFullYear();  
       var todayDate = yyyy+"-"+mm+"-"+dd;
       //alert(todayDate);
       var mixedseries = [];
       var flag =0,flagOfSixHour =0;
       for(i = 0 ; i<data.length; i++)
       {        
        mixedseries.push({name:data[i].serviceType,items:[]});
        for(j = data[i].transactions.length-1 ; j>=0 ; j--)
        {
           
           var time = data[i].transactions[j].transactionRequestDateTime;
           var givenDate = time.split("T")[0];
           var nowDate = new Date(data[i].transactions[j].transactionRequestDateTime);
           var x1 = new Date(nowDate.getTime()+now.getTimezoneOffset() * 60000);
            if(givenDate == todayDate)
            {
              if((now.getHours()-6 )<x1.getHours())
              {
                mixedseries[i]["items"].push({x:x1,y:data[i].transactions[j].count});
                flagOfSixHour = 1;
              }
              else{
                  if(flagOfSixHour == 0)
                  mixedseries[i]["items"].push({x:now,y:0});
              }
              flag =1;     

            } 
           else
           {
                if(flag ==0)
                mixedseries[i]["items"].push({x:now,y:0});
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
