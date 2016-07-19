module Crman
  class Agent
    attr_accessor :first_name, :last_name, :specialization,
    :contacts,
    :account
    def initialize
      @contacts = []
    end
  end
end
