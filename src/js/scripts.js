$(document).ready(function () {
  let navbar = document.querySelector(".navbar");
  navbar.addEventListener("click", function () {
    console.log("Navbar clicked!");
  });

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
});
