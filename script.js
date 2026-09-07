document.addEventListener("DOMContentLoaded",()=>{
  setTimeout(()=>document.body.classList.add("loaded"),450);
  const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
  $("#year").textContent=new Date().getFullYear();

  $("#menu").onclick=()=>$("#nav").classList.toggle("open");
  $$("#nav a").forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));
  $("#presentation").onclick=()=>{
    document.body.classList.toggle("presentation");
    $("#presentation").textContent=document.body.classList.contains("presentation")?"Salir del modo presentación":"Modo presentación";
  };

  // Interactive map
  if(window.L){
    const map=L.map("map",{zoomControl:true,scrollWheelZoom:false,minZoom:5,maxZoom:12}).setView([-38.35,-69.55],6);
    const standard=L.tileLayer("https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG:3857@png/{z}/{x}/{-y}.png",{maxZoom:18,attribution:"© IGN · Argenmap"}).addTo(map);
    const satellite=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"Tiles © Esri"});
    const basinCoords=[[-35.10,-70.25],[-35.25,-69.25],[-35.65,-67.85],[-36.35,-67.25],[-37.25,-66.95],[-38.25,-67.05],[-39.25,-67.35],[-40.05,-68.15],[-40.55,-69.20],[-40.30,-70.25],[-39.55,-71.15],[-38.65,-71.75],[-37.45,-71.55],[-36.55,-70.95],[-35.65,-70.65]];
    const vacaCoords=[[-35.95,-70.05],[-36.10,-69.35],[-36.45,-68.72],[-36.95,-68.35],[-37.55,-68.22],[-38.15,-68.48],[-38.72,-68.82],[-39.08,-69.38],[-39.05,-70.02],[-38.55,-70.55],[-37.90,-70.82],[-37.20,-70.72],[-36.55,-70.45]];
    const basin=L.polygon(basinCoords,{color:"#9d7dff",weight:2,dashArray:"7 6",fillColor:"#9d7dff",fillOpacity:.08}).addTo(map);
    const vaca=L.polygon(vacaCoords,{color:"#ff9b4a",weight:2,fillColor:"#ff9b4a",fillOpacity:.22}).addTo(map);
    basin.bindPopup("<b>Cuenca Neuquina</b><br><small>Límite esquemático con fines educativos.</small>");
    vaca.bindPopup("<b>Vaca Muerta</b><br><small>Área de referencia visual; no representa un límite oficial de la formación.</small>");
    const points=[["Añelo",-38.355,-68.789,"Nodo estratégico del desarrollo no convencional"],["Loma Campana",-38.09,-69.04,"Área emblemática de Vaca Muerta"],["Rincón de los Sauces",-37.39,-68.92,"Nodo hidrocarburífero"],["Malargüe",-35.47,-69.59,"Sector mendocino de la Cuenca Neuquina"]];
    points.forEach(p=>{
      const icon=L.divIcon({className:"custom-marker",html:'<span style="display:block;width:10px;height:10px;border-radius:50%;background:#63d391;box-shadow:0 0 0 5px #63d39122,0 0 15px #63d39188"></span>',iconSize:[10,10]});
      L.marker([p[1],p[2]],{icon}).addTo(map).bindPopup("<b>"+p[0]+"</b><br><small>"+p[3]+"</small>");
    });
    const bounds=L.latLngBounds(basinCoords), vBounds=L.latLngBounds(vacaCoords);
    $$(".map-controls button[data-view]").forEach(b=>b.onclick=()=>{
      $$(".map-controls button[data-view]").forEach(x=>x.classList.remove("active"));b.classList.add("active");
      map.fitBounds((b.dataset.view==="vaca"?vBounds:bounds).pad(.08),{duration:.8});
    });
    $("#reset").onclick=()=>map.fitBounds(bounds.pad(.06),{duration:.8});
    $("#sat").onclick=()=>{if(map.hasLayer(standard)){map.removeLayer(standard);satellite.addTo(map);$("#sat").textContent="◉ Mapa"}else{map.removeLayer(satellite);standard.addTo(map);$("#sat").textContent="◌ Satélite"}};
    $("#map").addEventListener("mouseenter",()=>map.scrollWheelZoom.enable());
    $("#map").addEventListener("mouseleave",()=>map.scrollWheelZoom.disable());
    setTimeout(()=>map.invalidateSize(),500);
  }

  const stages={
    tri:["TRIÁSICO–JURÁSICO","Se construye el espacio de la cuenca","La tectónica y la subsidencia generan espacio de acomodación donde se acumulan sedimentos a lo largo del tiempo geológico.","≈ 250–145 Ma","Evolución tectónica"],
    tit:["TITHONIANO","Se preserva materia orgánica en un ambiente marino","Durante el Tithoniano se desarrolla el registro marino fino asociado al sistema Vaca Muerta–Quintuco, con condiciones favorables para preservar materia orgánica.","≈ 152–145 Ma","Sedimentación marina"],
    ber:["BERRIASIANO","Continúa la evolución Vaca Muerta–Quintuco","La sedimentación continúa durante el Cretácico temprano y cambia lateral y verticalmente según el ambiente dentro de la cuenca.","≈ 145–139,8 Ma","Evolución sedimentaria"],
    val:["VALANGINIANO","La arquitectura sedimentaria sigue cambiando","Las unidades más jóvenes cubren y suceden al registro de Vaca Muerta en distintos sectores, construyendo la arquitectura final del sistema.","≈ 139,8–132,6 Ma","Cambio ambiental"],
    hoy:["ACTUALIDAD","La geología se convierte en ingeniería","El desarrollo no convencional combina pozos horizontales y estimulación hidráulica para aumentar la conectividad de formaciones de muy baja permeabilidad.","2026","Desarrollo no convencional"]
  };
  function setStage(k){
    const d=stages[k], s=$("#geoScene"); s.className="geo-scene stage-"+k;
    $("#stagePill").textContent=d[0];$("#stageTitle").textContent=d[1];$("#stageText").textContent=d[2];$("#age").textContent=d[3];$("#event").textContent=d[4];
    $$("#timeline button").forEach(b=>b.classList.toggle("active",b.dataset.stage===k));
  }
  $$("#timeline button").forEach(b=>b.onclick=()=>setStage(b.dataset.stage));setStage("tri");

  const process=[
    ["Perforación vertical","Se construye el pozo atravesando las unidades del subsuelo hasta alcanzar la trayectoria prevista.","Construir una trayectoria segura y controlada."],
    ["Construcción de curva","La trayectoria cambia progresivamente de dirección para orientar el pozo hacia la formación objetivo.","Posicionar el pozo dentro de la ventana geológica."],
    ["Lateral horizontal","El tramo horizontal aumenta el contacto del pozo con la formación de interés.","Maximizar el contacto con la roca objetivo."],
    ["Completación","Se instalan y acondicionan los elementos necesarios para preparar el pozo para la estimulación y producción.","Dejar el pozo listo para operar."],
    ["Estimulación","Se aplican tratamientos hidráulicos para generar conductividad en la formación.","Favorecer el flujo desde la roca hacia el pozo."],
    ["Producción","Los fluidos ingresan al sistema del pozo y son conducidos a superficie para su tratamiento.","Mantener una operación segura y eficiente."]
  ];
  function setProcess(i){
    const d=process[i];$$("#processNav button").forEach((b,j)=>b.classList.toggle("active",i===j));
    $("#processTag").textContent="ETAPA "+String(i+1).padStart(2,"0");$("#processTitle").textContent=d[0];$("#processText").textContent=d[1];$("#processObjective").textContent=d[2];
    $("#wellHorizontal").style.width=(25+i*7)+"%";$("#fracs").style.opacity=i>=4?".85":i>=2?".35":".05";
  }
  $$("#processNav button").forEach(b=>b.onclick=()=>setProcess(+b.dataset.step));setProcess(0);

  const depth=$("#depth"),length=$("#length"),stagesInput=$("#stages");
  function simulate(){
    const d=+depth.value,l=+length.value,s=+stagesInput.value;
    $("#depthOut").textContent=d.toLocaleString("es-AR")+" m";$("#lengthOut").textContent=l.toLocaleString("es-AR")+" m";$("#stageOut").textContent=s;
    const score=Math.round(Math.min(100,Math.max(0,35+(l-500)/3000*45+(s-5)/35*20)));
    $("#score").textContent=score+"%";$("#scoreBar").style.width=score+"%";
    $("#simText").textContent=score>78?"Alto contacto conceptual con la formación objetivo.":score>58?"Buen contacto conceptual con la formación objetivo.":"Contacto conceptual reducido: aumentá la longitud horizontal o las etapas.";
    const fracCount=Math.max(3,Math.round(s/3));$("#simFracs")?.remove();
    const f=document.createElement("div");f.id="simFracs";f.className="sim-frac";f.style.opacity=(.15+score/150);f.style.background="repeating-linear-gradient(120deg,transparent 0 "+(22-fracCount/2)+"px,#aa94ff88 "+(23-fracCount/2)+"px "+(25-fracCount/2)+"px)";
    $(".sim-visual").appendChild(f);
  }
  [depth,length,stagesInput].forEach(x=>x.oninput=simulate);simulate();

  const questions=[
    ["¿Qué es Vaca Muerta?",["Un yacimiento individual","Una formación sedimentaria","Una provincia","Un oleoducto"],1],
    ["¿Qué característica dificulta el flujo en un shale?",["Alta permeabilidad","Muy baja permeabilidad","Ausencia de porosidad","Agua superficial"],1],
    ["¿Para qué se usa un pozo horizontal?",["Reducir el contacto","Aumentar el contacto con la formación","Evitar la completación","Eliminar el casing"],1],
    ["¿Qué busca la estimulación hidráulica?",["Aumentar la conductividad","Cambiar la gravedad","Crear una cuenca","Medir la salinidad"],0],
    ["¿Qué representa Ro?",["Porosidad","Permeabilidad","Madurez térmica de la materia orgánica","Presión de superficie"],2],
    ["¿Dónde se ubica Vaca Muerta?",["Cuenca Neuquina","Cuenca Austral","Cuenca del Golfo","Cuenca Noroeste"],0],
    ["¿Qué significa MMm³/d?",["Millones de metros cúbicos por día","Miles de metros cúbicos por día","Millones de barriles por día","Metros cúbicos totales"],0],
    ["¿Qué diferencia clave existe entre porosidad y permeabilidad?",["Son sinónimos","La porosidad describe espacios; la permeabilidad, facilidad de flujo","Ambas miden presión","Ninguna depende de la roca"],1]
  ];
  let qi=0,scoreQ=0,answered=false;
  function renderQuiz(){
    const q=questions[qi];answered=false;$("#qNumber").textContent=`PREGUNTA ${String(qi+1).padStart(2,"0")} / ${questions.length}`;$("#scoreQuiz").textContent=scoreQ+" pts";$("#question").textContent=q[0];$("#answers").className="answer-grid";$("#answers").innerHTML="";$("#result").textContent="";$("#next").disabled=true;
    q[1].forEach((a,i)=>{const b=document.createElement("button");b.className="answer";b.textContent=a;b.onclick=()=>{if(answered)return;answered=true;$$(".answer").forEach(x=>x.disabled=true);if(i===q[2]){b.classList.add("correct");scoreQ++;$("#result").textContent="✓ Correcto"}else{b.classList.add("wrong");$$(".answer")[q[2]].classList.add("correct");$("#result").textContent="✗ Incorrecto"}$("#scoreQuiz").textContent=scoreQ+" pts";$("#next").disabled=false};$("#answers").appendChild(b)});
  }
  $("#next").onclick=()=>{if(!answered)return;qi++;if(qi>=questions.length){$("#qNumber").textContent="QUIZ COMPLETADO";$("#question").textContent=`Resultado final: ${scoreQ} de ${questions.length}`;$("#answers").innerHTML="";$("#result").textContent=scoreQ>=7?"Excelente: dominás los conceptos principales.":scoreQ>=5?"Muy bien: tenés una buena base.":"Buen comienzo: recorré nuevamente la página y probá otra vez.";$("#next").textContent="Reiniciar quiz";$("#next").onclick=()=>{qi=0;scoreQ=0;$("#next").textContent="Siguiente →";renderQuiz()};return}renderQuiz()};
  renderQuiz();
});