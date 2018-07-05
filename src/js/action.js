/**
 * Created by chewei.chen on 2016/8/30.
 */
$(function(){
    /*nav*/
    $('.dropDown').hover(function(){
        $(this).children('ul')
            .stop().delay(200)
            .animate({height: "toggle", opacity: "toggle"}, 200);
    });

    /*carousel*/

    var $carousel = $('.carousel'),
        $dotWrap = $('.dotWrap');

    calculateHeight();
    addDots();

    function calculateHeight(){
        var height = $('.item.active').outerHeight();
        $carousel.stop().animate({height: height}, 800);
    }

    function resetSlides(){
        $('.item.inactive').removeClass('inactiveDown').removeClass('inactiveTop');
    }

    function gotoSlide(activeItem, item, className){
        activeItem.removeClass('active').addClass('inactive '+className).find('.desc').hide();
        item.removeClass('inactive').addClass('active').find('.desc').delay(1000).fadeIn(1000);
        calculateHeight();
        resetDots();
        setTimeout(resetSlides, 300);
    }

    $('.next').on('click', function(){
        var $activeItem = $('.item.active'),
            $nextItem = $activeItem.next('.item').length != 0 ? $activeItem.next('.item') : $('.item:first-child');
        gotoSlide($activeItem, $nextItem, 'inactiveTop');
    });

    $('.prev').on("click",  function(){
        var $activeItem = $('.item.active'),
            $prevItem = $activeItem.prev('.item').length != 0 ? $activeItem.prev('.item') : $('.item:last-child');
        gotoSlide($activeItem, $prevItem, "inactiveDown");
    });


    function addDots(){
        var total = $('.item').length,
            index = $('.item.active').index();

        for (var i = 0; i < total; i++){
            $dotWrap.append('<li></li>');
        }
        $dotWrap.find('li').eq(index).addClass('active');
    }

    function resetDots(){
        $dotWrap.find('li.active').removeClass('active');
        var index = $('.item.active').index()+1;
        $dotWrap.find('li:nth-child('+index+')').addClass('active');
    }

    $dotWrap.find('li').on("click", function(){
        if($(this).hasClass('active')){
            return;
        }
        var $activeItem = $('.item.active');
        var currentIndex = $activeItem.index();
        var targetIndex = $(this).index();
        //console.log(currentIndex, targetIndex);
        var $currentItem = $('.item:nth-child('+(targetIndex + 1)+')');
        gotoSlide($activeItem, $currentItem, currentIndex > targetIndex ? "inactiveDown" : "inactiveTop");
    });

    $(window).resize(function() {
        setTimeout(calculateHeight, 1500);
        //clearTimeout($.data(this, 'resizeTimer'));
    });


    /*tab*/
    var $tab = $('.tab'),
        $tabItems = $('.tabItems'),
        $tabItem = $('.tabItem');

    var $tabItemCount = $tabItem.length;
    var $tabItemWidth = $tabItem.outerWidth();

    $tabItems.css({'width' : $tabItemCount * $tabItemWidth});
    $tab.eq(0).addClass('active');

    $tab.hover(function(){
        var index = $(this).index();
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $tabItems.stop().animate({left: index * -($tabItemWidth)}, 800);
    });
});