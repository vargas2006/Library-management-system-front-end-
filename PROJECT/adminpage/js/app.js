
const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
const modeSwitch = body.querySelector(".toggle-switch");
const modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});


// =============================
// GLOBAL DATA
// =============================

let books = [];
let borrowers = [];

// =============================
// SPA NAVIGATION
// =============================

document.addEventListener("DOMContentLoaded", () => {

    const mainContent = document.getElementById("main-content");
    const links = document.querySelectorAll(".nav-link a");

    function loadPage(page) {
        fetch("pages/" + page + ".html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Page not found");
                }
                return response.text();
            })
            .then(data => {
                mainContent.innerHTML = data;

                // 🔥 AUTO INITIALIZE DEPENDING ON PAGE
                if (page === "dashboard") {
                    initDashboard();
                }

                if (page === "manage-books") {
                    renderBooks();
                }
            })
            .catch(error => {
                console.error(error);
                mainContent.innerHTML = "<h2>Error loading page</h2>";
            });
    }

    // Attach click events
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const page = this.getAttribute("data-page");
            loadPage(page);
        });
    });

    // Default page
    loadPage("dashboard");
});

// =============================
// DASHBOARD 
// =============================

function initDashboard() {
    const totalBooks = document.getElementById('totalBooks');
    const borrowedBooks = document.getElementById('borrowedBooks');
    const returnedBooks = document.getElementById('returnedBooks');
    const totalBorrowers = document.getElementById('totalBorrowers');

    if (!totalBooks) return;

    totalBooks.innerText = books.length;
    borrowedBooks.innerText = books.filter(b => b.status === "Borrowed").length;
    returnedBooks.innerText = books.filter(b => b.status === "Available").length;
    totalBorrowers.innerText = borrowers.length;
}

// =============================
// MANAGE BOOKS 
// =============================

function renderBooks() {
    const bookTable = document.getElementById('book-table');
    if (!bookTable) return;

    bookTable.innerHTML = '';

    books.forEach((book, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.id}</td>
            <td>
                ${book.cover ? `<img src="${book.cover}" style="width:40px;height:60px;object-fit:cover;border-radius:4px;margin-right:8px;vertical-align:middle;">` : ''}
                ${book.title}
            </td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.status}</td>
            <td>
                <button class="delete-btn" data-index="${index}" 
                    style="padding:5px 10px;border:none;background:red;color:white;border-radius:4px;cursor:pointer;">
                    Delete
                </button>
            </td>
        `;

        bookTable.appendChild(row);
    });

    initDashboard();
}

// =============================
// EVENT DELEGATION
// =============================

document.body.addEventListener('click', function (e) {

    if (e.target.id === 'addBookBtn') {
        document.getElementById('bookModal').style.display = 'flex';
    }

    if (e.target.id === 'closeModal') {
        document.getElementById('bookModal').style.display = 'none';
    }

    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        books.splice(index, 1);
        renderBooks();
    }
});

document.body.addEventListener('submit', function (e) {

    if (e.target.id === 'bookForm') {
        e.preventDefault();

        const fileInput = document.getElementById('bookCover');
        const file = fileInput.files[0];

        const newBook = {
            id: document.getElementById('bookId').value.trim(),
            title: document.getElementById('bookTitle').value.trim(),
            author: document.getElementById('bookAuthor').value.trim(),
            category: document.getElementById('bookCategory').value.trim(),
            status: document.getElementById('bookStatus').value,
            cover: null
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                newBook.cover = event.target.result;
                books.push(newBook);
                renderBooks();
                document.getElementById('bookModal').style.display = 'none';
                e.target.reset();
            };
            reader.readAsDataURL(file);
        } else {
            books.push(newBook);
            renderBooks();
            document.getElementById('bookModal').style.display = 'none';
            e.target.reset();
        }
    }
});

// ==========================
// MODAL OPEN / CLOSE LOGIC
// ==========================
const addBookBtn = document.getElementById("addBookBtn");
const bookModal = document.getElementById("bookModal");
const closeModal = document.getElementById("closeModal");

addBookBtn.addEventListener("click", () => {
    bookModal.style.display = "flex";
    document.body.style.overflow = "hidden"; // para hindi scroll sa background
});

closeModal.addEventListener("click", () => {
    bookModal.style.display = "none";
    document.body.style.overflow = "auto";
});


bookModal.addEventListener("click", (e) => {
    if(e.target === bookModal){
        bookModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});
