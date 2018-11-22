class MessagesController < ApplicationController
before_action :set_group

def index
	@message =  Message.new #Messageモデルの新しいインスタンス作成
	@messages = @group.messages.includes(:user)
	# グループに所属するすべてのメッセージを定義。n＋1問題を避けるために
end

def create
	@message = @group.messages.new(message_params)
	if  @message.save
		redirect_to group_messages_path(@group), notice:'メッセージをが送信されました。'
		#保存に成功した場合、メッセージを出してチャットページに移動。
	else
		@messages = @group.messages.incldes(:user)
		flash.now[:alert] = 'メッセージを入力してください'
	    render :index
#保存できなかった場合
	end
end

private

def message_params
	params.require(:massage).permit(:content, :image).merge(user_id: current_user.id)
end

def set_group
	@group = Group.find(params[:group_id])
end

end