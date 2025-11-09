class Robot {

  constructor(name, leg) {
    
    this.name = name
    this.leg = leg

    this.hi()
  }

  hi() {
    console.log(`${this.name} said hi`)
  }
}

class FlyAbility extends Robot {

  constructor(name, leg){
    super(name, leg)
    
  }

  hi() {
    console.log(`${this.name} can now fly, kneel before me!`)
  }

  takeoff() {
    console.log(`${this.name} takes off!`)
  }

  land() {
    console.log(`${this.name} is landing...`)
  }
}

const wallE = new Robot('wall-E', 0)
const astroboy = new FlyAbility('astro boy', 2)
const ultron = new FlyAbility('ultron', 2)

ultron.takeoff()