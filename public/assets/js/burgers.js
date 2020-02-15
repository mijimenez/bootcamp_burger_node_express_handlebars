// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  // Change devour state on click of .change-devour
  $(".change-devour").on("click", function(event) {
    var id = $(this).data("id");
    var newDevour = $(this).data("newdevour");

    var newDevourState = {
      devoured: newDevour
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState
    }).then(
      function() {
        console.log("changed devour to", newDevour);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // On submit, create new burger with user's entry name and a set "devour" state of 0 or "false", which puts it into the "Not devoured" list.
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    // If input is empty or exceeds 50 char limit, display error message
    if (!$("#ca").val().trim() || $("#ca").val().trim().length > 50) {
      var errorMessage = $("<p>*Please enter a burger name with 50 characters or less.</p>").addClass("error");
      errorMessage.attr("style", "color: red");
      $(".form-group").append(errorMessage);
      $("#ca").val('');
    }
    else {
      $(".error").attr("style", "display:none;");
      var newBurger = {
        burger_name: $("#ca").val().trim(),
        devoured: 0
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    }
  });

  // Delete selected burger
  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});


