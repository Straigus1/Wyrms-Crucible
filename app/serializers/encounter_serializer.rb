class EncounterSerializer < ActiveModel::Serializer
  attributes :id, :encounter_name, :enemies, :dialogue
  has_one :player
  has_one :checkpoint
end
