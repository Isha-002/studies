import gsap from 'gsap';



let planetData: any[] | null = null;
let fetchError: Error | null = null;



async function fetchPlanets() {
  return fetch("/data/planets.json")
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to load JSON");
      }
      return res.json();
    })
    .then(planets => {
      planetData = planets.solar_system.celestial_bodies;
      console.log(planetData)
      return planetData;
    })
    .catch(err => {
      fetchError = err;
      console.log(err);
      throw err;
    });
}

export async function planetDesc(order: number, persian: boolean) {
  
  if (!planetData) {
    await fetchPlanets();
  }

  if (fetchError) {
    console.log("Fetch error:", fetchError);
    return;
  }

  const data = planetData![order];

  const name: string = persian ? data.name.persian : data.name.english
  const fact: string[] = persian ? data.facts.persian : data.facts.english

  const prev_container = document.querySelector(".planet-desc");

  if (prev_container) {
    (prev_container.children[0] as HTMLElement).innerText = name;
    const main = prev_container.querySelector("main") as HTMLElement 
    while (main.firstChild) {
      main.removeChild(main.firstChild)
    }
    fact.map((v, _) => {
      const element = document.createElement("li")
      element.innerText = v
      main.appendChild(element)
    })
  } else {
    const container = document.createElement("div");
    container.classList.add("glass", "planet-desc");

    const title = document.createElement("h2");
    title.innerText = name;

    const hr = document.createElement("hr");
    hr.style.color = "white";
    hr.style.margin = "10px 0";

    const planetDesc = document.createElement("main");

    fact.map((v, _)=> {
      const element = document.createElement("p")
      element.innerText = "📍" + v
      planetDesc.appendChild(element)
    })

    container.append(title, hr, planetDesc);
    document.querySelector(".overlay")?.appendChild(container);
  }
}


// img element with id "2" is previous button - img with id "1" is ui visibility toggle - img with id "0" is next button 
const switchIcons = ["/icons/right.svg" ,"/icons/visibility.png", "/icons/left.svg"] 

export function switchKeys(currentPlanet: number, persian: boolean) {

  const prev_container = document.querySelector(".switch-container") 

  if (prev_container) {
    return
  } else {
    const container = document.createElement("div")
    container.classList.add("glass","switch-container");
    document.querySelector(".overlay")?.appendChild(container)

    switchIcons.map((v, i) => {
      const element = document.createElement("img")
      element.src = v
      // we give this id to the buttons so we can work with visibility which is element with id "1"
      element.id = i.toString()
      if(element.id === "1") { element.style.scale = "0.65" }

      if(element.id !== "1") {
        element.addEventListener('click', () => {
          gsap.fromTo(
            element, 
            { scale: 0.2 }, 
            { scale: 0.4, duration: 0.6, ease: "elastic" })
        })
      }
      if (element?.id === "2" && currentPlanet === 0) {
        element.classList.add("disabled")
      }
      
      container.appendChild(element)
    })

  }
}