# -- tic tac toe game --
# -- board --
class Board
  def initialize
    @board_array = [
      '1','2','3','4','5','6','7','8','9'
    ]
  end
    def print_board
      i = 1
      for values in @board_array
        print " #{values} "
        if i % 3 == 0
          puts
          if i != 9
            puts "-----------"
          end
        else
          print "|"
        end
        i += 1
      end
    end
    # whatever the number the user inputs, replace that number on the board with an X visually
    def place_move(index, symbol)
      @board_array[index - 1] = symbol
    end
end
# -- user inputs --
# X or O

# -- get this shit on a board --
class Players
  # * set X to start and ask for a spot on the board 1-9 (0-8 in code lingo)
  attr_accessor :symbol
  def initialize(symbol)
    @symbol = symbol
  end

# whatever the number the user inputs, replace that number on the board with an X visually
  def select_place
    puts "Select a spot from 1-9 for your Marker"
    move = gets.chomp.to_i
    return move
  end

end

board = Board.new
board.print_board

playerX = Players.new('X')
new_move = playerX.select_place
# whatever the number the user inputs, replace that number on the board with an X visually
board.place_move(new_move, playerX.symbol)
board.print_board

playerO = Players.new('O')
new_move = playerO.select_place
# whatever the number the user inputs, replace that number on the board with an X visually
board.place_move(new_move, playerO.symbol)
board.print_board


#     * if a certain group of numbers (winning matches) all have the value of X, execute the match game win
#       * same shit just with O
#       * always alternate between the two for even placement

# -- match this motherfucker --
#   * winning matches:
#   123, 456, 789, 147, 258, 369, 159, 357

#   if the X user has X placed on any of these number combos
#     * theoretically, if the X or O has these numbers, there is no way that a false match could occur because the 3 pair number groups are not identical ever so they have to be in a row in order to be true matches
#     * match game, win this bitch
#       print a "X FUCKING WON" and allow for the user input of reset which will run the initialization of the the game and effectively reset the game
#     if the O user has O placed on any of these number combos
#       * theoretically, if the X or O has these numbers, there is no way that a false match could occur because the 3 pair number groups are not identical ever so         they have to be in a row in order to be true matches
#       * match game, win this bitch
#         print a "O FUCKING WON" and allow for the user input of reset which will run the initialization of the the game and effectively reset the game
#       if the O user and the X user contain the total number of slots (fill up the board), and no pair matches can be made for X or O
#         * no match game, kill this bitch
#           print a "YOU BOTH FUCKING LOSE" and allow for the user input of reset which will run the initialization of the the game and effectively reset the game
























# -- tic tac toe game --
# -- board --
# "1 | 2 | 3",
# "---------",
# "4 | 5 | 6",
# "---------",
# "7 | 8 | 9"
#
# -- user inputs --
# X or O
#
# -- get this shit on a board --
#   * set X to start and ask for a spot on the board 1-9 (0-8 in code lingo)
#   * whatever the number the user inputs, replace that number on the board with an X visually
#
#   -- assign this shit a value --
#     * whatever number that X replaces visually, give that number a value of X in the code
#     * if a certain group of numbers (winning matches) all have the value of X, execute the match game win
#       * same shit just with O
#       * always alternate between the two for even placement
#
# -- match this motherfucker --
#   * winning matches:
#   123, 456, 789, 147, 258, 369, 159, 357
#
#   if the X user has X placed on any of these number combos
#     * theoretically, if the X or O has these numbers, there is no way that a false match could occur because the 3 pair number groups are not identical ever so they have to be in a row in order to be true matches
#     * match game, win this bitch
#       print a "X FUCKING WON" and allow for the user input of reset which will run the initialization of the the game and effectively reset the game
#     if the O user has O placed on any of these number combos
#       * theoretically, if the X or O has these numbers, there is no way that a false match could occur because the 3 pair number groups are not identical ever so         they have to be in a row in order to be true matches
#       * match game, win this bitch
#         print a "O FUCKING WON" and allow for the user input of reset which will run the initialization of the the game and effectively reset the game
#       if the O user and the X user contain the total number of slots (fill up the board), and no pair matches can be made for X or O
#         * no match game, kill this bitch
#           print a "YOU BOTH FUCKING LOSE" and allow for the user input of reset which will run the initialization of the the game and effectively reset the game
