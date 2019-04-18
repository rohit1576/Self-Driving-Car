$(window).on("load", function() {
  setTimeout(function() {
    $(".spinner").fadeOut("slow");

    setTimeout(function() {
      $("#prelaoder").fadeOut("slow");

      setTimeout(function() {
        $(".content-block")
          .addClass("animated fadeInDown")
          .fadeIn("slow");
        $("#footer").fadeIn("slow");
      }, 900);
    }, 700);
  }, 700);
});
