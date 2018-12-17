$(document).on('turbolinks:load',function(){
console.log('発火確認！')
  var form = $('#user-search-field');
  function appendUser(user){
  	var html = `<li>
  	              <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                  </div>
                </li>`
    ('.chat-group-user__name').append(html);
  }
  function appendNoUser(user){
    var html =`>`
  }

  form.on('keyup', function(e){
  	e.preventDefault
    var input = form.val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(user){
      if (user.length !== 0){
      	user.forEach(function(user){
      	  appendUser(user);
      	  $('.chat-group-user__name').append(html);
      	});
      }
      else{
      	appendNoUser('一致するユーザーはいません。')
      }
    })
    .fail (function (){
      alert('ユーザー検索に失敗しました。')
    })
  });
});