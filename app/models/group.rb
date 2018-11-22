class Group < ApplicationRecord
	has_many :group_users
	has_many :users, through: :group_users
	has_many :messages
	validates :name, presence: true

	def show_last_message
	  if (last_message = message.last).present?
	  	last_message.content_? ? last_message.content : '画像が投稿されています'
	  else
	  	'まだメッセージはありません'
	  end
	end
end

#イドバーのグループ部分に、最新のメッセージを表示できるようにしましょう。

#最新のメッセージについて、文章が投稿されている場合、
#画像が投稿されている場合、まだ投稿がされていない場合が考えられます。
#かといって、ビュー部分にif、while、caseなどを用いて条件分岐を書いてしまうと、ビューのコードが複雑になってしまい、読みづらくなってしまいます。
#このような場合には、モデルにインスタンスメソッドを定義することで、ビューの記述をシンプルにすることができます。
#今回はapp/models/group.rbにインスタンスメソッドを定義してみましょう。
#if (last_message = messages.last).present?」と記述することで、最新のメッセージを変数last_messageに代入しつつ、メッセージが投稿されているかどうかで場合分けを行なっています。

#メッセージが投稿されている場合の内部で、さらに文章が投稿されている場合、画像が投稿されている場合で処理を分けています。
#９行目の記述は三項演算子と呼ばれるもので、下記のような文法を取ります。
#条件式 ? trueの時の値 : falseの時の値