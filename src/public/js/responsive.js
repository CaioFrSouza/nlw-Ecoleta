const loginBtnText = $('#btn-cad-text')
const boxImage = $('#image')
const btnText = $('#btn-Text-Pes')
// const StateInput = $('[name = state]')

let width = $(window).width()

function resize (callback) {
    callback(width)
    $(window).resize(()=> {
    width = $(window).width()
    callback(width)
})}

const Responsive = (width)=> {

    if(width < 1250){
        loginBtnText.css('display',"none")
        boxImage.removeClass('col-6')
    }
    else{
        boxImage.addClass('col-6')
        loginBtnText.css('display',"inline-block")
    }
}
$(document).ready(()=> {
    resize(Responsive)
    $('body').css('visibility','visible')

})

