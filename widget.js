/* global requirejs cprequire cpdefine chilipeppr THREE */
// Defining the globals above helps Cloud9 not show warnings for those variables

// ChiliPeppr Widget/Element Javascript

requirejs.config({
    /*
    Dependencies can be defined here. ChiliPeppr uses require.js so
    please refer to http://requirejs.org/docs/api.html for info.
    
    Most widgets will not need to define Javascript dependencies.
    
    Make sure all URLs are https and http accessible. Try to use URLs
    that start with // rather than http:// or https:// so they simply
    use whatever method the main page uses.
    
    Also, please make sure you are not loading dependencies from different
    URLs that other widgets may already load like jquery, bootstrap,
    three.js, etc.
    
    You may slingshot content through ChiliPeppr's proxy URL if you desire
    to enable SSL for non-SSL URL's. ChiliPeppr's SSL URL is
    https://i2dcui.appspot.com which is the SSL equivalent for
    http://chilipeppr.com
    */
    paths: {
        // Example of how to define the key (you make up the key) and the URL
        // Make sure you DO NOT put the .js at the end of the URL
        // SmoothieCharts: '//smoothiecharts.org/smoothie',
    },
    shim: {
        // See require.js docs for how to define dependencies that
        // should be loaded before your script/widget.
    }
});

cprequire_test(["inline:com-messageminder-widget"], function(myWidget) {

    // Test this element. This code is auto-removed by the chilipeppr.load()
    // when using this widget in production. So use the cpquire_test to do things
    // you only want to have happen during testing, like loading other widgets or
    // doing unit tests. Don't remove end_test at the end or auto-remove will fail.

    // Please note that if you are working on multiple widgets at the same time
    // you may need to use the ?forcerefresh=true technique in the URL of
    // your test widget to force the underlying chilipeppr.load() statements
    // to referesh the cache. For example, if you are working on an Add-On
    // widget to the Eagle BRD widget, but also working on the Eagle BRD widget
    // at the same time you will have to make ample use of this technique to
    // get changes to load correctly. If you keep wondering why you're not seeing
    // your changes, try ?forcerefresh=true as a get parameter in your URL.

    console.log("test running of " + myWidget.id);

    $('body').prepend('<div id="testDivForFlashMessageWidget"></div>');

    chilipeppr.load(
        "#testDivForFlashMessageWidget",
        "http://fiddle.jshell.net/chilipeppr/90698kax/show/light/",
        function() {
            console.log("mycallback got called after loading flash msg module");
            cprequire(["inline:com-chilipeppr-elem-flashmsg"], function(fm) {
                //console.log("inside require of " + fm.id);
                fm.init();
            });
        }
    );

    // init my widget
    myWidget.init();
    // $('#' + myWidget.id).css('margin', '20px');
    $('title').html(myWidget.name);

} /*end_test*/ );

