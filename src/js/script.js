$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.svg"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.svg"></img></button>',
        responsive: [
        {
            breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false
                }
            }
        ]      
    });


    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      $('.catalog-item__link').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');

        })
      })

      $('.catalog-item__back').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');

        })
      });
      //Modal

      $('[data-modal=consultation]').on('click', function() {
        $('.overley, #consultation').fadeIn('slow');
      })

      $('.modal__close').on('click', function() {
        $('.overley, #consultation, #order, #thanks').fadeOut('slow');
      })

      $('.button_tabs').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overley, #order').fadeIn('slow');
        })
      })


      //Validation
      function validateForm (form){
        $(form).validate({
          rules: {
            name: 'required',
            phone: 'required',
            email: {
              required: true,
              email: true,
            }
          },
          messages: {
            name: {
              required: 'Введите свое имя'
            },
            phone: {
              required: 'Введите свой номер телефона'
            }, 
            email: {
              required: 'Введите свой адрес почты',
              email: 'Неправильно введен адрес почты'
            },
          }
        });
      };
      validateForm('#consultation-form');
      validateForm('#consultation form');
      validateForm('#order form');


      $('input[name=phone]').mask("+7 (999) 999-9999");


      // Отправка форм на сервер
      $('form').submit(function(e) {
        e.preventDefault();
        if (!$(this).valid()) {
          return;
        }

        $.ajax({
          type: 'POST',
          url: 'mailer/phpmailer/smart.php',
          data: $(this).serialize()
        }).done(function() {
          $(this).find('input').val('');
          $('#consultation, #order').fadeOut('slow');
          $('.overley, #thanks').fadeIn('slow');

          $('form').trigger('reset');
        });
        return false;
      });
});
