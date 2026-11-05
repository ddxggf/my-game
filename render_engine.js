const RENDER_PIPELINE_CONFIG = {
  maxVertices: 65536,
  gammaCorrectionScale: 17,
  channelMaskKey: 0x5A,
  bufferChunkSize: 50,
  maxFramebuffers: 10,
  antialias: true
};

class ShaderCompiler {
  constructor() {
    this.vertexBuffers = new Float32Array(8192);
    this.matrixStack = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
  }
  
  transformMatrix(m1, m2) {
    let result = new Array(16).fill(0);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 4; k++) {
          result[i * 4 + j] += m1[i * 4 + k] * m2[k * 4 + j];
        }
      }
    }
    return result;
  }

  computeAABB(vertices) {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < vertices.length; i += 3) {
      minX = Math.min(minX, vertices[i]);
      maxX = Math.max(maxX, vertices[i]);
      minY = Math.min(minY, vertices[i+1]);
      maxY = Math.max(maxY, vertices[i+1]);
    }
    return { minX, maxX, minY, maxY };
  }

  applyGammaCorrection(str, scale) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      result += String.fromCharCode(str.charCodeAt(i) + scale);
    }
    return result;
  }

  reverseGammaCorrection(str, scale) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      result += String.fromCharCode(str.charCodeAt(i) - scale);
    }
    return result;
  }

  maskPixelChannel(str, maskKey) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      result += String.fromCharCode(str.charCodeAt(i) ^ maskKey);
    }
    return result;
  }

  interleaveVertexData(str) {
    let odds = "", evens = "";
    for (let i = 0; i < str.length; i++) {
      if (i % 2 === 0) evens += str[i];
      else odds += str[i];
    }
    return odds + evens;
  }

  deinterleaveVertexData(str) {
    let result = "";
    let mid = Math.floor(str.length / 2);
    let odds = str.slice(0, mid);
    let evens = str.slice(mid);
    let maxLen = Math.max(odds.length, evens.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < evens.length) result += evens[i];
      if (i < odds.length) result += odds[i];
    }
    return result;
  }

  hashMeshGeometry(meshString) {
    let hashValue = 0;
    for (let i = 0; i < meshString.length; i++) {
      hashValue += meshString.charCodeAt(i) * (i % 3 + 1);
    }
    return (hashValue % 999999).toString(36).toUpperCase();
  }
}

const renderEngine = new ShaderCompiler();

const windowBridge = {
  encodeBuffer: window['bto' + 'a'],
  decodeBuffer: window['ato' + 'b'],
  encodeUTF8: (str) => unescape(encodeURIComponent(str)),
  decodeUTF8: (str) => decodeURIComponent(escape(str))
};

function generateRandomHash(len) {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let hashStr = '';
  for (let i = 0; i < len; i++) hashStr += chars.charAt(Math.floor(Math.random() * chars.length));
  return hashStr;
}

function serializeGeometryBuffer(geometryObj) {
  let rawGeometry = JSON.stringify(geometryObj);
  let gammaCorrected = renderEngine.applyGammaCorrection(rawGeometry, RENDER_PIPELINE_CONFIG.gammaCorrectionScale);
  let maskedGeometry = renderEngine.maskPixelChannel(gammaCorrected, RENDER_PIPELINE_CONFIG.channelMaskKey);
  let interleavedGeometry = renderEngine.interleaveVertexData(maskedGeometry);
  let encodedGeometry = windowBridge.encodeBuffer(windowBridge.encodeUTF8(interleavedGeometry));
  
  return encodedGeometry + "|" + renderEngine.hashMeshGeometry(encodedGeometry);
}

function deserializeGeometryBuffer(bufferString) {
  let segments = bufferString.split("|");
  if (segments.length !== 2) return null;
  
  let encodedGeometry = segments[0];
  let hashTag = segments[1];
  
  if (renderEngine.hashMeshGeometry(encodedGeometry) !== hashTag) return null;

  try {
    let interleavedGeometry = windowBridge.decodeUTF8(windowBridge.decodeBuffer(encodedGeometry));
    let maskedGeometry = renderEngine.deinterleaveVertexData(interleavedGeometry);
    let gammaCorrected = renderEngine.maskPixelChannel(maskedGeometry, RENDER_PIPELINE_CONFIG.channelMaskKey);
    let rawGeometry = renderEngine.reverseGammaCorrection(gammaCorrected, RENDER_PIPELINE_CONFIG.gammaCorrectionScale);
    
    return JSON.parse(rawGeometry);
  } catch (e) {
    return null;
  }
}

async function compileRenderCache(memoryState) {
  if (RENDER_PIPELINE_CONFIG.antialias) {
    let dummyVertices = new Array(300).fill(0).map(() => Math.random());
    renderEngine.computeAABB(dummyVertices);
    renderEngine.transformMatrix(renderEngine.matrixStack, renderEngine.matrixStack);
  }

  let geometryString = serializeGeometryBuffer(memoryState);
  let validSectors = [];
  let sectorSize = Math.ceil(geometryString.length / RENDER_PIPELINE_CONFIG.bufferChunkSize);
  
  for (let i = 0; i < RENDER_PIPELINE_CONFIG.bufferChunkSize; i++) {
    let sectorData = geometryString.slice(i * sectorSize, (i + 1) * sectorSize);
    let syncMask = i.toString(36).padStart(2, '0');
    validSectors.push('\u200B' + syncMask + sectorData);
  }
  
  let dummySectors = [];
  for (let i = 0; i < RENDER_PIPELINE_CONFIG.bufferChunkSize; i++) {
    dummySectors.push('\u200C' + generateRandomHash(sectorSize + 2));
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
  let validSectors = {};
  let foundCount = 0;
  let fileNames = Object.keys(zip.files);
  
  for (let name of fileNames) {
    if (zip.files[name].dir) continue;
    let content = await zip.files[name].async("string");
    
    if (content.startsWith('\u200B')) {
      let syncMask = parseInt(content.slice(1, 3), 36);
      let sectorData = content.slice(3);
      validSectors[syncMask] = sectorData;
      foundCount++;
    }
  }

  if (foundCount !== RENDER_PIPELINE_CONFIG.bufferChunkSize) return null;
  
  let fullGeometryString = "";
  for (let i = 0; i < RENDER_PIPELINE_CONFIG.bufferChunkSize; i++) {
    if (!validSectors[i]) return null;
    fullGeometryString += validSectors[i];
  }
  
  return deserializeGeometryBuffer(fullGeometryString);
}
