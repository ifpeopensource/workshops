extends KinematicBody2D

onready var ball = get_parent().get_node("ball")

var move: Vector2
var max_speed = 250
var dir: int

func _physics_process(delta):
	position.x = 1255
	
	if ball.position.y > position.y:
		dir = 1
	else:
		dir = -1
	
	move.y = move_toward(move.y, dir * max_speed, delta * 200)
	move = move_and_slide(Vector2(0, move.y))
