import "../App.jsx";
import "../App.css";
import { useState } from "react";
import { Sheme } from "./Sheme.jsx";

// Логин - shfe-diplom@netology.ru
// Пароль - shfe-diplom

export const HallConfiguration = () => {    
    
    function hideSection(e) {
        e.preventDefault();
        const sectionBody = document.getElementById("hall__config__body");
        sectionBody.classList.toggle('active');
    }

    let hallsResponse = [];
    let hallArr = [];
    let hallElements = [];
    let hallConfig = [];
    let [halls, setHalls] = useState();  
    let [config, setConfig] = useState();
    let [grid, setGrid] = useState({row: 0, places: 0});

    function getHallInfo () {
        fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
        .then( response => response.json())
        .then( data => {
                hallsResponse = data.result.halls;
                for (let i = 0; i < hallsResponse.length; i++){
                    hallArr.push(hallsResponse[i]["hall_name"])
                }
                hallElements = hallArr.map(item => (
                    <button type="button" className = "hall__config__name" onClick = {hallStartConfig}>
                    {item}
                    </button>
                ));
                setHalls(halls = hallElements);
                // console.log(hallsResponse);
            }
            
        ); 
    }
    getHallInfo ();

    let hallRaws = 0;
    let hallPlaces = 0;

    function hallStartConfig(e) {
        let hallName = e.target.textContent;
        let hallId = 0;
        hallRaws = 0;
        hallPlaces = 0;
        let config = [];
        for (let i = 0; i < hallsResponse.length; i++){
            if(hallsResponse[i]["hall_name"] === hallName){
                hallId = hallsResponse[i].id;
                hallConfig = hallsResponse[i]["hall_config"];
                // config = hallsResponse[i]["hall_config"];
                hallRaws = hallsResponse[i]["hall_rows"];
                hallPlaces = hallsResponse[i]["hall_places"];
            }
        };

        // for (let i = 0; i < hallConfig.length; i++) {
        //     for (let j = 0; j < hallConfig[i].length; j++) {
        //         if(hallConfig[i][j] === "standart"){
        //             hallConfig[i][j] = <div className = "hall__place standart"></div>
        //         } else if(hallConfig[i][j] === "vip"){
        //             hallConfig[i][j] = <div className = "hall__place vip"></div>
        //         } else if(hallConfig[i][j] === "taken"){
        //             hallConfig[i][j] = <div className = "hall__place taken"></div>
        //         } else {
        //             hallConfig[i][j] = <div className = "hall__place disabled"></div>
        //         } 
        //     }
        // }
        
        setConfig(config = <Sheme click = {hallConfig}/>);
        setGrid({row: hallRaws, places: hallPlaces});
        console.log(grid);

        // hallConfig.map(item => (
        //     <div key = {item.key}>
        //         {item}
        //     </div>
        // ))
        // setConfig(config = hallConfig.map(item => (
        //     <div key = {item.key}>
        //         {Object.values(item)}
        //     </div>
        // )));
        // setConfig(config = hallConfig.map(item => (
        //     <div key = {item.key}>
        //         {item}
        //     </div>
        // )));
        // return hallConfig;
        // console.log(hallConfig);


        // const params = new FormData()
        // params.set('rowCount', hallRaws)
        // params.set('placeCount', hallPlaces)
        // params.set('config', JSON.stringify(hallConfig))
        // fetch( `https://shfe-diplom.neto-server.ru/hall/${hallId}`, {
        //     method: 'POST',
        //     body: params 
        // })
        //     .then( response => response.json())
            // .then( data => console.log( data ));
            // .then( data => startConfig = data.result["hall_config"]);

            
        // let hallMatrix = [];

        // function createHall(hallRaws, hallPlaces) {
        //     hallMatrix = [];
        //     for (let i = 0; i < hallRaws; i++) {
        //         hallMatrix[i] = {};
        //         for (let j = 0; j < hallPlaces; j++) {
        //             let div = document.createElement('div');
        //             if(hallConfig[i][j] === "standart"){
        //                 div.className = 'hall__place standart';
        //                 hallMatrix[i][j] = div;
        //             } else if (hallConfig[i][j] === "vip"){
        //                 div.className = 'hall__place vip';
        //                 hallMatrix[i][j] = div;
        //             } else if (hallConfig[i][j] === "taken"){
        //                 div.className = 'hall__place taken';
        //                 hallMatrix[i][j] = div;
        //             } else {
        //                 div.className = 'hall__place disabled';
        //                 hallMatrix[i][j] = div;
        //             }

        //         }
        //     }

            // setConfig(config = {});
        //     return hallMatrix;
        // }

        // function createHall(hallConfig) {
        //     hallMatrix = [];
        //     for (let i = 0; i < hallConfig.length; i++) {
        //         hallMatrix.push(
        //             []
        //         )
        //     }

        //     for (let i = 0; i < hallConfig.length; i++) {
        //         for (let j = 0; j < hallConfig[i].length; j++) {
        //             let div = document.createElement('div');
        //             if(hallConfig[i][j] === "standart"){
        //                 div.className = 'hall__place standart';
        //                 hallMatrix[i].push(div);
        //             } else if (hallConfig[i][j] === "vip"){
        //                 div.className = 'hall__place vip';
        //                 hallMatrix[i].push(div);
        //             } else if (hallConfig[i][j] === "taken"){
        //                 div.className = 'hall__place taken';
        //                 hallMatrix[i].push(div);
        //             } else {
        //                 div.className = 'hall__place disabled';
        //                 hallMatrix[i].push(div);
        //             }

        //         }
        //     }

        //     // setConfig(config = {});
        //     return hallMatrix;
        // }

        // console.log(createHall(hallRaws, hallPlaces));
        // setHalls(...halls, halls.config = createHall(hallRaws, hallPlaces));
        // let result = createHall(hallRaws, hallPlaces);
        // render = () => {
        //     let result = createHall(hallRaws, hallPlaces)
        //     result.map(item => (
        //     <div>
        //         {item.forEach(element => {
        //                 element;
        //             })
        //         }
        //     </div>
        // ))}
        // co(createHall(hallConfig));
        // setConfig(config = render.map(item => (
        //     <div>
        //         {item}
        //     </div>
        // )))

        // render = createHall(hallConfig);
        // console.log(render());

        // startConfig = () => {
            // render.forEach(item => {
            //     console.log(item);

            //     startConfig.push(
            //         <div className = "AAAA">
            //             {Object.values(item)}
            //         </div>
            //     )
            // });
        // }

        // console.log(startConfig);

    //     render.map(item => {
    //         <div>
    //             {item.forEach(elem => {
    //                 return elem;
    //             })}
    //         </div>
    //     });

    //     setConfig(config = createHall(hallConfig));
    //     console.log();
    // }

    // console.log(render);

  
    // fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
    // .then( response => response.json())
    // .then( data => {
    //         hallsResponse = data.result.halls;
    //         for (let i = 0; i < hallsResponse.length; i++){
    //             hallArr.push(hallsResponse[i]["hall_name"])
    //         }
    //         hallElements = hallArr.map(item => (
    //             <div className = "hall__config" onClick = {hallStartConfig}>
    //                {item}
    //             </div>
    //         ));
    //         setHalls(halls = hallElements);
    //     }
    // );

    };

    let rowCount = "";
    let placeCount = "";

    function countRows(e) {
        e.preventDefault();
        rowCount = e.target.value;
    }

    function countPlaces(e) {
        e.preventDefault();
        placeCount = e.target.value;
    }

    // for(let i = 0; i < Number(rowCount); i++){
        
    // }
    
    return (
        <>
            <section className = "admin__section">
                <div className = "section__header">
                    <p className = "section__header__name">Конфигурация залов</p>
                    <button className = "section__header__arrow" onClick={hideSection}> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#EFEFEF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg></button>
                </div>
                <div className = "hall__config__body active" id = "hall__config__body">
                    <p>Выберите зал для конфигурации:</p>
                    <div className = "hall__config__container">
                        {halls}
                    </div>
                    <div className = "hall__places__container">
                        <p>Укажите количество рядов и максимальное количество кресел в ряду:</p>
                        <div className = "hall__places__form">
                            <label for = "row" className = "label__row">Рядов, шт</label>
                            <input className = "input__hall" id = "row" type="text" onChange={countRows} value={grid.row}></input>
                            <p>x</p>
                            <label for = "place" className = "label__place">Мест, шт</label>
                            <input className = "input__hall" id = "place" type="text" onChange={countPlaces} value={grid.places}></input>
                        </div>
                        <div className = "hall__zone">
                            <p className="screen">ЭКРАН</p>
                            {config}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

};

export default HallConfiguration;