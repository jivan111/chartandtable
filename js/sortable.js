 function sortCol(table,col,asc=true){
    let tBody=table.tBodies[0];
    let rows=Array.from(tBody.querySelectorAll("tr"))
    let toggleSort=asc?1:-1;
    rows.sort((a,b)=>{
        let tableDataA=a.querySelector(`td:nth-child(${col})`).textContent
        let tableDataB=b.querySelector(`td:nth-child(${col})`).textContent
        return tableDataA>tableDataB?toggleSort*1:toggleSort*-1;

    })
    table.innerHtml=""
    tBody.append(...rows)
}

let order=[true,true,true,true,true,true,true,true,true];
let table=document.getElementById("table");
let tableHead=Array.from(table.tHead.querySelectorAll("tr>th"))
tableHead.forEach((head,index)=>{
    let span=head.querySelector("span")
    if(span){
       head.addEventListener("click",()=>{
           order[index]?span.textContent=`\u2191`:span.textContent=`\u2193`
           sortCol(table,index+1,order[index]);
           order[index]=!order[index];
           
       })
      }
       })
       
       

  