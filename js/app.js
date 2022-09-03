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
    newsContainer.textContent = ``;
    categoryNews.forEach(news => {
        console.log(news)
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("card", "mb-3");
        newsDiv.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.details.slice(0, 250)}....</p>
                        <div class="d-flex">
                            <div class="d-flex ">
                                <img class="author-img" src="${news.author.img}">
                                <div>
                                    <h6>${news.author.name}</h6>
                                    <p>${news.author.published_date}</p>
                                </div>
                            </div>
                            <p><p>
                        </div>
                    </div>
                </div>
            </div>
        `
        newsContainer.appendChild(newsDiv)
    })
}

loadCategory()