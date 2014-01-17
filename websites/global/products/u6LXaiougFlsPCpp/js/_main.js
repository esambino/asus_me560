var producthash = 'XekiymsOcUzGyZSj';
var ltIE9 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 9;
//document.write('<link rel="stylesheet" href="/websites/global/products/' + producthash + '/css/main.css">');

var firstTimeLoad = true;

var canvas, stage, exportRoot;


function initSonicMaster() {
    canvas = document.getElementById("canvas");
    images = images || {};

    var manifest = [
		{ src: "/websites/global/products/"+producthash+"/img/sound/left_speaker.png", id: "left_speaker" },
		{ src: "/websites/global/products/"+producthash+"/img/sound/light.png", id: "light" },
		{ src: "/websites/global/products/"+producthash+"/img/sound/pad.png", id: "pad" },
		{ src: "/websites/global/products/"+producthash+"/img/sound/right_speaker.png", id: "right_speaker" },
		{ src: "/websites/global/products/"+producthash+"/img/sound/speaker.jpg", id: "speaker" }
    ];

    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest);
}

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

$(function () {
    window.exportRoot = exportRoot;

    var click_event = "click";
    //setup section's pager
    var pagerColor = ['','','white','white','white','white']
    var sectionAry = ['index','beauty','sound','touch','response','ubiquity','app','spec'];
    var sectionTotal = sectionAry.length;

    
    for(var j=0;j<sectionTotal;j++)
    {

        //waypoint
        $('section#'+sectionAry[j]).waypoint(function(direction) {

            var target = $(this).attr('id');
            switch(direction)
            {
                case 'down':
                    $('#main-menu ul li').each(function(){
                        if($(this).attr('data-anchor') == target)
                        {
                            $(this).addClass('active');
                        }
                        else
                        {
                            $(this).removeClass('active');
                        }
                    })
                break;
                
                case 'up':
                    $('#main-menu ul li').each(function(){
                        if($(this).attr('data-anchor') == target)
                        {
                            $(this).addClass('active');
                        }
                        else
                        {
                            $(this).removeClass('active');
                        }
                    })
                break;
            }
        });

        
        var total = $("#custom-wrap section#"+sectionAry[j]+" ul.content li").length;
        if(total==1 || sectionAry[j] =='index' || sectionAry[j] == 'spec')
            continue;

        $("#custom-wrap section#"+sectionAry[j]).append('<nav class="pager '+sectionAry[j]+' '+pagerColor[j]+'"></nav>');
        var i=0;
        for(i=0;i<total;i++)
        {
            var status = '';
            if(i==0)
                status = 'active first';
            $("#custom-wrap section#"+sectionAry[j]+" nav.pager").append('<a href="javascript:;" class="'+status+'" slide="'+i+'"></a>');
        }

        $("#custom-wrap section#"+sectionAry[j]).append('<nav class="arrow '+sectionAry[j]+'"></nav>');
        var i=0;
        var total = 2;
        for(i=0;i<total;i++)
        {
            var dx = 'next';
            if(i==0)
            {
                dx = 'prev'
            }
            $("#custom-wrap section#"+sectionAry[j]+" nav.arrow").append('<a href="javascript:;" class="'+dx+'"></a>');
        }
    }

    $("nav.pager a").bind(click_event,function(){
        var current = $(this).parents(".page").find("ul.content li.active");
        var target = $(this).parents(".page").find("ul.content li").eq($(this).index());
        var current_bg = $(this).parents(".page").find("ul.bg li").eq(current.index());
        var target_bg = $(this).parents(".page").find("ul.bg li").eq($(this).index());
        if (current.index() === target.index())
            return;
        target.addClass("prepare");
        if(target.index() > current.index()){
            setTimeout(function () {
                target.removeClass("prev").addClass("next");
                target_bg.removeClass("prev").addClass("next");
                setTimeout(function () {
                    target.removeClass("prepare");
                    current.addClass("prev").removeClass("active");
                    target.addClass("active").removeClass("prev").removeClass("next");
                }, 50);
            }, 1);
        }
        else {
            setTimeout(function () {
                target.removeClass("next").addClass("prev");
                target_bg.removeClass("next").addClass("prev");
                setTimeout(function () {
                    target.removeClass("prepare");
                    current.removeClass("active").addClass("next");
                    target.removeClass("prev").removeClass("next").addClass("active");
                }, 50);
            }, 1);
        }

        TweenMax.set(target_bg,{zIndex:2000});
        TweenMax.set(current_bg,{zIndex:1000});
        TweenMax.to(current_bg,.3,{opacity:0,delay:1});
        TweenMax.to(target_bg,.5,{opacity:1,delay:.4});
        $(this).siblings().removeClass('active')
        $(this).addClass('active');
        target.find("img").trigger("click");
    })


    //nav arrow
    $("nav.arrow a").bind(click_event,function(){
        var current = $(this).parents(".page").find("ul.content li.active");
        var target = null;

        if ($(this).hasClass('next')) {
            target = current.next().length > 0 ? current.next() : current.siblings().first();
        }
        else {
            target = current.prev().length > 0 ? current.prev() : current.siblings().last();
        }
        var clickItem = $(this).parents(".page").find("nav.pager").find("a").eq(target.index());
        clickItem.trigger(click_event);
    })
    $("#main-menu ul li").bind('click',function(){
        var target_section = $(this).attr('data-anchor');
        target_section = target_section.replace(' active','');
        TweenMax.to(window, .5, { scrollTo: { y: $('section#'+target_section).offset().top, ease: Sine.easeOut } });
    })

    //lazyload

    if (!ltIE9) {
        $("#custom-wrap img.lazy").lazyload({
             effect       : "fadeIn",
             event:"click"
        });
    }
    else{
        $("#custom-wrap img.lazy").lazyload({
             event:"click"
        });
    }


    //colorbox
    if ($(window).width() > 1920 * 0.8) {
        $(".videos a").colorbox({ iframe: true, innerWidth: 1920 * 0.8, innerHeight: 1080 * 0.8 });
    } else {
        $(".videos a").colorbox({ iframe: true, innerWidth: $(window).width() * 0.8, innerHeight: $(window).height() * 0.8 });
    }
    
    $(".videos a").each(function(){
        $(this).attr('href', $(this).attr('data-href'));
    })

    //resize
    $(window).resize(function () {
        $("#custom-wrap").width($(window).width());
        $("#special-sectionOverview nav.arrow").width($(window).width());
        //
        if($(window).width()>960)
        {
            $("#custom-wrap nav.pager").css('left', ($(window).width() - 960) / 2 + 126);
            $("#custom-wrap .inner").css('left',0);
            $("#custom-wrap nav.arrow a.prev").css('left', ($(window).width() - 960) * 0.5 * 0.5 - 19);
            $("#custom-wrap nav.arrow a.next").css('left', ($(window).width() - 960) * 0.75 + 960 - 19);

            //if($(window).width()<$("#special-sectionOverview").offset().left+960+50)
            //{
            //    $("#custom-wrap nav.arrow a.next").css('left',$(window).width()-40);
            //}
            //else
            //{
            //    $("#custom-wrap nav.arrow a.next").css('left',$("#special-sectionOverview").offset().left+960+50);
            //}
            $("#custom-wrap nav.shortcut").show();
        }
        else
        {

            $("#custom-wrap .inner").css('left',-126/2);
            $("#custom-wrap nav.pager").css('left',126/2);
            $("#custom-wrap nav.arrow a.prev").css('left',10);
            $("#custom-wrap nav.arrow a.next").css('left',$(window).width()-40);
            $("#custom-wrap nav.shortcut").hide();
        }
        
        $("#custom-wrap nav.arrow").show();
        $("#custom-wrap").css('left',-$("#special-sectionOverview").offset().left);
    });

    $(window).trigger('resize');

    if (!ltIE9) {
        initSonicMaster();
        $(".speakers .inner .pic").remove();
    }
});