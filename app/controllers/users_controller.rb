class UsersController < ApplicationController
	def edit
	end

	def update #保存できた場合、できない場合で条件分岐
		if current_user.update(user_params)
			redirect_to root_path
		else
			render :edit
		end
	end

	private

	def user_params
		params.require(:user).permit(:name. :email)
	end
end
