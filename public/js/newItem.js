
function successChange(data) {
  if (!data)
    alert("ERROR");
  else {
      alert ('item added');
    }
}
function readURL(e) {
    if (this.files && this.files[0]) {
      console.log('im here');
        var reader = new FileReader();
        $(reader).load(function(e) { $('#img').attr('src', e.target.result); });
        reader.readAsDataURL(this.files[0]);

    }
}
$("#fileStuff").change(readURL);

// $(document).ready(
//   function()
//   {
//     $('form').submit(
//       function(event)
//       {
//         if($(#fileStuff).val() == '') {
//           alert('No Image');
//           return false;
//         }
//         $.ajax({
//               url: "/getItems",
//               type: "GET",
//               data: {},
//               success: function(data){
//                     for(i=0;i<data.length,i++)
//                     {
//                       if(data[i].name == $('#name').val()){
//                         alert('Cant have two same names');
//                         return false;
//                       }
//
//                     }
//                       }
//                     },
//                     dataType: "json"
//                   });
//
//         $.post('/upload',{},successChange);
//       });
//   });
