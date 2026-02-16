export function initMyBorrowed() {
    const tableBody = document.getElementById("my-borrowed-table");
    const books = JSON.parse(localStorage.getItem("books") || "[]");
    const borrowed = books.filter(b => b.status === "Borrowed");
    tableBody.innerHTML = "";

    if(borrowed.length === 0){
        tableBody.innerHTML = "<tr><td colspan='5'>No borrowed books yet.</td></tr>";
        return;
    }

    borrowed.forEach(book => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.status}</td>
        `;
        tableBody.appendChild(row);
    });
}
