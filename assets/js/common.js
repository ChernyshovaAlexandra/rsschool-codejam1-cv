;(function($){
    var win = $(window);
    $('.top-pannel').css('min-height', win.height());
    $('.top-pannel>.container').css('min-height', win.height());

    (function validate_form(){
      var app = {
        initialize : function () {
          this.modules();
          this.setUpListeners();
        },
        modules: function () {
        },
        setUpListeners: function(){
          $('form').on('submit', app.submitForm);
          $('form').on('keydown', 'input', app.removeError);
        },
        submitForm: function (e) {
          e.preventDefault();
          var form = $(this),
            submitBtn = form.find('button[type="submit"]')
          if(app.validateForm(form) === false) return false;
          submitBtn.attr('disabled','disabled');
          var str = form.serialize();
          $.ajax({
            url: './send.php',
            type: 'POST',
            data: str 
          })
          .done(function(msg){
            if(msg === "OK"){
              var result = "<div = 'bg-success'>Спасибо за внимание! Я с вами свяжусь!</div>"
              form.html(result);
            }else{
              form.html(msg);
            }
          })
          .always(function(){
            submitBtn.removeAttr('disabled');
          });
        },
          validateForm: function(form){
            var inputs = form.find('input'),
                valid = true;
            inputs.tooltip('destroy');
            $.each(inputs, function(index, val){
              var input = $(val),
                  val = input.val(),
                  formGroup = input.parents('.form-group'),
                  label = formGroup.find('label').text().toLowerCase(),
                  textError = "Введите " + label;
              if(val.length === 0){
                formGroup.addClass('has-error').removeClass('has-success');
                input.tooltip({
                  trigger: 'manual',
                  placement: 'right',
                  title: textError
                }).tooltip('show');
                valid = false;
              }else{
                formGroup.addClass('has-success').removeClass('has-error');
              }
            });
             return valid;
          },
          removeError: function(){
            $(this).tooltip('destroy').parents('.form-group').removeClass('has-error');
          }
      }
      app.initialize();
    }());

    (function scroll_menu_to(){
        var lastId,
            topMenu = $("#top-menu"),
            topMenuHeight = topMenu.outerHeight()+15,
            menuItems = topMenu.find("a"),
            scrollItems = menuItems.map(function(){
              var item = $($(this).attr("href"));
              if (item.length) { return item; }
        });
        menuItems.click(function(e){
          var href = $(this).attr("href"),
              offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
          $('html, body').stop().animate({  
              scrollTop: offsetTop
          }, 800);
          e.preventDefault();
        });
        $(window).scroll(function(){
           var fromTop = $(this).scrollTop()+topMenuHeight;
           var cur = scrollItems.map(function(){
             if ($(this).offset().top < fromTop)
               return this;
           });
           cur = cur[cur.length-1];
           var id = cur && cur.length ? cur[0].id : "";
           if (lastId !== id) {
               lastId = id;
               menuItems
                 .parent().removeClass("active_menu")
                 .end().filter("[href='#"+id+"']").parent().addClass("active_menu");
           }                   
        });
    }());

    (function hash_click(){
      $('a[href^="#"]').on('click',function (e) {
          e.preventDefault();
          var target = this.hash;
          var $target = $(target);
          $('html, body').stop().animate({
              'scrollTop': $target.offset().top
          }, 900, 'swing', function () {
              window.location.hash = target;
          });
      });
    }());

    (function nubmer_animate(){
        var show = true;
        var countbox = ".merit";
        $(window).on("scroll load resize", function(){
            if(!show) return false;
            var w_top = $(window).scrollTop();
            var e_top = $(countbox).offset().top;
            var w_height = $(window).height();
            var d_height = $(document).height();
            var e_height = $(countbox).outerHeight();
            if(w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height){
                $(".spincrement").spincrement({
                    thousandSeparator: "",
                    duration: 4200
                });
                show = false;
            }
        });
    }());

    (function portfolio_animate(){
        $('#portfolio_grid').mixItUp(); 
        $('.works li').on('click', function(){
            $('.works li').removeClass('active');
            $(this).addClass('active');
        });
    }());

    (function modal_animate(){
        $(document).on('click', function(e){
            if ($('.modal').is(":hidden")){
                return;
            };
            var target = $(e.target);
            if (target.hasClass('modal')) {
                toggleModal();
            };
        });
        $('.btn_work').on('click', function(){
            toggleModal();
        })
        function toggleModal() {
            $('.modal').fadeToggle('fast');
        }        
    }());

    (function modal_animate_mail(){
        $(document).on('click', function(e){
            if ($('.mail').is(":hidden")){
                return;
            };
            var target = $(e.target);
            if (target.hasClass('mail')) {
                toggleModal();
            };
        });
        $('.btn_mail').on('click', function(){
            toggleModal();
        })
        function toggleModal() {
            $('.mail').fadeToggle('fast');
        }        
    }());

    (function slider(){       
        var sliderPosition = 0;                              
        var event = function(){
            $('.arrow').on('click', function () {
                if ( $(this).hasClass('left')) {
                    playSlider(-1);
                } else if ( $(this).hasClass('right')){
                    playSlider(1);
                }
            });
        }();
        var playSlider = function (dir) {
            var sliderLength = $('.boxSlider .slide').length - 1;
            var widthImg = $('.slide').width();
                sliderPosition += dir;
                if (sliderPosition < 0){
                    sliderPosition = sliderLength;
                    $('.slide').eq(-1).clone().prependTo('.boxSlider');
                    $('.boxSlider').css('left', -widthImg);
                    $('.boxSlider').animate({left:0},function () {
                        $('.slide').eq(0).remove();
                        $('.boxSlider').css('left', - sliderPosition * widthImg);
                        $('.boxSlider').length - 1;
                    })
                    return;
            } else if (sliderPosition > sliderLength ){
                $('.slide').eq(0).clone().appendTo('.boxSlider');
                $('.boxSlider').animate({left: - sliderPosition * widthImg}, function () {
                    $(this).css('left','0');
                    sliderPosition = 0;
                    $('.slide').eq(-1).remove();
                })
                return;
            }
            $('.boxSlider').animate({left: - sliderPosition * widthImg});
        };
    }());

    (function scroll_document_animate_(){
         win.scroll(function () {
            var nav = $('.line_menu');
            if ($(this).scrollTop() > $('.menu').offset().top) {  
                $('.cap').css('margin-top','53px'),
                nav.addClass("fixed");
            } else {
                nav.removeClass("fixed");
                $('.cap').css('margin-top','0');
            }
            if (win.scrollTop() >= 300) {    
                $('.scroller').fadeIn(220);
            }
            else if (win.scrollTop() < 300) {
                $('.scroller').fadeOut(220);
            }
        });
    }());

    (function menu_scroll(){
        $(".toggle-mnu").on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass("on");
            $(".menu_mobile").slideToggle();
        });
        $('.scroller').on('click', function(e) {     
            e.preventDefault();
            $('html, body').animate({ scrollTop : 0}, 800);
        });
        $('.mouse-icon').on('click', function(e) {
            e.preventDefault();              
            $('html, body').animate({ scrollTop : $(".aboutMe").offset().top-50}, 800);
        });
        $('.btnMeOne').on('click', function(e) {
            e.preventDefault();              
            $('html, body').animate({ scrollTop : $(".works").offset().top}, 800);
        });                     
    }());
 
    (function block_animate(){
        $(".logo_style").animated("zoomIn", "slideOutDown");
        $(".postStudy1 .study_post").animated("bounceInLeft", "slideOutDown");
        $(".postStudy2 .study_post_center").animated("bounceInRight", "slideOutDown");
        $(".postStudy3 .study_post").animated("bounceInLeft", "slideOutDown");
        $(".resume>h2").animated("zoomIn", "slideOutDown");
        $('.btn_animeted').animated("bounceInLeft", "slideOutDown");
    }());

    (function event_after_load_document(){
        win.on('load',function() {
            $(".loader_inner").fadeOut();
            $(".loader").delay(400).fadeOut("slow");
            $(".paralax").animated("fadeInDown", "fadeOutUp");
        }); 
    }());

