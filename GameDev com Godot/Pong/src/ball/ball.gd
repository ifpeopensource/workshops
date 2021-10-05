extends KinematicBody2D

var move: = Vector2()
var speed: = 500

func _ready():
	randomize()
	move = random_dir()

func _physics_process(delta):
	var collision = move_and_collide(move * speed * delta)
	
	if collision:
		if !collision.collider is KinematicBody2D:
			move = move.bounce(collision.normal)
			speed += 100
			$"Pong 1".play()
		else:
			move = collision.normal.rotated((randf()-0.5) * 1.13)
			speed = 500
			$"Pong 2".play()
	
	if position.x > 1280:
		get_parent().goal(true, position)
		position = Vector2(640, 360)
		move = random_dir()
	elif position.x < 0:
		get_parent().goal(false, position)
		position = Vector2(640, 360)
		move = random_dir()

func random_dir():
	var a = randi()%4
	var vec = Vector2(1,1)
	
	match a:
		1:
			vec = Vector2(-1,1)
		2:
			vec = Vector2(-1,-1)
		3:
			vec = Vector2(1,-1)
	
	return vec
