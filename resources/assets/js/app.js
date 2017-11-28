// *************************************************************************
// *************************************************************************
// *************************************************************************

require('./bootstrap');



// #PAGE FADE
// =========================================================================


$('body').fadeIn(500);

$('a[target!="_blank"]').click(function() {

event.preventDefault();

newLocation = this.href;

$('body').fadeOut(500, newpage);

});

function newpage() {

window.location = newLocation;

}


// #FORM
// =========================================================================

// #FORM
// =========================================================================

var form = $('.contact__form');

$(form).submit(function(e) {
    e.preventDefault();

    var formData = new FormData($(this)[0]);
    // if files => formData.append('file', $('input[type=file]')[0].files[0]); 

    $.ajax({
        type: 'post',
        url: $(this).attr('action'),
        data: formData,
        processData: false,
        contentType : false
    })
    .done(function (response) {
        $('input').val('');
        $('textarea').val('');
        $('<div class="alert alert__success">Your Message Was Sent!  We\'ll be in touch.</div>').insertAfter(form);

        console.log('success' + response);
    })
    .fail(function (data) {
        $('input').val('');
        $('textarea').val('');
        $('<div class="alert alert__error">Oh no!  Something went wrong, try again.</div>').insertAfter(form);

        console.log('fail' + data);
    });
});



// #RESUME FORM
// =========================================================================

var careersForm = $('.careers-form');

$(careersForm).submit(function(e) {
    e.preventDefault();

    var formData = new FormData($(this)[0]);
    formData.append('file', $('input[type=file]')[0].files[0]); 

    $.ajax({
        type: 'post',
        url: $(this).attr('action'),
        data: formData,
        processData: false,
        contentType : false
    })
    .done(function (response) {
        $('input').val('');
        $('textarea').val('');
        $('<div class="alert alert__success">Your Message Was Sent!  We\'ll be in touch.</div>').insertAfter(careersForm);

        console.log('success' + response);
    })
    .fail(function (data) {
        $('input').val('');
        $('textarea').val('');
        $('<div class="alert alert__error">Oh no!  Something went wrong, try again.</div>').insertAfter(careersForm);

        console.log('fail' + data);
    });
});



// #PHOTO TILES
// =========================================================================


  $('.tile')
    // tile mouse actions
    .on('mouseover', function(){
      $(this).children('.photo').css({'transform': 'scale('+ $(this).attr('data-scale') +')'});
    })
    .on('mouseout', function(){
      $(this).children('.photo').css({'transform': 'scale(1)'});
    })
    .on('mousemove', function(e){
      $(this).children('.photo').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
    })
    // tiles set up
    .each(function(){
      $(this)
        // add a photo container
        .append('<div class="photo"></div>')
        // set up a background image for each tile based on data-image attribute
        .children('.photo').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
    })




// #ACCODION
// =========================================================================

$('.accordion__content').hide();
$('.accordion__content').first().show();
$('.accordion__panel').first().addClass('is--open');

$('.accordion__title').click(function() {
    $('.accordion__panel').removeClass('is--open');
    $(this).parent().addClass('is--open');
    $('.accordion__content').slideUp(200);
    $(this).next('.accordion__content').slideDown(200);
});



// #TABS
// =========================================================================

$('li[data-tab], .tabs__content').first().addClass('is--active');
$('.tabs__content').first().addClass('is--active');

$('li[data-tab]').click(function() {
    var thisTab = $(this).attr('data-tab');
    var tab = $('.tabs__content' + '[data-tab="' + thisTab + '"]');

    $('li[data-tab]').removeClass('is--active');
    $(this).addClass('is--active');
    $('.tabs__content').removeClass('is--active');
    tab.addClass('is--active');
});




// #PORTFOLIO CATEGORIES
// =========================================================================

var catTrigger = $('.portfolio__category');

