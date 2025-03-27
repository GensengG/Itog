import "../App.jsx";
import "../App.css";
import { useState } from "react";

export const Sheme = (click) => {
    let hallConfig = click.click;
    let count = hallConfig.length;
    let index = 0;
    // let row = '';
    // let arrRow = [];
    let rowArr = [];
    // for(let i = 0; i < hallConfig.length; i++){
    //     row = hallConfig[i];
    //     // console.log(row)
    //     arrRow = row.map(item => (
    //         item = <div className={item}>
    //         </div>
    //     ))

    //     arr.push(arrRow)
        
    // }

    // console.log(arr.map(item => (
    //             <div key={item.key}>
    //             {Object.values(item)}
    //         </div>)
    // ))

    let rowCount = hallConfig.length;
    let plasecInRow = [];

    // function alpha(arr){
    //     plasecInRow = [];
    //     let count = arr.length;
    //     for(let i = 0; i < count; i++){
    //         plasecInRow.push(
    //             <div className={arr[i]} key={i}></div>
    //         )
    //     }
    //     return plasecInRow;
    // }   
    
    function alpha(arr){
        return arr.map(item => (
            <div className={`place ${item}`} key={counter ()}>
                
            </div> 
        ));
    } 

    // for(let i = 0; i < rowCount; i++){
    //     rowArr.push(
    //         // <div className="row" key={i}>
    //             alpha(hallConfig[i])
    //         // </div> 
    //     )
    // }
    for(let i = 0; i < hallConfig.length; i++){
        let inRow = Object.values(hallConfig[i]);
        // let index = i;

        rowArr.push(
            alpha(inRow)
        )
    }

    function counter (){
        return index ++;
    }

    // for(let i = 0; i < rowArr.length; i++){
    //     rowArr[i]
    // }

    return (
        <>
            {/* {arr.map(item => (
                <div key={item.key}>
                    {Object.values(item)}
                </div>)
            )} */
            // rowArr.map(item => (
            //     <div className = "row" key={counter()}>
            //         {item}
            //     </div>
            //     // console.log(item)
            // ))
            hallConfig.map(item => (
                <div className = "row" key={counter()}>
                    {
                    alpha(Object.values(item))
                    
                    }
                </div>
                
            ))
            }
        </>
        
    )
}

export default Sheme;