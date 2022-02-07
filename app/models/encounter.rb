class Encounter < ApplicationRecord
  belongs_to :player
  belongs_to :checkpoint
end
