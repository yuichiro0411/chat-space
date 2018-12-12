$(document).on('turbolinks:load', function(){
  function buildHTML(data){

  	var html = `<div class= 'message'>
  	              <div class= 'upper-message'>
  	                <div class= 'upper-message__user-name'>
  	                  ${data.name}
  	                </div>
  	                <div class='upper-message__date'>
  	                  ${data.created_at}
  	                </div>
  	              </div>
                  <div class= 'lower-message'>
                    <p class= 'lower-message__content'>
                      ${data.content}
                    </p>
                    <image= src='/message.image.url' class='lower-message__image' if message.image.present?>
                  </div>
                </div>`;
  	return html;
  }

  $('#form').on('submit', function(e){
  	e.preventDefault();
    var formData = new FormData(this);
  	console.log(this)
  	var url = $(this).attr('action')
    // var message = $('#form').val('');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      processData: false,
      contentType: false,
      dataType:'json'
    })
    .done(function(data){
      // console.log(data)
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.footer__form-area-message').val('')

      // console.log('送信完了！');
      // $('セレクタ').append('追加したいもの')で、操作された時に後から文章などを追加表示できる。
      // 今回はhtml、つまりbuildHTMLされたものが後から追加される。
      // $('messages').animate(scrollBottom(0));
      function scrollTobottom(){
        var height = $('.right-content__chat-mainspace')[0].scrollHeight;
        var bottom = $('.right-content__chat-mainspace');
        bottom.animate({scrollTop: height},'fast','swing');
      };
      scrollTobottom();
    })
    .fail(function(){
      alert("OMG!!error!! Couldn't post");
    });
    return false;
  });
});