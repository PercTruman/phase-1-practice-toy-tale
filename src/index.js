let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
   
  })})


  
  //   let toyObject = {
  //     name: e.target.name.value,
  //     image:e.target.image_url.value,
      
  //   }
  // }
  getAllToys()

  function getAllToys(){
    fetch('http://localhost:3000/toys')
      .then(res =>res.json())
      .then(toyCards =>toyCards.forEach(toyCard=>
         renderOneToyCard(toyCard)
      ))}

  function renderOneToyCard(toyCard){
    let card = document.createElement('li')
    card.innerHTML = `
    <div class="card">
      <h2>${toyCard.name}</h2>
      <img src = "${toyCard.image}" class="toy-avatar"/>
      <p>${toyCard.likes}</p>
      <button class ="like-btn" id=${toyCard.id}>Like ❤️</button>
    </div>`
    let cardContainer = document.getElementById('toy-collection')
    cardContainer.appendChild(card)
  }

  postNewToy()
    
  function postNewToy(newToyObj){
    let submitButton =document.querySelector('input.submit')
    
    submitButton.addEventListener('click', (e)=>
        e.preventDefault())
   
    let inputForm = document.getElementsByTagName('form')
    console.log(inputForm)
    fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers:{
          "Content-Type":"application/json",
          Accept: "application/json"
          },
      body: JSON.stringify(newToyObj)
       })
      .then(res=>res.json())
  // }
  //     // .then(data)
    
  }  