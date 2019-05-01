
var reEnroll = function() {
  $("#exampleModal1").modal("show")
}

var resetMfa = function() {
  $.ajax({
    url:'http://localhost:3000/resetMfa',
    type:'post',
    success:function(){

    }
  });
}

var showActions = function(account) {
  var span = $(account).children()[0]
  var id = $(span).text()
  $('input[name=id]').val(id);
  $('#withdrawForm').submit(function(e){
    e.preventDefault();
    $.ajax({
      url:'http://localhost:3000/factorsTest',
      type:'post',
      success:function(){
        var formData = $('#withdrawForm').serialize()
        var span = $(account).children()[0]
        var id = $(span).text()
        var amountData = $('#withdrawForm').serialize()
        formData["id"] = id
        formData["Withdrawal"] = amountData
        console.log(formData)
        $('#mfaModal').modal('show');
        $('#modalForm').submit(function(e){
          e.preventDefault();
          $.ajax({
            url:'http://localhost:3000/factorsTest',
            type:'post',
            data:$('#modalForm, #withdrawForm').serialize(),
            success:function(){
              window.location.reload()
            }
          });
        });
      }
    });
  });

}



Vue.component('account-item', {
  props: {
    account: Object
  },
  template: "<div class='col-lg-4 col-sm-6'><div class='card'><div class='card-block block-1'><h3 class='card-title'>{{account.title}}<span>| {{account.balance}}</span></h3><button type='button' class='btn btn-danger ml-lg-5 w3ls-btn' onclick='showActions(this)' data-toggle='modal' aria-pressed='false' data-target='#testModal'>Do Actions <span style='display: none;'>{{account._id}}</span></button></div></div></div><br><br>"
})

new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    accounts: []
  }
  ,
  methods: {
    loadAccounts: function() {
      console.log("test")
      this.$http.get('https://okta-example-playground.appspot.com/account')
      .then(response => {
        this.accounts = response.body
        return response.body
      })
    }
  },
  beforeMount(){
    this.loadAccounts()
  }
});


Vue.component('factor-item', {
  props: {
    factor: Object
  },
  template: "<button type='button' class='btn btn-danger btn-lg btn-block'>{{factor.type}}</button>"
})

new Vue({
  el: '#factorsApp',
  data: {
    message: 'Hello Vue!',
    factors: []
  }
  ,
  methods: {
    loadFactors: function() {
      console.log("test")
      this.$http.get('http://localhost:3000/factors')
      .then(response => {
        this.factors = response.body
        $(".button-primary").css("background", "linear-gradient(red, #f00000)");
        return response.body
      })
    },
    postFactors: function() {
      console.log("test")
      this.$http.post('http://localhost:3000/factorsTest').then(response => {
        console.log(response.body)
      })
    }
  },
  beforeMount(){
    this.loadFactors()
    // this.postFactors()
    var signIn = new OktaSignIn({
      baseUrl: 'https://avb.oktapreview.com',
      i18n: {
        en: {
          // Labels
          'primaryauth.title': 'Renroll your MFA',
        }
      }
    });
    signIn.renderEl(
      // Assumes there is an empty element on the page with an id of 'osw-container'
      {el: '#okta'},
      function success(res) {
        console.log(res)
        window.location.reload()
      },
      function error(err) {
        console.log(err)
      }
    );

  }
});
