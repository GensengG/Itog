import "../App.jsx";
import "../App.css";
import { useState } from "react";

export const HallManager = () => {
    const params = new FormData();
    let hallsResponse = [];
    let hallArr = [];
    let hallElements = [];
    let [halls, setHalls] = useState();  

    function getHallInfo () {
        fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
        .then( response => response.json())
        .then( data => {
                hallsResponse = data.result.halls;
                for (let i = 0; i < hallsResponse.length; i++){
                    hallArr.push(hallsResponse[i]["hall_name"])
                }
                hallElements = hallArr.map(item => (
                    <div className = "hall">
                        <p className = "hall_name">- {item}</p>
                        <div className = "hall_delete" onClick={deleteHall}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg></div>
                    </div>
                ));
                setHalls(halls = hallElements);
            }
        );
    }   
    getHallInfo ();

    function showPopup() {
        const popUp = document.getElementById("popup__background");
        popUp.style.display = "block";
    }

    function hidePopup() {
        const popUp = document.getElementById("popup__background");
        popUp.style.display = "none";
    }

    function deleteHall(e){
        const bascet = e.target;
        const deleteBtn = bascet.closest("div");
        const hall = deleteBtn.previousElementSibling.textContent;
        const hallName = hall.slice(2);
        let deleteId = 0;

        for (let i = 0; i < hallsResponse.length; i++){
            if(hallsResponse[i]["hall_name"] === hallName){
                deleteId = hallsResponse[i].id
            }
        }

        fetch( `https://shfe-diplom.neto-server.ru/hall/${deleteId}`, {
            method: 'DELETE',
        })
            .then( response => response.json())
    }

    function createHall(){
        const addedHall = document.getElementById("create__hall");
        const addedHallName = addedHall.value;

        params.set("hallName", addedHallName);
        fetch( 'https://shfe-diplom.neto-server.ru/hall', {
            method: 'POST',
            body: params 
        })
        .then( response => response.json())
        .then( data => {
            console.log( data )
        });

        hidePopup();
    } 

    function createHallClear() {
        const addedHall = document.getElementById("create__hall");
        addedHall.value = "";
    }

    function hideSection(e) {
        e.preventDefault();
        const sectionBody = document.getElementById("hall__manager__body");
        sectionBody.classList.toggle('active');
    }
    
    return (
        <>
            <section className = "admin__section">
                <div className = "section__header">
                    <p className = "section__header__name">Управление залами</p>
                    <button className = "section__header__arrow" onClick={hideSection}> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#EFEFEF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg></button>
                </div>
                <div className = "hall__manager__body active" id = "hall__manager__body">
                    <p>Доступные залы:</p>
                        {halls}
                    <button className="create__hall" onClick={showPopup}>Создать зал</button>
                </div>
            </section>
            <div id = "popup__background" className="popup__background">
                <div className="popup">
                    <div className="popup__header">
                        <p className="popup__name">Добавление зала</p>
                        <button className="popup__close" onClick={hidePopup}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#EFEFEF"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
                    </div>
                    <div className="popup__body">
                        <label for="create__hall" className="popup__label">Добавить зал</label>
                        <input type="text" name="create__hall" id = "create__hall" className="popup__input"></input>
                        <button className="popup__btn" onClick={createHall}>Добавить зал</button>
                        <button className="popup__cancel" onClick={createHallClear}>Отменить</button>
                    </div>
                </div>
            </div>
        </>
    );

};

export default HallManager;
