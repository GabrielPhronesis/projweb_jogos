
let id = document.location.pathname

id = id.substring(1)


let idInput = document.getElementById("idJogo")
idInput.value = `${id}`

document.addEventListener('DOMContentLoaded', () => {
    updateNomes()
    updatePosts()
    updateComentarios()
})


function updateNomes() {
    fetch("/api/usuario").then(res=> {
        return res.json()
    }).then(json=>{
        console.log(json)
        let postElements = ''
        let posts = json
        
        posts.forEach((post) => {
            let postElement = `<option value="${post.nome}">${post.nome}</option>`
            

            postElements += postElement

        })

        document.getElementById("nome").innerHTML = postElements
    })
}


function updatePosts() {
    fetch("/api").then(res=> {
        return res.json()
    }).then(json=>{

        let postElements = ''
        let posts = json
        let postElement = ''
        
        posts.forEach((post) => {
            

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


function updateComentarios() {
    fetch("/api/comentario").then(res=> {
        return res.json()
    }).then(json=>{
        console.log(json)
        let postElements = ''
        let posts = json
        let postElement = ''
        
        posts.forEach((post) => {
            console.log(post.idJogo)
            console.log(id)
            postElement = ''

            if (post.idJogo == id){
                postElement = `<div class="comentario">
                <h3>${post.nome}</h3>
                <h4>${post.comentario}</h4>
                <p>${post.nota}</p>
                </div> `
            }
            postElements += postElement
        })

        document.getElementById("comentarios").innerHTML = postElements
    })
}

function newPost() {

}



