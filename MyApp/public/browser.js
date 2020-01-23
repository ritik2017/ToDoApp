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