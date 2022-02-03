puts "Deleting previous data"
Player.destroy_all
puts "🌱 Seeding data..."

# Sameple Player

straigus = Player.create!(
    {
        username: "Straigus",
        password: "12345",
        email: "kirylmitch@gmail.com",
        bio: "Avid gamer into RPGs",
        avatar_url: "https://i.pinimg.com/550x/75/a2/0d/75a20d8901eef869c9c96a49b08d1125.jpg"
    }
)