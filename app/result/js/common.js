jQuery(document).ready(function( $ ) {

  $(".toggle-mnu").click(function() {
    $(this).toggleClass("on");
    $(".top-mnu").slideToggle();
    return false;
  });

  $('body').click(function () {
    if( $(".toggle-mnu").hasClass("on") ){
      $(".toggle-mnu").removeClass("on");
      $(".top-mnu").fadeOut();
    }
  });


  $(".top-mnu").click(function (e) {
    e.stopPropagation();
  });


  $('.hint-label').click(function () {
    setTimeout(function () {
      $('.popinfo-3').addClass('hide');
    }, 500);  
  });


  $('.ordersdown-w').each(function () {
    const self = $(this)
    const click = $(this).find('.ordersdown')
    const open = $(this).find('.ordersopen')
    const elem = $(this).find('.ordersopen-elem')
    click.click(function () {
      open.toggleClass('open')
    })
    elem.click(function () {
      open.removeClass('open')
      elem.removeClass('active')
      $(this).addClass('active')
      let dataVal = $(this).attr('data-val')
      click.attr('data-total', dataVal)
      let htmll = $(this).html()
      click.html(htmll)
    })
  })

  $(".ordersopen").mCustomScrollbar({
    axis: "y",
    theme: "dark-3",
    mouseWheel: 1,
    scrollInertia: '230'
  });


  
  $('#where_search-1').on('input', function() { 
    $('.filter-where-list-1').show();    
  });

  $('#where_search-1').hideseek({
    hidden_mode: true,
    nodata: 'Пока ничего не найдено...'
  });

  $('.filter-where-list-1 li').click(function (e) {
    e.preventDefault();    
    $('#where_search-1').val($(this).find('.ordersopen-txt-2').text());
    $('.filter-where-list-1').hide();
    $('.search-input-list-wrap-1').fadeOut();
  });
  



  $('.search-btn').click(function () {
    $('.search-input-list-wrap-1').fadeIn();
  });

  $('.top-action-search').click(function () {
    $('.search-input-list-wrap-1').fadeOut();
  });
  

  /************************************/

/*$('.wrapper').prepend('<span class="eye-3"></span>');
let pg = parseInt(document.location.pathname.match(/\d+/))
$('body').addClass('active').css('background-image', "url('../img/"+pg+".jpg')");
$('body:not(.active)').css('background-image', "unset");

$('.eye-3').click(function (e) {
  e.preventDefault();  
  $('body').toggleClass('active');
  let pg = parseInt(document.location.pathname.match(/\d+/));
  $('body.active').css('background-image', "url('../img/"+pg+".jpg')");
  $('body:not(.active)').css('background-image', "unset");

});*/

/************************************/

$('.signup-close').click(function () {
  $('.signup').fadeOut();
});





$('.booking-more').click(function (e) {
  e.preventDefault();
  $(this).hide();
  $(this).next().addClass('_on');  
})

$('.usobject-item').each(function () {
  let self = $(this);
  let link = $(this).find('.roll2');    
  let txt = $(this).find('.roll2 .txt');    
  link.click(function (e) {
    $(this).toggleClass('rotate');
    e.preventDefault();
    if (txt.html() == 'Скрыть <span>номера</span>') {
      txt.html('<span>Показать</span> номера');
    }
    else if (txt.html() == '<span>Показать</span> номера') {
      txt.html('Скрыть <span>номера</span>');
    }
    self.toggleClass('_open');
  });
});

}); //ready

