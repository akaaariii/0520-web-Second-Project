const body = document.body;
const menu = document.getElementById('header-menu');
menu.addEventListener('click', openMenu);
function openMenu(){
    body.classList.toggle('show');
}