const loadCategory = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/news/categories");
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch (err) {
        alert(err)
    }

}

const displayCategory = categories => {
    const categoryUl = document.getElementById("category-lists");
    categories.forEach(category => {
        const categoryLi = document.createElement("li");
        categoryLi.innerHTML = `
                <button type="button" onclick="loadCategoryNews('${category.category_id}')" class="btn btn-light px-4 mx-3 my-3">${category.category_name}</button>
            `;
        categoryUl.appendChild(categoryLi)
    })
}

const loadCategoryNews = newsId => {
    const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryNews(data.data))
}

const displayCategoryNews = categoryNews => {
    const newsContainer = document.getElementById("news-container");
    categoryNews.forEach(news => {
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("card", "mb-3");
        newsDiv.innerHTML = `
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="..." class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        `
        newsContainer.appendChild(newsDiv)
    })
}

loadCategory()