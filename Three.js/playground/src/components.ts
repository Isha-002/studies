import gsap from 'gsap';



let planetData: any[] | null = null;
let fetchError: Error | null = null;
// ----------------------------------------------------------------------
// THIS ARRAY IS USED INSIDE switchKeys() FUNCTION
// img element with id "2" is previous button - img with id "1" is ui visibility toggle - img with id "0" is next button 
const switchIcons = ["/icons/right.svg" ,"/icons/visibility.png", "/icons/left.svg"] 
// ----------------------------------------------------------------------
// THIS ARRAY IS USED INSIDE sideKeys() FUNCTION
// side keys must contain: setting - solar system - language
// we add an empty item to make .map() iterate 3 times
const sideKeyIcons = ["/icons/settings.png", "/icons/orbit.png", ""]
// ----------------------------------------------------------------------





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

export async function planetDesc(order: number, persian: boolean, isMobile: boolean) {
  
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

  const prev_container = document.querySelector(".planet-desc") as HTMLDivElement;

  if (prev_container) {
    persian ? prev_container.style.direction = 'rtl' : prev_container.style.direction = 'ltr';
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
    persian ? container.style.direction = 'rtl' : container.style.direction = 'ltr'

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




export function switchKeys(currentPlanet: number, persian: boolean, isMobile: boolean) {

  function mapIcons(container: HTMLDivElement) {

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

    const mobileIcons = isMobile ? [sideKeyIcons[0], ...switchIcons, sideKeyIcons[1]] : switchIcons
    mobileIcons.map((v, _) => {
      const element = document.createElement("img")
      element.src = v
      // we give this id to the buttons so we can work with visibility which is element with id "1"
      element.id = v
      if(element.id.includes("visibility")) { element.style.scale = "0.65" }
      if(element.id.includes("orbit")) { element.style.scale = "0.55" }

      if(element.id.includes("right") || element.id.includes("left")) {
        element.addEventListener('click', () => {
          gsap.fromTo(
            element, 
            { scale: 0.2 }, 
            { scale: 0.4, duration: 0.6, ease: "elastic" })
        })
      }
      if (element.id.includes("left") && currentPlanet === 0) {
        element.classList.add("disabled")
      }

      if (element.id.includes("setting") || element.id.includes("orbit")) {
        element.addEventListener('click', () => {
          gsap.to(element, { rotate: "+=180" })
        })
      }
      
      container.appendChild(element)
    })
  }

  const prev_container = document.querySelector(".switch-container") as HTMLDivElement | null

  if (prev_container) {
    mapIcons(prev_container)
    return
  } else {
    const container = document.createElement("div")
    container.classList.add("glass","switch-container");
    document.querySelector(".overlay")?.appendChild(container)
    mapIcons(container)
  }
}



export function sideKeys(persian: boolean, isMobile: boolean) {

  const prev_container = document.querySelector(".sidekeys-container") 

  if (prev_container) {
    isMobile ? prev_container.classList.add("hide") : prev_container.classList.remove("hide")
    const languageBtn = document.getElementById("changeLanguage")
    if (languageBtn)
    languageBtn.textContent = persian ? "En" : "Fa"
    return
  } else if(!isMobile) {
    const container = document.createElement("div")
    container.classList.add("glass","sidekeys-container");
    document.querySelector(".overlay")?.appendChild(container)

    sideKeyIcons.map((v, i) => {

      if (i !== 2) {
        const btn = document.createElement("button")
        const element = document.createElement("img")
        element.src = v
        element.id = v
        element.width = 35
        element.height = 35
        btn.appendChild(element)
        container.appendChild(btn)

        element.addEventListener('click', () => {
          gsap.to(element, { rotate: "+=180" })
        })
      }
      if (i === 2) {
        const btn = document.createElement("button")
        btn.id = "changeLanguage"
        btn.textContent = persian ? "En" : "Fa"
        container.appendChild(btn)
      }
    })
  }

}