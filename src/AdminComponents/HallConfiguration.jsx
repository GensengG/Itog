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
                hallRaws = hallsResponse[i]["hall_rows"];
                hallPlaces = hallsResponse[i]["hall_places"];
            }
        };

        setConfig(config = <Sheme click = {hallConfig}/>);
        setGrid({row: hallRaws, places: hallPlaces});
        console.log(grid);
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
