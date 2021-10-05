extends KinematicBody2D

var axis: = Vector2()
var move: = Vector2()
var speed: = 250

func _physics_process(delta):
	position.x = 25
	move = move_and_slide(axis * speed)

func _unhandled_input(event):
	axis = Vector2(0, Input.get_action_strength("down") - Input.get_action_strength("up"))
