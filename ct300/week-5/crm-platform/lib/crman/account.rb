module Crman
  class Account
    attr_accessor :name,
    :market,
    :agents,
    :company
    def initialize
      @agents = []
    end
  end

end
