$(function(){
	function buildHTML(data){

	}
  var formData = new FormData(form);

  $('footer__form-area').submit(function(e){
  	e.preventDefault();
    $.ajax()
      type: 'POST',
      url: '/groups/:group_id/messages',
      data: formData,
      processData: false,
      contentType: false
    .done(function(data){
      var html = buildHTML(data)
      $('.message').append(html)
      // $('セレクタ').append('追加したいもの')で、操作された時に後から文章などを追加表示できる。
      // 今回はhtml、つまりbuildHTMLされたものが後から追加される。
      // $('.right-content').animate({scrollTop})
      $('.right-content').animate({scrollTop: $('.right-content')},'fast');
      })
     .fail(function(data){
        alert("OMG!!error!! Couldn't post");
      });
  });
});