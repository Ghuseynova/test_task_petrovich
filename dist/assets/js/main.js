"use strict";

var page = document.querySelector('.page');
fetch('../../products.json').then(function (response) {
  return response.json();
}).then(function (data) {
  renderProduct(data);
}).catch(function (err) {
  console.log("Error: ".concat(error));
});

function renderProduct(data) {
  data.forEach(function (el) {
    var markUp = "\n\t\t<div class=\"products-wrapper\">\n            <div class=\"products\">\n                <div class=\"products__item product\">\n                    <div class=\"product__code-wrap\">\n                        <span class=\"product__code\">\u041A\u043E\u0434: ".concat(el.code.slice(5), "</span>\n                    </div>\n                    <div class=\"product__status-wrap\">\n                        <span class=\"product__status\">\u041D\u0430\u043B\u0438\u0447\u0438\u0435</span>\n                    </div>\n                    <div class=\"product__col\">\n                        <div class=\"product__photo-wrap\">\n                            <a href=\"#\" class=\"product__link\">\n                                <img src=\"http:").concat(el.primaryImageUrl.slice(0, -4), "_220x220_1.jpg\" alt=\"product\" class=\"product__photo\">\n                            </a>\n                        </div>\n                    </div>\n                    <div class=\"product__col u-margin-top\">\n                        <div class=\"product__description\">\n                            <a href=\"#\" class=\"product__description-link\">\n                                ").concat(el.title, "\n                            </a>\n                        </div>\n                        <div class=\"product__tags tags\">\n                            <p class=\"tags__text\">\n                                \u041C\u043E\u0433\u0443\u0442 \u043F\u043E\u043D\u0430\u0434\u043E\u0431\u0438\u0442\u044C\u0441\u044F: \n                            </p\n\n                            <p>").concat(addAssocProduct(el.assocProducts), "</p>\n                        </div>\n                    </div>\n                    <div class=\"product__col\">\n                        <div class=\"product__price price price--club-card\">\n                            <span class=\"price__text\">\n                                \u041F\u043E \u043A\u0430\u0440\u0442\u0435<br>\n                                \u043A\u043B\u0443\u0431\u0430\n                            </span>\n                            <span class=\"price__num price__num--gold price__num--active\">\n                                ").concat(roundVal(el.priceGoldAlt), "\n                                <svg version=\"1.2\" class=\"price__rouble price__rouble--black\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0\" y=\"0\" width=\"30px\" height=\"22px\" viewBox=\"0 0 50 50\" enable-background=\"new 0 0 50 50\" xml:space=\"preserve\">\n                                    <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"assets/image/static/symbol/sprite.svg#rouble_black\"></use>\n                                </svg>\n                            </span>\n                            <span class=\"price__num price__num--gold\">\n                                ").concat(el.priceGold, "\n                                <svg version=\"1.2\" class=\"price__rouble price__rouble--black\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0\" y=\"0\" width=\"30px\" height=\"22px\" viewBox=\"0 0 50 50\" enable-background=\"new 0 0 50 50\" xml:space=\"preserve\">\n                                    <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"assets/image/static/symbol/sprite.svg#rouble_black\"></use>\n                                </svg>\n                            </span>\n                        </div>\n                        <div class=\"product__price price price--default\">\n                            <span class=\"price__num price__num--retail price__num--active\">\n                                ").concat(roundVal(el.priceRetailAlt), "\n                                 <svg version=\"1.2\" class=\"price__rouble price__rouble--gray\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0\" y=\"0\" width=\"30px\" height=\"22px\" viewBox=\"0 0 50 50\" enable-background=\"new 0 0 50 50\" xml:space=\"preserve\">\n                                    <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"assets/image/static/symbol/sprite.svg#rouble_gray\"></use>\n                                </svg>\n                            </span>\n                            <span class=\"price__num price__num--retail\">\n                                ").concat(el.priceRetail, "\n                                 <svg version=\"1.2\" class=\"price__rouble price__rouble--gray\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0\" y=\"0\" width=\"30px\" height=\"22px\" viewBox=\"0 0 50 50\" enable-background=\"new 0 0 50 50\" xml:space=\"preserve\">\n                                    <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"assets/image/static/symbol/sprite.svg#rouble_gray\"></use>\n                                </svg>\n                            </span>\n                        </div>\n                        <div class=\"product__price-point point\">\n                            <span class=\"point__text\">\n                                \u041C\u043E\u0436\u043D\u043E \u043A\u0443\u043F\u0438\u0442\u044C \u0437\u0430 231,75 \u0431\u0430\u043B\u043B\u0430\n                            </span>\n                        </div>\n                        <div class=\"product__units\">\n                            <div class=\"product__unit unit\">\n                                <div class=\"unit__select unit__active\">\n                                    <span class=\"unit__text\">\n                                        \u0417\u0430 \u043C. \u043A\u0432.\n                                    </span>\n                                </div>\n                                <div class=\"unit__select\">\n                                    <span class=\"unit__text\">\n                                        \u0417\u0430 \u0443\u043F\u0430\u043A\u043E\u0432\u043A\u0443\n                                    </span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"product__list-unit list-unit\">\n                            <div class=\"list-unit__info\">\n                                <span class=\"list-unit__info-icon\"></span>\n                                <p class=\"list-unit__info-desc\">\n                                    <span>\u041F\u0440\u043E\u0434\u0430\u0435\u0442\u0441\u044F ").concat(el.unitFull, ":</span>\n                                    <span>").concat(el.unitRatio, " ").concat(el.unit, " = ").concat(el.unitRatioAlt, " ").concat(el.unitAlt, "</span>\n                                </p>\n                            </div>\n                        </div>\n                        <div class=\"product__to-cart\">\n                            <div class=\"to-cart__count count\">\n                               <input type=\"text\" class=\"count__input\" value=\"1\"> \n                               <span class=\"count__arrow count__arrow--up\"></span>\n                               <span class=\"count__arrow count__arrow--down\"></span>\n                            </div>\n                            <div class=\"to-cart__btn-wrap\">\n                                <button class=\"to-cart__btn btn\" data-url=\"/cart/\" data-product-id=\"").concat(el.productId, "\">\n                                    <svg class=\"btn__cart-icon\">\n                                       <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"assets/image/static/symbol/sprite.svg#cart\"></use>\n                                    </svg>\n                                    <span class=\"btn__text\">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</span> \n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>   \n\t\t");
    page.insertAdjacentHTML('beforeend', markUp);
  });
}

function addAssocProduct(el) {
  var assocProducts = el.split(/;/);
  var tagLink = '';

  for (var i = 0; i < assocProducts.length - 1; i++) {
    tagLink += "<a href=\"#\" class=\"tags__link\"> ".concat(assocProducts[i], "; </a>");
  }

  return tagLink;
}

function roundVal(el) {
  return Math.round(parseInt(el) * 100) / 100;
}

function incAndDecVal(e) {
  //console.log(e.target);
  var el = e.target;
  var input = document.querySelector('.count__input');
  var count = parseInt(input.value);

  if (el.classList.contains('count__arrow--up')) {
    count++;
    input.value = count;
  } else if (el.classList.contains('count__arrow--down') && input.value > 0) {
    count--;
    input.value = count;
  } else {
    return;
  }
}

function addRemoveClass(e) {
  var el = e.target.closest('.unit__select');
  var elParent = el.parentNode;

  if (el.classList.contains('unit__select')) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = elParent.querySelectorAll('.unit__select')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _e = _step.value;

        if (_e.classList.contains('unit__active')) {
          _e.classList.remove('unit__active');
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    el.classList.add('unit__active');
    var price = el.parentNode.parentNode.parentNode.querySelectorAll('.price__num');

    for (var i = 0; i < price.length; i++) {
      if (price[i].classList.contains('price__num--active')) {
        price[i].classList.remove('price__num--active');
      } else {
        price[i].classList.add('price__num--active');
      }
    }
  }
}

page.addEventListener('click', function (e) {
  if (e.target.classList.contains('count__arrow')) {
    incAndDecVal(e);
  } else if (e.target.closest('.unit__select')) {
    addRemoveClass(e);
  } else {
    return;
  }
});