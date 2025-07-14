import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import { ImageTile, OSM, XYZ } from "ol/source";
import VectorSource from "ol/source/Vector";
import Draw, { DrawEvent } from "ol/interaction/Draw.js";
import { getArea, getLength } from "ol/sphere";
import Modify from 'ol/interaction/Modify.js';
import type { Geometry } from "ol/geom";
import Select from 'ol/interaction/Select';


export type DrawType = "Circle" | "Point" | "Polygon";
export type BaseLayerKey = "osm" | "mapTiler" | "carto" | "topo" | "wikimedia" | "dark";

export function useMap(target: HTMLElement) {

  const savedObjects: Feature<Geometry>[] = []

  ////////////////// Base Layers //////////////////
  const baseLayers: Record<BaseLayerKey, TileLayer> = {
    osm: new TileLayer({ source: new OSM() }),
    mapTiler: new TileLayer({
      source: new ImageTile({
        url: "https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",
        maxZoom: 20,
      }),
    }),
    carto: new TileLayer({
      source: new XYZ({
        url: "https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      }),
    }),
    topo: new TileLayer({
      source: new XYZ({
        url: "https://tile.opentopomap.org/{z}/{x}/{y}.png",
        maxZoom: 17,
      }),
    }),
    wikimedia: new TileLayer({
      source: new XYZ({
        url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
      }),
    }),
    dark: new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
      }),
    })
  };

  let currentBaseKey: BaseLayerKey = "osm";

  ////////////////// Draw //////////////////
  const vectorSource = new VectorSource();
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

const draw = (type: DrawType) => {
  const draw = new Draw({
    source: vectorSource,
    type,
  });

    map.addInteraction(draw);



    draw.on("drawend", (event: DrawEvent) => {
      const feature = event.feature;
      savedObjects.push(feature);

      const geometry = feature.getGeometry();
      
      if (type === "Polygon" && geometry) {
        const area = getArea(geometry);
        const length = getLength(geometry);
        console.log("Length:", length.toFixed(2) + "m²");
        console.log(
          "Area:",
          area > 1_000_000
            ? (area / 1_000_000).toFixed(2) + "km²"
            : area.toFixed(2) + "m²"
        );
      }
    });

    // map.on('pointermove', (e)=> {
      
    // })

    return draw;
  };

  ////////////////// Map //////////////////
  const map = new Map({
    controls: [],
    target,
    layers: [baseLayers[currentBaseKey], vectorLayer],
    view: new View({
      center: fromLonLat([54.356857, 31.897423]),
      zoom: 12,
    }),
  });

  ////////////////// Change Base //////////////////
  const setBaseMap = (key: BaseLayerKey) => {
    if (key === currentBaseKey) return;
    map.removeLayer(baseLayers[currentBaseKey]);
    map.getLayers().insertAt(0, baseLayers[key]);
    currentBaseKey = key;
  };
  ////////////////// Modify //////////////////
  const modify = new Modify({source: vectorSource});
  const editMode = (active: Boolean) => {
    if (active) {
      map.addInteraction(modify);
    } else {
      map.removeInteraction(modify)
    }
  } 
  ////////////////// Select //////////////////
  const select = new Select();

  map.addInteraction(select);

  const deleteSelected = () => {
    const selected = select.getFeatures();
    selected.forEach(f => {
      vectorSource.removeFeature(f);
      const index = savedObjects.indexOf(f);
      if (index !== -1) savedObjects.splice(index, 1);
    });
    selected.clear();
  };


  return { map, draw, setBaseMap, editMode, deleteSelected };
}
