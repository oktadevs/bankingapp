var showActions = function(account) {
  var span = $(account).children()[0]
  var id = $(span).text()
  $('input[name=id]').val(id);
  $('#myForm').submit(function(e){
    e.preventDefault();
    $.ajax({
      url:'http://localhost:3000/factorsTest',
      type:'post',
      success:function(){
        var formData = $('#modalForm').serialize()
        var span = $(account).children()[0]
        var id = $(span).text()
        var amountData = $('#myForm').serialize()
        formData["id"] = id
        formData["Withdrawal"] = amountData
        console.log(formData)
        $('#mfaModal').modal('show');
        $('#modalForm').submit(function(e){
          e.preventDefault();
          $.ajax({
            url:'http://localhost:3000/factorsTest',
            type:'post',
            data:$('#modalForm, #myForm').serialize(),
            success:function(){
              //whatever you wanna do after the form is successfully submitted
            }
          });
        });
      }
    });
  });

}