// анимация прогресс баров
    (function($){
        new WOW().init();
    }());

    (function circleAnim(){
        $('.qit').waypoint(function(){
            $('.circle').knob();
                $({animatedVal: 0}).animate({animatedVal: 95 }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function() {
                        $('.circle').val(Math.ceil(this.animatedVal)).trigger('change');
                    }
            });
            $('.circle1').knob();
                $({animatedVal: 0}).animate({animatedVal: 70 }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function() {
                        $('.circle1').val(Math.ceil(this.animatedVal)).trigger('change');
                    }
            });
            $('.circle2').knob();
                $({animatedVal: 0}).animate({animatedVal: 60 }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function() {
                        $('.circle2').val(Math.ceil(this.animatedVal)).trigger('change');
                    }
            });
            $('.circle3').knob();
                $({animatedVal: 0}).animate({animatedVal: 70 }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function() {
                        $('.circle3').val(Math.ceil(this.animatedVal)).trigger('change');
                    }
            });
            $('.circle4').knob();
                $({animatedVal: 0}).animate({animatedVal: 75 }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function() {
                        $('.circle4').val(Math.ceil(this.animatedVal)).trigger('change');
                    }
            });
            $('.circle5').knob();
                $({animatedVal: 0}).animate({animatedVal: 90 }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function() {
                        $('.circle5').val(Math.ceil(this.animatedVal)).trigger('change');
                    }
            });
        });
    }());
}(jQuery));