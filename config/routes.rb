Rails.application.routes.draw do

  devise_for :users
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create] #indexアクションで一覧を表示
    end
end
#グループ機能では新規作成と編集機能がある。新規投稿画面を表示する：new,編集画面を表示する;edit
#