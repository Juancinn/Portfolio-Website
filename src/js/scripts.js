/* global $ */

$(document).ready(function () {
  // /* Navigation Bar */
  let navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.addEventListener("click", function () {
      console.log("Navbar clicked!");
    });
  }

  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= $(".banner").height()) {
      $(".navbar").addClass("fixed-navbar");
      $(".navbar").removeClass("hidden-navbar");
    } else {
      $(".navbar").removeClass("fixed-navbar");
      $(".navbar").addClass("hidden-navbar");
    }
    // Hide arrow when user starts scrolling
    if ($(window).scrollTop() > 10) {
      $(".scroll-arrow").fadeOut("slow");
    } else {
      $(".scroll-arrow").fadeIn("slow");
    }
  });

  //Slow Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      let target = document.querySelector(this.getAttribute("href"));

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // Scroll To Top
  document.getElementById("scrollToTop").addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Other Options
  const otherElement = document.getElementById("other");
  const otherTopicDiv = document.getElementById("otherTopicDiv");
  const otherTopic = document.getElementById("otherTopic");
  const jobOfferElement = document.getElementById("jobOffer");
  const schoolElement = document.getElementById("school");

  if (otherElement) {
    otherElement.addEventListener("change", function () {
      if (this.checked && otherTopicDiv && otherTopic) {
        otherTopicDiv.style.display = "block";
        otherTopic.required = true; // make it mandatory
      }
    });
  }

  if (jobOfferElement) {
    jobOfferElement.addEventListener("change", hideOther);
  }

  if (schoolElement) {
    schoolElement.addEventListener("change", hideOther);
  }

  function hideOther() {
    if (otherTopicDiv && otherTopic) {
      otherTopicDiv.style.display = "none";
      otherTopic.required = false; // remove mandatory status
    }
  }
});

//Reason Dropdown
document.getElementById("reasonDropdown").addEventListener("change", function () {
  let otherDiv = document.getElementById("otherTopicDiv");
  if (this.value === "other") {
    otherDiv.style.display = "block";
  } else {
    otherDiv.style.display = "none";
  }
});

//Phone/Email Option
document.getElementById("contactMethod").addEventListener("change", function () {
  const phoneInputDiv = document.getElementById("phoneInputDiv");
  if (this.value === "phone") {
    phoneInputDiv.style.display = "block";
    document.getElementById("phone").required = true; // Make phone input mandatory
  } else {
    phoneInputDiv.style.display = "none";
    document.getElementById("phone").required = false; // Remove mandatory status from phone input
  }
});
