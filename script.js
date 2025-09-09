const cardcontainer = document.getElementById("card-container")
const AddToCart = document.getElementById("AddToCarts")

let addtocarts = []
const loadCatagorie = (params) => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then((json) => displaycatagorie(json.categories));

};



// Category

const displaycatagorie = (categories) => {
  const CategoriesContainer = document.getElementById("CategoriesContainer")
  CategoriesContainer.innerHTML = "";

  for (let catagorie of categories) {


    const catagorieLink = document.createElement("div")
    catagorieLink.innerHTML = `
   <a id="${catagorie.id}" class=" hover:bg-green-200 rounded-md cursor-pointer p-2">${catagorie.category_name}</a>
   
   `
    CategoriesContainer.append(catagorieLink)
  }

  CategoriesContainer.addEventListener('click', (e) => {
    // all class remove
    const alla = document.querySelectorAll('a')
    alla.forEach(a => {
      a.classList.remove('bg-[#15803D]')
    })
    // condition for only a

    if (e.target.localName === 'a') {
      // console.log(e.target.id);
      e.target.classList.add('bg-[#15803D]')
      loadCardByCategorie(e.target.id)
    }

  })



}

// Card with category

const loadCardByCategorie = (id) => {
  console.log(id);

  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data.plants);
      ShowcardByCategorie(data.plants)
    })
    .catch(err => {
      console.log(err);

    })
}

const ShowcardByCategorie = (plants) => {
  // console.log(plants);
  const plantsContainer = document.getElementById("card-container")
  plantsContainer.innerHTML = "";

  for (let plant of plants) {
    const plantcards = document.createElement("div")
    plantcards.innerHTML = `
       <div class="h-[400px] w-[330px] border-4 rounded-lg border-none shadow-lg p-4">
        <img class="h-[179px] w-[298px] rounded-md " src="${plant.image}" alt="">
        <button class="font-semibold">${plant.name}</button>
        <p class="text-[12px]">${plant.description}</p>
        <div class="flex justify-between p-3">
            <button onclick="" class="bg-[#DCFCE7] rounded-md p-1 text-[#15803D]">${plant.category}</button>
            <P>$${plant.price}</P>
        </div>
        <button class="w-full bg-[#15803D] py-1 rounded-2xl text-white">Add to Cart</button>
    </div>

    `
    plantsContainer.append(plantcards)
  }
}

loadCatagorie()

//  ALL CARD

const loadcard = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then((data) => dislpayCard(data.plants));
}

const dislpayCard = (plants) => {
  const cardcontainer = document.getElementById("card-container")
  cardcontainer.innerHTML = "";
  for (let plant of plants) {


    const cards = document.createElement("div")
    cards.innerHTML = `
       <div id="${plant.id}" class="h-[400px] w-[330px] border-4 rounded-lg border-none shadow-lg p-4">
        <img class="h-[179px] w-[298px] rounded-md " src="${plant.image}" alt="">
        <button onclick="loadplantdetail(${plant.id})" class="font-semibold cursor-pointer mt-2">${plant.name}</button>
        <p class="text-[12px]">${plant.description}</p>
        <div class="flex justify-between p-3">
            <button  class="bg-[#DCFCE7] rounded-md p-1 text-[#15803D]">${plant.category}</button>
            <P>$${plant.price}</P>
        </div>
        <button class="w-full cursor-pointer bg-[#15803D] py-1 rounded-2xl text-white">Add to Cart</button>
    </div>

    `
    cardcontainer.append(cards)
  }
}
loadcard()

cardcontainer.addEventListener('click', (e) => {
  // console.log(e.target.innerText);
  handleaddtocard(e)
})

const handleaddtocard = (e) => {
  if (e.target.innerText === 'Add to Cart') {
    // console.log("button clicked");
    // console.log(e.target.parentNode.children[1].innerText);

    const title = e.target.parentNode.children[1].innerText
    const price = e.target.parentNode.children[3].innerText
    // console.log(price);

    const id = e.target.parentNode.id
    // console.log(id);

    addtocarts.push({
      title: title,
      price: price,
      id: id
    })
    showaddtocart(addtocarts);

  }
}

const showaddtocart = (addtocarts) => {
  console.log(addtocarts);
  // Clear the existing content before adding new items
  AddToCart.innerHTML = "";
  addtocarts.forEach(addtocart => { // Iterate over the addtocarts array

    AddToCart.innerHTML += `
  
  <div class="bg-[#f0fdf4] p-3 mt-5 rounded-md flex justify-between items-center">
                    <div>
                        <h1 class="font-normal text-xl">${addtocart.title}</h1>
                        <p class="text-gray-300 py-2">${addtocart.price} x 1</p> 
                    </div>
                    <div>
                        <button onclick="handledeletecart(${addtocart.id})" class="text-gray-300 cursor-pointer">delete</button>
                    </div>
                </div>


  
  `

  })
}

const handledeletecart = (cardid) => {
  // console.log(cardid);
  const filtereddata = addtocarts.filter(addtocart => addtocart.id !== cardid)
  console.log(filtereddata);

}







const loadplantdetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`
  // console.log(url);
  fetch(url)
    .then(res => res.json())
    .then((detail) => dislplayplamtdetail(detail.plants))

}


const dislplayplamtdetail = (card) => {
  console.log(card);
  const detailbox = document.getElementById("detailscontainer")
  detailbox.innerHTML = `
   <div>
        <h1 class="text-lg font-bold">${card.name}</h1>
    <img class="rounded-md h-[230px] w-[450px] " src="${card.image}" alt="">
    <p class=""><span class="font-semibold py-2">Category: ${card.category}</span></p>
    <p class=""><span class="font-semibold py-2">Price:${card.price} </span></p>
    <p class="py-4"><span class="font-semibold py-1">Description:${card.description} </span>Press ESC key or click the button below to close</p>

    </div>`
  document.getElementById("my_modal_5").showModal();

}
