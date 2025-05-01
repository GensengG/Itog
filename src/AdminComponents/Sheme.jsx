import "../App.jsx";
import "../App.css";
import { useState } from "react";

export const Sheme = (click) => {
    let grid = click.click;
    // let fixedGrid = click.click;
    // console.log(grid);
    let startConfig = grid.config;
    // let [configArr, setConfigArr] = useState({startConfig});
    let newRow = grid.row;
    let newPlaces = grid.places;
    let newConfig = [];    
    
    // function configBtnCancel(){
    //     startConfig = grid.config;
    // }

    // function configBtnSave(){

    // }
    // console.log(hallId);
    // let startPlaces = startConfig.length;
    // let startRow = startConfig[0].length;
    // console.log(startConfig, grid.places, startPlaces);
    function changeConfig(){
        // let startConfig = grid.config;
        // let startConfigRow = startConfig[0];
        // let startPlaces = startConfigRow.length;
        // let startRow = startConfig.length;

        // function changePlaces(){
        //     // let startConfig = grid.config;
        //     // console.log(startConfig);
        //     // let startConfigRow = startConfig[1];
        //     // let startPlaces = startConfigRow.length;

        //     if(startPlaces > grid.places){
        //         for (let i = 0; i < startPlaces - grid.places; i++){
        //             for (let j = 0; j < startConfig.length; j++){
        //                 startConfig[j].pop();
        //             }
        //         }
        //     }
        //     if(startPlaces < grid.places){
        //         for (let i = 0; i < grid.places - startPlaces; i++){
        //             for (let j = 0; j < startConfig.length; j++){
        //                 startConfig[j].push("standart");
        //             }
        //         }
        //     }
        //     // console.log(startConfig)
        //     // return startConfig;
        // };

        // function changeRow(){
        //     // changePlaces();
        //     // let startConfig = grid.config;
        //     // let startRow = startConfig.length;


        //     if(startRow > grid.row){
        //         for (let i = 0; i < startRow - grid.row; i++){
        //             for (let j = 0; j < startConfig.length; j++){
        //                 startConfig.pop();
        //             }
        //         }
        //     }
        //     if(startRow < grid.row){
        //         for (let i = 0; i < grid.row - startRow; i++){
        //             for (let j = 0; j < startConfig.length; j++){
        //                 startConfig.push(newRow);
        //             }
        //         }
        //     }
        // };

        // changePlaces(grid);
        // changeRow(grid);
        newConfig = [];
        let creatingRow = [];
        for(let i = 0; i < newPlaces; i++){
            creatingRow.push("standart");
        };

        for(let i = 0; i < newRow; i++){
            newConfig.push(creatingRow);
        };
        // setConfigArr(configArr = newConfig);
        // startConfig = newConfig;
    };

    // changePlaces(grid);
    // changeRow(grid);
    changeConfig();
    // console.log(startConfig, newConfig);

    // if(startConfig.length < newConfig.length){
    //     if(startConfig[0].length < newConfig[0].length){
    //         for(let i = 0; i < newConfig.length; i++){
    //             for(let j = 0; j < newConfig[i].length; j++){
    //                 if(startConfig[i][j]){
    //                     newConfig[i][j] = startConfig[i][j]
    //                 } else {
    //                     newConfig[i][j] = newConfig[i][j];
    //                 }
    //             }
    //         }
    //     }
    // }
    // changePlaces(grid);

    // console.log(startConfig);

    // console.log(hallConfig);
    // let startRow = hallConfig.length;
    // let startPlace = hallConfig[1].length;
    // // console.log(startRow, startPlace);
    let index = 0;
    // let rowArr = [];
    // let newConfig = []; 
    // let newLayout = [];
    // let row = document.getElementById("row");
    // let place = document.getElementById("place");

    // // function placeRowChange(){
    // //     let rowCount = row.value;
    // //     let placeCount = place.value;
    // //     newLayout = [];
    // //     for (let i = 0; i < row.value; i++) { 
    // //         newLayout.push([]); 
    // //         for (let j = 0; j < place.value; j++) {         
    // //             newLayout[i].push("standart")    
    // //         } 
    // //     }
    // //     console.log(newLayout);

    // // }
    // // placeRowChange();

    // // function placeRowChange(){
    // //     for (let i = 0; i < row.value; i++) {  
    // //         for (let j = 0; j < place.value; j++) {
    // //             plaseInRow.push("standart");                
    // //         }
    // //     }
    // //     console.log(plaseInRow);
    // // }

    // // row.addEventListener("change", placeRowChange());

    // // placeRowChange()

    function placeStatus(e) {
        let standart = document.getElementById("standart");
        let vip = document.getElementById("vip");
        let disabled = document.getElementById("disabled");
        let firstClass = e.target.className;
        let status = firstClass.slice(6);

        if(standart.checked){
            e.target.classList.remove(status);
            e.target.classList.toggle("standart");
        } else if (vip.checked){
            e.target.classList.remove(status);
            e.target.classList.toggle("vip");
        } else if (disabled.checked){
            e.target.classList.remove(status);
            e.target.classList.toggle("disabled");
        }
    }

    //     function matrixGenerate(){
    //         let placeArr = Array.from(document.getElementsByClassName("place"));
    //         let placeArrNew = placeArr.map(item => (
    //             item.className
    //         ));
    //         newConfig = [];
    //         placeArr = placeArrNew.map(item => (
    //             item.slice(6)
    //         ));

    //         for (let i = 0; i < startPlace; i++) {               
    //             newConfig.push(placeArr.slice(i * startPlace, (i+1) * startPlace));                
    //         }
    //         // console.log(newConfig);
    //     }

    //     function placeRowChange(){
    //         let rowCount = row.value;
    //         let placeCount = place.value;
    //         newLayout = [];
    //         for (let i = 0; i < rowCount; i++) { 
    //             newLayout.push([]); 
    //             for (let j = 0; j < placeCount; j++) {         
    //                 newLayout[i].push("standart")    
    //             } 
    //         }
    //         // console.log(newLayout);

    //     }
    //     placeRowChange();
    //     matrixGenerate();
    //     // console.log(newLayout);
    //     // console.log(newConfig);

    //     function matching(newLayout, newConfig){
    //         if(newLayout.length > newConfig.length){
    //             let newLayoutLength = newLayout.length;
    //             let newConfigLength = newConfig.length;
    //             for (let i = 0; i < (newLayoutLength - newConfigLength); i++) {
    //                 newConfig.push(newLayout[(newLayoutLength - i)-1])
    //             }
    //         }
    //         if(newLayout.length < newConfig.length){
    //             let newLayoutLength = newLayout.length;
    //             let newConfigLength = newConfig.length;
    //             for (let i = 0; i < (newConfigLength - newLayoutLength); i++) {
    //                 newConfig.pop();
    //             }
    //         }
    //         for (let i = 0; i < newLayout; i++) { 
    //             newLayout.push([]); 
    //             for (let j = 0; j < placeCount; j++) {         
    //                 newLayout[i].push("standart")    
    //             } 
    //         }
    //     }
    //     matching(newLayout, newConfig);
    //     console.log(newConfig);
    // } 
    
    function generatePlaces(arr){
        return arr.map(item => (
            <div className={`place ${item}`} key={counter ()} onClick={placeStatus}>
                
            </div> 
        ));
    }

    // } 
    // for(let i = 0; i < hallConfig.length; i++){
    //     let inRow = Object.values(hallConfig[i]);
    //     rowArr.push(
    //         generatePlaces(inRow)
    //     )
    // }

    function counter (){
        return index ++;
    }

    // const arrayConfig = [] // Двумерный массив со схемой кинозала
    // const params = new FormData();
    // params.set("rowCount", String(newConfig.length))
    // params.set("placeCount", String(newConfig[0].length))
    // params.set("config", JSON.strigify(newConfig))
    // fetch( `https://shfe-diplom.neto-server.ru/hall/${grid}`, {
    //     method: 'POST',
    //     body: params 
    // })
    // .then( response => response.json())
    // .then( data => console.log( data ));

    // console.log(hallConfig)

    return (
        <>
            {startConfig.map(item => (
                <div className = "row" key={counter()}>
                    {generatePlaces(Object.values(item))}
                </div>
            ))}
        </>
    )
}

export default Sheme;
