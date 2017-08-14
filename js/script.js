(function (){
  'use strict';

  var $myTimeOut, $s,
  carousel = {
    settings: {
      activeItem: 1,
      maxItem: 3,
      pagers: $('.pager'),
      controls: $('.control'),
      slides: $('.item')
    },

    renderSlides: function(){
      $s.activeItem = ($s.activeItem>$('.item').length)?1:$s.activeItem;
      $('.item, .pager').each(function(i){
        $(this).removeClass('is-active');
        if ($(this).data('index') == $s.activeItem) {
          $(this).addClass('is-active');
        }
      });
      $s.activeItem++;
      carousel.handleInterval();
    },

    handleInterval: function(){
      $myTimeOut = setTimeout(this.renderSlides, 3000);
    },

    attachEventHandler: function(){
      $s.controls.on('click', function(e){
        let current = $('.item.is-active').data('index');
        if ($(this).hasClass('prev')) {
          $s.activeItem = (current==1)?$s.maxItem:(current-1);
        } else {
          $s.activeItem = (current==$s.maxItem)?1:(current+1);
        }
        clearTimeout($myTimeOut);
        carousel.renderSlides();
      });

      $s.pagers.on('click', function(e){
        $s.activeItem = $(this).data('index');
        clearTimeout($myTimeOut);
        carousel.renderSlides();
      });
    },

    init: function(){
      $s = this.settings;
      this.renderSlides();
      this.attachEventHandler();
      $(window).bind('load resize',function(e){
        $('.carousel-control').css('height', $('.item').height());
        $('.carousel-pager').css('margin-top', ($('.item').height() - 25) + 'px');
      });
    }
  };
  carousel.init();
}());
