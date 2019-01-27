$(document).on('turbolinks:load', function(){
  function buildHTML(user){
    var html =
    `
    <div id="user-search-result">
      <div class="chat-group-user js-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <a class="chat-search-add  chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
      </div>
    </div>`;
    $('#user-search-result').append(html);
  };
  //Keyupされると、ユーザーネームと追加のリンクが表示される。
  function appendNoUser(error){
    var html =`
                <div class="chat-group-user clearfix">
                ${error}
                </div>`;
    $('#user-search-result').append(html);
  };
  // 検索してもそのユーザーがいない場合[一致するユーザーはいません。]と表示される
  function addUser(user_name,user_id){
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                 <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                 <p class='chat-group-user__name'> ${user_name} </p>
                 <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${user_id}" data-user-name="${user_name}">削除</a>
               </div>`
    $('#chat-group-users').append(html);
  };
  // ユーザーを追加後、削除できるようにする

  var form = $('#user-search-field');
  form.on('keyup', function(e){
    e.preventDefault();
    var input = form.val();
    if (input == ""){
      $("#user-search-result").empty();
    }
    else{
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users){
        $('#user-search-result').empty();
        if (users.length !== 0){
          users.forEach(function(user){
            buildHTML(user);
          });
        }
        else{
      	  appendNoUser('一致するユーザーはいません。')
        }
      })
      .fail (function (){
        alert('ユーザー検索に失敗しました。')
      });
    };
  });
  $('#user-search-result').on("click",".chat-group-user__btn--add", function(){
    var user_name = $(this).data('user-name')
    var user_id = $(this).data('user-id')
    addUser(user_name,user_id);
    $(this).parent().remove();
    form.empty();
  });
  $('#chat-group-users').on('click','.js-remove-btn', function(){
    $(this).parent().remove();
  });
});