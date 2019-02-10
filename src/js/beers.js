import apiBeers from './api';

const {getBeers} = apiBeers();

const infoTemplate = (num, limit) => `
<p>Se han encontrado ${num} cervezas, se muestran las ${limit>num? num : limit} primeras.</p>
`;

const beerListTemplate = ({beerId, name, image, description, likes}) => `
<div id="${beerId}" class="card principal">
      <header class="card-header">
        <h2>${name}</h2>
      </header>
      <div class="card-content">
        <div class="card-content-image">
          <img src="${image}">
        </div>
        <div class="card-content-text">
          <p>${description}</p>
          <div class="rating-container">
            <button class="icon">
              <i class="fas fa-star"></i> ${likes}
            </button>
          </div>
        </div>
      </div>
    </div>
`;


const renderDOM = (element, htmlContent) => {
    const htmlId = document.getElementById(element);
    htmlId.innerHTML=htmlContent;
}


const createBeersHtml = (arrBeers, limit) => {
    let renderList="";
    arrBeers.slice(0,limit).forEach(item =>{
        renderList += beerListTemplate(item);
    })
    return renderList;
}

const createInfoHtml = (arrBeers, limit) => {
    return infoTemplate(arrBeers.length, limit);
}

export const renderBeerList = async (limit, query) => {
    const list = await getBeers(query);
    const htmlBeerList = createBeersHtml(list, limit);
    const htmlInfo = createInfoHtml(list, limit);
    renderDOM('info-section', htmlInfo);
    renderDOM('beer-section', htmlBeerList);
};


renderBeerList(10);

console.log('beers.js')