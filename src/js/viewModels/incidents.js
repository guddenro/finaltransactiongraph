/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojarraydataprovider','ojs/ojcore','knockout','jquery','text!data/data.json',
'ojs/ojknockout', 'ojs/ojchart','ojs/ojlabel','ojs/ojtoolbar',
'ojs/ojvalidation-base','ojs/ojvalidation-datetime'],
 function(ArrayDataProvider,oj,ko,$,file,validationBase) {

    function IncidentsViewModel() {
      var self = this;
       data = JSON.parse(file);
       var i = 0, j,newObj,objData=[];
       var d = new Date();
       var flag = 0;
       var todayDate = d.getFullYear()+"-"+"0"+(d.getMonth()+1)+"-"+"0"+d.getDate();
       alert(todayDate);
       var flagofdate = 0;
       for(i = 0 ; i<data.length; i++)
       {        
        for(j = data[i].transactions.length-1 ; j>=0 ; j--)
        {
           //alert("hi");
           var time = data[i].transactions[j].transactionRequestDateTime;
           var givenDate = time.split("T")[0];
           var temp1= time.split("T")[1].split("Z")[0];
            if(givenDate == todayDate)
            {
              alert("i m ");
              flagofdate = 1;
              if((d.getHours()-6 )<temp1.split(":")[0])
              {
                alert("hi");
                newObj = new Object();
                newObj.serviceType = data[i].serviceType;
                newObj.count = data[i].transactions[j].count;
                newObj.DateTime = data[i].transactions[j].transactionRequestDateTime;
                objData.push(newObj);
                flag = 1;
              }
              /*if(flag == 0)
              {
                alert("hi");
                newObj = new Object();
                newObj.serviceType = data[i].serviceType;
                //newObj.count = 0;
                newObj.DateTime = 0;
                objData.push(newObj);
              }*/
              
              
         }
        /* if(flagofdate == 0)
         {

          //alert("hii");
          newObj = new Object();
          newObj.serviceType = data[i].serviceType;
          //newObj.count = 0;
          //newObj.DateTime = ;
          objData.push(newObj);
         
         }*/
           
                    
        }
       }
      console.log(objData);
      this.orientationValue = ko.observable('vertical');
      this.lineTypeValue = ko.observable('stepped');
      this.timeAxisTypeValue = ko.observable('skipGaps');
      // var dateOptions = {day: 'numeric', month: 'numeric'};
      //this.dayMonth = dateTimeConverter.createConverter(dateOptions);
      //this.xAxisOptions1 = ko.observable({});
      //this.xAxisOptions1({tickLabel: {converter: [ko.toJS(this.dayMonth), ko.toJS(this.year)]}});
      var quarterData = JSON.stringify(objData);
      self.dataProvider = new ArrayDataProvider(JSON.parse(quarterData), {keyAttributes: 'id'});
    }

    
    return new IncidentsViewModel();
  }
);
