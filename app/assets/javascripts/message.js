$(document).on('turbolinks:load', function(){
function buildHTML(data) {
    if( data.image.url == null ){
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
                    </div>
                  </div>`
    }
    else {
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
                      <img src= ${data.image.url} class='lower-message__image'>
                    </div>
                  </div>`
    }
    return html;
  };
  $('#form').on('submit',function(e){
  	e.preventDefault();
    var formData = new FormData(this);
  	var url = window.location.pathname;
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      processData: false,
      contentType: false,
      dataType: 'json'
    })
    // 非同期通信OK
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.footer__form-area-message','hidden').val('');
      $('hidden').val('')
      // Submitで一番下までスクロール
      $('.right-content__chat-mainspace').animate({scrollTop: $('.right-content__chat-mainspace')[0].scrollHeight}, 'fast');
    })
    // 非同期通信不可時
    .fail(function(){
      alert("OMG!!error!! Couldn't post")
    });
    return false;
  });
});