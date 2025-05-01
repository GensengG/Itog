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
    let [id, setId] = useState(); 
    let [config, setConfig] = useState();
    let [grid, setGrid] = useState({row: 0, places: 0, config: [], id: 0});
    let [fixedConfig, setFixedConfig] = useState({row: 0, places: 0, config: []});

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

    let hallRaws = 0;
    let hallPlaces = 0;

    function hallStartConfig(e) {
        let hallName = e.target.textContent;
        let hallId = 0;
        hallRaws = 0;
        hallPlaces = 0;
        for (let i = 0; i < hallsResponse.length; i++){
            if(hallsResponse[i]["hall_name"] === hallName){
                hallId = hallsResponse[i].id;
                hallConfig = hallsResponse[i]["hall_config"];
                // config = hallsResponse[i]["hall_config"];
                hallRaws = hallsResponse[i]["hall_rows"];
                hallPlaces = hallsResponse[i]["hall_places"];
                setId(id = hallId);
                setGrid({row: hallRaws, places: hallPlaces, config: hallConfig, id: hallId});
                setFixedConfig({row: hallRaws, places: hallPlaces, config: hallConfig});
                // sethallId(hallId = hallsResponse[i].id);
                setConfig(config = <Sheme click = {grid}/>);
                
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
        
        // setConfig(config = <Sheme click = {hallConfig}/>);
        // console.log(hallConfig);
        // setGrid({row: hallRaws, places: hallPlaces, config: hallConfig});
        // console.log(grid);
        // setOneHall(oneHall = hallConfig);
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

    let rowCount = 0;
    let placeCount = 0;
    // let startPlaceCount = "";
    // const fixedPlaces = 0;
    // let newConfig = [];
    // let start = document.getElementById("place");
    // let startPlace = start.value;
    // let startPlace = hallConfig[1].length;
    // console.log(grid);

    // function placeRowChange(){
    //     let row = document.getElementById("row");
    //     rowCount = row.value;
    //     let place = document.getElementById("place");
    //     placeCount = place.value;
    //     newLayout = [];
    //     for (let i = 0; i < rowCount; i++) { 
    //         newLayout.push([]); 
    //         for (let j = 0; j < placeCount; j++) {         
    //             newLayout[i].push("standart")    
    //         } 
    //     }
    //     // console.log(newLayout);
    // }

    
    // function matrixGenerate(){
    //     let placeArr = Array.from(document.getElementsByClassName("place"));
    //     // console.log(placeArr);
    //     let placeArrNew = placeArr.map(item => (
    //         item.className
    //     ));
    //     // console.log(placeArrNew);
    //     newConfig = [];
    //     placeArr = placeArrNew.map(item => (
    //         item.slice(6)
    //     ));
    //     // let startPlaces = config.props.click[0];
    //     // let start = startPlaces.length;
    //     console.log(placeArr);
    //     for (let i = 0; i < start.value; i++) {               
    //         newConfig.push(placeArr.slice(i * start.value, (i+1) * start.value));                
    //     }
    //     // console.log(start.value);
    // }
    // console.log(placeCount);

    function countRows(e) {
        e.preventDefault();
        rowCount = Number(e.target.value);
        placeCount = Number(document.getElementById("place").value);
        let newConfig = [];
        let newgrid = {};        
        
        // newConfig = [];
        let creatingRow = [];
        for(let i = 0; i < placeCount; i++){
            creatingRow.push("standart");
        };

        for(let i = 0; i < rowCount; i++){
            newConfig.push(creatingRow);
        };

        newgrid.row = Number(e.target.value);
        newgrid.places = Number(document.getElementById("place").value);
        newgrid.config = newConfig;

        setGrid(grid = newgrid); 
        setConfig(config = <Sheme click = {grid}/>);
    };

    function countPlaces(e) {
        e.preventDefault();
        placeCount = Number(e.target.value);
        rowCount = Number(document.getElementById("row").value);
        let newConfig = [];
        let newgrid = {};
        // newConfig = [];

        let creatingRow = [];
        for(let i = 0; i < placeCount; i++){
            creatingRow.push("standart");
        };

        for(let i = 0; i < rowCount; i++){
            newConfig.push(creatingRow);
        };

        newgrid.row = Number(document.getElementById("row").value); 
        newgrid.places = Number(e.target.value);
        newgrid.config = newConfig;
        setGrid(grid = newgrid); 
        setConfig(config = <Sheme click = {grid}/>);

    };

    function configBtnCancel(){
        setConfig(config = <Sheme click = {fixedConfig}/>);
    }

    function configBtnSave(){
        let rows = Array.from(document.getElementsByClassName("row"));
        let rowCount = rows.length;
        let arrayConfig = [] 
        for(let i = 0; i < rows.length; i++){
            arrayConfig.push(Array.from(rows[i].getElementsByClassName("place")))
        }

        for(let i = 0; i < arrayConfig.length; i++){
            for(let j = 0; j < arrayConfig[i].length; j++){
                let className = arrayConfig[i][j].className;
                arrayConfig[i][j] = className.slice(6);
            }
        }
        let placeCount = arrayConfig[0].length;



        const params = new FormData();
        params.set('rowCount', String(rowCount));
        params.set('placeCount', String(placeCount));
        params.set('config', JSON.stringify(arrayConfig));
        fetch( `https://shfe-diplom.neto-server.ru/hall/${id}`, {
            method: 'POST',
            body: params 
        })
        .then( response => response.json())
        .then( data => console.log( data ));

        console.log(arrayConfig)
    }

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
                        <p>Теперь вы можете указать типы кресел на схеме зала:</p>
                        <form className = "hall__status__form">
                            <div className = "status__container">
                                <label className="status__label">
                                    <input type="checkbox" className="status__input" id="standart"></input>
                                    - стандартные места
                                    <span className="status__span standart"></span>
                                </label>
                            </div>
                            <div className = "status__container">
                                <label className="status__label">
                                    <input type="checkbox" className="status__input" id="vip"></input>
                                    - VIP места
                                    <span className="status__span vip"></span>
                                </label>
                            </div>
                            <div className = "status__container">
                                <label className="status__label">
                                    <input type="checkbox" className="status__input" id="disabled"></input>
                                    - заблокированные (нет кресла)
                                    <span className="status__span disabled"></span>
                                </label>
                            </div>
                        </form>
                        <div className = "hall__zone">
                            <p className="screen">ЭКРАН</p>
                            {config}
                        </div>
                        <div className = "btn__container">
                            <button className = "btn__cancel" onClick={configBtnCancel}>Отмена</button>
                            <button className = "btn__save" onClick={configBtnSave}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

};

export default HallConfiguration;