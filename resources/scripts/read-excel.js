!(function (r, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((r =
        "undefined" != typeof globalThis
          ? globalThis
          : r || self).readXlsxFile = e());
})(this, function () {
  "use strict";
  var r = {
      createDocument: function (r) {
        return new DOMParser().parseFromString(r.trim(), "text/xml");
      },
    },
    e = Uint8Array,
    t = Uint16Array,
    n = Uint32Array,
    o = new e([
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
      5, 5, 5, 0, 0, 0, 0,
    ]),
    a = new e([
      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
      11, 11, 12, 12, 13, 13, 0, 0,
    ]),
    i = new e([
      16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
    ]),
    u = function (r, e) {
      for (var o = new t(31), a = 0; a < 31; ++a) o[a] = e += 1 << r[a - 1];
      var i = new n(o[30]);
      for (a = 1; a < 30; ++a)
        for (var u = o[a]; u < o[a + 1]; ++u) i[u] = ((u - o[a]) << 5) | a;
      return [o, i];
    },
    l = u(o, 2),
    f = l[0],
    c = l[1];
  (f[28] = 258), (c[258] = 28);
  for (var s = u(a, 0)[0], v = new t(32768), d = 0; d < 32768; ++d) {
    var p = ((43690 & d) >>> 1) | ((21845 & d) << 1);
    (p =
      ((61680 & (p = ((52428 & p) >>> 2) | ((13107 & p) << 2))) >>> 4) |
      ((3855 & p) << 4)),
      (v[d] = (((65280 & p) >>> 8) | ((255 & p) << 8)) >>> 1);
  }
  var m = function (r, e, n) {
      for (var o = r.length, a = 0, i = new t(e); a < o; ++a)
        r[a] && ++i[r[a] - 1];
      var u,
        l = new t(e);
      for (a = 0; a < e; ++a) l[a] = (l[a - 1] + i[a - 1]) << 1;
      if (n) {
        u = new t(1 << e);
        var f = 15 - e;
        for (a = 0; a < o; ++a)
          if (r[a])
            for (
              var c = (a << 4) | r[a],
                s = e - r[a],
                d = l[r[a] - 1]++ << s,
                p = d | ((1 << s) - 1);
              d <= p;
              ++d
            )
              u[v[d] >>> f] = c;
      } else
        for (u = new t(o), a = 0; a < o; ++a)
          r[a] && (u[a] = v[l[r[a] - 1]++] >>> (15 - r[a]));
      return u;
    },
    y = new e(288);
  for (d = 0; d < 144; ++d) y[d] = 8;
  for (d = 144; d < 256; ++d) y[d] = 9;
  for (d = 256; d < 280; ++d) y[d] = 7;
  for (d = 280; d < 288; ++d) y[d] = 8;
  var b = new e(32);
  for (d = 0; d < 32; ++d) b[d] = 5;
  var h = m(y, 9, 1),
    g = m(b, 5, 1),
    w = function (r) {
      for (var e = r[0], t = 1; t < r.length; ++t) r[t] > e && (e = r[t]);
      return e;
    },
    O = function (r, e, t) {
      var n = (e / 8) | 0;
      return ((r[n] | (r[n + 1] << 8)) >> (7 & e)) & t;
    },
    S = function (r, e) {
      var t = (e / 8) | 0;
      return (r[t] | (r[t + 1] << 8) | (r[t + 2] << 16)) >> (7 & e);
    },
    A = function (r, o, a) {
      (null == o || o < 0) && (o = 0),
        (null == a || a > r.length) && (a = r.length);
      var i = new (
        2 == r.BYTES_PER_ELEMENT ? t : 4 == r.BYTES_PER_ELEMENT ? n : e
      )(a - o);
      return i.set(r.subarray(o, a)), i;
    },
    j = [
      "unexpected EOF",
      "invalid block type",
      "invalid length/literal",
      "invalid distance",
      "stream finished",
      "no stream handler",
      ,
      "no callback",
      "invalid UTF-8 data",
      "extra field too long",
      "date not in range 1980-2099",
      "filename too long",
      "stream finishing",
      "invalid zip data",
    ],
    E = function (r, e, t) {
      var n = new Error(e || j[r]);
      if (
        ((n.code = r),
        Error.captureStackTrace && Error.captureStackTrace(n, E),
        !t)
      )
        throw n;
      return n;
    },
    x = new e(0),
    I = function (r, e) {
      return r[e] | (r[e + 1] << 8);
    },
    k = function (r, e) {
      return (
        (r[e] | (r[e + 1] << 8) | (r[e + 2] << 16) | (r[e + 3] << 24)) >>> 0
      );
    },
    P = function (r, e) {
      return k(r, e) + 4294967296 * k(r, e + 4);
    };
  function _(r, t) {
    return (function (r, t, n) {
      var u = r.length;
      if (!u || (n && n.f && !n.l)) return t || new e(0);
      var l = !t || n,
        c = !n || n.i;
      n || (n = {}), t || (t = new e(3 * u));
      var v = function (r) {
          var n = t.length;
          if (r > n) {
            var o = new e(Math.max(2 * n, r));
            o.set(t), (t = o);
          }
        },
        d = n.f || 0,
        p = n.p || 0,
        y = n.b || 0,
        b = n.l,
        j = n.d,
        x = n.m,
        I = n.n,
        k = 8 * u;
      do {
        if (!b) {
          d = O(r, p, 1);
          var P = O(r, p + 1, 3);
          if (((p += 3), !P)) {
            var _ = r[(L = 4 + (((p + 7) / 8) | 0)) - 4] | (r[L - 3] << 8),
              D = L + _;
            if (D > u) {
              c && E(0);
              break;
            }
            l && v(y + _),
              t.set(r.subarray(L, D), y),
              (n.b = y += _),
              (n.p = p = 8 * D),
              (n.f = d);
            continue;
          }
          if (1 == P) (b = h), (j = g), (x = 9), (I = 5);
          else if (2 == P) {
            var T = O(r, p, 31) + 257,
              N = O(r, p + 10, 15) + 4,
              C = T + O(r, p + 5, 31) + 1;
            p += 14;
            for (var F = new e(C), U = new e(19), M = 0; M < N; ++M)
              U[i[M]] = O(r, p + 3 * M, 7);
            p += 3 * N;
            var $ = w(U),
              z = (1 << $) - 1,
              R = m(U, $, 1);
            for (M = 0; M < C; ) {
              var L,
                B = R[O(r, p, z)];
              if (((p += 15 & B), (L = B >>> 4) < 16)) F[M++] = L;
              else {
                var V = 0,
                  X = 0;
                for (
                  16 == L
                    ? ((X = 3 + O(r, p, 3)), (p += 2), (V = F[M - 1]))
                    : 17 == L
                    ? ((X = 3 + O(r, p, 7)), (p += 3))
                    : 18 == L && ((X = 11 + O(r, p, 127)), (p += 7));
                  X--;

                )
                  F[M++] = V;
              }
            }
            var Z = F.subarray(0, T),
              G = F.subarray(T);
            (x = w(Z)), (I = w(G)), (b = m(Z, x, 1)), (j = m(G, I, 1));
          } else E(1);
          if (p > k) {
            c && E(0);
            break;
          }
        }
        l && v(y + 131072);
        for (var Y = (1 << x) - 1, q = (1 << I) - 1, W = p; ; W = p) {
          var H = (V = b[S(r, p) & Y]) >>> 4;
          if ((p += 15 & V) > k) {
            c && E(0);
            break;
          }
          if ((V || E(2), H < 256)) t[y++] = H;
          else {
            if (256 == H) {
              (W = p), (b = null);
              break;
            }
            var J = H - 254;
            if (H > 264) {
              var K = o[(M = H - 257)];
              (J = O(r, p, (1 << K) - 1) + f[M]), (p += K);
            }
            var Q = j[S(r, p) & q],
              rr = Q >>> 4;
            if (
              (Q || E(3),
              (p += 15 & Q),
              (G = s[rr]),
              rr > 3 &&
                ((K = a[rr]), (G += S(r, p) & ((1 << K) - 1)), (p += K)),
              p > k)
            ) {
              c && E(0);
              break;
            }
            l && v(y + 131072);
            for (var er = y + J; y < er; y += 4)
              (t[y] = t[y - G]),
                (t[y + 1] = t[y + 1 - G]),
                (t[y + 2] = t[y + 2 - G]),
                (t[y + 3] = t[y + 3 - G]);
            y = er;
          }
        }
        (n.l = b),
          (n.p = W),
          (n.b = y),
          (n.f = d),
          b && ((d = 1), (n.m = x), (n.d = j), (n.n = I));
      } while (!d);
      return y == t.length ? t : A(t, 0, y);
    })(r, t);
  }
  var D = "undefined" != typeof TextDecoder && new TextDecoder();
  try {
    D.decode(x, { stream: !0 }), 1;
  } catch (r) {}
  function T(r, e) {
    if (e) {
      for (var t = "", n = 0; n < r.length; n += 16384)
        t += String.fromCharCode.apply(null, r.subarray(n, n + 16384));
      return t;
    }
    if (D) return D.decode(r);
    var o = (function (r) {
        for (var e = "", t = 0; ; ) {
          var n = r[t++],
            o = (n > 127) + (n > 223) + (n > 239);
          if (t + o > r.length) return [e, A(r, t - 1)];
          o
            ? 3 == o
              ? ((n =
                  (((15 & n) << 18) |
                    ((63 & r[t++]) << 12) |
                    ((63 & r[t++]) << 6) |
                    (63 & r[t++])) -
                  65536),
                (e += String.fromCharCode(
                  55296 | (n >> 10),
                  56320 | (1023 & n)
                )))
              : (e +=
                  1 & o
                    ? String.fromCharCode(((31 & n) << 6) | (63 & r[t++]))
                    : String.fromCharCode(
                        ((15 & n) << 12) | ((63 & r[t++]) << 6) | (63 & r[t++])
                      ))
            : (e += String.fromCharCode(n));
        }
      })(r),
      a = o[0];
    return o[1].length && E(8), a;
  }
  var N = function (r, e) {
      return e + 30 + I(r, e + 26) + I(r, e + 28);
    },
    C = function (r, e, t) {
      var n = I(r, e + 28),
        o = T(r.subarray(e + 46, e + 46 + n), !(2048 & I(r, e + 8))),
        a = e + 46 + n,
        i = k(r, e + 20),
        u = t && 4294967295 == i ? F(r, a) : [i, k(r, e + 24), k(r, e + 42)],
        l = u[0],
        f = u[1],
        c = u[2];
      return [I(r, e + 10), l, f, o, a + I(r, e + 30) + I(r, e + 32), c];
    },
    F = function (r, e) {
      for (; 1 != I(r, e); e += 4 + I(r, e + 2));
      return [P(r, e + 12), P(r, e + 4), P(r, e + 20)];
    };
  function U(r) {
    return r instanceof File || r instanceof Blob
      ? r.arrayBuffer().then(M)
      : M(r);
  }
  function M(r) {
    var t = (function (r, t) {
      for (var n = {}, o = r.length - 22; 101010256 != k(r, o); --o)
        (!o || r.length - o > 65558) && E(13);
      var a = I(r, o + 8);
      if (!a) return {};
      var i = k(r, o + 16),
        u = 4294967295 == i;
      u &&
        ((o = k(r, o - 12)),
        101075792 != k(r, o) && E(13),
        (a = k(r, o + 32)),
        (i = k(r, o + 48)));
      for (var l = t && t.filter, f = 0; f < a; ++f) {
        var c = C(r, i, u),
          s = c[0],
          v = c[1],
          d = c[2],
          p = c[3],
          m = c[4],
          y = c[5],
          b = N(r, y);
        (i = m),
          (l && !l({ name: p, size: v, originalSize: d, compression: s })) ||
            (s
              ? 8 == s
                ? (n[p] = _(r.subarray(b, b + v), new e(d)))
                : E(14, "unknown compression type " + s)
              : (n[p] = A(r, b, b + v)));
      }
      return n;
    })(new Uint8Array(r));
    return Promise.resolve(
      (function (r) {
        for (var e = [], t = 0, n = Object.keys(r); t < n.length; t++) {
          var o = n[t];
          e[o] = T(r[o]);
        }
        return e;
      })(t)
    );
  }
  function $(r, e) {
    for (var t = 0; t < r.childNodes.length; ) {
      var n = r.childNodes[t];
      if (1 === n.nodeType && B(n) === e) return n;
      t++;
    }
  }
  function z(r, e) {
    for (var t = [], n = 0; n < r.childNodes.length; ) {
      var o = r.childNodes[n];
      1 === o.nodeType && B(o) === e && t.push(o), n++;
    }
    return t;
  }
  function R(r, e, t) {
    for (var n = 0; n < r.childNodes.length; ) {
      var o = r.childNodes[n];
      e ? 1 === o.nodeType && B(o) === e && t(o, n) : t(o, n), n++;
    }
  }
  var L = /.+\:/;
  function B(r) {
    return r.tagName.replace(L, "");
  }
  function V(r) {
    if (1 !== r.nodeType) return r.textContent;
    for (var e = "<" + B(r), t = 0; t < r.attributes.length; )
      (e += " " + r.attributes[t].name + '="' + r.attributes[t].value + '"'),
        t++;
    e += ">";
    for (var n = 0; n < r.childNodes.length; ) (e += V(r.childNodes[n])), n++;
    return (e += "</" + B(r) + ">");
  }
  function X(r) {
    var e,
      t,
      n = r.documentElement;
    return (
      (e = function (r) {
        var e = $(r, "t");
        if (e) return e.textContent;
        var t = "";
        return (
          R(r, "r", function (r) {
            t += $(r, "t").textContent;
          }),
          t
        );
      }),
      (t = []),
      R(n, "si", function (r, n) {
        t.push(e(r, n));
      }),
      t
    );
  }
  function Z(r, e) {
    var t = e.createDocument(r),
      n = {},
      o = $(t.documentElement, "workbookPr");
    o && "1" === o.getAttribute("date1904") && (n.epoch1904 = !0),
      (n.sheets = []);
    return (
      (function (r) {
        return z($(r.documentElement, "sheets"), "sheet");
      })(t).forEach(function (r) {
        r.getAttribute("name") &&
          n.sheets.push({
            id: r.getAttribute("sheetId"),
            name: r.getAttribute("name"),
            relationId: r.getAttribute("r:id"),
          });
      }),
      n
    );
  }
  function G(r, e) {
    var t = e.createDocument(r),
      n = { sheets: {}, sharedStrings: void 0, styles: void 0 };
    return (
      (function (r) {
        return z(r.documentElement, "Relationship");
      })(t).forEach(function (r) {
        var e = r.getAttribute("Target");
        switch (r.getAttribute("Type")) {
          case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles":
            n.styles = Y(e);
            break;
          case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings":
            n.sharedStrings = Y(e);
            break;
          case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet":
            n.sheets[r.getAttribute("Id")] = Y(e);
        }
      }),
      n
    );
  }
  function Y(r) {
    return "/" === r[0] ? r.slice("/".length) : "xl/" + r;
  }
  function q(r, e) {
    var t = Object.keys(r);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(r);
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable;
        })),
        t.push.apply(t, n);
    }
    return t;
  }
  function W(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? q(Object(t), !0).forEach(function (e) {
            H(r, e, t[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t))
        : q(Object(t)).forEach(function (e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(t, e));
          });
    }
    return r;
  }
  function H(r, e, t) {
    return (
      e in r
        ? Object.defineProperty(r, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (r[e] = t),
      r
    );
  }
  function J(r, e) {
    if (!r) return {};
    var t,
      n,
      o = e.createDocument(r),
      a = ((t = o),
      (n = $(t.documentElement, "cellStyleXfs")),
      n ? z(n, "xf") : []).map(Q),
      i = (function (r) {
        var e = $(r.documentElement, "numFmts");
        return e ? z(e, "numFmt") : [];
      })(o)
        .map(K)
        .reduce(function (r, e) {
          return (r[e.id] = e), r;
        }, []);
    return (function (r) {
      var e = $(r.documentElement, "cellXfs");
      return e ? z(e, "xf") : [];
    })(o).map(function (r) {
      return r.hasAttribute("xfId") ? W(W({}, a[r.xfId]), Q(r, i)) : Q(r, i);
    });
  }
  function K(r) {
    return {
      id: r.getAttribute("numFmtId"),
      template: r.getAttribute("formatCode"),
    };
  }
  function Q(r, e) {
    var t = {};
    if (r.hasAttribute("numFmtId")) {
      var n = r.getAttribute("numFmtId");
      e[n] ? (t.numberFormat = e[n]) : (t.numberFormat = { id: n });
    }
    return t;
  }
  function rr(r, e) {
    return r ? X(e.createDocument(r)) : [];
  }
  function er(r, e) {
    e && e.epoch1904 && (r += 1462);
    return new Date(Math.round(24 * (r - 25569) * 36e5));
  }
  function tr(r, e) {
    var t =
      ("undefined" != typeof Symbol && r[Symbol.iterator]) || r["@@iterator"];
    if (t) return (t = t.call(r)).next.bind(t);
    if (
      Array.isArray(r) ||
      (t = (function (r, e) {
        if (!r) return;
        if ("string" == typeof r) return nr(r, e);
        var t = Object.prototype.toString.call(r).slice(8, -1);
        "Object" === t && r.constructor && (t = r.constructor.name);
        if ("Map" === t || "Set" === t) return Array.from(r);
        if (
          "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        )
          return nr(r, e);
      })(r)) ||
      (e && r && "number" == typeof r.length)
    ) {
      t && (r = t);
      var n = 0;
      return function () {
        return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  function nr(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function or(r, e, t, n) {
    if (e) {
      var o = t[e];
      if (!o) throw new Error("Cell style not found: ".concat(e));
      if (
        ar.indexOf(parseInt(o.numberFormat.id)) >= 0 ||
        (n.dateFormat && o.numberFormat.template === n.dateFormat) ||
        (!1 !== n.smartDateParser &&
          o.numberFormat.template &&
          (function (r) {
            for (
              var e,
                t = tr(
                  (r = (r = (r = r.toLowerCase()).replace(ir, "")).replace(
                    ur,
                    ""
                  )).split(/\W+/)
                );
              !(e = t()).done;

            ) {
              var n = e.value;
              if (lr.indexOf(n) < 0) return !1;
            }
            return !0;
          })(o.numberFormat.template))
      )
        return !0;
    }
  }
  var ar = [14, 15, 16, 17, 18, 19, 20, 21, 22, 27, 30, 36, 45, 46, 47, 50, 57],
    ir = /^\[\$-414\]/,
    ur = /;@$/;
  var lr = [
    "ss",
    "mm",
    "h",
    "hh",
    "am",
    "pm",
    "d",
    "dd",
    "m",
    "mm",
    "mmm",
    "mmmm",
    "yy",
    "yyyy",
    "e",
  ];
  function fr(r, e, t) {
    var n = t.getInlineStringValue,
      o = t.getInlineStringXml,
      a = t.getStyleId,
      i = t.styles,
      u = t.values,
      l = t.properties,
      f = t.options;
    switch ((e || (e = "n"), e)) {
      case "str":
        r = cr(r, f);
        break;
      case "inlineStr":
        if (void 0 === (r = n()))
          throw new Error(
            'Unsupported "inline string" cell value structure: '.concat(o())
          );
        r = cr(r, f);
        break;
      case "s":
        var c = Number(r);
        if (isNaN(c))
          throw new Error('Invalid "shared" string index: '.concat(r));
        if (c >= u.length)
          throw new Error('An out-of-bounds "shared" string index: '.concat(r));
        r = cr((r = u[c]), f);
        break;
      case "b":
        if ("1" === r) r = !0;
        else {
          if ("0" !== r)
            throw new Error('Unsupported "boolean" cell value: '.concat(r));
          r = !1;
        }
        break;
      case "z":
        r = void 0;
        break;
      case "e":
        r = (function (r) {
          switch (r) {
            case 0:
              return "#NULL!";
            case 7:
              return "#DIV/0!";
            case 15:
              return "#VALUE!";
            case 23:
              return "#REF!";
            case 29:
              return "#NAME?";
            case 36:
              return "#NUM!";
            case 42:
              return "#N/A";
            case 43:
              return "#GETTING_DATA";
            default:
              return "#ERROR_".concat(r);
          }
        })(r);
        break;
      case "d":
        if (void 0 === r) break;
        var s = new Date(r);
        if (isNaN(s.valueOf()))
          throw new Error('Unsupported "date" cell value: '.concat(r));
        r = s;
        break;
      case "n":
        if (void 0 === r) break;
        var v = Number(r);
        if (isNaN(v))
          throw new Error('Invalid "numeric" cell value: '.concat(r));
        (r = v), or(0, a(), i, f) && (r = er(r, l));
        break;
      default:
        throw new TypeError("Cell type not supported: ".concat(e));
    }
    return void 0 === r && (r = null), r;
  }
  function cr(r, e) {
    return !1 !== e.trim && (r = r.trim()), "" === r && (r = void 0), r;
  }
  var sr = [
    "",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  function vr(r) {
    for (var e = 0, t = 0; t < r.length; )
      (e *= 26), (e += sr.indexOf(r[t])), t++;
    return e;
  }
  function dr(r) {
    return (r = r.split(/(\d+)/)), [parseInt(r[1]), vr(r[0].trim())];
  }
  function pr(r, e, t, n, o, a, i) {
    var u,
      l = dr(r.getAttribute("r")),
      f = (function (r, e) {
        return $(e, "v");
      })(0, r),
      c = f && f.textContent;
    return (
      r.hasAttribute("t") && (u = r.getAttribute("t")),
      {
        row: l[0],
        column: l[1],
        value: fr(c, u, {
          getInlineStringValue: function () {
            return (function (r, e) {
              if (
                e.firstChild &&
                "is" === B(e.firstChild) &&
                e.firstChild.firstChild &&
                "t" === B(e.firstChild.firstChild)
              )
                return e.firstChild.firstChild.textContent;
            })(0, r);
          },
          getInlineStringXml: function () {
            return V(r);
          },
          getStyleId: function () {
            return r.getAttribute("s");
          },
          styles: o,
          values: n,
          properties: a,
          options: i,
        }),
      }
    );
  }
  function mr(r, e, t, n, o, a) {
    var i = (function (r) {
      var e = $(r.documentElement, "sheetData"),
        t = [];
      return (
        R(e, "row", function (r) {
          R(r, "c", function (r) {
            t.push(r);
          });
        }),
        t
      );
    })(r);
    return 0 === i.length
      ? []
      : i.map(function (r) {
          return pr(r, 0, 0, t, n, o, a);
        });
  }
  function yr(r, e) {
    return (
      (function (r) {
        if (Array.isArray(r)) return r;
      })(r) ||
      (function (r, e) {
        var t =
          null == r
            ? null
            : ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
              r["@@iterator"];
        if (null == t) return;
        var n,
          o,
          a = [],
          i = !0,
          u = !1;
        try {
          for (
            t = t.call(r);
            !(i = (n = t.next()).done) &&
            (a.push(n.value), !e || a.length !== e);
            i = !0
          );
        } catch (r) {
          (u = !0), (o = r);
        } finally {
          try {
            i || null == t.return || t.return();
          } finally {
            if (u) throw o;
          }
        }
        return a;
      })(r, e) ||
      (function (r, e) {
        if (!r) return;
        if ("string" == typeof r) return br(r, e);
        var t = Object.prototype.toString.call(r).slice(8, -1);
        "Object" === t && r.constructor && (t = r.constructor.name);
        if ("Map" === t || "Set" === t) return Array.from(r);
        if (
          "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        )
          return br(r, e);
      })(r, e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function br(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function hr(r) {
    var e = (function (r) {
      var e = $(r.documentElement, "dimension");
      if (e) return e.getAttribute("ref");
    })(r);
    if (e)
      return (
        1 ===
          (e = e
            .split(":")
            .map(dr)
            .map(function (r) {
              var e = yr(r, 2);
              return { row: e[0], column: e[1] };
            })).length && (e = [e[0], e[0]]),
        e
      );
  }
  function gr(r, e, t, n, o, a) {
    var i = e.createDocument(r),
      u = mr(i, 0, t, n, o, a),
      l =
        hr(i) ||
        (function (r) {
          var e = function (r, e) {
              return r - e;
            },
            t = r
              .map(function (r) {
                return r.row;
              })
              .sort(e),
            n = r
              .map(function (r) {
                return r.column;
              })
              .sort(e),
            o = t[0],
            a = t[t.length - 1];
          return [
            { row: o, column: n[0] },
            { row: a, column: n[n.length - 1] },
          ];
        })(u);
    return { cells: u, dimensions: l };
  }
  function wr(r, e) {
    var t =
      ("undefined" != typeof Symbol && r[Symbol.iterator]) || r["@@iterator"];
    if (t) return (t = t.call(r)).next.bind(t);
    if (
      Array.isArray(r) ||
      (t = (function (r, e) {
        if (!r) return;
        if ("string" == typeof r) return Or(r, e);
        var t = Object.prototype.toString.call(r).slice(8, -1);
        "Object" === t && r.constructor && (t = r.constructor.name);
        if ("Map" === t || "Set" === t) return Array.from(r);
        if (
          "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        )
          return Or(r, e);
      })(r)) ||
      (e && r && "number" == typeof r.length)
    ) {
      t && (r = t);
      var n = 0;
      return function () {
        return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  function Or(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function Sr(r, e) {
    var t =
      ("undefined" != typeof Symbol && r[Symbol.iterator]) || r["@@iterator"];
    if (t) return (t = t.call(r)).next.bind(t);
    if (
      Array.isArray(r) ||
      (t = (function (r, e) {
        if (!r) return;
        if ("string" == typeof r) return Ar(r, e);
        var t = Object.prototype.toString.call(r).slice(8, -1);
        "Object" === t && r.constructor && (t = r.constructor.name);
        if ("Map" === t || "Set" === t) return Array.from(r);
        if (
          "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        )
          return Ar(r, e);
      })(r)) ||
      (e && r && "number" == typeof r.length)
    ) {
      t && (r = t);
      var n = 0;
      return function () {
        return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  function Ar(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function jr(r, e) {
    return (
      (function (r) {
        if (Array.isArray(r)) return r;
      })(r) ||
      (function (r, e) {
        var t =
          null == r
            ? null
            : ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
              r["@@iterator"];
        if (null == t) return;
        var n,
          o,
          a = [],
          i = !0,
          u = !1;
        try {
          for (
            t = t.call(r);
            !(i = (n = t.next()).done) &&
            (a.push(n.value), !e || a.length !== e);
            i = !0
          );
        } catch (r) {
          (u = !0), (o = r);
        } finally {
          try {
            i || null == t.return || t.return();
          } finally {
            if (u) throw o;
          }
        }
        return a;
      })(r, e) ||
      Er(r, e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function Er(r, e) {
    if (r) {
      if ("string" == typeof r) return xr(r, e);
      var t = Object.prototype.toString.call(r).slice(8, -1);
      return (
        "Object" === t && r.constructor && (t = r.constructor.name),
        "Map" === t || "Set" === t
          ? Array.from(r)
          : "Arguments" === t ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
          ? xr(r, e)
          : void 0
      );
    }
  }
  function xr(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function Ir(r, e) {
    var t = r.dimensions,
      n = r.cells;
    if (0 === n.length) return [];
    var o = jr(t, 2);
    o[0];
    for (
      var a = o[1], i = a.column, u = a.row, l = new Array(u), f = 0;
      f < u;

    ) {
      l[f] = new Array(i);
      for (var c = 0; c < i; ) (l[f][c] = null), c++;
      f++;
    }
    for (
      var s,
        v = (function (r, e) {
          var t =
            ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
            r["@@iterator"];
          if (t) return (t = t.call(r)).next.bind(t);
          if (
            Array.isArray(r) ||
            (t = Er(r)) ||
            (e && r && "number" == typeof r.length)
          ) {
            t && (r = t);
            var n = 0;
            return function () {
              return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] };
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })(n);
      !(s = v()).done;

    ) {
      var d = s.value,
        p = d.row - 1,
        m = d.column - 1;
      m < i && p < u && (l[p][m] = d.value);
    }
    var y = e.rowMap;
    if (y) for (var b = 0; b < l.length; ) (y[b] = b), b++;
    return (
      (l = (function (r) {
        for (
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            t = e.rowMap,
            n = e.accessor,
            o =
              void 0 === n
                ? function (r) {
                    return r;
                  }
                : n,
            a = e.onlyTrimAtTheEnd,
            i = r.length - 1;
          i >= 0;

        ) {
          for (var u, l = !0, f = wr(r[i]); !(u = f()).done; ) {
            if (null !== o(u.value)) {
              l = !1;
              break;
            }
          }
          if (l) r.splice(i, 1), t && t.splice(i, 1);
          else if (a) break;
          i--;
        }
        return r;
      })(
        (function (r) {
          for (
            var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              t = e.accessor,
              n =
                void 0 === t
                  ? function (r) {
                      return r;
                    }
                  : t,
              o = e.onlyTrimAtTheEnd,
              a = r[0].length - 1;
            a >= 0;

          ) {
            for (var i, u = !0, l = Sr(r); !(i = l()).done; ) {
              if (null !== n(i.value[a])) {
                u = !1;
                break;
              }
            }
            if (u) for (var f = 0; f < r.length; ) r[f].splice(a, 1), f++;
            else if (o) break;
            a--;
          }
          return r;
        })(l, { onlyTrimAtTheEnd: !0 }),
        { onlyTrimAtTheEnd: !0, rowMap: y }
      )),
      e.transformData && (l = e.transformData(l)),
      l
    );
  }
  function kr(r, e) {
    var t =
      ("undefined" != typeof Symbol && r[Symbol.iterator]) || r["@@iterator"];
    if (t) return (t = t.call(r)).next.bind(t);
    if (
      Array.isArray(r) ||
      (t = (function (r, e) {
        if (!r) return;
        if ("string" == typeof r) return Pr(r, e);
        var t = Object.prototype.toString.call(r).slice(8, -1);
        "Object" === t && r.constructor && (t = r.constructor.name);
        if ("Map" === t || "Set" === t) return Array.from(r);
        if (
          "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        )
          return Pr(r, e);
      })(r)) ||
      (e && r && "number" == typeof r.length)
    ) {
      t && (r = t);
      var n = 0;
      return function () {
        return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  function Pr(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function _r(r, e) {
    var t = Object.keys(r);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(r);
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable;
        })),
        t.push.apply(t, n);
    }
    return t;
  }
  function Dr(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? _r(Object(t), !0).forEach(function (e) {
            Tr(r, e, t[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t))
        : _r(Object(t)).forEach(function (e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(t, e));
          });
    }
    return r;
  }
  function Tr(r, e, t) {
    return (
      e in r
        ? Object.defineProperty(r, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (r[e] = t),
      r
    );
  }
  function Nr(r, e) {
    if ("number" == typeof r) {
      var t = e[r - 1];
      return t && t.relationId;
    }
    for (var n, o = kr(e); !(n = o()).done; ) {
      var a = n.value;
      if (a.name === r) return a.relationId;
    }
  }
  function Cr(r, e) {
    var t =
      e &&
      e
        .map(function (r, e) {
          return '"'.concat(r.name, '" (#').concat(e + 1, ")");
        })
        .join(", ");
    return new Error(
      "Sheet "
        .concat(
          "number" == typeof r ? "#" + r : '"' + r + '"',
          " not found in the *.xlsx file."
        )
        .concat(e ? " Available sheets: " + t + "." : "")
    );
  }
  function Fr() {}
  function Ur() {}
  var Mr =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)*(?:[a-z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  function $r() {}
  var zr = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  function Rr(r, e) {
    return (
      (function (r) {
        if (Array.isArray(r)) return r;
      })(r) ||
      (function (r, e) {
        var t =
          null == r
            ? null
            : ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
              r["@@iterator"];
        if (null == t) return;
        var n,
          o,
          a = [],
          i = !0,
          u = !1;
        try {
          for (
            t = t.call(r);
            !(i = (n = t.next()).done) &&
            (a.push(n.value), !e || a.length !== e);
            i = !0
          );
        } catch (r) {
          (u = !0), (o = r);
        } finally {
          try {
            i || null == t.return || t.return();
          } finally {
            if (u) throw o;
          }
        }
        return a;
      })(r, e) ||
      Br(r, e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function Lr(r) {
    return (Lr =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (r) {
            return typeof r;
          }
        : function (r) {
            return r &&
              "function" == typeof Symbol &&
              r.constructor === Symbol &&
              r !== Symbol.prototype
              ? "symbol"
              : typeof r;
          })(r);
  }
  function Br(r, e) {
    if (r) {
      if ("string" == typeof r) return Vr(r, e);
      var t = Object.prototype.toString.call(r).slice(8, -1);
      return (
        "Object" === t && r.constructor && (t = r.constructor.name),
        "Map" === t || "Set" === t
          ? Array.from(r)
          : "Arguments" === t ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
          ? Vr(r, e)
          : void 0
      );
    }
  }
  function Vr(r, e) {
    (null == e || e > r.length) && (e = r.length);
    for (var t = 0, n = new Array(e); t < e; t++) n[t] = r[t];
    return n;
  }
  function Xr(r, e) {
    var t = Object.keys(r);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(r);
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable;
        })),
        t.push.apply(t, n);
    }
    return t;
  }
  function Zr(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? Xr(Object(t), !0).forEach(function (e) {
            Gr(r, e, t[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t))
        : Xr(Object(t)).forEach(function (e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(t, e));
          });
    }
    return r;
  }
  function Gr(r, e, t) {
    return (
      e in r
        ? Object.defineProperty(r, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (r[e] = t),
      r
    );
  }
  var Yr = { isColumnOriented: !1 };
  function qr(r, e, t) {
    var n = (t = t ? Zr(Zr({}, Yr), t) : Yr),
      o = n.isColumnOriented,
      a = n.rowMap,
      i = n.ignoreEmptyRows;
    !(function (r) {
      for (var e = 0, t = Object.keys(r); e < t.length; e++) {
        var n = t[e];
        if (!r[n].prop)
          throw new Error(
            '"prop" not defined for schema entry "'.concat(n, '".')
          );
      }
    })(e),
      o && (r = Qr(r));
    for (var u = r[0], l = [], f = [], c = 1; c < r.length; c++) {
      var s = Wr(e, r[c], c, u, f, t);
      (null === s && !1 !== i) || l.push(s);
    }
    if (a)
      for (
        var v,
          d = (function (r, e) {
            var t =
              ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
              r["@@iterator"];
            if (t) return (t = t.call(r)).next.bind(t);
            if (
              Array.isArray(r) ||
              (t = Br(r)) ||
              (e && r && "number" == typeof r.length)
            ) {
              t && (r = t);
              var n = 0;
              return function () {
                return n >= r.length
                  ? { done: !0 }
                  : { done: !1, value: r[n++] };
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })(f);
        !(v = d()).done;

      ) {
        var p = v.value;
        p.row = a[p.row - 1] + 1;
      }
    return { rows: l, errors: f };
  }
  function Wr(r, e, t, n, o, a) {
    for (
      var i = {},
        u = !0,
        l = function () {
          var l = c[f],
            s = r[l],
            v = "object" === Lr(s.type) && !Array.isArray(s.type),
            d = e[n.indexOf(l)];
          void 0 === d && (d = null);
          var p = void 0,
            m = void 0,
            y = void 0;
          if (v) p = Wr(s.type, e, t, n, o, a);
          else if (null === d) p = null;
          else if (Array.isArray(s.type)) {
            var b = !1,
              h = (function (r) {
                var e = [],
                  t = 0;
                for (; t < r.length; ) {
                  var n = Rr(Kr(r, ",", t), 2),
                    o = n[0];
                  (t += n[1] + ",".length), e.push(o.trim());
                }
                return e;
              })(d).map(function (r) {
                var e = Hr(r, s, a);
                return (
                  e.error && ((p = r), (m = e.error), (y = e.reason)),
                  null !== e.value && (b = !0),
                  e.value
                );
              });
            m || (p = b ? h : null);
          } else {
            var g = Hr(d, s, a);
            (m = g.error), (y = g.reason), (p = m ? d : g.value);
          }
          !m && null === p && s.required && (m = "required"),
            m
              ? ((m = { error: m, row: t + 1, column: l, value: p }),
                y && (m.reason = y),
                s.type && (m.type = s.type),
                o.push(m))
              : (u && null !== p && (u = !1),
                (null !== p || a.includeNullValues) && (i[s.prop] = p));
        },
        f = 0,
        c = Object.keys(r);
      f < c.length;
      f++
    )
      l();
    return u ? null : i;
  }
  function Hr(r, e, t) {
    if (null === r) return { value: null };
    var n;
    if (
      (n = e.parse
        ? Jr(r, e.parse)
        : e.type
        ? (function (r, e, t) {
            switch (e) {
              case String:
                return "string" == typeof r
                  ? { value: r }
                  : "number" == typeof r
                  ? isNaN(r)
                    ? { error: "invalid", reason: "invalid_number" }
                    : isFinite(r)
                    ? { value: String(r) }
                    : { error: "invalid", reason: "out_of_bounds" }
                  : { error: "invalid", reason: "not_a_string" };
              case Number:
              case Fr:
                if ("string" == typeof r) {
                  var n = r;
                  if (((r = Number(r)), String(r) !== n))
                    return { error: "invalid", reason: "not_a_number" };
                }
                return "number" != typeof r
                  ? { error: "invalid", reason: "not_a_number" }
                  : isNaN(r)
                  ? { error: "invalid", reason: "invalid_number" }
                  : isFinite(r)
                  ? e !== Fr ||
                    (function (r) {
                      return (0 | r) === r;
                    })(r)
                    ? { value: r }
                    : { error: "invalid", reason: "not_an_integer" }
                  : { error: "invalid", reason: "out_of_bounds" };
              case Ur:
                return "string" == typeof r
                  ? (function (r) {
                      return Mr.test(r);
                    })(r)
                    ? { value: r }
                    : { error: "invalid", reason: "not_a_url" }
                  : { error: "invalid", reason: "not_a_string" };
              case $r:
                return "string" == typeof r
                  ? (function (r) {
                      return zr.test(r);
                    })(r)
                    ? { value: r }
                    : { error: "invalid", reason: "not_an_email" }
                  : { error: "invalid", reason: "not_a_string" };
              case Date:
                if (r instanceof Date)
                  return isNaN(r.valueOf())
                    ? { error: "invalid", reason: "out_of_bounds" }
                    : { value: r };
                if ("number" == typeof r) {
                  if (isNaN(r))
                    return { error: "invalid", reason: "invalid_number" };
                  if (!isFinite(r))
                    return { error: "invalid", reason: "out_of_bounds" };
                  var o = er(r, t.properties);
                  return isNaN(o.valueOf())
                    ? { error: "invalid", reason: "out_of_bounds" }
                    : { value: o };
                }
                return { error: "invalid", reason: "not_a_date" };
              case Boolean:
                return "boolean" == typeof r
                  ? { value: r }
                  : { error: "invalid", reason: "not_a_boolean" };
              default:
                if ("function" == typeof e) return Jr(r, e);
                throw new Error(
                  "Unknown schema type: ".concat((e && e.name) || e)
                );
            }
          })(r, Array.isArray(e.type) ? e.type[0] : e.type, t)
        : { value: r }).error
    )
      return n;
    if (null !== n.value) {
      if (e.oneOf && e.oneOf.indexOf(n.value) < 0)
        return { error: "invalid", reason: "unknown" };
      if (e.validate)
        try {
          e.validate(n.value);
        } catch (r) {
          return { error: r.message };
        }
    }
    return n;
  }
  function Jr(r, e) {
    try {
      return void 0 === (r = e(r)) ? { value: null } : { value: r };
    } catch (r) {
      return { error: r.message };
    }
  }
  function Kr(r, e, t) {
    for (var n = 0, o = ""; t + n < r.length; ) {
      var a = r[t + n];
      if (a === e) return [o, n];
      if ('"' === a) {
        var i = Kr(r, '"', t + n + 1);
        (o += i[0]), (n += '"'.length + i[1] + '"'.length);
      } else (o += a), n++;
    }
    return [o, n];
  }
  var Qr = function (r) {
    return r[0].map(function (e, t) {
      return r.map(function (r) {
        return r[t];
      });
    });
  };
  function re(r) {
    return (re =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (r) {
            return typeof r;
          }
        : function (r) {
            return r &&
              "function" == typeof Symbol &&
              r.constructor === Symbol &&
              r !== Symbol.prototype
              ? "symbol"
              : typeof r;
          })(r);
  }
  function ee(r) {
    for (var e = {}, t = 0, n = Object.keys(r); t < n.length; t++) {
      var o = n[t],
        a = r[o],
        i = void 0;
      "object" === re(a) && ((a = Object.keys(r[o])[0]), (i = ee(r[o][a]))),
        (e[o] = { prop: a }),
        i && (e[o].type = i);
    }
    return e;
  }
  var te = ["schema", "map"];
  function ne(r, e) {
    var t = Object.keys(r);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(r);
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable;
        })),
        t.push.apply(t, n);
    }
    return t;
  }
  function oe(r) {
    for (var e = 1; e < arguments.length; e++) {
      var t = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? ne(Object(t), !0).forEach(function (e) {
            ae(r, e, t[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t))
        : ne(Object(t)).forEach(function (e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(t, e));
          });
    }
    return r;
  }
  function ae(r, e, t) {
    return (
      e in r
        ? Object.defineProperty(r, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (r[e] = t),
      r
    );
  }
  function ie(r, e) {
    if (null == r) return {};
    var t,
      n,
      o = (function (r, e) {
        if (null == r) return {};
        var t,
          n,
          o = {},
          a = Object.keys(r);
        for (n = 0; n < a.length; n++)
          (t = a[n]), e.indexOf(t) >= 0 || (o[t] = r[t]);
        return o;
      })(r, e);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(r);
      for (n = 0; n < a.length; n++)
        (t = a[n]),
          e.indexOf(t) >= 0 ||
            (Object.prototype.propertyIsEnumerable.call(r, t) && (o[t] = r[t]));
    }
    return o;
  }
  function ue(r, e, t) {
    var n = t.schema,
      o = t.map,
      a = ie(t, te);
    !n && o && (n = ee(o));
    var i = (function (r, e) {
      var t =
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      t.sheet || (t = Dr({ sheet: 1 }, t));
      var n = function (e) {
          if (!r[e])
            throw new Error(
              '"'.concat(
                e,
                '" file not found inside the *.xlsx file zip archive'
              )
            );
          return r[e];
        },
        o = G(n("xl/_rels/workbook.xml.rels"), e),
        a = o.sharedStrings ? rr(n(o.sharedStrings), e) : [],
        i = o.styles ? J(n(o.styles), e) : {},
        u = Z(n("xl/workbook.xml"), e);
      if (t.getSheets)
        return u.sheets.map(function (r) {
          return { name: r.name };
        });
      var l = Nr(t.sheet, u.sheets);
      if (!l || !o.sheets[l]) throw Cr(t.sheet, u.sheets);
      var f = Ir(gr(n(o.sheets[l]), e, a, i, u, t), t);
      return t.properties ? { data: f, properties: u } : f;
    })(r, e, oe(oe({}, a), {}, { properties: n || a.properties }));
    return n
      ? qr(i.data, n, oe(oe({}, a), {}, { properties: i.properties }))
      : i;
  }
  return function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return U(e).then(function (e) {
      return ue(e, r, t);
    });
  };
});
//# sourceMappingURL=read-excel-file.min.js.map
