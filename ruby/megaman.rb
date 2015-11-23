#!/usr/bin/env ruby

require "rubygems"
require "rubygame"

include Rubygame

@screen = Screen.open [640, 480]

class Megaman

	include Sprites::Sprite 

	def initialize
		super()

		@image = Surface.load "mega_man_stand_1.png"
    @image2 = Surface.load "mega_man_stand_2.png"
		@rect  = @image.make_rect
    @rect2 = @image2.make_rect

	end

  def update  seconds_passed

    # This example makes the objects orbit around the center of the screen.
    # The objects make one orbit every 4 seconds
    #@angle = ( @angle + 2*Math::PI / 4 * seconds_passed) % ( 2*Math::PI)

    #@rect.topleft = [ 320 + 100 * Math.sin(@angle),
     #                 240 - 100 * Math.cos(@angle)]

     @rect.topleft = [320,500]
     @rect2.topleft = [320,500]

  end

	def draw  on_surface
    	@image.blit  on_surface, @rect
      @image2.blit  on_surface,  @rect2
  end
end

@clock = Clock.new
@clock.target_framerate = 60

# Ask Clock.tick() to return ClockTicked objects instead of the number of
# milliseconds that have passed:
@clock.enable_tick_events

# Create a new group of sprites so that all sprites in the group may be updated
# or drawn with a single method invocation.
@sprites = Sprites::Group.new
Sprites::UpdateGroup.extend_object @sprites
43.times do @sprites << Megaman.new end

# Load a background image and copy it to the screen
@background = Surface.load "background.jpg"
@background.blit @screen, [ 0, 0]

@event_queue = EventQueue.new
@event_queue.enable_new_style_events

should_run = true
while should_run do

  seconds_passed = @clock.tick().seconds

  @event_queue.each do |event|
    case event
      when Events::QuitRequested, Events::KeyReleased
        should_run = false
    end
  end

  # "undraw" all of the sprites by drawing the background image at their
  # current location ( before their location has been changed by the animation)
  @sprites.undraw @screen, @background

  # Give all of the sprites an opportunity to move themselves to a new location
  @sprites.update  seconds_passed

  # Draw all of the sprites
  @sprites.draw @screen

  @screen.flip
end