const openShopping = document.querySelector(".shopping"),
      closeShopping = document.querySelector(".closeShopping"),
      body = document.querySelector("body"),
      list= document.querySelector(".list"),
      listCard = document.querySelector(".listCard"),
      total = document.querySelector(".total"),
      quantity = document.querySelector(".quantity")


openShopping.addEventListener("click", () => {
    body.classList.add("active");
})

closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

let products = [
    {
        "id": 1,
        "name": "Apple iPhone 15 Pro Max",
        "image":"Apple-iPhone-15-Pro-Max-Black-Titanium.webp",
        "price": 239000
    },
    {
        "id": 2,
        "name": "Apple iPhone 15 Pro",
        "image":"Apple-iPhone-15-Pro-White-Titanium.webp",
        "price": 199000
    },
    {
        "id": 3,
        "name": "Apple iPhone 15 Plus",
        "image":"Apple-iPhone-15-Plus-pink.webp",
        "price": 179000
    },
    {
        "id": 4,
        "name": "Apple iPhone 15",
        "image":"Apple-iPhone-15-blue.webp",
        "price": 159000
    },
    {
        "id": 5,
        "name": "Apple iPhone 14 Pro Max",
        "image":"Apple-iPhone-14-Pro-Max.jpg.webp",
        "price": 159000
    },
    {
        "id": 6,
        "name": "Apple iPhone 14 Pro",
        "image":"Apple-iPhone-14-Pro.jpg.webp",
        "price": 145000
    },
    {
        "id": 7,
        "name": "Apple iPhone 14 Plus",
        "image":"Apple-iPhone-14-Plus.jpg.webp",
        "price": 165299
    }
]


let listCards = [];

const product_list = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src = "img/${value.image}"; style="width:100%";>
            <div class = "title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick = "addToCard(${key})">Add To Card</button>
        `;
        list.appendChild(newDiv)
    })
}

product_list()


const addToCard = key => {
    if(listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        // console.log(listCards);
        listCards[key].quantity = 1;
        // console.log(listCards[key].quantity);
    }

    reloadCard()
}

const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price;
            count += value.quantity;

            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"></div>
                <div class="cardTitle">${value.name}</div>
                <div class="cardPrice">${value.price.toLocaleString()}</div>

                <div>
                    <button style="background-color: #560bad;" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button style="background-color: #560bad;" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
            
        }
    });

    if (count === 0) {
        totalPrice = 0;
    }

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}


const changeQuantity = (key, quantity) => {
    if(quantity == 0) {
        delete listCards[key]
    }
    else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price
    }
    reloadCard()
}