/* =========================================================
   CUENCA NEUQUINA · VERSION 2.0
   SCRIPT.JS
========================================================= */


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const preloader =
            document.getElementById("preloader");

        if (preloader) {
            preloader.classList.add("hide");
        }

    }, 600);

});


/* =========================================================
   HEADER
========================================================= */

const header =
    document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


menuToggle?.addEventListener("click", () => {

    mainNav.classList.toggle("active");

});


document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("active");

    });

});


/* =========================================================
   MAPA
========================================================= */

let map = null;

const normalLayer =
    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                '&copy; OpenStreetMap contributors'
        }
    );


const satelliteLayer =
    L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
            attribution:
                "Tiles &copy; Esri"
        }
    );


function initMap() {

    const mapElement =
        document.getElementById("map");

    if (!mapElement || typeof L === "undefined") {
        return;
    }

    map = L.map("map", {
        zoomControl: true,
        scrollWheelZoom: false
    }).setView(
        [-38.6, -69.2],
        6
    );


    normalLayer.addTo(map);


    const cuencaMarker =
        L.circle(
            [-38.4, -69.3],
            {
                radius: 150000,
                color: "#8b5cf6",
                fillColor: "#8b5cf6",
                fillOpacity: .12,
                weight: 2
            }
        ).addTo(map);


    cuencaMarker.bindPopup(`
        <strong>Cuenca Neuquina</strong><br>
        Área conceptual de la cuenca sedimentaria.
    `);


    const neuquen =
        L.marker([-38.95, -68.06])
            .addTo(map);

    neuquen.bindPopup(
        "<strong>Neuquén</strong><br>Provincia central del desarrollo."
    );


    const mendoza =
        L.marker([-37.1, -68.5])
            .addTo(map);

    mendoza.bindPopup(
        "<strong>Mendoza</strong><br>Sector norte de la Cuenca Neuquina."
    );


    const rioNegro =
        L.marker([-39.03, -67.67])
            .addTo(map);

    rioNegro.bindPopup(
        "<strong>Río Negro</strong><br>Sector oriental de la cuenca."
    );


    const laPampa =
        L.marker([-37.0, -67.2])
            .addTo(map);

    laPampa.bindPopup(
        "<strong>La Pampa</strong><br>Sector noreste de la cuenca."
    );


    document
        .getElementById("mapSatellite")
        ?.addEventListener("click", () => {

            map.removeLayer(normalLayer);

            satelliteLayer.addTo(map);

            document
                .getElementById("mapSatellite")
                .classList.add("active");

            document
                .getElementById("mapNormal")
                .classList.remove("active");

        });


    document
        .getElementById("mapNormal")
        ?.addEventListener("click", () => {

            map.removeLayer(satelliteLayer);

            normalLayer.addTo(map);

            document
                .getElementById("mapNormal")
                .classList.add("active");

            document
                .getElementById("mapSatellite")
                .classList.remove("active");

        });

}


if (typeof L !== "undefined") {

    initMap();

}


/* =========================================================
   GEOLOGÍA / CAPAS
========================================================= */

const geologicalData = {

    basamento: {

        title: "Basamento",

        text:
            "Constituye el sustrato más antiguo sobre el cual se desarrolló la sucesión sedimentaria de la Cuenca Neuquina.",

        type: "Rocas antiguas",

        function:
            "Basamento",

        property:
            "Rocas ígneas y metamórficas",

        origin:
            "Etapas geológicas antiguas"

    },

    cuyo: {

        title: "Grupo Cuyo",

        text:
            "Conjunto de unidades sedimentarias que registra una etapa importante de evolución de la cuenca, con depósitos de distintos ambientes.",

        type: "Sedimentario",

        function:
            "Relleno de cuenca",

        property:
            "Variación de litologías",

        origin:
            "Sedimentación"

    },

    tordillo: {

        title: "Formación Tordillo",

        text:
            "Unidad caracterizada principalmente por depósitos arenosos. Su posición estratigráfica es importante para comprender la evolución de la cuenca.",

        type: "Areniscas",

        function:
            "Unidad estratigráfica",

        property:
            "Porosidad variable",

        origin:
            "Ambientes continentales"

    },

    vacamuerta: {

        title: "Vaca Muerta",

        text:
            "Formación sedimentaria marina rica en materia orgánica. Funciona como roca generadora y reservorio no convencional debido a su muy baja permeabilidad.",

        type: "Shale",

        function:
            "Generadora / reservorio",

        property:
            "Baja permeabilidad",

        origin:
            "Sedimentario marino"

    },

    modernas: {

        title: "Unidades superiores",

        text:
            "Conjunto de depósitos más jóvenes que cubren sectores de la sucesión geológica y reflejan etapas posteriores de evolución de la cuenca.",

        type: "Sedimentario",

        function:
            "Cobertura",

        property:
            "Litologías variables",

        origin:
            "Depósitos más recientes"

    }

};


