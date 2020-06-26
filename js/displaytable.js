export default function displayTable(parsedData){
    const tBody=document.querySelector("tbody")
    parsedData.forEach(rowData=>{
        
        let tRow=document.createElement("tr")
        let tableData=[]
        let date=new Date(rowData["date"])
        tableData.push(date.toDateString())
        tableData.push(rowData["name"])
        tableData.push(rowData["title"])
        tableData.push(rowData["action"])
        tableData.push(rowData["shares"])
        tableData.push(rowData["price"].toFixed(3))
        tableData.push(rowData["amount"].toFixed(3))
        tableData.push(rowData["post_transaction_shares"])
        tableData.push(rowData["details_link"])
       tableData.forEach((data,index)=>{
        let td=document.createElement("td")
        if(index==tableData.length-1){
           let a= document.createElement("a")
            a.href=data;
            a.textContent="Show More"
            td.append(a)
            tRow.append(td)
            return
        }

        td.append(data)
        tRow.append(td)

       })
       
       tBody.append(tRow)
    })
    let anchors=document.querySelectorAll(".table-container>table>tbody>tr>td>a")
    anchors.forEach(anchor=>{
            anchor.addEventListener("click",()=>{
                anchor.target="popup"
                window.open(anchor.href,"popup","width=500,height=400")
            })
        })
        // dynamic imports
        // import ("/js/sortable.js")
}