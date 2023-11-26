$(document).ready(() => {
    function setCurrentDotsLevel() {
        let slider = $(this).parent().find('ul.slick-dots').eq(0)

        slider.find('li').each(function (index, e) {
            if ($(e).hasClass('slick-active')) {
                let currentLevel = Math.floor(index / 4)
                slider.css('top', -21 * currentLevel + 'px')
            }
        })
    }

    let schedule_slider = $('.schedule__items')
    schedule_slider.on('afterChange', setCurrentDotsLevel)
    schedule_slider.slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        appendDots: $('#schedule__slider-controls .dots'),
        arrows: true,
        prevArrow: $('#schedule__slider-controls .arrow.left'),
        nextArrow: $('#schedule__slider-controls .arrow.right'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                }
            }]
    });

    let photo_slider = $('.photo__slider')
    photo_slider.on('afterChange', setCurrentDotsLevel)
    photo_slider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        appendDots: $('#photo__slider-controls .dots'),
        arrows: true,
        prevArrow: $('#photo__slider-controls .arrow.left'),
        nextArrow: $('#photo__slider-controls .arrow.right'),
    });

    let extra_photo_slider = $('.extra-photo-slider')
    extra_photo_slider.on('afterChange', setCurrentDotsLevel)
    extra_photo_slider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        appendDots: $('#extra__photo__slider-controls .extra-dots'),
        arrows: true,
        prevArrow: $('#extra__photo__slider-controls .extra-arrow.left'),
        nextArrow: $('#extra__photo__slider-controls .extra-arrow.right'),
        // responsive: [
        //     {
        //         breakpoint: 600,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 2,
        //             infinite: true,
        //             dots: true
        //         }},
        //     {
        //         breakpoint: 600,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1,
        //             infinite: true,
        //             dots: true
        //         }
        //     },
        //     {
        //         breakpoint: 320,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1,
        //             infinite: true,
        //             dots: true
        //         }
        //     }]
    });


    let review_slider = $('.review__items')
    review_slider.on('afterChange', setCurrentDotsLevel)
    review_slider.slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        appendDots: $('#review__slider-controls .dots'),
        arrows: true,
        prevArrow: $('#review__slider-controls .arrow.left'),
        nextArrow: $('#review__slider-controls .arrow.right'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
        ]
    });

    $('.pic').magnificPopup({
        type: 'image'
    });

    new WOW({
        animateClass: 'animate__animated',
    }).init();


    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    }

    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open')
        }
    })


    let agreement = $('#agreement');
    let popup = $('#confirmationPopup');
    let appPopup = $('#confirmationAppPopup')
    let phoneInput = $('#phone-input');
    let numberRequest = $('#number-request');
    let appBox = $('#app-box');
    let loader = $('.loader');
    phoneInput.inputmask({"mask": "(999) 999-9999"});
    numberRequest.inputmask({"mask": "(999) 999-9999"});


    $('#close').click(() => {
        popup.hide()
    })
    $('#phone-text').click(() => {
        popup.show()
    })

    $('#request-call').click(() => {
        popup.show()
    })

    $('#confirmationButton').click(() => {
        let hasError = false;
        $('.error-input').hide();

        if (!numberRequest.val()) {
            numberRequest.css('border', '1px solid red')
            numberRequest.parent().next().show();
            hasError = true;
        }

        if (!agreement.is(':checked')) {
            agreement.parent().next().show();
            hasError = true;
        }

        if (!hasError) {
            popup.hide('fast', function () {
                alert('Мы скоро свяжемся с Вами!');
            });
            numberRequest.val('')
            numberRequest.css('border', '0px')
        }
    })


    $('#submit').click((function () {
        let phoneInput = $('#phone-input');
        let data = $('#order__data');
        let hasError = false;

        $('.error-input').hide();
        if (!phoneInput.val()) {
            phoneInput.css("border", "1px solid red");
            phoneInput.next().show();
            hasError = true;
        }

        if (!data.val()) {
            data.css('border', '1px solid red');
            data.next().show();
            hasError = true;
        }


        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "http://testologia.site/checkout",
                data: {name: data.val(), phone: phoneInput.val()}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        appPopup.css('width', appBox.width());
                        appPopup.css('height', appBox.height());
                        appBox.hide();
                        $('#app-box :text').val('');
                        appPopup.css('display', 'flex');
                    } else {
                        alert('Возникла ошибка при оформлении заявки, попробуйте еще раз');
                    }
                });
        } else {
            // alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
            loader.hide();
        }

    }))


    $('#confirmationAppButton').click(() => {
        appPopup.hide();
        appBox.show();

    })


    let emailInput = $('#email-input');
    let subscribeBtn = $('#subscribe-btn');

    subscribeBtn.click((function () {
        let hasError = false;

        if (!emailInput.val()) {
            emailInput.css('border', '1px solid red');
            hasError = true;
        }
        else {
            alert('Вы успешно подписаны на рассылку');
            emailInput.val('');
            emailInput.css('border-color', '#fa742b')
        }
    }))

    function readMore(event) {
        let cardContent = $(event.target).parent().parent();
        let dots = cardContent.find('.more-hint').eq(0);
        let moreText = cardContent.find('.more-text').eq(0);
        let cardImg = cardContent.next();
        let control = $(event.target).parent();

        $('.shadow').toggle()

        moreText.toggle();
        dots.toggle();
        control.toggle();

        cardImg.addClass('hidden');
        cardImg.find('img').eq(0).toggle();
    }

    function readLess() {
        let spottedCard = $('.spotlight').eq(0);
        let cardContent = spottedCard.find('.item_content').eq(0);
        let about_img = spottedCard.find('.item_close_control').eq(0);

        cardContent.find('.more-hint').eq(0).toggle();
        cardContent.find('.more-text').eq(0).toggle();

        cardContent.find('.action-read').eq(0).parent().toggle();

        about_img.removeClass('hidden');
        about_img.find('img').eq(0).toggle();

        $('.shadow').toggle();
        spottedCard.removeClass('spotlight');
    }
    function readLessProgram() {
        let spottedCard = $('.program__item.spotlight').eq(0);
        spottedCard.find('.item_content').eq(0).css('padding-right', '15px')
        spottedCard.find('.program__about').eq(0).css('grid-column', '1 / 5');
        spottedCard.find('.program__about_img').eq(0).css('grid-column', '5 / 7');
    }

    $('.program__about-action .action-read, .program__about-action .action-arrow').on("click", (event) => {
        readMore(event);

        let cardContent = $(event.target).parent().parent();
        cardContent.css('padding-right', 0)
        cardContent.css('grid-column', '1 / 6');
        cardContent.next().css('grid-column', '6 / 7');
        cardContent.parent().addClass('spotlight');
    })

    $('.program__about_img img').on("click", () => {
        readLessProgram();
        readLess();
    });

    $('.review__action .action-read, .review__action .action-arrow').on("click", (event) => {
        readMore(event);
        $(event.target).parent().parent().parent().parent().addClass('spotlight');
    })

    $('.review__item_img img').on("click", readLess);

    $('.shadow').on("click", () => {
        readLessProgram();
        readLess();
    });

})
