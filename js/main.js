const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
//cria um Arrey
//Consulta se existe algum elemento no array caso isso seja falso ele me da um array vazio
//JSON.parse transforma valor de texto em valores javascript
const itens = JSON.parse(localStorage.getItem("itens")) || []
console.log(itens)

//Fazer um loop em um array
// for.Each() mantem os itens criados na página, mesmo após atualizá-la
itens.forEach( (elemento) => {
    criaElemento(elemento)
} )

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value  
    }
    //Caso exista o mesmo ID ele consitinua usando o mesmo
    if(existe) {
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
        //atualiza o localstorage subescrevendo por cima do array
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    //Caso contrario ele cria um ID do zero com a quantidade de elementos que existe dentro do array
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length -1]).id + 1 : 0
        criaElemento(itemAtual)
        //inserir um elemento no array
        itens.push(itemAtual)
    }
       // Guarda todos os elementos em uma string
       localStorage.setItem("itens",JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {
   const novoItem =  document.createElement("li")
   novoItem.classList.add("item")

   const numeroItem = document.createElement("strong")
   numeroItem.innerHTML = item.quantidade
   novoItem.appendChild(numeroItem)
   //Adiciona o dataset.id dentro do strong
   novoItem.dataset.id = item.id
   novoItem.innerHTML += item.nome

    //Cria um botão na tela
   novoItem.appendChild(botaoDeleta(item.id))

   lista.appendChild(novoItem)
}

function atualizaElemento (item){
    //Busca a quantidade e atualiza a quantidade
    (document.querySelector("[data-id'"+item.id+"']")).innerHTML = item.quantidade
}

//Criação do elemento botão
//Toda vez que o botaoDeleta for chamado ele vai me retornar um botão
function botaoDeleta(id){
    const elementoBotao =  document.createElement("button")
    elementoBotao.innerText = "x"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    console.log(itens)

    localStorage.setItem("itens",JSON.stringify(itens))
}
