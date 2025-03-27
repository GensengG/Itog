import "../App.jsx";
import "../App.css";
import { HallManager } from "./HallManager.jsx";
import { HallConfiguration } from "./HallConfiguration.jsx";

export const Admin = () => {

    return (
        <>
            <main class = "admin__main">
                <HallManager />
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
