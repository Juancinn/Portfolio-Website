/* global $ */
/* global jQuery */

jQuery.easing.easeInOutCubic = function (x, t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
  return (c / 2) * ((t -= 2) * t * t + 2) + b;
};

$(document).ready(function () {
  console.log("Starting script file");

  /* Navigation Bar */
  $(".navbar").on("click", function () {
    console.log("Navbar clicked!");
  });

  /* Window Scroll Event */
  $(window).on("scroll", function () {
    handleNavbarPosition();
    handleScrollArrowVisibility();
    handleScrollToTopButtonVisibility();
  });

  /* Slow Scroll */
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    let target = $(this.getAttribute("href"));
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top
      },
      1000
    );
  });

  /* Scroll to top button */
  $("#scrollToTop").on("click", function () {
    console.log("Button clicked");
    scrollToTop();
  });

  /* Other functionalities */
  initializeOtherOptions();
  initializeReasonDropdown();
  initializeContactMethod();

  // Functions
  function handleNavbarPosition() {
    if ($(window).scrollTop() >= $(".banner").height()) {
      $(".navbar").addClass("fixed-navbar");
      $(".navbar").removeClass("hidden-navbar");
    } else {
      $(".navbar").removeClass("fixed-navbar");
      $(".navbar").addClass("hidden-navbar");
    }
  }

  function handleScrollArrowVisibility() {
    if ($(window).scrollTop() > 10) {
      $(".scroll-arrow").fadeOut("slow");
    } else {
      $(".scroll-arrow").fadeIn("slow");
    }
  }

  function handleScrollToTopButtonVisibility() {
    const bannerBottom = $("#Home")[0].getBoundingClientRect().bottom;
    if (window.scrollY > bannerBottom) {
      $("#scrollToTop").fadeIn("slow");
    } else {
      $("#scrollToTop").fadeOut("slow");
    }
  }

  const totalDuration = 1000;

  function scrollToTop() {
    console.log("Starting the scroll to top");
    const startPosition = window.pageYOffset || document.documentElement.scrollTop;
    let startTime = null;

    function animateScroll(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const scrollAmount = customEasing(timeElapsed, startPosition, -startPosition, totalDuration);
      window.scrollTo(0, scrollAmount);
      if (timeElapsed < totalDuration) {
        requestAnimationFrame(animateScroll);
      }
    }
    requestAnimationFrame(animateScroll);
  }

  function initializeOtherOptions() {
    const otherElement = $("#other");
    const otherTopicDiv = $("#otherTopicDiv");
    const otherTopic = $("#otherTopic");
    const jobOfferElement = $("#jobOffer");
    const schoolElement = $("#school");

    otherElement.change(function () {
      if ($(this).prop("checked")) {
        otherTopicDiv.show();
        otherTopic.attr("required", true);
      }
    });

    jobOfferElement.change(hideOther);
    schoolElement.change(hideOther);

    function hideOther() {
      otherTopicDiv.hide();
      otherTopic.attr("required", false);
    }
  }

  function initializeReasonDropdown() {
    $("#reasonDropdown").change(function () {
      if ($(this).val() === "other") {
        $("#otherTopicDiv").show();
      } else {
        $("#otherTopicDiv").hide();
      }
    });
  }

  function initializeContactMethod() {
    $("#contactMethod").change(function () {
      if ($(this).val() === "phone") {
        $("#phoneInputDiv").show();
        $("#phone").attr("required", true);
      } else {
        $("#phoneInputDiv").hide();
        $("#phone").attr("required", false);
      }
    });
  }

  function customEasing(t, b, c, d) {
    const accelerationFraction = 0.75 / 2; // 0.75 seconds for acceleration and deceleration

    t /= d;
    if (t < accelerationFraction) {
      // Accelerate from zero velocity
      t /= accelerationFraction;
      return c * t * t * t * t + b; // using quartic for stronger effect
    } else if (t < 1 - accelerationFraction) {
      // Middle segment moves linearly
      t = (t - accelerationFraction) / (1 - 2 * accelerationFraction);
      return c * (0.5 + 0.5 * t) + b;
    }
    // Decelerate to zero velocity
    t = (t - (1 - accelerationFraction)) / accelerationFraction;
    return c * (1 - (1 - t) * (1 - t) * (1 - t) * (1 - t)) + b; // using quartic for stronger effect
  }
});
