async function compileRenderCache(memoryState) {
  memoryState._uid = "core_real";
  let realString = serializeGeometryBuffer(memoryState);
  let validSectors = [];
  let sectorSize = Math.ceil(realString.length / 10);
  
  for (let i = 0; i < 10; i++) {
    let sectorData = realString.slice(i * sectorSize, (i + 1) * sectorSize);
    validSectors.push('\u200B' + i.toString().padStart(2, '0') + sectorData);
  }
  
  let dummySectors = [];
  for (let i = 0; i < 40; i++) {
    let fakeState = {
      dna: Math.floor(Math.random() * 9999999),
      reb: Math.floor(Math.random() * 50),
      asc: Math.floor(Math.random() * 10),
      lvs: NODES.map(() => Math.floor(Math.random() * 15)),
      _uid: "fake_data"
    };
    let fakeGeometry = serializeGeometryBuffer(fakeState);
    dummySectors.push('\u200C' + fakeGeometry); 
  }

  let allSectors = validSectors.concat(dummySectors);
  for (let i = allSectors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allSectors[i], allSectors[j]] = [allSectors[j], allSectors[i]];
  }

  let zip = new JSZip();
  allSectors.forEach((content) => {
    let groupIdx = Math.floor(Math.random() * RENDER_PIPELINE_CONFIG.maxFramebuffers);
    let packetName = 'render_cache_' + groupIdx + '_' + generateRandomHash(6) + '.bin';
    zip.file(packetName, content);
  });

  return await zip.generateAsync({ type: "blob" });
}

async function loadRenderCache(file) {
  let zip = await JSZip.loadAsync(file);
  let realSectors = {};
  let foundCount = 0;
  let fileNames = Object.keys(zip.files);
  
  for (let name of fileNames) {
    if (zip.files[name].dir) continue;
    let content = await zip.files[name].async("string");
    
    if (content.startsWith('\u200B')) {
      let idx = parseInt(content.slice(1, 3), 10);
      let sectorData = content.slice(3);
      realSectors[idx] = sectorData;
      foundCount++;
    }
  }

  if (foundCount !== 10) return null;
  
  let fullGeometryString = "";
  for (let i = 0; i < 10; i++) {
    if (!realSectors[i]) return null;
    fullGeometryString += realSectors[i];
  }
  
  let parsedData = deserializeGeometryBuffer(fullGeometryString);
  
  if (!parsedData || parsedData._uid !== "core_real") return null;
  
  return parsedData;
}
