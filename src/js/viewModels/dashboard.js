/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojarraydataprovider','ojs/ojcore','knockout','jquery','text!data/data.json',
        'ojs/ojknockout', 'ojs/ojchart','ojs/ojlabel'],
 function(ArrayDataProvider,oj,ko,$,file) {

    function DashboardViewModel() {
      var self = this;
      
      var data1 = JSON.parse(file);
      var KYCService;
      var KYCTempArr = [];
      var AUTHTNTempArr=[];
      var finalKYCTime=[];
      var finalKYCCount= [];
      var date1=[],Time=[],Count=[];
      var newArray = [];
      var objData;
      var latestDate, startTime, endTime,y,z,hr,min,sec;
      var date_sort_desc = function (date1, date2) {
        if (date1 > date2) return -1;
        if (date1 < date2) return 1;
        return 0;
      };
      var cumulativeData =function(obj,arr){
      
        $.each(obj.transactions , function( key, val ) {
        var str = val.transactionRequestDateTime;
        var indexOfT = str.indexOf("T");
        var indexOfZ =str.indexOf("Z");
        arr.push(str.substring(0,indexOfT)+":"+str.substring(indexOfT+1,indexOfZ)+"="+val.count);
      });
        return arr;
      }
      var separateData = function(arr,service){
         date1=[],Time=[],Count=[],finalKYCCount=[],finalKYCTime=[];
        for(i = 0; i<arr.length; i++)
        { 
          var indexOfcolon = arr[i].indexOf(":");
          var indexOfequal =arr[i].indexOf("=");
          date1.push(arr[i].substring(0,indexOfcolon));
          Time.push(arr[i].substring(indexOfcolon+1,indexOfequal));
          Count.push(arr[i].substring(indexOfequal+1));
        }
        latestDate = date1[0];
        startTime = Time[0];
        y = startTime.indexOf(":");
        z = startTime.indexOf(":",y+1);
        hr = startTime.substring(0,y);
        min = startTime.substring(y+1,z);
        sec = startTime.substring(z+1);
                
        if((hr-6)<0)
             endTime="00:00:00";
        else
            endTime=hr-6+":"+min+":"+sec;
      
        
        

        for(i = 0 ;i < Time.length; i++)
        {
         /* var objData = {
            "count" : 0, 
            "time":0,
            "serviceType":0,
            //"date":0
          }*/
          objData = new Object();
            if(date1[i] == latestDate)
            {
             if(Time[i]>=endTime) {
                finalKYCTime.push(Time[i]);
                finalKYCCount.push(Count[i]);
                objData.date = latestDate;
                objData.serviceType = service;
                objData.count = Number(finalKYCCount[i]);
       // alert(finalKYCCount);
                objData.time = finalKYCTime[i];
                newArray.push(objData);
             } 
            }
            else{
              break;
            }
        }
         
        
        
      } 
       

      $.each(data1, function(idx, obj) {
       
        if(obj.serviceType == 'KYC')
        {
          KYCService = obj.serviceType;
          var i = 0;  
          KYCTempArr = cumulativeData(obj,KYCTempArr);
          KYCTempArr.sort(date_sort_desc);
          separateData(KYCTempArr,KYCService); 

        }  
        if(obj.serviceType == 'AUTHN')
        {
          
          AUTHNService = obj.serviceType;
          var i = 0;  
          AUTHTNTempArr = cumulativeData(obj,AUTHTNTempArr);
         AUTHTNTempArr.sort(date_sort_desc);
          separateData(AUTHTNTempArr,AUTHNService);
          //calculateTime(finalAUTHNTime,finalAUTHNCount);            
        }  
      });
         //console.log(newArray);
         console.log(JSON.stringify(newArray));
         //alert(newArray);
         this.orientationValue = ko.observable('vertical');
         this.lineTypeValue = ko.observable('stepped');
          var quarterData = JSON.stringify(newArray);
          self.dataProvider = new ArrayDataProvider(JSON.parse(quarterData), {keyAttributes: 'id'});
         
          
    }

   
    return new DashboardViewModel();
  }
);
