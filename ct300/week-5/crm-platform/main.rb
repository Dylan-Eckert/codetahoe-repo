require 'pp'
require './lib/crman'

company_1 = Crman::Company.new
company_1.name = "The League"

Crman.companies.push(company_1)

account_1 = Crman::Account.new
account_1.name = "Taco Corp"
account_1.market = "Pee Bibs"
account_1.company = company_1

  company_1.accounts = []

company_1.accounts.push(account_1)

Crman.accounts.push(account_1)

agent_1 = Crman::Agent.new
agent_1.first_name = "Pete"
agent_1.last_name = "Ekhart"
agent_1.specialization = "Pee Bib Marketing, Fantasy Football"
agent_1.account = account_1

  account_1.agents = []

account_1.agents.push(agent_1)

Crman.agents.push(agent_1)

contact_1 = Crman::Contact.new
contact_1.first_name = "Taco"
contact_1.last_name = "N/A"
contact_1.title = "CEO"
contact_1.email = "taco@tacocorp.com"
contact_1.agent = agent_1

agent_1.contacts = []

agent_1.contacts.push(contact_1)

Crman.contacts.push(contact_1)

contact_2 = Crman::Contact.new
contact_2.first_name = "Ruxin"
contact_2.last_name = "N/A"
contact_2.title = "Taco's 'Lawyer'"
contact_2.email = "ruxin@tacocorp.com"
contact_2.agent = agent_1

agent_1.contacts.push(contact_2)

Crman.contacts.push(contact_2)

puts "Number of Companies = "
pp Crman.companies.count

puts "All Company Names = "
pp Crman.companies.map{ |u| u.name}

puts "Number of Accounts = "
pp Crman.accounts.count

puts "All Account Names = "
pp Crman.accounts.map{ |i| i.name}

puts "Number of Agents = "
pp Crman.agents.count

puts "All Agent Info = "
pp Crman.agents.map{ |e| e.first_name + ' ' + e.last_name + ', ' + e.specialization }

puts "Number of Contacts = "
pp Crman.contacts.count

puts "All Contact Names = "
pp Crman.contacts.map{ |r| r.first_name + ' ' + r.last_name + ' ' + r.title + ' ' + r.email }
