import "../App.jsx";
import "../App.css";
import { useState } from "react";

export const Films = () => {
    let date = new Date();
    // let nextDate = date + 1;

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
    
    // function renderFilm(filmsData) {


        
        // let searchPoster = (i) => {
        //     filmsArr.forEach(obj => {
        //         if(obj.id === i){
        //             return (obj["film_poster"])
        //         }
        //     })
        // }

        // let searchName = (i) => {
        //     filmsArr.forEach(obj => {
        //         if(obj.id == i){
        //             return (obj["film_name"])
        //         }
        //     })
        // }

        // let searchDescription = (i) => {
        //     filmsArr.forEach(obj => {
        //         if(obj.id === i){
        //             return (obj["film_description"])
        //         }
        //     })
        // }
        
        // let searchHallNumber = (i) => {
        //     hallsArr.forEach(obj => {
        //         if(obj.id === i){
        //             return (obj["halls_name"])
        //         }
        //     })
        // }

        // c = info.map(item => (
        //     <div key={item.id}>
        //         <image src = {searchPoster(item.id)} className = "film__poster"></image>
        //         <div className = "film__info">
        //             <p className = "film__name">{searchName(item.id)}</p>
        //             <p className = "film__description">{searchDescription(item.id)}</p>
        //         </div>
        //         <div className = "halls__info">
        //             <p className = "hall__number">{searchHallNumber(item.number)}</p>
        //             <button className = "time">{item.time}</button>
        //         </div>
        //     </div>
        // ))

        // let result = info.map(item => ({
        //     name: {searchName(item.id)},
        //     poster: {searchPoster(item.id)},
        //     number: {searchHallNumber(item.number)},
        //     description: {searchDescription(item.id)},
        //     time: {item.time},
        // }));

        // console.log(searcFilm);
        // return (c);
    // }    
    fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
    .then( response => response.json())
    .then( data => {
            filmsData = data.result;
            console.log(data)
        }
    );

    // console.log(data)

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

        // console.log()

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
                // console.log(idArr);
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
            // console.log(films);
            // console.log(info);
            for (let i = 0; i < films.length; i++){
                let id = films[i].id;
                let time = [];
                // let num = Number(films[i].number);
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
    

            // for (let q = 0; q < hallsArr.length; q++){
            //     if(hallsArr[q].id === num){
            //         films[i].hall = hallsArr[q].name;
            //         console.log(hallsArr[q]);
            //     }
            // }
            // for (let l = 0; l < films.length; l++){
            //     let num = Number(films[l].number);
            //     for (let h = 0; h < hallsArr.length; h++){
            //         let name = String(hallsArr[h]["hall_name"]);
            //         if(hallsArr[h].id === num){
            //             films[l].hall = name;
            //         }
            //     }
            // }



            // let name = "";
            // let description = "";
            // let poster = "";
            // let number = "";
            // let time = "";

            // for (let k = 0; k < filmsArr.length; k++){       
            //     if(idArr.includes(Number(filmsArr[k].id))){
            //         name = filmsArr[k]["film_name"];
            //         description = filmsArr[k]["film_description"];
            //         poster = filmsArr[k]["film_poster"];

            //         films.push({
            //             [Number(filmsArr[k].id)]: {
            //             name: name,
            //             description: description,
            //             poster: poster,
            //         }})
            //     }
            // }

            // for (let i = 0; i < hallsArr.length; i++){
            //     if(idArr.includes(hallsArr[i].id)){
            //         number = hallsArr[i]["hall_name"];
 
            //         films.push({
            //             [hallsArr[i].id]: {
            //                 number: number,
            //         }})
            //     }
            // }

            // for (let j = 0; j < info.length; j++){
            //     if(idArr.includes(info[j].id)){
            //         time = info[j].time;

            //         films.push({
            //             [info[j].id]: {
            //                 time: time,
            //         }})
            //     }
            // }    


        select (info, films, shortArr, idArr);

        // for (let i = 0; i < films.length; i++){
        //     let id = Number(Object.keys(films[i]));
        //     films[i].name = films[i][id].name;
        //     films[i].description = films[i].id.description;
        //     films[i].id = id;
        // }
        


        // result = shortArr;
        // resultTest = shortArr;
        // shortArr.forEach(item => {
        //     if(!infoKeys.includes(Object.keys(item))){
        //         let i = result.find(element => {
        //             Object.keys(item) ===  Object.keys(element);
        //         })
        // let i = Object.values(item);
        //         let index = result.indexOf(i);
        //         console.log(index);
        //         result.splice(Object.values(item), 1);
        //     }
        // })    
        // shortArr.forEach(item => {
        //     if(infoKeys.includes(Object.keys(item))){
        //         let i = Object.keys(item);
        //         result.push({i: Object.values(item)})
        // })




        // function test (info) {
        //     let id = 0;
        //     let infoKeys = []
        //     info.forEach(item => {
        //         infoKeys.push(item.id)
        //     });

        //     let index = 0;
        //     // result = shortArr;

        //     // shortArr.forEach(element => {
        //     //     index = shortArr.indexOf(element);
        //         // console.log(index);

        //         // id = Object.keys(element);
        //         // if(!infoKeys.includes(id)){
        //             // result.splice(index, 1);
        //         //     result = result.filter(item => Object.keys(item) === id);
        //         // }

        //         // info.forEach(item => {
        //         //     if (item.id === Object.keys(element)){
        //         //         result.push(Object.values(element))
        //         //     }
        //         // })
        //     // });
            
        //     // console.log(result);
        //     // for (let j = 0; j < shortArr.length; j++) {
        //     //     id = Object.keys(shortArr[j]);
        //     //     if(infoKeys.includes(id)){
        //     //         result.push(Object.values(shortArr[j]));
        //     //         console.log(shortArr[j])
        //     //     }
        //     // }

        //     // console.log(result)

            
        // }

        // test(info);

        // let a = filmsArr.map(item => ({
        //     id: item.id,
        //     name: item["film_name"],
        //     description: item["film_description"],
        //     poster: item["film_poster"]
        // }))

        // let b = hallsArr.map(item => ({
        //     id: item.id,
        //     number: item["hall_name"],
        // }))


        // let searchPoster = (i) => {
        //     a.forEach(obj => {
        //         if(obj.id === i){
        //             return (obj.poster)
        //         }
        //     })
        // }

        // let searchName = (i) => {
        //     filmsArr.forEach(obj => {
        //         if(obj.id == i){
        //             return (obj.name)
        //         }
        //     })
        // }

        // let searchDescription = (i) => {
        //     filmsArr.forEach(obj => {
        //         if(obj.id === i){
        //             return (obj.description)
        //         }
        //     })
        // }
        
        // let searchHallNumber = (i) => {
        //     hallsArr.forEach(obj => {
        //         if(obj.id === i){
        //             return (obj.number)
        //         }
        //     })
        // }
        
        // result = seancesArr.map(item => ({
        //     id: item["seance_filmid"],
        //     number: item["seance_hallid"],
        //     time: item["seance_time"]
        // }))
        
        // console.log(result)

        // let c = result.map(item => (
        //     <div>
        //         <image src = {searchPoster(item["seance_filmid"])} className = "film__poster"></image>
        //         <div className = "film__info">
        //             <p className = "film__name">{searchName(item["seance_filmid"])}</p>
        //             <p className = "film__description">{searchDescription(item["seance_filmid"])}</p>
        //         </div>
        //         <div className = "halls__info">
        //             <p className = "hall__number">{searchHallNumber(item["seance_hallid"])}</p>
        //             <button className = "time">{item["seance_time"]}</button>
        //         </div>
        //     </div>
        // ))

        // function renderFilm(filmsData) {
        //     let seancesArr = filmsData.seances;
        //     let filmsArr = filmsData.films;
        //     let hallsArr = filmsData.halls;
    
        //     let result = seancesArr.map(item => ({
        //         id: item["seance_filmid"],
        //         number: item["seance_hallid"],
        //         time: item["seance_time"]
        //     }))

            
        //     let searchPoster = (i) => {
        //         filmsArr.forEach(obj => {
        //             if(obj.id === i){
        //                 return (obj["film_poster"])
        //             }
        //         })
        //     }

        //     let searchName = (i) => {
        //         filmsArr.forEach(obj => {
        //             if(obj.id == i){
        //                 return (obj["film_name"])
        //             }
        //         })
        //     }

        //     let searchDescription = (i) => {
        //         filmsArr.forEach(obj => {
        //             if(obj.id === i){
        //                 return (obj["film_description"])
        //             }
        //         })
        //     }
            
        //     let searchHallNumber = (i) => {
        //         hallsArr.forEach(obj => {
        //             if(obj.id === i){
        //                 return (obj["halls_name"])
        //             }
        //         })
        //     }

        //     let c = result.map(item => (
        //         <div key={item.id}>
        //             <image src = {searchPoster(item.id)} className = "film__poster"></image>
        //             <div className = "film__info">
        //                 <p className = "film__name">{searchName(item.id)}</p>
        //                 <p className = "film__description">{searchDescription(item.id)}</p>
        //             </div>
        //             <div className = "halls__info">
        //                 <p className = "hall__number">{searchHallNumber(item.number)}</p>
        //                 <button className = "time">{item.time}</button>
        //             </div>
        //         </div>
        //     ))

        //     console.log(c);
        //     return (c);
        // }
        // renderFilm(filmsData);

        // console.log(response.json())

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
                    {/* <button className = "time">{item.time}</button> */}
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