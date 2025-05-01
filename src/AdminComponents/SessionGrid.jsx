import "../App.jsx";
import "../App.css";
import { useState } from "react";
export const SessionGrid = () => {    
    
    function hideSection(e) {
        e.preventDefault();
        const sectionBody = document.getElementById("session__grid__body");
        sectionBody.classList.toggle('active');
    }

    let filmsResponse = [];
    let hallsResponse = [];
    let sessionResponse = [];
    let filmsArr = [];
    let filmsTimeArr = [];
    let filmsPosterArr = [];
    let hallArr = [];
    let hallElements = [];
    let filmsInfo = [];
    let filmsElements = [];
    let hallConfig = [];
    let hallId = 0;
    let [films, setFilms] = useState();  
    let [filmsInformation, setFilmsInformation] = useState();  
    let [halls, setHalls] = useState();  
    let [nameFilm, setNameFilm] = useState();
    let [nameHall, setNameHall] = useState({name: "", id: 0});
    let [seances, setSeances] = useState();
    let [posters, setPoster] = useState("Постер еще не выбран");
    
    fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
    .then( response => response.json())
    .then( data => {
            sessionResponse = data.result.seances;
            filmsResponse = data.result.films;
            hallsResponse = data.result.halls;
            for (let i = 0; i < filmsResponse.length; i++){
                filmsInfo.push({
                    name: filmsResponse[i]["film_name"],
                    time: filmsResponse[i]["film_duration"],
                    poster:filmsResponse[i]["film_poster"],
                    id:filmsResponse[i].id,
                })
            }

            setFilmsInformation(filmsInformation = filmsInfo);

            filmsElements = filmsInfo.map(item => (
                <div className = "films__list__item" draggable="true" onDragStart={start} onDragEnd={end}>
                    <img src={item.poster} className = "film__item__poster"></img>
                    <div className = "film__item__info">
                        <p className = "film__item__name">{item.name}</p>
                        <p className = "film__item__time">{item.time} минут</p>
                    </div>
                    <button className = "film__item__delete" onClick={deleteFilm}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>
                </div>
            ));

            console.log(sessionResponse);
        
            function intoLent (date) {
                let id = 0;
                for(let i = 0; i < hallsResponse.length; i++){
                    if(hallsResponse[i]["hall_name"] === date){
                        id = hallsResponse[i].id;
                    }
                }

                let oneHallSession = [];
                for(let i = 0; i < sessionResponse.length; i++){
                    if(sessionResponse[i]["seance_hallid"] === id){
                        oneHallSession.push(sessionResponse[i]);
                    }
                }

                for(let i = 0; i < oneHallSession.length; i++){
                    for(let j = 0; j < filmsInfo.length; j++){
                        if(filmsInfo[j].id === oneHallSession[i]["seance_filmid"]){
                            oneHallSession[i].name = filmsInfo[j].name;
                        }
                    }
                }

                let oneHall = oneHallSession.map(item => (
                    <div className="into__lent__container">
                        <p className="into__lent__name"></p>
                            {item.name}
                        <p className="into__lent__time">{item["seance_time"]}</p>
                    </div>
                ));

                return oneHall;
            }

            setFilms(films = filmsElements);

            for (let i = 0; i < hallsResponse.length; i++){
                if(hallsResponse[i]["hall_open"] === 1){
                    hallArr.push(hallsResponse[i]["hall_name"]);
                }
            }
            
            hallElements = hallArr.map(item => (
                <div className="session">
                    <p className="hall__name__lent">{item}</p>
                    <div className="session__lent" onDragOver={drop}>
                        {intoLent(item)}
                    </div>
                </div>
            ));

            setHalls(halls = hallElements);
        }  
    );

    function start(e){
        let elementParent = e.target.closest("div");
        let nameDiv = elementParent.getElementsByClassName("film__item__name");
        elementParent.classList.add("selected");
        setNameFilm(nameFilm = nameDiv[0].textContent);
    };

    function end(e){
        let elementParent = e.target.closest("div");
        elementParent.classList.remove("selected");
    };

    function drop(e){
        e.preventDefault();
        let currentElement = e.target;
        let activeHall = e.target.previousElementSibling;
        let activeHallName = activeHall.closest("div");

        e.target.addEventListener("drop", (e) => {
            e.preventDefault();
            let container = e.target.closest("div");
            let activeHall = e.target.previousElementSibling.textContent;
            let hallId = 0;
            let seances = [];
                    
            for (let i = 0; i < hallsResponse.length; i++){
                if(hallsResponse[i]["hall_name"] === activeHall){
                    hallId = hallsResponse[i].id;
                    let hallInfo = {
                        name: activeHall,
                        id: hallId
                    }
                    setNameHall(nameHall = hallInfo);
                }
            }

            for (let i = 0; i < sessionResponse.length; i++){
                if(sessionResponse[i]["seance_hallid"] === hallId){
                    let filmId = sessionResponse[i]["seance_filmid"];
                    let duration = 0;
                    let filmName = "";
                    for (let i = 0; i < filmsResponse.length; i++){
                        if(filmsResponse[i].id === filmId){
                            duration = filmsResponse[i]["film_duration"];
                            filmName = filmsResponse[i]["film_name"];
                        }
                    }

                    seances.push({
                        timeStart: sessionResponse[i]["seance_time"],
                        duration: duration,
                        name: filmName,  
                        filmId: filmId,
                        hallId: hallId,
                    });
                }
            }
            setSeances(seances = seances)

            let popUp = document.getElementById("popup__background__add__session");
            popUp.style.display = "block";
        })
    };

    function deleteFilm(e){
        const bascet = e.target;
        const deleteItem = bascet.closest("div"); 
        const film = deleteItem.getElementsByClassName("film__item__name");
        const filmName = film[0].textContent;
        let deleteId = 0;
        for (let i = 0; i < hallsResponse.length; i++){
            if(hallsResponse[i]["film_name"] === filmName){
                deleteId = hallsResponse[i].id
            }
        }

        fetch( `https://shfe-diplom.neto-server.ru/film/${deleteId}`, {
            method: 'DELETE',
        })
            .then( response => response.json())
            .then( data => console.log( data ));
    
    }

    function showPopup() {
        const popUp = document.getElementById("popup__background__add__film");
        popUp.style.display = "block";
    }

    function hidePopup() {
        const popUp = document.getElementById("popup__background__add__film");
        popUp.style.display = "none";
    }

    let name = document.getElementById("name");
    let time = document.getElementById("time");
    let description = document.getElementById("description");
    let country = document.getElementById("country");
    let poster = document.getElementById("poster");

    function filmBtnCancel(){
        name.value = "";
        name.placeholder = "Например, \"Гражданин Кейн\""
        time.value = "";
        description.value = "";
        country.value = "";
        poster.value = "";
        setPoster(posters = "Постер еще не выбран")
    }

    function filmAdd(){
        let params = new FormData();
        params.set('filmName', String(name.value));
        params.set('filmDuration', Number(time.value));
        params.set('filmDescription', String(description.value));
        params.set('filmOrigin', String(country.value));
        params.set('filePoster', poster.files[0]);

        fetch( "https://shfe-diplom.neto-server.ru/film", {
            method: 'POST',
            body: params 
        })
        .then( response => response.json())
        .then( data => console.log( data ));
    }

    function ShowPopupSession(){
        const popUp = document.getElementById("popup__background__add__session");
        popUp.style.display = "block";
    }

    function hidePopupSession() {
        const popUp = document.getElementById("popup__background__add__session");
        popUp.style.display = "none";
    }

    function posterAdd() {
        poster.click();
        poster.onchange = function() {
            if (this.files[0].size > 3145728) { 
              alert("Размер файла превышен, выберите файл меньше 3МБ.");
              this.value = '';
            }

            if(poster.value){
                setPoster(posters = poster.value)
            }
        };
    }

    function sessionAdd(){
        let filmName = document.getElementById("nameFilm");
        let time = document.getElementsByClassName("time__input");
        let filmsInfo = filmsInformation;
        let filmDuration = 0;
        let maxHour = 0;
        let maxMinutes = 0;
        let seanceHallid = 0;
        let seanceFilmid = 0;

        for (let i = 0; i < filmsInfo.length; i++){
            if(filmsInfo[i]["name"] === filmName.value){
                filmDuration = filmsInfo[i]["time"]
            }

            let durationHour =  Math.floor(filmDuration / 60);
            let durationMinutes = filmDuration - (durationHour * 60);

            maxHour = 23 - durationHour;
            maxMinutes = 59 - durationMinutes;
        }

        for (let i = 0; i < filmsInfo.length; i++){
            if(filmsInfo[i]["name"] === filmName.value){
                seanceFilmid = filmsInfo[i].id;
            }
        }

        for (let i = 0; i < seances.length; i++){

            let start = seances[i]["timeStart"];
            let minutesStart = Number(start.slice(-2));
            let hourStart = Number(start.slice(-5, -3));
            let minutesEnd = 0;
            let hourEnd = 0;
            let duration = Number(seances[i]["duration"]);
            if(duration > 60){
                hourEnd = hourStart + Math.floor(duration / 60);
                minutesEnd = minutesStart + (duration - (60 * Math.floor(duration / 60)));
            } else {
                hourEnd = hourStart;
                minutesEnd = minutesStart + duration;
            }

            if(minutesEnd > 60){
                hourEnd =+ 1;
                minutesEnd =- 60;
            }

            if(Number(time[0].value.slice(-5, -3)) > maxHour){
                alert("Сеанс не может заканчиваться позже 23:59");
            } else if ((Number(time[0].value.slice(-5, -3)) === maxHour) && (Number(time[0].value.slice(-2)) > maxMinutes)){
                alert("Сеанс не может заканчиваться позже 23:59");
            }

            if ((hourStart <= Number(time[0].value.slice(-5, -3))) && (Number(time[0].value.slice(-5, -3)) <= hourEnd) && (minutesStart <= Number(time[0].value.slice(-2))) && (Number(time[0].value.slice(-2)) <= minutesEnd)){
                alert("В этом интервале уже есть сеанс");
            }
        }
        
        let params = new FormData();
        params.set('seanceHallid', nameHall.id);
        params.set('seanceFilmid', seanceFilmid);
        params.set('seanceTime', time[0].value);

        fetch( "https://shfe-diplom.neto-server.ru/seance", {
            method: 'POST',
            body: params 
        })
        .then( response => response.json())
        .then( data => console.log( data ))
    }

    function sessionBtnCancel(e){
        e.preventDefault();
        let timeInput = document.getElementsByClassName("time__input");
        timeInput[0].value = "00:00";
    }

    return (
        <>
            <section className = "admin__section">
                <div className = "section__header">
                    <p className = "section__header__name">Сетка сеансов</p>
                    <button className = "section__header__arrow" onClick={hideSection}> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#EFEFEF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg></button>
                </div>
                <div className = "session__grid__body active" id = "session__grid__body">
                    <button className = "btn__add__film" onClick={showPopup}>Добавить фильм</button> 
                    <div id = "popup__background__add__film" className="popup__background">
                        <div className="popup">
                            <div className="popup__header">
                                <p className="popup__name">Добавление фильма</p>
                                <button className="popup__close" onClick={hidePopup}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#EFEFEF"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
                            </div>
                            <div className="popup__body">
                                <label for="name" className = "film__name__label">Название фильма:</label>
                                <input type="text" name="name" id="name" className = "film__name__input" placeholder="Например, &quot;Гражданин Кейн&quot;"></input>
                                <label for="time" className = "film__time__label">Продолжительность фильма (мин.)</label>
                                <input type="number" name="time" id="time" className = "film__time__input"></input>
                                <label for="description" className = "film__description__label">Описание фильма:</label>
                                <textarea type="text" name="description" id="description" className = "film__description__input"></textarea>
                                <label for="country" className = "film__country__label">Страна:</label>
                                <input type="text" name="country" id="country" className = "film__country__input"></input>
                                <input type="file" name="poster" id="poster" accept=".png" className = "film__poster__input"></input>  
                                <button id="poster__add__btn" className="poster__add__btn" onClick={posterAdd}>Загрузить постер</button>
                                <span id="selected__poster" className="selected__poster">{posters}</span>
                                <button className = "film__add__btn" onClick={filmAdd}>Добавить фильм</button>
                                <button className = "btn__cancel" onClick={sessionBtnCancel}>Отменить</button> 
                            </div>
                        </div>
                    </div>
                    <div className = "films__list">
                        {films}
                    </div> 
                    <div className = "session__lents">
                        {halls}
                    </div>
                    <div id = "popup__background__add__session" className="popup__background__session">
                        <div className="popup">
                            <div className="popup__header">
                                <p className="popup__name">Добавление сеанса</p>
                                <button className="popup__close" onClick={hidePopupSession}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#EFEFEF"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
                            </div>
                            <div className="popup__body">
                                <label for="nameHall" className = "hall__name__label">Название зала:</label>
                                <input type="text" name="nameHall" id="nameHall" className = "hall__name__input" placeholder="Название зала" value = {nameHall.name}></input>
                                <label for="nameFilm" className = "film__name__label">Название фильма:</label>
                                <input type="text" name="nameFilm" id="nameFilm" className = "film__name__input" placeholder="Название фильма" value = {nameFilm}></input>
                                <label for="time" className = "time__label">Время начала:</label>
                                <input type="time" name="time" id="time" className = "time__input"></input>
                                <button className = "film__add__btn" onClick={sessionAdd}>Добавить сеанс</button>
                                <button className = "btn__cancel" onClick={sessionBtnCancel}>Отменить</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SessionGrid;
