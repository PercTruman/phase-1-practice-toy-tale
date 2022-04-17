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
         renderOneToyCard(toyCard)))
  }

  const likeButton = document.getElementsByClassName('like-btn')
  // likeButton.addEventListener('click', console.log('please help me'))
    // updateLikes(e))


  function renderOneToyCard(toyCard){
    let card = document.createElement('li')
    let cardContainer = document.getElementById('toy-collection')
    cardContainer.appendChild(card)
    // card.innerHTML = `
    // <div class="card">
    //   <h2>${toyCard.name}</h2>
    //   <img src = "${toyCard.image}" class="toy-avatar"/>
    //   <p>${toyCard.likes}</p>
    // </div>`
    let toyName = document.createElement('h2')
    toyName.innerText = toyCard.name
    card.append(toyName)

    let toyImage = document.createElement('img')
    toyImage.innerHTML = `src=${toyCard.image} class="toy-avatar"`
    card.append(toyImage)

    let likeCounter = document.createElement('p')
    likeCounter.innerText= toyCard.likes
    console.log(likeCounter)
    card.append(likeCounter)

    let likeBtn = document.createElement('button')
    likeBtn.addEventListener('click', (e)=>updateLikes(e))
    card.append(likeBtn)

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
 

  function updateLikes(e){
    e.target.value
   let newLikesTotal = likes+1
    fetch(`http://localhost:3000/toys/${e.target.id}`,
        {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": newLikesTotal
          })
      })
      .then(res=>res.json())
      .then(data=>(data.newLikesTotal))
    }
  
})
        