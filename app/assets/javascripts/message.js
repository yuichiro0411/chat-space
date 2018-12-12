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
                    <image= src='/message.image.url' class='lower-message__image'>
                  </div>
                </div>`;
  	return html;
  }

  $('#form').on('submit', function(e){
  	e.preventDefault();
    var formData = new FormData(this);
  	var url = $(this).attr('action')
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      processData: false,
      contentType: false,
      dataType:'json'
    })
    // 非同期通信OK
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.footer__form-area-message').val('')
      function scrollTobottom(){
        var height = $('.right-content__chat-mainspace')[0].scrollHeight;
        var bottom = $('.right-content__chat-mainspace');
        bottom.animate({scrollTop: height},'fast','swing');
      };
      scrollTobottom();
    })
    // 非同期通信不可時
    .fail(function(){
      alert("OMG!!error!! Couldn't post");
    });
    return false;
  });
});