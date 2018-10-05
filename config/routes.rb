Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'site#index'
  get 'zcodes', to: 'zip_codes#show'
  get 'rosetest', to: 'rosetest#show'
  get 'overtest', to: 'overtest#show'
  get 'overtest/georev', to: 'overtest#georeverse'
  
end
