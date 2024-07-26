const close =document.getElementById('close');
const bar =document.getElementById('bar');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    })
}
if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active');
    })
}

const filterButtons = document.querySelectorAll('.filter-buttons button')
const fiterableCards = document.querySelectorAll('.fiterable-cards .card')



const filterCards = e => {
    document.querySelector(".active")?.classList.remove("active")
    e.target.classList.add("active")
    fiterableCards.forEach(card => {
        card.classList.add('hide')
        if (card.dataset.name === e.target.dataset.name || e.target.dataset.name == 'all') {
            card.classList.remove('hide')
        }
    })


}

const addHref = e => {
    e.innerHtml('a')
}




filterButtons.forEach(button => button.addEventListener("click", filterCards))
