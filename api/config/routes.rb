Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :players, only: [:index]
      resources :enemies, only: [:index]
      resources :cards, only: [:index]
      root "tests#index"
    end
  end
end
