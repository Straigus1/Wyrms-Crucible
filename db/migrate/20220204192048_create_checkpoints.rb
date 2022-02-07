class CreateCheckpoints < ActiveRecord::Migration[7.0]
  def change
    create_table :checkpoints do |t|
      t.string :save_name
      t.string :ch_health
      t.string :ch_resources

      t.timestamps
    end
  end
end
