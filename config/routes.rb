Rails.application.routes.draw do
  # Defines the root path route ("/")

  # Player CRUD actions
  resources :players

  # Member login
  post "/login", to: "sessions#create"

  # Member logout
  delete "/logout", to: "sessions#destroy"

  # Current logged in member
  get "/me", to: "players#currentplayer"

  # Fallback
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
