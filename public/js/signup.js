function signupClicked(){
  if ($("#username").val() == "" || $("#password").val() == "" || $("#confirmPassword").val() == "") {
    $("#errorMessage").html("All fields must be filled out")
    console.log("asdfasfdasfdasdf");
    return false;
  }

  $.ajax({
    url: "/signup",
    type: "POST",
    data: {username:$("#username").val(), password:$("#password").val()},
    success: function(data){
      if (!data)
        alert("ERROR");
      else
        window.location = data.redirect;
    } ,
    dataType: "json"
  });
  return false;
 }

 $("body").keyup( function( event ) {
   if ($("#password").val() !== $("#confirmPassword").val()) {
     $("#errorMessage").html("Passwords must match")
   } else {
     $("#errorMessage").html("")
   }
 });

 $("#ident").keydown( function( event ) {
    if ( event.which === 13 ) {
      readClicked();
      event.preventDefault();
      return false;
    }
});




$("#password").keydown( function( event ) {
    if ( event.which === 13 ) {
      signupClicked();
      event.preventDefault();
      return false;
    }
});

$("#loginButton").click(function(){
  signupClicked()
});
