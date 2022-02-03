class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :email, :bio, :avatar_url
end
