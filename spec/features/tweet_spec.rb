require 'rails_helper'

feature 'tweet',type: :feature do
  let(:user) { create(:user) }

  scenario 'post tweet' do
  	visit root_path
  	# ルートへ移動
  	expect(page).to have_no_content('Send')
  	#have_no_contentで投稿するのボタンがないことを確認する。(ログインしていないので投稿できないはず)

  	# ログイン処理
    visit new_user_session_path
    fill_in 'user_email',with: user.email
    fill_in 'user_password', with: user.password
    find('input[name="commit"]').click
    expect(current_path).to eq root_path
    expect(page).to have_content('Send')

    #ツイート投稿
    expect{
      click_link('Send')
      expect(current_path).to eq new_tweet_path
      fill_in 'image', with: 'https://s.eximg.jp/expub/feed/Papimami/2016/Papimami_83279/papimami_83279_1.png'
      fill_in 'text', with: 'フィーチャースペックのテスト'
      find ('input[type="submit"]').click
    }.to change(Tweet, :count).by(1)
  end
end