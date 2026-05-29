
const form = document.getElementById("contactForm");
const rating = document.getElementById("rating");
const ratingValue = document.getElementById("ratingValue");

if(rating && ratingValue){
    rating.addEventListener("input", () => {
        ratingValue.textContent = rating.value;
    });
}

if(form){
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const applications = JSON.parse(localStorage.getItem("applications")) || [];

        applications.push({
            id: Date.now(),
            type: "contact",
            name: document.getElementById("name")?.value || "",
            email: document.getElementById("email")?.value || "",
            topic: document.getElementById("topic")?.value || "",
            rating: document.getElementById("rating")?.value || "",
            message: document.getElementById("message")?.value || "",
            status: "new",
            createdAt: new Date().toLocaleString()
        });

        localStorage.setItem("applications", JSON.stringify(applications));

        alert("Сообщение успешно отправлено!");

        form.reset();

        if(ratingValue){
            ratingValue.textContent = "5";
        }
    });
}
