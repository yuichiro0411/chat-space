require 'rails_helper'

describe MessagesController do
  let(:group) {create(:group)} #テストで使用するインスタンス。
  let(:user) {create(:user)}
#let
  describe '#index' do #メッセージ一覧を表示するアクション
    context 'log in' do #ログインしている場合
      before do #各テストが実行される前に毎回実行される共通の処理。
        login user #controller_macrosにて定義したメソッドを利用。
        get :index, params: { group_id: group.id}
        #ログインしindexのリクエストを行う。
      end

      it 'assigns @message' do #アクション内で定義しているインスタンス変数があるかどうかを確かめる。
      	expect(assigns(:message)).to be_a_new(Message)
      	#be_a_newでassigns(message) がMessageクラスのインスタンスかつみ保存かどうかを確かめる。

      end

      it 'assigns @group' do #定義しているインスタンス変数があるかどうかを確かめる。
      	expect(assigns(:group)).to eq group #eqマッチャでassigns(:group)＝groupであるかを確かめる。
      end

      it 'renders index' do
        expect(response).to render_template :index #ここでのresponseはリクエスト後の遷移先のビュー情報のインスタンス
        #render_templateマッチャは引数のアクションのリクエスト時に自動的に遷移するビューを返す。
       #example後に遷移するビューがindexアクションのビューと同じであるかを確かめる。
      end
    end

    context 'lnot log in' do #ログインしていない場合
      before do
      	get :index, params: {group_id: group.id}
      end

      it 'redirects to new_user_session_path' do #ログインしていない場合に定義されたリダイレクトがしっかり行われるか。
      	expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do #メッセージを作成するアクション
  	let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message)} }
  	#attributes_for (:message)でオブジェクトを生成せずにハッシュを精製する

    context 'log in' do #ログインしている場合
      before do
        login user
      end

      context 'can save' do #ログインし、かつ、メッセージの保存に成功した場合。(log inのcontextにネスト)
      	subject{
      	  post :create,
      	  params: params
      	} #expectの引数が長くなるので、別途定義を行い簡略化させている。
      	it 'count up message' do #messageが保存できているか
          expect{ subject }.to change(Message, :count).by(1) #引数の変化を確かめるためにchangeマッチャを使用。
          # =>Postメソッドのcreateアクションテストによく使われる。
          #Messageモデルないのレコードが1つ増えたことを確かめる。
        end

        it 'redirects to group_messages_path' do #メッセージ保存後のリダイレクトのテスト
      	  subject
      	  expect(response).to redirect_to(group_messages_path(group))
        end
      end
      context 'can not save' do #ログインし、かつ、メッセージの保存ができなかった場合。
      let(:invalid_params){ { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }
#invalid_paramsとして文章も画像もない状態を定義して、ポストアクションをリクエスト。=>意図的にメッセージの保存をし失敗させる。
      subject {
      	post :create,
      	params: invalid_params
      }

        it 'does not count up' do
      	expect{ subject }.not_to change(Message, :count) #not_toで~でないことを期待する記述に。changeしないことを期待する。
        end
        it 'renders index' do
      	subject
      	expect(response).to render_template :index
        end
      end
    end
    context 'not log in' do #ログインしていない場合

      it 'redirects to new_user_session_path' do
      post :create, params: params #ログインしない状態でCreateアクションをリクエストしてリダイレクトするかを確かめる。
      expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
