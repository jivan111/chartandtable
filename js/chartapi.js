        
       
//    Button click to update chart 1m 3m 1y
    let btns=document.querySelectorAll(".button-box>button")
    let prevBtn=btns[0];
    btns.forEach((btn,index)=>{
        btn.addEventListener("click",()=>{
            if(prevBtn!=btn){
               switch(index){
                   case 0:
                      
                     stockChart.config.options.scales.xAxes[0].time.unit="month"    
                     stockChart.update() 
                     break
                   case 1:
                     stockChart.config.options.scales.xAxes[0].time.unit="quarter"
                    stockChart.update()
                    break 
                    case 2:
                     stockChart.config.options.scales.xAxes[0].time.unit="year"
                    stockChart.update()
                      break
                           
                 
                          
               } 
            btn.classList.add("active")
            prevBtn.classList.remove("active")
            prevBtn=btn;
            }
        })
    })
    let canvas=document.getElementById("canvas").getContext("2d")
    Chart.defaults.global.defaultFontColor = '#fff';
    // sort json data date wise increasing order from 2019 to 2020
    function sortDateWise(parsedData){
        parsedData.sort((a,b)=>{
            let dateA=new Date(a.date)
            let dateB=new Date(b.date)
            let yearA=parseInt(dateA.getFullYear())
            let yearB=parseInt(dateB.getFullYear())
            let monthA=parseInt(dateA.getMonth())
            let monthB=parseInt(dateB.getMonth())
            let dayA= parseInt(dateA.getDate())
            let dayB=parseInt(dateB.getDate())
            if(yearA===yearB){
                if(monthA === monthB)
                    return dayA-dayB;
                else
                    return monthA-monthB;
                
            }else
               return yearA-yearB;
        }) 
    }
    // getting daily buy  sale acquired data and labels to show on chart
    let dataSale=[];
    let dataBuy=[] ; 
    let dataAcquired=[];
    let labels=[];
    function getDataAndLabels(parsedData){
        let aggregateSell=0;
         let aggregateBuy=0;
         let aggregateAcquired=0;
         let indexDay=0
         let monthAlphabet=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]

        parsedData.forEach((data,index)=>{
            let date=new Date(data.date)
            if(data.action==="sell" && data.date===parsedData[indexDay].date)
                aggregateSell+=data.shares;
            
            else if(data.action==="buy" && data.date===parsedData[indexDay].date )
                aggregateBuy+=data.shares;
            else if(data.action==="acquired" && data.date===parsedData[indexDay].date)
                aggregateAcquired+=data.shares
              
            else{
                let date=new Date(parsedData[indexDay].date)
                labels.push( `${date}`)
                indexDay=index
                
                dataSale.push(-1*aggregateSell)
                dataBuy.push(aggregateBuy)
                dataAcquired.push(aggregateAcquired)
                aggregateSell=0
                aggregateBuy=0
                aggregateAcquired=0
                
            }
         })
         stockChart.update()
    }
  
    // fetching data from .json  file using fetch api
    (async ()=>{
        const jsonData=await fetch("transactions.json")
         let parsedData=await jsonData.json();
        sortDateWise(parsedData)
         getDataAndLabels(parsedData)
    })()
       

        
         
        
   let stockChart= new Chart(canvas,{
        type:"bar",
        data:{
            labels:labels,
            


            datasets:[
                {   label:"Sell",
                    data:dataSale,
                    backgroundColor:"red"
                },{
                    label:"Buy",
                    data:dataBuy,
                    backgroundColor:"green"
                },{
                    label:"Acquired",
                    data:dataAcquired,
                    backgroundColor:"blue"
                }
            ]
        },
        options:{
            scales:{
                xAxes:[{
                    type:"time",
                    distribution:"linear",
                    time:{
                        unit:'month',
                      
                        displayFormats: {
                           quarter: 'MMM YYYY',
                           month:"MMM YYYY",
                      
                           year:"YYYY"
                }

                    }
                }]
            }
           
        }
    });