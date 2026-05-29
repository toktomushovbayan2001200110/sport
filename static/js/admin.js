
const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "Ironclub_pin3";

function loginAdmin(){
    const login = document.getElementById("adminLogin").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    if(login === ADMIN_LOGIN && password === ADMIN_PASSWORD){
        localStorage.setItem("adminAuth","true");
        showAdmin();
    }else{
        alert("Неверный логин или пароль");
    }
}

function logoutAdmin(){
    localStorage.removeItem("adminAuth");
    window.location.href = "index.html";
}

function showAdmin(){
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");
    renderApplications();
}

function getApplications(){
    return JSON.parse(localStorage.getItem("applications")) || [];
}

function saveApplications(applications){
    localStorage.setItem("applications", JSON.stringify(applications));
}

function renderApplications(){
    const container = document.getElementById("applicationsContainer");
    const applications = getApplications();

    document.getElementById("allCount").textContent = applications.length;
    document.getElementById("newCount").textContent = applications.filter(app => app.status !== "done").length;
    document.getElementById("doneCount").textContent = applications.filter(app => app.status === "done").length;

    if(applications.length === 0){
        container.innerHTML = '<p class="empty-text">Заявок пока нет.</p>';
        return;
    }

    container.innerHTML = "";

    applications.slice().reverse().forEach(app => {
        const card = document.createElement("div");
        card.className = "application-card";

        const isTariff = app.type === "tariff" || app.type === "membership";
        const typeLabel = isTariff ? "Заявка на тариф" : "Обратная связь";
        const title = isTariff ? `Тариф «${app.tariff || app.plan || "не выбран"}»` : (app.name || "Сообщение");

        const extra = isTariff
            ? `
                <p><b>Тариф:</b> ${app.tariff || app.plan || ""}</p>
                <p><b>Телефон:</b> ${app.phone || ""}</p>
            `
            : `
                <p><b>Тема:</b> ${app.topic || ""}</p>
                ${app.rating ? `<p><b>Оценка:</b> ${app.rating}</p>` : ""}
                <p><b>Сообщение:</b><br>${app.message || ""}</p>
            `;

        card.innerHTML = `
            <div class="application-top">
                <div>
                    <div class="application-type">${typeLabel}</div>
                    <h3>${title}</h3>
                </div>

                <div class="application-status ${app.status === "done" ? "done" : "new"}">
                    ${app.status === "done" ? "Обработано" : "Новая"}
                </div>
            </div>

            <p><b>Email:</b> ${app.email || ""}</p>
            ${extra}
            <p><b>Дата:</b> ${app.createdAt || ""}</p>

            <div class="application-buttons">
                <button class="done-btn" type="button" onclick="markDone(${app.id})">Обработано</button>
                <button class="delete-btn" type="button" onclick="deleteApplication(${app.id})">Удалить</button>
            </div>
        `;

        container.appendChild(card);
    });
}

function markDone(id){
    const applications = getApplications().map(app => {
        if(Number(app.id) === Number(id)){
            app.status = "done";
        }
        return app;
    });

    saveApplications(applications);
    renderApplications();
}

function deleteApplication(id){
    const applications = getApplications().filter(app => Number(app.id) !== Number(id));
    saveApplications(applications);
    renderApplications();
}

function clearDone(){
    const applications = getApplications().filter(app => app.status !== "done");
    saveApplications(applications);
    renderApplications();
}

document.addEventListener("keydown", function(event){
    if(event.key === "Enter" && !document.getElementById("loginBox").classList.contains("hidden")){
        loginAdmin();
    }
});

if(localStorage.getItem("adminAuth") === "true"){
    showAdmin();
}