catTrigger.click(function () {
    var category = $(this).data('portfolio');
    var images = $('.portfolio__image' + '[data-portfolio="' + category + '"]');

    $('.active-project').text(category.substr(0,1).toUpperCase()+category.substr(1));

    if (category == 'all') {
        $('.image__container').hide();
        $('.image__container').fadeIn('slow');
    } else {
        $('.portfolio__image').parent().hide();
        images.parent().fadeIn('slow');
    }
});



// #DROPDOWN
// =========================================================================

$('.dropdown__container').mouseenter(function() {
    $(this).addClass('is--active');
});

$('.dropdown__container').mouseleave(function() {
    $(this).removeClass('is--active');
});

$('.dropdown').mouseleave(function() {
    $(this).parent().removeClass('is--active');
});




// #ALERT NOTIFY
// =========================================================================

$('.alert--notify').click(function() {
    $(this).fadeOut(200);
});



// #OFF CANVAS
// =========================================================================

var offCanvasTrigger = document.querySelector('.off-canvas__trigger');
var offCanvas = document.querySelector('.off-canvas');

if (offCanvasTrigger) {
    offCanvasTrigger.addEventListener('click', function () {
        offCanvas.classList.add('is--open');
        overlay.classList.add('is--active');
    });
}



// #MODAL
// =========================================================================

var modalTrigger = document.querySelector('.modal__trigger');
var modal = document.querySelector('.modal');

if (modalTrigger) {
    modalTrigger.addEventListener('click', function () {
        alert('sdf');

        modal.classList.add('is--open');
        overlay.classList.add('is--active');
    });
}



// #KEY CONTROL
// =========================================================================

$(document).keyup(function(e) {
    if (e.keyCode === 27) {
        overlay.classList.remove('is--active');
    }
});

if (offCanvas) {

    $(document).keyup(function(e) {
        if (e.keyCode === 27) {
            offCanvas.classList.remove('is--open');
        }
    });

}

if (modal) {

    $(document).keyup(function(e) {
        if (e.keyCode === 27) {
            modal.classList.remove('is--open');
        }
    });

}



// #OVERLAY
// =========================================================================

var overlay = document.querySelector('.overlay');

if (overlay) {
    overlay.addEventListener('click', function () {
        this.classList.remove('is--active');
    });
}

if (overlay) {
    overlay.addEventListener('click', function () {
        offCanvas.classList.remove('is--open');
    });
}

if (overlay) {
    overlay.addEventListener('click', function () {
        modal.classList.remove('is--open');
    });
}



// #NAV
// =========================================================================

var prev = 0
var page = $(window)
var nav = $('.nav')


page.on('scroll', () => {
    if (page.scrollTop() >= 300) {
        nav.addClass('nav--scrolled');
    } else {
        nav.removeClass('nav--scrolled')
    }

    var scrollTop = page.scrollTop();
    nav.toggleClass('nav--hidden', scrollTop > prev);
    prev = scrollTop;
});



// #INPUTS
// =========================================================================

var formGroup = $('.field');
var input = formGroup.find('input, textarea');

$(input).on('focus blur', function (e) {
    $(this).parents('.field').toggleClass('field--focused', (e.type === 'focus' || this.value.length > 0));
}).trigger('blur');



// #COMPARE
// =========================================================================

