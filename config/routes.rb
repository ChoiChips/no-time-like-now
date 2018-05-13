Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get '/prompts/random', to: 'prompts#random'

      resources :users, only: [:index, :show] do
        resources :prompts, only: [:index]
        resources :answers, only: [:index]
      end

      resources :prompts, only: [:index, :create, :show, :random]  do
        resources :answers, only: [:create]
      end

      resources :answers, only: [:show]

      resources :reddits
    end
  end

  get "*path", to: 'static_pages#index'
end
