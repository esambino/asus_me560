(function (lib, img, cjs) {

    var p; // shortcut to reference prototypes

    // stage content:
    (lib.sonicmaster = function (mode, startPosition, loop) {
        if (loop == null) { loop = false; } this.initialize(mode, startPosition, loop, { destroy: 0, display: 1 });

        // pad.png
        this.instance = new lib.pad_1();
        this.instance.setTransform(713.5, 67, 0.912, 0.912, 0, 0, 0, 193.5, 0);
        this.instance.alpha = 0;
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({ _off: false }, 0).to({ scaleX: 1, scaleY: 1, x: 712.5, y: 48, alpha: 1 }, 10, cjs.Ease.get(1)).wait(126));

        // light_group
        this.instance_1 = new lib.light_group();
        this.instance_1.setTransform(412, 311.5, 1, 1, -104.9, 0, 0, 86, 90.5);
        this.instance_1.alpha = 0;
        this.instance_1._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).wait(26).to({ _off: false }, 0).to({ alpha: 1 }, 30).wait(80));

        // light_group
        this.instance_2 = new lib.light_group();
        this.instance_2.setTransform(1037, 323.5, 1, 1, 15.3, 0, 0, 86.1, 90.5);
        this.instance_2.alpha = 0;
        this.instance_2._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).wait(26).to({ _off: false }, 0).to({ alpha: 1 }, 30).wait(80));

        // left_speaker.png
        this.instance_3 = new lib.left_speaker_1();
        this.instance_3.setTransform(591, 255.1, 0.798, 0.798, 0, 0, 0, 237, 0);
        this.instance_3.alpha = 0;
        this.instance_3._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(16).wait(1).to({ _off: false }, 0).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 10, cjs.Ease.get(1)).wait(110));

        // right_speaker.png
        this.instance_4 = new lib.right_speaker_1();
        this.instance_4.setTransform(852, 260.1, 0.791, 0.791);
        this.instance_4.alpha = 0;
        this.instance_4._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).wait(16).to({ _off: false }, 0).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 10, cjs.Ease.get(0.78)).wait(110));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 0, 0);


    // symbols:
    (lib.left_speaker = function () {
        this.initialize(img.left_speaker);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 237, 357);


    (lib.light = function () {
        this.initialize(img.light);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 184, 181);


    (lib.pad = function () {
        this.initialize(img.pad);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 387, 629);


    (lib.right_speaker = function () {
        this.initialize(img.right_speaker);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 236, 356);


    (lib.speaker = function () {
        this.initialize(img.speaker);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 858, 629);


    (lib.r_speaker_animation = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.right_speaker();

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 236, 356);


    (lib.pad_1 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.pad();

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 387, 629);


    (lib.L_speaker_animation = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.left_speaker();

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 237, 357);


    (lib.light_1 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.light();
        this.instance.setTransform(0, -180.9);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, -180.9, 184, 181);


    (lib.right_speaker_1 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.r_speaker_animation();

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 236, 356);


    (lib.light_animation = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Layer 1
        this.instance = new lib.light_1();
        this.instance.setTransform(49, 124.8, 0.43, 0.43, 0, 0, 0, 59.1, -52.3);

        this.timeline.addTween(cjs.Tween.get(this.instance).to({ regX: 59, regY: -52.3, scaleX: 2.43, scaleY: 2.43, x: 113.1, y: 62.5, alpha: 0 }, 44, cjs.Ease.get(1)).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(23.5, 69.5, 79.2, 77.9);


    (lib.left_speaker_1 = function () {
        this.initialize();

        // Layer 1
        this.instance = new lib.L_speaker_animation();
        this.instance.setTransform(237, 0, 1, 1, 0, 0, 0, 237, 0);

        this.addChild(this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 237, 357);


    (lib.light_group = function (mode, startPosition, loop) {
        if (loop == null) { loop = false; } this.initialize(mode, startPosition, loop, {});

        // light_animation
        this.instance = new lib.light_animation();
        this.instance.setTransform(94, 80.6, 1, 1, 0, 0, 0, 86, 90.5);
        this.instance._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(35).to({ _off: false }, 0).wait(20));

        // light_animation
        this.instance_1 = new lib.light_animation();
        this.instance_1.setTransform(94, 80.6, 1, 1, 0, 0, 0, 86, 90.5);
        this.instance_1._off = true;

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4).wait(14).to({ _off: false }, 0).wait(37));

        // light_animation
        this.instance_2 = new lib.light_animation();
        this.instance_2.setTransform(94, 80.6, 1, 1, 0, 0, 0, 86, 90.5);

        this.timeline.addTween(cjs.Tween.get({}).to({ state: [{ t: this.instance_2 }] }).wait(55));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(31.5, 59.6, 79.2, 77.9);

})(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;