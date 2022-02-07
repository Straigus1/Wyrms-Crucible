class CreateEncounters < ActiveRecord::Migration[7.0]
  def change
    create_table :encounters do |t|
      t.string :encounter_name
      t.string :enemies
      t.string :dialogue
      t.references :player, null: false, foreign_key: true
      t.references :checkpoint, null: false, foreign_key: true

      t.timestamps
    end
  end
end
