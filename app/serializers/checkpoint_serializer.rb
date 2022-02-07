class CheckpointSerializer < ActiveModel::Serializer
  attributes :id, :save_name, :ch_health, :ch_resources
end
