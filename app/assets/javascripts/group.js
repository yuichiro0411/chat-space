$(document).on('turbolinks:load', function(){
  function buildHTML(user){
    var html = `<li>
  	              <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">
                      ${user.name}
                    </p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= ${user.id}, data-user-name= ${user.name} >
                      追加
                    </a>
                  </div>
                </li>`;
    $('#user-search-result').append(html);
  };
//Keyupされると、ユーザーネームと追加のリンクが表示される。
  function appendNoUser(user){
    var html =`<li>
                <div class="chat-group-user clearfix">
                ${user.name}
                </div>
              </li>`
  };
  var form = $('#user-search-field');
  form.on('keyup', function(e){
  	e.preventDefault();
    var input = form.val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (input.length !== 0){
        users.forEach(function(user){
          buildHTML(user);
        })
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