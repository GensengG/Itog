import "../App.jsx";
import "../App.css";
import { useState } from "react";

export const Films = () => {
    let date = new Date();
    const days = [
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб"
    ];
;
    const dateNumber = (i) => {
        let currentDate = new Date();
        let nextDate = currentDate.setDate(currentDate.getDate() + i)
        return currentDate.getDate();
    }

    const dateRender = (i) => {
        let weekDay = days[date.getDay() + i];
        return(weekDay)
    }

    let [filmsResult, setFilmsResult] = useState();
    
    let filmsData = [];
    let seancesArr = [];
    let filmsArr = [];
    let hallsArr = [];

    let info = [];
    let result = [];
    let films = [];
     
    fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
    .then( response => response.json())
    .then( data => {
            filmsData = data.result;
            console.log(data)
        }
    );

    function dayClick() {
        films = [];

        seancesArr = filmsData.seances;
        filmsArr = filmsData.films;
        hallsArr = filmsData.halls;
    
        info = seancesArr.map(item => ({
            id: item["seance_filmid"],
            number: item["seance_hallid"],
            time: item["seance_time"]
        }))

        let shortArr = filmsArr.map(item => ({
            [item.id]: {
                name: item["film_name"],
                description: item["film_description"],
                poster: item["film_poster"],
                duration: item["film_duration"],
                origin: item["film_origin"]
            }
        }))

        hallsArr = hallsArr.map(item => ({
            id: item.id,
            name: item["hall_name"],
        }))

        let idArr = []
        info.forEach(item => {
            idArr.push(item.id)
        });

        function select (info, films, shortArr, idArr){      
            
            for (let k = 0; k < shortArr.length; k++){
                let id = Number(Object.keys(shortArr[k]));
                let obj = shortArr[k][id];
                if(idArr.includes(id)){
                    films.push({
                        id: id,
                        name: obj.name,
                        description: obj.description,
                        poster: obj.poster,
                        duration: obj.duration,
                        origin: obj.origin,
                        time: [],
                    })
                }
            }
            for (let i = 0; i < films.length; i++){
                let id = films[i].id;
                let time = [];
                for (let j = 0; j < info.length; j++){
                    if(info[j].id === id){
                        films[i].number = info[j].number;
                        time.push(info[j].time);
                        films[i].time = time;
                    }
                }

            } 

            for (let i = 0; i < films.length; i++){
                let num = films[i].number;
                for (let q = 0; q < hallsArr.length; q++){
                    if(hallsArr[q].id === num){
                        films[i].hall = hallsArr[q].name;
                    }
                }
            }

        }        
        select (info, films, shortArr, idArr);

        setFilmsResult(filmsResult = films);  
        
        result = filmsResult.map(item => (
            <div key = {item.id} className = "film__card">               
                <div className = "film__info">
                    <img src = {item.poster} className = "film__poster"></img>
                    <div className = "film__text">
                        <p className = "film__name">{item.name}</p>
                        <p className = "film__description">{item.description}</p>
                        <p className = "film__time">{item.duration} минуты {item.origin}</p>
                    </div>
                </div>
                <div className = "halls__info">
                    <p className = "hall__number">{item.hall}</p>
                    {item.time.map(elem => (
                        <button className = "time">{elem}</button>
                    ))}
                </div>
            </div>
        ))
        setFilmsResult(filmsResult = result);  
    }
    
    return (
        <main class = "client__main">
            <div className="days__list">
                <button className="day" onClick={dayClick}>Сегодня {dateRender(0)}, {dateNumber(0)}</button>
                <button className="day" onClick={dayClick}>{dateRender(1)}, {dateNumber(1)}</button>
                <button className="day" onClick={dayClick}>{dateRender(2)}, {dateNumber(2)}</button>
                <button className="day" onClick={dayClick}>{dateRender(3)}, {dateNumber(3)}</button>
                <button className="day" onClick={dayClick}>{dateRender(4)}, {dateNumber(4)}</button>
                <button className="day" onClick={dayClick}>{dateRender(5)}, {dateNumber(5)}</button>
                <button className="day day__next" >{">"}</button>
            </div>
            <div className = "films__list">
                {filmsResult}
            </div>
        </main>
    );

};

export default Films;
