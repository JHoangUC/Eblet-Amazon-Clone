function loginClicked(){
        if ($("#username").val() == "" || $("#password").val() == "") {
          $("#errorMessage").html("All fields must be filled out")
        }
        else {
          $.ajax({
            url: "/checklogin",
            type: "POST",
            data: {username: $("#username").val(), password: $("#password").val()},
            success: function(data){
              if (!data)
                  $("#errorMessage").html("Password or username is incorrect")
              else {
                  window.location = data.redirect;
                }


            },
            dataType: "json"
          });
        }

        return false;
      }

        $("#password").keydown( function( event ) {
            if ( event.which === 13 ) {
              loginClicked();
              event.preventDefault();
              return false;
            }
        });

        $("#loginButton").click(loginClicked);
