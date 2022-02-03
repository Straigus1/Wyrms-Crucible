class PlayersController < ApplicationController
    

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
    
      private
    
      def player_params
        params.permit(:username, :password, :password_confirmation)
      end
end
