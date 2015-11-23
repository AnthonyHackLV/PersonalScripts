#!/usr/bin/ruby

require 'CSV'

filename = "/Users/hack/personalscripts/ruby/column1.txt"
sum = 0
numbers = Array.new

CSV.foreach(filename, converters: :numeric) do |row|
	sum << row.inject(:+)
	puts "#{sum}"
end


#File.foreach(filename).with_index { |line| 
#	sum = numbers[line.to_i].sum
#	puts " #{sum} "
#}

#File.open(filename, 'r').each_line do |line|
#	sum = numbers[line.to_i].sum
#	puts "#{sum}"
#end