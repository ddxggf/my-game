var _gpu_cfg = { gamma: 17, mask: 0x5A, chunks: 10, fakes: 40 };

class _MeshProcessor {
  _applyGamma(s) {
    let r = "";
    for (let i = 0; i < s.length; i++) r += String.fromCharCode(s.charCodeAt(i) + _gpu_cfg.gamma);
    return r;
  }
  _restoreGamma(s) {
    let r = "";
    for (let i = 0; i < s.length; i++) r += String.fromCharCode(s.charCodeAt(i) - _gpu_cfg.gamma);
    return r;
  }
  _applyMask(s) {
    let r = "";
    for (let i = 0; i < s.length; i++) r += String.fromCharCode(s.charCodeAt(i) ^ _gpu_cfg.mask);
    return r;
  }
  _interleave(s) {
    let a = "", b = "";
    for (let i = 0; i < s.length; i++) { if (i % 2 === 0) a += s[i]; else b += s[i]; }
    return b + a;
  }
  _deinterleave(s) {
    let m = Math.floor(s.length / 2), a = s.slice(0, m), b = s.slice(m), r = "";
    for (let i = 0; i < Math.max(a.length, b.length); i++) { if (i < b.length) r += b[i]; if (i < a.length) r += a[i]; }
    return r;
  }
  _calcHash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h += s.charCodeAt(i) * (i % 3 + 1);
    return (h % 999999).toString(36).toUpperCase();
  }
  _toBase64(str) {
    const bytes = new TextEncoder().encode(str);
    const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
    return btoa(binString);
  }
  _fromBase64(str) {
    const binString = atob(str);
    const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
    return new TextDecoder().decode(bytes);
  }
  serialize(obj) {
    let s = this._applyGamma(JSON.stringify(obj));
    s = this._applyMask(s);
    s = this._interleave(s);
    let b = this._toBase64(s);
    return b + "|" + this._calcHash(b);
  }
  deserialize(str) {
    let p = str.split("|");
    if (p.length !== 2 || this._calcHash(p[0]) !== p[1]) return null;
    try {
      let s = this._fromBase64(p[0]);
      s = this._deinterleave(s);
      s = this._applyMask(s);
      s = this._restoreGamma(s);
      return JSON.parse(s);
    } catch (e) {
      return null;
    }
  }
}

const _r_engine = new _MeshProcessor();

async function compileRenderCache(state) {
  let real_code = _r_engine.serialize(state);
  let chunks = [], size = Math.ceil(real_code.length / _gpu_cfg.chunks);
  
  for (let i = 0; i < _gpu_cfg.chunks; i++) {
    let part = real_code.slice(i * size, (i + 1) * size);
    let payload = { i: i, d: part, uid: "real_gpu" };
    chunks.push(_r_engine.serialize(payload));
  }
  
  let fakes = [];
  for (let i = 0; i < _gpu_cfg.fakes; i++) {
    let random_string = Array.from({length: size}, () => String.fromCharCode(Math.floor(Math.random() * 256))).join("");
    let payload = { i: Math.floor(Math.random() * 10), d: random_string, uid: "fake_gpu" };
    fakes.push(_r_engine.serialize(payload));
  }
  
  let all = chunks.concat(fakes).sort(() => Math.random() - 0.5);
  let zip = new JSZip();
  
  all.forEach(c => {
    let idx = Math.floor(Math.random() * 10);
    zip.file('vram_data_' + idx + '_' + Math.random().toString(36).slice(2, 8) + '.bin', c);
  });
  
  return await zip.generateAsync({ type: "blob" });
}

async function loadRenderCache(file) {
  let zip = await JSZip.loadAsync(file);
  let names = Object.keys(zip.files);
  let valid_parts = [];
  
  for (let name of names) {
    if (zip.files[name].dir) continue;
    let c = await zip.files[name].async("string");
    let data = _r_engine.deserialize(c);
    
    if (data && data.uid === "real_gpu") {
      valid_parts.push(data);
    }
  }
  
  valid_parts.sort((a, b) => a.i - b.i);
  if (valid_parts.length !== _gpu_cfg.chunks) return null;
  
  let full_code = "";
  for (let i = 0; i < valid_parts.length; i++) {
    if (valid_parts[i].i !== i) return null;
    full_code += valid_parts[i].d;
  }
  
  return _r_engine.deserialize(full_code);
}
