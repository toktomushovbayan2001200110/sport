const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");
const closeMenu = document.querySelector(".close-menu");
const overlay = document.querySelector(".overlay");

if (burger) {
    burger.addEventListener("click", () => {
        mobileMenu.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    });
}

if (closeMenu) {
    closeMenu.addEventListener("click", closeMobileMenu);
}

if (overlay) {
    overlay.addEventListener("click", closeMobileMenu);
}

function closeMobileMenu(){
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
}

const adminLinks = document.querySelectorAll(".admin-link");

adminLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        closeMobileMenu();
    });
});
