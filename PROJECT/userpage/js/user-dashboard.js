export function initDashboard() {
    const books = JSON.parse(localStorage.getItem("books") || "[]");
    const total = books.length;
    const borrowed = books.filter(b => b.status === "Borrowed").length;

    const totalEl = document.getElementById("total-books");
    const borrowedEl = document.getElementById("borrowed-books");

    if(totalEl) totalEl.innerText = total;
    if(borrowedEl) borrowedEl.innerText = borrowed;
}
