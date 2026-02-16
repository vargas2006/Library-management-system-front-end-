const body = document.querySelector("body"),
     sidebar = body.querySelector(".sidebar"),
     toggle = body.querySelector(".toggle"),
     modeSwitch = body.querySelector(".toggle-switch"),
     modeText = body.querySelector(".mode-text");
     

     toggle.addEventListener("click", () =>{
        sidebar.classList.toggle("close");

     });

     modeSwitch.addEventListener("click", () =>{
        body.classList.toggle("dark");

        if(body.classList.contains("dark")) {
            modeText.innerText = "Light Mode"
        } else {
            modeText.innerText = "Dark Mode"
        }
     });

const links = document.querySelectorAll(".nav-link a");
const mainContent = document.getElementById("main-content");

links.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const page = this.getAttribute("data-page");

        fetch("pages/" + page + ".html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Page not found");
                }
                return response.text();
            })
            .then(data => {
                mainContent.innerHTML = data;
            })
            .catch(error => {
                mainContent.innerHTML = "<h2>Error loading page</h2>";
            });
    });
});

window.addEventListener("DOMContentLoaded", () => {
    fetch("pages/user-dashboard.html")
        .then(response => response.text())
        .then(data => {
            mainContent.innerHTML = data;
        });
});
     