const layers =
    document.querySelectorAll(".layer");


layers.forEach(layer => {

    layer.addEventListener("click", () => {

        layers.forEach(item =>
            item.classList.remove("active")
        );

        layer.classList.add("active");

        const key =
            layer.dataset.layer;

        const data =
            geologicalData[key];

        if (!data) return;

        const container =
            document.getElementById(
                "layerInformation"
            );

        container.innerHTML = `

            <span class="info-label">
                FORMACIÓN SELECCIONADA
            </span>

            <h3>${data.title}</h3>

            <p>${data.text}</p>

            <div class="property-grid">

                <div>
                    <small>TIPO</small>
                    <strong>${data.type}</strong>
                </div>

                <div>
                    <small>FUNCIÓN</small>
                    <strong>${data.function}</strong>
                </div>

                <div>
                    <small>PROPIEDAD</small>
                    <strong>${data.property}</strong>
                </div>

                <div>
                    <small>ORIGEN</small>
                    <strong>${data.origin}</strong>
                </div>

            </div>

        `;

    });

});


/* =========================================================
   POZO INTERACTIVO
========================================================= */

const wellSteps = {

    1: {

        title: "Perforación vertical",

        text:
            "El pozo comienza desde superficie y avanza verticalmente atravesando las unidades geológicas superiores hasta aproximarse a la formación objetivo."

    },

    2: {

        title: "Desviación",

        text:
            "La trayectoria comienza a cambiar de dirección mediante una sección de construcción de ángulo para orientar el pozo hacia el objetivo."

    },

    3: {

        title: "Tramo horizontal",

        text:
            "El pozo desarrolla un tramo horizontal dentro de la formación productiva. Esto aumenta considerablemente la superficie de contacto con la roca."

    },

    4: {

        title: "Completación",

        text:
            "Se instala y acondiciona el sistema de completación, incluyendo revestimiento, cementación y elementos necesarios para preparar el pozo para la estimulación."

    },

    5: {

        title: "Fracturación hidráulica",

        text:
            "Se realizan etapas de estimulación hidráulica. El fluido a presión genera fracturas controladas y el agente de sostén ayuda a mantenerlas abiertas."

    },

    6: {

        title: "Producción",

        text:
            "Los hidrocarburos fluyen desde la formación hacia el pozo y posteriormente son conducidos a superficie para su tratamiento y procesamiento."

    }

};


const wellButtons =
    document.querySelectorAll(".well-step");


const wellAnimation =
    document.querySelector(".well-animation");


const wellDescription =
    document.getElementById(
        "wellDescription"
    );


wellButtons.forEach(button => {

    button.addEventListener("click", () => {

        wellButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const step =
            button.dataset.step;

        const data =
            wellSteps[step];

        if (!data) return;

        wellDescription.innerHTML = `

            <span>ETAPA ${String(step).padStart(2, "0")}</span>

            <h3>${data.title}</h3>

            <p>${data.text}</p>

        `;


        if (Number(step) >= 5) {

            wellAnimation.classList.add(
                "fractured"
            );

        } else {

            wellAnimation.classList.remove(
                "fractured"
            );

        }

    });

});


/* =========================================================
   FRACTURACIÓN
========================================================= */

