(function(){
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', function(){
        if(hero.getBoundingClientRect().bottom < 0){
            header.classList.add('fixed');
        }else{
            header.classList.remove('fixed');
        }
    })
})()