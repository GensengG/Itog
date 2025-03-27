import "../App.jsx";
import "../App.css";
import { useState } from "react";

export const Sheme = (click) => {
    let hallConfig = click.click;
    let count = hallConfig.length;
    let index = 0;
    let rowArr = [];
    let rowCount = hallConfig.length;
    let plasecInRow = [];
    
    function alpha(arr){
        return arr.map(item => (
            <div className={`place ${item}`} key={counter ()}> </div> 
        ));
    } 
    for(let i = 0; i < hallConfig.length; i++){
        let inRow = Object.values(hallConfig[i]);
        rowArr.push(
            alpha(inRow)
        )
    }

    function counter (){
        return index ++;
    }
    return (
        <>
            {hallConfig.map(item => (
                <div className = "row" key={counter()}>
                    {alpha(Object.values(item))}
                </div>
            ))}
        </>
    )
}

export default Sheme;
