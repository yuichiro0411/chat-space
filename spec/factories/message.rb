FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/apple-touch-icon.png")
    user
    group
  end
end
