let id = document.location.pathname

id = id.substring(1)
console.log(id)
document.addEventListener('DOMContentLoaded', () => {
    updatePosts()
})



function updatePosts() {
    fetch("/api").then(res=> {
        return res.json()
    }).then(json=>{
        console.log(json)
        let postElements = ''
        let posts = json
        let postElement = ''
        
        posts.forEach((post) => {
            console.log(post._id)

            if (post._id == id){
                postElement = ` <div class="left-side">
                <img class="imagem-jogo" src="${post.url}" alt="">
                
            </div>
            <div class="right-side">
                <h1>${post.nome}</h1>
                <p>${post.ano}</p>
                <p>${post.categoria}</p> 
                <p id="descricao">${post.descricao}</p>
            </div>  `
            }
            

            


        })

        document.getElementById("inicial").innerHTML = postElement
    })
}

function newPost() {

}

console.log(id)



