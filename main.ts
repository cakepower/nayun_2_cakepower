function cold () {
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    while (light2 == 2) {
        range1.showRainbow(0, 179)
        range2.showRainbow(180, 310)
    }
    basic.pause(100)
}
function off () {
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    basic.pause(100)
}
function warm () {
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    while (light2 == 1) {
        range1.showRainbow(0, 179)
    }
    basic.pause(100)
}
function orange () {
    strip.showColor(neopixel.colors(NeoPixelColors.Orange))
    basic.pause(100)
}
let mode = 0
let touch_sensor2 = 0
let touch_sensor1 = 0
let pressure_sensor = 0
let light2 = 0
let range2: neopixel.Strip = null
let range1: neopixel.Strip = null
let strip: neopixel.Strip = null
let light22 = 0
strip = neopixel.create(DigitalPin.P16, 16, NeoPixelMode.RGB)
range1 = strip.range(0, 8)
range2 = strip.range(8, 8)
strip.setBrightness(2)
range1.setBrightness(2)
range2.setBrightness(2)
basic.pause(100)
basic.forever(function () {
    pressure_sensor = pins.analogReadPin(AnalogPin.P3)
    serial.writeNumber(pressure_sensor)
    serial.writeNumber(touch_sensor1)
    serial.writeNumber(touch_sensor2)
    serial.writeLine("")
    if (mode == 0) {
        off()
    } else if (mode == 0 && (pressure_sensor > 400 && pressure_sensor < 600)) {
        orange()
        mode += 1
    } else if (mode == 1 && pressure_sensor < 600) {
        touch_sensor1 = pins.analogReadPin(AnalogPin.P4)
        touch_sensor2 = pins.analogReadPin(AnalogPin.P10)
        if (mode == 1 && touch_sensor1 > 180) {
            light2 = 1
            if (touch_sensor2 > 180) {
                light2 = 2
            }
            warm()
        } else {
            orange()
        }
        if (mode == 1 && touch_sensor2 > 180) {
            light2 = 2
            if (touch_sensor1 > 180) {
                light2 = 1
            }
            cold()
        }
    } else if (mode == 2 && pressure_sensor < 700) {
        off()
        mode = 0
        light2 = 0
    } else if (mode == 1 && pressure_sensor > 600) {
        off()
        mode += 1
        light2 = 0
    }
})
