const products = {
  crazy: {
    name: 'Crazy',
    price: 31000,
    amount: 0,
    img: './images/product-1.png',
    get totalSumm() {
      return this.amount * this.price;
    },
  },
  light: {
    name: 'Light',
    price: 26000,
    amount: 0,
    img: './images/product-2.png',
    get totalSumm() {
      return this.amount * this.price;
    },
  },
  cheeseburger: {
    name: 'CheeseBurger',
    price: 29000,
    amount: 0,
    img: './images/product-3.png',
    get totalSumm() {
      return this.amount * this.price;
    },
  },
  dburger: {
    name: 'dBurger',
    price: 24000,
    amount: 0,
    img: './images/product-4.png',
    get totalSumm() {
      return this.amount * this.price;
    },
  },
};

const basketBtn = document.querySelector('.wrapper__right-btn'),
  basketIndecator = basketBtn.querySelector('.wrapper__right-ind'),
  basketModal = document.querySelector('.basket'),
  basketModalClose = basketModal.querySelector('.basket__top-btn'),
  basketChecklist = basketModal.querySelector('.basket__checklist'),
  basketTotalPrice = basketModal.querySelector('.basket__totalPrice'),
  basketBottom = document.querySelector('.basket__bottom'),
  // menu part
  productsBtn = document.querySelectorAll('.wrapper__menu-btn');
const wrapper = document.querySelector('.wrapper'),
  printClass = document.querySelector('.print__item'),
  printBottom = document.querySelector('.print__bottom');

// modal oyanani ochilishi va yopilishi

productsBtn.forEach((btn) => {
  btn.addEventListener('click', function () {
    const parent = btn.closest('.wrapper__menu-card'),
      parentId = parent.getAttribute('id');

    products[parentId].amount++;
    basket();
  });
});

function basket() {
  let productsArr = [],
    count = 0;

  for (const key in products) {
    const po = products[key],
      parent = document.getElementById(key),
      parentIndecator = parent.querySelector('.wrapper__menu-ind');

    if (po.amount) {
      productsArr.push(po);
      parentIndecator.innerHTML = po.amount;
      parentIndecator.classList.add('active');
      count += po.amount;
    } else {
      parentIndecator.classList.remove('active');
    }
  }

  if (count) {
    basketIndecator.innerHTML = count;
    basketIndecator.classList.add('active');
  } else {
    basketIndecator.classList.remove('active');
  }
  basketChecklist.innerHTML = '';
  printClass.innerHTML = ''
  for (let i = 0; i < productsArr.length; i++) {
    basketChecklist.innerHTML += addProductItem(productsArr[i]);
    printClass.innerHTML += printtt(productsArr[i])
  }
  basketTotalPrice.innerHTML = totalPrice()

}

function addProductItem(el) {
  // distrukturizatsiya
  let { name, price, amount, img, totalSumm } = el;

  return `
  <div class="basket__checklist-product">
    <div class="basket__checklist-left">
      <img class="basket__checklist-image" src="${img}" alt="">
      <div class="basket__checklist-item">
        <h3 class="basket__checklist-name">${name}</h3>
        <p class="basket__checklist-price"><span>${totalSumm}</span> сум</p>
      </div>
    </div>
    <div class="basket__checklist-right" id="${name.toLowerCase()}__card">
      <button class="basket__checklist-btn" data-symbol="-">-</button>
      <output class="basket__checklist-counter">${amount}</output>
      <button class="basket__checklist-btn" data-symbol="+">+</button>
    </div>
  </div>
 
 `;
}

function totalPrice() {
  let count = 0;
  for (const key in products) {
    count += products[key].totalSumm
  }
  return count
}

window.addEventListener('click', function (e) {
  const elem = e.target;

  if (elem.classList.contains('basket__checklist-btn')) {
    const parent = elem.closest('.basket__checklist-right'),
      parentId = parent.getAttribute('id').split('_')[0],
      elemAttr = elem.getAttribute('data-symbol');

    if (elemAttr == '+') {
      products[parentId].amount++
    }
    else if (elemAttr == '-' && products[parentId].amount > 0) {
      products[parentId].amount--
    }


    basket()
  }
  if (elem.classList.contains('wrapper__center-image')) {
    this.window.print()
  }
});
window.addEventListener('click', function (g) {
  const item = g.target
  if (item.classList.contains('basket__bottom')) {
    wrapper.style.display = `none`
    printClass.style.display = `flex`
    printBottom.style.display = `flex`
    printBottom.innerHTML = totalPrice()
    this.window.print()

    this.window.addEventListener('keyup',function (s) {
      if (s.key == 'Enter') {
      location.reload()
      }
    })
  } 
})
// window.addEventListener('keyup',function (d) {
//   const itemTarget = d.target
//   if (itemTarget.classList.contains('basket__bottom')) {
//     if (d.key == 'Enter') {
//       // location.reload()
//       console.log('Salom');
//     }
//   }
// })
function printtt(ele) {
  let { name, amount, totalSumm } = ele;
  return `
  <div class="printSay">
    <div class="print__header">
      <img src="./images/logo.svg" alt="">
      <p class="print__text">${name}</p>
    </div>
      <div class="print__center">${amount}
      <div class = 'print__center-right'>${totalSumm}</div>
      </div>
      </div>
`
}












































basketBtn.addEventListener('click', function () {
  basketModal.classList.add('active');
});
basketModalClose.onclick = () => basketModal.classList.remove('active');
