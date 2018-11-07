require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
   config.generators do |g|
      g.stylesheets false
      g.javascripts false
      g.halper false
      g.test_flamework false

   end
  end
end

