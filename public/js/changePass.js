  function changepassClicked(){
        if ($("#username").val() == "") {
          $("#errorMessage").html("A username must be entered")
        }
        else {
          $.ajax({
            url: "/updatePassword",
            type: "PUT",
            data: {username: $("#username").val(), password: $("#password").val(), newPass: $("#newPass").val()},
            success: function(data){
              if (!data){
                  $("#errorMessage").append("please enter a valid username/password");
                }
              else {
                  $("#errorMessage").append("password updated");
                }
            },
            dataType: "json"
          });
        }

        return false;
      }
        $("#newPass").keydown( function( event ) {
            if ( event.which === 13 ) {
              console.log("hello");
              changePassButton();
              event.preventDefault();
              return false;
            }
        });

        $("#changePassButton").click(changepassClicked);