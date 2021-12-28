var controlData = {
        value: [], label: function (n) {
            return dataCatalog[n]
        }
    }, _landuseOption = {
        "127,255,223": {visible: !0, label: "Snow", value: 1},
        "255,61,68": {visible: !0, label: "Built-up", value: 2},
        "20,43,235": {visible: !0, label: "Waterbody", value: 3},
        "0,92,76": {visible: !0, label: "Forest", value: 4},
        "255,255,0": {visible: !0, label: "Irrigated Agriculture", value: 5},
        "230,168,0": {visible: !0, label: "Rainfed Agriculture", value: 6},
        "68,173,112": {visible: !0, label: "Fruit Trees", value: 7},
        "50,214,158": {visible: !0, label: "Vineyards", value: 8},
        "20,117,227": {visible: !0, label: "Marshland", value: 9},
        "204,204,196": {visible: !0, label: "Bare Land", value: 10},
        "196,215,148": {visible: !0, label: "Rangeland", value: 11},
        "194,87,0": {visible: !0, label: "Sand Cover", value: 12},
        "13,184,255": {visible: !0, label: "Streams", value: 13}
    },

    dataLib = {year: [2e3, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]},
    landcoverControl = function () {
        function wt() {
            p = new ol.source.Vector({});
            st = new ol.layer.Vector({
                source: p,
                style: new ol.style.Style({
                    fill: new ol.style.Fill({color: [250, 250, 250, 0]}),
                    stroke: new ol.style.Stroke({color: "red", width: 1.2})
                })
            });
            n.getMap().addLayer(st)
        }

        function bt(t) {
            t !== "none" && (o = new ol.interaction.Draw({source: p, type: t}), n.getMap().addInteraction(o));
            o.on("drawstart", function () {
                p.clear()
            });
            o.on("drawend", function () {
                b.show()
            })
        }

        function kt() {
            o != null && (p.clear(), n.getMap().removeInteraction(o), o = null)
        }

        function dt(n) {
            t = createDropDown([], "");
            var r = $('<div class="col-md-12" style="padding:0;margin-bottom:6px;"><span>Province<\/span><\/div>'),
                i = $('<div class="input-group"><\/div>');
            ft = $('<div class="btn btn-sm btn-default" style="padding:4px 5px 2px 5px;"><span class="esri-icon-zoom-in-magnifying-glass" style="font-size:1.2em;"><\/span><\/div>').appendTo($('<span class="input-group-btn"><\/span>').appendTo(i));
            t.appendTo(i);
            i.appendTo(r);
            r.appendTo(n)
        }

        function gt(n) {
            var i, r;
            n != null && (i = [], n.filter(function (n) {
                i.push(n.get("prov_34_na"))
            }), i.sort(), r = {label: i, value: i}, updateDropDown(t, r));
            t.prepend('<option value="all">All<\/option>');
            t[0].selectedIndex = 0
        }

        function ni(n) {
            for (var i, r = {label: dataLib.year, value: []}, t = 0; t < dataLib.year.length; t++) r.value.push(t);
            f = createDropDown(r, "");
            i = $('<div class="form-group"><span>Year<\/span><\/div>');
            f.appendTo($("<div/>").appendTo(i));
            i.appendTo(n)
        }

        function ti(t) {
            var i = $('<div style="margin-top:10px"/>');
            w = $('<span class="chkaoi chkbox glyphicon glyphicon-unchecked"><\/span>');
            w.appendTo(i);
            i.append('<span class="chkaoi">Draw AOI<\/span>');
            i.appendTo(t);
            i.hide();
            w = $(".chkaoi");
            b = $('<div class="btn btn-sm btn-custom" style="margin-top:10px;">Compute<\/div>');
            b.hide();
            b.appendTo(t);
            i = $('<div class="drawTool"/>');
            i.appendTo(n.getMapDiv());
            i = $('<div class="btn-group"/>').appendTo(i);
            e = $('<div class="btn btn-sm btn-default" data-toggle="tooltip" data-placement="right" title="Draw polygon"><span class="esri-icon-polygon"><\/span><\/div>');
            e.hide();
            e.appendTo(i)
        }

        function ii() {
            t.change(function () {
                ct();
                tt();
                lt();
                a(l($("#chkTrend")));
                ht()
            });
            f.change(function () {
                var n = it();
                ut(n);
                d.getSource().getFeatures().length > 0 && a()
            }).change();
            ft.click(function () {
                tt()
            });
            w.click(function () {
                var n = $(w[0]);
                l(n) ? (r(n, !1), e.tooltip("hide"), e.hide()) : (r(n, !0), e.show(), e.tooltip("show"))
            });
            e.tooltip();
            e.click(function () {
                o != null ? (kt(), $(this).removeClass("active"), $(this).attr("data-original-title", "Draw polygon"), a(), b.hide()) : ($(this).addClass("active"), $(this).attr("data-original-title", "Clear"), bt("Polygon"))
            });
            $(".chkTrend").click(function () {
                var n = $("#chkTrend");
                l(n) ? (r(n, !1), f.parent().parent().show(), a(!1)) : (r(n, !0), f.parent().parent().hide(), a(!0))
            })
        }

        function tt() {
            if (t.val() != "all") {
                var i = y.getSource().getFeatures()[0].getGeometry().getExtent();
                n.getMap().getView().fit(i, {size: n.getMap().getSize(), duration: 200})
            } else n.resetZoom()
        }

        function it() {
            var n = dataLib.year[f.val()];
            return "afg_lc_" + n
        }

        function ri() {
            et = si();
            d = ui();
            g = ei();
            hi(et);
            fi(d);
            oi(g);
            c = ci();
            y = new ol.layer.Vector({
                source: new ol.source.Vector({}),
                style: new ol.style.Style({
                    fill: new ol.style.Fill({color: [0, 0, 0, 0]}),
                    stroke: new ol.style.Stroke({color: [255, 0, 0, 1], width: 1.5})
                })
            });
            n.getMap().addLayer(y)
        }

        function rt(t, i, r) {
            n.createLayerControlItem(i, r, function (n, i, r) {
                n != undefined && (n.append(i), r.prop("checked", t.getVisible()), r.change(function () {
                    t != null && t.setVisible(r.is(":checked"))
                }))
            })
        }

        function ui() {
            var i = new ol.layer.Vector({
                source: new ol.source.Vector({}), style: function (i, r) {
                    var f = i.get("prov_34_na").toString(), e = t.val(), o = 0, u, s;
                    return e != "all" && f != e && (o = .8), u = new ol.style.Style({
                        fill: new ol.style.Fill({color: [250, 250, 250, o]}),
                        stroke: new ol.style.Stroke({color: [41, 41, 41, 1], width: .8})
                    }), i != null && (s = n.createTextStyle(r, {
                        text: f.toUpperCase() + "",
                        size: "10px",
                        weight: "normal",
                        outlineColor: "white",
                        outlineWidth: 3,
                        overflow: !0
                    }), u.text_ = s), u
                }
            });
            return n.getMap().addLayer(i), i.setVisible(!0), rt(i, "province", "Province"), i
        }

        function fi(n) {
            var t = new ol.source.Vector({
                url: "http://110.34.30.197:8080/geoserver/wfs?service=WFS&version=1.1.1&request=GetFeature&typename=Afghanistan:Province&outputFormat=application/json&srsname=EPSG:4326&",
                format: new ol.format.GeoJSON
            });
            n.setSource(t);
            t.on("change", function () {
                gt(t.getFeatures());
                a(l($("#chkTrend")))
            })
        }

        function ei() {
            var t = new ol.layer.Vector({
                source: new ol.source.Vector({}), style: function () {
                    return new ol.style.Style({
                        fill: new ol.style.Fill({color: [250, 250, 250, 0]}),
                        stroke: new ol.style.Stroke({color: [41, 41, 41, 1], width: .5})
                    })
                }
            });
            return n.getMap().addLayer(t), t.setVisible(!1), rt(t, "district", "District"), t
        }

        function oi(t) {
            var i = new ol.source.Vector({
                url: "http://110.34.30.197:8080/geoserver/wfs?service=WFS&version=1.1.1&request=GetFeature&typename=Afghanistan:District&outputFormat=application/json&srsname=EPSG:4326&",
                format: new ol.format.GeoJSON
            });
            t.setSource(i);
            t.setVisible(!0);
            n.showLoader();
            i.on("change", function () {
                t.setVisible(!1);
                n.hideLoader()
            })
        }

        function si() {
            var t = new ol.layer.Vector({
                source: new ol.source.Vector({}), style: function () {
                    return new ol.style.Style({
                        fill: new ol.style.Fill({color: [250, 250, 250, 0]}),
                        stroke: new ol.style.Stroke({color: [41, 41, 41, 1], width: 1.5})
                    })
                }
            });
            return n.getMap().addLayer(t), rt(t, "outline", "Country"), t.setVisible(!0), t
        }

        function hi(n) {
            var t = new ol.source.Vector({
                url: "http://110.34.30.197:8080/geoserver/wfs?service=WFS&version=1.1.1&request=GetFeature&typename=Afghanistan:Country&outputFormat=application/json&srsname=EPSG:4326&",
                format: new ol.format.GeoJSON,
                crossOrigin: "anonymous"
            });
            n.setSource(t)
        }

        function ci() {
            var t = new ol.layer.Image({source: new ol.source.ImageWMS({}), opacity: 1});
            return n.getMap().getLayers().insertAt(1, t), t
        }

        function ht() {
            var n, i, r;
            v != null && v.length != 0 && (v.parent().show(), n = "", n = t.val() == null || t.val() == "all" ? " Afghanistan in " : t.val() + " in ", i = f.val(), r = dataLib.year[i], v.html("Landcover for " + n + r))
        }

        function ct() {
            var i = $('option[value="' + t.val() + '"]', t).text(), n;
            (y.getSource().clear(), i != "all") && (n = wi(d, "prov_34_na", i), n != null && y.getSource().addFeature(n))
        }

        function ut(t) {
            ht();
            ot = new ol.source.ImageWMS({
                ratio: 1,
                url: "http://110.34.30.197:8080/geoserver/Afghanistan_LULC/wms",
                params: {
                    FORMAT: "image/png",
                    VERSION: "1.1.1",
                    LAYERS: "Afghanistan_LULC:" + t,
                    exceptions: "application/vnd.ogc.se_inimage"
                },
                crossOrigin: "anonymous"
            });
            var i = new ol.source.Raster({
                sources: [ot], operation: function (n, t) {
                    var i = n[0], r = i[0] + "," + i[1] + "," + i[2];
                    return t.landuse[r] != null && t.landuse[r].visible == !1 ? [0, 0, 0, 1] : n[0]
                }, crossOrigin: "anonymous"
            });
            i.on("beforeoperations", function (n) {
                n.data.landuse = _landuseOption
            });
            i.on("afteroperations", function () {
                li()
            });
            c.setSource(i);
            c.getSource().on("imageloadstart", n.showLoader);
            c.getSource().on("imageloadend", n.hideLoader)
        }

        function li() {
            if (u != null && s == null) {
                var n = "", t = 0;
                $.each(_landuseOption, function (i, r) {
                    n += '<li><span class="legendTick glyphicon glyphicon-check" data-id="' + i + '" chart-id="' + t + '"/><span style="border:1px solid #333;background-color:rgb(' + i + ')"><\/span><span class="legendlabel">' + r.label + "<\/span><\/li>";
                    t += 1
                });
                u.legendList.css("margin-left", "8px");
                u.legendList.html(n);
                u.title.css("margin-bottom", "6px");
                u.title.html(ai()).show();
                s = $(".legendTick", u.element);
                k = $("#lgdLC", u.element);
                s.click(function () {
                    var n = $(this).attr("data-id"), t = $(this).attr("chart-id"), u;
                    _landuseOption[n].visible = !_landuseOption[n].visible;
                    l($(this)) ? (r($(this), !1), i != null && i.series[t].update({visible: !1})) : (r($(this), !0), i != null && i.series[t].update({visible: !0}));
                    u = it();
                    ut(u)
                });
                k.click(function () {
                    var n = 0, t;
                    l($(this)) ? (r($(this), !1), r($(".legendTick", u.element), !1), $.each(_landuseOption, function (t, r) {
                        r.visible = !1;
                        i != null && i.series[n].update({visible: !1});
                        n += 1
                    })) : (r($(this), !0), lt());
                    t = it();
                    ut(t)
                });
                nt != undefined && nt(u)
            }
        }

        function lt() {
            var n = 0;
            s != null && r(s, !0);
            $.each(_landuseOption, function (t, r) {
                r.visible = !0;
                i != null && i.series[n].update({visible: !0});
                n += 1
            });
            s != null && r(k, !0)
        }

        function l(n) {
            if (n.hasClass("glyphicon-check")) return !0;
            !1
        }

        function r(n, t) {
            t ? (n.addClass("glyphicon-check"), n.removeClass("glyphicon-unchecked")) : (n.removeClass("glyphicon-check"), n.addClass("glyphicon-unchecked"))
        }

        function ai() {
            return '<span id="lgdLC" class="chkbox glyphicon glyphicon-check"><\/span><span>Land Cover<span>'
        }

        function vi(n) {
            var i = [];
            return n == "all" ? $('option[value!="all"]', t).each(function (n, t) {
                i.push($(t).text())
            }) : i.push($('option[value="' + n + '"]', t).text()), i
        }

        function yi(n, i) {
            var r = [];
            return $.each(_landuseOption, function (u, f) {
                var e = {name: f.label, color: "rgb(" + u + ")", visible: f.visible, data: []};
                n == "all" ? $('option[value!="all"]', t).each(function (n, t) {
                    var r = $(t).val();
                    e.data.push(landcoverDataLib[r][f.value][i])
                }) : e.data.push(landcoverDataLib[n][f.value][i]);
                r.push(e)
            }), r
        }

        function pi(n) {
            var t = [], i = landcoverDataLib[n];
            return $.each(_landuseOption, function (n, r) {
                var u = {name: r.label, color: "rgb(" + n + ")", visible: r.visible, data: []};
                $.each(i[r.value], function (n, t) {
                    u.data.push(t)
                });
                t.push(u)
            }), t
        }

        function a(n) {
            if ($("#chartGroup").length != 0) {
                var e = t.val(), o = f.val(), h = dataLib.year[o],
                    s = t.val() == "all" ? "Afghanistan" : $('option[value="' + t.val() + '"]', t).text(), i, r, u;
                n ? (i = dataLib.year, r = pi(e), u = "Land Cover Trend for " + s, at(i, r, u, "line")) : (i = vi(e), r = yi(e, o), u = "Land Cover for " + s + " in " + h, at(i, r, u, "column"));
                $("#chkTrend").parent().show()
            }
        }

        function at(n, t, r, u) {
            $("#chartGroup").length != 0 && (i = Highcharts.chart("chartGroup", {
                credits: {enabled: !1},
                chart: {
                    type: u,
                    style: {
                        fontFamily: 'Lato,"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
                        fontSize: "12px"
                    },
                    zoomType: "xy"
                },
                title: {text: r, style: {fontSize: "15px"}},
                subtitle: {text: ""},
                xAxis: {categories: n, crosshair: !0},
                yAxis: {min: 0, title: {useHTML: !0, text: "Area (km<sup>2<\/sup>)"}},
                tooltip: {
                    backgroundColor: "#f0f0f0",
                    borderWidth: 1,
                    borderColor: "#AAA",
                    borderRadius: 2,
                    headerFormat: '<span style="font-size:13px;font-weight:bold;">{point.key}<\/span><table>',
                    pointFormat: '<tr style="line-height:1.2"><td style="padding-right:2px;"><span style="display:block;width:10px;height:10px;border-radius:50%;border:1px solid #333;background-color:{series.color};"><\/span><\/td><td style="padding:0">{series.name}: <\/td><td style="padding:0"><b>{point.y:.0f} km<sup>2<\/sup><\/b><\/td><\/tr>',
                    footerFormat: "<\/table>",
                    shared: !0,
                    useHTML: !0
                },
                plotOptions: {column: {pointPadding: .2, borderWidth: 0}},
                series: t,
                legend: {enabled: !1},
                exporting: {buttons: {contextButton: {menuItems: ["viewFullscreen", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "separator", "downloadCSV", "downloadXLS",]}}}
            }))
        }

        function wi(n, t, i) {
            for (var u = n.getSource().getFeatures(), r = 0; r < u.length; r++) if (u[r].get(t) == i) return u[r];
            return null
        }

        var n, u, t, ft, h, vt, f, s, k, v, yt, et, d, y, g, pt, c, ot, o, p, st, w, b, e, i, nt;
        return {
            InitLandcoverControl: function (t, i, r, f, e) {
                n = t;
                r != "" && (v = $("#" + r));
                f != "" && (yt = $("#" + f));
                e != "" && (u = n.initMapLegend(e));
                var o = $("#" + i);
                ri();
                wt();
                dt(o);
                ni(o);
                ti(o);
                ii()
            }, getControls: function () {
                return {province: t, year: f, legendMainTick: s, legendItemTick: k}
            }, updateZoom: function () {
                n.resetZoom()
            }, legendUpdate: function (n) {
                nt = n
            }, resizeChart: function (n, t) {
                i != null && i.update({chart: {width: n, height: t}})
            }, updateMap: function () {
                f.change()
            }, provinceSelection: ct
        }
    };






