Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do

      resources :users, only: [:index, :show] do
        resources :prompts, only: [:index, :create]
        resources :submissions, only: [:index, :show, :create]
      end

      resources :prompts, only: [:show]  do
        resources :submissions, only: [:index, :show, :create]
      end
    end
  end
end