// This is the main definition of your widget. Give it a unique name.
cpdefine("inline:com-messageminder-widget", ["chilipeppr_ready", /* other dependencies here */ ], function() {
    return {
        /**
         * The ID of the widget. You must define this and make it unique.
         */
        id: "com-messageminder-widget", // Make the id the same as the cpdefine id
        name: "Widget / messageminder", // The descriptive name of your widget.
        desc:"message", // A description of what your widget does
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        /**
         * Define pubsub signals below. These are basically ChiliPeppr's event system.
         * ChiliPeppr uses amplify.js's pubsub system so please refer to docs at
         * http://amplifyjs.com/api/pubsub/
         */
        /**
         * Define the publish signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        publish: {
            // Define a key:value pair here as strings to document what signals you publish.
            '/onExampleGenerate': 'Example: Publish this signal when we go to generate gcode.'
        },
        /**
         * Define the subscribe signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        subscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // so other widgets can publish to this widget to have it do something.
            // '/onExampleConsume': 'Example: This widget subscribe to this signal so other widgets can send to us and we'll do something with it.'
        },
        /**
         * Document the foreign publish signals, i.e. signals owned by other widgets
         * or elements, that this widget/element publishes to.
         */
        foreignPublish: {
            // Define a key:value pair here as strings to document what signals you publish to
            // that are owned by foreign/other widgets.
            // '/jsonSend': 'Example: We send Gcode to the serial port widget to do stuff with the CNC controller.'
        },
        /**
         * Document the foreign subscribe signals, i.e. signals owned by other widgets
         * or elements, that this widget/element subscribes to.
         */
        foreignSubscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // that are owned by foreign/other widgets.
            // '/com-chilipeppr-elem-dragdrop/ondropped': 'Example: We subscribe to this signal at a higher priority to intercept the signal. We do not let it propagate by returning false.'
        },
        /**
         * All widgets should have an init method. It should be run by the
         * instantiating code like a workspace or a different widget.
         */
        init: function() {
            console.log("I am being initted. Thanks.");

            // this.loadBootstrapCss();
            this.setupCreditCardSocialSecCodeMonitoring();
            this.setupAfterHours();
            
            // this.setupUiFromLocalStorage();
            // this.btnSetup();
            // this.forkSetup();

            console.log("I am done being initted.");
        },
        loadBootstrapCss: function() {
            $('head').append('<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/boot' + 'strap.min.css" rel="stylesheet" type="text/css">');
        },
        observer: null,
        setupCreditCardSocialSecCodeMonitoring: function() {
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

            this.observer = new MutationObserver(this.onObserver.bind(this));
            
            // define what element should be observed by the observer
            // and what types of mutations trigger the callback
            this.observer.observe(document, {
              subtree: true,
            //   attributes: true,
              childList: true
            });
            
            // test portion
            setTimeout(function() {
                $('#com-messageminder-widget-tab1').append("<div>modifying dom to see if we get event</div>");
            }, 1000);
            setTimeout(function() {
                $('#com-messageminder-widget-tab1').append("<p>1234123412341234</p>");
                $('#com-messageminder-widget-tab1').append("<span>1234 1234 1234 4545</span>");
                $('#com-messageminder-widget-tab1').append("<div>1234-1234-1234-9999</div>");
            }, 2000);
            setTimeout(function() {
                $('#com-messageminder-widget-tab1').append("<div>297-73-0844 is sample ssn</div>");
            }, 3000);
        },
        onObserver: function(mutations, observer) {
            // fired when a mutation occurs
            // console.log("Got onObserver. mutations:", mutations, "observer:", observer);
            for (var i = 0; i < mutations.length; i++) {
                var mutRec = mutations[i];
                 // now loop thru added nodes
                 if ('addedNodes' in mutRec) {
                     for (var i2 = 0; i2 < mutRec.addedNodes.length; i2++) {
                         var addedNode = mutRec.addedNodes[i2];
                         //console.log("addedNode:", addedNode);
                         
                         // jquery-ize the addedNode to see if it is the compose box
                         var el = $(addedNode);
                         if (el && el.hasClass('zw-send-message-text')) {
                            //  console.log("got a compose box. el:", el);
                             this.onComposeBox(el);
                         }
                         
                         this.detectCreditCardOnNode(addedNode);
                         
                     }
                     
                     // call onComposeBox all the time just to catch any possible DOM change
                     // such that we should reset the enable/disable of the box
                     this.onComposeBox();
                 }
                 
            }
            
        },
        composeBoxEl: null,
        onComposeBox: function(el) {
            // console.log("onComposeBox. el:", el);
            
            // we only get the compose box element once at the start
            // so store it
            if (this.composeBoxEl == null && el && el.hasClass('zw-send-message-text')) {
                this.composeBoxEl = el;
            } else {
                el = this.composeBoxEl;
            }
            
            if (el == null) return;
            
            el.val('SprintFreeMsg: ');
            // console.log("onComposeBox. stuck SprintFreeMsg into textarea");
            
            // now check if after hours so we know to dim out the box or not
            var isAfterHrs = this.isAfterHours();
            if (isAfterHrs) {
                console.log("onComposeBox. isAfterHrs so disabling compose box.");
                el.attr("disabled", true);
                el.val("(Disabled due to after hours.)");
            } else {
                console.log("onComposeBox. NOT isAfterHrs so enabling compose box.");
                el.attr("disabled", false); 
            }
        },
        isAfterHoursSetup: false,
        setupAfterHours: function() {
            if (!this.isAfterHoursSetup) {
                $('.btn-testafterhours').click(this.isAfterHours.bind(this));
            }
        },
        isAfterHours: function(event) {
            // we determin true/false if if is after hours or not
            var isAfter = false;
            var isManual = false;
            
            // see if they are manually overriding to say it is after hours (for testing)
            if ( $('.checkbox-afterhoursnosending').is(':checked')) {
                console.log("isAfterHours. manually checked to mimic after hours");
                isManual = true;
                isAfter = true;
            } else {
                
                // check hours
                var d = new Date(); // current time
                var hours = d.getHours();
                var mins = d.getMinutes();
                var day = d.getDay();
                
                // console.log("isAfterHours. hours:", hours);
            
                // check between 7am et and 10pm et
                if (hours >= 7 && hours <= 20) {
                    console.log("isAfterHours. it is within the hour range so we are safe to enable send");
                    isAfter = false;
                } else {
                    console.log("isAfterHours. it is after hours. disabling compose box.");
                    isAfter = true;
                }
                // return day >= 1
                //     && day <= 5
                //     && hours >= 9 
                //     && (hours < 17 || hours === 17 && mins <= 30);
                
            }
            
            // if it was manually triggered from a button press, update the settings widget
            if (event) {
                var outEl = $('.result-afterhours');
                outEl.removeClass('hidden');
                if (isManual) {
                    outEl.text("You are mimicking it being after hours, so we will dim out compose box.");
                } else if (isAfter) {
                    outEl.text("It is currently after hours. Compose box dimmed out.");
                } else {
                    outEl.text("It is not after hours. Composing allowed.");
                }
                setTimeout(function() {
                    outEl.addClass('hidden');
                }, 5000);
                    
            }
            
            return isAfter;
        },
        detectCreditCardOnNode: function(node) {
            
            if (node == null) return;
            
            // make sure our node has the class we're after
            //if (el.hasClass('zw-message-card-body') || el.hasClass(''))
            
            var isDidWeDetect = false;
            var txt;
            
            // create jquery version of node
            var el = $(node);
            console.log("el:", el);
            if (el == null) return;
            if (el.html() == null) return;
            
            // we are having problems getting too much text, so let's get innertext instead
            //txt = el.text();
            if (el.length > 0 && 'innerText' in el[0]) {
                txt = el[0].innerText;
            } else {
                console.warn("there was no element in the node for credit card detect, so exiting.");
                return;
            }
            //if ('nodeValue' in node) txt = node.nodeValue;
            //else txt = node;
            
            if (txt == null) {
                console.log("txt is null, so returning.");
                return;
            }
            
            // look for formats
            // 1234123412341234
            // 1234 1234 1234 1234
            // 1234-1234-1234-1234
            console.log("starting detectCreditCard with txt:", txt);

            if (txt.match(/\b(\d{16,16})\b/) 
                || txt.match(/\b(\d{4,4}[\s\-]\d{4,4}[\s\-]\d{4,4}[\s\-]\d{4,4})\b/) 
                || txt.match(/\b(\d{9,9})\b/) 
                || txt.match(/\b(\d{3,3}[\s\-]\d{2,2}[\s\-]\d{4,4})\b/)) { 
                
                // we found a credit card
                isDidWeDetect = true;
                var cc = RegExp.$1;
                var cclast4 = cc.substring(cc.length - 4, cc.length);
                
                // get template of lock button to swap in
                var lockEl = $('.template-creditcardreveal').clone();
                lockEl.removeClass('hidden').addClass("dynamic-creditcardreveal");
                
                // build asterisks
                var aster = cc.substring(0, cc.length - 4);
                aster = aster.replace(/\d/g, "*");
                var replaceWith = aster + cclast4 + " " + lockEl.html();
                var newHtml = el.html().replace(cc, replaceWith);
                el.html(newHtml);
                
                // now attach button click event
                el.find('.btn-lock').click(cc, this.onShowCreditCardReveal.bind(this));
                
            }
            
            console.log("ending detectCreditCard with txt:", txt);
            return txt;
        },
        isCreditCardRevealDialogSetup: false,
        onShowCreditCardReveal: function(event) {
            console.log("onShowCreditCardReveal. event.data:", event.data, "event:", event);
            
            var cc = event.data;
            
            // show the credit card reveal box
            var dialogEl = $('.creditcardreveal-password');
            console.log("dialogEl:", dialogEl, "offset:", dialogEl.offset());
            dialogEl.find('.actual-creditcard').text(cc);
            // if (event.currentTarget && event.currentTarget.offsetLeft) {
                // dialogEl.css('left', event.currentTarget.offsetLeft);
                // dialogEl.css('top', event.currentTarget.offsetTop);
            // }
            
            // get position on page of this widget
            var widgetOffset = $('#' + this.id).offset();
            console.log("widgetOffset:", widgetOffset);
            var newLeft =  event.pageX - widgetOffset.left;
            var newTop = event.pageY - widgetOffset.top;
            console.log("newTop:", newTop, "newLeft:", newLeft);
            dialogEl.css('left', newLeft);
            dialogEl.css('top', newTop);
            dialogEl.removeClass('hidden');
            
            // reset bad password
            var badPassEl = dialogEl.find('.creditcardreveal-badpassword');
            badPassEl.addClass('hidden');
            
            // ensure the actual credit card div is hidden
            var actualCcardEl = dialogEl.find('.actual-creditcard');
            actualCcardEl.addClass('hidden');
            
            // see if this is the 1st time we've loaded the dialog
            if (!this.isCreditCardRevealDialogSetup) {
                dialogEl.find('.btn-reveal').click(this.onCreditCardRevealVerifyPassword.bind(this));
                dialogEl.find('.btn-close').click(function() {
                    // reset everything
                    dialogEl.addClass("hidden");
                    dialogEl.find('.actual-creditcard').addClass('hidden');
                    dialogEl.find(".input-password").val("");
                    dialogEl.find('.creditcardreveal-badpassword').addClass("hidden");
                })
                this.isCreditCardRevealDialogSetup = true;
            }
        },
        onCreditCardRevealVerifyPassword: function(event) {
            console.log("onCreditCardRevealVerifyPassword");
            
            var dialogEl = $('.creditcardreveal-password');
            var password = dialogEl.find(".input-password").val();
            
            if (password == "valencia") {
                // the password was good.
                var actualCcardEl = dialogEl.find('.actual-creditcard');
                actualCcardEl.removeClass('hidden');
                // hide the bad password alert just in case
                var badPassEl = dialogEl.find('.creditcardreveal-badpassword');
                badPassEl.addClass('hidden');
            } else {
                // the password was bad
                console.log("password was bad");
                var badPassEl = dialogEl.find('.creditcardreveal-badpassword');
                badPassEl.addClass('hidden');
                setTimeout(function() {
                    badPassEl.removeClass('hidden');
                }, 500);
            }
        },
        
    }
});