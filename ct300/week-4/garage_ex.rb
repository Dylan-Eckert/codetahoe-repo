class Ticket
  attr_accessor :timestamp

  def initialize
    @timestamp = Time.new
  end
end

class Vehicle
  attr_accessor :make, :model, :color,
    :width, :length, :height,
    :ticket,
    :type,
    :spot
end

class Spot
  attr_accessor :type, :level, :number
  attr_accessor :quantity
  attr_accessor :vehicle

  def initialize type, level, number
    @type = type
    @level = level
    @number = number
  end
end

class Garage
  @@number_of_garages = 0

  attr_accessor :spots, :vehicles, :available_spot_types

  def self.all_available_spot_types
    ["MotorCycle", "Car", "Truck", "Handicap"]
  end

  def self.number_of_garages
    @@number_of_garages
  end

  def initialize
    @@number_of_garages += 1
    @vehicles = []
  end

  def assign_spot vehicle
    for spot in @spots
      if spot.vehicle == nil && spot.type == vehicle.type
        spot.vehicle = vehicle
        spot.vehicle.spot = spot
        return
      end
    end
  end

  def on_vehicle_enter vehicle
    vehicle.ticket = Ticket.new
    @vehicles << vehicle
    assign_spot vehicle
  end

  def on_vehicle_exit vehicle
    @vehicles.delete vehicle
    vehicle.spot.vehicle = nil
  end
end


garage = Garage.new
garage.available_spot_types = Garage.all_available_spot_types[0, 2]

garage.spots = [
  Spot.new(garage.available_spot_types[0], 1, 100),
  Spot.new(garage.available_spot_types[1], 1, 101),
  Spot.new(garage.available_spot_types[0], 2, 200),
  Spot.new(garage.available_spot_types[1], 2, 201)
]

# New car came in
vehicle = Vehicle.new
vehicle.height = 60
vehicle.type = Garage.all_available_spot_types[1]

# Let's handle the vehicle
garage.on_vehicle_enter vehicle

# New car came in
lambo = Vehicle.new
lambo.height = 72
lambo.type = Garage.all_available_spot_types[1]

# Let's handle the vehicle
garage.on_vehicle_enter lambo

# New car came in
ferrari = Vehicle.new
ferrari.height = 48
ferrari.type = Garage.all_available_spot_types[1]

# Let's handle the vehicle
garage.on_vehicle_enter ferrari

