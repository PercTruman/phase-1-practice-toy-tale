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
   
  })
  const newToyForm =document.querySelector('.add-toy-form')

 

  newToyForm.addEventListener('submit',
      (e) =>{ 
        e.preventDefault()
        let namedValue =e.target[0].value
        let urlValue = e.target[1].value

        let toyObject= {
          name: namedValue, 
          image: urlValue,
          likes: 0
        }
  postNewToy(toyObject)
      
         })
  
  

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
    const likeButton = document.querySelector('button')
    likeButton.addEventListener('click', updateLikes(toyCard))
  }

    
   function postNewToy(toyObject){
    
      fetch('http://localhost:3000/toys',{
          method: 'POST',
          headers:{
              "Content-Type":"application/json",
              Accept: "application/json"
              },
          body:JSON.stringify(toyObject)
            })
      .then(res =>res.json())
      .then(toy=>renderOneToyCard(toy))
      
  }


  function updateLikes(toyCard){
   let newLikesTotal = (toyCard.likes)++
    fetch(`http://localhost:3000/toys/${toyCard.id}`,
        {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            likes: newLikesTotal
          })
      })
    }
  
        })