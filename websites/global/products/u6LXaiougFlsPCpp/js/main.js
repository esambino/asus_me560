var producthash = 'XekiymsOcUzGyZSj';
var ltIE9 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 9;
//document.write('<link rel="stylesheet" href="/websites/global/products/' + producthash + '/css/main.css">');

var firstTimeLoad = true;

var canvas, stage, exportRoot;


//function initSonicMaster() {
//    canvas = document.getElementById("canvas");
//    images = images || {};

//    var manifest = [
//		{ src: "/websites/global/products/"+producthash+"/img/sound/left_speaker.png", id: "left_speaker" },
//		{ src: "/websites/global/products/"+producthash+"/img/sound/light.png", id: "light" },
//		{ src: "/websites/global/products/"+producthash+"/img/sound/pad.png", id: "pad" },
//		{ src: "/websites/global/products/"+producthash+"/img/sound/right_speaker.png", id: "right_speaker" },
//		{ src: "/websites/global/products/"+producthash+"/img/sound/speaker.jpg", id: "speaker" }
//    ];

//    var loader = new createjs.LoadQueue(false);
//    loader.addEventListener("fileload", handleFileLoad);
//    loader.addEventListener("complete", handleComplete);
//    loader.loadManifest(manifest);
//}

function preloadImage(opt) {
    opt.progress = opt.progress || function () { };
    opt.loadComplete = opt.loadComplete || function () { };
    var manifest = opt.images;
    if (manifest.length === 0) {
        opt.loadComplete();
        setTimeout(function () {
            opt.progress(40)
        },25);
        setTimeout(function () {
            opt.progress(80)
        },125);
        setTimeout(function () {
            opt.progress(100)
        },250);
        return;
    }
    var loadingQueue = [];
    //if (ltIE9) {
        $(manifest).each(function (i, d) {
            var img = new Image();
            img.onload = function () {
                this.loaded = true;
                if ($("#"+this.id + "[data-src]").length > 0)
                    $("#"+this.id).attr("src", this.src).removeAttr("data-src");
                else if ($("#"+this.id + "[data-background-image]").length > 0)
                    $("#"+this.id).css("background-image", "url(" + this.src + ")").removeAttr("data-background-image");
            };
            loadingQueue.push(img);
            img.loaded = false;
            img.id = d.id;
            img.src = d.src;
        });
        var checkCompleteTick = setInterval(function () {
            var total = loadingQueue.length;
            var complete = 0;
            $.each(loadingQueue, function (i, d) {
                if (d.loaded) {
                    complete += 1;
                }
            });
            opt.progress(complete / total * 100);
            //console.log(complete / total * 100);
            if (complete / total == 1) {
                clearInterval(checkCompleteTick);
                opt.loadComplete();
            }
        }, 1);
    //}
    //else {

    //    preload = new createjs.LoadQueue(true);

    //    preload.addEventListener("progress", loadProgressHandler);
    //    preload.addEventListener("complete", opt.loadComplete);

    //    preload.loadManifest(manifest);
    //}
}

function handleComplete() {
    exportRoot = new lib.sonicmaster();

    stage = new createjs.Stage(canvas);
    stage.addChild(exportRoot);
    stage.update();

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stage);
}

function handleFileLoad(evt) {
    if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}

function loadProgressHandler(evt) {
    var p = (100 - Math.floor(evt.loaded * 10000) / 100) * -1;
        
    $("#loading-animate .white").animate({
        left: p + '%' 
    }, 150, function () { })
}

function centralizePages() {
    $("#special-sectionOverview").height($("#custom-wrap").height() > 768 ? $("#custom-wrap").height() : 768);
    $("#custom-wrap").width($(window).width() > 960 ? $(window).width() : 960);

    $("#custom-wrap").css('left', $("#custom-wrap").width() > 960 ? ($("#custom-wrap").width() - 960) / -2 : 0);

    $("#response .center").width($(window).width() > 2000 ? 2000 : ($(window).width() < 1366 ? 1366 : $(window).width()));

    $(".shortcut").css('top', ($(window).height() - 46 * 8) / 3 > 50 ? ($(window).height() - 46 * 8) / 3 : 50);
}

