Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do

      resources :users, only: [:index, :show] do
        resources :prompts, only: [:index, :create]
        resources :answers, only: [:index]
      end

      resources :prompts, only: [:index, :show]  do
        resources :answers, only: [:create]
      end

      resources :answers, only: [:show]
    end
  end

  get "*path", to: 'static_pages#index'
end
