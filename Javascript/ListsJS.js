const title = document.getElementById("title");
const author = document.getElementById("author");
const genre = document.getElementById("genre");
const bookList = document.getElementById("book-list");
const btn = document.querySelector(".btn");

function removeBook(bookRow) {
    const confirmed = confirm("Are you sure you want to remove this book?");
    if (confirmed) {
        bookRow.remove();
    }
}

btn.addEventListener('click',  function(e) {
        e.preventDefault();
        if (title.value == "" && author.value == "" && genre.value == "") {
            alert("Please enter at least one search criteria.");
            return;
        } else {
            const newRow = document.createElement("section");
            newRow.classList.add("book-row");

            // Creating new title
            const newTitle = document.createElement("div");
            newTitle.innerHTML = title.value;
            newRow.appendChild(newTitle);

            // Creating new author
            const newAuthor = document.createElement("div");
            newAuthor.innerHTML = author.value;
            newRow.appendChild(newAuthor);

            // Creating new genre
            const newGenre = document.createElement("div");
            newGenre.innerHTML = genre.value;
            newRow.appendChild(newGenre);

            // Creating remove button
            const removeBtn = document.createElement("button");
            removeBtn.innerHTML = "Remove";
            removeBtn.classList.add("btn", "btn-danger", "btn-sm");
            removeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                removeBook(newRow);
            });
            newRow.appendChild(removeBtn);

            bookList.appendChild(newRow);

            // Clear the form
            title.value = "";
            author.value = "";
            genre.value = "";
        }
})