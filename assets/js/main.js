window.addEventListener('DOMContentLoaded',function(e){
  $(document).on('scroll',() => {
    let scroll = window.scrollY;
    /**** Navbar fixed ******/
    if(scroll > 700){
      $('header').addClass("fixedPostion");
      $('#wrapper').css('border-radius','0px 0px 50px 50px');
      $('#tmpAbout').css({
        position: "relative",
        height: "70px"
      })
    }
    else {
      $('header').removeClass("fixedPostion");
      $('#wrapper').css('border-radius','50px');
      $('#tmpAbout').css({
        height: "0px"
      })
    }

    /****Navbar|change color - active *****/
    if(scroll >= 3500){
      $('#navigation').find('.active').removeClass('active');
      $('#navigation li:nth-child(4) p').addClass('active')
    }
    else if(scroll >= 2500){
      $('#navigation').find('.active').removeClass('active');
      $('#navigation li:nth-child(3) p').addClass('active')
    }
    else if(scroll >= 1200){
      $('#navigation').find('.active').removeClass('active');
      $('#navigation li:nth-child(2) p').addClass('active')
    }
    else {
      $('#navigation').find('.active').removeClass('active');
      $('#navigation li:nth-child(1) p').addClass('active')
    }
    

  })
  /*******Navigation - on click***********/
  $('#aboutNav').click(function(){
    scrollToElement('containerAbout');
  })
  $('#skillsNav').click(function(){
    scrollToElement('containerSkills');
  })
  $('#projectsNav').click(function(){
    scrollToElement("projects");
  })
  $('#contactNav').click(function(){
    scrollToElement('containerContact');
  })
  /********* Project Cover *********/
  $('.project')
    .mouseenter(function(e){
      $(this).find('.cover').show();
      $(this).find('img').css('opacity','0.15')
  })
  .mouseleave(function(e){
    $(this).find('.cover').hide();
    $(this).find('img').css('opacity','1')
  })

  let responsive = window.matchMedia("(max-width: 767px)");
  if(responsive.matches){
    $('.skills').removeClass("ia-left");
    $('.skills').removeClass("ia-right");
  }

  /*****************Change theme ************/
  //checked(true) = dark
  //checked(false) = light
  $('#theme').click(function(){
    let isChecked = this.checked;
    changeTheme(isChecked)
  })

  let themeCheck = this.localStorage.getItem("theme");
  if(themeCheck){
    switch(themeCheck){
      case 'false': 
      themeCheck = false; 
      $('#theme').attr("checked",false);
      break;
      default : themeCheck = true; break;
    }
    changeTheme(themeCheck);
  }

  /**********SLIDER*************/
  $('.projectsSlider').slick({
    centerMode: false,
    centerPadding: '60px',
    slidesToShow: 1,
    mobileFirst: false,
    dots: true,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: `<button type='button' class='slick-prev pull-left'>
      <span class="iconify" data-icon="material-symbols:arrow-back-ios-new"></span></button>`,
    nextArrow: `<button button type='button' class= 'slick-next pull-right'>
        <span class="iconify" data-icon="material-symbols:arrow-back-ios-new" data-rotate="180deg"></span>
      </button> `,
  });
  
  /* Animation Projects */
  AOS.init({
    offset: 20
  });
  
})


function changeTheme(checked){
  //console.log(checked)
  if(checked){
    $("body").removeClass('backgroundLight');
    
  }
  else {
    $("body").addClass('backgroundLight');
  }
  localStorage.setItem("theme",checked);
}

let nameRegex = /^[A-z][a-z]{2,20}(\s[A-z][a-z]{2,20})?$/;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let msgRegex = /[A-z]+.{2,}/;
$('#btnSend').click(function(e){
  e.preventDefault();
  let name = getElementById('name');
  let email = getElementById('email');
  let subject = getElementById('subject');
  let message = getElementById('message');
 
  let nameError = checkFormInputs(name,nameRegex), // checkFormInputs(name,nameRegex)
      emailError = checkFormInputs(email,emailRegex),
      subjectError = checkFormInputs(subject,msgRegex);
  let messageError = true;
  
  if(!msgRegex.test(message.value)){
    $('#messageErrorField').removeClass('d-none')
    message.style.border = "2px solid red";
  }
  else {
    $('#messageErrorField').addClass('d-none');
    message.style.border = "none";
    messageError = false;

  }
  if(!nameError && !emailError && !subjectError && !messageError){
    $('#messageSendInfo').attr('class',"");
    $('#messageSendInfo').addClass("mt-3")
    $('#messageSendInfo').addClass("text-center")
    let objectToSend = {
      name : name.value,
      email: email.value,
      subject: subject.value,
      message: message.value
    }
    $.ajax({
      url: "sendMessage.php",
      data: objectToSend,
      type: "POST",
      success: function(response){
        $('#messageSendInfo').addClass('alert alert-success');
        $('#messageSendInfo').html("The message was sent successfully");
        console.log(response);
      },
      error: function(xhr){
        console.log(xhr)
        $('#messageSendInfo').addClass('alert alert-danger');
        $('#messageSendInfo').html("Server error, please try again later.");
      }
    })
  }

})


function getElementById(element){
  return document.getElementById(element);
}

function checkFormInputs(element, regex) {
  
  if (regex.test(element.value)) {
    element.nextElementSibling.classList.add('d-none');
    element.style.border = "none";
    return false;
  }
  element.style.border = "2px solid red";
  element.nextElementSibling.classList.remove('d-none');
  return true;
}


function scrollToElement(region){
  let element = document.getElementById(region);
  element.scrollIntoView();
  // setTimeout(function(){
  //   window.scrollBy(0, -100);
  // },540)
}