#puts garage.vehicles[0].ticket.timestamp
p garage.spots[0].vehicle
p garage.spots[1].vehicle
p garage.spots[2].vehicle
p garage.spots[3].vehicle
# # -----------------------------MY CODE FOR THE GARAGE EXERCISE---------------------------------
#
# class Vehicle
#   attr_accessor :make, :color, :type
#
#   def initialize make, color, type
#     @make = make
#     @color = color
#     @type = type
#     puts "A new Vehicle has entered the garage."
#   end
# end
#
# # ------------------------------------------------------------------------------
#
# # full size cars can only use full size spots, compact cars can use full size and compact spots, motorcycles can use all spots
#
# # you can fit one motorcycle in a motorcycle spot, two motorcycles in a compact spot, and 3 motorcycles in a full size spot
# # (FOR THE SAKE OF TIME ONLY ONE MOTORCYCLE IN EACH SPOT REGARDLESS)
#
# # you can only fit one compact car in a compact spot or full size spot
#
# # you can only fit one full size car in a full size spot
#
# # ------------------------------------------------------------------------------
#
# # maximum capacity of 20 full size
# # maximum capacity of 30 compacts (10 compact-dedicated spots in total)
# # maximum capacity of 90 (40 FOR SAKE OF TIME) motorcycles (10 motorcycle-dedicated spots in total, 2 * 10 compact spots, 3 * 20 full size spots)
#
# vehicles = [
#   compacts_total = []
#   full_size_total = []
#   motorcycles_total = []
# ]
#
# # ------------------------------------------------------------------------------
#
# # both levels have 5 motorcycle spots, 5 compact spots, and 10 full size spots
#
# class Garage = [
#
#   level_1 = [
#     compact_spots = []
#     full_size_spots = []
#     motorcycle_spots = []
#   ]
#
#   level_2 = [
#     compact_spots = []
#     full_size_spots = []
#     motorcycle_spots = []
#   ]
# ]
#
# # ------------------------------------------------------------------------------
#
# vehicle_categorizer (the variable of this function that calls upon the new Vehicle created by the Vehicle class)
# {
# if Vehicle.type = 'full'
#   if full_size_total array in vehicles array < 20
#     if full_size_spots array in level_1 array in garage class < 10,
#       push to full_size_spots array in level_1 array in garage class and push to full_size_total array in vehicles array
#     else
#       push to full_size_spots array in level_2 array in garage class and push to full_size_total array in vehicles array
#     end
#
#   else puts "No spots are available for your vehicle!" and removes vehicle object from existence
#     end
#
# elsif Vehicle.type = 'compact'
#   if compacts_total array in vehicles array < 10,
#     if compact_spots array in level_1 array in garage class < 5,
#       push to compact_spots array in level_1 array in garage class and push to compacts_total array in vehicles array
#     else
#       push to compact_spots array in level_2 array in garage class and push to compacts_total array in vehicles array
#     end
#
#   elsif full_size_total array in vehicles array < 20,
#     if full_size_spots array in level_1 array in garage class < 10,
#       push to full_size_spots array in level_1 array in garage class and push to compacts_total array in vehicles array
#     else
#       push to full_size_spots array in level_2 array in garage class and push to compacts_total array in vehicles array
#     end
#
#   else puts "No spots are available for your vehicle!" and removes vehicle object from existence
#   end
#
# else
#   if motorcycles_total array in vehicles array < 10,
#     if motorcycle_spots array in level_1 array in garage class < 5,
#       push to motorcycle_spots array in level_1 array in garage class and motorcycles_total array in vehicles array
#     else
#       push to motorcycle_spots array in level_2 array in garage class and motorcycles_total array in vehicles array
#     end
#
#   elsif compacts_total array in vehicles array < 10,
#     if compact_spots array in level_1 array in garage array < 5,
#       push to compact_spots array in level_1 array in garage class and push to motorcycles_total array in vehicles array
#     else
#       push to compact_spots array in level_2 array in garage class and push to motorcycles_total array in vehicles array
#     end
#
#   elsif full_size_total array in vehicles array < 20,
#     if full_size_spots array in level_1 array in garage class < 10,
#       push to full_size_spots array in level_1 array in garage class and push to motorcycles_total array in vehicles array
#     else
#       push to full_size_spots array in level_2 array in garage class and push to motorcycles_total array in vehicles array
#     end
#
#   else puts "No spots are available for your vehicle!" and removes vehicle object from existence
#   end
#
# end
# }
# # ------------------------------------CAR PLACER PSEUDO CODE------------------------------------------
# # vehicle_categorizer (the variable of this function that calls upon the new Vehicle created by the Vehicle class)
# # {
# # if Vehicle.type = 'full'
# #   if full_size_total array in vehicles array < 20
# #     if full_size_spots array in level_1 array in garage array < 10,
# #       push to full_size_spots array in level_1 array in garage array and push to full_size_total array in vehicles array
# #     else
# #       push to full_size_spots array in level_2 array in garage array and push to full_size_total array in vehicles array
# #     end
# #
# #   else puts "No spots are available for your vehicle!" and removes vehicle object from existence
# #     end
# #
# # elsif Vehicle.type = 'compact'
# #   if compacts_total array in vehicles array < 10,
# #     if compact_spots array in level_1 array in garage array < 5,
# #       push to compact_spots array in level_1 array in garage array and push to compacts_total array in vehicles array
# #     else
# #       push to compact_spots array in level_2 array in garage array and push to compacts_total array in vehicles array
# #     end
# #
# #   elsif full_size_total array in vehicles array < 20,
# #     if full_size_spots array in level_1 array in garage array < 10,
# #       push to full_size_spots array in level_1 array in garage array and push to compacts_total array in vehicles array
# #     else
# #       push to full_size_spots array in level_2 array in garage array and push to compacts_total array in vehicles array
# #     end
# #
# #   else puts "No spots are available for your vehicle!" and removes vehicle object from existence
# #   end
# #
# # else
# #   if motorcycles_total array in vehicles array < 10,
# #     if motorcycle_spots array in level_1 array in garage array < 5,
# #       push to motorcycle_spots array in level_1 array in garage array and motorcycles_total array in vehicles array
# #     else
# #       push to motorcycle_spots array in level_2 array in garage array and motorcycles_total array in vehicles array
# #     end
# #
# #   elsif compacts_total array in vehicles array < 10,
# #     if compact_spots array in level_1 array in garage array < 5,
# #       push to compact_spots array in level_1 array in garage array and push to motorcycles_total array in vehicles array
# #     else
# #       push to compact_spots array in level_2 array in garage array and push to motorcycles_total array in vehicles array
# #     end
# #
# #   elsif full_size_total array in vehicles array < 20,
# #     if full_size_spots array in level_1 array in garage array < 10,
# #       push to full_size_spots array in level_1 array in garage array and push to motorcycles_total array in vehicles array
# #     else
# #       push to full_size_spots array in level_2 array in garage array and push to motorcycles_total array in vehicles array
# #     end
# #
# #   else puts "No spots are available for your vehicle!" and removes vehicle object from existence
# #   end
# #
# # end
# # }