jQuery(document).ready(function($){
    var dragging = false,
        scrolling = false,
        resizing = false;
    var imageComparisonContainers = $('.image-container');
    checkPosition(imageComparisonContainers);
    $(window).on('scroll', function(){
        if( !scrolling) {
            scrolling =  true;
            ( !window.requestAnimationFrame )
                ? setTimeout(function(){checkPosition(imageComparisonContainers);}, 100)
                : requestAnimationFrame(function(){checkPosition(imageComparisonContainers);});
        }
    });
    
    imageComparisonContainers.each(function(){
        var actual = $(this);
        drags(actual.find('.handle'), actual.find('.resize-img'), actual, actual.find('.image-label[data-type="original"]'), actual.find('.image-label[data-type="modified"]'));
    });

    $(window).on('resize', function(){
        if( !resizing) {
            resizing =  true;
            ( !window.requestAnimationFrame )
                ? setTimeout(function(){checkLabel(imageComparisonContainers);}, 100)
                : requestAnimationFrame(function(){checkLabel(imageComparisonContainers);});
        }
    });

    function checkPosition(container) {
        container.each(function(){
            var actualContainer = $(this);
            if( $(window).scrollTop() + $(window).height()*0.5 > actualContainer.offset().top) {
                actualContainer.addClass('is-visible');
            }
        });

        scrolling = false;
    }

    function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
        dragElement.on("mousedown vmousedown", function(e) {
            dragElement.addClass('draggable');
            resizeElement.addClass('resizable');

            var dragWidth = dragElement.outerWidth(),
                xPosition = dragElement.offset().left + dragWidth - e.pageX,
                containerOffset = container.offset().left,
                containerWidth = container.outerWidth(),
                minLeft = containerOffset + 10,
                maxLeft = containerOffset + containerWidth - dragWidth - 10;
            
            dragElement.parents().on("mousemove vmousemove", function(e) {
                if( !dragging) {
                    dragging =  true;
                    ( !window.requestAnimationFrame )
                        ? setTimeout(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);}, 100)
                        : requestAnimationFrame(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);});
                }
            }).on("mouseup vmouseup", function(e){
                dragElement.removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            e.preventDefault();
        }).on("mouseup vmouseup", function(e) {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
    }

    function animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement) {
        var leftValue = e.pageX + xPosition - dragWidth;           if(leftValue < minLeft ) {
            leftValue = minLeft;
        } else if ( leftValue > maxLeft) {
            leftValue = maxLeft;
        }

        var widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
        
        $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
            $(this).removeClass('draggable');
            resizeElement.removeClass('resizable');
        });

        $('.resizable').css('width', widthValue); 
        dragging =  false;
    }

    function updateLabel(label, resizeElement, position) {
        if(position == 'left') {
            ( label.offset().left + label.outerWidth() < resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        } else {
            ( label.offset().left > resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        }
    }
});



// #TEST
// =========================================================================

var modalImg = $('.modal img'),
    next = $('.modal .next'),
    prev = $('.modal .prev');

$('.image__container').click(function() {
    overlay.classList.add('is--active');
    modal.classList.add('is--open');
    $(this).addClass('is--active');

    var imgSrc = $(this).find('img').attr('src');
    modalImg.attr('src', imgSrc);
});

next.click(function () {
    var currentImg = $('.is--active');
    var nextImg = currentImg.next('.image__container').find('img').attr('src');

    currentImg.next('.image__container').addClass('is--active');
    $('.image__container.is--active').first().removeClass('is--active');

    modalImg.attr('src', nextImg);
});

prev.click(function () {
    var currentImg = $('.is--active');
    var prevImg = currentImg.prev('.image__container').find('img').attr('src');

    currentImg.prev('.image__container').addClass('is--active');
    $('.image__container.is--active').last().removeClass('is--active');

    modalImg.attr('src', prevImg);
});



// #CAROUSEL
// =========================================================================

$('.careers__carousel').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 1,
    arrows: false,
    dots: true
});

$('.slick-dots button').empty();



// #MAP
// =========================================================================

if ($('#map')) {

    var lat = 42.276682;
    var long = -82.768273;


    var map = new GMaps({
      el: "#map",
      lat: lat,
      lng: long,
      zoom: 15, 
      zoomControl : true,
      zoomControlOpt: {
        style : "SMALL",
        position: "TOP_LEFT"
      },
      scrollwheel: false,
      panControl : true,
      streetViewControl : false,
      mapTypeControl: false,
      overviewMapControl: false
    });
        
    var styles = [
        {
          stylers: [
            { saturation: 0 },
            { lightness: 0 }
          ]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { lightness: 10 },
                { visibility: "simplified" }
          ]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
          ]
        }
    ];

    map.addStyle({
        styledMapName:"Styled Map",
        styles: styles,
        mapTypeId: "map_style"  
    });

    map.addMarker({
      lat: lat,
      lng: long,
    });

    map.setStyle("map_style");
}
