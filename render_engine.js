const RENDER_PIPELINE_CONFIG = {
  maxVertices: 65536,
  antialias: true,
  shadowMapType: 2
};

class MeshRendererContext {
  constructor() {
    this.buffers = new Float32Array(4096);
    this.identityMatrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
  }
  multiplyMatrix(m1, m2) {
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
  calculateNormalMatrix(meshData) {
    let normals = [];
    for (let i = 0; i < meshData.length; i += 3) {
      let nx = meshData[i], ny = meshData[i+1], nz = meshData[i+2];
      let len = Math.sqrt(nx*nx + ny*ny + nz*nz) || 1;
      normals.push(nx/len, ny/len, nz/len);
    }
    return normals;
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
}

const globalRenderer = new MeshRendererContext();

function getFrameFingerprint(bufferStr) {
  let hashAcc = 0;
  for (let i = 0; i < bufferStr.length; i++) {
    hashAcc += bufferStr.charCodeAt(i) * (i % 3 + 1);
  }
  return (hashAcc % 999999).toString(36).toUpperCase();
}

function buildGeometryBuffer(configObj) {
  let rawData = JSON.stringify(configObj);
  let mixedData = "";
  let renderClockOffset = 0x2A; 
  for (let i = 0; i < rawData.length; i++) {
    mixedData += String.fromCharCode(rawData.charCodeAt(i) ^ renderClockOffset);
  }
  let encodedStr = btoa(unescape(encodeURIComponent(mixedData)));
  return encodedStr + "|" + getFrameFingerprint(encodedStr);
}

function parseGeometryBuffer(bundleStr) {
  let segments = bundleStr.split("|");
  if (segments.length !== 2) return null;
  let encodedStr = segments[0];
  let fingerprint = segments[1];
  if (getFrameFingerprint(encodedStr) !== fingerprint) return null;
  
  try {
    let mixedData = decodeURIComponent(escape(atob(encodedStr)));
    let rawData = "";
    let renderClockOffset = 0x2A;
    for (let i = 0; i < mixedData.length; i++) {
      rawData += String.fromCharCode(mixedData.charCodeAt(i) ^ renderClockOffset);
    }
    return JSON.parse(rawData);
  } catch(e) {
    return null;
  }
}

function generateRandomHash(len) {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let hashStr = '';
  for (let i = 0; i < len; i++) hashStr += chars.charAt(Math.floor(Math.random() * chars.length));
  return hashStr;
}

function compileShaderProgram(vertexShader, fragmentShader) {
  if (!vertexShader || !fragmentShader) return null;
  return "Program_ID_" + generateRandomHash(16);
}

async function compileRenderCache(memoryState) {
  if (RENDER_PIPELINE_CONFIG.antialias) {
    let dummyMesh = new Array(300).fill(0).map(() => Math.random());
    globalRenderer.calculateNormalMatrix(dummyMesh);
    globalRenderer.computeAABB(dummyMesh);
  }

  let assetCode = buildGeometryBuffer(memoryState);
  let validSectors = [];
  let sectorSize = Math.ceil(assetCode.length / 50);
  
  for (let i = 0; i < 50; i++) {
    let sectorData = assetCode.slice(i * sectorSize, (i + 1) * sectorSize);
    let syncMask = i.toString(36).padStart(2, '0');
    validSectors.push('\u200B' + syncMask + sectorData);
  }
  
  let dummySectors = [];
  for (let i = 0; i < 50; i++) {
    dummySectors.push('\u200C' + generateRandomHash(sectorSize + 2));
  }

  let allSectors = validSectors.concat(dummySectors);
  for (let i = allSectors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allSectors[i], allSectors[j]] = [allSectors[j], allSectors[i]];
  }

  let zip = new JSZip();
  allSectors.forEach((content) => {
    let groupIdx = Math.floor(Math.random() * 10);
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

  if (foundCount !== 50) return null;
  let fullAssetCode = "";
  for (let i = 0; i < 50; i++) {
    if (!validSectors[i]) return null;
    fullAssetCode += validSectors[i];
  }
  
  return parseGeometryBuffer(fullAssetCode);
}
