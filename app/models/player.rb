class Player < ApplicationRecord
    validates :username, length: { minimum: 3}
    validates :email, uniqueness: true
    has_secure_password 
end
