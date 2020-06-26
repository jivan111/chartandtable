
import displayTable from "./displaytable.js";

async function loadJson(){
    const tData=await fetch("transactions.json")
    let parsedData=await tData.json();
    displayTable(parsedData)
}
loadJson()

          



