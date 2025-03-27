import "../App.jsx";
import "../App.css";
import { HallManager } from "./HallManager.jsx";
import { HallConfiguration } from "./HallConfiguration.jsx";
// import { Films } from "./Films.jsx";
// import { Logout } from "./Logout.jsx";
// import { useState } from "react";

// Логин - shfe-diplom@netology.ru
// Пароль - shfe-diplom

export const Admin = () => {

    return (
        <>
            <main class = "admin__main">
                <HallManager />
                {/* <section className = "admin__section">
                    <div className = "section__header">Конфигурация залов</div>
                </section> */}
                <HallConfiguration />
                <section className = "admin__section">
                    <div className = "section__header">Конфигурация цен</div>
                </section>
                <section className = "admin__section">
                    <div className = "section__header">Сетка сеансов</div>
                </section>
                <section className = "admin__section">
                    <div className = "section__header">Открыть продажи</div>
                </section>
            </main>
        </>
    );

};

export default Admin;