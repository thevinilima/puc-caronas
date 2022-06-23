const menu = document.querySelector('#menu-mobile');
const nav = document.querySelector('#navigation');
const items = document.querySelectorAll('ion-icon');
const html = document.querySelector('html');

menu.addEventListener('click', () => {
    nav.classList.toggle('mobileNav');
    items.forEach(item => {
        item.classList.toggle('mobileItem');
    })
})

html.addEventListener('click', (e) => {
    var target = $(e.target);

    if(target[0] === menu){
        return;
    }
    if(nav.classList.contains('mobileNav')){
        nav.classList.toggle('mobileNav');
        items.forEach(item => {
            item.classList.toggle('mobileItem');
        })
    }
})

let integrantes = document.querySelectorAll('.integrante')
integrantes.forEach(integrante => {
    integrante.addEventListener('click', () => github(integrante.attributes.name.value))
})

function github(name){
    if(!name){
        alert('Este integrante não possui GitHub!');
        return
    }
    window.open('https://github.com/' + name, '_blank');
}

let subir = document.querySelector("#subir")
subir.addEventListener('click', () => {
    document.querySelector('footer').classList.toggle('footer-ativo')
})