const container = document.querySelector(".container");

const images=[
    {name: "nuggetsitos", image: "images/nuggets.jpeg"},
    {name: "papapitas", image: "images/papas.jpeg"},
    {name: "chicharron", image: "images/chicharron.jpeg"},
]

const showImages = () => {
    let output = "";
    images.forEach(({name, image})=>{
        (
            output += `
                <div class="card">
                    <img class="card-avatar" src=${image} />
                    <h1 class="card-title">${name}</h1>
                </div>
            `
        )
    })
    container.innerHTML = output;

}

document.addEventListener("DOMContentLoaded",showImages)

if("serviceWorker" in navigator){
    //console.log("Si soporta...")
    window.addEventListener("load", function(){
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res=> console.log("Service worker registrado..."))
            .catch(err=>console.log("No se registo..."))
    })
} 

self.addEventListener("fetch", fetchEvent=>{
    fetchEvent.respondWith(
        caches.match(fetchEvent.request)
            .then(res=>{
                return res || fetch (fetchEvent.request)
            })
        )
})