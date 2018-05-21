require 'simplecov'
require 'coveralls'

SimpleCov.formatter = Coveralls::SimpleCov::Formatter
SimpleCov.start do
  add_filter 'app/channels/application_cable/channel.rb'
  add_filter 'app/channels/application_cable/connection.rb'
  add_filter 'app/jobs/application_job.rb'
  add_filter 'app/mailers/application_mailer.rb'
  add_filter 'config/initializers/wrap_parameters.rb'
  add_filter 'app/controllers/users/sessions_controller.rb'
  add_filter 'app/controllers/users/registrations_controller.rb'
  add_filter 'app/controllers/users/omniauth_callbacks_controller.rb'
  add_filter 'app/controllers/users/unlocks_controller.rb'
  add_filter 'app/controllers/users/confirmations_controller.rb'
  add_filter 'app/controllers/users/passwords_controller.rb'

  add_filter 'app/serializers/word_answers_serializer.rb'
  add_filter 'app/serializers/reddit_answers_serializer.rb'
  add_filter 'app/serializers/prompt_show_serializer.rb'
  add_filter 'app/serializers/answer_serializer.rb'
  add_filter 'app/serializers/reddit_show_serializer.rb'
  add_filter 'app/serializers/prompt_show_serializer.rb'
  add_filter 'app/serializers/photo_answer_serializer.rb'
end
