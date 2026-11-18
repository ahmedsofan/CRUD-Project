// CRUD => Create , Read , Update , Delete

//Create

// 1. Get the form and articles list elements
let articleForm = document.getElementById("articleForm");
let articlesList = document.getElementById("articlesList");
let editModal = new bootstrap.Modal(document.getElementById("editModal"));
let saveChanges = document.getElementById("saveChanges");

//2) Create DB ( Array to store articles )
let articles = JSON.parse(localStorage.getItem("articles")) || []; // Retrieve articles from localStorage or initialize an empty array

// 3) creat article function
articleForm.addEventListener("submit", function (e) {
  e.preventDefault(); // تمنع إعادة تحميل الصفحة عند إرسال النموذج

  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;

  // Create an article object
  let newArticle = {
    id: Date.now(), // Unique ID based on timestamp
    title: title,
    content: content,
  };
  articles.push(newArticle);
  localStorage.setItem("articles", JSON.stringify(articles)); // Save articles to localStorage
  articleForm.reset(); // Reset the form fields

  renderArticles(); // عشان اشغل دالة قراية المقال
});

// 4) Read articles

function renderArticles() {
  articlesList.innerHTML = articles.map(
    (article) => `
        <div class="article-item card p-3 mb-2">
            <div class="d-flex justify-content-between align-items-start">
               <div>
                    <h5 class="article-title">${article.title}</h5>
                    <p class="article-content">${article.content}</p>
               </div>
               <div>
                    <button class="btn btn-warning btn-sm edit-article" onclick="editArtical(${article.id})" ><i class="bi bi-pencil-square"></i> تعديل</button>
                    <button class="btn btn-danger btn-sm " onclick="deletArticle(${article.id})"><i class="bi bi-trash"></i> حذف</button>
               </div>
            </div>
        </div>
        `,
  );
}
//renderArticles(); // عشان اشغل دالة قراية المقال

// 5) Delete article

window.deletArticle = function (id) {
  if (confirm("هل أنت متأكد من حذف المقال؟")) {
    articles = articles.filter((a) => a.id !== id);
    localStorage.setItem("articles", JSON.stringify(articles)); // Save articles to localStorage
    renderArticles();
  }
};

// 6 ) Update -- Edit article
window.editArtical = function (id) {
  let article = articles.find((a) => a.id === id);
  if (article) {
    document.getElementById("editId").value = article.id;
    document.getElementById("editTitle").value = article.title;
    document.getElementById("editContent").value = article.content;
    // فتح الـ Modal الخاص بـ Bootstrap
    editModal.show();
  }
};

// 7 ) save operation
saveChanges.addEventListener("click", function () {
  let id = parseInt(document.getElementById("editId").value); // بتاكد ان الداتا دي نصية parseInt
  let title = document.getElementById("editTitle").value;
  let content = document.getElementById("editContent").value;

  let articleIndex = articles.findIndex((a) => a.id === id);

  if (articleIndex !== -1) {
    articles[articleIndex] = { id, title, content };
    localStorage.setItem("articles", JSON.stringify(articles)); // Save articles to localStorage
    renderArticles();
    editModal.hide();
  }
});

renderArticles(); // عشان اشغل دالة قراية المقال
