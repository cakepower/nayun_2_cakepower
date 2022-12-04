def cold():
    strip.show_color(neopixel.colors(NeoPixelColors.BLACK))
    while light2 == 2:
        range1.show_rainbow(0, 179)
        range2.show_rainbow(180, 310)
    basic.pause(100)
def off():
    strip.show_color(neopixel.colors(NeoPixelColors.BLACK))
    basic.pause(100)
def warm():
    strip.show_color(neopixel.colors(NeoPixelColors.BLACK))
    while light2 == 1:
        range1.show_rainbow(0, 179)
        if light2 == 2:
            break
    basic.pause(100)
def orange():
    strip.show_color(neopixel.colors(NeoPixelColors.ORANGE))
    basic.pause(100)
mode = 0
touch_sensor2 = 0
touch_sensor1 = 0
pressure_sensor = 0
range2: neopixel.Strip = None
range1: neopixel.Strip = None
strip: neopixel.Strip = None
light2 = 0
light22 = 0

strip = neopixel.create(DigitalPin.P16, 16, NeoPixelMode.RGB)
range1 = strip.range(0, 8)
range2 = strip.range(8, 8)
strip.set_brightness(2)
range1.set_brightness(2)
range2.set_brightness(2)
basic.pause(100)

def on_forever():
    global pressure_sensor, mode, touch_sensor1, touch_sensor2, light2
    pressure_sensor = pins.analog_read_pin(AnalogPin.P3)
    serial.write_number(pressure_sensor)
    serial.write_number(touch_sensor1)
    serial.write_number(touch_sensor2)
    serial.write_line("")
    if mode == 0:
        off()
    elif mode == 0 and (pressure_sensor > 400 and pressure_sensor < 600):
        orange()
        mode += 1
    elif mode == 1 and pressure_sensor < 600:
        touch_sensor1 = pins.analog_read_pin(AnalogPin.P4)
        touch_sensor2 = pins.analog_read_pin(AnalogPin.P10)
        if mode == 1 and touch_sensor1 > 180:
            warm()
            light2 = 1
        else:
            orange()
        if mode == 1 and touch_sensor2 > 180:
            cold()
            light2 = 2
    elif mode == 2 and pressure_sensor < 700:
        off()
        mode = 0
        light2 = 0
    elif mode == 1 and pressure_sensor > 600:
        off()
        mode += 1
        light2 = 0
basic.forever(on_forever)
