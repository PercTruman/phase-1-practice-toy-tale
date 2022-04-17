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
         renderOneToyCard(toyCard))
      )}
 


  function renderOneToyCard(toyCard){
    console.log(toyCard)
    console.log(toyCard.likes)
    let card = document.createElement('div')
    card.classList.add('card')
    let cardContainer = document.getElementById('toy-collection')
    cardContainer.append(card)
   
    let toyName = document.createElement('h2')
    toyName.innerText = toyCard.name
    card.append(toyName)

    let toyImage = document.createElement('img')
    toyImage.src = `${toyCard.image}`
    toyImage.classList.add('toy-avatar')
    card.append(toyImage)

    let likeCounter = document.createElement('p')
    likeCounter.innerText= toyCard.likes
    console.log(likeCounter)
    card.append(likeCounter)
    

    let likeBtn = document.createElement('button')
    likeBtn.classList.add('like-btn')
    likeBtn.innerText = "Like ❤️"
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
    console.log(e.target)
   let newLikesTotal = parseInt(e.target.previousElementSibling.innerText) += 1
   newLikesTotal += 1
   console.log(newLikesTotal)
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
      .then(data=>(data.newLikesTotal=`${newLikesTotal}`))
    }
  
})
        