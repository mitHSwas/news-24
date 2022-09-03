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
                <button type="button" onclick="loadCategoryNews('${category.category_id}', '${category.category_name}')" class="btn btn-light px-4 mx-3 my-3">${category.category_name}</button>
            `;
        toggleSpinner(true)
        categoryUl.appendChild(categoryLi)
    });
    loadCategoryNews("01", "Breaking News")
}

const loadCategoryNews = (newsId, category) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryNews(data.data, category))
}

const displayCategoryNews = (categoryNews, category) => {
    const newsContainer = document.getElementById("news-container");
    const categoryItem = document.getElementById("category-item");
    categoryItem.value = categoryNews.length + " Items found by " + category;
    newsContainer.textContent = ``;
    categoryNews.forEach(news => {
        // console.log(news)
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
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex w-25">
                                <img class="m-2 mt-4 img-fluid author-img" src="${news.author.img}">
                                <div class="mt-3">
                                    <span>${news.author.name ? news.author.name : "No data found"}</span>
                                    <p>${news.author.published_date}</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="mx-2 fa-solid fa-eye"></i>
                                <p class="mt-3">${news.total_view}</p>
                            </div>
                            <div class="d-flex">
                                <i class="fa-solid fa-star-half-stroke"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                            <div>
                                <p id="news-details" onclick="displayNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="mt-3"><i class="fa-solid fa-arrow-right"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        toggleSpinner(false)
        newsContainer.appendChild(newsDiv)
    })
}

const displayNewsDetails = async newsDetailsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsDetailsId}`;
    const res = await fetch(url);
    const data = await res.json();
    const { title, details, thumbnail_url, author, total_view } = data.data[0];
    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = `
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="mx-auto mt-2">
                        <img src="${thumbnail_url}">
                    </div>
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <p class="p-3">${details}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center p-3">
                            <div class="d-flex w-50">
                                <img class="m-2 mt-4 img-fluid rounded-circle w-25" src="${author.img}">
                                <div class="mt-4">
                                    <span>${author.name}</span>
                                    <p>${author.published_date}</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="mx-2 fa-solid fa-eye"></i>
                                <p class="mt-3">${total_view}</p>
                            </div>
                            <div class="d-flex">
                                <i class="fa-solid fa-star-half-stroke"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("loader");
    if (isLoading) {
        loaderSection.classList.remove("d-none")
    }
    else {
        loaderSection.classList.add("d-none")
    }
}

loadCategory()