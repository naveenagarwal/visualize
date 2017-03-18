Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :dummy, only: [:index]
      resources :sankey, only: [:index]
      resources :scatter, only: [:index]
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