const fractureButton =
    document.getElementById(
        "fractureBtn"
    );


const frackingRock =
    document.querySelector(
        ".fracking-rock"
    );


const frackingStatus =
    document.getElementById(
        "frackingStatus"
    );


fractureButton?.addEventListener(
    "click",
    () => {

        frackingRock.classList.remove(
            "active"
        );

        void frackingRock.offsetWidth;

        frackingRock.classList.add(
            "active"
        );

        frackingStatus.textContent =
            "Fracturas activas · agente de sostén distribuido";

        setTimeout(() => {

            frackingStatus.textContent =
                "Sistema estimulado · flujo hacia el pozo";

        }, 2500);

    }
);


/* =========================================================
   QUIZ
========================================================= */

const quizQuestions = [

    {

        question:
            "¿Qué característica dificulta el flujo natural de hidrocarburos en un shale?",

        answers: [
            "La muy baja permeabilidad",
            "La ausencia de sedimentos",
            "La presencia de agua superficial",
            "La alta permeabilidad"
        ],

        correct: 0,

        explanation:
            "El shale presenta una permeabilidad extremadamente baja, por lo que los fluidos tienen dificultad para desplazarse hacia el pozo."

    },

    {

        question:
            "¿Qué función cumple principalmente un pozo horizontal?",

        answers: [
            "Reducir la profundidad del yacimiento",
            "Aumentar el contacto con la formación productiva",
            "Eliminar la necesidad de completar el pozo",
            "Evitar la perforación"
        ],

        correct: 1,

        explanation:
            "El tramo horizontal permite aumentar la longitud del pozo dentro de la formación objetivo."

    },

    {

        question:
            "¿Qué es Vaca Muerta?",

        answers: [
            "Una empresa petrolera",
            "Una instalación de superficie",
            "Una formación geológica",
            "Un tipo de bomba"
        ],

        correct: 2,

        explanation:
            "Vaca Muerta es una formación geológica sedimentaria de gran importancia para los recursos no convencionales."

    },

    {

        question:
            "¿Qué elemento ayuda a mantener abiertas las fracturas?",

        answers: [
            "Cemento",
            "Proppant o agente de sostén",
            "Petróleo",
            "Aire"
        ],

        correct: 1,

        explanation:
            "El agente de sostén, como la arena, queda dentro de las fracturas y ayuda a mantenerlas abiertas."

    },

    {

        question:
            "¿Qué representa el TOC?",

        answers: [
            "Contenido de agua",
            "Carbono Orgánico Total",
            "Temperatura del pozo",
            "Presión de producción"
        ],

        correct: 1,

        explanation:
            "TOC significa Total Organic Carbon o Carbono Orgánico Total."

    },

    {

        question:
            "¿Qué técnica se utiliza para crear fracturas controladas?",

        answers: [
            "Perforación rotativa",
            "Cementación",
            "Fracturación hidráulica",
            "Registro eléctrico"
        ],

        correct: 2,

        explanation:
            "La estimulación mediante fracturación hidráulica utiliza fluidos a presión para generar fracturas controladas."

    },

    {

        question:
            "¿Qué diferencia principalmente a un sistema convencional?",

        answers: [
            "Los hidrocarburos pueden migrar hacia un reservorio",
            "No existe roca reservorio",
            "No existe roca madre",
            "Siempre utiliza pozos horizontales"
        ],

        correct: 0,

        explanation:
            "En los sistemas convencionales los hidrocarburos pueden migrar desde la roca generadora hacia un reservorio."

    },

    {

        question:
            "¿Cuál es una etapa posterior a la estimulación?",

        answers: [
            "Formación de la roca madre",
            "Producción",
            "Sedimentación marina",
            "Maduración térmica"
        ],

        correct: 1,

        explanation:
            "Luego de la estimulación y el acondicionamiento del pozo comienza la etapa de producción."

    }

];


let currentQuestion = 0;

let quizScore = 0;

let answered = false;


const questionText =
    document.getElementById(
        "questionText"
    );


const answersContainer =
    document.getElementById(
        "answers"
    );


