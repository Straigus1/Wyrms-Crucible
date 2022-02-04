class PlayersController < ApplicationController
    
    def index
        players = Player.all
        render json: players
    end

    def show
        player = find_player
        render json: player
    end

    def currentplayer
        player = Player.find_by(id: session[:player_id])
        if player
            render json: player
        else
            render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def create
        player = Player.create(player_params)
        if player.valid?
          render json: player, status: :created
        else
          render json: { errors: player.errors.full_messages }, status: :unprocessable_entity
        end
      end

    def update
        player = find_player
        player.update!(player_params)
        render json: player
    end

    def destroy
        player = find_player
        player.destroy
        head :no_content
    end

    private
    def find_player
        player.find(params[:id])
    end

    def player_params
        params.permit(:first_name, :last_name, :username, :email, :password, :bio, :avatar_url)
    end
    
    
    def player_params
      params.permit(:username, :password, :password_confirmation)
    end
end
