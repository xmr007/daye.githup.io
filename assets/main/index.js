System.register("chunks:///_virtual/AStar.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function (t) {
    "use strict";
    var i, s;
    return {
        setters: [function (t) {
            i = t.createClass
        }, function (t) {
            s = t.cclegacy
        }],
        execute: function () {
            s._RF.push({}, "e3136YayHpFurUuKB4aGZOj", "AStar", void 0);
            t("AStar", function () {
                function t() {
                    this._open = void 0, this._closed = void 0, this._grid = void 0, this._endNode = void 0, this._startNode = void 0, this._path = void 0, this._heuristic = void 0, this._straightCost = 1, this._diagCost = Math.SQRT2, this._allowDiag = !0, this._heuristic = this.diagonal
                }
                var s = t.prototype;
                return s.allowDiag = function (t) {
                    this._allowDiag = t
                }, s.findPath = function (t, i, s) {
                    return void 0 === i && (i = 0), void 0 === s && (s = this._allowDiag), this._grid = t, this._open = [], this._closed = [], this._startNode = this._grid.startNode, this._endNode = this._grid.endNode, this._startNode.g = 0, this._startNode.h = this._heuristic(this._startNode), this._startNode.f = this._startNode.g + this._startNode.h, this.search(i, s)
                }, s.search = function (t, i) {
                    void 0 === t && (t = 0), void 0 === i && (i = this._allowDiag);
                    for (var s = 0, h = this._startNode; h != this._endNode;) {
                        if (t > 0 && ++s >= t) return !1;
                        for (var e = Math.max(0, h.x - 1), o = Math.min(this._grid.numCols - 1, h.x + 1), r = Math.max(0, h.y - 1), a = Math.min(this._grid.numRows - 1, h.y + 1), n = e; n <= o; n++)
                            for (var _ = r; _ <= a; _++)
                                if (i || n == h.x || _ == h.y) {
                                    var d = this._grid.getNode(n, _);
                                    if (d != h && d.walkable && this._grid.getNode(h.x, d.y).walkable && this._grid.getNode(d.x, h.y).walkable) {
                                        var u = this._straightCost;
                                        h.x != d.x && h.y != d.y && (u = this._diagCost);
                                        var l = h.g + u * d.costMultiplier,
                                            g = this._heuristic(d),
                                            c = l + g;
                                        this.isOpen(d) || this.isClosed(d) ? d.f > c && (d.f = c, d.g = l, d.h = g, d.parent = h) : (d.f = c, d.g = l, d.h = g, d.parent = h, this._open.push(d))
                                    }
                                } for (var f = 0; f < this._open.length; f++);
                        if (this._closed.push(h), 0 == this._open.length) return !1;
                        for (var p = this._open.length, v = 0; v < p; v++)
                            for (var N = v + 1; N < p; N++)
                                if (this._open[v].f > this._open[N].f) {
                                    var y = this._open[v];
                                    this._open[v] = this._open[N], this._open[N] = y
                                } h = this._open.shift()
                    }
                    return this.buildPath(), !0
                }, s.buildPath = function () {
                    this._path = new Array;
                    var t = this._endNode;
                    for (this._path.push(t); t != this._startNode;) t = t.parent, this._path.unshift(t)
                }, s.isOpen = function (t) {
                    for (var i = 0; i < this._open.length; i++)
                        if (this._open[i] == t) return !0;
                    return !1
                }, s.isClosed = function (t) {
                    for (var i = 0; i < this._closed.length; i++)
                        if (this._closed[i] == t) return !0;
                    return !1
                }, s.manhattan = function (t) {
                    return Math.abs(t.x - this._endNode.x) * this._straightCost + Math.abs(t.y + this._endNode.y) * this._straightCost
                }, s.euclidian = function (t) {
                    var i = t.x - this._endNode.x,
                        s = t.y - this._endNode.y;
                    return Math.sqrt(i * i + s * s) * this._straightCost
                }, s.diagonal = function (t) {
                    var i = Math.abs(t.x - this._endNode.x),
                        s = Math.abs(t.y - this._endNode.y),
                        h = Math.min(i, s),
                        e = i + s;
                    return this._diagCost * h + this._straightCost * (e - 2 * h)
                }, i(t, [{
                    key: "isallowDiag",
                    get: function () {
                        return this._allowDiag
                    }
                }, {
                    key: "path",
                    get: function () {
                        return this._path
                    }
                }, {
                    key: "visited",
                    get: function () {
                        return this._closed.concat(this._open)
                    }
                }]), t
            }());
            s._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/AStarMgr.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Grid.ts", "./AStar.ts"], (function (t) {
    "use strict";
    var i, n, r, s;
    return {
        setters: [function (t) {
            i = t.createClass
        }, function (t) {
            n = t.cclegacy
        }, function (t) {
            r = t.Grid
        }, function (t) {
            s = t.AStar
        }],
        execute: function () {
            n._RF.push({}, "88e22odDYtAZ6a8+88V900Z", "AStarMgr", void 0);
            var e = t("AStarMgr", function () {
                function t() {
                    this._grid = void 0, this._path = void 0, this._aStar = void 0, this._v2Str = ["x", "z"]
                }
                var n = t.prototype;
                return n.getNode = function (t, i) {
                    return this._grid.getNode(t, i)
                }, n.findGridNode = function (t) {
                    for (var i, n, r = 1e7, s = 0; s < this._grid.nodes.length; s++) {
                        var e = this._grid.nodes[s][0].specificPos,
                            o = this.getDistance(e["" + this._v2Str[0]], e["" + this._v2Str[1]], t["" + this._v2Str[0]], t["" + this._v2Str[1]]);
                        o < r && (r = o, i = this._grid.nodes[s])
                    }
                    if (i) {
                        r = 1e7;
                        for (var a = 0; a < i.length; a++) {
                            var h = i[a].specificPos,
                                d = this.getDistance(h["" + this._v2Str[0]], h["" + this._v2Str[1]], t["" + this._v2Str[0]], t["" + this._v2Str[1]]);
                            d < r && (r = d, n = i[a])
                        }
                    }
                    return n
                }, n.findPath = function (t, i, n, r) {
                    return void 0 === n && (n = 0), void 0 === r && (r = this._aStar.isallowDiag), this._grid.setStartNode(t.x, t.y), this._grid.setEndNode(i.x, i.y), this._aStar.findPath(this._grid, n, r) ? (this._path = this._aStar.path, this._path) : null
                }, n.setWalkable = function (t, i) {
                    var n = this.findGridNode(t);
                    this._grid.setWalkable(n.x, n.y, i)
                }, n.testSpreadOut = function () {
                    this._grid.nodes.forEach((function (t) {
                        t.forEach((function (t) {}))
                    }))
                }, n.testNoWalk = function () {
                    this._grid.nodes.forEach((function (t) {
                        t.forEach((function (t) {
                            t.walkable
                        }))
                    }))
                }, n.getDistance = function (t, i, n, r) {
                    var s = n - t,
                        e = r - i,
                        o = s * s + e * e;
                    return Math.sqrt(o)
                }, n.init = function () {
                    this._grid = new r({
                        numCols: 11,
                        numRows: 20,
                        beginPos: {
                            x: -8,
                            y: 4.2,
                            z: -15
                        },
                        offsetPos: {
                            x: 1.6,
                            y: 0,
                            z: -1.6
                        }
                    }), this._aStar = new s
                }, n.initMap = function (t) {
                    this._grid = t, this._aStar = new s
                }, i(t, null, [{
                    key: "ins",
                    get: function () {
                        return this._ins || (this._ins = new t), this._ins
                    }
                }]), t
            }());
            e._ins = void 0, window.AStarMgr = e, n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/BagBulletGridItemControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./ResMgr.ts", "./WeaponControlBase.ts"], (function (t) {
    "use strict";
    var e, n, l, o, r, i, a, u, s;
    return {
        setters: [function (t) {
            e = t.inheritsLoose, n = t.createClass
        }, function (t) {
            l = t.cclegacy, o = t._decorator, r = t.Sprite, i = t.Component
        }, function (t) {
            a = t.ResMgr
        }, function (t) {
            u = t.WeaponPrefabConfig, s = t.WeaponType
        }],
        execute: function () {
            var c;
            l._RF.push({}, "fbb10mPVrFHbITUktQ27Mm+", "BagBulletGridItemControl", void 0);
            var g = o.ccclass;
            o.property, t("BagBulletGridItemControl", g("BagBulletGridItemControl")(c = function (t) {
                function l() {
                    for (var e, n = arguments.length, l = new Array(n), o = 0; o < n; o++) l[o] = arguments[o];
                    return (e = t.call.apply(t, [this].concat(l)) || this).bagBulletType = s.手枪, e.bulletImg = void 0, e
                }
                e(l, t);
                var o = l.prototype;
                return o.onLoad = function () {
                    this.bulletImg = this.node.getChildByName("BulletImg").getComponent(r)
                }, o.initBullet = function (t) {
                    this.bulletImg.node.active = !0, this.bagBulletType = t, this.bulletImg.spriteFrame = a.Instance.LoadSpriteFrame(u.bulletPrefabNameArr[t])
                }, o.setEmpty = function () {
                    this.bulletImg.node.active = !1
                }, n(l, [{
                    key: "getBagBulletType",
                    get: function () {
                        return this.bagBulletType
                    }
                }]), l
            }(i)) || c);
            l._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/BaseSDKControl.ts", ["cc", "./LYCSDK.ts"], (function (t) {
    "use strict";
    var o, n, e, i;
    return {
        setters: [function (t) {
            o = t.cclegacy, n = t._decorator
        }, function (t) {
            e = t.LYCSDK, i = t.PlatformType
        }],
        execute: function () {
            var c;
            o._RF.push({}, "b284dHW0LBFRLLKvmIIsGSD", "BaseSDKControl", void 0);
            var r = n.ccclass,
                s = (n.property, t("LoginUserData", (function () {
                    this.thirdId = void 0, this.headIcon = "DefaultHeadImg.png", this.nickName = "游客", this.province = "未知", this.city = "未知", this.channel = void 0, this.playerId = 999, this.signState = void 0, this.currentSkin = void 0, this.skins = void 0, this.firstLoad = !1
                })));
            t("BaseSDKControl", r("BaseSDKControl")(c = function () {
                function t() {
                    this.UserInfoCallBack = new s
                }
                var o = t.prototype;
                return o.InitSDK = function () {}, o.GetPlatformSDK = function () {}, o.LoginPlatform = function () {}, o.GetUserInfo = function () {}, o.ShareGame = function (t) {}, o.AddShortcut = function () {}, o.CheckShortcut = function () {}, o.startRecord = function () {}, o.resumeRecord = function () {}, o.pauseRecord = function () {}, o.stopRecord = function () {}, o.shareRecord = function (t) {}, o.trackEvent = function (t, o) {
                    if (e.Instance.GamePlatform != i.Windows) {
                        var n = this.GetPlatformSDK().uma;
                        if (n) {
                            for (var c in console.log("友盟发送事件 key：" + t), o) console.log("友盟发送事件：" + c + "_" + o[c]);
                            n.trackEvent(t, o)
                        } else e.Instance.GameLog("友盟尚未初始化")
                    } else
                        for (var r in console.log("友盟发送事件 key：" + t), o) console.log("编辑器模式下不发送友盟事件：" + r + "_" + o[r])
                }, t
            }()) || c);
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/BaseUIPanel.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./UIPanelMgr.ts"], (function (e) {
    "use strict";
    var n, t, o, a, i, s, r, c;
    return {
        setters: [function (e) {
            n = e.inheritsLoose
        }, function (e) {
            t = e.cclegacy, o = e._decorator, a = e.BlockInputEvents, i = e.Sprite, s = e.Color, r = e.Component
        }, function (e) {
            c = e.UIPanelMgr
        }],
        execute: function () {
            var l;
            t._RF.push({}, "039af54HTpEKLHKsaaH+LVd", "BaseUIPanel", void 0);
            var u = o.ccclass;
            o.property, e("BaseUIPanel", u("BaseUIPanel")(l = function (e) {
                function t() {
                    return e.apply(this, arguments) || this
                }
                n(t, e);
                var o = t.prototype;
                return o.InitUIPanel = function () {
                    this.node.active = !0, this.node.setSiblingIndex(this.node.parent.children.length - 1);
                    var e = this.node.getChildByName("PanelMask");
                    if (e) {
                        e.addComponent(a);
                        var n = e.getComponent(i),
                            t = n.color;
                        n.color = new s(t.r, t.g, t.b, 204)
                    }
                }, o.ShowUIPanel = function () {
                    this.node.active = !0, this.node.setSiblingIndex(this.node.parent.children.length - 1)
                }, o.HideUIPanel = function () {
                    this.node.active = !1
                }, o.DestroyUIPanel = function () {
                    c.Instance.DesPanel(c.Instance.UINowOpenPanelName)
                }, t
            }(r)) || l);
            t._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/BaseUIView.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function (e) {
    "use strict";
    var i, t, n, r, o, s, a, c;
    return {
        setters: [function (e) {
            i = e.applyDecoratedDescriptor, t = e.inheritsLoose, n = e.initializerDefineProperty, r = e.assertThisInitialized
        }, function (e) {
            o = e.cclegacy, s = e._decorator, a = e.Node, c = e.Component
        }],
        execute: function () {
            var l, u, p, d, h;
            o._RF.push({}, "e7076s+nlhN67x7YfVvgvno", "BaseUIView", void 0);
            var f = s.ccclass,
                w = s.property;
            e("BaseUIView", (l = f("BaseUIView"), u = w({
                type: a
            }), l((h = i((d = function (e) {
                function i() {
                    for (var i, t = arguments.length, o = new Array(t), s = 0; s < t; s++) o[s] = arguments[s];
                    return i = e.call.apply(e, [this].concat(o)) || this, n(i, "goldPower", h, r(i)), i
                }
                t(i, e);
                var o = i.prototype;
                return o.InitView = function () {}, o.ShowView = function () {
                    this.node.active = !0, this.node.setSiblingIndex(this.node.parent.children.length - 1)
                }, o.HideView = function () {
                    this.node.active = !1
                }, i
            }(c)).prototype, "goldPower", [u], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), p = d)) || p));
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/BgmMgr.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameConfig.ts", "./LYCSDK.ts", "./ResMgr.ts"], (function (n) {
    "use strict";
    var t, e, o, i, c, s, r, u, a, l;
    return {
        setters: [function (n) {
            t = n.inheritsLoose, e = n.createClass
        }, function (n) {
            o = n.cclegacy, i = n._decorator, c = n.AudioSource, s = n.find, r = n.Component
        }, function (n) {
            u = n.GameConfig
        }, function (n) {
            a = n.LYCSDK
        }, function (n) {
            l = n.ResMgr
        }],
        execute: function () {
            var g, p;
            o._RF.push({}, "97ad0e1YcBJJaPRDy7KQeAc", "BgmMgr", void 0);
            var d = i.ccclass;
            i.property, n("BgmMgr", d("BgmMgr")(((p = function (n) {
                function o() {
                    for (var t, e = arguments.length, o = new Array(e), i = 0; i < e; i++) o[i] = arguments[i];
                    return (t = n.call.apply(n, [this].concat(o)) || this).PlayAudioSource = void 0, t
                }
                t(o, n);
                var i = o.prototype;
                return i.start = function () {
                    this.PlayAudioSource = this.node.getComponent(c)
                }, i.update = function (n) {}, i.play = function (n) {
                    void 0 === n && (n = "主界面背景音乐"), u.Instance.IsBgmOn && (this.PlayAudioSource.stop(), this.PlayAudioSource.clip = l.Instance.LoadBgm(n), a.Instance.GameLog("播放音乐" + n), this.PlayAudioSource.play())
                }, i.pause = function () {
                    this.PlayAudioSource.pause()
                }, e(o, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this.instance && (this.instance = s("BgmMgr").getComponent(o)), this.instance
                    }
                }]), o
            }(r)).instance = void 0, g = p)) || g);
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/Boss_1Control.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./TimeControl.ts", "./GameTools.ts", "./AStarMgr.ts", "./UIGameView.ts", "./BossControlBase.ts", "./FinalBossBase.ts", "./MagneticCircleControl.ts", "./TentacleItemControl.ts", "./WeaponControlBase.ts"], (function (t) {
    "use strict";
    var e, i, s, o, a, n, l, h, r, c, g, u, d, y, m, T, f, P, p, b, k, C, w, S, v, B, D, I;
    return {
        setters: [function (t) {
            e = t.applyDecoratedDescriptor, i = t.inheritsLoose, s = t.initializerDefineProperty, o = t.assertThisInitialized, a = t.createClass
        }, function (t) {
            n = t.cclegacy, l = t._decorator, h = t.CCFloat, r = t.Collider2D, c = t.Contact2DType, g = t.UITransform, u = t.Vec2, d = t.Tween, y = t.tween, m = t.Vec3
        }, function (t) {
            T = t.TimeControl
        }, function (t) {
            f = t.GameTools
        }, function (t) {
            P = t.AStarMgr
        }, function (t) {
            p = t.GameState, b = t.BlockType, k = t.ColliderTagConfig
        }, function (t) {
            C = t.BossInitiativeSkill, w = t.BossState, S = t.BossPassivitySkill
        }, function (t) {
            v = t.FinalBossBase
        }, function (t) {
            B = t.MagneticCircleControl
        }, function (t) {
            D = t.TentacleItemControl
        }, function (t) {
            I = t.WeaponType
        }],
        execute: function () {
            var V, A, N, x, G;
            n._RF.push({}, "81f2atxSdND6I8aJgT1XKhd", "Boss_1Control", void 0);
            var M = l.ccclass,
                H = l.property;
            t("Boss_1Control", (V = M("Boss_1Control"), A = H({
                type: h,
                displayName: "boss触碰伤害的间隔时间"
            }), V((G = e((x = function (t) {
                function e() {
                    for (var e, i = arguments.length, a = new Array(i), n = 0; n < i; n++) a[n] = arguments[n];
                    return e = t.call.apply(t, [this].concat(a)) || this, s(e, "touchHurtTime", G, o(e)), e.isTouchHurtCD = !1, e.isPlayerAway = !0, e.skillTimer = 0, e.skillTime = 0, e.skillUseIndex = 0, e.pathArr = void 0, e.followPathArrIndex = 0, e.playerPos = void 0, e.getPlayerTimer = 0, e.getPlayerTimeSpace = 1, e.isTouchPlayer = !1, e.bossCollider = void 0, e.bossCheckCollider = void 0, e.isUsingSkill = !1, e
                }
                i(e, t);
                var n = e.prototype;
                return n.update = function (t) {
                    var e = this;
                    this.gameView && this.gameView.getNowGameState == p.playing && this.isFollowBoss && !this.isUsingSkill && (this.isTouchPlayer || (this.getPlayerTimer += t, this.getPlayerTimer > this.getPlayerTimeSpace && (this.getPlayerTimer = 0, this.isPlayerPosChange ? this.followPlayer() : (this.bossCollider.enabled = !1, T.Instance.DelayToDo((function () {
                        e.bossCollider.enabled = !0
                    }), this, .05)))), this.skillTimer += t, this.skillTimer > this.skillTime && this.useSkill(), this.startRageTimer += t, this.startRageTimer > this.rageDurtime && this.endRage())
                }, n.initBoss = function (t) {
                    this.gameView = t, this.bossCollider = this.node.getChildByName("怪物身体区域").getComponent(r), this.bossCollider.on(c.BEGIN_CONTACT, this.onBeginContact, this), this.bossCheckCollider = this.node.getChildByName("默认检测区域").getComponent(r), this.bossCheckCollider.on(c.BEGIN_CONTACT, this.onBeginCheckContact, this), this.node.getComponent(g).anchorPoint = new u(.5, .5);
                    var e, i, s, o = this.node.getChildByName("震地攻击伤害区域");
                    for (var a in o && o.getComponent(r).on(c.BEGIN_CONTACT, this.onShakeGroundContact, this), this.gameView.allGameBlock) {
                        var n = this.gameView.allGameBlock[a];
                        if (n.blockItemType == b.road) {
                            var l = this.gameView.GetBlockLocalPos(n.blockVec2),
                                h = f.Instance.GetPointsDistance(l, this.node.position);
                            (e && e > h || !e) && (e = h, s = l, i = n)
                        }
                    }
                    this.bossInitMoveSpeed = this.bossMoveSpeed, this.bossMoveSpeed = 1 / this.bossMoveSpeed, this.bossInitAtk = this.bossAtk, this.bossVec2 = i.blockVec2, this.node.setPosition(s), this.preReadyNextSkill()
                }, n.preReadyNextSkill = function () {
                    this.skillTime = f.Instance.GetFloatRandomNum_New(this.skillTimeData.minNum, this.skillTimeData.maxNum), this.skillTimer = 0
                }, n.useSkill = function () {
                    var t = this;
                    switch (this.initiativeSkill[this.skillUseIndex % this.initiativeSkill.length]) {
                        case C.子弹跟踪:
                            var e = this.gameView.getBulletItem();
                            e.node.setWorldPosition(this.node.getWorldPosition()), e.initBullet(this.gameView, {
                                boss: this,
                                bulletData: this.bulletData,
                                bulletSpeed: this.bulletData.bulletSpeed
                            }), this.isUsingSkill = !0, T.Instance.DelayToDo((function () {
                                t.isUsingSkill = !1, t.followPlayer()
                            }), this, this.bulletData.bossBulletCDTime);
                            break;
                        case C.震地攻击:
                            var i = this.node.getChildByName("震地攻击伤害区域");
                            i.active = !0, this.isUsingSkill = !0, T.Instance.DelayToDo((function () {
                                i.active = !1, t.isUsingSkill = !1, t.followPlayer()
                            }), this, this.shakeData.bossStandTime);
                            break;
                        case C.落石攻击:
                            this.gameView.getStoneItem().DownStone(this.gameView, {
                                warnTime: this.stoneData.stoneWarnTime,
                                boss: this
                            }), this.isUsingSkill = !0, T.Instance.DelayToDo((function () {
                                t.isUsingSkill = !1, t.followPlayer()
                            }), this, this.stoneData.bossStandTime);
                            break;
                        case C.召唤物:
                            for (var s = this.bossVec2.x - this.eggData.farGrid, o = this.bossVec2.x + this.eggData.farGrid, a = this.bossVec2.y - this.eggData.farGrid, n = this.bossVec2.y + this.eggData.farGrid, l = [], h = s; h < o; h++)
                                for (var r = a; r < n; r++) {
                                    var c = this.gameView.getOneGameBlock(new u(h, r));
                                    c && c.blockItemType == b.road && l.push(c)
                                }
                            var g = this.eggData.eggCount;
                            g > l.length && (g = l.length);
                            for (var y = 0; y < g; y++) {
                                var m = this.gameView.getEggItem(),
                                    P = f.Instance.GetIntRandomNum_New(0, l.length);
                                m.node.setWorldPosition(this.gameView.getBlockWorldPos(l[P].blockVec2)), m.initEgg(this.gameView, this.eggData), l.splice(P, 1)
                            }
                            break;
                        case C.闪电五连鞭:
                            this.isUsingSkill = !0, this.showTentacle()
                    }
                    d.stopAllByTarget(this.node), this.skillUseIndex++, this.preReadyNextSkill()
                }, n.showTentacle = function () {
                    var t = this,
                        e = this.gameView.getTentacleItem();
                    e.setWorldPosition(this.node.getWorldPosition()), this.initTentacleSkill(e);
                    var i = this.bossTentacleNode.children,
                        s = i.length - 1,
                        o = 0;
                    T.Instance.DelayToDo((function () {
                        var e = i[o].getComponent(D);
                        e.showTentacle({
                            largeTime: t.magneticData.tentacleTime,
                            boss: t,
                            cb: function () {
                                t.showMagnetic(e)
                            }
                        }), o++
                    }), this, this.magneticData.showTentacleTimeSpace, s), T.Instance.DelayToDo((function () {
                        e.active = !1, t.isUsingSkill = !1
                    }), this, this.magneticData.bossStandTime)
                }, n.showMagnetic = function (t) {
                    for (var e = this.bossMagneticNode.children, i = 0; i < e.length; i++) {
                        var s = e[i];
                        if (!s.active) {
                            s.active = !0, s.setWorldPosition(t.getEndNode.getWorldPosition()), s.getComponent(B).showMagneticCircle({
                                largeTime: this.magneticData.largeMagneticTime,
                                bossJB: this
                            });
                            break
                        }
                    }
                }, n.onBeginContact = function (t, e, i) {
                    console.log("onBeginContact"), e.tag == k.Player && this.touchPlayer()
                }, n.onBeginCheckContact = function (t, e, i) {
                    console.log("onBeginCheckContact"), e.tag == k.Player && this.checkPlayer()
                }, n.onShakeGroundContact = function (t, e, i) {
                    console.log("onBeginCheckContact"), this.shakeGroundTouchPlayer()
                }, n.followPlayer = function () {
                    this.playerPos = this.gameView.getPlayerNode.getStandBlock.blockVec2, this.pathArr = P.ins.findPath(this.bossVec2, this.playerPos), this.isPlayerAway = !0, d.stopAllByTarget(this.node), this.followPathArrIndex = 0, this.pathArr && this.runToPlayer()
                }, n.runToPlayer = function () {
                    var t = this,
                        e = new u(this.pathArr[this.followPathArrIndex].x, this.pathArr[this.followPathArrIndex].y);
                    if (Math.floor(e.x) != Math.floor(this.bossVec2.x) || Math.floor(e.y) != Math.floor(this.bossVec2.y)) {
                        var i = e.x - this.bossVec2.x,
                            s = this.bossVec2.y - e.y,
                            o = new u(i, s),
                            a = Math.atan2(o.y, o.x) / Math.PI * 180 + 90;
                        this.node.angle != a && (this.node.angle = a), this.bossVec2 = e;
                        var n = this.gameView.GetBlockLocalPos(e),
                            l = f.Instance.GetPointsDistance(this.node.position, n) / this.gameView.blockSize.width;
                        y(this.node).to(this.bossMoveSpeed * l, {
                            position: n
                        }).call((function () {
                            t.followPathArrIndex++, t.followPathArrIndex < t.pathArr.length ? t.runToPlayer() : t.isPlayerPosChange ? t.followPlayer() : y(t.node).to(t.bossMoveSpeed, {
                                worldPosition: t.gameView.getNewPlayerNode.playerBody.worldPosition
                            }).start()
                        })).start()
                    } else this.followPathArrIndex++, this.followPathArrIndex < this.pathArr.length && this.runToPlayer()
                }, n.checkPlayer = function () {
                    this.changeBossState(w.激活), this.bossCheckCollider.enabled = !1, this.followPlayer()
                }, n.touchPlayer = function () {
                    var t = this;
                    if (d.stopAllByTarget(this.node), this.isHaveThisPS(S.普通攻击))
                        if (this.isTouchPlayer) this.isTouchPlayer = !1, this.hurtPlayer();
                        else {
                            this.isTouchPlayer = !0, this.bossCollider.enabled = !1;
                            y(this.node).to(.7, {
                                scale: new m(1.25, 1.25)
                            }).to(.7, {
                                scale: m.ONE
                            }).union().call((function () {
                                t.bossCollider.enabled = !0, T.Instance.DelayToDo((function () {
                                    t.isTouchPlayer && (t.isTouchPlayer = !1)
                                }), t, .5)
                            })).start()
                        }! this.isTouchHurtCD && this.isHaveThisPS(S.触碰攻击) && (this.isTouchHurtCD = !0, this.isPlayerAway = !1, T.Instance.DelayToDo((function () {
                        t.isTouchHurtCD = !1
                    }), this, this.touchHurtTime), this.hurtPlayer())
                }, n.shakeGroundTouchPlayer = function () {
                    this.hurtPlayer(this.shakeData.hurtPer * this.bossAtk)
                }, n.isHaveThisPS = function (t) {
                    return -1 != this.passivitySkill.indexOf(t)
                }, n.getHurtByOther = function (t) {
                    if (this.node.active) {
                        var e = this.bossHp;
                        (this.nowBossState != w.无敌 || t.shotWeapon.weaponType == I.信号枪) && (this.bossHp -= t.shotWeapon.weaponHurt), e > 1 && this.bossHp <= 1 && (this.bossHp = 1, this.changeBossState(w.无敌)), this.bossHp <= 0 && this.bossDead()
                    }
                }, n.startRage = function () {
                    t.prototype.startRage.call(this)
                }, n.endRage = function () {
                    t.prototype.endRage.call(this), console.log("结束狂暴")
                }, a(e, [{
                    key: "isFollowBoss",
                    get: function () {
                        return this.nowBossState == w.无敌 || this.nowBossState == w.激活 || this.nowBossState == w.狂暴
                    }
                }, {
                    key: "isPlayerPosChange",
                    get: function () {
                        if (!this.playerPos) return !1;
                        var t = this.gameView.getPlayerNode.getStandBlock.blockVec2,
                            e = Math.abs(t.x - this.playerPos.x),
                            i = Math.abs(t.y - this.playerPos.y);
                        return e > 0 || i > 0
                    }
                }]), e
            }(v)).prototype, "touchHurtTime", [A], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 1
                }
            }), N = x)) || N));
            n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/BossBulletControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./TimeControl.ts", "./GameTools.ts", "./AStarMgr.ts", "./UIGameView.ts", "./SkillBaseControl.ts"], (function (e) {
    "use strict";
    var t, o, s, l, i, r, a, n, h, c, u, d, y, P, g;
    return {
        setters: [function (e) {
            t = e.inheritsLoose, o = e.createClass
        }, function (e) {
            s = e.cclegacy, l = e._decorator, i = e.Collider2D, r = e.Contact2DType, a = e.Tween, n = e.Vec2, h = e.tween
        }, function (e) {
            c = e.TimeControl
        }, function (e) {
            u = e.GameTools
        }, function (e) {
            d = e.AStarMgr
        }, function (e) {
            y = e.GameState, P = e.ColliderTagConfig
        }, function (e) {
            g = e.SkillBaseControl
        }],
        execute: function () {
            var b;
            s._RF.push({}, "11bfcmcQxdLAKTeH6O4VYE+", "BossBulletControl", void 0);
            var f = l.ccclass;
            l.property, e("BossBulletControl", f("BossBulletControl")(b = function (e) {
                function s() {
                    for (var t, o = arguments.length, s = new Array(o), l = 0; l < o; l++) s[l] = arguments[l];
                    return (t = e.call.apply(e, [this].concat(s)) || this).bossVec2 = void 0, t.pathArr = void 0, t.followPathArrIndex = 0, t.playerPos = void 0, t.getPlayerTimer = 0, t.getPlayerTimeSpace = 1, t.isTouchPlayer = !1, t.bossCollider = void 0, t.bossCheckCollider = void 0, t.bulletMoveSpeed = void 0, t.bulletDesTimer = 0, t.bulletDesTime = 0, t
                }
                t(s, e);
                var l = s.prototype;
                return l.start = function () {}, l.update = function (e) {
                    var t = this;
                    this.gameView && this.gameView.getNowGameState == y.playing && (this.isTouchPlayer || (this.getPlayerTimer += e, this.getPlayerTimer > this.getPlayerTimeSpace && (this.getPlayerTimer = 0, this.isPlayerPosChange ? this.followPlayer() : (this.bossCollider.enabled = !1, c.Instance.DelayToDo((function () {
                        t.bossCollider.enabled = !0
                    }), this, .05)))), this.bulletDesTimer += e, this.bulletDesTimer > this.bulletDesTime && this.destroyBullet())
                }, l.initBullet = function (e, t) {
                    this.gameView = e, this.bossJB = t.boss, this.bossCollider = this.node.getChildByName("BulletImg").getComponent(i), this.bossCollider.on(r.BEGIN_CONTACT, this.onBeginContact, this), a.stopAllByTarget(this.node), this.bulletDesTime = t.bulletData.bulletDestroyTime, this.bulletMoveSpeed = t.bulletSpeed, this.bulletMoveSpeed = 1 / this.bulletMoveSpeed, this.bossVec2 = t.boss.bossVec2, this.followPlayer()
                }, l.onBeginContact = function (e, t, o) {
                    console.log("onBeginContact"), t.tag == P.Player && this.touchPlayer()
                }, l.followPlayer = function () {
                    this.playerPos = this.gameView.getPlayerNode.getStandBlock.blockVec2, this.pathArr = d.ins.findPath(this.bossVec2, this.playerPos), a.stopAllByTarget(this.node), this.followPathArrIndex = 0, this.runToPlayer()
                }, l.runToPlayer = function () {
                    var e = this,
                        t = new n(this.pathArr[this.followPathArrIndex].x, this.pathArr[this.followPathArrIndex].y);
                    if (Math.floor(t.x) != Math.floor(this.bossVec2.x) || Math.floor(t.y) != Math.floor(this.bossVec2.y)) {
                        var o = t.x - this.bossVec2.x,
                            s = this.bossVec2.y - t.y,
                            l = new n(o, s),
                            i = Math.atan2(l.y, l.x) / Math.PI * 180 + 90;
                        this.node.angle != i && (this.node.angle = i), this.bossVec2 = t;
                        var r = this.gameView.getBlockWorldPos(t),
                            a = u.Instance.GetPointsDistance(this.node.worldPosition, r) / 40;
                        h(this.node).to(this.bulletMoveSpeed * a, {
                            worldPosition: r
                        }).call((function () {
                            e.followPathArrIndex++, e.followPathArrIndex < e.pathArr.length ? e.runToPlayer() : e.isPlayerPosChange ? e.followPlayer() : h(e.node).to(e.bulletMoveSpeed, {
                                worldPosition: e.gameView.getNewPlayerNode.playerBody.worldPosition
                            }).start()
                        })).start()
                    } else this.followPathArrIndex++, this.followPathArrIndex < this.pathArr.length && this.runToPlayer()
                }, l.touchPlayer = function () {
                    this.destroyBullet(), this.bossJB.hurtPlayer(this.bossJB.bossAtk * this.bossJB.bulletData.hurtPer)
                }, l.destroyBullet = function () {
                    a.stopAllByTarget(this.node), this.node.active = !1
                }, o(s, [{
                    key: "isPlayerPosChange",
                    get: function () {
                        var e = this.gameView.getPlayerNode.getStandBlock.blockVec2,
                            t = Math.abs(e.x - this.playerPos.x),
                            o = Math.abs(e.y - this.playerPos.y);
                        return t > 0 || o > 0
                    }
                }]), s
            }(g)) || b);
            s._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/BossControlBase.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./TimeControl.ts", "./SoundMgr.ts"], (function (e) {
    "use strict";
    var t, i, n, r, a, o, s, l, u, p, b, c, y;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, i = e.initializerDefineProperty, n = e.inheritsLoose, r = e.assertThisInitialized
        }, function (e) {
            a = e.cclegacy, o = e._decorator, s = e.CCFloat, l = e.Enum, u = e.CCString, p = e.CCInteger, b = e.Component
        }, function (e) {
            c = e.TimeControl
        }, function (e) {
            y = e.SoundMgr
        }],
        execute: function () {
            var m, f, h, g, d, N, w, T, B, S, v, z, C, D, P, M, k, A, I, H, _, G, x, W, V, E, F, L, J, O, R, j, Z, q, K, Q, U, X, Y, $, ee, te, ie, ne, re, ae, oe, se, le, ue, pe, be, ce, ye, me, fe, he, ge, de, Ne, we, Te, Be, Se, ve, ze, Ce, De, Pe, Me, ke, Ae, Ie, He, _e, Ge, xe, We, Ve;
            e({
                BossCategory: void 0,
                BossInitiativeSkill: void 0,
                BossPassivitySkill: void 0,
                BossState: void 0
            }), a._RF.push({}, "cdb61gGCwJJOZL3hMAPgnIM", "BossControlBase", void 0);
            var Ee, Fe, Le, Je, Oe = o.ccclass,
                Re = o.property;
            ! function (e) {
                e[e["休眠"] = 0] = "休眠", e[e["激活"] = 1] = "激活", e[e["死亡"] = 2] = "死亡", e[e["暂停"] = 3] = "暂停", e[e["狂暴"] = 4] = "狂暴", e[e["孵蛋"] = 5] = "孵蛋", e[e["无敌"] = 6] = "无敌", e[e["分裂"] = 7] = "分裂"
            }(Ee || (Ee = e("BossState", {}))),
            function (e) {
                e[e["跟踪怪"] = 0] = "跟踪怪", e[e["冲锋怪"] = 1] = "冲锋怪", e[e["膨胀怪"] = 2] = "膨胀怪", e[e.Boss_1 = 3] = "Boss_1", e[e["老六怪"] = 4] = "老六怪"
            }(Fe || (Fe = e("BossCategory", {}))), e("BossPrefabNameConfig", (function () {})).PrefabNameArr = ["跟踪怪", "冲锋怪", "膨胀怪", "Boss_1", "老六怪"],
                function (e) {
                    e[e["普通攻击"] = 0] = "普通攻击", e[e["触碰攻击"] = 1] = "触碰攻击"
                }(Le || (Le = e("BossPassivitySkill", {}))),
                function (e) {
                    e[e["子弹跟踪"] = 0] = "子弹跟踪", e[e["震地攻击"] = 1] = "震地攻击", e[e["落石攻击"] = 2] = "落石攻击", e[e["召唤物"] = 3] = "召唤物", e[e["闪电五连鞭"] = 4] = "闪电五连鞭"
                }(Je || (Je = e("BossInitiativeSkill", {})));
            e("MinMaxNumber", (m = Oe("MinMaxNumber"), f = Re({
                type: s,
                displayName: "最小值"
            }), h = Re({
                type: s,
                displayName: "最大值"
            }), m((N = t((d = function () {
                i(this, "minNum", N, this), i(this, "maxNum", w, this)
            }).prototype, "minNum", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 3
                }
            }), w = t(d.prototype, "maxNum", [h], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 5
                }
            }), g = d)) || g)), e("BulletData", (T = Oe("BulletData"), B = Re({
                type: s,
                displayName: "子弹速度"
            }), S = Re({
                type: s,
                displayName: "子弹自动销毁的时间"
            }), v = Re({
                type: s,
                displayName: "boss释放子弹后站在原地的时间"
            }), z = Re({
                type: s,
                displayName: "伤害是boss攻击力的百分之"
            }), T((P = t((D = function () {
                i(this, "bulletSpeed", P, this), i(this, "bulletDestroyTime", M, this), i(this, "bossBulletCDTime", k, this), i(this, "hurtPer", A, this)
            }).prototype, "bulletSpeed", [B], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 3
                }
            }), M = t(D.prototype, "bulletDestroyTime", [S], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 5
                }
            }), k = t(D.prototype, "bossBulletCDTime", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 2
                }
            }), A = t(D.prototype, "hurtPer", [z], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return .8
                }
            }), C = D)) || C)), e("ShakeGroundData", (I = Oe("ShakeGroundData"), H = Re({
                type: s,
                displayName: "震地技能持续时间"
            }), _ = Re({
                type: s,
                displayName: "boss释放玩技能后站在原地的时间"
            }), G = Re({
                type: s,
                displayName: "伤害是boss攻击力的百分之"
            }), I((V = t((W = function () {
                i(this, "shakeDur", V, this), i(this, "bossStandTime", E, this), i(this, "hurtPer", F, this)
            }).prototype, "shakeDur", [H], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 3
                }
            }), E = t(W.prototype, "bossStandTime", [_], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 1
                }
            }), F = t(W.prototype, "hurtPer", [G], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return .8
                }
            }), x = W)) || x)), e("StoneData", (L = Oe("StoneData"), J = Re({
                type: s,
                displayName: "落石预警时间"
            }), O = Re({
                type: s,
                displayName: "落石保留时间"
            }), R = Re({
                type: s,
                displayName: "boss释放玩技能后站在原地的时间"
            }), j = Re({
                type: s,
                displayName: "伤害是boss攻击力的百分之"
            }), L((K = t((q = function () {
                i(this, "stoneWarnTime", K, this), i(this, "stoneStayTime", Q, this), i(this, "bossStandTime", U, this), i(this, "hurtPer", X, this)
            }).prototype, "stoneWarnTime", [J], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 1
                }
            }), Q = t(q.prototype, "stoneStayTime", [O], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 2
                }
            }), U = t(q.prototype, "bossStandTime", [R], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 1
                }
            }), X = t(q.prototype, "hurtPer", [j], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return .8
                }
            }), Z = q)) || Z)), e("CreateEggData", (Y = Oe("CreateEggData"), $ = Re({
                type: s,
                displayName: "蛋可生成的范围（多少个格子）"
            }), ee = Re({
                type: s,
                displayName: "蛋可生成的数量(如果当前可放置蛋的格子小于生成数量，那么只会生成格子数量的蛋）"
            }), te = Re({
                type: s,
                displayName: "蛋的血量"
            }), ie = Re({
                type: s,
                displayName: "蛋的孵化时间"
            }), ne = Re({
                type: l(Fe),
                displayName: "蛋能孵化出来的怪物列表（多个则会从中随机）"
            }), Y((oe = t((ae = function () {
                i(this, "farGrid", oe, this), i(this, "eggCount", se, this), i(this, "eggHP", le, this), i(this, "eggCreateTime", ue, this), i(this, "eggCreateBossType", pe, this)
            }).prototype, "farGrid", [$], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 4
                }
            }), se = t(ae.prototype, "eggCount", [ee], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 2
                }
            }), le = t(ae.prototype, "eggHP", [te], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 10
                }
            }), ue = t(ae.prototype, "eggCreateTime", [ie], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 5
                }
            }), pe = t(ae.prototype, "eggCreateBossType", [ne], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return []
                }
            }), re = ae)) || re)), e("MagneticData", (be = Oe("MagneticData"), ce = Re({
                type: s,
                displayName: "鞭子从怪物身上伸出到角色的速度(伸出一格长度的时间,数值越小，速度越快）"
            }), ye = Re({
                type: s,
                displayName: "鞭子伸出去的时间间隔"
            }), me = Re({
                type: s,
                displayName: "静电场扩散到全图需要的时间"
            }), fe = Re({
                type: s,
                displayName: "boss释放玩技能后站在原地的时间"
            }), he = Re({
                type: s,
                displayName: "鞭子伤害是boss攻击力的百分之"
            }), ge = Re({
                type: s,
                displayName: "磁场伤害是boss攻击力的百分之"
            }), be((we = t((Ne = function () {
                i(this, "tentacleTime", we, this), i(this, "showTentacleTimeSpace", Te, this), i(this, "largeMagneticTime", Be, this), i(this, "bossStandTime", Se, this), i(this, "tentaclehurtPer", ve, this), i(this, "hurtPer", ze, this)
            }).prototype, "tentacleTime", [ce], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return .2
                }
            }), Te = t(Ne.prototype, "showTentacleTimeSpace", [ye], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return .5
                }
            }), Be = t(Ne.prototype, "largeMagneticTime", [me], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 10
                }
            }), Se = t(Ne.prototype, "bossStandTime", [fe], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 10
                }
            }), ve = t(Ne.prototype, "tentaclehurtPer", [he], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 1
                }
            }), ze = t(Ne.prototype, "hurtPer", [ge], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 1
                }
            }), de = Ne)) || de)), e("BossControlBase", (Ce = Oe("BossControlBase"), De = Re({
                type: l(Fe),
                displayName: "怪物类型"
            }), Pe = Re({
                type: u,
                displayName: "怪物名字(随便写都可以)"
            }), Me = Re({
                type: p,
                displayName: "怪物生命值"
            }), ke = Re({
                type: p,
                displayName: "怪物伤害值"
            }), Ae = Re({
                type: s,
                displayName: "怪物移动速度"
            }), Ce((_e = t((He = function (e) {
                function t() {
                    for (var t, n = arguments.length, a = new Array(n), o = 0; o < n; o++) a[o] = arguments[o];
                    return t = e.call.apply(e, [this].concat(a)) || this, i(t, "bossType", _e, r(t)), i(t, "bossName", Ge, r(t)), i(t, "bossHp", xe, r(t)), i(t, "bossAtk", We, r(t)), i(t, "bossMoveSpeed", Ve, r(t)), t.bossInitMoveSpeed = 0, t.bossInitAtk = 0, t.bossTentacleNode = void 0, t.bossMagneticNode = void 0, t.bossVec2 = void 0, t.nowBossState = Ee.休眠, t.gameView = void 0, t
                }
                n(t, e);
                var a = t.prototype;
                return a.initBoss = function (e) {}, a.initTentacleSkill = function (e) {
                    this.bossTentacleNode = e.getChildByName("TentacleNode"), this.bossMagneticNode = e.getChildByName("MagneticNode");
                    for (var t = this.bossTentacleNode.children, i = this.bossMagneticNode.children, n = 0; n < t.length; n++) {
                        t[n].active = !1
                    }
                    for (var r = 0; r < i.length; r++) {
                        i[r].active = !1
                    }
                }, a.activeByDoor = function () {
                    this.nowBossState = Ee.激活
                }, a.getHurtByOther = function (e) {
                    if (this.node.active) {
                        var t = this.gameView.getGunAtkAnimItem();
                        t.node.setWorldPosition(this.node.getWorldPosition()), t.play(), c.Instance.DelayToDo((function () {
                            t.node.active = !1
                        }), t, .2), this.bossHp -= e.shotWeapon.weaponHurt, this.bossHp <= 0 && this.bossDead(), y.Instance.play("怪物受击")
                    }
                }, a.hurtPlayer = function (e) {
                    void 0 === e && (e = this.bossAtk), this.gameView.playerBeAtk(-e)
                }, a.continueControl = function () {}, a.pauseControl = function () {}, a.bossDead = function () {
                    this.nowBossState = Ee.死亡
                }, t
            }(b)).prototype, "bossType", [De], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return Fe.跟踪怪
                }
            }), Ge = t(He.prototype, "bossName", [Pe], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return "跟踪怪"
                }
            }), xe = t(He.prototype, "bossHp", [Me], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 0
                }
            }), We = t(He.prototype, "bossAtk", [ke], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 0
                }
            }), Ve = t(He.prototype, "bossMoveSpeed", [Ae], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 0
                }
            }), Ie = He)) || Ie));
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/BossEggControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./ResMgr.ts", "./GameTools.ts", "./UIGameView.ts", "./BossControlBase.ts", "./SkillBaseControl.ts"], (function (e) {
    "use strict";
    var t, o, s, a, i, n, r, g, c;
    return {
        setters: [function (e) {
            t = e.inheritsLoose
        }, function (e) {
            o = e.cclegacy, s = e._decorator
        }, function (e) {
            a = e.ResMgr
        }, function (e) {
            i = e.GameTools
        }, function (e) {
            n = e.GameState
        }, function (e) {
            r = e.BossPrefabNameConfig, g = e.BossControlBase
        }, function (e) {
            c = e.SkillBaseControl
        }],
        execute: function () {
            var l;
            o._RF.push({}, "aeb1fMPqNZHIJ5OQ7g3UhWt", "BossEggControl", void 0);
            var u = s.ccclass;
            s.property, e("BossEggControl", u("BossEggControl")(l = function (e) {
                function o() {
                    for (var t, o = arguments.length, s = new Array(o), a = 0; a < o; a++) s[a] = arguments[a];
                    return (t = e.call.apply(e, [this].concat(s)) || this).createTimer = 0, t.createTime = 0, t.eggData = void 0, t
                }
                t(o, e);
                var s = o.prototype;
                return s.start = function () {}, s.update = function (e) {
                    this.gameView.getNowGameState == n.playing && (this.createTimer += e, this.createTimer > this.createTime && this.createBoss())
                }, s.initEgg = function (e, t) {
                    this.gameView = e, this.createTime = t.eggCreateTime, this.eggData = t
                }, s.createBoss = function () {
                    var e = this.eggData.eggCreateBossType[i.Instance.GetIntRandomNum_New(0, this.eggData.eggCreateBossType.length)],
                        t = a.Instance.LoadPrefab(r.PrefabNameArr[e]);
                    t.setParent(this.gameView.getLevelPrefab.bossNode), t.setWorldPosition(this.node.getWorldPosition()), this.node.active = !1, t.getComponent(g).initBoss(this.gameView)
                }, s.getHurtByOther = function (e) {
                    this.node.active && (this.eggData.eggHP -= e, this.eggData.eggHP <= 0 && this.eggDead())
                }, s.eggDead = function () {
                    this.node.active = !1
                }, o
            }(c)) || l);
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/BossStoneControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./CommonTipsMgr.ts", "./TimeControl.ts", "./UIViewMgr.ts", "./UIGameView.ts", "./SkillBaseControl.ts"], (function (o) {
    "use strict";
    var t, e, n, i, s, l, r, a, c, u, h, C;
    return {
        setters: [function (o) {
            t = o.inheritsLoose
        }, function (o) {
            e = o.cclegacy, n = o._decorator, i = o.Collider2D, s = o.Contact2DType, l = o.Vec3, r = o.tween
        }, function (o) {
            a = o.CommonTipsMgr
        }, function (o) {
            c = o.TimeControl
        }, function (o) {
            u = o.UIViewConfig
        }, function (o) {
            h = o.ColliderTagConfig
        }, function (o) {
            C = o.SkillBaseControl
        }],
        execute: function () {
            var d;
            e._RF.push({}, "f1f22HxpRBHfqGAgHellvzn", "BossStoneControl", void 0);
            var g = n.ccclass;
            n.property, o("BossStoneControl", g("BossStoneControl")(d = function (o) {
                function e() {
                    for (var t, e = arguments.length, n = new Array(e), i = 0; i < e; i++) n[i] = arguments[i];
                    return (t = o.call.apply(o, [this].concat(n)) || this).stoneCollider = void 0, t
                }
                t(e, o);
                var n = e.prototype;
                return n.onLoad = function () {}, n.update = function (o) {}, n.DownStone = function (o, t) {
                    var e = this;
                    this.bossJB = t.boss;
                    var n = this.node.getChildByName("StoneImg");
                    this.stoneCollider || (this.stoneCollider = n.getComponent(i), this.stoneCollider.on(s.BEGIN_CONTACT, this.onBeginContact, this)), this.stoneCollider.enabled = !1, this.gameView = o, this.node.setScale(l.ZERO), this.node.setWorldPosition(this.gameView.getBlockWorldPos(this.gameView.getPlayerNode.getStandBlock.blockVec2)), n.position = new l(0, this.gameView.blockSize.y), r(n).to(t.warnTime, {
                        position: l.ZERO
                    }).start(), r(this.node).to(t.warnTime, {
                        scale: l.ONE
                    }).call((function () {
                        e.stoneCollider.enabled = !0, c.Instance.DelayToDo((function () {
                            e.node.active = !1
                        }), e, 1)
                    })).start()
                }, n.onBeginContact = function (o, t, e) {
                    console.log("onBeginContact"), t.tag == h.Player && this.touchPlayer()
                }, n.touchPlayer = function () {
                    a.Instance.ShowTips("玩家受到落石伤害", u.UIGameView), this.bossJB.hurtPlayer(this.bossJB.bossAtk * this.bossJB.stoneData.hurtPer)
                }, e
            }(C)) || d);
            e._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/BoxControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./ResMgr.ts", "./TimeControl.ts", "./UIViewMgr.ts", "./UIGameView.ts", "./WeaponControlBase.ts"], (function (e) {
    "use strict";
    var t, o, i, n, r, a, s, p, l, c, u, b, m, g, y, d, f, h;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, o = e.inheritsLoose, i = e.initializerDefineProperty, n = e.assertThisInitialized, r = e.createClass
        }, function (e) {
            a = e.cclegacy, s = e._decorator, p = e.Enum, l = e.Node, c = e.Animation, u = e.Sprite, b = e.Component
        }, function (e) {
            m = e.ResMgr
        }, function (e) {
            g = e.TimeControl
        }, function (e) {
            y = e.UIViewMgr, d = e.UIViewConfig
        }, function (e) {
            f = e.UIGameView
        }, function (e) {
            h = e.WeaponType
        }],
        execute: function () {
            var x, I, w, v, T, V, N, C, B, W, _, F, O;
            e("BoxType", void 0), a._RF.push({}, "38e22OkVodMx5xFEbAJ7Ecd", "BoxControl", void 0);
            var z, P = s.ccclass,
                k = s.property;
            ! function (e) {
                e[e["弹药"] = 0] = "弹药", e[e["药品"] = 1] = "药品", e[e["混合"] = 2] = "混合"
            }(z || (z = e("BoxType", {})));
            e("BoxControl", (x = P("BoxControl"), I = k({
                type: p(z),
                displayName: "宝箱类型"
            }), w = k({
                type: p(h),
                displayName: "如果是弹药宝箱需要设置弹药的类型"
            }), v = k({
                type: l,
                displayName: "子弹节点"
            }), T = k({
                type: l,
                displayName: "药品节点"
            }), V = k({
                type: c
            }), x((B = t((C = function (e) {
                function t() {
                    for (var t, o = arguments.length, r = new Array(o), a = 0; a < o; a++) r[a] = arguments[a];
                    return t = e.call.apply(e, [this].concat(r)) || this, i(t, "boxType", B, n(t)), i(t, "bulletType", W, n(t)), i(t, "weaponNode", _, n(t)), i(t, "drugNode", F, n(t)), i(t, "fireAnim", O, n(t)), t.boxImg = void 0, t.boxWeaponImg = void 0, t.isOpen = !1, t.boxVec2 = void 0, t.gameView = void 0, t
                }
                o(t, e);
                var a = t.prototype;
                return a.start = function () {
                    var e = this;
                    if (this.gameView = y.Instance.GetView(d.UIGameView).getComponent(f), this.boxImg = this.node.getComponent(u), this.boxType == z.弹药) {
                        this.boxWeaponImg = this.node.getChildByName("weaponImg").getComponent(u);
                        var t = Number(this.bulletType);
                        this.boxWeaponImg.spriteFrame = m.Instance.LoadSpriteFrame("boxWeaponImg_" + (t + 1) + "_off")
                    }
                    this.boxType == z.混合 && g.Instance.DelayToDo((function () {
                        if (e.gameView.getLevelPrefab) {
                            var t = e.gameView.getBlockVec2ByWorldPos(e.node.getWorldPosition());
                            e.boxVec2 = t, e.node.setWorldPosition(e.gameView.getBlockWorldPos(t))
                        }
                    }), this, 2), this.weaponNode.active = !1, this.drugNode.active = !1
                }, a.boxOpen = function () {
                    if (!this.isOpen) {
                        if (this.isOpen = !0, this.boxWeaponImg) {
                            var e = Number(this.bulletType);
                            this.boxWeaponImg.spriteFrame = m.Instance.LoadSpriteFrame("boxWeaponImg_" + (e + 1) + "_on")
                        }
                        var t = Number(this.boxType);
                        this.boxImg.spriteFrame = m.Instance.LoadSpriteFrame("box_" + (t + 1) + "_on"), this.weaponNode.active = this.boxType == z.弹药 || this.boxType == z.混合, this.drugNode.active = this.boxType == z.药品 || this.boxType == z.混合
                    }
                }, a.boxDestory = function () {
                    this.isOpen = !0, this.fireAnim.play()
                }, r(t, [{
                    key: "getIsOpen",
                    get: function () {
                        return this.isOpen
                    }
                }, {
                    key: "getBoxVec2",
                    get: function () {
                        return this.boxVec2
                    }
                }]), t
            }(b)).prototype, "boxType", [I], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return z.弹药
                }
            }), W = t(C.prototype, "bulletType", [w], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return h.手枪
                }
            }), _ = t(C.prototype, "weaponNode", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), F = t(C.prototype, "drugNode", [T], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), O = t(C.prototype, "fireAnim", [V], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), N = C)) || N));
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/C2SConfig.ts", ["cc"], (function (e) {
    "use strict";
    var a, t;
    return {
        setters: [function (e) {
            a = e.cclegacy, t = e._decorator
        }],
        execute: function () {
            var r, i;
            a._RF.push({}, "a4b14n2LsdGK7d1kkq32xoc", "C2SConfig", void 0);
            var c = t.ccclass;
            t.property, 
            e("C2SConfig", c("C2SConfig")(((i = function () {}).LoginUrl = "",
            i.PlayerSignUrl = "",
            i.QueryPlayerUrl = "",
            i.UpdateScoreUrl = "",
             i.ChangeSkinUrl = "",
              i.GetRankUrl ="",
              
              r = i)) || r);
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/C2SControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./C2SConfig.ts", "./LYCSDK.ts", "./LYCSDKHttp.ts", "./TimeControl.ts"], (function (n) {
    "use strict";
    var t, e, o, c, i, a, s, r;
    return {
        setters: [function (n) {
            t = n.createClass
        }, function (n) {
            e = n.cclegacy, o = n._decorator
        }, function (n) {
            c = n.C2SConfig
        }, function (n) {
            i = n.LYCSDK, a = n.PlatformType
        }, function (n) {
            s = n.LYCSDKHttp
        }, function (n) {
            r = n.TimeControl
        }],
        execute: function () {
            var l, u;
            e._RF.push({}, "90971pehk1IR4FIxaj7z/a0", "C2SControl", void 0);
            var f = o.ccclass;
            o.property, n("C2SControl", f("C2SControl")(((u = function () {
                function n() {}
                return n.prototype.PlayerLogin = function (n) {
                    var t = this,
                        e = i.Instance.PlatformSDKControl.UserInfoCallBack;
                    s.Instance.SendMess(c.LoginUrl, {
                        thirdId: e.thirdId,
                        headIcon: e.headIcon,
                        nickName: e.nickName,
                        province: e.province,
                        city: e.city,
                        channel: e.channel
                    }, (function (e) {
                        if (200 == e.status) n && (i.Instance.GameLog("登录成功"), n(e));
                        else {
                            if (i.Instance.GameLog("登录出错" + e.status), i.Instance.GamePlatform == a.Windows) return;
                            r.Instance.DelayToDo((function () {
                                t.PlayerLogin(n)
                            }), r.Instance, 2)
                        }
                    }))
                }, t(n, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this.instance && (this.instance = new n), this.instance
                    }
                }]), n
            }()).instance = void 0, l = u)) || l);
            e._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/ChargeBossControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./TimeControl.ts", "./GameTools.ts", "./UIGameView.ts", "./BossControlBase.ts", "./SoundMgr.ts"], (function (e) {
    "use strict";
    var t, o, i, n, s, a, r, l, c, h, g, d, y, m, u, p, C, b, w, B, v, f, P;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, o = e.inheritsLoose, i = e.initializerDefineProperty, n = e.assertThisInitialized
        }, function (e) {
            s = e.cclegacy, a = e._decorator, r = e.CCFloat, l = e.CCInteger, c = e.Collider2D, h = e.Contact2DType, g = e.dragonBones, d = e.Vec2, y = e.Vec3, m = e.tween, u = e.Tween
        }, function (e) {
            p = e.TimeControl
        }, function (e) {
            C = e.GameTools
        }, function (e) {
            b = e.BlockType, w = e.ColliderTagConfig, B = e.GameState
        }, function (e) {
            v = e.BossState, f = e.BossControlBase
        }, function (e) {
            P = e.SoundMgr
        }],
        execute: function () {
            var T, k, D, V, N, S, A, x, W;
            s._RF.push({}, "db6b8eO/d5Om70+cuvw7Tit", "ChargeBossControl", void 0);
            var I = a.ccclass,
                G = a.property;
            e("ChargeBossControl", (T = I("ChargeBossControl"), k = G({
                type: r,
                displayName: "怪物发现主角后预警冲锋时间"
            }), D = G({
                type: r,
                displayName: "怪物冲锋完后的冷却时间"
            }), V = G({
                type: l,
                displayName: "怪物冲锋额外增加的像素"
            }), T((A = t((S = function (e) {
                function t() {
                    for (var t, o = arguments.length, s = new Array(o), a = 0; a < o; a++) s[a] = arguments[a];
                    return t = e.call.apply(e, [this].concat(s)) || this, i(t, "warnTime", A, n(t)), i(t, "waitTime", x, n(t)), i(t, "moveMorePix", W, n(t)), t.bossCollider = void 0, t.bossCheckCollider = void 0, t.bossVec2 = void 0, t.targetAngle = void 0, t.checkPlayerStandBlock = void 0, t.bossDB = void 0, t.warnLine = void 0, t.targetWP = void 0, t.baseLen = 800, t
                }
                o(t, e);
                var s = t.prototype;
                return s.initBoss = function (e) {
                    var t, o, i;
                    for (var n in this.gameView = e, this.bossCollider = this.node.getChildByName("怪物身体区域").getComponent(c), this.bossCollider.on(h.BEGIN_CONTACT, this.onBeginContact, this), this.bossCheckCollider = this.node.getChildByName("默认检测区域").getComponent(c), this.bossCheckCollider.on(h.BEGIN_CONTACT, this.onBeginCheckContact, this), this.gameView.allGameBlock) {
                        var s = this.gameView.allGameBlock[n];
                        if (s.blockItemType == b.road) {
                            var a = this.gameView.GetBlockLocalPos(s.blockVec2),
                                r = C.Instance.GetPointsDistance(a, this.node.position);
                            (t && t > r || !t) && (t = r, i = a, o = s)
                        }
                    }
                    this.bossDB = this.node.getComponent(g.ArmatureDisplay), this.bossDB.playAnimation("daiji"), this.bossMoveSpeed = 1 / this.bossMoveSpeed, this.bossVec2 = o.blockVec2, this.node.setPosition(i)
                }, s.onBeginContact = function (e, t, o) {
                    console.log("onBeginContact"), t.tag == w.Player && this.touchPlayer()
                }, s.onBeginCheckContact = function (e, t, o) {
                    console.log("onBeginCheckContact"), t.tag == w.Player && this.checkPlayer(t.node)
                }, s.checkPlayer = function (e) {
                    var t = this;
                    this.nowBossState = v.激活, this.bossCheckCollider.enabled = !1, this.bossDB.playAnimation("chongqianyao");
                    var o = this.gameView.getWarnLineItem();
                    this.warnLine = o;
                    var i = this.gameView.getNewPlayerNode;
                    this.checkPlayerStandBlock = i.getStandBlock;
                    var n = i.getPlayerBodyWp,
                        s = this.node.getWorldPosition(),
                        a = C.Instance.getTwoPointsAngle(n, s) + 90;
                    o.angle = a, this.targetAngle = a, o.setWorldPosition(n), i.showWarnTips();
                    var r = new d(n.x - s.x, n.y - s.y),
                        l = new d(n.x - s.x, n.y - s.y),
                        c = r.length(),
                        h = r.normalize().multiplyScalar(1 * c),
                        g = l.normalize().multiplyScalar(this.moveMorePix),
                        u = new y(s.x + h.x + g.x, s.y + h.y + g.y);
                    this.targetWP = u, m(this.node).to(this.warnTime - .01, {
                        angle: a - 180
                    }).start(), p.Instance.DelayToDo((function () {
                        t.gameView.getNowGameState == B.playing ? t.nowBossState == v.激活 && (t.finishAnim(), o.active = !1) : (o.active = !1, t.bossCheckCollider.enabled = !0, t.gameView.getNewPlayerNode.hideWarnTips())
                    }), this, this.warnTime)
                }, s.finishAnim = function () {
                    var e = this;
                    this.bossDB.playAnimation("chong", 0), P.Instance.play("冲锋怪冲锋");
                    var t = C.Instance.GetPointsDistance(this.targetWP, this.node.getWorldPosition()),
                        o = this.bossMoveSpeed * (t / this.baseLen);
                    m(this.node).to(o, {
                        worldPosition: this.targetWP
                    }).call((function () {
                        e.bossDB.playAnimation("daiji"), e.bossVec2 = e.gameView.getBlockVec2ByWorldPos(e.targetWP), e.warnLine.active = !1, p.Instance.DelayToDo((function () {
                            e.bossCheckCollider.enabled = !0
                        }), e, e.waitTime), e.gameView.getNewPlayerNode.hideWarnTips()
                    })).start()
                }, s.getRunTargetBlock = function () {
                    var e = this.checkPlayerStandBlock.blockVec2;
                    this.node.angle = this.targetAngle;
                    var t = new y(e.x - this.bossVec2.x, e.y - this.bossVec2.y);
                    return new d(e.x + t.x, e.y + t.y)
                }, s.touchPlayer = function () {
                    this.hurtPlayer()
                }, s.bossDead = function () {
                    var t = this;
                    this.nowBossState != v.死亡 && (e.prototype.bossDead.call(this), this.gameView.getNewPlayerNode.hideWarnTips(), this.warnLine && (this.warnLine.active = !1), this.bossCheckCollider.enabled = !1, u.stopAllByTarget(this.node), this.bossDB.playAnimation("siwang", 1), p.Instance.DelayToDo((function () {
                        t.node.active = !1
                    }), this, 2))
                }, t
            }(f)).prototype, "warnTime", [k], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 1
                }
            }), x = t(S.prototype, "waitTime", [D], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 1
                }
            }), W = t(S.prototype, "moveMorePix", [V], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 140
                }
            }), N = S)) || N));
            s._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/CommonTipsControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./UIViewMgr.ts"], (function (e) {
    "use strict";
    var t, n, i, o, r, a, l, s, c, p, u, b, f;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, n = e.inheritsLoose, i = e.initializerDefineProperty, o = e.assertThisInitialized
        }, function (e) {
            r = e.cclegacy, a = e._decorator, l = e.UITransform, s = e.Label, c = e.UIOpacity, p = e.Size, u = e.tween, b = e.Component
        }, function (e) {
            f = e.UIViewMgr
        }],
        execute: function () {
            var h, d, y, m, v, g, L, T, w;
            r._RF.push({}, "5e5ffsTQf1BN4fc/VUv5Z86", "CommonTipsControl", void 0);
            var C = a.ccclass,
                z = a.property;
            e("CommonTipsControl", (h = C("CommonTipsControl"), d = z({
                type: l
            }), y = z({
                type: l
            }), m = z({
                type: s
            }), h((L = t((g = function (e) {
                function t() {
                    for (var t, n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a];
                    return t = e.call.apply(e, [this].concat(r)) || this, i(t, "LabMask", L, o(t)), i(t, "LabelTrans", T, o(t)), i(t, "Label", w, o(t)), t
                }
                n(t, e);
                var r = t.prototype;
                return r.ShowTips = function (e, t, n) {
                    var i = this;
                    void 0 === n && (n = 2), this.Label.string = e;
                    var o = f.Instance.GetView(t).node;
                    this.node.setParent(o), this.node.setSiblingIndex(o.children.length);
                    var r = this.node.getComponent(c);
                    this.node.active = !0, r.opacity = 255, this.schedule((function () {
                        i.LabMask.setContentSize(new p(i.LabelTrans.contentSize.width + 40, i.LabelTrans.contentSize.height + 7))
                    }), .05), u(r).delay(n / 2).to(n / 2, {
                        opacity: 0
                    }).call((function () {
                        i.node.removeFromParent(), i.node.active = !1
                    })).start()
                }, r.HideTips = function () {}, t
            }(b)).prototype, "LabMask", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), T = t(g.prototype, "LabelTrans", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), w = t(g.prototype, "Label", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), v = g)) || v));
            r._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/CommonTipsMgr.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./CommonTipsControl.ts", "./ResMgr.ts", "./UIViewMgr.ts"], (function (n) {
    "use strict";
    var o, t, i, s, e, r, c, a;
    return {
        setters: [function (n) {
            o = n.inheritsLoose, t = n.createClass
        }, function (n) {
            i = n.cclegacy, s = n._decorator, e = n.Component
        }, function (n) {
            r = n.CommonTipsControl
        }, function (n) {
            c = n.ResMgr
        }, function (n) {
            a = n.UIViewMgr
        }],
        execute: function () {
            var p, u;
            i._RF.push({}, "6925176l41Db7slq0DhfbXU", "CommonTipsMgr", void 0);
            var l = s.ccclass;
            s.property, n("CommonTipsMgr", l("CommonTipsMgr")(((u = function (n) {
                function i() {
                    for (var o, t = arguments.length, i = new Array(t), s = 0; s < t; s++) i[s] = arguments[s];
                    return (o = n.call.apply(n, [this].concat(i)) || this).TipsPool = [], o
                }
                o(i, n);
                var s = i.prototype;
                return s.ShowTips = function (n, o, t) {
                    void 0 === o && (o = a.Instance.NowOpenViewName), void 0 === t && (t = 2), this.GetTips().getComponent(r).ShowTips(n, o, t)
                }, s.GetTips = function () {
                    for (var n = 0; n < this.TipsPool.length; n++) {
                        var o = this.TipsPool[n];
                        if (!o.active) return o
                    }
                    var t = c.Instance.LoadPrefab("CommonTipsNode");
                    return this.TipsPool.push(t), t
                }, t(i, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this.instance && (this.instance = new i), this.instance
                    }
                }]), i
            }(e)).instance = void 0, p = u)) || p);
            i._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/DankeAnimControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function (t) {
    "use strict";
    var n, e, o, i, a, r;
    return {
        setters: [function (t) {
            n = t.inheritsLoose
        }, function (t) {
            e = t.cclegacy, o = t._decorator, i = t.Vec3, a = t.tween, r = t.Component
        }],
        execute: function () {
            var s;
            e._RF.push({}, "b4e2b7wVCRF86dMcyBOi5qe", "DankeAnimControl", void 0);
            var c = o.ccclass;
            o.property, t("DankeAnimControl", c("DankeAnimControl")(s = function (t) {
                function e() {
                    for (var n, e = arguments.length, o = new Array(e), a = 0; a < e; a++) o[a] = arguments[a];
                    return (n = t.call.apply(t, [this].concat(o)) || this).dankeImg = void 0, n.targetScale = new i(.6, .6), n
                }
                n(e, t);
                var o = e.prototype;
                return o.onLoad = function () {
                    this.dankeImg = this.node.getChildByName("dankeImg")
                }, o.start = function () {}, o.update = function (t) {}, o.showDankeAnim = function (t) {
                    var n = this;
                    this.node.active = !0;
                    var e = t.getChildByName("dankeEndNode").getWorldPosition();
                    this.node.setWorldPosition(t.getWorldPosition()), this.node.setWorldRotation(t.getWorldRotation()), this.node.setScale(i.ONE), this.dankeImg.angle = 0, this.dankeImg.setPosition(i.ZERO);
                    var o = .25;
                    a(this.dankeImg).to(o, {
                        worldPosition: e
                    }).delay(.1).call((function () {
                        n.node.active = !1
                    })).start(), a(this.dankeImg).to(o, {
                        angle: -50
                    }).start(), a(this.node).to(o, {
                        scale: this.targetScale
                    }).start()
                }, e
            }(r)) || s);
            e._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/DoorControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./UIViewMgr.ts", "./UIGameView.ts"], (function (o) {
    "use strict";
    var t, e, i, r, s, n, h, d, c, a, l, g, f;
    return {
        setters: [function (o) {
            t = o.inheritsLoose, e = o.createClass
        }, function (o) {
            i = o.cclegacy, r = o._decorator, s = o.UITransform, n = o.Size, h = o.Vec2, d = o.Tween, c = o.tween, a = o.Component
        }, function (o) {
            l = o.UIViewMgr, g = o.UIViewConfig
        }, function (o) {
            f = o.UIGameView
        }],
        execute: function () {
            var m;
            o("DoorDir", void 0), i._RF.push({}, "40ef64c5PBC97WW9LNnzXM6", "DoorControl", void 0);
            var w, u = r.ccclass;
            r.property;
            ! function (o) {
                o[o["横向"] = 0] = "横向", o[o["纵向"] = 1] = "纵向"
            }(w || (w = o("DoorDir", {})));
            o("DoorControl", u("DoorControl")(m = function (o) {
                function i() {
                    for (var t, e = arguments.length, i = new Array(e), r = 0; r < e; r++) i[r] = arguments[r];
                    return (t = o.call.apply(o, [this].concat(i)) || this).doorDir = w.纵向, t.doorImgTrans = void 0, t.doorImgNode = void 0, t._isDoorOff = !0, t.switchArr = [], t.blockV2Arr = [], t.doorMoveSpeed = .25, t._gameView = void 0, t.doorCloseSize = void 0, t.doorOpenSize = void 0, t
                }
                t(i, o);
                var r = i.prototype;
                return r.onLoad = function () {
                    this.doorImgNode = this.node.getChildByName("Door"), this.doorImgTrans = this.doorImgNode.getComponent(s);
                    var o = this.doorImgTrans.contentSize;
                    this.doorCloseSize = new n(o.width, o.height), o.width >= o.height ? (this.doorDir = w.横向, this.doorOpenSize = new n(0, o.height)) : (this.doorDir = w.纵向, this.doorOpenSize = new n(o.width, 0))
                }, r.update = function (o) {}, r.initDoor = function (o, t) {
                    if (this._isDoorOff = o, this.switchArr.push(t), this.blockV2Arr = [], this.doorImgNode) {
                        var e = this.doorImgNode.getWorldPosition(),
                            i = this.gameView.getBlockVec2ByWorldPos(e),
                            r = 0;
                        if (this.doorDir == w.横向) {
                            r = Math.floor(this.doorImgTrans.contentSize.width / this.gameView.blockSize.width);
                            for (var s = Math.floor(r), n = i.x, d = i.x + s, c = n; c <= d; c++) this.blockV2Arr.push(new h(c, i.y))
                        } else {
                            r = Math.floor(this.doorImgTrans.contentSize.height / this.gameView.blockSize.height);
                            for (var a = Math.floor(r), l = i.y, g = i.y + a, f = l; f <= g; f++) this.blockV2Arr.push(new h(i.x, f))
                        }
                        this.gameView.doorBlock([], this.blockV2Arr), o ? (this.doorImgTrans.setContentSize(this.doorCloseSize), this.doorClose()) : (this.doorImgTrans.setContentSize(this.doorOpenSize), this.doorOpen())
                    } else console.log("door:" + this.node.parent.parent.name)
                }, r.changeDoor = function (o, t) {
                    var e = this;
                    this._isDoorOff = !this._isDoorOff;
                    for (var i = 0; i < this.switchArr.length; i++) {
                        this.switchArr[i].changeSwitch(this._isDoorOff)
                    }
                    d.stopAllByTarget(this.doorImgNode), this.isDoorOff ? c(this.doorImgTrans).to(this.doorMoveSpeed, {
                        contentSize: this.doorCloseSize
                    }).call((function () {
                        e.doorClose(), o && o()
                    })).start() : c(this.doorImgTrans).to(this.doorMoveSpeed, {
                        contentSize: this.doorOpenSize
                    }).call((function () {
                        e.doorOpen(), t && t()
                    })).start()
                }, r.doorOpen = function () {
                    this.gameView.doorBlock(this.blockV2Arr, [])
                }, r.doorClose = function () {
                    this.gameView.doorBlock([], this.blockV2Arr)
                }, e(i, [{
                    key: "isDoorOff",
                    get: function () {
                        return this._isDoorOff
                    }
                }, {
                    key: "gameView",
                    get: function () {
                        return this._gameView || (this._gameView = l.Instance.GetView(g.UIGameView).getComponent(f)), this._gameView
                    }
                }]), i
            }(a)) || m);
            i._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/DoorSwitchControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BossControlBase.ts", "./DoorControl.ts", "./SoundMgr.ts", "./GameConfig.ts", "./UIViewMgr.ts"], (function (t) {
    "use strict";
    var i, o, n, e, r, s, a, c, h, l, f, u, p, d, g, w;
    return {
        setters: [function (t) {
            i = t.applyDecoratedDescriptor, o = t.inheritsLoose, n = t.initializerDefineProperty, e = t.assertThisInitialized
        }, function (t) {
            r = t.cclegacy, s = t._decorator, a = t.CCBoolean, c = t.instantiate, h = t.Animation, l = t.Component
        }, function (t) {
            f = t.BossControlBase
        }, function (t) {
            u = t.DoorControl
        }, function (t) {
            p = t.SoundMgr
        }, function (t) {
            d = t.GameConfig, g = t.TaskConfig
        }, function (t) {
            w = t.UIViewMgr
        }],
        execute: function () {
            var m, A, y, v, C, S, b, D, B;
            r._RF.push({}, "1ae25RhlJ9O3IXH9fdlgi1E", "DoorSwitchControl", void 0);
            var O = s.ccclass,
                I = s.property;
            t("DoorSwitchControl", (m = O("DoorSwitchControl"), A = I({
                type: a,
                displayName: "默认门是否处于关闭位置（OffPoint）"
            }), y = I({
                type: u,
                displayName: "控制的门列表"
            }), v = I({
                type: f,
                displayName: "控制的怪物列表"
            }), m((b = i((S = function (t) {
                function i() {
                    for (var i, o = arguments.length, r = new Array(o), s = 0; s < o; s++) r[s] = arguments[s];
                    return i = t.call.apply(t, [this].concat(r)) || this, n(i, "isSwitchOff", b, e(i)), n(i, "doorArr", D, e(i)), n(i, "bossArr", B, e(i)), i.switchAnim = void 0, i.isActiveBoss = !1, i
                }
                o(i, t);
                var r = i.prototype;
                return r.onLoad = function () {
                    var t = this.node.getChildByName("SwitchLab");
                    t ? (t.active = !1, this.switchAnim = c(this.node.parent.parent.getChildByName("switchAnimPrefab")).getComponent(h), this.switchAnim.node.setParent(this.node), this.switchAnim.node.setPosition(0, -26), this.switchAnim.node.active = !0) : this.switchAnim = this.node.getChildByName("switchAnim").getComponent(h), this.changeSwitch(this.isSwitchOff, !1)
                }, r.update = function (t) {}, r.initDoor = function () {
                    for (var t = 0; t < this.doorArr.length; t++) {
                        this.doorArr[t].initDoor(this.isSwitchOff, this)
                    }
                }, r.changeSwitch = function (t, i) {
                    if (void 0 === i && (i = !0), i && p.Instance.play("按门按钮"), this.isSwitchOff = t, this.switchAnim.play(), this.isSwitchOff);
                    else if (!this.isActiveBoss) {
                        this.isActiveBoss = !0;
                        for (var o = 0; o < this.bossArr.length; o++) {
                            this.bossArr[o].activeByDoor()
                        }
                        "特殊任务门" == this.node.name && i && d.Instance.touchTaskStep <= g.OPEN_DOOR && w.Instance.getGameView().getGameTaskMgr.finishTask(g.GET_XINHAO)
                    }
                }, r.changeDoor = function (t, i) {
                    for (var o = 0; o < this.doorArr.length; o++) this.doorArr[o].changeDoor(t, i)
                }, i
            }(l)).prototype, "isSwitchOff", [A], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return !0
                }
            }), D = i(S.prototype, "doorArr", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return []
                }
            }), B = i(S.prototype, "bossArr", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return []
                }
            }), C = S)) || C));
            r._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/FinalBossBase.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BossControlBase.ts"], (function (e) {
    "use strict";
    var t, i, a, s, r, n, o, l, u, p, b, c, g, d, y, h, m, f;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, i = e.inheritsLoose, a = e.initializerDefineProperty, s = e.assertThisInitialized
        }, function (e) {
            r = e.cclegacy, n = e._decorator, o = e.Enum, l = e.CCFloat
        }, function (e) {
            u = e.BossPassivitySkill, p = e.BossInitiativeSkill, b = e.BulletData, c = e.ShakeGroundData, g = e.StoneData, d = e.CreateEggData, y = e.MagneticData, h = e.MinMaxNumber, m = e.BossState, f = e.BossControlBase
        }],
        execute: function () {
            var S, v, D, B, k, w, A, R, z, M, N, F, P, T, C, I, x, _, E, L, j, q, G, H, V;
            r._RF.push({}, "47895x/T8FCA7VqkXmpFdxv", "FinalBossBase", void 0);
            var X = n.ccclass,
                J = n.property;
            e("FinalBossBase", (S = X("FinalBossBase"), v = J({
                type: o(u),
                displayName: "boss的被动技能列表"
            }), D = J({
                type: o(p),
                displayName: "boss的主动技能列表"
            }), B = J({
                type: b,
                displayName: "子弹相关参数（如果boss没有子弹技能，可以忽视这个参数）"
            }), k = J({
                type: c,
                displayName: "震地技能相关参数（如果没有此技能，可忽略）"
            }), w = J({
                type: g,
                displayName: "落石技能相关参数（如果没有此技能，可忽略）"
            }), A = J({
                type: d,
                displayName: "召唤物技能相关参数（如果没有此技能，可忽略）"
            }), R = J({
                type: y,
                displayName: "闪电五连鞭技能相关参数（如果没有此技能，可忽略）"
            }), z = J({
                type: h,
                displayName: "boss技能随机时间最小最大值"
            }), M = J({
                type: l,
                displayName: "boss狂暴状态速度加成x%"
            }), N = J({
                type: l,
                displayName: "boss狂暴状态攻击加成x%"
            }), F = J({
                type: l,
                displayName: "boss狂暴状态持续时间"
            }), S((C = t((T = function (e) {
                function t() {
                    for (var t, i = arguments.length, r = new Array(i), n = 0; n < i; n++) r[n] = arguments[n];
                    return t = e.call.apply(e, [this].concat(r)) || this, a(t, "passivitySkill", C, s(t)), a(t, "initiativeSkill", I, s(t)), a(t, "bulletData", x, s(t)), a(t, "shakeData", _, s(t)), a(t, "stoneData", E, s(t)), a(t, "eggData", L, s(t)), a(t, "magneticData", j, s(t)), a(t, "skillTimeData", q, s(t)), a(t, "rageSpeedAddPer", G, s(t)), a(t, "rageAtkAddPer", H, s(t)), a(t, "rageDurtime", V, s(t)), t.startRageTimer = 0, t.isstartRage = !1, t.isEggCreateBoss = !1, t
                }
                i(t, e);
                var r = t.prototype;
                return r.start = function () {}, r.update = function (e) {
                    this.isstartRage && (this.startRageTimer += e, this.startRageTimer > this.rageDurtime && this.endRage())
                }, r.changeBossState = function (e) {
                    this.nowBossState = e, console.log("boss 修改状态为:" + e)
                }, r.startRage = function () {
                    this.changeBossState(m.狂暴), this.bossMoveSpeed = this.bossInitMoveSpeed + this.bossInitMoveSpeed * this.rageSpeedAddPer, this.bossMoveSpeed = 1 / this.bossMoveSpeed, this.bossAtk += this.bossInitAtk * this.rageAtkAddPer, this.startRageTimer = 0, this.isstartRage = !0
                }, r.endRage = function () {
                    this.bossMoveSpeed = this.bossInitMoveSpeed, this.bossMoveSpeed = 1 / this.bossMoveSpeed, this.bossAtk = this.bossInitAtk, this.startRageTimer = 0, this.isstartRage = !1
                }, t
            }(f)).prototype, "passivitySkill", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return []
                }
            }), I = t(T.prototype, "initiativeSkill", [D], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return []
                }
            }), x = t(T.prototype, "bulletData", [B], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return new b
                }
            }), _ = t(T.prototype, "shakeData", [k], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return new c
                }
            }), E = t(T.prototype, "stoneData", [w], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return new g
                }
            }), L = t(T.prototype, "eggData", [A], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return new d
                }
            }), j = t(T.prototype, "magneticData", [R], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return new y
                }
            }), q = t(T.prototype, "skillTimeData", [z], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return new h
                }
            }), G = t(T.prototype, "rageSpeedAddPer", [M], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return .5
                }
            }), H = t(T.prototype, "rageAtkAddPer", [N], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return .5
                }
            }), V = t(T.prototype, "rageDurtime", [F], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 10
                }
            }), P = T)) || P));
            r._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/FogControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameConfig.ts"], (function (o) {
    "use strict";
    var t, i, r, e, n, s, h, c, a;
    return {
        setters: [function (o) {
            t = o.inheritsLoose, i = o.createClass
        }, function (o) {
            r = o.cclegacy, e = o._decorator, n = o.Tween, s = o.tween, h = o.Vec3, c = o.Component
        }, function (o) {
            a = o.GameConfig
        }],
        execute: function () {
            var g;
            r._RF.push({}, "1371b39CaBPi7EstJxSVggX", "FogControl", void 0);
            var f = e.ccclass;
            e.property, o("FogControl", f("FogControl")(g = function (o) {
                function r() {
                    for (var t, i = arguments.length, r = new Array(i), e = 0; e < i; e++) r[e] = arguments[e];
                    return (t = o.call.apply(o, [this].concat(r)) || this)._showHideDur = 2, t._fogV2 = void 0, t.isShow = !0, t.fogImgArr = void 0, t.rotateSpeed = .2, t
                }
                t(r, o);
                var e = r.prototype;
                return e.initFog = function (o, t) {
                    this.fogImgArr = this.node.children, this.node.active = this.isShow, this._showHideDur /= o, this.refreshFog(t)
                }, e.refreshFog = function (o) {
                    this._fogV2 = o
                }, e.update = function () {}, e.ShowFogControl = function () {
                    if (!this.isShow) {
                        this.isShow = !0;
                        var o = a.Instance.showFogCount;
                        0 == o && (o = this.fogImgArr.length, a.Instance.showFogCount = o);
                        for (var t = 0; t < o; t++) {
                            var i = this.fogImgArr[t];
                            n.stopAllByTarget(i), this.node.active = !0, s(i).to(this._showHideDur, {
                                scale: h.ONE
                            }).start()
                        }
                    }
                }, e.HideFogControl = function (o) {
                    var t = this;
                    if (this.isShow) {
                        this.isShow = !1;
                        for (var i = 0; i < this.fogImgArr.length; i++)
                            if (this.node.active) {
                                var r = this.fogImgArr[i];
                                n.stopAllByTarget(r), this.node.active = !0, s(r).to(this._showHideDur, {
                                    scale: h.ZERO
                                }).call((function () {
                                    t.node.active = !1, o && o()
                                })).start()
                            }
                    }
                }, i(r, [{
                    key: "fogV2",
                    get: function () {
                        return this._fogV2
                    }
                }]), r
            }(c)) || g);
            r._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/FollowBossControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameConfig.ts", "./LYCSDKEventHelper.ts", "./TimeControl.ts", "./GameTools.ts", "./AStarMgr.ts", "./UIGameView.ts", "./BossControlBase.ts", "./SoundMgr.ts", "./LYCSDK.ts"], (function (e) {
    "use strict";
    var s, t, o, i, n, a, l, r, h, d, c, g, b, m, y, u, P, C, p, A, w, f, B, T, S, k, v, D, H, I, V, N, _, E;
    return {
        setters: [function (e) {
            s = e.applyDecoratedDescriptor, t = e.inheritsLoose, o = e.initializerDefineProperty, i = e.assertThisInitialized, n = e.createClass
        }, function (e) {
            a = e.cclegacy, l = e._decorator, r = e.CCBoolean, h = e.CCFloat, d = e.UITransform, c = e.Collider2D, g = e.Contact2DType, b = e.dragonBones, m = e.Animation, y = e.Vec2, u = e.Tween, P = e.tween, C = e.Size, p = e.Vec3
        }, function (e) {
            A = e.GameConfig, w = e.NewHandStep, f = e.TaskConfig
        }, function (e) {
            B = e.LYCSDKEventHelper, T = e.EventConfig
        }, function (e) {
            S = e.TimeControl
        }, function (e) {
            k = e.GameTools
        }, function (e) {
            v = e.AStarMgr
        }, function (e) {
            D = e.GameState, H = e.ColliderTagConfig
        }, function (e) {
            I = e.BossState, V = e.BossCategory, N = e.BossControlBase
        }, function (e) {
            _ = e.SoundMgr
        }, function (e) {
            E = e.LYCSDK
        }],
        execute: function () {
            var F, G, L, M, x, W, O, z, j;
            a._RF.push({}, "7a1eflp9dtLl4p/7K6olNf9", "FollowBossControl", void 0);
            var K = l.ccclass,
                R = l.property;
            e("FollowBossControl", (F = K("FollowBossControl"), G = R({
                type: r,
                displayName: "是否是新手指引怪物"
            }), L = R({
                type: h,
                displayName: "老六检测到玩家之后，延迟多少秒攻击"
            }), M = R({
                type: h,
                displayName: "攻击CD"
            }), F((O = s((W = function (e) {
                function s() {
                    for (var s, t = arguments.length, n = new Array(t), a = 0; a < t; a++) n[a] = arguments[a];
                    return s = e.call.apply(e, [this].concat(n)) || this, o(s, "isGuideBoss", O, i(s)), o(s, "checkPlayerAtkTime", z, i(s)), s.bossTrans = void 0, s.bossAnim = void 0, s.pathArr = void 0, s.followPathArrIndex = 0, s.playerPos = void 0, s.getPlayerTimer = 0, s.getPlayerTimeSpace = 1, s.isTouchPlayer = !1, s.isFBHandTouchPlayer = !1, s.isPauseFollow = !1, s.backDis = 30, s.bossCollider = void 0, s.bossCheckCollider = void 0, s.bossHandCollider = void 0, s.bossArmTrans = void 0, s.bossHandAnim = void 0, s._bossArmInitLen = void 0, s._bossHandInitPos = void 0, o(s, "atkCDTime", j, i(s)), s.bossDeadAnim = void 0, s
                }
                t(s, e);
                var a = s.prototype;
                return a.onLoad = function () {
                    var e = this;
                    B.instance.on(T.PlayChangeDoorSwitch, (function () {
                        e.isValid ? e.nowBossState == I.激活 && e.followPlayer(e.gameView.getPlayerNode.getStandBlock.blockVec2) : B.instance.off(T.PlayChangeDoorSwitch)
                    })), this.bossTrans = this.node.getComponent(d)
                }, a.update = function (e) {
                    this.gameView && this.gameView.getNowGameState == D.playing && this.nowBossState == I.激活 && this.bossType == V.跟踪怪 && (this.isTouchPlayer || (this.getPlayerTimer += e, this.getPlayerTimer > this.getPlayerTimeSpace && (this.getPlayerTimer = 0, this.isPlayerPosChange && this.followPlayer(this.gameView.getPlayerNode.getStandBlock.blockVec2))))
                }, a.initBoss = function (e) {
                    var s = this;
                    this.gameView = e, this.bossCollider = this.node.children[0].getComponent(c), this.isGuideBoss && A.Instance.newHandStep < w.FINISH_GUIDE || (this.bossCheckCollider = this.node.getChildByName("默认检测区域").getComponent(c), this.bossCheckCollider.on(g.BEGIN_CONTACT, this.onBeginCheckContact, this)), this.bossType == V.跟踪怪 ? (this.bossHandCollider = this.node.getChildByName("触手攻击区域").getComponent(c), this.bossHandCollider.on(g.BEGIN_CONTACT, this.onFBHandContact, this), this.bossHandCollider.enabled = !1, this.bossAnim = this.node.getComponent(b.ArmatureDisplay), this.bossAnim.addEventListener(b.EventObject.COMPLETE, this.finishDBAnim_genzong, this), this.bossCollider.on(g.BEGIN_CONTACT, this.onBeginContact, this)) : (this.bossAnim = this.node.getChildByName("Body").getComponent(b.ArmatureDisplay), this.bossAnim.addEventListener(b.EventObject.COMPLETE, this.finishDBAnim_laoliu, this), this.bossArmTrans = this.node.getChildByName("BossArm").getComponent(d), this.bossHandCollider = this.bossArmTrans.node.getChildByName("BossHand").getComponent(c), this.bossHandAnim = this.bossHandCollider.node.getComponent(m), this.bossHandCollider.on(g.BEGIN_CONTACT, this.onBeginHandContact, this), this.bossHandCollider.enabled = !1, this.bossDeadAnim = this.node.getChildByName("DeadAnim").getComponent(m), this.bossDeadAnim.node.active = !1, this.bossDeadAnim.on(m.EventType.FINISHED, (function () {
                        s.node.active = !1
                    }), this)), this.node.getComponent(d).anchorPoint = new y(.5, .5), this.bossMoveSpeed = 1 / this.bossMoveSpeed, this.changeBossVec2(this.gameView.getBlockVec2ByWorldPos(this.node.getWorldPosition())), this.changeDBAnim("daiji")
                }, a.onBeginContact = function (e, s, t) {
                    console.log("onBeginContact"), s.tag == H.Player && this.touchPlayer()
                }, a.onBeginHandContact = function (e, s, t) {
                    s.tag == H.Player && this.touchPlayer()
                }, a.onFBHandContact = function (e, s, t) {
                    s.tag == H.Player && (this.isFBHandTouchPlayer = !0, this.hurtPlayer())
                }, a.onBeginCheckContact = function (e, s, t) {
                    console.log("onBeginCheckContact"), s.tag == H.Player && this.checkPlayer(s)
                }, a.followPlayer = function (e) {
                    this.changeDBAnim("zoudong"), this.playerPos = this.gameView.getPlayerNode.getStandBlock.blockVec2, this.bossType != V.跟踪怪 || this.isPauseFollow || (this.pathArr = v.ins.findPath(this.bossVec2, e), u.stopAllByTarget(this.node), this.followPathArrIndex = 0, this.pathArr && this.runToPlayer())
                }, a.runToPlayer = function () {
                    var e = this;
                    if (!this.isPauseFollow) {
                        var s = new y(this.pathArr[this.followPathArrIndex].x, this.pathArr[this.followPathArrIndex].y);
                        if (Math.floor(s.x) != Math.floor(this.bossVec2.x) || Math.floor(s.y) != Math.floor(this.bossVec2.y)) {
                            var t = s.x - this.bossVec2.x,
                                o = this.bossVec2.y - s.y,
                                i = new y(t, o),
                                n = Math.atan2(i.y, i.x) / Math.PI * 180 + 90;
                            this.node.angle != n && (this.node.angle = n);
                            var a = this.gameView.getBlockWorldPos(s),
                                l = k.Instance.GetPointsDistance(this.node.getWorldPosition(), a) / this.gameView.blockSize.width;
                            P(this.node).to(this.bossMoveSpeed * l, {
                                worldPosition: a
                            }).call((function () {
                                e.isValid && (e.changeBossVec2(s), e.followPathArrIndex++, e.followPathArrIndex < e.pathArr.length ? e.runToPlayer() : e.isPlayerPosChange ? e.followPlayer(e.gameView.getPlayerNode.getStandBlock.blockVec2) : P(e.node).to(e.bossMoveSpeed, {
                                    worldPosition: e.gameView.getNewPlayerNode.getPlayerBodyWp
                                }).start())
                            })).start()
                        } else this.followPathArrIndex++, this.followPathArrIndex < this.pathArr.length ? this.runToPlayer() : P(this.node).to(this.bossMoveSpeed, {
                            worldPosition: this.gameView.getNewPlayerNode.getPlayerBodyWp
                        }).start()
                    }
                }, a.activeByDoor = function () {
                    e.prototype.activeByDoor.call(this), this.bossType == V.跟踪怪 && (this.nowBossState = I.激活, this.bossCheckCollider.enabled = !1, this.followPlayer(this.gameView.getPlayerNode.getStandBlock.blockVec2))
                }, a.checkPlayer = function (e) {
                    var s = this;
                    this.bossType == V.跟踪怪 ? (this.nowBossState = I.激活, this.bossCheckCollider.enabled = !1, this.followPlayer(this.gameView.getPlayerNode.getStandBlock.blockVec2)) : this.bossType == V.老六怪 && this.nowBossState != I.死亡 && (this.nowBossState = I.激活, S.Instance.DelayToDo((function () {
                        s.elongateArm(e.node)
                    }), this, this.checkPlayerAtkTime))
                }, a.elongateArm = function (e) {
                    var s = this;
                    _.Instance.play("老六怪攻击"), this.bossCheckCollider.enabled = !1, this.bossArmTrans.node.active = !0;
                    var t = this.gameView.getNewPlayerNode.getPlayerBodyWp,
                        o = k.Instance.getTwoPointsAngle(t, this.bossArmTrans.node.getWorldPosition());
                    this.bossArmTrans.node.angle = o - 90;
                    var i = k.Instance.GetWorldPointsDistance(t, this.bossHandCollider.node.getWorldPosition()),
                        n = .2;
                    P(this.bossArmTrans).to(n, {
                        contentSize: new C(30, this.bossArmInitLen + i + 80)
                    }).delay(.1).to(n, {
                        contentSize: new C(30, this.bossArmInitLen)
                    }).call((function () {
                        s.bossArmTrans.node.active = !1
                    })).delay(this.atkCDTime).call((function () {
                        s.bossCheckCollider.enabled = !0
                    })).union().start(), P(this.bossHandAnim.node).to(n, {
                        position: new p(0, this.bossHandInitPos.y - i - 80)
                    }).call((function () {
                        s.bossHandCollider.enabled = !0, s.bossHandAnim.play("laoliuHandAnim")
                    })).delay(.1).call((function () {
                        s.bossHandCollider.enabled = !1
                    })).to(n, {
                        position: new p(0, this.bossHandInitPos.y)
                    }).call((function () {
                        s.bossHandCollider.enabled = !1
                    })).union().start()
                }, a.bossDeadShrinkArm = function () {
                    var e = this;
                    this.bossHandCollider.enabled = this.bossCollider.enabled = !1, u.stopAllByTarget(this.bossArmTrans), u.stopAllByTarget(this.bossHandAnim.node);
                    P(this.bossArmTrans).to(.25, {
                        contentSize: new C(30, this.bossArmInitLen)
                    }).call((function () {
                        e.bossDeadAnim.node.angle = e.bossArmTrans.node.angle, e.bossArmTrans.node.active = e.bossAnim.node.active = !1, e.bossDeadAnim.node.active = !0, e.bossDeadAnim.play("laoliuDeadAnim")
                    })).start(), P(this.bossHandAnim.node).to(.25, {
                        position: new p(0, this.bossHandInitPos.y)
                    }).start()
                }, a.pauseControl = function () {
                    u.stopAllByTarget(this.node), this.isPauseFollow = !0
                }, a.continueControl = function () {
                    this.isPauseFollow = !1, this.followPlayer(this.gameView.getNewPlayerNode.getStandBlock.blockVec2)
                }, a.touchPlayer = function () {
                    var e = this;
                    if (this.bossType == V.跟踪怪) {
                        u.stopAllByTarget(this.node), this.bossCollider.enabled = !1, this.isTouchPlayer = !0, this.changeDBAnim("gongji", 1), this.bossAnim.timeScale = .5, S.Instance.DelayToDo((function () {
                            _.Instance.play("跟踪怪攻击"), e.bossAnim.timeScale = 5
                        }), this, .5);
                        var s = k.Instance.getTwoPointsAngle(this.node.getWorldPosition(), this.gameView.getNewPlayerNode.getPlayerBodyWp);
                        this.node.angle = s + 90
                    } else this.bossType == V.老六怪 && this.hurtPlayer()
                }, a.changeDBAnim = function (e, s) {
                    void 0 === s && (s = 0), this.nowBossState != I.死亡 && this.bossAnim.playAnimation(e, s)
                }, a.initFBState = function () {
                    this.bossHandCollider.enabled = !0, this.bossAnim.timeScale = 1, this.isTouchPlayer = !1, this.bossHandCollider.enabled = !1, this.bossCollider.enabled = !0, this.isFBHandTouchPlayer = !1
                }, a.finishDBAnim_genzong = function () {
                    var e = this;
                    console.log("当前播放的动画：" + this.bossAnim.animationName), "gongji" == this.bossAnim.animationName ? (this.bossHandCollider.enabled = !0, this.bossAnim.timeScale = 1, S.Instance.DelayToDo((function () {
                        e.gameView && e.gameView.getLevelPrefab && (e.isTouchPlayer && (e.isTouchPlayer = !1), e.bossHandCollider.enabled = !1, e.bossCollider.enabled = !0, e.isFBHandTouchPlayer ? (e.isFBHandTouchPlayer = !1, e.touchPlayer()) : (e.isTouchPlayer = !1, e.followPlayer(e.gameView.getPlayerNode.getStandBlock.blockVec2)))
                    }), this, this.atkCDTime)) : "siwang" == this.bossAnim.animationName && (this.node.active = !1)
                }, a.finishDBAnim_laoliu = function () {
                    var e = this;
                    console.log("当前播放的动画：" + this.bossAnim.animationName), "gongji" == this.bossAnim.animationName ? (this.bossHandCollider.enabled = !0, S.Instance.DelayToDo((function () {
                        e.isTouchPlayer && (e.isTouchPlayer = !1), e.bossHandCollider.enabled = !1
                    }), this, .5)) : "siwang" == this.bossAnim.animationName && (this.node.active = !1)
                }, a.getHurtByOther = function (s) {
                    if (e.prototype.getHurtByOther.call(this, s), this.bossType == V.跟踪怪 && this.nowBossState == I.激活) {
                        var t = this.bossTrans.convertToWorldSpaceAR(new p(0, this.backDis));
                        this.node.setWorldPosition(t), this.changeBossVec2(this.gameView.getBlockVec2ByWorldPos(t)), console.log("怪物被击退"), this.initFBState(), this.nowBossState == I.激活 && this.followPlayer(this.gameView.getPlayerNode.getStandBlock.blockVec2)
                    }
                }, a.changeBossVec2 = function (e) {
                    this.nowBossState != I.死亡 && (this.bossType == V.跟踪怪 && (this.bossVec2 && this.gameView.backGameBlockToInit(this.bossVec2), this.gameView.changeGameBlockData(e)), this.bossVec2 = e)
                }, a.bossDead = function () {
                    this.bossType == V.跟踪怪 ? (this.changeDBAnim("siwang", 1), u.stopAllByTarget(this.node), this.isGuideBoss && A.Instance.newHandStep == w.TEACH_SHOT_MORE_BULLET ? (A.Instance.newHandStep = w.TEACH_HIDE_WEAPON, this.gameView.showGuideHideWeaponBtn(), E.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                        NewStep: "新手19"
                    })) : A.Instance.newHandStep >= w.FINISH_GUIDE && A.Instance.touchTaskStep <= f.FIND_DRUG && this.gameView.getGameTaskMgr.finishTask(f.FIND_PASS_DOOR), this.gameView.backGameBlockToInit(this.bossVec2)) : this.bossDeadShrinkArm(), e.prototype.bossDead.call(this)
                }, n(s, [{
                    key: "bossArmInitLen",
                    get: function () {
                        return this._bossArmInitLen || (this._bossArmInitLen = this.bossArmTrans.contentSize.height), this._bossArmInitLen
                    }
                }, {
                    key: "bossHandInitPos",
                    get: function () {
                        return this._bossHandInitPos || (this._bossHandInitPos = this.bossHandCollider.node.getPosition()), this._bossHandInitPos
                    }
                }, {
                    key: "isPlayerPosChange",
                    get: function () {
                        var e = this.gameView.getPlayerNode.getStandBlock.blockVec2,
                            s = Math.abs(e.x - this.playerPos.x),
                            t = Math.abs(e.y - this.playerPos.y);
                        return s > 0 || t > 0
                    }
                }]), s
            }(N)).prototype, "isGuideBoss", [G], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return !1
                }
            }), z = s(W.prototype, "checkPlayerAtkTime", [L], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return .5
                }
            }), j = s(W.prototype, "atkCDTime", [M], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 1
                }
            }), x = W)) || x));
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/GameConfig.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./NewPlayerMoveControl.ts", "./WeaponControlBase.ts", "./CommonTipsMgr.ts", "./LYCSDK.ts", "./GameTools.ts", "./BgmMgr.ts", "./LangInfoTools.ts"], (function (e) {
    "use strict";
    var t, n, a, o, i, s, r, l, u, g, c, m, _, I, f;
    return {
        setters: [function (e) {
            t = e.createClass
        }, function (e) {
            n = e.cclegacy, a = e._decorator, o = e.sys, i = e.Size
        }, function (e) {
            s = e.PlayerSaveInLevelData
        }, function (e) {
            r = e.WeaponBulletData, l = e.PlayerBulletType, u = e.WeaponPrefabConfig, g = e.WeaponType
        }, function (e) {
            c = e.CommonTipsMgr
        }, function (e) {
            m = e.LYCSDK
        }, function (e) {
            _ = e.GameTools
        }, function (e) {
            I = e.BgmMgr
        }, function (e) {
            f = e.LangInfoTools
        }],
        execute: function () {
            var h, C;
            e({
                NewHandStep: void 0,
                TaskConfig: void 0
            }), n._RF.push({}, "2b5efTZERNPsIYqguQZ+xra", "GameConfig", void 0);
            var S, p, E = a.ccclass;
            a.property, e("GameConfig", E("GameConfig")(((C = function () {
                function e() {
                    this.CanvansSize = i.ZERO, this.On_Config = "On", this.Off_Config = "Off", this.IsFinishLogin = !1, this.NowSignIndex = 0, this.gameNameConfig = "dsqs", this.initBulletCount = 12, this.oneGroupBulletCount = 6, this.maxGroupCount = 2, this._nowUseWeapon = g.手枪, this.initDrugCount = 2, this.maxDrugCount = 2, this.tempPlayerDataInLv = void 0, this.boxQuesInfoLen = 0, this.levelMaxCount = 4, this.maxPowerCount = 5, this.adRecoverPowerCount = 5, this.recoverPowerCount = 1, this.recoverPowerTimeSpace = 300, this.autoChangeTimeSpace = 300, this.isClickStartBtnByNoPower = !1, this.isClickDeadRestart = !1, this.playerInLevelArenaIndex = "", this.newIdArr = [], this.touchNewHandCollider = S.FINISH_GUIDE, this.helpClickObj = void 0, this.helpClickObj1 = void 0, this._IsAddShortcut = !1
                }
                var n = e.prototype;
                return n.ChangeBgmState = function () {
                    e.Instance.IsBgmOn ? (o.localStorage.setItem("IsBgmOn", e.Instance.Off_Config), I.Instance.pause()) : (o.localStorage.setItem("IsBgmOn", e.Instance.On_Config), I.Instance.play())
                }, n.ChangeSoundState = function () {
                    e.Instance.IsSoundOn ? o.localStorage.setItem("IsSoundOn", e.Instance.Off_Config) : o.localStorage.setItem("IsSoundOn", e.Instance.On_Config)
                }, n.getBagBullet = function () {
                    return this.tempPlayerDataInLv.bagBulletArr
                }, n.setBagBullet = function (e) {
                    this.tempPlayerDataInLv.bagBulletArr = e
                }, n.pushBulletToBag = function (e, t, n) {
                    for (var a = this.getBagBullet(), o = 0; o < t; o++) {
                        if (!(a.length < this.maxBagBulletCount)) {
                            c.Instance.ShowTips(f.Instance.getLangInfoByKey("bagIsFullTips"));
                            break
                        }
                        a.splice(0, 0, e), n && n()
                    }
                    this.setBagBullet(a)
                }, n.pushUnlockWeaponToLocal = function (e) {
                    if (-1 == this.tempPlayerDataInLv.unlockWeaponArr.indexOf(e.weaponType)) {
                        this.tempPlayerDataInLv.unlockWeaponArr.push(e.weaponType), null == this.nowUseWeapon && (this.nowUseWeapon = e.weaponType);
                        for (var t = [], n = 0; n < e.weaponBulletCount; n++) {
                            var a = new r;
                            a.bulletType = l.空弹夹, t.push(a)
                        }
                        this.setWeaponUseBulletStates(e.weaponType, t)
                    } else console.log("此武器已经拥有")
                }, n.getWeaponUseBulletStates = function (t) {
                    void 0 === t && (t = e.Instance.nowUseWeapon), this.tempPlayerDataInLv.weaponBulletDic[t.toString()] || (this.tempPlayerDataInLv.weaponBulletDic[t.toString()] = []);
                    var n = this.tempPlayerDataInLv.weaponBulletDic[t.toString()];
                    if (0 == n.length) {
                        for (var a = u.bulletMaxArr[t], o = 0; o < a; o++) {
                            var i = new r;
                            i.bulletType = l.空弹夹, n[o] = i
                        }
                        this.setWeaponUseBulletStates(t, n)
                    }
                    return n
                }, n.getWeaponEmptyBulletCount = function (t) {
                    void 0 === t && (t = e.Instance.nowUseWeapon);
                    for (var n = 0, a = this.getWeaponUseBulletStates(), o = 0; o < a.length; o++) a[o].bulletType == l.空弹夹 && n++;
                    return n
                }, n.fullBagBullet = function () {
                    for (var t = this.getWeaponUseBulletStates(), n = u.bulletMaxArr[this.nowUseWeapon], a = 0; a < n; a++) {
                        var o = new r;
                        o.bulletType = l.待发射的子弹, t[a] = o
                    }
                    this.setWeaponUseBulletStates(e.Instance.nowUseWeapon, t);
                    for (var i = 0; i < u.bulletMaxArr.length; i++) {
                        var s = u.bulletMaxArr[i],
                            g = i;
                        this.pushBulletToBag(g, s)
                    }
                }, n.isNoUseBullet = function (t) {
                    void 0 === t && (t = e.Instance.nowUseWeapon);
                    for (var n = this.getWeaponUseBulletStates(), a = 0; a < n.length; a++)
                        if (n[a].bulletType == l.待发射的子弹) return !0;
                    return !1
                }, n.useWeaponBullet = function (t) {
                    void 0 === t && (t = e.Instance.nowUseWeapon);
                    for (var n = this.getWeaponUseBulletStates(), a = 0; a < n.length; a++)
                        if (n[a].bulletType == l.待发射的子弹) {
                            n[a].bulletType = l.空弹夹;
                            break
                        } this.setWeaponUseBulletStates(t, n)
                }, n.isAddUseBullet = function (t) {
                    void 0 === t && (t = e.Instance.nowUseWeapon);
                    for (var n = this.getWeaponUseBulletStates(), a = 0; a < n.length; a++)
                        if (n[a].bulletType == l.空弹夹) return !0;
                    return !1
                }, n.autoAddBulletByBag = function (t) {
                    void 0 === t && (t = e.Instance.nowUseWeapon);
                    for (var n = this.getBagBullet(), a = 0; a < n.length; a++) {
                        if (n[a] == t) return !0
                    }
                    return !1
                }, n.addWeaponButtle = function (t) {
                    void 0 === t && (t = e.Instance.nowUseWeapon);
                    for (var n = this.getWeaponUseBulletStates(), a = 0; a < n.length; a++)
                        if (n[a].bulletType == l.空弹夹) {
                            n[a].bulletType = l.待发射的子弹;
                            break
                        } this.setWeaponUseBulletStates(t, n)
                }, n.discardWeaponBullet = function (t) {
                    void 0 === t && (t = e.Instance.nowUseWeapon);
                    for (var n = e.Instance.getWeaponUseBulletStates(), a = n.length - 1; a >= 0; a--) {
                        var o = n[a];
                        if (o.bulletType == l.使用过的子弹) return o.bulletType = l.空弹夹, e.Instance.setWeaponUseBulletStates(e.Instance.nowUseWeapon, n), a
                    }
                    return -1
                }, n.setWeaponUseBulletStates = function (e, t) {
                    this.tempPlayerDataInLv.weaponBulletDic[e.toString()] || (this.tempPlayerDataInLv.weaponBulletDic[e.toString()] = []), this.tempPlayerDataInLv.weaponBulletDic[e.toString()] = t
                }, n.savePlayerDataInLv = function () {
                    o.localStorage.setItem("playerDataInLv" + this.gameNameConfig, JSON.stringify(this.tempPlayerDataInLv))
                }, n.getIsOpenAutoChangeBullet = function () {
                    var e = o.localStorage.getItem("isOpenAutoChangeBullet_" + this.gameNameConfig);
                    return !(!e || "0" == e)
                }, n.setIsOpenAutoChangeBullet = function (e) {
                    0 != e && (this.autoChangeBulletTime = _.Instance.GetNowTime()), o.localStorage.setItem("isOpenAutoChangeBullet_" + this.gameNameConfig, e.toString())
                }, n.initBoxQuestionIdArr = function () {
                    if (this.newIdArr = JSON.parse(this.newBoxQuestionId), 0 == this.newIdArr.length)
                        for (var t = 1; t < e.Instance.boxQuesInfoLen; t++) this.newIdArr.push(t);
                    this.newBoxQuestionId = JSON.stringify(this.newIdArr)
                }, t(e, [{
                    key: "IsBgmOn",
                    get: function () {
                        var t = o.localStorage.getItem("IsBgmOn");
                        return t || (t = e.Instance.On_Config), t == e.Instance.On_Config
                    }
                }, {
                    key: "IsSoundOn",
                    get: function () {
                        var t = o.localStorage.getItem("IsSoundOn");
                        return t || (t = e.Instance.On_Config), t == e.Instance.On_Config
                    }
                }, {
                    key: "PlayerId",
                    get: function () {
                        var e = o.localStorage.getItem("ND_PlayerId");
                        if (e) return Number(e);
                        var t = _.Instance.GetIntRandomNum_New(999999, 99999999);
                        return this.PlayerId = t, t
                    },
                    set: function (e) {
                        o.localStorage.setItem("ND_PlayerId", e.toString())
                    }
                }, {
                    key: "PlayerNickName",
                    get: function () {
                        var e = o.localStorage.getItem("ND_PlayerNickName");
                        if (e) return e;
                        var t = "游客" + _.Instance.GetIntRandomNum_New(99, 99999999);
                        return this.PlayerNickName = t, t
                    },
                    set: function (e) {
                        o.localStorage.setItem("ND_PlayerNickName", e.toString())
                    }
                }, {
                    key: "IsTodaySigned",
                    get: function () {
                        var e = !1,
                            t = m.Instance.PlatformSDKControl.UserInfoCallBack.playerId,
                            n = _.Instance.GetNowDate();
                        return o.localStorage.getItem("IsTodaySigned_" + t + "_" + n) && (e = !0), e
                    },
                    set: function (e) {
                        var t = m.Instance.PlatformSDKControl.UserInfoCallBack.playerId,
                            n = _.Instance.GetNowDate();
                        o.localStorage.setItem("IsTodaySigned_" + t + "_" + n, "1")
                    }
                }, {
                    key: "maxBagBulletCount",
                    get: function () {
                        var e = o.localStorage.getItem("maxBulletCount");
                        return e || (e = this.initBulletCount.toString(), this.maxBagBulletCount = this.initBulletCount), Number(e)
                    },
                    set: function (e) {
                        o.localStorage.setItem("maxBulletCount", e.toString())
                    }
                }, {
                    key: "bagUnlockGroupIndex",
                    get: function () {
                        var e = o.localStorage.getItem("bagUnlockGroupIndex"),
                            t = 0;
                        return e && (t = Number(e)), t
                    },
                    set: function (e) {
                        o.localStorage.setItem("bagUnlockGroupIndex", e.toString())
                    }
                }, {
                    key: "unlockWeaponArr",
                    get: function () {
                        return this.tempPlayerDataInLv.unlockWeaponArr
                    }
                }, {
                    key: "nowUseWeapon",
                    get: function () {
                        var e = o.localStorage.getItem("nowUseWeapon_" + this.gameNameConfig);
                        return e ? JSON.parse(e) : null
                    },
                    set: function (e) {
                        this._nowUseWeapon = e, this.tempPlayerDataInLv.nowUseWeapon = e, o.localStorage.setItem("nowUseWeapon_" + this.gameNameConfig, JSON.stringify(this._nowUseWeapon))
                    }
                }, {
                    key: "unlockDrugCount",
                    get: function () {
                        var e = o.localStorage.getItem("maxDrugCount_" + this.gameNameConfig);
                        return e || (e = this.initDrugCount.toString(), this.unlockDrugCount = this.initDrugCount), Number(e)
                    },
                    set: function (e) {
                        o.localStorage.setItem("maxDrugCount_" + this.gameNameConfig, e.toString())
                    }
                }, {
                    key: "haveDrugCount",
                    get: function () {
                        return this.tempPlayerDataInLv.helpDrugCount
                    },
                    set: function (e) {
                        this.tempPlayerDataInLv.helpDrugCount = e
                    }
                }, {
                    key: "playerDataInLv",
                    get: function () {
                        var e = o.localStorage.getItem("playerDataInLv" + this.gameNameConfig);
                        if (e) {
                            var t = JSON.parse(e);
                            this.tempPlayerDataInLv = t
                        } else this.tempPlayerDataInLv = new s;
                        return this.tempPlayerDataInLv
                    }
                }, {
                    key: "themeIndex",
                    get: function () {
                        var e = o.localStorage.getItem("themeIndex_" + this.gameNameConfig),
                            t = 0;
                        return e ? t = Number(e) : this.themeIndex = t, t
                    },
                    set: function (e) {
                        o.localStorage.setItem("themeIndex_" + this.gameNameConfig, e.toString())
                    }
                }, {
                    key: "playLvIndex",
                    get: function () {
                        var e = o.localStorage.getItem("playLvIndex_" + this.gameNameConfig),
                            t = 0;
                        return e ? t = Number(e) : this.playLvIndex = t, t
                    },
                    set: function (e) {
                        o.localStorage.setItem("playLvIndex_" + this.gameNameConfig, e.toString())
                    }
                }, {
                    key: "isFirstEnterGame",
                    get: function () {
                        return !o.localStorage.getItem("isFirstEnterGame_" + this.gameNameConfig) && (o.localStorage.setItem("isFirstEnterGame_" + this.gameNameConfig, "1"), !0)
                    }
                }, {
                    key: "isFirstMove",
                    get: function () {
                        return !o.localStorage.getItem("isFirstMove_" + this.gameNameConfig) && (o.localStorage.setItem("isFirstMove_" + this.gameNameConfig, "1"), !0)
                    }
                }, {
                    key: "powerUserTime",
                    get: function () {
                        var e, t = o.localStorage.getItem("powerUserTime_" + this.gameNameConfig);
                        return t ? e = Number(t) : (e = 0, this.powerUserTime = e, e)
                    },
                    set: function (e) {
                        o.localStorage.setItem("powerUserTime_" + this.gameNameConfig, e.toString())
                    }
                }, {
                    key: "playerHavePower",
                    get: function () {
                        var e, t = o.localStorage.getItem("playerHavePower_" + this.gameNameConfig);
                        return t ? e = Math.floor(Number(t)) : (e = 0, this.powerUserTime = e, e)
                    },
                    set: function (e) {
                        o.localStorage.setItem("playerHavePower_" + this.gameNameConfig, e.toString())
                    }
                }, {
                    key: "autoChangeBulletTime",
                    get: function () {
                        var e, t = o.localStorage.getItem("autoChangeBulletTime_" + this.gameNameConfig);
                        return t ? e = Number(t) : (e = 0, this.powerUserTime = e, e)
                    },
                    set: function (e) {
                        o.localStorage.setItem("autoChangeBulletTime_" + this.gameNameConfig, e.toString())
                    }
                }, {
                    key: "showFogCount",
                    get: function () {
                        var e = o.localStorage.getItem("showFogCount_" + this.gameNameConfig);
                        return e ? Number(e) : 0
                    },
                    set: function (e) {
                        o.localStorage.setItem("showFogCount_" + this.gameNameConfig, e.toString())
                    }
                }, {
                    key: "isFristOpenStartView",
                    get: function () {
                        return !o.localStorage.getItem("isFristOpenStartView_" + this.gameNameConfig) && (o.localStorage.setItem("isFristOpenStartView_" + this.gameNameConfig, "1"), !0)
                    }
                }, {
                    key: "isFristClickStartBtn",
                    get: function () {
                        return !o.localStorage.getItem("isFristClickStartBtn_" + this.gameNameConfig) && (o.localStorage.setItem("isFristClickStartBtn_" + this.gameNameConfig, "1"), !0)
                    }
                }, {
                    key: "isFristGuideClickDrug",
                    get: function () {
                        return !o.localStorage.getItem("isFristGuideClickDrug_" + this.gameNameConfig)
                    },
                    set: function (e) {
                        o.localStorage.setItem("isFristGuideClickDrug_" + this.gameNameConfig, "1")
                    }
                }, {
                    key: "isFristGuideHideWeapon",
                    get: function () {
                        return !o.localStorage.getItem("isFristGuideHideWeapon_" + this.gameNameConfig)
                    },
                    set: function (e) {
                        o.localStorage.setItem("isFristGuideHideWeapon_" + this.gameNameConfig, "1")
                    }
                }, {
                    key: "newBoxQuestionId",
                    get: function () {
                        var e = o.localStorage.getItem("newBoxQuestionId_" + this.gameNameConfig);
                        return e || (e = JSON.stringify([]), this.newBoxQuestionId = e), e
                    },
                    set: function (e) {
                        o.localStorage.setItem("newBoxQuestionId_" + this.gameNameConfig, e.toString())
                    }
                }, {
                    key: "getBoxQuestionID",
                    get: function () {
                        var e = _.Instance.GetIntRandomNum_New(0, this.newIdArr.length),
                            t = this.newIdArr[e];
                        return console.log("随机到的问题id是:" + t), this.newIdArr.splice(e, 1), console.log("当前剩余的问题id是"), console.log(this.newIdArr), this.newBoxQuestionId = JSON.stringify(this.newIdArr), t
                    }
                }, {
                    key: "newHandStep",
                    get: function () {
                        var e = o.localStorage.getItem("newHandStep_" + this.gameNameConfig);
                        return e ? Number(e) : S.TEACH_MOVE_1
                    },
                    set: function (e) {
                        o.localStorage.setItem("newHandStep_" + this.gameNameConfig, e.toString())
                    }
                }, {
                    key: "IsAddShortcut",
                    get: function () {
                        return this._IsAddShortcut
                    },
                    set: function (e) {
                        this._IsAddShortcut = e, m.Instance.GameLog("修改桌面快捷方式值" + this._IsAddShortcut)
                    }
                }, {
                    key: "touchTaskStep",
                    get: function () {
                        var e = o.localStorage.getItem("touchTaskStep_" + this.gameNameConfig);
                        return e ? Number(e) : p.CLOSE_DOOR
                    },
                    set: function (e) {
                        o.localStorage.setItem("touchTaskStep_" + this.gameNameConfig, e.toString())
                    }
                }], [{
                    key: "Instance",
                    get: function () {
                        return null == this.instance && (this.instance = new e), this.instance
                    }
                }]), e
            }()).instance = void 0, h = C)) || h);
            ! function (e) {
                e[e.TEACH_MOVE_1 = 0] = "TEACH_MOVE_1", e[e.TEACH_MOVE_2 = 1] = "TEACH_MOVE_2", e[e.TEACH_MOVE_3 = 2] = "TEACH_MOVE_3", e[e.TEACH_MOVE_4 = 3] = "TEACH_MOVE_4", e[e.FINISH_TEACH_MOVE = 4] = "FINISH_TEACH_MOVE", e[e.TEACH_CLOSE_DOOR = 5] = "TEACH_CLOSE_DOOR", e[e.TEACH_GET_WEAPON = 6] = "TEACH_GET_WEAPON", e[e.TEACH_GET_BULLET = 7] = "TEACH_GET_BULLET", e[e.TEACH_OPEN_BAG = 8] = "TEACH_OPEN_BAG", e[e.TEACH_ADD_BULLET_TO_BAG = 9] = "TEACH_ADD_BULLET_TO_BAG", e[e.TEACH_SHOW_WEAPON_BULLET = 10] = "TEACH_SHOW_WEAPON_BULLET", e[e.TEACH_CLOSE_BAG = 11] = "TEACH_CLOSE_BAG", e[e.TEACH_TAKE_WEAPON = 12] = "TEACH_TAKE_WEAPON", e[e.TEACH_KILL_BOSS = 13] = "TEACH_KILL_BOSS", e[e.TEACH_SHOT_MORE_BULLET = 14] = "TEACH_SHOT_MORE_BULLET", e[e.TEACH_HIDE_WEAPON = 15] = "TEACH_HIDE_WEAPON", e[e.TEACH_TAKE_XINHAO = 16] = "TEACH_TAKE_XINHAO", e[e.TEACH_OPEN_BAG_2 = 17] = "TEACH_OPEN_BAG_2", e[e.TEACH_CHOOSE_WEAPON = 18] = "TEACH_CHOOSE_WEAPON", e[e.TEACH_ADD_BULLET_TO_WEAPON_2 = 19] = "TEACH_ADD_BULLET_TO_WEAPON_2", e[e.TEACH_CLOSE_BAG_2 = 20] = "TEACH_CLOSE_BAG_2", e[e.TEACH_TAKE_WEAPON_2 = 21] = "TEACH_TAKE_WEAPON_2", e[e.TEACH_SHOT_XINHAO = 22] = "TEACH_SHOT_XINHAO", e[e.TEACH_Hide_XINHAO = 23] = "TEACH_Hide_XINHAO", e[e.TEACH_SHOW_BLOOD = 24] = "TEACH_SHOW_BLOOD", e[e.TEACH_USE_DRUG = 25] = "TEACH_USE_DRUG", e[e.TEACH_CHANGE_WEAPON = 26] = "TEACH_CHANGE_WEAPON", e[e.FINISH_GUIDE = 27] = "FINISH_GUIDE"
            }(S || (S = e("NewHandStep", {}))),
            function (e) {
                e[e.CLOSE_DOOR = 0] = "CLOSE_DOOR", e[e.FIND_WEAPON = 1] = "FIND_WEAPON", e[e.FIND_BULLET = 2] = "FIND_BULLET", e[e.ANSWER_QB = 3] = "ANSWER_QB", e[e.OPEN_DOOR = 4] = "OPEN_DOOR", e[e.GET_XINHAO = 5] = "GET_XINHAO", e[e.GET_HELP_DRUG = 6] = "GET_HELP_DRUG", e[e.FIND_DRUG = 7] = "FIND_DRUG", e[e.FIND_PASS_DOOR = 8] = "FIND_PASS_DOOR", e[e.FINISH_TASK = 9] = "FINISH_TASK"
            }(p || (p = e("TaskConfig", {}))), n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/GameTools.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function (t) {
    "use strict";
    var n, e, r, o, a;
    return {
        setters: [function (t) {
            n = t.createClass
        }, function (t) {
            e = t.cclegacy, r = t._decorator, o = t.math, a = t.Vec2
        }],
        execute: function () {
            var u, i;
            e._RF.push({}, "85939wVZ9NGFqU3WqYpLNGs", "GameTools", void 0);
            var s = r.ccclass;
            r.property, t("GameTools", s("GameTools")(((i = function () {
                function t() {}
                var e = t.prototype;
                return e.GetRandomNum = function (t, n) {
                    var e = n - t,
                        r = Math.random();
                    return t + Math.round(r * e)
                }, e.GetIntRandomNum_New = function (t, n) {
                    return Math.floor(o.randomRange(t, n))
                }, e.GetFloatRandomNum_New = function (t, n) {
                    return o.randomRange(t, n)
                }, e.GetNotSameRandomNum = function (t, n, e) {
                    for (var r = [], o = t; o < n; o++) r[o] = o;
                    for (var a = n - 1; a >= t; a--) {
                        var u = r[a],
                            i = this.GetIntRandomNum_New(0, r.length);
                        r[a] = r[i], r[i] = u
                    }
                    return r.slice(0, e)
                }, e.GetPointsDistance = function (t, n) {
                    var e = n.x - t.x,
                        r = n.y - t.y;
                    return Math.sqrt(e * e + r * r)
                }, e.GetWorldPointsDistance = function (t, n) {
                    var e = n.x - t.x,
                        r = n.y - t.y;
                    return Math.sqrt(e * e + r * r)
                }, e.strCutOneArray = function (t, n) {
                    var e = "";
                    return "string" == typeof t ? e = t : "number" == typeof t && (e = t.toString()), e.split(n)
                }, e.strCutTwoArray = function (t, n, e) {
                    var r = "";
                    "string" == typeof t ? r = t : "number" == typeof t && (r = t.toString());
                    for (var o = [], a = r.split(n), u = 0, i = a.length; u < i; u++) {
                        var s = a[u].split(e);
                        o.push(s)
                    }
                    return o
                }, e.GetNowDate = function () {
                    var t = new Date;
                    return t.getFullYear() + ":" + (t.getMonth() + 1) + ":" + t.getDate()
                }, e.GetNowTime = function () {
                    return Math.floor((new Date).getTime() / 1e3)
                }, e.GetStrReplace = function (t) {
                    for (var n = 0; n < t.length - 1; n++) "#" == t[n] && "#" == t[n + 1] && (t = t.replace("##", "\n"));
                    return t
                }, e.getTwoPointsAngle = function (t, n) {
                    var e = n.x - t.x,
                        r = n.y - t.y,
                        o = new a(e, r);
                    return Math.atan2(o.y, o.x) / Math.PI * 180
                }, e.isContainsWords = function (t, n) {
                    return t.includes(n)
                }, e.IsEmptyString = function (t) {
                    return null == t || "" == t || null == t || "0" == t
                }, e.replaceObjStr = function (t) {
                    for (var n = 0, e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), o = 1; o < e; o++) r[o - 1] = arguments[o];
                    for (n = 0; n < r.length; n++) t = t.replace("{" + n + "}", r[n]);
                    return t
                }, e.shuffle = function (t) {
                    for (var n = 0; n < t.length; n++) {
                        var e = Math.round(Math.random() * (t.length - 1 - n)) + n,
                            r = [t[e], t[n]];
                        return t[n] = r[0], t[e] = r[1], t
                    }
                }, n(t, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this.instance && (this.instance = new t), this.instance
                    }
                }]), t
            }()).instance = void 0, u = i)) || u);
            e._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/GoldPowerItemControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameConfig.ts", "./GameTools.ts", "./UITools.ts", "./UIPanelMgr.ts"], (function (e) {
    "use strict";
    var t, o, n, r, a, i, s, w, c, l, p, m, u, f, I, h, d, P;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, o = e.inheritsLoose, n = e.initializerDefineProperty, r = e.assertThisInitialized
        }, function (e) {
            a = e.cclegacy, i = e._decorator, s = e.Node, w = e.Button, c = e.Label, l = e.instantiate, p = e.Vec3, m = e.Component, u = e.tween
        }, function (e) {
            f = e.GameConfig
        }, function (e) {
            I = e.GameTools
        }, function (e) {
            h = e.UITools
        }, function (e) {
            d = e.UIPanelMgr, P = e.UIPanelConfig
        }],
        execute: function () {
            var b, v, g, y, L, T, C, S, A, G, N;
            a._RF.push({}, "6a957wEe9hImbajSCdFnA0z", "GoldPowerItemControl", void 0);
            var x = i.ccclass,
                U = i.property;
            e("GoldPowerItemControl", (b = x("GoldPowerItemControl"), v = U({
                type: s
            }), g = U({
                type: s
            }), y = U({
                type: s
            }), L = U({
                type: w
            }), b((S = t((C = function (e) {
                function t() {
                    for (var t, o = arguments.length, a = new Array(o), i = 0; i < o; i++) a[i] = arguments[i];
                    return t = e.call.apply(e, [this].concat(a)) || this, n(t, "powerLabNode", S, r(t)), n(t, "powerItemPrefab", A, r(t)), n(t, "powerImg", G, r(t)), t.powerItemArr = [], t.powerLab = [], n(t, "addPowerBtn", N, r(t)), t.isShowingAnim = !1, t.oneSecondTimer = 0, t.showLabIndex = 0, t.powerOffset = 100, t
                }
                o(t, e);
                var a = t.prototype;
                return a.start = function () {
                    for (var e = 0; e < this.powerLabNode.children.length; e++) {
                        var t = this.powerLabNode.children[e];
                        this.powerLab.push(t.getComponent(c))
                    }
                    h.Instance.AddBtnClickListener(this.addPowerBtn, (function () {
                        d.Instance.OpenPanel(P.UINoGoldPowerPanel)
                    })), 0 == f.Instance.powerUserTime && (f.Instance.playerHavePower = f.Instance.maxPowerCount), this.showPowerLab()
                }, a.showPowerLab = function () {
                    for (var e = 0; e < this.powerLab.length; e++) {
                        this.powerLab[e].string = f.Instance.playerHavePower.toString()
                    }
                }, a.update = function (e) {
                    if (this.oneSecondTimer += e, this.oneSecondTimer > 1) {
                        if (this.oneSecondTimer = 0, f.Instance.playerHavePower < f.Instance.maxPowerCount)
                            if (0 == f.Instance.powerUserTime) f.Instance.playerHavePower = f.Instance.maxPowerCount;
                            else {
                                var t = I.Instance.GetNowTime() - f.Instance.powerUserTime;
                                if (t > f.Instance.recoverPowerTimeSpace) {
                                    var o = Math.floor(t / f.Instance.recoverPowerTimeSpace);
                                    f.Instance.playerHavePower + o > f.Instance.maxPowerCount && (o = f.Instance.maxPowerCount - f.Instance.playerHavePower), this.showAddPowerAnim(o), f.Instance.playerHavePower += o, f.Instance.powerUserTime = I.Instance.GetNowTime(), t = 0
                                }
                            } this.isShowingAnim || this.showPowerLab()
                    }
                }, a.getPowerItem = function () {
                    for (var e = 0; e < this.powerItemArr.length; e++) {
                        var t = this.powerItemArr[e];
                        if (!t.active) return t.active = !0, t.setParent(this.node.parent), t
                    }
                    var o = l(this.powerItemPrefab);
                    return o.active = !0, o.setParent(this.node.parent), this.powerItemArr.push(o), o
                }, a.showAddPowerAnim = function (e, t, o) {
                    void 0 === t && (t = 1), void 0 === o && (o = .1), this.isShowingAnim = !0;
                    for (var n = this, r = new p(30, 50), a = new p(30, 0), i = new p(30, -50), s = f.Instance.playerHavePower, w = 0, c = function (e) {
                            var o = n.getPowerItem(),
                                r = 0 == e;
                            r ? o.setPosition(p.ZERO) : o.setPosition(new p(I.Instance.GetRandomNum(-n.powerOffset, n.powerOffset), I.Instance.GetRandomNum(-n.powerOffset, n.powerOffset))), u(o).to(t, {
                                worldPosition: n.powerImg.getWorldPosition()
                            }).call((function () {
                                r && m(), o.active = !1, o.removeFromParent()
                            })).start(), o.setScale(new p(2, 2)), u(o).to(t, {
                                scale: p.ONE
                            }).start()
                        }, l = 0; l < e; l++) c(l);

                    function m() {
                        var t = n.powerLab[n.showLabIndex % 2];
                        t.string = s.toString();
                        var c = n.powerLab[(n.showLabIndex + 1) % 2];
                        c.string = (s + 1).toString(), u(t.node).to(o, {
                            position: r
                        }).call((function () {
                            t.node.setPosition(i)
                        })).start(), u(c.node).to(o, {
                            position: a
                        }).call((function () {
                            w++, n.showLabIndex++, s++, w < e ? m() : (n.isShowingAnim = !1, n.showPowerLab())
                        })).start()
                    }
                }, t
            }(m)).prototype, "powerLabNode", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), A = t(C.prototype, "powerItemPrefab", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), G = t(C.prototype, "powerImg", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), N = t(C.prototype, "addPowerBtn", [L], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), T = C)) || T));
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/Grid.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./Node.ts"], (function (t) {
    "use strict";
    var e, n, o;
    return {
        setters: [function (t) {
            e = t.createClass
        }, function (t) {
            n = t.cclegacy
        }, function (t) {
            o = t.aNode
        }],
        execute: function () {
            n._RF.push({}, "967a8oDmp5H2Lee88L2wv2b", "Grid", void 0);
            t("Grid", function () {
                function t(t) {
                    this._startNode = void 0, this._endNode = void 0, this._nodes = void 0, this._numCols = void 0, this._numRows = void 0, this._cfgData = void 0, this._cfgData = t, this._numCols = t.numCols, this._numRows = t.numRows, this._nodes = [];
                    for (var e = 0; e < t.numCols; e++) {
                        this._nodes[e] = [];
                        for (var n = 0; n < t.numRows; n++) {
                            var s = this.getSpecificPos(e, n);
                            this._nodes[e][n] = new o(e, n, s)
                        }
                    }
                }
                var n = t.prototype;
                return n.getNode = function (t, e) {
                    return this._nodes[t][e]
                }, n.setEndNode = function (t, e) {
                    this._endNode = this._nodes[t][e]
                }, n.setStartNode = function (t, e) {
                    this._startNode = this._nodes[t][e]
                }, n.setWalkable = function (t, e, n) {
                    this._nodes[t][e].walkable = n
                }, n.getSpecificPos = function (t, e) {
                    var n = this.cfgData;
                    return {
                        x: n.beginPos.x + t * n.offsetPos.x,
                        y: n.beginPos.y,
                        z: n.beginPos.z - e * n.offsetPos.z
                    }
                }, e(t, [{
                    key: "cfgData",
                    get: function () {
                        return this._cfgData
                    }
                }, {
                    key: "nodes",
                    get: function () {
                        return this._nodes
                    }
                }, {
                    key: "endNode",
                    get: function () {
                        return this._endNode
                    }
                }, {
                    key: "numCols",
                    get: function () {
                        return this._numCols
                    }
                }, {
                    key: "numRows",
                    get: function () {
                        return this._numRows
                    }
                }, {
                    key: "startNode",
                    get: function () {
                        return this._startNode
                    }
                }]), t
            }());
            n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/GuidePanel.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LYCSDKEventHelper.ts", "./TimeControl.ts"], (function (e) {
    "use strict";
    var i, t, n, o, r, s, a, l, u, d, g, h, c, f, p, m, b, y, w;
    return {
        setters: [function (e) {
            i = e.applyDecoratedDescriptor, t = e.inheritsLoose, n = e.initializerDefineProperty, o = e.assertThisInitialized
        }, function (e) {
            r = e.cclegacy, s = e._decorator, a = e.Vec2, l = e.Size, u = e.UITransform, d = e.BlockInputEvents, g = e.Node, h = e.Label, c = e.Tween, f = e.Vec3, p = e.Component, m = e.tween
        }, function (e) {
            b = e.LYCSDKEventHelper, y = e.EventConfig
        }, function (e) {
            w = e.TimeControl
        }],
        execute: function () {
            var G, P, I, k, v, T, L, F, N, A, z, S, D, M, C, W, x, H, O, R, B, E, _, K, V;
            r._RF.push({}, "e6032DTCCZGFbZVk7T+1QKz", "GuidePanel", void 0);
            var Y = s.ccclass,
                Z = s.property;
            e("GuideData", (function () {
                this.FingerPosArr = [], this.GuideTips = [], this.guideTipsOffset = new a(0, 200), this.IsShowClickAnim = !1, this.isShowMask = !1, this.layer = 1, this.isShowFinger = !0, this.isHardGuide = !0, this.isWorldPos = !0, this.fingerLineAngle = 0, this.fingerAnimTimeScale = 1.5, this.MaskSize = new l(460, 460)
            })), e("GuidePanel", (G = Y("GuidePanel"), P = Z({
                type: u
            }), I = Z({
                type: d
            }), k = Z({
                type: g
            }), v = Z({
                type: g
            }), T = Z({
                type: g
            }), L = Z({
                type: u
            }), F = Z({
                type: h
            }), N = Z({
                type: g
            }), A = Z({
                type: u
            }), z = Z({
                type: u
            }), S = Z({
                type: u
            }), G((C = i((M = function (e) {
                function i() {
                    for (var i, t = arguments.length, r = new Array(t), s = 0; s < t; s++) r[s] = arguments[s];
                    return i = e.call.apply(e, [this].concat(r)) || this, n(i, "fingerTrans", C, o(i)), n(i, "blockInput", W, o(i)), n(i, "fingerItemNode", x, o(i)), n(i, "fingerImgNode", H, o(i)), n(i, "fingerLineImg", O, o(i)), n(i, "guideLabFrame", R, o(i)), n(i, "guideLab", B, o(i)), n(i, "newGuideMask", E, o(i)), n(i, "maskGraphics", _, o(i)), n(i, "maskGraphicsChild", K, o(i)), n(i, "maskImg", V, o(i)), i.thisGuideData = void 0, i
                }
                t(i, e);
                var r = i.prototype;
                return r.onLoad = function () {
                    var e = this;
                    b.instance.on(y.hideGuidePanel, (function () {
                        e.hideGuidePanel()
                    }))
                }, r.showGuide = function (e) {
                    var i = this;
                    c.stopAllByTarget(this.fingerItemNode), this.node.layer != e.layer && (this.node.layer = this.newGuideMask.layer = this.fingerTrans.node.layer = this.fingerItemNode.layer = this.fingerImgNode.layer = this.guideLabFrame.node.layer = this.guideLab.node.layer = this.maskGraphics.node.layer = this.maskGraphicsChild.node.layer = this.maskImg.node.layer = e.layer), this.blockInput.enabled = e.isHardGuide, this.node.active = !0, this.thisGuideData = e;
                    var t = e.FingerPosArr[0];
                    if (this.fingerItemNode.active = e.isShowFinger, e.isWorldPos ? this.fingerItemNode.setWorldPosition(t) : this.fingerItemNode.setPosition(t), this.newGuideMask.active = e.isShowMask, this.fingerLineImg.active = e.FingerPosArr.length > 1, this.fingerLineImg.angle = e.fingerLineAngle, e.FingerPosArr.length > 1) this.RunPosArrAnim(e.FingerPosArr);
                    else {
                        if (e.IsShowClickAnim) {
                            var n = e.fingerAnimTimeScale;
                            ! function o() {
                                e.isWorldPos ? m(i.fingerItemNode).to(n, {
                                    worldPosition: new f(t.x, t.y + 20)
                                }).to(n, {
                                    worldPosition: t
                                }).call((function () {
                                    o()
                                })).start() : m(i.fingerItemNode).to(n, {
                                    position: new f(t.x, t.y + 20)
                                }).to(n, {
                                    position: t
                                }).call((function () {
                                    o()
                                })).start()
                            }()
                        }
                        this.newGuideMask.active && (e.isWorldPos ? this.newGuideMask.setWorldPosition(t) : this.newGuideMask.setPosition(t))
                    }
                    if (this.guideLabFrame.node.active = e.GuideTips.length > 0, this.guideLabFrame.node.active) {
                        var o = 0;
                        ! function t() {
                            i.guideLab.string = e.GuideTips[o], w.Instance.DelayToDo((function () {
                                var e = i.guideLab.getComponent(u).contentSize;
                                i.guideLabFrame.setContentSize(e.width + 80, i.guideLabFrame.height)
                            }), i), w.Instance.DelayToDo((function () {
                                ++o < e.GuideTips.length && t()
                            }), i, .8)
                        }(), e.isWorldPos ? this.guideLabFrame.node.setWorldPosition(new f(t.x + e.guideTipsOffset.x, t.y + e.guideTipsOffset.y)) : this.guideLabFrame.node.setPosition(new f(t.x + e.guideTipsOffset.x, t.y + e.guideTipsOffset.y))
                    }
                }, r.getFingerWp = function (e) {
                    return this.fingerTrans.convertToWorldSpaceAR(e)
                }, r.RunPosArrAnim = function (e) {
                    var i = 1.5,
                        t = this,
                        n = 1,
                        o = 1;
                    this.thisGuideData.isWorldPos ? this.fingerItemNode.setWorldPosition(e[0]) : this.fingerItemNode.setPosition(e[0]),
                        function r() {
                            var s = e[n];
                            t.thisGuideData.isWorldPos ? (m(t.fingerItemNode).to(i, {
                                worldPosition: s
                            }).call((function () {
                                ++n >= e.length && (n = 1, t.fingerItemNode.setWorldPosition(e[0])), r()
                            })).start(), t.thisGuideData.isShowMask && m(t.newGuideMask).to(i, {
                                worldPosition: s
                            }).call((function () {
                                ++o >= e.length && (o = 1, t.newGuideMask.setWorldPosition(e[0]))
                            })).start()) : (m(t.fingerItemNode).to(i, {
                                position: s
                            }).call((function () {
                                ++n >= e.length && (n = 1, t.fingerItemNode.setPosition(e[0])), r()
                            })).start(), t.thisGuideData.isShowMask && m(t.newGuideMask).to(i, {
                                position: s
                            }).call((function () {
                                ++o >= e.length && (o = 1, t.newGuideMask.setPosition(e[0]))
                            })).start())
                        }()
                }, r.hideGuidePanel = function () {
                    this.node.active = !1, c.stopAllByTarget(this.fingerItemNode)
                }, i
            }(p)).prototype, "fingerTrans", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), W = i(M.prototype, "blockInput", [I], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), x = i(M.prototype, "fingerItemNode", [k], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), H = i(M.prototype, "fingerImgNode", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), O = i(M.prototype, "fingerLineImg", [T], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), R = i(M.prototype, "guideLabFrame", [L], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), B = i(M.prototype, "guideLab", [F], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), E = i(M.prototype, "newGuideMask", [N], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), _ = i(M.prototype, "maskGraphics", [A], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), K = i(M.prototype, "maskGraphicsChild", [z], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), V = i(M.prototype, "maskImg", [S], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), D = M)) || D));
            r._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/InfoMgr.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function (s) {
    "use strict";
    var t, n, e;
    return {
        setters: [function (s) {
            t = s.createClass
        }, function (s) {
            n = s.cclegacy, e = s._decorator
        }],
        execute: function () {
            var i, o;
            s("BossType", void 0), n._RF.push({}, "31c51TW199Cj62Gfv81XR0U", "InfoMgr", void 0);
            var c, r = e.ccclass;
            e.property;
            ! function (s) {
                s.monster = "1", s.boss = "2"
            }(c || (c = s("BossType", {})));
            s("BoxQuesInfo", (function () {
                this.id = "", this.title = "", this.ques_1 = "", this.ques_2 = "", this.ques_3 = "", this.ques_4 = "", this.rightAnswer = ""
            })), s("InfoMgr", r("InfoMgr")(((o = function () {
                function s() {
                    this.boxQesInfoDic = {}
                }
                return t(s, null, [{
                    key: "instance",
                    get: function () {
                        return null == this._instance && (this._instance = new s), this._instance
                    }
                }]), s
            }())._instance = void 0, i = o)) || i);
            n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/Joystick.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LYCSDKEventHelper.ts"], (function (t) {
    "use strict";
    var i, e, o, n, s, r, c, a, p, u, h, l, y, d, T, g, f, v, L;
    return {
        setters: [function (t) {
            i = t.applyDecoratedDescriptor, e = t.inheritsLoose, o = t.initializerDefineProperty, n = t.assertThisInitialized
        }, function (t) {
            s = t.cclegacy, r = t._decorator, c = t.EventTarget, a = t.Node, p = t.Enum, u = t.CCInteger, h = t.Vec3, l = t.Vec2, y = t.UITransform, d = t.Size, T = t.UIOpacity, g = t.NodeEventType, f = t.Component
        }, function (t) {
            v = t.LYCSDKEventHelper, L = t.EventConfig
        }],
        execute: function () {
            var E, O, _, m, S, C, k, b, P, D, F, I, w;
            t({
                DirectionType: void 0,
                JoystickType: void 0,
                SpeedType: void 0
            }), s._RF.push({}, "73162lxt5BLxbtr/vpxLfXd", "Joystick", void 0);
            var N, U, A, R = r.ccclass,
                z = r.property,
                J = t("instance", new c),
                M = t("SET_JOYSTICK_TYPE", "SET_JOYSTICK_TYPE");
            ! function (t) {
                t[t.FOUR = 0] = "FOUR", t[t.EIGHT = 1] = "EIGHT", t[t.ALL = 2] = "ALL"
            }(N || (N = t("DirectionType", {}))),
            function (t) {
                t[t.STOP = 0] = "STOP", t[t.NORMAL = 1] = "NORMAL", t[t.FAST = 2] = "FAST"
            }(U || (U = t("SpeedType", {}))),
            function (t) {
                t[t.FIXED = 0] = "FIXED", t[t.FOLLOW = 1] = "FOLLOW"
            }(A || (A = t("JoystickType", {})));
            t("Joystick", (E = R("Joystick"), O = z({
                type: a,
                displayName: "Dot",
                tooltip: "摇杆操纵点"
            }), _ = z({
                type: a,
                displayName: "Ring",
                tooltip: "摇杆背景节点"
            }), m = z({
                type: p(A),
                displayName: "Touch Type",
                tooltip: "触摸类型"
            }), S = z({
                type: p(N),
                displayName: "Direction Type",
                tooltip: "方向类型"
            }), C = z({
                type: u,
                displayName: "Ring Radius",
                tooltip: "半径"
            }), E((P = i((b = function (t) {
                function i() {
                    for (var i, e = arguments.length, s = new Array(e), r = 0; r < e; r++) s[r] = arguments[r];
                    return i = t.call.apply(t, [this].concat(s)) || this, o(i, "dot", P, n(i)), o(i, "ring", D, n(i)), o(i, "joystickType", F, n(i)), o(i, "directionType", I, n(i)), i._stickPos = new h, i._touchLocation = new l, o(i, "radius", w, n(i)), i
                }
                e(i, t);
                var s = i.prototype;
                return s.onLoad = function () {
                    var t;
                    if (this.dot)
                        if (this.ring) {
                            var i = this.ring.getComponent(y),
                                e = 2 * this.radius,
                                o = new d(e, e);
                            null == i || i.setContentSize(o), null == (t = this.ring.getChildByName("bg").getComponent(y)) || t.setContentSize(o), this._initTouchEvent();
                            var n = this.node.getComponent(T);
                            this.joystickType === A.FOLLOW && n && (n.opacity = 0)
                        } else console.warn("Joystick Ring is null!");
                    else console.warn("Joystick Dot is null!")
                }, s.onEnable = function () {
                    J.on(M, this._onSetJoystickType, this)
                }, s.onDisable = function () {
                    J.off(M, this._onSetJoystickType, this)
                }, s._onSetJoystickType = function (t) {
                    this.joystickType = t;
                    var i = this.node.getComponent(T);
                    i && (i.opacity = t === A.FIXED ? 255 : 0)
                }, s._initTouchEvent = function () {
                    this.node.on(g.TOUCH_START, this._touchStartEvent, this), this.node.on(g.TOUCH_MOVE, this._touchMoveEvent, this), this.node.on(g.TOUCH_END, this._touchEndEvent, this), this.node.on(g.TOUCH_CANCEL, this._touchEndEvent, this)
                }, s._touchStartEvent = function (t) {
                    if (this.ring && this.dot) {
                        J.emit(g.TOUCH_START, t);
                        var i = t.getUILocation(),
                            e = new h(i.x, i.y);
                        if (this.joystickType === A.FIXED) {
                            this._stickPos = this.ring.getPosition();
                            var o = e.subtract(this.ring.getPosition()),
                                n = o.length();
                            this.radius > n && this.dot.setPosition(o)
                        } else this.joystickType === A.FOLLOW && (this._stickPos = e, this.node.getComponent(T).opacity = 255, this._touchLocation = t.getUILocation(), this.ring.setPosition(e), this.dot.setPosition(new h))
                    }
                }, s._touchMoveEvent = function (t) {
                    if (this.dot && this.ring) {
                        if (this.joystickType === A.FOLLOW && this._touchLocation === t.getUILocation()) return !1;
                        var i = t.getUILocation(),
                            e = new h(i.x, i.y).subtract(this.ring.getPosition()),
                            o = e.length(),
                            n = U.NORMAL;
                        this.radius > o ? (this.dot.setPosition(e), n = U.NORMAL) : (this.dot.setPosition(e.normalize().multiplyScalar(this.radius)), n = U.FAST), v.instance.sendMes(L.stickMove, e.normalize()), J.emit(g.TOUCH_MOVE, t, {
                            speedType: n,
                            moveVec: e.normalize()
                        })
                    }
                }, s._touchEndEvent = function (t) {
                    this.dot && this.ring && (this.dot.setPosition(new h), this.joystickType === A.FOLLOW && (this.node.getComponent(T).opacity = 0), v.instance.sendMes(L.StickMoveEnd), J.emit(g.TOUCH_END, t, {
                        speedType: U.STOP
                    }))
                }, i
            }(f)).prototype, "dot", [O], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return null
                }
            }), D = i(b.prototype, "ring", [_], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return null
                }
            }), F = i(b.prototype, "joystickType", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return A.FIXED
                }
            }), I = i(b.prototype, "directionType", [S], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return N.ALL
                }
            }), w = i(b.prototype, "radius", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 50
                }
            }), k = b)) || k));
            s._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/LangInfoTools.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function (n) {
    "use strict";
    var t, e, i, o;
    return {
        setters: [function (n) {
            t = n.createClass
        }, function (n) {
            e = n.cclegacy, i = n._decorator, o = n.sys
        }],
        execute: function () {
            var s, c;
            e._RF.push({}, "b2c179JV0VFoamq8TIfi08J", "LangInfoTools", void 0);
            var a = i.ccclass,
                r = (i.property, function () {
                    this.id = 0, this.key = "", this.cn = "", this.en = ""
                });
            n("LangInfoTools", a("LangInfoTools")(((c = function () {
                function n() {
                    this.langInfoDic = {}
                }
                var e = n.prototype;
                return e.initLangInfo = function (n) {
                    for (var t = "zh" == o.language, e = 0; e < n.length; e++) {
                        var i = new r,
                            s = n[e];
                        i.id = s.id, i.key = s.key, this.langInfoDic[i.key] = t ? s.cn : s.en
                    }
                }, e.getLangInfoByKey = function (n) {
                    var t = this.langInfoDic[n];
                    t || (t = n);
                    var e = t.split("%d");
                    if (e.length > 1) {
                        t = "";
                        for (var i = 0; i < e.length; i++) t += i < (arguments.length <= 1 ? 0 : arguments.length - 1) ? e[i] + (i + 1 < 1 || arguments.length <= i + 1 ? void 0 : arguments[i + 1]) : e[i]
                    }
                    return t
                }, t(n, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this.instance && (this.instance = new n), this.instance
                    }
                }]), n
            }()).instance = void 0, s = c)) || s);
            e._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/LevelArenaControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameConfig.ts", "./UIGameView.ts"], (function (n) {
    "use strict";
    var e, t, o, r, a, i, l, c;
    return {
        setters: [function (n) {
            e = n.inheritsLoose
        }, function (n) {
            t = n.cclegacy, o = n._decorator, r = n.Collider2D, a = n.Contact2DType, i = n.Component
        }, function (n) {
            l = n.GameConfig
        }, function (n) {
            c = n.ColliderTagConfig
        }],
        execute: function () {
            var s;
            t._RF.push({}, "b79d3il715JH5ahwJPw8dUg", "LevelArenaControl", void 0);
            var u = o.ccclass;
            o.property, n("LevelArenaControl", u("LevelArenaControl")(s = function (n) {
                function t() {
                    return n.apply(this, arguments) || this
                }
                e(t, n);
                var o = t.prototype;
                return o.start = function () {
                    for (var n = 0; n < this.node.children.length; n++) {
                        this.node.children[n].getComponent(r).on(a.BEGIN_CONTACT, this.onBeginBodyContact, this)
                    }
                }, o.update = function (n) {}, o.onBeginBodyContact = function (n, e, t) {
                    var o = e.tag;
                    o != c.Player && o != c.PlayerHand || (l.Instance.playerInLevelArenaIndex = n.node.name, console.log("玩家进入关卡区域" + l.Instance.playerInLevelArenaIndex), n.node.active = !1)
                }, t
            }(i)) || s);
            t._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/LevelControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./DoorSwitchControl.ts"], (function (e) {
    "use strict";
    var o, t, i, n, r, l, a, d, s, c, p;
    return {
        setters: [function (e) {
            o = e.applyDecoratedDescriptor, t = e.inheritsLoose, i = e.initializerDefineProperty, n = e.assertThisInitialized
        }, function (e) {
            r = e.cclegacy, l = e._decorator, a = e.Node, d = e.UITransform, s = e.Widget, c = e.Component
        }, function (e) {
            p = e.DoorSwitchControl
        }],
        execute: function () {
            var u, h, y, g, f, m, b, N, v, C, w, D, z;
            r._RF.push({}, "f7f25iBoYBDj4mds0xUCmIP", "LevelControl", void 0);
            var B = l.ccclass,
                S = l.property;
            e("LevelControl", (u = B("LevelControl"), h = S({
                type: a,
                displayName: "怪物节点"
            }), y = S({
                type: a,
                displayName: "武器节点"
            }), g = S({
                type: a,
                displayName: "机关门节点"
            }), f = S({
                type: a,
                displayName: "手臂药剂节点"
            }), m = S({
                type: a,
                displayName: "专门用于教导玩家杀死的怪物"
            }), u((v = o((N = function (e) {
                function o() {
                    for (var o, t = arguments.length, r = new Array(t), l = 0; l < t; l++) r[l] = arguments[l];
                    return o = e.call.apply(e, [this].concat(r)) || this, i(o, "bossNode", v, n(o)), i(o, "weaponNode", C, n(o)), i(o, "machineDoorNode", w, n(o)), i(o, "drugNode", D, n(o)), o.bloodNode = void 0, i(o, "guideKillBoss", z, n(o)), o
                }
                t(o, e);
                var r = o.prototype;
                return r.onLoad = function () {
                    var e = this.node.getChildByName("Map"),
                        o = e.getComponent(d),
                        t = e.getComponent(s);
                    t.left = 0, t.top = 0;
                    var i = new a("bloodNode");
                    i.setParent(this.node), i.addComponent(d).contentSize = o.contentSize, i.setSiblingIndex(this.bossNode.getSiblingIndex()), this.bloodNode = i
                }, r.update = function (e) {}, r.initMachineDoor = function () {
                    var e = this.node.getChildByName("MachineDoorNode");
                    if (e)
                        for (var o = e.children, t = 0; t < o.length; t++)
                            for (var i = o[t].getChildByName("SwitchNode"), n = 0; n < i.children.length; n++) {
                                i.children[n].getComponent(p).initDoor()
                            }
                }, r.elongatePlayerArm = function () {}, o
            }(c)).prototype, "bossNode", [h], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), C = o(N.prototype, "weaponNode", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), w = o(N.prototype, "machineDoorNode", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), D = o(N.prototype, "drugNode", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), z = o(N.prototype, "guideKillBoss", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), b = N)) || b));
            r._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/LoadingBundlePanel.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LYCSDK.ts", "./ResMgr.ts", "./TimeControl.ts", "./LangInfoTools.ts", "./UIViewMgr.ts"], (function (e) {
    "use strict";
    var n, t, o, i, a, s, r, l, c, u, g, d, p, f, L, h, I;
    return {
        setters: [function (e) {
            n = e.applyDecoratedDescriptor, t = e.inheritsLoose, o = e.initializerDefineProperty, i = e.assertThisInitialized
        }, function (e) {
            a = e.cclegacy, s = e._decorator, r = e.Node, l = e.Label, c = e.Button, u = e.sys, g = e.Vec3, d = e.Component
        }, function (e) {
            p = e.LYCSDK
        }, function (e) {
            f = e.ResMgr
        }, function (e) {
            L = e.TimeControl
        }, function (e) {
            h = e.LangInfoTools
        }, function (e) {
            I = e.UIViewConfig
        }],
        execute: function () {
            var y, T, m, v, b, P, w, B, C;
            a._RF.push({}, "90f3cxC9WVJT5gkOI7aiOJd", "LoadingBundlePanel", void 0);
            var S = s.ccclass,
                D = s.property;
            e("LoadingBundlePanel", (y = S("LoadingBundlePanel"), T = D({
                type: r
            }), m = D({
                type: l
            }), v = D({
                type: c
            }), y((w = n((P = function (e) {
                function n() {
                    for (var n, t = arguments.length, a = new Array(t), s = 0; s < t; s++) a[s] = arguments[s];
                    return n = e.call.apply(e, [this].concat(a)) || this, o(n, "LoadingImg", w, i(n)), o(n, "touchTips", B, i(n)), o(n, "passLoadingBtn", C, i(n)), n.RotateSpeed = 10, n.afterLoad = void 0, n
                }
                t(n, e);
                var a = n.prototype;
                return a.onLoad = function () {
                    var e = this;
                    this.touchTips.string = h.Instance.getLangInfoByKey("bestTouchTips"), this.passLoadingBtn.node.on(c.EventType.CLICK, (function () {
                        e.afterLoad()
                    }))
                }, a.AfterLoadPanelClose = function (e, n) {
                    this.passLoadingBtn.node.active = !1;
                    var t = this;

                    function o() {
                        (t.node.active = !1, n && n(), e == I.UIGameView) && (u.localStorage.getItem("isShowTouchTipsPanel_") || u.localStorage.setItem("isShowTouchTipsPanel_", "1"), p.Instance.PlatformSDKControl.trackEvent("fristCloseLoadingPanel", {}))
                    }
                    t.node.active = !0, this.afterLoad = function () {
                            o()
                        },
                        function n() {
                            f.Instance.LoadPrefab(e) ? e == I.UIGameView ? u.localStorage.getItem("isShowTouchTipsPanel_") ? o() : (t.passLoadingBtn.node.active = !0, L.Instance.DelayToDoNoObj((function () {
                                t.node.active && o()
                            }), 2)) : o() : L.Instance.DelayToDo((function () {
                                n()
                            }), t, .5)
                        }()
                }, a.update = function (e) {
                    this.LoadingImg.eulerAngles = new g(this.LoadingImg.eulerAngles.x, this.LoadingImg.eulerAngles.y, this.LoadingImg.eulerAngles.z - this.RotateSpeed)
                }, n
            }(d)).prototype, "LoadingImg", [T], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), B = n(P.prototype, "touchTips", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), C = n(P.prototype, "passLoadingBtn", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), b = P)) || b));
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/LYCADSDK.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./CommonTipsMgr.ts", "./UIViewMgr.ts", "./LYCSDK.ts"], (function (e) {
    "use strict";
    var n, a, t, c, o, s, i;
    return {
        setters: [function (e) {
            n = e.createClass
        }, function (e) {
            a = e.cclegacy, t = e._decorator
        }, function (e) {
            c = e.CommonTipsMgr
        }, function (e) {
            o = e.UIViewMgr
        }, function (e) {
            s = e.LYCSDK, i = e.PlatformType
        }],
        execute: function () {
            var d, r;
            a._RF.push({}, "dffc8rWqpBOrZv/SfyE6sSu", "LYCADSDK", void 0);
            var l = t.ccclass;
            t.property, e("LYCADSDK", l("LYCADSDK")(((r = function () {
                function e() {
                    this.SucceedCallBack = void 0, this.CloseCallBack = void 0, this.FailCallBack = void 0, this.ad = void 0
                }
                var a = e.prototype;
                return a.InitAD = function () {
                    var e = this;
                    switch (s.Instance.GamePlatform) {
                        case i.TT:
                            this.ad = s.Instance.PlatformSDK.createRewardedVideoAd({
                                adUnitId: "7d1o3gk808j3pnpr9f"
                            }), this.ad.onError((function (e) {
                                s.Instance.GameLog("err:" + e), s.Instance.PlatformSDK.hideLoading(), e.errCode
                            })), this.ad.onClose((function (n) {
                                s.Instance.PlatformSDK.hideLoading(), n.isEnded ? (s.Instance.GameLog("观看了", n.count, "个视频"), e.SucceedCallBack()) : (s.Instance.GameLog("未观看完视频"), c.Instance.ShowTips("未观看完视频,不发放奖励", o.Instance.NowOpenViewName), e.CloseCallBack && (e.CloseCallBack(), e.CloseCallBack = null))
                            })), this.ad.onLoad((function () {
                                s.Instance.GameLog("激励视频加载成功---------")
                            })), this.ad.load();
                            break;
                        case i.Oppo_Apk:
                            break;
                        case i.VIVO:
                            this.ad = s.Instance.PlatformSDK.createRewardedVideoAd({
                                adUnitId: "62e630a4852f4b4d9a1acf1f5e1cddcd"
                            }), this.ad.onError((function (e) {
                                s.Instance.GameLog("err:" + e), s.Instance.PlatformSDK.hideLoading(), e.errCode
                            })), this.ad.onClose((function (n) {
                                s.Instance.GameLog(n), s.Instance.PlatformSDK.hideLoading(), n.isEnded ? (s.Instance.GameLog("观看了", n.count, "个视频"), e.SucceedCallBack()) : (s.Instance.GameLog("未观看完视频"), c.Instance.ShowTips("未观看完视频,不发放奖励", o.Instance.NowOpenViewName))
                            })), this.ad.onLoad((function () {
                                s.Instance.GameLog("激励视频加载成功---------")
                            })), this.ad.load();
                            break;
                        case i.OPPO:
                            this.ad = s.Instance.PlatformSDK.createRewardedVideoAd({
                                adUnitId: "847604"
                            }), this.ad.onError((function (e) {
                                s.Instance.GameLog("err:" + e), s.Instance.PlatformSDK.hideLoading(), e.errCode
                            })), this.ad.onClose((function (n) {
                                s.Instance.GameLog(n), s.Instance.PlatformSDK.hideLoading(), n.isEnded ? (s.Instance.GameLog("观看了", n.count, "个视频"), e.SucceedCallBack()) : (s.Instance.GameLog("未观看完视频"), c.Instance.ShowTips("未观看完视频,不发放奖励", o.Instance.NowOpenViewName))
                            })), this.ad.onLoad((function () {
                                s.Instance.GameLog("激励视频加载成功---------")
                            })), this.ad.load()
                    }
                }, a.WatchVideoAD = function (e, n, a) {
                    this.SucceedCallBack = e;
                    n && (this.CloseCallBack = n)
                    try{

                    if ('h5api' in window) {
                        window.h5api.playAd((data) => {
                            if (data.code === 10000) {
                                console.log("开始播放");
                            } else if (data.code === 10001) {
                                // success && success()
                                e()
                            } else {
                                n&&n()
                                a&&a()
                                console.log("广告异常");
                            }
                        });
                    }
                }catch{
                    n&&n()
                    a&&a();
                    console.log("广告异常",n);

                }

                    //
                    return;
                    switch ( s.Instance.GamePlatform) {
                        case i.TT:
                            o.Instance.getGameView().pauseGame(), this.ad.show().then((function () {
                                s.Instance.GameLog("视频广告展示")
                            })).catch((function (e) {
                                s.Instance.GameLog("---------bytes!---广告组件出现问题", e), o.Instance.getGameView().resumeGame(), a()
                            }));
                            break;
                        case i.VIVO:
                        case i.OPPO:
                            this.ad.show().then((function () {
                                s.Instance.GameLog("视频广告展示")
                            })).catch((function (e) {
                                s.Instance.GameLog("---------bytes!---广告组件出现问题", e), a()
                            }));
                            break;
                        default:
                            s.Instance.GameLog("视频广告展示"), e()
                    }
                }, n(e, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this._instance && (this._instance = new e), this._instance
                    },
                    set: function (e) {
                        this._instance = e
                    }
                }]), e
            }())._instance = void 0, d = r)) || d);
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/LYCSDK.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BaseSDKControl.ts", "./OppoAPKControl.ts", "./TiktokSDKControl.ts", "./WindowsSDKControl.ts", "./LYCADSDK.ts", "./VivoSDKControl.ts", "./NoADSDKControl.ts", "./WxSDKControl.ts", "./OppoSDKControl.ts"], (function (t) {
    "use strict";
    var o, n, r, e, s, a, i, l, c, f, D, S;
    return {
        setters: [function (t) {
            o = t.createClass
        }, function (t) {
            n = t.cclegacy, r = t._decorator
        }, function (t) {
            e = t.BaseSDKControl
        }, function (t) {
            s = t.OppoAPKControl
        }, function (t) {
            a = t.TiktokSDKControl
        }, function (t) {
            i = t.WindowsSDKControl
        }, function (t) {
            l = t.LYCADSDK
        }, function (t) {
            c = t.VivoSDKControl
        }, function (t) {
            f = t.NoADSDKControl
        }, function (t) {
            D = t.WxSDKControl
        }, function (t) {
            S = t.OppoSDKControl
        }],
        execute: function () {
            var u, K;
            n._RF.push({}, "ed2eezsRRRP15DWbf1VBYtx", "LYCSDK", void 0);
            var C = r.ccclass,
                m = (r.property, t("PlatformType", (function () {})));
            m.Windows = "Windows", m.No_AD = "No_AD", m.TT = "Tiktok", m.WX = "WeiXin", m.Oppo_Apk = "Oppo_Apk", m.OPPO = "oppo", m.VIVO = "vivo";
            t("LYCSDK", C("LYCSDK")(((K = function () {
                function t() {
                    this.PlatformSDKControl = new e, this.PlatformSDK = void 0, this.GamePlatform = m.Windows
                }
                var n = t.prototype;
                return n.InitLYCSDK = function () {
                    switch (t.Instance.GamePlatform) {
                        case m.TT:
                            this.PlatformSDKControl = a.Instance;
                            break;
                        case m.WX:
                            this.PlatformSDKControl = D.Instance;
                            break;
                        case m.Oppo_Apk:
                            this.PlatformSDKControl = s.Instance;
                            break;
                        case m.Windows:
                            this.PlatformSDKControl = i.Instance;
                            break;
                        case m.VIVO:
                            this.PlatformSDKControl = c.Instance;
                            break;
                        case m.OPPO:
                            this.PlatformSDKControl = S.Instance;
                            break;
                        default:
                            this.PlatformSDKControl = f.Instance
                    }
                    this.PlatformSDK = this.PlatformSDKControl.GetPlatformSDK(), l.Instance.InitAD()
                }, n.IsAddHeadTitle = function () {
                    return t.Instance.GamePlatform != m.Windows && t.Instance.GamePlatform != m.No_AD && t.Instance.GamePlatform != m.Oppo_Apk
                }, n.LoginPlatform = function () {
                    this.PlatformSDKControl.LoginPlatform()
                }, n.GetUserInfo = function () {
                    this.PlatformSDKControl.GetUserInfo()
                }, n.ShareGame = function (t) {
                    this.PlatformSDKControl.ShareGame(t)
                }, n.GameLog = function () {
                    for (var t = arguments.length, o = new Array(t), n = 0; n < t; n++) o[n] = arguments[n];
                    console.log("LYC:" + o)
                }, o(t, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this._instance && (this._instance = new t), this._instance
                    },
                    set: function (t) {
                        this._instance = t
                    }
                }]), t
            }())._instance = void 0, u = K)) || u);
            n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/LYCSDKEventHelper.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function (e) {
    "use strict";
    var n, t, i, o, s;
    return {
        setters: [function (e) {
            n = e.inheritsLoose, t = e.createClass
        }, function (e) {
            i = e.cclegacy, o = e._decorator, s = e.EventTarget
        }],
        execute: function () {
            var r, c;
            i._RF.push({}, "17255vB4W9F+pJAebgVO09J", "LYCSDKEventHelper", void 0);
            var u = o.ccclass,
                a = (o.property, e("EventConfig", (function () {})));
            a.LoadingProgress = "LoadingProgress", a.LoginSucceed = "LoginSucceed", a.GetUserInfo = "GetUserInfo", a.CheckShortcut = "CheckShortcut", a.stickMove = "StickMove", a.StickMoveEnd = "StickMoveEnd", a.PlayChangeDoorSwitch = "PlayCloseDoor", a.hideTouchTips = "hideTouchTips", a.hideGuidePanel = "hideGuidePanel", a.finishLoadStartViewBgm = "finishLoadStartViewBgm", a.helpFinishGuide = "helpFinishGuide", a.resumeBossFollow = "resumeBossFollow";
            e("LYCSDKEventHelper", u("LYCSDKEventHelper")(((c = function (e) {
                function i() {
                    return e.apply(this, arguments) || this
                }
                return n(i, e), i.prototype.sendMes = function (e, n, t, o, s, r) {
                    i.instance.emit(e, n, t, o, s, r)
                }, t(i, null, [{
                    key: "instance",
                    get: function () {
                        return null == this._instance && (this._instance = new i), this._instance
                    }
                }]), i
            }(s))._instance = void 0, r = c)) || r);
            i._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/LYCSDKHttp.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LYCSDK.ts"], (function (e) {
    "use strict";
    var t, n, o, s, a;
    return {
        setters: [function (e) {
            t = e.createClass
        }, function (e) {
            n = e.cclegacy, o = e._decorator
        }, function (e) {
            s = e.LYCSDK, a = e.PlatformType
        }],
        execute: function () {
            var c, r;
            e("SendType", void 0), n._RF.push({}, "720d78y1JdMW7UfCQxOcnUf", "LYCSDKHttp", void 0);
            var i, l = o.ccclass;
            o.property;
            ! function (e) {
                e.Post = "POST", e.Get = "GET"
            }(i || (i = e("SendType", {})));
            e("LYCSDKHttp", l("LYCSDKHttp")(((r = function () {
                function e() {}
                var n = e.prototype;
                return n.start = function () {}, n.update = function (e) {}, n.SendMess = function (e, t, n) {
                    var o = JSON.stringify(t);
                    s.Instance.GameLog("Send mess：" + o);
                    var a = new XMLHttpRequest;
                    a.ontimeout = function () {
                        console.error("The request for " + e + " timed out.")
                    }, a.onreadystatechange = function () {
                        if (4 == a.readyState)
                            if (a.status >= 200 && a.status < 400) {
                                var e = a.responseText;
                                if (e) {
                                    console.log("开始解析response 文件");
                                    var t = JSON.parse(e);
                                    console.log("解析完毕，执行回调函数"), n(t)
                                } else console.log("返回数据不存在"), n(!1)
                            } else console.log("请求失败"), n(!1)
                    }, a.open("POST", e, !0), s.Instance.IsAddHeadTitle() && a.setRequestHeader("Content-Type", "application/json"), a.timeout = 5e3, a.send(o)
                }, n.code2Session = function (e, t, n, o) {
                    void 0 === o && (o = i.Post), s.Instance.GameLog("code2Session");
                    var c = JSON.stringify(t);
                    if (s.Instance.GamePlatform == a.WX) s.Instance.PlatformSDKControl.GetPlatformSDK().request({
                        url: e,
                        header: {
                            "content-type": "application/json"
                        },
                        success: function (e) {
                            console.log("微信request回调"), n(JSON.parse(e.data))
                        },
                        fail: function (e) {
                            console.log("微信回调错误" + e.errMsg + ",错误码:" + e.errno)
                        }
                    });
                    else {
                        var r = new XMLHttpRequest;
                        r.onreadystatechange = function () {
                            if (4 == r.readyState)
                                if (r.status >= 200 && r.status < 400) {
                                    var e = r.responseText;
                                    if (e) {
                                        console.log("开始解析response 文件");
                                        var t = JSON.parse(e);
                                        console.log("解析完毕，执行回调函数"), n(t)
                                    } else console.log("返回数据不存在"), n(!1)
                                } else console.log("请求失败"), n(!1)
                        }, r.open(o, e, !0), s.Instance.IsAddHeadTitle() && r.setRequestHeader("Content-Type", "application/json"), r.timeout = 5e3, r.send(c)
                    }
                }, t(e, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this._instance && (this._instance = new e), this._instance
                    },
                    set: function (e) {
                        this._instance = e
                    }
                }]), e
            }())._instance = void 0, c = r)) || c);
            n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/MagicScrollView.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function (t) {
    "use strict";
    var e, i, o, n, s, h, r, a, l, c, m, I, S, d, u;
    return {
        setters: [function (t) {
            e = t.applyDecoratedDescriptor, i = t.inheritsLoose, o = t.initializerDefineProperty, n = t.assertThisInitialized, s = t.createClass
        }, function (t) {
            h = t.cclegacy, r = t._decorator, a = t.CCInteger, l = t.Enum, c = t.Node, m = t.UITransform, I = t.math, S = t.instantiate, d = t.ScrollView, u = t.Vec2
        }],
        execute: function () {
            var w, g, p, P, y, f, x, C, N, b, v, z, L;
            h._RF.push({}, "693cfN0KmNGx7zmcrhWF9UK", "MagicScrollView", void 0);
            var T, V, M = r.ccclass,
                D = r.property;
            ! function (t) {
                t[t.Horizontal = 2] = "Horizontal", t[t.Vertical = 1] = "Vertical"
            }(T || (T = {})),
            function (t) {
                t[t.LastOnTop = 0] = "LastOnTop", t[t.FristOnTop = 1] = "FristOnTop"
            }(V || (V = {}));
            t("MagicScrollView", (w = M("MagicScrollView"), g = D({
                type: a,
                displayName: "item之间的间隔"
            }), p = D({
                type: l(T),
                displayName: "滚动方向"
            }), P = D({
                type: c,
                displayName: "滚动的预制体"
            }), y = D({
                type: l(V),
                displayName: "子物体项显示的UI层级"
            }), w((C = e((x = function (t) {
                function e() {
                    for (var e, i = arguments.length, s = new Array(i), h = 0; h < i; h++) s[h] = arguments[h];
                    return e = t.call.apply(t, [this].concat(s)) || this, o(e, "DataItemCount", C, n(e)), o(e, "ShowItemCount", N, n(e)), o(e, "ItemSpace", b, n(e)), o(e, "ScrollDir", v, n(e)), o(e, "ShowItemPrefab", z, n(e)), o(e, "ShowItemType", L, n(e)), e.StartPos = void 0, e.StartLocalPos = void 0, e.EndPos = void 0, e.ItemName = "Scroll-", e.ItemSize = void 0, e._NowMinScrollItemIndex = 0, e
                }
                i(e, t);
                var h = e.prototype;
                return h.GetContentChild = function (t) {
                    return this.content.getChildByName(this.ItemName + t)
                }, h.start = function () {}, h.update = function (t) {}, h.InitScroll = function (t, e, i, o) {
                    var n = this;
                    i && (this.DataItemCount = i), o && (this.ShowItemCount = o), this.StartLocalPos = this.ShowItemPrefab.getPosition();
                    var s = this.ShowItemPrefab.getComponent(m),
                        h = I.size(s.width, s.height),
                        r = this.content.getComponent(m);
                    this.ScrollDir == T.Vertical ? (h = I.size(0, h.height + this.ItemSpace), this.EndPos = new I.Vec3(this.StartLocalPos.x, this.StartLocalPos.y + h.height * this.ShowItemCount), r.setContentSize(r.contentSize.width, h.height * this.DataItemCount)) : (h = I.size(h.width + this.ItemSpace, 0), this.EndPos = new I.Vec3(this.StartLocalPos.x + h.width * this.ShowItemCount, this.StartLocalPos.y), r.setContentSize(h.width * this.DataItemCount, r.height)), this.ItemSize = h, this.ShowItemPrefab.name = this.ItemName + "0";
                    for (var a = 1; a < this.ShowItemCount; a++) {
                        var l = this.content.children[a - 1],
                            c = S(this.ShowItemPrefab);
                        c.name = this.ItemName + a, this.content.addChild(c), c.setPosition(new I.Vec3(l.getPosition().x + h.width, l.getPosition().y - h.height))
                    }
                    var u = this.content.children[0],
                        w = this.content.children[this.ShowItemCount - 1],
                        g = u.getWorldPosition(),
                        p = w.getWorldPosition();
                    this.StartPos = new I.Vec3(g.x, g.y + h.height), this.EndPos = new I.Vec3(p.x, p.y - h.height), t && t(), this.node.on(d.EventType.SCROLLING, (function () {
                        n.OnScrollMove(e)
                    }), this)
                }, h.ReInitScroll = function (t) {
                    this.scrollToOffset(new u(0, 0));
                    var e = this.ShowItemPrefab.getComponent(m),
                        i = I.size(e.width, e.height);
                    this.content.getComponent(m);
                    this.ScrollDir == T.Vertical ? (i = I.size(0, i.height + this.ItemSpace), this.EndPos = new I.Vec3(this.StartLocalPos.x, this.StartLocalPos.y + i.height * this.ShowItemCount)) : (i = I.size(i.width + this.ItemSpace, 0), this.EndPos = new I.Vec3(this.StartLocalPos.x + i.width * this.ShowItemCount, this.StartLocalPos.y)), this._NowMinScrollItemIndex = 0;
                    var o = this.content.children[0];
                    o.name = this.ItemName + "0", o.setPosition(this.StartLocalPos), o.setSiblingIndex(0);
                    for (var n = 1; n < this.ShowItemCount; n++) {
                        var s = this.content.children[n - 1],
                            h = this.content.children[n];
                        h.name = this.ItemName + n, h.setSiblingIndex(n), h.setPosition(new I.Vec3(s.getPosition().x + i.width, s.getPosition().y - i.height))
                    }
                    t()
                }, h.GetNodeIndex = function (t) {
                    var e = t.split("-")[1];
                    return Number(e)
                }, h.OnScrollMove = function (t) {
                    var e = this.content.getChildByName(this.ItemName + this._NowMinScrollItemIndex),
                        i = this.content.getChildByName(this.ItemName + (this._NowMinScrollItemIndex + this.ShowItemCount - 1));
                    if (this.ScrollDir == T.Vertical) {
                        if (e.getWorldPosition().y > this.StartPos.y) {
                            var o = this.GetNodeIndex(i.name) + 1;
                            o < this.DataItemCount && (this.ShowItemType == V.LastOnTop ? e.setSiblingIndex(this.ShowItemCount - 1) : e.setSiblingIndex(0), e.name = this.ItemName + o, e.setPosition(i.getPosition().x, i.getPosition().y - this.ItemSize.height), this._NowMinScrollItemIndex = o - this.ShowItemCount + 1, t && t(o))
                        } else if (e.getWorldPosition().y < this.StartPos.y - this.ItemSize.height) {
                            this.ShowItemType == V.LastOnTop ? i.setSiblingIndex(0) : i.setSiblingIndex(this.ShowItemCount - 1);
                            var n = this.GetNodeIndex(e.name) - 1;
                            i.name = this.ItemName + n, i.setPosition(e.getPosition().x, e.getPosition().y + this.ItemSize.height), this._NowMinScrollItemIndex = n, t && t(n)
                        }
                    } else if (e.getWorldPosition().x < this.StartPos.x - this.ItemSize.width) {
                        var s = this.GetNodeIndex(i.name) + 1;
                        s < this.DataItemCount && (this.ShowItemType == V.LastOnTop ? e.setSiblingIndex(this.ShowItemCount - 1) : e.setSiblingIndex(0), e.name = this.ItemName + s, e.setPosition(i.getPosition().x + this.ItemSize.width, i.getPosition().y), this._NowMinScrollItemIndex = s - this.ShowItemCount + 1, t && t(s))
                    } else if (e.getWorldPosition().x > this.StartPos.x) {
                        this.ShowItemType == V.LastOnTop ? i.setSiblingIndex(0) : i.setSiblingIndex(this.ShowItemCount - 1);
                        var h = this.GetNodeIndex(e.name) - 1;
                        i.name = this.ItemName + h, i.setPosition(e.getPosition().x - this.ItemSize.width, e.getPosition().y), this._NowMinScrollItemIndex = h, t && t(h)
                    }
                }, s(e, [{
                    key: "NowMinScrollItemIndex",
                    get: function () {
                        return this._NowMinScrollItemIndex
                    }
                }]), e
            }(d)).prototype, "DataItemCount", [D], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 0
                }
            }), N = e(x.prototype, "ShowItemCount", [D], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 0
                }
            }), b = e(x.prototype, "ItemSpace", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 0
                }
            }), v = e(x.prototype, "ScrollDir", [p], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), z = e(x.prototype, "ShowItemPrefab", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return null
                }
            }), L = e(x.prototype, "ShowItemType", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return V.LastOnTop
                }
            }), f = x)) || f));
            h._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/MagneticCircleControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./CommonTipsMgr.ts", "./UIViewMgr.ts", "./UIGameView.ts"], (function (t) {
    "use strict";
    var o, n, e, i, s, c, r, a, l, u, g;
    return {
        setters: [function (t) {
            o = t.inheritsLoose
        }, function (t) {
            n = t.cclegacy, e = t._decorator, i = t.Collider2D, s = t.Contact2DType, c = t.Vec3, r = t.tween, a = t.Component
        }, function (t) {
            l = t.CommonTipsMgr
        }, function (t) {
            u = t.UIViewConfig
        }, function (t) {
            g = t.ColliderTagConfig
        }],
        execute: function () {
            var C;
            n._RF.push({}, "7747da1uApE/bF2eE7iU591", "MagneticCircleControl", void 0);
            var h = e.ccclass;
            e.property, t("MagneticCircleControl", h("MagneticCircleControl")(C = function (t) {
                function n() {
                    for (var o, n = arguments.length, e = new Array(n), i = 0; i < n; i++) e[i] = arguments[i];
                    return (o = t.call.apply(t, [this].concat(e)) || this).bossJB = void 0, o
                }
                o(n, t);
                var e = n.prototype;
                return e.start = function () {
                    this.node.getComponent(i).on(s.BEGIN_CONTACT, this.onBeginContact, this)
                }, e.update = function (t) {}, e.onBeginContact = function (t, o, n) {
                    console.log("onBeginContact"), o.tag == g.Player && this.touchPlayer()
                }, e.touchPlayer = function () {
                    l.Instance.ShowTips("主角受到磁场伤害", u.UIGameView), this.bossJB.hurtPlayer(this.bossJB.bossAtk * this.bossJB.magneticData.hurtPer)
                }, e.showMagneticCircle = function (t) {
                    this.bossJB = t.bossJB, this.node.setScale(c.ONE), r(this.node).to(t.largeTime, {
                        scale: new c(500, 500)
                    }).start()
                }, n
            }(a)) || C);
            n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/main", ["./BaseUIPanel.ts", "./BaseUIView.ts", "./BgmMgr.ts", "./C2SConfig.ts", "./C2SControl.ts", "./CommonTipsControl.ts", "./CommonTipsMgr.ts", "./GameConfig.ts", "./GuidePanel.ts", "./BaseSDKControl.ts", "./NoADSDKControl.ts", "./OppoAPKControl.ts", "./OppoSDKControl.ts", "./TiktokSDKControl.ts", "./UMSDKControl.ts", "./VivoApkControl.ts", "./VivoSDKControl.ts", "./WindowsSDKControl.ts", "./WxSDKControl.ts", "./LYCADSDK.ts", "./LYCSDK.ts", "./LYCSDKEventHelper.ts", "./LYCSDKHttp.ts", "./ResMgr.ts", "./SoundMgr.ts", "./TimeControl.ts", "./GameTools.ts", "./LangInfoTools.ts", "./MagicScrollView.ts", "./UITools.ts", "./UIControl.ts", "./UIPanelMgr.ts", "./UIViewMgr.ts", "./AStar.ts", "./AStarMgr.ts", "./Grid.ts", "./Node.ts", "./BagBulletGridItemControl.ts", "./BossBulletControl.ts", "./BossControlBase.ts", "./BossEggControl.ts", "./BossStoneControl.ts", "./Boss_1Control.ts", "./BoxControl.ts", "./ChargeBossControl.ts", "./DankeAnimControl.ts", "./DoorControl.ts", "./DoorSwitchControl.ts", "./FinalBossBase.ts", "./FogControl.ts", "./FollowBossControl.ts", "./GoldPowerItemControl.ts", "./Joystick.ts", "./LevelArenaControl.ts", "./LevelControl.ts", "./MagneticCircleControl.ts", "./NewBossEgg.ts", "./NewPlayerMoveControl.ts", "./PistolControl.ts", "./PlayerBulletBase.ts", "./PlayerBulletControl.ts", "./PlayerControl.ts", "./PlayerDrugControl.ts", "./ShotgunBulletControl.ts", "./ShotgunControl.ts", "./SignalgunBulletControl.ts", "./SignalgunControl.ts", "./SkillBaseControl.ts", "./SwellBossControl.ts", "./TaskColliderControl.ts", "./TaskMgr.ts", "./TentacleItemControl.ts", "./TouchColliderControl.ts", "./TouchMoveTipsControl.ts", "./TouchSceenControl.ts", "./WeaponBulletControl.ts", "./WeaponControlBase.ts", "./InfoMgr.ts", "./LoadingBundlePanel.ts", "./UIBoxQuestionPanel.ts", "./UIDeadPanel.ts", "./UIDrugPanel.ts", "./UIGamePanelBase.ts", "./UINodeGoldPowerPanel.ts", "./UISetPanel.ts", "./UIUnlockPanel.ts", "./passLevelPanel.ts", "./UIBagPanel.ts", "./UIGameView.ts", "./UILoadingView.ts", "./UIStartView.ts"], (function () {
    "use strict";
    return {
        setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        execute: function () {}
    }
}));

System.register("chunks:///_virtual/NewBossEgg.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./UIViewMgr.ts", "./UIGameView.ts", "./BossControlBase.ts", "./FinalBossBase.ts"], (function (e) {
    "use strict";
    var t, i, s, a, n, r, o, c, g, l, p, u, w, m, f;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, i = e.inheritsLoose, s = e.initializerDefineProperty, a = e.assertThisInitialized
        }, function (e) {
            n = e.cclegacy, r = e._decorator, o = e.CCFloat, c = e.instantiate, g = e.Component
        }, function (e) {
            l = e.UIViewMgr, p = e.UIViewConfig
        }, function (e) {
            u = e.UIGameView, w = e.GameState
        }, function (e) {
            m = e.BossInitiativeSkill
        }, function (e) {
            f = e.FinalBossBase
        }],
        execute: function () {
            var h, B, d, v, y, V, b;
            n._RF.push({}, "9269ezMBNdKwK3Xb7vFpr2V", "NewBossEgg", void 0);
            var C = r.ccclass,
                I = r.property;
            e("NewBossEgg", (h = C("NewBossEgg"), B = I({
                type: o,
                displayName: "蛋孵化的时间"
            }), d = I({
                type: o,
                displayName: "蛋的生命值"
            }), h((V = t((y = function (e) {
                function t() {
                    for (var t, i = arguments.length, n = new Array(i), r = 0; r < i; r++) n[r] = arguments[r];
                    return t = e.call.apply(e, [this].concat(n)) || this, s(t, "createTime", V, a(t)), s(t, "eggHp", b, a(t)), t.nowEggHp = 0, t.gameView = void 0, t.startCreate = !1, t.createTimer = 0, t
                }
                i(t, e);
                var n = t.prototype;
                return n.start = function () {
                    this.gameView = l.Instance.GetView(p.UIGameView).getComponent(u), this.startCreate = !0, this.nowEggHp = this.eggHp
                }, n.update = function (e) {
                    this.gameView.getNowGameState == w.playing && this.startCreate && (this.createTimer += e, this.createTimer > this.createTime && this.createNewBoss())
                }, n.createNewBoss = function () {
                    var e = this.gameView.getLevelBoss();
                    if (e) {
                        var t = c(e.node);
                        t.setParent(e.node.parent), t.setWorldPosition(this.node.getWorldPosition());
                        var i = t.getComponent(f);
                        i.initBoss(this.gameView), i.bossInitMoveSpeed = e.bossInitMoveSpeed, i.bossInitAtk = e.bossAtk, i.initiativeSkill = [m.闪电五连鞭], i.startRage(), i.isEggCreateBoss = !0, this.startCreate = !1, this.node.active = !1
                    }
                }, n.getHurtByPlayer = function (e) {}, t
            }(g)).prototype, "createTime", [B], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 60
                }
            }), b = t(y.prototype, "eggHp", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 600
                }
            }), v = y)) || v));
            n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/NewPlayerMoveControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./CommonTipsMgr.ts", "./GameConfig.ts", "./LYCSDKEventHelper.ts", "./ResMgr.ts", "./TimeControl.ts", "./GameTools.ts", "./UITools.ts", "./UIControl.ts", "./UIViewMgr.ts", "./AStarMgr.ts", "./UIGameView.ts", "./BoxControl.ts", "./DankeAnimControl.ts", "./DoorSwitchControl.ts", "./PlayerControl.ts", "./PlayerDrugControl.ts", "./TouchSceenControl.ts", "./WeaponBulletControl.ts", "./WeaponControlBase.ts", "./SoundMgr.ts"], (function (e) {
    "use strict";
    var t, n, o, i, a, r, s, l, d, h, c, g, p, m, y, u, w, P, k, A, B, f, T, C, N, v, H, S, b, W, I, D, V, L, R, G, _, E, O, x, M, z, U, F, j, X, K, Y, Z, Q;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, n = e.initializerDefineProperty, o = e.inheritsLoose, i = e.assertThisInitialized, a = e.createClass
        }, function (e) {
            r = e.cclegacy, s = e._decorator, l = e.Node, d = e.dragonBones, h = e.Sprite, c = e.Animation, g = e.Vec2, p = e.Vec3, m = e.UITransform, y = e.Collider2D, u = e.Contact2DType, w = e.instantiate, P = e.tween, k = e.Size, A = e.Component
        }, function (e) {
            B = e.CommonTipsMgr
        }, function (e) {
            f = e.GameConfig, T = e.NewHandStep, C = e.TaskConfig
        }, function (e) {
            N = e.LYCSDKEventHelper, v = e.EventConfig
        }, function (e) {
            H = e.ResMgr
        }, function (e) {
            S = e.TimeControl
        }, function (e) {
            b = e.GameTools
        }, function (e) {
            W = e.UITools
        }, function (e) {
            I = e.UIControl
        }, function (e) {
            D = e.UIViewMgr, V = e.UIViewConfig
        }, function (e) {
            L = e.AStarMgr
        }, function (e) {
            R = e.PlayerHandType, G = e.UIGameView, _ = e.GameState, E = e.ColliderTagConfig
        }, function (e) {
            O = e.BoxControl, x = e.BoxType
        }, function (e) {
            M = e.DankeAnimControl
        }, function (e) {
            z = e.DoorSwitchControl
        }, function (e) {
            U = e.PlayerActionType
        }, function (e) {
            F = e.PlayerDrugControl
        }, function (e) {
            j = e.TouchSceenControl
        }, function (e) {
            X = e.WeaponBulletControl
        }, function (e) {
            K = e.WeaponControlBase, Y = e.WeaponType, Z = e.WeaponPrefabConfig
        }, function (e) {
            Q = e.SoundMgr
        }],
        execute: function () {
            var q, J, $, ee, te, ne, oe, ie, ae, re, se, le, de, he, ce, ge, pe, me, ye, ue, we, Pe, ke, Ae, Be, fe, Te, Ce, Ne, ve, He, Se, be, We, Ie, De, Ve, Le, Re, Ge, _e, Ee;
            r._RF.push({}, "cb9easFkglPRaxaiMQiiNcM", "NewPlayerMoveControl", void 0);
            var Oe = s.ccclass,
                xe = s.property,
                Me = function () {
                    this.blockVec2 = void 0, this.lineAngle = 999
                },
                ze = function () {
                    this.blockWp = void 0, this.roadLen = void 0
                },
                Ue = e("TouchWallDirData", (function () {
                    this.isLockXLarge = !1, this.isLockXShrink = !1, this.isLockYLarge = !1, this.isLockYShrink = !1
                })),
                Fe = (e("PlayerSaveInLevelData", (function () {
                    this.unlockWeaponArr = [], this.bagBulletArr = [], this.weaponBulletDic = {}, this.helpDrugCount = 0, this.nowUseWeapon = null
                })), e("PlayHandBodyData", (q = Oe("PlayHandBodyData"), J = xe({
                    type: l
                }), $ = xe({
                    type: l
                }), ee = xe({
                    type: l
                }), te = xe({
                    type: l
                }), ne = xe({
                    type: l,
                    displayName: "玩家背部"
                }), q((ae = t((ie = function () {
                    n(this, "playerArm", ae, this), n(this, "playerHand", re, this), n(this, "armBottomHandNode", se, this), n(this, "findRoadArm", le, this), n(this, "backNode", de, this)
                }).prototype, "playerArm", [J], {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    initializer: null
                }), re = t(ie.prototype, "playerHand", [$], {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    initializer: null
                }), se = t(ie.prototype, "armBottomHandNode", [ee], {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    initializer: null
                }), le = t(ie.prototype, "findRoadArm", [te], {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    initializer: null
                }), de = t(ie.prototype, "backNode", [ne], {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    initializer: null
                }), oe = ie)) || oe)));
            e("NewPlayerMoveControl", (he = Oe("NewPlayerMoveControl"), ce = xe({
                type: l
            }), ge = xe({
                type: j
            }), pe = xe({
                type: Fe,
                displayName: "手臂的各个皮肤0==普通,1==绿巨人,2==麒麟臂,3==路飞"
            }), me = xe({
                type: l
            }), ye = xe({
                type: l
            }), ue = xe({
                type: l
            }), we = xe({
                type: d.ArmatureDisplay
            }), Pe = xe({
                type: l
            }), ke = xe({
                type: h
            }), Ae = xe({
                type: l
            }), Be = xe({
                type: l
            }), fe = xe({
                type: l
            }), Te = xe({
                type: c
            }), he((ve = t((Ne = function (e) {
                function t() {
                    for (var t, o = arguments.length, a = new Array(o), r = 0; r < o; r++) a[r] = arguments[r];
                    return t = e.call.apply(e, [this].concat(a)) || this, n(t, "playerBody", ve, i(t)), n(t, "touchNode", He, i(t)), n(t, "handBodyDataArr", Se, i(t)), n(t, "playerHeadNode", be, i(t)), n(t, "playerFootNode", We, i(t)), n(t, "playerBodyNode", Ie, i(t)), n(t, "deadArmAnim", De, i(t)), t.handOffsetDic = {}, t.playerArm = void 0, t.armTop = void 0, t.armBottom = void 0, t.playerHand = void 0, t.armBottomHandNode = void 0, t.playerArmHandNode = void 0, t.findRoadArm = void 0, t.checkRoadNode = void 0, n(t, "lufeiArmTopEndNode", Ve, i(t)), t.handArmOffset = void 0, t.initArmPosArr = [], t.initArmBottomPosArr = [], t.handArmRadiusArr = [], t.PlayerBodyCollider = void 0, t.PlayerHandCollider = void 0, n(t, "nowUseWeaponImg", Le, i(t)), n(t, "TempShowBlock", Re, i(t)), t.playerNodeTrans = void 0, t.nowPlayHandType = R.无, t.playerPosZ = void 0, n(t, "bodyBoder", Ge, i(t)), n(t, "warnTipsNode", _e, i(t)), n(t, "beAtkAnim", Ee, i(t)), t.lastTouchPos = void 0, t.tempShowBlockDic = {}, t.findRoadArmHandNode = void 0, t._playerStandBlock = void 0, t.wallBlockSpace = 0, t.showBlockV2 = void 0, t.gameView = void 0, t.eatDrugTimer = 0, t.eatDrugTime = 0, t.playerAction = U.静止, t._isSkating = !1, t.skatingSpeed = g.ZERO, t.lastSkatingBodyPos = void 0, t.bodyChildPosArr = [], t.lastBodyWPos = void 0, t.roadPointIndex = 0, t.armRoadPath = [], t.nowArmLine = void 0, t.nowArmLineTrans = void 0, t.armLineDic = {}, t.walkBlockWp = [], t.isShowLongArmAnim = !1, t.armAnimTime = .05, t.playerAnimTime = .35, t.armLocalPos = p.ZERO, t.armAngle = 0, t.handLocalPos = p.ZERO, t.handAngle = 0, t.lastPointData = void 0, t
                }
                o(t, e);
                var r = t.prototype;
                return r.changePlayerAction = function (e) {
                    this.playerAction = e, this.changePlayerHand()
                }, r.start = function () {
                    var e = this;
                    this.gameView = D.Instance.GetView(V.UIGameView).getComponent(G), this.playerNodeTrans = this.node.getComponent(m), this.playerPosZ = this.playerBody.getWorldPosition().z, this.PlayerBodyCollider = this.playerBody.getComponent(y), this.PlayerBodyCollider.on(u.BEGIN_CONTACT, this.onBeginBodyContact, this);
                    for (var t = 0; t < this.handBodyDataArr.length; t++) {
                        var n = this.handBodyDataArr[t],
                            o = n.playerArm.getChildByName("ArmBottom").getPosition(),
                            i = n.playerArm.getPosition();
                        this.initArmBottomPosArr.push(o), this.initArmPosArr.push(i);
                        var a = n.playerArm.getChildByName("HandNode").getPosition();
                        this.handArmRadiusArr.push(b.Instance.GetPointsDistance(p.ZERO, a))
                    }
                    this.TempShowBlock = this.node.getChildByName("TempShowBlock");
                    for (var r = 0; r < this.node.children.length; r++) {
                        var s = this.node.children[r];
                        this.bodyChildPosArr.push(s.getPosition())
                    }
                    N.instance.on(v.helpFinishGuide, (function () {
                        f.Instance.helpClickObj && (f.Instance.touchNewHandCollider == T.TEACH_CLOSE_DOOR ? e.guideHelpCloseDoor(f.Instance.helpClickObj.getComponent(z)) : f.Instance.touchNewHandCollider == T.TEACH_GET_WEAPON ? e.guideHelpGetWeapon(f.Instance.helpClickObj.getComponent(K)) : f.Instance.touchNewHandCollider == T.TEACH_GET_BULLET ? e.guideHelpGetBullet(f.Instance.helpClickObj.getComponent(X)) : f.Instance.touchNewHandCollider == T.TEACH_TAKE_XINHAO && (e.guideHelpGetWeapon(f.Instance.helpClickObj.getComponent(K)), e.guideHelpGetBullet(f.Instance.helpClickObj1.getComponent(X))), f.Instance.touchNewHandCollider = null, f.Instance.helpClickObj = null, f.Instance.helpClickObj1 = null)
                    }))
                }, r.update = function (e) {
                    if (this.nowPlayHandType != R.无 && (this.eatDrugTimer += e, this.eatDrugTimer >= this.eatDrugTime && this.finishDrugTime()), this._isSkating && this.gameView.getNowGameState == _.playing)
                        if (this.nowPlayHandType == R.麒麟臂)
                            if (this.checkBodySkatingTouchWall()) this.stopSkating();
                            else {
                                var t = this.playerBody.getPosition(),
                                    n = this.playerArm.getPosition(),
                                    o = this.playerHand.getPosition();
                                this.playerBody.setPosition(new p(t.x + this.skatingSpeed.x, t.y + this.skatingSpeed.y)), this.playerArm.setPosition(new p(n.x + this.skatingSpeed.x, n.y + this.skatingSpeed.y)), this.playerHand.setPosition(new p(o.x + this.skatingSpeed.x, o.y + this.skatingSpeed.y)), b.Instance.GetPointsDistance(t, this.lastSkatingBodyPos) > this.gameView.blockSize.width && this.updatePlayerStandBlock()
                            }
                    else this.nowPlayHandType, R.绿巨人
                }, r.refreshHandCollider = function () {
                    var e = this;
                    this.PlayerHandCollider.enabled = !1, S.Instance.DelayToDo((function () {
                        e.PlayerHandCollider.enabled = !0
                    }), this)
                }, r.onDownPlayerHand = function () {
                    this.PlayerHandCollider.enabled || (this.PlayerHandCollider.enabled = !0)
                }, r.onEndPlayerHand = function () {
                    this.PlayerHandCollider.enabled = !1
                }, r.onBeginBodyContact = function (e, t, n) {
                    t.tag == E.PassDoor && (this.touchNode.playerReleaseTouch(), this.gameView.winGame(), f.Instance.touchTaskStep <= C.FIND_PASS_DOOR && (f.Instance.touchTaskStep = C.FINISH_TASK, this.gameView.getGameTaskMgr.finishTask(null)))
                }, r.guideHelpCloseDoor = function (e) {
                    e.changeDoor((function () {
                        N.instance.sendMes(v.PlayChangeDoorSwitch)
                    }), (function () {
                        N.instance.sendMes(v.PlayChangeDoorSwitch)
                    })), f.Instance.newHandStep == T.TEACH_CLOSE_DOOR && (N.instance.sendMes(v.hideGuidePanel), f.Instance.newHandStep = T.TEACH_GET_WEAPON, N.instance.sendMes(v.hideTouchTips), f.Instance.touchTaskStep <= C.CLOSE_DOOR && this.gameView.getGameTaskMgr.finishTask(C.FIND_WEAPON))
                }, r.guideHelpGetWeapon = function (e) {
                    f.Instance.pushUnlockWeaponToLocal(e), e.node.active = !1, this.gameView.getWeapon(e.weaponType), e.weaponType == Y.手枪 && f.Instance.newHandStep == T.TEACH_GET_WEAPON && (N.instance.sendMes(v.hideGuidePanel), f.Instance.newHandStep = T.TEACH_GET_BULLET), this.changeWeapon(), f.Instance.touchTaskStep <= C.FIND_WEAPON && this.gameView.getGameTaskMgr.finishTask(C.FIND_BULLET)
                }, r.guideHelpGetBullet = function (e) {
                    f.Instance.pushBulletToBag(e.bulletType, e.bulletCount, (function () {
                        e.node.active = !1
                    })), f.Instance.newHandStep == T.TEACH_GET_BULLET ? (f.Instance.newHandStep = T.TEACH_OPEN_BAG, this.gameView.showGuideClickBagBtn()) : f.Instance.newHandStep == T.TEACH_TAKE_XINHAO && (f.Instance.newHandStep = T.TEACH_OPEN_BAG_2, N.instance.sendMes(v.hideGuidePanel), this.gameView.showGuideClickBagBtn(), f.Instance.newHandStep = T.TEACH_CHOOSE_WEAPON, f.Instance.touchTaskStep <= C.GET_XINHAO && D.Instance.getGameView().getGameTaskMgr.finishTask(null)), f.Instance.touchTaskStep <= C.FIND_BULLET && this.gameView.getGameTaskMgr.finishTask(null)
                }, r.onBeginContact = function (e, t, n) {
                    if (console.log("onBeginContact"), this.gameView.getNowGameState == _.playing)
                        if (t.tag == E.DoorSwitch) {
                            var o = t.getComponent(z);
                            this.guideHelpCloseDoor(o)
                        } else if (t.tag == E.PlayerDrug) {
                        var i = t.getComponent(F);
                        this.gameView.pauseGame(), this.gameView.showUseHandDrugPanel(i)
                    } else if (t.tag == E.Weapon) {
                        var a = t.getComponent(K);
                        this.guideHelpGetWeapon(a)
                    } else if (t.tag == E.WeaponBullet) {
                        var r = t.getComponent(X);
                        this.guideHelpGetBullet(r)
                    } else if (t.tag == E.HelpDrug) f.Instance.haveDrugCount < f.Instance.maxDrugCount ? (f.Instance.haveDrugCount += 1, this.gameView.refreshHaveDrugCount(), t.node.active = !1) : B.Instance.ShowTips("药剂已满"), f.Instance.touchTaskStep <= C.GET_HELP_DRUG && "特殊治疗药剂" == t.node.name && this.gameView.getGameTaskMgr.finishTask(C.FIND_DRUG);
                    else if (t.tag == E.Box) {
                        var s = t.node.getComponent(O);
                        s.getIsOpen || (s.boxType == x.混合 ? (this.gameView.showBoxQuesPanel(s), this.onEndPlayerHand(), f.Instance.touchTaskStep <= C.ANSWER_QB && this.gameView.getGameTaskMgr.finishTask(null)) : s.boxOpen())
                    }
                }, r.useHandDrug = function (e) {
                    this.changeHandType(e.getDrugType), e.node.active = !1, this.eatDrugTime = e.drugDurTime, this.eatDrugTimer = 0
                }, r.finishDrugTime = function () {
                    this.changeHandType(R.无), this.eatDrugTimer = 0, this.stopSkating()
                }, r.changeHandType = function (e) {
                    var t = this.nowPlayHandType;
                    this.nowPlayHandType = e, this.gameView.refreshPlayerHandType();
                    for (var n = Number(this.nowPlayHandType), o = 0; o < this.handBodyDataArr.length; o++) {
                        var i = this.handBodyDataArr[o];
                        i.playerHand.active = i.playerArm.active = i.findRoadArm.active = n == o, i.backNode && (i.backNode.active = i.playerHand.active)
                    }
                    var a = this.handBodyDataArr[n];
                    this.playerArm = a.playerArm, this.armTop = this.playerArm.getChildByName("ArmTop"), this.armBottom = this.playerArm.getChildByName("ArmBottom"), this.playerHand = a.playerHand, this.armBottomHandNode = a.armBottomHandNode, this.playerArmHandNode = this.playerArm.getChildByName("HandNode"), this.findRoadArm = a.findRoadArm, this.findRoadArmHandNode = this.findRoadArm.getChildByName("HandNode"), this.checkRoadNode = this.findRoadArm.getChildByName("CheckRoadNode");
                    var r = this.findRoadArmHandNode.getComponent(m).contentSize,
                        s = this.handArmRadiusArr[this.nowPlayHandType] / r.width,
                        l = r.width / 2;
                    if (0 == this.checkRoadNode.children.length)
                        for (var d = 0; d < s; d++) {
                            var h = w(this.findRoadArmHandNode);
                            this.checkRoadNode.addChild(h), h.setPosition(new p(d * r.width + l, 0))
                        }
                    if (this.handOffsetDic[n] || (this.handOffsetDic[n] = this.playerHand.getPosition()), this.PlayerHandCollider && this.PlayerHandCollider.off(u.BEGIN_CONTACT), this.PlayerHandCollider = this.playerHand.getChildByName("HandCollider").getComponent(y), this.PlayerHandCollider.on(u.BEGIN_CONTACT, this.onBeginContact, this), t != this.nowPlayHandType) {
                        var c = this.handBodyDataArr[t],
                            g = c.playerArm,
                            P = (g.getChildByName("ArmTop"), g.getChildByName("ArmBottom"), c.playerHand, g.getChildByName("HandNode"), c.findRoadArm);
                        P.getChildByName("HandNode"), P.getChildByName("CheckRoadNode");
                        this.playerArm.setPosition(g.getPosition()), this.playerHand.setWorldPosition(this.playerArmHandNode.getWorldPosition()), this.findRoadArm.setPosition(P.getPosition())
                    }
                    this.changePlayerHand()
                }, r.initPlayerStandBlock = function (e) {
                    this.hideWarnTips(), this.deadArmAnim.node.active = !1;
                    for (var t = 0; t < this.bodyChildPosArr.length; t++) {
                        var n = this.bodyChildPosArr[t],
                            o = this.node.children[t];
                        o.setPosition(n), o.angle = 0
                    }
                    this.node.angle = 0, this._playerStandBlock = e, this.setPlayerWP(e.blockVec2, !1), this.gameView.ChangePlayerStandBlock(e), this.nowUseWeaponImg.node.active = f.Instance.unlockWeaponArr.length > 0, this.nowUseWeaponImg.node.active && (this.nowUseWeaponImg.spriteFrame = H.Instance.LoadSpriteFrame(Z.weaponImgNameArr[f.Instance.nowUseWeapon])), this.changeHandType(R.无), this.changePlayerAction(U.静止)
                }, r.changeWeapon = function () {
                    this.nowUseWeaponImg.node.active = f.Instance.unlockWeaponArr.length > 0, this.nowUseWeaponImg.spriteFrame = H.Instance.LoadSpriteFrame(Z.weaponImgNameArr[f.Instance.nowUseWeapon]), this.refreshPlayerGunImg()
                }, r.updatePlayerStandBlock = function () {
                    var e = this.getPlayerBodyWp,
                        t = this.gameView.getBlockVec2ByWorldPos(e),
                        n = this.gameView.getOneGameBlock(t);
                    this.gameView.isBlockCanWalk(t) ? this._playerStandBlock = n : this.isSkating && this.stopSkating(), this.gameView.refreshFog()
                }, r.updatePlayerStandBlockV2 = function (e) {
                    this._playerStandBlock.blockVec2 = e, this.gameView.refreshFog()
                }, r.setPlayerWP = function (e, t) {
                    void 0 === t && (t = !0);
                    var n = this.gameView.getBlockWorldPos(e);
                    t ? P(this.node).to(.2, {
                        worldPosition: n
                    }).call((function () {
                        34 == e.x && 33 == e.y && B.Instance.ShowTips("通关啦！！！", V.UIGameView)
                    })).start() : this.node.setWorldPosition(n)
                }, r.checkRoad = function () {
                    for (var e = this.checkRoadNode.children, t = e[0].getWorldPosition(), n = 0; n < e.length; n++) {
                        var o = e[n];
                        if (!(o.position.x < this.findRoadArmHandNode.position.x)) break;
                        var i = o.worldPosition;
                        if (!this.gameView.isBlockCanWalk(this.gameView.getBlockVec2ByWorldPos(i))) break;
                        t = e[n].getWorldPosition()
                    }
                    return t
                }, r.refreshCheckArmPos = function () {
                    this.findRoadArm.position = this.playerArm.position, this.findRoadArm.angle = this.playerArm.angle
                }, r.isRoad = function (e) {
                    var t = this.playerNodeTrans.convertToWorldSpaceAR(e),
                        n = this.gameView.getBlockVec2ByWorldPos(t);
                    return this.gameView.isBlockCanWalk(n)
                }, r.checkBodySkatingTouchWall = function () {
                    for (var e = this.bodyBoder.children, t = 0; t < e.length; t++) {
                        var n = e[t].worldPosition,
                            o = this.gameView.getBlockVec2ByWorldPos(n),
                            i = this.gameView.getBlockWorldPos(o);
                        if (!this.gameView.isBlockCanWalk(o)) return console.log("roadBlockWp:" + i + ",boderWp:" + n), console.log("身体边界触发器" + t + "已进入不可行走区域"), this.TempShowBlock || (this.TempShowBlock = this.node.getChildByName("TempShowBlock"), this.TempShowBlock.setParent(this.gameView.getLevelPrefab.node)), this.TempShowBlock.setWorldPosition(i), !0
                    }
                    return !1
                }, r.updateBodyPos = function (e) {
                    this.playerBody.setPosition(e), this.lastBodyWPos = this.getPlayerBodyWp
                }, r.checkBodyBoderPointIsTouchWall = function () {
                    for (var e = this.bodyBoder.children, t = new Ue, n = 0; n < e.length; n++) {
                        var o = e[n].worldPosition,
                            i = this.gameView.getBlockVec2ByWorldPos(o);
                        this.gameView.getBlockWorldPos(i);
                        this.gameView.isBlockCanWalk(i) ? (i.y < this.getStandBlock.blockVec2.y ? t.isLockYLarge = !1 : i.y > this.getStandBlock.blockVec2.y && (t.isLockYShrink = !1), i.x < this.getStandBlock.blockVec2.x ? t.isLockXShrink = !1 : i.x > this.getStandBlock.blockVec2.x && (t.isLockXLarge = !1)) : (i.y < this.getStandBlock.blockVec2.y ? t.isLockYLarge = !0 : i.y > this.getStandBlock.blockVec2.y && (t.isLockYShrink = !0), i.x < this.getStandBlock.blockVec2.x ? t.isLockXShrink = !0 : i.x > this.getStandBlock.blockVec2.x && (t.isLockXLarge = !0))
                    }
                    return t
                }, r.changePlayerHand = function () {
                    var e = this.armBottomHandNode.getChildByName("HandImg").getComponent(h),
                        t = this.getnowPlayHandType + 1;
                    if (e.spriteFrame = H.Instance.LoadSpriteFrame(t + "_shou" + this.playerAction), this.playerAction == U.掏枪)
                        for (var n = 0; n < 3; n++) {
                            this.armBottomHandNode.getChildByName("wp_" + (n + 1) + "Node").active = f.Instance.nowUseWeapon == n
                        } else
                            for (var o = 0; o < 3; o++) {
                                this.armBottomHandNode.getChildByName("wp_" + (o + 1) + "Node").active = !1
                            }
                }, r.refreshPlayerGunImg = function () {
                    if (this.playerAction == U.掏枪)
                        for (var e = 0; e < 3; e++) {
                            this.armBottomHandNode.getChildByName("wp_" + (e + 1) + "Node").active = f.Instance.nowUseWeapon == e
                        }
                }, r.shotWeapon = function (e) {
                    var t, n = "wp_" + (f.Instance.nowUseWeapon + 1) + "Node",
                        o = this.armBottomHandNode.getChildByName(n),
                        i = o.getChildByName("shotNode"),
                        a = o.getChildByName("shotAnimNode");
                    switch (e.shotWeapon.weaponType) {
                        case Y.手枪:
                        case Y.霰弹枪:
                            t = a;
                            break;
                        case Y.信号枪:
                            t = i, Q.Instance.play("闪光枪开枪", !0)
                    }
                    var r = o.getChildByName("dankeNode");
                    this.gameView.getDankeNode.getComponent(M).showDankeAnim(r);
                    var s = t.getWorldPosition(),
                        l = t.getWorldRotation(),
                        d = this.gameView.getGunAnimNode;
                    d.active = !0, d.setWorldPosition(s), d.setWorldRotation(l);
                    var h = d.getChildByName("gunAnim").getComponent(c);
                    h.play(), h.on(c.EventType.FINISHED, (function () {
                        d.active = !1
                    }));
                    var g = i.getWorldPosition(),
                        p = i.getWorldRotation();
                    e.node.setWorldPosition(g), e.node.setWorldRotation(p), e.shotBullet()
                }, r.shotBulletNoFly = function (e, t) {
                    var n, o = "wp_" + (f.Instance.nowUseWeapon + 1) + "Node",
                        i = this.armBottomHandNode.getChildByName(o),
                        a = i.getChildByName("shotNode"),
                        r = i.getChildByName("shotAnimNode");
                    switch (e.shotWeapon.weaponType) {
                        case Y.手枪:
                        case Y.霰弹枪:
                            n = r;
                            break;
                        case Y.信号枪:
                            n = a
                    }
                    var s = i.getChildByName("dankeNode");
                    this.gameView.getDankeNode.getComponent(M).showDankeAnim(s);
                    var l = n.getWorldPosition(),
                        d = n.getWorldRotation(),
                        h = this.gameView.getGunAnimNode;
                    h.active = !0, h.setWorldPosition(l), h.setWorldRotation(d);
                    var g = h.getChildByName("gunAnim").getComponent(c);
                    g.play(), g.on(c.EventType.FINISHED, (function () {
                        h.active = !1
                    })), e.justKillBoss(e.shotWeapon, t)
                }, r.playerSkating = function (e) {
                    e && (this._isSkating = !0, this.skatingSpeed = e.normalize().multiplyScalar(-this.gameView.PlayerSkatingMoveSpeed), this.lastSkatingBodyPos = this.playerBody.getPosition())
                }, r.stopSkating = function () {
                    this._isSkating = !1
                }, r.showWarnTips = function () {
                    var e = this.playerBody.getPosition();
                    this.warnTipsNode.setPosition(new p(e.x, e.y + 80)), this.warnTipsNode.active = !0
                }, r.hideWarnTips = function () {
                    this.warnTipsNode.active = !1
                }, r.showLongArm = function (e) {
                    if (!this.isShowLongArmAnim) {
                        this.armLineDic = {}, this.walkBlockWp = [];
                        var t = this.gameView.getGameCamera.node.getPosition(),
                            n = W.Instance.GetLevelNodeWorldPos(e, I.instance.node, new g(t.x, t.y), this.playerBody.getWorldPosition().z),
                            o = this.gameView.getBlockVec2ByWorldPos(n);
                        if (!this.gameView.isBlockCanWalk(o)) o = this.gameView.getNearPlayerStandBlock(o).blockVec2;
                        n = this.gameView.getBlockWorldPos(o), this.gameView.testArm.node.setWorldPosition(n), this.lastPointData = new Me, this.lastPointData.blockVec2 = this.getStandBlock.blockVec2, this.armRoadPath = L.ins.findPath(this.getStandBlock.blockVec2, o, 0, !1), this.roadPointIndex = 1, this.showLongAnim()
                    }
                }, r.showLongAnim = function (e) {
                    var t = this;
                    void 0 === e && (e = this.armAnimTime);
                    var n = this.lastPointData.blockVec2,
                        o = this.gameView.getBlockWorldPos(n),
                        i = this.armRoadPath[this.roadPointIndex],
                        a = this.gameView.getBlockWorldPos(i),
                        r = i.x - n.x,
                        s = n.y - i.y,
                        l = new g(r, s),
                        d = Math.atan2(l.y, l.x),
                        h = Math.floor(d / Math.PI * 180) + 0,
                        c = this.lastPointData.lineAngle;
                    999 != c && this.lastPointData.lineAngle == h || (c = h, this.nowArmLine = this.getLongArmPrefab, this.nowArmLineTrans = this.nowArmLine.getComponent(m), this.nowArmLineTrans.setContentSize(new k(0, this.nowArmLineTrans.contentSize.height)), this.nowArmLine.setWorldPosition(this.gameView.getBlockWorldPos(n)), this.nowArmLine.angle = c, this.armLineDic[this.gameView.GameBlockKey(n)] = this.nowArmLineTrans);
                    var y = this.nowArmLineTrans.contentSize,
                        u = b.Instance.GetWorldPointsDistance(a, o),
                        w = new ze;
                    w.blockWp = a, w.roadLen = u, this.walkBlockWp.push(w), P(this.nowArmLineTrans).to(e, {
                        contentSize: new k(y.width + u + 5, y.height)
                    }).call((function () {
                        t.lastPointData.lineAngle = c, t.lastPointData.blockVec2 = i, t.roadPointIndex += 1, t.roadPointIndex < t.armRoadPath.length ? t.roadPointIndex < 4 ? t.showLongAnim() : t.showLongAnim(0) : S.Instance.DelayToDo((function () {
                            var e = t.nowArmLineTrans.node.getChildByName("endNode");
                            e.setPosition(new p(t.nowArmLineTrans.contentSize.width, 0)), t.playerHand.setWorldPosition(e.getWorldPosition()), t.playerHand.angle = t.nowArmLineTrans.node.angle;
                            t.playerHand.getPosition();
                            var n = t.handOffsetDic[t.nowPlayHandType],
                                o = new p(-n.x, -n.y);
                            t.playerArm.setWorldPosition(t.playerHand.getComponent(m).convertToWorldSpaceAR(o)), t.playerArm.angle = t.playerHand.angle, t.nowArmLineTrans = null, t.roadPointIndex = 1, t.playerMoveToTargetPoint()
                        }), t, .1)
                    })).start()
                }, r.playerMoveToTargetPoint = function (e) {
                    var t = this;
                    void 0 === e && (e = this.playerAnimTime);
                    var n = this.walkBlockWp[this.roadPointIndex - 1],
                        o = this.getStandBlock.blockVec2,
                        i = new g(this.armRoadPath[this.roadPointIndex]),
                        a = this.armLineDic[this.gameView.GameBlockKey(o)];
                    a && (this.nowArmLineTrans && this.nowArmLineTrans.setContentSize(new k(0, this.nowArmLineTrans.contentSize.height)), this.nowArmLineTrans = a), this.playerBody.angle = this.nowArmLineTrans.node.angle - 90;
                    var r, s = new k(this.nowArmLineTrans.contentSize.width - n.roadLen, this.nowArmLineTrans.contentSize.height);
                    r = this.roadPointIndex == this.armRoadPath.length - 1 ? this.playerArm.getWorldPosition() : n.blockWp, P(this.nowArmLineTrans.node).to(e - .1, {
                        worldPosition: n.blockWp
                    }).start(), P(this.nowArmLineTrans).to(e - .1, {
                        contentSize: s
                    }).start(), P(this.playerBody).to(e, {
                        worldPosition: r
                    }).call((function () {
                        t.updatePlayerStandBlockV2(i), t.roadPointIndex += 1, t.roadPointIndex < t.armRoadPath.length ? t.playerMoveToTargetPoint() : (t.isShowLongArmAnim = !1, t.hideRoadArm())
                    })).start()
                }, r.hideRoadArm = function () {
                    for (var e = this.gameView.longArmNode.children, t = 0; t < e.length; t++) {
                        e[t].active = !1
                    }
                }, r.playerRecover = function () {
                    this.hideWarnTips(), this.changePlayerAction(U.静止), this.playerArm.active = !0, this.deadArmAnim.node.active = !1, this.PlayerBodyCollider.enabled = !0
                }, r.playerBeAtk = function () {
                    Q.Instance.play("人物受击"), this.beAtkAnim.play()
                }, r.playerDead = function () {
                    this.PlayerBodyCollider.enabled = !1, this.playerArm.active = !1, this.deadArmAnim.node.active = !0, this.deadArmAnim.playAnimation("siwang", 1)
                }, a(t, [{
                    key: "getPlayerHandColliderNode",
                    get: function () {
                        return this.PlayerHandCollider.node
                    }
                }, {
                    key: "getPlayerNodeTrans",
                    get: function () {
                        return this.playerNodeTrans
                    }
                }, {
                    key: "getnowPlayHandType",
                    get: function () {
                        return this.nowPlayHandType
                    }
                }, {
                    key: "getStandBlock",
                    get: function () {
                        return this._playerStandBlock
                    }
                }, {
                    key: "getPlayerAction",
                    get: function () {
                        return this.playerAction
                    }
                }, {
                    key: "isSkating",
                    get: function () {
                        return this._isSkating
                    }
                }, {
                    key: "getPlayerBodyWp",
                    get: function () {
                        return this.playerBodyNode.getWorldPosition()
                    }
                }, {
                    key: "getPlayerBodyWr",
                    get: function () {
                        return this.playerBodyNode.getWorldRotation()
                    }
                }, {
                    key: "getLongArmPrefab",
                    get: function () {
                        for (var e = this.gameView.longArmNode.children, t = 0; t < e.length; t++) {
                            var n = e[t];
                            if (!n.active) return n.active = !0, n
                        }
                        var o = w(this.gameView.testArm.node);
                        return o.setParent(this.gameView.longArmNode), o
                    }
                }, {
                    key: "isPlayerDead",
                    get: function () {
                        return !this.PlayerBodyCollider.enabled
                    }
                }]), t
            }(A)).prototype, "playerBody", [ce], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), He = t(Ne.prototype, "touchNode", [ge], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Se = t(Ne.prototype, "handBodyDataArr", [pe], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return []
                }
            }), be = t(Ne.prototype, "playerHeadNode", [me], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), We = t(Ne.prototype, "playerFootNode", [ye], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Ie = t(Ne.prototype, "playerBodyNode", [ue], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), De = t(Ne.prototype, "deadArmAnim", [we], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Ve = t(Ne.prototype, "lufeiArmTopEndNode", [Pe], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Le = t(Ne.prototype, "nowUseWeaponImg", [ke], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Re = t(Ne.prototype, "TempShowBlock", [Ae], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Ge = t(Ne.prototype, "bodyBoder", [Be], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), _e = t(Ne.prototype, "warnTipsNode", [fe], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Ee = t(Ne.prototype, "beAtkAnim", [Te], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Ce = Ne)) || Ce));
            r._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/NoADSDKControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LYCSDKEventHelper.ts", "./BaseSDKControl.ts"], (function (n) {
    "use strict";
    var t, e, o, s, c, r, i;
    return {
        setters: [function (n) {
            t = n.inheritsLoose, e = n.createClass
        }, function (n) {
            o = n.cclegacy, s = n._decorator
        }, function (n) {
            c = n.LYCSDKEventHelper, r = n.EventConfig
        }, function (n) {
            i = n.BaseSDKControl
        }],
        execute: function () {
            var a, l;
            o._RF.push({}, "e9ca7AWVj9ML4ZooYjred8J", "NoADSDKControl", void 0);
            var u = s.ccclass;
            s.property, n("NoADSDKControl", u("NoADSDKControl")(((l = function (n) {
                function o() {
                    for (var t, e = arguments.length, o = new Array(e), s = 0; s < e; s++) o[s] = arguments[s];
                    return (t = n.call.apply(n, [this].concat(o)) || this).UserIndex = 12, t
                }
                t(o, n);
                var s = o.prototype;
                return s.start = function () {}, s.update = function (n) {}, s.GetPlatformSDK = function () {
                    return o.Instance
                }, s.LoginPlatform = function () {
                    this.UserInfoCallBack.thirdId = "4cd6b787-d32b-4574-b495-5f0cae1d55a9:" + this.UserIndex, c.instance.sendMes(r.LoginSucceed)
                }, s.GetUserInfo = function () {
                    this.UserInfoCallBack.province = "未知", this.UserInfoCallBack.city = "未知",
                     this.UserInfoCallBack.headIcon = "3033762272~300x300.image", 
                     this.UserInfoCallBack.nickName = "测试账号" + this.UserIndex, this.UserInfoCallBack.channel = "windows_test", c.instance.sendMes(r.GetUserInfo)
                }, s.AddShortcut = function () {}, e(o, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this._instance && (this._instance = new o), this._instance
                    }
                }]), o
            }(i))._instance = void 0, a = l)) || a);
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/Node.ts", ["cc"], (function (i) {
    "use strict";
    var t;
    return {
        setters: [function (i) {
            t = i.cclegacy
        }],
        execute: function () {
            t._RF.push({}, "6b737P5GX5FD6XkQ65xcNs9", "Node", void 0);
            i("aNode", (function (i, t, s) {
                this.specificPos = void 0, this.x = void 0, this.y = void 0, this.f = void 0, this.g = void 0, this.h = void 0, this.walkable = !1, this.parent = void 0, this.costMultiplier = 1, this.x = i, this.y = t, this.specificPos = s
            }));
            t._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/OppoAPKControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LYCSDKEventHelper.ts", "./BaseSDKControl.ts"], (function (n) {
    "use strict";
    var t, e, o, s, c, r, i;
    return {
        setters: [function (n) {
            t = n.inheritsLoose, e = n.createClass
        }, function (n) {
            o = n.cclegacy, s = n._decorator
        }, function (n) {
            c = n.LYCSDKEventHelper, r = n.EventConfig
        }, function (n) {
            i = n.BaseSDKControl
        }],
        execute: function () {
            var a, l;
            o._RF.push({}, "4f82db9yHRFqptuoQQ7Q2uc", "OppoAPKControl", void 0);
            var u = s.ccclass;
            s.property, n("OppoAPKControl", u("OppoAPKControl")(((l = function (n) {
                function o() {
                    for (var t, e = arguments.length, o = new Array(e), s = 0; s < e; s++) o[s] = arguments[s];
                    return (t = n.call.apply(n, [this].concat(o)) || this).UserIndex = 11, t
                }
                t(o, n);
                var s = o.prototype;
                return s.GetPlatformSDK = function () {
                    return o.Instance
                }, s.LoginPlatform = function () {
                    this.UserInfoCallBack.thirdId = "4cd6b787-d32b-4574-b495-5f0cae1d55a9:" + this.UserIndex, c.instance.sendMes(r.LoginSucceed)
                }, s.GetUserInfo = function () {
                    this.UserInfoCallBack.province = "未知", this.UserInfoCallBack.city = "未知",
                     this.UserInfoCallBack.headIcon = "3033762272~300x300.image",
                     
                     this.UserInfoCallBack.nickName = "测试账号" + this.UserIndex, this.UserInfoCallBack.channel = "windows_test", c.instance.sendMes(r.GetUserInfo)
                }, e(o, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this._instance && (this._instance = new o), this._instance
                    }
                }]), o
            }(i))._instance = void 0, a = l)) || a);
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/OppoSDKControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BaseSDKControl.ts", "./LYCSDK.ts", "./LYCSDKEventHelper.ts", "./GameTools.ts", "./LYCSDKHttp.ts", "./UIViewMgr.ts", "./CommonTipsMgr.ts"], (function (n) {
    "use strict";
    var t, e, o, r, c, a, s, i, u, l, f, p, g;
    return {
        setters: [function (n) {
            t = n.inheritsLoose, e = n.createClass
        }, function (n) {
            o = n.cclegacy, r = n._decorator
        }, function (n) {
            c = n.BaseSDKControl
        }, function (n) {
            a = n.LYCSDK
        }, function (n) {
            s = n.LYCSDKEventHelper, i = n.EventConfig
        }, function (n) {
            u = n.GameTools
        }, function (n) {
            l = n.LYCSDKHttp, f = n.SendType
        }, function (n) {
            p = n.UIViewConfig
        }, function (n) {
            g = n.CommonTipsMgr
        }],
        execute: function () {
            var S, m;
            o._RF.push({}, "6c4bbAe/5pKjIpvKR8vHUYO", "OppoSDKControl", void 0);
            var h = r.ccclass;
            r.property, n("OppoSDKControl", h("OppoSDKControl")(((m = function (n) {
                function o() {
                    for (var t, e = arguments.length, o = new Array(e), r = 0; r < e; r++) o[r] = arguments[r];
                    return (t = n.call.apply(n, [this].concat(o)) || this).timeStamp = 0, t
                }
                t(o, n);
                var r = o.prototype;
                return r.GetPlatformSDK = function () {
                    return window.qg
                }, r.LoginPlatform = function () {
                    var n = this,
                        t = "com.gzly.ndgjz.nearme.gamecenter";
                    this.GetPlatformSDK().login({
                        success: function (e) {
                            console.log(e), a.Instance.GameLog("---OppoController----login 调用成功", e.data.token), n.UserInfoCallBack.nickName = e.nickName, n.UserInfoCallBack.headIcon = e.avatar, n.UserInfoCallBack.thirdId = e.uid, n.timeStamp = e.time;
                            var o = "appKey={0}&appSecret={1}&pkgName={2}&timeStamp={3}&token={4}",
                                r = function (n, t) {
                                    function e(n, t) {
                                        return n << t | n >>> 32 - t
                                    }

                                    function o(n, t) {
                                        var e, o, r, c, a;
                                        return r = 2147483648 & n, c = 2147483648 & t, a = (1073741823 & n) + (1073741823 & t), (e = 1073741824 & n) & (o = 1073741824 & t) ? 2147483648 ^ a ^ r ^ c : e | o ? 1073741824 & a ? 3221225472 ^ a ^ r ^ c : 1073741824 ^ a ^ r ^ c : a ^ r ^ c
                                    }

                                    function r(n, t, e) {
                                        return n & t | ~n & e
                                    }

                                    function c(n, t, e) {
                                        return n & e | t & ~e
                                    }

                                    function a(n, t, e) {
                                        return n ^ t ^ e
                                    }

                                    function s(n, t, e) {
                                        return t ^ (n | ~e)
                                    }

                                    function i(n, t, c, a, s, i, u) {
                                        return n = o(n, o(o(r(t, c, a), s), u)), o(e(n, i), t)
                                    }

                                    function u(n, t, r, a, s, i, u) {
                                        return n = o(n, o(o(c(t, r, a), s), u)), o(e(n, i), t)
                                    }

                                    function l(n, t, r, c, s, i, u) {
                                        return n = o(n, o(o(a(t, r, c), s), u)), o(e(n, i), t)
                                    }

                                    function f(n, t, r, c, a, i, u) {
                                        return n = o(n, o(o(s(t, r, c), a), u)), o(e(n, i), t)
                                    }

                                    function p(n) {
                                        for (var t, e = n.length, o = e + 8, r = 16 * ((o - o % 64) / 64 + 1), c = Array(r - 1), a = 0, s = 0; s < e;) a = s % 4 * 8, c[t = (s - s % 4) / 4] = c[t] | n.charCodeAt(s) << a, s++;
                                        return a = s % 4 * 8, c[t = (s - s % 4) / 4] = c[t] | 128 << a, c[r - 2] = e << 3, c[r - 1] = e >>> 29, c
                                    }

                                    function g(n) {
                                        var t, e = "",
                                            o = "";
                                        for (t = 0; t <= 3; t++) e += (o = "0" + (n >>> 8 * t & 255).toString(16)).substr(o.length - 2, 2);
                                        return e
                                    }

                                    function S(n) {
                                        n = n.replace(/\r\n/g, "\n");
                                        for (var t = "", e = 0; e < n.length; e++) {
                                            var o = n.charCodeAt(e);
                                            o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128))
                                        }
                                        return t
                                    }
                                    var m, h, C, d, I, k, v, L, K, G = Array(),
                                        y = 7,
                                        D = 12,
                                        w = 17,
                                        B = 22,
                                        M = 5,
                                        U = 9,
                                        b = 14,
                                        A = 20,
                                        _ = 4,
                                        O = 11,
                                        P = 16,
                                        T = 23,
                                        Y = 6,
                                        H = 10,
                                        j = 15,
                                        N = 21;
                                    for (n = S(n), G = p(n), k = 1732584193, v = 4023233417, L = 2562383102, K = 271733878, m = 0; m < G.length; m += 16) h = k, C = v, d = L, I = K, k = i(k, v, L, K, G[m + 0], y, 3614090360), K = i(K, k, v, L, G[m + 1], D, 3905402710), L = i(L, K, k, v, G[m + 2], w, 606105819), v = i(v, L, K, k, G[m + 3], B, 3250441966), k = i(k, v, L, K, G[m + 4], y, 4118548399), K = i(K, k, v, L, G[m + 5], D, 1200080426), L = i(L, K, k, v, G[m + 6], w, 2821735955), v = i(v, L, K, k, G[m + 7], B, 4249261313), k = i(k, v, L, K, G[m + 8], y, 1770035416), K = i(K, k, v, L, G[m + 9], D, 2336552879), L = i(L, K, k, v, G[m + 10], w, 4294925233), v = i(v, L, K, k, G[m + 11], B, 2304563134), k = i(k, v, L, K, G[m + 12], y, 1804603682), K = i(K, k, v, L, G[m + 13], D, 4254626195), L = i(L, K, k, v, G[m + 14], w, 2792965006), k = u(k, v = i(v, L, K, k, G[m + 15], B, 1236535329), L, K, G[m + 1], M, 4129170786), K = u(K, k, v, L, G[m + 6], U, 3225465664), L = u(L, K, k, v, G[m + 11], b, 643717713), v = u(v, L, K, k, G[m + 0], A, 3921069994), k = u(k, v, L, K, G[m + 5], M, 3593408605), K = u(K, k, v, L, G[m + 10], U, 38016083), L = u(L, K, k, v, G[m + 15], b, 3634488961), v = u(v, L, K, k, G[m + 4], A, 3889429448), k = u(k, v, L, K, G[m + 9], M, 568446438), K = u(K, k, v, L, G[m + 14], U, 3275163606), L = u(L, K, k, v, G[m + 3], b, 4107603335), v = u(v, L, K, k, G[m + 8], A, 1163531501), k = u(k, v, L, K, G[m + 13], M, 2850285829), K = u(K, k, v, L, G[m + 2], U, 4243563512), L = u(L, K, k, v, G[m + 7], b, 1735328473), k = l(k, v = u(v, L, K, k, G[m + 12], A, 2368359562), L, K, G[m + 5], _, 4294588738), K = l(K, k, v, L, G[m + 8], O, 2272392833), L = l(L, K, k, v, G[m + 11], P, 1839030562), v = l(v, L, K, k, G[m + 14], T, 4259657740), k = l(k, v, L, K, G[m + 1], _, 2763975236), K = l(K, k, v, L, G[m + 4], O, 1272893353), L = l(L, K, k, v, G[m + 7], P, 4139469664), v = l(v, L, K, k, G[m + 10], T, 3200236656), k = l(k, v, L, K, G[m + 13], _, 681279174), K = l(K, k, v, L, G[m + 0], O, 3936430074), L = l(L, K, k, v, G[m + 3], P, 3572445317), v = l(v, L, K, k, G[m + 6], T, 76029189), k = l(k, v, L, K, G[m + 9], _, 3654602809), K = l(K, k, v, L, G[m + 12], O, 3873151461), L = l(L, K, k, v, G[m + 15], P, 530742520), k = f(k, v = l(v, L, K, k, G[m + 2], T, 3299628645), L, K, G[m + 0], Y, 4096336452), K = f(K, k, v, L, G[m + 7], H, 1126891415), L = f(L, K, k, v, G[m + 14], j, 2878612391), v = f(v, L, K, k, G[m + 5], N, 4237533241), k = f(k, v, L, K, G[m + 12], Y, 1700485571), K = f(K, k, v, L, G[m + 3], H, 2399980690), L = f(L, K, k, v, G[m + 10], j, 4293915773), v = f(v, L, K, k, G[m + 1], N, 2240044497), k = f(k, v, L, K, G[m + 8], Y, 1873313359), K = f(K, k, v, L, G[m + 15], H, 4264355552), L = f(L, K, k, v, G[m + 6], j, 2734768916), v = f(v, L, K, k, G[m + 13], N, 1309151649), k = f(k, v, L, K, G[m + 4], Y, 4149444226), K = f(K, k, v, L, G[m + 11], H, 3174756917), L = f(L, K, k, v, G[m + 2], j, 718787259), v = f(v, L, K, k, G[m + 9], N, 3951481745), k = o(k, h), v = o(v, C), L = o(L, d), K = o(K, I);
                                    if (32 == t) return (g(k) + g(v) + g(L) + g(K)).toLowerCase();
                                    return (g(v) + g(L)).toLowerCase()
                                }(o = u.Instance.replaceObjStr(o, "5uCgB1cz6DGKSkk4c4wsG0W04", "81f561c90bB756197830BFA6ddC78B44", t, n.timeStamp, e.token), 32).toUpperCase();
                            console.log("valueKey===", o, "sign===", r), o = "pkgName={0}&timeStamp={2}&token={1}&sign={3}";
                            var c = "userInfo?" + (o = u.Instance.replaceObjStr(o, t, e.token, n.timeStamp, r));
                            console.log(c), l.Instance.code2Session(c, {}, (function (n) {
                                a.Instance.GameLog("服务器登录成功 data:" + n), console.log(n), s.instance.sendMes(i.LoginSucceed, e)
                            }), f.Get)
                        },
                        fail: function (n) {
                            a.Instance.GameLog("----BytesSdkController--login 调用失败"), a.Instance.GameLog("用户拒绝授权"), a.Instance.GameLog("直接登录服务器"), s.instance.sendMes(i.LoginSucceed, n)
                        }
                    })
                }, r.GetUserInfo = function () {
                    this.UserInfoCallBack.channel = "dy_rpk", this.GetPlatformSDK().getLocation({
                        success: function (n) {
                            s.instance.sendMes(i.GetUserInfo, n)
                        },
                        fail: function (n) {
                            a.Instance.GameLog("----BytesSdkController--getLocation 调用失败"), console.log(n)
                        }
                    })
                }, r.ShareGame = function () {
                    a.Instance.GameLog("----bytes-------shareAppMessage-----"), a.Instance.GameLog("----oppo-------没有分享-----")
                }, r.AddShortcut = function () {
                    this.GetPlatformSDK().installShortcut({
                        success: function () {
                            g.Instance.ShowTips("添加桌面成功", p.UIStartView), s.instance.sendMes(i.CheckShortcut)
                        },
                        fail: function (n) {
                            console.log(n), g.Instance.ShowTips("添加桌面失败", p.UIStartView)
                        }
                    })
                }, r.CheckShortcut = function () {
                    this.GetPlatformSDK().hasShortcutInstalled({
                        success: function (n) {
                            console.log("检查快捷方式", n), s.instance.sendMes(i.CheckShortcut)
                        },
                        fail: function (n) {
                            console.log("检查快捷方式失败", n.errMsg), s.instance.sendMes(i.CheckShortcut)
                        }
                    })
                }, e(o, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this._instance && (this._instance = new o), this._instance
                    }
                }]), o
            }(c))._instance = void 0, S = m)) || S);
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/passLevelPanel.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameConfig.ts", "./TimeControl.ts", "./LangInfoTools.ts", "./UIViewMgr.ts", "./UIGameView.ts"], (function (e) {
    "use strict";
    var t, n, o, i, a, s, r, l, p, c, u, m, h, d, f, v, g, N, b, w, y, I;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, n = e.inheritsLoose, o = e.initializerDefineProperty, i = e.assertThisInitialized
        }, function (e) {
            a = e.cclegacy, s = e._decorator, r = e.Node, l = e.Label, p = e.UIOpacity, c = e.UITransform, u = e.instantiate, m = e.Vec2, h = e.Vec3, d = e.Size, f = e.tween, v = e.Component
        }, function (e) {
            g = e.GameConfig
        }, function (e) {
            N = e.TimeControl
        }, function (e) {
            b = e.LangInfoTools
        }, function (e) {
            w = e.UIViewMgr, y = e.UIViewConfig
        }, function (e) {
            I = e.UIGameView
        }],
        execute: function () {
            var L, P, T, C, z, V, M, U, D, G, O, B, S;
            a._RF.push({}, "1f931/sletMVYdMkGRJcJL2", "passLevelPanel", void 0);
            var _ = s.ccclass,
                x = s.property;
            e("passLevelPanel", (L = _("passLevelPanel"), P = x({
                type: r
            }), T = x({
                type: r
            }), C = x({
                type: r
            }), z = x({
                type: l
            }), V = x({
                type: p
            }), L((D = t((U = function (e) {
                function t() {
                    for (var t, n = arguments.length, a = new Array(n), s = 0; s < n; s++) a[s] = arguments[s];
                    return t = e.call.apply(e, [this].concat(a)) || this, o(t, "topNode", D, i(t)), o(t, "bottomNode", G, i(t)), t.isInit = !0, o(t, "prefabItem", O, i(t)), o(t, "passLevelNum", B, i(t)), o(t, "passLevelNumOP", S, i(t)), t.passLevelTips = void 0, t.topNodeTrans = [], t.bottomNodeTrans = [], t.gameView = void 0, t.animTime = .048, t
                }
                n(t, e);
                var a = t.prototype;
                return a.onLoad = function () {
                    this.gameView = w.Instance.GetView(y.UIGameView).getComponent(I), this.topNode = this.node.getChildByName("topNode"), this.bottomNode = this.node.getChildByName("bottomNode")
                }, a.update = function (e) {}, a.showPassAnim = function (e) {
                    var t = this;
                    this.node.active = !0, N.Instance.DelayToDo((function () {
                        var n = t.prefabItem.getComponent(c).contentSize;
                        if (t.isInit) {
                            t.passLevelNumOP = t.passLevelNum.getComponent(p), t.isInit = !1;
                            for (var o = t.topNode.getComponent(c).contentSize, i = Math.ceil(o.width / n.width), a = Math.ceil(o.height / n.height), s = 0; s < a; s++)
                                for (var r = 0; r < i; r++) {
                                    var l = n.width * r;
                                    s % 2 != 0 && (l = n.width * (i - 1 - r));
                                    var v = n.height * s,
                                        w = u(t.prefabItem);
                                    w.active = !0, w.getComponent(c).anchorPoint = new m(0, 0), w.setParent(t.topNode), w.setPosition(new h(l, v));
                                    var y = w.getChildByName("passPageItem").getComponent(c);
                                    y.setContentSize(new d(0, n.height)), t.topNodeTrans.push(y)
                                }
                            for (var I = 0; I < a; I++)
                                for (var L = 0; L < i; L++) {
                                    var P = -n.width * L;
                                    I % 2 != 0 && (P = -n.width * (i - 1 - L));
                                    var T = -n.height * I,
                                        C = u(t.prefabItem);
                                    C.active = !0, C.getComponent(c).anchorPoint = new m(1, 1), C.setParent(t.bottomNode), C.setPosition(new h(P, T));
                                    var z = C.getChildByName("passPageItem").getComponent(c);
                                    z.setContentSize(new d(0, n.height)), t.bottomNodeTrans.push(z)
                                }
                        }
                        t.passLevelNumOP.opacity = 0;
                        var V = 0,
                            M = t;
                        var U = 0;

                        function D(e, t) {
                            f(e).to(M.animTime, {
                                width: n.width
                            }).call((function () {
                                t()
                            })).start()
                        }! function e() {
                            D(M.topNodeTrans[V], (function () {
                                ++V < M.topNodeTrans.length && e()
                            }))
                        }(),
                        function t() {
                            D(M.bottomNodeTrans[U], (function () {
                                ++U < M.bottomNodeTrans.length ? t() : (M.passLevelNum.string = b.Instance.getLangInfoByKey("进入第" + (g.Instance.levelMaxCount - g.Instance.playLvIndex) + "层"), f(M.passLevelNumOP).to(.1, {
                                    opacity: 255
                                }).start(), N.Instance.DelayToDo((function () {
                                    e()
                                }), M, .2))
                            }))
                        }()
                    }), this)
                }, a.hidePassAnim = function (e) {
                    var t = this;
                    f(t.passLevelNumOP).to(.1, {
                        opacity: 0
                    }).start();
                    var n = t.topNodeTrans.length - 1;
                    var o = t.bottomNodeTrans.length - 1;

                    function i(e, n) {
                        f(e).to(t.animTime, {
                            width: 0
                        }).call((function () {
                            n()
                        })).start()
                    }! function e() {
                        i(t.topNodeTrans[n], (function () {
                            --n > 0 && e()
                        }))
                    }(),
                    function n() {
                        i(t.bottomNodeTrans[o], (function () {
                            --o > 0 ? n() : (t.hidePanel(), e())
                        }))
                    }()
                }, a.hidePanel = function () {
                    this.node.active = !1
                }, t
            }(v)).prototype, "topNode", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), G = t(U.prototype, "bottomNode", [T], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), O = t(U.prototype, "prefabItem", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), B = t(U.prototype, "passLevelNum", [z], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), S = t(U.prototype, "passLevelNumOP", [V], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), M = U)) || M));
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/PistolControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./WeaponControlBase.ts"], (function (t) {
    "use strict";
    var o, n, r, e;
    return {
        setters: [function (t) {
            o = t.inheritsLoose
        }, function (t) {
            n = t.cclegacy, r = t._decorator
        }, function (t) {
            e = t.WeaponControlBase
        }],
        execute: function () {
            var s;
            n._RF.push({}, "815a03amF1JOqbv52hwXraO", "PistolControl", void 0);
            var i = r.ccclass;
            r.property, t("PistolControl", i("PistolControl")(s = function (t) {
                function n() {
                    return t.apply(this, arguments) || this
                }
                o(n, t);
                var r = n.prototype;
                return r.start = function () {}, r.update = function (t) {}, n
            }(e)) || s);
            n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/PlayerBulletBase.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./WeaponControlBase.ts"], (function (t) {
    "use strict";
    var e, o, i, n, l, s, r, a;
    return {
        setters: [function (t) {
            e = t.applyDecoratedDescriptor, o = t.inheritsLoose, i = t.initializerDefineProperty, n = t.assertThisInitialized
        }, function (t) {
            l = t.cclegacy, s = t._decorator, r = t.Component
        }, function (t) {
            a = t.WeaponType
        }],
        execute: function () {
            var u, c, p, h, f;
            l._RF.push({}, "ac611dHXMhDAZusgeQNXP4M", "PlayerBulletBase", void 0);
            var y = s.ccclass,
                B = s.property;
            t("PlayerBulletBase", (u = y("PlayerBulletBase"), c = B({
                type: a
            }), u((f = e((h = function (t) {
                function e() {
                    for (var e, o = arguments.length, l = new Array(o), s = 0; s < o; s++) l[s] = arguments[s];
                    return e = t.call.apply(t, [this].concat(l)) || this, i(e, "bulletType", f, n(e)), e.shotWeapon = void 0, e.killBoss = void 0, e.isShot = !1, e.bulletStartPos = void 0, e
                }
                o(e, t);
                var l = e.prototype;
                return l.onLoad = function () {}, l.update = function (t) {}, l.justKillBoss = function (t, e) {
                    this.shotWeapon = t, this.killBoss = e
                }, l.initBullet = function (t) {
                    this.shotWeapon = t
                }, l.initBulletPos = function () {
                    this.bulletStartPos = this.node.getWorldPosition()
                }, l.shotBullet = function () {
                    this.isShot = !0
                }, l.hideBullet = function () {
                    this.isShot = !1, this.node.active = !1
                }, e
            }(r)).prototype, "bulletType", [c], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return a.手枪
                }
            }), p = h)) || p));
            l._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/PlayerBulletControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./SoundMgr.ts", "./UIViewMgr.ts", "./UIGameView.ts", "./BossControlBase.ts", "./PlayerBulletBase.ts"], (function (t) {
    "use strict";
    var e, o, l, i, n, s, c, h, u, a, r, B, d;
    return {
        setters: [function (t) {
            e = t.inheritsLoose
        }, function (t) {
            o = t.cclegacy, l = t._decorator, i = t.Vec3, n = t.Collider2D, s = t.Contact2DType
        }, function (t) {
            c = t.SoundMgr
        }, function (t) {
            h = t.UIViewMgr, u = t.UIViewConfig
        }, function (t) {
            a = t.UIGameView, r = t.ColliderTagConfig
        }, function (t) {
            B = t.BossControlBase
        }, function (t) {
            d = t.PlayerBulletBase
        }],
        execute: function () {
            var g;
            o._RF.push({}, "1c4b7yQvXdLepLrmn/SCh5Q", "PlayerBulletControl", void 0);
            var p = l.ccclass;
            l.property, t("PlayerBulletControl", p("PlayerBulletControl")(g = function (t) {
                function o() {
                    for (var e, o = arguments.length, l = new Array(o), i = 0; i < o; i++) l[i] = arguments[i];
                    return (e = t.call.apply(t, [this].concat(l)) || this).bulletNode = void 0, e.gameView = void 0, e.checkTouchWallTimer = 0, e.checkTouchWallTime = .1, e.shotMaxLen = 0, e
                }
                e(o, t);
                var l = o.prototype;
                return l.onLoad = function () {
                    this.bulletNode = this.node.getChildByName("BulletImg"), this.gameView = h.Instance.GetView(u.UIGameView).getComponent(a)
                }, l.update = function (t) {
                    if (this.isShot) {
                        var e = new i(0, this.bulletNode.position.y + this.shotWeapon.bulletSpeed);
                        this.bulletNode.setPosition(e), e.y >= this.shotMaxLen && this.hideBullet(), this.checkTouchWallTimer += t, this.checkTouchWallTimer >= this.checkTouchWallTime && this.checkTouchWall()
                    }
                }, l.initBullet = function (e) {
                    t.prototype.initBullet.call(this, e), this.bulletNode.getComponent(n).on(s.BEGIN_CONTACT, this.onBeginContact, this), this.shotMaxLen = e.bulletShotMaxLen * this.gameView.blockSize.width, this.initBulletPos()
                }, l.initBulletPos = function () {
                    this.bulletNode.position = i.ZERO, t.prototype.initBulletPos.call(this), c.Instance.play("手枪开枪", !0)
                }, l.checkTouchWall = function () {
                    this.checkTouchWallTimer = 0;
                    var t = this.bulletNode.worldPosition;
                    this.gameView.isBlockCanWalk(this.gameView.getBlockVec2ByWorldPos(t)) || (console.log("碰到墙壁"), this.hideBullet())
                }, l.justKillBoss = function (e, o) {
                    t.prototype.justKillBoss.call(this, e, o), o.getHurtByOther(this), this.hideBullet()
                }, l.onBeginContact = function (t, e, o) {
                    if (console.log("onBeginContact"), e.tag == r.Boss) {
                        console.log("接触到怪物");
                        var l = e.node.parent.getComponent(B);
                        l && l.getHurtByOther(this), this.hideBullet()
                    }
                }, l.hideBullet = function () {
                    t.prototype.hideBullet.call(this), this.bulletNode.getComponent(n).off(s.BEGIN_CONTACT)
                }, o
            }(d)) || g);
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/PlayerControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./CommonTipsMgr.ts", "./GameConfig.ts", "./UIViewMgr.ts", "./UIGameView.ts", "./BoxControl.ts", "./WeaponControlBase.ts"], (function (o) {
    "use strict";
    var n, t, e, i, a, l, c, s, r, p, h, u, d, y, g, f, B, w, C, k, P;
    return {
        setters: [function (o) {
            n = o.applyDecoratedDescriptor, t = o.inheritsLoose, e = o.initializerDefineProperty, i = o.assertThisInitialized, a = o.createClass
        }, function (o) {
            l = o.cclegacy, c = o._decorator, s = o.Node, r = o.Collider2D, p = o.Contact2DType, h = o.Vec2, u = o.tween, d = o.Component
        }, function (o) {
            y = o.CommonTipsMgr
        }, function (o) {
            g = o.GameConfig
        }, function (o) {
            f = o.UIViewConfig
        }, function (o) {
            B = o.ColliderTagConfig
        }, function (o) {
            w = o.BoxControl, C = o.BoxType
        }, function (o) {
            k = o.WeaponType, P = o.WeaponControlBase
        }],
        execute: function () {
            var S, m, T, V, v;
            o("PlayerActionType", void 0), l._RF.push({}, "89552YM6SlO7YsQfYjhx9HV", "PlayerControl", void 0);
            var W, I = c.ccclass,
                x = c.property;
            ! function (o) {
                o[o["静止"] = 0] = "静止", o[o["掏枪"] = 1] = "掏枪", o[o["移动"] = 2] = "移动"
            }(W || (W = o("PlayerActionType", {})));
            o("PlayerControl", (S = I("PlayerControl"), m = x({
                type: s
            }), S((v = n((V = function (o) {
                function n() {
                    for (var n, t = arguments.length, a = new Array(t), l = 0; l < t; l++) a[l] = arguments[l];
                    return (n = o.call.apply(o, [this].concat(a)) || this).nowStandBlock = void 0, n.openGameView = void 0, e(n, "shotBulletNode", v, i(n)), n.playerAction = W.移动, n
                }
                t(n, o);
                var l = n.prototype;
                return l.getShotBulletNode = function () {
                    return this.shotBulletNode
                }, l.changePlayerAction = function (o) {
                    this.playerAction = o
                }, l.onLoad = function () {
                    this.getComponent(r).on(p.BEGIN_CONTACT, this.onBeginContact, this)
                }, l.update = function (o) {}, l.initMap = function (o) {
                    this.openGameView = o
                }, l.initPlayerStandBlock = function (o) {
                    this.node.angle = 0, this.nowStandBlock = o, this.setPlayerWP(this.nowStandBlock.blockVec2, !1), this.openGameView.ChangePlayerStandBlock(this.nowStandBlock)
                }, l.changePlayerStandBlock = function (o, n) {
                    void 0 === n && (n = !0);
                    var t = o.blockVec2,
                        e = t.x - this.nowStandBlock.blockVec2.x,
                        i = this.nowStandBlock.blockVec2.y - t.y,
                        a = new h(e, i),
                        l = Math.atan2(a.y, a.x) / Math.PI * 180 + 90;
                    this.node.angle = l, this.playerAction == W.移动 && (this.nowStandBlock = o, this.setPlayerWP(this.nowStandBlock.blockVec2, n), this.openGameView.ChangePlayerStandBlock(this.nowStandBlock))
                }, l.setPlayerWP = function (o, n) {
                    void 0 === n && (n = !0);
                    var t = this.openGameView.getBlockWorldPos(o);
                    n ? u(this.node).to(.2, {
                        worldPosition: t
                    }).call((function () {
                        34 == o.x && 33 == o.y && y.Instance.ShowTips("通关啦！！！", f.UIGameView)
                    })).start() : this.node.setWorldPosition(t)
                }, l.shotWeapon = function (o) {
                    switch (o.shotWeapon.weaponType) {
                        case k.手枪:
                            o.node.setWorldPosition(this.shotBulletNode.getWorldPosition()), o.node.angle = this.node.angle, o.shotBullet()
                    }
                }, l.onBeginContact = function (o, n, t) {
                    if (console.log("onBeginContact"), n.tag == B.Weapon) {
                        console.log("拿到武器");
                        var e = n.node.getComponent(P);
                        e.hideWeapon(), -1 == g.Instance.unlockWeaponArr.indexOf(e.weaponType) && g.Instance.pushUnlockWeaponToLocal(e)
                    } else if (n.tag == B.Box) {
                        var i = n.getComponent(w);
                        switch (i.boxType) {
                            case C.弹药:
                                g.Instance.isAddUseBullet() ? g.Instance.pushBulletToBag(i.bulletType, 1) : y.Instance.ShowTips("当前子弹已满")
                        }
                    }
                }, l.playerDead = function () {
                    y.Instance.ShowTips("玩家死亡", f.UIGameView)
                }, a(n, [{
                    key: "getStandBlock",
                    get: function () {
                        return this.nowStandBlock
                    }
                }, {
                    key: "getPlayerAction",
                    get: function () {
                        return this.playerAction
                    }
                }]), n
            }(d)).prototype, "shotBulletNode", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), T = V)) || T));
            l._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/PlayerDrugControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./UIGameView.ts"], (function (e) {
    "use strict";
    var r, t, n, i, o, u, a, l, c, p;
    return {
        setters: [function (e) {
            r = e.applyDecoratedDescriptor, t = e.inheritsLoose, n = e.initializerDefineProperty, i = e.assertThisInitialized, o = e.createClass
        }, function (e) {
            u = e.cclegacy, a = e._decorator, l = e.CCFloat, c = e.Component
        }, function (e) {
            p = e.PlayerHandType
        }],
        execute: function () {
            var s, y, g, f, d, h, D;
            u._RF.push({}, "f0216B2nuFMf7p03K72UbkM", "PlayerDrugControl", void 0);
            var T = a.ccclass,
                m = a.property;
            e("PlayerDrugControl", (s = T("PlayerDrugControl"), y = m({
                type: p,
                displayName: "无, 绿巨人, 麒麟臂, 路飞手臂"
            }), g = m({
                type: l,
                displayName: "药品持续时间"
            }), s((h = r((d = function (e) {
                function r() {
                    for (var r, t = arguments.length, o = new Array(t), u = 0; u < t; u++) o[u] = arguments[u];
                    return r = e.call.apply(e, [this].concat(o)) || this, n(r, "drugType", h, i(r)), n(r, "drugDurTime", D, i(r)), r
                }
                t(r, e);
                var u = r.prototype;
                return u.changeDrugType = function (e) {
                    this.drugType = e
                }, u.start = function () {}, u.update = function (e) {}, o(r, [{
                    key: "getDrugType",
                    get: function () {
                        return this.drugType
                    },
                    set: function (e) {
                        this.drugType = e
                    }
                }]), r
            }(c)).prototype, "drugType", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return p.无
                }
            }), D = r(d.prototype, "drugDurTime", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 30
                }
            }), f = d)) || f));
            u._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/ResMgr.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LYCSDK.ts", "./GameTools.ts", "./UIViewMgr.ts", "./LYCSDKEventHelper.ts", "./UIControl.ts", "./InfoMgr.ts", "./LangInfoTools.ts", "./GameConfig.ts", "./TimeControl.ts"], (function (n) {
    "use strict";
    var e, a, i, o, t, s, r, c, u, l, f, d, D, m, g, B, I, h, v, L, G, p, C;
    return {
        setters: [function (n) {
            e = n.createClass
        }, function (n) {
            a = n.cclegacy, i = n._decorator, o = n.assetManager, t = n.SpriteFrame, s = n.Prefab, r = n.AudioClip, c = n.TiledMapAsset, u = n.dragonBones, l = n.instantiate
        }, function (n) {
            f = n.LYCSDK
        }, function (n) {
            d = n.GameTools
        }, function (n) {
            D = n.UIViewMgr, m = n.UIViewConfig
        }, function (n) {
            g = n.LYCSDKEventHelper, B = n.EventConfig
        }, function (n) {
            I = n.UIControl, h = n.UIControlType
        }, function (n) {
            v = n.InfoMgr, L = n.BoxQuesInfo
        }, function (n) {
            G = n.LangInfoTools
        }, function (n) {
            p = n.GameConfig
        }, function (n) {
            C = n.TimeControl
        }],
        execute: function () {
            var M, _;
            a._RF.push({}, "16081vsZilDOq+Y+VK8S286", "ResMgr", void 0);
            var S, T = i.ccclass,
                b = (i.property, n("DragonBonesData", (function () {
                    this.DB_Ske = void 0, this.DB_Tex = void 0
                })));
            ! function (n) {
                n[n.NoLoad = 0] = "NoLoad", n[n.Loading = 1] = "Loading", n[n.FinishLoad = 2] = "FinishLoad"
            }(S || (S = {}));
            n("ResMgr", T("ResMgr")(((_ = function () {
                function n() {
                    this.PreLoadGameBundleDic = {}, this.GameImgDic = {}, this.GamePrefabDic = {}, this.GameInfoDic = {}, this.GameBgmDic = {}, this.GameSoundDic = {}, this.GameMapDic = {}, this.GameDBDic = {}, this.LoadingBundleFinishCallback = {}
                }
                var a = n.prototype;
                return a.GetAssetName = function (n) {
                    return n.split("/")[1]
                }, a.LoadBundle = function (n, e) {
                    var a = this,
                        i = this.PreLoadGameBundleDic[n],
                        l = d.Instance.GetNowTime();
                    if (e && (this.LoadingBundleFinishCallback[n] = e), i) {
                        if (i == S.Loading) return void console.log(n + "已经在加载中...");
                        if (i == S.FinishLoad) return console.log(n + "已经加载过了"), void(e && e())
                    } else console.log("hhh:加载Bundle" + n + "开始的时间:" + l), this.PreLoadGameBundleDic[n] = S.Loading;
                    o.loadBundle(n, (function (e, i) {
                        var o = 0;

                        function f() {
                            if (9 == (o += 1)) {
                                for (var e in m) a.GamePrefabDic[e] = m[e];
                                a.LoadingBundleFinishCallback[n] && (a.LoadingBundleFinishCallback[n](), a.LoadingBundleFinishCallback[n] = null), a.PreLoadGameBundleDic[n] = S.FinishLoad;
                                var i = d.Instance.GetNowTime();
                                console.log("hhh:加载Bundle：" + n + "结束的时间间隔:" + (i - l))
                            }
                            "MainSceneBundle" == n && g.instance.sendMes(B.LoadingProgress, o / 9)
                        }
                        var D = [];
                        i.loadDir("Image", t, (function (n, e) {
                            for (var o in e) {
                                var s = e[o];
                                D[o] = s
                            }
                            var r = [];
                            for (var o in i.getDirWithPath("Image", t, r), r) {
                                var c = r[o].path,
                                    u = a.GetAssetName(c);
                                a.GameImgDic[u] = D[o]
                            }
                            f()
                        }));
                        var m = {};
                        i.loadDir("Prefab", s, (function (n, e) {
                            for (var a in e) {
                                var i = e[a];
                                m[i.name] = i
                            }
                            f()
                        })), i.loadDir("UIView", s, (function (n, e) {
                            for (var a in e) {
                                var i = e[a];
                                m[i.name] = i
                            }
                            f()
                        })), i.loadDir("Panel", s, (function (n, e) {
                            for (var a in e) {
                                var i = e[a];
                                m[i.name] = i
                            }
                            f()
                        })), i.loadDir("Bgm", r, (function (n, e) {
                            for (var i in e) {
                                var o = e[i];
                                a.GameBgmDic[o.name] = o
                            }
                            f()
                        })), i.loadDir("Sound", r, (function (n, e) {
                            for (var i in e) {
                                var o = e[i];
                                a.GameSoundDic[o.name] = o
                            }
                            f()
                        })), i.loadDir("Map", c, (function (n, e) {
                            for (var i in e) {
                                var o = e[i];
                                a.GameMapDic[o.name] = o
                            }
                            f()
                        })), i.loadDir("DB", (function (n, e) {
                            for (var i in e) {
                                var o = e[i],
                                    t = o.name.split("_"),
                                    s = "";
                                if (t.length > 2)
                                    for (var r = 0; r < t.length - 1; r++) s += t[r], r < t.length - 2 && (s += "_");
                                else s = t[0];
                                if (a.GameDBDic[s]) o instanceof u.DragonBonesAsset ? a.GameDBDic[s].DB_Ske = o : o instanceof u.DragonBonesAtlasAsset && (a.GameDBDic[s].DB_Tex = o);
                                else {
                                    var c = new b;
                                    o instanceof u.DragonBonesAsset ? c.DB_Ske = o : o instanceof u.DragonBonesAtlasAsset && (c.DB_Tex = o), a.GameDBDic[s] = c
                                }
                            }
                            f()
                        })), i.loadDir("Info", String, (function (n, e) {
                            for (var i in e) {
                                var o = e[i];
                                a.GameInfoDic[o.name] = o.json
                            }
                            f()
                        }))
                    }))
                }, a.LoadSpriteFrame = function (n, e) {
                    if (this.GameImgDic[n]) {
                        var a = this.GameImgDic[n];
                        return e && (a.insetTop = e.x, a.insetBottom = e.y, a.insetLeft = e.z, a.insetRight = e.w), a
                    }
                    return console.log("图片：" + n + "为空"), null
                }, a.LoadPrefab = function (n) {
                    var e = this.GamePrefabDic[n];
                    return e ? l(e) : null
                }, a.LoadBgm = function (n) {
                    return this.GameBgmDic[n]
                }, a.LoadSound = function (n) {
                    return this.GameSoundDic[n]
                }, a.LoadMap = function (n) {
                    return this.GameMapDic[n]
                }, a.LoadDB = function (n) {
                    return this.GameDBDic[n]
                }, a.InitBundle = function () {
                    var e = this;
                    I.instance.UIType == h.Game && (f.Instance.InitLYCSDK(), f.Instance.LoginPlatform()), f.Instance.GameLog("开始加载资源:"), n.Instance.LoadBundle("PreloadBundle", (function () {
                        C.Instance.DelayToDoNoObj((function () {
                            f.Instance.GameLog("打开start 界面"), D.Instance.OpenView(m.UILoadingView), n.Instance.LoadBundle("MainSceneBundle", (function () {
                                e.readInfoData(), C.Instance.DelayToDoNoObj((function () {
                                    n.Instance.LoadBundle("CommonBundle", (function () {
                                        C.Instance.DelayToDoNoObj((function () {
                                            n.Instance.LoadBundle("LevelMap", (function () {
                                                C.Instance.DelayToDoNoObj((function () {
                                                    n.Instance.LoadBundle("GameViewBundle", (function () {
                                                        C.Instance.DelayToDoNoObj((function () {
                                                            n.Instance.LoadBundle("PlayGameMusicBundle", null), n.Instance.LoadBundle("PlayGameUIBundle", null)
                                                        }))
                                                    }))
                                                }))
                                            }))
                                        }))
                                    }))
                                }))
                            }))
                        }))
                    }))
                }, a.readInfoData = function () {
                    var n = this.GameInfoDic.lang;
                    G.Instance.initLangInfo(n), n = this.GameInfoDic["宝箱问题配置表"], p.Instance.boxQuesInfoLen = n.length;
                    for (var e = 0; e < n.length; e++) {
                        var a = n[e],
                            i = new L;
                        i.id = a.id, i.title = a.question_title, i.ques_1 = a.question_1, i.ques_2 = a.question_2, i.ques_3 = a.question_3, i.ques_4 = a.question_4, i.rightAnswer = a.answer, v.instance.boxQesInfoDic[i.id] = i
                    }
                    p.Instance.initBoxQuestionIdArr()
                }, e(n, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this.instance && (this.instance = new n), this.instance
                    }
                }]), n
            }()).instance = void 0, M = _)) || M);
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/ShotgunBulletControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./SoundMgr.ts", "./UIViewMgr.ts", "./UIGameView.ts", "./BossControlBase.ts", "./BossEggControl.ts", "./PlayerBulletBase.ts"], (function (t) {
    "use strict";
    var e, i, l, o, n, s, r, u, h, a, c, g, B, f, p, d, m, I, v;
    return {
        setters: [function (t) {
            e = t.applyDecoratedDescriptor, i = t.inheritsLoose, l = t.initializerDefineProperty, o = t.assertThisInitialized
        }, function (t) {
            n = t.cclegacy, s = t._decorator, r = t.Node, u = t.Vec3, h = t.instantiate, a = t.Collider2D, c = t.Contact2DType
        }, function (t) {
            g = t.SoundMgr
        }, function (t) {
            B = t.UIViewMgr, f = t.UIViewConfig
        }, function (t) {
            p = t.UIGameView, d = t.ColliderTagConfig
        }, function (t) {
            m = t.BossControlBase
        }, function (t) {
            I = t.BossEggControl
        }, function (t) {
            v = t.PlayerBulletBase
        }],
        execute: function () {
            var b, C, y, w, P;
            n._RF.push({}, "ca336HB6dJHC4VwgxLknje1", "ShotgunBulletControl", void 0);
            var k = s.ccclass,
                T = s.property;
            t("ShotgunBulletControl", (b = k("ShotgunBulletControl"), C = T({
                type: r
            }), b((P = e((w = function (t) {
                function e() {
                    for (var e, i = arguments.length, n = new Array(i), s = 0; s < i; s++) n[s] = arguments[s];
                    return e = t.call.apply(t, [this].concat(n)) || this, l(e, "bulletItemPrefab", P, o(e)), e.bulletImgArr = [], e.gameView = void 0, e.checkTouchWallTimer = 0, e.checkTouchWallTime = .1, e.isInitBullet = !1, e.shotMaxLen = 0, e
                }
                i(e, t);
                var n = e.prototype;
                return n.onLoad = function () {
                    this.gameView = B.Instance.GetView(f.UIGameView).getComponent(p)
                }, n.update = function (t) {
                    if (this.isShot) {
                        for (var e = 0; e < this.bulletImgArr.length; e++) {
                            var i = this.bulletImgArr[e];
                            if (i.active) {
                                var l = new u(i.position.x, i.position.y + this.shotWeapon.bulletSpeed);
                                if (i.setPosition(l), l.y >= this.shotMaxLen) {
                                    this.hideBullet();
                                    break
                                }
                            }
                        }
                        this.checkTouchWallTimer += t, this.checkTouchWallTimer >= this.checkTouchWallTime && this.checkTouchWall()
                    }
                }, n.justKillBoss = function (e, i) {
                    t.prototype.justKillBoss.call(this, e, i);
                    for (var l = e.weaponShotBulletCount, o = 0; o < l; o++) i.getHurtByOther(this);
                    this.hideBullet()
                }, n.initBullet = function (e) {
                    if (t.prototype.initBullet.call(this, e), !this.isInitBullet) {
                        this.isInitBullet = !0;
                        var i = e.weaponShotBulletCount,
                            l = 90 / i,
                            o = 0 + i / 2 * l;
                        this.shotMaxLen = e.bulletShotMaxLen * this.gameView.blockSize.width;
                        for (var n = 0; n < i; n++) {
                            var s = h(this.bulletItemPrefab);
                            s.setParent(this.node), s.setPosition(u.ZERO), s.angle = o - l * n;
                            var r = s.children[0].children[0];
                            this.bulletImgArr.push(r), r.getComponent(a).on(c.BEGIN_CONTACT, this.onBeginContact, this)
                        }
                        this.bulletItemPrefab.active = !1
                    }
                    this.initBulletPos()
                }, n.initBulletPos = function () {
                    this.initBulletImgPos(), t.prototype.initBulletPos.call(this), g.Instance.play("霰弹枪开枪", !0)
                }, n.initBulletImgPos = function () {
                    for (var t = 0; t < this.bulletImgArr.length; t++) {
                        var e = this.bulletImgArr[t];
                        e.active = !0, e.setPosition(u.ZERO)
                    }
                }, n.checkTouchWall = function () {
                    this.checkTouchWallTimer = 0;
                    for (var t = 0; t < this.bulletImgArr.length; t++) {
                        var e = this.bulletImgArr[t];
                        if (e.active) {
                            var i = e.worldPosition;
                            e.setWorldPosition(i), this.gameView.isBlockCanWalk(this.gameView.getBlockVec2ByWorldPos(i)) || (console.log("碰到墙壁"), this.hideOneBullet(t))
                        }
                    }
                }, n.onBeginContact = function (t, e, i) {
                    if (console.log("onBeginContact"), e.tag == d.Boss) {
                        console.log("接触到怪物");
                        var l = e.node.parent.getComponent(m);
                        l && (l.getHurtByOther(this), t.node.active = !1, this.checkIsHideAllBullet() && this.hideBullet())
                    } else if (e.tag == d.BossEgg) {
                        var o = e.node.parent.getComponent(I);
                        o && (o.getHurtByOther(this.shotWeapon.weaponHurt), t.node.active = !1, this.checkIsHideAllBullet() && this.hideBullet())
                    }
                }, n.hideOneBullet = function (t) {
                    this.bulletImgArr[t].active = !1, this.checkIsHideAllBullet() && this.hideBullet()
                }, n.checkIsHideAllBullet = function () {
                    for (var t = 0; t < this.bulletImgArr.length; t++) {
                        if (this.bulletImgArr[t].active) return !1
                    }
                    return !0
                }, n.hideBullet = function () {
                    this.initBulletPos(), t.prototype.hideBullet.call(this)
                }, e
            }(v)).prototype, "bulletItemPrefab", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), y = w)) || y));
            n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/ShotgunControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./WeaponControlBase.ts"], (function (t) {
    "use strict";
    var e, o, n, r, i, a, u, l;
    return {
        setters: [function (t) {
            e = t.applyDecoratedDescriptor, o = t.inheritsLoose, n = t.initializerDefineProperty, r = t.assertThisInitialized
        }, function (t) {
            i = t.cclegacy, a = t._decorator, u = t.CCInteger
        }, function (t) {
            l = t.WeaponControlBase
        }],
        execute: function () {
            var c, s, p, f, h;
            i._RF.push({}, "ad5063cVeFCg6Dx2QAYMWM5", "ShotgunControl", void 0);
            var g = a.ccclass,
                y = a.property;
            t("ShotgunControl", (c = g("ShotgunControl"), s = y({
                type: u,
                displayName: "武器射出的子弹数量"
            }), c((h = e((f = function (t) {
                function e() {
                    for (var e, o = arguments.length, i = new Array(o), a = 0; a < o; a++) i[a] = arguments[a];
                    return e = t.call.apply(t, [this].concat(i)) || this, n(e, "weaponShotBulletCount", h, r(e)), e
                }
                o(e, t);
                var i = e.prototype;
                return i.start = function () {}, i.update = function (t) {}, e
            }(l)).prototype, "weaponShotBulletCount", [s], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 6
                }
            }), p = f)) || p));
            i._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/SignalgunBulletControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./UIViewMgr.ts", "./UIGameView.ts", "./PlayerBulletBase.ts"], (function (t) {
    "use strict";
    var e, n, i, o, l, a, s, u, r, c;
    return {
        setters: [function (t) {
            e = t.inheritsLoose
        }, function (t) {
            n = t.cclegacy, i = t._decorator, o = t.Animation, l = t.Vec3, a = t.tween
        }, function (t) {
            s = t.UIViewMgr, u = t.UIViewConfig
        }, function (t) {
            r = t.UIGameView
        }, function (t) {
            c = t.PlayerBulletBase
        }],
        execute: function () {
            var g;
            n._RF.push({}, "69188bFAgZHTYJpVp9iG38p", "SignalgunBulletControl", void 0);
            var h = i.ccclass;
            i.property, t("SignalgunBulletControl", h("SignalgunBulletControl")(g = function (t) {
                function n() {
                    for (var e, n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
                    return (e = t.call.apply(t, [this].concat(i)) || this).gameView = void 0, e.shotAnim = void 0, e
                }
                e(n, t);
                var i = n.prototype;
                return i.onLoad = function () {
                    this.gameView = s.Instance.GetView(u.UIGameView).getComponent(r), this.shotAnim = this.node.getChildByName("BulletImg").getComponent(o)
                }, i.update = function (t) {}, i.initBullet = function (e) {
                    t.prototype.initBullet.call(this, e), this.initBulletPos()
                }, i.shotBullet = function () {
                    var t = this;
                    this.shotAnim.play(), this.node.setScale(new l(.2, .2)), a(this.node).to(this.shotWeapon.bulletSpeed, {
                        scale: new l(5, 5)
                    }).call((function () {
                        t.gameView.signalgunBulletBomb(t), t.node.active = !1
                    })).start()
                }, n
            }(c)) || g);
            n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/SignalgunControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./WeaponControlBase.ts"], (function (t) {
    "use strict";
    var e, n, r, o, i, a, l, u;
    return {
        setters: [function (t) {
            e = t.applyDecoratedDescriptor, n = t.inheritsLoose, r = t.initializerDefineProperty, o = t.assertThisInitialized
        }, function (t) {
            i = t.cclegacy, a = t._decorator, l = t.CCFloat
        }, function (t) {
            u = t.WeaponControlBase
        }],
        execute: function () {
            var c, p, s, f, g, y, b;
            i._RF.push({}, "4a397Ka8Z5NfbBxj16tomBH", "SignalgunControl", void 0);
            var d = a.ccclass,
                h = a.property;
            t("SignalgunControl", (c = d("SignalgunControl"), p = h({
                type: l,
                displayName: "武器伤害范围,范围内的怪物都会收到伤害，但范围外的怪物不会"
            }), s = h({
                type: l,
                displayName: "子弹从发射到爆炸的时间"
            }), c((y = e((g = function (t) {
                function e() {
                    for (var e, n = arguments.length, i = new Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                    return e = t.call.apply(t, [this].concat(i)) || this, r(e, "bulletShotMaxLen", y, o(e)), r(e, "bulletSpeed", b, o(e)), e
                }
                n(e, t);
                var i = e.prototype;
                return i.start = function () {}, i.update = function (t) {}, e
            }(u)).prototype, "bulletShotMaxLen", [p], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 10
                }
            }), b = e(g.prototype, "bulletSpeed", [s], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 2
                }
            }), f = g)) || f));
            i._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/SkillBaseControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function (o) {
    "use strict";
    var e, r, t, n;
    return {
        setters: [function (o) {
            e = o.inheritsLoose
        }, function (o) {
            r = o.cclegacy, t = o._decorator, n = o.Component
        }],
        execute: function () {
            var l;
            r._RF.push({}, "824beax71RIrKpSwInf6oq7", "SkillBaseControl", void 0);
            var s = t.ccclass;
            t.property, o("SkillBaseControl", s("SkillBaseControl")(l = function (o) {
                function r() {
                    for (var e, r = arguments.length, t = new Array(r), n = 0; n < r; n++) t[n] = arguments[n];
                    return (e = o.call.apply(o, [this].concat(t)) || this).gameView = void 0, e.bossJB = void 0, e
                }
                return e(r, o), r
            }(n)) || l);
            r._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/SoundMgr.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameConfig.ts", "./LYCSDK.ts", "./ResMgr.ts", "./TimeControl.ts"], (function (n) {
    "use strict";
    var t, o, e, i, a, r, u, s, c, d, l, p;
    return {
        setters: [function (n) {
            t = n.inheritsLoose, o = n.createClass
        }, function (n) {
            e = n.cclegacy, i = n._decorator, a = n.AudioSource, r = n.find, u = n.Node, s = n.Component
        }, function (n) {
            c = n.GameConfig
        }, function (n) {
            d = n.LYCSDK
        }, function (n) {
            l = n.ResMgr
        }, function (n) {
            p = n.TimeControl
        }],
        execute: function () {
            var S, f;
            e._RF.push({}, "01317TUH3FOx5SqDcERN37k", "SoundMgr", void 0);
            var h = i.ccclass;
            i.property, n("SoundMgr", h("SoundMgr")(((f = function (n) {
                function e() {
                    for (var t, o = arguments.length, e = new Array(o), i = 0; i < o; i++) e[i] = arguments[i];
                    return (t = n.call.apply(n, [this].concat(e)) || this).PlayAudioSource = void 0, t.playASArr = [], t.tdSound = void 0, t
                }
                t(e, n);
                var i = e.prototype;
                return i.start = function () {
                    this.PlayAudioSource = this.node.getComponent(a)
                }, i.update = function (n) {}, i.play = function (n, t) {
                    if (void 0 === t && (t = !0), c.Instance.IsSoundOn)
                        if (d.Instance.GameLog("播放音乐" + n), t) {
                            var o = this.getCanUseAS;
                            o.clip = l.Instance.LoadSound(n), o.play(), p.Instance.DelayToDo((function () {
                                o.node.active = !1, o.clip = null
                            }), o, o.duration)
                        } else this.PlayAudioSource.clip = l.Instance.LoadSound(n), this.PlayAudioSource.play()
                }, i.playTuodi = function () {
                    var n = this;
                    if (c.Instance.IsSoundOn && null == this.tdSound) {
                        d.Instance.GameLog("播放音乐拖地");
                        var t = this.getCanUseAS;
                        this.tdSound = t, t.clip = l.Instance.LoadSound("拖地"), t.play(), p.Instance.DelayToDo((function () {
                            t.node.active = !1, t.clip = null, n.tdSound = null
                        }), t, t.duration)
                    }
                }, o(e, [{
                    key: "getCanUseAS",
                    get: function () {
                        for (var n = 0; n < this.playASArr.length; n++) {
                            var t = this.playASArr[n];
                            if (!t.node.active) return t.node.active = !0, t
                        }
                        var o = new u,
                            e = o.addComponent(a);
                        return o.setParent(this.node), this.playASArr.push(e), e
                    }
                }], [{
                    key: "Instance",
                    get: function () {
                        return null == this.instance && (this.instance = r("SoundMgr").getComponent(e)), this.instance
                    }
                }]), e
            }(s)).instance = void 0, S = f)) || S);
            e._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/SwellBossControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameTools.ts", "./UIGameView.ts", "./BossControlBase.ts"], (function (e) {
    "use strict";
    var i, t, o, l, n, a, s, r, c, u, w, m, h, p, y, d, S, f;
    return {
        setters: [function (e) {
            i = e.applyDecoratedDescriptor, t = e.inheritsLoose, o = e.initializerDefineProperty, l = e.assertThisInitialized
        }, function (e) {
            n = e.cclegacy, a = e._decorator, s = e.CCBoolean, r = e.CCFloat, c = e.Sprite, u = e.Collider2D, w = e.Contact2DType, m = e.Vec3, h = e.tween
        }, function (e) {
            p = e.GameTools
        }, function (e) {
            y = e.ColliderTagConfig
        }, function (e) {
            d = e.MinMaxNumber, S = e.BossState, f = e.BossControlBase
        }],
        execute: function () {
            var b, g, C, z, x, B, v, N, T, D, I, G, M, P, _;
            n._RF.push({}, "bd974H1wJhHuJGepG5dsV0d", "SwellBossControl", void 0);
            var V = a.ccclass,
                F = a.property;
            e("SwellBossControl", (b = V("SwellBossControl"), g = F({
                type: s,
                displayName: "默认是否膨胀"
            }), C = F({
                type: r,
                displayName: "膨胀到最大的时间"
            }), z = F({
                type: r,
                displayName: "膨胀到最大的持续时间"
            }), x = F({
                type: r,
                displayName: "膨胀到初始的多少倍"
            }), B = F({
                type: d,
                displayName: "boss膨胀随机时间间隔最小最大值"
            }), v = F({
                type: c
            }), b((D = i((T = function (e) {
                function i() {
                    for (var i, t = arguments.length, n = new Array(t), a = 0; a < t; a++) n[a] = arguments[a];
                    return i = e.call.apply(e, [this].concat(n)) || this, o(i, "isSwell", D, l(i)), o(i, "swellTime", I, l(i)), o(i, "swellDur", G, l(i)), o(i, "swellMaxSize", M, l(i)), o(i, "swellTimeData", P, l(i)), o(i, "bossImg", _, l(i)), i.bossCollider = void 0, i.oneSize = void 0, i.twoSize = void 0, i.oneImgName = void 0, i.twoImgName = void 0, i.initScale = void 0, i.maxScale = void 0, i
                }
                t(i, e);
                var n = i.prototype;
                return n.initBoss = function (e) {
                    this.gameView = e, this.nowBossState = S.激活, this.bossCollider = this.node.getChildByName("怪物身体区域").getComponent(u), this.bossCollider.on(w.BEGIN_CONTACT, this.onBeginContact, this), this.initScale = new m(this.node.scale.x, this.node.scale.y), this.maxScale = new m(this.node.scale.x * this.swellMaxSize, this.node.scale.y * this.swellMaxSize), this.isSwell ? (this.oneSize = new m(this.initScale.x, this.initScale.y), this.twoSize = new m(this.maxScale.x, this.maxScale.y)) : (this.oneSize = new m(this.maxScale.x, this.maxScale.y), this.twoSize = new m(this.initScale.x, this.initScale.y));
                    var i = this;
                    ! function e() {
                        var t = p.Instance.GetFloatRandomNum_New(i.swellTimeData.minNum, i.swellTimeData.maxNum);
                        h(i.node).delay(t).to(i.swellTime, {
                            scale: i.oneSize
                        }).call((function () {})).delay(i.swellDur).to(i.swellTime, {
                            scale: i.twoSize
                        }).call((function () {})).union().call((function () {
                            i.isValid && i.nowBossState == S.激活 && e()
                        })).start()
                    }()
                }, n.update = function (e) {}, n.onBeginContact = function (e, i, t) {
                    console.log("onBeginContact"), i.tag == y.Player && this.touchPlayer()
                }, n.touchPlayer = function () {
                    console.log("对玩家造成伤害"), this.hurtPlayer()
                }, n.bossDead = function () {}, i
            }(f)).prototype, "isSwell", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return !1
                }
            }), I = i(T.prototype, "swellTime", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return .5
                }
            }), G = i(T.prototype, "swellDur", [z], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 5
                }
            }), M = i(T.prototype, "swellMaxSize", [x], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 2
                }
            }), P = i(T.prototype, "swellTimeData", [B], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return new d
                }
            }), _ = i(T.prototype, "bossImg", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), N = T)) || N));
            n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/TaskColliderControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameConfig.ts", "./UIViewMgr.ts", "./UIGameView.ts"], (function (t) {
    "use strict";
    var e, n, i, o, a, r, s, l, c, p, u, g, C, f, h;
    return {
        setters: [function (t) {
            e = t.applyDecoratedDescriptor, n = t.inheritsLoose, i = t.initializerDefineProperty, o = t.assertThisInitialized
        }, function (t) {
            a = t.cclegacy, r = t._decorator, s = t.Enum, l = t.BoxCollider2D, c = t.Contact2DType, p = t.Component
        }, function (t) {
            u = t.TaskConfig, g = t.GameConfig
        }, function (t) {
            C = t.UIViewMgr
        }, function (t) {
            f = t.GameState, h = t.ColliderTagConfig
        }],
        execute: function () {
            var d, k, m, y, T;
            a._RF.push({}, "f5331Xk4AdNUrp+ckUnY6gD", "TaskColliderControl", void 0);
            var w = r.ccclass,
                S = r.property;
            t("TaskColliderControl", (d = w("TaskColliderControl"), k = S({
                type: s(u)
            }), d((T = e((y = function (t) {
                function e() {
                    for (var e, n = arguments.length, a = new Array(n), r = 0; r < n; r++) a[r] = arguments[r];
                    return e = t.call.apply(t, [this].concat(a)) || this, i(e, "taskStep", T, o(e)), e.gameView = void 0, e
                }
                n(e, t);
                var a = e.prototype;
                return a.start = function () {
                    this.gameView = C.Instance.getGameView(), this.node.getComponent(l).on(c.BEGIN_CONTACT, this.onBeginContact, this)
                }, a.update = function (t) {}, a.onBeginContact = function (t, e, n) {
                    this.gameView.getNowGameState != f.playing || e.tag != h.Player && e.tag != h.PlayerHand || g.Instance.touchTaskStep <= this.taskStep && (g.Instance.touchTaskStep = this.taskStep, this.gameView.getGameTaskMgr.showTask())
                }, e
            }(p)).prototype, "taskStep", [k], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), m = y)) || m));
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/TaskMgr.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameConfig.ts", "./LangInfoTools.ts"], (function (t) {
    "use strict";
    var i, n, a, e, s, o, c, r, h, l, u, f, k, p;
    return {
        setters: [function (t) {
            i = t.applyDecoratedDescriptor, n = t.inheritsLoose, a = t.initializerDefineProperty, e = t.assertThisInitialized
        }, function (t) {
            s = t.cclegacy, o = t._decorator, c = t.Label, r = t.UIOpacity, h = t.Color, l = t.tween, u = t.Vec3, f = t.Component
        }, function (t) {
            k = t.GameConfig
        }, function (t) {
            p = t.LangInfoTools
        }],
        execute: function () {
            var L, g, b, d, y, T, v, I, F;
            s._RF.push({}, "1fd99ceN4VGeakIDap0I4j1", "TaskMgr", void 0);
            var w = o.ccclass,
                m = o.property;
            t("TaskMgr", (L = w("TaskMgr"), g = m({
                type: c
            }), b = m({
                type: c
            }), d = m({
                type: r
            }), L((v = i((T = function (t) {
                function i() {
                    for (var i, n = arguments.length, s = new Array(n), o = 0; o < n; o++) s[o] = arguments[o];
                    return i = t.call.apply(t, [this].concat(s)) || this, a(i, "taskLab", v, e(i)), a(i, "taskFinishLab", I, e(i)), a(i, "finishTaskLight", F, e(i)), i
                }
                n(i, t);
                var s = i.prototype;
                return s.start = function () {}, s.update = function (t) {}, s.showTask = function () {
                    k.Instance.playLvIndex > 0 || (this.taskLab.node.active = this.taskFinishLab.node.active = this.node.active = !0, this.finishTaskLight.node.active = !1, this.taskLab.string = p.Instance.getLangInfoByKey("taskLab_" + k.Instance.touchTaskStep), this.taskFinishLab.string = p.Instance.getLangInfoByKey("noFinishTask"), this.taskFinishLab.color = new h("bf294c"))
                }, s.finishTask = function (t) {
                    var i = this;
                    k.Instance.playLvIndex > 0 || (this.finishTaskLight.opacity = 255, this.taskFinishLab.color = new h("29a752"), this.taskFinishLab.string = p.Instance.getLangInfoByKey("finishTask"), l(this.finishTaskLight.node).delay(.5).call((function () {
                        i.finishTaskLight.node.active = !0, i.taskLab.node.active = !1, i.taskFinishLab.node.active = !1
                    })).to(.5, {
                        scale: u.ZERO
                    }).call((function () {
                        null == t ? i.hideTask() : (k.Instance.touchTaskStep = t, i.taskLab.node.setPosition(new u(250, 0)), i.showTask(), i.finishTaskLight.node.setScale(u.ONE), l(i.taskLab.node).to(.5, {
                            position: new u(-240, 0)
                        }).call((function () {
                            i.taskFinishLab.node.active = !0
                        })).start())
                    })).union().start())
                }, s.hideTask = function () {
                    this.node.active = !1
                }, i
            }(f)).prototype, "taskLab", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), I = i(T.prototype, "taskFinishLab", [b], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), F = i(T.prototype, "finishTaskLight", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), y = T)) || y));
            s._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/TentacleItemControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameTools.ts", "./UIViewMgr.ts", "./UIGameView.ts"], (function (e) {
    "use strict";
    var t, n, i, o, s, a, r, c, l, h, g, d, u, m, w, f, C, y;
    return {
        setters: [function (e) {
            t = e.inheritsLoose, n = e.createClass
        }, function (e) {
            i = e.cclegacy, o = e._decorator, s = e.UITransform, a = e.Collider2D, r = e.Contact2DType, c = e.Size, l = e.Vec2, h = e.tween, g = e.Tween, d = e.Component
        }, function (e) {
            u = e.GameTools
        }, function (e) {
            m = e.UIViewMgr, w = e.UIViewConfig
        }, function (e) {
            f = e.UIGameView, C = e.ColliderTagConfig, y = e.GameState
        }],
        execute: function () {
            var T;
            i._RF.push({}, "bac2cMG+9NPgoES3pZ52zx7", "TentacleItemControl", void 0);
            var p = o.ccclass;
            o.property, e("TentacleItemControl", p("TentacleItemControl")(T = function (e) {
                function i() {
                    for (var t, n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
                    return (t = e.call.apply(e, [this].concat(i)) || this).tentacleTrans = void 0, t.endNode = void 0, t.gameView = void 0, t.finishLargeCB = void 0, t.isLarging = !1, t.bossJB = void 0, t
                }
                t(i, e);
                var o = i.prototype;
                return o.onLoad = function () {
                    this.tentacleTrans = this.node.getComponent(s), this.gameView = m.Instance.GetView(w.UIGameView).getComponent(f), this.getEndNode.getComponent(a).on(r.BEGIN_CONTACT, this.onBeginContact, this)
                }, o.onBeginContact = function (e, t, n) {
                    console.log("onBeginContact"), t.tag == C.Player && this.touchPlayer()
                }, o.touchPlayer = function () {
                    this.bossJB.hurtPlayer(this.bossJB.bossAtk * this.bossJB.magneticData.tentaclehurtPer)
                }, o.update = function (e) {
                    if (this.gameView.getNowGameState == y.playing && this.isLarging) {
                        var t = this.gameView.getBlockVec2ByWorldPos(this.getEndNode.getWorldPosition());
                        this.gameView.isBlockCanWalk(t) || this.showMagnetic()
                    }
                }, o.showTentacle = function (e) {
                    var t = this;
                    this.bossJB = e.boss, this.node.active = !0, this.isLarging = !0, this.tentacleTrans.setContentSize(new c(0, this.tentacleTrans.contentSize.height)), this.finishLargeCB = e.cb;
                    var n = this.gameView.getNewPlayerNode.getPlayerBodyWp;
                    console.log("玩家的坐标:" + n);
                    var i = this.node.getWorldPosition(),
                        o = n.x - i.x,
                        s = n.y - i.y,
                        a = new l(o, s),
                        r = Math.atan2(a.y, a.x) / Math.PI * 180 + 0;
                    this.node.angle = r;
                    var g = u.Instance.GetWorldPointsDistance(i, n);
                    h(this.tentacleTrans).to(e.largeTime * (g / this.gameView.blockSize.width), {
                        contentSize: new c(g, this.tentacleTrans.contentSize.height)
                    }).call((function () {
                        t.showMagnetic()
                    })).start()
                }, o.showMagnetic = function () {
                    this.isLarging = !1, g.stopAllByTarget(this.tentacleTrans), this.finishLargeCB()
                }, n(i, [{
                    key: "getEndNode",
                    get: function () {
                        return this.endNode || (this.endNode = this.node.getChildByName("EndNode")), this.endNode
                    }
                }]), i
            }(d)) || T);
            i._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/TiktokSDKControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./CommonTipsMgr.ts", "./GameTools.ts", "./UIViewMgr.ts", "./LYCSDK.ts", "./LYCSDKEventHelper.ts", "./LYCSDKHttp.ts", "./BaseSDKControl.ts"], (function (e) {
    "use strict";
    var t, n, o, s, a, r, c, i, l, f, u, d;
    return {
        setters: [function (e) {
            t = e.inheritsLoose, n = e.createClass
        }, function (e) {
            o = e.cclegacy, s = e._decorator
        }, function (e) {
            a = e.CommonTipsMgr
        }, function (e) {
            r = e.GameTools
        }, function (e) {
            c = e.UIViewConfig
        }, function (e) {
            i = e.LYCSDK
        }, function (e) {
            l = e.LYCSDKEventHelper, f = e.EventConfig
        }, function (e) {
            u = e.LYCSDKHttp
        }, function (e) {
            d = e.BaseSDKControl
        }],
        execute: function () {
            var m, h;
            o._RF.push({}, "4f9a1OY69ZAKbXfrB4PfyCi", "TiktokSDKControl", void 0);
            var g = s.ccclass;
            s.property, e("TiktokSDKControl", g("TiktokSDKControl")(((h = function (e) {
                function o() {
                    for (var t, n = arguments.length, o = new Array(n), s = 0; s < n; s++) o[s] = arguments[s];
                    return (t = e.call.apply(e, [this].concat(o)) || this).isInitRecord = !1, t.recordUrl = "", t
                }
                t(o, e);
                var s = o.prototype;
                return s.GetPlatformSDK = function () {
                    return window.tt
                }, s.LoginPlatform = function () {
                    var e = this;
                    this.GetPlatformSDK().login({
                        force: !0,
                        success: function (t) {
                            i.Instance.GameLog("---BytesSdkController----login 调用成功" + t.code + ",,,, " + t.anonymousCode),
                             u.Instance.code2Session("/jscode2session", {
                                appid: "tt6de71b5af2d87e0302",
                                secret: "d48992eb0bba40b65a3e5345c54ce9be43ac94d4",
                                code: t.code,
                                anonymous_code: t.anonymousCode
                            }, (function (t) {
                                e.UserInfoCallBack.thirdId = t.data.unionid, i.Instance.GameLog("服务器登录成功 data:" + t)
                            }))
                        },
                        fail: function (e) {
                            i.Instance.GameLog("----BytesSdkController--login 调用失败"), i.Instance.GameLog("用户拒绝授权")
                        }
                    })
                }, s.GetUserInfo = function () {
                    var e = this;
                    e.UserInfoCallBack.channel = "dy_rpk", e.GetPlatformSDK().getUserInfo({
                        withCredentials: !0,
                        success: function (t) {
                            i.Instance.GameLog("---BytesSdkController----GetUserInfo1 调用成功" + t.userInfo), i.Instance.GameLog("---BytesSdkController----GetUserInfo2 调用成功" + t.userInfo.avatarUrl), i.Instance.GameLog("---BytesSdkController----GetUserInfo3 调用成功" + t.code + " " + t.anonymousCode), e.UserInfoCallBack.nickName = t.userInfo.nickName, e.UserInfoCallBack.headIcon = t.userInfo.avatarUrl, e.GetPlatformSDK().getLocation({
                                success: function (t) {
                                    i.Instance.GameLog(t.city, "----------getLocation----经度" + t.longitude + "纬度" + t.latitude + "---", t), t.city.length > 0 && (e.UserInfoCallBack.city = t.city), l.instance.sendMes(f.GetUserInfo, t)
                                },
                                fail: function (e) {
                                    l.instance.sendMes(f.GetUserInfo, e)
                                }
                            })
                        },
                        fail: function (e) {
                            i.Instance.GameLog("----BytesSdkController--GetUserInfo 调用失败"), l.instance.sendMes(f.GetUserInfo, e)
                        }
                    })
                }, s.ShareGame = function (e) {
                    i.Instance.GameLog("----bytes-------shareAppMessage-----");
                    var t = "";
                    e && e.title && (t = e.title);
                    var n = "";
                    e && e.imageUrl && (n = e.imageUrl), this.GetPlatformSDK().shareAppMessage({
                        title: t,
                        desc: t,
                        imageUrl: n,
                        success: function () {}
                    })
                }, s.AddShortcut = function () {
                    this.GetPlatformSDK().addShortcut({
                        success: function () {
                            a.Instance.ShowTips("添加桌面成功", c.UIStartView), l.instance.sendMes(f.CheckShortcut)
                        },
                        fail: function (e) {
                            a.Instance.ShowTips("添加桌面失败", c.UIStartView)
                        }
                    })
                }, s.startRecord = function () {
                    i.Instance.GameLog("开始录制");
                    var e = this.GetPlatformSDK();
                    this.recordUrl = "";
                    var t = this,
                        n = e.getGameRecorderManager();
                    n && (this.isInitRecord || (n.onStart((function (e) {})), n.onStop((function (e) {
                        t.recordUrl = e.videoPath, t.clipVideo()
                    })), this.isInitRecord = !0), n.start({
                        duration: 300
                    }))
                }, s.clipVideo = function () {
                    var e = this.GetPlatformSDK().getGameRecorderManager(),
                        t = this;
                    e.clipVideo({
                        path: t.recordUrl,
                        timeRange: [20, 0],
                        success: function (e) {
                            t.recordUrl = e.videoPath
                        },
                        fail: function (e) {
                            console.error("---clipVideo---fail--", e)
                        }
                    })
                }, s.resumeRecord = function () {
                    i.Instance.GameLog("恢复录制");
                    var e = this.GetPlatformSDK().getGameRecorderManager();
                    e && e.resume()
                }, s.pauseRecord = function () {
                    i.Instance.GameLog("暂停录制");
                    var e = this.GetPlatformSDK().getGameRecorderManager();
                    e && e.pause()
                }, s.stopRecord = function () {
                    i.Instance.GameLog("停止录制");
                    var e = this.GetPlatformSDK().getGameRecorderManager();
                    e && e.stop()
                }, s.shareRecord = function (e) {
                    if (void 0 === e && (e = null), r.Instance.IsEmptyString(this.recordUrl)) a.Instance.ShowTips("分享录屏失败，未在本地找到视频", c.UIGameView);
                    else {
                        var t = this,
                            n = "";
                        e && e.title && (n = e.title);
                        var o = "";
                        e && e.imageUrl && (o = e.imageUrl), this.GetPlatformSDK().shareAppMessage({
                            channel: "video",
                            title: n,
                            desc: n,
                            imageUrl: o,
                            templateId: "",
                            query: "",
                            extra: {
                                videoPath: t.recordUrl,
                                withVideoId: !0
                            },
                            success: function (e) {
                                t.GetPlatformSDK().showToast({
                                    title: "分享视频成功" + e.videoId,
                                    duration: 1800
                                })
                            },
                            fail: function (e) {
                                i.Instance.GameLog("分享视频失败：" + e), t.GetPlatformSDK().showToast({
                                    title: "分享视频失败" + e,
                                    duration: 1800
                                })
                            }
                        })
                    }
                }, s.CheckShortcut = function () {
                    console.log("检查快捷方式111"), this.GetPlatformSDK().checkShortcut({
                        success: function (e) {
                            var t = e.status.exist;
                            console.log("检查快捷方式", t), l.instance.sendMes(f.CheckShortcut)
                        },
                        fail: function (e) {
                            console.log("检查快捷方式失败", e.errMsg), l.instance.sendMes(f.CheckShortcut)
                        }
                    })
                }, n(o, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this._instance && (this._instance = new o), this._instance
                    }
                }]), o
            }(d))._instance = void 0, m = h)) || m);
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/TimeControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], (function (n) {
    "use strict";
    var t, e, o, i, s;
    return {
        setters: [function (n) {
            t = n.inheritsLoose, e = n.createClass
        }, function (n) {
            o = n.cclegacy, i = n._decorator, s = n.Component
        }],
        execute: function () {
            var c, r;
            o._RF.push({}, "eab2as21llHe4lney9AacT4", "TimeControl", void 0);
            var u = i.ccclass;
            i.property, n("TimeControl", u("TimeControl")(((r = function (n) {
                function o() {
                    return n.apply(this, arguments) || this
                }
                t(o, n);
                var i = o.prototype;
                return i.DelayToDo = function (n, t, e, o, i) {
                    return void 0 === o && (o = 0), this.schedule((function () {
                        t.isValid && n()
                    }), e, o, i)
                }, i.DelayToDoNoObj = function (n, t, e, o) {
                    return void 0 === e && (e = 0), this.schedule((function () {
                        n()
                    }), t, e, o)
                }, e(o, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this._instance && (this._instance = new o), this._instance
                    },
                    set: function (n) {
                        this._instance = n
                    }
                }]), o
            }(s))._instance = void 0, c = r)) || c);
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/TouchColliderControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameConfig.ts", "./GuidePanel.ts", "./LYCSDK.ts", "./LYCSDKEventHelper.ts", "./LangInfoTools.ts", "./UIViewMgr.ts", "./UIGameView.ts", "./FollowBossControl.ts", "./WeaponControlBase.ts"], (function (e) {
    "use strict";
    var n, t, i, o, r, a, s, l, c, p, d, f, h, w, g, u, I, C, S, m, N, A, H, E, y, T;
    return {
        setters: [function (e) {
            n = e.applyDecoratedDescriptor, t = e.inheritsLoose, i = e.initializerDefineProperty, o = e.assertThisInitialized
        }, function (e) {
            r = e.cclegacy, a = e._decorator, s = e.Node, l = e.Enum, c = e.Collider2D, p = e.Contact2DType, d = e.Vec2, f = e.Component
        }, function (e) {
            h = e.NewHandStep, w = e.GameConfig
        }, function (e) {
            g = e.GuideData
        }, function (e) {
            u = e.LYCSDK
        }, function (e) {
            I = e.LYCSDKEventHelper, C = e.EventConfig
        }, function (e) {
            S = e.LangInfoTools
        }, function (e) {
            m = e.UIViewMgr, N = e.UIViewConfig
        }, function (e) {
            A = e.UIGameView, H = e.GameState, E = e.ColliderTagConfig
        }, function (e) {
            y = e.FollowBossControl
        }, function (e) {
            T = e.WeaponType
        }],
        execute: function () {
            var b, v, P, k, _, G, D, O, V, K, B, L, M;
            r._RF.push({}, "4a714hqQpdNgrWoKoAlDolY", "TouchColliderControl", void 0);
            var F = a.ccclass,
                W = a.property;
            e("TouchColliderControl", (b = F("TouchColliderControl"), v = W({
                type: y,
                displayName: "绑定的跟踪怪"
            }), P = W({
                type: s,
                displayName: "手指指向的位置"
            }), k = W({
                type: l(h),
                displayName: "触发新手的第几步"
            }), _ = W({
                type: s,
                displayName: "新手需要协助点击的物体"
            }), G = W({
                type: s,
                displayName: "新手需要协助点击的物体"
            }), b((V = n((O = function (e) {
                function n() {
                    for (var n, t = arguments.length, r = new Array(t), a = 0; a < t; a++) r[a] = arguments[a];
                    return (n = e.call.apply(e, [this].concat(r)) || this).collider = void 0, i(n, "fbItemArr", V, o(n)), i(n, "fingerNodeArr", K, o(n)), i(n, "guideStep", B, o(n)), i(n, "helpClickObj", L, o(n)), i(n, "helpClickObj1", M, o(n)), n.gameView = void 0, n
                }
                t(n, e);
                var r = n.prototype;
                return r.start = function () {
                    this.gameView = m.Instance.GetView(N.UIGameView).getComponent(A), this.collider = this.node.getComponent(c), this.collider.on(p.BEGIN_CONTACT, this.onBeginContact, this)
                }, r.update = function (e) {}, r.onBeginContact = function (e, n, t) {
                    this.gameView.getNowGameState != H.playing || n.tag != E.Player && n.tag != E.PlayerHand || (w.Instance.touchNewHandCollider = this.guideStep, w.Instance.helpClickObj = this.helpClickObj, this.helpClickObj1 && (w.Instance.helpClickObj1 = this.helpClickObj1), this.gotoNextGuide())
                }, r.gotoNextGuide = function () {
                    var e = this;
                    if (w.Instance.newHandStep <= this.guideStep)
                        if (w.Instance.newHandStep = this.guideStep, w.Instance.newHandStep == h.TEACH_MOVE_2) this.gameView.showTeachMoveStep(), u.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                            NewStep: "新手1"
                        });
                        else if (w.Instance.newHandStep == h.TEACH_MOVE_3) this.gameView.showTeachMoveStep(), u.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                        NewStep: "新手2"
                    });
                    else if (w.Instance.newHandStep == h.TEACH_MOVE_4) this.gameView.showTeachMoveStep(), u.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                        NewStep: "新手3"
                    });
                    else if (w.Instance.newHandStep == h.FINISH_TEACH_MOVE) I.instance.sendMes(C.hideGuidePanel), u.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                        NewStep: "新手4"
                    }), w.Instance.newHandStep = h.TEACH_CLOSE_DOOR;
                    else if (w.Instance.newHandStep == h.TEACH_CLOSE_DOOR) {
                        for (var n = 0; n < this.fbItemArr.length; n++) {
                            this.fbItemArr[n].pauseControl()
                        }
                        for (var t = new g, i = [], o = 0; o < this.fingerNodeArr.length; o++) i.push(this.fingerNodeArr[o].getWorldPosition());
                        t.FingerPosArr = i, t.GuideTips = [S.Instance.getLangInfoByKey("closeDoorTips")], t.IsShowClickAnim = !0, t.isShowMask = !0, this.gameView.showGuidePanel(t), u.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                            NewStep: "新手5"
                        })
                    } else if (w.Instance.newHandStep == h.TEACH_GET_WEAPON) {
                        for (var r = new g, a = [], s = 0; s < this.fingerNodeArr.length; s++) a.push(this.fingerNodeArr[s].getWorldPosition());
                        r.FingerPosArr = a, r.GuideTips = [S.Instance.getLangInfoByKey("getWeapon")], r.IsShowClickAnim = !0, r.isShowMask = !0, this.gameView.showGuidePanel(r), u.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                            NewStep: "新手6"
                        })
                    } else if (w.Instance.newHandStep == h.TEACH_GET_BULLET) {
                        for (var l = new g, c = [], p = 0; p < this.fingerNodeArr.length; p++) c.push(this.fingerNodeArr[p].getWorldPosition());
                        l.FingerPosArr = c, l.GuideTips = [S.Instance.getLangInfoByKey("getWeaponBullet")], l.IsShowClickAnim = !0, l.isShowMask = !0, this.gameView.showGuidePanel(l), u.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                            NewStep: "新手7"
                        })
                    } else if (w.Instance.newHandStep == h.TEACH_TAKE_XINHAO) {
                        w.Instance.newHandStep = h.TEACH_TAKE_XINHAO;
                        for (var f = new g, m = [], N = 0; N < this.fingerNodeArr.length; N++) m.push(this.fingerNodeArr[N].getWorldPosition());
                        f.FingerPosArr = m, f.GuideTips = [S.Instance.getLangInfoByKey("warnBossTips") + S.Instance.getLangInfoByKey("getXinhao")], f.IsShowClickAnim = !0, f.isShowMask = !0, f.guideTipsOffset = new d(-50, 200), this.gameView.showGuidePanel(f);
                        for (var A = 0; A < this.fbItemArr.length; A++) {
                            this.fbItemArr[A].pauseControl()
                        }
                        u.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                            NewStep: "新手21"
                        })
                    } else if (w.Instance.newHandStep == h.TEACH_CHANGE_WEAPON)
                        if (w.Instance.nowUseWeapon == T.手枪) w.Instance.newHandStep = h.FINISH_GUIDE, u.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                            NewStep: "新手36"
                        });
                        else {
                            this.gameView.showGuideClickBagBtn(), u.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                                NewStep: "新手32"
                            });
                            for (var H = 0; H < this.fbItemArr.length; H++) {
                                this.fbItemArr[H].pauseControl()
                            }
                            I.instance.on(C.resumeBossFollow, (function () {
                                for (var n = 0; n < e.fbItemArr.length; n++) {
                                    e.fbItemArr[n].continueControl()
                                }
                                I.instance.off(C.resumeBossFollow)
                            }))
                        } this.collider.enabled = !1
                }, n
            }(f)).prototype, "fbItemArr", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return []
                }
            }), K = n(O.prototype, "fingerNodeArr", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return []
                }
            }), B = n(O.prototype, "guideStep", [k], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), L = n(O.prototype, "helpClickObj", [_], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), M = n(O.prototype, "helpClickObj1", [G], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), D = O)) || D));
            r._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/TouchMoveTipsControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LYCSDKEventHelper.ts", "./LangInfoTools.ts"], (function (t) {
    "use strict";
    var i, n, e, o, r, s, a, p, c, l, u, h, f, T, y;
    return {
        setters: [function (t) {
            i = t.applyDecoratedDescriptor, n = t.inheritsLoose, e = t.initializerDefineProperty, o = t.assertThisInitialized
        }, function (t) {
            r = t.cclegacy, s = t._decorator, a = t.UIOpacity, p = t.Label, c = t.CCInteger, l = t.tween, u = t.Tween, h = t.Component
        }, function (t) {
            f = t.LYCSDKEventHelper, T = t.EventConfig
        }, function (t) {
            y = t.LangInfoTools
        }],
        execute: function () {
            var m, v, g, b, d, L, C, w, O;
            r._RF.push({}, "06430U5UMBNCqOd7QIfuq2g", "TouchMoveTipsControl", void 0);
            var P = s.ccclass,
                I = s.property;
            t("TouchMoveTipsControl", (m = P("TouchMoveTipsControl"), v = I({
                type: a
            }), g = I({
                type: p
            }), b = I({
                type: c
            }), m((C = i((L = function (t) {
                function i() {
                    for (var i, n = arguments.length, r = new Array(n), s = 0; s < n; s++) r[s] = arguments[s];
                    return i = t.call.apply(t, [this].concat(r)) || this, e(i, "tipsOP", C, o(i)), e(i, "tipsLab", w, o(i)), e(i, "minOPNum", O, o(i)), i.animTime = .5, i
                }
                n(i, t);
                var r = i.prototype;
                return r.onLoad = function () {
                    var t = this;
                    f.instance.on(T.hideTouchTips, (function () {
                        t.hideTips()
                    }))
                }, r.update = function (t) {}, r.showTips = function (t) {
                    void 0 === t && (t = !0), this.tipsLab.string = y.Instance.getLangInfoByKey("bestTouchArena"), this.node.active = !0, this.tipsOP.opacity = 255, t && this.loopShowAnim()
                }, r.loopShowAnim = function () {
                    var t = this;
                    l(this.tipsOP).to(this.animTime, {
                        opacity: this.minOPNum
                    }).to(this.animTime, {
                        opacity: 255
                    }).union().call((function () {
                        t.loopShowAnim()
                    })).start()
                }, r.hideTips = function () {
                    u.stopAllByTarget(this.tipsOP), this.node.active = !1
                }, i
            }(h)).prototype, "tipsOP", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), w = i(L.prototype, "tipsLab", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), O = i(L.prototype, "minOPNum", [b], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 125
                }
            }), d = L)) || d));
            r._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/TouchSceenControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameConfig.ts", "./LYCSDK.ts", "./LYCSDKEventHelper.ts", "./SoundMgr.ts", "./GameTools.ts", "./UITools.ts", "./UIControl.ts", "./UIViewMgr.ts", "./UIGameView.ts", "./NewPlayerMoveControl.ts", "./PlayerControl.ts"], (function (t) {
    "use strict";
    var e, o, n, a, i, r, s, l, y, h, c, p, d, g, C, w, P, m, u, H, v, A, T, S, f, I, D, V;
    return {
        setters: [function (t) {
            e = t.applyDecoratedDescriptor, o = t.inheritsLoose, n = t.initializerDefineProperty, a = t.assertThisInitialized
        }, function (t) {
            i = t.cclegacy, r = t._decorator, s = t.Node, l = t.UITransform, y = t.Vec2, h = t.Vec3, c = t.Component
        }, function (t) {
            p = t.GameConfig, d = t.NewHandStep, g = t.TaskConfig
        }, function (t) {
            C = t.LYCSDK
        }, function (t) {
            w = t.LYCSDKEventHelper, P = t.EventConfig
        }, function (t) {
            m = t.SoundMgr
        }, function (t) {
            u = t.GameTools
        }, function (t) {
            H = t.UITools
        }, function (t) {
            v = t.UIControl
        }, function (t) {
            A = t.UIViewMgr, T = t.UIViewConfig
        }, function (t) {
            S = t.GameState, f = t.UIGameView, I = t.PlayerHandType
        }, function (t) {
            D = t.NewPlayerMoveControl
        }, function (t) {
            V = t.PlayerActionType
        }],
        execute: function () {
            var M, x, k, B, L;
            i._RF.push({}, "21adckrB2dMoK7en+di+YRP", "TouchSceenControl", void 0);
            var N = r.ccclass,
                W = r.property;
            t("TouchSceenControl", (M = N("TouchSceenControl"), x = W({
                type: s
            }), M((L = e((B = function (t) {
                function e() {
                    for (var e, o = arguments.length, i = new Array(o), r = 0; r < o; r++) i[r] = arguments[r];
                    return (e = t.call.apply(t, [this].concat(i)) || this).playerControl = void 0, n(e, "playerNode", L, a(e)), e.nodeTrans = void 0, e.clickPos = void 0, e.startPos = void 0, e.armHandSpace = void 0, e.bodyHandSpace = void 0, e.gameView = void 0, e.touchWallUIDetal = void 0, e.playerWP = void 0, e.longDownTime = 1, e.longDownTimer = 0, e.isLongDown = !1, e.fingerDir = void 0, e.isChangeBodyAngle = !1, e.count = 0, e.movecount = 0, e.bodyTargetAngle = 0, e.newHandClickCountDic = {}, e.clickCount = 2, e.lastMoveVec = void 0, e
                }
                o(e, t);
                var i = e.prototype;
                return i.start = function () {
                    var t = this;
                    this.playerControl = this.playerNode.getComponent(D), this.nodeTrans = this.getComponent(l), this.node.on(s.EventType.TOUCH_START, (function (e) {
                        t.gameView.getNowGameState == S.playing && t.initHandPos(e)
                    })), this.node.on(s.EventType.TOUCH_MOVE, (function (e) {
                        t.gameView.getNowGameState == S.playing && t.refreshHandPos(e)
                    })), this.node.on(s.EventType.TOUCH_END, (function (e) {
                        t.gameView.getNowGameState == S.playing && t.endTouchMove(e)
                    })), this.gameView = A.Instance.GetView(T.UIGameView).getComponent(f)
                }, i.update = function (t) {
                    this.isLongDown && (this.longDownTimer += t, this.longDownTimer >= this.longDownTime && this.longDownToRotate())
                }, i.longDownToRotate = function () {
                    this.rotatePlayerBody()
                }, i.initHandPos = function (t) {
                    this.count = 0, this.movecount = 0, this.longDownTimer = 0, (!this.playerWP || u.Instance.GetWorldPointsDistance(this.playerWP, this.playerControl.playerBody.worldPosition) > this.gameView.blockSize.width) && (this.playerWP = this.playerControl.playerBody.getWorldPosition()), this.gameView.getNewPlayerNode.onDownPlayerHand();
                    var e = this.gameView.getNewPlayerNode.getnowPlayHandType;
                    if (e == I.路飞手臂) this.playerControl.showLongArm(t);
                    else {
                        I.麒麟臂, this.clickPos = t.getUILocation(), this.startPos = t.getUILocation();
                        var o = this.startPos,
                            n = v.instance.node.position,
                            a = o.x - n.x,
                            i = o.y - n.y,
                            r = new y(a, i),
                            s = Math.atan2(r.y, r.x) / Math.PI * 180 + 0;
                        this.playerControl.getPlayerAction == V.掏枪 && (s -= 14);
                        var l = .9 * r.length(),
                            c = this.playerControl.handArmRadiusArr[this.playerControl.getnowPlayHandType];
                        l > c && (l = c), this.playerControl.findRoadArm.setPosition(this.playerControl.playerArm.getPosition()), this.playerControl.findRoadArm.angle = s, this.playerControl.findRoadArmHandNode.setPosition(new h(l, 0)), this.bodyTargetAngle = Math.round(s - 90), Math.abs(this.bodyTargetAngle - this.playerControl.playerBody.angle) > 180 && (this.bodyTargetAngle <= 0 ? this.bodyTargetAngle += 360 : this.bodyTargetAngle -= 360);
                        var g = this.playerControl.checkRoad();
                        this.playerControl.findRoadArmHandNode.setWorldPosition(g), this.playerControl.playerArm.angle = s, this.playerControl.playerArmHandNode.setWorldPosition(g), this.playerControl.playerHand.setWorldPosition(this.playerControl.playerArmHandNode.worldPosition);
                        var C = this.playerControl.playerHand.getPosition(),
                            m = this.playerControl.playerArm.getPosition();
                        this.armHandSpace = m.subtract(C), this.playerControl.getPlayerAction == V.静止 ? (this.isLongDown = !0, this.lastMoveVec = y.ZERO, this.playerControl.changePlayerAction(V.移动)) : this.playerControl.getPlayerAction == V.掏枪 && (this.bodyHandSpace = C.subtract(m)), this.refreshArmRotate(this.armHandSpace)
                    }
                    this.gameView.isGuiding && (p.Instance.newHandStep != d.TEACH_CLOSE_DOOR && p.Instance.newHandStep != d.TEACH_GET_WEAPON && p.Instance.newHandStep != d.TEACH_GET_BULLET && p.Instance.newHandStep != d.TEACH_TAKE_XINHAO || (this.newHandClickCountDic[p.Instance.newHandStep.toString()] ? this.newHandClickCountDic[p.Instance.newHandStep.toString()] >= this.clickCount ? w.instance.sendMes(P.helpFinishGuide) : this.newHandClickCountDic[p.Instance.newHandStep.toString()]++ : this.newHandClickCountDic[p.Instance.newHandStep.toString()] = 1))
                }, i.refreshHandPos = function (t) {
                    if (this.gameView.getNowGameState == S.playing) {
                        var e = t.getUILocation();
                        if (!(u.Instance.GetWorldPointsDistance(this.startPos, e) < 10)) {
                            m.Instance.playTuodi(), p.Instance.isFirstMove && C.Instance.PlatformSDKControl.trackEvent("FirstMove", {}), p.Instance.newHandStep >= d.FINISH_GUIDE && p.Instance.touchTaskStep >= g.FIND_PASS_DOOR && this.gameView.getNewPlayerNode.getPlayerAction == V.掏枪 && p.Instance.isFristGuideHideWeapon && (p.Instance.isFristGuideHideWeapon = !1, this.gameView.showGuideHideWeapon());
                            var o = t.getUIDelta();
                            if (u.Instance.GetWorldPointsDistance(this.startPos, e) > 100 && this.playerControl.getPlayerAction == V.移动 && (this.fingerDir = o), !this.playerControl.isSkating || this.playerControl.getPlayerAction != V.静止) {
                                this.isLongDown = !1;
                                var n = new y(e.x, e.y),
                                    a = this.playerControl.checkBodyBoderPointIsTouchWall(),
                                    i = new y(this.startPos.x, this.startPos.y),
                                    r = n.subtract(i);
                                if (a.isLockXLarge && r.x < this.lastMoveVec.x ? (r.x = this.lastMoveVec.x, this.startPos.x -= r.x - this.lastMoveVec.x) : a.isLockXShrink && r.x > this.lastMoveVec.x ? (r.x = this.lastMoveVec.x, this.startPos.x += r.x - this.lastMoveVec.x) : this.lastMoveVec = new y(r.x, this.lastMoveVec.y), a.isLockYLarge && r.y < this.lastMoveVec.y ? (r.y = this.lastMoveVec.y, this.startPos.y -= r.y - this.lastMoveVec.y) : a.isLockYShrink && r.y > this.lastMoveVec.y ? (r.y = this.lastMoveVec.y, this.startPos.y += r.y - this.lastMoveVec.y) : this.lastMoveVec = new y(this.lastMoveVec.x, r.y), this.playerControl.getPlayerAction == V.移动) {
                                    r = new y(.8 * r.x, .8 * r.y);
                                    var s = this.playerControl.playerHand.getPosition(),
                                        l = new h(r.x - this.armHandSpace.x, r.y - this.armHandSpace.y),
                                        c = this.playerControl.handArmRadiusArr[this.playerControl.getnowPlayHandType];
                                    l.length() > c && l.normalize().multiplyScalar(c);
                                    var w = new h(s.x - l.x, s.y - l.y),
                                        P = this.playerControl.initArmPosArr[this.playerControl.getnowPlayHandType],
                                        A = new h(w.x - P.x, w.y - P.y);
                                    this.touchWallUIDetal = null, this.rotatePlayerBody(), this.count++, this.movecount++, this.refreshArmRotate(l), this.playerControl.playerArm.setPosition(w), this.playerControl.updateBodyPos(A);
                                    var T = this.playerControl.playerHand.getPosition(),
                                        f = this.playerControl.playerArm.getPosition(),
                                        I = f.x - T.x,
                                        D = f.y - T.y,
                                        M = new y(I, D),
                                        x = Math.atan2(M.y, M.x) / Math.PI * 180 + 0;
                                    this.playerControl.playerArm.angle = x + 180, this.isChangeBodyAngle && (this.isChangeBodyAngle = !1, this.playerControl.playerBody.angle = x + 90), u.Instance.GetWorldPointsDistance(this.playerWP, this.playerControl.playerBody.worldPosition) >= this.gameView.blockSize.width / 2 && (this.playerWP = this.playerControl.playerBody.getWorldPosition(), this.playerControl.updatePlayerStandBlock())
                                } else if (this.playerControl.getPlayerAction == V.掏枪) {
                                    var k = this.gameView.getGameCamera.node.getPosition(),
                                        B = H.Instance.GetLevelNodeWorldPos(t, v.instance.node, new y(k.x, k.y), this.playerControl.node.getWorldPosition().z),
                                        L = this.playerControl.playerArm.getWorldPosition(),
                                        N = new h(B.x - L.x, B.y - L.y),
                                        W = this.playerControl.handArmRadiusArr[this.playerControl.getnowPlayHandType];
                                    N.length() > W && N.normalize().multiplyScalar(W);
                                    var E = new h(L.x + N.x, L.y + N.y);
                                    this.gameView.isBlockCanWalk(this.gameView.getBlockVec2ByWorldPos(E)) || (E = this.playerControl.checkRoad(), N = new h(E.x - L.x, E.y - L.y)), this.playerControl.playerHand.setWorldPosition(E);
                                    var G = this.playerControl.playerHand.getPosition(),
                                        R = this.playerControl.playerArm.getPosition(),
                                        _ = R.x - G.x,
                                        U = R.y - G.y,
                                        b = (M = new y(_, U), Math.atan2(M.y, M.x) / Math.PI * 180 + 180);
                                    this.playerControl.playerArm.angle = b, this.playerControl.findRoadArm.angle = b, this.refreshArmRotate(N)
                                }
                            }
                        }
                    }
                }, i.endTouchMove = function (t) {
                    this.isLongDown = !1, this.playerReleaseTouch(), p.Instance.newHandStep == d.TEACH_KILL_BOSS ? (this.gameView.showMoreBullet(), p.Instance.newHandStep = d.TEACH_SHOT_MORE_BULLET, C.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                        NewStep: "新手18"
                    })) : p.Instance.newHandStep == d.TEACH_SHOT_XINHAO && (p.Instance.newHandStep = d.TEACH_Hide_XINHAO, w.instance.sendMes(P.hideGuidePanel), C.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                        NewStep: "新手27"
                    }))
                }, i.rotatePlayerBody = function () {
                    var t = this.playerControl.checkBodyBoderPointIsTouchWall();
                    if (!(t.isLockXLarge || t.isLockXShrink || t.isLockYLarge || t.isLockYShrink)) {
                        var e = Math.round(this.playerControl.playerBody.angle),
                            o = this.bodyTargetAngle;
                        e < o ? (this.playerControl.playerBody.angle += 3, this.playerControl.playerBody.angle >= o && (this.playerControl.playerBody.angle = o, this.isLongDown = !1)) : e > o && (this.playerControl.playerBody.angle -= 3, this.playerControl.playerBody.angle <= o && (this.playerControl.playerBody.angle = o, this.isLongDown = !1))
                    }
                }, i.playerReleaseTouch = function () {
                    (this.playerControl.refreshCheckArmPos(), this.playerControl.getPlayerAction == V.移动) ? (this.gameView.getNewPlayerNode.getnowPlayHandType == I.麒麟臂 && this.fingerDir && (this.playerControl.playerSkating(this.fingerDir), this.fingerDir = null), this.playerControl.changePlayerAction(V.静止)) : this.playerControl.getPlayerAction == V.掏枪 && this.gameView.playerShotWeapon()
                }, i.refreshArmRotate = function (t) {
                    var e = t.length() / this.playerControl.handArmRadiusArr[this.playerControl.getnowPlayHandType];
                    e > 1 && (e = 1), e < .3 && (e = .3);
                    var o = 90 * (1 - e + .1);
                    this.playerControl.armTop.angle = -o, this.playerControl.armBottom.angle = o;
                    var n = this.playerControl.initArmBottomPosArr[this.playerControl.getnowPlayHandType];
                    this.playerControl.armBottom.setPosition(new h(n.x * e, n.y * e))
                }, e
            }(c)).prototype, "playerNode", [x], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), k = B)) || k));
            i._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UIBagPanel.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BaseUIPanel.ts", "./CommonTipsMgr.ts", "./GameConfig.ts", "./GuidePanel.ts", "./LYCADSDK.ts", "./ResMgr.ts", "./TimeControl.ts", "./GameTools.ts", "./LangInfoTools.ts", "./UITools.ts", "./UIControl.ts", "./UIViewMgr.ts", "./BagBulletGridItemControl.ts", "./WeaponControlBase.ts", "./UIGameView.ts", "./SoundMgr.ts", "./LYCSDK.ts"], (function (e) {
    "use strict";
    var n, t, a, o, i, l, s, r, c, u, g, d, h, p, B, I, w, m, f, C, A, y, S, T, N, P, b, v, _, E, k, W, G, H;
    return {
        setters: [function (e) {
            n = e.applyDecoratedDescriptor, t = e.inheritsLoose, a = e.initializerDefineProperty, o = e.assertThisInitialized
        }, function (e) {
            i = e.cclegacy, l = e._decorator, s = e.Button, r = e.Node, c = e.Label, u = e.Vec2, g = e.Layers, d = e.Vec3, h = e.Sprite, p = e.tween
        }, function (e) {
            B = e.BaseUIPanel
        }, function (e) {
            I = e.CommonTipsMgr
        }, function (e) {
            w = e.GameConfig, m = e.NewHandStep
        }, function (e) {
            f = e.GuideData
        }, function (e) {
            C = e.LYCADSDK
        }, function (e) {
            A = e.ResMgr
        }, function (e) {
            y = e.TimeControl
        }, function (e) {
            S = e.GameTools
        }, function (e) {
            T = e.LangInfoTools
        }, function (e) {
            N = e.UITools
        }, function (e) {
            P = e.UIControl
        }, function (e) {
            b = e.UIViewMgr, v = e.UIViewConfig
        }, function (e) {
            _ = e.BagBulletGridItemControl
        }, function (e) {
            E = e.WeaponType, k = e.PlayerBulletType
        }, function (e) {
            W = e.UIGameView
        }, function (e) {
            G = e.SoundMgr
        }, function (e) {
            H = e.LYCSDK
        }],
        execute: function () {
            var L, U, D, O, F, K, V, z, M, q, x, R, Y, Z, j, X, J, Q, $, ee, ne, te, ae, oe, ie, le, se, re, ce;
            i._RF.push({}, "0d827wck0FHdIbwJFwHXe59", "UIBagPanel", void 0);
            var ue = l.ccclass,
                ge = l.property;
            e("UIBagPanel", (L = ue("UIBagPanel"), U = ge({
                type: s
            }), D = ge({
                type: s
            }), O = ge({
                type: s
            }), F = ge({
                type: r
            }), K = ge({
                type: c
            }), V = ge({
                type: c
            }), z = ge({
                type: r
            }), M = ge({
                type: r
            }), q = ge({
                type: r
            }), x = ge({
                type: r
            }), R = ge({
                type: s
            }), Y = ge({
                type: c
            }), Z = ge({
                type: r
            }), L((J = n((X = function (e) {
                function n() {
                    for (var n, t = arguments.length, i = new Array(t), l = 0; l < t; l++) i[l] = arguments[l];
                    return n = e.call.apply(e, [this].concat(i)) || this, a(n, "closeBagBtn", J, o(n)), a(n, "bigCloseBagBtn", Q, o(n)), a(n, "autoChangeBulletBtn", $, o(n)), n.autoChangeBulletImg = void 0, n.autoChangeTimeLab = void 0, a(n, "bulletGrid", ee, o(n)), a(n, "bulletPanelTitle", ne, o(n)), a(n, "changeWeaponTipsLab", te, o(n)), a(n, "bulletNodeArr", ae, o(n)), a(n, "weaponImgNodeArr", oe, o(n)), a(n, "weaponBtnNode", ie, o(n)), n.weaponBtnNodeArr = [], a(n, "unlockBagBtnNode", le, o(n)), a(n, "fullBagBulletBtn", se, o(n)), a(n, "fullBagBulletBtnLab", re, o(n)), a(n, "clickItemFrame", ce, o(n)), n.oneSecondTimer = 0, n.gameView = void 0, n.isShowPbAnim = !1, n.pbAngle = 20, n.nowPbAngle = 0, n
                }
                t(n, e);
                var i = n.prototype;
                return i.InitUIPanel = function () {
                    var n = this;
                    e.prototype.InitUIPanel.call(this), this.autoChangeTimeLab = this.autoChangeBulletBtn.node.getChildByName("changeTimeLab").getComponent(c), this.autoChangeBulletImg = this.autoChangeBulletBtn.node.getChildByName("adImg"), this.changeWeaponTipsLab.string = T.Instance.getLangInfoByKey("canChangeWeaponTips"), N.Instance.AddBtnClickListener(this.autoChangeBulletBtn, (function () {
                        C.Instance.WatchVideoAD((function () {
                            w.Instance.setIsOpenAutoChangeBullet(1), n.refreshAutoChangeBulletBtn(), H.Instance.PlatformSDKControl.trackEvent("WatchAD", {
                                ADType: "自动换弹"
                            }), n.gameView.resumeGame()
                        }), (function () {
                            n.gameView.resumeGame()
                        }))
                    })), this.fullBagBulletBtnLab.string = T.Instance.getLangInfoByKey("getMoreBullet"), N.Instance.AddBtnClickListener(this.closeBagBtn, (function () {
                        n.HideUIPanel()
                    })), N.Instance.AddBtnClickListener(this.bigCloseBagBtn, (function () {
                        if (!n.gameView.getGuidePanel.node.active || n.gameView.getGuidePanel.node.active && (w.Instance.newHandStep == m.TEACH_CLOSE_BAG || w.Instance.newHandStep == m.TEACH_CLOSE_BAG_2)) {
                            var e = n.gameView.getNewPlayerNode;
                            e.changeWeapon(), e.changePlayerHand(), n.HideUIPanel()
                        }
                    })), this.gameView = b.Instance.GetView(v.UIGameView).getComponent(W);
                    for (var t = 0; t < this.bulletNodeArr.length; t++) {
                        this.bulletNodeArr[t].on(r.EventType.TOUCH_END, (function (e) {
                            n.discardBullet()
                        }), this)
                    }
                    this.weaponBtnNodeArr = this.weaponBtnNode.children;
                    for (var a = function (e) {
                            var t = n.weaponBtnNodeArr[e],
                                a = e;
                            t.on(r.EventType.TOUCH_END, (function (e) {
                                if (a < w.Instance.unlockWeaponArr.length) {
                                    var o = w.Instance.unlockWeaponArr[a];
                                    if (w.Instance.nowUseWeapon = o, n.showWeaponBullet(), n.clickItemFrame.setWorldPosition(t.getWorldPosition()), n.gameView.getNewPlayerNode.changeWeapon(), G.Instance.play("切换枪械"), w.Instance.newHandStep == m.TEACH_CHOOSE_WEAPON && w.Instance.nowUseWeapon == E.信号枪) {
                                        for (var i = w.Instance.getBagBullet(), l = 0; l < i.length; l++)
                                            if (i[l] == E.信号枪) {
                                                var s = new f;
                                                s.FingerPosArr = [n.bulletGrid.children[l].getWorldPosition()], s.GuideTips = [T.Instance.getLangInfoByKey("addBulletToXinHao")], s.IsShowClickAnim = !0, s.isShowMask = !0, s.layer = g.Enum.UI_2D, s.guideTipsOffset = new u(100, 200), n.gameView.showGuidePanel(s), w.Instance.newHandStep = m.TEACH_ADD_BULLET_TO_WEAPON_2;
                                                break
                                            } H.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                                            NewStep: "新手23"
                                        })
                                    } else if (w.Instance.newHandStep == m.TEACH_CHANGE_WEAPON && w.Instance.nowUseWeapon == E.手枪) {
                                        var r = new f;
                                        r.FingerPosArr = [n.closeBagBtn.node.getWorldPosition()], r.GuideTips = [T.Instance.getLangInfoByKey("closeBag")], r.guideTipsOffset = new u(-300, 200), r.IsShowClickAnim = !0, r.isShowMask = !0, r.layer = g.Enum.UI_2D, n.gameView.showGuidePanel(r), H.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                                            NewStep: "新手34"
                                        })
                                    }
                                }
                            }), n)
                        }, o = 0; o < this.weaponBtnNodeArr.length; o++) a(o);
                    for (var i = 0; i < this.unlockBagBtnNode.children.length; i++) {
                        this.unlockBagBtnNode.children[i].on(r.EventType.TOUCH_END, (function () {
                            n.unlockBagItem(), G.Instance.play("UI点击")
                        }))
                    }
                    N.Instance.AddBtnClickListener(this.fullBagBulletBtn, (function () {
                        n.fullBagBullet()
                    })), this.bulletGrid.on(r.EventType.TOUCH_END, (function (e) {
                        n.clickBullet(e)
                    }), this), this.bulletPanelTitle.string = T.Instance.getLangInfoByKey("bulletPanelTitle")
                }, i.ShowUIPanel = function () {
                    var n = this;
                    if (e.prototype.ShowUIPanel.call(this), this.showWeaponBtn(), this.showWeaponBullet(), this.showBagBulletCount(), this.refreshBagUnlockBtn(), this.refreshAutoChangeBulletBtn(), this.nowPbAngle = this.pbAngle, w.Instance.newHandStep == m.TEACH_OPEN_BAG) w.Instance.newHandStep = m.TEACH_ADD_BULLET_TO_BAG, w.Instance.nowUseWeapon = E.手枪, y.Instance.DelayToDoNoObj((function () {
                        var e = new f;
                        e.FingerPosArr = [n.bulletGrid.children[0].getWorldPosition()], e.GuideTips = [T.Instance.getLangInfoByKey("addBulletToWeapon")], e.IsShowClickAnim = !0, e.isShowMask = !0, e.guideTipsOffset = new u(100, 200), e.layer = g.Enum.UI_2D, n.gameView.showGuidePanel(e), H.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                            NewStep: "新手8"
                        })
                    }));
                    else if (w.Instance.newHandStep == m.TEACH_CHOOSE_WEAPON) {
                        var t = new f;
                        t.FingerPosArr = [this.weaponBtnNode.children[1].getWorldPosition()], t.GuideTips = [T.Instance.getLangInfoByKey("chooseWeapon")], t.IsShowClickAnim = !0, t.isShowMask = !0, t.guideTipsOffset = new u(100, 200), t.layer = g.Enum.UI_2D, this.gameView.showGuidePanel(t), H.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                            NewStep: "新手22"
                        })
                    } else if (w.Instance.newHandStep == m.TEACH_CHANGE_WEAPON) {
                        var a = new f;
                        a.FingerPosArr = [this.weaponBtnNode.children[0].getWorldPosition()], a.GuideTips = [T.Instance.getLangInfoByKey("changeToGun")], a.IsShowClickAnim = !0, a.isShowMask = !0, a.guideTipsOffset = new u(100, 200), a.layer = g.Enum.UI_2D, this.gameView.showGuidePanel(a), H.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                            NewStep: "新手33"
                        })
                    }
                }, i.update = function (e) {
                    if (this.oneSecondTimer += e, this.oneSecondTimer > 1 && (this.oneSecondTimer = 0, !this.autoChangeBulletImg.active)) {
                        var n = w.Instance.autoChangeTimeSpace - (S.Instance.GetNowTime() - w.Instance.autoChangeBulletTime);
                        n <= 0 && (w.Instance.setIsOpenAutoChangeBullet(0), this.refreshAutoChangeBulletBtn()), this.autoChangeTimeLab.string = N.Instance.GetMinSecShowLab(n)
                    }
                    this.isShowPbAnim && w.Instance.nowUseWeapon == E.手枪 && (this.getBulletNode(w.Instance.nowUseWeapon).angle += this.nowPbAngle, this.nowPbAngle--, this.nowPbAngle <= 0 && (this.isShowPbAnim = !1))
                }, i.refreshAutoChangeBulletBtn = function () {
                    var e = this.autoChangeBulletBtn.node.getChildByName("autoLab").getComponent(c);
                    this.autoChangeBulletImg.active = !w.Instance.getIsOpenAutoChangeBullet(), this.autoChangeTimeLab.node.active = !this.autoChangeBulletImg.active, this.autoChangeBulletImg.active ? e.string = T.Instance.getLangInfoByKey("autoChangeBullet") : e.string = T.Instance.getLangInfoByKey("duringTimeLab")
                }, i.discardBullet = function () {
                    var e = w.Instance.discardWeaponBullet();
                    switch (w.Instance.nowUseWeapon) {
                        case E.手枪:
                            if (e >= 0) {
                                var n = this.getBulletNode(w.Instance.nowUseWeapon).getChildByName("BulletNode").children[e].getChildByName("BulletImg"),
                                    t = new d(n.getWorldPosition().x, n.getWorldPosition().y - 150);
                                n.getComponent(h).spriteFrame = A.Instance.LoadSpriteFrame("qiang1_danke"), p(n).to(.2, {
                                    worldPosition: t
                                }).call((function () {
                                    n.active = !1
                                })).start()
                            }
                            break;
                        case E.霰弹枪:
                            if (e >= 0) {
                                var a = this.getBulletNode(w.Instance.nowUseWeapon).getChildByName("BulletNode").children[e].getChildByName("BulletImg"),
                                    o = new d(a.getWorldPosition().x, a.getWorldPosition().y - 150);
                                a.getComponent(h).spriteFrame = A.Instance.LoadSpriteFrame("qiang3_danke"), p(a).to(.2, {
                                    worldPosition: o
                                }).call((function () {
                                    a.active = !1
                                })).start()
                            }
                            break;
                        case E.信号枪:
                            if (e >= 0) {
                                var i = this.getBulletNode(w.Instance.nowUseWeapon).getChildByName("BulletNode").children[e].getChildByName("BulletImg"),
                                    l = new d(i.getWorldPosition().x, i.getWorldPosition().y - 150);
                                i.getComponent(h).spriteFrame = A.Instance.LoadSpriteFrame("qiang2_danke"), p(i).to(.2, {
                                    worldPosition: l
                                }).call((function () {
                                    i.active = !1
                                })).start()
                            }
                    }
                }, i.showWeaponBullet = function () {
                    if (0 != w.Instance.unlockWeaponArr.length) {
                        for (var e = w.Instance.getWeaponUseBulletStates(), n = this.getBulletNode(w.Instance.nowUseWeapon).getChildByName("BulletNode"), t = 0; t < this.weaponImgNodeArr.length; t++) {
                            var a = this.weaponImgNodeArr[t];
                            this.bulletNodeArr[t].active = a.active = !1
                        }
                        for (var o = 0; o < w.Instance.unlockWeaponArr.length; o++) {
                            var i = w.Instance.unlockWeaponArr[o];
                            this.bulletNodeArr[i].active = this.weaponImgNodeArr[i].active = i == w.Instance.nowUseWeapon, this.weaponImgNodeArr[i].active && this.clickItemFrame.setWorldPosition(this.weaponBtnNodeArr[o].getWorldPosition())
                        }
                        switch (w.Instance.nowUseWeapon) {
                            case E.手枪:
                                for (var l = e.length - 1; l >= 0; l--) {
                                    var s = e[l],
                                        r = n.children[l].getChildByName("BulletImg");
                                    switch (s.bulletType) {
                                        case k.空弹夹:
                                            r.active = !1;
                                            break;
                                        case k.使用过的子弹:
                                            r.active = !0, r.getComponent(h).spriteFrame = A.Instance.LoadSpriteFrame("qiang1_zidan2");
                                            break;
                                        case k.待发射的子弹:
                                            r.active = !0, r.getComponent(h).spriteFrame = A.Instance.LoadSpriteFrame("qiang1_zidan"), r.setPosition(d.ZERO)
                                    }
                                }
                                break;
                            case E.霰弹枪:
                                for (var c = e.length - 1; c >= 0; c--) {
                                    var u = e[c],
                                        g = n.children[c].getChildByName("BulletImg");
                                    switch (u.bulletType) {
                                        case k.空弹夹:
                                            g.active = !1;
                                            break;
                                        case k.使用过的子弹:
                                            g.active = !0, g.getComponent(h).spriteFrame = A.Instance.LoadSpriteFrame("qiang3_zidan3");
                                            break;
                                        case k.待发射的子弹:
                                            g.active = !0, g.getComponent(h).spriteFrame = A.Instance.LoadSpriteFrame("qiang3_zidan"), g.setPosition(d.ZERO)
                                    }
                                }
                                break;
                            case E.信号枪:
                                for (var p = e.length - 1; p >= 0; p--) {
                                    var B = e[p],
                                        I = n.children[p].getChildByName("BulletImg");
                                    switch (B.bulletType) {
                                        case k.空弹夹:
                                            I.active = !1;
                                            break;
                                        case k.使用过的子弹:
                                            I.active = !0, I.getComponent(h).spriteFrame = A.Instance.LoadSpriteFrame("qiang2_zidan2");
                                            break;
                                        case k.待发射的子弹:
                                            I.active = !0, I.getComponent(h).spriteFrame = A.Instance.LoadSpriteFrame("qiang2_zidan"), I.setPosition(d.ZERO)
                                    }
                                }
                        }
                    }
                }, i.showWeaponBtn = function () {
                    for (var e = w.Instance.unlockWeaponArr, n = 0; n < this.weaponBtnNodeArr.length; n++) {
                        this.weaponBtnNodeArr[n].getChildByName("weaponImg").getComponent(h).node.active = !1
                    }
                    for (var t = 0; t < e.length; t++) {
                        var a = e[t],
                            o = this.weaponBtnNodeArr[t].getChildByName("weaponImg").getComponent(h);
                        o.node.active = !0, o.spriteFrame = A.Instance.LoadSpriteFrame("qiang" + (a + 1))
                    }
                }, i.showBagBulletCount = function () {
                    for (var e = w.Instance.getBagBullet(), n = this.bulletGrid.children, t = 0; t < n.length; t++) {
                        var a = n[t].getComponent(_);
                        e.length > t ? a.initBullet(e[t]) : a.setEmpty()
                    }
                }, i.clickBullet = function (e) {
                    for (var n, t = w.Instance.getBagBullet(), a = this.bulletGrid.children, o = -1, i = 0, l = 0; l < a.length; l++) {
                        var s = a[l],
                            r = S.Instance.GetWorldPointsDistance(s.getWorldPosition(), N.Instance.GetUINodeWorldPos(e, P.instance.node));
                        t.length > l && (-1 == o || o > r) && (o = r, n = s.getComponent(_), i = l)
                    }
                    if (n)
                        if (n.getBagBulletType == w.Instance.nowUseWeapon)
                            if (w.Instance.isAddUseBullet()) {
                                w.Instance.addWeaponButtle();
                                var c = w.Instance.getBagBullet();
                                c.splice(i, 1), w.Instance.setBagBullet(c), this.showBagBulletCount(), this.showWeaponBullet(), w.Instance.newHandStep == m.TEACH_ADD_BULLET_TO_BAG ? this.clickBulletGuide() : w.Instance.newHandStep < m.TEACH_CLOSE_BAG ? this.showGuideAddBullet() : w.Instance.newHandStep == m.TEACH_ADD_BULLET_TO_WEAPON_2 && this.clickBulletGuide(), G.Instance.play("换子弹")
                            } else this.clickBulletGuide(), I.Instance.ShowTips(T.Instance.getLangInfoByKey("没有空弹夹"));
                    else I.Instance.ShowTips(T.Instance.getLangInfoByKey("子弹不符合当前枪械"))
                }, i.showGuideAddBullet = function () {
                    var e = this,
                        n = new f,
                        t = w.Instance.getWeaponEmptyBulletCount();
                    n.FingerPosArr = [this.bulletGrid.children[0].getWorldPosition()], n.GuideTips = [T.Instance.getLangInfoByKey("weaponBulletTips_1", t.toString())], n.IsShowClickAnim = !0, n.isShowMask = !0, n.guideTipsOffset = new u(300, 200), n.layer = g.Enum.UI_2D, this.gameView.showGuidePanel(n), 0 == t && y.Instance.DelayToDo((function () {
                        e.clickBulletGuide()
                    }), this, .2), H.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                        NewStep: "上子弹剩余" + t + "_新手"
                    })
                }, i.clickBulletGuide = function () {
                    var e = this;
                    if (w.Instance.newHandStep == m.TEACH_ADD_BULLET_TO_BAG) {
                        w.Instance.newHandStep = m.TEACH_SHOW_WEAPON_BULLET;
                        var n = new f;
                        n.FingerPosArr = [this.bulletNodeArr[0].getWorldPosition()], n.GuideTips = [T.Instance.getLangInfoByKey("weaponBulletTips_0")], n.IsShowClickAnim = !0, n.isShowMask = !0, n.isShowFinger = !1, n.layer = g.Enum.UI_2D, this.gameView.showGuidePanel(n), H.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                            NewStep: "新手9"
                        }), y.Instance.DelayToDo((function () {
                            e.showGuideAddBullet(), H.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                                NewStep: "新手10"
                            })
                        }), this, 1.5)
                    } else if (w.Instance.newHandStep == m.TEACH_SHOW_WEAPON_BULLET) {
                        if (!w.Instance.isAddUseBullet()) {
                            w.Instance.newHandStep = m.TEACH_CLOSE_BAG;
                            var t = new f;
                            t.FingerPosArr = [this.closeBagBtn.node.getWorldPosition()], t.GuideTips = [T.Instance.getLangInfoByKey("closeBag")], t.guideTipsOffset = new u(-300, 200), t.IsShowClickAnim = !0, t.isShowMask = !0, t.layer = g.Enum.UI_2D, this.gameView.showGuidePanel(t)
                        }
                    } else if (w.Instance.newHandStep == m.TEACH_ADD_BULLET_TO_WEAPON_2) {
                        w.Instance.newHandStep = m.TEACH_CLOSE_BAG_2;
                        var a = new f;
                        a.FingerPosArr = [this.closeBagBtn.node.getWorldPosition()], a.GuideTips = [T.Instance.getLangInfoByKey("closeBag")], a.guideTipsOffset = new u(-300, 200), a.IsShowClickAnim = !0, a.isShowMask = !0, a.layer = g.Enum.UI_2D, this.gameView.showGuidePanel(a), H.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                            NewStep: "新手24"
                        })
                    }
                }, i.getBulletNode = function (e) {
                    void 0 === e && (e = w.Instance.nowUseWeapon);
                    for (var n = w.Instance.unlockWeaponArr, t = 0; t < n.length; t++) {
                        var a = n[t];
                        if (a == e) return this.bulletNodeArr[a]
                    }
                }, i.refreshBagUnlockBtn = function () {
                    for (var e = 0; e < this.unlockBagBtnNode.children.length; e++) {
                        this.unlockBagBtnNode.children[e].active = e >= w.Instance.bagUnlockGroupIndex
                    }
                }, i.unlockBagItem = function () {
                    var e = this;
                    w.Instance.bagUnlockGroupIndex < w.Instance.maxGroupCount && C.Instance.WatchVideoAD((function () {
                        w.Instance.bagUnlockGroupIndex++, w.Instance.maxBagBulletCount += w.Instance.oneGroupBulletCount, e.refreshBagUnlockBtn(), e.gameView.resumeGame()
                    }), (function () {
                        e.gameView.resumeGame()
                    }))
                }, i.fullBagBullet = function () {
                    var e = this;
                    C.Instance.WatchVideoAD((function () {
                        w.Instance.fullBagBullet(), e.showWeaponBullet(), e.showBagBulletCount(), H.Instance.PlatformSDKControl.trackEvent("WatchAD", {
                            ADType: "补充子弹"
                        }), e.gameView.resumeGame()
                    }), (function () {
                        e.gameView.resumeGame()
                    }))
                }, i.HideUIPanel = function () {
                    e.prototype.HideUIPanel.call(this), w.Instance.newHandStep == m.TEACH_CLOSE_BAG ? (w.Instance.newHandStep = m.TEACH_TAKE_WEAPON, this.gameView.showGuideClickWeaponBtn(), H.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                        NewStep: "新手16"
                    })) : w.Instance.newHandStep == m.TEACH_CLOSE_BAG_2 ? (w.Instance.newHandStep = m.TEACH_TAKE_WEAPON_2, this.gameView.showGuideClickWeaponBtn(), H.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                        NewStep: "新手25"
                    })) : w.Instance.newHandStep == m.TEACH_CHANGE_WEAPON && (this.gameView.showGuideClickWeaponBtn(), H.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                        NewStep: "新手35"
                    }))
                }, n
            }(B)).prototype, "closeBagBtn", [U], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Q = n(X.prototype, "bigCloseBagBtn", [D], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), $ = n(X.prototype, "autoChangeBulletBtn", [O], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), ee = n(X.prototype, "bulletGrid", [F], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), ne = n(X.prototype, "bulletPanelTitle", [K], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), te = n(X.prototype, "changeWeaponTipsLab", [V], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), ae = n(X.prototype, "bulletNodeArr", [z], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return []
                }
            }), oe = n(X.prototype, "weaponImgNodeArr", [M], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return []
                }
            }), ie = n(X.prototype, "weaponBtnNode", [q], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), le = n(X.prototype, "unlockBagBtnNode", [x], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), se = n(X.prototype, "fullBagBulletBtn", [R], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), re = n(X.prototype, "fullBagBulletBtnLab", [Y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), ce = n(X.prototype, "clickItemFrame", [Z], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), j = X)) || j));
            i._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UIBoxQuestionPanel.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameConfig.ts", "./TimeControl.ts", "./LangInfoTools.ts", "./UITools.ts", "./InfoMgr.ts", "./UIGamePanelBase.ts"], (function (e) {
    "use strict";
    var t, i, n, o, s, a, r, l, c, u, g, h, f, p, I, b;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, i = e.inheritsLoose, n = e.initializerDefineProperty, o = e.assertThisInitialized
        }, function (e) {
            s = e.cclegacy, a = e._decorator, r = e.Label, l = e.Node, c = e.Button
        }, function (e) {
            u = e.GameConfig, g = e.TaskConfig
        }, function (e) {
            h = e.TimeControl
        }, function (e) {
            f = e.LangInfoTools
        }, function (e) {
            p = e.UITools
        }, function (e) {
            I = e.InfoMgr
        }, function (e) {
            b = e.UIGamePanelBase
        }],
        execute: function () {
            var y, d, m, v, T, B, P, w, L, q, x, C, _;
            s._RF.push({}, "155f898Je9ONoA/QFpP8nwL", "UIBoxQuestionPanel", void 0);
            var Q = a.ccclass,
                G = a.property;
            e("UIBoxQuestionPanel", (y = Q("UIBoxQuestionPanel"), d = G({
                type: r
            }), m = G({
                type: l
            }), v = G({
                type: c
            }), T = G({
                type: l
            }), B = G({
                type: l
            }), y((L = t((w = function (e) {
                function t() {
                    for (var t, i = arguments.length, s = new Array(i), a = 0; a < i; a++) s[a] = arguments[a];
                    return t = e.call.apply(e, [this].concat(s)) || this, n(t, "qesLabel", L, o(t)), n(t, "qesGroup", q, o(t)), n(t, "closeBtn", x, o(t)), n(t, "rightTag", C, o(t)), n(t, "errTag", _, o(t)), t.isFristOpen = !0, t.boxQuesInfoItem = void 0, t.isAnswer = !1, t
                }
                i(t, e);
                var s = t.prototype;
                return s.start = function () {
                    var e = this;
                    p.Instance.AddBtnClickListener(this.closeBtn, (function () {
                        e.hidePanel()
                    }))
                }, s.update = function (e) {}, s.showQuestion = function () {
                    var e = this;
                    this.node.active = !0, this.isAnswer = this.rightTag.active = this.errTag.active = !1;
                    var t = I.instance.boxQesInfoDic,
                        i = u.Instance.getBoxQuestionID,
                        n = t[i];
                    this.boxQuesInfoItem = n, this.qesLabel.string = f.Instance.getLangInfoByKey(n.title);
                    for (var o = function (t) {
                            var n = e.qesGroup.children[t],
                                o = t;
                            e.isFristOpen && n.on(l.EventType.TOUCH_END, (function () {
                                e.onLabItemClick(o)
                            }));
                            var s = n.getChildByName("queLabel").getComponent(r);
                            s.string = 0 == t ? f.Instance.getLangInfoByKey("lang_box_qa_" + (2 * i - 1)) : f.Instance.getLangInfoByKey("lang_box_qa_" + 2 * i)
                        }, s = 0; s < this.qesGroup.children.length; s++) o(s);
                    this.isFristOpen = !1
                }, s.onLabItemClick = function (e) {
                    var t = this;
                    if (!this.isAnswer) {
                        var i = Number(this.boxQuesInfoItem.rightAnswer);
                        if (e + 1 == i) {
                            var n = this.qesGroup.children[i - 1].getChildByName("qesFrame");
                            this.rightTag.setWorldPosition(n.getWorldPosition()), this.rightTag.active = !0, this.gameView.openBox()
                        } else {
                            var o = this.qesGroup.children[e].getChildByName("qesFrame");
                            this.errTag.setWorldPosition(o.getWorldPosition()), this.errTag.active = !0, this.gameView.destroyBox()
                        }
                        this.isAnswer = !0, h.Instance.DelayToDo((function () {
                            t.node.active && t.hidePanel()
                        }), this, .5)
                    }
                }, s.hidePanel = function () {
                    this.node.active = !1, u.Instance.touchTaskStep <= g.ANSWER_QB && this.gameView.getGameTaskMgr.finishTask(g.OPEN_DOOR)
                }, t
            }(b)).prototype, "qesLabel", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), q = t(w.prototype, "qesGroup", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), x = t(w.prototype, "closeBtn", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), C = t(w.prototype, "rightTag", [T], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), _ = t(w.prototype, "errTag", [B], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), P = w)) || P));
            s._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UIControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./GameConfig.ts", "./LYCSDK.ts", "./LYCSDKEventHelper.ts", "./ResMgr.ts"], (function (e) {
    "use strict";
    var n, t, i, a, r, o, s, c, l, u, p, f, m, d, y, I, C, g, h, v, S;
    return {
        setters: [function (e) {
            n = e.applyDecoratedDescriptor, t = e.inheritsLoose, i = e.initializerDefineProperty, a = e.assertThisInitialized, r = e.createClass
        }, function (e) {
            o = e.cclegacy, s = e._decorator, c = e.Camera, l = e.Enum, u = e.CCBoolean, p = e.UITransform, f = e.screen, m = e.dragonBones, d = e.find, y = e.Component
        }, function (e) {
            I = e.GameConfig, C = e.NewHandStep
        }, function (e) {
            g = e.LYCSDK, h = e.PlatformType
        }, function (e) {
            v = e.LYCSDKEventHelper
        }, function (e) {
            S = e.ResMgr
        }],
        execute: function () {
            var U, w, T, D, b, P, G, H, _, z, E, L;
            e("UIControlType", void 0), o._RF.push({}, "1da5fQLOI5HrKFIZi0J48OM", "UIControl", void 0);
            var N, F = s.ccclass,
                B = s.property;
            ! function (e) {
                e[e.Game = 0] = "Game", e[e.Editor = 1] = "Editor"
            }(N || (N = e("UIControlType", {})));
            e("UIControl", (U = F("UIControl"), w = B({
                type: c
            }), T = B({
                type: l(N)
            }), D = B({
                type: u,
                displayName: "是否关闭新手"
            }), b = B({
                type: u,
                displayName: "是否是达人模式"
            }), U(((L = function (e) {
                function n() {
                    for (var n, t = arguments.length, r = new Array(t), o = 0; o < t; o++) r[o] = arguments[o];
                    return n = e.call.apply(e, [this].concat(r)) || this, i(n, "UICamera", H, a(n)), n.uiTrans = void 0, i(n, "UIType", _, a(n)), i(n, "isPassNewHand", z, a(n)), i(n, "isDPType", E, a(n)), n.MainSceneBundle = void 0, n
                }
                t(n, e);
                var o = n.prototype;
                return o.start = function () {
                    this.uiTrans = this.getComponent(p), I.Instance.CanvansSize = this.uiTrans.contentSize, this.UIType == N.Game && S.Instance.InitBundle(), g.Instance.GamePlatform != h.Windows ? v.instance.on("LoginSucceed", (function () {
                        g.Instance.GetUserInfo()
                    })) : this.isPassNewHand && g.Instance.GamePlatform == h.Windows && (I.Instance.newHandStep = C.FINISH_GUIDE, I.Instance.isFirstEnterGame), g.Instance.GamePlatform == h.Windows && f.requestFullScreen()
                }, o.update = function (e) {}, o.ChangeDBShow = function (e, n, t) {
                    var i = e.armature(),
                        a = i.getSlot("脑"),
                        r = n.armatureName;
                    m.CCFactory.getInstance().replaceSlotDisplay(n.getArmatureKey(), r, "脑", t, a), i.invalidUpdate()
                }, r(n, [{
                    key: "isToDaren",
                    get: function () {
                        return this.isDPType && g.Instance.GamePlatform == h.Windows
                    }
                }], [{
                    key: "instance",
                    get: function () {
                        return null == this._instance && (this._instance = d("UI").getComponent(n)), this._instance
                    }
                }]), n
            }(y))._instance = void 0, H = n((G = L).prototype, "UICamera", [w], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), _ = n(G.prototype, "UIType", [T], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return N.Editor
                }
            }), z = n(G.prototype, "isPassNewHand", [D], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return !1
                }
            }), E = n(G.prototype, "isDPType", [b], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return !1
                }
            }), P = G)) || P));
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UIDeadPanel.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LYCADSDK.ts", "./UITools.ts", "./UIGamePanelBase.ts", "./GameConfig.ts", "./UIPanelMgr.ts", "./LYCSDK.ts"], (function (t) {
    "use strict";
    var e, n, i, a, o, r, s, c, l, u, D, h, f, p, d;
    return {
        setters: [function (t) {
            e = t.applyDecoratedDescriptor, n = t.inheritsLoose, i = t.initializerDefineProperty, a = t.assertThisInitialized
        }, function (t) {
            o = t.cclegacy, r = t._decorator, s = t.Label, c = t.Button
        }, function (t) {
            l = t.LYCADSDK
        }, function (t) {
            u = t.UITools
        }, function (t) {
            D = t.UIGamePanelBase
        }, function (t) {
            h = t.GameConfig
        }, function (t) {
            f = t.UIPanelMgr, p = t.UIPanelConfig
        }, function (t) {
            d = t.LYCSDK
        }],
        execute: function () {
            var I, P, w, C, S, m, y, b, g, v, B;
            o._RF.push({}, "b8b65kZ/ARNWolya5UK2FLh", "UIDeadPanel", void 0);
            var L = r.ccclass,
                U = r.property;
            t("UIDeadPanel", (I = L("UIDeadPanel"), P = U({
                type: s
            }), w = U({
                type: c
            }), C = U({
                type: c
            }), S = U({
                type: c
            }), I((b = e((y = function (t) {
                function e() {
                    for (var e, n = arguments.length, o = new Array(n), r = 0; r < n; r++) o[r] = arguments[r];
                    return e = t.call.apply(t, [this].concat(o)) || this, i(e, "countDownLab", b, a(e)), i(e, "recoverBtn", g, a(e)), i(e, "restartBtn", v, a(e)), i(e, "shareBtn", B, a(e)), e.countDownNum = 10, e.countDown = 0, e.oneSecondTimer = 0, e.isStartCD = !1, e
                }
                n(e, t);
                var o = e.prototype;
                return o.onLoad = function () {
                    var t = this;
                    u.Instance.AddBtnClickListener(this.recoverBtn, (function () {
                        t.isStartCD = !1, l.Instance.WatchVideoAD((function () {
                            t.gameView.recoverPlayer(), d.Instance.PlatformSDKControl.trackEvent("WatchAD", {
                                ADType: "原地复活"
                            })
                        }), (function () {
                            t.isStartCD = !0
                        }))
                    })),
                     u.Instance.AddBtnClickListener(this.restartBtn, (function () {
                        t.restartGame()
                    })), 
                    u.Instance.AddBtnClickListener(this.shareBtn, (function () {
                        d.Instance.PlatformSDKControl.shareRecord()
                    }))
                    
                    this.shareBtn.node.active = false
                    console.log("shareBtn",this.shareBtn,this)
                }, o.restartGame = function () {
                    h.Instance.playerHavePower > 0 ? (
                        this.gameView.restartLevel(), f.Instance.DesPanel(p.UINoGoldPowerPanel)
                    ) : (this.isStartCD = !1, h.Instance.isClickDeadRestart = !0, h.Instance.isClickStartBtnByNoPower = !0, f.Instance.OpenPanel(p.UINoGoldPowerPanel))
                }, o.recoverCD = function () {
                    this.isStartCD = !0, h.Instance.isClickDeadRestart = !1
                }, o.showPanel = function () {
                    this.node.active = !0, this.isStartCD = !0, this.countDown = this.countDownNum, this.countDownLab.string = this.countDown.toString()
                }, o.hidePanel = function () {
                    this.isStartCD = !1, this.node.active = !1
                }, o.update = function (t) {
                    this.isStartCD && (this.oneSecondTimer += t, this.oneSecondTimer > 1 && (this.oneSecondTimer = 0, this.countDown -= 1, this.countDownLab.string = this.countDown.toString(), this.countDown <= 0 && (h.Instance.playerHavePower > 0 ? this.gameView.restartLevel() : (this.isStartCD = !1, f.Instance.OpenPanel(p.UINoGoldPowerPanel)))))
                }, e
            }(D)).prototype, "countDownLab", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), g = e(y.prototype, "recoverBtn", [w], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), v = e(y.prototype, "restartBtn", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), B = e(y.prototype, "shareBtn", [S], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), m = y)) || m));
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UIDrugPanel.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LYCADSDK.ts", "./ResMgr.ts", "./LangInfoTools.ts", "./UITools.ts", "./UIGameView.ts", "./UIGamePanelBase.ts"], (function (e) {
    "use strict";
    var t, n, a, i, o, r, l, u, s, c, g, p, d, y, f, h;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, n = e.inheritsLoose, a = e.initializerDefineProperty, i = e.assertThisInitialized
        }, function (e) {
            o = e.cclegacy, r = e._decorator, l = e.Label, u = e.Sprite, s = e.Button
        }, function (e) {
            c = e.LYCADSDK
        }, function (e) {
            g = e.ResMgr
        }, function (e) {
            p = e.LangInfoTools
        }, function (e) {
            d = e.UITools
        }, function (e) {
            y = e.PlayerHandDataArr, f = e.PlayerHandType
        }, function (e) {
            h = e.UIGamePanelBase
        }],
        execute: function () {
            var m, b, I, D, B, L, w, P, A, H, T, z, v, G, U, F, S, K, V, _, C;
            o._RF.push({}, "d7007Kzat1GGZNugFQ7wrMU", "UIDrugPanel", void 0);
            var k = r.ccclass,
                M = r.property;
            e("UIDrugPanel", (m = k("UIDrugPanel"), b = M({
                type: l
            }), I = M({
                type: l
            }), D = M({
                type: u
            }), B = M({
                type: u
            }), L = M({
                type: l
            }), w = M({
                type: u
            }), P = M({
                type: s
            }), A = M({
                type: s
            }), H = M({
                type: s
            }), m((v = t((z = function (e) {
                function t() {
                    for (var t, n = arguments.length, o = new Array(n), r = 0; r < n; r++) o[r] = arguments[r];
                    return t = e.call.apply(e, [this].concat(o)) || this, a(t, "toolTitle", v, i(t)), a(t, "toolGoodLab", G, i(t)), a(t, "nowHandImg", U, i(t)), a(t, "changeHandImg", F, i(t)), a(t, "toolBadLab", S, i(t)), a(t, "toolImg", K, i(t)), a(t, "closePanelBtn", V, i(t)), a(t, "useBtn", _, i(t)), a(t, "useADBtn", C, i(t)), t.touchDrug = void 0, t
                }
                n(t, e);
                var o = t.prototype;
                return o.onLoad = function () {
                    var e = this;
                    d.Instance.AddBtnClickListener(this.closePanelBtn, (function () {
                        e.hidePanel()
                    })), d.Instance.AddBtnClickListener(this.useBtn, (function () {
                        e.useDrug()
                    })), d.Instance.AddBtnClickListener(this.useADBtn, (function () {
                        c.Instance.WatchVideoAD((function () {
                            e.useADDrug()
                        }), (function () {
                            e.gameView.resumeGame()
                        }))
                    }))
                }, o.update = function (e) {}, o.showPanel = function (e) {
                    this.node.active = !0, this.touchDrug = e, this.toolImg.spriteFrame = g.Instance.LoadSpriteFrame(y.handImgArr[e]), this.toolTitle.string = p.Instance.getLangInfoByKey("arm" + e + "DrugTitle"), this.toolGoodLab.string = p.Instance.getLangInfoByKey("arm" + e + "DrugGood"), this.toolBadLab.string = p.Instance.getLangInfoByKey("arm" + e + "DrugBad"), this.nowHandImg.spriteFrame = g.Instance.LoadSpriteFrame("dpHandType_" + this.gameView.getNewPlayerNode.getnowPlayHandType), this.changeHandImg.spriteFrame = g.Instance.LoadSpriteFrame("dpHandType_" + e)
                }, o.useDrug = function () {
                    this.gameView.useHandDrug(), this.hidePanel()
                }, o.useADDrug = function () {
                    this.gameView.useHandDrug(f.麒麟臂), this.hidePanel()
                }, o.hidePanel = function () {
                    e.prototype.hidePanel.call(this)
                }, t
            }(h)).prototype, "toolTitle", [b], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), G = t(z.prototype, "toolGoodLab", [I], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), U = t(z.prototype, "nowHandImg", [D], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), F = t(z.prototype, "changeHandImg", [B], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), S = t(z.prototype, "toolBadLab", [L], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), K = t(z.prototype, "toolImg", [w], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), V = t(z.prototype, "closePanelBtn", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), _ = t(z.prototype, "useBtn", [A], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), C = t(z.prototype, "useADBtn", [H], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), T = z)) || T));
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UIGamePanelBase.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./UIViewMgr.ts", "./UIGameView.ts"], (function (e) {
    "use strict";
    var t, n, a, i, r, o, s, c;
    return {
        setters: [function (e) {
            t = e.inheritsLoose, n = e.createClass
        }, function (e) {
            a = e.cclegacy, i = e._decorator, r = e.Component
        }, function (e) {
            o = e.UIViewMgr, s = e.UIViewConfig
        }, function (e) {
            c = e.UIGameView
        }],
        execute: function () {
            var u;
            a._RF.push({}, "78e5bnnuTxCjZ4rPRtT25yd", "UIGamePanelBase", void 0);
            var l = i.ccclass;
            i.property, e("UIGamePanelBase", l("UIGamePanelBase")(u = function (e) {
                function a() {
                    for (var t, n = arguments.length, a = new Array(n), i = 0; i < n; i++) a[i] = arguments[i];
                    return (t = e.call.apply(e, [this].concat(a)) || this)._gameView = void 0, t
                }
                t(a, e);
                var i = a.prototype;
                return i.start = function () {}, i.update = function (e) {}, i.hidePanel = function () {
                    this.node.active = !1, this.gameView.resumeGame()
                }, n(a, [{
                    key: "gameView",
                    get: function () {
                        return this._gameView || (this._gameView = o.Instance.GetView(s.UIGameView).getComponent(c)), this._gameView
                    }
                }]), a
            }(r)) || u);
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UIGameView.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BaseUIView.ts", "./CommonTipsMgr.ts", "./GameConfig.ts", "./GuidePanel.ts", "./LYCADSDK.ts", "./LYCSDKEventHelper.ts", "./ResMgr.ts", "./TimeControl.ts", "./GameTools.ts", "./LangInfoTools.ts", "./UITools.ts", "./UIControl.ts", "./UIPanelMgr.ts", "./UIViewMgr.ts", "./AStarMgr.ts", "./Grid.ts", "./BossBulletControl.ts", "./BossControlBase.ts", "./BossEggControl.ts", "./BossStoneControl.ts", "./FinalBossBase.ts", "./FogControl.ts", "./LevelControl.ts", "./NewPlayerMoveControl.ts", "./PlayerBulletBase.ts", "./PlayerControl.ts", "./TouchMoveTipsControl.ts", "./WeaponControlBase.ts", "./passLevelPanel.ts", "./UIBoxQuestionPanel.ts", "./UIDeadPanel.ts", "./UIDrugPanel.ts", "./UIGamePanelBase.ts", "./BgmMgr.ts", "./SoundMgr.ts", "./LYCSDK.ts", "./TaskMgr.ts"], (function (e) {
    "use strict";
    var t, n, a, o, i, l, r, s, c, h, u, g, d, p, y, f, m, k, w, v, I, b, P, B, S, T, N, D, A, G, C, L, H, W, M, F, x, K, E, _, V, z, U, O, R, Y, X, Z, Q, j, q, J, $, ee, te, ne, ae, oe, ie, le, re, se, ce, he, ue, ge, de, pe, ye, fe, me, ke, we, ve, Ie, be, Pe;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, n = e.inheritsLoose, a = e.initializerDefineProperty, o = e.assertThisInitialized, i = e.createClass
        }, function (e) {
            l = e.cclegacy, r = e._decorator, s = e.CCBoolean, c = e.Node, h = e.Button, u = e.Label, g = e.UITransform, d = e.dragonBones, p = e.Sprite, y = e.Camera, f = e.CCInteger, m = e.UIOpacity, k = e.CCFloat, w = e.Vec3, v = e.Size, I = e.Tween, b = e.tween, P = e.Layers, B = e.Layout, S = e.TiledMap, T = e.math, N = e.Vec2, D = e.Animation, A = e.TiledTile, G = e.TweenSystem
        }, function (e) {
            C = e.BaseUIView
        }, function (e) {
            L = e.CommonTipsMgr
        }, function (e) {
            H = e.GameConfig, W = e.NewHandStep, M = e.TaskConfig
        }, function (e) {
            F = e.GuidePanel, x = e.GuideData
        }, function (e) {
            K = e.LYCADSDK
        }, function (e) {
            E = e.LYCSDKEventHelper, _ = e.EventConfig
        }, function (e) {
            V = e.ResMgr
        }, function (e) {
            z = e.TimeControl
        }, function (e) {
            U = e.GameTools
        }, function (e) {
            O = e.LangInfoTools
        }, function (e) {
            R = e.UITools
        }, function (e) {
            Y = e.UIControl
        }, function (e) {
            X = e.UIPanelMgr, Z = e.UIPanelConfig
        }, function (e) {
            Q = e.UIViewMgr, j = e.UIViewConfig
        }, function (e) {
            q = e.AStarMgr
        }, function (e) {
            J = e.Grid
        }, function (e) {
            $ = e.BossBulletControl
        }, function (e) {
            ee = e.BossControlBase, te = e.BossState
        }, function (e) {
            ne = e.BossEggControl
        }, function (e) {
            ae = e.BossStoneControl
        }, function (e) {
            oe = e.FinalBossBase
        }, function (e) {
            ie = e.FogControl
        }, function (e) {
            le = e.LevelControl
        }, function (e) {
            re = e.NewPlayerMoveControl
        }, function (e) {
            se = e.PlayerBulletBase
        }, function (e) {
            ce = e.PlayerControl, he = e.PlayerActionType
        }, function (e) {
            ue = e.TouchMoveTipsControl
        }, function (e) {
            ge = e.WeaponType, de = e.WeaponPrefabConfig, pe = e.WeaponControlBase
        }, function (e) {
            ye = e.passLevelPanel
        }, function (e) {
            fe = e.UIBoxQuestionPanel
        }, function (e) {
            me = e.UIDeadPanel
        }, function (e) {
            ke = e.UIDrugPanel
        }, function (e) {
            we = e.UIGamePanelBase
        }, function (e) {
            ve = e.BgmMgr
        }, function (e) {
            Ie = e.SoundMgr
        }, function (e) {
            be = e.LYCSDK
        }, function (e) {
            Pe = e.TaskMgr
        }],
        execute: function () {
            var Be, Se, Te, Ne, De, Ae, Ge, Ce, Le, He, We, Me, Fe, xe, Ke, Ee, _e, Ve, ze, Ue, Oe, Re, Ye, Xe, Ze, Qe, je, qe, Je, $e, et, tt, nt, at, ot, it, lt, rt, st, ct, ht, ut, gt, dt, pt, yt, ft, mt, kt, wt, vt, It, bt, Pt, Bt, St, Tt, Nt, Dt, At, Gt, Ct, Lt, Ht, Wt, Mt, Ft, xt, Kt, Et, _t, Vt, zt, Ut, Ot, Rt, Yt, Xt, Zt, Qt, jt, qt, Jt, $t, en, tn, nn, an, on, ln, rn, sn, cn, hn, un, gn, dn, pn, yn, fn, mn, kn, wn, vn, In;
            e({
                BlockType: void 0,
                ColliderTagConfig: void 0,
                GameState: void 0,
                PlayerHandType: void 0
            }), l._RF.push({}, "ecfc13Pk8RDFLF0dpPKMIod", "UIGameView", void 0);
            var bn, Pn = r.ccclass,
                Bn = r.property;
            ! function (e) {
                e[e.Def = 0] = "Def", e[e.Boss = 1] = "Boss", e[e.PlayerBullet = 2] = "PlayerBullet", e[e.Player = 3] = "Player", e[e.Weapon = 4] = "Weapon", e[e.Box = 5] = "Box", e[e.Wall = 6] = "Wall", e[e.DoorSwitch = 7] = "DoorSwitch", e[e.PlayerHand = 8] = "PlayerHand", e[e.BossMagnetic = 9] = "BossMagnetic", e[e.PlayerDrug = 10] = "PlayerDrug", e[e.WeaponBullet = 11] = "WeaponBullet", e[e.HelpDrug = 12] = "HelpDrug", e[e.BossEgg = 13] = "BossEgg", e[e.PassDoor = 14] = "PassDoor", e[e.LevelArena = 15] = "LevelArena"
            }(bn || (bn = e("ColliderTagConfig", {})));
            var Sn, Tn = e("LayersConfig", (function () {}));
            Tn.DEFAUT = 0, Tn.LEVELMAP = 1,
                function (e) {
                    e[e.road = 0] = "road", e[e.roadBlock = 1] = "roadBlock", e[e.startBlock = 2] = "startBlock", e[e.finalBlock = 3] = "finalBlock", e[e.none = 4] = "none", e[e.door = 5] = "door", e[e.wall = 6] = "wall", e[e.noWalkLayer = 7] = "noWalkLayer"
                }(Sn || (Sn = e("BlockType", {})));
            var Nn, Dn, An = e("BlockData", (function () {
                this.blockVec2 = void 0, this.blockKey = void 0, this.blockItemType = void 0
            }));
            ! function (e) {
                e[e.start = 0] = "start", e[e.playing = 1] = "playing", e[e.pause = 2] = "pause", e[e.stop = 3] = "stop"
            }(Nn || (Nn = e("GameState", {}))),
            function (e) {
                e[e["无"] = 0] = "无", e[e["绿巨人"] = 1] = "绿巨人", e[e["麒麟臂"] = 2] = "麒麟臂", e[e["路飞手臂"] = 3] = "路飞手臂", e[e["治疗药剂"] = 4] = "治疗药剂"
            }(Dn || (Dn = e("PlayerHandType", {})));
            var Gn = e("PlayerHandDataArr", (function () {}));
            Gn.handImgArr = ["", "绿巨人", "麒麟臂", "路飞", ""], Gn.handNameArr = ["", "绿巨人", "麒麟臂", "恶魔果实", ""];
            e("UIGameView", (Be = Pn("UIGameView"), Se = Bn({
                type: s,
                displayName: "是否是无敌版本"
            }), Te = Bn({
                type: s,
                displayName: "测试阶段不生成迷雾，减少加载时间"
            }), Ne = Bn({
                type: c
            }), De = Bn({
                type: c
            }), Ae = Bn({
                type: c
            }), Ge = Bn({
                type: c
            }), Ce = Bn({
                type: c
            }), Le = Bn({
                type: c
            }), He = Bn({
                type: c
            }), We = Bn({
                type: c
            }), Me = Bn({
                type: c
            }), Fe = Bn({
                type: h
            }), xe = Bn({
                type: h
            }), Ke = Bn({
                type: h
            }), Ee = Bn({
                type: u
            }), _e = Bn({
                type: h
            }), Ve = Bn({
                type: h
            }), ze = Bn({
                type: g,
                displayName: "白光"
            }), Ue = Bn({
                type: g
            }), Oe = Bn({
                type: c
            }), Re = Bn({
                type: c
            }), Ye = Bn({
                type: c
            }), Xe = Bn({
                type: c
            }), Ze = Bn({
                type: c
            }), Qe = Bn({
                type: d.ArmatureDisplay
            }), je = Bn({
                type: d.ArmatureDisplay
            }), qe = Bn({
                type: p
            }), Je = Bn({
                type: c
            }), $e = Bn({
                type: c
            }), et = Bn({
                type: ke
            }), tt = Bn({
                type: me
            }), nt = Bn({
                type: fe
            }), at = Bn({
                type: ye
            }), ot = Bn({
                type: ue
            }), it = Bn({
                type: F
            }), lt = Bn({
                type: c
            }), rt = Bn({
                type: Pe
            }), st = Bn({
                type: ce
            }), ct = Bn({
                type: re
            }), ht = Bn({
                type: y
            }), ut = Bn({
                type: f,
                displayName: "视野范围(数字代表可视范围半径的格子数)"
            }), gt = Bn({
                type: m
            }), dt = Bn({
                type: f,
                displayName: "迷雾横向最远范围"
            }), pt = Bn({
                type: f,
                displayName: "迷雾纵向最远范围"
            }), yt = Bn({
                type: k,
                displayName: "麒麟臂移动速度"
            }), ft = Bn({
                type: f,
                displayName: "玩家默认血量"
            }), mt = Bn({
                type: k,
                displayName: "镜头移动的速度"
            }), kt = Bn({
                type: k,
                displayName: "看广告迷雾暂时消散的时间"
            }), wt = Bn({
                type: k,
                displayName: "治疗药剂治疗的血量"
            }), vt = Bn({
                type: f,
                displayName: "正常每秒扣血"
            }), It = Bn({
                type: f,
                displayName: "绿巨人每秒扣血"
            }), Be((Bt = t((Pt = function (e) {
                function t() {
                    for (var t, n = arguments.length, i = new Array(n), l = 0; l < n; l++) i[l] = arguments[l];
                    return t = e.call.apply(e, [this].concat(i)) || this, a(t, "isNoHurt", Bt, o(t)), a(t, "isTestNoFog", St, o(t)), a(t, "levelNode", Tt, o(t)), a(t, "bloodNode", Nt, o(t)), a(t, "bottomDrugPanel", Dt, o(t)), t.gameViewTans = void 0, a(t, "gameViewUINode", At, o(t)), a(t, "levelMapFirstPoint", Gt, o(t)), a(t, "fogNode", Ct, o(t)), a(t, "fogMask", Lt, o(t)), a(t, "skillItemNode", Ht, o(t)), a(t, "tentacleSkillItemNode", Wt, o(t)), a(t, "backMainBtn", Mt, o(t)), a(t, "bagBtn", Ft, o(t)), a(t, "takeWeaponBtn", xt, o(t)), a(t, "takeWeaponBtnLab", Kt, o(t)), a(t, "shotWeaponBtn", Et, o(t)), a(t, "hideFogBtn", _t, o(t)), t.hideFogTimeLab = void 0, a(t, "signalgunBulletMask", Vt, o(t)), a(t, "testArm", zt, o(t)), a(t, "longArmNode", Ut, o(t)), a(t, "brainImg", Ot, o(t)), a(t, "gunAnimNode", Rt, o(t)), a(t, "dankeNode", Yt, o(t)), t.brainAnimPer = [.5, .9, 1], t.brainAnimScale = [.95, .9, .8], t.brainAnimTimeSpace = [1, .6, .3], t.nowBrainAnimScale = w.ZERO, t.nowBrainAnimTimeSpace = 0, a(t, "bugItem", Xt, o(t)), a(t, "bugDBAnim", Zt, o(t)), a(t, "drugDBAnim", Qt, o(t)), a(t, "bloodLineBar", jt, o(t)), a(t, "drugItemNode", qt, o(t)), a(t, "unlockDrugItemNode", Jt, o(t)), a(t, "handDrugPanel", $t, o(t)), a(t, "uiDeadPanel", en, o(t)), a(t, "uiBoxQuesPanel", tn, o(t)), a(t, "passNode", nn, o(t)), a(t, "touchMoveTips", an, o(t)), a(t, "guidePanel", on, o(t)), a(t, "uiPanelNode", ln, o(t)), a(t, "gameTaskMgr", rn, o(t)), t.bugStartPosY = 0, t.bugEndPosY = 500, t.bloodLen = t.bugEndPosY - t.bugStartPosY, t.signalgunBulletOpc = void 0, t.levelPrefab = void 0, a(t, "playerNode", sn, o(t)), a(t, "newPlayerNode", cn, o(t)), t.playerOldStandBlock = void 0, a(t, "gameCamera", hn, o(t)), a(t, "watchArena", un, o(t)), a(t, "redFrame", gn, o(t)), t._fogFarArena = void 0, a(t, "farMaskArenaX", dn, o(t)), a(t, "farMaskArenaY", pn, o(t)), t.bornBlock = void 0, t.finalBlock = void 0, t.nowGameState = Nn.start, t.allGameBlock = {}, t.blockLocalPosDic = {}, t.blockWorldPosDic = {}, t.blockLabDic = {}, t.initGameBlock = {}, t.bossArr = [], t._blockOffset = void 0, t.blockSize = new v(80, 80), t.bossTiledTile = void 0, t.nowStickDir = w.ZERO, t.isTouchMove = !1, a(t, "PlayerSkatingMoveSpeed", yn, o(t)), t.PlayerMoveSpeed = 4, t.playerMoveTimeSpace = 0, t.mapSize = void 0, t.playerMoveTimer = 0, a(t, "playerHp", fn, o(t)), a(t, "cameraMoveSpeed", mn, o(t)), a(t, "fogDisShowTime", kn, o(t)), a(t, "drugHelpHp", wn, o(t)), t.fogDisShowTimer = 0, t.waitToUseDrug = void 0, t.astarGrid = void 0, t.playerNowHp = 0, t.playerOneReduceHp = 0, a(t, "normalReduceHp", vn, o(t)), a(t, "greenReduceHp", In, o(t)), t.oneSecondTimer = 0, t.canWatchFogPool = [], t.fogDic = {}, t.weaponArr = [], t.playerBulletPool = [], t.bulletPool = [], t.stonePool = [], t.eggPool = [], t.tentaclePool = [], t.warnLinePool = [], t.gunAtkAnimPool = [], t.bloodPool = [], t.redFrameWarnPerArr = [.98, .95], t.lujurenredFrameWarnPerArr = [.8, .7], t.redFrameTimeArr = [.4, .8], t.redFrameAlpha = [160, 100], t.isShowingRedFrame = !1, t.rfTime = 0, t.rfAlpha = 0, t.isRefreshing = !1, t.tempFogArr = [], t.checkFrameRateSec = 10, t.frameRateArr = [], t.reduceFogCountInGameFrame = 45, t.canMoveSpace = .4, t.newHandLockHp = 11, t.killBossArr = [], t.touchBox = void 0, t.stopTargets = [], t
                }
                n(t, e);
                var l = t.prototype;
                return l.getOneGameBlock = function (e) {
                    return this.allGameBlock[this.GameBlockKey(e)]
                }, l.InitView = function () {
                    var t = this;
                    e.prototype.InitView.call(this), this.testAddBullet();
                    for (var n = function (e) {
                            var n = t.uiPanelNode.children[e],
                                a = n.getChildByName("panelMask");
                            if (a) {
                                var o = a.addComponent(h);
                                R.Instance.AddBtnClickListener(o, (function () {
                                    var e = n.getComponent(we);
                                    e && e.hidePanel()
                                }))
                            }
                        }, a = 0; a < this.uiPanelNode.children.length; a++) n(a);
                    this.fogDisShowTimer = this.fogDisShowTime, this.gameViewTans = this.getComponent(g), this.signalgunBulletMask.node.active = !1, this.signalgunBulletOpc = this.signalgunBulletMask.node.getComponent(m), this.levelMapFirstPoint.setParent(this.node), R.Instance.AddBtnClickListener(this.backMainBtn, (function () {
                        t.pauseGame(), t.destoryLevelPrefab(), Q.Instance.OpenView(j.UIStartView)
                    })), E.instance.on(_.stickMove, (function (e) {
                        t.nowStickDir = e, t.isTouchMove = !0
                    })), this.playerMoveTimeSpace = 1 / this.PlayerMoveSpeed * 2, E.instance.on(_.StickMoveEnd, (function () {
                        t.nowStickDir = w.ZERO, t.isTouchMove = !1, t.playerMoveTimer = t.playerMoveTimeSpace
                    })), this.playerMoveTimer = this.playerMoveTimeSpace, R.Instance.AddBtnClickListener(this.bagBtn, (function () {
                        t.getNewPlayerNode.isPlayerDead ? L.Instance.ShowTips(O.Instance.getLangInfoByKey("playerDeadTips")) : X.Instance.OpenPanel(Z.UIBagPanel, j.UIGameView).node.setSiblingIndex(t.guidePanel.node.getSiblingIndex())
                    })), this.hideFogBtn.node.active = !0, this.hideFogTimeLab = this.hideFogBtn.node.getChildByName("HideFogTimeLab").getComponent(u), R.Instance.AddBtnClickListener(this.hideFogBtn, (function () {
                        t.getNewPlayerNode.isPlayerDead ? L.Instance.ShowTips(O.Instance.getLangInfoByKey("playerDeadTips")) : K.Instance.WatchVideoAD((function () {
                            t.disShowFog(), t.fogDisShowTimer = 0, be.Instance.PlatformSDKControl.trackEvent("WatchAD", {
                                ADType: "迷雾去除"
                            }), t.resumeGame()
                        }), (function () {
                            t.resumeGame()
                        }))
                    })), this.takeWeaponBtnLab.string = O.Instance.getLangInfoByKey("takeWeapon"), R.Instance.AddBtnClickListener(this.takeWeaponBtn, (function () {
                        if (t.getNewPlayerNode.isPlayerDead) L.Instance.ShowTips(O.Instance.getLangInfoByKey("playerDeadTips"));
                        else {
                            var e = t.takeWeaponBtn.getComponent(p);
                            switch (Ie.Instance.play("拔枪+收枪"), t.getNewPlayerNode.getPlayerAction) {
                                case he.掏枪:
                                    t.getNewPlayerNode.changePlayerAction(he.静止), e.spriteFrame = V.Instance.LoadSpriteFrame("niu_baq"), t.shotWeaponBtn.node.active = !1, t.takeWeaponBtnLab.string = O.Instance.getLangInfoByKey("takeWeapon"), H.Instance.newHandStep == W.TEACH_HIDE_WEAPON ? (E.instance.sendMes(_.hideGuidePanel), be.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                                        NewStep: "新手20"
                                    }), H.Instance.touchTaskStep == M.FIND_BULLET && (H.Instance.touchTaskStep = M.ANSWER_QB, t.getGameTaskMgr.showTask())) : H.Instance.newHandStep == W.TEACH_SHOW_BLOOD ? (t.showBlood(), H.Instance.newHandStep = W.TEACH_USE_DRUG, t.refreshHaveDrugCount(), t.bottomDrugPanel.active = !0, be.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                                        NewStep: "新手28"
                                    })) : H.Instance.newHandStep >= W.FINISH_GUIDE && (H.Instance.isFristGuideHideWeapon = !1, t.guidePanel.hideGuidePanel());
                                    break;
                                case he.静止:
                                    t.getNewPlayerNode.changePlayerAction(he.掏枪), e.spriteFrame = V.Instance.LoadSpriteFrame("niu_shouq"), t.takeWeaponBtnLab.string = O.Instance.getLangInfoByKey("hideWeapon"), H.Instance.newHandStep == W.TEACH_TAKE_WEAPON ? (t.showKillBoss(), H.Instance.newHandStep = W.TEACH_KILL_BOSS, be.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                                        NewStep: "新手17"
                                    })) : H.Instance.newHandStep == W.TEACH_TAKE_WEAPON_2 ? (t.showGuideShotXinHao(), H.Instance.newHandStep = W.TEACH_SHOT_XINHAO) : H.Instance.newHandStep == W.TEACH_CHANGE_WEAPON && (H.Instance.newHandStep = W.FINISH_GUIDE, E.instance.sendMes(_.resumeBossFollow), t.guidePanel.hideGuidePanel(), be.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                                        NewStep: "新手36"
                                    }))
                            }
                        }
                    }), !1), this.shotWeaponBtn.node.active = !1, R.Instance.AddBtnClickListener(this.shotWeaponBtn, (function () {
                        t.getNewPlayerNode.getPlayerAction == he.掏枪 && t.playerShotWeapon()
                    })), this.initWeaponPrefab(), this.initDrugItme(), this.guidePanel.hideGuidePanel(), this.touchMoveTips.hideTips()
                    // cc.view.setDesignResolutionSize(750,1334,cc.ResolutionPolicy.SHOW_ALL)   
                }, l.brainLoopAnim = function () {
                    var e = this;
                    I.stopAllByTarget(this.brainImg), b(this.brainImg).to(this.nowBrainAnimTimeSpace, {
                        scale: this.nowBrainAnimScale
                    }).to(this.nowBrainAnimTimeSpace, {
                        scale: w.ONE
                    }).union().call((function () {
                        e.brainLoopAnim()
                    })).start()
                }, l.ShowView = function () {
                    e.prototype.ShowView.call(this), ve.Instance.play("游戏场景内背景音乐"), this.loadNewLevel(), this.touchMoveTips.hideTips(), this.guidePanel.hideGuidePanel(), this.redFrame.node.active = !1
                }, l.loadNewLevel = function () {
                    if (this.levelPrefab) this.restartLevel();
                    else {
                        var e = H.Instance.playLvIndex + 1;
                        5 == e && (e = 1), this.loadLevelPrefab("Level" + H.Instance.themeIndex + "_" + e)
                    }
                }, l.restartLevel = function () {
                    this.getNewPlayerNode.playerRecover(), this.uiDeadPanel.hidePanel(), this.loadLevelPrefab("Level" + H.Instance.themeIndex + "_" + (H.Instance.playLvIndex + 1)), this.stopRedFrameAnim()
                }, l.loadLevelPrefab = function (e) {
                    be.Instance.PlatformSDKControl.trackEvent("EnterLevel", {
                        EnterLevel: "Level" + H.Instance.themeIndex + "_" + (H.Instance.playLvIndex + 1)
                    }), H.Instance.playerInLevelArenaIndex = "尚未进入分割区域", H.Instance.newHandStep > W.TEACH_CLOSE_DOOR && H.Instance.newHandStep < W.FINISH_GUIDE && (H.Instance.newHandStep = W.TEACH_CLOSE_DOOR), this.getGameTaskMgr.hideTask(), H.Instance.helpClickObj = H.Instance.helpClickObj1 = null, H.Instance.tempPlayerDataInLv = H.Instance.playerDataInLv, Y.instance.isToDaren ? 1 == H.Instance.playLvIndex ? (H.Instance.tempPlayerDataInLv.unlockWeaponArr = [ge.手枪, ge.信号枪], H.Instance.nowUseWeapon = ge.手枪) : H.Instance.playLvIndex > 1 ? (H.Instance.tempPlayerDataInLv.unlockWeaponArr = [ge.手枪, ge.信号枪, ge.霰弹枪], H.Instance.nowUseWeapon = ge.手枪) : 0 == H.Instance.playLvIndex && (H.Instance.tempPlayerDataInLv.unlockWeaponArr = [], H.Instance.tempPlayerDataInLv.bagBulletArr = [], H.Instance.nowUseWeapon = null) : H.Instance.nowUseWeapon = H.Instance.tempPlayerDataInLv.nowUseWeapon, this.takeWeaponBtn.node.active = this.bagBtn.node.active = H.Instance.tempPlayerDataInLv.unlockWeaponArr.length > 0;
                    for (var t = this.skillItemNode.children, n = 0; n < t.length; n++) {
                        t[n].active = !1
                    }
                    H.Instance.playerHavePower == H.Instance.maxPowerCount && (H.Instance.powerUserTime = U.Instance.GetNowTime()), H.Instance.playerHavePower--, this.brainLoopAnim(), this.destoryLevelPrefab();
                    var a = V.Instance.LoadPrefab(e);
                    this.levelPrefab = a.getComponent(le), a.setParent(this.levelNode), a.setSiblingIndex(1), this.levelMapFirstPoint.getComponent(g).setContentSize(this.blockSize), this.levelMapFirstPoint.setParent(this.levelPrefab.node), this.initMap(), this.refreshHaveDrugCount()
                }, l.refreshBugPos = function () {
                    var e = this,
                        t = this.getPlayerHpPer,
                        n = this.bugItem.position;
                    this.bugItem.setPosition(new w(this.bugStartPosY + this.bloodLen * t, n.y)), t > 1 ? t = 1 : t < 0 && (t = 0), this.bloodLineBar.fillRange = t;
                    for (var a = 0; a < this.brainAnimPer.length; a++) {
                        if (t <= this.brainAnimPer[a]) {
                            var o = this.brainAnimScale[a],
                                i = this.brainAnimTimeSpace[a];
                            this.nowBrainAnimScale = new w(o, o), this.nowBrainAnimTimeSpace = i;
                            break
                        }
                    }
                    var l = this.redFrameWarnPerArr;
                    if (this.getNewPlayerNode.getnowPlayHandType == Dn.绿巨人 && (l = this.lujurenredFrameWarnPerArr), this.isShowingRedFrame = t > l[1], this.isShowingRedFrame) {
                        for (var r = 0; r < l.length; r++) {
                            if (t > l[r]) {
                                this.rfTime = this.redFrameTimeArr[r], this.rfAlpha = this.redFrameAlpha[r];
                                break
                            }
                        }
                        if (!this.redFrame.node.active && (this.showWarnRedFrame(), H.Instance.newHandStep >= W.FINISH_GUIDE && H.Instance.haveDrugCount > 0 && H.Instance.isFristGuideClickDrug)) {
                            var s = new x;
                            s.FingerPosArr = [this.drugItemNode.children[0].getWorldPosition()], s.GuideTips = [], s.IsShowClickAnim = !0, s.fingerAnimTimeScale = .5, s.layer = P.Enum.UI_2D, this.showGuidePanel(s), H.Instance.isFristGuideClickDrug = !1, z.Instance.DelayToDoNoObj((function () {
                                e.guidePanel.hideGuidePanel()
                            }), 2)
                        }
                    }
                }, l.stopRedFrameAnim = function () {
                    I.stopAllByTarget(this.redFrame), this.redFrame.node.active = !1, this.redFrame.opacity = 0
                }, l.showWarnRedFrame = function () {
                    var e = this;
                    I.stopAllByTarget(this.redFrame), this.redFrame.node.active = !0, this.redFrame.opacity = this.rfAlpha, b(this.redFrame).to(this.rfTime, {
                        opacity: 50
                    }).to(this.rfTime, {
                        opacity: this.rfAlpha
                    }).union().call((function () {
                        e.isShowingRedFrame ? e.showWarnRedFrame() : e.redFrame.node.active = !1
                    })).start()
                }, l.initDrugItme = function () {
                    for (var e = this, t = this.drugItemNode.children, n = 0; n < t.length; n++) {
                        t[n].on(c.EventType.TOUCH_END, (function () {
                            e.getNewPlayerNode.isPlayerDead ? L.Instance.ShowTips(O.Instance.getLangInfoByKey("playerDeadTips")) : (e.useDrugItem(), H.Instance.newHandStep == W.TEACH_USE_DRUG && (E.instance.sendMes(_.hideGuidePanel), e.nowGameState = Nn.playing, be.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                                NewStep: "新手31"
                            }), H.Instance.touchTaskStep == M.GET_XINHAO && (H.Instance.touchTaskStep = M.GET_HELP_DRUG, e.getGameTaskMgr.showTask())))
                        }))
                    }
                    for (var a = 0; a < this.unlockDrugItemNode.children.length; a++) {
                        this.unlockDrugItemNode.children[a].on(h.EventType.CLICK, (function () {
                            Ie.Instance.play("UI点击"), e.getNewPlayerNode.isPlayerDead ? L.Instance.ShowTips(O.Instance.getLangInfoByKey("playerDeadTips")) : K.Instance.WatchVideoAD((function () {
                                H.Instance.haveDrugCount = H.Instance.maxDrugCount, e.refreshHaveDrugCount(), be.Instance.PlatformSDKControl.trackEvent("WatchAD", {
                                    ADType: "补充药品"
                                }), e.resumeGame()
                            }), (function () {
                                e.resumeGame()
                            }))
                        }), this)
                    }
                }, l.refreshHaveDrugCount = function () {
                    for (var e = 0; e < this.drugItemNode.children.length; e++) {
                        this.drugItemNode.children[e].getChildByName("DrugImg").active = e < H.Instance.haveDrugCount
                    }
                }, l.refreshDrugUnlockCount = function () {
                    for (var e = 0; e < this.unlockDrugItemNode.children.length; e++) {
                        this.unlockDrugItemNode.children[e].active = e < H.Instance.maxDrugCount - H.Instance.unlockDrugCount
                    }
                }, l.useDrugItem = function () {
                    var e = this;
                    if (H.Instance.haveDrugCount > 0) {
                        H.Instance.haveDrugCount -= 1, Ie.Instance.play("UI点击");
                        var t = this.drugItemNode.children[H.Instance.haveDrugCount].getChildByName("DrugImg");
                        b(t).to(1, {
                            worldPosition: this.bugItem.getWorldPosition()
                        }).call((function () {
                            e.drugDBAnim.node.active = !0, e.drugDBAnim.playAnimation("za", 1), t.active = !1, t.setPosition(w.ZERO), z.Instance.DelayToDo((function () {
                                e.drugDBAnim.node.active = !1, e.changePlayerHp(e.drugHelpHp)
                            }), e, .5)
                        })).start(), H.Instance.newHandStep >= W.FINISH_GUIDE && H.Instance.isFristGuideClickDrug && (H.Instance.isFristGuideClickDrug = !1, this.guidePanel.hideGuidePanel())
                    }
                }, l.initWeaponPrefab = function () {
                    for (var e = de.prefabNameArr, t = 0; t < de.prefabNameArr.length; t++) {
                        var n = e[t],
                            a = V.Instance.LoadPrefab(n).getComponent(pe);
                        this.weaponArr.push(a)
                    }
                }, l.getWeapon = function (e) {
                    this.takeWeaponBtn.node.active = !0, this.bagBtn.node.active = this.takeWeaponBtn.node.active, null == H.Instance.nowUseWeapon && (H.Instance.nowUseWeapon = e), this.getNewPlayerNode.changeWeapon()
                }, l.initMap = function () {
                    var e = this;
                    this.allGameBlock = {}, this.playerNowHp = this.playerHp;
                    for (var t = this.levelPrefab.node.getChildByName("Map"), n = t.getComponent(B).constraintNum, a = t.children, o = a[0].getComponent(S).getLayer("Road"), i = o.layerSize, l = {
                            numCols: n * o.layerSize.x,
                            numRows: Math.ceil(a.length / n) * o.layerSize.y,
                            beginPos: this.levelMapFirstPoint.position,
                            offsetPos: {
                                x: 0,
                                y: 0,
                                z: 0
                            }
                        }, r = new J(l), s = 0; s < a.length; s++) {
                        for (var c = Math.floor(s % n), h = Math.floor(s / n), u = a[s].getComponent(S), g = this, d = u.getLayer("Road"), p = c * i.width, y = h * i.height, f = 0; f < d.layerSize.y; f++)
                            for (var m = 0; m < d.layerSize.x; m++) {
                                var k = new T.Vec2(m, f),
                                    v = new N(p + m, y + f);
                                if (0 != d.getTileGIDAt(k.x, k.y)) {
                                    var I = g.GameBlockKey(v);
                                    if (!g.allGameBlock[I]) {
                                        r.setWalkable(v.x, v.y, !0);
                                        var b = new An;
                                        b.blockVec2 = v, b.blockItemType = Sn.road, b.blockKey = I, g.allGameBlock[b.blockKey] = b;
                                        var D = new An;
                                        D.blockVec2 = v, D.blockItemType = Sn.road, D.blockKey = I, g.initGameBlock[D.blockKey] = D
                                    }
                                } else {
                                    var A = new An;
                                    A.blockVec2 = v, A.blockItemType = Sn.none, A.blockKey = g.GameBlockKey(v), g.allGameBlock[A.blockKey] = A, r.setWalkable(v.x, v.y, !1);
                                    var G = new An;
                                    G.blockVec2 = v, G.blockItemType = Sn.none, G.blockKey = g.GameBlockKey(v), g.initGameBlock[G.blockKey] = G
                                }
                            }
                        if (d = u.getLayer("wall")) {
                            p = c * i.width, y = h * i.height;
                            for (var C = 0; C < d.layerSize.y; C++)
                                for (var L = 0; L < d.layerSize.x; L++) {
                                    var M = new N(L, C);
                                    if (0 != d.getTileGIDAt(M.x, M.y)) {
                                        var F = new N(p + L, y + C);
                                        r.setWalkable(F.x, F.y, !1);
                                        var K = new An;
                                        K.blockVec2 = F, K.blockItemType = Sn.wall, K.blockKey = g.GameBlockKey(F), g.allGameBlock[K.blockKey] = K;
                                        var E = new An;
                                        E.blockVec2 = F, E.blockItemType = Sn.wall, E.blockKey = g.GameBlockKey(F), g.initGameBlock[E.blockKey] = E
                                    }
                                }
                        }
                        if (d = u.getLayer("luzhang")) {
                            p = c * i.width, y = h * i.height;
                            for (var _ = 0; _ < d.layerSize.y; _++)
                                for (var V = 0; V < d.layerSize.x; V++) {
                                    var U = new N(V, _);
                                    if (0 != d.getTileGIDAt(U.x, U.y)) {
                                        var R = new N(p + V, y + _);
                                        r.setWalkable(R.x, R.y, !1);
                                        var Y = new An;
                                        Y.blockVec2 = R, Y.blockItemType = Sn.noWalkLayer, Y.blockKey = g.GameBlockKey(R), g.allGameBlock[Y.blockKey] = Y;
                                        var X = new An;
                                        X.blockVec2 = R, X.blockItemType = Sn.noWalkLayer, X.blockKey = g.GameBlockKey(R), g.initGameBlock[X.blockKey] = X
                                    }
                                }
                        }
                        if (d = u.getLayer("Final")) {
                            p = c * i.width, y = h * i.height;
                            for (var Z = 0; Z < d.layerSize.y; Z++)
                                for (var Q = 0; Q < d.layerSize.x; Q++) {
                                    var j = new N(Q, Z);
                                    if (0 != d.getTileGIDAt(j.x, j.y)) {
                                        var $ = new N(p + Q, y + Z);
                                        r.setWalkable($.x, $.y, !0);
                                        var te = new An;
                                        te.blockVec2 = $, te.blockItemType = Sn.finalBlock, te.blockKey = g.GameBlockKey($), g.allGameBlock[te.blockKey] = te;
                                        var ne = new An;
                                        ne.blockVec2 = $, ne.blockItemType = Sn.finalBlock, ne.blockKey = g.GameBlockKey($), g.initGameBlock[ne.blockKey] = ne
                                    }
                                }
                        }
                        if (d = u.getLayer("Born")) {
                            p = c * i.width, y = h * i.height;
                            for (var ae = 0; ae < d.layerSize.y; ae++)
                                for (var oe = 0; oe < d.layerSize.x; oe++) {
                                    var ie = new T.Vec2(oe, ae);
                                    if (0 != d.getTileGIDAt(ie.x, ie.y)) {
                                        var le = new N(p + oe, y + ae);
                                        r.setWalkable(le.x, le.y, !0);
                                        var re = new An;
                                        re.blockVec2 = le, re.blockItemType = Sn.startBlock, re.blockKey = g.GameBlockKey(le), g.allGameBlock[re.blockKey] = re;
                                        var se = new An;
                                        se.blockVec2 = le, se.blockItemType = Sn.startBlock, se.blockKey = g.GameBlockKey(le), g.initGameBlock[se.blockKey] = se, this.bornBlock = re
                                    }
                                }
                            z.Instance.DelayToDo((function () {
                                e.playerNode.initMap(e), e.nowGameState = Nn.playing, e.playerOldStandBlock = e.bornBlock, e.newPlayerNode.initPlayerStandBlock(e.bornBlock), z.Instance.DelayToDo((function () {
                                    if (e.gameCamera.node.setWorldPosition(e.newPlayerNode.playerBody.getWorldPosition()), be.Instance.PlatformSDKControl.startRecord(), H.Instance.newHandStep < W.FINISH_GUIDE && 0 == H.Instance.playLvIndex) {
                                        if (H.Instance.newHandStep == W.TEACH_MOVE_1) {
                                            e.touchMoveTips.showTips();
                                            var t = new x,
                                                n = [];
                                            n.push(new w(-200, 0)), n.push(new w(200, 0)), t.FingerPosArr = n, t.GuideTips = [O.Instance.getLangInfoByKey("guideTips1")], t.FingerPosArr = n, t.guideTipsOffset = new N(200, 200), t.isWorldPos = !1, t.layer = P.Enum.UI_2D, t.fingerLineAngle = 180, e.showGuidePanel(t)
                                        }
                                        e.bottomDrugPanel.active = !1, e.refreshHaveDrugCount()
                                    } else e.bottomDrugPanel.active = !0;
                                    0 == H.Instance.playLvIndex && (H.Instance.haveDrugCount < 1 && (H.Instance.haveDrugCount = 1), e.refreshHaveDrugCount()), z.Instance.DelayToDo((function () {
                                        e.initFog(), e.passNode.hidePassAnim((function () {
                                            e.changePlayerHp(e.playerHp)
                                        }))
                                    }), e)
                                }), e), e.levelPrefab.initMachineDoor(), e.bossArr = [];
                                for (var t = e.levelPrefab.bossNode, n = 0; n < t.children.length; n++) {
                                    var a = t.children[n];
                                    if (a.active) {
                                        var o = a.getComponent(ee);
                                        o && (o.initBoss(e), e.bossArr.push(o))
                                    }
                                }
                            }), this, .1)
                        }
                    }
                    this.astarGrid = r, q.ins.initMap(r)
                }, l.showTeachMoveStep = function () {
                    var e, t, n = "",
                        a = new x;
                    H.Instance.newHandStep == W.TEACH_MOVE_2 ? (n = O.Instance.getLangInfoByKey("guideTips2"), e = new w(0, 200), t = new w(0, -200), a.guideTipsOffset = new N(0, 100), a.fingerLineAngle = 90) : H.Instance.newHandStep == W.TEACH_MOVE_3 ? (n = O.Instance.getLangInfoByKey("guideTips3"), e = new w(200, 0), t = new w(-200, 0), a.guideTipsOffset = new N(-200, 200), a.fingerLineAngle = 0) : H.Instance.newHandStep == W.TEACH_MOVE_4 && (n = O.Instance.getLangInfoByKey("guideTips4"), e = new w(0, -200), t = new w(0, 200), a.guideTipsOffset = new N(0, 400), a.fingerLineAngle = 270);
                    var o = [];
                    o.push(e), o.push(t), a.GuideTips = [n], a.FingerPosArr = o, a.layer = P.Enum.UI_2D, a.isWorldPos = !1, this.showGuidePanel(a)
                }, l.showGuidePanel = function (e) {
                    this.guidePanel.showGuide(e)
                }, l.showGuideClickBagBtn = function () {
                    var e = new x;
                    e.FingerPosArr = [this.bagBtn.node.getWorldPosition()], e.GuideTips = [O.Instance.getLangInfoByKey("openBag")], e.IsShowClickAnim = !0, e.isShowMask = !0, e.layer = P.Enum.UI_2D, this.showGuidePanel(e)
                }, l.showGuideClickWeaponBtn = function () {
                    this.getPlayerNode.changePlayerAction(he.静止);
                    var e = new x;
                    e.FingerPosArr = [this.takeWeaponBtn.node.getWorldPosition()], e.isShowMask = !0, H.Instance.newHandStep == W.TEACH_TAKE_WEAPON ? e.GuideTips = [O.Instance.getLangInfoByKey("clickWeaponBtn")] : H.Instance.newHandStep == W.TEACH_TAKE_WEAPON_2 ? e.GuideTips = [O.Instance.getLangInfoByKey("clickWeaponBtn_1")] : H.Instance.newHandStep == W.TEACH_CHANGE_WEAPON && (e.GuideTips = [O.Instance.getLangInfoByKey("clickWeaponBtn")]), e.IsShowClickAnim = !0, e.fingerAnimTimeScale = .5, e.layer = P.Enum.UI_2D, this.showGuidePanel(e)
                }, l.showKillBoss = function () {
                    var e = this.levelPrefab.guideKillBoss,
                        t = new x;
                    t.FingerPosArr = [e.getWorldPosition()], t.GuideTips = [O.Instance.getLangInfoByKey("killBoss")], t.IsShowClickAnim = !0, t.isShowMask = !0, t.guideTipsOffset = new N(0, 80), this.showGuidePanel(t)
                }, l.showMoreBullet = function () {
                    var e = this.levelPrefab.guideKillBoss,
                        t = new x;
                    t.FingerPosArr = [e.getWorldPosition()], t.GuideTips = [O.Instance.getLangInfoByKey("shotMoreBullet")], t.IsShowClickAnim = !0, t.isShowMask = !0, t.guideTipsOffset = new N(0, 80), this.showGuidePanel(t)
                }, l.showGuideHideWeaponBtn = function () {
                    var e = new x;
                    e.FingerPosArr = [this.takeWeaponBtn.node.getWorldPosition()], e.GuideTips = [O.Instance.getLangInfoByKey("clickHideWeaponBtn")], e.IsShowClickAnim = !0, e.isShowMask = !0, e.layer = P.Enum.UI_2D, e.guideTipsOffset = new N(200, 200), this.showGuidePanel(e)
                }, l.showGuideHideXinhaoBtn = function () {
                    var e = new x;
                    e.FingerPosArr = [this.takeWeaponBtn.node.getWorldPosition()], e.GuideTips = [O.Instance.getLangInfoByKey("hideXinHaoWeapon")], e.IsShowClickAnim = !0, e.isShowMask = !0, e.layer = P.Enum.UI_2D, e.guideTipsOffset = new N(250, 200), this.showGuidePanel(e)
                }, l.showGuideShotXinHao = function () {
                    var e = new x;
                    e.FingerPosArr = [this.getNewPlayerNode.getPlayerBodyWp], e.GuideTips = [O.Instance.getLangInfoByKey("shotXinhaoTips")], e.IsShowClickAnim = !0, e.isShowMask = !0, this.showGuidePanel(e), be.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                        NewStep: "新手26"
                    })
                }, l.showBlood = function () {
                    var e = this,
                        t = new x;
                    t.FingerPosArr = [this.bugItem.children[0].getWorldPosition()], t.GuideTips = [O.Instance.getLangInfoByKey("xinhaoHurtTips_1")], t.IsShowClickAnim = !0, t.layer = P.Enum.UI_2D, t.guideTipsOffset = new N(-120, -200), t.isShowMask = !0, t.isShowFinger = !1, this.showGuidePanel(t), be.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                        NewStep: "新手29"
                    }), z.Instance.DelayToDo((function () {
                        e.showDrug()
                    }), this, 2)
                }, l.showDrug = function () {
                    var e = new x;
                    e.FingerPosArr = [this.drugItemNode.children[0].getWorldPosition()], e.GuideTips = [O.Instance.getLangInfoByKey("useDrugTips")], e.IsShowClickAnim = !0, e.layer = P.Enum.UI_2D, e.isShowMask = !0, this.showGuidePanel(e), this.nowGameState = Nn.pause, be.Instance.PlatformSDKControl.trackEvent("NewHandId", {
                        NewStep: "新手30"
                    })
                }, l.changeGameBlockData = function (e, t) {
                    void 0 === t && (t = Sn.wall);
                    var n = this.GameBlockKey(e);
                    this.allGameBlock[n].blockItemType = t
                }, l.backGameBlockToInit = function (e) {
                    var t = this.GameBlockKey(e);
                    this.allGameBlock[t].blockItemType = this.initGameBlock[t].blockItemType
                }, l.initFog = function () {
                    if (!this.isTestNoFog) {
                        if (0 == this.fogNode.children.length)
                            for (var e = this.getNewPlayerNode.getStandBlock.blockVec2, t = this.fogArena, n = Math.ceil(t.x), a = Math.ceil(t.y), o = e.x - n, i = e.x + n, l = e.y - a, r = e.y + a, s = l; s <= r; s++)
                                for (var c = o; c <= i; c++) {
                                    var h = new N(c, s),
                                        u = this.GameBlockKey(h),
                                        d = V.Instance.LoadPrefab("FogPrefab");
                                    d.setParent(this.fogNode), d.setWorldPosition(this.getBlockWorldPos(h));
                                    for (var p = 0; p < d.children.length; p++) {
                                        var y = d.children[p],
                                            f = Math.round(U.Instance.GetFloatRandomNum_New(0, 1)),
                                            m = Math.round(U.Instance.GetFloatRandomNum_New(0, 1)),
                                            k = y.getComponent(g);
                                        k.anchorX = f, k.anchorY = m, k.setContentSize(this.blockSize.width + 40, this.blockSize.height + 50)
                                    }
                                    var w = d.getComponent(ie);
                                    w.initFog(this.PlayerMoveSpeed, h), this.canWatchFogPool.push(w), this.fogDic[u] = w
                                }
                        this.refreshFog(), console.log("迷雾数量" + this.fogNode.children.length)
                    }
                }, l.refreshFog = function () {
                    var e = this;
                    if (this.fogNode.active && !this.isTestNoFog && !this.isRefreshing) {
                        this.isRefreshing = !0, this.fogNode.setPosition(w.ZERO);
                        var t = this.getNewPlayerNode.getStandBlock.blockVec2,
                            n = this.fogArena,
                            a = t.x - n.x,
                            o = t.x + n.x,
                            i = t.y - n.y,
                            l = t.y + n.y,
                            r = [];
                        for (var s in this.fogDic) {
                            var c = this.fogDic[s];
                            if (c) {
                                var h = c.fogV2;
                                (h.x < a || h.x > o || h.y < i || h.y > l) && (c.node.active = !1, r.push(c), this.fogDic[s] = null)
                            }
                        }
                        this.tempFogArr = r;
                        for (var u = this.watchArena, g = t.x - u, d = t.x + u, p = t.y - u, y = t.y + u, f = i; f <= l; f++)
                            for (var m = a; m <= o; m++) {
                                var k = new N(m, f),
                                    v = this.GameBlockKey(k);
                                this.fogDic[v] || this.getMoreFog(k), f > p && f < y && m > d && m < g && this.fogDic[v].ShowFogControl()
                            }
                        z.Instance.DelayToDo((function () {
                            for (var n = p; n <= y; n++)
                                for (var a = g; a <= d; a++) {
                                    var o = new N(a, n),
                                        i = e.GameBlockKey(o),
                                        l = e.fogDic[i];
                                    if (e.isBlockCanWalk(o)) q.ins.findPath(o, t, u + 0, true) ? l.HideFogControl() : l.ShowFogControl();
                                    else if (e.isBlockHideFog(o)) {
                                        var r = 0;
                                        t.x > o.x ? r = 1 : t.x < o.x && (r = -1);
                                        var s = 0;
                                        t.y > o.y ? s = 1 : t.y < o.y && (s = -1);
                                        for (var c = 0; c < 99; c++)
                                            if (o = new N(o.x + r, o.y + s), e.isBlockCanWalk(o)) {
                                                var h = q.ins.findPath(o, t, u + 0, true);
                                                if (h) {
                                                    h.length + c + 3 <= u ? l.HideFogControl() : l.ShowFogControl();
                                                    break
                                                }
                                            }
                                    } else l.ShowFogControl()
                                }
                            e.isRefreshing = !1
                        }), this)
                    }
                }, l.testShowFog = function (e) {
                    var t = this.gameCamera.node.getPosition(),
                        n = R.Instance.GetLevelNodeWorldPos(e, Y.instance.node, new N(t.x, t.y), this.getNewPlayerNode.playerPosZ),
                        a = this.getNewPlayerNode.getStandBlock.blockVec2;
                    this.getNewPlayerNode.TempShowBlock.setWorldPosition(n);
                    var o = this.getBlockVec2ByWorldPos(n),
                        i = this.GameBlockKey(o),
                        l = this.fogDic[i];
                    if (this.isBlockCanWalk(o)) q.ins.findPath(o, a, this.watchArena, !0) ? l.HideFogControl() : l.ShowFogControl();
                    else if (this.isBlockHideFog(o)) {
                        var r = 0;
                        a.x > o.x ? r = 1 : a.x < o.x && (r = -1);
                        var s = 0;
                        a.y > o.y ? s = 1 : a.y < o.y && (s = -1);
                        for (var c = 0; c < 99; c++)
                            if (o = new N(o.x + r, o.y + s), this.isBlockCanWalk(o)) {
                                var h = q.ins.findPath(o, a, this.watchArena, !0);
                                if (h) h.length + c + 1 <= this.watchArena ? l.HideFogControl() : l.ShowFogControl();
                                break
                            }
                    } else l.ShowFogControl()
                }, l.getMoreFog = function (e) {
                    for (var t = this.tempFogArr, n = 0; n < t.length; n++) {
                        var a = t[n];
                        if (!a.node.active) {
                            var o = this.GameBlockKey(e);
                            return a.refreshFog(e), a.node.active = !0, this.fogDic[o] = a, a.node.setWorldPosition(this.getBlockWorldPos(e)), a
                        }
                    }
                    var i = this.GameBlockKey(e),
                        l = V.Instance.LoadPrefab("FogPrefab");
                    l.setParent(this.fogNode), l.setWorldPosition(this.getBlockWorldPos(e));
                    for (var r = 0; r < l.children.length; r++) {
                        var s = l.children[r],
                            c = Math.round(U.Instance.GetFloatRandomNum_New(0, 1)),
                            h = Math.round(U.Instance.GetFloatRandomNum_New(0, 1));
                        s.getComponent(g).anchorX = c, s.getComponent(g).anchorY = h
                    }
                    var u = l.getComponent(ie);
                    return u.initFog(this.PlayerMoveSpeed, e), this.canWatchFogPool.push(u), this.fogDic[i] = u, u
                }, l.getUsingWeaponData = function () {
                    for (var e = 0; e < this.weaponArr.length; e++) {
                        var t = this.weaponArr[e];
                        if (t.weaponType == H.Instance.nowUseWeapon) return t
                    }
                }, l.getPlayerBulletItem = function () {
                    for (var e = 0; e < this.playerBulletPool.length; e++) {
                        var t = this.playerBulletPool[e];
                        if (!t.node.active && t.bulletType == H.Instance.nowUseWeapon) return t.node.active = !0, t.initBullet(this.getUsingWeaponData()), t
                    }
                    var n = "";
                    switch (H.Instance.nowUseWeapon) {
                        case ge.手枪:
                            n = "PlayerBullet";
                            break;
                        case ge.霰弹枪:
                            n = "ShotgunBullet";
                            break;
                        case ge.信号枪:
                            n = "SignalgunBullet"
                    }
                    var a = V.Instance.LoadPrefab(n);
                    a.active = !0, a.setParent(this.skillItemNode);
                    var o = a.getComponent(se);
                    return this.playerBulletPool.push(o), o.initBullet(this.getUsingWeaponData()), o
                }, l.getBulletItem = function () {
                    for (var e = 0; e < this.bulletPool.length; e++) {
                        var t = this.bulletPool[e];
                        if (!t.node.active) return t.node.active = !0, t
                    }
                    var n = V.Instance.LoadPrefab("BossBullet");
                    n.active = !0, n.setParent(this.skillItemNode);
                    var a = n.getComponent($);
                    return this.bulletPool.push(a), a
                }, l.getStoneItem = function () {
                    for (var e = 0; e < this.stonePool.length; e++) {
                        var t = this.stonePool[e];
                        if (!t.node.active) return t.node.active = !0, t
                    }
                    var n = V.Instance.LoadPrefab("BossStone");
                    n.active = !0, n.setParent(this.skillItemNode);
                    var a = n.getComponent(ae);
                    return this.stonePool.push(a), a
                }, l.getEggItem = function () {
                    for (var e = 0; e < this.eggPool.length; e++) {
                        var t = this.eggPool[e];
                        if (!t.node.active) return t.node.active = !0, t
                    }
                    var n = V.Instance.LoadPrefab("BossEgg");
                    n.active = !0, n.setParent(this.skillItemNode);
                    var a = n.getComponent(ne);
                    return this.eggPool.push(a), a
                }, l.getTentacleItem = function () {
                    for (var e = 0; e < this.tentaclePool.length; e++) {
                        var t = this.tentaclePool[e];
                        if (!t.active) return t.active = !0, t
                    }
                    var n = V.Instance.LoadPrefab("TentacleSkillNode");
                    return n.active = !0, n.setParent(this.tentacleSkillItemNode), this.tentaclePool.push(n), n
                }, l.getWarnLineItem = function () {
                    for (var e = 0; e < this.warnLinePool.length; e++) {
                        var t = this.warnLinePool[e];
                        if (!t.active) return t.active = !0, t
                    }
                    var n = V.Instance.LoadPrefab("WarnLine");
                    return n.active = !0, n.setParent(this.skillItemNode), this.warnLinePool.push(n), n
                }, l.getGunAtkAnimItem = function () {
                    for (var e = 0; e < this.gunAtkAnimPool.length; e++) {
                        var t = this.gunAtkAnimPool[e];
                        if (!t.node.active) return t.node.active = !0, t
                    }
                    var n = V.Instance.LoadPrefab("gunAtkAnim").getComponent(D);
                    return n.node.active = !0, n.node.setParent(this.skillItemNode), this.gunAtkAnimPool.push(n), n
                }, l.getBloodItem = function () {
                    for (var e = 0; e < this.bloodPool.length; e++) {
                        var t = this.bloodPool[e];
                        if (!t.active) return t.active = !0, t
                    }
                    var n = V.Instance.LoadPrefab("bloodNode");
                    return n.active = !0, this.bloodPool.push(n), n
                }, l.update = function (e) {
                    if (this.nowGameState == Nn.playing) {
                        if (this.oneSecondTimer += e, this.oneSecondTimer > 1) {
                            if (this.oneSecondTimer = 0, !this.fogNode.active)
                                if (this.fogDisShowTimer += 1, this.fogDisShowTimer > this.fogDisShowTime) this.showFog();
                                else {
                                    var t = this.fogDisShowTime - this.fogDisShowTimer;
                                    this.hideFogTimeLab.string = R.Instance.GetMinSecShowLab(t)
                                } this.guidePanel.node.active || this.changePlayerHp(-this.playerOneReduceHp), this.refreshBugPos()
                        }
                        this.isTouchMove && (this.playerMoveTimer += e, this.playerMoveTimer > this.playerMoveTimeSpace && (this.playerMoveTimer = 0, this.PlayerMove(this.nowStickDir))), this.gameCamera.node.worldPosition = this.gameCamera.node.worldPosition.lerp(this.newPlayerNode.playerBody.worldPosition, this.cameraMoveSpeed)
                    }
                }, l.PlayerMove = function (e) {
                    function t(e) {
                        return e && (e.blockItemType == Sn.road || e.blockItemType == Sn.startBlock || e.blockItemType == Sn.finalBlock)
                    }
                    var n = this.playerNode.getStandBlock;
                    if (Math.abs(e.x) > this.canMoveSpace) {
                        if (Math.abs(e.y) > this.canMoveSpace) {
                            if (e.x < -this.canMoveSpace) {
                                if (e.y < -this.canMoveSpace) {
                                    var a = new N(n.blockVec2.x - 1, n.blockVec2.y + 1),
                                        o = this.allGameBlock[this.GameBlockKey(a)];
                                    t(o) ? this.playerNode.changePlayerStandBlock(o) : (a = new N(n.blockVec2.x, n.blockVec2.y + 1), t(o = this.allGameBlock[this.GameBlockKey(a)]) ? this.playerNode.changePlayerStandBlock(o) : (a = new N(n.blockVec2.x - 1, n.blockVec2.y), t(o = this.allGameBlock[this.GameBlockKey(a)]) && this.playerNode.changePlayerStandBlock(o)))
                                } else if (e.y > this.canMoveSpace) {
                                    var i = new N(n.blockVec2.x - 1, n.blockVec2.y - 1),
                                        l = this.allGameBlock[this.GameBlockKey(i)];
                                    t(l) ? this.playerNode.changePlayerStandBlock(l) : (i = new N(n.blockVec2.x, n.blockVec2.y - 1), t(l = this.allGameBlock[this.GameBlockKey(i)]) ? this.playerNode.changePlayerStandBlock(l) : (i = new N(n.blockVec2.x - 1, n.blockVec2.y), t(l = this.allGameBlock[this.GameBlockKey(i)]) && this.playerNode.changePlayerStandBlock(l)))
                                }
                            } else if (e.x > this.canMoveSpace)
                                if (e.y < -this.canMoveSpace) {
                                    var r = new N(n.blockVec2.x + 1, n.blockVec2.y + 1),
                                        s = this.allGameBlock[this.GameBlockKey(r)];
                                    t(s) ? this.playerNode.changePlayerStandBlock(s) : (r = new N(n.blockVec2.x, n.blockVec2.y + 1), t(s = this.allGameBlock[this.GameBlockKey(r)]) ? this.playerNode.changePlayerStandBlock(s) : (r = new N(n.blockVec2.x + 1, n.blockVec2.y), t(s = this.allGameBlock[this.GameBlockKey(r)]) && this.playerNode.changePlayerStandBlock(s)))
                                } else if (e.y > this.canMoveSpace) {
                                var c = new N(n.blockVec2.x + 1, n.blockVec2.y - 1),
                                    h = this.allGameBlock[this.GameBlockKey(c)];
                                t(h) ? this.playerNode.changePlayerStandBlock(h) : (c = new N(n.blockVec2.x, n.blockVec2.y - 1), t(h = this.allGameBlock[this.GameBlockKey(c)]) ? this.playerNode.changePlayerStandBlock(h) : (c = new N(n.blockVec2.x + 1, n.blockVec2.y), t(h = this.allGameBlock[this.GameBlockKey(c)]) && this.playerNode.changePlayerStandBlock(h)))
                            }
                        } else if (e.x < -this.canMoveSpace) {
                            var u = new N(n.blockVec2.x - 1, n.blockVec2.y),
                                g = this.allGameBlock[this.GameBlockKey(u)];
                            t(g) && this.playerNode.changePlayerStandBlock(g)
                        } else if (e.x > this.canMoveSpace) {
                            var d = new N(n.blockVec2.x + 1, n.blockVec2.y),
                                p = this.allGameBlock[this.GameBlockKey(d)];
                            t(p) && this.playerNode.changePlayerStandBlock(p)
                        }
                    } else if (Math.abs(e.y) > this.canMoveSpace)
                        if (e.y > this.canMoveSpace) {
                            var y = new N(n.blockVec2.x, n.blockVec2.y - 1),
                                f = this.allGameBlock[this.GameBlockKey(y)];
                            t(f) && this.playerNode.changePlayerStandBlock(f)
                        } else if (e.y < -this.canMoveSpace) {
                        var m = new N(n.blockVec2.x, n.blockVec2.y + 1),
                            k = this.allGameBlock[this.GameBlockKey(m)];
                        t(k) && this.playerNode.changePlayerStandBlock(k)
                    }
                }, l.ChangePlayerStandBlock = function (e) {
                    this.playerOldStandBlock && this.playerOldStandBlock.blockVec2.x == e.blockVec2.x && this.playerOldStandBlock.blockVec2.y == e.blockVec2.y ? console.log("位置未改变") : (this.playerOldStandBlock = e, console.log("位置改变"))
                }, l.CreateTiledTile = function (e, t) {
                    var n = new c;
                    n.parent = e.node;
                    var a = n.addComponent(A);
                    return e.setTiledTileAt(t.x, t.y, a), e.getTiledTileAt(t.x, t.y)
                }, l.GameBlockKey = function (e) {
                    return "Block-" + e.x + "," + e.y
                }, l.getGameBlock = function (e) {
                    return this.allGameBlock[this.GameBlockKey(e)]
                }, l.GetBlockLocalPos = function (e) {
                    var t = this.blockLocalPosDic[this.GameBlockKey(e)];
                    return t || (t = new w(this.levelMapFirstPoint.position.x + e.x * this.blockSize.width + this.blockOffset.x, this.levelMapFirstPoint.position.y - e.y * this.blockSize.height + this.blockOffset.y)), t
                }, l.getBlockWorldPos = function (e) {
                    var t = this.blockWorldPosDic[this.GameBlockKey(e)];
                    return !t && this.levelPrefab && (t = this.levelPrefab.getComponent(g).convertToWorldSpaceAR(this.GetBlockLocalPos(e))), t
                }, l.getBlockVec2ByWorldPos = function (e) {
                    if (this.levelPrefab) {
                        var t = this.levelPrefab.getComponent(g).convertToNodeSpaceAR(e),
                            n = (t.x - this.blockOffset.x - this.levelMapFirstPoint.position.x) / this.blockSize.width,
                            a = -(t.y - this.blockOffset.y - this.levelMapFirstPoint.position.y) / this.blockSize.height;
                        return new N(Math.round(n), Math.round(a))
                    }
                    return N.ZERO
                }, l.isBlockCanWalk = function (e) {
                    var t = this.allGameBlock[this.GameBlockKey(e)];
                    return !!t && (t.blockItemType == Sn.road || t.blockItemType == Sn.startBlock || t.blockItemType == Sn.finalBlock)
                }, l.isBlockHideFog = function (e) {
                    var t = this.allGameBlock[this.GameBlockKey(e)];
                    return !!t && (t.blockItemType == Sn.door || t.blockItemType == Sn.wall || t.blockItemType == Sn.noWalkLayer)
                }, l.getNearPlayerStandBlock = function (e) {
                    for (var t = 1; t < 5; t++) {
                        for (var n = e.x - t, a = e.x + t, o = e.y - t, i = e.y + t, l = n; l < a; l++) {
                            var r = new N(l, o),
                                s = this.getOneGameBlock(r);
                            U.Instance.GetPointsDistance(r, e);
                            if (this.isBlockCanWalk(r)) return s;
                            if (r = new N(l, i), s = this.getOneGameBlock(r), U.Instance.GetPointsDistance(r, e), this.isBlockCanWalk(r)) return s
                        }
                        for (var c = o + 1; c < i; c++) {
                            var h = new N(n, c),
                                u = this.getOneGameBlock(h);
                            U.Instance.GetPointsDistance(h, e);
                            if (this.isBlockCanWalk(h)) return u;
                            if (h = new N(a, c), u = this.getOneGameBlock(h), U.Instance.GetPointsDistance(h, e), this.isBlockCanWalk(h)) return u
                        }
                    }
                }, l.playerBeAtk = function (e) {
                    if (!this.isNoHurt) {
                        this.getNewPlayerNode.playerBeAtk(), this.changePlayerHp(e);
                        var t = this.getBloodItem();
                        t.setParent(this.getLevelPrefab.bloodNode), t.setSiblingIndex(0), t.setWorldPosition(this.getNewPlayerNode.getPlayerBodyWp), t.setWorldRotation(this.getNewPlayerNode.getPlayerBodyWr);
                        var n = t.getComponent(m);
                        n.opacity = 255;
                        z.Instance.DelayToDo((function () {
                            b(n).to(1, {
                                opacity: 0
                            }).call((function () {
                                t.active = !1
                            })).start()
                        }), this, 1)
                    }
                }, l.showGuideHideWeapon = function () {
                    var e = new x;
                    e.FingerPosArr = [this.takeWeaponBtn.node.getWorldPosition()], e.GuideTips = [], e.IsShowClickAnim = !0, e.fingerAnimTimeScale = .5, e.layer = P.Enum.UI_2D, this.showGuidePanel(e)
                }, l.changePlayerHp = function (e) {
                    this.isNoHurt || this.getNowGameState == Nn.playing && (this.playerNowHp += e, this.playerNowHp < this.newHandLockHp && 0 == H.Instance.playLvIndex && H.Instance.newHandStep < W.FINISH_GUIDE && (this.playerNowHp = this.newHandLockHp), this.playerNowHp <= 0 ? (this.playerNowHp = 0, this.refreshBugPos(), this.loseGame()) : this.playerNowHp > this.playerHp && (this.playerNowHp = this.playerHp))
                }, l.playerShotWeapon = function () {
                    var e = this;

                    function t() {
                        if (e.checkWeaponIsShotCD) L.Instance.ShowTips("枪械冷却中...");
                        else {
                            H.Instance.useWeaponBullet(), e.weaponArr[H.Instance.nowUseWeapon].weaponShot();
                            var t = e.newPlayerNode;
                            if (H.Instance.nowUseWeapon == ge.信号枪) {
                                e.killBossArr = [];
                                for (var n = e.getPlayerBulletItem(), a = n.shotWeapon.bulletShotMaxLen * e.blockSize.width, o = e.levelPrefab.bossNode, i = e.getNewPlayerNode.getPlayerBodyWp, l = 0; l < o.children.length; l++) {
                                    var r = o.children[l].getComponent(ee);
                                    U.Instance.GetWorldPointsDistance(r.node.getWorldPosition(), i) < a && (e.pauseGame(), e.killBossArr.push(r))
                                }
                                t.shotWeapon(n), e.isNoHurt = !0
                            } else {
                                for (var s, c = e.getPlayerBulletItem(), h = 0; h < e.bossArr.length; h++) {
                                    var u = e.bossArr[h];
                                    if (u.nowBossState != te.死亡)
                                        if (U.Instance.GetWorldPointsDistance(u.node.getWorldPosition(), t.getPlayerHandColliderNode.getWorldPosition()) < e.blockSize.width) {
                                            s = u;
                                            break
                                        }
                                }
                                s ? t.shotBulletNoFly(c, s) : t.shotWeapon(c)
                            }
                        }
                    }
                    if (H.Instance.isNoUseBullet()) t();
                    else if (H.Instance.getIsOpenAutoChangeBullet()) {
                        if (!H.Instance.autoAddBulletByBag()) return Ie.Instance.play("开空枪"), void L.Instance.ShowTips(O.Instance.getLangInfoByKey("noBulletTips", O.Instance.getLangInfoByKey("weapon_name_" + H.Instance.nowUseWeapon)));
                        for (var n = H.Instance.getBagBullet(), a = 0, o = 0; o < n.length; o++) {
                            n[o] == H.Instance.nowUseWeapon && a++
                        }
                        var i = de.bulletMaxArr[H.Instance.nowUseWeapon];
                        i > a && (i = a);
                        for (var l = 0; l < i; l++) {
                            H.Instance.addWeaponButtle();
                            for (var r = 0; r < n.length; r++) {
                                if (n[r] == H.Instance.nowUseWeapon) {
                                    n.splice(r, 1);
                                    break
                                }
                            }
                        }
                        H.Instance.setBagBullet(n), t()
                    } else Ie.Instance.play("开空枪"), L.Instance.ShowTips(O.Instance.getLangInfoByKey("gotoBagChangeBullet"))
                }, l.signalgunBulletBomb = function (e) {
                    var t = this;
                    this.signalgunBulletMask.node.active = !0, this.signalgunBulletMask.contentSize = v.ZERO, this.signalgunBulletOpc.opacity = 255, b(this.signalgunBulletMask).to(.1, {
                        contentSize: new v(2 * H.Instance.CanvansSize.width, 2 * H.Instance.CanvansSize.height)
                    }).call((function () {
                        z.Instance.DelayToDo((function () {
                            b(t.signalgunBulletOpc).to(1, {
                                opacity: 0
                            }).call((function () {
                                t.signalgunBulletMask.node.active = !1
                            })).start();
                            var n = .25;
                            t.fogNode.active && z.Instance.DelayToDo((function () {
                                t.disShowFog()
                            }), t, n), z.Instance.DelayToDo((function () {
                                for (var n = 0; n < t.killBossArr.length; n++) {
                                    t.killBossArr[n].getComponent(ee).getHurtByOther(e)
                                }
                                z.Instance.DelayToDo((function () {
                                    t.isTestNoFog || t.fogDisShowTimer >= t.fogDisShowTime && t.showFog(), t.resumeGame(), t.isNoHurt = !1;
                                    var e = .8 * -t.playerNowHp;
                                    t.changePlayerHp(e), H.Instance.newHandStep == W.TEACH_Hide_XINHAO && z.Instance.DelayToDo((function () {
                                        H.Instance.newHandStep = W.TEACH_SHOW_BLOOD, t.showGuideHideXinhaoBtn()
                                    }), t, 1)
                                }), t, .375)
                            }), t, .5)
                        }), t, 1)
                    })).start()
                }, l.doorBlock = function (e, t) {
                    for (var n = 0; n < e.length; n++) {
                        var a = e[n],
                            o = this.GameBlockKey(a),
                            i = this.allGameBlock[o];
                        i && (i.blockItemType = this.initGameBlock[o].blockItemType, this.astarGrid.setWalkable(a.x, a.y, !0))
                    }
                    for (var l = 0; l < t.length; l++) {
                        var r = t[l],
                            s = this.GameBlockKey(r),
                            c = this.allGameBlock[s];
                        c && (c.blockItemType = Sn.door, this.astarGrid.setWalkable(r.x, r.y, !1))
                    }
                }, l.showFog = function () {
                    this.fogMask.active = this.fogNode.active = !this.isTestNoFog, this.hideFogTimeLab.node.active = !1, this.refreshFog()
                }, l.disShowFog = function () {
                    this.hideFogTimeLab.node.active = !0, this.hideFogTimeLab.string = R.Instance.GetMinSecShowLab(this.fogDisShowTime), this.fogMask.active = this.fogNode.active = !1, this.resumeGame()
                }, l.showUseHandDrugPanel = function (e) {
                    this.waitToUseDrug = e, this.handDrugPanel.showPanel(e.getDrugType)
                }, l.useHandDrug = function (e) {
                    e && (this.waitToUseDrug.getDrugType = e), this.getNewPlayerNode.useHandDrug(this.waitToUseDrug)
                }, l.refreshPlayerHandType = function () {
                    this.getNewPlayerNode.getnowPlayHandType == Dn.绿巨人 ? (this.playerOneReduceHp = this.greenReduceHp, this.bugDBAnim.playAnimation("fengkuang")) : (this.playerOneReduceHp = this.normalReduceHp, this.bugDBAnim.playAnimation("putong"))
                }, l.getLevelBoss = function () {
                    for (var e = this.levelPrefab.bossNode.children, t = 0; t < e.length; t++) {
                        var n = e[t];
                        if (U.Instance.isContainsWords(n.name, "Boss_")) return e[t].getComponent(oe)
                    }
                }, l.recoverPlayer = function () {
                    this.getNewPlayerNode.playerRecover(), this.brainLoopAnim(), this.uiDeadPanel.hidePanel(), this.resumeGame(), this.changePlayerHp(this.playerHp), this.stopRedFrameAnim()
                }, l.showBoxQuesPanel = function (e) {
                    this.uiBoxQuesPanel.showQuestion(), this.touchBox = e
                }, l.openBox = function () {
                    this.touchBox.boxOpen()
                }, l.destroyBox = function () {
                    this.changeGameBlockData(this.touchBox.getBoxVec2), this.astarGrid.setWalkable(this.touchBox.getBoxVec2.x, this.touchBox.getBoxVec2.y, !1), this.touchBox.boxDestory()
                }, l.winGame = function () {
                    var e = this;
                    this.nowGameState != Nn.stop && (H.Instance.savePlayerDataInLv(), this.pauseGame(), this.nowGameState = Nn.stop, H.Instance.playLvIndex += 1, H.Instance.playLvIndex >= H.Instance.levelMaxCount ? L.Instance.ShowTips("敬请期待") : this.passNode.showPassAnim((function () {
                        e.loadLevelPrefab("Level" + H.Instance.themeIndex + "_" + (H.Instance.playLvIndex + 1)), Y.instance.isToDaren && 1 == H.Instance.playLvIndex && z.Instance.DelayToDoNoObj((function () {
                            X.Instance.OpenPanel(Z.UISettingPanel)
                        }), 3)
                    })), be.Instance.PlatformSDKControl.trackEvent("PassLevel", {
                        PassLevel: "Level" + H.Instance.themeIndex + "_" + H.Instance.playLvIndex
                    }))
                }, l.loseGame = function () {
                    var e = this;
                    this.nowGameState != Nn.stop && (this.nowGameState = Nn.stop, L.Instance.ShowTips("玩家死亡"), this.newPlayerNode.playerDead(), z.Instance.DelayToDo((function () {
                        e.pauseGame(), e.uiDeadPanel.showPanel()
                    }), this, 3.5), be.Instance.PlatformSDKControl.stopRecord(), be.Instance.PlatformSDKControl.trackEvent("PlayerDead", {
                        PlayerDead: "Level" + H.Instance.themeIndex + "_" + (H.Instance.playLvIndex + 1) + ",死亡区域" + H.Instance.playerInLevelArenaIndex
                    }))
                }, l.pauseGame = function () {
                    console.log("暂停游戏"), this.stopAllTween(), this.nowGameState = Nn.pause
                }, l.resumeGame = function () {
                    console.log("恢复游戏"), this.nowGameState = Nn.playing, this.stopTargets.length > 0 && (G.instance.ActionManager.resumeTargets(this.stopTargets), this.stopTargets = [])
                }, l.stopAllTween = function () {
                    var e = G.instance.ActionManager.pauseAllRunningActions();
                    if (e.length > 0) {
                        this.stopTargets = e;
                        for (var t = 0; t < this.stopTargets.length; t++) {
                            var n = this.stopTargets[t];
                            n instanceof m && ("CommonTipsNode" == n.node.name || "redFrame" == n.node.name) && G.instance.ActionManager.resumeTarget(this.stopTargets[t]), n instanceof c && ("FogImg" == n.name || "powerPrefab" == n.name) && G.instance.ActionManager.resumeTarget(this.stopTargets[t])
                        }
                    }
                }, l.destoryLevelPrefab = function () {
                    if (this.levelPrefab) {
                        this.stopAllTween();
                        for (var e = 0; e < this.bloodPool.length; e++) {
                            this.bloodPool[e].removeFromParent()
                        }
                        this.levelMapFirstPoint.removeFromParent(), this.levelPrefab.node.removeFromParent(), console.log("销毁关卡"), this.levelPrefab.node.destroy(), this.levelPrefab = null
                    }
                }, l.testPlayerAutoMove = function (e) {
                    var t = q.ins.findPath(this.playerNode.getStandBlock.blockVec2, e);
                    if (t) {
                        var n = this,
                            a = 0;
                        ! function e() {
                            var o = n.getOneGameBlock(new N(t[a].x, t[a].y));
                            n.playerNode.changePlayerStandBlock(o, !0), a++, z.Instance.DelayToDo((function () {
                                a < t.length && e()
                            }), this, .15)
                        }()
                    }
                }, l.testAddBullet = function () {}, i(t, [{
                    key: "getGunAnimNode",
                    get: function () {
                        return this.gunAnimNode.children[H.Instance.nowUseWeapon]
                    }
                }, {
                    key: "getDankeNode",
                    get: function () {
                        return this.dankeNode.children[H.Instance.nowUseWeapon]
                    }
                }, {
                    key: "getDeadPanel",
                    get: function () {
                        return this.uiDeadPanel
                    }
                }, {
                    key: "getGuidePanel",
                    get: function () {
                        return this.guidePanel
                    }
                }, {
                    key: "getGameTaskMgr",
                    get: function () {
                        return this.gameTaskMgr
                    }
                }, {
                    key: "getLevelNode",
                    get: function () {
                        return this.levelNode
                    }
                }, {
                    key: "getLevelPrefab",
                    get: function () {
                        return this.levelPrefab
                    }
                }, {
                    key: "getPlayerNode",
                    get: function () {
                        return this.newPlayerNode
                    }
                }, {
                    key: "getNewPlayerNode",
                    get: function () {
                        return this.newPlayerNode
                    }
                }, {
                    key: "getGameCamera",
                    get: function () {
                        return this.gameCamera
                    }
                }, {
                    key: "fogArena",
                    get: function () {
                        return this._fogFarArena || (this._fogFarArena = new N(this.watchArena + this.farMaskArenaX, this.watchArena + this.farMaskArenaY)), this._fogFarArena
                    }
                }, {
                    key: "getNowGameState",
                    get: function () {
                        return this.nowGameState
                    }
                }, {
                    key: "isGuiding",
                    get: function () {
                        return this.guidePanel.node.active
                    }
                }, {
                    key: "blockOffset",
                    get: function () {
                        return this._blockOffset || (this._blockOffset = new N(this.blockSize.x / 2, -this.blockSize.y / 2)), N.ZERO
                    }
                }, {
                    key: "getPlayerNowHp",
                    get: function () {
                        return this.playerNowHp
                    }
                }, {
                    key: "getPlayerHpPer",
                    get: function () {
                        var e = this.getPlayerNowHp / this.playerHp;
                        return e < 0 && (e = 0), e > 1 && (e = 1), 1 - e
                    }
                }, {
                    key: "isShowGuidePanel",
                    get: function () {
                        return this.guidePanel.node.active
                    }
                }, {
                    key: "checkWeaponIsShotCD",
                    get: function () {
                        return this.weaponArr[H.Instance.nowUseWeapon].weaponIsShotCD
                    }
                }]), t
            }(C)).prototype, "isNoHurt", [Se], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), St = t(Pt.prototype, "isTestNoFog", [Te], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Tt = t(Pt.prototype, "levelNode", [Ne], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Nt = t(Pt.prototype, "bloodNode", [De], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Dt = t(Pt.prototype, "bottomDrugPanel", [Ae], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), At = t(Pt.prototype, "gameViewUINode", [Ge], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Gt = t(Pt.prototype, "levelMapFirstPoint", [Ce], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Ct = t(Pt.prototype, "fogNode", [Le], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Lt = t(Pt.prototype, "fogMask", [He], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Ht = t(Pt.prototype, "skillItemNode", [We], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Wt = t(Pt.prototype, "tentacleSkillItemNode", [Me], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Mt = t(Pt.prototype, "backMainBtn", [Fe], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Ft = t(Pt.prototype, "bagBtn", [xe], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), xt = t(Pt.prototype, "takeWeaponBtn", [Ke], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Kt = t(Pt.prototype, "takeWeaponBtnLab", [Ee], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Et = t(Pt.prototype, "shotWeaponBtn", [_e], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), _t = t(Pt.prototype, "hideFogBtn", [Ve], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Vt = t(Pt.prototype, "signalgunBulletMask", [ze], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), zt = t(Pt.prototype, "testArm", [Ue], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Ut = t(Pt.prototype, "longArmNode", [Oe], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Ot = t(Pt.prototype, "brainImg", [Re], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Rt = t(Pt.prototype, "gunAnimNode", [Ye], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Yt = t(Pt.prototype, "dankeNode", [Xe], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Xt = t(Pt.prototype, "bugItem", [Ze], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Zt = t(Pt.prototype, "bugDBAnim", [Qe], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Qt = t(Pt.prototype, "drugDBAnim", [je], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), jt = t(Pt.prototype, "bloodLineBar", [qe], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), qt = t(Pt.prototype, "drugItemNode", [Je], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), Jt = t(Pt.prototype, "unlockDrugItemNode", [$e], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), $t = t(Pt.prototype, "handDrugPanel", [et], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), en = t(Pt.prototype, "uiDeadPanel", [tt], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), tn = t(Pt.prototype, "uiBoxQuesPanel", [nt], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), nn = t(Pt.prototype, "passNode", [at], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), an = t(Pt.prototype, "touchMoveTips", [ot], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), on = t(Pt.prototype, "guidePanel", [it], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), ln = t(Pt.prototype, "uiPanelNode", [lt], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), rn = t(Pt.prototype, "gameTaskMgr", [rt], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), sn = t(Pt.prototype, "playerNode", [st], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), cn = t(Pt.prototype, "newPlayerNode", [ct], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), hn = t(Pt.prototype, "gameCamera", [ht], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), un = t(Pt.prototype, "watchArena", [ut], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 4
                }
            }), gn = t(Pt.prototype, "redFrame", [gt], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), dn = t(Pt.prototype, "farMaskArenaX", [dt], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 0
                }
            }), pn = t(Pt.prototype, "farMaskArenaY", [pt], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 0
                }
            }), yn = t(Pt.prototype, "PlayerSkatingMoveSpeed", [yt], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 8
                }
            }), fn = t(Pt.prototype, "playerHp", [ft], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 200
                }
            }), mn = t(Pt.prototype, "cameraMoveSpeed", [mt], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return .05
                }
            }), kn = t(Pt.prototype, "fogDisShowTime", [kt], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 180
                }
            }), wn = t(Pt.prototype, "drugHelpHp", [wt], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 100
                }
            }), vn = t(Pt.prototype, "normalReduceHp", [vt], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 1
                }
            }), In = t(Pt.prototype, "greenReduceHp", [It], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 10
                }
            }), bt = Pt)) || bt));
            l._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UILoadingView.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BaseUIView.ts", "./LYCSDKEventHelper.ts", "./UIViewMgr.ts"], (function (e) {
    "use strict";
    var i, n, t, r, a, o, l, c, s, u, p, g, d, f;
    return {
        setters: [function (e) {
            i = e.applyDecoratedDescriptor, n = e.inheritsLoose, t = e.initializerDefineProperty, r = e.assertThisInitialized
        }, function (e) {
            a = e.cclegacy, o = e._decorator, l = e.UITransform, c = e.Label, s = e.Size
        }, function (e) {
            u = e.BaseUIView
        }, function (e) {
            p = e.LYCSDKEventHelper, g = e.EventConfig
        }, function (e) {
            d = e.UIViewMgr, f = e.UIViewConfig
        }],
        execute: function () {
            var w, I, L, y, V, h, b;
            a._RF.push({}, "e782fpYiLhGiam+7WDNJoau", "UILoadingView", void 0);
            var v = o.ccclass,
                U = o.property;
            e("UILoadingView", (w = v("UILoadingView"), I = U({
                type: l
            }), L = U({
                type: c
            }), w((h = i((V = function (e) {
                function i() {
                    for (var i, n = arguments.length, a = new Array(n), o = 0; o < n; o++) a[o] = arguments[o];
                    return i = e.call.apply(e, [this].concat(a)) || this, t(i, "loadingBar", h, r(i)), t(i, "loadingLab", b, r(i)), i
                }
                return n(i, e), i.prototype.InitView = function () {
                    var i = this;
                    e.prototype.InitView.call(this), p.instance.on(g.LoadingProgress, (function (e) {
                        i.loadingBar.contentSize = new s(320 * e, i.loadingBar.contentSize.height);
                        var n = 100 * e;
                        i.loadingLab.string = "loading..." + n.toFixed(0), e >= 1 && d.Instance.OpenView(f.UIStartView)
                    }))
                }, i
            }(u)).prototype, "loadingBar", [I], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), b = i(V.prototype, "loadingLab", [L], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), y = V)) || y));
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UINodeGoldPowerPanel.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BaseUIPanel.ts", "./GameConfig.ts", "./LYCADSDK.ts", "./LYCSDK.ts", "./ResMgr.ts", "./TimeControl.ts", "./GameTools.ts", "./LangInfoTools.ts", "./UITools.ts", "./UIViewMgr.ts", "./GoldPowerItemControl.ts"], (function (e) {
    "use strict";
    var n, t, o, r, a, i, c, l, s, I, p, u, w, d, m, f, g, v, y, P, b;
    return {
        setters: [function (e) {
            n = e.applyDecoratedDescriptor, t = e.inheritsLoose, o = e.initializerDefineProperty, r = e.assertThisInitialized
        }, function (e) {
            a = e.cclegacy, i = e._decorator, c = e.Label, l = e.Sprite, s = e.Button
        }, function (e) {
            I = e.BaseUIPanel
        }, function (e) {
            p = e.GameConfig
        }, function (e) {
            u = e.LYCADSDK
        }, function (e) {
            w = e.LYCSDK
        }, function (e) {
            d = e.ResMgr
        }, function (e) {
            m = e.TimeControl
        }, function (e) {
            f = e.GameTools
        }, function (e) {
            g = e.LangInfoTools
        }, function (e) {
            v = e.UITools
        }, function (e) {
            y = e.UIViewMgr, P = e.UIViewConfig
        }, function (e) {
            b = e.GoldPowerItemControl
        }],
        execute: function () {
            var h, C, L, D, G, B, T, S, U, V, A, N, z, k, K, R, _;
            e("AddGoldPowerType", void 0), a._RF.push({}, "644d7IeTddBLZNM2O+BVy9m", "UINodeGoldPowerPanel", void 0);
            var M, H = i.ccclass,
                F = i.property;
            ! function (e) {
                e[e.gold = 0] = "gold", e[e.power = 1] = "power"
            }(M || (M = e("AddGoldPowerType", {})));
            e("UINodeGoldPowerPanel", (h = H("UINodeGoldPowerPanel"), C = F({
                type: c
            }), L = F({
                type: c
            }), D = F({
                type: l
            }), G = F({
                type: s
            }), B = F({
                type: s
            }), T = F({
                type: c
            }), S = F({
                type: c
            }), h((A = n((V = function (e) {
                function n() {
                    for (var n, t = arguments.length, a = new Array(t), i = 0; i < t; i++) a[i] = arguments[i];
                    return n = e.call.apply(e, [this].concat(a)) || this, o(n, "titleLab", A, r(n)), o(n, "panelDoc", N, r(n)), o(n, "addItemImg", z, r(n)), o(n, "recoverBtn", k, r(n)), o(n, "closeBtn", K, r(n)), o(n, "recoverLab", R, r(n)), o(n, "recoverCDLab", _, r(n)), n.oneSecondTimer = 0, n
                }
                t(n, e);
                var a = n.prototype;
                return a.InitUIPanel = function () {
                    var n = this;
                    e.prototype.InitUIPanel.call(this), v.Instance.AddBtnClickListener(this.recoverBtn, (function () {
                        u.Instance.WatchVideoAD((function () {
                            n.HideUIPanel(), m.Instance.DelayToDo((function () {
                                p.Instance.isClickStartBtnByNoPower && y.Instance.OpenView(P.UIGameView), y.Instance.getNowOpenView().goldPower.getComponent(b).showAddPowerAnim(p.Instance.adRecoverPowerCount), p.Instance.playerHavePower += p.Instance.adRecoverPowerCount, p.Instance.isClickStartBtnByNoPower = !1
                            }), n, .5), w.Instance.PlatformSDKControl.trackEvent("WatchAD", {
                                ADType: "体力获取"
                            }), y.Instance.GetView(P.UIGameView) && y.Instance.getGameView().node.active && y.Instance.getGameView().resumeGame()
                        }), (function () {
                            p.Instance.isClickStartBtnByNoPower = !1, y.Instance.GetView(P.UIGameView) && y.Instance.getGameView().node.active && y.Instance.getGameView().resumeGame()
                        }))
                    })), v.Instance.AddBtnClickListener(this.closeBtn, (function () {
                        (n.HideUIPanel(), p.Instance.isClickDeadRestart) && y.Instance.getGameView().getDeadPanel.recoverCD()
                    }))
                }, a.update = function (e) {
                    if (this.oneSecondTimer += e, this.oneSecondTimer > 1 && (this.oneSecondTimer = 0, this.recoverCDLab.node.active && (this.recoverCDLab.node.active = p.Instance.playerHavePower < p.Instance.maxPowerCount, p.Instance.playerHavePower < p.Instance.maxPowerCount))) {
                        var n = f.Instance.GetNowTime() - p.Instance.powerUserTime,
                            t = p.Instance.recoverPowerTimeSpace - n;
                        t <= 0 && (t = 0);
                        var o = v.Instance.GetMinSecShowLab(t);
                        this.recoverCDLab.string = o
                    }
                }, a.ShowUIPanel = function () {
                    e.prototype.ShowUIPanel.call(this), this.showPanel()
                }, a.showPanel = function () {
                    var e = M.power;
                    switch (this.recoverLab.node.active = e == M.power, this.recoverCDLab.node.active = e == M.power, e) {
                        case M.power:
                            this.titleLab.string = g.Instance.getLangInfoByKey("no_power_title"), this.panelDoc.string = g.Instance.getLangInfoByKey("no_power_doc", p.Instance.adRecoverPowerCount.toString()), this.addItemImg.spriteFrame = d.Instance.LoadSpriteFrame("tiliImg"), this.recoverLab.string = g.Instance.getLangInfoByKey("recoverPowerTips")
                    }
                }, n
            }(I)).prototype, "titleLab", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), N = n(V.prototype, "panelDoc", [L], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), z = n(V.prototype, "addItemImg", [D], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), k = n(V.prototype, "recoverBtn", [G], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), K = n(V.prototype, "closeBtn", [B], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), R = n(V.prototype, "recoverLab", [T], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), _ = n(V.prototype, "recoverCDLab", [S], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), U = V)) || U));
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UIPanelMgr.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BaseUIPanel.ts", "./ResMgr.ts", "./UIViewMgr.ts"], (function (n) {
    "use strict";
    var e, a, i, t, l, o;
    return {
        setters: [function (n) {
            e = n.createClass
        }, function (n) {
            a = n.cclegacy, i = n._decorator
        }, function (n) {
            t = n.BaseUIPanel
        }, function (n) {
            l = n.ResMgr
        }, function (n) {
            o = n.UIViewMgr
        }],
        execute: function () {
            var s, c;
            a._RF.push({}, "fa150XeMI5BDJvW3biGTQWR", "UIPanelMgr", void 0);
            var r = i.ccclass,
                P = (i.property, n("UIPanelConfig", (function () {})));
            P.UICommonLoadingPanel = "UICommonLoadingPanel", P.UIBagPanel = "UIBagPanel", P.UINoGoldPowerPanel = "UINoGoldPowerPanel", P.UISettingPanel = "UISettingPanel";
            n("UIPanelMgr", r("UIPanelMgr")(((c = function () {
                function n() {
                    this.UIPanelDic = {}, this.UINowOpenPanelName = ""
                }
                var a = n.prototype;
                return a.OpenPanel = function (n, e) {
                    void 0 === e && (e = o.Instance.NowOpenViewName);
                    var a, i = this;
                    if (this.UINowOpenPanelName = n, this.UIPanelDic[n]) a = this.UIPanelDic[n], o.Instance.GetView(e).node.addChild(a.node), a.ShowUIPanel();
                    else {
                        var s = l.Instance.LoadPrefab(n);
                        s && (s = l.Instance.LoadPrefab(n), a = s.getComponent(t), o.Instance.GetView(e).node.addChild(a.node), i.UIPanelDic[n] = a, a.InitUIPanel(), a.ShowUIPanel())
                    }
                    return a
                }, a.GetPanel = function (n) {
                    var e = this.UIPanelDic[n];
                    if (e) return e;
                    console.error("当前Panel尚未创建")
                }, a.HideAllPanel = function () {
                    for (var n in this.UIPanelDic) this.UIPanelDic[n].HideUIPanel()
                }, a.hidePanel = function (n) {
                    this.UIPanelDic[n] && this.UIPanelDic[n].HideUIPanel()
                }, a.DesPanel = function (n) {
                    this.UIPanelDic[n] && (this.UIPanelDic[n].node.removeFromParent(), this.UIPanelDic[n].destroy(), this.UIPanelDic[n] = null)
                }, e(n, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this.instance && (this.instance = new n), this.instance
                    }
                }]), n
            }()).instance = void 0, s = c)) || s);
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UISetPanel.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BaseUIPanel.ts", "./CommonTipsMgr.ts", "./GameConfig.ts", "./LYCSDK.ts", "./ResMgr.ts", "./LangInfoTools.ts", "./UITools.ts", "./UIControl.ts", "./UIViewMgr.ts"], (function (e) {
    "use strict";
    var n, t, i, o, a, l, r, s, c, g, p, u, f, I, m, d, y, h, B, b, L, T;
    return {
        setters: [function (e) {
            n = e.applyDecoratedDescriptor, t = e.inheritsLoose, i = e.initializerDefineProperty, o = e.assertThisInitialized
        }, function (e) {
            a = e.cclegacy, l = e._decorator, r = e.Label, s = e.Button, c = e.Node, g = e.sys, p = e.Sprite
        }, function (e) {
            u = e.BaseUIPanel
        }, function (e) {
            f = e.CommonTipsMgr
        }, function (e) {
            I = e.GameConfig
        }, function (e) {
            m = e.LYCSDK, d = e.PlatformType
        }, function (e) {
            y = e.ResMgr
        }, function (e) {
            h = e.LangInfoTools
        }, function (e) {
            B = e.UITools
        }, function (e) {
            b = e.UIControl
        }, function (e) {
            L = e.UIViewMgr, T = e.UIViewConfig
        }],
        execute: function () {
            var v, w, C, S, P, U, A, K, z, N, F, O, D, V, M, k, G, R, _, H, x;
            a._RF.push({}, "fad46oPL71NsrRpfInDLKfV", "UISetPanel", void 0);
            var Y = l.ccclass,
                j = l.property;
            e("UISetPanel", (v = Y("UISetPanel"), w = j({
                type: r
            }), C = j({
                type: s
            }), S = j({
                type: r
            }), P = j({
                type: s
            }), U = j({
                type: r
            }), A = j({
                type: s
            }), K = j({
                type: r
            }), z = j({
                type: s
            }), N = j({
                type: c
            }), v((D = n((O = function (e) {
                function n() {
                    for (var n, t = arguments.length, a = new Array(t), l = 0; l < t; l++) a[l] = arguments[l];
                    return n = e.call.apply(e, [this].concat(a)) || this, i(n, "panelTitle", D, o(n)), i(n, "bgmBtn", V, o(n)), i(n, "bgmTitle", M, o(n)), i(n, "soundBtn", k, o(n)), i(n, "soundTitle", G, o(n)), i(n, "delAllBtn", R, o(n)), i(n, "delAllTitle", _, o(n)), i(n, "closeBtn", H, o(n)), i(n, "tempShowLvBtnNode", x, o(n)), n
                }
                t(n, e);
                var a = n.prototype;
                return a.InitUIPanel = function () {
                    var e = this;
                    this.panelTitle.string = h.Instance.getLangInfoByKey("setTitle"),
                        this.bgmTitle.string = h.Instance.getLangInfoByKey("bgmTag"),
                        this.soundTitle.string = h.Instance.getLangInfoByKey("soundTag"),
                        this.delAllTitle.string = h.Instance.getLangInfoByKey("delAll"),

                        B.Instance.AddBtnClickListener(this.bgmBtn, (function () {
                            I.Instance.ChangeBgmState(), e.refreshPanel()
                        })),
                        B.Instance.AddBtnClickListener(this.soundBtn, (function () {
                            I.Instance.ChangeSoundState(), e.refreshPanel()
                        })),
                        B.Instance.AddBtnClickListener(this.closeBtn, (function () {
                            e.HideUIPanel()
                        })),
                        B.Instance.AddBtnClickListener(this.delAllBtn, (function () {
                            g.localStorage.clear(), f.Instance.ShowTips(h.Instance.getLangInfoByKey("delAllTips")), e.refreshPanel(), L.Instance.OpenView(T.UIGameView)
                        })),
                        this.delAllBtn.node.active = b.instance.isToDaren,
                        this.tempShowLvBtnNode.active = false //m.Instance.GamePlatform == d.Windows && b.instance.isToDaren;
                    for (var n = function (n) {
                            var t = e.tempShowLvBtnNode.children[n].getComponent(s),
                                i = n;
                            B.Instance.AddBtnClickListener(t, (function () {
                                I.Instance.playLvIndex = i, L.Instance.OpenView(T.UIGameView), I.Instance.playerHavePower += 1
                            }), !1)
                        }, t = 0; t < this.tempShowLvBtnNode.children.length; t++) n(t)
                }, a.ShowUIPanel = function () {
                    e.prototype.ShowUIPanel.call(this), this.refreshPanel()
                }, a.update = function (e) {}, a.refreshPanel = function () {
                    var e = this.bgmBtn.getComponent(p),
                        n = this.bgmBtn.node.getChildByName("offLab").getComponent(r),
                        t = this.bgmBtn.node.getChildByName("onLab").getComponent(r);
                    t.node.active = I.Instance.IsBgmOn, n.node.active = !t.node.active, I.Instance.IsBgmOn ? (e.spriteFrame = y.Instance.LoadSpriteFrame("commonOnImg"), t.string = h.Instance.getLangInfoByKey("onTag")) : (e.spriteFrame = y.Instance.LoadSpriteFrame("commonOffImg"), n.string = h.Instance.getLangInfoByKey("offTag"));
                    var i = this.soundBtn.getComponent(p);
                    n = this.soundBtn.node.getChildByName("offLab").getComponent(r), (t = this.soundBtn.node.getChildByName("onLab").getComponent(r)).node.active = I.Instance.IsSoundOn, n.node.active = !t.node.active, I.Instance.IsSoundOn ? (i.spriteFrame = y.Instance.LoadSpriteFrame("commonOnImg"), t.string = h.Instance.getLangInfoByKey("onTag")) : (i.spriteFrame = y.Instance.LoadSpriteFrame("commonOffImg"), n.string = h.Instance.getLangInfoByKey("offTag"))
                }, n
            }(u)).prototype, "panelTitle", [w], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), V = n(O.prototype, "bgmBtn", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), M = n(O.prototype, "bgmTitle", [S], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), k = n(O.prototype, "soundBtn", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), G = n(O.prototype, "soundTitle", [U], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), R = n(O.prototype, "delAllBtn", [A], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), _ = n(O.prototype, "delAllTitle", [K], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), H = n(O.prototype, "closeBtn", [z], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), x = n(O.prototype, "tempShowLvBtnNode", [N], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), F = O)) || F));
            a._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UIStartView.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BaseUIView.ts", "./GameConfig.ts", "./TimeControl.ts", "./UITools.ts", "./UIPanelMgr.ts", "./UIViewMgr.ts", "./GoldPowerItemControl.ts", "./BgmMgr.ts", "./LYCSDK.ts", "./LYCSDKEventHelper.ts", "./LangInfoTools.ts"], (function (t) {
    "use strict";
    var e, n, i, a, o, s, r, c, l, h, p, w, I, S, u, L, f, b, d, g, m, y, P, T, v;
    return {
        setters: [function (t) {
            e = t.applyDecoratedDescriptor, n = t.inheritsLoose, i = t.initializerDefineProperty, a = t.assertThisInitialized
        }, function (t) {
            o = t.cclegacy, s = t._decorator, r = t.Node, c = t.Label, l = t.Button, h = t.sys
        }, function (t) {
            p = t.BaseUIView
        }, function (t) {
            w = t.GameConfig
        }, function (t) {
            I = t.TimeControl
        }, function (t) {
            S = t.UITools
        }, function (t) {
            u = t.UIPanelMgr, L = t.UIPanelConfig
        }, function (t) {
            f = t.UIViewMgr, b = t.UIViewConfig
        }, function (t) {
            d = t.GoldPowerItemControl
        }, function (t) {
            g = t.BgmMgr
        }, function (t) {
            m = t.LYCSDK, y = t.PlatformType
        }, function (t) {
            P = t.LYCSDKEventHelper, T = t.EventConfig
        }, function (t) {
            v = t.LangInfoTools
        }],
        execute: function () {
            var C, B, D, k, A, V, U, N, G, K, x, M, O, z, E, F, H;
            o._RF.push({}, "e7c52mshFlNloOkYvjJPBtF", "UIStartView", void 0);
            var Y = s.ccclass,
                _ = s.property;
            t("UIStartView", (C = Y("UIStartView"), B = _({
                type: r
            }), D = _({
                type: c
            }), k = _({
                type: l
            }), A = _({
                type: l
            }), V = _({
                type: l
            }), U = _({
                type: l
            }), N = _({
                type: l
            }), C((x = e((K = function (t) {
                function e() {
                    for (var e, n = arguments.length, o = new Array(n), s = 0; s < n; s++) o[s] = arguments[s];
                    return e = t.call.apply(t, [this].concat(o)) || this, i(e, "tipsLabelNode", x, a(e)), i(e, "tipsLabel", M, a(e)), i(e, "setBtn", O, a(e)), i(e, "startBtn", z, a(e)), i(e, "passTipsBtn", E, a(e)), i(e, "addDesktopBtn", F, a(e)), i(e, "passTipsMaskBtn", H, a(e)), e.isPassTips = !1, e.testShowStringArr = [], e.nowShowLabArrItem = "", e.nowShowLabStr = "", e.nowShowLabIndex = 0, e.nowShowLabArrIndex = 0, e.showLineTimeSpace = .3, e.showLabTimeSpace = .05, e.isShowLine = !0, e
                }
                n(e, t);
                var o = e.prototype;
                return o.InitView = function () {
                    var e = this;
                    if (t.prototype.InitView.call(this), this.tipsLabelNode.active = !1, this.tipsLabelNode.active) {
                        for (var n = 0; n < 2; n++) {
                            var i = n + 1,
                                a = v.Instance.getLangInfoByKey("startDoc" + i);
                            this.testShowStringArr.push(a)
                        }
                        this.autoShowLine(), I.Instance.DelayToDo((function () {
                            e.checkShowLabArr(), g.Instance.play("开场剧情键盘打字声音")
                        }), this, .5), w.Instance.playerHavePower = w.Instance.maxPowerCount, m.Instance.PlatformSDKControl.trackEvent("ShowStartLab", {})
                    }
                    P.instance.on(T.finishLoadStartViewBgm, (function () {
                        e.checkIsPlayClickBgm()
                    })), S.Instance.AddBtnClickListener(this.setBtn, (function () {
                        u.Instance.OpenPanel(L.UISettingPanel)
                    })), S.Instance.AddBtnClickListener(this.startBtn, (function () {
                        if (w.Instance.playerHavePower > 0) {
                            var t = h.localStorage.getItem("isShowTouchTipsPanel_");
                            f.Instance.OpenView(b.UIGameView, !t), w.Instance.isFristClickStartBtn && m.Instance.PlatformSDKControl.trackEvent("fristClickStartBtn", {})
                        } else w.Instance.isClickStartBtnByNoPower = !0, u.Instance.OpenPanel(L.UINoGoldPowerPanel)
                    })), S.Instance.AddBtnClickListener(this.passTipsBtn, (function () {
                        e.isPassTips = !0, g.Instance.pause(), f.Instance.OpenView(b.UIGameView), e.tipsLabelNode.active = !1, m.Instance.PlatformSDKControl.trackEvent("CloseStartLab", {})
                    })), S.Instance.AddBtnClickListener(this.passTipsMaskBtn, (function () {
                        if (e.isPassTips) e.isPassTips = !0, g.Instance.pause(), f.Instance.OpenView(b.UIGameView), e.tipsLabelNode.active = !1, m.Instance.PlatformSDKControl.trackEvent("CloseStartLab", {});
                        else {
                            e.isPassTips = !0;
                            for (var t = "", n = 0; n < e.testShowStringArr.length; n++) t += e.testShowStringArr[n];
                            e.tipsLabel.string = t, g.Instance.pause(), I.Instance.DelayToDo((function () {
                                e.tipsLabelNode.active && (f.Instance.OpenView(b.UIGameView), e.tipsLabelNode.active = !1, m.Instance.PlatformSDKControl.trackEvent("CloseStartLab", {}))
                            }), e, 1)
                        }
                    })), this.addDesktopBtn.node.active = m.Instance.GamePlatform == y.TT, m.Instance.GamePlatform == y.TT && (P.instance.on(T.CheckShortcut, (function () {
                        m.Instance.GameLog("快捷方式事件监听,是否已添加:" + !w.Instance.IsAddShortcut), e.addDesktopBtn.node.active = !w.Instance.IsAddShortcut
                    })), I.Instance.DelayToDo((function () {
                        m.Instance.GameLog("检查快捷方式是否添加"), m.Instance.PlatformSDKControl.CheckShortcut()
                    }), this, 1), S.Instance.AddBtnClickListener(this.addDesktopBtn, (function () {
                        m.Instance.PlatformSDKControl.AddShortcut()
                    }))), w.Instance.isFristOpenStartView && m.Instance.PlatformSDKControl.trackEvent("fristOpenStartView", {})
                    cc.view.setDesignResolutionSize(750, 1334, cc.ResolutionPolicy.FIXED_HEIGHT)
                }, o.ShowView = function () {
                    t.prototype.ShowView.call(this), this.goldPower.getComponent(d).showPowerLab(), this.tipsLabelNode.active || g.Instance.play()
                }, o.update = function (t) {}, o.autoShowLine = function () {
                    var t = this;
                    this.isPassTips || (this.isShowLine ? this.tipsLabel.string = this.nowShowLabStr + "I" : this.tipsLabel.string = this.nowShowLabStr, I.Instance.DelayToDo((function () {
                        t.isShowLine = !t.isShowLine, t.autoShowLine()
                    }), this, this.showLineTimeSpace))
                }, o.checkShowLabArr = function () {
                    this.nowShowLabIndex = 0, this.nowShowLabArrItem = this.testShowStringArr[this.nowShowLabArrIndex], this.autoShowLab()
                }, o.autoShowLab = function () {
                    var t = this;
                    this.isPassTips || (this.nowShowLabStr += this.nowShowLabArrItem[this.nowShowLabIndex], this.tipsLabel.string = this.nowShowLabStr, this.nowShowLabIndex += 1, this.nowShowLabIndex < this.nowShowLabArrItem.length ? I.Instance.DelayToDo((function () {
                        t.autoShowLab()
                    }), this, this.showLabTimeSpace) : (this.nowShowLabArrIndex++, this.nowShowLabArrIndex < this.testShowStringArr.length ? I.Instance.DelayToDo((function () {
                        t.checkShowLabArr()
                    }), this, 0) : (I.Instance.DelayToDo((function () {
                        t.isPassTips || f.Instance.OpenView(b.UIGameView), t.tipsLabelNode.active = !1
                    }), this, 1), g.Instance.pause())))
                }, o.checkIsPlayClickBgm = function () {
                    this.node.active && (this.tipsLabelNode.active ? g.Instance.play("开场剧情键盘打字声音") : g.Instance.play())
                }, e
            }(p)).prototype, "tipsLabelNode", [B], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), M = e(K.prototype, "tipsLabel", [D], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), O = e(K.prototype, "setBtn", [k], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), z = e(K.prototype, "startBtn", [A], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), E = e(K.prototype, "passTipsBtn", [V], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), F = e(K.prototype, "addDesktopBtn", [U], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), H = e(K.prototype, "passTipsMaskBtn", [N], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), G = K)) || G));
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UITools.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LYCSDK.ts", "./SoundMgr.ts"], (function (e) {
    "use strict";
    var n, o, t, r, c, a, i, l, s, u, f, d, m, v, g, p, T;
    return {
        setters: [function (e) {
            n = e.createClass
        }, function (e) {
            o = e.cclegacy, t = e._decorator, r = e.math, c = e.Canvas, a = e.Vec3, i = e.UITransform, l = e.Sprite, s = e.Color, u = e.Node, f = e.Button, d = e.SpriteFrame, m = e.assetManager, v = e.Texture2D
        }, function (e) {
            g = e.LYCSDK, p = e.PlatformType
        }, function (e) {
            T = e.SoundMgr
        }],
        execute: function () {
            var C, h;
            o._RF.push({}, "640aecwczJN3rFE9Qh6XuMR", "UITools", void 0);
            var S = t.ccclass;
            t.property, e("UITools", S("UITools")(((h = function () {
                function e() {}
                var o = e.prototype;
                return o.GetUINodeWorldPos = function (e, n) {
                    var o, t = e.getLocation(),
                        a = new r.Vec3(t.x, t.y, 0),
                        i = new r.Vec3;
                    return (null == (o = n.getComponent(c).cameraComponent) ? void 0 : o.camera).screenToWorld(i, a), i
                }, o.GetLevelNodeWorldPos = function (e, n, o, t) {
                    var i, l = e.getLocation(),
                        s = new r.Vec3(l.x, l.y, 0),
                        u = new r.Vec3;
                    return (null == (i = n.getComponent(c).cameraComponent) ? void 0 : i.camera).screenToWorld(u, s), u = new a(u.x + o.x, u.y + o.y, t)
                }, o.getLevelNodeScreenPos = function (e, n, o) {
                    var t = e;
                    return t = new a(t.x - n.x, t.y - n.y, o)
                }, o.GetOtherNodeLocalPos = function (e, n) {
                    var o = e.getComponent(i);
                    if (o) return o.convertToNodeSpaceAR(n.getWorldPosition());
                    console.error("转换坐标失败，非 UI 节点转换到 UI 节点(局部) 空间坐标系，请走 Camera 的 convertToUINode")
                }, o.AddNodeClickListener = function (e, n) {
                    var o = e.getComponent(l),
                        t = new s(255, 255, 255, 255),
                        r = new s(150, 150, 150, 255);
                    e.on(u.EventType.TOUCH_START, (function () {
                        o.color = r, T.Instance.play("click")
                    }), this), e.on(u.EventType.TOUCH_END, (function () {
                        o.color = t, n()
                    }), this)
                }, o.RemoveNodeClickListener = function (e) {
                    e.off(u.EventType.TOUCH_START), e.off(u.EventType.TOUCH_END)
                }, o.AddBtnClickListener = function (e, n, o) {
                    void 0 === o && (o = !0), e.node.on(f.EventType.CLICK, (function () {
                        o && T.Instance.play("UI点击"), n()
                    }))
                }, o.RemoveBtnClickListener = function (e) {
                    e.node.off(f.EventType.CLICK)
                }, o.SetBtnDark = function (e) {
                    e.getComponent(l).color = new s(150, 150, 150, 255)
                }, o.SetBtnLight = function (e) {
                    e.getComponent(l).color = new s(255, 255, 255, 255)
                }, o.LoadRemoteImg = function (e, n, o) {
                    if (g.Instance.GamePlatform == p.TT || g.Instance.GamePlatform == p.WX) {
                        var t = g.Instance.PlatformSDKControl.GetPlatformSDK().createImage();
                        t.src = e, t.width = 200, t.height = 200, t.addEventListener("load", (function (e) {
                            console.log("加载成功"), console.log(e), n.spriteFrame = d.createWithImage(t)
                        })), t.addEventListener("error", (function (e) {
                            console.log("加载失败"), o && o(e)
                        }))
                    } else m.loadRemote(e, (function (e, t) {
                        if (e) console.log("ddd111:没有加载到图片:" + e);
                        else try {
                            var r = new d,
                                c = new v;
                            c.image = t, r.texture = c, n.spriteFrame = r, o && o()
                        } catch (e) {
                            console.log("ddd222:加载头像出错:" + t)
                        }
                    }))
                }, o.GetTimeShowLab = function (e) {
                    var n = Math.floor(e / 3600),
                        o = Math.floor(e / 60),
                        t = Math.floor(e % 60);
                    return (n < 10 ? "0" + n : n.toString()) + ":" + (o < 10 ? "0" + o : o.toString()) + ":" + (t < 10 ? "0" + t : t.toString())
                }, o.GetMinSecShowLab = function (e) {
                    var n = Math.floor(e / 60),
                        o = Math.floor(e % 60);
                    return (n < 10 ? "0" + n : n.toString()) + ":" + (o < 10 ? "0" + o : o.toString())
                }, o.ShowUserName = function (e, n) {
                    return void 0 === n && (n = 8), e.length > n ? e.substr(0, n) + "..." : e
                }, n(e, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this.instance && (this.instance = new e), this.instance
                    }
                }]), e
            }()).instance = void 0, C = h)) || C);
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UIUnlockPanel.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./UITools.ts"], (function (n) {
    "use strict";
    var e, t, r, o, l, i, s, a, c, u, p;
    return {
        setters: [function (n) {
            e = n.applyDecoratedDescriptor, t = n.inheritsLoose, r = n.initializerDefineProperty, o = n.assertThisInitialized
        }, function (n) {
            l = n.cclegacy, i = n._decorator, s = n.Label, a = n.Node, c = n.Button, u = n.Component
        }, function (n) {
            p = n.UITools
        }],
        execute: function () {
            var w, h, d, f, b, A, g, k, y, B, S, m, I, P, v;
            l._RF.push({}, "02839hCRt1OAbp5mkxIdWLQ", "UIUnlockPanel", void 0);
            var L = i.ccclass,
                U = i.property;
            n("UIUnlockPanel", (w = L("UIUnlockPanel"), h = U({
                type: s
            }), d = U({
                type: s
            }), f = U({
                type: a
            }), b = U({
                type: c
            }), A = U({
                type: c
            }), g = U({
                type: c
            }), w((B = e((y = function (n) {
                function e() {
                    for (var e, t = arguments.length, l = new Array(t), i = 0; i < t; i++) l[i] = arguments[i];
                    return e = n.call.apply(n, [this].concat(l)) || this, r(e, "unlockTitle", B, o(e)), r(e, "unlockAnswer", S, o(e)), r(e, "unlockBtnNode", m, o(e)), r(e, "delBtn", I, o(e)), r(e, "okBtn", P, o(e)), r(e, "closePanelBtn", v, o(e)), e.showAnswerStr = "", e.realAnswerStr = "", e
                }
                t(e, n);
                var l = e.prototype;
                return l.onLoad = function () {
                    for (var n = this, e = function (e) {
                            var t = (e + 1) % 10,
                                r = n.unlockBtnNode.children[e].getComponent(c),
                                o = r.node.getChildByName("Label").getComponent(s);
                            p.Instance.AddBtnClickListener(r, (function () {
                                n.showAnswerStr += t, n.unlockAnswer.string = n.showAnswerStr
                            })), o.string = t.toString()
                        }, t = 0; t < 10; t++) e(t);
                    p.Instance.AddBtnClickListener(this.delBtn, (function () {
                        n.showAnswerStr.length > 0 && (n.showAnswerStr = n.showAnswerStr.substr(0, n.showAnswerStr.length - 1), n.unlockAnswer.string = n.showAnswerStr)
                    })), p.Instance.AddBtnClickListener(this.okBtn, (function () {
                        n.showAnswerStr.length > 0 && (n.showAnswerStr == n.realAnswerStr ? console.log("回答正确") : console.log("回答错误"))
                    })), p.Instance.AddBtnClickListener(this.closePanelBtn, (function () {
                        n.hidePanel()
                    }))
                }, l.update = function (n) {}, l.showPanel = function (n) {
                    this.realAnswerStr = n
                }, l.hidePanel = function () {
                    this.node.active = !1
                }, e
            }(u)).prototype, "unlockTitle", [h], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), S = e(y.prototype, "unlockAnswer", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), m = e(y.prototype, "unlockBtnNode", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), I = e(y.prototype, "delBtn", [b], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), P = e(y.prototype, "okBtn", [A], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), v = e(y.prototype, "closePanelBtn", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
            }), k = y)) || k));
            l._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UIViewMgr.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LoadingBundlePanel.ts", "./UIGameView.ts", "./BaseUIView.ts", "./ResMgr.ts", "./UIControl.ts"], (function (e) {
    "use strict";
    var i, n, t, o, a, s, c, r;
    return {
        setters: [function (e) {
            i = e.createClass
        }, function (e) {
            n = e.cclegacy, t = e._decorator
        }, function (e) {
            o = e.LoadingBundlePanel
        }, function (e) {
            a = e.UIGameView
        }, function (e) {
            s = e.BaseUIView
        }, function (e) {
            c = e.ResMgr
        }, function (e) {
            r = e.UIControl
        }],
        execute: function () {
            var w, l;
            n._RF.push({}, "282f0W0WlVGzJVMeNUZHea6", "UIViewMgr", void 0);
            var V = t.ccclass,
                u = (t.property, e("UIViewConfig", (function () {})));
            u.UILoadingView = "UILoadingView", u.UIStartView = "UIStartView", u.UIGameView = "UIGameView";
            e("UIViewMgr", V("UIViewMgr")(((l = function () {
                function e() {
                    this.UIViewDic = {}, this.NowOpenViewName = "", this.loadingPanel = void 0
                }
                var n = e.prototype;
                return n.OpenView = function (i, n) {
                    void 0 === n && (n = !1);
                    var t, a = this;
                    if (this.UIViewDic[i]) this.HideAllView(), (t = this.UIViewDic[i]).ShowView(), this.NowOpenViewName = i;
                    else {
                        var w = function () {
                            a.HideAllView(), t = c.Instance.LoadPrefab(i).getComponent(s), r.instance.node.addChild(t.node), a.UIViewDic[i] = t, t.InitView(), t.ShowView(), a.NowOpenViewName = i
                        };
                        c.Instance.LoadPrefab(i) && !n ? w() : (this.loadingPanel || (this.loadingPanel = c.Instance.LoadPrefab("LoadingPanel").getComponent(o), this.loadingPanel.node.setParent(e.Instance.GetView(u.UIStartView).node)), this.loadingPanel.AfterLoadPanelClose(i, w))
                    }
                    return t
                }, n.GetView = function (e) {
                    var i = this.UIViewDic[e];
                    return i || (console.log("当前界面尚未创建"), null)
                }, n.HideAllView = function () {
                    for (var e in this.UIViewDic) this.UIViewDic[e].HideView()
                }, n.getNowOpenView = function () {
                    return this.UIViewDic[this.NowOpenViewName]
                }, n.getGameView = function () {
                    return e.instance.GetView(u.UIGameView).getComponent(a)
                }, i(e, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this.instance && (this.instance = new e), this.instance
                    }
                }]), e
            }()).instance = void 0, w = l)) || w);
            n._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/UMSDKControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LYCSDK.ts"], (function (t) {
    "use strict";
    var n, e, o, c;
    return {
        setters: [function (t) {
            n = t.createClass
        }, function (t) {
            e = t.cclegacy, o = t._decorator
        }, function (t) {
            c = t.LYCSDK
        }],
        execute: function () {
            var a, r;
            e._RF.push({}, "0a55cdQoe9N4p8hqofPmabf", "UMSDKControl", void 0);
            var s = o.ccclass;
            o.property, t("UMSDKControl", s("UMSDKControl")(((r = function () {
                function t() {
                    this.uma = void 0
                }
                var e = t.prototype;
                return e.InitUMSDK = function () {
                    this.uma = c.Instance.PlatformSDKControl.GetPlatformSDK().uma
                }, e.trackEvent = function (t, n) {
                    this.uma ? (c.Instance.GameLog("埋点：" + t), this.uma.trackEvent(t, n)) : c.Instance.GameLog("尚未接入友盟sdk")
                }, n(t, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this._instance && (this._instance = new t), this._instance
                    }
                }]), t
            }())._instance = void 0, a = r)) || a);
            e._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/VivoApkControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BaseSDKControl.ts"], (function (t) {
    "use strict";
    var n, o, e, r, i;
    return {
        setters: [function (t) {
            n = t.inheritsLoose, o = t.createClass
        }, function (t) {
            e = t.cclegacy, r = t._decorator
        }, function (t) {
            i = t.BaseSDKControl
        }],
        execute: function () {
            var s, c;
            e._RF.push({}, "968dfz29IRMMJZBE2x0V/26", "VivoApkControl", void 0);
            var u = r.ccclass;
            r.property, t("VivoApkControl", u("VivoApkControl")(((c = function (t) {
                function e() {
                    return t.apply(this, arguments) || this
                }
                n(e, t);
                var r = e.prototype;
                return r.GetPlatformSDK = function () {
                    return e.Instance
                }, r.LoginPlatform = function () {}, o(e, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this._instance && (this._instance = new e), this._instance
                    }
                }]), e
            }(i))._instance = void 0, s = c)) || s);
            e._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/VivoSDKControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./BaseSDKControl.ts", "./LYCSDK.ts", "./LYCSDKHttp.ts", "./LYCSDKEventHelper.ts", "./GameTools.ts", "./UIViewMgr.ts", "./CommonTipsMgr.ts"], (function (n) {
    "use strict";
    var t, e, o, r, a, c, s, i, f, l, u, m;
    return {
        setters: [function (n) {
            t = n.inheritsLoose, e = n.createClass
        }, function (n) {
            o = n.cclegacy, r = n._decorator
        }, function (n) {
            a = n.BaseSDKControl
        }, function (n) {
            c = n.LYCSDK
        }, function (n) {
            s = n.LYCSDKHttp
        }, function (n) {
            i = n.LYCSDKEventHelper, f = n.EventConfig
        }, function (n) {
            l = n.GameTools
        }, function (n) {
            u = n.UIViewConfig
        }, function (n) {
            m = n.CommonTipsMgr
        }],
        execute: function () {
            var g, d;
            o._RF.push({}, "09b2ccnIS1BcIGdKnpojWCD", "VivoSDKControl", void 0);
            var S = r.ccclass;
            r.property, n("VivoSDKControl", S("VivoSDKControl")(((d = function (n) {
                function o() {
                    for (var t, e = arguments.length, o = new Array(e), r = 0; r < e; r++) o[r] = arguments[r];
                    return (t = n.call.apply(n, [this].concat(o)) || this).timeStamp = 0, t.platformVersionCode = void 0, t
                }
                t(o, n);
                var r = o.prototype;
                return r.GetPlatformSDK = function () {
                    return window.qg
                }, r.LoginPlatform = function () {
                    var n = this,
                        t = "com.gzly.ndgjz.vivominigame",
                        e = Math.floor(0x71afd498cffff * Math.random() + 0x71afd498cffff) + "";
                    n.platformVersionCode = n.GetPlatformSDK().getSystemInfoSync().platformVersionCode, n.platformVersionCode >= 1063 && n.GetPlatformSDK().login({
                        force: !0,
                        success: function (o) {
                            c.Instance.GameLog("---VivoController----login 调用成功", o.token), n.timeStamp = (new Date).getTime();
                            var r = "appKey={0}&appSecret={1}&nonce={5}&pkgName={2}&timestamp={3}&token={4}",
                                a = function (n) {
                                    var t = 8;

                                    function e(n, t) {
                                        var e = (65535 & n) + (65535 & t);
                                        return (n >> 16) + (t >> 16) + (e >> 16) << 16 | 65535 & e
                                    }

                                    function o(n, t) {
                                        return n >>> t | n << 32 - t
                                    }

                                    function r(n, t) {
                                        return n >>> t
                                    }

                                    function a(n, t, e) {
                                        return n & t ^ ~n & e
                                    }

                                    function c(n, t, e) {
                                        return n & t ^ n & e ^ t & e
                                    }

                                    function s(n) {
                                        return o(n, 2) ^ o(n, 13) ^ o(n, 22)
                                    }

                                    function i(n) {
                                        return o(n, 6) ^ o(n, 11) ^ o(n, 25)
                                    }

                                    function f(n) {
                                        return o(n, 7) ^ o(n, 18) ^ r(n, 3)
                                    }

                                    function l(n) {
                                        return o(n, 17) ^ o(n, 19) ^ r(n, 10)
                                    }

                                    function u(n, t) {
                                        var o, r, u, m, g, d, S, C, h, p, I, v, G = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
                                            k = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
                                            L = new Array(64);
                                        for (n[t >> 5] |= 128 << 24 - t % 32, n[15 + (t + 64 >> 9 << 4)] = t, h = 0; h < n.length; h += 16) {
                                            for (o = k[0], r = k[1], u = k[2], m = k[3], g = k[4], d = k[5], S = k[6], C = k[7], p = 0; p < 64; p++) L[p] = p < 16 ? n[p + h] : e(e(e(l(L[p - 2]), L[p - 7]), f(L[p - 15])), L[p - 16]), I = e(e(e(e(C, i(g)), a(g, d, S)), G[p]), L[p]), v = e(s(o), c(o, r, u)), C = S, S = d, d = g, g = e(m, I), m = u, u = r, r = o, o = e(I, v);
                                            k[0] = e(o, k[0]), k[1] = e(r, k[1]), k[2] = e(u, k[2]), k[3] = e(m, k[3]), k[4] = e(g, k[4]), k[5] = e(d, k[5]), k[6] = e(S, k[6]), k[7] = e(C, k[7])
                                        }
                                        return k
                                    }

                                    function m(n) {
                                        for (var e = [], o = (1 << t) - 1, r = 0; r < n.length * t; r += t) e[r >> 5] |= (n.charCodeAt(r / t) & o) << 24 - r % 32;
                                        return e
                                    }

                                    function g(n) {
                                        n = n.replace(/\r\n/g, "\n");
                                        for (var t = "", e = 0; e < n.length; e++) {
                                            var o = n.charCodeAt(e);
                                            o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128))
                                        }
                                        return t
                                    }

                                    function d(n) {
                                        for (var t = "0123456789abcdef", e = "", o = 0; o < 4 * n.length; o++) e += t.charAt(n[o >> 2] >> 8 * (3 - o % 4) + 4 & 15) + t.charAt(n[o >> 2] >> 8 * (3 - o % 4) & 15);
                                        return e
                                    }
                                    return d(u(m(n = g(n)), n.length * t))
                                }(r = l.Instance.replaceObjStr(r, "3f72153c4279c7bb6a558a9a4dbff396", "c76adb3fca0b6f68ec576b3ce96a860f", t, n.timeStamp, o.token, e));
                            r = "pkgName={0}&token={1}&timestamp={2}&nonce={3}&signature={4}";
                            var u = "userInfo?" + (r = l.Instance.replaceObjStr(r, t, o.token, n.timeStamp, e, a));
                            s.Instance.code2Session(u, {}, (function (t) {
                                c.Instance.GameLog("服务器登录成功 data:" + t), console.log(t), n.UserInfoCallBack.thirdId = t.data.openId, i.instance.sendMes(f.LoginSucceed, o)
                            }))
                        },
                        fail: function (n) {
                            c.Instance.GameLog("----BytesSdkController--login 调用失败"), c.Instance.GameLog("用户拒绝授权"), c.Instance.GameLog("直接登录服务器"), i.instance.sendMes(f.LoginSucceed, n)
                        }
                    }), c.Instance.GameLog("----BytesSdkController--调试器引擎版本", n.platformVersionCode)
                }, r.GetUserInfo = function () {
                    var n = this;
                    n.UserInfoCallBack.channel = "dy_rpk", n.platformVersionCode && n.GetPlatformSDK().getUserInfo({
                        withCredentials: !0,
                        success: function (t) {
                            console.log(t), c.Instance.GameLog("---BytesSdkController----GetUserInfo1 调用成功" + t.data), c.Instance.GameLog("---BytesSdkController----GetUserInfo2 调用成功" + t.data.avatarUrl), n.UserInfoCallBack.nickName = t.data.nickName, n.UserInfoCallBack.headIcon = t.data.avatarUrl, n.GetPlatformSDK().getLocation({
                                success: function (t) {
                                    c.Instance.GameLog(t.city, "----------getLocation----经度" + t.longitude + "纬度" + t.latitude + "---", t), n.UserInfoCallBack.city = t.city, n.UserInfoCallBack.province = l.Instance.GetProvinceData(n.UserInfoCallBack.city).province, i.instance.sendMes(f.GetUserInfo, t)
                                },
                                fail: function (n) {
                                    c.Instance.GameLog("----BytesSdkController--getLocation 调用失败"), i.instance.sendMes(f.GetUserInfo, n)
                                }
                            })
                        },
                        fail: function (n) {
                            c.Instance.GameLog("----BytesSdkController--GetUserInfo 调用失败"), i.instance.sendMes(f.GetUserInfo, n)
                        }
                    })
                }, r.ShareGame = function (n) {
                    c.Instance.GameLog("----bytes-------shareAppMessage-----");
                    var t = "";
                    n && n.title && (t = n.title);
                    var e = "";
                    n && n.imageUrl && (e = n.imageUrl), this.GetPlatformSDK().share({
                        title: t,
                        desc: t,
                        imageUrl: e,
                        success: function () {}
                    })
                }, r.AddShortcut = function () {
                    this.GetPlatformSDK().installShortcut({
                        success: function () {
                            m.Instance.ShowTips("添加桌面成功", u.UIStartView), i.instance.sendMes(f.CheckShortcut)
                        },
                        fail: function (n) {
                            m.Instance.ShowTips("添加桌面失败", u.UIStartView)
                        }
                    })
                }, r.CheckShortcut = function () {
                    this.GetPlatformSDK().hasShortcutInstalled({
                        success: function (n) {
                            console.log("检查快捷方式", n), i.instance.sendMes(f.CheckShortcut)
                        },
                        fail: function (n) {
                            console.log("检查快捷方式失败", n.errMsg), i.instance.sendMes(f.CheckShortcut)
                        }
                    })
                }, e(o, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this._instance && (this._instance = new o), this._instance
                    }
                }]), o
            }(a))._instance = void 0, g = d)) || g);
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/WeaponBulletControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./WeaponControlBase.ts"], (function (e) {
    "use strict";
    var t, n, r, o, l, i, a, u, p;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, n = e.inheritsLoose, r = e.initializerDefineProperty, o = e.assertThisInitialized
        }, function (e) {
            l = e.cclegacy, i = e._decorator, a = e.CCInteger, u = e.Component
        }, function (e) {
            p = e.WeaponType
        }],
        execute: function () {
            var c, s, y, f, b, C, d;
            l._RF.push({}, "50e89m5xYJA9LNzlshaIQ6N", "WeaponBulletControl", void 0);
            var h = i.ccclass,
                g = i.property;
            e("WeaponBulletControl", (c = h("WeaponBulletControl"), s = g({
                type: p,
                displayName: "子弹类型"
            }), y = g({
                type: a,
                displayName: "子弹数量"
            }), c((C = t((b = function (e) {
                function t() {
                    for (var t, n = arguments.length, l = new Array(n), i = 0; i < n; i++) l[i] = arguments[i];
                    return t = e.call.apply(e, [this].concat(l)) || this, r(t, "bulletType", C, o(t)), r(t, "bulletCount", d, o(t)), t
                }
                n(t, e);
                var l = t.prototype;
                return l.start = function () {}, l.update = function (e) {}, t
            }(u)).prototype, "bulletType", [s], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return p.手枪
                }
            }), d = t(b.prototype, "bulletCount", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 6
                }
            }), f = b)) || f));
            l._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/WeaponControlBase.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./TimeControl.ts"], (function (e) {
    "use strict";
    var t, n, a, i, o, r, l, p, u, c, s, y, f;
    return {
        setters: [function (e) {
            t = e.applyDecoratedDescriptor, n = e.inheritsLoose, a = e.initializerDefineProperty, i = e.assertThisInitialized, o = e.createClass
        }, function (e) {
            r = e.cclegacy, l = e._decorator, p = e.Enum, u = e.CCString, c = e.CCFloat, s = e.CCInteger, y = e.Component
        }, function (e) {
            f = e.TimeControl
        }],
        execute: function () {
            var b, h, m, d, g, C, w, S, T, N, v, D, B, z, W, P, _;
            e({
                PlayerBulletType: void 0,
                WeaponType: void 0
            }), r._RF.push({}, "d683bjQMi1PNJngtVrkF9pL", "WeaponControlBase", void 0);
            var q, A = l.ccclass,
                I = l.property;
            ! function (e) {
                e[e["手枪"] = 0] = "手枪", e[e["霰弹枪"] = 1] = "霰弹枪", e[e["信号枪"] = 2] = "信号枪"
            }(q || (q = e("WeaponType", {})));
            var L, M = e("WeaponPrefabConfig", (function () {}));
            M.prefabNameArr = ["手枪", "霰弹枪", "信号枪"], M.bulletPrefabNameArr = ["qiang1_dan", "qiang3_dan", "qiang2_dan"], M.weaponImgNameArr = ["qiang1", "qiang2", "qiang3"], M.bulletMaxArr = [6, 2, 1],
                function (e) {
                    e[e["空弹夹"] = 0] = "空弹夹", e[e["使用过的子弹"] = 1] = "使用过的子弹", e[e["待发射的子弹"] = 2] = "待发射的子弹"
                }(L || (L = e("PlayerBulletType", {})));
            e("WeaponBulletData", (function () {
                this.bulletType = L.空弹夹
            })), e("WeaponControlBase", (b = A("WeaponControlBase"), h = I({
                type: p(q),
                displayName: "武器类型"
            }), m = I({
                type: u,
                displayName: "武器名字"
            }), d = I({
                type: c,
                displayName: "武器伤害"
            }), g = I({
                type: c,
                displayName: "武器伤害范围（格子数，超出限定格子数，就算没碰到东西也会消失）"
            }), C = I({
                type: s,
                displayName: "武器弹夹"
            }), w = I({
                type: c,
                displayName: "武器连续攻击间隔"
            }), S = I({
                type: c,
                displayName: "子弹的速度"
            }), b((v = t((N = function (e) {
                function t() {
                    for (var t, n = arguments.length, o = new Array(n), r = 0; r < n; r++) o[r] = arguments[r];
                    return t = e.call.apply(e, [this].concat(o)) || this, a(t, "weaponType", v, i(t)), a(t, "weaponName", D, i(t)), a(t, "weaponHurt", B, i(t)), a(t, "bulletShotMaxLen", z, i(t)), a(t, "weaponBulletCount", W, i(t)), a(t, "weaponShotTimeSpace", P, i(t)), a(t, "bulletSpeed", _, i(t)), t.isShotCD = !1, t
                }
                n(t, e);
                var r = t.prototype;
                return r.start = function () {}, r.update = function (e) {}, r.weaponShot = function () {
                    var e = this;
                    this.isShotCD || (this.isShotCD = !0, f.Instance.DelayToDo((function () {
                        e.isShotCD = !1
                    }), this, this.weaponShotTimeSpace))
                }, r.hideWeapon = function () {
                    this.node.active = !1
                }, o(t, [{
                    key: "weaponIsShotCD",
                    get: function () {
                        return this.isShotCD
                    }
                }]), t
            }(y)).prototype, "weaponType", [h], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return q.手枪
                }
            }), D = t(N.prototype, "weaponName", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return "手枪"
                }
            }), B = t(N.prototype, "weaponHurt", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 10
                }
            }), z = t(N.prototype, "bulletShotMaxLen", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 10
                }
            }), W = t(N.prototype, "weaponBulletCount", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 6
                }
            }), P = t(N.prototype, "weaponShotTimeSpace", [w], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 1
                }
            }), _ = t(N.prototype, "bulletSpeed", [S], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                    return 2
                }
            }), T = N)) || T));
            r._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/WindowsSDKControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./LYCSDKEventHelper.ts", "./BaseSDKControl.ts"], (function (n) {
    "use strict";
    var t, e, o, s, i, r, c;
    return {
        setters: [function (n) {
            t = n.inheritsLoose, e = n.createClass
        }, function (n) {
            o = n.cclegacy, s = n._decorator
        }, function (n) {
            i = n.LYCSDKEventHelper, r = n.EventConfig
        }, function (n) {
            c = n.BaseSDKControl
        }],
        execute: function () {
            var a, l;
            o._RF.push({}, "b1461e8CPZM751YGhlo5wk4", "WindowsSDKControl", void 0);
            var u = s.ccclass;
            s.property, n("WindowsSDKControl", u("WindowsSDKControl")(((l = function (n) {
                function o() {
                    for (var t, e = arguments.length, o = new Array(e), s = 0; s < e; s++) o[s] = arguments[s];
                    return (t = n.call.apply(n, [this].concat(o)) || this).UserIndex = 11, t
                }
                t(o, n);
                var s = o.prototype;
                return s.start = function () {}, s.update = function (n) {}, s.GetPlatformSDK = function () {
                    return o.Instance
                }, s.LoginPlatform = function () {
                    this.UserInfoCallBack.thirdId = "o5wDV5dAezjuGR_BhIG9_hLSe09M", i.instance.sendMes(r.LoginSucceed)
                }, s.GetUserInfo = function () {
                    this.UserInfoCallBack.province = "广东", this.UserInfoCallBack.city = "",
                     this.UserInfoCallBack.headIcon = "", this.UserInfoCallBack.nickName = "唔该同我say个hi~", this.UserInfoCallBack.channel = "wx_rpk", i.instance.sendMes(r.GetUserInfo)
                }, s.AddShortcut = function () {}, e(o, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this._instance && (this._instance = new o), this._instance
                    }
                }]), o
            }(c))._instance = void 0, a = l)) || a);
            o._RF.pop()
        }
    }
}));

System.register("chunks:///_virtual/WxSDKControl.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./CommonTipsMgr.ts", "./UIViewMgr.ts", "./LYCSDK.ts", "./LYCSDKEventHelper.ts", "./BaseSDKControl.ts"], (function (e) {
    "use strict";
    var n, t, s, o, r, a, c, i, l, f;
    return {
        setters: [function (e) {
            n = e.inheritsLoose, t = e.createClass
        }, function (e) {
            s = e.cclegacy, o = e._decorator
        }, function (e) {
            r = e.CommonTipsMgr
        }, function (e) {
            a = e.UIViewConfig
        }, function (e) {
            c = e.LYCSDK
        }, function (e) {
            i = e.LYCSDKEventHelper, l = e.EventConfig
        }, function (e) {
            f = e.BaseSDKControl
        }],
        execute: function () {
            var u, I;
            s._RF.push({}, "10dafTI7pxJh7F355c7UeSh", "WxSDKControl", void 0);
            var S = o.ccclass;
            o.property, e("WxSDKControl", S("WxSDKControl")(((I = function (e) {
                function s() {
                    return e.apply(this, arguments) || this
                }
                n(s, e);
                var o = s.prototype;
                return o.GetPlatformSDK = function () {
                    return window.wx
                }, o.LoginPlatform = function () {
                    c.Instance.GameLog("Wx服务器登录成功 data:" + this.UserInfoCallBack.thirdId), c.Instance.GameLog("直接登录服务器"), i.instance.sendMes(l.LoginSucceed)
                }, o.GetUserInfo = function () {
                    var e = this;
                    e.UserInfoCallBack.channel = "wx_rpk", e.GetPlatformSDK().getUserProfile({
                        desc: "用于游戏中排名展示",
                        success: function (n) {
                            c.Instance.GameLog("---BytesSdkController----GetUserInfo1 调用成功" + n.userInfo), c.Instance.GameLog("---BytesSdkController----GetUserInfo2 调用成功" + n.userInfo.avatarUrl), c.Instance.GameLog("---BytesSdkController----GetUserInfo3 调用成功" + n.code + " " + n.anonymousCode), e.UserInfoCallBack.nickName = n.userInfo.nickName, e.UserInfoCallBack.headIcon = n.userInfo.avatarUrl, e.GetPlatformSDK().getLocation({
                                success: function (e) {
                                    i.instance.sendMes(l.GetUserInfo, e)
                                },
                                fail: function (e) {
                                    i.instance.sendMes(l.GetUserInfo, e)
                                }
                            })
                        },
                        fail: function (e) {
                            c.Instance.GameLog("----BytesSdkController--GetUserInfo 调用失败"), i.instance.sendMes(l.GetUserInfo, e)
                        }
                    })
                }, o.ShareGame = function (e) {
                    c.Instance.GameLog("----bytes-------shareAppMessage-----");
                    var n = "";
                    e && e.title && (n = e.title);
                    var t = "";
                    e && e.imageUrl && (t = e.imageUrl), this.GetPlatformSDK().shareAppMessage({
                        title: n,
                        desc: n,
                        imageUrl: t,
                        success: function () {}
                    })
                }, o.AddShortcut = function () {
                    this.GetPlatformSDK().addShortcut({
                        success: function () {
                            r.Instance.ShowTips("添加桌面成功", a.UIStartView), i.instance.sendMes(l.CheckShortcut)
                        },
                        fail: function (e) {
                            r.Instance.ShowTips("添加桌面失败", a.UIStartView)
                        }
                    })
                }, t(s, null, [{
                    key: "Instance",
                    get: function () {
                        return null == this._instance && (this._instance = new s), this._instance
                    }
                }]), s
            }(f))._instance = void 0, u = I)) || u);
            s._RF.pop()
        }
    }
}));