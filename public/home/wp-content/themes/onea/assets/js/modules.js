(function($) {
    "use strict";
    window.eltdf = {};
    eltdf.modules = {};
    eltdf.scroll = 0;
    eltdf.window = $(window);
    eltdf.document = $(document);
    eltdf.windowWidth = $(window).width();
    eltdf.windowHeight = $(window).height();
    eltdf.body = $('body');
    eltdf.html = $('html, body');
    eltdf.htmlEl = $('html');
    eltdf.menuDropdownHeightSet = false;
    eltdf.defaultHeaderStyle = '';
    eltdf.minVideoWidth = 1500;
    eltdf.videoWidthOriginal = 1280;
    eltdf.videoHeightOriginal = 720;
    eltdf.videoRatio = 1.61;
    eltdf.eltdfOnDocumentReady = eltdfOnDocumentReady;
    eltdf.eltdfOnWindowLoad = eltdfOnWindowLoad;
    eltdf.eltdfOnWindowResize = eltdfOnWindowResize;
    eltdf.eltdfOnWindowScroll = eltdfOnWindowScroll;
    $(document).ready(eltdfOnDocumentReady);
    $(window).on('load', eltdfOnWindowLoad);
    $(window).resize(eltdfOnWindowResize);
    $(window).scroll(eltdfOnWindowScroll);

    function eltdfOnDocumentReady() {
        eltdf.scroll = $(window).scrollTop();
        if (eltdf.body.hasClass('eltdf-dark-header')) {
            eltdf.defaultHeaderStyle = 'eltdf-dark-header';
        }
        if (eltdf.body.hasClass('eltdf-light-header')) {
            eltdf.defaultHeaderStyle = 'eltdf-light-header';
        }
    }

    function eltdfOnWindowLoad() {}

    function eltdfOnWindowResize() {
        eltdf.windowWidth = $(window).width();
        eltdf.windowHeight = $(window).height();
    }

    function eltdfOnWindowScroll() {
        eltdf.scroll = $(window).scrollTop();
    }
    switch (true) {
        case eltdf.body.hasClass('eltdf-grid-1300'):
            eltdf.boxedLayoutWidth = 1350;
            break;
        case eltdf.body.hasClass('eltdf-grid-1200'):
            eltdf.boxedLayoutWidth = 1250;
            break;
        case eltdf.body.hasClass('eltdf-grid-1000'):
            eltdf.boxedLayoutWidth = 1050;
            break;
        case eltdf.body.hasClass('eltdf-grid-800'):
            eltdf.boxedLayoutWidth = 850;
            break;
        default:
            eltdf.boxedLayoutWidth = 1150;
            break;
    }
    eltdf.gridWidth = function() {
        var gridWidth = 1100;
        switch (true) {
            case eltdf.body.hasClass('eltdf-grid-1300') && eltdf.windowWidth > 1400:
                gridWidth = 1300;
                break;
            case eltdf.body.hasClass('eltdf-grid-1200') && eltdf.windowWidth > 1300:
                gridWidth = 1200;
                break;
            case eltdf.body.hasClass('eltdf-grid-1000') && eltdf.windowWidth > 1200:
                gridWidth = 1200;
                break;
            case eltdf.body.hasClass('eltdf-grid-800') && eltdf.windowWidth > 1024:
                gridWidth = 800;
                break;
            default:
                break;
        }
        return gridWidth;
    };
    eltdf.transitionEnd = (function() {
        var el = document.createElement('transitionDetector'),
            transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'transition': 'transitionend'
            };
        for (var t in transEndEventNames) {
            if (el.style[t] !== undefined) {
                return transEndEventNames[t];
            }
        }
    })();
    eltdf.animationEnd = (function() {
        var el = document.createElement("animationDetector");
        var animations = {
            "animation": "animationend",
            "OAnimation": "oAnimationEnd",
            "MozAnimation": "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        };
        for (var t in animations) {
            if (el.style[t] !== undefined) {
                return animations[t];
            }
        }
    })();
})(jQuery);
(function($) {
    "use strict";
    var common = {};
    eltdf.modules.common = common;
    common.eltdfFluidVideo = eltdfFluidVideo;
    common.eltdfEnableScroll = eltdfEnableScroll;
    common.eltdfDisableScroll = eltdfDisableScroll;
    common.eltdfOwlSlider = eltdfOwlSlider;
    common.eltdfInitParallax = eltdfInitParallax;
    common.eltdfInitSelfHostedVideoPlayer = eltdfInitSelfHostedVideoPlayer;
    common.eltdfSelfHostedVideoSize = eltdfSelfHostedVideoSize;
    common.eltdfPrettyPhoto = eltdfPrettyPhoto;
    common.eltdfStickySidebarWidget = eltdfStickySidebarWidget;
    common.getLoadMoreData = getLoadMoreData;
    common.setLoadMoreAjaxData = setLoadMoreAjaxData;
    common.setFixedImageProportionSize = setFixedImageProportionSize;
    common.eltdfInitPerfectScrollbar = eltdfInitPerfectScrollbar;
    common.eltdfRowShrink = eltdfRowShrink;
    common.eltdfLettersPop = eltdfLettersPop;
    common.eltdfOnDocumentReady = eltdfOnDocumentReady;
    common.eltdfOnWindowLoad = eltdfOnWindowLoad;
    common.eltdfOnWindowResize = eltdfOnWindowResize;
    $(document).ready(eltdfOnDocumentReady);
    $(window).on('load', eltdfOnWindowLoad);
    $(window).resize(eltdfOnWindowResize);

    function eltdfOnDocumentReady() {
        eltdfIconWithHover().init();
        eltdfDisableSmoothScrollForMac();
        eltdfInitAnchor().init();
        eltdfInitBackToTop();
        eltdfBackButtonShowHide();
        eltdfInitSelfHostedVideoPlayer();
        eltdfSelfHostedVideoSize();
        eltdfFluidVideo();
        eltdfOwlSlider();
        eltdfPreloadBackgrounds();
        eltdfPrettyPhoto();
        eltdfSearchPostTypeWidget();
        eltdfDashboardForm();
        eltdfInitGridMasonryListLayout();
        eltdfChangeClassBackToTop();
    }

    function eltdfOnWindowLoad() {
        eltdfInitParallax();
        eltdfSmoothTransition();
        eltdfStickySidebarWidget().init();
        eltdfAnimBurger();
        eltdfRowShrink();
        eltdfLettersPop();
    }

    function eltdfOnWindowResize() {
        eltdfInitGridMasonryListLayout();
        eltdfSelfHostedVideoSize();
        eltdfRowShrink();
    }

    function eltdfDisableSmoothScrollForMac() {
        var os = navigator.appVersion.toLowerCase();
        if (os.indexOf('mac') > -1 && eltdf.body.hasClass('eltdf-smooth-scroll')) {
            eltdf.body.removeClass('eltdf-smooth-scroll');
        }
    }

    function eltdfDisableScroll() {
        if (window.addEventListener) {
            window.addEventListener('wheel', eltdfWheel, {
                passive: false
            });
        }
        document.onkeydown = eltdfKeydown;
    }

    function eltdfEnableScroll() {
        if (window.removeEventListener) {
            window.removeEventListener('wheel', eltdfWheel, {
                passive: false
            });
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    }

    function eltdfAnimBurger() {
        if ($('.eltdf-anim-burger').length) {
            var burger = $('.eltdf-anim-burger');
            var line = burger.find('line');
            line.each(function() {
                var thisLine = $(this);
                thisLine.clone().addClass('eltdf-burger-filler').appendTo(thisLine.parent('svg'));
            });
        }
    }

    function eltdfWheel(e) {
        eltdfPreventDefaultValue(e);
    }

    function eltdfKeydown(e) {
        var keys = [37, 38, 39, 40];
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                eltdfPreventDefaultValue(e);
                return;
            }
        }
    }

    function eltdfPreventDefaultValue(e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;
    }
    var eltdfInitAnchor = function() {
        var setActiveState = function(anchor) {
            var headers = $('.eltdf-main-menu, .eltdf-mobile-nav, .eltdf-fullscreen-menu, .eltdf-vertical-menu');
            headers.each(function() {
                var currentHeader = $(this);
                if (anchor.parents(currentHeader).length) {
                    currentHeader.find('.eltdf-active-item').removeClass('eltdf-active-item');
                    anchor.parent().addClass('eltdf-active-item');
                    currentHeader.find('a').removeClass('current');
                    anchor.addClass('current');
                }
            });
        };
        var checkActiveStateOnScroll = function() {
            var anchorData = $('[data-eltdf-anchor]'),
                anchorElement, siteURL = window.location.href.split('#')[0];
            if (siteURL.substr(-1) !== '/') {
                siteURL += '/';
            }
            anchorData.waypoint(function(direction) {
                if (direction === 'down') {
                    if ($(this.element).length > 0) {
                        anchorElement = $(this.element).data("eltdf-anchor");
                    } else {
                        anchorElement = $(this).data("eltdf-anchor");
                    }
                    setActiveState($("a[href='" + siteURL + "#" + anchorElement + "']"));
                }
            }, {
                offset: '50%'
            });
            anchorData.waypoint(function(direction) {
                if (direction === 'up') {
                    if ($(this.element).length > 0) {
                        anchorElement = $(this.element).data("eltdf-anchor");
                    } else {
                        anchorElement = $(this).data("eltdf-anchor");
                    }
                    setActiveState($("a[href='" + siteURL + "#" + anchorElement + "']"));
                }
            }, {
                offset: function() {
                    return -($(this.element).outerHeight() - 150);
                }
            });
        };
        var checkActiveStateOnLoad = function() {
            var hash = window.location.hash.split('#')[1];
            if (hash !== "" && $('[data-eltdf-anchor="' + hash + '"]').length > 0) {
                anchorClickOnLoad(hash);
            }
        };
        var anchorClickOnLoad = function($this) {
            var scrollAmount, anchor = $('.eltdf-main-menu a, .eltdf-mobile-nav a, .eltdf-fullscreen-menu a, .eltdf-vertical-menu a'),
                hash = $this,
                anchorData = hash !== '' ? $('[data-eltdf-anchor="' + hash + '"]') : '';
            if (hash !== '' && anchorData.length > 0) {
                var anchoredElementOffset = anchorData.offset().top;
                scrollAmount = anchoredElementOffset - headerHeightToSubtract(anchoredElementOffset) - eltdfGlobalVars.vars.eltdfAddForAdminBar;
                if (anchor.length) {
                    anchor.each(function() {
                        var thisAnchor = $(this);
                        if (thisAnchor.attr('href').indexOf(hash) > -1) {
                            setActiveState(thisAnchor);
                        }
                    });
                }
                eltdf.html.stop().animate({
                    scrollTop: Math.round(scrollAmount)
                }, 1000, function() {
                    if (history.pushState) {
                        history.pushState(null, '', '#' + hash);
                    }
                });
                return false;
            }
        };
        var headerHeightToSubtract = function(anchoredElementOffset) {
            if (eltdf.modules.stickyHeader.behaviour === 'eltdf-sticky-header-on-scroll-down-up') {
                eltdf.modules.stickyHeader.isStickyVisible = (anchoredElementOffset > eltdf.modules.header.stickyAppearAmount);
            }
            if (eltdf.modules.stickyHeader.behaviour === 'eltdf-sticky-header-on-scroll-up') {
                if ((anchoredElementOffset > eltdf.scroll)) {
                    eltdf.modules.stickyHeader.isStickyVisible = false;
                }
            }
            var headerHeight = eltdf.modules.stickyHeader.isStickyVisible ? eltdfGlobalVars.vars.eltdfStickyHeaderTransparencyHeight : eltdfPerPageVars.vars.eltdfHeaderTransparencyHeight;
            if (eltdf.windowWidth < 1025) {
                headerHeight = 0;
            }
            return headerHeight;
        };
        var anchorClick = function() {
            eltdf.document.on("click", ".eltdf-main-menu a, .eltdf-fullscreen-menu a, .eltdf-btn, .eltdf-anchor, .eltdf-mobile-nav a, .eltdf-vertical-menu a", function() {
                var scrollAmount, anchor = $(this),
                    hash = anchor.prop("hash").split('#')[1],
                    anchorData = hash !== '' ? $('[data-eltdf-anchor="' + hash + '"]') : '';
                if (hash !== '' && anchorData.length > 0) {
                    var anchoredElementOffset = anchorData.offset().top;
                    scrollAmount = anchoredElementOffset - headerHeightToSubtract(anchoredElementOffset) - eltdfGlobalVars.vars.eltdfAddForAdminBar;
                    setActiveState(anchor);
                    eltdf.html.stop().animate({
                        scrollTop: Math.round(scrollAmount)
                    }, 1000, function() {
                        if (history.pushState) {
                            history.pushState(null, '', '#' + hash);
                        }
                    });
                    return false;
                }
            });
        };
        return {
            init: function() {
                if ($('[data-eltdf-anchor]').length) {
                    anchorClick();
                    checkActiveStateOnScroll();
                    $(window).on('load', function() {
                        checkActiveStateOnLoad();
                    });
                }
            }
        };
    };

    function eltdfInitBackToTop() {
        var backToTopButton = $('#eltdf-back-to-top');
        backToTopButton.on('click', function(e) {
            e.preventDefault();
            eltdf.html.animate({
                scrollTop: 0
            }, eltdf.window.scrollTop() / 3, 'linear');
        });
    }

    function eltdfChangeClassBackToTop() {
        var backToTop = $('#eltdf-back-to-top'),
            footerHolder = $('.eltdf-page-footer'),
            footerFixed = $('.eltdf-page-footer').hasClass('eltdf-footer-uncover');
        if (footerHolder.length) {
            $(window).scroll(function() {
                var scrollTop = $(this).scrollTop();
                if (footerFixed) {
                    var footerHeight = footerHolder.height();
                    if (scrollTop + $(window).height() > $(document).height() - (footerHeight - 43)) {
                        backToTop.addClass('eltdf-back-to-top-light');
                    } else {
                        backToTop.removeClass('eltdf-back-to-top-light');
                    }
                } else {
                    var footerPosition = footerHolder.offset().top;
                    if (scrollTop + $(window).height() > (footerPosition - 43)) {
                        backToTop.addClass('eltdf-back-to-top-light');
                    } else {
                        backToTop.removeClass('eltdf-back-to-top-light');
                    }
                }
            });
        }
    }

    function eltdfBackButtonShowHide() {
        eltdf.window.scroll(function() {
            var b = $(this).scrollTop(),
                c = $(this).height(),
                d;
            if (b > 0) {
                d = b + c / 2;
            } else {
                d = 1;
            }
            if (d < 1e3) {
                eltdfToTopButton('off');
            } else {
                eltdfToTopButton('on');
            }
        });
    }

    function eltdfToTopButton(a) {
        var b = $("#eltdf-back-to-top");
        b.removeClass('off on');
        if (a === 'on') {
            b.addClass('on');
        } else {
            b.addClass('off');
        }
    }

    function eltdfInitSelfHostedVideoPlayer() {
        var players = $('.eltdf-self-hosted-video');
        if (players.length) {
            players.mediaelementplayer({
                audioWidth: '100%'
            });
        }
    }

    function eltdfSelfHostedVideoSize() {
        var selfVideoHolder = $('.eltdf-self-hosted-video-holder .eltdf-video-wrap');
        if (selfVideoHolder.length) {
            selfVideoHolder.each(function() {
                var thisVideo = $(this),
                    videoWidth = thisVideo.closest('.eltdf-self-hosted-video-holder').outerWidth(),
                    videoHeight = videoWidth / eltdf.videoRatio;
                if (navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) {
                    thisVideo.parent().width(videoWidth);
                    thisVideo.parent().height(videoHeight);
                }
                thisVideo.width(videoWidth);
                thisVideo.height(videoHeight);
                thisVideo.find('video, .mejs-overlay, .mejs-poster').width(videoWidth);
                thisVideo.find('video, .mejs-overlay, .mejs-poster').height(videoHeight);
            });
        }
    }

    function eltdfFluidVideo() {
        fluidvids.init({
            selector: ['iframe'],
            players: ['www.youtube.com', 'player.vimeo.com']
        });
    }

    function eltdfSmoothTransition() {
        if (eltdf.body.hasClass('eltdf-smooth-page-transitions')) {
            if (eltdf.body.hasClass('eltdf-smooth-page-transitions-preloader')) {
                var loader = $('body > .eltdf-smooth-transition-loader.eltdf-mimic-ajax');
                loader.fadeOut(500);
                $(window).on('pageshow', function(event) {
                    if (event.originalEvent.persisted) {
                        loader.fadeOut(500);
                    }
                });
            }
            window.addEventListener("pageshow", function(event) {
                var historyPath = event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);
                if (historyPath) {
                    $('.eltdf-wrapper-inner').show();
                }
            });
            if (eltdf.body.hasClass('eltdf-smooth-page-transitions-fadeout')) {
                var linkItem = $('a');
                linkItem.on('click', function(e) {
                    var a = $(this);
                    if ((a.parents('.eltdf-shopping-cart-dropdown').length || a.parent('.product-remove').length) && a.hasClass('remove')) {
                        return;
                    }
                    if (e.which === 1 && a.attr('href').indexOf(window.location.host) >= 0 && (typeof a.data('rel') === 'undefined') && (typeof a.attr('rel') === 'undefined') && (!a.hasClass('lightbox-active')) && (typeof a.attr('target') === 'undefined' || a.attr('target') === '_self') && (a.attr('href').split('#')[0] !== window.location.href.split('#')[0])) {
                        e.preventDefault();
                        $('.eltdf-wrapper-inner').fadeOut(1000, function() {
                            window.location = a.attr('href');
                        });
                    }
                });
            }
        }
    }

    function eltdfPreloadBackgrounds() {
        var preloadBackHolder = $('.eltdf-preload-background');
        if (preloadBackHolder.length) {
            preloadBackHolder.each(function() {
                var preloadBackground = $(this);
                if (preloadBackground.css('background-image') !== '' && preloadBackground.css('background-image') !== 'none') {
                    var bgUrl = preloadBackground.attr('style');
                    bgUrl = bgUrl.match(/url\(["']?([^'")]+)['"]?\)/);
                    bgUrl = bgUrl ? bgUrl[1] : "";
                    if (bgUrl) {
                        var backImg = new Image();
                        backImg.src = bgUrl;
                        $(backImg).load(function() {
                            preloadBackground.removeClass('eltdf-preload-background');
                        });
                    }
                } else {
                    $(window).on('load', function() {
                        preloadBackground.removeClass('eltdf-preload-background');
                    });
                }
            });
        }
    }

    function eltdfPrettyPhoto() {
        var markupWhole = '<div class="pp_pic_holder"> \
                        <div class="ppt">&nbsp;</div> \
                        <div class="pp_top"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                        <div class="pp_content_container"> \
                            <div class="pp_left"> \
                            <div class="pp_right"> \
                                <div class="pp_content"> \
                                    <div class="pp_loaderIcon"></div> \
                                    <div class="pp_fade"> \
                                        <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
                                        <div class="pp_hoverContainer"> \
                                            <a class="pp_next" href="#"><span class="fa fa-angle-right"></span></a> \
                                            <a class="pp_previous" href="#"><span class="fa fa-angle-left"></span></a> \
                                        </div> \
                                        <div id="pp_full_res"></div> \
                                        <div class="pp_details"> \
                                            <div class="pp_nav"> \
                                                <a href="#" class="pp_arrow_previous">Previous</a> \
                                                <p class="currentTextHolder">0/0</p> \
                                                <a href="#" class="pp_arrow_next">Next</a> \
                                            </div> \
                                            <p class="pp_description"></p> \
                                            {pp_social} \
                                            <a class="pp_close" href="#">Close</a> \
                                        </div> \
                                    </div> \
                                </div> \
                            </div> \
                            </div> \
                        </div> \
                        <div class="pp_bottom"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                    </div> \
                    <div class="pp_overlay"></div>';
        $("a[data-rel^='prettyPhoto']").prettyPhoto({
            hook: 'data-rel',
            animation_speed: 'normal',
            slideshow: false,
            autoplay_slideshow: false,
            opacity: 0.80,
            show_title: true,
            allow_resize: true,
            horizontal_padding: 0,
            default_width: 960,
            default_height: 540,
            counter_separator_label: '/',
            theme: 'pp_default',
            hideflash: false,
            wmode: 'opaque',
            autoplay: true,
            modal: false,
            overlay_gallery: false,
            keyboard_shortcuts: true,
            deeplinking: false,
            custom_markup: '',
            social_tools: false,
            markup: markupWhole
        });
    }

    function eltdfSearchPostTypeWidget() {
        var searchPostTypeHolder = $('.eltdf-search-post-type');
        if (searchPostTypeHolder.length) {
            searchPostTypeHolder.each(function() {
                var thisSearch = $(this),
                    searchField = thisSearch.find('.eltdf-post-type-search-field'),
                    resultsHolder = thisSearch.siblings('.eltdf-post-type-search-results'),
                    searchLoading = thisSearch.find('.eltdf-search-loading'),
                    searchIcon = thisSearch.find('.eltdf-search-icon');
                searchLoading.addClass('eltdf-hidden');
                var postType = thisSearch.data('post-type'),
                    keyPressTimeout;
                searchField.on('keyup paste', function() {
                    var field = $(this);
                    field.attr('autocomplete', 'off');
                    searchLoading.removeClass('eltdf-hidden');
                    searchIcon.addClass('eltdf-hidden');
                    clearTimeout(keyPressTimeout);
                    keyPressTimeout = setTimeout(function() {
                        var searchTerm = field.val();
                        if (searchTerm.length < 3) {
                            resultsHolder.html('');
                            resultsHolder.fadeOut();
                            searchLoading.addClass('eltdf-hidden');
                            searchIcon.removeClass('eltdf-hidden');
                        } else {
                            var ajaxData = {
                                action: 'onea_elated_search_post_types',
                                term: searchTerm,
                                postType: postType
                            };
                            $.ajax({
                                type: 'POST',
                                data: ajaxData,
                                url: eltdfGlobalVars.vars.eltdfAjaxUrl,
                                success: function(data) {
                                    var response = JSON.parse(data);
                                    if (response.status === 'success') {
                                        searchLoading.addClass('eltdf-hidden');
                                        searchIcon.removeClass('eltdf-hidden');
                                        resultsHolder.html(response.data.html);
                                        resultsHolder.fadeIn();
                                    }
                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    console.log("Status: " + textStatus);
                                    console.log("Error: " + errorThrown);
                                    searchLoading.addClass('eltdf-hidden');
                                    searchIcon.removeClass('eltdf-hidden');
                                    resultsHolder.fadeOut();
                                }
                            });
                        }
                    }, 500);
                });
                searchField.on('focusout', function() {
                    searchLoading.addClass('eltdf-hidden');
                    searchIcon.removeClass('eltdf-hidden');
                    resultsHolder.fadeOut();
                });
            });
        }
    }

    function getLoadMoreData(container) {
        var dataList = container.data(),
            returnValue = {};
        for (var property in dataList) {
            if (dataList.hasOwnProperty(property)) {
                if (typeof dataList[property] !== 'undefined' && dataList[property] !== false) {
                    returnValue[property] = dataList[property];
                }
            }
        }
        return returnValue;
    }

    function setLoadMoreAjaxData(container, action) {
        var returnValue = {
            action: action
        };
        for (var property in container) {
            if (container.hasOwnProperty(property)) {
                if (typeof container[property] !== 'undefined' && container[property] !== false) {
                    returnValue[property] = container[property];
                }
            }
        }
        return returnValue;
    }

    function eltdfInitGridMasonryListLayout() {
        var holder = $('.eltdf-grid-masonry-list');
        if (holder.length) {
            holder.each(function() {
                var thisHolder = $(this),
                    masonry = thisHolder.find('.eltdf-masonry-list-wrapper'),
                    size = thisHolder.find('.eltdf-masonry-grid-sizer').width();
                masonry.waitForImages(function() {
                    masonry.isotope({
                        layoutMode: 'packery',
                        itemSelector: '.eltdf-item-space',
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.eltdf-masonry-grid-sizer',
                            gutter: '.eltdf-masonry-grid-gutter'
                        }
                    });
                    if (thisHolder.find('.eltdf-fixed-masonry-item').length || thisHolder.hasClass('eltdf-fixed-masonry-items')) {
                        setFixedImageProportionSize(masonry, masonry.find('.eltdf-item-space'), size, true);
                    }
                    setTimeout(function() {
                        eltdfInitParallax();
                    }, 600);
                    masonry.isotope('layout').css('opacity', 1);
                });
            });
        }
    }

    function setFixedImageProportionSize(container, item, size, isFixedEnabled) {
        if (container.hasClass('eltdf-masonry-images-fixed') || isFixedEnabled === true) {
            var padding = parseInt(item.css('paddingLeft'), 10),
                newSize = size - 2 * padding,
                defaultMasonryItem = container.find('.eltdf-masonry-size-small'),
                largeWidthMasonryItem = container.find('.eltdf-masonry-size-large-width'),
                largeHeightMasonryItem = container.find('.eltdf-masonry-size-large-height'),
                largeWidthHeightMasonryItem = container.find('.eltdf-masonry-size-large-width-height');
            defaultMasonryItem.css('height', newSize);
            largeHeightMasonryItem.css('height', Math.round(2 * (newSize + padding)));
            if (eltdf.windowWidth > 680) {
                largeWidthMasonryItem.css('height', newSize);
                largeWidthHeightMasonryItem.css('height', Math.round(2 * (newSize + padding)));
            } else {
                largeWidthMasonryItem.css('height', Math.round(newSize / 2));
                largeWidthHeightMasonryItem.css('height', newSize);
            }
        }
    }
    var eltdfIconWithHover = function() {
        var icons = $('.eltdf-icon-has-hover');
        var iconHoverColor = function(icon) {
            if (typeof icon.data('hover-color') !== 'undefined') {
                var changeIconColor = function(event) {
                    event.data.icon.css('color', event.data.color);
                };
                var hoverColor = icon.data('hover-color'),
                    originalColor = icon.css('color');
                if (hoverColor !== '') {
                    icon.on('mouseenter', {
                        icon: icon,
                        color: hoverColor
                    }, changeIconColor);
                    icon.on('mouseleave', {
                        icon: icon,
                        color: originalColor
                    }, changeIconColor);
                }
            }
        };
        return {
            init: function() {
                if (icons.length) {
                    icons.each(function() {
                        iconHoverColor($(this));
                    });
                }
            }
        };
    };

    function eltdfInitParallax() {
        var parallaxHolder = $('.eltdf-parallax-row-holder');
        if (parallaxHolder.length) {
            parallaxHolder.each(function() {
                var parallaxElement = $(this),
                    image = parallaxElement.data('parallax-bg-image'),
                    speed = parallaxElement.data('parallax-bg-speed') * 0.4,
                    height = 0;
                if (typeof parallaxElement.data('parallax-bg-height') !== 'undefined' && parallaxElement.data('parallax-bg-height') !== false) {
                    height = parseInt(parallaxElement.data('parallax-bg-height'));
                }
                parallaxElement.css({
                    'background-image': 'url(' + image + ')'
                });
                if (height > 0) {
                    parallaxElement.css({
                        'min-height': height + 'px',
                        'height': height + 'px'
                    });
                }
                parallaxElement.parallax('50%', speed);
            });
        }
    }

    function eltdfStickySidebarWidget() {
        var sswHolder = $('.eltdf-widget-sticky-sidebar'),
            headerHolder = $('.eltdf-page-header'),
            headerHeight = headerHolder.length ? headerHolder.outerHeight() : 0,
            widgetTopOffset = 0,
            widgetTopPosition = 0,
            sidebarHeight = 0,
            sidebarWidth = 0,
            objectsCollection = [];

        function addObjectItems() {
            if (sswHolder.length) {
                sswHolder.each(function() {
                    var thisSswHolder = $(this),
                        mainSidebarHolder = thisSswHolder.parents('aside.eltdf-sidebar'),
                        widgetiseSidebarHolder = thisSswHolder.parents('.wpb_widgetised_column'),
                        sidebarHolder = '',
                        sidebarHolderHeight = 0;
                    widgetTopOffset = thisSswHolder.offset().top;
                    widgetTopPosition = thisSswHolder.position().top;
                    sidebarHeight = 0;
                    sidebarWidth = 0;
                    if (mainSidebarHolder.length) {
                        sidebarHeight = mainSidebarHolder.outerHeight();
                        sidebarWidth = mainSidebarHolder.outerWidth();
                        sidebarHolder = mainSidebarHolder;
                        sidebarHolderHeight = mainSidebarHolder.parent().parent().outerHeight();
                        var blogHolder = mainSidebarHolder.parent().parent().find('.eltdf-blog-holder');
                        if (blogHolder.length) {
                            sidebarHolderHeight -= parseInt(blogHolder.css('marginBottom'));
                        }
                    } else if (widgetiseSidebarHolder.length) {
                        sidebarHeight = widgetiseSidebarHolder.outerHeight();
                        sidebarWidth = widgetiseSidebarHolder.outerWidth();
                        sidebarHolder = widgetiseSidebarHolder;
                        sidebarHolderHeight = widgetiseSidebarHolder.parents('.vc_row').outerHeight();
                    }
                    objectsCollection.push({
                        'object': thisSswHolder,
                        'offset': widgetTopOffset,
                        'position': widgetTopPosition,
                        'height': sidebarHeight,
                        'width': sidebarWidth,
                        'sidebarHolder': sidebarHolder,
                        'sidebarHolderHeight': sidebarHolderHeight
                    });
                });
            }
        }

        function initStickySidebarWidget() {
            if (objectsCollection.length) {
                $.each(objectsCollection, function(i) {
                    var thisSswHolder = objectsCollection[i].object,
                        thisWidgetTopOffset = objectsCollection[i].offset,
                        thisWidgetTopPosition = objectsCollection[i].position,
                        thisSidebarHeight = objectsCollection[i].height,
                        thisSidebarWidth = objectsCollection[i].width,
                        thisSidebarHolder = objectsCollection[i].sidebarHolder,
                        thisSidebarHolderHeight = objectsCollection[i].sidebarHolderHeight;
                    if (eltdf.body.hasClass('eltdf-fixed-on-scroll')) {
                        var fixedHeader = $('.eltdf-fixed-wrapper.fixed');
                        if (fixedHeader.length) {
                            headerHeight = fixedHeader.outerHeight() + eltdfGlobalVars.vars.eltdfAddForAdminBar;
                        }
                    } else if (eltdf.body.hasClass('eltdf-no-behavior')) {
                        headerHeight = eltdfGlobalVars.vars.eltdfAddForAdminBar;
                    }
                    if (eltdf.windowWidth > 1024 && thisSidebarHolder.length) {
                        var sidebarPosition = -(thisWidgetTopPosition - headerHeight),
                            sidebarHeight = thisSidebarHeight - thisWidgetTopPosition - 40;
                        var rowSectionEndInViewport = thisSidebarHolderHeight + thisWidgetTopOffset - headerHeight - thisWidgetTopPosition - eltdfGlobalVars.vars.eltdfTopBarHeight;
                        if ((eltdf.scroll >= thisWidgetTopOffset - headerHeight) && thisSidebarHeight < thisSidebarHolderHeight) {
                            if (thisSidebarHolder.hasClass('eltdf-sticky-sidebar-appeared')) {
                                thisSidebarHolder.css({
                                    'top': sidebarPosition + 'px'
                                });
                            } else {
                                thisSidebarHolder.addClass('eltdf-sticky-sidebar-appeared').css({
                                    'position': 'fixed',
                                    'top': sidebarPosition + 'px',
                                    'width': thisSidebarWidth,
                                    'margin-top': '-10px'
                                }).animate({
                                    'margin-top': '0'
                                }, 200);
                            }
                            if (eltdf.scroll + sidebarHeight >= rowSectionEndInViewport) {
                                var absBottomPosition = thisSidebarHolderHeight - sidebarHeight + sidebarPosition - headerHeight;
                                thisSidebarHolder.css({
                                    'position': 'absolute',
                                    'top': absBottomPosition + 'px'
                                });
                            } else {
                                if (thisSidebarHolder.hasClass('eltdf-sticky-sidebar-appeared')) {
                                    thisSidebarHolder.css({
                                        'position': 'fixed',
                                        'top': sidebarPosition + 'px'
                                    });
                                }
                            }
                        } else {
                            thisSidebarHolder.removeClass('eltdf-sticky-sidebar-appeared').css({
                                'position': 'relative',
                                'top': '0',
                                'width': 'auto'
                            });
                        }
                    } else {
                        thisSidebarHolder.removeClass('eltdf-sticky-sidebar-appeared').css({
                            'position': 'relative',
                            'top': '0',
                            'width': 'auto'
                        });
                    }
                });
            }
        }
        return {
            init: function() {
                addObjectItems();
                initStickySidebarWidget();
                $(window).scroll(function() {
                    initStickySidebarWidget();
                });
            },
            reInit: initStickySidebarWidget
        };
    }

    function eltdfOwlSlider() {
        var sliders = $('.eltdf-owl-slider');
        if (sliders.length) {
            sliders.each(function() {
                var slider = $(this),
                    owlSlider = $(this),
                    slideItemsNumber = slider.children().length,
                    numberOfItems = 1,
                    loop = true,
                    autoplay = true,
                    autoplayHoverPause = true,
                    sliderSpeed = 5000,
                    sliderSpeedAnimation = 600,
                    margin = 0,
                    responsiveMargin = 0,
                    responsiveMargin1 = 0,
                    stagePadding = 0,
                    stagePaddingEnabled = false,
                    center = false,
                    autoWidth = false,
                    animateInClass = false,
                    animateOutClass = false,
                    navigation = true,
                    pagination = false,
                    thumbnail = false,
                    thumbnailSlider, sliderIsCPTList = !!slider.hasClass('eltdf-list-is-slider'),
                    sliderDataHolder = sliderIsCPTList ? slider.parent() : slider;
                if (typeof slider.data('number-of-items') !== 'undefined' && slider.data('number-of-items') !== false && !sliderIsCPTList) {
                    numberOfItems = slider.data('number-of-items');
                }
                if (typeof sliderDataHolder.data('number-of-columns') !== 'undefined' && sliderDataHolder.data('number-of-columns') !== false && sliderIsCPTList) {
                    switch (sliderDataHolder.data('number-of-columns')) {
                        case 'one':
                            numberOfItems = 1;
                            break;
                        case 'two':
                            numberOfItems = 2;
                            break;
                        case 'three':
                            numberOfItems = 3;
                            break;
                        case 'four':
                            numberOfItems = 4;
                            break;
                        case 'five':
                            numberOfItems = 5;
                            break;
                        case 'six':
                            numberOfItems = 6;
                            break;
                        default:
                            numberOfItems = 4;
                            break;
                    }
                }
                if (sliderDataHolder.data('enable-loop') === 'no') {
                    loop = false;
                }
                if (sliderDataHolder.data('enable-autoplay') === 'no') {
                    autoplay = false;
                }
                if (sliderDataHolder.data('enable-autoplay-hover-pause') === 'no') {
                    autoplayHoverPause = false;
                }
                if (typeof sliderDataHolder.data('slider-speed') !== 'undefined' && sliderDataHolder.data('slider-speed') !== false) {
                    sliderSpeed = sliderDataHolder.data('slider-speed');
                }
                if (typeof sliderDataHolder.data('slider-speed-animation') !== 'undefined' && sliderDataHolder.data('slider-speed-animation') !== false) {
                    sliderSpeedAnimation = sliderDataHolder.data('slider-speed-animation');
                }
                if (typeof sliderDataHolder.data('slider-margin') !== 'undefined' && sliderDataHolder.data('slider-margin') !== false) {
                    if (sliderDataHolder.data('slider-margin') === 'no') {
                        margin = 0;
                    } else {
                        margin = sliderDataHolder.data('slider-margin');
                    }
                } else {
                    if (slider.parent().hasClass('eltdf-huge-space')) {
                        margin = 60;
                    } else if (slider.parent().hasClass('eltdf-large-space')) {
                        margin = 50;
                    } else if (slider.parent().hasClass('eltdf-medium-space')) {
                        margin = 40;
                    } else if (slider.parent().hasClass('eltdf-normal-space')) {
                        margin = 30;
                    } else if (slider.parent().hasClass('eltdf-small-space')) {
                        margin = 20;
                    } else if (slider.parent().hasClass('eltdf-tiny-space')) {
                        margin = 10;
                    }
                }
                if (sliderDataHolder.data('slider-padding') === 'yes') {
                    stagePaddingEnabled = true;
                    stagePadding = parseInt(slider.outerWidth() * 0.28);
                    margin = 50;
                }
                if (sliderDataHolder.data('enable-center') === 'yes') {
                    center = true;
                }
                if (sliderDataHolder.data('enable-auto-width') === 'yes') {
                    autoWidth = true;
                }
                if (typeof sliderDataHolder.data('slider-animate-in') !== 'undefined' && sliderDataHolder.data('slider-animate-in') !== false) {
                    animateInClass = sliderDataHolder.data('slider-animate-in');
                }
                if (typeof sliderDataHolder.data('slider-animate-out') !== 'undefined' && sliderDataHolder.data('slider-animate-out') !== false) {
                    animateOutClass = sliderDataHolder.data('slider-animate-out');
                }
                if (sliderDataHolder.data('enable-navigation') === 'no') {
                    navigation = false;
                }
                if (sliderDataHolder.data('enable-pagination') === 'yes') {
                    pagination = true;
                }
                if (sliderDataHolder.data('enable-thumbnail') === 'yes') {
                    thumbnail = true;
                }
                if (thumbnail && !pagination) {
                    pagination = true;
                    owlSlider.addClass('eltdf-slider-hide-pagination');
                }
                if (navigation && pagination) {
                    slider.addClass('eltdf-slider-has-both-nav');
                }
                if (slideItemsNumber <= 1) {
                    loop = false;
                    autoplay = false;
                    navigation = false;
                    pagination = false;
                }
                var responsiveNumberOfItems1 = 1,
                    responsiveNumberOfItems2 = 2,
                    responsiveNumberOfItems3 = 3,
                    responsiveNumberOfItems4 = numberOfItems,
                    responsiveNumberOfItems5 = numberOfItems;
                if (numberOfItems < 3) {
                    responsiveNumberOfItems2 = numberOfItems;
                    responsiveNumberOfItems3 = numberOfItems;
                }
                if (numberOfItems > 4) {
                    responsiveNumberOfItems4 = 4;
                }
                if (numberOfItems > 5) {
                    responsiveNumberOfItems5 = 5;
                }
                if (stagePaddingEnabled || margin > 30) {
                    responsiveMargin = 20;
                    responsiveMargin1 = 30;
                }
                if (margin > 0 && margin <= 30) {
                    responsiveMargin = margin;
                    responsiveMargin1 = margin;
                }
                slider.waitForImages(function() {
                    owlSlider = slider.owlCarousel({
                        items: numberOfItems,
                        loop: loop,
                        autoplay: autoplay,
                        autoplayHoverPause: autoplayHoverPause,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        margin: margin,
                        stagePadding: stagePadding,
                        center: center,
                        autoWidth: autoWidth,
                        animateIn: animateInClass,
                        animateOut: animateOutClass,
                        dots: pagination,
                        nav: navigation,
                        navText: ['<span class="eltdf-prev-icon ' + eltdfGlobalVars.vars.sliderNavPrevArrow + '"></span>', '<span class="eltdf-next-icon ' + eltdfGlobalVars.vars.sliderNavNextArrow + '"></span>'],
                        responsive: {
                            0: {
                                items: responsiveNumberOfItems1,
                                margin: responsiveMargin,
                                stagePadding: 0,
                                center: false,
                                autoWidth: false
                            },
                            681: {
                                items: responsiveNumberOfItems2,
                                margin: responsiveMargin1
                            },
                            769: {
                                items: responsiveNumberOfItems3,
                                margin: responsiveMargin1
                            },
                            1025: {
                                items: responsiveNumberOfItems4
                            },
                            1281: {
                                items: responsiveNumberOfItems5
                            },
                            1367: {
                                items: numberOfItems
                            }
                        },
                        onInitialize: function() {
                            slider.css('visibility', 'visible');
                            eltdfInitParallax();
                            if (slider.find('iframe').length || slider.find('video').length) {
                                setTimeout(function() {
                                    eltdfSelfHostedVideoSize();
                                    eltdfFluidVideo();
                                }, 500);
                            }
                            if (thumbnail) {
                                thumbnailSlider.find('.eltdf-slider-thumbnail-item:first-child').addClass('active');
                            }
                        },
                        onRefreshed: function() {
                            if (autoWidth === true) {
                                var oldSize = parseInt(slider.find('.owl-stage').css('width'));
                                slider.find('.owl-stage').css('width', (oldSize + 1) + 'px');
                            }
                        },
                        onTranslate: function(e) {
                            if (thumbnail) {
                                var index = e.page.index + 1;
                                thumbnailSlider.find('.eltdf-slider-thumbnail-item.active').removeClass('active');
                                thumbnailSlider.find('.eltdf-slider-thumbnail-item:nth-child(' + index + ')').addClass('active');
                            }
                        },
                        onDrag: function(e) {
                            if (eltdf.body.hasClass('eltdf-smooth-page-transitions-fadeout')) {
                                var sliderIsMoving = e.isTrigger > 0;
                                if (sliderIsMoving) {
                                    slider.addClass('eltdf-slider-is-moving');
                                }
                            }
                        },
                        onDragged: function() {
                            if (eltdf.body.hasClass('eltdf-smooth-page-transitions-fadeout') && slider.hasClass('eltdf-slider-is-moving')) {
                                setTimeout(function() {
                                    slider.removeClass('eltdf-slider-is-moving');
                                }, 500);
                            }
                        }
                    });
                });
                if (thumbnail) {
                    thumbnailSlider = slider.parent().find('.eltdf-slider-thumbnail');
                    var numberOfThumbnails = parseInt(thumbnailSlider.data('thumbnail-count'));
                    var numberOfThumbnailsClass = '';
                    switch (numberOfThumbnails % 6) {
                        case 2:
                            numberOfThumbnailsClass = 'two';
                            break;
                        case 3:
                            numberOfThumbnailsClass = 'three';
                            break;
                        case 4:
                            numberOfThumbnailsClass = 'four';
                            break;
                        case 5:
                            numberOfThumbnailsClass = 'five';
                            break;
                        case 0:
                            numberOfThumbnailsClass = 'six';
                            break;
                        default:
                            numberOfThumbnailsClass = 'six';
                            break;
                    }
                    if (numberOfThumbnailsClass !== '') {
                        thumbnailSlider.addClass('eltdf-slider-columns-' + numberOfThumbnailsClass);
                    }
                    thumbnailSlider.find('.eltdf-slider-thumbnail-item').on('click', function() {
                        $(this).siblings('.active').removeClass('active');
                        $(this).addClass('active');
                        owlSlider.trigger('to.owl.carousel', [$(this).index(), sliderSpeedAnimation]);
                    });
                }
            });
        }
    }

    function eltdfDashboardForm() {
        var forms = $('.eltdf-dashboard-form');
        if (forms.length) {
            forms.each(function() {
                var thisForm = $(this),
                    btnText = thisForm.find('button.eltdf-dashboard-form-button'),
                    updatingBtnText = btnText.data('updating-text'),
                    updatedBtnText = btnText.data('updated-text'),
                    actionName = thisForm.data('action');
                thisForm.on('submit', function(e) {
                    e.preventDefault();
                    var prevBtnText = btnText.html(),
                        gallery = $(this).find('.eltdf-dashboard-gallery-upload-hidden'),
                        namesArray = [];
                    btnText.html(updatingBtnText);
                    var formData = new FormData();
                    gallery.each(function() {
                        var thisGallery = $(this),
                            thisName = thisGallery.attr('name'),
                            thisRepeaterID = thisGallery.attr('id'),
                            thisFiles = thisGallery[0].files,
                            newName;
                        if (thisName.indexOf("[") > -1) {
                            newName = thisName.substring(0, thisName.indexOf("[")) + '_eltdf_regarray_';
                            var firstIndex = thisRepeaterID.indexOf('['),
                                lastIndex = thisRepeaterID.indexOf(']'),
                                index = thisRepeaterID.substring(firstIndex + 1, lastIndex);
                            namesArray.push(newName);
                            newName = newName + index + '_';
                        } else {
                            newName = thisName + '_eltdf_reg_';
                        }
                        if (thisFiles.length === 0) {
                            formData.append(newName, new File([""], "eltdf-dummy-file.txt", {
                                type: "text/plain"
                            }));
                        }
                        for (var i = 0; i < thisFiles.length; i++) {
                            var allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
                            if (thisFiles[i].name.match(/\./g).length === 1 && $.inArray(thisFiles[i].type, allowedTypes) !== -1) {
                                formData.append(newName + i, thisFiles[i]);
                            }
                        }
                    });
                    formData.append('action', actionName);
                    var otherData = $(this).serialize();
                    formData.append('data', otherData);
                    $.ajax({
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        processData: false,
                        url: eltdfGlobalVars.vars.eltdfAjaxUrl,
                        success: function(data) {
                            var response;
                            response = JSON.parse(data);
                            eltdf.modules.socialLogin.eltdfRenderAjaxResponseMessage(response);
                            if (response.status === 'success') {
                                btnText.html(updatedBtnText);
                                window.location = response.redirect;
                            } else {
                                btnText.html(prevBtnText);
                            }
                        }
                    });
                    return false;
                });
            });
        }
    }

    function eltdfInitPerfectScrollbar() {
        var defaultParams = {
            wheelSpeed: 0.6,
            suppressScrollX: true
        };
        var eltdfInitScroll = function(holder) {
            var ps = new PerfectScrollbar(holder[0], defaultParams);
            $(window).resize(function() {
                ps.update();
            });
        };
        return {
            init: function(holder) {
                if (holder.length) {
                    eltdfInitScroll(holder);
                }
            }
        };
    }

    function eltdfRowShrink() {
        if (eltdf.windowWidth > 1200) {
            var vcRow = $('.eltdf-shrink-row');
            if (vcRow.length) {
                vcRow.each(function(i) {
                    var thisRow = $(this);
                    thisRow.append('<div class="eltdf-row-hider-left"></div><div class="eltdf-row-hider-right"></div>').css('display', 'block');
                    var leftReveal = thisRow.find('.eltdf-row-hider-left'),
                        rightReveal = thisRow.find('.eltdf-row-hider-right'),
                        revealImageHolderOffset = thisRow.offset().top;
                    $(window).scroll(function() {
                        var scrollOffset = eltdf.scroll + window.innerHeight,
                            scrollBelow = scrollOffset >= revealImageHolderOffset + window.innerHeight,
                            scrollAbove = scrollOffset <= revealImageHolderOffset,
                            scrollOver = (scrollOffset < revealImageHolderOffset + window.innerHeight) && (scrollOffset > revealImageHolderOffset);
                        if (scrollOver) {
                            var gama = (scrollOffset - revealImageHolderOffset) / 600;
                            var delta = (gama < 1) ? gama : 1;
                            leftReveal.css('transform', 'scaleX(' + delta + ')');
                            rightReveal.css('transform', 'scaleX(' + delta + ')');
                        } else if (scrollAbove) {
                            leftReveal.css('transform', 'scaleX(0)');
                            rightReveal.css('transform', 'scaleX(0)');
                        } else if (scrollBelow) {
                            leftReveal.css('transform', 'scaleX(1)');
                            rightReveal.css('transform', 'scaleX(1)');
                        }
                    });
                });
            }
        }
    }

    function eltdfLettersPop() {
        if (eltdf.windowWidth > 767) {
            var vcRow = $('.eltdf-bl-holder');
            if (vcRow.length) {
                vcRow.each(function() {
                    var thisRow = $(this),
                        rowBtmOffset = thisRow.offset().top + thisRow.outerHeight(),
                        theseLetters = thisRow.find('.wpb_content_element');
                    $(window).scroll(function() {
                        var scrollOffset = eltdf.scroll + window.innerHeight,
                            scrollBelow = scrollOffset >= rowBtmOffset,
                            scrollAbove = scrollOffset <= rowBtmOffset,
                            scrollOver = (scrollOffset < rowBtmOffset) && (scrollOffset > rowBtmOffset);
                        if (scrollOver) {
                            var gama = (scrollOffset - rowBtmOffset) / 500;
                            var delta = (gama < 1) ? gama : 1;
                            theseLetters.css('transform', 'scaleY(' + delta + ')');
                        } else if (scrollAbove) {
                            theseLetters.css('transform', 'scaleY(0)');
                        } else if (scrollBelow) {
                            theseLetters.css('transform', 'scaleY(1)');
                        }
                    });
                });
            }
        }
    }
})(jQuery);
(function($) {
    "use strict";
    var blog = {};
    eltdf.modules.blog = blog;
    blog.eltdfOnDocumentReady = eltdfOnDocumentReady;
    blog.eltdfOnWindowLoad = eltdfOnWindowLoad;
    blog.eltdfOnWindowScroll = eltdfOnWindowScroll;
    $(document).ready(eltdfOnDocumentReady);
    $(window).on('load', eltdfOnWindowLoad);
    $(window).scroll(eltdfOnWindowScroll);

    function eltdfOnDocumentReady() {
        eltdfInitAudioPlayer();
    }

    function eltdfOnWindowLoad() {
        eltdfInitBlogPagination().init();
    }

    function eltdfOnWindowScroll() {
        eltdfInitBlogPagination().scroll();
    }

    function eltdfInitAudioPlayer() {
        var players = $('audio.eltdf-blog-audio');
        if (players.length) {
            players.mediaelementplayer({
                audioWidth: '100%'
            });
        }
    }

    function eltdfInitBlogPagination() {
        var holder = $('.eltdf-blog-holder');
        var initLoadMorePagination = function(thisHolder) {
            var loadMoreButton = thisHolder.find('.eltdf-blog-pag-load-more a');
            loadMoreButton.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                initMainPagFunctionality(thisHolder);
            });
        };
        var initInifiteScrollPagination = function(thisHolder) {
            var blogListHeight = thisHolder.outerHeight(),
                blogListTopOffest = thisHolder.offset().top,
                blogListPosition = blogListHeight + blogListTopOffest - eltdfGlobalVars.vars.eltdfAddForAdminBar;
            if (!thisHolder.hasClass('eltdf-blog-pagination-infinite-scroll-started') && eltdf.scroll + eltdf.windowHeight > blogListPosition) {
                initMainPagFunctionality(thisHolder);
            }
        };
        var initMainPagFunctionality = function(thisHolder) {
            var thisHolderInner = thisHolder.children('.eltdf-blog-holder-inner'),
                nextPage, maxNumPages;
            if (typeof thisHolder.data('max-num-pages') !== 'undefined' && thisHolder.data('max-num-pages') !== false) {
                maxNumPages = thisHolder.data('max-num-pages');
            }
            if (thisHolder.hasClass('eltdf-blog-pagination-infinite-scroll')) {
                thisHolder.addClass('eltdf-blog-pagination-infinite-scroll-started');
            }
            var loadMoreDatta = eltdf.modules.common.getLoadMoreData(thisHolder),
                loadingItem = thisHolder.find('.eltdf-blog-pag-loading');
            nextPage = loadMoreDatta.nextPage;
            if (nextPage <= maxNumPages) {
                loadingItem.addClass('eltdf-showing');
                var ajaxData = eltdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'onea_elated_blog_load_more');
                $.ajax({
                    type: 'POST',
                    data: ajaxData,
                    url: eltdfGlobalVars.vars.eltdfAjaxUrl,
                    success: function(data) {
                        nextPage++;
                        thisHolder.data('next-page', nextPage);
                        var response = $.parseJSON(data),
                            responseHtml = response.html;
                        thisHolder.waitForImages(function() {
                            if (thisHolder.hasClass('eltdf-grid-masonry-list')) {
                                eltdfInitAppendIsotopeNewContent(thisHolderInner, loadingItem, responseHtml);
                                eltdf.modules.common.setFixedImageProportionSize(thisHolder, thisHolder.find('article'), thisHolderInner.find('.eltdf-masonry-grid-sizer').width());
                            } else {
                                eltdfInitAppendGalleryNewContent(thisHolderInner, loadingItem, responseHtml);
                            }
                            setTimeout(function() {
                                eltdfInitAudioPlayer();
                                eltdf.modules.common.eltdfOwlSlider();
                                eltdf.modules.common.eltdfFluidVideo();
                                eltdf.modules.common.eltdfInitSelfHostedVideoPlayer();
                                eltdf.modules.common.eltdfSelfHostedVideoSize();
                                if (typeof eltdf.modules.common.eltdfStickySidebarWidget === 'function') {
                                    eltdf.modules.common.eltdfStickySidebarWidget().reInit();
                                }
                                $(document.body).trigger('blog_list_load_more_trigger');
                            }, 400);
                        });
                        if (thisHolder.hasClass('eltdf-blog-pagination-infinite-scroll-started')) {
                            thisHolder.removeClass('eltdf-blog-pagination-infinite-scroll-started');
                        }
                    }
                });
            }
            if (nextPage === maxNumPages) {
                thisHolder.find('.eltdf-blog-pag-load-more').hide();
            }
        };
        var eltdfInitAppendIsotopeNewContent = function(thisHolderInner, loadingItem, responseHtml) {
            thisHolderInner.append(responseHtml).isotope('reloadItems').isotope({
                sortBy: 'original-order'
            });
            loadingItem.removeClass('eltdf-showing');
            setTimeout(function() {
                thisHolderInner.isotope('layout');
            }, 600);
        };
        var eltdfInitAppendGalleryNewContent = function(thisHolderInner, loadingItem, responseHtml) {
            loadingItem.removeClass('eltdf-showing');
            thisHolderInner.append(responseHtml);
        };
        return {
            init: function() {
                if (holder.length) {
                    holder.each(function() {
                        var thisHolder = $(this);
                        if (thisHolder.hasClass('eltdf-blog-pagination-load-more')) {
                            initLoadMorePagination(thisHolder);
                        }
                        if (thisHolder.hasClass('eltdf-blog-pagination-infinite-scroll')) {
                            initInifiteScrollPagination(thisHolder);
                        }
                    });
                }
            },
            scroll: function() {
                if (holder.length) {
                    holder.each(function() {
                        var thisHolder = $(this);
                        if (thisHolder.hasClass('eltdf-blog-pagination-infinite-scroll')) {
                            initInifiteScrollPagination(thisHolder);
                        }
                    });
                }
            }
        };
    }
})(jQuery);
(function($) {
    "use strict";
    var footer = {};
    eltdf.modules.footer = footer;
    footer.eltdfOnWindowLoad = eltdfOnWindowLoad;
    $(window).on('load', eltdfOnWindowLoad);

    function eltdfOnWindowLoad() {
        uncoveringFooter();
    }

    function uncoveringFooter() {
        var uncoverFooter = $('body:not(.error404) .eltdf-footer-uncover');
        if (uncoverFooter.length && !eltdf.htmlEl.hasClass('touch')) {
            var footer = $('footer'),
                footerHeight = footer.outerHeight(),
                content = $('.eltdf-content');
            var uncoveringCalcs = function() {
                content.css('margin-bottom', footerHeight);
                footer.css('height', footerHeight);
            };
            uncoveringCalcs();
            $(window).resize(function() {
                footerHeight = footer.find('.eltdf-footer-inner').outerHeight();
                uncoveringCalcs();
            });
        }
    }
})(jQuery);
(function($) {
    "use strict";
    var header = {};
    eltdf.modules.header = header;
    header.eltdfSetDropDownMenuPosition = eltdfSetDropDownMenuPosition;
    header.eltdfSetDropDownWideMenuPosition = eltdfSetDropDownWideMenuPosition;
    header.eltdfOnDocumentReady = eltdfOnDocumentReady;
    header.eltdfOnWindowLoad = eltdfOnWindowLoad;
    $(document).ready(eltdfOnDocumentReady);
    $(window).on('load', eltdfOnWindowLoad);

    function eltdfOnDocumentReady() {
        eltdfSetDropDownMenuPosition();
        setTimeout(function() {
            eltdfDropDownMenu();
        }, 100);
    }

    function eltdfOnWindowLoad() {
        eltdfSetDropDownWideMenuPosition();
    }

    function eltdfSetDropDownMenuPosition() {
        var menuItems = $('.eltdf-drop-down > ul > li.narrow.menu-item-has-children');
        if (menuItems.length) {
            menuItems.each(function(i) {
                var thisItem = $(this),
                    menuItemPosition = thisItem.offset().left,
                    dropdownHolder = thisItem.find('.second'),
                    dropdownMenuItem = dropdownHolder.find('.inner ul'),
                    dropdownMenuWidth = dropdownMenuItem.outerWidth(),
                    menuItemFromLeft = eltdf.windowWidth - menuItemPosition;
                if (eltdf.body.hasClass('eltdf-boxed')) {
                    menuItemFromLeft = eltdf.boxedLayoutWidth - (menuItemPosition - (eltdf.windowWidth - eltdf.boxedLayoutWidth) / 2);
                }
                var dropDownMenuFromLeft;
                if (thisItem.find('li.sub').length > 0) {
                    dropDownMenuFromLeft = menuItemFromLeft - dropdownMenuWidth;
                }
                dropdownHolder.removeClass('right');
                dropdownMenuItem.removeClass('right');
                if (menuItemFromLeft < dropdownMenuWidth || dropDownMenuFromLeft < dropdownMenuWidth) {
                    dropdownHolder.addClass('right');
                    dropdownMenuItem.addClass('right');
                }
            });
        }
    }

    function eltdfSetDropDownWideMenuPosition() {
        var menuItems = $(".eltdf-drop-down > ul > li.wide");
        if (menuItems.length) {
            menuItems.each(function(i) {
                var menuItem = $(this);
                var menuItemSubMenu = menuItem.find('.second');
                if (menuItemSubMenu.length && !menuItemSubMenu.hasClass('left_position') && !menuItemSubMenu.hasClass('right_position')) {
                    menuItemSubMenu.css('left', 0);
                    var left_position = menuItemSubMenu.offset().left;
                    if (eltdf.body.hasClass('eltdf-boxed')) {
                        var boxedWidth = $('.eltdf-boxed .eltdf-wrapper .eltdf-wrapper-inner').outerWidth();
                        left_position = left_position - (eltdf.windowWidth - boxedWidth) / 2;
                        menuItemSubMenu.css({
                            'left': -left_position,
                            'width': boxedWidth
                        });
                    } else if (eltdf.body.hasClass('eltdf-wide-dropdown-menu-in-grid')) {
                        menuItemSubMenu.css({
                            'left': -left_position + (eltdf.windowWidth - eltdf.gridWidth()) / 2,
                            'width': eltdf.gridWidth()
                        });
                    } else {
                        menuItemSubMenu.css({
                            'left': -left_position,
                            'width': eltdf.windowWidth
                        });
                    }
                }
            });
        }
    }

    function eltdfDropDownMenu() {
        var menu_items = $('.eltdf-drop-down > ul > li');
        menu_items.each(function() {
            var thisItem = $(this);
            if (thisItem.find('.second').length) {
                thisItem.waitForImages(function() {
                    var dropDownHolder = thisItem.find('.second'),
                        dropDownHolderHeight = !eltdf.menuDropdownHeightSet ? dropDownHolder.outerHeight() : 0;
                    if (thisItem.hasClass('wide')) {
                        var tallest = 0,
                            dropDownSecondItem = dropDownHolder.find('> .inner > ul > li');
                        dropDownSecondItem.each(function() {
                            var thisHeight = $(this).outerHeight();
                            if (thisHeight > tallest) {
                                tallest = thisHeight;
                            }
                        });
                        dropDownSecondItem.css('height', '').height(tallest);
                        if (!eltdf.menuDropdownHeightSet) {
                            dropDownHolderHeight = dropDownHolder.outerHeight();
                        }
                    }
                    if (!eltdf.menuDropdownHeightSet) {
                        dropDownHolder.height(0);
                    }
                    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                        thisItem.on("touchstart mouseenter", function() {
                            dropDownHolder.css({
                                'height': dropDownHolderHeight,
                                'overflow': 'visible',
                                'visibility': 'visible',
                                'opacity': '1'
                            });
                        }).on("mouseleave", function() {
                            dropDownHolder.css({
                                'height': '0px',
                                'overflow': 'hidden',
                                'visibility': 'hidden',
                                'opacity': '0'
                            });
                        });
                    } else {
                        if (eltdf.body.hasClass('eltdf-dropdown-animate-height')) {
                            var animateConfig = {
                                interval: 0,
                                over: function() {
                                    setTimeout(function() {
                                        dropDownHolder.addClass('eltdf-drop-down-start').css({
                                            'visibility': 'visible',
                                            'height': '0',
                                            'opacity': '1'
                                        });
                                        dropDownHolder.stop().animate({
                                            'height': dropDownHolderHeight
                                        }, 400, 'easeInOutQuint', function() {
                                            dropDownHolder.css('overflow', 'visible');
                                        });
                                    }, 100);
                                },
                                timeout: 100,
                                out: function() {
                                    dropDownHolder.stop().animate({
                                        'height': '0',
                                        'opacity': 0
                                    }, 100, function() {
                                        dropDownHolder.css({
                                            'overflow': 'hidden',
                                            'visibility': 'hidden'
                                        });
                                    });
                                    dropDownHolder.removeClass('eltdf-drop-down-start');
                                }
                            };
                            thisItem.hoverIntent(animateConfig);
                        } else {
                            var config = {
                                interval: 0,
                                over: function() {
                                    setTimeout(function() {
                                        dropDownHolder.addClass('eltdf-drop-down-start').stop().css({
                                            'height': dropDownHolderHeight
                                        });
                                    }, 150);
                                },
                                timeout: 150,
                                out: function() {
                                    dropDownHolder.stop().css({
                                        'height': '0'
                                    }).removeClass('eltdf-drop-down-start');
                                }
                            };
                            thisItem.hoverIntent(config);
                        }
                    }
                });
            }
        });
        $('.eltdf-drop-down ul li.wide ul li a').on('click', function(e) {
            if (e.which === 1) {
                var $this = $(this);
                setTimeout(function() {
                    $this.mouseleave();
                }, 500);
            }
        });
        eltdf.menuDropdownHeightSet = true;
    }
})(jQuery);
(function($) {
    'use strict';
    var like = {};
    like.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfLikes();
    }

    function eltdfLikes() {
        $(document).on('click', '.eltdf-like', function() {
            var likeLink = $(this),
                id = likeLink.attr('id'),
                type;
            if (likeLink.hasClass('liked')) {
                return false;
            }
            if (typeof likeLink.data('type') !== 'undefined') {
                type = likeLink.data('type');
            }
            var dataToPass = {
                action: 'onea_elated_like',
                likes_id: id,
                type: type
            };
            var like = $.post(eltdfGlobalVars.vars.eltdfAjaxUrl, dataToPass, function(data) {
                likeLink.html(data).addClass('liked').attr('title', 'You already like this!');
            });
            return false;
        });
    }
})(jQuery);
(function($) {
    "use strict";
    var sidearea = {};
    eltdf.modules.sidearea = sidearea;
    sidearea.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfSideArea();
    }

    function eltdfSideArea() {
        var wrapper = $('.eltdf-wrapper'),
            sideMenu = $('.eltdf-side-menu'),
            sideMenuButtonOpen = $('a.eltdf-side-menu-button-opener'),
            cssClass, slideFromRight = false,
            slideWithContent = false,
            slideUncovered = false;
        if (eltdf.body.hasClass('eltdf-side-menu-slide-from-right')) {
            $('.eltdf-cover').remove();
            cssClass = 'eltdf-right-side-menu-opened';
            wrapper.prepend('<div class="eltdf-cover"/>');
            slideFromRight = true;
        } else if (eltdf.body.hasClass('eltdf-side-menu-slide-with-content')) {
            cssClass = 'eltdf-side-menu-open';
            slideWithContent = true;
        } else if (eltdf.body.hasClass('eltdf-side-area-uncovered-from-content')) {
            cssClass = 'eltdf-right-side-menu-opened';
            slideUncovered = true;
        }
        $('a.eltdf-side-menu-button-opener, a.eltdf-close-side-menu').on('click', function(e) {
            e.preventDefault();
            if (!sideMenuButtonOpen.hasClass('opened')) {
                sideMenuButtonOpen.addClass('opened');
                eltdf.body.addClass(cssClass);
                if (slideFromRight) {
                    $('.eltdf-wrapper .eltdf-cover').on('click', function() {
                        eltdf.body.removeClass('eltdf-right-side-menu-opened');
                        sideMenuButtonOpen.removeClass('opened');
                    });
                }
                if (slideUncovered) {
                    sideMenu.css({
                        'visibility': 'visible'
                    });
                }
                var currentScroll = $(window).scrollTop();
                $(window).scroll(function() {
                    if (Math.abs(eltdf.scroll - currentScroll) > 400) {
                        eltdf.body.removeClass(cssClass);
                        sideMenuButtonOpen.removeClass('opened');
                        if (slideUncovered) {
                            var hideSideMenu = setTimeout(function() {
                                sideMenu.css({
                                    'visibility': 'hidden'
                                });
                                clearTimeout(hideSideMenu);
                            }, 400);
                        }
                    }
                });
            } else {
                sideMenuButtonOpen.removeClass('opened');
                eltdf.body.removeClass(cssClass);
                if (slideUncovered) {
                    var hideSideMenu = setTimeout(function() {
                        sideMenu.css({
                            'visibility': 'hidden'
                        });
                        clearTimeout(hideSideMenu);
                    }, 400);
                }
            }
            if (slideWithContent) {
                e.stopPropagation();
                wrapper.on('click', function() {
                    e.preventDefault();
                    sideMenuButtonOpen.removeClass('opened');
                    eltdf.body.removeClass('eltdf-side-menu-open');
                });
            }
        });
        if (sideMenu.length) {
            eltdf.modules.common.eltdfInitPerfectScrollbar().init(sideMenu);
        }
    }
})(jQuery);
(function($) {
    "use strict";
    var subscribePopup = {};
    eltdf.modules.subscribePopup = subscribePopup;
    subscribePopup.eltdfOnWindowLoad = eltdfOnWindowLoad;
    $(window).on('load', eltdfOnWindowLoad);

    function eltdfOnWindowLoad() {
        eltdfSubscribePopup();
    }

    function eltdfSubscribePopup() {
        var popupOpener = $('.eltdf-subscribe-popup-holder'),
            popupClose = $('.eltdf-sp-close, .eltdf-sp-close-area');
        if (popupOpener.length) {
            var popupPreventHolder = popupOpener.find('.eltdf-sp-prevent'),
                disabledPopup = 'no';
            if (popupPreventHolder.length) {
                var isLocalStorage = popupOpener.hasClass('eltdf-sp-prevent-cookies'),
                    popupPreventInput = popupPreventHolder.find('.eltdf-sp-prevent-input'),
                    preventValue = popupPreventInput.data('value');
                if (isLocalStorage) {
                    disabledPopup = localStorage.getItem('disabledPopup');
                    sessionStorage.removeItem('disabledPopup');
                } else {
                    disabledPopup = sessionStorage.getItem('disabledPopup');
                    localStorage.removeItem('disabledPopup');
                }
                popupPreventHolder.children().on('click', function(e) {
                    if (preventValue !== 'yes') {
                        preventValue = 'yes';
                        popupPreventInput.addClass('eltdf-sp-prevent-clicked').data('value', 'yes');
                    } else {
                        preventValue = 'no';
                        popupPreventInput.removeClass('eltdf-sp-prevent-clicked').data('value', 'no');
                    }
                    if (preventValue === 'yes') {
                        if (isLocalStorage) {
                            localStorage.setItem('disabledPopup', 'yes');
                        } else {
                            sessionStorage.setItem('disabledPopup', 'yes');
                        }
                    } else {
                        if (isLocalStorage) {
                            localStorage.setItem('disabledPopup', 'no');
                        } else {
                            sessionStorage.setItem('disabledPopup', 'no');
                        }
                    }
                });
            }
            if (disabledPopup !== 'yes') {
                if (eltdf.body.hasClass('eltdf-sp-opened')) {
                    eltdf.body.removeClass('eltdf-sp-opened');
                    eltdf.modules.common.eltdfEnableScroll();
                } else {
                    eltdf.body.addClass('eltdf-sp-opened');
                    eltdf.modules.common.eltdfDisableScroll();
                }
                popupClose.on('click', function(e) {
                    e.preventDefault();
                    eltdf.body.removeClass('eltdf-sp-opened');
                    eltdf.modules.common.eltdfEnableScroll();
                });
                $(document).keyup(function(e) {
                    if (e.keyCode === 27) {
                        eltdf.body.removeClass('eltdf-sp-opened');
                        eltdf.modules.common.eltdfEnableScroll();
                    }
                });
            }
        }
    }
})(jQuery);
(function($) {
    "use strict";
    var title = {};
    eltdf.modules.title = title;
    title.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfParallaxTitle();
    }

    function eltdfParallaxTitle() {
        var parallaxBackground = $('.eltdf-title-holder.eltdf-bg-parallax');
        if (parallaxBackground.length > 0 && eltdf.windowWidth > 1024) {
            var parallaxBackgroundWithZoomOut = parallaxBackground.hasClass('eltdf-bg-parallax-zoom-out'),
                titleHeight = parseInt(parallaxBackground.data('height')),
                imageWidth = parseInt(parallaxBackground.data('background-width')),
                parallaxRate = titleHeight / 10000 * 7,
                parallaxYPos = -(eltdf.scroll * parallaxRate),
                adminBarHeight = eltdfGlobalVars.vars.eltdfAddForAdminBar;
            parallaxBackground.css({
                'background-position': 'center ' + (parallaxYPos + adminBarHeight) + 'px'
            });
            if (parallaxBackgroundWithZoomOut) {
                parallaxBackground.css({
                    'background-size': imageWidth - eltdf.scroll + 'px auto'
                });
            }
            $(window).scroll(function() {
                parallaxYPos = -(eltdf.scroll * parallaxRate);
                parallaxBackground.css({
                    'background-position': 'center ' + (parallaxYPos + adminBarHeight) + 'px'
                });
                if (parallaxBackgroundWithZoomOut) {
                    parallaxBackground.css({
                        'background-size': imageWidth - eltdf.scroll + 'px auto'
                    });
                }
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var woocommerce = {};
    eltdf.modules.woocommerce = woocommerce;
    woocommerce.eltdfOnDocumentReady = eltdfOnDocumentReady;
    woocommerce.eltdfOnWindowLoad = eltdfOnWindowLoad;
    $(document).ready(eltdfOnDocumentReady);
    $(window).on('load', eltdfOnWindowLoad);

    function eltdfOnDocumentReady() {
        eltdfInitQuantityButtons();
        eltdfInitSelect2();
        eltdfInitSingleProductLightbox();
        eltdfInitYithSelec2();
    }

    function eltdfOnWindowLoad() {
        eltdfWooCommerceStickySidebar().init();
        eltdfInitProductListAnimatedShortcode();
    }

    function eltdfInitQuantityButtons() {
        $(document).on('click', '.eltdf-quantity-minus, .eltdf-quantity-plus', function(e) {
            e.stopPropagation();
            var button = $(this),
                inputField = button.siblings('.eltdf-quantity-input'),
                step = parseFloat(inputField.data('step')),
                max = parseFloat(inputField.data('max')),
                minus = false,
                inputValue = parseFloat(inputField.val()),
                newInputValue;
            if (button.hasClass('eltdf-quantity-minus')) {
                minus = true;
            }
            if (minus) {
                newInputValue = inputValue - step;
                if (newInputValue >= 1) {
                    inputField.val(newInputValue);
                } else {
                    inputField.val(0);
                }
            } else {
                newInputValue = inputValue + step;
                if (max === undefined) {
                    inputField.val(newInputValue);
                } else {
                    if (newInputValue >= max) {
                        inputField.val(max);
                    } else {
                        inputField.val(newInputValue);
                    }
                }
            }
            inputField.trigger('change');
        });
    }

    function eltdfInitSelect2() {
        var orderByDropDown = $('.woocommerce-ordering .orderby');
        if (orderByDropDown.length) {
            orderByDropDown.select2({
                minimumResultsForSearch: Infinity
            });
        }
        var variableProducts = $('.variations td.value select');
        if (variableProducts.length) {
            variableProducts.select2();
        }
        var dropdownCategories = $('.widget_product_categories select');
        if (dropdownCategories.length) {
            dropdownCategories.select2();
        }
        var shippingCountryCalc = $('#calc_shipping_country');
        if (shippingCountryCalc.length) {
            shippingCountryCalc.select2();
        }
        var shippingStateCalc = $('.cart-collaterals .shipping select#calc_shipping_state');
        if (shippingStateCalc.length) {
            shippingStateCalc.select2();
        }
    }

    function eltdfInitYithSelec2() {
        $(document).on('click', '.yith-quickview-button', function() {
            setTimeout(function() {
                eltdfInitSelect2();
            }, 3000);
        });
    }

    function eltdfInitSingleProductLightbox() {
        var item = $('.eltdf-woo-single-page.eltdf-woo-single-has-pretty-photo .images .woocommerce-product-gallery__image');
        if (item.length) {
            item.children('a').attr('data-rel', 'prettyPhoto[woo_single_pretty_photo]');
            if (typeof eltdf.modules.common.eltdfPrettyPhoto === "function") {
                eltdf.modules.common.eltdfPrettyPhoto();
            }
        }
    }

    function eltdfInitProductListAnimatedShortcode() {
        var productListAnimatedHolder = $('.eltdf-pla-holder:not(.eltdf-pla-animation-disabled)');
        if (productListAnimatedHolder.length) {
            productListAnimatedHolder.each(function() {
                var productList = $(this),
                    productListItem = productList.children('.eltdf-pla-item');
                productList.animate({
                    opacity: 1
                }, 1000, 'easeInOutQuad');
                productListItem.appear(function() {
                    $(this).addClass('eltdf-pla-animated');
                });
            });
        }
    }

    function eltdfWooCommerceStickySidebar() {
        var sswHolder = $('.eltdf-single-product-summary');
        var headerHeightOffset = 0;
        var widgetTopOffset = 0;
        var widgetTopPosition = 0;
        var sidebarHeight = 0;
        var sidebarWidth = 0;
        var objectsCollection = [];

        function addObjectItems() {
            if (sswHolder.length) {
                sswHolder.each(function() {
                    var thisSswHolder = $(this);
                    widgetTopOffset = thisSswHolder.offset().top;
                    widgetTopPosition = thisSswHolder.position().top;
                    sidebarHeight = thisSswHolder.outerHeight();
                    sidebarWidth = thisSswHolder.width();
                    objectsCollection.push({
                        'object': thisSswHolder,
                        'offset': widgetTopOffset,
                        'position': widgetTopPosition,
                        'height': sidebarHeight,
                        'width': sidebarWidth
                    });
                });
            }
        }

        function initStickySidebarWidget() {
            if (objectsCollection.length && eltdf.body.hasClass('eltdf-woo-single-thumb-sticky-info')) {
                $.each(objectsCollection, function(i) {
                    var thisSswHolder = objectsCollection[i].object;
                    var thisWidgetTopOffset = objectsCollection[i].offset;
                    var thisWidgetTopPosition = objectsCollection[i].position;
                    var thisSidebarHeight = objectsCollection[i].height;
                    var thisSidebarWidth = objectsCollection[i].width;
                    if (eltdf.body.hasClass('eltdf-fixed-on-scroll')) {
                        headerHeightOffset = 90;
                        if ($('.eltdf-fixed-wrapper').hasClass('fixed')) {
                            headerHeightOffset = $('.eltdf-fixed-wrapper.fixed').height();
                        }
                    } else {
                        headerHeightOffset = $('.eltdf-page-header').height();
                    }
                    if (eltdf.windowWidth > 1024) {
                        var sidebarPosition = -(thisWidgetTopPosition - headerHeightOffset - eltdfGlobalVars.vars.eltdfAddForAdminBar - 10);
                        var stickySidebarHeight = thisSidebarHeight - thisWidgetTopPosition;
                        var summaryContentTopMargin = parseInt($('.eltdf-single-product-summary').css('margin-top'));
                        var stickySidebarRowHolderHeight = thisSswHolder.parent().outerHeight() - 10 - summaryContentTopMargin - 10;
                        var rowSectionEndInViewport = thisWidgetTopOffset - headerHeightOffset - thisWidgetTopPosition - eltdfGlobalVars.vars.eltdfTopBarHeight + stickySidebarRowHolderHeight;
                        if ((eltdf.scroll >= thisWidgetTopOffset - headerHeightOffset) && thisSidebarHeight < stickySidebarRowHolderHeight) {
                            if (thisSswHolder.children('.summary').hasClass('eltdf-sticky-sidebar-appeared')) {
                                thisSswHolder.children('.summary.eltdf-sticky-sidebar-appeared').css({
                                    'top': sidebarPosition + 'px'
                                });
                            } else {
                                thisSswHolder.children('.summary').addClass('eltdf-sticky-sidebar-appeared').css({
                                    'position': 'fixed',
                                    'top': sidebarPosition + 'px',
                                    'width': thisSidebarWidth,
                                    'margin-top': '-10px'
                                }).animate({
                                    'margin-top': '0'
                                }, 200);
                            }
                            if (eltdf.scroll + stickySidebarHeight >= rowSectionEndInViewport) {
                                thisSswHolder.children('.summary.eltdf-sticky-sidebar-appeared').css({
                                    'position': 'absolute',
                                    'top': stickySidebarRowHolderHeight - stickySidebarHeight + sidebarPosition - headerHeightOffset + 'px'
                                });
                            } else {
                                thisSswHolder.children('.summary.eltdf-sticky-sidebar-appeared').css({
                                    'position': 'fixed',
                                    'top': sidebarPosition + 'px'
                                });
                            }
                        } else {
                            thisSswHolder.children('.summary').removeClass('eltdf-sticky-sidebar-appeared').css({
                                'position': 'relative',
                                'top': '0',
                                'width': 'auto'
                            });
                        }
                    } else {
                        thisSswHolder.children('.summary').removeClass('eltdf-sticky-sidebar-appeared').css({
                            'position': 'relative',
                            'top': '0',
                            'width': 'auto'
                        });
                    }
                });
            }
        }
        return {
            init: function() {
                addObjectItems();
                initStickySidebarWidget();
                $(window).scroll(function() {
                    initStickySidebarWidget();
                });
            },
            reInit: initStickySidebarWidget
        };
    }
})(jQuery);
(function($) {
    "use strict";
    var blogListSC = {};
    eltdf.modules.blogListSC = blogListSC;
    blogListSC.eltdfOnWindowLoad = eltdfOnWindowLoad;
    blogListSC.eltdfOnWindowScroll = eltdfOnWindowScroll;
    $(window).on('load', eltdfOnWindowLoad);
    $(window).scroll(eltdfOnWindowScroll);

    function eltdfOnWindowLoad() {
        eltdfInitBlogListShortcodePagination().init();
    }

    function eltdfOnWindowScroll() {
        eltdfInitBlogListShortcodePagination().scroll();
    }

    function eltdfInitBlogListShortcodePagination() {
        var holder = $('.eltdf-blog-list-holder');
        var initStandardPagination = function(thisHolder) {
            var standardLink = thisHolder.find('.eltdf-bl-standard-pagination li');
            if (standardLink.length) {
                standardLink.each(function() {
                    var thisLink = $(this).children('a'),
                        pagedLink = 1;
                    thisLink.on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (typeof thisLink.data('paged') !== 'undefined' && thisLink.data('paged') !== false) {
                            pagedLink = thisLink.data('paged');
                        }
                        initMainPagFunctionality(thisHolder, pagedLink);
                    });
                });
            }
        };
        var initLoadMorePagination = function(thisHolder) {
            var loadMoreButton = thisHolder.find('.eltdf-blog-pag-load-more a');
            loadMoreButton.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                initMainPagFunctionality(thisHolder);
            });
        };
        var initInifiteScrollPagination = function(thisHolder) {
            var blogListHeight = thisHolder.outerHeight(),
                blogListTopOffest = thisHolder.offset().top,
                blogListPosition = blogListHeight + blogListTopOffest - eltdfGlobalVars.vars.eltdfAddForAdminBar;
            if (!thisHolder.hasClass('eltdf-bl-pag-infinite-scroll-started') && eltdf.scroll + eltdf.windowHeight > blogListPosition) {
                initMainPagFunctionality(thisHolder);
            }
        };
        var initMainPagFunctionality = function(thisHolder, pagedLink) {
            var thisHolderInner = thisHolder.find('.eltdf-blog-list'),
                nextPage, maxNumPages;
            if (typeof thisHolder.data('max-num-pages') !== 'undefined' && thisHolder.data('max-num-pages') !== false) {
                maxNumPages = thisHolder.data('max-num-pages');
            }
            if (thisHolder.hasClass('eltdf-bl-pag-standard-shortcodes')) {
                thisHolder.data('next-page', pagedLink);
            }
            if (thisHolder.hasClass('eltdf-bl-pag-infinite-scroll')) {
                thisHolder.addClass('eltdf-bl-pag-infinite-scroll-started');
            }
            var loadMoreDatta = eltdf.modules.common.getLoadMoreData(thisHolder),
                loadingItem = thisHolder.find('.eltdf-blog-pag-loading');
            nextPage = loadMoreDatta.nextPage;
            if (nextPage <= maxNumPages) {
                if (thisHolder.hasClass('eltdf-bl-pag-standard-shortcodes')) {
                    loadingItem.addClass('eltdf-showing eltdf-standard-pag-trigger');
                    thisHolder.addClass('eltdf-bl-pag-standard-shortcodes-animate');
                } else {
                    loadingItem.addClass('eltdf-showing');
                }
                var ajaxData = eltdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'onea_elated_blog_shortcode_load_more');
                $.ajax({
                    type: 'POST',
                    data: ajaxData,
                    url: eltdfGlobalVars.vars.eltdfAjaxUrl,
                    success: function(data) {
                        if (!thisHolder.hasClass('eltdf-bl-pag-standard-shortcodes')) {
                            nextPage++;
                        }
                        thisHolder.data('next-page', nextPage);
                        var response = $.parseJSON(data),
                            responseHtml = response.html;
                        if (thisHolder.hasClass('eltdf-bl-pag-standard-shortcodes')) {
                            eltdfInitStandardPaginationLinkChanges(thisHolder, maxNumPages, nextPage);
                            thisHolder.waitForImages(function() {
                                if (thisHolder.hasClass('eltdf-bl-masonry')) {
                                    eltdfInitHtmlIsotopeNewContent(thisHolder, thisHolderInner, loadingItem, responseHtml);
                                } else {
                                    eltdfInitHtmlGalleryNewContent(thisHolder, thisHolderInner, loadingItem, responseHtml);
                                    if (typeof eltdf.modules.common.eltdfStickySidebarWidget === 'function') {
                                        eltdf.modules.common.eltdfStickySidebarWidget().reInit();
                                    }
                                }
                            });
                        } else {
                            thisHolder.waitForImages(function() {
                                if (thisHolder.hasClass('eltdf-bl-masonry')) {
                                    eltdfInitAppendIsotopeNewContent(thisHolderInner, loadingItem, responseHtml);
                                } else {
                                    eltdfInitAppendGalleryNewContent(thisHolderInner, loadingItem, responseHtml);
                                    if (typeof eltdf.modules.common.eltdfStickySidebarWidget === 'function') {
                                        eltdf.modules.common.eltdfStickySidebarWidget().reInit();
                                    }
                                }
                            });
                        }
                        if (thisHolder.hasClass('eltdf-bl-pag-infinite-scroll-started')) {
                            thisHolder.removeClass('eltdf-bl-pag-infinite-scroll-started');
                        }
                    }
                });
            }
            if (nextPage === maxNumPages) {
                thisHolder.find('.eltdf-blog-pag-load-more').hide();
            }
        };
        var eltdfInitStandardPaginationLinkChanges = function(thisHolder, maxNumPages, nextPage) {
            var standardPagHolder = thisHolder.find('.eltdf-bl-standard-pagination'),
                standardPagNumericItem = standardPagHolder.find('li.eltdf-pag-number'),
                standardPagPrevItem = standardPagHolder.find('li.eltdf-pag-prev a'),
                standardPagNextItem = standardPagHolder.find('li.eltdf-pag-next a');
            standardPagNumericItem.removeClass('eltdf-pag-active');
            standardPagNumericItem.eq(nextPage - 1).addClass('eltdf-pag-active');
            standardPagPrevItem.data('paged', nextPage - 1);
            standardPagNextItem.data('paged', nextPage + 1);
            if (nextPage > 1) {
                standardPagPrevItem.css({
                    'opacity': '1'
                });
            } else {
                standardPagPrevItem.css({
                    'opacity': '0'
                });
            }
            if (nextPage === maxNumPages) {
                standardPagNextItem.css({
                    'opacity': '0'
                });
            } else {
                standardPagNextItem.css({
                    'opacity': '1'
                });
            }
        };
        var eltdfInitHtmlIsotopeNewContent = function(thisHolder, thisHolderInner, loadingItem, responseHtml) {
            thisHolderInner.html(responseHtml).isotope('reloadItems').isotope({
                sortBy: 'original-order'
            });
            loadingItem.removeClass('eltdf-showing eltdf-standard-pag-trigger');
            thisHolder.removeClass('eltdf-bl-pag-standard-shortcodes-animate');
            setTimeout(function() {
                thisHolderInner.isotope('layout');
                if (typeof eltdf.modules.common.eltdfStickySidebarWidget === 'function') {
                    eltdf.modules.common.eltdfStickySidebarWidget().reInit();
                }
            }, 600);
        };
        var eltdfInitHtmlGalleryNewContent = function(thisHolder, thisHolderInner, loadingItem, responseHtml) {
            loadingItem.removeClass('eltdf-showing eltdf-standard-pag-trigger');
            thisHolder.removeClass('eltdf-bl-pag-standard-shortcodes-animate');
            thisHolderInner.html(responseHtml);
        };
        var eltdfInitAppendIsotopeNewContent = function(thisHolderInner, loadingItem, responseHtml) {
            thisHolderInner.append(responseHtml).isotope('reloadItems').isotope({
                sortBy: 'original-order'
            });
            loadingItem.removeClass('eltdf-showing');
            setTimeout(function() {
                thisHolderInner.isotope('layout');
                if (typeof eltdf.modules.common.eltdfStickySidebarWidget === 'function') {
                    eltdf.modules.common.eltdfStickySidebarWidget().reInit();
                }
            }, 600);
        };
        var eltdfInitAppendGalleryNewContent = function(thisHolderInner, loadingItem, responseHtml) {
            loadingItem.removeClass('eltdf-showing');
            thisHolderInner.append(responseHtml);
        };
        return {
            init: function() {
                if (holder.length) {
                    holder.each(function() {
                        var thisHolder = $(this);
                        if (thisHolder.hasClass('eltdf-bl-pag-standard-shortcodes')) {
                            initStandardPagination(thisHolder);
                        }
                        if (thisHolder.hasClass('eltdf-bl-pag-load-more')) {
                            initLoadMorePagination(thisHolder);
                        }
                        if (thisHolder.hasClass('eltdf-bl-pag-infinite-scroll')) {
                            initInifiteScrollPagination(thisHolder);
                        }
                    });
                }
            },
            scroll: function() {
                if (holder.length) {
                    holder.each(function() {
                        var thisHolder = $(this);
                        if (thisHolder.hasClass('eltdf-bl-pag-infinite-scroll')) {
                            initInifiteScrollPagination(thisHolder);
                        }
                    });
                }
            }
        };
    }
})(jQuery);
(function($) {
    "use strict";
    var headerBottom = {};
    eltdf.modules.headerBottom = headerBottom;
    headerBottom.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfBottomMenu().init();
        eltdfBottomMenuPosition();
    }
    var eltdfBottomMenu = function() {
        var verticalMenuObject = $('.eltdf-header-bottom .eltdf-vertical-menu-area');
        var initNavigation = function() {
            var verticalMenuOpener = $('.eltdf-header-bottom .eltdf-header-bottom-menu-opener'),
                headerObject = $('.eltdf-header-bottom .eltdf-page-header'),
                verticalMenuNavHolder = verticalMenuObject.find('.eltdf-vertical-menu-nav-holder-outer'),
                menuItemWithChild = verticalMenuObject.find('.eltdf-header-bottom-menu > ul li.has_sub > a'),
                menuItemWithoutChild = verticalMenuObject.find('.eltdf-header-bottom-menu ul li:not(.has_sub) a');
            verticalMenuNavHolder.height(eltdf.windowHeight);
            eltdf.modules.common.eltdfInitPerfectScrollbar().init(verticalMenuNavHolder);
            $(window).resize(function() {
                verticalMenuNavHolder.height(eltdf.windowHeight);
            });
            verticalMenuOpener.on('click', function(e) {
                e.preventDefault();
                if (!verticalMenuNavHolder.hasClass('active')) {
                    verticalMenuNavHolder.addClass('active');
                    verticalMenuObject.addClass('opened');
                    verticalMenuOpener.addClass('active');
                    eltdf.body.addClass('eltdf-header-bottom-opened');
                    if (!eltdf.body.hasClass('page-template-full_screen-php')) {
                        eltdf.modules.common.eltdfDisableScroll();
                    }
                } else {
                    verticalMenuNavHolder.removeClass('active');
                    verticalMenuObject.removeClass('opened');
                    verticalMenuOpener.removeClass('active');
                    eltdf.body.removeClass('eltdf-header-bottom-opened');
                    if (!eltdf.body.hasClass('page-template-full_screen-php')) {
                        eltdf.modules.common.eltdfEnableScroll();
                    }
                }
            });
            headerObject.next().on('click', function() {
                if (verticalMenuNavHolder.hasClass('active')) {
                    verticalMenuNavHolder.removeClass('active');
                    verticalMenuObject.removeClass('opened');
                    verticalMenuOpener.removeClass('active');
                    eltdf.body.removeClass('eltdf-header-bottom-opened');
                    if (!eltdf.body.hasClass('page-template-full_screen-php')) {
                        eltdf.modules.common.eltdfEnableScroll();
                    }
                }
            });
            $('.eltdf-slider, .eltdf-title-holder').on('click', function() {
                if (verticalMenuNavHolder.hasClass('active')) {
                    verticalMenuNavHolder.removeClass('active');
                    verticalMenuObject.removeClass('opened');
                    verticalMenuOpener.removeClass('active');
                    eltdf.body.removeClass('eltdf-header-bottom-opened');
                    if (!eltdf.body.hasClass('page-template-full_screen-php')) {
                        eltdf.modules.common.eltdfEnableScroll();
                    }
                }
            });
            menuItemWithChild.on('tap click', function(e) {
                e.preventDefault();
                if ($(this).parent().hasClass('has_sub')) {
                    var submenu = $(this).parent().find('> ul.sub_menu');
                    if (submenu.is(':visible')) {
                        submenu.slideUp(200);
                        $(this).parent().removeClass('open_sub');
                    } else {
                        if ($(this).parent().siblings().hasClass('open_sub')) {
                            $(this).parent().siblings().each(function() {
                                var sibling = $(this);
                                if (sibling.hasClass('open_sub')) {
                                    var openedUl = sibling.find('> ul.sub_menu');
                                    openedUl.slideUp(200);
                                    sibling.removeClass('open_sub');
                                }
                                if (sibling.find('.open_sub')) {
                                    var openedUlUl = sibling.find('.open_sub').find('> ul.sub_menu');
                                    openedUlUl.slideUp(200);
                                    sibling.find('.open_sub').removeClass('open_sub');
                                }
                            });
                        }
                        $(this).parent().addClass('open_sub');
                        submenu.slideDown(200);
                    }
                }
                return false;
            });
        };
        return {
            init: function() {
                if (verticalMenuObject.length) {
                    initNavigation();
                }
            }
        };
    };

    function eltdfBottomMenuPosition() {
        var bottomHeader = $('.eltdf-header-bottom');
        if (bottomHeader.length && eltdf.windowWidth > 1024) {
            var slider = $('.eltdf-slider'),
                sliderHeightUsed = slider.length && slider.outerHeight() + eltdfGlobalVars.vars.eltdfMenuAreaHeight < eltdf.windowHeight,
                initialHeight = sliderHeightUsed ? slider.outerHeight() : eltdf.windowHeight - eltdfGlobalVars.vars.eltdfMenuAreaHeight,
                contentHolder = $('.eltdf-content'),
                footer = $('footer'),
                footerHeight = footer.outerHeight(),
                uncoveringFooter = footer.hasClass('eltdf-footer-uncover');
            if (slider.length > 0) {
                slider.addClass('eltdf-slider-fixed');
                contentHolder.css("padding-top", initialHeight);
            }
            $(window).scroll(function() {
                if (eltdf.windowWidth > 1024) {
                    calculatePosition(initialHeight, uncoveringFooter, footerHeight);
                }
            });
        }

        function calculatePosition(initialHeight, uncoveringFooter, footerHeight) {
            if (uncoveringFooter) {
                if (eltdf.window.scrollTop() > initialHeight) {
                    slider.css('margin-top', '-' + footerHeight + 'px');
                } else {
                    slider.css('margin-top', 0);
                }
            }
        }
    }
})(jQuery);
(function($) {
    "use strict";
    var headerMinimal = {};
    eltdf.modules.headerMinimal = headerMinimal;
    headerMinimal.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfFullscreenMenu();
    }

    function eltdfFullscreenMenu() {
        var popupMenuOpener = $('a.eltdf-fullscreen-menu-opener');
        if (popupMenuOpener.length) {
            var popupMenuHolderOuter = $(".eltdf-fullscreen-menu-holder-outer"),
                cssClass, fadeRight = false,
                fadeTop = false,
                widgetAboveNav = $('.eltdf-fullscreen-above-menu-widget-holder'),
                widgetBelowNav = $('.eltdf-fullscreen-below-menu-widget-holder'),
                menuItems = $('.eltdf-fullscreen-menu-holder-outer nav > ul > li > a'),
                menuItemWithChild = $('.eltdf-fullscreen-menu > ul li.has_sub > a'),
                menuItemWithoutChild = $('.eltdf-fullscreen-menu ul li:not(.has_sub) a');
            eltdf.modules.common.eltdfInitPerfectScrollbar().init(popupMenuHolderOuter);
            $(window).resize(function() {
                popupMenuHolderOuter.height(eltdf.windowHeight);
            });
            if (eltdf.body.hasClass('eltdf-fade-push-text-right')) {
                cssClass = 'eltdf-push-nav-right';
                fadeRight = true;
            } else if (eltdf.body.hasClass('eltdf-fade-push-text-top')) {
                cssClass = 'eltdf-push-text-top';
                fadeTop = true;
            }
            if (fadeRight || fadeTop) {
                if (widgetAboveNav.length) {
                    widgetAboveNav.children().css({
                        '-webkit-animation-delay': 0 + 'ms',
                        '-moz-animation-delay': 0 + 'ms',
                        'animation-delay': 0 + 'ms'
                    });
                }
                menuItems.each(function(i) {
                    $(this).css({
                        '-webkit-animation-delay': (i + 1) * 70 + 'ms',
                        '-moz-animation-delay': (i + 1) * 70 + 'ms',
                        'animation-delay': (i + 1) * 70 + 'ms'
                    });
                });
                if (widgetBelowNav.length) {
                    widgetBelowNav.children().css({
                        '-webkit-animation-delay': (menuItems.length + 1) * 70 + 'ms',
                        '-moz-animation-delay': (menuItems.length + 1) * 70 + 'ms',
                        'animation-delay': (menuItems.length + 1) * 70 + 'ms'
                    });
                }
            }
            popupMenuOpener.on('click', function(e) {
                e.preventDefault();
                if (!popupMenuOpener.hasClass('eltdf-fm-opened')) {
                    popupMenuOpener.addClass('eltdf-fm-opened');
                    eltdf.body.removeClass('eltdf-fullscreen-fade-out').addClass('eltdf-fullscreen-menu-opened eltdf-fullscreen-fade-in');
                    eltdf.body.removeClass(cssClass);
                    eltdf.modules.common.eltdfDisableScroll();
                    $(document).keyup(function(e) {
                        if (e.keyCode === 27) {
                            popupMenuOpener.removeClass('eltdf-fm-opened');
                            eltdf.body.removeClass('eltdf-fullscreen-menu-opened eltdf-fullscreen-fade-in').addClass('eltdf-fullscreen-fade-out');
                            eltdf.body.addClass(cssClass);
                            eltdf.modules.common.eltdfEnableScroll();
                            $("nav.eltdf-fullscreen-menu ul.sub_menu").slideUp(0);
                        }
                    });
                } else {
                    popupMenuOpener.removeClass('eltdf-fm-opened');
                    eltdf.body.removeClass('eltdf-fullscreen-menu-opened eltdf-fullscreen-fade-in').addClass('eltdf-fullscreen-fade-out');
                    eltdf.body.addClass(cssClass);
                    eltdf.modules.common.eltdfEnableScroll();
                    $("nav.eltdf-fullscreen-menu ul.sub_menu").slideUp(0);
                }
            });
            menuItemWithChild.on('tap click', function(e) {
                e.preventDefault();
                var thisItem = $(this),
                    thisItemParent = thisItem.parent(),
                    thisItemParentSiblingsWithDrop = thisItemParent.siblings('.menu-item-has-children');
                if (thisItemParent.hasClass('has_sub')) {
                    var submenu = thisItemParent.find('> ul.sub_menu');
                    if (submenu.is(':visible')) {
                        submenu.slideUp(0, 'easeInOutQuint');
                        thisItemParent.removeClass('open_sub');
                    } else {
                        thisItemParent.addClass('open_sub');
                        if (thisItemParentSiblingsWithDrop.length === 0) {
                            submenu.slideDown(0, 'easeInOutQuint');
                        } else {
                            thisItemParent.closest('li.menu-item').siblings().find('.menu-item').removeClass('open_sub');
                            thisItemParent.siblings().removeClass('open_sub').find('.sub_menu').slideUp(0, 'easeInOutQuint', function() {
                                submenu.slideDown(0, 'easeInOutQuint');
                            });
                        }
                    }
                }
                return false;
            });
            menuItemWithoutChild.on('click', function(e) {
                if (($(this).attr('href') !== "http://#") && ($(this).attr('href') !== "#")) {
                    if (e.which === 1) {
                        popupMenuOpener.removeClass('eltdf-fm-opened');
                        eltdf.body.removeClass('eltdf-fullscreen-menu-opened');
                        eltdf.body.removeClass('eltdf-fullscreen-fade-in').addClass('eltdf-fullscreen-fade-out');
                        eltdf.body.addClass(cssClass);
                        $("nav.eltdf-fullscreen-menu ul.sub_menu").slideUp(0);
                        eltdf.modules.common.eltdfEnableScroll();
                    }
                } else {
                    return false;
                }
            });
        }
    }
})(jQuery);
(function($) {
    "use strict";
    var headerVertical = {};
    eltdf.modules.headerVertical = headerVertical;
    headerVertical.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfVerticalMenu().init();
    }
    var eltdfVerticalMenu = function() {
        var verticalMenuObject = $('.eltdf-vertical-menu-area');
        var verticalAreaScrollable = function() {
            return verticalMenuObject.hasClass('eltdf-with-scroll');
        };
        var initNavigation = function() {
            var verticalNavObject = verticalMenuObject.find('.eltdf-vertical-menu');
            if (verticalNavObject.hasClass('eltdf-vertical-dropdown-below')) {
                dropdownClickToggle();
            } else if (verticalNavObject.hasClass('eltdf-vertical-dropdown-side')) {
                dropdownFloat();
            }

            function dropdownClickToggle() {
                var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
                menuItems.each(function() {
                    var elementToExpand = $(this).find(' > .second, > ul');
                    var menuItem = this;
                    var dropdownOpener = $(this).find('> a');
                    var slideUpSpeed = 'fast';
                    var slideDownSpeed = 'slow';
                    dropdownOpener.on('click tap', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (elementToExpand.is(':visible')) {
                            $(menuItem).removeClass('open');
                            elementToExpand.slideUp(slideUpSpeed);
                        } else if (dropdownOpener.parent().parent().children().hasClass('open') && dropdownOpener.parent().parent().parent().hasClass('eltdf-vertical-menu')) {
                            $(this).parent().parent().children().removeClass('open');
                            $(this).parent().parent().children().find(' > .second').slideUp(slideUpSpeed);
                            $(menuItem).addClass('open');
                            elementToExpand.slideDown(slideDownSpeed);
                        } else {
                            if (!$(this).parents('li').hasClass('open')) {
                                menuItems.removeClass('open');
                                menuItems.find(' > .second, > ul').slideUp(slideUpSpeed);
                            }
                            if ($(this).parent().parent().children().hasClass('open')) {
                                $(this).parent().parent().children().removeClass('open');
                                $(this).parent().parent().children().find(' > .second, > ul').slideUp(slideUpSpeed);
                            }
                            $(menuItem).addClass('open');
                            elementToExpand.slideDown(slideDownSpeed);
                        }
                    });
                });
            }

            function dropdownFloat() {
                var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
                var allDropdowns = menuItems.find(' > .second > .inner > ul, > ul');
                menuItems.each(function() {
                    var elementToExpand = $(this).find(' > .second > .inner > ul, > ul');
                    var menuItem = this;
                    if (Modernizr.touch) {
                        var dropdownOpener = $(this).find('> a');
                        dropdownOpener.on('click tap', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            if (elementToExpand.hasClass('eltdf-float-open')) {
                                elementToExpand.removeClass('eltdf-float-open');
                                $(menuItem).removeClass('open');
                            } else {
                                if (!$(this).parents('li').hasClass('open')) {
                                    menuItems.removeClass('open');
                                    allDropdowns.removeClass('eltdf-float-open');
                                }
                                elementToExpand.addClass('eltdf-float-open');
                                $(menuItem).addClass('open');
                            }
                        });
                    } else {
                        $(this).hoverIntent({
                            over: function() {
                                elementToExpand.addClass('eltdf-float-open');
                                $(menuItem).addClass('open');
                            },
                            out: function() {
                                elementToExpand.removeClass('eltdf-float-open');
                                $(menuItem).removeClass('open');
                            },
                            timeout: 300
                        });
                    }
                });
            }
        };
        var initVerticalAreaScroll = function() {
            if (verticalAreaScrollable()) {
                eltdf.modules.common.eltdfInitPerfectScrollbar().init(verticalMenuObject);
            }
        };
        return {
            init: function() {
                if (verticalMenuObject.length) {
                    initNavigation();
                    initVerticalAreaScroll();
                }
            }
        };
    };
})(jQuery);
(function($) {
    "use strict";
    var headerVerticalSliding = {};
    eltdf.modules.headerVerticalSliding = headerVerticalSliding;
    headerVerticalSliding.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfVerticalSlidingMenu().init();
    }
    var eltdfVerticalSlidingMenu = function() {
        var verticalMenuObject = $('.eltdf-header-vertical-sliding .eltdf-vertical-menu-area');
        var initNavigation = function() {
            var varticalMenuOpener = verticalMenuObject.find('.eltdf-vertical-menu-opener a'),
                verticalMenuNavHolder = verticalMenuObject.find('.eltdf-vertical-menu-nav-holder-outer'),
                menuItemWithChild = verticalMenuObject.find('.eltdf-fullscreen-menu > ul li.has_sub > a'),
                menuItemWithoutChild = verticalMenuObject.find('.eltdf-fullscreen-menu ul li:not(.has_sub) a');
            verticalMenuNavHolder.height(eltdf.windowHeight);
            eltdf.modules.common.eltdfInitPerfectScrollbar().init(verticalMenuNavHolder);
            $(window).resize(function() {
                verticalMenuNavHolder.height(eltdf.windowHeight);
            });
            varticalMenuOpener.on('click', function(e) {
                e.preventDefault();
                if (!verticalMenuNavHolder.hasClass('active')) {
                    verticalMenuNavHolder.addClass('active');
                    verticalMenuObject.addClass('opened');
                    if (!eltdf.body.hasClass('page-template-full_screen-php')) {
                        eltdf.modules.common.eltdfDisableScroll();
                    }
                } else {
                    verticalMenuNavHolder.removeClass('active');
                    verticalMenuObject.removeClass('opened');
                    if (!eltdf.body.hasClass('page-template-full_screen-php')) {
                        eltdf.modules.common.eltdfEnableScroll();
                    }
                }
            });
            $('.eltdf-content').on('click', function() {
                if (verticalMenuNavHolder.hasClass('active')) {
                    verticalMenuNavHolder.removeClass('active');
                    verticalMenuObject.removeClass('opened');
                    if (!eltdf.body.hasClass('page-template-full_screen-php')) {
                        eltdf.modules.common.eltdfEnableScroll();
                    }
                }
            });
            menuItemWithChild.on('tap click', function(e) {
                e.preventDefault();
                if ($(this).parent().hasClass('has_sub')) {
                    var submenu = $(this).parent().find('> ul.sub_menu');
                    if (submenu.is(':visible')) {
                        submenu.slideUp(200);
                        $(this).parent().removeClass('open_sub');
                    } else {
                        if ($(this).parent().siblings().hasClass('open_sub')) {
                            $(this).parent().siblings().each(function() {
                                var sibling = $(this);
                                if (sibling.hasClass('open_sub')) {
                                    var openedUl = sibling.find('> ul.sub_menu');
                                    openedUl.slideUp(200);
                                    sibling.removeClass('open_sub');
                                }
                                if (sibling.find('.open_sub')) {
                                    var openedUlUl = sibling.find('.open_sub').find('> ul.sub_menu');
                                    openedUlUl.slideUp(200);
                                    sibling.find('.open_sub').removeClass('open_sub');
                                }
                            });
                        }
                        $(this).parent().addClass('open_sub');
                        submenu.slideDown(200);
                    }
                }
                return false;
            });
        };
        return {
            init: function() {
                if (verticalMenuObject.length) {
                    initNavigation();
                }
            }
        };
    };
})(jQuery);
(function($) {
    "use strict";
    var mobileHeader = {};
    eltdf.modules.mobileHeader = mobileHeader;
    mobileHeader.eltdfOnDocumentReady = eltdfOnDocumentReady;
    mobileHeader.eltdfOnWindowResize = eltdfOnWindowResize;
    $(document).ready(eltdfOnDocumentReady);
    $(window).resize(eltdfOnWindowResize);

    function eltdfOnDocumentReady() {
        eltdfInitMobileNavigation();
        eltdfInitMobileNavigationScroll();
        eltdfMobileHeaderBehavior();
    }

    function eltdfOnWindowResize() {
        eltdfInitMobileNavigationScroll();
    }

    function eltdfInitMobileNavigation() {
        var navigationOpener = $('.eltdf-mobile-header .eltdf-mobile-menu-opener'),
            navigationHolder = $('.eltdf-mobile-header .eltdf-mobile-nav'),
            dropdownOpener = $('.eltdf-mobile-nav .mobile_arrow, .eltdf-mobile-nav h6, .eltdf-mobile-nav a.eltdf-mobile-no-link');
        if (navigationOpener.length && navigationHolder.length) {
            navigationOpener.on('tap click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                if (navigationHolder.is(':visible')) {
                    navigationHolder.slideUp(450, 'easeInOutQuint');
                    navigationOpener.removeClass('eltdf-mobile-menu-opened');
                } else {
                    navigationHolder.slideDown(450, 'easeInOutQuint');
                    navigationOpener.addClass('eltdf-mobile-menu-opened');
                }
            });
        }
        if (dropdownOpener.length) {
            dropdownOpener.each(function() {
                var thisItem = $(this);
                thisItem.on('tap click', function(e) {
                    var thisItemParent = thisItem.parent('li'),
                        thisItemParentSiblingsWithDrop = thisItemParent.siblings('.menu-item-has-children');
                    if (thisItemParent.hasClass('has_sub')) {
                        var submenu = thisItemParent.find('> ul.sub_menu');
                        if (submenu.is(':visible')) {
                            submenu.slideUp(450, 'easeInOutQuint');
                            thisItemParent.removeClass('eltdf-opened');
                        } else {
                            thisItemParent.addClass('eltdf-opened');
                            if (thisItemParentSiblingsWithDrop.length === 0) {
                                thisItemParent.find('.sub_menu').slideUp(400, 'easeInOutQuint', function() {
                                    submenu.slideDown(400, 'easeInOutQuint');
                                });
                            } else {
                                thisItemParent.siblings().removeClass('eltdf-opened').find('.sub_menu').slideUp(400, 'easeInOutQuint', function() {
                                    submenu.slideDown(400, 'easeInOutQuint');
                                });
                            }
                        }
                    }
                });
            });
        }
        $('.eltdf-mobile-nav a, .eltdf-mobile-logo-wrapper a').on('click tap', function(e) {
            if ($(this).attr('href') !== 'http://#' && $(this).attr('href') !== '#') {
                navigationHolder.slideUp(450, 'easeInOutQuint');
                navigationOpener.removeClass("eltdf-mobile-menu-opened");
            }
        });
    }

    function eltdfInitMobileNavigationScroll() {
        if (eltdf.windowWidth <= 1024) {
            var mobileHeader = $('.eltdf-mobile-header'),
                mobileHeaderHeight = mobileHeader.length ? mobileHeader.height() : 0,
                navigationHolder = mobileHeader.find('.eltdf-mobile-nav'),
                navigationHeight = navigationHolder.outerHeight(),
                windowHeight = eltdf.windowHeight - 100;
            var scrollHeight = mobileHeaderHeight + navigationHeight > windowHeight ? windowHeight - mobileHeaderHeight : navigationHeight;
            if (navigationHolder.length) {
                navigationHolder.height(scrollHeight);
                eltdf.modules.common.eltdfInitPerfectScrollbar().init(navigationHolder);
            }
        }
    }

    function eltdfMobileHeaderBehavior() {
        var mobileHeader = $('.eltdf-mobile-header'),
            mobileMenuOpener = mobileHeader.find('.eltdf-mobile-menu-opener'),
            mobileHeaderHeight = mobileHeader.length ? mobileHeader.outerHeight() : 0;
        if (eltdf.body.hasClass('eltdf-content-is-behind-header') && mobileHeaderHeight > 0 && eltdf.windowWidth <= 1024) {
            $('.eltdf-content').css('marginTop', -mobileHeaderHeight);
        }
        if (eltdf.body.hasClass('eltdf-sticky-up-mobile-header')) {
            var stickyAppearAmount, adminBar = $('#wpadminbar');
            var docYScroll1 = $(document).scrollTop();
            stickyAppearAmount = mobileHeaderHeight + eltdfGlobalVars.vars.eltdfAddForAdminBar;
            $(window).scroll(function() {
                var docYScroll2 = $(document).scrollTop();
                if (docYScroll2 > stickyAppearAmount) {
                    mobileHeader.addClass('eltdf-animate-mobile-header');
                } else {
                    mobileHeader.removeClass('eltdf-animate-mobile-header');
                }
                if ((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount && !mobileMenuOpener.hasClass('eltdf-mobile-menu-opened')) || (docYScroll2 < stickyAppearAmount)) {
                    mobileHeader.removeClass('mobile-header-appear');
                    mobileHeader.css('margin-bottom', 0);
                    if (adminBar.length) {
                        mobileHeader.find('.eltdf-mobile-header-inner').css('top', 0);
                    }
                } else {
                    mobileHeader.addClass('mobile-header-appear');
                    mobileHeader.css('margin-bottom', stickyAppearAmount);
                }
                docYScroll1 = $(document).scrollTop();
            });
        }
    }
})(jQuery);
(function($) {
    "use strict";
    var stickyHeader = {};
    eltdf.modules.stickyHeader = stickyHeader;
    stickyHeader.isStickyVisible = false;
    stickyHeader.stickyAppearAmount = 0;
    stickyHeader.behaviour = '';
    stickyHeader.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        if (eltdf.windowWidth > 1024) {
            eltdfHeaderBehaviour();
        }
    }

    function eltdfHeaderBehaviour() {
        var header = $('.eltdf-page-header'),
            stickyHeader = $('.eltdf-sticky-header'),
            fixedHeaderWrapper = $('.eltdf-fixed-wrapper'),
            fixedMenuArea = fixedHeaderWrapper.children('.eltdf-menu-area'),
            fixedMenuAreaHeight = fixedMenuArea.outerHeight(),
            sliderHolder = $('.eltdf-slider'),
            revSliderHeight = sliderHolder.length ? sliderHolder.outerHeight() : 0,
            stickyAppearAmount, headerAppear;
        var headerMenuAreaOffset = fixedHeaderWrapper.length ? fixedHeaderWrapper.offset().top - eltdfGlobalVars.vars.eltdfAddForAdminBar : 0;
        switch (true) {
            case eltdf.body.hasClass('eltdf-sticky-header-on-scroll-up'):
                eltdf.modules.stickyHeader.behaviour = 'eltdf-sticky-header-on-scroll-up';
                var docYScroll1 = $(document).scrollTop();
                stickyAppearAmount = parseInt(eltdfGlobalVars.vars.eltdfTopBarHeight) + parseInt(eltdfGlobalVars.vars.eltdfLogoAreaHeight) + parseInt(eltdfGlobalVars.vars.eltdfMenuAreaHeight) + parseInt(eltdfGlobalVars.vars.eltdfStickyHeaderHeight);
                headerAppear = function() {
                    var docYScroll2 = $(document).scrollTop();
                    if ((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                        eltdf.modules.stickyHeader.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.eltdf-main-menu .second').removeClass('eltdf-drop-down-start');
                        eltdf.body.removeClass('eltdf-sticky-header-appear');
                    } else {
                        eltdf.modules.stickyHeader.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
                        eltdf.body.addClass('eltdf-sticky-header-appear');
                    }
                    docYScroll1 = $(document).scrollTop();
                };
                headerAppear();
                $(window).scroll(function() {
                    headerAppear();
                });
                break;
            case eltdf.body.hasClass('eltdf-sticky-header-on-scroll-down-up'):
                eltdf.modules.stickyHeader.behaviour = 'eltdf-sticky-header-on-scroll-down-up';
                if (eltdfPerPageVars.vars.eltdfStickyScrollAmount !== 0) {
                    eltdf.modules.stickyHeader.stickyAppearAmount = parseInt(eltdfPerPageVars.vars.eltdfStickyScrollAmount);
                } else {
                    eltdf.modules.stickyHeader.stickyAppearAmount = parseInt(eltdfGlobalVars.vars.eltdfTopBarHeight) + parseInt(eltdfGlobalVars.vars.eltdfLogoAreaHeight) + parseInt(eltdfGlobalVars.vars.eltdfMenuAreaHeight) + parseInt(revSliderHeight);
                }
                headerAppear = function() {
                    if (eltdf.scroll < eltdf.modules.stickyHeader.stickyAppearAmount) {
                        eltdf.modules.stickyHeader.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.eltdf-main-menu .second').removeClass('eltdf-drop-down-start');
                        eltdf.body.removeClass('eltdf-sticky-header-appear');
                    } else {
                        eltdf.modules.stickyHeader.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
                        eltdf.body.addClass('eltdf-sticky-header-appear');
                    }
                };
                headerAppear();
                $(window).scroll(function() {
                    headerAppear();
                });
                break;
            case eltdf.body.hasClass('eltdf-fixed-on-scroll'):
                eltdf.modules.stickyHeader.behaviour = 'eltdf-fixed-on-scroll';
                var headerFixed = function() {
                    if (eltdf.scroll <= headerMenuAreaOffset) {
                        fixedHeaderWrapper.removeClass('fixed');
                        eltdf.body.removeClass('eltdf-fixed-header-appear');
                        header.css('margin-bottom', '0');
                    } else {
                        fixedHeaderWrapper.addClass('fixed');
                        eltdf.body.addClass('eltdf-fixed-header-appear');
                        header.css('margin-bottom', fixedMenuAreaHeight + 'px');
                    }
                };
                headerFixed();
                $(window).scroll(function() {
                    headerFixed();
                });
                break;
        }
    }
})(jQuery);
(function($) {
    "use strict";
    var searchCoversHeader = {};
    eltdf.modules.searchCoversHeader = searchCoversHeader;
    searchCoversHeader.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfSearchCoversHeader();
    }

    function eltdfSearchCoversHeader() {
        if (eltdf.body.hasClass('eltdf-search-covers-header')) {
            var searchOpener = $('a.eltdf-search-opener');
            if (searchOpener.length > 0) {
                searchOpener.each(function() {
                    var thisOpener = $(this);
                    thisOpener.on('click', function(e) {
                        e.preventDefault();
                        var thisSearchOpener = $(this),
                            searchFormHeight, searchFormHeaderHolder = $('.eltdf-page-header'),
                            searchFormTopHeaderHolder = $('.eltdf-top-bar'),
                            searchFormFixedHeaderHolder = searchFormHeaderHolder.find('.eltdf-fixed-wrapper.fixed'),
                            searchFormMobileHeaderHolder = $('.eltdf-mobile-header'),
                            searchForm = $('.eltdf-search-cover'),
                            searchFormIsInTopHeader = !!thisSearchOpener.parents('.eltdf-top-bar').length,
                            searchFormIsInFixedHeader = !!thisSearchOpener.parents('.eltdf-fixed-wrapper.fixed').length,
                            searchFormIsInStickyHeader = !!thisSearchOpener.parents('.eltdf-sticky-header').length,
                            searchFormIsInMobileHeader = !!thisSearchOpener.parents('.eltdf-mobile-header').length;
                        searchForm.removeClass('eltdf-is-active');
                        if (searchFormIsInTopHeader) {
                            searchFormHeight = searchFormTopHeaderHolder.outerHeight();
                            searchFormHeaderHolder.children('.eltdf-search-cover').addClass('eltdf-is-active eltdf-opener-in-top-header');
                        } else if (searchFormIsInFixedHeader) {
                            searchFormHeight = searchFormFixedHeaderHolder.outerHeight();
                            searchFormHeaderHolder.children('.eltdf-search-cover').addClass('eltdf-is-active');
                        } else if (searchFormIsInStickyHeader) {
                            searchFormHeight = searchFormHeaderHolder.find('.eltdf-sticky-header').outerHeight();
                            searchFormHeaderHolder.children('.eltdf-search-cover').addClass('eltdf-is-active');
                        } else if (searchFormIsInMobileHeader) {
                            if (searchFormMobileHeaderHolder.hasClass('mobile-header-appear')) {
                                searchFormHeight = searchFormMobileHeaderHolder.children('.eltdf-mobile-header-inner').outerHeight();
                            } else {
                                searchFormHeight = searchFormMobileHeaderHolder.outerHeight();
                            }
                            searchFormMobileHeaderHolder.find('.eltdf-search-cover').addClass('eltdf-is-active');
                        } else {
                            searchFormHeight = searchFormHeaderHolder.outerHeight();
                            searchFormHeaderHolder.children('.eltdf-search-cover').addClass('eltdf-is-active');
                        }
                        if (searchForm.hasClass('eltdf-is-active')) {
                            searchForm.height(searchFormHeight).stop(true).fadeIn(600).find('input[type="text"]').focus();
                        }
                        searchForm.find('.eltdf-search-close').on('click', function(e) {
                            e.preventDefault();
                            searchForm.stop(true).fadeOut(450, function() {
                                if (searchForm.hasClass('eltdf-opener-in-top-header')) {
                                    searchForm.removeClass('eltdf-opener-in-top-header');
                                }
                            });
                            searchForm.removeClass('eltdf-is-active');
                        });
                        searchForm.blur(function() {
                            searchForm.stop(true).fadeOut(450, function() {
                                if (searchForm.hasClass('eltdf-opener-in-top-header')) {
                                    searchForm.removeClass('eltdf-opener-in-top-header');
                                }
                            });
                            searchForm.removeClass('eltdf-is-active');
                        });
                        $(window).scroll(function() {
                            searchForm.stop(true).fadeOut(450, function() {
                                if (searchForm.hasClass('eltdf-opener-in-top-header')) {
                                    searchForm.removeClass('eltdf-opener-in-top-header');
                                }
                            });
                            searchForm.removeClass('eltdf-is-active');
                        });
                    });
                });
            }
        }
    }
})(jQuery);
(function($) {
    "use strict";
    var searchFullscreen = {};
    eltdf.modules.searchFullscreen = searchFullscreen;
    searchFullscreen.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfSearchFullscreen();
    }

    function eltdfSearchFullscreen() {
        if (eltdf.body.hasClass('eltdf-fullscreen-search')) {
            var searchOpener = $('a.eltdf-search-opener');
            if (searchOpener.length > 0) {
                var searchHolder = $('.eltdf-fullscreen-search-holder'),
                    searchClose = $('.eltdf-search-close');
                searchOpener.on('click', function(e) {
                    e.preventDefault();
                    if (searchHolder.hasClass('eltdf-animate')) {
                        eltdf.body.removeClass('eltdf-fullscreen-search-opened eltdf-search-fade-out');
                        eltdf.body.removeClass('eltdf-search-fade-in');
                        searchHolder.removeClass('eltdf-animate');
                        setTimeout(function() {
                            searchHolder.find('.eltdf-search-field').val('');
                            searchHolder.find('.eltdf-search-field').blur();
                        }, 300);
                        eltdf.modules.common.eltdfEnableScroll();
                    } else {
                        eltdf.body.addClass('eltdf-fullscreen-search-opened eltdf-search-fade-in');
                        eltdf.body.removeClass('eltdf-search-fade-out');
                        searchHolder.addClass('eltdf-animate');
                        setTimeout(function() {
                            searchHolder.find('.eltdf-search-field').focus();
                        }, 900);
                        eltdf.modules.common.eltdfDisableScroll();
                    }
                    searchClose.on('click', function(e) {
                        e.preventDefault();
                        eltdf.body.removeClass('eltdf-fullscreen-search-opened eltdf-search-fade-in');
                        eltdf.body.addClass('eltdf-search-fade-out');
                        searchHolder.removeClass('eltdf-animate');
                        setTimeout(function() {
                            searchHolder.find('.eltdf-search-field').val('');
                            searchHolder.find('.eltdf-search-field').blur();
                        }, 300);
                        eltdf.modules.common.eltdfEnableScroll();
                    });
                    $(document).mouseup(function(e) {
                        var container = $(".eltdf-form-holder-inner");
                        if (!container.is(e.target) && container.has(e.target).length === 0) {
                            e.preventDefault();
                            eltdf.body.removeClass('eltdf-fullscreen-search-opened eltdf-search-fade-in');
                            eltdf.body.addClass('eltdf-search-fade-out');
                            searchHolder.removeClass('eltdf-animate');
                            setTimeout(function() {
                                searchHolder.find('.eltdf-search-field').val('');
                                searchHolder.find('.eltdf-search-field').blur();
                            }, 300);
                            eltdf.modules.common.eltdfEnableScroll();
                        }
                    });
                    $(document).keyup(function(e) {
                        if (e.keyCode === 27) {
                            eltdf.body.removeClass('eltdf-fullscreen-search-opened eltdf-search-fade-in');
                            eltdf.body.addClass('eltdf-search-fade-out');
                            searchHolder.removeClass('eltdf-animate');
                            setTimeout(function() {
                                searchHolder.find('.eltdf-search-field').val('');
                                searchHolder.find('.eltdf-search-field').blur();
                            }, 300);
                            eltdf.modules.common.eltdfEnableScroll();
                        }
                    });
                });
                var inputSearchField = $('.eltdf-fullscreen-search-holder .eltdf-search-field'),
                    inputSearchLine = $('.eltdf-fullscreen-search-holder .eltdf-field-holder .eltdf-line');
                inputSearchField.focus(function() {
                    inputSearchLine.css('width', '100%');
                });
                inputSearchField.blur(function() {
                    inputSearchLine.css('width', '0');
                });
            }
        }
    }
})(jQuery);
(function($) {
    "use strict";
    var searchFullscreenWithSidebar = {};
    eltdf.modules.searchFullscreenWithSidebar = searchFullscreenWithSidebar;
    searchFullscreenWithSidebar.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfSearchFullscreenWithSidebar();
    }

    function eltdfSearchFullscreenWithSidebar() {
        if (eltdf.body.hasClass('eltdf-fullscreen-search-with-sidebar')) {
            var searchOpener = $('a.eltdf-search-opener');
            if (searchOpener.length > 0) {
                var searchHolder = $('.eltdf-fullscreen-with-sidebar-search-holder'),
                    searchClose = $('.eltdf-search-close');
                eltdf.modules.common.eltdfInitPerfectScrollbar().init(searchHolder);
                searchOpener.on('click', function(e) {
                    e.preventDefault();
                    if (searchHolder.hasClass('eltdf-animate')) {
                        eltdf.body.removeClass('eltdf-fullscreen-search-opened eltdf-search-fade-out');
                        eltdf.body.removeClass('eltdf-search-fade-in');
                        searchHolder.removeClass('eltdf-animate');
                        setTimeout(function() {
                            searchHolder.find('.eltdf-search-field').val('');
                            searchHolder.find('.eltdf-search-field').blur();
                        }, 300);
                        eltdf.modules.common.eltdfEnableScroll();
                    } else {
                        eltdf.body.addClass('eltdf-fullscreen-search-opened eltdf-search-fade-in');
                        eltdf.body.removeClass('eltdf-search-fade-out');
                        searchHolder.addClass('eltdf-animate');
                        setTimeout(function() {
                            searchHolder.find('.eltdf-search-field').focus();
                        }, 900);
                        eltdf.modules.common.eltdfDisableScroll();
                    }
                    searchClose.on('click', function(e) {
                        e.preventDefault();
                        eltdf.body.removeClass('eltdf-fullscreen-search-opened eltdf-search-fade-in');
                        eltdf.body.addClass('eltdf-search-fade-out');
                        searchHolder.removeClass('eltdf-animate');
                        setTimeout(function() {
                            searchHolder.find('.eltdf-search-field').val('');
                            searchHolder.find('.eltdf-search-field').blur();
                        }, 300);
                        eltdf.modules.common.eltdfEnableScroll();
                    });
                    $(document).keyup(function(e) {
                        if (e.keyCode === 27) {
                            eltdf.body.removeClass('eltdf-fullscreen-search-opened eltdf-search-fade-in');
                            eltdf.body.addClass('eltdf-search-fade-out');
                            searchHolder.removeClass('eltdf-animate');
                            setTimeout(function() {
                                searchHolder.find('.eltdf-search-field').val('');
                                searchHolder.find('.eltdf-search-field').blur();
                            }, 300);
                            eltdf.modules.common.eltdfEnableScroll();
                        }
                    });
                });
            }
        }
    }
})(jQuery);
(function($) {
    "use strict";
    var searchSlideFromHB = {};
    eltdf.modules.searchSlideFromHB = searchSlideFromHB;
    searchSlideFromHB.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfSearchSlideFromHB();
    }

    function eltdfSearchSlideFromHB() {
        if (eltdf.body.hasClass('eltdf-slide-from-header-bottom')) {
            var searchOpener = $('a.eltdf-search-opener');
            if (searchOpener.length) {
                searchOpener.each(function() {
                    $(this).on('click', function(e) {
                        e.preventDefault();
                        var thisSearchOpener = $(this),
                            searchIconPosition = parseInt(eltdf.windowWidth - thisSearchOpener.offset().left - thisSearchOpener.outerWidth());
                        if (eltdf.body.hasClass('eltdf-boxed') && eltdf.windowWidth > 1024) {
                            searchIconPosition -= parseInt((eltdf.windowWidth - $('.eltdf-boxed .eltdf-wrapper .eltdf-wrapper-inner').outerWidth()) / 2);
                        }
                        var searchFormHeaderHolder = $('.eltdf-page-header'),
                            searchFormTopOffset = '100%',
                            searchFormTopHeaderHolder = $('.eltdf-top-bar'),
                            searchFormFixedHeaderHolder = searchFormHeaderHolder.find('.eltdf-fixed-wrapper.fixed'),
                            searchFormMobileHeaderHolder = $('.eltdf-mobile-header'),
                            searchForm = searchFormHeaderHolder.children('.eltdf-slide-from-header-bottom-holder'),
                            searchFormIsInTopHeader = !!thisSearchOpener.parents('.eltdf-top-bar').length,
                            searchFormIsInFixedHeader = !!thisSearchOpener.parents('.eltdf-fixed-wrapper.fixed').length,
                            searchFormIsInStickyHeader = !!thisSearchOpener.parents('.eltdf-sticky-header').length,
                            searchFormIsInMobileHeader = !!thisSearchOpener.parents('.eltdf-mobile-header').length;
                        searchForm.removeClass('eltdf-is-active');
                        if (searchFormIsInTopHeader) {
                            searchForm = searchFormTopHeaderHolder.find('.eltdf-slide-from-header-bottom-holder');
                            searchForm.addClass('eltdf-is-active');
                        } else if (searchFormIsInFixedHeader) {
                            searchFormTopOffset = searchFormFixedHeaderHolder.outerHeight() + eltdfGlobalVars.vars.eltdfAddForAdminBar;
                            searchForm.addClass('eltdf-is-active');
                        } else if (searchFormIsInStickyHeader) {
                            searchFormTopOffset = eltdfGlobalVars.vars.eltdfStickyHeaderHeight + eltdfGlobalVars.vars.eltdfAddForAdminBar;
                            searchForm.addClass('eltdf-is-active');
                        } else if (searchFormIsInMobileHeader) {
                            if (searchFormMobileHeaderHolder.hasClass('mobile-header-appear')) {
                                searchFormTopOffset = searchFormMobileHeaderHolder.children('.eltdf-mobile-header-inner').outerHeight() + eltdfGlobalVars.vars.eltdfAddForAdminBar;
                            }
                            searchForm = searchFormMobileHeaderHolder.find('.eltdf-slide-from-header-bottom-holder');
                            searchForm.addClass('eltdf-is-active');
                        } else {
                            searchForm.addClass('eltdf-is-active');
                        }
                        if (searchForm.hasClass('eltdf-is-active')) {
                            searchForm.css({
                                'right': searchIconPosition,
                                'top': searchFormTopOffset
                            }).stop(true).slideToggle(300, 'easeOutBack');
                        }
                        $(document).keyup(function(e) {
                            if (e.keyCode === 27) {
                                searchForm.stop(true).fadeOut(0);
                            }
                        });
                        $(window).scroll(function() {
                            searchForm.stop(true).fadeOut(0);
                        });
                    });
                });
            }
        }
    }
})(jQuery);
(function($) {
    "use strict";
    var searchSlideFromWT = {};
    eltdf.modules.searchSlideFromWT = searchSlideFromWT;
    searchSlideFromWT.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfSearchSlideFromWT();
    }

    function eltdfSearchSlideFromWT() {
        if (eltdf.body.hasClass('eltdf-search-slides-from-window-top')) {
            var searchOpener = $('a.eltdf-search-opener');
            if (searchOpener.length > 0) {
                var searchForm = $('.eltdf-search-slide-window-top'),
                    searchClose = $('.eltdf-search-close');
                searchOpener.on('click', function(e) {
                    e.preventDefault();
                    if (searchForm.height() === 0) {
                        $('.eltdf-search-slide-window-top input[type="text"]').focus();
                        eltdf.body.addClass('eltdf-search-open');
                    } else {
                        eltdf.body.removeClass('eltdf-search-open');
                    }
                    $(window).scroll(function() {
                        if (searchForm.height() !== 0 && eltdf.scroll > 50) {
                            eltdf.body.removeClass('eltdf-search-open');
                        }
                    });
                    searchClose.on('click', function(e) {
                        e.preventDefault();
                        eltdf.body.removeClass('eltdf-search-open');
                    });
                });
            }
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var productList = {};
    eltdf.modules.productList = productList;
    productList.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitProductListFilter().init();
        eltdfPLFadeIn();
    }

    function eltdfInitProductListFilter() {
        var productList = $('.eltdf-pl-holder');
        var queryParams = {};
        var initFilterClick = function(thisProductList) {
            var links = thisProductList.find('.eltdf-pl-categories a, .eltdf-pl-ordering a');
            links.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var clickedLink = $(this);
                if (!clickedLink.hasClass('active')) {
                    initMainPagFunctionality(thisProductList, clickedLink);
                }
            });
        };
        var eltdfReplaceStandardContent = function(thisProductListInner, loader, responseHtml) {
            thisProductListInner.html(responseHtml);
            loader.fadeOut();
            thisProductListInner.removeClass('eltdf-ajax-loading');
        };
        var eltdfReplaceMasonryContent = function(thisProductListInner, loader, responseHtml) {};
        var eltdfReturnOrderingParemeters = function(queryParams, data) {
            for (var key in data) {
                queryParams[key] = data[key];
            }
            return queryParams;
        };
        var initMainPagFunctionality = function(thisProductList, clickedLink) {
            var thisProductListInner = thisProductList.find('.eltdf-pl-outer');
            var loadData = eltdf.modules.common.getLoadMoreData(thisProductList),
                loader = thisProductList.find('.eltdf-prl-loading');
            eltdfReturnOrderingParemeters(queryParams, clickedLink.data());
            loadData.category = queryParams.category !== undefined ? queryParams.category : '';
            loadData.metaKey = queryParams.metaKey !== undefined ? queryParams.metaKey : '';
            thisProductListInner.addClass('eltdf-ajax-loading');
            loader.fadeIn();
            var ajaxData = eltdf.modules.common.setLoadMoreAjaxData(loadData, 'eltdf_product_ajax_load_category');
            $.ajax({
                type: 'POST',
                data: ajaxData,
                url: eltdfGlobalVars.vars.eltdfAjaxUrl,
                success: function(data) {
                    var response = $.parseJSON(data),
                        responseHtml = response.html;
                    thisProductList.waitForImages(function() {
                        clickedLink.parent().siblings().find('a').removeClass('active');
                        clickedLink.addClass('active');
                        if (thisProductList.hasClass('eltdf-masonry-layout')) {
                            eltdfReplaceMasonryContent(thisProductListInner, loader, responseHtml);
                        } else {
                            eltdfReplaceStandardContent(thisProductListInner, loader, responseHtml);
                        }
                    });
                }
            });
        };
        var initMobileFilterClick = function(cliked, holder) {
            cliked.on('click', function() {
                if (eltdf.windowWidth <= 768) {
                    if (!cliked.hasClass('opened')) {
                        cliked.addClass('opened');
                        holder.slideDown();
                    } else {
                        cliked.removeClass('opened');
                        holder.slideUp();
                    }
                }
            });
        };
        return {
            init: function() {
                if (productList.length) {
                    productList.each(function() {
                        var thisProductList = $(this);
                        initFilterClick(thisProductList);
                        initMobileFilterClick(thisProductList.find('.eltdf-pl-ordering-outer h6'), thisProductList.find('.eltdf-pl-ordering'));
                        initMobileFilterClick(thisProductList.find('.eltdf-pl-categories-label'), thisProductList.find('.eltdf-pl-categories-label').next('ul'));
                    });
                }
            }
        };
    }

    function eltdfPLFadeIn() {
        var fadeinProductList = $('.eltdf-enable-rand-fadein');
        if (fadeinProductList.length) {
            fadeinProductList.each(function() {
                var thisPL = $(this),
                    products = thisPL.find('.eltdf-pli');
                var randomize = function(n) {
                    var queue = new Array();
                    for (var i = 0; i < numberOfItems; i++) {
                        var queueElement = Math.floor(Math.random() * numberOfItems);
                        if (jQuery.inArray(queueElement, queue) > 0) {
                            --i;
                        } else {
                            queue.push(queueElement);
                        }
                    }
                    return queue;
                };
                var numberOfItems = products.length,
                    r = randomize(numberOfItems);
                products.each(function(i) {
                    var product = $(this);
                    setTimeout(function() {
                        product.addClass('eltdf-fade-out-cover').one(eltdf.animationEnd, function() {
                            $(this).addClass('eltdf-remove-cover');
                        });
                    }, r[i] * 100);
                });
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var rating = {};
    eltdf.modules.rating = rating;
    rating.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitCommentRating();
    }

    function eltdfInitCommentRating() {
        var ratingHolder = $('.eltdf-comment-form-rating');
        var addActive = function(stars, ratingValue) {
            for (var i = 0; i < stars.length; i++) {
                var star = stars[i];
                if (i < ratingValue) {
                    $(star).addClass('active');
                } else {
                    $(star).removeClass('active');
                }
            }
        };
        ratingHolder.each(function() {
            var thisHolder = $(this),
                ratingInput = thisHolder.find('.eltdf-rating'),
                ratingValue = ratingInput.val(),
                stars = thisHolder.find('.eltdf-star-rating');
            addActive(stars, ratingValue);
            stars.on('click', function() {
                ratingInput.val($(this).data('value')).trigger('change');
            });
            ratingInput.change(function() {
                ratingValue = ratingInput.val();
                addActive(stars, ratingValue);
            });
        });
    }
})(jQuery);
(function($) {
    'use strict';
    var portfolio = {};
    eltdf.modules.portfolio = portfolio;
    portfolio.eltdfOnWindowLoad = eltdfOnWindowLoad;
    $(window).on('load', eltdfOnWindowLoad);

    function eltdfOnWindowLoad() {
        eltdfPortfolioSingleFollow().init();
    }
    var eltdfPortfolioSingleFollow = function() {
        var info = $('.eltdf-follow-portfolio-info .eltdf-portfolio-single-holder .eltdf-ps-info-sticky-holder');
        if (info.length) {
            var infoHolder = info.parent(),
                infoHolderOffset = infoHolder.offset().top,
                infoHolderHeight = infoHolder.height(),
                mediaHolder = $('.eltdf-ps-image-holder'),
                mediaHolderHeight = mediaHolder.height(),
                header = $('.header-appear, .eltdf-fixed-wrapper'),
                headerHeight = (header.length) ? header.height() : 0,
                constant = 30;
        }
        var infoHolderPosition = function() {
            if (info.length && mediaHolderHeight >= infoHolderHeight) {
                if (eltdf.scroll >= infoHolderOffset - headerHeight - eltdfGlobalVars.vars.eltdfAddForAdminBar - constant) {
                    var marginTop = eltdf.scroll - infoHolderOffset + eltdfGlobalVars.vars.eltdfAddForAdminBar + headerHeight + constant;
                    if (marginTop + infoHolderHeight > mediaHolderHeight) {
                        marginTop = mediaHolderHeight - infoHolderHeight + constant;
                    }
                    info.stop().animate({
                        marginTop: marginTop
                    });
                }
            }
        };
        var recalculateInfoHolderPosition = function() {
            if (info.length && mediaHolderHeight >= infoHolderHeight) {
                if (eltdf.scroll > 0 && header.length) {
                    headerHeight = header.height();
                }
                var headerMixin = headerHeight + eltdfGlobalVars.vars.eltdfAddForAdminBar + constant;
                if (eltdf.scroll >= infoHolderOffset - headerMixin) {
                    if (eltdf.scroll + infoHolderHeight + headerMixin + 2 * constant < infoHolderOffset + mediaHolderHeight) {
                        info.stop().animate({
                            marginTop: (eltdf.scroll - infoHolderOffset + headerMixin + 2 * constant)
                        });
                        headerHeight = 0;
                    } else {
                        info.stop().animate({
                            marginTop: mediaHolderHeight - infoHolderHeight
                        });
                    }
                } else {
                    info.stop().animate({
                        marginTop: 0
                    });
                }
            }
        };
        return {
            init: function() {
                infoHolderPosition();
                $(window).scroll(function() {
                    recalculateInfoHolderPosition();
                });
            }
        };
    };
})(jQuery);
(function($) {
    'use strict';
    var shopMasonryGallery = {};
    eltdf.modules.shopMasonryGallery = shopMasonryGallery;
    shopMasonryGallery.eltdfInitShopMasonryGallery = eltdfInitShopMasonryGallery;
    shopMasonryGallery.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitShopMasonryGallery();
        eltdfInitSMGStackSlider();
    }

    function eltdfInitShopMasonryGallery() {
        var galleryHolder = $('.eltdf-shop-masonry-gallery-holder'),
            gallery = galleryHolder.children('.eltdf-smg-inner'),
            gallerySizer = gallery.children('.eltdf-smg-grid-sizer');
        resizeShopMasonryGallery(gallerySizer.width(), gallery, galleryHolder);
        if (galleryHolder.length) {
            galleryHolder.each(function() {
                var holder = $(this),
                    holderGallery = holder.children('.eltdf-smg-inner');
                holderGallery.waitForImages(function() {
                    holderGallery.animate({
                        opacity: 1
                    });
                    holderGallery.isotope({
                        layoutMode: 'packery',
                        itemSelector: '.eltdf-smg-item',
                        percentPosition: true,
                        packery: {
                            gutter: '.eltdf-smg-grid-gutter',
                            columnWidth: '.eltdf-smg-grid-sizer'
                        }
                    });
                });
            });
            $(window).resize(function() {
                resizeShopMasonryGallery(gallerySizer.width(), gallery, galleryHolder);
                gallery.isotope('reloadItems');
            });
        }
    }

    function resizeShopMasonryGallery(size, holder, galleryHolder) {
        var rectangle_portrait = holder.find('.eltdf-smg-rectangle-portrait'),
            rectangle_landscape = holder.find('.eltdf-smg-rectangle-landscape'),
            rectangle_portrait_big = holder.find('.eltdf-smg-rectangle-portrait-big'),
            square_big = holder.find('.eltdf-smg-square-big'),
            square_small = holder.find('.eltdf-smg-square-small'),
            space_between_items = galleryHolder.data('space-between-items'),
            space_between_items_size = 0,
            ratio = 1.3;
        if (space_between_items == 'tiny') {
            space_between_items_size = 5;
        } else if (space_between_items == 'small') {
            space_between_items_size = 10;
        } else if (space_between_items == 'normal') {
            space_between_items_size = 15;
        } else if (space_between_items == 'medium') {
            space_between_items_size = 20;
        } else if (space_between_items == 'large') {
            space_between_items_size = 25;
        } else if (space_between_items == 'huge') {
            space_between_items_size = 40;
        }
        rectangle_portrait.css('height', ratio * size + 2 * space_between_items_size);
        if (window.innerWidth <= 680) {
            rectangle_landscape.css('height', size / ratio);
        } else {
            rectangle_landscape.css('height', size);
        }
        square_big.css('height', 2 * size + 2 * space_between_items_size);
        if (window.innerWidth <= 680) {
            square_big.css('height', square_big.width());
        }
        rectangle_portrait_big.css('height', 2 * ratio * size + 2 * space_between_items_size);
        if (window.innerWidth <= 680) {
            rectangle_portrait_big.css('height', rectangle_portrait_big.width());
        }
        square_small.css('height', size);
    }

    function eltdfInitSMGStackSlider() {
        var holders = $('.eltdf-smg-stack-slider-holder');
        if (holders.length) {
            holders.each(function() {
                var thisHolder = $(this),
                    thisSlider = thisHolder.find('.eltdf-stack-slider'),
                    infoBox = thisHolder.find('.eltdf-smg-banner-text-inner'),
                    nav = thisHolder.find('.eltdf-slider-nav'),
                    buttonNext = nav.find('.eltdf-next'),
                    buttonPrev = nav.find('.eltdf-prev'),
                    curSlide = thisSlider.find('.eltdf-stack-slide:last'),
                    prevSlide, autoplayTimeout, autoplayInterval, sliderSpeed = 1000,
                    autoplaySpeed = 5000,
                    autoplayOption = 'no',
                    autoplayTimeoutTime = 3000;
                var resetTimeouts = function() {
                    if (autoplayOption == "yes") {
                        clearTimeout(autoplayTimeout);
                        clearInterval(autoplayInterval);
                        autoplayTimeout = setTimeout(function() {
                            autoplayInterval = setInterval(function() {
                                goNext();
                            }, autoplaySpeed);
                        }, autoplayTimeoutTime);
                    }
                };
                var infoBoxMain = function(slideItem) {
                    var currentContent = slideItem.find('.eltdf-info-box-data-hidden').html();
                    infoBox.removeClass('eltdf-info-box-animate');
                    setTimeout(function() {
                        infoBox.addClass('eltdf-info-box-animate');
                    }, 10);
                    setTimeout(function() {
                        infoBox.html(currentContent);
                    }, 500);
                };

                function goNext() {
                    nav.addClass("disabled");
                    thisSlider.addClass("disabled");
                    curSlide = thisSlider.find('.eltdf-stack-slide:last');
                    curSlide.css({
                        transform: "translateX(100%)",
                        transition: sliderSpeed + "ms ease"
                    });
                    prevSlide = curSlide;
                    curSlide = curSlide.prev();
                    infoBoxMain(curSlide);
                    setTimeout(function() {
                        prevSlide.css({
                            transform: "",
                            transition: ""
                        });
                        prevSlide.prependTo(thisSlider);
                        nav.removeClass("disabled");
                        thisSlider.removeClass("disabled");
                    }, sliderSpeed + 100);
                }

                function goPrev() {
                    nav.addClass("disabled");
                    thisSlider.addClass("disabled");
                    curSlide = thisSlider.find('.eltdf-stack-slide:first');
                    infoBoxMain(curSlide);
                    curSlide.addClass('prepMoveBack');
                    curSlide.appendTo(thisSlider);
                    setTimeout(function() {
                        curSlide.css({
                            transform: "translateX(0)",
                            transition: sliderSpeed + "ms ease"
                        });
                        prevSlide = curSlide;
                        curSlide = thisSlider.find('.eltdf-stack-slide:first');
                    }, 100);
                    setTimeout(function() {
                        nav.removeClass("disabled");
                        thisSlider.removeClass("disabled");
                        prevSlide.css({
                            transform: "",
                            transition: ""
                        });
                        prevSlide.removeClass('prepMoveBack');
                    }, sliderSpeed + 100);
                }
                buttonNext.on("click", function() {
                    goNext();
                    resetTimeouts();
                });
                buttonPrev.on("click", function() {
                    goPrev();
                    resetTimeouts();
                });
                thisHolder.waitForImages(function() {
                    infoBoxMain(curSlide);
                    setTimeout(function() {
                        infoBox.removeClass('eltdf-info-box-hidden');
                    }, 1000);
                    if (autoplayOption == "yes") {
                        autoplayInterval = setInterval(function() {
                            goNext();
                        }, autoplaySpeed);
                    }
                });
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var accordions = {};
    eltdf.modules.accordions = accordions;
    accordions.eltdfInitAccordions = eltdfInitAccordions;
    accordions.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitAccordions();
    }

    function eltdfInitAccordions() {
        var accordion = $('.eltdf-accordion-holder');
        if (accordion.length) {
            accordion.each(function() {
                var thisAccordion = $(this);
                if (thisAccordion.hasClass('eltdf-accordion')) {
                    thisAccordion.accordion({
                        animate: "swing",
                        collapsible: true,
                        active: 0,
                        icons: "",
                        heightStyle: "content"
                    });
                }
                if (thisAccordion.hasClass('eltdf-toggle')) {
                    var toggleAccordion = $(this),
                        toggleAccordionTitle = toggleAccordion.find('.eltdf-accordion-title'),
                        toggleAccordionContent = toggleAccordionTitle.next();
                    toggleAccordion.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset");
                    toggleAccordionTitle.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom");
                    toggleAccordionContent.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();
                    toggleAccordionTitle.each(function() {
                        var thisTitle = $(this);
                        thisTitle.on('mouseenter mouseleave', function() {
                            thisTitle.toggleClass("ui-state-hover");
                        });
                        thisTitle.on('click', function() {
                            thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
                            thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(400);
                        });
                    });
                }
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var animationHolder = {};
    eltdf.modules.animationHolder = animationHolder;
    animationHolder.eltdfInitAnimationHolder = eltdfInitAnimationHolder;
    animationHolder.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitAnimationHolder();
    }

    function eltdfInitAnimationHolder() {
        var elements = $('.eltdf-grow-in, .eltdf-fade-in-down, .eltdf-element-from-fade, .eltdf-element-from-left, .eltdf-element-from-right, .eltdf-element-from-top, .eltdf-element-from-bottom, .eltdf-flip-in, .eltdf-x-rotate, .eltdf-z-rotate, .eltdf-y-translate, .eltdf-fade-in, .eltdf-fade-in-left-x-rotate'),
            animationClass, animationData, animationDelay;
        if (elements.length) {
            elements.each(function() {
                var thisElement = $(this);
                thisElement.appear(function() {
                    animationData = thisElement.data('animation');
                    animationDelay = parseInt(thisElement.data('animation-delay'));
                    if (typeof animationData !== 'undefined' && animationData !== '') {
                        animationClass = animationData;
                        var newClass = animationClass + '-on';
                        setTimeout(function() {
                            thisElement.addClass(newClass);
                        }, animationDelay);
                    }
                }, {
                    accX: 0,
                    accY: eltdfGlobalVars.vars.eltdfElementAppearAmount
                });
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var banner = {};
    eltdf.modules.banner = banner;
    banner.eltdfInitAnimationHolder = eltdfInitFullHeightBanner;
    banner.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitFullHeightBanner();
    }

    function eltdfInitFullHeightBanner() {
        var elements = $('.eltdf-banner-full-height');
        if (elements.length) {
            elements.each(function() {
                var thisElement = $(this),
                    closestRow = thisElement.closest('.vc_row');
                closestRow.addClass('eltdf-banner-row-holder');
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var button = {};
    eltdf.modules.button = button;
    button.eltdfButton = eltdfButton;
    button.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfButton().init();
    }
    var eltdfButton = function() {
        var buttons = $('.eltdf-btn');
        var buttonHoverColor = function(button) {
            if (typeof button.data('hover-color') !== 'undefined') {
                var changeButtonColor = function(event) {
                    event.data.button.css('color', event.data.color);
                };
                var originalColor = button.css('color');
                var hoverColor = button.data('hover-color');
                button.on('mouseenter', {
                    button: button,
                    color: hoverColor
                }, changeButtonColor);
                button.on('mouseleave', {
                    button: button,
                    color: originalColor
                }, changeButtonColor);
            }
        };
        var buttonHoverBgColor = function(button) {
            if (typeof button.data('hover-bg-color') !== 'undefined') {
                var changeButtonBg = function(event) {
                    event.data.button.css('background-color', event.data.color);
                };
                var originalBgColor = button.css('background-color');
                var hoverBgColor = button.data('hover-bg-color');
                button.on('mouseenter', {
                    button: button,
                    color: hoverBgColor
                }, changeButtonBg);
                button.on('mouseleave', {
                    button: button,
                    color: originalBgColor
                }, changeButtonBg);
            }
        };
        var buttonHoverBorderColor = function(button) {
            if (typeof button.data('hover-border-color') !== 'undefined') {
                var changeBorderColor = function(event) {
                    event.data.button.css('border-color', event.data.color);
                };
                var originalBorderColor = button.css('borderTopColor');
                var hoverBorderColor = button.data('hover-border-color');
                button.on('mouseenter', {
                    button: button,
                    color: hoverBorderColor
                }, changeBorderColor);
                button.on('mouseleave', {
                    button: button,
                    color: originalBorderColor
                }, changeBorderColor);
            }
        };
        return {
            init: function() {
                if (buttons.length) {
                    buttons.each(function() {
                        buttonHoverColor($(this));
                        buttonHoverBgColor($(this));
                        buttonHoverBorderColor($(this));
                    });
                }
            }
        };
    };
})(jQuery);
(function($) {
    'use strict';
    var counter = {};
    eltdf.modules.counter = counter;
    counter.eltdfInitCounter = eltdfInitCounter;
    counter.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitCounter();
    }

    function eltdfInitCounter() {
        var counterHolder = $('.eltdf-counter-holder');
        if (counterHolder.length) {
            counterHolder.each(function() {
                var thisCounterHolder = $(this),
                    thisCounter = thisCounterHolder.find('.eltdf-counter');
                thisCounterHolder.appear(function() {
                    thisCounterHolder.css('opacity', '1');
                    if (thisCounter.hasClass('eltdf-zero-counter')) {
                        var max = parseFloat(thisCounter.text());
                        thisCounter.countTo({
                            from: 0,
                            to: max,
                            speed: 1500,
                            refreshInterval: 100
                        });
                    } else {
                        thisCounter.absoluteCounter({
                            speed: 2000,
                            fadeInDelay: 1000
                        });
                    }
                }, {
                    accX: 0,
                    accY: eltdfGlobalVars.vars.eltdfElementAppearAmount
                });
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var countdown = {};
    eltdf.modules.countdown = countdown;
    countdown.eltdfInitCountdown = eltdfInitCountdown;
    countdown.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitCountdown();
    }

    function eltdfInitCountdown() {
        var countdowns = $('.eltdf-countdown'),
            date = new Date(),
            currentMonth = date.getMonth(),
            currentYear = date.getFullYear(),
            year, month, day, hour, minute, timezone, monthLabel, dayLabel, hourLabel, minuteLabel, secondLabel;
        if (countdowns.length) {
            countdowns.each(function() {
                var countdownId = $(this).attr('id'),
                    countdown = $('#' + countdownId),
                    digitFontSize, labelFontSize;
                year = countdown.data('year');
                month = countdown.data('month');
                day = countdown.data('day');
                hour = countdown.data('hour');
                minute = countdown.data('minute');
                timezone = countdown.data('timezone');
                monthLabel = countdown.data('month-label');
                dayLabel = countdown.data('day-label');
                hourLabel = countdown.data('hour-label');
                minuteLabel = countdown.data('minute-label');
                secondLabel = countdown.data('second-label');
                digitFontSize = countdown.data('digit-size');
                labelFontSize = countdown.data('label-size');
                if (currentMonth !== month || currentYear !== year) {
                    month = month - 1;
                }
                countdown.countdown({
                    until: new Date(year, month, day, hour, minute, 44),
                    labels: ['', monthLabel, '', dayLabel, hourLabel, minuteLabel, secondLabel],
                    format: 'ODHMS',
                    timezone: timezone,
                    padZeroes: true,
                    onTick: setCountdownStyle
                });

                function setCountdownStyle() {
                    countdown.find('.countdown-amount').css({
                        'font-size': digitFontSize + 'px',
                        'line-height': digitFontSize + 'px'
                    });
                    countdown.find('.countdown-period').css({
                        'font-size': labelFontSize + 'px'
                    });
                }
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var customFont = {};
    eltdf.modules.customFont = customFont;
    customFont.eltdfCustomFontResize = eltdfCustomFontResize;
    customFont.eltdfCustomFontTypeOut = eltdfCustomFontTypeOut;
    customFont.eltdfOnDocumentReady = eltdfOnDocumentReady;
    customFont.eltdfOnWindowLoad = eltdfOnWindowLoad;
    $(document).ready(eltdfOnDocumentReady);
    $(window).on('load', eltdfOnWindowLoad);

    function eltdfOnDocumentReady() {
        eltdfCustomFontResize();
    }

    function eltdfOnWindowLoad() {
        eltdfCustomFontTypeOut();
    }

    function eltdfCustomFontResize() {
        var holder = $('.eltdf-custom-font-holder');
        if (holder.length) {
            holder.each(function() {
                var thisItem = $(this),
                    itemClass = '',
                    smallLaptopStyle = '',
                    ipadLandscapeStyle = '',
                    ipadPortraitStyle = '',
                    mobileLandscapeStyle = '',
                    style = '',
                    responsiveStyle = '';
                if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
                    itemClass = thisItem.data('item-class');
                }
                if (typeof thisItem.data('font-size-1366') !== 'undefined' && thisItem.data('font-size-1366') !== false) {
                    smallLaptopStyle += 'font-size: ' + thisItem.data('font-size-1366') + ' !important;';
                }
                if (typeof thisItem.data('font-size-1024') !== 'undefined' && thisItem.data('font-size-1024') !== false) {
                    ipadLandscapeStyle += 'font-size: ' + thisItem.data('font-size-1024') + ' !important;';
                }
                if (typeof thisItem.data('font-size-768') !== 'undefined' && thisItem.data('font-size-768') !== false) {
                    ipadPortraitStyle += 'font-size: ' + thisItem.data('font-size-768') + ' !important;';
                }
                if (typeof thisItem.data('font-size-680') !== 'undefined' && thisItem.data('font-size-680') !== false) {
                    mobileLandscapeStyle += 'font-size: ' + thisItem.data('font-size-680') + ' !important;';
                }
                if (typeof thisItem.data('line-height-1366') !== 'undefined' && thisItem.data('line-height-1366') !== false) {
                    smallLaptopStyle += 'line-height: ' + thisItem.data('line-height-1366') + ' !important;';
                }
                if (typeof thisItem.data('line-height-1024') !== 'undefined' && thisItem.data('line-height-1024') !== false) {
                    ipadLandscapeStyle += 'line-height: ' + thisItem.data('line-height-1024') + ' !important;';
                }
                if (typeof thisItem.data('line-height-768') !== 'undefined' && thisItem.data('line-height-768') !== false) {
                    ipadPortraitStyle += 'line-height: ' + thisItem.data('line-height-768') + ' !important;';
                }
                if (typeof thisItem.data('line-height-680') !== 'undefined' && thisItem.data('line-height-680') !== false) {
                    mobileLandscapeStyle += 'line-height: ' + thisItem.data('line-height-680') + ' !important;';
                }
                if (smallLaptopStyle.length || ipadLandscapeStyle.length || ipadPortraitStyle.length || mobileLandscapeStyle.length) {
                    if (smallLaptopStyle.length) {
                        responsiveStyle += "@media only screen and (max-width: 1366px) {.eltdf-custom-font-holder." + itemClass + " { " + smallLaptopStyle + " } }";
                    }
                    if (ipadLandscapeStyle.length) {
                        responsiveStyle += "@media only screen and (max-width: 1024px) {.eltdf-custom-font-holder." + itemClass + " { " + ipadLandscapeStyle + " } }";
                    }
                    if (ipadPortraitStyle.length) {
                        responsiveStyle += "@media only screen and (max-width: 768px) {.eltdf-custom-font-holder." + itemClass + " { " + ipadPortraitStyle + " } }";
                    }
                    if (mobileLandscapeStyle.length) {
                        responsiveStyle += "@media only screen and (max-width: 680px) {.eltdf-custom-font-holder." + itemClass + " { " + mobileLandscapeStyle + " } }";
                    }
                }
                if (responsiveStyle.length) {
                    style = '<style type="text/css">' + responsiveStyle + '</style>';
                }
                if (style.length) {
                    $('head').append(style);
                }
            });
        }
    }

    function eltdfCustomFontTypeOut() {
        var eltdfTyped = $('.eltdf-cf-typed');
        if (eltdfTyped.length) {
            eltdfTyped.each(function() {
                var thisTyped = $(this),
                    typedWrap = thisTyped.parent('.eltdf-cf-typed-wrap'),
                    customFontHolder = typedWrap.parent('.eltdf-custom-font-holder'),
                    str = [],
                    string_1 = thisTyped.find('.eltdf-cf-typed-1').text(),
                    string_2 = thisTyped.find('.eltdf-cf-typed-2').text(),
                    string_3 = thisTyped.find('.eltdf-cf-typed-3').text(),
                    string_4 = thisTyped.find('.eltdf-cf-typed-4').text();
                if (string_1.length) {
                    str.push(string_1);
                }
                if (string_2.length) {
                    str.push(string_2);
                }
                if (string_3.length) {
                    str.push(string_3);
                }
                if (string_4.length) {
                    str.push(string_4);
                }
                customFontHolder.appear(function() {
                    thisTyped.typed({
                        strings: str,
                        typeSpeed: 90,
                        backDelay: 700,
                        loop: true,
                        contentType: 'text',
                        loopCount: false,
                        cursorChar: '_'
                    });
                }, {
                    accX: 0,
                    accY: eltdfGlobalVars.vars.eltdfElementAppearAmount
                });
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var elementsHolder = {};
    eltdf.modules.elementsHolder = elementsHolder;
    elementsHolder.eltdfInitElementsHolderResponsiveStyle = eltdfInitElementsHolderResponsiveStyle;
    elementsHolder.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitElementsHolderResponsiveStyle();
    }

    function eltdfInitElementsHolderResponsiveStyle() {
        var elementsHolder = $('.eltdf-elements-holder');
        if (elementsHolder.length) {
            elementsHolder.each(function() {
                var thisElementsHolder = $(this),
                    elementsHolderItem = thisElementsHolder.children('.eltdf-eh-item'),
                    style = '',
                    responsiveStyle = '';
                elementsHolderItem.each(function() {
                    var thisItem = $(this),
                        thisItemSurface = thisItem.find('.eltdf-elements-holder-background-outer'),
                        itemClass = '',
                        largeLaptop = '',
                        smallLaptop = '',
                        ipadLandscape = '',
                        ipadPortrait = '',
                        mobileLandscape = '',
                        mobilePortrait = '',
                        largeLaptopSurface = '',
                        smallLaptopSurface = '',
                        ipadLandscapeSurface = '',
                        ipadPortraitSurface = '',
                        mobileLandscapeSurface = '',
                        mobilePortraitSurface = '';
                    if (thisItem.is('.eltdf-eh-expander')) {
                        $(window).scroll(function() {
                            var elOffset = thisItem.offset().top + 200;
                            var scrollOffset = eltdf.scroll + window.innerHeight,
                                scrollBelow = scrollOffset >= elOffset;
                            if (scrollBelow) {
                                thisItem.addClass('eltdf-eh-expander-on');
                            }
                        });
                    }
                    if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
                        itemClass = thisItem.data('item-class');
                    }
                    if (typeof thisItem.data('1367-1600') !== 'undefined' && thisItem.data('1367-1600') !== false) {
                        largeLaptop = thisItem.data('1367-1600');
                    }
                    if (typeof thisItem.data('1025-1366') !== 'undefined' && thisItem.data('1025-1366') !== false) {
                        smallLaptop = thisItem.data('1025-1366');
                    }
                    if (typeof thisItem.data('769-1024') !== 'undefined' && thisItem.data('769-1024') !== false) {
                        ipadLandscape = thisItem.data('769-1024');
                    }
                    if (typeof thisItem.data('681-768') !== 'undefined' && thisItem.data('681-768') !== false) {
                        ipadPortrait = thisItem.data('681-768');
                    }
                    if (typeof thisItem.data('481-680') !== 'undefined' && thisItem.data('481-680') !== false) {
                        mobileLandscape = thisItem.data('481-680');
                    }
                    if (typeof thisItem.data('480') !== 'undefined' && thisItem.data('480') !== false) {
                        mobilePortrait = thisItem.data('480');
                    }
                    if (typeof thisItemSurface.data('1367-1600') !== 'undefined' && thisItemSurface.data('1367-1600') !== false) {
                        largeLaptopSurface = thisItemSurface.data('1367-1600');
                    }
                    if (typeof thisItemSurface.data('1025-1366') !== 'undefined' && thisItemSurface.data('1025-1366') !== false) {
                        smallLaptopSurface = thisItemSurface.data('1025-1366');
                    }
                    if (typeof thisItemSurface.data('769-1024') !== 'undefined' && thisItemSurface.data('769-1024') !== false) {
                        ipadLandscapeSurface = thisItemSurface.data('769-1024');
                    }
                    if (typeof thisItemSurface.data('681-768') !== 'undefined' && thisItemSurface.data('681-768') !== false) {
                        ipadPortraitSurface = thisItemSurface.data('681-768');
                    }
                    if (typeof thisItemSurface.data('481-680') !== 'undefined' && thisItemSurface.data('481-680') !== false) {
                        mobileLandscapeSurface = thisItemSurface.data('481-680');
                    }
                    if (typeof thisItemSurface.data('480') !== 'undefined' && thisItemSurface.data('480') !== false) {
                        mobilePortraitSurface = thisItemSurface.data('480');
                    }
                    if (largeLaptop.length || smallLaptop.length || ipadLandscape.length || ipadPortrait.length || mobileLandscape.length || mobilePortrait.length) {
                        if (largeLaptop.length) {
                            responsiveStyle += "@media only screen and (min-width: 1367px) and (max-width: 1600px) {.eltdf-eh-item." + itemClass + " .eltdf-eh-item-content { padding: " + largeLaptop + " !important; } }";
                        }
                        if (smallLaptop.length) {
                            responsiveStyle += "@media only screen and (min-width: 1025px) and (max-width: 1366px) {.eltdf-eh-item." + itemClass + " .eltdf-eh-item-content { padding: " + smallLaptop + " !important; } }";
                        }
                        if (ipadLandscape.length) {
                            responsiveStyle += "@media only screen and (min-width: 769px) and (max-width: 1024px) {.eltdf-eh-item." + itemClass + " .eltdf-eh-item-content { padding: " + ipadLandscape + " !important; } }";
                        }
                        if (ipadPortrait.length) {
                            responsiveStyle += "@media only screen and (min-width: 681px) and (max-width: 768px) {.eltdf-eh-item." + itemClass + " .eltdf-eh-item-content { padding: " + ipadPortrait + " !important; } }";
                        }
                        if (mobileLandscape.length) {
                            responsiveStyle += "@media only screen and (min-width: 481px) and (max-width: 680px) {.eltdf-eh-item." + itemClass + " .eltdf-eh-item-content { padding: " + mobileLandscape + " !important; } }";
                        }
                        if (mobilePortrait.length) {
                            responsiveStyle += "@media only screen and (max-width: 480px) {.eltdf-eh-item." + itemClass + " .eltdf-eh-item-content { padding: " + mobilePortrait + " !important; } }";
                        }
                    }
                    if (largeLaptopSurface.length || smallLaptopSurface.length || ipadLandscapeSurface.length || ipadPortraitSurface.length || mobileLandscapeSurface.length || mobilePortraitSurface.length) {
                        if (largeLaptopSurface.length) {
                            responsiveStyle += "@media only screen and (min-width: 1367px) and (max-width: 1600px) {.eltdf-eh-item." + itemClass + " .eltdf-elements-holder-background-outer { padding: " + largeLaptopSurface + " !important; } }";
                        }
                        if (smallLaptopSurface.length) {
                            responsiveStyle += "@media only screen and (min-width: 1025px) and (max-width: 1366px) {.eltdf-eh-item." + itemClass + " .eltdf-elements-holder-background-outer { padding: " + smallLaptopSurface + " !important; } }";
                        }
                        if (ipadLandscapeSurface.length) {
                            responsiveStyle += "@media only screen and (min-width: 769px) and (max-width: 1024px) {.eltdf-eh-item." + itemClass + " .eltdf-elements-holder-background-outer { padding: " + ipadLandscapeSurface + " !important; } }";
                        }
                        if (ipadPortraitSurface.length) {
                            responsiveStyle += "@media only screen and (min-width: 681px) and (max-width: 768px) {.eltdf-eh-item." + itemClass + " .eltdf-elements-holder-background-outer { padding: " + ipadPortraitSurface + " !important; } }";
                        }
                        if (mobileLandscapeSurface.length) {
                            responsiveStyle += "@media only screen and (min-width: 481px) and (max-width: 680px) {.eltdf-eh-item." + itemClass + " .eltdf-elements-holder-background-outer { padding: " + mobileLandscapeSurface + " !important; } }";
                        }
                        if (mobilePortraitSurface.length) {
                            responsiveStyle += "@media only screen and (max-width: 480px) {.eltdf-eh-item." + itemClass + " .eltdf-elements-holder-background-outer { padding: " + mobilePortraitSurface + " !important; } }";
                        }
                    }
                    if (typeof eltdf.modules.common.eltdfOwlSlider === "function") {
                        var owl = thisItem.find('.eltdf-owl-slider');
                        if (owl.length) {
                            setTimeout(function() {
                                owl.trigger('refresh.owl.carousel');
                            }, 100);
                        }
                    }
                });
                if (responsiveStyle.length) {
                    style = '<style type="text/css">' + responsiveStyle + '</style>';
                }
                if (style.length) {
                    $('head').append(style);
                }
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var fullScreenImageSlider = {};
    eltdf.modules.fullScreenImageSlider = fullScreenImageSlider;
    fullScreenImageSlider.eltdfOnWindowLoad = eltdfOnWindowLoad;
    $(window).on('load', eltdfOnWindowLoad);

    function eltdfOnWindowLoad() {
        eltdfInitFullScreenImageSlider();
    }

    function eltdfInitFullScreenImageSlider() {
        var holder = $('.eltdf-fsis-slider');
        if (holder.length) {
            holder.each(function() {
                var sliderHolder = $(this),
                    mainHolder = sliderHolder.parent(),
                    prevThumbNav = mainHolder.children('.eltdf-fsis-prev-nav'),
                    nextThumbNav = mainHolder.children('.eltdf-fsis-next-nav'),
                    maskHolder = mainHolder.children('.eltdf-fsis-slider-mask');
                mainHolder.addClass('eltdf-fsis-is-init');
                eltdfImageBehavior(sliderHolder);
                eltdfPrevNextImageBehavior(sliderHolder, prevThumbNav, nextThumbNav, -1);
                sliderHolder.on('drag.owl.carousel', function() {
                    setTimeout(function() {
                        if (!maskHolder.hasClass('eltdf-drag') && !mainHolder.hasClass('eltdf-fsis-active')) {
                            maskHolder.addClass('eltdf-drag');
                        }
                    }, 200);
                });
                sliderHolder.on('dragged.owl.carousel', function() {
                    setTimeout(function() {
                        if (maskHolder.hasClass('eltdf-drag')) {
                            maskHolder.removeClass('eltdf-drag');
                        }
                    }, 300);
                });
                sliderHolder.on('translate.owl.carousel', function(e) {
                    eltdfPrevNextImageBehavior(sliderHolder, prevThumbNav, nextThumbNav, e.item.index);
                });
                sliderHolder.on('translated.owl.carousel', function() {
                    eltdfImageBehavior(sliderHolder);
                    setTimeout(function() {
                        maskHolder.removeClass('eltdf-drag');
                    }, 300);
                });
            });
        }
    }

    function eltdfImageBehavior(sliderHolder) {
        var activeItem = sliderHolder.find('.owl-item.active'),
            imageHolder = sliderHolder.find('.eltdf-fsis-item');
        imageHolder.removeClass('eltdf-fsis-content-image-init');
        eltdfResetImageBehavior(sliderHolder);
        if (activeItem.length) {
            var activeImageHolder = activeItem.find('.eltdf-fsis-item'),
                activeItemImage = activeImageHolder.children('.eltdf-fsis-image');
            setTimeout(function() {
                activeImageHolder.addClass('eltdf-fsis-content-image-init');
            }, 100);
            activeItemImage.off().on('mouseenter', function() {
                activeImageHolder.addClass('eltdf-fsis-image-hover');
            }).on('mouseleave', function() {
                activeImageHolder.removeClass('eltdf-fsis-image-hover');
            }).on('click', function() {
                if (activeImageHolder.hasClass('eltdf-fsis-active-image')) {
                    sliderHolder.trigger('play.owl.autoplay');
                    sliderHolder.parent().removeClass('eltdf-fsis-active');
                    activeImageHolder.removeClass('eltdf-fsis-active-image');
                } else {
                    sliderHolder.trigger('stop.owl.autoplay');
                    sliderHolder.parent().addClass('eltdf-fsis-active');
                    activeImageHolder.addClass('eltdf-fsis-active-image');
                }
            });
            $(document).keyup(function(e) {
                if (e.keyCode === 27) {
                    sliderHolder.trigger('play.owl.autoplay');
                    sliderHolder.parent().removeClass('eltdf-fsis-active');
                    activeImageHolder.removeClass('eltdf-fsis-active-image');
                }
            });
        }
    }

    function eltdfPrevNextImageBehavior(sliderHolder, prevThumbNav, nextThumbNav, itemIndex) {
        var activeItem = itemIndex === -1 ? sliderHolder.find('.owl-item.active') : $(sliderHolder.find('.owl-item')[itemIndex]),
            prevItemImage = activeItem.prev().find('.eltdf-fsis-image').css('background-image'),
            nextItemImage = activeItem.next().find('.eltdf-fsis-image').css('background-image');
        if (prevItemImage.length) {
            prevThumbNav.css({
                'background-image': prevItemImage
            });
        }
        if (nextItemImage.length) {
            nextThumbNav.css({
                'background-image': nextItemImage
            });
        }
    }

    function eltdfResetImageBehavior(sliderHolder) {
        var imageHolder = sliderHolder.find('.eltdf-fsis-item');
        if (imageHolder.length) {
            imageHolder.removeClass('eltdf-fsis-active-image');
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var fullScreenSections = {};
    eltdf.modules.fullScreenSections = fullScreenSections;
    fullScreenSections.eltdfInitFullScreenSections = eltdfInitFullScreenSections;
    fullScreenSections.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitFullScreenSections();
    }

    function eltdfInitFullScreenSections() {
        var fullScreenSections = $('.eltdf-full-screen-sections');
        if (fullScreenSections.length) {
            fullScreenSections.each(function() {
                var thisFullScreenSections = $(this),
                    fullScreenSectionsWrapper = thisFullScreenSections.children('.eltdf-fss-wrapper'),
                    fullScreenSectionsItems = fullScreenSectionsWrapper.children('.eltdf-fss-item'),
                    fullScreenSectionsItemsNumber = fullScreenSectionsItems.length,
                    fullScreenSectionsItemsHasHeaderStyle = fullScreenSectionsItems.hasClass('eltdf-fss-item-has-style'),
                    enableContinuousVertical = false,
                    enableNavigationData = '',
                    enablePaginationData = '';
                var defaultHeaderStyle = '';
                if (eltdf.body.hasClass('eltdf-light-header')) {
                    defaultHeaderStyle = 'light';
                } else if (eltdf.body.hasClass('eltdf-dark-header')) {
                    defaultHeaderStyle = 'dark';
                }
                if (typeof thisFullScreenSections.data('enable-continuous-vertical') !== 'undefined' && thisFullScreenSections.data('enable-continuous-vertical') !== false && thisFullScreenSections.data('enable-continuous-vertical') === 'yes') {
                    enableContinuousVertical = true;
                }
                if (typeof thisFullScreenSections.data('enable-navigation') !== 'undefined' && thisFullScreenSections.data('enable-navigation') !== false) {
                    enableNavigationData = thisFullScreenSections.data('enable-navigation');
                }
                if (typeof thisFullScreenSections.data('enable-pagination') !== 'undefined' && thisFullScreenSections.data('enable-pagination') !== false) {
                    enablePaginationData = thisFullScreenSections.data('enable-pagination');
                }
                var enableNavigation = enableNavigationData !== 'no',
                    enablePagination = enablePaginationData !== 'no';
                fullScreenSectionsWrapper.fullpage({
                    sectionSelector: '.eltdf-fss-item',
                    scrollingSpeed: 1200,
                    verticalCentered: false,
                    continuousVertical: enableContinuousVertical,
                    navigation: enablePagination,
                    onLeave: function(index, nextIndex, direction) {
                        if (fullScreenSectionsItemsHasHeaderStyle) {
                            checkFullScreenSectionsItemForHeaderStyle($(fullScreenSectionsItems[nextIndex - 1]).data('header-style'), defaultHeaderStyle);
                        }
                        if (enableNavigation) {
                            checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, nextIndex);
                        }
                    },
                    afterRender: function() {
                        if (fullScreenSectionsItemsHasHeaderStyle) {
                            checkFullScreenSectionsItemForHeaderStyle(fullScreenSectionsItems.first().data('header-style'), defaultHeaderStyle);
                        }
                        if (enableNavigation) {
                            checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, 1);
                            thisFullScreenSections.children('.eltdf-fss-nav-holder').css('visibility', 'visible');
                        }
                        fullScreenSectionsWrapper.css('visibility', 'visible');
                    }
                });
                setResposniveData(thisFullScreenSections);
                if (enableNavigation) {
                    thisFullScreenSections.find('#eltdf-fss-nav-up').on('click', function() {
                        $.fn.fullpage.moveSectionUp();
                        return false;
                    });
                    thisFullScreenSections.find('#eltdf-fss-nav-down').on('click', function() {
                        $.fn.fullpage.moveSectionDown();
                        return false;
                    });
                }
            });
        }
    }

    function checkFullScreenSectionsItemForHeaderStyle(section_header_style, default_header_style) {
        if (section_header_style !== undefined && section_header_style !== '') {
            eltdf.body.removeClass('eltdf-light-header eltdf-dark-header').addClass('eltdf-' + section_header_style + '-header');
        } else if (default_header_style !== '') {
            eltdf.body.removeClass('eltdf-light-header eltdf-dark-header').addClass('eltdf-' + default_header_style + '-header');
        } else {
            eltdf.body.removeClass('eltdf-light-header eltdf-dark-header');
        }
    }

    function checkActiveArrowsOnFullScrrenTemplate(thisFullScreenSections, fullScreenSectionsItemsNumber, index) {
        var thisHolder = thisFullScreenSections,
            thisHolderArrowsUp = thisHolder.find('#eltdf-fss-nav-up'),
            thisHolderArrowsDown = thisHolder.find('#eltdf-fss-nav-down'),
            enableContinuousVertical = false;
        if (typeof thisFullScreenSections.data('enable-continuous-vertical') !== 'undefined' && thisFullScreenSections.data('enable-continuous-vertical') !== false && thisFullScreenSections.data('enable-continuous-vertical') === 'yes') {
            enableContinuousVertical = true;
        }
        if (index === 1 && !enableContinuousVertical) {
            thisHolderArrowsUp.css({
                'opacity': '0',
                'height': '0',
                'visibility': 'hidden'
            });
            thisHolderArrowsDown.css({
                'opacity': '0',
                'height': '0',
                'visibility': 'hidden'
            });
            if (index !== fullScreenSectionsItemsNumber) {
                thisHolderArrowsDown.css({
                    'opacity': '1',
                    'height': 'auto',
                    'visibility': 'visible'
                });
            }
        } else if (index === fullScreenSectionsItemsNumber && !enableContinuousVertical) {
            thisHolderArrowsDown.css({
                'opacity': '0',
                'height': '0',
                'visibility': 'hidden'
            });
            if (fullScreenSectionsItemsNumber === 2) {
                thisHolderArrowsUp.css({
                    'opacity': '1',
                    'height': 'auto',
                    'visibility': 'visible'
                });
            }
        } else {
            thisHolderArrowsUp.css({
                'opacity': '1',
                'height': 'auto',
                'visibility': 'visible'
            });
            thisHolderArrowsDown.css({
                'opacity': '1',
                'height': 'auto',
                'visibility': 'visible'
            });
        }
    }

    function setResposniveData(thisFullScreenSections) {
        var fullScreenSections = thisFullScreenSections.find('.eltdf-fss-item'),
            responsiveStyle = '',
            style = '';
        fullScreenSections.each(function() {
            var thisSection = $(this),
                itemClass = '',
                imageLaptop = '',
                imageTablet = '',
                imagePortraitTablet = '',
                imageMobile = '';
            if (typeof thisSection.data('item-class') !== 'undefined' && thisSection.data('item-class') !== false) {
                itemClass = thisSection.data('item-class');
            }
            if (typeof thisSection.data('laptop-image') !== 'undefined' && thisSection.data('laptop-image') !== false) {
                imageLaptop = thisSection.data('laptop-image');
            }
            if (typeof thisSection.data('tablet-image') !== 'undefined' && thisSection.data('tablet-image') !== false) {
                imageTablet = thisSection.data('tablet-image');
            }
            if (typeof thisSection.data('tablet-portrait-image') !== 'undefined' && thisSection.data('tablet-portrait-image') !== false) {
                imagePortraitTablet = thisSection.data('tablet-portrait-image');
            }
            if (typeof thisSection.data('mobile-image') !== 'undefined' && thisSection.data('mobile-image') !== false) {
                imageMobile = thisSection.data('mobile-image');
            }
            if (imageLaptop.length || imageTablet.length || imagePortraitTablet.length || imageMobile.length) {
                if (imageLaptop.length) {
                    responsiveStyle += "@media only screen and (max-width: 1366px) {.eltdf-fss-item." + itemClass + " { background-image: url(" + imageLaptop + ") !important; } }";
                }
                if (imageTablet.length) {
                    responsiveStyle += "@media only screen and (max-width: 1024px) {.eltdf-fss-item." + itemClass + " { background-image: url( " + imageTablet + ") !important; } }";
                }
                if (imagePortraitTablet.length) {
                    responsiveStyle += "@media only screen and (max-width: 800px) {.eltdf-fss-item." + itemClass + " { background-image: url( " + imagePortraitTablet + ") !important; } }";
                }
                if (imageMobile.length) {
                    responsiveStyle += "@media only screen and (max-width: 680px) {.eltdf-fss-item." + itemClass + " { background-image: url( " + imageMobile + ") !important; } }";
                }
            }
        });
        if (responsiveStyle.length) {
            style = '<style type="text/css">' + responsiveStyle + '</style>';
        }
        if (style.length) {
            $('head').append(style);
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var googleMap = {};
    eltdf.modules.googleMap = googleMap;
    googleMap.eltdfShowGoogleMap = eltdfShowGoogleMap;
    googleMap.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfShowGoogleMap();
    }

    function eltdfShowGoogleMap() {
        var googleMap = $('.eltdf-google-map');
        if (googleMap.length) {
            googleMap.each(function() {
                var element = $(this);
                var snazzyMapStyle = false;
                var snazzyMapCode = '';
                if (typeof element.data('snazzy-map-style') !== 'undefined' && element.data('snazzy-map-style') === 'yes') {
                    snazzyMapStyle = true;
                    var snazzyMapHolder = element.parent().find('.eltdf-snazzy-map'),
                        snazzyMapCodes = snazzyMapHolder.val();
                    if (snazzyMapHolder.length && snazzyMapCodes.length) {
                        snazzyMapCode = JSON.parse(snazzyMapCodes.replace(/`{`/g, '[').replace(/`}`/g, ']').replace(/``/g, '"').replace(/`/g, ''));
                    }
                }
                var customMapStyle;
                if (typeof element.data('custom-map-style') !== 'undefined') {
                    customMapStyle = element.data('custom-map-style');
                }
                var colorOverlay;
                if (typeof element.data('color-overlay') !== 'undefined' && element.data('color-overlay') !== false) {
                    colorOverlay = element.data('color-overlay');
                }
                var saturation;
                if (typeof element.data('saturation') !== 'undefined' && element.data('saturation') !== false) {
                    saturation = element.data('saturation');
                }
                var lightness;
                if (typeof element.data('lightness') !== 'undefined' && element.data('lightness') !== false) {
                    lightness = element.data('lightness');
                }
                var zoom;
                if (typeof element.data('zoom') !== 'undefined' && element.data('zoom') !== false) {
                    zoom = element.data('zoom');
                }
                var pin;
                if (typeof element.data('pin') !== 'undefined' && element.data('pin') !== false) {
                    pin = element.data('pin');
                }
                var mapHeight;
                if (typeof element.data('height') !== 'undefined' && element.data('height') !== false) {
                    mapHeight = element.data('height');
                }
                var uniqueId;
                if (typeof element.data('unique-id') !== 'undefined' && element.data('unique-id') !== false) {
                    uniqueId = element.data('unique-id');
                }
                var scrollWheel;
                if (typeof element.data('scroll-wheel') !== 'undefined') {
                    scrollWheel = element.data('scroll-wheel');
                }
                var addresses;
                if (typeof element.data('addresses') !== 'undefined' && element.data('addresses') !== false) {
                    addresses = element.data('addresses');
                }
                var map = "map_" + uniqueId;
                var geocoder = "geocoder_" + uniqueId;
                var holderId = "eltdf-map-" + uniqueId;
                eltdfInitializeGoogleMap(snazzyMapStyle, snazzyMapCode, customMapStyle, colorOverlay, saturation, lightness, scrollWheel, zoom, holderId, mapHeight, pin, map, geocoder, addresses);
            });
        }
    }

    function eltdfInitializeGoogleMap(snazzyMapStyle, snazzyMapCode, customMapStyle, color, saturation, lightness, wheel, zoom, holderId, height, pin, map, geocoder, data) {
        if (typeof google !== 'object') {
            return;
        }
        var mapStyles = [];
        if (snazzyMapStyle && snazzyMapCode.length) {
            mapStyles = snazzyMapCode;
        } else {
            mapStyles = [{
                stylers: [{
                    hue: color
                }, {
                    saturation: saturation
                }, {
                    lightness: lightness
                }, {
                    gamma: 1
                }]
            }];
        }
        var googleMapStyleId;
        if (snazzyMapStyle || customMapStyle === 'yes') {
            googleMapStyleId = 'eltdf-style';
        } else {
            googleMapStyleId = google.maps.MapTypeId.ROADMAP;
        }
        wheel = wheel === 'yes';
        var qoogleMapType = new google.maps.StyledMapType(mapStyles, {
            name: "Google Map"
        });
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-34.397, 150.644);
        if (!isNaN(height)) {
            height = height + 'px';
        }
        var myOptions = {
            zoom: zoom,
            scrollwheel: wheel,
            center: latlng,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            scaleControl: false,
            scaleControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            streetViewControl: false,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            panControl: false,
            panControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            mapTypeControl: false,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'eltdf-style'],
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            mapTypeId: googleMapStyleId
        };
        map = new google.maps.Map(document.getElementById(holderId), myOptions);
        map.mapTypes.set('eltdf-style', qoogleMapType);
        var index;
        for (index = 0; index < data.length; ++index) {
            eltdfInitializeGoogleAddress(data[index], pin, map, geocoder);
        }
        var holderElement = document.getElementById(holderId);
        holderElement.style.height = height;
    }

    function eltdfInitializeGoogleAddress(data, pin, map, geocoder) {
        if (data === '') {
            return;
        }
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<div id="bodyContent">' +
            '<p>' + data + '</p>' +
            '</div>' +
            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        geocoder.geocode({
            'address': data
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: pin,
                    title: data.store_title
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });
                google.maps.event.addDomListener(window, 'resize', function() {
                    map.setCenter(results[0].geometry.location);
                });
            }
        });
    }
})(jQuery);
(function($) {
    'use strict';
    var icon = {};
    eltdf.modules.icon = icon;
    icon.eltdfIcon = eltdfIcon;
    icon.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfIcon().init();
    }
    var eltdfIcon = function() {
        var icons = $('.eltdf-icon-shortcode');
        var iconAnimation = function(icon) {
            if (icon.hasClass('eltdf-icon-animation')) {
                icon.appear(function() {
                    icon.parent('.eltdf-icon-animation-holder').addClass('eltdf-icon-animation-show');
                }, {
                    accX: 0,
                    accY: eltdfGlobalVars.vars.eltdfElementAppearAmount
                });
            }
        };
        var iconHoverColor = function(icon) {
            if (typeof icon.data('hover-color') !== 'undefined') {
                var changeIconColor = function(event) {
                    event.data.icon.css('color', event.data.color);
                };
                var iconElement = icon.find('.eltdf-icon-element');
                var hoverColor = icon.data('hover-color');
                var originalColor = iconElement.css('color');
                if (hoverColor !== '') {
                    icon.on('mouseenter', {
                        icon: iconElement,
                        color: hoverColor
                    }, changeIconColor);
                    icon.on('mouseleave', {
                        icon: iconElement,
                        color: originalColor
                    }, changeIconColor);
                }
            }
        };
        var iconHolderBackgroundHover = function(icon) {
            if (typeof icon.data('hover-background-color') !== 'undefined') {
                var changeIconBgColor = function(event) {
                    event.data.icon.css('background-color', event.data.color);
                };
                var hoverBackgroundColor = icon.data('hover-background-color');
                var originalBackgroundColor = icon.css('background-color');
                if (hoverBackgroundColor !== '') {
                    icon.on('mouseenter', {
                        icon: icon,
                        color: hoverBackgroundColor
                    }, changeIconBgColor);
                    icon.on('mouseleave', {
                        icon: icon,
                        color: originalBackgroundColor
                    }, changeIconBgColor);
                }
            }
        };
        var iconHolderBorderHover = function(icon) {
            if (typeof icon.data('hover-border-color') !== 'undefined') {
                var changeIconBorder = function(event) {
                    event.data.icon.css('border-color', event.data.color);
                };
                var hoverBorderColor = icon.data('hover-border-color');
                var originalBorderColor = icon.css('borderTopColor');
                if (hoverBorderColor !== '') {
                    icon.on('mouseenter', {
                        icon: icon,
                        color: hoverBorderColor
                    }, changeIconBorder);
                    icon.on('mouseleave', {
                        icon: icon,
                        color: originalBorderColor
                    }, changeIconBorder);
                }
            }
        };
        return {
            init: function() {
                if (icons.length) {
                    icons.each(function() {
                        iconAnimation($(this));
                        iconHoverColor($(this));
                        iconHolderBackgroundHover($(this));
                        iconHolderBorderHover($(this));
                    });
                }
            }
        };
    };
})(jQuery);
(function($) {
    'use strict';
    var iconListItem = {};
    eltdf.modules.iconListItem = iconListItem;
    iconListItem.eltdfInitIconList = eltdfInitIconList;
    iconListItem.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitIconList().init();
    }
    var eltdfInitIconList = function() {
        var iconList = $('.eltdf-animate-list');
        var iconListInit = function(list) {
            setTimeout(function() {
                list.appear(function() {
                    list.addClass('eltdf-appeared');
                }, {
                    accX: 0,
                    accY: eltdfGlobalVars.vars.eltdfElementAppearAmount
                });
            }, 30);
        };
        return {
            init: function() {
                if (iconList.length) {
                    iconList.each(function() {
                        iconListInit($(this));
                    });
                }
            }
        };
    };
})(jQuery);
(function($) {
    'use strict';
    var introMasonry = {};
    eltdf.modules.introMasonry = introMasonry;
    introMasonry.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitIntroMasonry();
    }
    var eltdfInitIntroMasonry = function() {
        var imHolder = $('.eltdf-intro-masonry');
        if (imHolder.length) {
            var imItem = imHolder.find('.eltdf-im-image');
            var itemNum = imItem.length,
                delayRmv = (itemNum) * 120 + 300;
            $('html, body').css({
                overflow: 'hidden',
                height: '100%'
            });
            imHolder.waitForImages(function() {
                imItem.each(function() {
                    $(this).addClass('animated');
                });
                setTimeout(function() {
                    imHolder.css({
                        'transform': 'translateY(100%)',
                        'transition': 'all 1.25s cubic-bezier(0.54, 0.39, 0.04, 1)'
                    });
                    $('html, body').css({
                        overflow: 'auto',
                        height: 'auto'
                    });
                }, delayRmv);
            });
        }
    };
})(jQuery);
(function($) {
    'use strict';
    var linked = {};
    eltdf.modules.linked = linked;
    linked.eltdfInitLinkedImages = eltdfInitLinkedImages;
    linked.eltdfOnDocumentReady = eltdfOnDocumentReady;
    linked.eltdfOnWindowResize = eltdfOnWindowResize;
    $(document).ready(eltdfOnDocumentReady);
    $(window).resize(eltdfOnWindowResize);

    function eltdfOnDocumentReady() {
        eltdfInitLinkedImages();
    }

    function eltdfOnWindowResize() {
        eltdfInitLinkedImages();
    }

    function eltdfInitLinkedImages() {
        if ($('.eltdf-linked-images').length) {
            var holders = $('.eltdf-linked-image-holder');
            holders.each(function() {
                var holder = $(this),
                    imageHolder = holder.find('.eltdf-linked-image-image'),
                    fullHeight = $('.eltdf-linked-images').data('full-height');
                if (fullHeight === 'yes') {
                    var height = eltdf.windowHeight - eltdfGlobalVars.vars.eltdfMenuAreaHeight - eltdfGlobalVars.vars.eltdfLogoAreaHeight;
                    if ($('.eltdf-paspartu-enabled').length) {
                        height -= parseFloat($('.eltdf-wrapper').css('padding-top'));
                        height -= parseFloat($('.eltdf-wrapper').css('padding-bottom'));
                    }
                    imageHolder.height(height);
                    var headerMargin = parseFloat(holder.closest('.eltdf-content').css('margin-top'));
                    if (headerMargin !== 0) {
                        holder.css('margin-top', -headerMargin + 'px');
                    }
                    if (eltdf.windowWidth <= 1024) {
                        $('.eltdf-content .eltdf-content-inner > .eltdf-container > .eltdf-container-inner,' +
                            '.eltdf-content .eltdf-content-inner > .eltdf-full-width > .eltdf-full-width-inner').addClass('eltdf-disable-padding');
                    }
                }
            });
            $('.eltdf-linked-images').css('opacity', 1);
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var pieChart = {};
    eltdf.modules.pieChart = pieChart;
    pieChart.eltdfInitPieChart = eltdfInitPieChart;
    pieChart.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitPieChart();
    }

    function eltdfInitPieChart() {
        var pieChartHolder = $('.eltdf-pie-chart-holder');
        if (pieChartHolder.length) {
            pieChartHolder.each(function() {
                var thisPieChartHolder = $(this),
                    pieChart = thisPieChartHolder.children('.eltdf-pc-percentage'),
                    barColor = '#25abd1',
                    trackColor = '#f7f7f7',
                    lineWidth = 3,
                    size = 176;
                if (typeof pieChart.data('size') !== 'undefined' && pieChart.data('size') !== '') {
                    size = pieChart.data('size');
                }
                if (typeof pieChart.data('bar-color') !== 'undefined' && pieChart.data('bar-color') !== '') {
                    barColor = pieChart.data('bar-color');
                }
                if (typeof pieChart.data('track-color') !== 'undefined' && pieChart.data('track-color') !== '') {
                    trackColor = pieChart.data('track-color');
                }
                pieChart.appear(function() {
                    initToCounterPieChart(pieChart);
                    thisPieChartHolder.css('opacity', '1');
                    pieChart.easyPieChart({
                        barColor: barColor,
                        trackColor: trackColor,
                        scaleColor: false,
                        lineCap: 'butt',
                        lineWidth: lineWidth,
                        animate: 1500,
                        size: size
                    });
                }, {
                    accX: 0,
                    accY: eltdfGlobalVars.vars.eltdfElementAppearAmount
                });
            });
        }
    }

    function initToCounterPieChart(pieChart) {
        var counter = pieChart.find('.eltdf-pc-percent'),
            max = parseFloat(counter.text());
        counter.countTo({
            from: 0,
            to: max,
            speed: 1500,
            refreshInterval: 50
        });
    }
})(jQuery);
(function($) {
    'use strict';
    var process = {};
    eltdf.modules.process = process;
    process.eltdfInitProcess = eltdfInitProcess;
    process.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitProcess();
    }

    function eltdfInitProcess() {
        var holder = $('.eltdf-process-holder');
        if (holder.length) {
            holder.each(function() {
                var thisHolder = $(this);
                thisHolder.appear(function() {
                    thisHolder.addClass('eltdf-process-appeared');
                }, {
                    accX: 0,
                    accY: eltdfGlobalVars.vars.eltdfElementAppearAmount
                });
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var progressBar = {};
    eltdf.modules.progressBar = progressBar;
    progressBar.eltdfInitProgressBars = eltdfInitProgressBars;
    progressBar.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitProgressBars();
    }

    function eltdfInitProgressBars() {
        var progressBar = $('.eltdf-progress-bar');
        if (progressBar.length) {
            progressBar.each(function() {
                var thisBar = $(this),
                    thisBarContent = thisBar.find('.eltdf-pb-content'),
                    progressBar = thisBar.find('.eltdf-pb-percent'),
                    percentage = thisBarContent.data('percentage');
                thisBar.appear(function() {
                    eltdfInitToCounterProgressBar(progressBar, percentage);
                    thisBarContent.css('width', '0%').animate({
                        'width': percentage + '%'
                    }, 2000);
                    if (thisBar.hasClass('eltdf-pb-percent-floating')) {
                        progressBar.css('left', '0%').animate({
                            'left': percentage + '%'
                        }, 2000);
                    }
                });
            });
        }
    }

    function eltdfInitToCounterProgressBar(progressBar, percentageValue) {
        var percentage = parseFloat(percentageValue);
        if (progressBar.length) {
            progressBar.each(function() {
                var thisPercent = $(this);
                thisPercent.css('opacity', '1');
                thisPercent.countTo({
                    from: 0,
                    to: percentage,
                    speed: 2000,
                    refreshInterval: 50
                });
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var tabs = {};
    eltdf.modules.tabs = tabs;
    tabs.eltdfInitTabs = eltdfInitTabs;
    tabs.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitTabs();
    }

    function eltdfInitTabs() {
        var tabs = $('.eltdf-tabs');
        if (tabs.length) {
            tabs.each(function() {
                var thisTabs = $(this);
                thisTabs.children('.eltdf-tab-container').each(function(index) {
                    index = index + 1;
                    var that = $(this),
                        link = that.attr('id'),
                        navItem = that.parent().find('.eltdf-tabs-nav li:nth-child(' + index + ') a'),
                        navLink = navItem.attr('href');
                    link = '#' + link;
                    if (link.indexOf(navLink) > -1) {
                        navItem.attr('href', link);
                    }
                });
                thisTabs.tabs();
                $('.eltdf-tabs a.eltdf-external-link').off('click');
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var verticalSplitSlider = {};
    eltdf.modules.verticalSplitSlider = verticalSplitSlider;
    verticalSplitSlider.eltdfInitVerticalSplitSlider = eltdfInitVerticalSplitSlider;
    verticalSplitSlider.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfInitVerticalSplitSlider();
    }

    function eltdfInitVerticalSplitSlider() {
        var slider = $('.eltdf-vertical-split-slider'),
            progressBarFlag = true;
        if (slider.length) {
            if (eltdf.body.hasClass('eltdf-vss-initialized')) {
                eltdf.body.removeClass('eltdf-vss-initialized');
                $.fn.multiscroll.destroy();
            }
            slider.height(eltdf.windowHeight).animate({
                opacity: 1
            }, 300);
            var defaultHeaderStyle = '';
            if (eltdf.body.hasClass('eltdf-light-header')) {
                defaultHeaderStyle = 'light';
            } else if (eltdf.body.hasClass('eltdf-dark-header')) {
                defaultHeaderStyle = 'dark';
            }
            slider.multiscroll({
                scrollingSpeed: 700,
                easing: 'easeInOutQuart',
                navigation: true,
                useAnchorsOnLoad: false,
                sectionSelector: '.eltdf-vss-ms-section',
                leftSelector: '.eltdf-vss-ms-left',
                rightSelector: '.eltdf-vss-ms-right',
                afterRender: function() {
                    eltdfCheckVerticalSplitSectionsForHeaderStyle($('.eltdf-vss-ms-left .eltdf-vss-ms-section:first-child').data('header-style'), defaultHeaderStyle);
                    eltdf.body.addClass('eltdf-vss-initialized');
                    var contactForm7 = $('div.wpcf7 > form');
                    if (contactForm7.length) {
                        contactForm7.each(function() {
                            var thisForm = $(this);
                            thisForm.find('.wpcf7-submit').off().on('click', function(e) {
                                e.preventDefault();
                                wpcf7.submit(thisForm);
                            });
                        });
                    }
                    var verticalSplitSliderResponsive = $('<div class="eltdf-vss-responsive"></div>'),
                        leftSide = slider.find('.eltdf-vss-ms-left > div'),
                        rightSide = slider.find('.eltdf-vss-ms-right > div');
                    slider.after(verticalSplitSliderResponsive);
                    for (var i = 0; i < leftSide.length; i++) {
                        verticalSplitSliderResponsive.append($(leftSide[i]).clone(true));
                        verticalSplitSliderResponsive.append($(rightSide[leftSide.length - 1 - i]).clone(true));
                    }
                    var googleMapHolder = $('.eltdf-vss-responsive .eltdf-google-map');
                    if (googleMapHolder.length) {
                        googleMapHolder.each(function() {
                            var map = $(this);
                            map.empty();
                            var num = Math.floor((Math.random() * 100000) + 1);
                            map.attr('id', 'eltdf-map-' + num);
                            map.data('unique-id', num);
                        });
                    }
                    if (typeof eltdf.modules.animationHolder.eltdfInitAnimationHolder === "function") {
                        eltdf.modules.animationHolder.eltdfInitAnimationHolder();
                    }
                    if (typeof eltdf.modules.button.eltdfButton === "function") {
                        eltdf.modules.button.eltdfButton().init();
                    }
                    if (typeof eltdf.modules.elementsHolder.eltdfInitElementsHolderResponsiveStyle === "function") {
                        eltdf.modules.elementsHolder.eltdfInitElementsHolderResponsiveStyle();
                    }
                    if (typeof eltdf.modules.googleMap.eltdfShowGoogleMap === "function") {
                        eltdf.modules.googleMap.eltdfShowGoogleMap();
                    }
                    if (typeof eltdf.modules.icon.eltdfIcon === "function") {
                        eltdf.modules.icon.eltdfIcon().init();
                    }
                    if (progressBarFlag && typeof eltdf.modules.progressBar.eltdfInitProgressBars === "function" && ($('.eltdf-vss-ms-left .eltdf-vss-ms-section.active').find('.eltdf-progress-bar').length || $('.eltdf-vss-ms-right .eltdf-vss-ms-section.active').find('.eltdf-progress-bar').length)) {
                        eltdf.modules.progressBar.eltdfInitProgressBars();
                        progressBarFlag = false;
                    }
                },
                onLeave: function(index, nextIndex) {
                    if (progressBarFlag && typeof eltdf.modules.progressBar.eltdfInitProgressBars === "function" && ($('.eltdf-vss-ms-left .eltdf-vss-ms-section.active').find('.eltdf-progress-bar').length || $('.eltdf-vss-ms-right .eltdf-vss-ms-section.active').find('.eltdf-progress-bar').length)) {
                        setTimeout(function() {
                            eltdf.modules.progressBar.eltdfInitProgressBars();
                        }, 700);
                        progressBarFlag = false;
                    }
                    eltdfIntiScrollAnimation(slider, nextIndex);
                    eltdfCheckVerticalSplitSectionsForHeaderStyle($($('.eltdf-vss-ms-left .eltdf-vss-ms-section')[nextIndex - 1]).data('header-style'), defaultHeaderStyle);
                }
            });
            if (eltdf.windowWidth <= 1024) {
                $.fn.multiscroll.destroy();
            } else {
                $.fn.multiscroll.build();
            }
            $(window).resize(function() {
                if (eltdf.windowWidth <= 1024) {
                    $.fn.multiscroll.destroy();
                } else {
                    $.fn.multiscroll.build();
                }
            });
        }
    }

    function eltdfIntiScrollAnimation(slider, nextIndex) {
        if (slider.hasClass('eltdf-vss-scrolling-animation')) {
            if (nextIndex > 1 && !slider.hasClass('eltdf-vss-scrolled')) {
                slider.addClass('eltdf-vss-scrolled');
            } else if (nextIndex === 1 && slider.hasClass('eltdf-vss-scrolled')) {
                slider.removeClass('eltdf-vss-scrolled');
            }
        }
    }

    function eltdfCheckVerticalSplitSectionsForHeaderStyle(section_header_style, default_header_style) {
        if (section_header_style !== undefined && section_header_style !== '') {
            eltdf.body.removeClass('eltdf-light-header eltdf-dark-header').addClass('eltdf-' + section_header_style + '-header');
        } else if (default_header_style !== '') {
            eltdf.body.removeClass('eltdf-light-header eltdf-dark-header').addClass('eltdf-' + default_header_style + '-header');
        } else {
            eltdf.body.removeClass('eltdf-light-header eltdf-dark-header');
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var portfolioList = {};
    eltdf.modules.portfolioList = portfolioList;
    portfolioList.eltdfOnWindowLoad = eltdfOnWindowLoad;
    portfolioList.eltdfOnWindowScroll = eltdfOnWindowScroll;
    $(window).on('load', eltdfOnWindowLoad);
    $(window).scroll(eltdfOnWindowScroll);

    function eltdfOnWindowLoad() {
        eltdfInitPortfolioFilter();
        eltdfInitPortfolioListAnimation();
        eltdfInitPortfolioPagination().init();
    }

    function eltdfOnWindowScroll() {
        eltdfInitPortfolioPagination().scroll();
    }

    function eltdfInitPortfolioListAnimation() {
        var portList = $('.eltdf-portfolio-list-holder.eltdf-pl-has-animation');
        if (portList.length) {
            portList.each(function() {
                var thisPortList = $(this).children('.eltdf-pl-inner');
                thisPortList.children('article').each(function(l) {
                    var thisArticle = $(this);
                    thisArticle.appear(function() {
                        thisArticle.addClass('eltdf-item-show');
                        setTimeout(function() {
                            thisArticle.addClass('eltdf-item-shown');
                        }, 1000);
                    }, {
                        accX: 0,
                        accY: 0
                    });
                });
            });
        }
    }

    function eltdfInitPortfolioFilter() {
        var filterHolder = $('.eltdf-portfolio-list-holder .eltdf-pl-filter-holder');
        if (filterHolder.length) {
            filterHolder.each(function() {
                var thisFilterHolder = $(this),
                    thisPortListHolder = thisFilterHolder.closest('.eltdf-portfolio-list-holder'),
                    thisPortListInner = thisPortListHolder.find('.eltdf-pl-inner'),
                    portListHasLoadMore = thisPortListHolder.hasClass('eltdf-pl-pag-load-more') ? true : false;
                thisFilterHolder.find('.eltdf-pl-filter:first').addClass('eltdf-pl-current');
                if (thisPortListHolder.hasClass('eltdf-pl-gallery')) {
                    thisPortListInner.isotope();
                }
                thisFilterHolder.find('.eltdf-pl-filter').on('click', function() {
                    var thisFilter = $(this),
                        filterValue = thisFilter.attr('data-filter'),
                        filterClassName = filterValue.length ? filterValue.substring(1) : '',
                        portListHasArticles = thisPortListInner.children().hasClass(filterClassName) ? true : false;
                    thisFilter.parent().children('.eltdf-pl-filter').removeClass('eltdf-pl-current');
                    thisFilter.addClass('eltdf-pl-current');
                    if (portListHasLoadMore && !portListHasArticles && filterValue.length) {
                        eltdfInitLoadMoreItemsPortfolioFilter(thisPortListHolder, filterValue, filterClassName);
                    } else {
                        filterValue = filterValue.length === 0 ? '*' : filterValue;
                        thisFilterHolder.parent().children('.eltdf-pl-inner').isotope({
                            filter: filterValue
                        });
                        eltdf.modules.common.eltdfInitParallax();
                    }
                });
            });
        }
    }

    function eltdfInitLoadMoreItemsPortfolioFilter($portfolioList, $filterValue, $filterClassName) {
        var thisPortList = $portfolioList,
            thisPortListInner = thisPortList.find('.eltdf-pl-inner'),
            filterValue = $filterValue,
            filterClassName = $filterClassName,
            maxNumPages = 0;
        if (typeof thisPortList.data('max-num-pages') !== 'undefined' && thisPortList.data('max-num-pages') !== false) {
            maxNumPages = thisPortList.data('max-num-pages');
        }
        var loadMoreDatta = eltdf.modules.common.getLoadMoreData(thisPortList),
            nextPage = loadMoreDatta.nextPage,
            ajaxData = eltdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'onea_core_portfolio_ajax_load_more'),
            loadingItem = thisPortList.find('.eltdf-pl-loading');
        if (nextPage <= maxNumPages) {
            loadingItem.addClass('eltdf-showing eltdf-filter-trigger');
            thisPortListInner.css('opacity', '0');
            $.ajax({
                type: 'POST',
                data: ajaxData,
                url: eltdfGlobalVars.vars.eltdfAjaxUrl,
                success: function(data) {
                    nextPage++;
                    thisPortList.data('next-page', nextPage);
                    var response = $.parseJSON(data),
                        responseHtml = response.html;
                    thisPortList.waitForImages(function() {
                        thisPortListInner.append(responseHtml).isotope('reloadItems').isotope({
                            sortBy: 'original-order'
                        });
                        var portListHasArticles = !!thisPortListInner.children().hasClass(filterClassName);
                        if (portListHasArticles) {
                            setTimeout(function() {
                                eltdf.modules.common.setFixedImageProportionSize(thisPortList, thisPortListInner.find('article'), thisPortListInner.find('.eltdf-masonry-grid-sizer').width(), true);
                                thisPortListInner.isotope('layout').isotope({
                                    filter: filterValue
                                });
                                loadingItem.removeClass('eltdf-showing eltdf-filter-trigger');
                                setTimeout(function() {
                                    thisPortListInner.css('opacity', '1');
                                    eltdfInitPortfolioListAnimation();
                                    eltdf.modules.common.eltdfInitParallax();
                                }, 150);
                            }, 400);
                        } else {
                            loadingItem.removeClass('eltdf-showing eltdf-filter-trigger');
                            eltdfInitLoadMoreItemsPortfolioFilter(thisPortList, filterValue, filterClassName);
                        }
                    });
                }
            });
        }
    }

    function eltdfInitPortfolioPagination() {
        var portList = $('.eltdf-portfolio-list-holder');
        var initStandardPagination = function(thisPortList) {
            var standardLink = thisPortList.find('.eltdf-pl-standard-pagination li');
            if (standardLink.length) {
                standardLink.each(function() {
                    var thisLink = $(this).children('a'),
                        pagedLink = 1;
                    thisLink.on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (typeof thisLink.data('paged') !== 'undefined' && thisLink.data('paged') !== false) {
                            pagedLink = thisLink.data('paged');
                        }
                        initMainPagFunctionality(thisPortList, pagedLink);
                    });
                });
            }
        };
        var initLoadMorePagination = function(thisPortList) {
            var loadMoreButton = thisPortList.find('.eltdf-pl-load-more a');
            loadMoreButton.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                initMainPagFunctionality(thisPortList);
            });
        };
        var initInifiteScrollPagination = function(thisPortList) {
            var portListHeight = thisPortList.outerHeight(),
                portListTopOffest = thisPortList.offset().top,
                portListPosition = portListHeight + portListTopOffest - eltdfGlobalVars.vars.eltdfAddForAdminBar;
            if (!thisPortList.hasClass('eltdf-pl-infinite-scroll-started') && eltdf.scroll + eltdf.windowHeight > portListPosition) {
                initMainPagFunctionality(thisPortList);
            }
        };
        var initMainPagFunctionality = function(thisPortList, pagedLink) {
            var thisPortListInner = thisPortList.find('.eltdf-pl-inner'),
                nextPage, maxNumPages;
            if (typeof thisPortList.data('max-num-pages') !== 'undefined' && thisPortList.data('max-num-pages') !== false) {
                maxNumPages = thisPortList.data('max-num-pages');
            }
            if (thisPortList.hasClass('eltdf-pl-pag-standard')) {
                thisPortList.data('next-page', pagedLink);
            }
            if (thisPortList.hasClass('eltdf-pl-pag-infinite-scroll')) {
                thisPortList.addClass('eltdf-pl-infinite-scroll-started');
            }
            var loadMoreDatta = eltdf.modules.common.getLoadMoreData(thisPortList),
                loadingItem = thisPortList.find('.eltdf-pl-loading');
            nextPage = loadMoreDatta.nextPage;
            if (nextPage <= maxNumPages || maxNumPages === 0) {
                if (thisPortList.hasClass('eltdf-pl-pag-standard')) {
                    loadingItem.addClass('eltdf-showing eltdf-standard-pag-trigger');
                    thisPortList.addClass('eltdf-pl-pag-standard-animate');
                } else {
                    loadingItem.addClass('eltdf-showing');
                }
                var ajaxData = eltdf.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'onea_core_portfolio_ajax_load_more');
                $.ajax({
                    type: 'POST',
                    data: ajaxData,
                    url: eltdfGlobalVars.vars.eltdfAjaxUrl,
                    success: function(data) {
                        if (!thisPortList.hasClass('eltdf-pl-pag-standard')) {
                            nextPage++;
                        }
                        thisPortList.data('next-page', nextPage);
                        var response = $.parseJSON(data),
                            responseHtml = response.html;
                        if (thisPortList.hasClass('eltdf-pl-pag-standard')) {
                            eltdfInitStandardPaginationLinkChanges(thisPortList, maxNumPages, nextPage);
                            thisPortList.waitForImages(function() {
                                if (thisPortList.hasClass('eltdf-pl-masonry')) {
                                    eltdfInitHtmlIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                } else if (thisPortList.hasClass('eltdf-pl-gallery') && thisPortList.hasClass('eltdf-pl-has-filter')) {
                                    eltdfInitHtmlIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                } else {
                                    eltdfInitHtmlGalleryNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                }
                            });
                        } else {
                            thisPortList.waitForImages(function() {
                                if (thisPortList.hasClass('eltdf-pl-masonry')) {
                                    if (pagedLink === 1) {
                                        eltdfInitHtmlIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                    } else {
                                        eltdfInitAppendIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                    }
                                } else if (thisPortList.hasClass('eltdf-pl-gallery') && thisPortList.hasClass('eltdf-pl-has-filter') && pagedLink !== 1) {
                                    eltdfInitAppendIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                } else {
                                    if (pagedLink === 1) {
                                        eltdfInitHtmlGalleryNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                    } else {
                                        eltdfInitAppendGalleryNewContent(thisPortListInner, loadingItem, responseHtml);
                                    }
                                }
                            });
                        }
                        if (thisPortList.hasClass('eltdf-pl-infinite-scroll-started')) {
                            thisPortList.removeClass('eltdf-pl-infinite-scroll-started');
                        }
                    }
                });
            }
            if (nextPage === maxNumPages) {
                thisPortList.find('.eltdf-pl-load-more-holder').hide();
            }
        };
        var eltdfInitStandardPaginationLinkChanges = function(thisPortList, maxNumPages, nextPage) {
            var standardPagHolder = thisPortList.find('.eltdf-pl-standard-pagination'),
                standardPagNumericItem = standardPagHolder.find('li.eltdf-pag-number'),
                standardPagPrevItem = standardPagHolder.find('li.eltdf-pag-prev a'),
                standardPagNextItem = standardPagHolder.find('li.eltdf-pag-next a');
            standardPagNumericItem.removeClass('eltdf-pag-active');
            standardPagNumericItem.eq(nextPage - 1).addClass('eltdf-pag-active');
            standardPagPrevItem.data('paged', nextPage - 1);
            standardPagNextItem.data('paged', nextPage + 1);
            if (nextPage > 1) {
                standardPagPrevItem.css({
                    'opacity': '1'
                });
            } else {
                standardPagPrevItem.css({
                    'opacity': '0'
                });
            }
            if (nextPage === maxNumPages) {
                standardPagNextItem.css({
                    'opacity': '0'
                });
            } else {
                standardPagNextItem.css({
                    'opacity': '1'
                });
            }
        };
        var eltdfInitHtmlIsotopeNewContent = function(thisPortList, thisPortListInner, loadingItem, responseHtml) {
            thisPortListInner.find('article').remove();
            thisPortListInner.append(responseHtml);
            eltdf.modules.common.setFixedImageProportionSize(thisPortList, thisPortListInner.find('article'), thisPortListInner.find('.eltdf-masonry-grid-sizer').width(), true);
            thisPortListInner.isotope('reloadItems').isotope({
                sortBy: 'original-order'
            });
            loadingItem.removeClass('eltdf-showing eltdf-standard-pag-trigger');
            thisPortList.removeClass('eltdf-pl-pag-standard-animate');
            setTimeout(function() {
                thisPortListInner.isotope('layout');
                eltdfInitPortfolioListAnimation();
                eltdf.modules.common.eltdfInitParallax();
                eltdf.modules.common.eltdfPrettyPhoto();
            }, 600);
        };
        var eltdfInitHtmlGalleryNewContent = function(thisPortList, thisPortListInner, loadingItem, responseHtml) {
            loadingItem.removeClass('eltdf-showing eltdf-standard-pag-trigger');
            thisPortList.removeClass('eltdf-pl-pag-standard-animate');
            thisPortListInner.html(responseHtml);
            eltdfInitPortfolioListAnimation();
            eltdf.modules.common.eltdfInitParallax();
            eltdf.modules.common.eltdfPrettyPhoto();
        };
        var eltdfInitAppendIsotopeNewContent = function(thisPortList, thisPortListInner, loadingItem, responseHtml) {
            thisPortListInner.append(responseHtml);
            eltdf.modules.common.setFixedImageProportionSize(thisPortList, thisPortListInner.find('article'), thisPortListInner.find('.eltdf-masonry-grid-sizer').width(), true);
            thisPortListInner.isotope('reloadItems').isotope({
                sortBy: 'original-order'
            });
            loadingItem.removeClass('eltdf-showing');
            setTimeout(function() {
                thisPortListInner.isotope('layout');
                eltdfInitPortfolioListAnimation();
                eltdf.modules.common.eltdfInitParallax();
                eltdf.modules.common.eltdfPrettyPhoto();
            }, 600);
        };
        var eltdfInitAppendGalleryNewContent = function(thisPortListInner, loadingItem, responseHtml) {
            loadingItem.removeClass('eltdf-showing');
            thisPortListInner.append(responseHtml);
            eltdfInitPortfolioListAnimation();
            eltdf.modules.common.eltdfInitParallax();
            eltdf.modules.common.eltdfPrettyPhoto();
        };
        return {
            init: function() {
                if (portList.length) {
                    portList.each(function() {
                        var thisPortList = $(this);
                        if (thisPortList.hasClass('eltdf-pl-pag-standard')) {
                            initStandardPagination(thisPortList);
                        }
                        if (thisPortList.hasClass('eltdf-pl-pag-load-more')) {
                            initLoadMorePagination(thisPortList);
                        }
                        if (thisPortList.hasClass('eltdf-pl-pag-infinite-scroll')) {
                            initInifiteScrollPagination(thisPortList);
                        }
                    });
                }
            },
            scroll: function() {
                if (portList.length) {
                    portList.each(function() {
                        var thisPortList = $(this);
                        if (thisPortList.hasClass('eltdf-pl-pag-infinite-scroll')) {
                            initInifiteScrollPagination(thisPortList);
                        }
                    });
                }
            },
            getMainPagFunction: function(thisPortList, paged) {
                initMainPagFunctionality(thisPortList, paged);
            }
        };
    }
})(jQuery);
(function($) {
    'use strict';
    var testimonialsCarousel = {};
    eltdf.modules.testimonialsCarousel = testimonialsCarousel;
    testimonialsCarousel.eltdfInitTestimonials = eltdfInitTestimonialsCarousel;
    testimonialsCarousel.eltdfOnWindowLoad = eltdfOnWindowLoad;
    $(window).on('load', eltdfOnWindowLoad);

    function eltdfOnWindowLoad() {
        eltdfInitTestimonialsCarousel();
    }

    function eltdfInitTestimonialsCarousel() {
        var testimonial = $('.eltdf-testimonials-holder.eltdf-testimonials-carousel');
        if (testimonial.length) {
            testimonial.each(function() {
                var thisTestimonials = $(this),
                    mainTestimonialsSlider = thisTestimonials.find('.eltdf-testimonials-main'),
                    imagePagSlider = thisTestimonials.children('.eltdf-testimonial-image-nav'),
                    loop = true,
                    autoplay = true,
                    sliderSpeed = 5000,
                    sliderSpeedAnimation = 600,
                    mouseDrag = false;
                if (mainTestimonialsSlider.data('enable-loop') === 'no') {
                    loop = false;
                }
                if (mainTestimonialsSlider.data('enable-autoplay') === 'no') {
                    autoplay = false;
                }
                if (typeof mainTestimonialsSlider.data('slider-speed') !== 'undefined' && mainTestimonialsSlider.data('slider-speed') !== false) {
                    sliderSpeed = mainTestimonialsSlider.data('slider-speed');
                }
                if (typeof mainTestimonialsSlider.data('slider-speed-animation') !== 'undefined' && mainTestimonialsSlider.data('slider-speed-animation') !== false) {
                    sliderSpeedAnimation = mainTestimonialsSlider.data('slider-speed-animation');
                }
                if (eltdf.windowWidth < 680) {
                    mouseDrag = true;
                }
                if (mainTestimonialsSlider.length && imagePagSlider.length) {
                    var text = mainTestimonialsSlider.owlCarousel({
                        items: 1,
                        loop: loop,
                        autoplay: autoplay,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        autoplayHoverPause: false,
                        dots: false,
                        nav: false,
                        mouseDrag: false,
                        touchDrag: mouseDrag,
                        onInitialize: function() {
                            mainTestimonialsSlider.css('visibility', 'visible');
                        }
                    });
                    var image = imagePagSlider.owlCarousel({
                        loop: loop,
                        autoplay: autoplay,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        autoplayHoverPause: false,
                        center: true,
                        dots: false,
                        nav: false,
                        mouseDrag: false,
                        touchDrag: false,
                        responsive: {
                            1025: {
                                items: 5
                            },
                            0: {
                                items: 3
                            }
                        },
                        onInitialize: function() {
                            imagePagSlider.css('visibility', 'visible');
                            thisTestimonials.css('opacity', '1');
                        }
                    });
                    imagePagSlider.find('.owl-item').on('click touchpress', function(e) {
                        e.preventDefault();
                        var thisItem = $(this),
                            itemIndex = thisItem.index(),
                            numberOfClones = imagePagSlider.find('.owl-item.cloned').length,
                            modifiedItems = itemIndex - numberOfClones / 2 >= 0 ? itemIndex - numberOfClones / 2 : itemIndex;
                        image.trigger('to.owl.carousel', modifiedItems);
                        text.trigger('to.owl.carousel', modifiedItems);
                    });
                }
            });
        }
    }
})(jQuery);
(function($) {
    'use strict';
    var testimonialsImagePagination = {};
    eltdf.modules.testimonialsImagePagination = testimonialsImagePagination;
    testimonialsImagePagination.eltdfOnDocumentReady = eltdfOnDocumentReady;
    $(document).ready(eltdfOnDocumentReady);

    function eltdfOnDocumentReady() {
        eltdfTestimonialsImagePagination();
    }

    function eltdfTestimonialsImagePagination() {
        var sliders = $('.eltdf-testimonials-image-pagination-inner');
        if (sliders.length) {
            sliders.each(function() {
                var slider = $(this),
                    slideItemsNumber = slider.children().length,
                    loop = true,
                    autoplay = true,
                    autoplayHoverPause = false,
                    sliderSpeed = 3500,
                    sliderSpeedAnimation = 500,
                    margin = 0,
                    stagePadding = 0,
                    center = false,
                    autoWidth = false,
                    animateInClass = false,
                    animateOutClass = false,
                    navigation = true,
                    pagination = false,
                    drag = true,
                    sliderDataHolder = slider;
                if (sliderDataHolder.data('enable-loop') === 'no') {
                    loop = false;
                }
                if (typeof sliderDataHolder.data('slider-speed') !== 'undefined' && sliderDataHolder.data('slider-speed') !== false) {
                    sliderSpeed = sliderDataHolder.data('slider-speed');
                }
                if (typeof sliderDataHolder.data('slider-speed-animation') !== 'undefined' && sliderDataHolder.data('slider-speed-animation') !== false) {
                    sliderSpeedAnimation = sliderDataHolder.data('slider-speed-animation');
                }
                if (sliderDataHolder.data('enable-auto-width') === 'yes') {
                    autoWidth = true;
                }
                if (typeof sliderDataHolder.data('slider-animate-in') !== 'undefined' && sliderDataHolder.data('slider-animate-in') !== false) {
                    animateInClass = sliderDataHolder.data('slider-animate-in');
                }
                if (typeof sliderDataHolder.data('slider-animate-out') !== 'undefined' && sliderDataHolder.data('slider-animate-out') !== false) {
                    animateOutClass = sliderDataHolder.data('slider-animate-out');
                }
                if (sliderDataHolder.data('enable-navigation') === 'no') {
                    navigation = false;
                }
                if (sliderDataHolder.data('enable-pagination') === 'yes') {
                    pagination = true;
                }
                if (navigation && pagination) {
                    slider.addClass('eltdf-slider-has-both-nav');
                }
                if (pagination) {
                    var dotsContainer = '#eltdf-testimonial-pagination';
                    $('.eltdf-tsp-item').on('click', function() {
                        slider.trigger('to.owl.carousel', [$(this).index(), 300]);
                    });
                }
                if (slideItemsNumber <= 1) {
                    loop = false;
                    autoplay = false;
                    navigation = false;
                    pagination = false;
                }
                slider.waitForImages(function() {
                    $(this).owlCarousel({
                        items: 1,
                        loop: loop,
                        autoplay: autoplay,
                        autoplayHoverPause: autoplayHoverPause,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        margin: margin,
                        stagePadding: stagePadding,
                        center: center,
                        autoWidth: autoWidth,
                        animateIn: animateInClass,
                        animateOut: animateOutClass,
                        dots: pagination,
                        dotsContainer: dotsContainer,
                        nav: navigation,
                        drag: drag,
                        callbacks: true,
                        navText: ['<span class="eltdf-prev-icon ion-chevron-left"></span>', '<span class="eltdf-next-icon ion-chevron-right"></span>'],
                        onInitialize: function() {
                            slider.css('visibility', 'visible');
                        },
                        onDrag: function(e) {
                            if (eltdf.body.hasClass('eltdf-smooth-page-transitions-fadeout')) {
                                var sliderIsMoving = e.isTrigger > 0;
                                if (sliderIsMoving) {
                                    slider.addClass('eltdf-slider-is-moving');
                                }
                            }
                        },
                        onDragged: function() {
                            if (eltdf.body.hasClass('eltdf-smooth-page-transitions-fadeout') && slider.hasClass('eltdf-slider-is-moving')) {
                                setTimeout(function() {
                                    slider.removeClass('eltdf-slider-is-moving');
                                }, 500);
                            }
                        }
                    });
                });
            });
        }
    }
})(jQuery);