var init3D = function () {
    if ($("#reel3d-reel").length == 0 && $("#reel3d").length != 0) {
        $("#reel3d").reel({
            //indicator: 5, // For no indicator just remove this line
            frames: 30,
            footage: 50,
            cursor: 'hand',
            images: $("#reel3d").attr('src').replace(/reel_\d+/, 'reel_##')
        });
    }
    setTimeout(init3D, 250);
}


$(function () {
    $("#reel-container .phone").css("top", "-3130px");
    $(window).keydown(function (e) {
        return e.keyCode !== 9
    });
    $(window).bind('resize', centralizePages).trigger('resize');
    setTimeout(init3D, 250);
    var scrollCurrent = $(window).scrollTop();
    $(".videos li a").each(function () {
        $(this).attr('href', $(this).attr('data-href'));
    })
    if ($(window).width() > 1920 * 0.8) {
        $(".video").colorbox({ iframe: true, innerWidth: 1920 * 0.8, innerHeight: 1080 * 0.8 });
    } else {
        $(".video").colorbox({ iframe: true, innerWidth: $(window).width() * 0.8, innerHeight: $(window).height() * 0.8 });
    }
    $(window).scroll(function () {
        

        var scrollDown = scrollCurrent < $(window).scrollTop();
        scrollCurrent = $(window).scrollTop();

        if (scrollCurrent > 600 && scrollCurrent < 1200) {
            var SineWave = function () {
                this.css = function (p) {
                    var s = Math.sin(p * 20)
                    var y = 700 - p * 150 - 3600
                    var x = s * 50 + 550
                    var o = ((s + 2) / 4 + 0.1)
                    return { top: y + "px", left: x + "px", opacity: o }
                }
            };/*
            if (10 != $("#reel").attr("datacurrentFrame")) {
                $(".pen").stop().animate({ path: new SineWave }, 3000, function () {
                    reelgoto(10);
                });
            }*/
        }

        var idx = 0;
        if (scrollDown) {
            var page = $(".page.active").attr("id");
            if (scrollCurrent > pagePositions.index - $(window).height() / 2)
                page = 'index';
            if (scrollCurrent > pagePositions.beauty - $(window).height() / 2)
                page = 'beauty';
            if (scrollCurrent > pagePositions.sound - $(window).height() / 2)
                page = 'sound';
            if (scrollCurrent > pagePositions.touch - $(window).height() / 2)
                page = 'touch';
            if (scrollCurrent > pagePositions.response - $(window).height() / 2)
                page = 'response';
            if (scrollCurrent > pagePositions.ubiquity - $(window).height() / 2)
                page = 'ubiquity';
            if (scrollCurrent > pagePositions.app - $(window).height() / 2)
                page = 'app';
            if (scrollCurrent > pagePositions.accessory - $(window).height() / 2)
                page = 'accessory';
            $("nav.shortcut li").filter(function () { return $(this).attr("data-anchor") == page }).addClass("on").siblings().removeClass("on");
            var target = $("#" + page).find(".tab-container li.active")[0];
        } else {
            var page = $(".page.active").attr("id");
            if (scrollCurrent <= pagePositions.index + $(window).height() / 2)
                page = 'index';
            else if (scrollCurrent <= pagePositions.beauty + $(window).height() / 2)
                page = 'beauty';
            else if (scrollCurrent <= pagePositions.sound + $(window).height() / 2)
                page = 'sound';
            else if (scrollCurrent <= pagePositions.touch + $(window).height() / 2)
                page = 'touch';
            else if (scrollCurrent <= pagePositions.response + $(window).height() / 2)
                page = 'response';
            else if (scrollCurrent <= pagePositions.ubiquity + $(window).height() / 2)
                page = 'ubiquity';
            else if (scrollCurrent <= pagePositions.app + $(window).height() / 2)
                page = 'app';
            else
                page = 'accessory';
            $("nav.shortcut li").filter(function () { return $(this).attr("data-anchor") == page }).addClass("on").siblings().removeClass("on");
            var target = $("#" + page).find(".tab-container li.active")[0];
        }

    });
    window.tickContainer = {};
    var domActive = {
        beautyOverview: function () {
            $("#reel-container").removeAttr("class").addClass("beautyOverview");
            $("#reel-container .phone").animate({"top":"-3130px"},800);
            $("#beauty .skew-left-bottom .grey").removeClass("active");
            $("#beauty .side-visual,#beauty .title").addClass("active");
            $("#beauty nav li").removeClass("active");
            reelgoto('sky');
            $(".shortcut li:first").trigger("click");
            /*
            clearTimeout(tickContainer["reel"] | 0);
            tickContainer["reel"] = setTimeout(function () {
                reelgoto('sky');
            }, 1500);*/
        },
        design: function () {
            clearTimeout(tickContainer["reel"] | 0);
            var current = $("#reel-container").attr("class");
            var delay = 1;
            if (current == "beautyOverview") {
                delay = 750;
            }
            if (current == "display" || $("html").hasClass("ie8") || $("html").hasClass("ie9")) {
                delay = 0;
            }
            reelgoto('pocket');
            $("#reel-container .phone").addClass("left");
            tickContainer["reel"] = setTimeout(function () {
                var obj = swfobject.getObjectById("reel");
                var _delay = 1050;
                var duration = 650;
                if ($("html").hasClass("ie8") || $("html").hasClass("ie9")) {
                    _delay = 0;
                    duration = 1050;
                }
                if ($("html").hasClass("chrome"))
                    _delay = 1050;
                clearTimeout(tickContainer["reel"] | 0);
                tickContainer["reel"] = setTimeout(function () {
                    obj.gotoPocket();
                }, _delay);
                $("#reel-container").removeAttr("class").addClass("design");
                $("#reel-container .phone").animate({ "top": "-2350px" }, 1000);
                $("#reel-container .phone").removeClass("left");
                $("#beauty .skew-left-bottom .grey").addClass("active");
                $("#beauty .side-visual,#beauty .title").removeClass("active");
                $("#beauty nav li").eq(0).addClass("active").siblings().removeClass("active");
            }, delay);
        },
        display: function () {
            $("#reel-container").removeAttr("class").addClass("display");
            $("#beauty .skew-left-bottom .grey").addClass("active");
            $("#beauty .side-visual,#beauty .title").removeClass("active");
            $("#beauty nav li").eq(1).addClass("active").siblings().removeClass("active");
            reelgoto('ips');
            clearTimeout(tickContainer["display"] | 0);/*
            tickContainer["display"] = setTimeout(function () {
                reelgoto(51);
            }, 1000);*/
        },
        splendid: function () {
            $("#reel-container").removeAttr("class").addClass("splendid");
            $("#beauty .skew-left-bottom .grey").addClass("active");
            $("#beauty .side-visual,#beauty .title").removeClass("active");
            $("#beauty nav li").eq(2).addClass("active").siblings().removeClass("active");
            reelgoto('splendid');
        },
        camera: function () {
            $("#reel-container").removeAttr("class").addClass("camera");
            $("#beauty .skew-left-bottom .grey").addClass("active");
            $("#beauty .side-visual,#beauty .title").removeClass("active");
            $("#beauty nav li").eq(3).addClass("active").siblings().removeClass("active");
            reelgoto('camera');
        },
        camera_face: function () {
            $("#reel-container").removeAttr("class").addClass("allsmile");
            $("#beauty .skew-left-bottom .grey").addClass("active");
            $("#beauty .side-visual,#beauty .title").removeClass("active");
            $("#beauty nav li").eq(4).addClass("active").siblings().removeClass("active");
            reelgoto('camera_face');
        },
        camera_panorama: function () {
            $("#reel-container").removeAttr("class").addClass("panorama");
            $("#beauty .skew-left-bottom .grey").addClass("active");
            $("#beauty .side-visual,#beauty .title").removeClass("active");
            $("#beauty nav li").eq(5).addClass("active").siblings().removeClass("active");
            reelgoto('camera_panorama');
        },
        camera_ghost: function () {
            $("#reel-container").removeAttr("class").addClass("remove");
            $("#beauty .skew-left-bottom .grey").addClass("active");
            $("#beauty .side-visual,#beauty .title").removeClass("active");
            $("#beauty nav li").eq(6).addClass("active").siblings().removeClass("active");
            reelgoto('camera_ghost');
        },
        beauty_gallery: function () {
            $("#reel-container").removeAttr("class").addClass("gallery");
            $("#beauty .skew-left-bottom .grey").addClass("active");
            $("#beauty .side-visual,#beauty .title").removeClass("active");
            $("#beauty nav li").eq(7).addClass("active").siblings().removeClass("active");
            reelgoto('gallery');
        },
        soundOverview: function () {
            $("#sound .skew-right-top .dark,#sound .skew-left-bottom .dark,#beauty .skew-left-bottom .dark").removeClass("active");
        },
        sonicmaster: function () {
            $("#sonicmaster").addClass("prepare");
            setTimeout(function(){
                $("#sonicmaster").removeClass("prepare");
            },1);
        },
        speakers: function () {
            $("#sound .skew-right-top .dark,#sound .skew-left-bottom .dark,#beauty .skew-left-bottom .dark").addClass("active");
        },
        touchOverview: function () {
            $("#touch nav li").removeClass("active");
        },
        anti: function () {
            $("#touch nav li").eq(1).addClass("active").siblings().removeClass("active");
        },
        fit: function () {
            $("#touch nav li").eq(0).addClass("active").siblings().removeClass("active");
        },
        responseOverview: function () {
            $("#touch nav li").removeClass("active");
            var obj = swfobject.getObjectById("swf-processor");
            if (obj != null) obj.destroy();
        },
        processor: function () {
            var obj = swfobject.getObjectById("swf-processor");
            if(obj!=null)obj.display();
        },
        penmode: function () {
            var obj = swfobject.getObjectById("swf-penmode");
            if(obj!=null)obj.display();
            obj = swfobject.getObjectById("swf-processor");
            if (obj != null) obj.destroy();

        },
        instantnote: function () {
            var obj = swfobject.getObjectById("swf-instantnote");
            if(obj!=null)obj.display();
            obj = swfobject.getObjectById("swf-processor");
            if (obj != null) obj.destroy();
        },
        dualapp: function () {
            var obj = swfobject.getObjectById("swf-floatingapp");
            if(obj!=null)obj.display();
            obj = swfobject.getObjectById("swf-processor");
            if (obj != null) obj.destroy();
        },
        translation: function () {
            var obj = swfobject.getObjectById("swf-translation");
            if(obj!=null)obj.display();
            obj = swfobject.getObjectById("swf-processor");
            if (obj != null) obj.destroy();
        },
        smartcrop: function () {
            var obj = swfobject.getObjectById("swf-smartcrop");
            if(obj!=null)obj.display();
            obj = swfobject.getObjectById("swf-processor");
            if (obj != null) obj.destroy();
        },
        smartpeek: function () {
            var obj = swfobject.getObjectById("swf-smartpeek");
            if(obj!=null)obj.display();

            obj = swfobject.getObjectById("swf-processor");
            if (obj != null) obj.destroy();
        },
        ubiquityOverview: function () {
        },
        battery: function () {
            var obj = swfobject.getObjectById("swf-battery");
            if(obj!=null)obj.display();
        },
        appOverview: function () {
            appSizeShort();
        },
        phone: function () {
            clearTimeout(tickContainer["phone-visual"] | 0);
            var loop = function () {
                $(".phone-cut.cut-1,.phone-cut.cut-2,.phone-cut.cut-3").stop().fadeIn(450);
                tickContainer["phone-visual"] = setTimeout(function () {
                    $(".phone-cut.cut-1").fadeOut(1250);
                    clearTimeout(tickContainer["phone-visual"] | 0);
                    tickContainer["phone-visual"] = setTimeout(function () {
                        $(".phone-cut.cut-2").fadeOut(1250);
                        clearTimeout(tickContainer["phone-visual"] | 0);
                        tickContainer["phone-visual"] = setTimeout(function () {
                            $(".phone-cut.cut-3").fadeOut(1250, function () {
                                clearTimeout(tickContainer["phone-visual"] | 0);
                                tickContainer["phone-visual"] = setTimeout(function () {
                                    loop();
                                }, 3000);
                            });
                        }, 1250);
                    }, 1250);
                }, 1250);
            };
            loop();
            appSizeTall();
        },
        supernote: function () {
            clearTimeout(tickContainer["supernote-visual"] | 0);
            var loop = function () {
                $(".supernote-cut.cut-1,.supernote-cut.cut-2").stop().fadeIn(450);
                tickContainer["supernote-visual"] = setTimeout(function () {
                    $(".supernote-cut.cut-1").fadeOut(1250);
                    clearTimeout(tickContainer["supernote-visual"] | 0);
                    tickContainer["supernote-visual"] = setTimeout(function () {
                        $(".supernote-cut.cut-2").fadeOut(1250, function () {
                            clearTimeout(tickContainer["supernote-visual"] | 0);
                            tickContainer["supernote-visual"] = setTimeout(function () {
                                loop();
                            }, 3000);
                        });
                    }, 1250);
                }, 1250);
            };
            loop();
            appSizeTall();
        },
        mylibrary: function () {
            $(".mylibrary-highlight").hide();
            clearTimeout(tickContainer["mylibrary-visual"] | 0);
            clearTimeout(tickContainer["mylibrary-visual-2"] | 0);
            tickContainer["mylibrary-visual"] = setTimeout(function () {
                $(".mylibrary-pen").stop().animate({
                    path: new $.path.arc({
                        center: [130, 100],
                        radius: 25,
                        start: 10,
                        end: -10 * 40,
                        dir: -1
                    })
                }, 800, function () {
                });
            }, 750);
            tickContainer["mylibrary-visual-2"] = setTimeout(function () {
                $(".mylibrary-highlight").fadeIn(800);
            }, 1250);
            appSizeTall();
        },
        aolink: function () {
            appSizeTall();
        },
        dictionary: function () {
            appSizeTall();
        },
        browser: function () {
            appSizeTall();
        },
        calendar: function () {
            appSizeTall();
        },
        message: function () {
            appSizeTall();
        },
        mail: function () {
            appSizeTall();
        },
        dddOverview: function () {
            if ($("#reel3d").length > 0) {
                $("#reel3d").reel({
                    //indicator: 5, // For no indicator just remove this line
                    frames: 30,
                    footage: 50,
                    cursor: 'hand',
                    images: $("#reel3d").attr('src').replace(/reel_\d+/, 'reel_##')
                });
            }
        }
    };


    var appSizeTall = function () {
        $("html,body").animate({ scrollTop: 6058 }, 350);
        $("#app").animate({ height: 1244 }, 350, function () {
            centralizePages();
        });
        $("#app .close-btn").show();
    };
    var appSizeShort = function () {
        $(".shortcut li.m7").trigger("click");
        $("#app").animate({ height: 880 }, 350, function () {
            centralizePages();
        });
        $("#app .close-btn").hide();
    };

    var triggerContentActive = function (target) {
        $(target).parents(".center").attr("class", "center " + target.id);
        if (typeof domActive[target.id] == 'function')
            domActive[target.id]();
    };


    var pagePositions = {
        index: $("#index").offset().top,
        beauty: $("#beauty").offset().top,
        sound: $("#sound").offset().top,
        touch: $("#touch").offset().top,
        response: $("#response").offset().top,
        ubiquity: $("#ubiquity").offset().top,
        app: $("#app").offset().top,
        accessory: $("#accessory").offset().top
    }
    //if ($(window).width() > 1024)
    //    $("nav#menu").show();
    //else {
    //    $("nav#menu").hide();
    //}

    $(".page .close-btn").bind("click", function () {
        $(this).parents("nav").removeAttr("class").addClass($(this).parents(".page").find(".tab-container li").first().attr("id"));
        $(this).parents("nav").find("li").removeClass('active');
        $(this).parents(".page").find(".tab-container li").first().addClass('active').siblings().removeClass('active');
    });


    $(".page nav .prev").bind("click", function () {
        if ($(this).parents(".page").find(".tab-container li.active").prev().length == 0)
            return false;
        else {
            $(this).parents("nav").removeAttr("class").addClass($(this).parents(".page").find(".tab-container li.active").prev().attr("id"));
            $(this).parents(".page").find(".tab-container li.active").prev().addClass('active').siblings().removeClass('active');
            $(this).parents("nav").find("li.active").prev().addClass('active').siblings().removeClass('active');
            triggerContentActive($(this).parents(".page").find(".tab-container li.active")[0]);
        }
    });

    $(".page nav .next").bind("click", function () {
        if ($(this).parents(".page").find(".tab-container li.active").next().length == 0)
            return false;
        else {
            $(this).parents("nav").removeAttr("class").addClass($(this).parents(".page").find(".tab-container li.active").next().attr("id"));
            $(this).parents(".page").find(".tab-container li.active").next().addClass('active').siblings().removeClass('active');
            $(this).parents("nav").find("li.active").next().addClass('active').siblings().removeClass('active');
            triggerContentActive($(this).parents(".page").find(".tab-container li.active")[0]);
        }
    });
    $(".page .close-btn").bind("click", function () {
        $(this).parents("nav").removeAttr("class").addClass($(this).parents(".page").find(".tab-container li").first().attr("id"));
        $(this).parents("nav").find("li").removeClass('active');
        $(this).parents(".page").find(".tab-container li").first().addClass('active').siblings().removeClass('active');
        triggerContentActive($(this).parents(".page").find(".tab-container li.active")[0]);
    });

    $(".page nav ul li").bind("click", function () {
        $(this).parents("nav").removeAttr("class").addClass($("a", this).attr("title").toLowerCase());
        $(this).addClass('active').siblings().removeClass('active');
        $("#" + $("a", this).attr("title").toLowerCase()).addClass('active').siblings().removeClass('active');
        triggerContentActive($(this).parents(".page").find(".tab-container li.active")[0]);
    });

    $(".shortcut li").bind("click", function () {
        $("html,body").animate({
            scrollTop: pagePositions[$(this).attr("data-anchor")]
        }, 250, function () {
            //triggerContentActive($("#" + $(this).attr("data-anchor")).find(".tab-container li.active")[0]);
        });
    });

    $("#soundOverview a").bind("mouseover", function () {
        $("#soundOverview .bg-text").stop().animate({
            marginLeft:'-50px'
        });
    }).bind("mouseout", function () {
        $("#soundOverview .bg-text").stop().animate({
            marginLeft:0
        });
    }).bind("click", function () {
        $("#sound nav").removeAttr("class").addClass($("#sound").find(".tab-container li").first().next().attr("id"));
        $("#sound nav").find("li").first().addClass('active');
        $("#sound").find(".tab-container li").first().next().addClass('active').siblings().removeClass('active');
        triggerContentActive($("#sound").find(".tab-container li").first().next()[0]);
    });
    //$("#touchOverview a").bind("mouseover", function () {
    //    $("#touch .tab-container").stop().animate({
    //        marginLeft:'-50px'
    //    });
    //    $("#touch .skew-right-top .ice").stop().animate({
    //        left: -50
    //    });
    //}).bind("mouseout", function () {
    //    $("#touch .tab-container").stop().animate({
    //        marginLeft:0
    //    });
    //    $("#touch .skew-right-top .ice").stop().animate({
    //        left: 0
    //    });
    //})
    $("#touchOverview a").bind("click", function () {
        $("#touch nav").removeAttr("class").addClass($("#touch").find(".tab-container li").first().next().attr("id"));
        $("#touch nav").find("li").first().addClass('active');
        $("#touch").find(".tab-container li").first().next().addClass('active').siblings().removeClass('active');
        triggerContentActive($("#touch").find(".tab-container li").first().next()[0]);
    });
    $("#responseOverview a").bind("mouseover", function () {
        $("#response .background-container,#response .content ul").stop().animate({
            marginLeft:-75
        });
    }).bind("mouseout", function () {
        $("#response .background-container,#response .content ul").stop().animate({
            marginLeft:0
        });
    })
    .bind("click", function () {
        $("#response .background-container,#response .content ul").stop().animate({
            marginLeft: 0
        }, 10, function () {
            target = $("#processor");
            target.addClass('active').siblings().removeClass('active');
            $("#response nav").removeAttr("class").addClass(target.attr("id"));
            $("#response nav").find("li").first().addClass('active');

            $("#response .center").attr("class", "center " + target.attr("id"));

            triggerContentActive(target[0]);
        });
    });


    $("#ubiquityOverview a").bind("click", function () {
        $("#ubiquity nav").removeAttr("class").addClass($("#ubiquity").find(".tab-container li").first().next().attr("id"));
        $("#ubiquity nav").find("li").first().addClass('active');
        $("#ubiquity").find(".tab-container li").first().next().addClass('active').siblings().removeClass('active');
        triggerContentActive($("#ubiquity").find(".tab-container li").first().next()[0]);
    });

    $("#appOverview a").bind("click", function () {
        var target = $(".icon", this).clone().removeClass("icon").attr("class");
        $("#ubiquity .skew-right-bottom").addClass("active");
        $("#app .skew-left-top.color").addClass("active");
        switch (target) {
            case 'phone':
                $("#app nav li").eq(0).trigger("click");
                break;
            case 'supernote':
                $("#app nav li").eq(1).trigger("click");
                break;
            case 'mylibrary':
                $("#app nav li").eq(2).trigger("click");
                break;
        }
    });
    //$("figure #reel").reel({
    //    //indicator: 5, // For no indicator just remove this line
    //    frames: 6,
    //    //footage: 4,
    //    cursor: 'hand',
    //    images: $("figure #reel").attr('src').replace(/1/, '#')
    //});
    window.currentTick = 0;

    if (swfobject.hasFlashPlayerVersion("9.0.4.5")) {
        var flashvars = {};
        //flashvars.debug = 1;
        //flashvars.hostName = hostName;

        var params = {};
        params.menu = "false";
        params.allowScriptAccess = "always";
        params.wmode = "transparent";

        var attributes = {};
        attributes.id = "reel";
        attributes.name = "reel";
        swfobject.embedSWF("/websites/global/products/u6LXaiougFlsPCpp/swf/beauty.swf", attributes.id, "762", "602", "9.0.4.5", "/websites/global/products/u6LXaiougFlsPCpp/swf/expressInstall.swf", flashvars, params, attributes);

        params = {};
        params.menu = "false";
        params.allowScriptAccess = "always";
        params.wmode = "transparent";

        attributes = {};
        attributes.id = "swf-processor";
        attributes.name = "swf-processor";
        swfobject.embedSWF("/websites/global/products/u6LXaiougFlsPCpp/swf/processor.swf", attributes.id, "2000", "680", "9.0.4.5", "/websites/global/products/u6LXaiougFlsPCpp/swf/expressInstall.swf", flashvars, params, attributes);

        params.menu = "false";
        params.allowScriptAccess = "always";
        params.wmode = "transparent";

        attributes.id = "swf-battery";
        attributes.name = "swf-battery";
        swfobject.embedSWF("/websites/global/products/u6LXaiougFlsPCpp/swf/battery.swf", attributes.id, "1300", "1000", "9.0.4.5", "/websites/global/products/u6LXaiougFlsPCpp/swf/expressInstall.swf", flashvars, params, attributes);

        params.menu = "false";
        params.allowScriptAccess = "always";
        params.wmode = "transparent";

        attributes.id = "swf-smartpeek";
        attributes.name = "swf-smartpeek";
        swfobject.embedSWF("/websites/global/products/u6LXaiougFlsPCpp/swf/smart-peek.swf", attributes.id, "800", "680", "9.0.4.5", "/websites/global/products/u6LXaiougFlsPCpp/swf/expressInstall.swf", flashvars, params, attributes);

        params.menu = "false";
        params.allowScriptAccess = "always";
        params.wmode = "transparent";

        attributes.id = "swf-smartcrop";
        attributes.name = "swf-smartcrop";
        swfobject.embedSWF("/websites/global/products/u6LXaiougFlsPCpp/swf/smart-crop.swf", attributes.id, "800", "680", "9.0.4.5", "/websites/global/products/u6LXaiougFlsPCpp/swf/expressInstall.swf", flashvars, params, attributes);


        params.menu = "false";
        params.allowScriptAccess = "always";
        params.wmode = "transparent";

        attributes.id = "swf-translation";
        attributes.name = "swf-translation";
        swfobject.embedSWF("/websites/global/products/u6LXaiougFlsPCpp/swf/translation.swf", attributes.id, "1020", "680", "9.0.4.5", "/websites/global/products/u6LXaiougFlsPCpp/swf/expressInstall.swf", flashvars, params, attributes);

        params.menu = "false";
        params.allowScriptAccess = "always";
        params.wmode = "transparent";

        attributes.id = "swf-floatingapp";
        attributes.name = "swf-floatingapp";
        swfobject.embedSWF("/websites/global/products/u6LXaiougFlsPCpp/swf/floating-app.swf", attributes.id, "500", "680", "9.0.4.5", "/websites/global/products/u6LXaiougFlsPCpp/swf/expressInstall.swf", flashvars, params, attributes);

        params.menu = "false";
        params.allowScriptAccess = "always";
        params.wmode = "transparent";
        attributes.id = "swf-instantnote";
        attributes.name = "swf-instantnote";
        swfobject.embedSWF("/websites/global/products/u6LXaiougFlsPCpp/swf/instant-note.swf", attributes.id, "2000", "680", "9.0.4.5", "/websites/global/products/u6LXaiougFlsPCpp/swf/expressInstall.swf", flashvars, params, attributes);

        params.menu = "false";
        params.allowScriptAccess = "always";
        params.wmode = "transparent";

        attributes.id = "swf-penmode";
        attributes.name = "swf-penmode";
        swfobject.embedSWF("/websites/global/products/u6LXaiougFlsPCpp/swf/pen-mode.swf", attributes.id, "500", "710", "9.0.4.5", "/websites/global/products/u6LXaiougFlsPCpp/swf/expressInstall.swf", flashvars, params, attributes);
    }

    window.switchCamera = function (frame) {
        var obj = swfobject.getObjectById("reel");

        if (!obj || typeof (obj.switchCamera) != 'function')
            return;
        obj.switchCamera(frame);
    };
    window.reelgoto = function (frame) {
        if (frame == $("#reel").attr("datacurrentFrame"))
            return;
        var obj = swfobject.getObjectById("reel");

        if (!obj || typeof (obj.goto) != 'function')
            return;
        obj.goto(frame);
        $("#reel").attr("datacurrentFrame", frame);
        //clearTimeout(currentTick);
        //var current = $("#reel img").attr("src").replace(/.*\/websites.*\/(\d+).png/ig, '$1') * 1;
        //if (current < frame && current + 1 <= 90) {
        //    current++
        //}
        //else if (current > frame && current - 1 >= 1) {
        //    current--;
        //} else{
        //    return;
        //}
        //var next = $("#reel img").attr("src").replace(/(.*\/websites.*\/)(\d+)(.png)/ig, '$1' + (current.toString()) + '$3');
        //var img = new Image();
        ////img.onload = function () {
        ////    $("#reel img").attr("src", next);
        ////};
        ////img.src = next;
        //currentTick = setTimeout(function () {
        //    $("#reel img").attr("src", next)
        //    reelgoto(frame);
        //}, 25);

    };
    //(function () {
    //    var preload = function (current) {
    //        if (current < 90) {
    //            current++
    //        } else {
    //            return;
    //        }
    //        var next = $("#reel img").attr("src").replace(/(.*\/websites.*\/)(\d+)(.png)/ig, '$1' + (current.toString()) + '$3');
    //        var img = new Image();
    //        img.onload = function () {
    //        };
    //        img.src = next;
    //            preload(current);
    //    };
    //    preload(0);
    //}());
});
