function itemTemplate(item){
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}

//Create Feature
let createField = document.getElementById("create_field")
document.getElementById("create_form").addEventListener("submit", function(e){
    e.preventDefault()
    axios.post('/create-item', {userText: createField.value})
    .then(function(response){
       //Create HTML for item
       document.getElementById("item_list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
        createField.value = ""
        createField.focus()
    }).catch(function(err){
        alert("Failed to create new item")
})
})

document.addEventListener('click',function(event){
    // Update Feature
    if(event.target.classList.contains('edit-me')) {
        let userInput = prompt("Enter your desired new text", event.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        if(userInput){
            axios.post('/update-item', {userText: userInput, id: event.target.getAttribute("data-id")})
                .then(function(){
                    event.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch(function(err){
                console.log(err.response)
            })
        }
    }
    // Delete Feature
    if(event.target.classList.contains('delete-me')){
        if(confirm("Do you want to delete this permanently")){
            axios.post('/delete-item', {id: event.target.getAttribute("data-id")})
                .then(function() {
                    event.target.parentElement.parentElement.remove()
                })
                .catch(function(){
                    alert("An error occured while deleting the item")
                })
        }
    }
})