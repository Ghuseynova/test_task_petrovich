const page = document.querySelector('.page');

fetch('../../products.json')
.then(response => {
  	return response.json();
}).then(data => {
    renderProduct(data);
}).catch(err => {
  	console.log(`Error: ${error}`);
});

function renderProduct(data) {
	data.forEach(el => {
		const markUp = `
		<div class="products-wrapper">
            <div class="products">
                <div class="products__item product">
                    <div class="product__code-wrap">
                        <span class="product__code">Код: ${el.code.slice(5)}</span>
                    </div>
                    <div class="product__status-wrap">
                        <span class="product__status">Наличие</span>
                    </div>
                    <div class="product__col">
                        <div class="product__photo-wrap">
                            <a href="#" class="product__link">
                                <img src="http:${el.primaryImageUrl.slice(0,-4)}_220x220_1.jpg" alt="product" class="product__photo">
                            </a>
                        </div>
                    </div>
                    <div class="product__col u-margin-top">
                        <div class="product__description">
                            <a href="#" class="product__description-link">
                                ${el.title}
                            </a>
                        </div>
                        <div class="product__tags tags">
                            <p class="tags__text">
                                Могут понадобиться: 
                            </p

                            <p>${addAssocProduct(el.assocProducts)}</p>
                        </div>
                    </div>
                    <div class="product__col">
                        <div class="product__price price price--club-card">
                            <span class="price__text">
                                По карте<br>
                                клуба
                            </span>
                            <span class="price__num price__num--gold price__num--active">
                                ${roundVal(el.priceGoldAlt)}
                                <svg version="1.2" class="price__rouble price__rouble--black" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/image/static/symbol/sprite.svg#rouble_black"></use>
                                </svg>
                            </span>
                            <span class="price__num price__num--gold">
                                ${el.priceGold}
                                <svg version="1.2" class="price__rouble price__rouble--black" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/image/static/symbol/sprite.svg#rouble_black"></use>
                                </svg>
                            </span>
                        </div>
                        <div class="product__price price price--default">
                            <span class="price__num price__num--retail price__num--active">
                                ${roundVal(el.priceRetailAlt)}
                                 <svg version="1.2" class="price__rouble price__rouble--gray" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/image/static/symbol/sprite.svg#rouble_gray"></use>
                                </svg>
                            </span>
                            <span class="price__num price__num--retail">
                                ${el.priceRetail}
                                 <svg version="1.2" class="price__rouble price__rouble--gray" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/image/static/symbol/sprite.svg#rouble_gray"></use>
                                </svg>
                            </span>
                        </div>
                        <div class="product__price-point point">
                            <span class="point__text">
                                Можно купить за 231,75 балла
                            </span>
                        </div>
                        <div class="product__units">
                            <div class="product__unit unit">
                                <div class="unit__select unit__active">
                                    <span class="unit__text">
                                        За м. кв.
                                    </span>
                                </div>
                                <div class="unit__select">
                                    <span class="unit__text">
                                        За упаковку
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="product__list-unit list-unit">
                            <div class="list-unit__info">
                                <span class="list-unit__info-icon"></span>
                                <p class="list-unit__info-desc">
                                    <span>Продается ${el.unitFull}:</span>
                                    <span>${el.unitRatio} ${el.unit} = ${el.unitRatioAlt} ${el.unitAlt}</span>
                                </p>
                            </div>
                        </div>
                        <div class="product__to-cart">
                            <div class="to-cart__count count">
                               <input type="text" class="count__input" value="1"> 
                               <span class="count__arrow count__arrow--up"></span>
                               <span class="count__arrow count__arrow--down"></span>
                            </div>
                            <div class="to-cart__btn-wrap">
                                <button class="to-cart__btn btn" data-url="/cart/" data-product-id="${el.productId}">
                                    <svg class="btn__cart-icon">
                                       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/image/static/symbol/sprite.svg#cart"></use>
                                    </svg>
                                    <span class="btn__text">В корзину</span> 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
		`;
		page.insertAdjacentHTML('beforeend', markUp);
	});
}



function addAssocProduct(el) {

	const assocProducts = el.split(/;/);	
	let tagLink = '';

	for(let i = 0; i < assocProducts.length-1; i++) {
		 tagLink += `<a href="#" class="tags__link"> ${assocProducts[i]}; </a>`
		
	}
	
	return tagLink;
}



function roundVal(el) {
	return Math.round(parseInt(el) * 100) / 100;
}



function incAndDecVal(e) {
	//console.log(e.target);
	const el = e.target;
	const input = document.querySelector('.count__input');
	let count = parseInt(input.value);

	if(el.classList.contains('count__arrow--up')) {
		count++;
		input.value = count;
	} else if(el.classList.contains('count__arrow--down') && input.value > 0) {
		count--;
		input.value = count;
	} else {
		return;
	}

}



function addRemoveClass(e) {
  const el = e.target.closest('.unit__select');
  

  const elParent = el.parentNode;

  if(el.classList.contains('unit__select')){
    for(let e of elParent.querySelectorAll('.unit__select')) {
  
      if(e.classList.contains('unit__active')) {
        e.classList.remove('unit__active');
      }
  }
    el.classList.add('unit__active');

    const price = el.parentNode.parentNode.parentNode.querySelectorAll('.price__num');

    for(let i = 0; i < price.length; i++) {

    	if(price[i].classList.contains('price__num--active')) {
    		price[i].classList.remove('price__num--active');
    	} else {
    		price[i].classList.add('price__num--active');
    	}
    }

  }
}


page.addEventListener('click', (e) => {

	if(e.target.classList.contains('count__arrow')) {
		incAndDecVal(e);
	} else if(e.target.closest('.unit__select')) {
		addRemoveClass(e);
	} else {
		return;
	}

});























