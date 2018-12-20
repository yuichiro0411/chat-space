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
//htmlを実装し、Keyupされると、ユーザーネームと追加のリンクが表示される。
//
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
    console.log(input);
    // var inputs = input.split(" ").filter(function(e) { return e; });
    // .filterで引数の関数条件に合致した要素では配列を作成。
    // filterに引き渡された関数の引数eに配列の要素がある。
    // eに要素が入っている場合、返り値はtrueになり配列に格納されるが、空文字の時はFalseとなるので配列に格納されない。
    // スペースキーで検索単語を区切れるようにする。

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
          console.log(user)
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