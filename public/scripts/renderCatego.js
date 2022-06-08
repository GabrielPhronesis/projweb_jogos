let id = document.location.pathname

id = id.substring(1)

nameCate = []



document.addEventListener('DOMContentLoaded', () => {
    updatePosts()
    nomeCategoria()

})

function nomeCategoria() {
    
    fetch("/api/categoria").then(res=> {
        return res.json()
    }).then(json=>{
        console.log(json)
        let posts = json
        
        posts.forEach((post) => {
            if(post._id == id){
            
                console.log(post.nome)
                nameCate.push(post.nome)
            }
        })

    })

}


function updatePosts() {
    fetch("/api").then(res=> {
        return res.json()
    }).then(json=>{
        console.log(json)
        let postElements = ''
        let posts = json
        let postElement = ''

        posts.forEach((post) => {
            postElement = ''
            console.log(nameCate[0])
            if(post.categoria == nameCate[0]){
                postElement = `<a href="${post._id}" class="destaque">
                <img class="imagem-jogo" src="${post.url}" alt="">
                <h4>${post.nome}</h4>
                <p>${post.categoria}</p>
                <div class="nota">
                    <p>4.2</p>
                <img id="estrela" src="https://imagepng.org/wp-content/uploads/2017/10/estrela.png" alt="">
                </div> 
            </a>`
            }

            postElements += postElement

        })

        document.getElementById("inicial").innerHTML = postElements
    })
}

console.log(nameCate)

function newPost() {

}