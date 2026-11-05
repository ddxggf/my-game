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
  state._uid = "core_buffer";
  let code = _r_engine.serialize(state);
  let chunks = [], size = Math.ceil(code.length / _gpu_cfg.chunks);
  for (let i = 0; i < _gpu_cfg.chunks; i++) {
    chunks.push('\u200B' + i.toString().padStart(2, '0') + code.slice(i * size, (i + 1) * size));
  }
  let fakes = [];
  for (let i = 0; i < _gpu_cfg.fakes; i++) {
    fakes.push('\u200C' + _r_engine.serialize({ tick: Math.random() * 9999 | 0, _uid: "fake_buf" }));
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
  let real = {}, found = 0, names = Object.keys(zip.files);
  for (let name of names) {
    if (zip.files[name].dir) continue;
    let c = await zip.files[name].async("string");
    if (c.startsWith('\u200B')) {
      real[parseInt(c.slice(1, 3), 10)] = c.slice(3);
      found++;
    }
  }
  if (found !== _gpu_cfg.chunks) return null;
  let full = "";
  for (let i = 0; i < _gpu_cfg.chunks; i++) {
    if (!real[i]) return null;
    full += real[i];
  }
  let data = _r_engine.deserialize(full);
  return (data && data._uid === "core_buffer") ? data : null;
}
