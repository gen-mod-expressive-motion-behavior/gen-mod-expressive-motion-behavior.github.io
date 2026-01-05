window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    // Method section button functionality
    $('.method-btn').on('click', function() {
      var target = $(this).data('tab');
      
      // Remove active class from all buttons and descriptions
      $('.method-btn').removeClass('is-active');
      $('.method-description').removeClass('is-active');
      
      // Add active class to clicked button and corresponding description
      $(this).addClass('is-active');
      $('#' + target + '-desc').addClass('is-active');
      
      // Update the main image
      $('#method-image').attr('src', './static/images/method_' + target + '.png');
      $('#method-image').attr('alt', 'Method: ' + target.charAt(0).toUpperCase() + target.slice(1));
    });

    // Context-Aware Motion Behavior section button functionality
    $('.context-btn').on('click', function() {
      var target = $(this).data('tab');
      
      // Remove active class from all buttons and descriptions
      $('.context-btn').removeClass('is-active');
      $('.context-description').removeClass('is-active');
      
      // Add active class to clicked button and corresponding description
      $(this).addClass('is-active');
      $('#' + target + '-desc').addClass('is-active');
      
      // Update the video source
      var video = $('#context-video')[0];
      var currentSrc = './static/videos/context_' + target + '.mp4';
      if (video.querySelector('source').src !== currentSrc) {
        video.querySelector('source').src = currentSrc;
        video.load();
        video.play();
      }
    });

    // Cross-Morphology section button functionality
    $('.morphology-btn').on('click', function() {
      var target = $(this).data('tab');
      
      // Remove active class from all buttons and descriptions
      $('.morphology-btn').removeClass('is-active');
      $('.morphology-description').removeClass('is-active');
      
      // Add active class to clicked button and corresponding description
      $(this).addClass('is-active');
      $('#' + target + '-desc').addClass('is-active');
      
      // Update the video source
      var video = $('#morphology-video')[0];
      var currentSrc = './static/videos/morphology_' + target + '.mp4';
      if (video.querySelector('source').src !== currentSrc) {
        video.querySelector('source').src = currentSrc;
        video.load();
        video.play();
      }
    });

})