const quizFeedback =
    document.getElementById(
        "quizFeedback"
    );


const nextQuestion =
    document.getElementById(
        "nextQuestion"
    );


const quizProgress =
    document.getElementById(
        "quizProgress"
    );


const quizProgressBar =
    document.getElementById(
        "quizProgressBar"
    );


const quizScoreElement =
    document.getElementById(
        "quizScore"
    );


function loadQuestion() {

    answered = false;

    const question =
        quizQuestions[currentQuestion];


    questionText.textContent =
        question.question;


    answersContainer.innerHTML = "";


    quizFeedback.textContent = "";


    nextQuestion.style.display =
        "none";


    quizProgress.textContent =
        `Pregunta ${currentQuestion + 1} de ${quizQuestions.length}`;


    quizProgressBar.style.width =
        `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;


    quizScoreElement.textContent =
        `${quizScore} puntos`;


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "answer-btn";

            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () => checkAnswer(
                    index,
                    button
                )
            );


            answersContainer.appendChild(
                button
            );

        }
    );

}


function checkAnswer(index, button) {

    if (answered) return;

    answered = true;


    const question =
        quizQuestions[currentQuestion];


    const allButtons =
        document.querySelectorAll(
            ".answer-btn"
        );


    allButtons.forEach(
        (btn, i) => {

            btn.disabled = true;

            if (i === question.correct) {

                btn.classList.add(
                    "correct"
                );

            }

        }
    );


    if (index === question.correct) {

        quizScore++;

        button.classList.add(
            "correct"
        );

        quizFeedback.innerHTML =
            `✓ Correcto. ${question.explanation}`;

    } else {

        button.classList.add(
            "wrong"
        );

        quizFeedback.innerHTML =
            `✕ Incorrecto. ${question.explanation}`;

    }


    quizScoreElement.textContent =
        `${quizScore} puntos`;


    nextQuestion.style.display =
        "inline-flex";

}


nextQuestion?.addEventListener(
    "click",
    () => {

        currentQuestion++;

        if (
            currentQuestion >=
            quizQuestions.length
        ) {

            showQuizResult();

        } else {

            loadQuestion();

        }

    }
);


function showQuizResult() {

    document
        .getElementById("quizContent")
        .classList.add("hidden");


    document
        .getElementById("quizResult")
        .classList.remove("hidden");


    document
        .getElementById("finalScore")
        .textContent =
        `${quizScore}/${quizQuestions.length}`;


    const resultTitle =
        document.getElementById(
            "resultTitle"
        );


    const resultText =
        document.getElementById(
            "resultText"
        );


    const percentage =
        quizScore /
        quizQuestions.length;


    if (percentage >= .875) {

        resultTitle.textContent =
            "Excelente dominio";

        resultText.textContent =
            "Tenés una muy buena comprensión de los conceptos fundamentales de la Cuenca Neuquina y el desarrollo no convencional.";

    } else if (percentage >= .625) {

        resultTitle.textContent =
            "Buen trabajo";

        resultText.textContent =
            "Comprendés buena parte de los conceptos. Podés volver a recorrer las secciones para profundizar.";

    } else {

        resultTitle.textContent =
            "A seguir explorando";

        resultText.textContent =
            "Te recomendamos recorrer nuevamente la sección de sistema petrolero y desarrollo del pozo.";

    }

}


document
    .getElementById("restartQuiz")
    ?.addEventListener(
        "click",
        () => {

            currentQuestion = 0;

            quizScore = 0;

            document
                .getElementById("quizContent")
                .classList.remove("hidden");

            document
                .getElementById("quizResult")
                .classList.add("hidden");

            loadQuestion();

        }
    );


loadQuestion();


/* =========================================================
   GLOSARIO
========================================================= */

const glossarySearch =
    document.getElementById(
        "glossarySearch"
    );


const termCards =
    document.querySelectorAll(
        ".term-card"
    );


glossarySearch?.addEventListener(
    "input",
    () => {

        const query =
            glossarySearch.value
                .toLowerCase()
                .trim();


        termCards.forEach(card => {

            const content =
                card.textContent
                    .toLowerCase();


            if (
                content.includes(query)
            ) {

                card.style.display =
                    "";

            } else {

                card.style.display =
                    "none";

            }

        });

    }
);


/* =========================================================
   MODO PRESENTACIÓN
========================================================= */

const presentationBtn =
    document.getElementById(
        "presentationBtn"
    );


const presentationOverlay =
    document.getElementById(
        "presentationOverlay"
    );


const closePresentation =
    document.getElementById(
        "closePresentation"
    );


const presentationTitle =
    document.getElementById(
        "presentationTitle"
    );


const presentationText =
    document.getElementById(
        "presentationText"
    );


const presentationCounter =
    document.getElementById(
        "presentationCounter"
    );


const presentationPrev =
    document.getElementById(
        "presentationPrev"
    );


const presentationNext =
    document.getElementById(
        "presentationNext"
    );


const presentationSlides = [

    {
        title:
            "Cuenca Neuquina",

        text:
            "Del origen geológico al desarrollo de un pozo no convencional."
    },

    {
        title:
            "La Cuenca",

        text:
            "Una extensa cuenca sedimentaria ubicada principalmente en el oeste argentino."
    },

    {
        title:
            "Tiempo Geológico",

        text:
            "Millones de años de sedimentación, enterramiento, maduración y transformación."
    },

    {
        title:
            "Sistema Petrolero",

        text:
            "La diferencia entre un sistema convencional y uno no convencional está relacionada con la roca, la migración y la permeabilidad."
    },

    {
        title:
            "Vaca Muerta",

        text:
            "Una formación sedimentaria rica en materia orgánica y de muy baja permeabilidad."
    },

    {
        title:
            "Desarrollo del Pozo",

        text:
            "Perforación vertical, desviación, tramo horizontal, completación y estimulación."
    },

    {
        title:
            "Fracturación Hidráulica",

        text:
            "La estimulación genera fracturas controladas y permite aumentar la comunicación con la formación."
    },

    {
        title:
            "Producción",

        text:
            "Los hidrocarburos fluyen desde la formación hacia el pozo y posteriormente a superficie."
    }

];


let presentationIndex = 0;


function updatePresentation() {

    const slide =
        presentationSlides[
            presentationIndex
        ];


    presentationTitle.textContent =
        slide.title;


    presentationText.textContent =
        slide.text;


    presentationCounter.textContent =
        `${presentationIndex + 1} / ${presentationSlides.length}`;

}


presentationBtn?.addEventListener(
    "click",
    () => {

        presentationOverlay.classList.add(
            "active"
        );

        document.body.classList.add(
            "presentation-active"
        );

        presentationIndex = 0;

        updatePresentation();

    }
);


closePresentation?.addEventListener(
    "click",
    closePresentationMode
);


function closePresentationMode() {

    presentationOverlay.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "presentation-active"
    );

}


presentationNext?.addEventListener(
    "click",
    () => {

        presentationIndex++;

        if (
            presentationIndex >=
            presentationSlides.length
        ) {

            presentationIndex = 0;

        }

        updatePresentation();

    }
);


presentationPrev?.addEventListener(
    "click",
    () => {

        presentationIndex--;

        if (presentationIndex < 0) {

            presentationIndex =
                presentationSlides.length - 1;

        }

        updatePresentation();

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            !presentationOverlay.classList.contains(
                "active"
            )
        ) {
            return;
        }


        if (event.key === "Escape") {

            closePresentationMode();

        }


        if (event.key === "ArrowRight") {

            presentationNext.click();

        }


        if (event.key === "ArrowLeft") {

            presentationPrev.click();

        }

    }
);


/* =========================================================
   VOLVER ARRIBA
========================================================= */

document
    .getElementById("backTop")
    ?.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


/* =========================================================
   ANIMACIÓN AL ENTRAR EN PANTALLA
========================================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: .1
        }
    );


document
    .querySelectorAll(
        ".concept-card, .process-card, .number-card, .safety-card, .term-card"
    )
    .forEach(element => {

        observer.observe(element);

    });
