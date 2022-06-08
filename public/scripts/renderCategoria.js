
document.addEventListener('DOMContentLoaded', () => {
    updatePosts()
})



function updatePosts() {
    fetch("/api/categoria").then(res=> {
        return res.json()
    }).then(json=>{
        console.log(json)
        let postElements = ''
        let posts = json
        
        posts.forEach((post) => {

            let postElement = `<a href="${post._id}" class="destaque">
            <img class="imagem-jogo" src="${post.url}" alt="">
            <h4>${post.nome}</h4>
            </a>`

            postElements += postElement

        })

        document.getElementById("inicial").innerHTML = postElements
    })
}

function newPost() {

}




