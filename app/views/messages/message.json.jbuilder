json. @message do |message|
  json.content message.content
  json.image message.image
  json.group_id message.group_id
  json.user_id message.user_id
end