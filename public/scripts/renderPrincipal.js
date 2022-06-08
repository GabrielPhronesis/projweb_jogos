
document.addEventListener('DOMContentLoaded', () => {
    updatePosts()
})



function updatePosts() {
    fetch("/api").then(res=> {
        return res.json()
    }).then(json=>{
        console.log(json)
        let postElements = ''
        let i = 0
        let posts = json
        
        posts.forEach((post) => {
            let postElement = `<a href="${post._id}" class="destaque">
            <img class="imagem-jogo" src="${post.url}" alt="">
            <h4>${post.nome}</h4>
            <p>${post.categoria}</p>
            <div class="nota">
                <p>4.2</p>
            <img id="estrela" src="https://imagepng.org/wp-content/uploads/2017/10/estrela.png" alt="">
            </div> 
        </a>`
            
            if (i < 4){
                postElements += postElement
            }
            i++
        })

        document.getElementById("inicial").innerHTML = postElements
    })
}

function newPost() {

}
