extends Camera2D

var s_time: float
var intensity: float

func _ready():
	set_process(false)

func _process(delta):
	s_time -= delta
	
	offset = Vector2(sin(rad2deg(s_time)), cos(rad2deg(s_time))) * intensity 
	
	if s_time <= 0:
		offset = Vector2.ZERO
		set_process(false)

func _shake(s: float = 0.5, i: float = 10):
	s_time = s
	intensity = i
	set_process(true)
