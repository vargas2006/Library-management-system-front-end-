export function initBorrowBooks() {
const tableBody = document.getElementById("borrow-book-table");

function renderBooks() {
    const books = JSON.parse(localStorage.getItem("books") || "[]");
    tableBody.innerHTML = "";

    if (books.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding:20px;">
                    No books available yet.
                </td>
            </tr>
        `;
        return;
    }

    books.forEach((book, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td data-label="Book ID">${book.id}</td>
            <td data-label="Title">${book.title}</td>
            <td data-label="Author">${book.author}</td>
            <td data-label="Category">${book.category}</td>
            <td data-label="Status">
                <span class="status-badge ${book.status === "Borrowed" ? "borrowed" : "available"}">
                    ${book.status}
                </span>
            </td>
            <td data-label="Action">
                <button class="btn-primary"
                    ${book.status === "Borrowed" ? "disabled" : ""}
                    data-index="${index}">
                    Borrow
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

    tableBody.addEventListener("click", e => {
        if(e.target.tagName === "BUTTON" && e.target.dataset.index !== undefined){
            const index = e.target.dataset.index;
            const books = JSON.parse(localStorage.getItem("books") || "[]");
            books[index].status = "Borrowed";
            localStorage.setItem("books", JSON.stringify(books));
            renderBooks();
        }
    });

    renderBooks();
}
