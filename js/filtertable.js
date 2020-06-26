// import displayTable from "./displaytable.js"
let input=document.getElementById("search")
// let table=document.getElementById("table");
// let parsedData;
// (async()=>{
//     const tData=await fetch("transactions.json")
//     parsedData=await tData.json();
// })()
input.addEventListener("input",(e)=>{
    let tableRows=document.querySelectorAll("table>tbody>tr")
     tableRows=Array.from(tableRows)
     tableRows.forEach(row=>{
          let searchText=input.value.toLowerCase()
         let td=row.querySelectorAll("td")[1].textContent.toLowerCase()
         console.log()
         if(td.indexOf(searchText)!=-1){
             row.style.display=""
            }else{
                row.style.display="none"

         }
     })
    //  couldnot achieve filter table with this logic



    //  let modifiedTable= parsedData.filter((row,index,arr)=>{
    //    console.log(row.name.toLowerCase().indexOf(searchText))
    //     if(row.name.toLowerCase().indexOf(searchText)!=-1)

    //        return true        

    // })
    // console.log(modifiedTable)
    //  table.tBodies[0].innerHtml=""
    // displayTable(modifiedTable)

})