
const tariffModal = document.getElementById("tariffModal");
const closeTariffModal = document.getElementById("closeTariffModal");
const selectedTariff = document.getElementById("selectedTariff");
const tariffForm = document.getElementById("tariffForm");

let currentTariff = "";

document.querySelectorAll(".tariff-open").forEach(button => {
    button.addEventListener("click", () => {
        currentTariff = button.dataset.tariff || button.textContent.replace("ВЫБРАТЬ", "").replaceAll("«", "").replaceAll("»", "").trim();

        if(selectedTariff){
            selectedTariff.textContent = `«${currentTariff}»`;
        }

        if(tariffModal){
            tariffModal.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    });
});

if(closeTariffModal && tariffModal){
    closeTariffModal.addEventListener("click", closeTariffModalWindow);
}

if(tariffModal){
    tariffModal.addEventListener("click", (e) => {
        if(e.target === tariffModal){
            closeTariffModalWindow();
        }
    });
}

function closeTariffModalWindow(){
    tariffModal.classList.remove("active");
    document.body.style.overflow = "auto";
}

if(tariffForm){
    tariffForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const applications = JSON.parse(localStorage.getItem("applications")) || [];

        applications.push({
            id: Date.now(),
            type: "tariff",
            tariff: currentTariff,
            email: document.getElementById("tariffEmail")?.value || "",
            phone: document.getElementById("tariffPhone")?.value || "",
            status: "new",
            createdAt: new Date().toLocaleString()
        });

        localStorage.setItem("applications", JSON.stringify(applications));

        alert("Заявка на тариф отправлена!");

        tariffForm.reset();
        closeTariffModalWindow();
    });
}
