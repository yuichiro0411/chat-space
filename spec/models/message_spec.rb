require 'rails_helper'
RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do #メッセージを保存できる場合
      it 'is valid with content' do #メッセージがあれば保存
        expect(build(:message, image: nil)).to be_valid #文章有画像なし
      end

      it 'is vaild with image' do #文章なし画像あり
        expect(build(:message, content: nil)).to be_valid
      end

      it 'is valid with content and image' do #文章も画像もあり
    	expect(build(:message)).to be_valid #定義されたものをそのまま用いるので上書きの必要なし
      end
    end

    context 'can not save' do #セーブできない場合
      it 'is invalid without content and image' do #文章も画像もない場合
        message = build(:message, content: nil, image: nil)
        message.valid? #保存できていないかチェックするためvalid?を用いる。
        expect(message.errors[:content]).to include('を入力してください')
        #valid?を用いたインスタンスに対してerrorsメソッドでなぜ保存できないのかを確認
      end

      it 'is invalid without group_id' do #group_idが無い場合
      	message = build(:message, group_id: nil)
      	message.valid?
      	expect(message.errors[:group]).to include('を入力してください')
      end

      it 'is invalid without user_id' do #user_idがない場合
      	message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include ('を入力してください')
      end
    end
  end
end

#contextで特定の条件に条件分岐
#buildメソッドはカラム名:値でfactoryで定義した値を上書きすることができるのでfactoriesにて定義した条件を変化させている。