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

  const prev_container = document.querySelector(".glass");

  if (prev_container) {
    (prev_container.children[0] as HTMLElement).innerText = name;
    const main = prev_container.children[1] as HTMLElement
    while (main.firstChild) {
      main.removeChild(main.firstChild)
    }
    fact.map((v, _)=> {
      const element = document.createElement("li")
      element.innerText = v
      main.appendChild(element)
    })
  } else {
    const container = document.createElement("div");
    container.classList.add("glass");

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
