const modal = $('.customModal')
$('.pes').click(()=> modal.removeClass('hide'))
$('.close').click(()=> modal.addClass('hide'))
$('.search').click(()=>window.location('/search'))
