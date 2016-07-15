print "Enter a statement or phrase with an 'S'!"

user_input = gets.chomp
user_input.downcase!

if user_input.include? "s"
    user_input.gsub!(/s/, "th")
elsif
    print "No 'S' was detected. Try again!"
else
    puts "You're pathetic"
end

puts "#{user_input}"
