const title = document.getElementById("title");
const author = document.getElementById("author");
const notes = document.getElementById("notes");
const characterCount = document.getElementById("characterCount");
const limit = 200;
const chapter = document.getElementById("chapter");
const bookList = document.getElementById("book-list");
const btn = document.querySelector(".btn");

// Validate chapter input to allow only numbers
chapter.addEventListener("input", () => {
    let value = chapter.value;
    
    // Only numbers and 1 dp allowed 
    const regex = /^\d*\.?\d*$/; 
    const isValid = regex.test(value);

    if (!isValid) {
        // Take out invalid characters
        chapter.value = value.slice(0, -1);
    }
});

function removeBook(bookRow) {
    const confirmed = confirm("Are you sure you want to remove this book?");
    if (confirmed) {
        bookRow.remove();
    }
}

// Character count for notes input
// Show the initial count
notes.addEventListener("input", () => {
    characterCount.textContent =
        `${limit - notes.value.length} characters remaining`;
});


btn.addEventListener('click',  function(e) {
        e.preventDefault();
        if (title.value == "" && author.value == "" && notes.value == "" && chapter.value == "") {
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

            // Creating new chapter
            const newChapter = document.createElement("div");
            newChapter.innerHTML = chapter.value;
            newRow.appendChild(newChapter);

            // Creating new additional notes/comments
            const newGenre = document.createElement("div");
            newGenre.innerHTML = notes.value;
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
            notes.value = "";
            chapter.value = "";
            characterCount.textContent = `${limit} characters remaining`;
        }
})