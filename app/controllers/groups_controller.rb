class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def index
  end

  def new #新規グループを作成する
    @group = Group.new #Groupモデルの新しいインスタンスを定義
    @group.users << current_user #現在のユーザーをグループに保存
  end
  def create
    @group = Group.new(group_params)
    if @group.save #グループ作成の可否で条件分岐
      redirect_to root_path, notice: 'グループを作成しました。'
    else
      render :new
    end
  end
#redirect_toがHTTPリクエストを送り、そのレスポンスとして返ってくるビューを表示するのに対し、renderはHTTPリクエストを送らず、該当するビューだけを表示.
  def update
    if @group.update(group_params)
        redirect_to group_messages_path(@group), notice: 'グループを編集しました。'
    else
      render :edit
    end
  end

private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end

  def set_group
    @group = Group.find(params[:id])
  end

end