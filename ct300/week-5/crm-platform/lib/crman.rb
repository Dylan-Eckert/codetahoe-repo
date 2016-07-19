require './lib/crman/company'
require './lib/crman/account'
require './lib/crman/agent'
require './lib/crman/contact'


module Crman
  @companies = []
  @accounts = []
  @agents = []
  @contacts = []

  def self.companies
    @companies
  end
  def self.accounts
    @accounts
  end
  def self.agents
    @agents
  end
  def self.contacts
    @contacts
  end

end
