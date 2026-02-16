const pageScripts = {
    "user-dashboard": "js/user-dashboard.js",
    "borrow-books": "js/borrow-books.js",
    "my-borrowed": "js/my-borrowed.js",
    "my-account": null // no JS
};

function loadPage(page) {
    fetch("pages/" + page + ".html")
        .then(res => res.ok ? res.text() : Promise.reject("Page not found"))
        .then(data => {
            document.getElementById("main-content").innerHTML = data;

            // Load page-specific JS
            const scriptPath = pageScripts[page];
            if(scriptPath){
                import(`./${scriptPath}`).then(module => {
                    if(typeof module.initDashboard === "function") module.initDashboard();
                    if(typeof module.initBorrowBooks === "function") module.initBorrowBooks();
                    if(typeof module.initMyBorrowed === "function") module.initMyBorrowed();
                });
            }
        })
        .catch(err => {
            document.getElementById("main-content").innerHTML = "<h2>Error loading page</h2>";
        });
}

// SPA navigation
document.querySelectorAll(".nav-link a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        loadPage(link.dataset.page);
    });
});

// Load default page
window.addEventListener("DOMContentLoaded", () => loadPage("user-dashboard"));

document.body.addEventListener('input', function(e) {
    if (e.target && e.target.id === 'borrowBookSearch') {
        const filter = e.target.value.toLowerCase();
        const table = document.getElementById('borrow-book-table');
        const rows = table.getElementsByTagName('tr');

        // If search bar is empty, show all rows and hide "no results"
        if(filter === '') {
            Array.from(rows).forEach(row => row.style.display = '');
            document.getElementById('no-results').style.display = 'none';
            return;
        }

        let found = false;
        Array.from(rows).forEach(row => {
            const title = row.cells[1]?.innerText.toLowerCase() || '';
            const author = row.cells[2]?.innerText.toLowerCase() || '';
            const category = row.cells[3]?.innerText.toLowerCase() || '';

            if (title.includes(filter) || author.includes(filter) || category.includes(filter)) {
                row.style.display = '';
                found = true;
            } else {
                row.style.display = 'none';
            }
        });

        document.getElementById('no-results').style.display = found ? 'none' : 'block';
    }
});
