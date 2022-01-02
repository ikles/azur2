function bytesToSize(bytes) {
 const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
 if (!bytes) {
  return '0 Byte';
}
const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

const element = (tag, classes = [], content) => {
  const node = document.createElement(tag)

  if (classes.length) {
    node.classList.add(...classes)
  }

  if (content) {
    node.textContent = content    
  }
  return node
}

const noop = function () {}

function upload(selector, options = {}) {
  let files = []
  const onUpload = options.onUpload ?? noop
  const input = document.querySelector(selector)
    //const preview = document.createElement('div')
    const preview = element('div', ['preview']);

    preview.classList.add('preview')
    preview.classList.add('objphotos')

    /*const open = document.createElement('button')
    open.classList.add('btn')
    open.textContent = 'Откыть'*/
    const open = element('div', ['upload'], '')
    open.innerHTML = '<img src="img/uploadd.svg"><div class="objphotos-upl-txt">Загрузить</div>'
    const upload = element('button', ['btn', 'btn-primary'], 'Загрузить')
    upload.style.display = 'none'

    if (options.multi) {
      input.setAttribute('multiple', true)
    }

    if (options.accept && Array.isArray(options.accept)) {
      input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', preview)
    //input.insertAdjacentElement('afterend', upload)
    preview.insertAdjacentElement('afterbegin', open)

    const triggerInput = () => input.click()

    const changeHandler = event => {
      if(!event.target.files.length) {
        return
      }

    //приводим к массиву
    files = Array.from(event.target.files)

    //чтобы при каждой загрузке исчезали фото которые загружены ранее
    //preview.innerHTML = ''
    upload.style = 'display-inline'

    files.forEach(file => {
      if (!file.type.match('image')) {
        return
      }
      
      const reader = new FileReader()
      
      reader.onload = ev => {
        //console.log(ev.target.result)
        //input.insertAdjacentHTML('afterend', `<img src="${ev.target.result}"/>`)
        const src = ev.target.result
        preview.insertAdjacentHTML('afterbegin', `
          <div class="preview-image objphotos-it">
          <div class="objphotos-actions">
          <a data-fancybox="galfiles-1" href="img/${file.name}" class="objphotos-action-full"></a>                
          <div class="preview-remove objphotos-action-del" data-name="${file.name}"></div>
          </div>
          <img class="objphotos-img" src="${src}" alt="${file.name}" />
          </div>
          `)        
      }

      reader.readAsDataURL(file)      
    })
  }

  const removeHandler = event => {
    //console.log('event', event.target.dataset)
    //если нет дата атрибута name то этот клик не нужно обрабатывать
    if(!event.target.dataset.name) {
      return
    }

    //const name = event.target.dataset.name
    //es6
    const {name} = event.target.dataset
    //console.log(files)
    files = files.filter(file => file.name !== name)

    if (!files.length) {
      upload.style.display = 'none'
    }

    const block = preview
    .querySelector(`[data-name="${name}"]`)
    .closest('.preview-image')
    block.remove();
  }

  const clearPreview = el => {
    el.style.bottom = '4px'
    el.innerHTML = '<div class="preview-info-progress"></div>'
  }

  const uploadHandler = () => {
    preview.querySelectorAll('.preview-remove').forEach(e => e.remove());
    const previewInfo = preview.querySelectorAll('.preview-info')
    previewInfo.forEach(clearPreview) 
    onUpload(files)
  }

  open.addEventListener('click', triggerInput)
  input.addEventListener('change', changeHandler)
  preview.addEventListener('click', removeHandler)
  upload.addEventListener('click', uploadHandler)

}//upload function end



if (document.querySelectorAll('#file').length ) {  
  upload('#file', {
    multi: true,
    accept: ['.png', '.jpeg', '.jpg', '.gif'],
    onUpload(files) {
      console.log('files', files)
    }
  })  
}

if (document.querySelectorAll('#file2').length ) {  
  upload('#file2', {
    multi: true,
    accept: ['.png', '.jpeg', '.jpg', '.gif'],
    onUpload(files) {
      console.log('files', files)
    }
  })  
}









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

  (function () {
    const count_100 = $('.count-100');
    let now_val = $('.now-val');

    $('#myTextbox1').on('input', function() {      
      now_val_2 = $(this).val().length;      
      if (now_val_2 < 101) {
        now_val.html(now_val_2);
      }
      if (now_val_2 >= 100) {        
        count_100.addClass('red');
      }
      else {
       count_100.removeClass('red'); 
     }
   });    
  }());
  

  if ($('.show-hide-link').length) {
    $('.show-hide-link').each(function () {
      const txt = $(this).prev();
      let lnkNode = $(this).find('span');      
      $(this).click(function (e) {
        e.preventDefault();

        let lnkTxt = $(this).find('span').text();

        if (lnkTxt == 'Подробнее') {
          lnkNode.text('Скрыть')
        }
        else if (lnkTxt == 'Скрыть') {
          lnkNode.text('Подробнее')
        }

        $(this).toggleClass('rotate');
        txt.toggleClass('on');
      })
    })
  }


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
  
  if($('select').length) {
    $('select').select2({
      minimumResultsForSearch: -1
    });
  }


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



$('[data-fancybox="galfiles-1"]').fancybox({
  arrows: true,
  infobar: false,
  smallBtn: false,
  toolbar: false,
  iframe : {
    css : {
      width : '950px'
    }
  },    
  slideClass: "myClass",
  baseClass: "myclass"
});


const allowedDates = [
'2021-11-01', '2021-11-02', '2021-11-03',  '2021-11-04',  '2021-11-05',  '2021-11-06',  '2021-11-07',  '2021-11-08',  '2021-11-09',  '2021-11-10',  '2021-11-11',  '2021-11-12',  '2021-11-13', '2021-11-14',
'2021-12-13', '2021-12-14', '2021-12-15', '2021-12-16','2021-12-17','2021-12-18','2021-12-19','2021-12-20','2021-12-21','2021-12-22','2021-12-23','2021-12-24','2021-12-25','2021-12-26','2021-12-27','2021-12-28','2021-12-29','2021-12-30','2021-12-31',
];




if ($('#filter_input_date').length) {
  new Litepicker({
    element: document.getElementById('filter_input_date'),
    singleMode: true,
    delimiter: ' - ',
    lang: "ru-RU",
    format: 'DD.MM',
    numberOfMonths: 1,
    setup: (picker) => {
      picker.on('hide', () => {
        $('.container__main_before-1').removeClass('on');
      });
    },
    tooltipText: {
      one: 'night',
      other: 'nights'
    },
    tooltipNumber: (totalDays) => {
      return totalDays - 1;
    },
    lockDaysFilter: (date1, date2, pickedDates) => {
      return allowedDates.includes(date1.format('YYYY-MM-DD'));
    }
  });
}

if ($('#filter_input_date2').length) {
  new Litepicker({
    element: document.getElementById('filter_input_date2'),
    singleMode: true,
    delimiter: ' - ',
    lang: "ru-RU",
    format: 'DD.MM',
    numberOfMonths: 1,
    setup: (picker) => {
      picker.on('hide', () => {
        $('.container__main_before-1').removeClass('on');
      });
    },
    tooltipText: {
      one: 'night',
      other: 'nights'
    },
    tooltipNumber: (totalDays) => {
      return totalDays - 1;
    },
    lockDaysFilter: (date1, date2, pickedDates) => {
      return allowedDates.includes(date1.format('YYYY-MM-DD'));
    }
  });
}

if ($('#filter_input_date3').length) {
  new Litepicker({
    element: document.getElementById('filter_input_date3'),
    singleMode: true,
    delimiter: ' - ',
    lang: "ru-RU",
    format: 'DD.MM',
    numberOfMonths: 1,
    setup: (picker) => {
      picker.on('hide', () => {
        $('.container__main_before-1').removeClass('on');
      });
    },
    tooltipText: {
      one: 'night',
      other: 'nights'
    },
    tooltipNumber: (totalDays) => {
      return totalDays - 1;
    },
    lockDaysFilter: (date1, date2, pickedDates) => {
      return allowedDates.includes(date1.format('YYYY-MM-DD'));
    }
  });
}

if ($('#filter_input_date4').length) {
  new Litepicker({
    element: document.getElementById('filter_input_date4'),
    singleMode: true,
    delimiter: ' - ',
    lang: "ru-RU",
    format: 'DD.MM',
    numberOfMonths: 1,
    setup: (picker) => {
      picker.on('hide', () => {
        $('.container__main_before-1').removeClass('on');
      });
    },
    tooltipText: {
      one: 'night',
      other: 'nights'
    },
    tooltipNumber: (totalDays) => {
      return totalDays - 1;
    },
    lockDaysFilter: (date1, date2, pickedDates) => {
      return allowedDates.includes(date1.format('YYYY-MM-DD'));
    }
  });
}


function open_date_pda() {
  $('#filter_input_date').click(function () {
    $('.container__main_before-1').addClass('on');

    $('html, body').animate({
      scrollTop: 0
    });
  });    
}

$(window).resize(function() {
  if( $(window).width() < 481 ) {
    open_date_pda();
  }
});

if( $(window).width() < 481 ) {
  open_date_pda();
}


}); //ready




const form1 = document.querySelector('.proftools-form-1'),
proftoolsBtn = document.querySelector('.proftools-btn');

form1.addEventListener('input', function () {
  proftoolsBtn.removeAttribute("disabled");
});

const form2 = document.querySelector('.proftools-form-2'),
proftoolsBtn2 = document.querySelector('.proftools-btn-2');

form2.addEventListener('input', function () {
  proftoolsBtn2.removeAttribute("disabled");
});

