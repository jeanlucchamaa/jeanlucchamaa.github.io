function buttonsizer(){
    var ratio = (($("#buttongroupwidth").width()-30) / $("#buttongroupheight").height());
    //console.log("ratio",ratio);
    if(ratio>(6.857)){
        // port too wide, match height
        var scale=$("#buttongroupheight").height()/70;     
    }
    else{
        // port too tall, match width
        var scale=($("#buttongroupwidth").width()-30)/480;  

    }
        $( ".btn.btn-fab" ).css( "margin", 10*scale); 
        $( ".btn.btn-fab" ).css( "padding",15*scale);  
        $( ".btn.btn-fab" ).css( "width", 60*scale); 
        $( ".btn.btn-fab" ).css( "height", 60*scale);
        $( ".btn.btn-fab" ).css( "font-size", 30*scale);
    }

/* Function to animate height: auto */
function autoHeightAnimate(element, time){
    var curHeight = element.height(), // Get Default Height
    autoHeight = element.css('height', 'auto').outerHeight(); // Get Auto Height
    element.outerHeight(curHeight); // Reset to Default Height
    element.stop().animate({ height: autoHeight },{duration: parseInt(time), easing:'easeOutQuad'}); // Animate to Auto Height
}

function highlight(element){
    var newcol= ('5px solid #3F51B5');
    $(element).css('border-left', newcol);
    $(element).css('margin-left', '-5px');
}
function toggletree(element){ // needs to be passed elements of class .tree-toggler
    $(element).parent().children('ul.tree').toggle(300);
    $(element).children('span').toggleClass('glyphicon-triangle-bottom');
    $(element).children('span').toggleClass('glyphicon-triangle-right');
}
function cleanhighlighting(skillclick){//skillclick=true if a skill was clicked, false if experience clicked
    
    $('.skillselect').css('background-color','#009688');
    $('.list-group-item').css('border-left','0px solid');
    $('.skill').css('border-left','0px solid');
    $('.skill').css('margin-left','0px');
    if(!skillclick){
        $('.tree').each(function(i){
            if($(this).is(":visible")){
                toggletree($(this).parent().children('label'));
            }
        });
    }
    
}
var currentslide=2;
function swiper(from,to){
    if(from==1 && to==2){
        console.log('1->2')
        $('#menusidebar').toggleClass('activemenu');
        $('#contentrow').toggleClass('activemenu'); 
        $('#slide1').children().css({ fill: "#303030" });
        $('#slide2').children().css({ fill: "#009688" });  
        currentslide=2;  
        return;
    }
    if(from==2 && to==3){
        console.log('2->3')
        $('#skills').toggleClass('activeskills');
        $('#exprow').toggleClass('activeskills');
        $('#slide2').children().css({ fill: "#303030" });
        $('#slide3').children().css({ fill: "#009688" });   
        currentslide=3;  
        return; 
    }
    if(from==3 && to==2){
        console.log('3->2')
        $('#skills').toggleClass('activeskills');
        $('#exprow').toggleClass('activeskills');
        $('#slide3').children().css({ fill: "#303030" });
        $('#slide2').children().css({ fill: "#009688" });  
        currentslide=2;   
        return;  
    }
    if(from==2 && to==1){
        console.log('2->1')
        $('#menusidebar').toggleClass('activemenu');
        $('#contentrow').toggleClass('activemenu'); 
        $('#slide2').children().css({ fill: "#303030" });
        $('#slide1').children().css({ fill: "#009688" }); 
        currentslide=1;  
        return;
    }
}
var iScrollPos = 0;

function scrolldirup() { // up is TRUE
    var iCurScrollPos = $(this).scrollTop();
    if (iCurScrollPos > iScrollPos) {
        iScrollPos = iCurScrollPos;
        return false;
    } else {
       iScrollPos = iCurScrollPos;
       return true;
    }
}
    var curpos =1;
function calculateoffset(){
    var topset = $('.jumbotron').outerHeight();
    var yscroll = $(window).scrollTop();
   
    var newwidth=parseInt($('#skills').css('width'))-30;
    if(newwidth>50){ // so rogue calls with hidden items don't happen
        $('#fullskillpanel').css({'width':newwidth});
    }
    
    var newwidth=parseInt($('#menusidebar').css('width'))-30;
    if(newwidth>50){
        $('#menupanel').css({'width':newwidth});
    }
   
    if(yscroll>topset){
        $('#fullskillpanel').addClass('stickyskills');
        $('#menupanel').addClass('stickymenu');
    }
    else{
        $('#fullskillpanel').removeClass('stickyskills');
        $('#menupanel').removeClass('stickymenu');
    }
    
    
}

