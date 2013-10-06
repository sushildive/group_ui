// JavaScript Document

(function ($) {
    $.cookie = function (key, value, options) {
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);
            if (value === null || value === undefined) {
                options.expires = -1;
            }
            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = String(value);
            return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
        }
        options = value || {};
        var decode = options.raw ? function (s) {
                return s;
            } : decodeURIComponent;
        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || '');
        }
        return null;
    };
})(jQuery);
(function (j) {
    function A(a) {
        return a.replace(B, h).replace(C, function (a, d, b) {
            for (var a = b.split(","), b = 0, e = a.length; b < e; b++) {
                var s = D(a[b].replace(E, h).replace(F, h)) + o,
                    l = [];
                a[b] = s.replace(G, function (a, b, c, d, e) {
                    if (b) {
                        if (l.length > 0) {
                            var a = l,
                                f, e = s.substring(0, e).replace(H, i);
                            if (e == i || e.charAt(e.length - 1) == o) e += "*";
                            try {
                                f = t(e)
                            } catch (k) {}
                            if (f) {
                                e = 0;
                                for (c = f.length; e < c; e++) {
                                    for (var d = f[e], h = d.className, j = 0, m = a.length; j < m; j++) {
                                        var g = a[j];
                                        if (!RegExp("(^|\\s)" + g.className + "(\\s|$)").test(d.className) && g.b && (g.b === !0 || g.b(d) === !0)) h = u(h, g.className, !0)
                                    }
                                    d.className = h
                                }
                            }
                            l = []
                        }
                        return b
                    } else {
                        if (b = c ? I(c) : !v || v.test(d) ? {
                            className: w(d),
                            b: !0
                        } : null) return l.push(b), "." + b.className;
                        return a
                    }
                })
            }
            return d + a.join(",")
        })
    }
    function I(a) {
        var c = !0,
            d = w(a.slice(1)),
            b = a.substring(0, 5) == ":not(",
            e, f;
        b && (a = a.slice(5, -1));
        var l = a.indexOf("(");
        l > -1 && (a = a.substring(0, l));
        if (a.charAt(0) == ":") switch (a.slice(1)) {
                case "root":
                    c = function (a) {
                        return b ? a != p : a == p
                    };
                    break;
                case "target":
                    if (m == 8) {
                        c = function (a) {
                            function c() {
                                var d = location.hash,
                                    e = d.slice(1);
                                return b ? d == i || a.id != e : d != i && a.id == e
                            }
                            k(j, "hashchange", function () {
                                g(a, d, c())
                            });
                            return c()
                        };
                        break
                    }
                    return !1;
                case "checked":
                    c = function (a) {
                        J.test(a.type) && k(a, "propertychange", function () {
                            event.propertyName == "checked" && g(a, d, a.checked !== b)
                        });
                        return a.checked !== b
                    };
                    break;
                case "disabled":
                    b = !b;
                case "enabled":
                    c = function (c) {
                        if (K.test(c.tagName)) return k(c, "propertychange", function () {
                                event.propertyName == "$disabled" && g(c, d, c.a === b)
                            }), q.push(c), c.a = c.disabled, c.disabled === b;
                        return a == ":enabled" ? b : !b
                    };
                    break;
                case "focus":
                    e = "focus", f = "blur";
                case "hover":
                    e || (e = "mouseenter", f = "mouseleave");
                    c = function (a) {
                        k(a, b ? f : e, function () {
                            g(a, d, !0)
                        });
                        k(a, b ? e : f, function () {
                            g(a, d, !1)
                        });
                        return b
                    };
                    break;
                default:
                    if (!L.test(a)) return !1
        }
        return {
            className: d,
            b: c
        }
    }
    function w(a) {
        return M + "-" + (m == 6 && N ? O++ : a.replace(P, function (a) {
            return a.charCodeAt(0)
        }))
    }
    function D(a) {
        return a.replace(x, h).replace(Q, o)
    }
    function g(a, c, d) {
        var b = a.className,
            c = u(b, c, d);
        if (c != b) a.className = c, a.parentNode.className += i
    }
    function u(a, c, d) {
        var b = RegExp("(^|\\s)" + c + "(\\s|$)"),
            e = b.test(a);
        return d ? e ? a : a + o + c : e ? a.replace(b, h).replace(x, h) : a
    }
    function k(a, c, d) {
        a.attachEvent("on" + c, d)
    }
    function r(a, c) {
        if (/^https?:\/\//i.test(a)) return c.substring(0, c.indexOf("/", 8)) == a.substring(0, a.indexOf("/", 8)) ? a : null;
        if (a.charAt(0) == "/") return c.substring(0, c.indexOf("/", 8)) + a;
        var d = c.split(/[?#]/)[0];
        a.charAt(0) != "?" && d.charAt(d.length - 1) != "/" && (d = d.substring(0, d.lastIndexOf("/") + 1));
        return d + a
    }
    function y(a) {
        if (a) return n.open("GET", a, !1), n.send(), (n.status == 200 ? n.responseText : i).replace(R, i).replace(S, function (c, d, b, e, f) {
                return y(r(b || f, a))
            }).replace(T, function (c, d, b) {
                d = d || i;
                return " url(" + d + r(b, a) + d + ") "
            });
        return i
    }
    function U() {
        var a, c;
        a = f.getElementsByTagName("BASE");
        for (var d = a.length > 0 ? a[0].href : f.location.href, b = 0; b < f.styleSheets.length; b++) if (c = f.styleSheets[b], c.href != i && (a = r(c.href, d))) c.cssText = A(y(a));
        q.length > 0 && setInterval(function () {
            for (var a = 0, c = q.length; a < c; a++) {
                var b = q[a];
                if (b.disabled !== b.a) b.disabled ? (b.disabled = !1, b.a = !0, b.disabled = !0) : b.a = b.disabled
            }
        }, 250)
    }
    if (!true) {
        var f = document,
            p = f.documentElement,
            n = function () {
                if (j.XMLHttpRequest) return new XMLHttpRequest;
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (a) {
                    return null
                }
            }(),
            m = /MSIE (\d+)/.exec(navigator.userAgent)[1];
        if (!(f.compatMode != "CSS1Compat" || m < 6 || m > 8 || !n)) {
            var z = {
                NW: "*.Dom.select",
                MooTools: "$$",
                DOMAssistant: "*.$",
                Prototype: "$$",
                YAHOO: "*.util.Selector.query",
                Sizzle: "*",
                jQuery: "*",
                dojo: "*.query"
            }, t, q = [],
                O = 0,
                N = !0,
                M = "slvzr",
                R = /(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*/g,
                S = /@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))[^;]*;/g,
                T = /\burl\(\s*(["']?)(?!data:)([^"')]+)\1\s*\)/g,
                L = /^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/,
                B = /:(:first-(?:line|letter))/g,
                C = /(^|})\s*([^\{]*?[\[:][^{]+)/g,
                G = /([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g,
                H = /(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g,
                P = /[^\w-]/g,
                K = /^(INPUT|SELECT|TEXTAREA|BUTTON)$/,
                J = /^(checkbox|radio)$/,
                v = m > 6 ? /[\$\^*]=(['"])\1/ : null,
                E = /([(\[+~])\s+/g,
                F = /\s+([)\]+~])/g,
                Q = /\s+/g,
                x = /^\s*((?:[\S\s]*\S)?)\s*$/,
                i = "",
                o = " ",
                h = "$1";
            (function (a, c) {
                function d() {
                    try {
                        p.doScroll("left")
                    } catch (a) {
                        setTimeout(d, 50);
                        return
                    }
                    b("poll")
                }
                function b(d) {
                    if (!(d.type == "readystatechange" && f.readyState != "complete") && ((d.type == "load" ? a : f).detachEvent("on" + d.type, b, !1), !e && (e = !0))) c.call(a, d.type || d)
                }
                var e = !1,
                    g = !0;
                if (f.readyState == "complete") c.call(a, i);
                else {
                    if (f.createEventObject && p.doScroll) {
                        try {
                            g = !a.frameElement
                        } catch (h) {}
                        g && d()
                    }
                    k(f, "readystatechange", b);
                    k(a, "load", b)
                }
            })(j, function () {
                for (var a in z) {
                    var c, d, b = j;
                    if (j[a]) {
                        for (c = z[a].replace("*", a).split(".");
                        (d = c.shift()) && (b = b[d]););
                        if (typeof b == "function") {
                            t = b;
                            U();
                            break
                        }
                    }
                }
            })
        }
    }
})(this);
(function () {
    var e = this,
        t = e._,
        n = {}, r = Array.prototype,
        i = Object.prototype,
        s = Function.prototype,
        o = r.push,
        u = r.slice,
        a = r.concat,
        f = r.unshift,
        l = i.toString,
        c = i.hasOwnProperty,
        h = r.forEach,
        p = r.map,
        d = r.reduce,
        v = r.reduceRight,
        m = r.filter,
        g = r.every,
        y = r.some,
        b = r.indexOf,
        w = r.lastIndexOf,
        E = Array.isArray,
        S = Object.keys,
        x = s.bind,
        T = function (e) {
            if (e instanceof T) return e;
            if (!(this instanceof T)) return new T(e);
            this._wrapped = e
        };
    typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = T), exports._ = T) : e._ = T, T.VERSION = "1.4.1";
    var N = T.each = T.forEach = function (e, t, r) {
        if (h && e.forEach === h) e.forEach(t, r);
        else if (e.length === +e.length) {
            for (var i = 0, s = e.length; i < s; i++) if (t.call(r, e[i], i, e) === n) return
        } else for (var o in e) if (T.has(e, o) && t.call(r, e[o], o, e) === n) return
    };
    T.map = T.collect = function (e, t, n) {
        var r = [];
        return p && e.map === p ? e.map(t, n) : (N(e, function (e, i, s) {
            r[r.length] = t.call(n, e, i, s)
        }), r)
    }, T.reduce = T.foldl = T.inject = function (e, t, n, r) {
        var i = arguments.length > 2;
        if (d && e.reduce === d) return r && (t = T.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
        N(e, function (e, s, o) {
            i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
        });
        if (!i) throw new TypeError("Reduce of empty array with no initial value");
        return n
    }, T.reduceRight = T.foldr = function (e, t, n, r) {
        var i = arguments.length > 2;
        if (v && e.reduceRight === v) return r && (t = T.bind(t, r)), arguments.length > 2 ? e.reduceRight(t, n) : e.reduceRight(t);
        var s = e.length;
        if (s !== +s) {
            var o = T.keys(e);
            s = o.length
        }
        N(e, function (u, a, f) {
            a = o ? o[--s] : --s, i ? n = t.call(r, n, e[a], a, f) : (n = e[a], i = !0)
        });
        if (!i) throw new TypeError("Reduce of empty array with no initial value");
        return n
    }, T.find = T.detect = function (e, t, n) {
        var r;
        return C(e, function (e, i, s) {
            if (t.call(n, e, i, s)) return r = e, !0
        }), r
    }, T.filter = T.select = function (e, t, n) {
        var r = [];
        return m && e.filter === m ? e.filter(t, n) : (N(e, function (e, i, s) {
            t.call(n, e, i, s) && (r[r.length] = e)
        }), r)
    }, T.reject = function (e, t, n) {
        var r = [];
        return N(e, function (e, i, s) {
            t.call(n, e, i, s) || (r[r.length] = e)
        }), r
    }, T.every = T.all = function (e, t, r) {
        t || (t = T.identity);
        var i = !0;
        return g && e.every === g ? e.every(t, r) : (N(e, function (e, s, o) {
            if (!(i = i && t.call(r, e, s, o))) return n
        }), !! i)
    };
    var C = T.some = T.any = function (e, t, r) {
        t || (t = T.identity);
        var i = !1;
        return y && e.some === y ? e.some(t, r) : (N(e, function (e, s, o) {
            if (i || (i = t.call(r, e, s, o))) return n
        }), !! i)
    };
    T.contains = T.include = function (e, t) {
        var n = !1;
        return b && e.indexOf === b ? e.indexOf(t) != -1 : (n = C(e, function (e) {
            return e === t
        }), n)
    }, T.invoke = function (e, t) {
        var n = u.call(arguments, 2);
        return T.map(e, function (e) {
            return (T.isFunction(t) ? t : e[t]).apply(e, n)
        })
    }, T.pluck = function (e, t) {
        return T.map(e, function (e) {
            return e[t]
        })
    }, T.where = function (e, t) {
        return T.isEmpty(t) ? [] : T.filter(e, function (e) {
            for (var n in t) if (t[n] !== e[n]) return !1;
            return !0
        })
    }, T.max = function (e, t, n) {
        if (!t && T.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
        if (!t && T.isEmpty(e)) return -Infinity;
        var r = {
            computed: -Infinity
        };
        return N(e, function (e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o >= r.computed && (r = {
                value: e,
                computed: o
            })
        }), r.value
    }, T.min = function (e, t, n) {
        if (!t && T.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
        if (!t && T.isEmpty(e)) return Infinity;
        var r = {
            computed: Infinity
        };
        return N(e, function (e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o < r.computed && (r = {
                value: e,
                computed: o
            })
        }), r.value
    }, T.shuffle = function (e) {
        var t, n = 0,
            r = [];
        return N(e, function (e) {
            t = T.random(n++), r[n - 1] = r[t], r[t] = e
        }), r
    };
    var k = function (e) {
        return T.isFunction(e) ? e : function (t) {
            return t[e]
        }
    };
    T.sortBy = function (e, t, n) {
        var r = k(t);
        return T.pluck(T.map(e, function (e, t, i) {
            return {
                value: e,
                index: t,
                criteria: r.call(n, e, t, i)
            }
        }).sort(function (e, t) {
            var n = e.criteria,
                r = t.criteria;
            if (n !== r) {
                if (n > r || n === void 0) return 1;
                if (n < r || r === void 0) return -1
            }
            return e.index < t.index ? -1 : 1
        }), "value")
    };
    var L = function (e, t, n, r) {
        var i = {}, s = k(t);
        return N(e, function (t, o) {
            var u = s.call(n, t, o, e);
            r(i, u, t)
        }), i
    };
    T.groupBy = function (e, t, n) {
        return L(e, t, n, function (e, t, n) {
            (T.has(e, t) ? e[t] : e[t] = []).push(n)
        })
    }, T.countBy = function (e, t, n) {
        return L(e, t, n, function (e, t, n) {
            T.has(e, t) || (e[t] = 0), e[t]++
        })
    }, T.sortedIndex = function (e, t, n, r) {
        n = n == null ? T.identity : k(n);
        var i = n.call(r, t),
            s = 0,
            o = e.length;
        while (s < o) {
            var u = s + o >>> 1;
            n.call(r, e[u]) < i ? s = u + 1 : o = u
        }
        return s
    }, T.toArray = function (e) {
        return e ? e.length === +e.length ? u.call(e) : T.values(e) : []
    }, T.size = function (e) {
        return e.length === +e.length ? e.length : T.keys(e).length
    }, T.first = T.head = T.take = function (e, t, n) {
        return t != null && !n ? u.call(e, 0, t) : e[0]
    }, T.initial = function (e, t, n) {
        return u.call(e, 0, e.length - (t == null || n ? 1 : t))
    }, T.last = function (e, t, n) {
        return t != null && !n ? u.call(e, Math.max(e.length - t, 0)) : e[e.length - 1]
    }, T.rest = T.tail = T.drop = function (e, t, n) {
        return u.call(e, t == null || n ? 1 : t)
    }, T.compact = function (e) {
        return T.filter(e, function (e) {
            return !!e
        })
    };
    var A = function (e, t, n) {
        return N(e, function (e) {
            T.isArray(e) ? t ? o.apply(n, e) : A(e, t, n) : n.push(e)
        }), n
    };
    T.flatten = function (e, t) {
        return A(e, t, [])
    }, T.without = function (e) {
        return T.difference(e, u.call(arguments, 1))
    }, T.uniq = T.unique = function (e, t, n, r) {
        var i = n ? T.map(e, n, r) : e,
            s = [],
            o = [];
        return N(i, function (n, r) {
            if (t ? !r || o[o.length - 1] !== n : !T.contains(o, n)) o.push(n), s.push(e[r])
        }), s
    }, T.union = function () {
        return T.uniq(a.apply(r, arguments))
    }, T.intersection = function (e) {
        var t = u.call(arguments, 1);
        return T.filter(T.uniq(e), function (e) {
            return T.every(t, function (t) {
                return T.indexOf(t, e) >= 0
            })
        })
    }, T.difference = function (e) {
        var t = a.apply(r, u.call(arguments, 1));
        return T.filter(e, function (e) {
            return !T.contains(t, e)
        })
    }, T.zip = function () {
        var e = u.call(arguments),
            t = T.max(T.pluck(e, "length")),
            n = new Array(t);
        for (var r = 0; r < t; r++) n[r] = T.pluck(e, "" + r);
        return n
    }, T.object = function (e, t) {
        var n = {};
        for (var r = 0, i = e.length; r < i; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
        return n
    }, T.indexOf = function (e, t, n) {
        var r = 0,
            i = e.length;
        if (n) {
            if (typeof n != "number") return r = T.sortedIndex(e, t), e[r] === t ? r : -1;
            r = n < 0 ? Math.max(0, i + n) : n
        }
        if (b && e.indexOf === b) return e.indexOf(t, n);
        for (; r < i; r++) if (e[r] === t) return r;
        return -1
    }, T.lastIndexOf = function (e, t, n) {
        var r = n != null;
        if (w && e.lastIndexOf === w) return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
        var i = r ? n : e.length;
        while (i--) if (e[i] === t) return i;
        return -1
    }, T.range = function (e, t, n) {
        arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
        var r = Math.max(Math.ceil((t - e) / n), 0),
            i = 0,
            s = new Array(r);
        while (i < r) s[i++] = e, e += n;
        return s
    };
    var O = function () {};
    T.bind = function (t, n) {
        var r, i;
        if (t.bind === x && x) return x.apply(t, u.call(arguments, 1));
        if (!T.isFunction(t)) throw new TypeError;
        return i = u.call(arguments, 2), r = function () {
            if (this instanceof r) {
                O.prototype = t.prototype;
                var e = new O,
                    s = t.apply(e, i.concat(u.call(arguments)));
                return Object(s) === s ? s : e
            }
            return t.apply(n, i.concat(u.call(arguments)))
        }
    }, T.bindAll = function (e) {
        var t = u.call(arguments, 1);
        return t.length == 0 && (t = T.functions(e)), N(t, function (t) {
            e[t] = T.bind(e[t], e)
        }), e
    }, T.memoize = function (e, t) {
        var n = {};
        return t || (t = T.identity),
        function () {
            var r = t.apply(this, arguments);
            return T.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
        }
    }, T.delay = function (e, t) {
        var n = u.call(arguments, 2);
        return setTimeout(function () {
            return e.apply(null, n)
        }, t)
    }, T.defer = function (e) {
        return T.delay.apply(T, [e, 1].concat(u.call(arguments, 1)))
    }, T.throttle = function (e, t) {
        var n, r, i, s, o, u, a = T.debounce(function () {
                o = s = !1
            }, t);
        return function () {
            n = this, r = arguments;
            var f = function () {
                i = null, o && (u = e.apply(n, r)), a()
            };
            return i || (i = setTimeout(f, t)), s ? o = !0 : (s = !0, u = e.apply(n, r)), a(), u
        }
    }, T.debounce = function (e, t, n) {
        var r, i;
        return function () {
            var s = this,
                o = arguments,
                u = function () {
                    r = null, n || (i = e.apply(s, o))
                }, a = n && !r;
            return clearTimeout(r), r = setTimeout(u, t), a && (i = e.apply(s, o)), i
        }
    }, T.once = function (e) {
        var t = !1,
            n;
        return function () {
            return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
        }
    }, T.wrap = function (e, t) {
        return function () {
            var n = [e];
            return o.apply(n, arguments), t.apply(this, n)
        }
    }, T.compose = function () {
        var e = arguments;
        return function () {
            var t = arguments;
            for (var n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
            return t[0]
        }
    }, T.after = function (e, t) {
        return e <= 0 ? t() : function () {
            if (--e < 1) return t.apply(this, arguments)
        }
    }, T.keys = S || function (e) {
        if (e !== Object(e)) throw new TypeError("Invalid object");
        var t = [];
        for (var n in e) T.has(e, n) && (t[t.length] = n);
        return t
    }, T.values = function (e) {
        var t = [];
        for (var n in e) T.has(e, n) && t.push(e[n]);
        return t
    }, T.pairs = function (e) {
        var t = [];
        for (var n in e) T.has(e, n) && t.push([n, e[n]]);
        return t
    }, T.invert = function (e) {
        var t = {};
        for (var n in e) T.has(e, n) && (t[e[n]] = n);
        return t
    }, T.functions = T.methods = function (e) {
        var t = [];
        for (var n in e) T.isFunction(e[n]) && t.push(n);
        return t.sort()
    }, T.extend = function (e) {
        return N(u.call(arguments, 1), function (t) {
            for (var n in t) e[n] = t[n]
        }), e
    }, T.pick = function (e) {
        var t = {}, n = a.apply(r, u.call(arguments, 1));
        return N(n, function (n) {
            n in e && (t[n] = e[n])
        }), t
    }, T.omit = function (e) {
        var t = {}, n = a.apply(r, u.call(arguments, 1));
        for (var i in e) T.contains(n, i) || (t[i] = e[i]);
        return t
    }, T.defaults = function (e) {
        return N(u.call(arguments, 1), function (t) {
            for (var n in t) e[n] == null && (e[n] = t[n])
        }), e
    }, T.clone = function (e) {
        return T.isObject(e) ? T.isArray(e) ? e.slice() : T.extend({}, e) : e
    }, T.tap = function (e, t) {
        return t(e), e
    };
    var M = function (e, t, n, r) {
        if (e === t) return e !== 0 || 1 / e == 1 / t;
        if (e == null || t == null) return e === t;
        e instanceof T && (e = e._wrapped), t instanceof T && (t = t._wrapped);
        var i = l.call(e);
        if (i != l.call(t)) return !1;
        switch (i) {
            case "[object String]":
                return e == String(t);
            case "[object Number]":
                return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
            case "[object Date]":
            case "[object Boolean]":
                return +e == +t;
            case "[object RegExp]":
                return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
        }
        if (typeof e != "object" || typeof t != "object") return !1;
        var s = n.length;
        while (s--) if (n[s] == e) return r[s] == t;
        n.push(e), r.push(t);
        var o = 0,
            u = !0;
        if (i == "[object Array]") {
            o = e.length, u = o == t.length;
            if (u) while (o--) if (!(u = M(e[o], t[o], n, r))) break
        } else {
            var a = e.constructor,
                f = t.constructor;
            if (a !== f && !(T.isFunction(a) && a instanceof a && T.isFunction(f) && f instanceof f)) return !1;
            for (var c in e) if (T.has(e, c)) {
                    o++;
                    if (!(u = T.has(t, c) && M(e[c], t[c], n, r))) break
                }
            if (u) {
                for (c in t) if (T.has(t, c) && !(o--)) break;
                u = !o
            }
        }
        return n.pop(), r.pop(), u
    };
    T.isEqual = function (e, t) {
        return M(e, t, [], [])
    }, T.isEmpty = function (e) {
        if (e == null) return !0;
        if (T.isArray(e) || T.isString(e)) return e.length === 0;
        for (var t in e) if (T.has(e, t)) return !1;
        return !0
    }, T.isElement = function (e) {
        return !!e && e.nodeType === 1
    }, T.isArray = E || function (e) {
        return l.call(e) == "[object Array]"
    }, T.isObject = function (e) {
        return e === Object(e)
    }, N(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (e) {
        T["is" + e] = function (t) {
            return l.call(t) == "[object " + e + "]"
        }
    }), T.isArguments(arguments) || (T.isArguments = function (e) {
        return !!e && !! T.has(e, "callee")
    }), typeof / . / != "function" && (T.isFunction = function (e) {
        return typeof e == "function"
    }), T.isFinite = function (e) {
        return T.isNumber(e) && isFinite(e)
    }, T.isNaN = function (e) {
        return T.isNumber(e) && e != +e
    }, T.isBoolean = function (e) {
        return e === !0 || e === !1 || l.call(e) == "[object Boolean]"
    }, T.isNull = function (e) {
        return e === null
    }, T.isUndefined = function (e) {
        return e === void 0
    }, T.has = function (e, t) {
        return c.call(e, t)
    }, T.noConflict = function () {
        return e._ = t, this
    }, T.identity = function (e) {
        return e
    }, T.times = function (e, t, n) {
        for (var r = 0; r < e; r++) t.call(n, r)
    }, T.random = function (e, t) {
        return t == null && (t = e, e = 0), e + (0 | Math.random() * (t - e + 1))
    };
    var _ = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    _.unescape = T.invert(_.escape);
    var D = {
        escape: new RegExp("[" + T.keys(_.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + T.keys(_.unescape).join("|") + ")", "g")
    };
    T.each(["escape", "unescape"], function (e) {
        T[e] = function (t) {
            return t == null ? "" : ("" + t).replace(D[e], function (t) {
                return _[e][t]
            })
        }
    }), T.result = function (e, t) {
        if (e == null) return null;
        var n = e[t];
        return T.isFunction(n) ? n.call(e) : n
    }, T.mixin = function (e) {
        N(T.functions(e), function (t) {
            var n = T[t] = e[t];
            T.prototype[t] = function () {
                var e = [this._wrapped];
                return o.apply(e, arguments), F.call(this, n.apply(T, e))
            }
        })
    };
    var P = 0;
    T.uniqueId = function (e) {
        var t = P++;
        return e ? e + t : t
    }, T.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var H = /(.)^/,
        B = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            " ": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, j = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    T.template = function (e, t, n) {
        n = T.defaults({}, n, T.templateSettings);
        var r = new RegExp([(n.escape || H).source, (n.interpolate || H).source, (n.evaluate || H).source].join("|") + "|$", "g"),
            i = 0,
            s = "__p+='";
        e.replace(r, function (t, n, r, o, u) {
            s += e.slice(i, u).replace(j, function (e) {
                return "\\" + B[e]
            }), s += n ? "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : o ? "';\n" + o + "\n__p+='" : "", i = u + t.length
        }), s += "';\n", n.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
        try {
            var o = new Function(n.variable || "obj", "_", s)
        } catch (u) {
            throw u.source = s, u
        }
        if (t) return o(t, T);
        var a = function (e) {
            return o.call(this, e, T)
        };
        return a.source = "function(" + (n.variable || "obj") + "){\n" + s + "}", a
    }, T.chain = function (e) {
        return T(e).chain()
    };
    var F = function (e) {
        return this._chain ? T(e).chain() : e
    };
    T.mixin(T), N(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
        var t = r[e];
        T.prototype[e] = function () {
            var n = this._wrapped;
            return t.apply(n, arguments), (e == "shift" || e == "splice") && n.length === 0 && delete n[0], F.call(this, n)
        }
    }), N(["concat", "join", "slice"], function (e) {
        var t = r[e];
        T.prototype[e] = function () {
            return F.call(this, t.apply(this._wrapped, arguments))
        }
    }), T.extend(T.prototype, {
        chain: function () {
            return this._chain = !0, this
        },
        value: function () {
            return this._wrapped
        }
    })
}).call(this);
var JSON;
if (!JSON) {
    JSON = {};
}
(function () {
    'use strict';

    function f(n) {
        return n < 10 ? '0' + n : n;
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z' : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        }, rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null';
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {
                '': value
            });
        };
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({
                    '': j
                }, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
}());
! function ($) {
    "use strict";
    var Button = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, $.fn.button.defaults, options)
    }
    Button.prototype.setState = function (state) {
        var d = 'disabled',
            $el = this.$element,
            data = $el.data(),
            val = $el.is('input') ? 'val' : 'html'
        state = state + 'Text'
        data.resetText || $el.data('resetText', $el[val]())
        $el[val](data[state] || this.options[state])
        setTimeout(function () {
            state == 'loadingText' ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d)
        }, 0)
    }
    Button.prototype.toggle = function () {
        var $parent = this.$element.parent('[data-toggle="buttons-radio"]')
        $parent && $parent.find('.active').removeClass('active')
        this.$element.toggleClass('active')
    }
    $.fn.button = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('button'),
                options = typeof option == 'object' && option
            if (!data) $this.data('button', (data = new Button(this, options)))
            if (option == 'toggle') data.toggle()
            else if (option) data.setState(option)
        })
    }
    $.fn.button.defaults = {
        loadingText: 'loading...'
    }
    $.fn.button.Constructor = Button
    $(function () {
        $('body').on('click.button.data-api', '[data-toggle^=button]', function (e) {
            var $btn = $(e.target)
            if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
            $btn.button('toggle')
        })
    })
}(window.jQuery);
! function ($) {
    "use strict"
    var Collapse = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, $.fn.collapse.defaults, options)
        if (this.options["parent"]) {
            this.$parent = $(this.options["parent"])
        }
        this.options.toggle && this.toggle()
    }
    Collapse.prototype = {
        constructor: Collapse,
        dimension: function () {
            var hasWidth = this.$element.hasClass('width')
            return hasWidth ? 'width' : 'height'
        },
        show: function () {
            var dimension = this.dimension(),
                scroll = $.camelCase(['scroll', dimension].join('-')),
                actives = (this.$parent && this.$parent.find('.in')) || (this.$closest && this.$closest.find('.in')),
                hasData
            if (actives && actives.length) {
                hasData = actives.data('collapse')
                actives.collapse('hide')
                hasData || actives.data('collapse', null)
            }
            this.$element[dimension](0)
            this.transition('addClass', 'show', 'shown')
            this.$element[dimension](this.$element[0][scroll])
        },
        hide: function () {
            var dimension = this.dimension()
            this.reset(this.$element[dimension]())
            this.transition('removeClass', 'hide', 'hidden')
            this.$element[dimension](0)
        },
        reset: function (size) {
            var dimension = this.dimension()
            this.$element.removeClass('collapse')[dimension](size || 'auto')[0].offsetWidth
            this.$element.addClass('collapse')
        },
        transition: function (method, startEvent, completeEvent) {
            var that = this,
                complete = function () {
                    if (startEvent == 'show') that.reset()
                    that.$element.trigger(completeEvent)
                }
            this.$element.trigger(startEvent)[method]('in')
            $.support.transition && this.$element.hasClass('collapse') ? this.$element.one($.support.transition.end, complete) : complete()
        },
        toggle: function () {
            this[this.$element.hasClass('in') ? 'hide' : 'show']()
        }
    }
    $.fn.collapse = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('collapse'),
                options = typeof option == 'object' && option
            if (!data) $this.data('collapse', (data = new Collapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }
    $.fn.collapse.defaults = {
        toggle: true
    }
    $.fn.collapse.Constructor = Collapse
    $(function () {
        $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
            var $this = $(this),
                href, target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''),
                option = $(target).data('collapse') ? 'toggle' : $this.data()
                $(target).collapse(option)
        })
    })
}(window.jQuery);
! function ($) {
    "use strict"
    var toggle = '[data-toggle="dropdown"]',
        Dropdown = function (element) {
            var $el = $(element).on('click.dropdown.data-api', this.toggle)
            $('html').on('click.dropdown.data-api', function () {
                $el.parent().removeClass('open')
            })
        }
    Dropdown.prototype = {
        constructor: Dropdown,
        toggle: function (e) {
            var $this = $(this),
                selector = $this.attr('data-target'),
                $parent, isActive
            if (!selector) {
                selector = $this.attr('href')
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '')
            }
            $parent = $(selector)
            $parent.length || ($parent = $this.parent())
            isActive = $parent.hasClass('open')
            clearMenus();
            !isActive && $parent.toggleClass('open')
            return false
        }
    }

    function clearMenus() {
        $(toggle).parent().removeClass('open')
    }
    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('dropdown')
                if (!data) $this.data('dropdown', (data = new Dropdown(this)))
                if (typeof option == 'string') data[option].call($this)
        })
    }
    $.fn.dropdown.Constructor = Dropdown
    $(function () {
        $('html').on('click.dropdown.data-api', clearMenus)
        $('body').on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    })
}(window.jQuery);
! function ($) {
    "use strict";
    var Modal = function (content, options) {
        this.options = options;
        this.$element = $(content).delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this));
    };
    Modal.prototype = {
        constructor: Modal,
        toggle: function () {
            return this[!this.isShown ? 'show' : 'hide']();
        },
        show: function () {
            var that = this;
            if (this.isShown) return
            $('body').addClass('modal-open');
            this.isShown = true;
            this.$element.trigger('show');
            escape.call(this);
            backdrop.call(this, function () {
                var transition = $.support.transition && that.$element.hasClass('fade');
                !that.$element.parent().length && that.$element.appendTo(document.body);
                that.$element.show();
                if (transition) {
                    that.$element[0].offsetWidth;
                }
                that.$element.addClass('in');
                transition ? that.$element.one($.support.transition.end, function () {
                    that.$element.trigger('shown')
                }) : that.$element.trigger('shown');
            });
        },
        hide: function (e) {
            e && e.preventDefault();
            if (!this.isShown) return
            var that = this;
            this.isShown = false;
            $('body').removeClass('modal-open');
            escape.call(this);
            this.$element.trigger('hide').removeClass('in');
            $('#resultMessage').parent().html('');
            $('#errorMessage').parent().html('');
            $.support.transition && this.$element.hasClass('fade') ? hideWithTransition.call(this) : hideModal.call(this);
        },
        centre: function () {
            var scrollHeight = $(document).scrollTop();
            var windowHeight = $(window).height();
            var elementHeight = this.$element.height();
            var newTopPosition = scrollHeight + 100;
            var remainingSpace = windowHeight - elementHeight;
            if (remainingSpace < 100) {
                newTopPosition = remainingSpace > 0 ? scrollHeight + (remainingSpace / 2) : scrollHeight;
            }
            this.$element.css("top", newTopPosition + "px");
        }
    };

    function hideWithTransition() {
        var that = this,
            timeout = setTimeout(function () {
                that.$element.off($.support.transition.end);
                hideModal.call(that);
            }, 500);
        this.$element.one($.support.transition.end, function () {
            clearTimeout(timeout);
            hideModal.call(that);
        });
    }

    function hideModal(that) {
        this.$element.hide().trigger('hidden');
        backdrop.call(this);
    }

    function backdrop(callback) {
        var that = this,
            animate = this.$element.hasClass('fade') ? 'fade' : '';
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body);
            if (this.options.backdrop != 'static') {
                this.$backdrop.click($.proxy(this.hide, this));
            }
            if (doAnimate) this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass('in');
            doAnimate ? this.$backdrop.one($.support.transition.end, callback) : callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in');
            $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) : removeBackdrop.call(this);
        } else if (callback) {
            callback();
        }
    }

    function removeBackdrop() {
        this.$backdrop.remove();
        this.$backdrop = null;
    }

    function escape() {
        var that = this;
        if (this.isShown && this.options.keyboard) {
            $(document).on('keyup.dismiss.modal', function (e) {
                e.which == 27 && that.hide();
            });
        } else if (!this.isShown) {
            $(document).off('keyup.dismiss.modal');
        }
    }
    $.fn.modal = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('modal'),
                options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option);
            if (!data) $this.data('modal', (data = new Modal(this, options)));
            if (typeof option == 'string') data[option]();
            else if (options.show) data.show();
        });
    };
    $.fn.modal.defaults = {
        backdrop: true,
        keyboard: true,
        show: true
    };
    $.fn.modal.Constructor = Modal;
    $(function () {
        $('body').on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
            var $this = $(this),
                href, $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')),
                option = $target.data('modal') ? 'toggle' : $.extend({}, $target.data(), $this.data());
            e.preventDefault();
            $target.modal(option);
            $target.modal("centre")
        });
    });
}(window.jQuery);
! function ($) {
    "use strict";
    var Tab = function (element) {
        this.element = $(element)
    }
    Tab.prototype = {
        constructor: Tab,
        show: function () {
            var $this = this.element,
                $ul = $this.closest('ul:not(.dropdown-menu)'),
                selector = $this.attr('data-target'),
                previous, $target, e
            if (!selector) {
                selector = $this.attr('href')
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '')
            }
            if ($this.parent('li').hasClass('active')) return
            previous = $ul.find('.active a').last()[0]
            e = $.Event('show', {
                relatedTarget: previous
            })
            $this.trigger(e)
            if (e.isDefaultPrevented()) return
            $target = $(selector)
            this.activate($this.parent('li'), $ul)
            this.activate($target, $target.parent(), function () {
                $this.trigger({
                    type: 'shown',
                    relatedTarget: previous
                })
            })
        },
        activate: function (element, container, callback) {
            var $active = container.find('> .active'),
                transition = callback && $.support.transition && $active.hasClass('fade')

                function next() {
                    $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active')
                    element.addClass('active')
                    if (transition) {
                        element[0].offsetWidth
                        element.addClass('in')
                    } else {
                        element.removeClass('fade')
                    }
                    if (element.parent('.dropdown-menu')) {
                        element.closest('li.dropdown').addClass('active')
                    }
                    callback && callback()
                }
            transition ? $active.one($.support.transition.end, next) : next()
            $active.removeClass('in')
        }
    }
    $.fn.tab = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('tab')
                if (!data) $this.data('tab', (data = new Tab(this)))
                if (typeof option == 'string') data[option]()
        })
    }
    $.fn.tab.Constructor = Tab
    $(function () {
        $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
    })
}(window.jQuery);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'Accordion',
        defaults = {
            headingClass: "accordion-hd",
            panelClass: "accordion-bd"
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.openPanelIndex = 0;
        this.setupEvents();
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            this.$element.find("." + this.options.headingClass).each(function () {
                var $this = $(this);
                $this.attr("tabindex", "0");
            });
            this.$element.find("." + this.options.headingClass).first().addClass("selected");
        },
        setupEvents: function () {
            var self = this;
            this.$element.on("click keyup", "." + this.options.headingClass, function (e) {
                if ((e.type === "keyup" && e.keyCode !== 13)) {
                    return false;
                }
                if (!$(e.target).hasClass("selected")) {
                    self.closeAllPanels();
                    self.openPanel(e.target);
                }
            });
            this.$element.find("." + this.options.headingClass).hover(function () {
                $(this).addClass("hover");
            }, function () {
                $(this).removeClass("hover");
            });
        },
        closeAllPanels: function () {
            this.$element.find("." + this.options.headingClass).removeClass("selected").next("." + this.options.panelClass).slideUp();
        },
        openPanel: function (panel) {
            var self = this;
            $(panel).addClass("selected").next("." + this.options.panelClass).slideDown(function () {
                self.$element.trigger("accordionOpened")
            });
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'AjaxFormSetup',
        defaults = {
            beforeSubmit: function () {
                return true;
            }
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.$modal = null;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            var self = this;
            this.$element.on("submit", function () {
                var openPopup = false;
                var url;
                var data = {};
                openPopup = self.options.beforeSubmit.call(self);
                var customEvent = $.Event("beforeSubmit");
                self.$element.trigger(customEvent);
                if (customEvent.isDefaultPrevented()) {
                    return false;
                }
                if (openPopup) {
                    self.$modal = $("<div class='modal'></div>");
                    self.$modal.modal({
                        backdrop: 'static',
                        keyboard: false
                    })
                    self.$modal.modal("show");
                    url = self.$element.attr("action");
                    data = self.$element.serializeArray();
                    data.push({
                        name: "requestedResultType",
                        value: "ajax"
                    });
                    $.ajax({
                        url: url,
                        type: "post",
                        data: data,
                        success: function (html) {
                            self.$modal.html(html);
                            self.$modal.modal("centre");
                            self.$modal.find("a").focus();
                            $('.disabledOnClick').click(Utils.disableOnClick);
                        }
                    });
                }
                return false;
            });
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'AjaxPost',
        defaults = {
            beforeSubmit: function () {
                return !this.$element.hasClass("invalid-form");
            },
            templateId: "#modal-loading-template"
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.$modal = null;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            this.template = $(this.options.templateId).html();
            this.setupEventHandlers();
        },
        setupEventHandlers: function () {
            var self = this;
            this.$element.on("submit", function () {
                self.submitHandler.call(self);
                return false;
            });
        },
        submitHandler: function () {
            var $defer;
            var self = this;
            var href = this.$element.attr("action");
            var data = {};
            if (!this.options.beforeSubmit.call(this)) {
                return false;
            }
            data = this.$element.serializeArray();
            data.push({
                name: "ajax",
                value: "true"
            });
            $.ajax({
                url: href,
                data: data,
                type: "POST",
                beforeSend: function () {
                    SpeedboatUI.ModalSingleton.getInstance().showLoading();
                },
                success: $.proxy(this.successHandler, this),
                error: function () {
                    return false;
                },
                cache: false
            });
        },
        successHandler: function (json) {
            if (json.responseCode == 0) {
                this.successfulPost.call(this, json);
            } else if (json.responseCode == 1) {
                this.unsuccessfulPost.call(this, json);
            }
        },
        successfulPost: function (json) {
            if (json.message) {
                SpeedboatUI.ModalSingleton.getInstance().showSuccess(json.message);
                SpeedboatUI.ModalSingleton.getInstance().focus();
            } else if (json.forward && json.forward.url) {
                this.redirect(json.forward.url + "?" + $.param(json.forward.parameters));
            }
        },
        unsuccessfulPost: function (json) {
            if (json.message) {
                SpeedboatUI.ModalSingleton.getInstance().showError(json.message);
                SpeedboatUI.ModalSingleton.getInstance().focus();
            }
        },
        redirect: function (url) {
            window.location.href = url;
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'AssetManager';

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = options;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            this.setupEventHandlers();
        },
        setupEventHandlers: function () {
            var self = this;
            this.$element.on("click", "." + this.options.classes.assetInstance, function (e) {
                self.ToggleCreateAndRunEnableDisable(e);
            });
        },
        ToggleCreateAndRunEnableDisable: function (e) {
            var noCheckboxesChecked = $('input.' + this.options.classes.assetInstance + ':checked').length == 0;
            $('#' + this.options.ids.createAndRun).attr('disabled', noCheckboxesChecked);
            if (noCheckboxesChecked) {
                if (!$('#' + this.options.ids.createAndRun).hasClass('disabled'))
                    $('#' + this.options.ids.createAndRun).addClass('disabled');
            } else {
                $('#' + this.options.ids.createAndRun).removeClass('disabled');
            }
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'ButtonToggle',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            this.$element.on("click", $.proxy(this.handleClick, this));
        },
        handleClick: function () {
            this.$element.trigger("beforeToggle");
            var $toggle = $(this.$element).closest(".toggle");
            $toggle.hide().siblings(".toggle").show();
            $toggle.find(".form-actions .msg").remove();
            return false;
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var self;
    var pluginName = 'Catalogue',
        defaults = {
            tabSelector: "a[data-toggle='tab']",
            tabPaneSelector: ".tab-pane",
            productsSelector: ".products",
            productSelector: ".product",
            productFilterSelector: ".filter-product",
            grandTotalContainerSelector: ".grand-total",
            grandTotalPriceSelector: ".grand-total-price",
            configurationRadioSelector: 'div.customised-machine form.active input[type=radio][data-param-id=none]'
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
        self = this;
    }
    Plugin.prototype = {
        init: function () {
            this.setupEvents();
        },
        setupEvents: function () {
            this.$element.on("reset", $.proxy(this.reset, this));
            this.$element.on("focusout change keyup", $.proxy(this.updateProduct, this));
            this.$element.on("submit", $.proxy(this.addToBasket, this));
        },
        reset: function (e) {
            this.$element.find(this.options.tabSelector).on("show", $.proxy(this.populateProducts, this));
            this.$element.find(this.options.tabSelector).first().tab("show");
        },
        populateProducts: function (e) {
            this.$element.find(this.options.productFilterSelector).CatalogueOptionFilter({
                optionContainerSelector: ".parameter"
            });
            this.$element.unbind("productUpdated");
            $(e.target.hash).find(".products .product").each(function () {
                if (!$.data(this, 'product')) {
                    $.data(this, 'product', new Product(this));
                }
            });
            this.basketButton = new BasketButtonManager($(e.target.hash).find(".btn"));
            this.$element.on("productUpdated", $.proxy(this.updateGrandTotal, this));
            this.$element.on("productUpdated", $.proxy(this.updateButton, this));
        },
        updateProduct: function (e) {
            var $product = $(e.target).closest(this.options.productSelector);
            var product = $.data($product[0], 'product');
            product.update();
        },
        updateButton: function (e, args) {
            this.basketButton.enabled = args.configured;
            this.basketButton.enable(args.configured);
        },
        updateGrandTotal: function (e) {
            var $products = $(e.target).closest(this.options.productsSelector);
            var $grandTotal = $products.next(this.options.grandTotalContainerSelector).find(this.options.grandTotalPriceSelector);
            if ($grandTotal.length === 0) {
                return;
            }
            var $products = $products.find(this.options.productSelector);
            var grandTotal = 0;
            $products.each(function () {
                var product = $.data(this, 'product');
                grandTotal = Utils.addDecimal(grandTotal, parseFloat(product.totalPrice));
            });
            $grandTotal.text(ceil(grandTotal, 2));
        },
        addToBasket: function (e) {
            e.preventDefault();
            this.basketButton.showLoading();
            var $form = $(e.target);
            var json = this.prepareAddToBasketJson($form);
            if (json.packages.length === 0) {
                this.basketButton.showQuantityMessage();
                return false;
            }
            this.postAddToBasketJsonToServer("jsonSubmit=" + JSON.stringify(json));
        },
        prepareAddToBasketJson: function ($form) {
            var $products = $form.find(this.options.productSelector);
            var json = {
                chargingId: $form.find(this.options.productsSelector).data("chargingId")
            };
            var packages = [];
            $products.each(function () {
                var product = $.data(this, 'product');
                var jsonSnippet = product.getJsonSnippet();
                jsonSnippet !== null ? packages.push(jsonSnippet) : null;
                jsonSnippet !== null && product.reset();
            });
            json.packages = packages;
            return json;
        },
        postAddToBasketJsonToServer: function (stringSentToServer) {
            var self = this;
            $.post("basket!add", stringSentToServer, function (response) {
                if (response.statusCode === "success") {
                    self.updateBasketCounter();
                    self.basketButton.showAddToBasket();
                }
            });
        },
        updateBasketCounter: function () {
            $.ajax({
                url: Speedboat.Config.basket.getCountURL,
                cache: false,
                success: function (count) {
                    $("#basket-count").text(count);
                    if (count === "1") {
                        $(".basket-size-label").text($("#basketLabelSingular").val());
                    } else {
                        $(".basket-size-label").text($("#basketLabelPlural").val());
                    }
                }
            });
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
    context[pluginName] = Plugin;
    var Product = function (el) {
        this.el = el;
        this.$el = $(this.el);
        this.init();
        this.domSetup();
        this.reset();
    };
    Product.prototype = {
        init: function () {},
        domSetup: function () {
            this.$parameters = this.$el.find(".parameter");
            this.$quantity = this.$el.find(".quantity");
            this.$unitPriceInformation = this.$el.find(".unit-price-info");
            this.$unitPriceWrapper = this.$el.find(".unit-price");
            this.$unitPrice = this.$el.find(".unit-price-value");
            this.$totalPrice = this.$el.find(".total-price");
            this.$parameters.on("change", $.proxy(this.updateParameter, this));
        },
        reset: function () {
            if (this.$el.find('.quantity').is("input")) {
                this.quantity = 0;
            } else {
                this.quantity = this.$el.find('.quantity').text();
            }
            this.$el.unbind();
            this.resetParameters();
            this.updatePrices();
            if (!this.$el.find('.quantity').is("input")) {
                $grandTotalPrice = $('span.grand-total-price');
                $grandTotalPrice.text(ceil(this.$totalPrice.text(), 2));
            }
        },
        update: function () {
            if (this.validateQuantity()) {
                this.updatePrices();
            } else {
                if (!this.$quantity.is(":focus")) {
                    this.$quantity.val(this.quantity);
                }
            }
        },
        updatePrices: function () {
            this.updateUnitPrice();
            this.updateTotalPrice();
            this.render();
        },
        updateParameter: function (e) {
            var $parameter = $(e.target);
            $parameter.closest("li").toggleClass(function () {
                if ($parameter.data("price") === "none") {
                    return "radio-none-active"
                } else {
                    return "radio-active";
                }
            }).siblings().removeClass("radio-active radio-none-active");
        },
        resetParameters: function () {
            this.$parameters.filter("select").each(function () {
                this.selectedIndex = 0;
            });
        },
        render: function () {
            if (!this.$quantity.is(":focus")) {
                this.$quantity.val(this.quantity);
            }
            this.renderUnitPrice();
            this.totalPrice = ceil(this.totalPrice, this.retrieveDecimalsToShow());
            this.$totalPrice.data("actual", this.totalPrice).text(this.totalPrice);
            this.$el.trigger("productUpdated", {
                configured: this.checkAllConfigurationOptionsSet(self.options.configurationRadioSelector)
            });
        },
        checkAllConfigurationOptionsSet: function (radioSelector) {
            if ($(radioSelector).length == 0)
                return (this.unitPrice > 0);
            return ($(radioSelector).length > 0 && $(radioSelector + ':checked').length == 0);
        },
        renderUnitPrice: function () {
            if (this.checkAllConfigurationOptionsSet(self.options.configurationRadioSelector)) {
                this.$unitPriceInformation.hide();
                this.$unitPriceWrapper.show();
                this.unitPrice = ceil(this.unitPrice, this.retrieveDecimalsToShow())
                this.$unitPrice.data("actual", this.unitPrice).text(this.unitPrice);
            } else {
                this.$unitPriceWrapper.hide();
                this.$unitPriceInformation.show();
            }
        },
        retrieveDecimalsToShow: function () {
            var decimals = 4;
            var chargingId = this.$el.data("product-charging-id");
            if (chargingId)
                decimals = chargingId == "1" ? 2 : 4;
            return decimals;
        },
        validateQuantity: function () {
            var isValid = true;
            var quantity = this.$quantity.val();
            if (!/^\d+$/.test(quantity) || isNaN(quantity)) {
                isValid = false;
            } else {
                this.quantity = parseInt(quantity, 10);
            }
            return isValid;
        },
        updateUnitPrice: function () {
            var sum = 0;
            var $parameter;
            var price;
            for (var i = 0, l = this.$parameters.length; i < l; i++) {
                $parameter = this.$parameters.eq(i);
                price = 0;
                if ($parameter.is("select")) {
                    price = $parameter.find(":selected").data("price");
                } else if ($parameter.is("ul")) {
                    $parameter = $parameter.find("input:checked");
                    if ($parameter.data("multiplier-for")) {
                        price = this.calculateRelatedParameterPrice($parameter);
                    } else {
                        price = $parameter.data("price-multiplicand") ? 0 : $parameter.data("price");
                    }
                } else {
                    price = $parameter.data("price");
                }
                sum = Utils.addDecimal(sum, price);
            }
            this.unitPrice = isNaN(sum) ? 0.0 : sum;
        },
        calculateRelatedParameterPrice: function ($parameter) {
            var multiplier = $parameter.val();
            var relatedParameter = this.$parameters.find("input:checked").filter("input[name='" + $parameter.data("multiplier-for") + "']");
            return relatedParameter.data("price-multiplicand") * multiplier;
        },
        updateTotalPrice: function () {
            if (this.checkAllConfigurationOptionsSet(self.options.configurationRadioSelector)) {
                this.totalPrice = this.unitPrice * this.quantity;
            } else {
                this.totalPrice = 0.0;
            }
        },
        getJsonSnippet: function () {
            if (this.quantity === 0) {
                return null;
            }
            var package = {
                packageId: this.$el.data("packageId")
            };
            var children = _.map(this.$parameters, function (parameter) {
                var $parameter = $(parameter);
                if ($parameter.is("select")) {
                    $parameter = $parameter.find(":selected");
                } else if ($parameter.is("ul")) {
                    $parameter = $parameter.find("input:checked");
                }
                return {
                    paramId: $parameter.data("paramId")
                };
            });
            children.push({
                paramName: this.$quantity.data("paramName"),
                paramId: this.$quantity.data("paramId"),
                inputValue: this.$quantity.val()
            });
            package.children = children;
            return package;
        }
    };

    function ceil(number, decimals) {
        if (!decimals)
            decimals = 4;
        return (Math.ceil(Utils.multiplyDecimal(number, 10000)) / 10000).toFixed(decimals);
    }
    context["CatalogueProduct"] = Product;
    var BasketButtonManager = function (el) {
        this.$el = $(el);
        this.enabled = false;
    };
    BasketButtonManager.prototype = {
        setupEvents: function () {
            this.isDisabled = this.$el.hasClass("disabled");
            this.$el.on("update", $.proxy(this.update, this));
        },
        reset: function () {
            this.$el.button("reset");
            this.enable(this.enabled);
        },
        enable: function (enable) {
            var self = this;
            if (enable) {
                window.setTimeout(function () {
                    self.$el.removeClass("disabled").removeAttr("disabled");
                }, 0);
            } else {
                window.setTimeout(function () {
                    self.$el.addClass("disabled").attr("disabled", "disabled");
                }, 0);
            }
        },
        showLoading: function () {
            this.$el.button('loading');
        },
        showQuantityMessage: function () {
            this.enabled = !this.$el.hasClass("disabled");
            this.$el.button('quantity');
            this.enable(false);
            var self = this;
            window.setTimeout(function () {
                self.reset();
            }, 3000);
        },
        showAddToBasket: function () {
            var self = this;
            this.$el.button("complete");
            window.setTimeout(function () {
                self.$el.addClass("disabled");
            }, 0);
            window.setTimeout(function () {
                self.reset();
            }, 3500);
        }
    };
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'CatalogueNavigation',
        defaults = {
            catalogueItemClass: "catalogue-item",
            templateId: "#product-catalogue-accordion-template",
            callbacks: {
                loadHTML: function (url, $template) {
                    $.get(url, function (html) {
                        $template.html(html);
                        $template.trigger("reset");
                    });
                }
            }
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            var self = this;
            this.template = _.template($(this.options.templateId).html());
            this.insertHTML();
            this.$catalogue = $("#catalogue");
            this.$element.on("click", "." + this.options.catalogueItemClass + " a", function () {
                self.clickHandler.call(this, self);
                return false;
            });
            this.$element.find("." + this.options.catalogueItemClass + " a").first().click();
        },
        clickHandler: function (context) {
            context.$element.find("." + context.options.catalogueItemClass + " a").removeClass("selected");
            $(this).addClass("selected");
            context.options.callbacks.loadHTML(this.href, context.$catalogue);
        },
        insertHTML: function () {
            var html = this.template(this.options.data);
            this.$element.html(html);
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = "CatalogueOptionFilter";
    var defaults = {
        disabledLabelClass: "muted"
    };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            this.$element.one("updateDisplay", $.proxy(this.updateDisplay, this));
            this.loadData();
        },
        loadData: function () {
            var self = this;
            $.ajax({
                url: this.$element.data("url"),
                dataType: "json",
                success: function (data) {
                    self.availableOptions = data;
                    self.setupEventHandler();
                    $(self.options.optionContainerSelector).each(function () {
                        self.disableUnavailableOptions.call(self, this);
                    });
                    self.$element.trigger("updateDisplay");
                }
            });
        },
        updateDisplay: function () {
            var $products = this.$element.closest(".tab-content").find(".products");
            var tallest = 0;
            $products.find(".row-fluid").each(function () {
                $(this).find(".parameter-group").each(function () {
                    var height = $(this).height();
                    if (height > tallest) {
                        tallest = height;
                    }
                });
            });
            $products.find(".row-fluid .parameter-group").height(tallest);
        },
        disableUnavailableOptions: function (optionGroup, availableOptions) {
            var self = this;
            if (!availableOptions) {
                availableOptions = self.availableOptions;
            }
            var availableParameterOptions;
            $(optionGroup).find("input").each(function (i) {
                var $input = $(this);
                if (i === 0) {
                    availableParameterOptions = _.pluck(availableOptions, $input.prop("name"));
                }
                self.disableIfUnavailable($input, availableParameterOptions);
            });
        },
        disableIfUnavailable: function ($input, availableParameterOptions) {
            if ($input.data("param-id") !== "none") {
                if (!_.contains(availableParameterOptions, $input.data("param-id"))) {
                    $input.prop("disabled", true);
                    $input.closest("li").addClass(this.options.disabledLabelClass);
                } else {
                    $input.prop("disabled", false);
                    $input.closest("li").removeClass(this.options.disabledLabelClass);
                }
            }
        },
        updateUI: function () {
            var self = this;
            var $optionGroups = this.$element.find(".parameter-group");
            $optionGroups.each(function () {
                var $checkedValuesInGroup = $(this).find(self.options.optionContainerSelector + " input:checked");
                var allChecked = _.all($checkedValuesInGroup, function (value) {
                    return $(value).data("param-id") !== "none";
                });
                $(this).toggleClass("parameter-group-active", allChecked);
            });
        },
        setupEventHandler: function () {
            var self = this;
            var optionContainerSelector = self.options.optionContainerSelector;
            var $parameters = this.$element.find(optionContainerSelector);
            $parameters.on("change", function (event) {
                var optionToFilterOn = $(event.target);
                var whereCriteria = {};
                var remainingOptions;
                var filter = false;
                var $otherOptionGroups = $parameters.filter(function () {
                    return !optionToFilterOn.closest(optionContainerSelector).is($(this));
                });
                var selectedOptions = $otherOptionGroups.find("input:checked").filter(function () {
                    return $(this).data("param-id") != "none";
                });
                if (optionToFilterOn.data("param-id") === "none") {
                    if (selectedOptions.length === 0) {
                        remainingOptions = self.availableOptions;
                        self.disableUnavailableOptions.call(self, optionToFilterOn.closest(optionContainerSelector), self.availableOptions);
                    } else {
                        optionToFilterOn = selectedOptions.first();
                        filter = true;
                    }
                } else {
                    filter = true;
                }
                if (filter) {
                    selectedOptions.push(optionToFilterOn);
                    selectedOptions.each(function () {
                        var $this = $(this);
                        whereCriteria[$this.prop("name")] = $this.data("param-id");
                    });
                    remainingOptions = _.where(self.availableOptions, whereCriteria);
                }
                $otherOptionGroups.each(function () {
                    self.disableUnavailableOptions.call(self, this, remainingOptions);
                });
                self.updateUI();
            });
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'CheckboxToggle',
        defaults = {
            source: "related-source",
            target: "related-target"
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.setupEventHandlers();
    }
    Plugin.prototype.setupEventHandlers = function () {
        var self = this;
        this.$element.on("change", "." + this.options.source, function (e) {
            var $source = $(this);
            var $target = $("." + self.options.target);
            var enable = false;
            var n = 0;
            if ($source.is("input")) {
                enable = e.target.checked;
            } else {
                n = $source.find(":checked").length;
                enable = n > 0;
            }
            if (enable) {
                $target.is("input") ? $target.removeAttr("disabled") : $target.removeClass("disabled");
            } else {
                $target.is("input") ? $target.attr("disabled", "disabled") : $target.addClass("disabled");
            }
        });
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'CollapseManager';

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = options;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            this.createCollapseButton();
        },
        createCollapseButton: function () {
            var $expandCollapseContainer = $('<div class="expandCollapseContainer"></div>');
            $expandCollapseContainer.appendTo(this.$element.parent());
            if (this.$element.html().length > this.options.maxLengthOfContent) {
                var $expandCollapseButton = $('<div class=\"btn mrm expandCollapse pull-right\">' + this.$element.attr('data-expand-text') + '</div>');
                this.attachHandlers($expandCollapseButton);
                $expandCollapseButton.appendTo($expandCollapseContainer);
            }
        },
        attachHandlers: function ($item) {
            var self = this;
            $item.bind('click', function (e) {
                e.preventDefault();
                if (!($(e.currentTarget).parent().parent().find('.textCollapsable').hasClass('expandedContent'))) {
                    $(e.currentTarget).html(self.$element.attr('data-collapse-text'));
                    $(e.currentTarget).parent().parent().find('.textCollapsable').removeClass('collapsableContent');
                    $(e.currentTarget).parent().parent().find('.textCollapsable').addClass('expandedContent');
                } else {
                    $(e.currentTarget).html(self.$element.attr('data-expand-text'));
                    $(e.currentTarget).parent().parent().find('.textCollapsable').addClass('collapsableContent');
                    $(e.currentTarget).parent().parent().find('.textCollapsable').removeClass('expandedContent');
                }
                return false;
            });
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'ConfirmDialog',
        defaults = {
            confirmClass: "confirm-button",
            confirmMessages: {}
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.setupEventHandlers();
    }
    Plugin.prototype.setupEventHandlers = function () {
        var self = this;
        this.$element.on("click", "." + this.options.confirmClass, function (e) {
            var confirmClasses = e.currentTarget.className.replace(self.options.confirmClass + " ", "");
            var msg = self.getMessage(confirmClasses);
            msg = msg.replace("#placeholder#", $(e.currentTarget).data("confirmMsgParameter"));
            self.handleButton.call(e.currentTarget, e, msg)
        });
    };
    Plugin.prototype.getMessage = function (confirmClasses) {
        var messages = this.options.confirmMessages;
        for (var btn in messages) {
            if (confirmClasses.indexOf(btn) !== -1) {
                return messages[btn].msg;
            }
        }
        return "";
    };
    Plugin.prototype.handleButton = function (event, msg) {
        var hasConfirmed = $(this).hasClass("alert-button") ? window.alert(msg) : window.confirm(msg);
        if (!hasConfirmed) {
            event.preventDefault();
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);;
var SpeedboatUI = SpeedboatUI || {};
(function ($, context, document, undefined) {
    var pluginName = 'FilteringManager';

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = options;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            this.setupEventHandlers();
            this.fixFilterFieldWidthsIE7();
        },
        pageLoad: function () {
            var isChecked = $('#disableFiltersCheckbox').attr('checked') !== undefined;
            this.enableDisableFiltersViewAll(isChecked);
            var $customFilter = $('#customFilter');
            if ($customFilter && !$customFilter.is(':disabled'))
                $customFilter.focus();
            this.setFilterDefaults();
        },
        setFilterDefaults: function () {
            var endDate = new Date();
            var startDate = new Date();
            startDate.setMonth(endDate.getMonth() - 1);
            this.$element.find('#startDatePicker, #datepicker_2').attr('data-default-value', Utils.returnStandardFormattedDate_ddmmyyyy(startDate));
            this.$element.find('#endDatePicker').attr('data-default-value', Utils.returnStandardFormattedDate_ddmmyyyy(endDate));
            
        },
        fixFilterFieldWidthsIE7: function () {
            var widest = 0;
            $(".searchFilterFieldGrouping>div.filterField").each(function () {
                var width = $(this).width();
                if (width > widest) {
                    widest = width + 30;
                }
            });
        },
        enableDisableFiltersViewAll: function (isChecked) {
            var $filterFields = $('.filterField input, .filterField select');
            if (isChecked == true) {

                $('div.dateRangeControl').removeClass('enabled');
            } else {
                if ($('#startDatePicker, #datepicker_2').val() === "") {
                    var d = new Date();
                    $('#endDatePicker').datepicker('setDate', d);
                    d.setMonth(d.getMonth() - 1);
                    $('#startDatePicker, #datepicker_2').datepicker('setDate', d);
                }
                $('div.dateRangeControl').addClass('enabled');
            }
            $filterFields.attr('disabled', isChecked);
        },
        disableFiltersCheckboxClick: function (e) {
            var isChecked = $(e.currentTarget).attr('checked') !== undefined;
            this.enableDisableFiltersViewAll(isChecked);
        },
        setupEventHandlers: function () {
            this.pageLoad();
            $('#disableFiltersCheckbox').bind('click change', $.proxy(this.disableFiltersCheckboxClick, this));
            $("#startDatePicker, #datepicker_2").ready($.proxy(this.loadDatePicker, this));
        },
        loadDatePicker: function (e) {
            if (e.datepicker != undefined) {
                $("#startDatePicker, #datepicker_2").datepicker(e.datepicker.regional[$.cookie("lang", {
                    path: '/'
                })], {
                    dateFormat: 'dd/mm/yy'
                });
                $("#endDatePicker").datepicker(e.datepicker.regional[$.cookie("lang", {
                    path: '/'
                })], {
                    dateFormat: 'dd/mm/yy'
                });
            }
            this.setupDateRangeValidationHandler();
        },
        setupDateRangeValidationHandler: function () {
            if ($('#startDatePicker, #datepicker_2') && $('#endDatePicker')) {
                $('#startDatePicker, #datepicker_2').change(this.validateStartEndDates);
                $('#endDatePicker').change(this.validateStartEndDates);
            }
        },
        validateStartEndDates: function (e) {
            var startDate = $('#startDatePicker, #datepicker_2').val();
            var endDate = $('#endDatePicker').val();
            if (startDate != "" && endDate != "") {
                var isSelectingStartDate = $('#startDatePicker, #datepicker_2').attr("id") == $(e.currentTarget).attr("id");
                var fixedStartDate = $.datepicker.parseDate('dd/mm/yy', startDate);
                var fixedEndDate = $.datepicker.parseDate('dd/mm/yy', endDate);
                if (fixedStartDate > fixedEndDate) {
                    var $dateToBeChanged = isSelectingStartDate ? $('#endDatePicker') : $('#startDatePicker, #datepicker_2');
                    $dateToBeChanged.datepicker('setDate', isSelectingStartDate ? fixedStartDate : fixedEndDate);
                    $dateToBeChanged.val(isSelectingStartDate ? startDate : endDate);
                }
            }
        },
        disableFormOnSubmit: function (e) {
            var self = this;
            setTimeout(function () {
                self.$element.find('.loadingRequestNotice').removeClass('hide');
            }, 500);
            if (this.$element.find('.loadingRequestNotice img').length == 0) {
                this.$element.find('.loadingRequestNotice').append("<img src=\"/sb/public/assets/img/custom/ticketing/ajax-loader.gif\" height=\"16px\"/>");
            }
            this.$element.find('.loadingRequestNotice').bind('click', $.proxy(this.enableFormOnSubmitCancel, this));
        },
        enableFormOnSubmitCancel: function () {
            this.$element.find('.loadingRequestNotice').addClass('hide');
            this.$element.find('.loadingRequestNotice').off('click');
            Utils.cancelRequest();
            return false;
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'FormValidation',
        defaults = {
            parentClassToAddErrorClassTo: "control-group",
            fieldsToValidate: "input[class*='validate'],select[class*='validate'],textarea[class*='validate']"
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.isValid = true;
        this.firstInvalidField = -1;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            this.clearFields();
            this.setupEventHandlers();
        },
        setupEventHandlers: function () {
            var self = this;
        },
        clearFields: function () {
            $('.clearField').val('');
        },
        validateForm: function () {
            var self = this;
            var fieldsToValidate = this.$element.find(this.options.fieldsToValidate);
            this.isValid = true;
            this.firstInvalidField = -1;
            fieldsToValidate.each(function (i) {
                var $this = $(this);
                $this.val($.trim($this.val()));
                self.validate.call(self, $(this), i);
            });
            if (!this.isValid) {
                fieldsToValidate.eq(this.firstInvalidField).focus();
                this.$element.on("keyup change", function (e) {
                    var $target = $(e.target);
                    if ($target.is(self.options.fieldsToValidate)) {
                        self.validate($target, 0);
                    }
                });
            }
            this.$element.toggleClass("invalid-form", !this.isValid);
            if (!this.isValid) {
                $('.disabledOnClick[disabled=disabled]').removeAttr('disabled');
                $('.msg-confirm').closest('.row').addClass('hide');
            }
            return this.isValid;
        },
        validate: function ($field, index) {
            var str = $field[0].className;
            var validators = [];
            var validator;
            var regexp = /(validate-(email|mandatory|equality|characters|templatename|password|telephone|numeric|empty_or_numeric))/g;
            var i;
            var isValid;
            var msgIndex = -1;
            var value;
            while ((validator = regexp.exec(str)) != null) {
                validators.push(validator[2]);
            }
            for (i = 0; i < validators.length; i++) {
                value = this.preProcess(validators[i], $field.val());
                isValid = this["rules"][validators[i]].call(this, value, $field);
                if (!isValid) {
                    if (this.firstInvalidField === -1) {
                        this.firstInvalidField = index;
                    }
                    msgIndex = msgIndex < 0 ? i : msgIndex;
                }
            }
            this["mark" + (isValid ? "Valid" : "Invalid")]($field, validators[msgIndex]);
        },
        preProcess: function (type, value) {
            if (type === "telephone") {
                value = value.replace(/[ \t\r]+/g, "");
            }
            return value;
        },
        rules: {
            mandatory: function (value, $field) {
                if ($field && $field.is(":checkbox")) {
                    return $field.is(":checked");
                }
                return value.length > 0;
            },
            email: function (value) {
                return /^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
            },
            equality: function (value, $field) {
                var id = $field.data("equalTo");
                return $("#" + id).val() === value;
            },
            characters: function (value) {
                return /^[-\.''\sa-zA-Z0-9\u00C0-\u024F]+$/.test(value);
            },
            templatename: function (value) {
                return /^[a-zA-Z0-9.\s!#@$%&''*+/=?^_`\(\)\[\]{|}~\u00C0-\u024F-]+$/.test(value);
            },
            password: function (value) {
                return /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()_+|~\-=\`{}\[\]:;<>?,.\/\\]*$|^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()_+|~\-=\`{}\[\]:;<>?,.\/\\])[a-zA-Z0-9!@#$%^&*()_+|~\-=\`{}\[\]:;<>?,.\/\\]*$|^(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~\-=\`{}\[\]:;<>?,.\/\\])[a-zA-Z0-9!@#$%^&*()_+|~\-=\`{}\[\]:;<>?,.\/\\]*$|^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~\-=\`{}\[\]:;<>?,.\/\\])[a-zA-Z0-9!@#$%^&*()_+|~\-=\`{}\[\]:;<>?,.\/\\]*$/.test(value);
            },
            telephone: function (value) {
                return /^(\+?[0-9]+(x?[0-9]+)?)?$/.test(value)
            },
            numeric: function (value) {
                return /^\d+$/.test(value);
            },
            empty_or_numeric: function (value) {
                if (value.length > 0) {
                    return /^\d+$/.test(value);
                } else {
                    return true;
                }
            }
        },
        markValid: function ($field) {
            var $parentElement = $field.closest("." + this.options.parentClassToAddErrorClassTo);
            $parentElement.removeClass("error");
            $parentElement.find(".help-inline").empty();
        },
        markInvalid: function ($field, validate) {
            var $parentElement = $field.closest("." + this.options.parentClassToAddErrorClassTo);
            $parentElement.addClass("error");
            $parentElement.find(".help-inline").text($parentElement.find(".help-inline").data(validate + "Msg"));
            this.isValid = false;
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};
(function ($, context, document, undefined) {
    var pluginName = 'FormsManager';

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = options;
        this._name = pluginName;
        this.$formElement = null;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            this.setupEventHandlers();
            this.$formElement = (this.options.formSelector != undefined) ? $(this.options.formSelector) : this.$element;
        },
        setupEventHandlers: function () {
            this.$element.find('button[type=reset].enhancedReset').bind('click', $.proxy(this.resetFormToDefaults, this));
        },
        resetFormToDefaults: function (e) {
            e.preventDefault();
            this.$formElement.find(':input').each(function () {
                switch (this.type) {
                    case 'password':
                    case 'select-multiple':
                    case 'text':
                    case 'textarea':
                        if ($(this).attr('data-default-value'))
                            $(this).val($(this).attr('data-default-value'));
                        else
                            $(this).val('');
                        break;
                    case 'checkbox':
                        $(this).attr('checked', false);
                        $(this).change();
                        break;
                    case 'radio':
                        var thisRadioGroup = $(this).attr('name');
                        $('input[name=' + thisRadioGroup + ']').attr('checked', false);
                        $('input[name=' + thisRadioGroup + ']').first().attr('checked', true);
                        $(this).change();
                        break;
                    case 'select-one':
                        $(this).val($(this).find('option').first().val());
                }
            });
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'ModalAjax',
        defaults = {
            templateId: "#modal-loading-template",
            errorTemplateId: "#modal-error-template"
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.$modal = null;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            this.template = $(this.options.templateId).html();
            this.setupEventHandlers();
        },
        setupEventHandlers: function () {
            var self = this;
            this.$element.on("click", ".hijax", function (e) {
                e.preventDefault();
                var href = this.href;
                var html = self.template;
                var modalClass = $(this).data("modalClass") || "";
                self.$modal = $("<div class='modal " + modalClass + "'></div>");
                self.$modal.append(html);
                self.$modal.modal("hide").on("show", function () {
                    self.$modal.modal("centre");
                    $.ajax({
                        url: href,
                        success: $.proxy(self.successHandler, self),
                        error: function (data) {
                            self.$modal.html($(self.options.errorTemplateId).html());
                        },
                        cache: false
                    });
                });
                self.$modal.on("hidden", function () {
                    $(this).remove();
                });
                self.$modal.modal("show");
            });
        },
        successHandler: function (data) {
            this.$modal.html(data);
            var $form = this.$modal.find("form");
            var formValidation = null;
            if ($form.hasClass("validate-form")) {
                formValidation = new SpeedboatUI.FormValidation($form);
            }
            $form.find('.disabledOnClick').click(Utils.disableOnClick);
            $form.on("submit", function () {
                if (formValidation && !formValidation.validateForm()) {
                    return false;
                }
                $(this).find("button[type=submit]").attr("disabled", true);
            });
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);

var SpeedboatUI = SpeedboatUI || {};
(function ($, context) {
    var SingletonName = 'ModalSingleton';
    var ObjectName = 'Modal';
    var templates = {
        loading: "#modal-loading-template",
        successMessage: "#modal-message-success-template",
        errorMessage: "#modal-message-error-template"
    };

    function Singleton() {
        this.$element = $("<div class='modal'></div>");
        this.showSuccess = function (messageObj) {
            var html = _.template($(templates.successMessage).html(), messageObj);
            this.$element.html(html);
        };
        this.showError = function (messageObj) {
            var html = _.template($(templates.errorMessage).html(), messageObj);
            this.$element.html(html);
        };
        this.showLoading = function () {
            this.template = $(templates.loading).html();
            this.$element.empty().append(this.template);
            this.$element.modal("show");
            this.$element.modal("centre");
        }, this.focus = function () {
            this.$element.find(".btn").focus();
        }
    }
    var modal;
    var _static = {
        getInstance: function () {
            if (modal === undefined) {
                modal = new Singleton();
            }
            return modal;
        }
    };
    context[SingletonName] = _static;
    context[ObjectName] = Singleton;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'NewWindow',
        defaults = {
            width: 980,
            height: 600,
            scrollbars: 1,
            resizable: 1,
            name: "speedboat"
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.setupClickHandler();
    }




    Plugin.prototype.setupClickHandler = function () {
        this.$element.on("click", ".new-window", $.proxy(this.openNewWindow, this));
    };
    Plugin.prototype.openNewWindow = function (e) {
        e.preventDefault();
        var $el = $(e.target);
        var newWindow;
        var windowAttributes = [];
        var url = e.target.href;
        var windowName = $el.data("window-name") || this.options.name;
        var width = $el.data("width") || this.options.width;
        var height = $el.data("height") || this.options.height;
        windowAttributes.push("width=" + width);
        windowAttributes.push("scrollbars=1");
        windowAttributes.push("resizable=1");
        windowAttributes.push("toolbar=no");
        if ($el.data("vertical") === "top") {
            windowAttributes.push("top=0");
        }

        if ($el.data("horizontal") === "right") {
            windowAttributes.push("left=" + (screen.width - width));
        }
        if (height === "max") {
            height = screen.height * 0.9;
        }
        windowAttributes.push("height=" + height);
        var windowAttributesString = this.buildNewWindowAttributesString(windowAttributes);
        newWindow = window.open(url, windowName, windowAttributesString);
        if (window.focus) {
            newWindow.focus()
        }
        return false;
    };
    Plugin.prototype.buildNewWindowAttributesString = function (attributes) {
        var attributesString = "";
        for (var i = 0, length = attributes.length; i < length; i++) {
            attributesString += attributes[i] + ",";
        }
        return attributesString.substring(0, attributesString.length - 1);
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);;
var SpeedboatUI = SpeedboatUI || {};
(function ($, context, document, undefined) {
    var pluginName = 'OrderingManager';

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = options;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            this.setupEventHandlers();
        },
        setupEventHandlers: function () {
            this.$element.find('th.sortable').bind('click', $.proxy(this.triggerSorting, this));
        },
        triggerSorting: function (e) {
            if ($(e.currentTarget).closest('.notSortable').length > 0) {
                $(e.currentTarget).find('a').bind('click', function () {
                    return false;
                });
                return false;
            }
            var $sortingAnchor = $(e.currentTarget).find('a').first();
            this.options.windowContext.location.href = $sortingAnchor.attr('href');
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'PaginationManager';

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = options;
        this._name = pluginName;
        this.paginationFieldWithFocusId = null;
        this.preInit();
        this.init();
    }
    Plugin.prototype = {
        preInit: function () {
            this.$thePaginationTextfield = this.$element.find(this.options.thePaginationTextfield);
            this.$thePaginationTextfield.attr('autocomplete', 'off');
        },
        init: function () {
            this.setupEventHandlers();
        },
        setupEventHandlers: function () {
            this.$element.bind('submit', $.proxy(this.CheckForPaginationValues, this));
            this.$thePaginationTextfield.bind('keyup', this.RealtimeValidate);
            this.$thePaginationTextfield.bind('keydown', this.preventSubmitOnError);
            this.$thePaginationTextfield.bind('focus', $.proxy(function (e) {
                this.paginationFieldWithFocusId = '#' + e.currentTarget.id;
            }, this));
            this.$thePaginationTextfield.bind('blur', $.proxy(function (e) {
                this.paginationFieldWithFocusId = null;
            }, this));
            this.disableOutOfBoundsPaginationButtons();
        },
        disableOutOfBoundsPaginationButtons: function () {
            $('a.paginationButton.disabled').click(function (e) {
                return false;
            });
        },
        preventSubmitOnError: function (e) {
            var keyPressed = e.which;
            var enter = 13;
            if ((keyPressed == enter) && ($(e.currentTarget).closest('.control-group').hasClass('error'))) {
                return false;
            }
        },
        CheckForPaginationValues: function (e) {
            $('input#currentPageNumber').val(1);
            if (this.paginationFieldWithFocusId != null) {
                e.preventDefault();
                if ($(this.paginationFieldWithFocusId).closest('.control-group').hasClass('error'))
                    return false;
                var desiredPageNumber = (parseInt($(this.paginationFieldWithFocusId).val(), 10) == 0) ? '1' : $(this.paginationFieldWithFocusId).val();
                $('input#currentPageNumber').val(desiredPageNumber);
                window.location = "//" + window.location.host + $('input#dynamic_filter').val() + "&ticketsPerPage=" + $('#ticketsPerPage').val() + "&currentPageNumber=" + desiredPageNumber;
                return false;
            }
        },
        RealtimeValidate: function (e) {
            var keyCode = e.keyCode || e.which;
            var $thePaginationTextfield = $(e.currentTarget);
            var enteredTextIsNaN = ($thePaginationTextfield.val().match(/^([0-9]+)$/) == null);
            if (keyCode != 13) {
                if (enteredTextIsNaN) {
                    $thePaginationTextfield.closest('.control-group').addClass('error');
                } else {
                    $thePaginationTextfield.closest('.control-group').removeClass('error');
                }
            }
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'toggle',
        defaults = {
            switchClassName: "toggle-switch",
            contentClassName: "toggle-content",
            openClassName: "toggle-open"
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.openFirstItem();
        this.setupEventHandler();
    }
    Plugin.prototype.openFirstItem = function () {
        this.$element.find("." + this.options.switchClassName).first().parent().addClass(this.options.openClassName);
    };
    Plugin.prototype.setupEventHandler = function () {
        var self = this;
        this.$element.on("click", function (e) {
            var $target = $(e.target);
            if (e.target.className.indexOf(self.options.switchClassName) >= 0) {
                $target.parent().toggleClass(self.options.openClassName);
            }
        });
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
var SpeedboatUI = SpeedboatUI || {};;
(function ($, context, document, undefined) {
    var pluginName = 'Wizard',
        defaults = {
            classes: {
                wizardStep: "ui-wizard-step",
                wizardStepContainerInner: "ui-wizard-step-container-inner",
                moveForward: "ui-wizard-forward",
                moveBackward: "ui-wizard-backward"
            }
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.currentStep = 1;
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            var width = 0;
            this.$container = this.$element.find("." + this.options.classes.wizardStepContainerInner);
            this.$steps = this.$element.find("." + this.options.classes.wizardStep);
            this.widthOfStep = this.$steps.outerWidth(true);
            this.$steps.each(function () {
                width += $(this).outerWidth(true);
            });
            this.$container.width(width);
            this.setupEventHandlers();
        },
        setupEventHandlers: function () {
            this.$element.on("keydown", $.proxy(this.handleEnterKey, this));
            this.$element.on("click", "." + this.options.classes.moveBackward, $.proxy(this.stepBackward, this));
            this.$element.on("click", "." + this.options.classes.moveForward, $.proxy(this.stepForward, this));
            this.$element.on("keydown", "." + this.options.classes.moveForward, $.proxy(this.handleTabKey, this));
            this.$element.on("wizard.moved", $.proxy(this.update, this));
        },
        stepBackward: function (e) {
            e.preventDefault();
            this.step("backward", this.afterStep);
        },
        stepForward: function (e) {
            e.preventDefault();
            this.step("forward");
        },
        step: function (direction, afterStepCallback) {
            var self = this;
            var left;
            var currentLeftPosition;
            var customEventName = direction === "forward" ? "beforeMoveForward" : "beforeMoveBackward";
            var customEvent = $.Event(customEventName, {
                target: this.$steps.eq(this.currentStep - 1)
            });
            this.$element.trigger(customEvent);
            if (customEvent.isDefaultPrevented()) {
                return;
            }
            left = this.widthOfStep;
            currentLeftPosition = this.$container.position().left;
            if (direction === "forward") {
                this.$container.animate({
                    left: currentLeftPosition - left
                }, $.proxy(afterStepCallback, this));
            } else {
                this.$container.animate({
                    left: currentLeftPosition + left
                }, $.proxy(afterStepCallback, this));
            }
            this.currentStep = direction === "forward" ? this.currentStep + 1 : this.currentStep - 1;
            this.$element.trigger("wizard.moved");
        },
        afterStep: function () {
            this.$steps.eq(this.currentStep - 1).find("select,input").first().focus();
        },
        update: function () {
            var classes = $(this.$element).attr("class");
            var previousCurrentStepClass = /ui-wizard-current-step-([0-9])/g.exec(classes)[0];
            this.$element.removeClass(previousCurrentStepClass).addClass("ui-wizard-current-step-" + this.currentStep);
        },
        isLastStep: function () {
            return this.currentStep === this.$steps.length;
        },
        handleEnterKey: function (e) {
            if (e.keyCode !== 13) {
                return;
            }
            if (!$(e.target).hasClass(this.options.classes.moveBackward) && this.isLastStep()) {
                e.preventDefault();
                this.$element.trigger("submit");
            } else {
                e.preventDefault();
                if ($(e.target).hasClass(this.options.classes.moveBackward)) {
                    this.step("backward", this.afterStep);
                } else {
                    this.step("forward", this.afterStep);
                }
            }
        },
        handleTabKey: function (e) {
            if (e.keyCode !== 9 || e.shiftKey) {
                return;
            }
            e.preventDefault();
            this.afterStep();
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    }
    context[pluginName] = Plugin;
})(jQuery, SpeedboatUI);
(function ($, undefined) {
    var uuid = 0,
        runiqueId = /^ui-id-\d+$/;
    $.ui = $.ui || {};
    if ($.ui.version) {
        return;
    }
    $.extend($.ui, {
        version: "1.9.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    $.fn.extend({
        _focus: $.fn.focus,
        focus: function (delay, fn) {
            return typeof delay === "number" ? this.each(function () {
                var elem = this;
                setTimeout(function () {
                    $(elem).focus();
                    if (fn) {
                        fn.call(elem);
                    }
                }, delay);
            }) : this._focus.apply(this, arguments);
        },
        scrollParent: function () {
            var scrollParent;
            if (($.ui.ie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
                scrollParent = this.parents().filter(function () {
                    return (/(relative|absolute|fixed)/).test($.css(this, 'position')) && (/(auto|scroll)/).test($.css(this, 'overflow') + $.css(this, 'overflow-y') + $.css(this, 'overflow-x'));
                }).eq(0);
            } else {
                scrollParent = this.parents().filter(function () {
                    return (/(auto|scroll)/).test($.css(this, 'overflow') + $.css(this, 'overflow-y') + $.css(this, 'overflow-x'));
                }).eq(0);
            }
            return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
        },
        zIndex: function (zIndex) {
            if (zIndex !== undefined) {
                return this.css("zIndex", zIndex);
            }
            if (this.length) {
                var elem = $(this[0]),
                    position, value;
                while (elem.length && elem[0] !== document) {
                    position = elem.css("position");
                    if (position === "absolute" || position === "relative" || position === "fixed") {
                        value = parseInt(elem.css("zIndex"), 10);
                        if (!isNaN(value) && value !== 0) {
                            return value;
                        }
                    }
                    elem = elem.parent();
                }
            }
            return 0;
        },
        uniqueId: function () {
            return this.each(function () {
                if (!this.id) {
                    this.id = "ui-id-" + (++uuid);
                }
            });
        },
        removeUniqueId: function () {
            return this.each(function () {
                if (runiqueId.test(this.id)) {
                    $(this).removeAttr("id");
                }
            });
        }
    });

    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img, nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false;
            }
            img = $("img[usemap=#" + mapName + "]")[0];
            return !!img && visible(img);
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
    }

    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().andSelf().filter(function () {
            return $.css(this, "visibility") === "hidden";
        }).length;
    }
    $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
            return function (elem) {
                return !!$.data(elem, dataName);
            };
        }) : function (elem, i, match) {
            return !!$.data(elem, match[3]);
        },
        focusable: function (element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },
        tabbable: function (element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    });
    $(function () {
        var body = document.body,
            div = body.appendChild(div = document.createElement("div"));
        div.offsetHeight;
        $.extend(div.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        });
        $.support.minHeight = div.offsetHeight === 100;
        $.support.selectstart = "onselectstart" in div;
        body.removeChild(div).style.display = "none";
    });
    if (!$("<a>").outerWidth(1).jquery) {
        $.each(["Width", "Height"], function (i, name) {
            var side = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                type = name.toLowerCase(),
                orig = {
                    innerWidth: $.fn.innerWidth,
                    innerHeight: $.fn.innerHeight,
                    outerWidth: $.fn.outerWidth,
                    outerHeight: $.fn.outerHeight
                };

            function reduce(elem, size, border, margin) {
                $.each(side, function () {
                    size -= parseFloat($.css(elem, "padding" + this)) || 0;
                    if (border) {
                        size -= parseFloat($.css(elem, "border" + this + "Width")) || 0;
                    }
                    if (margin) {
                        size -= parseFloat($.css(elem, "margin" + this)) || 0;
                    }
                });
                return size;
            }
            $.fn["inner" + name] = function (size) {
                if (size === undefined) {
                    return orig["inner" + name].call(this);
                }
                return this.each(function () {
                    $(this).css(type, reduce(this, size) + "px");
                });
            };
            $.fn["outer" + name] = function (size, margin) {
                if (typeof size !== "number") {
                    return orig["outer" + name].call(this, size);
                }
                return this.each(function () {
                    $(this).css(type, reduce(this, size, true, margin) + "px");
                });
            };
        });
    }
    if ($("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        $.fn.removeData = (function (removeData) {
            return function (key) {
                if (arguments.length) {
                    return removeData.call(this, $.camelCase(key));
                } else {
                    return removeData.call(this);
                }
            };
        })($.fn.removeData);
    }
    (function () {
        var uaMatch = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
        $.ui.ie = uaMatch.length ? true : false;
        $.ui.ie6 = parseFloat(uaMatch[1], 10) === 6;
    })();
    $.fn.extend({
        disableSelection: function () {
            return this.bind(($.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (event) {
                event.preventDefault();
            });
        },
        enableSelection: function () {
            return this.unbind(".ui-disableSelection");
        }
    });
    $.extend($.ui, {
        plugin: {
            add: function (module, option, set) {
                var i, proto = $.ui[module].prototype;
                for (i in set) {
                    proto.plugins[i] = proto.plugins[i] || [];
                    proto.plugins[i].push([option, set[i]]);
                }
            },
            call: function (instance, name, args) {
                var i, set = instance.plugins[name];
                if (!set || !instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11) {
                    return;
                }
                for (i = 0; i < set.length; i++) {
                    if (instance.options[set[i][0]]) {
                        set[i][1].apply(instance.element, args);
                    }
                }
            }
        },
        contains: $.contains,
        hasScroll: function (el, a) {
            if ($(el).css("overflow") === "hidden") {
                return false;
            }
            var scroll = (a && a === "left") ? "scrollLeft" : "scrollTop",
                has = false;
            if (el[scroll] > 0) {
                return true;
            }
            el[scroll] = 1;
            has = (el[scroll] > 0);
            el[scroll] = 0;
            return has;
        },
        isOverAxis: function (x, reference, size) {
            return (x > reference) && (x < (reference + size));
        },
        isOver: function (y, x, top, left, height, width) {
            return $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left, width);
        }
    });
})(jQuery);
(function ($, undefined) {
    $.extend($.ui, {
        datepicker: {
            version: "1.9.2"
        }
    });
    var PROP_NAME = 'datepicker';
    var dpuuid = new Date().getTime();
    var instActive;

    function Datepicker() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = 'ui-datepicker-div';
        this._inlineClass = 'ui-datepicker-inline';
        this._appendClass = 'ui-datepicker-append';
        this._triggerClass = 'ui-datepicker-trigger';
        this._dialogClass = 'ui-datepicker-dialog';
        this._disableClass = 'ui-datepicker-disabled';
        this._unselectableClass = 'ui-datepicker-unselectable';
        this._currentClass = 'ui-datepicker-current-day';
        this._dayOverClass = 'ui-datepicker-days-cell-over';
        this.regional = [];
        this.regional[''] = {
            closeText: 'Done',
            prevText: 'Prev',
            nextText: 'Next',
            currentText: 'Today',
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            weekHeader: 'Wk',
            dateFormat: 'dd/mm/yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        this._defaults = {
            showOn: 'focus',
            showAnim: 'fadeIn',
            showOptions: {},
            defaultDate: null,
            appendText: '',
            buttonText: '...',
            buttonImage: '',
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: 'c-10:c+10',
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: '+10',
            minDate: null,
            maxDate: null,
            duration: 'fast',
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: '',
            altFormat: '',
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false,
            disabled: false
        };
        $.extend(this._defaults, this.regional['']);
        this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
    }
    $.extend(Datepicker.prototype, {
        markerClassName: 'hasDatepicker',
        maxRows: 4,
        log: function () {},
        _widgetDatepicker: function () {
            return this.dpDiv;
        },
        setDefaults: function (settings) {
            extendRemove(this._defaults, settings || {});
            return this;
        },
        _attachDatepicker: function (target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute('date:' + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue);
                    } catch (err) {
                        inlineSettings[attrName] = attrValue;
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase();
            var inline = (nodeName == 'div' || nodeName == 'span');
            if (!target.id) {
                this.uuid += 1;
                target.id = 'dp' + this.uuid;
            }
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {});
            if (nodeName == 'input') {
                this._connectDatepicker(target, inst);
            } else if (inline) {
                this._inlineDatepicker(target, inst);
            }
        },
        _newInst: function (target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1');
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: (!inline ? this.dpDiv : bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))
            };
        },
        _connectDatepicker: function (target, inst) {
            var input = $(target);
            inst.append = $([]);
            inst.trigger = $([]);
            if (input.hasClass(this.markerClassName))
                return;
            this._attachments(input, inst);
            input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (event, key, value) {
                inst.settings[key] = value;
            }).bind("getData.datepicker", function (event, key) {
                return this._get(inst, key);
            });
            this._autoSize(inst);
            $.data(target, PROP_NAME, inst);
            if (inst.settings.disabled) {
                this._disableDatepicker(target);
            }
        },
        _attachments: function (input, inst) {
            var appendText = this._get(inst, 'appendText');
            var isRTL = this._get(inst, 'isRTL');
            if (inst.append)
                inst.append.remove();
            if (appendText) {
                inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
                input[isRTL ? 'before' : 'after'](inst.append);
            }
            input.unbind('focus', this._showDatepicker);
            if (inst.trigger)
                inst.trigger.remove();
            var showOn = this._get(inst, 'showOn');
            if (showOn == 'focus' || showOn == 'both')
                input.focus(this._showDatepicker);
            if (showOn == 'button' || showOn == 'both') {
                var buttonText = this._get(inst, 'buttonText');
                var buttonImage = this._get(inst, 'buttonImage');
                inst.trigger = $(this._get(inst, 'buttonImageOnly') ? $('<img/>').addClass(this._triggerClass).attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == '' ? buttonText : $('<img/>').attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                })));
                input[isRTL ? 'before' : 'after'](inst.trigger);
                inst.trigger.click(function () {
                    if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0])
                        $.datepicker._hideDatepicker();
                    else if ($.datepicker._datepickerShowing && $.datepicker._lastInput != input[0]) {
                        $.datepicker._hideDatepicker();
                        $.datepicker._showDatepicker(input[0]);
                    } else
                        $.datepicker._showDatepicker(input[0]);
                    return false;
                });
            }
        },
        _autoSize: function (inst) {
            if (this._get(inst, 'autoSize') && !inst.inline) {
                var date = new Date(2009, 12 - 1, 20);
                var dateFormat = this._get(inst, 'dateFormat');
                if (dateFormat.match(/[DM]/)) {
                    var findMax = function (names) {
                        var max = 0;
                        var maxI = 0;
                        for (var i = 0; i < names.length; i++) {
                            if (names[i].length > max) {
                                max = names[i].length;
                                maxI = i;
                            }
                        }
                        return maxI;
                    };
                    date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ? 'monthNames' : 'monthNamesShort'))));
                    date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ? 'dayNames' : 'dayNamesShort'))) + 20 - date.getDay());
                }
                inst.input.attr('size', this._formatDate(inst, date).length);
            }
        },
        _inlineDatepicker: function (target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName))
                return;
            divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function (event, key, value) {
                inst.settings[key] = value;
            }).bind("getData.datepicker", function (event, key) {
                return this._get(inst, key);
            });
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst), true);
            this._updateDatepicker(inst);
            this._updateAlternate(inst);
            if (inst.settings.disabled) {
                this._disableDatepicker(target);
            }
            inst.dpDiv.css("display", "block");
        },
        _dialogDatepicker: function (input, date, onSelect, settings, pos) {
            var inst = this._dialogInst;
            if (!inst) {
                this.uuid += 1;
                var id = 'dp' + this.uuid;
                this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                $('body').append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, false);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst);
            }
            extendRemove(inst.settings, settings || {});
            date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
            this._dialogInput.val(date);
            this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                var browserWidth = document.documentElement.clientWidth;
                var browserHeight = document.documentElement.clientHeight;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
            }
            this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
            inst.settings.onSelect = onSelect;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI)
                $.blockUI(this.dpDiv);
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this;
        },
        _destroyDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName == 'input') {
                inst.append.remove();
                inst.trigger.remove();
                $target.removeClass(this.markerClassName).unbind('focus', this._showDatepicker).unbind('keydown', this._doKeyDown).unbind('keypress', this._doKeyPress).unbind('keyup', this._doKeyUp);
            } else if (nodeName == 'div' || nodeName == 'span')
                $target.removeClass(this.markerClassName).empty();
        },
        _enableDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == 'input') {
                target.disabled = false;
                inst.trigger.filter('button').each(function () {
                    this.disabled = false;
                }).end().filter('img').css({
                    opacity: '1.0',
                    cursor: ''
                });
            } else if (nodeName == 'div' || nodeName == 'span') {
                var inline = $target.children('.' + this._inlineClass);
                inline.children().removeClass('ui-state-disabled');
                inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false);
            }
            this._disabledInputs = $.map(this._disabledInputs, function (value) {
                return (value == target ? null : value);
            });
        },
        _disableDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return;
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == 'input') {
                target.disabled = true;
                inst.trigger.filter('button').each(function () {
                    this.disabled = true;
                }).end().filter('img').css({
                    opacity: '0.5',
                    cursor: 'default'
                });
            } else if (nodeName == 'div' || nodeName == 'span') {
                var inline = $target.children('.' + this._inlineClass);
                inline.children().addClass('ui-state-disabled');
                inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true);
            }
            this._disabledInputs = $.map(this._disabledInputs, function (value) {
                return (value == target ? null : value);
            });
            this._disabledInputs[this._disabledInputs.length] = target;
        },
        _isDisabledDatepicker: function (target) {
            if (!target) {
                return false;
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] == target)
                    return true;
            }
            return false;
        },
        _getInst: function (target) {
            try {
                return $.data(target, PROP_NAME);
            } catch (err) {
                throw 'Missing instance data for this datepicker';
            }
        },
        _optionDatepicker: function (target, name, value) {
            var inst = this._getInst(target);
            if (arguments.length == 2 && typeof name == 'string') {
                return (name == 'defaults' ? $.extend({}, $.datepicker._defaults) : (inst ? (name == 'all' ? $.extend({}, inst.settings) : this._get(inst, name)) : null));
            }
            var settings = name || {};
            if (typeof name == 'string') {
                settings = {};
                settings[name] = value;
            }
            if (inst) {
                if (this._curInst == inst) {
                    this._hideDatepicker();
                }
                var date = this._getDateDatepicker(target, true);
                var minDate = this._getMinMaxDate(inst, 'min');
                var maxDate = this._getMinMaxDate(inst, 'max');
                extendRemove(inst.settings, settings);
                if (minDate !== null && settings['dateFormat'] !== undefined && settings['minDate'] === undefined)
                    inst.settings.minDate = this._formatDate(inst, minDate);
                if (maxDate !== null && settings['dateFormat'] !== undefined && settings['maxDate'] === undefined)
                    inst.settings.maxDate = this._formatDate(inst, maxDate);
                this._attachments($(target), inst);
                this._autoSize(inst);
                this._setDate(inst, date);
                this._updateAlternate(inst);
                this._updateDatepicker(inst);
            }
        },
        _changeDatepicker: function (target, name, value) {
            this._optionDatepicker(target, name, value);
        },
        _refreshDatepicker: function (target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateDatepicker(inst);
            }
        },
        _setDateDatepicker: function (target, date) {
            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date);
                this._updateDatepicker(inst);
                this._updateAlternate(inst);
            }
        },
        _getDateDatepicker: function (target, noDefault) {
            var inst = this._getInst(target);
            if (inst && !inst.inline)
                this._setDateFromField(inst, noDefault);
            return (inst ? this._getDate(inst) : null);
        },
        _doKeyDown: function (event) {
            var inst = $.datepicker._getInst(event.target);
            var handled = true;
            var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
            inst._keyEvent = true;
            if ($.datepicker._datepickerShowing)
                switch (event.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker();
                        handled = false;
                        break;
                    case 13:
                        var sel = $('td.' + $.datepicker._dayOverClass + ':not(.' +
                            $.datepicker._currentClass + ')', inst.dpDiv);
                        if (sel[0])
                            $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
                        var onSelect = $.datepicker._get(inst, 'onSelect');
                        if (onSelect) {
                            var dateStr = $.datepicker._formatDate(inst);
                            onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
                        } else
                            $.datepicker._hideDatepicker();
                        return false;
                        break;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths')), 'M');
                        break;
                    case 34:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths')), 'M');
                        break;
                    case 35:
                        if (event.ctrlKey || event.metaKey) $.datepicker._clearDate(event.target);
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 36:
                        if (event.ctrlKey || event.metaKey) $.datepicker._gotoToday(event.target);
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 37:
                        if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths')), 'M');
                        break;
                    case 38:
                        if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, -7, 'D');
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 39:
                        if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths')), 'M');
                        break;
                    case 40:
                        if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, +7, 'D');
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    default:
                        handled = false;
            } else if (event.keyCode == 36 && event.ctrlKey)
                $.datepicker._showDatepicker(this);
            else {
                handled = false;
            }
            if (handled) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        _doKeyPress: function (event) {
            var inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, 'constrainInput')) {
                var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
                var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || event.metaKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
            }
        },
        _doKeyUp: function (event) {
            var inst = $.datepicker._getInst(event.target);
            if (inst.input.val() != inst.lastVal) {
                try {
                    var date = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'), (inst.input ? inst.input.val() : null), $.datepicker._getFormatConfig(inst));
                    if (date) {
                        $.datepicker._setDateFromField(inst);
                        $.datepicker._updateAlternate(inst);
                        $.datepicker._updateDatepicker(inst);
                    }
                } catch (err) {
                    $.datepicker.log(err);
                }
            }
            return true;
        },
        _showDatepicker: function (input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() != 'input')
                input = $('input', input.parentNode)[0];
            if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input)
                return;
            var inst = $.datepicker._getInst(input);
            if ($.datepicker._curInst && $.datepicker._curInst != inst) {
                $.datepicker._curInst.dpDiv.stop(true, true);
                if (inst && $.datepicker._datepickerShowing) {
                    $.datepicker._hideDatepicker($.datepicker._curInst.input[0]);
                }
            }
            var beforeShow = $.datepicker._get(inst, 'beforeShow');
            var beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
            if (beforeShowSettings === false) {
                return;
            }
            extendRemove(inst.settings, beforeShowSettings);
            inst.lastVal = null;
            $.datepicker._lastInput = input;
            $.datepicker._setDateFromField(inst);
            if ($.datepicker._inDialog)
                input.value = '';
            if (!$.datepicker._pos) {
                $.datepicker._pos = $.datepicker._findPos(input);
                $.datepicker._pos[1] += input.offsetHeight;
            }
            var isFixed = false;
            $(input).parents().each(function () {
                isFixed |= $(this).css('position') == 'fixed';
                return !isFixed;
            });
            var offset = {
                left: $.datepicker._pos[0],
                top: $.datepicker._pos[1]
            };
            $.datepicker._pos = null;
            inst.dpDiv.empty();
            inst.dpDiv.css({
                position: 'absolute',
                display: 'block',
                top: '-1000px'
            });
            $.datepicker._updateDatepicker(inst);
            offset = $.datepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({
                position: ($.datepicker._inDialog && $.blockUI ? 'static' : (isFixed ? 'fixed' : 'absolute')),
                display: 'none',
                left: offset.left + 'px',
                top: offset.top + 'px'
            });
            if (!inst.inline) {
                var showAnim = $.datepicker._get(inst, 'showAnim');
                var duration = $.datepicker._get(inst, 'duration');
                var postProcess = function () {
                    var cover = inst.dpDiv.find('iframe.ui-datepicker-cover');
                    if ( !! cover.length) {
                        var borders = $.datepicker._getBorders(inst.dpDiv);
                        cover.css({
                            left: -borders[0],
                            top: -borders[1],
                            width: inst.dpDiv.outerWidth(),
                            height: inst.dpDiv.outerHeight()
                        });
                    }
                };
                inst.dpDiv.zIndex($(input).zIndex() + 1);
                $.datepicker._datepickerShowing = true;
                if ($.effects && ($.effects.effect[showAnim] || $.effects[showAnim]))
                    inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
                else
                    inst.dpDiv[showAnim || 'show']((showAnim ? duration : null), postProcess); if (!showAnim || !duration)
                    postProcess();
                if (inst.input.is(':visible') && !inst.input.is(':disabled'))
                    inst.input.focus();
                $.datepicker._curInst = inst;
            }
        },
        _updateDatepicker: function (inst) {
            this.maxRows = 4;
            var borders = $.datepicker._getBorders(inst.dpDiv);
            instActive = inst;
            inst.dpDiv.empty().append(this._generateHTML(inst));
            this._attachHandlers(inst);
            var cover = inst.dpDiv.find('iframe.ui-datepicker-cover');
            if ( !! cover.length) {
                cover.css({
                    left: -borders[0],
                    top: -borders[1],
                    width: inst.dpDiv.outerWidth(),
                    height: inst.dpDiv.outerHeight()
                })
            }
            inst.dpDiv.find('.' + this._dayOverClass + ' a').mouseover();
            var numMonths = this._getNumberOfMonths(inst);
            var cols = numMonths[1];
            var width = 17;
            inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
            if (cols > 1)
                inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
            inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') + 'Class']('ui-datepicker-multi');
            inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') + 'Class']('ui-datepicker-rtl');
            if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input && inst.input.is(':visible') && !inst.input.is(':disabled') && inst.input[0] != document.activeElement)
                inst.input.focus();
            if (inst.yearshtml) {
                var origyearshtml = inst.yearshtml;
                setTimeout(function () {
                    if (origyearshtml === inst.yearshtml && inst.yearshtml) {
                        inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml);
                    }
                    origyearshtml = inst.yearshtml = null;
                }, 0);
            }
        },
        _getBorders: function (elem) {
            var convert = function (value) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[value] || value;
            };
            return [parseFloat(convert(elem.css('border-left-width'))), parseFloat(convert(elem.css('border-top-width')))];
        },
        _checkOffset: function (inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth();
            var dpHeight = inst.dpDiv.outerHeight();
            var inputWidth = inst.input ? inst.input.outerWidth() : 0;
            var inputHeight = inst.input ? inst.input.outerHeight() : 0;
            var viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft());
            var viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
            offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
            offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
            offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(dpHeight + inputHeight) : 0);
            return offset;
        },
        _findPos: function (obj) {
            var inst = this._getInst(obj);
            var isRTL = this._get(inst, 'isRTL');
            while (obj && (obj.type == 'hidden' || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
                obj = obj[isRTL ? 'previousSibling' : 'nextSibling'];
            }
            var position = $(obj).offset();
            return [position.left, position.top];
        },
        _hideDatepicker: function (input) {
            var inst = this._curInst;
            if (!inst || (input && inst != $.data(input, PROP_NAME)))
                return;
            if (this._datepickerShowing) {
                var showAnim = this._get(inst, 'showAnim');
                var duration = this._get(inst, 'duration');
                var postProcess = function () {
                    $.datepicker._tidyDialog(inst);
                };
                if ($.effects && ($.effects.effect[showAnim] || $.effects[showAnim]))
                    inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
                else
                    inst.dpDiv[(showAnim == 'slideDown' ? 'slideUp' : (showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))]((showAnim ? duration : null), postProcess); if (!showAnim)
                    postProcess();
                this._datepickerShowing = false;
                var onClose = this._get(inst, 'onClose');
                if (onClose)
                    onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ''), inst]);
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: 'absolute',
                        left: '0',
                        top: '-100px'
                    });
                    if ($.blockUI) {
                        $.unblockUI();
                        $('body').append(this.dpDiv);
                    }
                }
                this._inDialog = false;
            }
        },
        _tidyDialog: function (inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
        },
        _checkExternalClick: function (event) {
            if (!$.datepicker._curInst)
                return;
            var $target = $(event.target),
                inst = $.datepicker._getInst($target[0]);
            if ((($target[0].id != $.datepicker._mainDivId && $target.parents('#' + $.datepicker._mainDivId).length == 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI))) || ($target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != inst))
                $.datepicker._hideDatepicker();
        },
        _adjustDate: function (id, offset, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._isDisabledDatepicker(target[0])) {
                return;
            }
            this._adjustInstDate(inst, offset +
                (period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), period);
            this._updateDatepicker(inst);
        },
        _gotoToday: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear;
            } else {
                var date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear();
            }
            this._notifyChange(inst);
            this._adjustDate(target);
        },
        _selectMonthYear: function (id, select, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst['selected' + (period == 'M' ? 'Month' : 'Year')] = inst['draw' + (period == 'M' ? 'Month' : 'Year')] = parseInt(select.options[select.selectedIndex].value, 10);
            this._notifyChange(inst);
            this._adjustDate(target);
        },
        _selectDay: function (id, month, year, td) {
            var target = $(id);
            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                return;
            }
            var inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $('a', td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;
            this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
        },
        _clearDate: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            this._selectDate(target, '');
        },
        _selectDate: function (id, dateStr) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
            if (inst.input)
                inst.input.val(dateStr);
            this._updateAlternate(inst);
            var onSelect = this._get(inst, 'onSelect');
            if (onSelect)
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
            else if (inst.input)
                inst.input.trigger('change');
            if (inst.inline)
                this._updateDatepicker(inst);
            else {
                this._hideDatepicker();
                this._lastInput = inst.input[0];
                if (typeof (inst.input[0]) != 'object')
                    inst.input.focus();
                this._lastInput = null;
            }
        },
        _updateAlternate: function (inst) {
            var altField = this._get(inst, 'altField');
            if (altField) {
                var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
                var date = this._getDate(inst);
                var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function () {
                    $(this).val(dateStr);
                });
            }
        },
        noWeekends: function (date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), ''];
        },
        iso8601Week: function (date) {
            var checkDate = new Date(date.getTime());
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            checkDate.setMonth(0);
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
        },
        parseDate: function (format, value, settings) {
            if (format == null || value == null)
                throw 'Invalid arguments';
            value = (typeof value == 'object' ? value.toString() : value + '');
            if (value == '')
                return null;
            var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var year = -1;
            var month = -1;
            var day = -1;
            var doy = -1;
            var literal = false;
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            };
            var getNumber = function (match) {
                var isDoubled = lookAhead(match);
                var size = (match == '@' ? 14 : (match == '!' ? 20 : (match == 'y' && isDoubled ? 4 : (match == 'o' ? 3 : 2))));
                var digits = new RegExp('^\\d{1,' + size + '}');
                var num = value.substring(iValue).match(digits);
                if (!num)
                    throw 'Missing number at position ' + iValue;
                iValue += num[0].length;
                return parseInt(num[0], 10);
            };
            var getName = function (match, shortNames, longNames) {
                var names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
                    return [[k, v]];
                }).sort(function (a, b) {
                    return -(a[1].length - b[1].length);
                });
                var index = -1;
                $.each(names, function (i, pair) {
                    var name = pair[1];
                    if (value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
                        index = pair[0];
                        iValue += name.length;
                        return false;
                    }
                });
                if (index != -1)
                    return index + 1;
                else
                    throw 'Unknown name at position ' + iValue;
            };
            var checkLiteral = function () {
                if (value.charAt(iValue) != format.charAt(iFormat))
                    throw 'Unexpected literal at position ' + iValue;
                iValue++;
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                        literal = false;
                    else
                        checkLiteral();
                    else
                        switch (format.charAt(iFormat)) {
                            case 'd':
                                day = getNumber('d');
                                break;
                            case 'D':
                                getName('D', dayNamesShort, dayNames);
                                break;
                            case 'o':
                                doy = getNumber('o');
                                break;
                            case 'm':
                                month = getNumber('m');
                                break;
                            case 'M':
                                month = getName('M', monthNamesShort, monthNames);
                                break;
                            case 'y':
                                year = getNumber('y');
                                break;
                            case '@':
                                var date = new Date(getNumber('@'));
                                year = date.getFullYear();
                                month = date.getMonth() + 1;
                                day = date.getDate();
                                break;
                            case '!':
                                var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
                                year = date.getFullYear();
                                month = date.getMonth() + 1;
                                day = date.getDate();
                                break;
                            case "'":
                                if (lookAhead("'"))
                                    checkLiteral();
                                else
                                    literal = true;
                                break;
                            default:
                                checkLiteral();
                    }
            }
            if (iValue < value.length) {
                var extra = value.substr(iValue);
                if (!/^\s+/.test(extra)) {
                    throw "Extra/unparsed characters found in date: " + extra;
                }
            }
            if (year == -1)
                year = new Date().getFullYear();
            else if (year < 100)
                year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                    (year <= shortYearCutoff ? 0 : -100);
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim)
                        break;
                    month++;
                    day -= dim;
                } while (true);
            }
            var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
                throw 'Invalid date';
            return date;
        },
        ATOM: 'yy-mm-dd',
        COOKIE: 'D, dd M yy',
        ISO_8601: 'yy-mm-dd',
        RFC_822: 'D, d M y',
        RFC_850: 'DD, dd-M-y',
        RFC_1036: 'D, d M y',
        RFC_1123: 'D, d M yy',
        RFC_2822: 'D, d M yy',
        RSS: 'D, d M y',
        TICKS: '!',
        TIMESTAMP: '@',
        W3C: 'yy-mm-dd',
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
            Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        formatDate: function (format, date, settings) {
            if (!date)
                return '';
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            };
            var formatNumber = function (match, value, len) {
                var num = '' + value;
                if (lookAhead(match))
                    while (num.length < len)
                        num = '0' + num;
                return num;
            };
            var formatName = function (match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value]);
            };
            var output = '';
            var literal = false;
            if (date)
                for (var iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal)
                        if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                            literal = false;
                        else
                            output += format.charAt(iFormat);
                        else
                            switch (format.charAt(iFormat)) {
                                case 'd':
                                    output += formatNumber('d', date.getDate(), 2);
                                    break;
                                case 'D':
                                    output += formatName('D', date.getDay(), dayNamesShort, dayNames);
                                    break;
                                case 'o':
                                    output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                                    break;
                                case 'm':
                                    output += formatNumber('m', date.getMonth() + 1, 2);
                                    break;
                                case 'M':
                                    output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
                                    break;
                                case 'y':
                                    output += (lookAhead('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                                    break;
                                case '@':
                                    output += date.getTime();
                                    break;
                                case '!':
                                    output += date.getTime() * 10000 + this._ticksTo1970;
                                    break;
                                case "'":
                                    if (lookAhead("'"))
                                        output += "'";
                                    else
                                        literal = true;
                                    break;
                                default:
                                    output += format.charAt(iFormat);
                        }
            }
            return output;
        },
        _possibleChars: function (format) {
            var chars = '';
            var literal = false;
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches;
            };
            for (var iFormat = 0; iFormat < format.length; iFormat++)
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                        literal = false;
                    else
                        chars += format.charAt(iFormat);
                    else
                        switch (format.charAt(iFormat)) {
                            case 'd':
                            case 'm':
                            case 'y':
                            case '@':
                                chars += '0123456789';
                                break;
                            case 'D':
                            case 'M':
                                return null;
                            case "'":
                                if (lookAhead("'"))
                                    chars += "'";
                                else
                                    literal = true;
                                break;
                            default:
                                chars += format.charAt(iFormat);
                    }
            return chars;
        },
        _get: function (inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
        },
        _setDateFromField: function (inst, noDefault) {
            if (inst.input.val() == inst.lastVal) {
                return;
            }
            var dateFormat = this._get(inst, 'dateFormat');
            var dates = inst.lastVal = inst.input ? inst.input.val() : null;
            var date, defaultDate;
            date = defaultDate = this._getDefaultDate(inst);
            var settings = this._getFormatConfig(inst);
            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate;
            } catch (event) {
                this.log(event);
                dates = (noDefault ? '' : dates);
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst);
        },
        _getDefaultDate: function (inst) {
            return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()));
        },
        _determineDate: function (inst, date, defaultDate) {
            var offsetNumeric = function (offset) {
                var date = new Date();
                date.setDate(date.getDate() + offset);
                return date;
            };
            var offsetString = function (offset) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'), offset, $.datepicker._getFormatConfig(inst));
                } catch (e) {}
                var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
                var matches = pattern.exec(offset);
                while (matches) {
                    switch (matches[2] || 'd') {
                        case 'd':
                        case 'D':
                            day += parseInt(matches[1], 10);
                            break;
                        case 'w':
                        case 'W':
                            day += parseInt(matches[1], 10) * 7;
                            break;
                        case 'm':
                        case 'M':
                            month += parseInt(matches[1], 10);
                            day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                            break;
                        case 'y':
                        case 'Y':
                            year += parseInt(matches[1], 10);
                            day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                            break;
                    }
                    matches = pattern.exec(offset);
                }
                return new Date(year, month, day);
            };
            var newDate = (date == null || date === '' ? defaultDate : (typeof date == 'string' ? offsetString(date) : (typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
            newDate = (newDate && newDate.toString() == 'Invalid Date' ? defaultDate : newDate);
            if (newDate) {
                newDate.setHours(0);
                newDate.setMinutes(0);
                newDate.setSeconds(0);
                newDate.setMilliseconds(0);
            }
            return this._daylightSavingAdjust(newDate);
        },
        _daylightSavingAdjust: function (date) {
            if (!date) return null;
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date;
        },
        _setDate: function (inst, date, noChange) {
            var clear = !date;
            var origMonth = inst.selectedMonth;
            var origYear = inst.selectedYear;
            var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
            inst.selectedDay = inst.currentDay = newDate.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
            if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange)
                this._notifyChange(inst);
            this._adjustInstDate(inst);
            if (inst.input) {
                inst.input.val(clear ? '' : this._formatDate(inst));
            }
        },
        _getDate: function (inst) {
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return startDate;
        },
        _attachHandlers: function (inst) {
            var stepMonths = this._get(inst, 'stepMonths');
            var id = '#' + inst.id.replace(/\\\\/g, "\\");
            inst.dpDiv.find('[data-handler]').map(function () {
                var handler = {
                    prev: function () {
                        window['DP_jQuery_' + dpuuid].datepicker._adjustDate(id, -stepMonths, 'M');
                    },
                    next: function () {
                        window['DP_jQuery_' + dpuuid].datepicker._adjustDate(id, +stepMonths, 'M');
                    },
                    hide: function () {
                        window['DP_jQuery_' + dpuuid].datepicker._hideDatepicker();
                    },
                    today: function () {
                        window['DP_jQuery_' + dpuuid].datepicker._gotoToday(id);
                    },
                    selectDay: function () {
                        window['DP_jQuery_' + dpuuid].datepicker._selectDay(id, +this.getAttribute('data-month'), +this.getAttribute('data-year'), this);
                        return false;
                    },
                    selectMonth: function () {
                        window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(id, this, 'M');
                        return false;
                    },
                    selectYear: function () {
                        window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(id, this, 'Y');
                        return false;
                    }
                };
                $(this).bind(this.getAttribute('data-event'), handler[this.getAttribute('data-handler')]);
            });
        },
        _generateHTML: function (inst) {
            var today = new Date();
            today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
            var isRTL = this._get(inst, 'isRTL');
            var showButtonPanel = this._get(inst, 'showButtonPanel');
            var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
            var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
            var numMonths = this._getNumberOfMonths(inst);
            var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
            var stepMonths = this._get(inst, 'stepMonths');
            var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
            var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            var minDate = this._getMinMaxDate(inst, 'min');
            var maxDate = this._getMinMaxDate(inst, 'max');
            var drawMonth = inst.drawMonth - showCurrentAtPos;
            var drawYear = inst.drawYear;
            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--;
            }
            if (maxDate) {
                var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
                maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
                while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--;
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;
            var prevText = this._get(inst, 'prevText');
            prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
            var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click"' + ' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' : (hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
            var nextText = this._get(inst, 'nextText');
            nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
            var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click"' + ' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' : (hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
            var currentText = this._get(inst, 'currentText');
            var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
            currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
            var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' +
                this._get(inst, 'closeText') + '</button>' : '');
            var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : '') +
                (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click"' + '>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
            var firstDay = parseInt(this._get(inst, 'firstDay'), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);
            var showWeek = this._get(inst, 'showWeek');
            var dayNames = this._get(inst, 'dayNames');
            var dayNamesShort = this._get(inst, 'dayNamesShort');
            var dayNamesMin = this._get(inst, 'dayNamesMin');
            var monthNames = this._get(inst, 'monthNames');
            var monthNamesShort = this._get(inst, 'monthNamesShort');
            var beforeShowDay = this._get(inst, 'beforeShowDay');
            var showOtherMonths = this._get(inst, 'showOtherMonths');
            var selectOtherMonths = this._get(inst, 'selectOtherMonths');
            var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
            var defaultDate = this._getDefaultDate(inst);
            var html = '';
            for (var row = 0; row < numMonths[0]; row++) {
                var group = '';
                this.maxRows = 4;
                for (var col = 0; col < numMonths[1]; col++) {
                    var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                    var cornerClass = ' ui-corner-all';
                    var calender = '';
                    if (isMultiMonth) {
                        calender += '<div class="ui-datepicker-group';
                        if (numMonths[1] > 1)
                            switch (col) {
                                case 0:
                                    calender += ' ui-datepicker-group-first';
                                    cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left');
                                    break;
                                case numMonths[1] - 1:
                                    calender += ' ui-datepicker-group-last';
                                    cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right');
                                    break;
                                default:
                                    calender += ' ui-datepicker-group-middle';
                                    cornerClass = '';
                                    break;
                        }
                        calender += '">';
                    }
                    calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' +
                        (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') +
                        (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') +
                        this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead>' + '<tr>';
                    var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
                    for (var dow = 0; dow < 7; dow++) {
                        var day = (dow + firstDay) % 7;
                        thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' + '<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
                    }
                    calender += thead + '</tr></thead><tbody>';
                    var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
                    var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                    var curRows = Math.ceil((leadDays + daysInMonth) / 7);
                    var numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows);
                    this.maxRows = numRows;
                    var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                    for (var dRow = 0; dRow < numRows; dRow++) {
                        calender += '<tr>';
                        var tbody = (!showWeek ? '' : '<td class="ui-datepicker-week-col">' +
                            this._get(inst, 'calculateWeek')(printDate) + '</td>');
                        for (var dow = 0; dow < 7; dow++) {
                            var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
                            var otherMonth = (printDate.getMonth() != drawMonth);
                            var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                            tbody += '<td class="' +
                                ((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') +
                                (otherMonth ? ' ui-datepicker-other-month' : '') +
                                ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? ' ' + this._dayOverClass : '') +
                                (unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') +
                                (otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] +
                                (printDate.getTime() == currentDate.getTime() ? ' ' + this._currentClass : '') +
                                (printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' +
                                ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') +
                                (unselectable ? '' : ' data-handler="selectDay" data-event="click" data-month="' + printDate.getMonth() + '" data-year="' + printDate.getFullYear() + '"') + '>' +
                                (otherMonth && !showOtherMonths ? '&#xa0;' : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' +
                                (printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') +
                                (printDate.getTime() == currentDate.getTime() ? ' ui-state-active' : '') +
                                (otherMonth ? ' ui-priority-secondary' : '') + '" href="#">' + printDate.getDate() + '</a>')) + '</td>';
                            printDate.setDate(printDate.getDate() + 1);
                            printDate = this._daylightSavingAdjust(printDate);
                        }
                        calender += tbody + '</tr>';
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++;
                    }
                    calender += '</tbody></table>' + (isMultiMonth ? '</div>' +
                        ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
                    group += calender;
                }
                html += group;
            }
            html += buttonPanel + ($.ui.ie6 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
            inst._keyEvent = false;
            return html;
        },
        _generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
            var changeMonth = this._get(inst, 'changeMonth');
            var changeYear = this._get(inst, 'changeYear');
            var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
            var html = '<div class="ui-datepicker-title">';
            var monthHtml = '';
            if (secondary || !changeMonth)
                monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
            else {
                var inMinYear = (minDate && minDate.getFullYear() == drawYear);
                var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
                monthHtml += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
                for (var month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()))
                        monthHtml += '<option value="' + month + '"' +
                            (month == drawMonth ? ' selected="selected"' : '') + '>' + monthNamesShort[month] + '</option>';
                }
                monthHtml += '</select>';
            }
            if (!showMonthAfterYear)
                html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
            if (!inst.yearshtml) {
                inst.yearshtml = '';
                if (secondary || !changeYear)
                    html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
                else {
                    var years = this._get(inst, 'yearRange').split(':');
                    var thisYear = new Date().getFullYear();
                    var determineYear = function (value) {
                        var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) : (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10)));
                        return (isNaN(year) ? thisYear : year);
                    };
                    var year = determineYear(years[0]);
                    var endYear = Math.max(year, determineYear(years[1] || ''));
                    year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                    endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                    inst.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
                    for (; year <= endYear; year++) {
                        inst.yearshtml += '<option value="' + year + '"' +
                            (year == drawYear ? ' selected="selected"' : '') + '>' + year + '</option>';
                    }
                    inst.yearshtml += '</select>';
                    html += inst.yearshtml;
                    inst.yearshtml = null;
                }
            }
            html += this._get(inst, 'yearSuffix');
            if (showMonthAfterYear)
                html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
            html += '</div>';
            return html;
        },
        _adjustInstDate: function (inst, offset, period) {
            var year = inst.drawYear + (period == 'Y' ? offset : 0);
            var month = inst.drawMonth + (period == 'M' ? offset : 0);
            var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
                (period == 'D' ? offset : 0);
            var date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period == 'M' || period == 'Y')
                this._notifyChange(inst);
        },
        _restrictMinMax: function (inst, date) {
            var minDate = this._getMinMaxDate(inst, 'min');
            var maxDate = this._getMinMaxDate(inst, 'max');
            var newDate = (minDate && date < minDate ? minDate : date);
            newDate = (maxDate && newDate > maxDate ? maxDate : newDate);
            return newDate;
        },
        _notifyChange: function (inst) {
            var onChange = this._get(inst, 'onChangeMonthYear');
            if (onChange)
                onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst]);
        },
        _getNumberOfMonths: function (inst) {
            var numMonths = this._get(inst, 'numberOfMonths');
            return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
        },
        _getMinMaxDate: function (inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
        },
        _getDaysInMonth: function (year, month) {
            return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
        },
        _getFirstDayOfMonth: function (year, month) {
            return new Date(year, month, 1).getDay();
        },
        _canAdjustMonth: function (inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst);
            var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
            if (offset < 0)
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
            return this._isInRange(inst, date);
        },
        _isInRange: function (inst, date) {
            var minDate = this._getMinMaxDate(inst, 'min');
            var maxDate = this._getMinMaxDate(inst, 'max');
            return ((!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()));
        },
        _getFormatConfig: function (inst) {
            var shortYearCutoff = this._get(inst, 'shortYearCutoff');
            shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            return {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, 'dayNamesShort'),
                dayNames: this._get(inst, 'dayNames'),
                monthNamesShort: this._get(inst, 'monthNamesShort'),
                monthNames: this._get(inst, 'monthNames')
            };
        },
        _formatDate: function (inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear;
            }
            var date = (day ? (typeof day == 'object' ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
        }
    });

    function bindHover(dpDiv) {
        var selector = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
        return dpDiv.delegate(selector, 'mouseout', function () {
            $(this).removeClass('ui-state-hover');
            if (this.className.indexOf('ui-datepicker-prev') != -1) $(this).removeClass('ui-datepicker-prev-hover');
            if (this.className.indexOf('ui-datepicker-next') != -1) $(this).removeClass('ui-datepicker-next-hover');
        }).delegate(selector, 'mouseover', function () {
            if (!$.datepicker._isDisabledDatepicker(instActive.inline ? dpDiv.parent()[0] : instActive.input[0])) {
                $(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
                $(this).addClass('ui-state-hover');
                if (this.className.indexOf('ui-datepicker-prev') != -1) $(this).addClass('ui-datepicker-prev-hover');
                if (this.className.indexOf('ui-datepicker-next') != -1) $(this).addClass('ui-datepicker-next-hover');
            }
        });
    }

    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props)
            if (props[name] == null || props[name] == undefined)
                target[name] = props[name];
        return target;
    };
    $.fn.datepicker = function (options) {
        if (!this.length) {
            return this;
        }
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick).find(document.body).append($.datepicker.dpDiv);
            $.datepicker.initialized = true;
        }
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate' || options == 'widget'))
            return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
        if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
            return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
        return this.each(function () {
            typeof options == 'string' ? $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
        });
    };
    $.datepicker = new Datepicker();
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.9.2";
    window['DP_jQuery_' + dpuuid] = $;
})(jQuery);
jQuery(function (e) {
    e.datepicker.regional.de_DE = {
        closeText: "schlieï¿½en",
        prevText: "&#x3C;zurï¿½ck",
        nextText: "Vor&#x3E;",
        currentText: "heute",
        monthNames: ["Januar", "Februar", "Mï¿½rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        monthNamesShort: ["Jan", "Feb", "Mï¿½r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        weekHeader: "KW",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    }
});
jQuery(function (e) {
    e.datepicker.regional["en_GB"] = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    }
});
jQuery(function (e) {
    e.datepicker.regional.es_ES = {
        closeText: "Cerrar",
        prevText: "&#x3C;Ant",
        nextText: "Sig&#x3E;",
        currentText: "Hoy",
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        dayNames: ["Domingo", "Lunes", "Martes", "Miï¿½rcoles", "Jueves", "Viernes", "Sï¿½bado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Miï¿½", "Juv", "Vie", "Sï¿½b"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sï¿½"],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    }
});
jQuery(function (e) {
    e.datepicker.regional.fr_FR = {
        closeText: "Fermer",
        prevText: "Prï¿½cï¿½dent",
        nextText: "Suivant",
        currentText: "Aujourd'hui",
        monthNames: ["Janvier", "Fï¿½vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aoï¿½t", "Septembre", "Octobre", "Novembre", "Dï¿½cembre"],
        monthNamesShort: ["Janv.", "Fï¿½vr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Aoï¿½t", "Sept.", "Oct.", "Nov.", "Dï¿½c."],
        dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
        dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
        weekHeader: "Sem.",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    }
});
var Utils = Utils || {};
Utils.buildQueryString = function (parameters) {
    var results = ["?"];
    for (var param in parameters) {
        if (parameters.hasOwnProperty(param)) {
            results.push(param + "=" + parameters[param] + "&");
        }
    }
    return results.join("").slice(0, -1);
};
Utils.returnStandardFormattedDate_ddmmyyyy = function (theDateToFormat) {
    return (theDateToFormat.getDate() < 10 ? "0" + theDateToFormat.getDate().toString() : theDateToFormat.getDate().toString()) + "/" +
        (theDateToFormat.getMonth() + 1 < 10 ? "0" + (theDateToFormat.getMonth() + 1).toString() : (theDateToFormat.getMonth() + 1).toString()) + "/" +
        theDateToFormat.getFullYear().toString();
};
Utils.getQueryString = function (url) {
    var url = url.split("?");
    var queryString = url.length === 2 ? url[1] : "";
    return queryString.length > 0 ? queryString.split("#")[0] : "";
};
Utils.parseQueryString = function (queryString) {
    var obj = {};
    if (!queryString) {
        return {};
    }
    $.each(queryString.replace(/\+/g, ' ').split("&"), function (k, v) {
        var param, key, value;
        if (v.indexOf("=") >= 0) {
            param = v.split("=");
            key = param[0];
            value = param[1];
            obj[key] = value;
        } else {
            obj[v] = "";
        }
    });
    return obj;
};
Utils.setCookie = function (params) {
    $.cookie(params.name, params.value, params.options);
};
Utils.restrictMaxLengthTextArea = function (e) {
    var maxLength = parseInt($(e.currentTarget).attr('maxlength'));
    if ($(e.currentTarget).val().length > (maxLength - 1)) {
        $(e.currentTarget).val($(e.currentTarget).val().substring(0, maxLength));
    }
};
Utils.reduceDecimal = function (num1, num2) {
    var str1 = (num1.toString().split('.')[1] == undefined ? num1.toString() : num1.toString().split('.')[1]);
    var str2 = (num2.toString().split('.')[1] == undefined ? num2.toString() : num2.toString().split('.')[1]);
    return str1.length > str2.length ? str1.length : str2.length;
};
Utils.addDecimal = function (num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    num1 = (isNaN(num1) ? 0 : num1);
    num2 = (isNaN(num2) ? 0 : num2);
    var places = this.reduceDecimal(num1, num2);
    var v = num1 + num2;
    return parseFloat(v.toFixed(places));
};
Utils.multiplyDecimal = function (num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    num1 = (isNaN(num1) ? 0 : num1);
    num2 = (isNaN(num2) ? 0 : num2);
    var places = this.reduceDecimal(num1, num2);
    var v = num1 * num2;
    return parseFloat(v.toFixed(places));
};
Utils.divideDecimal = function (num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    num1 = (isNaN(num1) ? 0 : num1);
    num2 = (isNaN(num2) ? 0 : num2);
    var places = this.reduceDecimal(num1, num2);
    var v = num1 / num2;
    return parseFloat(v.toFixed(places));
};
Utils.disableOnClick = function (e) {
    e.stopPropagation();
    var $currentTarget = $(e.currentTarget);
    $currentTarget.attr('disabled', 'disabled');
    var $cancelButton = $currentTarget.siblings('.btn-cancel');
    $cancelButton.attr('disabled', 'disabled');
    $cancelButton.removeAttr('data-dismiss');
    $cancelButton.bind('click', function (e) {
        return false;
    });
    $currentTarget.closest('form').submit();
    return false;
};
Utils.isValidDateRange = function (startYear, startMonth, startDay, endYear, endMonth, endDay) {
    if (Utils.isEmptyDate(startYear, startMonth, startDay) && Utils.isEmptyDate(endYear, endMonth, endDay)) {
        return true;
    }
    if (Utils.isFilledDate(startYear, startMonth, startDay) && Utils.isFilledDate(endYear, endMonth, endDay)) {
        if (Utils.isValidDate(startYear, startMonth, startDay) && Utils.isValidDate(endYear, endMonth, endDay)) {
            var startDate = new Date(parseInt(startYear), parseInt(startMonth), parseInt(startDay)).getTime();
            var endDate = new Date(parseInt(endYear), parseInt(endMonth), parseInt(endDay)).getTime();
            return endDate >= startDate;
        }
    }
    return false;
};
Utils.isEmptyDate = function (year, month, day) {
    return year.length == 0 && month.length == 0 && day.length == 0;
};
Utils.isFilledDate = function (year, month, day) {
    return year.length > 0 && month.length > 0 && day.length > 0;
};
Utils.isValidDate = function (year, month, day) {
    var jsMonth = parseInt(month) - 1;
    var date = new Date(parseInt(year), jsMonth, parseInt(day));
    return date.getMonth() == jsMonth;
};
Utils.backButton = function (e) {
    e.preventDefault();
    window.location.replace(document.referrer)
    return false;
}
Utils.cancelRequest = function () {
    try {
        window.stop();
    } catch (e) {
        document.execCommand('Stop');
    }
}
Utils.removeDisplayedMsg = function () {
    _.each($(".msg"), function (element) {
        $(element).remove();
    });
}
_.templateSettings = {
    interpolate: /\<\@\=(.+?)\@\>/gim,
    evaluate: /\<\@(.+?)\@\>/gim
};
$(".confirm-dialog").ConfirmDialog({
    confirmMessages: Speedboat.Config.confirmMessages
});
$(".checkbox-toggle").CheckboxToggle();
$('.cleanMsg').click(Utils.removeDisplayedMsg);
$(".hijack-links").ModalAjax();
$(".ajax-post").each(function () {
    var $form = $(this);
    var formValidation = new SpeedboatUI.FormValidation($form);
    $form.AjaxPost({
        beforeSubmit: function () {
            return formValidation.validateForm();
        }
    });
});
$(".ui-wizard").Wizard();
$(".ajax-submit").AjaxFormSetup().on("beforeSubmit beforeMoveForward ", function (e) {
    var $target = $(e.target);
    if (!$target.data('plugin_FormValidation')) {
        $target.data('plugin_FormValidation', new SpeedboatUI.FormValidation(e.target));
    }
    var formValidation = $target.data('plugin_FormValidation');
    return formValidation.validateForm();
});
$("#catalogue").Catalogue();
(function () {
    var $forms = $(".validate-form").not(".ajax-submit");
    var formValidation = new SpeedboatUI.FormValidation($forms);
    $forms.on("submit", function (e) {
        if (!formValidation.validateForm()) {
            return false;
        }
        $(this).find("button[type=submit]").attr("disabled", "disabled");
    });
}());
(function () {
    var $modalForms = $(".validate-before-modal-form").not(".ajax-submit");
    var formValidation = new SpeedboatUI.FormValidation($modalForms);
    $modalForms.find('#confirmModal').on("click", function (e) {
        if (!formValidation.validateForm()) {
            return false;
        }
    });
}());
$(".toggle-switch").each(function () {
    var isRadioButtonChecked = $(this).closest(".toggle-container").find("input[type=radio]:checked").length;
    if (isRadioButtonChecked) {
        $(this).attr("checked", "checked");
        $(this).closest(".toggle-container").find(".toggle-content").show()
    }
}).change(function () {
    var $this = $(this);
    var $container = $this.closest(".toggle-container");
    if (this.checked) {
        $container.find(".toggle-content").slideDown();
        if ($container.find("input[type=radio]:checked").length == 0) {
            $container.find("input[type=radio]").first().attr("checked", true);
        }
    } else {
        $container.find(".toggle-content").slideUp(function () {
            $container.find(".toggle-content").find("input[type=radio]").attr("checked", false);
        })
    }
});
$(".btn-toggle").ButtonToggle();
$("#edit-profile-btn").on("beforeToggle", function () {
    var $editFormFields = $(this).closest(".toggle").next(".toggle").find("input,select,.input-xlarge").not("input[type=hidden]");
    var controls = $(this).closest(".toggle").first().find(".controls");
    controls.each(function (i) {
        var self = this;
        var $field = $($editFormFields[i]);
        if ($field.is("select")) {
            $field.find("option").filter(function () {
                return $(this).text() == $.trim($(self).text());
            }).attr("selected", true);
        } else {
            $($editFormFields[i]).val($.trim($(this).text()));
        }
    });
});
$("a[data-toggle='modal']").click(function (e) {
    if ($(this).hasClass("disabled")) {
        return false;
    }
});
$(".disabled-after-click").click(function (e) {
    $(this).button("loading");
});
$("#result-modal").modal('show');
$("#result-modal").modal('centre');
$("body").NewWindow();
$(".confirm").click(function () {
    var msg = $(this).data("msg");
    window.confirm(msg);
});
$(".table-fixed").each(function () {
    var $ths = $(this).find("th.table-fixed-dynamic");
    $ths.each(function () {
        $(this).width($(this).outerWidth());
    });
    $(this).addClass("table-fixed-layout");
});
$('#formAssets').AssetManager({
    classes: {
        assetInstance: "assetCheckbox"
    },
    ids: {
        createAndRun: "submitAsset"
    }
});
$('.disabledOnClick').click(Utils.disableOnClick);
$('form#openTicketFilter').PaginationManager({
    thePaginationForm: 'form#openTicketFilter',
    thePaginationTextfield: 'input.currentPageNumberTextbox'
});
$('form#openTicketFilter').FormsManager({
    formSelector: '#searchFilter'
});
$('form#openTicketFilter').FilteringManager();
$('table.sortableData').OrderingManager({
    windowContext: window
});
$('#ticketsPerPage').bind('change', function (e) {
    window.location = "//" + window.location.host + $('input#dynamic_filter').val() + "&ticketsPerPage=" + $(e.currentTarget).val() + "&currentPageNumber=1";
});
$('textarea[maxlength]').bind('keydown keyup focus', Utils.restrictMaxLengthTextArea);
$('textarea[maxlength]').bind('paste', function (evt) {
    var theEvent = evt;
    setTimeout(function () {
        Utils.restrictMaxLengthTextArea(theEvent)
    }, 100);
});
$('#createIncidentTicket a.disabled').click(function (e) {
    return false;
});
$('a#backButton').click(function (e) {
    Utils.backButton(e);
});
if ($('.collapsableContent')) {
    $('.collapsableContent').CollapseManager({
        maxLengthOfContent: 1000
    });
}