$(document).ready(function() {
    
    //initialize everything
    var radioCur="resu";
    

    var scrolltimes=0;
    //scrolling rules
    $( window ).scroll(function() { 
        calculateoffset();    
    });

    buttonsizer();
    $( window ).resize(buttonsizer);
    $( window ).resize(calculateoffset);
    //keep skills high
    // $(window).on("resize", function(event){
    //     calculateoffset();
    //     buttonsizer();
    // });
     (function(d, t) {
    var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    g.src = 'http://assets.gfycat.com/js/gfyajax-0.517d.js';
    s.parentNode.insertBefore(g, s);
}(document, 'script'));


    
    $('label.tree-toggler').parent().children('ul.tree').toggle();

    $('label.tree-toggler').click(function () {
        toggletree(this);
    });


    // This command is used to initialize some elements and make them work properly
    $.material.init();
    $("[data-toggle=popover]").popover();

    // passing swipes
    $('#masterrow').on("swiperight", function (e) {
        if(currentslide==2){ //centered, going left
            swiper(2,1);
            console.log('Current Slide',currentslide);
            return;
        }
        if(currentslide==3){ // right, going center
            swiper(3,2);   
            console.log('Current Slide',currentslide);
            return;  
        }
    });
    $('#masterrow').on("swipeleft", function (e) {
        if(currentslide==1){ //left, going center
            swiper(1,2);   
            console.log('Current Slide',currentslide);
            return;
        }
        if(currentslide==2 && !$('#slide3').is(':hidden')){ //centered, going right
            swiper(2,3);    
            console.log('Current Slide',currentslide);
            return; 
        }
    });
    $('#slide1').click(function(){
        if(currentslide==3){
            swiper(3,2);
        }
        if(currentslide==2){
            swiper(2,1);
        }
    });
    $('#slide2').click(function(){
        if(currentslide==3){
            swiper(3,2);
        }
        if(currentslide==1){
            swiper(1,2);
        }
    });
    $('#slide3').click(function(){
        if(currentslide==1){
            swiper(1,2);
        }
        if(currentslide==2){
            swiper(2,3);
        }
    });
    
    //"Learn More" button click
    $("#learnmore").click(function(){
        $('#dotnav').css({'display':''});
        var curHeight = $('.jumbotron').outerHeight();
        $('.jumbotron').css('height', curHeight);
        $('.tofadeonclick, #menubutton').toggle("fade",200);
        $("#skillone").trigger( "click" );

        setTimeout(function(){ 
            var jumbo = $('.jumbotron');
            autoHeightAnimate(jumbo,2000);
            var master = $('#masterrow');
//            $("#masterrow").show("blind", 3000);
            $("#masterrow").show("fast",buttonsizer);
        }, 250);
        setTimeout(function(){ 
            buttonsizer();
            autoHeight = $(".jumbotron").css('height', '100%');
            calculateoffset();
        }, 4000);
    });

    // collapsing the resume sections on toggle
    $("#edu").click(function(){
        $(this).toggleClass('glyphicon-minus-sign');
        $(this).toggleClass('glyphicon-plus-sign');
        var tempheight = $('#educationcontent').height();
        if(tempheight==0){
            $('#educationcontent').animate({padding:"+=15px"},0);
            var curHeight = $('#educationcontent').height();
            $('#educationcontent').css('height', 'auto');
            var autoHeight = $('#educationcontent').height(); 
            $('#educationcontent').height(curHeight).animate({height:autoHeight});
        }
        else{
            $('#educationcontent').animate({height:0,padding:"-=15px"});

        }
    });

    $("#exp").click(function(){
        $(this).toggleClass('glyphicon-minus-sign');
        $(this).toggleClass('glyphicon-plus-sign');
        var tempheight = $('#experiencecontent').height();
        if(tempheight==0){
            $('#experiencecontent').animate({padding:"+=15px"},0);
            var curHeight = $('#experiencecontent').height();
            $('#experiencecontent').css('height', 'auto');
            var autoHeight = $('#experiencecontent').height(); 
            $('#experiencecontent').height(curHeight).animate({height:autoHeight});
        }
        else{
            $('#experiencecontent').animate({height:0,padding:"-=15px"});

        }
    });

    $("#exc").click(function(){
        $(this).toggleClass('glyphicon-minus-sign');
        $(this).toggleClass('glyphicon-plus-sign');
        var tempheight = $('#extracurricularcontent').height();
        if(tempheight==0){
            $('#extracurricularcontent').animate({padding:"+=15px"},0);
            var curHeight = $('#extracurricularcontent').height();
            $('#extracurricularcontent').css('height', 'auto');
            var autoHeight = $('#extracurricularcontent').height(); 
            $('#extracurricularcontent').height(curHeight).animate({height:autoHeight});
        }
        else{
            $('#extracurricularcontent').animate({height:0,padding:"-=15px"});

        }
    });

    $("a[data-toggle='pill']").click(function(){
        console.log('pill click');
        setTimeout(function(){
            var radioValue;
            radioValue = $("#skill-panel").children('.nav').children('.active').attr('id');    
            console.log(radioValue);

            if(radioValue=='abou'){
               window.location = "../about";
            }
            if(radioValue=='port'){
               window.location = "../portfolio";
            }
            if(radioValue=='pdfr'){
               window.location = "../pdfresume";
            }
            if(radioValue=='cred'){
               window.location = "../credits";
            }
            
        });
    });
    
    // skill selection
    $(".skillselect").click(function(){
        cleanhighlighting(false);
        var thiselement=$(this);
        setTimeout(function(){
            highlight(thiselement.parent('.list-group-item'));
            thiselement.css('background-color','#3F51B5');
            var classList =thiselement.attr('class').split(/\s+/);
            classList.splice(0,2);
            $.each(classList, function(index, item){
                highlight($("#"+item));
                if($("#"+item).parent().is(":hidden")){
                    toggletree($("#"+item).parent('.tree').parent().children('.tree-toggler'));
                }
            });
                

        },350);
    });

    $(".skill").click(function(){
        cleanhighlighting(true);
        var thiselement=$(this);
        setTimeout(function(){
            highlight(thiselement);
            var skillid =thiselement.attr('id').split(/\s+/);
            highlight($('.'+skillid).parent('.list-group-item'));
        },350);
    });
    

});