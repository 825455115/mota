/**
 * Created by owjie on 12/30/2017.
 * author:欧文杰
 * QQ:825455115
 * 仅供学习交流，严禁用于商业用途
 */
var Mota = (function () {

    var interval;
    var blockSize = 32;
    var speed = 160;

    function Mota() {
        this.render = new Render(this);
        this.monster = new Monster();
        this.helper = new Helper();
        this.maps = new Maps();
        this.store = new Store();
        this.door = new Door();
        this.actor = new Actor();
        this.msgDlg = new MsgDialog();
        this.callback = '';
        this.records = {
            record1: {},
            record2: {},
            record3: {}
        };
        Keyboard.call(this);
    }

    Mota.prototype = {
        init: function (callback) {
            this.callback = callback;
            this.eventHandlers();
            this.newGame();
        },
        clone: function (obj) {
            var o = obj instanceof Array ? [] : {};
            for (var k in obj) {
                if (k !== 'mota') {
                    o[k] = typeof obj[k] === 'object' ? this.clone(obj[k]) : obj[k];
                }
            }
            return o;
        },
        copyObj: function (obj, obj1) {
            for (var k in obj1) {
                if (k !== 'mota') {
                    obj1[k] = typeof obj1[k] === 'object' ? this.clone(obj[k], obj1[k]) : obj[k];
                }
            }
        },
        save: function (loc) {
            if (this.records["record" + loc] instanceof Object) {
                var record = this.records["record" + loc];
                record["maps"] = this.clone(this.maps);
                record["actors"] = this.clone(this.actor);
            } else {
                return "存档" + loc;
            }
            return "【第" + this.maps.tier + "层】" + " 生命力：" + this.actor.HP + "  攻击力：" + this.actor.ATK;
        },
        load: function (loc) {
            if (this.records["record" + loc] !== undefined && this.records["record" + loc]["maps"] !== undefined) {
                var records = this.records["record" + loc];
                this.copyObj(records["maps"], this.maps);
                this.copyObj(records["actors"], this.actor);
                this.maps.refresh([this.actor.fromX, this.actor.fromY]);
                return true;
            } else {
                return false;
            }
        },
        newGame: function () {
            var self = this;
            this.records = {record1: {}, record2: {}, record3: {}};
            this.helper.init(this);
            this.monster.init(this);
            this.maps.init(this);
            this.store.init(this);
            this.door.init(this);
            this.actor.init(this);
            this.msgDlg.init(this);
            if (interval) {
                window.clearInterval(interval);
            }
            interval = window.setInterval(function () {
                self.helper.run();
                self.monster.run();
                self.store.run();
            }, speed);
        }
    };

    var ImageLoader = function () {
        this.floor = new Image; //地板
        this.floor.src = Resource.adorn.floor.src;
        this.wall = new Image; //墙纸
        this.wall.src = Resource.adorn.wall.src;
        this.scene = new Image; //场景
        this.scene.src = Resource.adorn.scene.src;
        this.door = new Image; //门
        this.door.src = Resource.adorn.door.src;
        this.stairs = new Image; //楼梯
        this.stairs.src = Resource.adorn.stairs.src;
        this.key = new Image; //钥匙
        this.key.src = Resource.prop.key.src;
        this.potion = new Image; //药
        this.potion.src = Resource.prop.potion.src;
        this.gem = new Image; //宝石
        this.gem.src = Resource.prop.gem.src;
        this.store = new Image; //商店
        this.store.src = Resource.prop.store.src;
        this.toolAlways = new Image; //永久性工具
        this.toolAlways.src = Resource.prop.tool_always.src;
        this.toolLimit = new Image; //限制工具
        this.toolLimit.src = Resource.prop.tool_limit.src;
        this.weapon = new Image; //武器
        this.weapon.src = Resource.weapon.src;
        this.actor = new Image;//玩家
        this.actor.src = Resource.figure.actor.skin_0_src;
        this.helper = new Image;//帮手
        this.helper.src = Resource.figure.helper.src;
        this.princess = new Image;//公主
        this.princess.src = Resource.figure.princess.src;
        //怪兽
        this.sLaiTe = new Image; //士莱特
        this.sLaiTe.src = Resource.figure.monster.SLaiTe.src;
        this.ghost = new Image; //骷髅人
        this.ghost.src = Resource.figure.monster.Ghost.src;
        this.bat = new Image; //蝙蝠
        this.bat.src = Resource.figure.monster.Bat.src;
        this.orcish = new Image; //兽人
        this.orcish.src = Resource.figure.monster.Orcish.src;
        this.malphite = new Image; //石头人
        this.malphite.src = Resource.figure.monster.Malphite.src;
        this.specter = new Image; //幽灵
        this.specter.src = Resource.figure.monster.Specter.src;
        this.swordMan = new Image; //双手剑士
        this.swordMan.src = Resource.figure.monster.SwordMan.src;
        this.guard = new Image; //卫兵
        this.guard.src = Resource.figure.monster.Guard.src;
        this.magician = new Image; //法师/巫师
        this.magician.src = Resource.figure.monster.Magician.src;
        this.exorcist = new Image; //大法师
        this.exorcist.src = Resource.figure.monster.Exorcist.src;
        this.knight = new Image; //骑士
        this.knight.src = Resource.figure.monster.Knight.src;
        this.blackKnight = new Image; //黑暗骑士
        this.blackKnight.src = Resource.figure.monster.BlackKnight.src;
        this.warrior = new Image; //战士
        this.warrior.src = Resource.figure.monster.Warrior.src;
        this.magicGuard = new Image; //魔法警卫
        this.magicGuard.src = Resource.figure.monster.MagicGuard.src;
        this.devil = new Image; //魔王
        this.devil.src = Resource.figure.monster.Devil.src;
        this.boss = new Image; //boss
        this.boss.src = Resource.figure.monster.BOSS.src;
        this.bigBoss = new Image;
        this.bigBoss.src = Resource.figure.monster.BOSS.src_big;
    };

    function MsgDialog() {
        this.mota = '';
        this.isshow = 0;
        this.msgbox = "";
    }

    MsgDialog.prototype = {
        init: function (mota) {
            this.mota = mota;
            this.isshow = 0;
            this.msgbox = window.document.getElementsByClassName("mt-msg")[0];
            this.msgbox.style.display = "none";
        },
        show: function (msg, type) {
            this.mota.actor.pause = 1;
            this.msgbox.style.display = "block";
            if (msg !== "") {
                this.mota.render.message.drawLongText(msg, type);
            }
            this.isshow = 1;
        },
        close: function () {
            this.msgbox.style.display = "none";
            var message = this.mota.render.message;
            message.clear(0, 0, message.width, message.height);
            this.isshow = 0;
            this.mota.actor.pause = 0;
        }
    };

    function Maps(mota) {
        this.mota = mota;
        this.tier = 1;
        this.maps = [];
        this.actorStairsTierPos = [];
        this.scenes = [];
        this.floorWallNum = 0;
    }

    Maps.prototype = {
        init: function (mota) {
            this.mota = mota;
            this.maps = [];
            this.scenes = [];
            this.tier = 1;
            this.floorWallNum = 0;
            this.actorStairsTierPos = [
                [[1, 0], [5, 10]], [[0, 9], [0, 1]], [[9, 10], [1, 10]], [[0, 9], [10, 9]], [[0, 1], [1, 10]],
                [[10, 9], [0, 1]], [[0, 1], [10, 9]], [[5, 1], [0, 1]], [[0, 9], [5, 1]], [[5, 1], [0, 9]],
                [[5, 9], [10, 9]], [[1, 10], [9, 10]], [[9, 10], [1, 10]], [[5, 9], [10, 9]], [[5, 1], [5, 9]],
                [[5, 9], [5, 1]], [[5, 1], [4, 10]], [[0, 1], [5, 1]], [[5, 9], [0, 1]], [[5, 1], [5, 9]],
                [[5, 9], [5, 1]], [[5, 6], [5, 9]], [[9, 0], [0, 1]], [[1, 10], [1, 10]], [[1, 10], [1, 10]],
                [[1, 10], [1, 10]], [[9, 10], [1, 10]], [[1, 10], [9, 10]], [[5, 9], [0, 9]], [[5, 1], [5, 9]],
                [[5, 9], [5, 1]], [[9, 0], [5, 10]], [[0, 1], [9, 0]], [[5, 9], [0, 1]], [[9, 0], [5, 9]],
                [[10, 9], [10, 1]], [[0, 1], [10, 9]], [[9, 0], [1, 0]], [[10, 9], [10, 1]], [[5, 1], [9, 10]],
                [[5, 9], [5, 1]], [[0, 1], [4, 10]], [[0, 9], [0, 1]], [[5, 10], [5, 10]], [[9, 0], [1, 0]],
                [[10, 9], [10, 1]], [[0, 1], [9, 10]], [[0, 9], [10, 9]], [[1, 10], [1, 10]], [[5, 4], [5, 6]]
            ];
            this.maps[this.tier] = this.mota.clone(GLOBAL_MAPS["tier" + this.tier]);
            this.mota.render.drawBoard(this.maps[this.tier]);
            var origin = this.actorStairsTierPos[this.tier - 1][1];
            this.refresh(origin)
        },
        floorWall: function () {
            var self = this;
            return {
                add: function () {
                    if (self.tier === 23) {
                        self.floorWallNum++;
                    }
                },
                minus: function () {
                    if (self.tier === 23 && self.floorWallNum > 0) {
                        self.floorWallNum--;
                        if (self.floorWallNum === 0) {
                            self.maps[self.tier][0][10] = Resource.adorn.stairs.up.ID;
                            self.mota.render.drawStairs(10, 0, Resource.adorn.stairs.up)
                        }
                    }
                }
            }
        },
        tierPass: function () {
            var mapsPass = this.mota.clone(GLOBAL_MAPS["tier" + this.tier + "_pass"]);
            var flower = Resource.adorn.door.flower;
            var floor = Resource.adorn.floor.base;
            var stairs = Resource.adorn.stairs.up;
            var actor = Resource.figure.actor;
            var attack = Resource.adorn.floor.attack;
            var yl = mapsPass.length;
            for (var y = 0; y < yl; y++) {
                var xl = mapsPass[y].length;
                for (var x = 0; x < xl; x++) {
                    if (mapsPass[y][x] !== 0) {
                        if (mapsPass[y][x] === flower.ID) {
                            this.maps[this.tier][y][x] = floor.ID;
                        } else if (mapsPass[y][x] === stairs.ID) {
                            this.setStairs(x, y, stairs.ID);
                            continue;
                        } else if (mapsPass[y][x] === actor.ID) {
                            this.mota.actor.fromX = x;
                            this.mota.actor.fromY = y;
                            this.setFloor(x, y);
                            this.mota.render.drawActor(x, y, 0, Resource.figure.actor.direction.bottom.posY);
                            continue;
                        } else if (mapsPass[y][x] === attack.ID) {
                            this.maps[this.tier][y][x] = floor.ID;
                        } else {
                            this.maps[this.tier][y][x] = mapsPass[y][x];
                        }
                        this.mota.render.drawIdToImage(x, y, this.maps[this.tier][y][x]);
                    }
                }
            }
        },
        triggerAttack: function () {
            if (this.tier === 15) {
                this.mota.monster.attack(5, 4);
            } else if (this.tier === 35) {
                this.mota.monster.attack(5, 5);
            }
        },
        triggerTrap: function (x, y) {
            var mapsTrap = this.mota.clone(GLOBAL_MAPS["tier" + this.tier + "_trap"]);
            this.maps[this.tier][y][x] = 0;
            var yl = mapsTrap.length;
            var origin = 0;
            for (var y = 0; y < yl; y++) {
                var xl = mapsTrap[y].length;
                for (var x = 0; x < xl; x++) {
                    if (mapsTrap[y][x] !== 0) {
                        var monster = Resource.figure.monster;
                        var mid = mapsTrap[y][x];
                        switch (mid) {
                            case Resource.figure.actor.ID:
                                origin = [x, y];
                                break;
                            case Resource.adorn.door.flower.ID:
                                this.maps[this.tier][y][x] = mid;
                                break;
                            case monster.Ghost.category[0].ID:
                            case monster.Ghost.category[1].ID:
                            case monster.Ghost.category[2].ID:
                            case monster.Bat.category[1].ID:
                                if (this.maps[this.tier][y][x] !== mid) {
                                    this.maps[this.tier][y][x] = mid;
                                    this.mota.monster.bossGuardNum++;
                                } else {
                                    this.maps[this.tier][y][x] = 0;
                                }
                                break;
                            case monster.Devil.category[0].ID:
                            case monster.Ghost.category[3].ID:
                            case monster.Knight.category[0].ID:
                            case monster.Knight.category[1].ID:
                            case monster.Warrior.category[0].ID:
                            case monster.SwordMan.category[0].ID:
                            case monster.MagicGuard.category[0].ID:
                            case monster.Exorcist.category[0].ID:
                            case monster.Bat.category[3].ID:
                                this.maps[this.tier][y][x] = mid;
                                this.mota.monster.bossGuardNum++;
                                break;
                            case monster.Devil.category[1].ID:
                                this.maps[this.tier][y][x] = mid;
                                break;
                            default :
                                break;
                        }
                    }
                }
            }
            this.refresh(origin);
        },
        removeScenes: function (x, y) {
            for (var index = 0, len = this.scenes.length; index < len; index++) {
                var scene = this.scenes[index];
                if (scene[0] === x && scene[1] === y) {
                    this.scenes.splice(index, 1);
                    this.setFloor(x, y);
                    break;
                }
            }
        },
        clearMagma: function () {
            if (this.tier === 13 || this.tier === 26) {
                var maps = this.maps[this.tier];
                var x = this.mota.actor.fromX;
                var y = this.mota.actor.fromY;
                var direction = Resource.figure.actor.direction;
                switch (this.mota.actor.direction) {
                    case direction.bottom.posY:
                        if (y + 1 <= 10 && maps[y + 1][x] === Resource.adorn.scene.magma.ID) {
                            this.removeScenes(x, y + 1);
                        }
                        break;
                    case direction.top.posY:
                        if (y - 1 >= 0 && maps[y - 1][x] === Resource.adorn.scene.magma.ID) {
                            this.removeScenes(x, y - 1);
                        }
                        break;
                    case direction.left.posY:
                        if (maps[y][x - 1] === Resource.adorn.scene.magma.ID) {
                            this.removeScenes(x - 1, y);
                        }
                        break;
                    case direction.right.posY:
                        if (maps[y][x + 1] === Resource.adorn.scene.magma.ID) {
                            this.removeScenes(x + 1, y);
                        }
                        break;
                    default :
                        break;
                }
            }
        },
        setWall: function (x, y) {
            this.maps[this.tier][y][x] = 1;
            this.mota.render.board.clear(x, y);
            this.mota.render.drawWall(x, y, Resource.adorn.wall.base);
        },
        setFloor: function (x, y) {
            this.maps[this.tier][y][x] = 0;
            this.mota.render.drawFloor(x, y);
        },
        setStairs: function (x, y, id) {
            switch (id) {
                case Resource.adorn.stairs.down.ID:
                    this.maps[this.tier][y][x] = id;
                    this.mota.render.drawStairs(x, y, Resource.adorn.stairs.down);
                    break;
                case Resource.adorn.stairs.up.ID:
                    this.maps[this.tier][y][x] = id;
                    this.mota.render.drawStairs(x, y, Resource.adorn.stairs.up);
                    break;
                default :
                    break;
            }
        },
        previous: function () {
            if (this.tier > 1 && this.mota.monster.bossGuardNum === 0) {
                this.mota.monster.bossGuardNum = 0;
                if (this.tier === 45) {//44层  在异度空间 直接跳过
                    this.tier--;
                }
                this.tier--;
                var origin = this.actorStairsTierPos[this.tier - 1][0];
                this.refresh(origin);
            }
        },
        next: function (isFlying) {
            if (this.tier < 50 && this.mota.monster.bossGuardNum === 0) {
                this.mota.monster.bossGuardNum = 0;
                if (this.tier === 43) {//44层  在异度空间 直接跳过
                    this.tier++;
                }
                var origin = this.actorStairsTierPos[this.tier][1];
                if (isFlying !== 1) {
                    this.tier++;
                    if (this.maps[this.tier] === undefined) {
                        this.maps[this.tier] = GLOBAL_MAPS["tier" + this.tier];
                    }
                } else {
                    if (this.maps[this.tier + 1] === undefined) {
                        return;
                    }
                    this.tier++;
                }
                this.refresh(origin);
            }
        },
        refresh: function (origin) {
            this.mota.monster.collect = [];
            this.mota.helper.collect = [];
            this.scenes = [];
            this.mota.store.store = [];
            this.floorWallNum = 0;
            this.mota.render.drawBoard(this.maps[this.tier]);
            this.mota.actor.fromX = origin[0];
            this.mota.actor.fromY = origin[1];
            this.mota.render.drawActorText().tier();
            this.mota.render.drawActor(origin[0], origin[1], 0, Resource.figure.actor.direction.bottom.posY);
            this.mota.store.reset(this.tier);
            this.mota.monster.run();
            this.mota.helper.run();
        }
    };

    function Store() {
        this.mota = '';
        this.upgrade = ["tier1_10", "tier11_20", "tier11_20", "tier31_40", "tier41_50"];
        this.level = 0;
        this.maxLevel = 0;
        this.prop = '';
        this.HP = 0;
        this.ATK = 0;
        this.DEF = 0;
        this.potion = {};
        this.gem = {};
        this.store = [];
        this.keys = 0;
        this.buyingCount = 0;
        this.buyingPrice = 0;
    }

    Store.prototype = {
        init: function (mota) {
            this.mota = mota;
            this.ATK = 0;
            this.DEF = 0;
            this.potion = {};
            this.gem = {};
            this.store = [];
            this.keys = 0;
            this.prop = Resource.prop;
            this.maxLevel = this.upgrade.length;
            this.level = -1;
            this.buyingCount = 0;
            this.buyingPrice = 20;
            this.reset(this.mota.maps.tier);
        },
        reset: function (tier) {
            var level = Math.floor(tier / 10);
            if (this.level !== level && level < this.maxLevel) {
                this.level = level;
                var params = this.prop[this.upgrade[this.level]];
                this.ATK = params.store.ATK;
                this.DEF = params.store.DEF;
                this.potion = params.potion;
                this.gem = params.gem;
            }
        },
        msgDlg: function () {
            var self = this;
            return {
                open: function () {
                    if (self.mota.msgDlg.isshow === 0) {
                        var HP = 100 + self.buyingCount * 100;
                        //drawText: function (x, y, text, scale, fontSize, fontColor)
                        self.mota.render.message.drawText(0.5, 0.8, "获取以下提升需要消费你" + self.buyingPrice + "金币", 8, 16);
                        self.mota.render.message.drawText(1, 2.0, "按数字“1”键：生命力+" + HP, 8, 15);
                        self.mota.render.message.drawText(1, 2.8, "按数字“2”键：攻击力+" + self.ATK, 8, 15);
                        self.mota.render.message.drawText(1, 3.6, "按数字“3”键：防御力+" + self.DEF, 8, 15);
                        self.mota.render.message.drawText(4.5, 5.2, "按回车键继续游戏", 6, 14);
                        self.mota.msgDlg.show("", 0);
                    }
                },
                minusGold: function (type) {
                    if (self.mota.msgDlg.isshow === 1) {
                        var actor = self.mota.actor;
                        if (self.buyingPrice <= actor.gold) {
                            var HP = 100 + self.buyingCount * 100;
                            if (type === '1') {
                                actor.HP += HP;
                                actor.addHP(2)
                            } else if (type === '2') {
                                actor.ATK += self.ATK;
                                actor.addATK(1)
                            } else if (type === '3') {
                                actor.DEF += self.DEF;
                                actor.addDEF(1)
                            }
                            self.mota.render.message.drawText(1, 2.0, "按数字“1”键：生命力+" + (HP + 100), 8, 15);
                            actor.gold -= self.buyingPrice;
                            self.mota.render.drawActorText().gold();
                            self.buyingCount++;
                            self.buyingPrice = self.buyingPrice + 20 * self.buyingCount;
                            self.mota.render.message.drawText(0.5, 0.8, "获取以下提升需要消费你" + self.buyingPrice + "金币", 8, 16);
                        }
                    }
                },
                close: function () {
                    if (self.mota.msgDlg.isshow === 1) {
                        self.mota.msgDlg.close();
                    }
                }
            }

        },
        run: function () {
            if (this.store.length !== 0 && this.store[2] !== undefined) {
                var sid = this.store[2].ID;
                if (sid === Resource.prop.store.base.ID) {
                    var store = Resource.prop.store.base;
                    store.posX = this.keys;
                    this.mota.render.drawStore(this.store[0], this.store[1], store);
                    this.keys = this.keys++ == 3 ? 0 : this.keys;
                }
            }
        }
    };

    function Helper() {
        this.mota = '';
        this.collect = [];
        this.helpers = {};
        this.helper = {};
        this.images = "";
        this.keys = 0;
    }

    Helper.prototype = {
        init: function (mota) {
            this.mota = mota;
            this.collect = [];
            this.helpers = Resource.figure.helper;
            this.helper = {};
            this.images = this.mota.render.images;
            this.keys = 0;
        }, run: function () {
            var len = this.collect.length;
            for (var index = 0; index < len; index++) {
                var image = '';
                var helper = this.collect[index];
                switch (helper[2].ID) {
                    case this.helpers.seer.ID:
                    case this.helpers.trader.ID:
                    case this.helpers.thief.ID:
                    case this.helpers.elf.ID:
                        image = this.images.helper;
                        break;
                    case Resource.figure.princess.ID:
                        image = this.images.princess;
                        break;
                    default :
                        this.collect.splice(index, 1);
                        len = this.collect.length;
                        continue;
                }
                this.mota.render.drawHelper(image, helper[0], helper[1], this.keys, helper[2].pos);
            }
            this.keys = this.keys++ == 3 ? 0 : this.keys;
        },
        buyingProp: function (prop) {
            var gold = prop.gold;
            var num = prop.num;
            var msg = '';
            if (prop.isBuying === 1 || prop.isBuying === 2) {
                if (this.mota.actor.gold > gold) {
                    this.mota.actor.gold -= gold;
                    this.mota.render.drawActorText().gold();
                    switch (prop.ID) {
                        case Resource.prop.tool_limit.superMaigcMattok.ID:
                            this.mota.render.drawIdToProp(prop.ID);
                            break;
                        case Resource.prop.key.yellow.ID:
                            this.mota.actor.keyYellowNum += num;
                            this.mota.render.drawKeyText().yellow();
                            if (typeof prop.oID === 'number') {
                                if (prop.oID === Resource.prop.key.blue.ID) {
                                    this.mota.actor.keyBlueNum += prop.oNum;
                                    this.mota.render.drawKeyText().blue();
                                } else {
                                    this.mota.actor.keyRedNum += prop.oNum;
                                    this.mota.render.drawKeyText().red();
                                }
                            }
                            break;
                        case Resource.prop.key.blue.ID:
                            this.mota.actor.keyBlueNum += num;
                            this.mota.render.drawKeyText().blue();
                            break;
                        case Resource.prop.key.red.ID:
                            this.mota.actor.keyRedNum += num;
                            this.mota.render.drawKeyText().red();
                            break;
                        default :
                            if (prop.HP instanceof Number) {
                                this.mota.actor.HP += prop.HP;
                                this.mota.render.drawActorText().HP();
                            }
                            break;
                    }
                    return true;
                }
                msg = "抱歉！你没有足够的金币。";
            } else if (prop.isBuying === 3) {
                switch (true) {
                    case typeof prop.tier === 'number':
                        if (this.mota.maps.maps[prop.tier] !== undefined) {
                            this.mota.maps.maps[prop.tier][prop.location[1]][prop.location[0]] = prop.ID;
                            this.mota.maps.maps[prop.tier][prop.location[1]][prop.location[0] + 1] = Resource.figure.helper.thief.ID;
                            return true;
                        } else {
                            msg = "你需要先上" + prop.tier + "层！再找我才可以帮你打开暗道。";
                        }
                        break;
                    case typeof prop.ATK === 'number':
                        this.mota.actor.ATK += Math.ceil(this.mota.actor.ATK *= prop.ATK);
                        this.mota.actor.DEF += Math.ceil(this.mota.actor.DEF *= prop.DEF);
                        this.mota.render.drawActorText().ATK();
                        this.mota.render.drawActorText().DEF();
                        return true;
                    case typeof prop.gold === 'number':
                        this.mota.actor.gold += prop.gold;
                        this.mota.render.drawActorText().gold();
                        return true;
                    default:
                        return true;
                }
            } else {
                switch (prop.ID) {
                    case Resource.prop.key.yellow.ID:
                        if (num < this.mota.actor.keyYellowNum) {
                            this.mota.actor.keyYellowNum -= num;
                            this.mota.actor.gold += gold;
                            this.mota.render.drawActorText().gold();
                            this.mota.render.drawKeyText().yellow();
                            return true;
                        }
                        break;
                    case Resource.prop.key.blue.ID:
                        if (num < this.mota.actor.keyBlueNum) {
                            this.mota.actor.keyBlueNum -= num;
                            this.mota.actor.gold += gold;
                            this.mota.render.drawActorText().gold();
                            this.mota.render.drawKeyText().blue();
                            return true;
                        }
                        break;
                    case Resource.prop.key.red.ID:
                        if (num < this.mota.actor.keyYellowNum) {
                            this.mota.actor.keyRedNum -= num;
                            this.mota.actor.gold += gold;
                            this.mota.render.drawActorText().gold();
                            this.mota.render.drawKeyText().red();
                            return true;
                        }
                        break;
                    default :
                        break;
                }
                msg = "抱歉！你没有足够的钥匙";
            }
            this.helper = {};
            this.mota.msgDlg.show(msg, 0);
            return false;
        },
        msgDlg: function () {
            var self = this;
            return {
                open: function (helperId) {
                    var msg = '';
                    var type = 0;
                    var tier = self.mota.maps.tier;
                    if (self.mota.actor.notepad["tier" + tier] === undefined) {
                        self.mota.actor.notepad["tier" + tier] = {};
                    }
                    switch (helperId) {
                        case Resource.figure.helper.elf.ID:
                            console.log("暂且用不上");
                            break;
                        case Resource.figure.helper.seer.ID:
                            var seer = Resource.notepad["tier" + tier].seer;
                            self.mota.actor.notepad["tier" + tier]['seer'] = Resource.notepad["tier" + tier].seer;
                            self.helper = seer;
                            self.helper["ID"] = Resource.figure.helper.seer.ID;
                            msg = seer.message;
                            type = seer.type;
                            break;
                        case Resource.figure.helper.trader.ID:
                            var trader = Resource.notepad["tier" + tier].trader;
                            self.helper = trader;
                            self.helper["ID"] = Resource.figure.helper.trader.ID;
                            msg = trader.message;
                            type = trader.type;
                            break;
                        case Resource.figure.helper.thief.ID:
                            var thief = Resource.notepad["tier" + tier].thief;
                            self.helper = thief;
                            self.helper["ID"] = Resource.figure.helper.thief.ID;
                            msg = thief.message;
                            type = thief.type;
                            break;
                        default :
                            break;
                    }
                    self.mota.msgDlg.show(msg, type);
                }, close: function (isuse) {
                    if (isuse === 1 || self.helper.type === 0) {
                        if (self.helper.prop instanceof Object) {
                            var prop = self.helper.prop;
                            switch (prop.ID) {
                                case Resource.prop.tool_always.manual.ID:
                                    self.mota.render.drawIdToProp(prop.ID);
                                    break;
                                default :
                                    self.mota.msgDlg.close();
                                    if (self.buyingProp(prop)) {
                                        self.mota.helper.removeHelper(self.helper.ID);
                                    }
                                    return;
                            }
                        }
                        self.mota.helper.removeHelper(self.helper.ID);
                    }
                    self.mota.msgDlg.close();
                }
            }
        },
        removeHelper: function (helperId) {
            var len = this.collect.length;
            for (var index = 0; index < len; index++) {
                var helper = this.collect[index];
                if (helper[2].ID === helperId) {
                    this.collect.splice(index, 1);
                    this.mota.maps.setFloor(helper[0], helper[1]);
                    break;
                }
            }
        }
    };

    function Door() {
        this.mota = '';
    }

    Door.prototype = {
        init: function (mota) {
            this.mota = mota;
        },
        /**
         * @param type 0--黄钥匙  1--蓝钥匙  2--红钥匙
         * @param actor  角色对象
         * @param dX  门的X坐标
         * @param dY  门的Y坐标
         */
        open: function (type, actor, dX, dY) {
            if (this.minusKey(type, actor)) {
                this.mota.maps.setFloor(dX, dY);
            }
        },
        openFlower: function (monsterId, x, y) {
            var maps = this.mota.maps.maps[this.mota.maps.tier];
            var doorId = Resource.adorn.door.flower.ID;
            if (y + 2 <= 10) {
                if (maps[y + 1][x + 1] === doorId && maps[y + 2][x] !== monsterId && maps[y][x + 2] !== monsterId) {
                    this.mota.maps.setFloor(x + 1, y + 1);
                    return;
                }
                if (maps[y + 1][x - 1] === doorId && maps[y + 2][x] !== monsterId && maps[y][x - 2] !== monsterId) {
                    this.mota.maps.setFloor(x - 1, y + 1);
                    return;
                }
            }
            if (y - 2 >= 0) {
                if (maps[y - 1][x + 1] === doorId && maps[y][x + 2] !== monsterId && maps[y - 2][x] !== monsterId) {
                    this.mota.maps.setFloor(x + 1, y - 1);
                    return;
                }
                if (maps[y - 1][x - 1] === doorId && maps[y - 2][x] !== monsterId && maps[y][x - 2] !== monsterId) {
                    this.mota.maps.setFloor(x - 1, y - 1);
                    return;
                }
            }
        },
        minusKey: function (type, actor) {
            var render = this.mota.render.drawKeyText();
            if (type === 0) {
                if (actor.keyYellowNum <= 0) {
                    return false;
                }
                actor.keyYellowNum--;
                render.yellow();
            } else if (type === 1) {
                if (actor.keyBlueNum <= 0) {
                    return false;
                }
                actor.keyBlueNum--;
                render.blue();
            } else if (type === 2) {
                if (actor.keyRedNum <= 0) {
                    return false;
                }
                actor.keyRedNum--;
                render.red();
            }
            return true;
        }
    };

    function Actor() {
        this.level = 0; //等级
        this.keys = 0; //人物移动关键帧
        this.direction = 0; //人物行走的方向
        this.HP = 0; //生命值
        this.ATK = 0; //攻击值
        this.DEF = 0; //防御值
        this.gold = 0; //金币
        this.fromX = 0; //所处的X位置坐标
        this.fromY = 0; //所处的Y位置坐标
        this.keyYellowNum = 0; //黄钥匙
        this.keyBlueNum = 0;  //蓝钥匙
        this.keyRedNum = 0;  //红钥匙
        this.weapon = {}; //武器
        this.pause = 0;
        this.notepad = {};//记事本
        this.prop = {};
    }

    Actor.prototype = {
        init: function (mota) {
            this.pause = 0;
            this.mota = mota;
            this.actor = Resource.figure.actor;
            this.HP = this.actor.HP;
            this.ATK = this.actor.ATK;
            this.DEF = this.actor.DEF;
            this.gold = this.actor.gold;
            this.level = 0; //等级
            this.keyYellowNum = 10; //黄钥匙
            this.keyBlueNum = 10;  //蓝钥匙
            this.keyRedNum = 10;  //红钥匙
            this.weapon = {sword: {}, shield: {}}; //武器
            this.notepad = {};//记事本
            this.prop = {
                manual: {},
                notepad: {},
                luckyCoins: {},
                cross: {},
                flyingWand: {},
                pickax: {},
                superMaigcMattok: {},
                snowCrystal: {},
                magicKey: {},
                bomb: {},
                dragonSlayer: {},
                flying: {
                    up: {},
                    down: {},
                    center: {}
                },
                holyWater: {}
            };

            this.mota.render.drawActorBorder();
            this.mota.render.drawKeyBorder();
            this.mota.render.drawWeaponBorder();
            this.mota.render.drawPropBorder();
            this.keys = 0; //人物移动关键帧
            this.direction = Resource.figure.actor.direction.bottom;
        },
        getAttackCount:function(monster){//攻击次数
            var HP = monster.HP;
            var DEF = monster.DEF;
            var ATK = this.actor.ATK;
            var R = Resource.figure.monster;
            if(this.prop.cross.ID !== undefined){
                switch (monster.ID){
                    case R.Orcish.category[0].ID:
                    case R.Orcish.category[1].ID:
                    case R.Bat.category[2].ID:
                        ATK *= 2;
                    break;
                }
            }
            if(this.prop.dragonSlayer.ID !== undefined && monster.ID === R.BOSS.category[0].ID){
                ATK *= 2;
            }
            return Math.floor(HP / (ATK - DEF));
        },
        /**
         * 加血
         * @param type 0--红药品 1--蓝药水 2--商店
         * @param x X坐标
         * @param y Y坐标
         */
        addHP: function (type, x, y) {
            var store = this.mota.store;
            if (type === 2) {
                this.HP += store.HP;
            } else {
                if (type === 1) {
                    this.HP += store.potion.blue.HP;
                } else {
                    this.HP += store.potion.red.HP;
                }
                this.mota.maps.setFloor(x, y);
            }
            this.mota.render.drawActorText().HP();
        },
        minusHP: function (HP) {
            this.HP -= HP;
            this.mota.render.drawActorText().HP();
        },
        /**
         * 加攻击力
         * @param type 0--红宝石 1--商店  2--武器
         * @param x X坐标
         * @param y Y坐标
         */
        addATK: function (type, x, y) {
            var store = this.mota.store;
            if (type === 1) {
                this.ATK += store.ATK;
            } else {
                if (type === 0) {
                    this.ATK += store.gem.red.ATK;
                } else if (type === 2) {
                    this.ATK += this.weapon.sword.ATK;
                    this.mota.render.drawActorText().sword();
                }
                this.mota.maps.setFloor(x, y);
            }
            this.mota.render.drawActorText().ATK();
        },
        /**
         * 加防御力
         * @param type 0--蓝宝石 1--商店  2--武器
         * @param x X坐标
         * @param y Y坐标
         */
        addDEF: function (type, x, y) {
            var store = this.mota.store;
            if (type === 1) {
                this.DEF += store.DEF;
            } else {
                if (type === 0) {
                    this.DEF += store.gem.blue.DEF;
                } else if (type === 2) {
                    this.DEF += this.weapon.shield.DEF;
                    this.mota.render.drawActorText().shield();
                }
                this.mota.maps.setFloor(x, y);
            }
            this.mota.render.drawActorText().DEF();
        },
        /**
         * @param type 0--黄钥匙  1--蓝钥匙  2--红钥匙
         * @param kX 钥匙的X坐标
         * @param kY 钥匙的Y坐标
         */
        addKey: function (type, kX, kY) {
            var render = this.mota.render.drawKeyText();
            if (type === 0) {
                this.keyYellowNum++;
                render.yellow();
            } else if (type === 1) {
                this.keyBlueNum++;
                render.blue();
            } else if (type === 2) {
                this.keyRedNum++;
                render.red();
            }
            this.mota.maps.setFloor(kX, kY);
        },
        addGold: function (monster) {
            var glod = monster.gold;
            if (this.prop.luckyCoins.ID !== undefined) {
                glod *= 2;
            }
            this.gold += glod;
            this.mota.render.drawActorText().gold();
        },
        move: function (toX, toY, direction) {
            var maps = this.mota.maps;
            var index = maps.maps[maps.tier][toY][toX];
            switch (index) {
                case Resource.adorn.floor.trap.ID:
                    maps.triggerTrap(toX, toY);
                    break;
                case Resource.adorn.floor.attack.ID:
                    maps.triggerAttack();
                    break;
                case Resource.adorn.floor.empty.ID:
                    maps.setWall(toX, toY);
                    maps.floorWall().minus();
                    break;
                case Resource.adorn.floor.wall.ID:
                    maps.setFloor(toX, toY);
                    break;
                case Resource.adorn.door.yellow.ID:
                    this.mota.door.open(0, this, toX, toY);
                    break;
                case Resource.adorn.door.blue.ID:
                    this.mota.door.open(1, this, toX, toY);
                    break;
                case Resource.adorn.door.red.ID:
                    this.mota.door.open(2, this, toX, toY);
                    break;
                case Resource.adorn.wall.ironDoor.ID:
                    maps.setFloor(toX, toY);
                    break;
                case Resource.prop.key.yellow.ID:
                    this.addKey(0, toX, toY);
                    break;
                case Resource.prop.key.blue.ID:
                    this.addKey(1, toX, toY);
                    break;
                case Resource.prop.key.red.ID:
                    this.addKey(2, toX, toY);
                    break;
                case Resource.adorn.stairs.up.ID:
                    maps.next();
                    return;
                case Resource.adorn.stairs.down.ID:
                    maps.previous();
                    return;
                case Resource.prop.potion.red.ID:
                    this.addHP(0, toX, toY);
                    break;
                case Resource.prop.potion.blue.ID:
                    this.addHP(1, toX, toY);
                    break;
                case Resource.prop.gem.red.ID:
                    this.addATK(0, toX, toY);
                    break;
                case Resource.prop.gem.blue.ID:
                    this.addDEF(0, toX, toY);
                    break;
                case Resource.weapon.category[0].sword.ID:
                    this.weapon.sword = Resource.weapon.category[0].sword;
                    this.addATK(2, toX, toY);
                    break;
                case Resource.weapon.category[0].shield.ID:
                    this.weapon.shield = Resource.weapon.category[0].shield;
                    this.addDEF(2, toX, toY);
                    break;
                case Resource.weapon.category[1].sword.ID:
                    this.weapon.sword = Resource.weapon.category[1].sword;
                    this.addATK(2, toX, toY);
                    break;
                case Resource.weapon.category[1].shield.ID:
                    this.weapon.shield = Resource.weapon.category[1].shield;
                    this.addDEF(2, toX, toY);
                    break;
                case Resource.weapon.category[2].sword.ID:
                    this.weapon.sword = Resource.weapon.category[2].sword;
                    this.addATK(2, toX, toY);
                    break;
                case Resource.weapon.category[2].shield.ID:
                    this.weapon.shield = Resource.weapon.category[2].shield;
                    this.addDEF(2, toX, toY);
                    break;
                case Resource.weapon.category[3].sword.ID:
                    this.weapon.sword = Resource.weapon.category[3].sword;
                    this.addATK(2, toX, toY);
                    break;
                case Resource.weapon.category[3].shield.ID:
                    this.weapon.shield = Resource.weapon.category[3].shield;
                    this.addDEF(2, toX, toY);
                    break;
                case Resource.weapon.category[4].sword.ID:
                    this.weapon.sword = Resource.weapon.category[4].sword;
                    this.addATK(2, toX, toY);
                    break;
                case Resource.weapon.category[4].shield.ID:
                    this.weapon.shield = Resource.weapon.category[4].shield;
                    this.addDEF(2, toX, toY);
                    break;
                case Resource.figure.helper.thief.ID:
                case Resource.figure.helper.seer.ID:
                case Resource.figure.helper.trader.ID:
                    this.mota.helper.msgDlg().open(index);
                    break;
                case Resource.prop.store.fragments[0].ID:
                case Resource.prop.store.fragments[1].ID:
                case Resource.prop.store.fragments[2].ID:
                    this.mota.store.msgDlg().open();
                    return;
                case Resource.prop.key.magic.ID:
                case Resource.prop.tool_always.notepad.ID:
                case Resource.prop.tool_always.flyingWand.ID:
                case Resource.prop.tool_limit.snowCrystal.ID:
                case Resource.prop.tool_always.cross.ID:
                case Resource.prop.tool_limit.pickax.ID:
                case Resource.prop.tool_limit.bomb.ID:
                case Resource.prop.tool_limit.holyWater.ID:
                case Resource.prop.tool_limit.flying.center.ID:
                case Resource.prop.tool_limit.flying.up.ID:
                case Resource.prop.tool_limit.flying.down.ID:
                case Resource.prop.tool_always.luckyCoins.ID:
                case Resource.prop.tool_limit.dragonSlayer.ID:
                    maps.setFloor(toX, toY);
                    this.mota.render.drawIdToProp(index);
                    break;
                case Resource.figure.monster.SLaiTe.category[0].ID:
                case Resource.figure.monster.SLaiTe.category[1].ID:
                case Resource.figure.monster.SLaiTe.category[2].ID:
                case Resource.figure.monster.SLaiTe.category[3].ID:
                case Resource.figure.monster.Ghost.category[0].ID:
                case Resource.figure.monster.Ghost.category[1].ID:
                case Resource.figure.monster.Ghost.category[2].ID:
                case Resource.figure.monster.Ghost.category[3].ID:
                case Resource.figure.monster.Bat.category[0].ID:
                case Resource.figure.monster.Bat.category[1].ID:
                case Resource.figure.monster.Bat.category[2].ID:
                case Resource.figure.monster.Bat.category[3].ID:
                case Resource.figure.monster.SwordMan.category[0].ID:
                case Resource.figure.monster.Guard.category[0].ID:
                case Resource.figure.monster.Guard.category[1].ID:
                case Resource.figure.monster.Guard.category[2].ID:
                case Resource.figure.monster.Magician.category[0].ID:
                case Resource.figure.monster.Magician.category[1].ID:
                case Resource.figure.monster.Magician.category[2].ID:
                case Resource.figure.monster.Magician.category[3].ID:
                case Resource.figure.monster.Orcish.category[0].ID:
                case Resource.figure.monster.Orcish.category[1].ID:
                case Resource.figure.monster.Malphite.category[0].ID:
                case Resource.figure.monster.Specter.category[0].ID:
                case Resource.figure.monster.Exorcist.category[0].ID:
                case Resource.figure.monster.Warrior.category[0].ID:
                case Resource.figure.monster.MagicGuard.category[0].ID:
                case Resource.figure.monster.BlackKnight.category[0].ID:
                case Resource.figure.monster.Devil.category[0].ID:
                case Resource.figure.monster.Devil.category[1].ID:
                case Resource.figure.monster.Knight.category[0].ID:
                case Resource.figure.monster.Knight.category[1].ID:
                    this.pause = 1;
                    this.mota.monster.attack(toX, toY);
                    return;
                default:
                    break;
            }
            if (maps.maps[maps.tier][toY][toX] === Resource.adorn.floor.base.ID) {
                if (this.direction === direction) {
                    this.key = this.key++ > 2 ? 0 : this.key;
                } else {
                    this.key = 0;
                }
                this.direction = direction;
                this.mota.render.drawFloor(this.fromX, this.fromY);
                this.fromX = toX;
                this.fromY = toY;
                this.mota.render.drawActor(toX, toY, this.key, direction);
            } else {
                this.direction = direction;
                this.mota.render.drawFloor(this.fromX, this.fromY);
                this.mota.render.drawActor(this.fromX, this.fromY, this.key, direction);
            }
        }, keyPress: function (key) {
            switch (key) {
                case 'top':
                    if (this.fromY > 0) {
                        this.move(this.fromX, this.fromY - 1, this.actor.direction.top.posY);
                    }
                    break;
                case 'right':
                    if (this.fromX < 10) {
                        this.move(this.fromX + 1, this.fromY, this.actor.direction.right.posY);
                    }
                    break;
                case 'down':
                    if (this.fromY < 10) {
                        this.move(this.fromX, this.fromY + 1, this.actor.direction.bottom.posY);
                    }
                    break;
                case 'left':
                    if (this.fromX > 0) {
                        this.move(this.fromX - 1, this.fromY, this.actor.direction.left.posY);
                    }
                    break;
                case 'floor-up':
                    if (this.prop.flyingWand.ID !== undefined) {
                        this.mota.maps.next();//(1);
                    }
                    break;
                case 'floor-down':
                    if (this.prop.flyingWand.ID !== undefined) {
                        this.mota.maps.previous();
                    }
                    break;
                case 'H':
                    if (this.mota.actor.prop.manual.ID !== undefined)
                        this.mota.monster.manual().open();
                    break;
                case 'G':
                    if (this.mota.actor.prop.notepad.ID !== undefined) {

                    }
                    break;
                case 'F':
                    if (this.mota.actor.prop.snowCrystal.ID !== undefined) {
                        this.mota.maps.clearMagma();
                    }
                    break;
                default:
                    break;
            }
        }
    };

    function Monster() {
        this.collect = []; //怪兽盛放的容器
        this.mota = "";
        this.images = "";
        this.keys = 0;
        this.aggressor = {};
        this.attackInterval = "";
        this.speed = 80;
        this.isOpenManual = 0;
        this.monsters = [];
        this.actor = "";
        this.bossGuardNum = 0; //攻打boss的守卫数量
    }

    Monster.prototype = {
        init: function (mota) {
            var self = this;
            this.mota = mota;
            this.collect = []; //怪兽盛放的容器
            this.keys = 0;
            this.aggressor = {};
            this.isOpenManual = 0;
            this.monsters = [];
            this.images = this.mota.render.images;
            this.actor = this.mota.actor;
            if (this.attackInterval) {
                window.clearInterval(this.attackInterval);
            }
            this.attackInterval = window.setInterval(function () {
                self.attackPayer();
            }, this.speed);
            this.zeroAggressor();
        },
        zeroAggressor: function () {
            this.aggressor = {
                attackCount: 0,
                onceBlood: 0,
                monster: 0
            }
        }, manual: function () {
            var self = this;
            return {
                open: function () {
                    if (self.isOpenManual === 0) {
                        var monsters = [];
                        var len = self.collect.length;
                        var posY = 0.6;
                        for (var index = 0; index < len; index++) {
                            var monster = self.collect[index][2];
                            if (monsters["m" + monster.ID] === undefined) {
                                monsters["m" + monster.ID] = monster;
                                self.mota.render.drawManualTextBorder(monster, posY);
                                self.mota.render.drawManualImageBorder(monster.ID, this.keys, monster.pos, 0.5, posY);
                                posY += 1.5;
                            }
                        }
                        if (posY < 10.5) {
                            self.mota.render.manual.drawText(6, 10.5, "按回车键继续游戏", 6, 15);
                        }
                        self.monsters = monsters;
                        self.isOpenManual = 1;
                        self.mota.actor.pause = 1;
                        self.mota.render.manual.board.style.display = "block";
                    }
                },
                close: function () {
                    if (self.isOpenManual === 1) {
                        self.mota.render.manual.board.style.display = "none";
                        self.isOpenManual = 0;
                        self.mota.actor.pause = 0;
                        self.mota.render.manual.clear(0, 0, self.mota.render.manual.width, self.mota.render.manual.height);
                    }
                }
            }
        },
        run: function () {
            var len = this.collect.length;
            for (var index = 0; index < len; index++) {
                var monster = this.collect[index];
                var image = '';
                switch (monster[2].ID) {
                    case Resource.figure.monster.SLaiTe.category[0].ID:
                    case Resource.figure.monster.SLaiTe.category[1].ID:
                    case Resource.figure.monster.SLaiTe.category[2].ID:
                    case Resource.figure.monster.SLaiTe.category[3].ID:
                        image = this.images.sLaiTe;
                        break;
                    case Resource.figure.monster.Ghost.category[0].ID:
                    case Resource.figure.monster.Ghost.category[1].ID:
                    case Resource.figure.monster.Ghost.category[2].ID:
                    case Resource.figure.monster.Ghost.category[3].ID:
                        image = this.images.ghost;
                        break;
                    case Resource.figure.monster.Bat.category[0].ID:
                    case Resource.figure.monster.Bat.category[1].ID:
                    case Resource.figure.monster.Bat.category[2].ID:
                    case Resource.figure.monster.Bat.category[3].ID:
                        image = this.images.bat;
                        break;
                    case Resource.figure.monster.Orcish.category[0].ID:
                    case Resource.figure.monster.Orcish.category[1].ID:
                        image = this.images.orcish;
                        break;
                    case Resource.figure.monster.SwordMan.category[0].ID:
                        image = this.images.swordMan;
                        break;
                    case Resource.figure.monster.Guard.category[0].ID:
                    case Resource.figure.monster.Guard.category[1].ID:
                    case Resource.figure.monster.Guard.category[2].ID:
                        image = this.images.guard;
                        break;
                    case Resource.figure.monster.Magician.category[0].ID:
                    case Resource.figure.monster.Magician.category[1].ID:
                    case Resource.figure.monster.Magician.category[2].ID:
                    case Resource.figure.monster.Magician.category[3].ID:
                        image = this.images.magician;
                        break;
                    case Resource.figure.monster.Malphite.category[0].ID:
                        image = this.images.malphite;
                        break;
                    case Resource.figure.monster.Specter.category[0].ID:
                        image = this.images.specter;
                        break;
                    case Resource.figure.monster.Exorcist.category[0].ID:
                        image = this.images.exorcist;
                        break;
                    case Resource.figure.monster.Knight.category[0].ID:
                    case Resource.figure.monster.Knight.category[1].ID:
                        image = this.images.knight;
                        break;
                    case Resource.figure.monster.BOSS.category[0].ID:
                    case Resource.figure.monster.BOSS.category[1].ID:
                        this.mota.render.drawBigMonster(this.images.bigBoss, monster[0] - 1, monster[1] - 1, this.keys, monster[2].pos);
                        continue;
                    case Resource.figure.monster.Devil.category[0].ID:
                    case Resource.figure.monster.Devil.category[1].ID:
                        image = this.images.devil;
                        break;
                    case Resource.figure.monster.BlackKnight.category[0].ID:
                        image = this.images.blackKnight;
                        break;
                    case Resource.figure.monster.MagicGuard.category[0].ID:
                        image = this.images.magicGuard;
                        break;
                    case Resource.figure.monster.Warrior.category[0].ID:
                        image = this.images.warrior;
                        break;
                    default :
                        this.collect.splice(index, 1);
                        len = this.collect.length;
                        continue;
                }
                this.mota.render.drawMonster(image, monster[0], monster[1], this.keys, monster[2].pos);
            }
            if (this.isOpenManual === 1) {
                var posY = 0.6;
                for (var index in this.monsters) {
                    this.mota.render.drawManualImageBorder(this.monsters[index].ID, this.keys, this.monsters[index].pos, 0.5, posY);
                    posY += 1.5;
                }
            }
            var scenes = this.mota.maps.scenes;
            if (scenes !== undefined && scenes.length > 0) {
                for (var index in scenes) {
                    var scene = scenes[index];
                    scene[2].posX = this.keys;
                    this.mota.render.drawScene(scene[0], scene[1], scene[2]);
                }
            }
            this.keys = this.keys++ == 3 ? 0 : this.keys;
        },
        attack: function (x, y) {
            var len = this.collect.length;
            var maps = this.mota.maps.maps[this.mota.maps.tier];
            var R = Resource.figure.monster;
            for (var index = 0; index < len; index++) {
                var monster = this.collect[index];
                if (monster[0] === x && monster[1] === y) {
                    var monsterId = maps[y][x];
                    switch (true) {
                        case this.mota.maps.tier === 10 && monsterId === R.Ghost.category[2].ID && this.bossGuardNum !== 1:
                        case this.mota.maps.tier === 20 && monsterId === R.Bat.category[3].ID && this.bossGuardNum !== 1:
                        case this.mota.maps.tier === 40 && monsterId === R.Knight.category[0].ID && this.bossGuardNum !== 1:
                        case this.mota.maps.tier === 49 && monsterId === R.Devil.category[0].ID && this.bossGuardNum !== 1:
                            this.mota.msgDlg.show("你必须打败封闭区域内我所有的手下，我才接受你的挑战。", 0);
                            return;
                        default :
                            var ATK = monster[2].ATK;
                            var attackCount = this.actor.getAttackCount(monster[2]); //攻击次数
                            var onceBlood = ATK - this.actor.DEF; //攻击一次扣血
                            onceBlood = onceBlood <= 0 ? 0 : onceBlood;
                            var lossBlood = onceBlood * attackCount; //减去的血量
                            if (attackCount >= 0 && lossBlood < this.actor.HP && onceBlood < this.actor.HP) {
                                this.mota.maps.setFloor(this.actor.fromX, this.actor.fromY);
                                this.actor.fromX = x;
                                this.actor.fromY = y;
                                this.collect.splice(index, 1);
                                this.aggressor.attackCount = attackCount;
                                this.aggressor.onceBlood = onceBlood;
                                this.aggressor.monster = monster[2];
                                return;
                            } else {
                                this.actor.pause = 0;
                            }
                            break;
                    }
                }
            }
        },
        attackPayer: function () {
            if (this.aggressor.attackCount !== 0) {
                this.actor.minusHP(this.aggressor.onceBlood);
                if (this.aggressor.attackCount % 2 == 0) {
                    this.mota.render.drawFloor(this.actor.fromX, this.actor.fromY);
                    this.mota.render.drawActor(this.actor.fromX, this.actor.fromY, 0, Resource.figure.actor.direction.bottom.posY);
                } else {
                    this.mota.render.drawToolAlways(this.actor.fromX, this.actor.fromY, Resource.prop.tool_always.effects);
                }
                this.aggressor.attackCount--;
            } else if (this.aggressor.attackCount === 0 && this.aggressor.monster.ID !== undefined) {
                var maps = this.mota.maps.maps[this.mota.maps.tier];
                var monsterId = maps[this.actor.fromY][this.actor.fromX];
                var x = this.actor.fromX;
                var y = this.actor.fromY;
                var isBoss = false;
                switch (monsterId) {
                    case Resource.figure.monster.Ghost.category[3].ID:
                    case Resource.figure.monster.Warrior.category[0].ID:
                    case Resource.figure.monster.Knight.category[1].ID:
                    case Resource.figure.monster.SwordMan.category[0].ID:
                    case Resource.figure.monster.MagicGuard.category[0].ID:
                        this.mota.door.openFlower(monsterId, x, y);
                    case Resource.figure.monster.Ghost.category[0].ID:
                    case Resource.figure.monster.Ghost.category[1].ID:
                        if (this.bossGuardNum > 1) {
                            this.bossGuardNum--;
                            if (this.mota.maps.tier === 10 && this.bossGuardNum === 1) {
                                this.mota.maps.setFloor(5, 2);
                            }
                        }
                        break;
                    case Resource.figure.monster.Ghost.category[2].ID:
                    case Resource.figure.monster.Bat.category[3].ID:
                    case Resource.figure.monster.BOSS.category[0].ID:
                    case Resource.figure.monster.BOSS.category[1].ID:
                    case Resource.figure.monster.Knight.category[0].ID:
                    case Resource.figure.monster.Exorcist.category[0].ID:
                    case Resource.figure.monster.Devil.category[0].ID:
                        switch (this.mota.maps.tier) {
                            case 10:
                            case 20:
                            case 15:
                            case 25:
                            case 35:
                            case 40:
                            case 49:
                                this.bossGuardNum = 0;
                                isBoss = true;
                                this.mota.maps.tierPass();
                                break;
                            default :
                                break;
                        }
                        break;
                    case Resource.figure.monster.Devil.category[1].ID:
                        this.mota.msgDlg.show(Resource.figure.monster.Devil.category[1].message, 0);
                        break;
                    case Resource.figure.monster.Guard.category[0].ID:
                    case Resource.figure.monster.Guard.category[1].ID:
                    case Resource.figure.monster.Guard.category[2].ID:
                    case Resource.figure.monster.Orcish.category[0].ID:
                    case Resource.figure.monster.Orcish.category[1].ID:
                    case Resource.figure.monster.Magician.category[1].ID:
                    case Resource.figure.monster.Magician.category[3].ID:
                    case Resource.figure.monster.BlackKnight.category[0].ID:
                        this.mota.door.openFlower(monsterId, x, y);
                        break;
                    default :
                        break;
                }
                if (!isBoss) {
                    this.mota.maps.setFloor(x, y);
                    this.mota.render.drawActor(x, y, 0, Resource.figure.actor.direction.bottom.posY);
                }
                this.actor.addGold(this.aggressor.monster);
                this.zeroAggressor();
                this.actor.pause = 0;
            }
        }
    };

    function Render(mota) {
        this.mota = mota;
        this.images = new ImageLoader();
        this.board = new Canvas("board", "352", "352");
        this.manual = new Canvas("manual", "352", "352");
        this.actor = new Canvas("actor", "174", "160");
        this.key = new Canvas("key", "150", "96");
        this.weapon = new Canvas("weapon", "150", "96");
        this.prop = new Canvas("prop", "150", "224");
        this.message = new Canvas("message", "264", "164");
    }

    function Canvas(id, width, height) {
        this.id = id;
        this.board = document.getElementById(this.id);
        this.ctx = this.board.getContext("2d");
        this.width = width;
        this.height = height;
        this.blockSize = blockSize;
        this.setSize();
    }

    Canvas.prototype = {
        setSize: function () {
            this.board.width = this.width;
            this.board.height = this.height;
        },
        clear: function (x, y, w, h) {
            var s = this.blockSize;
            w = w || s;
            h = h || s;
            this.ctx.clearRect(x * s, y * s, w, h);
        },
        drawImage: function (img, sx, sy, dx, dy, scale) {
            var s = this.blockSize;
            var size = s * scale;
            this.ctx.drawImage(img, size * sx, size * sy, size, size, dx * s, dy * s, size, size);
        },
        drawBlockImage: function (img, sx, sy, dx, dy) {
            var s = this.blockSize;
            this.ctx.drawImage(img, s * sx, s * sy, s, s, dx * s, dy * s, s, s);
        },
        drawText: function (x, y, text, scale, fontSize, fontColor) {
            var s = this.blockSize;
            var maxHeight = fontSize != undefined ? s : fontSize + 6;
            fontSize = fontSize || 18;
            fontColor = fontColor || 'white';
            var maxWidth = scale * s || s * 3;
            //var maxWidth = this.ctx.measureText(text).width;
            this.clear(x - 0.8, y - 0.8, maxWidth, maxHeight);
            this.ctx.font = fontSize + "px 雅黑";
            this.ctx.fillStyle = fontColor;
            //this.ctx.textAlign = 'center';
            this.ctx.fillText(text, x * s, y * s - (s - 16) / 2, maxWidth + 0.1);
        },
        drawLongText: function (text, type) {
            var s = this.blockSize;
            this.clear(0, 0, this.width, this.height);
            text = "    " + text;
            if (text.length !== undefined) {
                this.ctx.font = "13px 雅黑";
                this.ctx.fillStyle = 'white';
                var mark = 0;
                var row = 1;
                var lineTextLen = 0;
                for (var index = 0; index < text.length; index++) {
                    if (lineTextLen > this.width) {
                        this.ctx.fillText(text.substr(mark, index - mark), 0, row * s, this.width + 0.1);
                        row += 0.8;
                        mark = index;
                        lineTextLen = this.ctx.measureText(text.substr(index, 1)).width;
                    } else {
                        lineTextLen += this.ctx.measureText(text.substr(index, 1)).width;
                        if (lineTextLen > this.width) {
                            index--;
                        }
                    }
                }
                if (lineTextLen !== 0) {
                    this.ctx.fillText(text.substr(mark, text.length), 0, row * s, this.width + 0.1);
                }
                this.ctx.font = "13px 雅黑";
                if (type === 1) {
                    this.ctx.fillText("按<Y>键确定,按回车键继续游戏", 1.5 * s, 4.8 * s, this.width);
                } else {
                    this.ctx.fillText("按回车键继续游戏", 5 * s, 4.8 * s, this.width);
                }
            }
        }
    };

    Render.prototype = {
        drawActorBorder: function () {
            this.drawActorText().tier();
            this.drawActorText().HP();
            this.drawActorText().ATK();
            this.drawActorText().DEF();
            this.drawActorText().gold();
        },
        drawWeaponBorder: function () {
            this.drawActorText().shield();
            this.drawActorText().sword();
        },
        drawKeyBorder: function () {
            var key = Resource.prop.key;
            this.key.drawBlockImage(this.images.key, key.yellow.posX, key.yellow.posY, 0, 0);
            this.drawKeyText().yellow();
            this.key.drawBlockImage(this.images.key, key.blue.posX, key.blue.posY, 0, 1);
            this.drawKeyText().blue();
            this.key.drawBlockImage(this.images.key, key.red.posX, key.red.posY, 0, 2);
            this.drawKeyText().red();
        },
        drawManualTextBorder: function (monster, posY) {
            var ATK = monster.ATK;
            var attackCount = this.mota.actor.getAttackCount(monster); //攻击次数
            var onceBlood = ATK - this.mota.actor.DEF; //攻击一次扣血
            onceBlood = onceBlood <= 0 ? 0 : onceBlood;
            var lossBlood = onceBlood * attackCount; //减去的血量
            var title = "";
            var fontColor = "";
            if (attackCount >= 0 && lossBlood < this.mota.actor.HP && onceBlood < this.mota.actor.HP) {
                if (lossBlood === 0) {
                    title = "你将不会受到任何伤害";
                    fontColor = "green";
                } else {
                    title = "你将受损" + lossBlood + "生命值，收获" + monster.gold + "金币";
                    fontColor = "#FFAA33";
                }
            } else {
                title = "你无法攻击";
                fontColor = "red";
            }
            var double = this.mota.actor.prop.luckyCoins.ID !== undefined?2:1;
            var intro = "【" + monster.name + "】生命：" + monster.HP + "，攻击：" + monster.ATK + "，防御：" + monster.DEF + "，金币：" + (monster.gold*double);
            this.manual.drawText(1.8, posY + 0.5, title, 8, 14, fontColor);
            this.manual.drawText(1.8, posY + 1.2, intro, 8.5, 14);
        },
        drawManualImageBorder: function (monsterId, sx, sy, dx, dy) {
            var image = '';
            switch (monsterId) {
                case Resource.figure.monster.SLaiTe.category[0].ID:
                case Resource.figure.monster.SLaiTe.category[1].ID:
                case Resource.figure.monster.SLaiTe.category[2].ID:
                case Resource.figure.monster.SLaiTe.category[3].ID:
                    image = this.images.sLaiTe;
                    break;
                case Resource.figure.monster.Ghost.category[0].ID:
                case Resource.figure.monster.Ghost.category[1].ID:
                case Resource.figure.monster.Ghost.category[2].ID:
                case Resource.figure.monster.Ghost.category[3].ID:
                    image = this.images.ghost;
                    break;
                case Resource.figure.monster.Bat.category[0].ID:
                case Resource.figure.monster.Bat.category[1].ID:
                case Resource.figure.monster.Bat.category[2].ID:
                case Resource.figure.monster.Bat.category[3].ID:
                    image = this.images.bat;
                    break;
                case Resource.figure.monster.Orcish.category[0].ID:
                case Resource.figure.monster.Orcish.category[1].ID:
                    image = this.images.orcish;
                    break;
                case Resource.figure.monster.SwordMan.category[0].ID:
                    image = this.images.swordMan;
                    break;
                case Resource.figure.monster.Guard.category[0].ID:
                case Resource.figure.monster.Guard.category[1].ID:
                case Resource.figure.monster.Guard.category[2].ID:
                    image = this.images.guard;
                    break;
                case Resource.figure.monster.Magician.category[0].ID:
                case Resource.figure.monster.Magician.category[1].ID:
                case Resource.figure.monster.Magician.category[2].ID:
                case Resource.figure.monster.Magician.category[3].ID:
                    image = this.images.magician;
                    break;
                case Resource.figure.monster.Malphite.category[0].ID:
                    image = this.images.malphite;
                    break;
                case Resource.figure.monster.Specter.category[0].ID:
                    image = this.images.specter;
                    break;
                case Resource.figure.monster.Exorcist.category[0].ID:
                    image = this.images.exorcist;
                    break;
                case Resource.figure.monster.Knight.category[0].ID:
                case Resource.figure.monster.Knight.category[1].ID:
                    image = this.images.knight;
                    break;
                case Resource.figure.monster.BOSS.category[0].ID:
                case Resource.figure.monster.BOSS.category[1].ID:
                    image = this.images.boss;
                    break;
                case Resource.figure.monster.Warrior.category[0].ID:
                    image = this.images.warrior;
                    break;
                case Resource.figure.monster.BlackKnight.category[0].ID:
                    image = this.images.blackKnight;
                    break;
                case Resource.figure.monster.MagicGuard.category[0].ID:
                    image = this.images.magicGuard;
                    break;
                case Resource.figure.monster.Devil.category[0].ID:
                case Resource.figure.monster.Devil.category[1].ID:
                    image = this.images.devil;
                    break;
                default :
                    return;
            }
            this.manual.clear(dx, dy);
            this.manual.drawBlockImage(image, sx, sy, dx, dy);
        },
        drawPropBorder: function () {
            var prop = this.mota.actor.prop;
            this.prop.drawText(0, 1, "永久道具");
            this.prop.drawText(0, 3, "限次道具");
            this.prop.drawText(0, 6, "自动道具");
            for (var index in prop) {
                if (prop[index].ID !== undefined) {
                    this.drawIdToProp(prop[index].ID);
                } else {
                    if (prop[index] !== prop.flying) {
                        continue;
                    }
                    for (var fi in prop[index]) {
                        if (prop[index][fi].ID !== undefined) {
                            this.drawIdToProp(prop[index][fi].ID);
                        }
                    }
                }
            }
        },
        drawIdToProp: function (id) {
            var always = Resource.prop.tool_always;
            var limit = Resource.prop.tool_limit;
            switch (id) {
                case always.manual.ID:
                    this.mota.actor.prop.manual = always.manual;
                    this.prop.drawBlockImage(this.images.toolAlways, always.manual.posX, always.manual.posY, 0.2, 1);
                    break;
                case always.notepad.ID:
                    this.mota.actor.prop.notepad = always.notepad;
                    this.prop.drawBlockImage(this.images.toolAlways, always.notepad.posX, always.notepad.posY, 1.3, 1);
                    break;
                case always.flyingWand.ID:
                    this.mota.actor.prop.flyingWand = always.flyingWand;
                    this.prop.drawBlockImage(this.images.toolAlways, always.flyingWand.posX, always.flyingWand.posY, 2.4, 1);
                    break;
                case limit.snowCrystal.ID:
                    this.mota.actor.prop.snowCrystal = limit.snowCrystal;
                    this.prop.drawBlockImage(this.images.toolLimit, limit.snowCrystal.posX, limit.snowCrystal.posY, 3.5, 1);
                    break;
                case limit.pickax.ID:
                    this.mota.actor.prop.pickax = limit.pickax;
                    this.prop.drawBlockImage(this.images.toolLimit, limit.pickax.posX, limit.pickax.posY, 0.2, 3);
                    break;
                case limit.superMaigcMattok.ID:
                    this.mota.actor.prop.superMaigcMattok = limit.superMaigcMattok;
                    this.prop.drawBlockImage(this.images.toolLimit, limit.superMaigcMattok.posX, limit.superMaigcMattok.posY, 2.4, 3);
                    break;
                case limit.bomb.ID:
                    this.mota.actor.prop.bomb = limit.bomb;
                    this.prop.drawBlockImage(this.images.toolLimit, limit.bomb.posX, limit.bomb.posY, 3.5, 3);
                    break;
                case limit.holyWater.ID:
                    this.mota.actor.prop.holyWater = limit.holyWater;
                    this.prop.drawBlockImage(this.images.toolLimit, limit.holyWater.posX, limit.holyWater.posY, 1.3, 3);
                    break;
                case Resource.prop.key.magic.ID:
                    this.mota.actor.prop.magicKey = Resource.prop.key.magic;
                    this.prop.drawBlockImage(this.images.key, Resource.prop.key.magic.posX, Resource.prop.key.magic.posY, 0.2, 4.2);
                    break;
                case limit.flying.center.ID:
                    this.mota.actor.prop.holyWater = limit.holyWater;
                    this.prop.drawBlockImage(this.images.toolLimit, limit.flying.center.posX, limit.flying.center.posY, 1.3, 4.2);
                    break;
                case limit.flying.up.ID:
                    this.prop.drawBlockImage(this.images.toolLimit, limit.flying.up.posX, limit.flying.up.posY, 2.4, 4.2);
                    break;
                case limit.flying.down.ID:
                    this.prop.drawBlockImage(this.images.toolLimit, limit.flying.down.posX, limit.flying.down.posY, 3.5, 4.2);
                    break;
                case always.luckyCoins.ID:
                    this.prop.drawBlockImage(this.images.toolAlways, always.luckyCoins.posX, always.luckyCoins.posY, 2.6, 6);
                    break;
                case limit.dragonSlayer.ID:
                    this.prop.drawBlockImage(this.images.toolLimit, limit.dragonSlayer.posX, limit.dragonSlayer.posY, 1.5, 6);
                    break;
                case always.cross.ID:
                    this.mota.actor.prop.cross = always.cross;
                    this.prop.drawBlockImage(this.images.toolAlways, always.cross.posX, always.cross.posY, 0.4, 6);
                    break;
                default :
                    break;
            }
        },
        drawActorText: function () {
            var self = this;
            var actor = this.mota.actor;
            return {
                tier: function () {
                    self.actor.drawText(2, 1, "第 " + self.mota.maps.tier + " 层", 4);
                },
                HP: function () {
                    self.actor.drawText(1, 2, "生命  " + actor.HP, 5);
                },
                ATK: function () {
                    self.actor.drawText(1, 3, "攻击  " + actor.ATK, 5);
                },
                DEF: function () {
                    self.actor.drawText(1, 4, "防御  " + actor.DEF, 5);
                },
                gold: function () {
                    self.actor.drawText(1, 5, "金币  " + actor.gold, 5);
                },
                shield: function () {
                    var shield = actor.weapon.shield;
                    if (shield.ID !== undefined) {
                        self.weapon.clear(1, 1.5, this.blockSize * 5, this.blockSize);
                        self.weapon.drawText(2.3, 2.4, shield.name);
                        self.weapon.drawBlockImage(self.images.weapon, shield.posX, shield.posY, 0.8, 1.5);
                    } else {
                        self.weapon.drawText(1.5, 2.5, "无防具", 4);
                    }
                },
                sword: function () {
                    var sword = actor.weapon.sword;
                    if (sword.ID !== undefined) {
                        self.weapon.clear(1, 0.5, this.blockSize * 5, this.blockSize);
                        self.weapon.drawText(2.3, 1.4, sword.name);
                        self.weapon.drawBlockImage(self.images.weapon, sword.posX, sword.posY, 0.8, 0.5);
                    } else {
                        self.weapon.drawText(1.5, 1.5, "无武器", 4);
                    }
                }

            }
        },
        drawKeyText: function () {
            var self = this;
            var actor = this.mota.actor;
            return {
                yellow: function () {
                    self.key.drawText(2.8, 1, actor.keyYellowNum + " 把");
                },
                blue: function () {
                    self.key.drawText(2.8, 2, actor.keyBlueNum + " 把");
                },
                red: function () {
                    self.key.drawText(2.8, 3, actor.keyRedNum + " 把");
                }
            }
        },
        drawBoard: function (maps) {
            this.board.clear(0, 0, 11 * blockSize, 11 * blockSize);
            for (var y = 0; y < 11; y++) {
                for (var x = 0; x < 11; x++) {
                    this.drawIdToImage(x, y, maps[y][x]);
                }
            }
        },
        drawIdToImage: function (x, y, id) {
            switch (id) {
                case Resource.adorn.wall.base.ID:
                    this.drawWall(x, y, Resource.adorn.wall.base);
                    break;
                case Resource.adorn.floor.empty.ID:
                    this.mota.maps.floorWall().add();
                    this.drawFloor(x, y);
                    break;
                case Resource.adorn.scene.magma.ID:
                    this.mota.maps.scenes.push([x, y, Resource.adorn.scene.magma]);
                    this.drawScene(x, y, Resource.adorn.scene.magma);
                    break;
                case Resource.adorn.scene.star.ID:
                    this.mota.maps.scenes.push([x, y, Resource.adorn.scene.star]);
                    this.drawScene(x, y, Resource.adorn.scene.star);
                    break;
                case Resource.adorn.floor.base.ID:
                    this.drawFloor(x, y);
                    break;
                case Resource.adorn.floor.wall.ID:
                    this.drawFloorWall(x, y);
                    break;
                case Resource.adorn.door.yellow.ID:
                    this.drawDoor(x, y, Resource.adorn.door.yellow);
                    break;
                case Resource.figure.monster.SLaiTe.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.SLaiTe.category[0]]);
                    break;
                case Resource.figure.monster.SLaiTe.category[1].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.SLaiTe.category[1]]);
                    break;
                case Resource.figure.monster.SLaiTe.category[2].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.SLaiTe.category[2]]);
                    break;
                case Resource.figure.monster.SLaiTe.category[3].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.SLaiTe.category[3]]);
                    break;
                case Resource.figure.monster.Ghost.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Ghost.category[0]]);
                    break;
                case Resource.figure.monster.BOSS.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.BOSS.category[0]]);
                    break;
                case Resource.figure.monster.BOSS.category[1].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.BOSS.category[1]]);
                    break;
                case Resource.figure.monster.Ghost.category[1].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Ghost.category[1]]);
                    break;
                case Resource.figure.monster.Ghost.category[2].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Ghost.category[2]]);
                    break;
                case Resource.figure.monster.Ghost.category[3].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Ghost.category[3]]);
                    break;
                case Resource.figure.monster.Bat.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Bat.category[0]]);
                    break;
                case Resource.figure.monster.Bat.category[1].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Bat.category[1]]);
                    break;
                case Resource.figure.monster.Bat.category[2].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Bat.category[2]]);
                    break;
                case Resource.figure.monster.Bat.category[3].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Bat.category[3]]);
                    break;
                case Resource.figure.monster.Orcish.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Orcish.category[0]]);
                    break;
                case Resource.figure.monster.Orcish.category[1].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Orcish.category[1]]);
                    break;
                case Resource.figure.monster.SwordMan.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.SwordMan.category[0]]);
                    break;
                case Resource.figure.monster.Guard.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Guard.category[0]]);
                    break;
                case Resource.figure.monster.Guard.category[1].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Guard.category[1]]);
                    break;
                case Resource.figure.monster.Guard.category[2].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Guard.category[2]]);
                    break;
                case Resource.figure.monster.Magician.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Magician.category[0]]);
                    break;
                case Resource.figure.monster.Magician.category[1].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Magician.category[1]]);
                    break;
                case Resource.figure.monster.Magician.category[2].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Magician.category[2]]);
                    break;
                case Resource.figure.monster.Magician.category[3].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Magician.category[3]]);
                    break;
                case Resource.figure.monster.Malphite.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Malphite.category[0]]);
                    break;
                case Resource.figure.monster.Specter.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Specter.category[0]]);
                    break;
                case Resource.figure.monster.Exorcist.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Exorcist.category[0]]);
                    break;
                case Resource.figure.monster.Knight.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Knight.category[0]]);
                    break;
                case Resource.figure.monster.Knight.category[1].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Knight.category[1]]);
                    break;
                case Resource.figure.monster.Warrior.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Warrior.category[0]]);
                    break;
                case Resource.figure.monster.BlackKnight.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.BlackKnight.category[0]]);
                    break;
                case Resource.figure.monster.MagicGuard.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.MagicGuard.category[0]]);
                    break;
                case Resource.figure.monster.Devil.category[0].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Devil.category[0]]);
                    break;
                case Resource.figure.monster.Devil.category[1].ID:
                    this.drawFloor(x, y);
                    this.mota.monster.collect.push([x, y, Resource.figure.monster.Devil.category[1]]);
                    break;
                case Resource.figure.helper.seer.ID:
                    this.drawFloor(x, y);
                    this.mota.helper.collect.push([x, y, Resource.figure.helper.seer]);
                    break;
                case Resource.figure.helper.trader.ID:
                    this.drawFloor(x, y);
                    this.mota.helper.collect.push([x, y, Resource.figure.helper.trader]);
                    break;
                case Resource.figure.helper.thief.ID:
                    this.drawFloor(x, y);
                    this.mota.helper.collect.push([x, y, Resource.figure.helper.thief]);
                    break;
                case Resource.figure.helper.elf.ID:
                    this.drawFloor(x, y);
                    this.mota.helper.collect.push([x, y, Resource.figure.helper.elf]);
                    break;
                case Resource.figure.princess.ID:
                    this.drawFloor(x, y);
                    this.mota.helper.collect.push([x, y, Resource.figure.princess]);
                    break;
                case Resource.adorn.door.blue.ID:
                    this.drawDoor(x, y, Resource.adorn.door.blue);
                    break;
                case Resource.adorn.door.red.ID:
                    this.drawDoor(x, y, Resource.adorn.door.red);
                    break;
                case Resource.adorn.door.flower.ID:
                    this.drawDoor(x, y, Resource.adorn.door.flower);
                    break;
                case Resource.adorn.wall.ironDoor.ID:
                    this.drawWall(x, y, Resource.adorn.wall.ironDoor);
                    break;
                case Resource.adorn.stairs.down.ID:
                    this.drawStairs(x, y, Resource.adorn.stairs.down);
                    break;
                case Resource.adorn.stairs.up.ID:
                    this.drawStairs(x, y, Resource.adorn.stairs.up);
                    break;
                case Resource.prop.key.yellow.ID:
                    this.drawKey(x, y, Resource.prop.key.yellow);
                    break;
                case Resource.prop.key.blue.ID:
                    this.drawKey(x, y, Resource.prop.key.blue);
                    break;
                case Resource.prop.key.red.ID:
                    this.drawKey(x, y, Resource.prop.key.red);
                    break;
                case Resource.prop.key.magic.ID:
                    this.drawKey(x, y, Resource.prop.key.magic);
                    break;
                case Resource.prop.potion.red.ID:
                    this.drawPotion(x, y, Resource.prop.potion.red);
                    break;
                case Resource.prop.potion.blue.ID:
                    this.drawPotion(x, y, Resource.prop.potion.blue);
                    break;
                case Resource.prop.gem.red.ID:
                    this.drawGem(x, y, Resource.prop.gem.red);
                    break;
                case Resource.prop.gem.blue.ID:
                    this.drawGem(x, y, Resource.prop.gem.blue);
                    break;
                case Resource.prop.store.fragments[0].ID:
                    this.drawStore(x, y, Resource.prop.store.fragments[0]);
                    break;
                case Resource.prop.store.fragments[1].ID:
                    this.mota.store.store = [x, y, Resource.prop.store.fragments[1]];
                    this.drawStore(x, y, Resource.prop.store.fragments[1]);
                    break;
                case Resource.prop.store.fragments[2].ID:
                    this.drawStore(x, y, Resource.prop.store.fragments[2]);
                    break;
                case Resource.prop.tool_always.manual.ID:
                    this.drawToolAlways(x, y, Resource.prop.tool_always.manual);
                    break;
                case Resource.prop.tool_always.notepad.ID:
                    this.drawToolAlways(x, y, Resource.prop.tool_always.notepad);
                    break;
                case Resource.prop.tool_always.luckyCoins.ID:
                    this.drawToolAlways(x, y, Resource.prop.tool_always.luckyCoins);
                    break;
                case Resource.prop.tool_always.cross.ID:
                    this.drawToolAlways(x, y, Resource.prop.tool_always.cross);
                    break;
                case Resource.prop.tool_always.flyingWand.ID:
                    this.drawToolAlways(x, y, Resource.prop.tool_always.flyingWand);
                    break;
                case Resource.prop.tool_limit.pickax.ID:
                    this.drawToolLimit(x, y, Resource.prop.tool_limit.pickax);
                    break;
                case Resource.prop.tool_limit.superMaigcMattok.ID:
                    this.drawToolLimit(x, y, Resource.prop.tool_limit.superMaigcMattok);
                    break;
                case Resource.prop.tool_limit.snowCrystal.ID:
                    this.drawToolLimit(x, y, Resource.prop.tool_limit.snowCrystal);
                    break;
                case Resource.prop.tool_limit.bomb.ID:
                    this.drawToolLimit(x, y, Resource.prop.tool_limit.bomb);
                    break;
                case Resource.prop.tool_limit.flying.center.ID:
                    this.drawToolLimit(x, y, Resource.prop.tool_limit.flying.center);
                    break;
                case Resource.prop.tool_limit.flying.up.ID:
                    this.drawToolLimit(x, y, Resource.prop.tool_limit.flying.up);
                    break;
                case Resource.prop.tool_limit.flying.down.ID:
                    this.drawToolLimit(x, y, Resource.prop.tool_limit.flying.down);
                    break;
                case Resource.prop.tool_limit.dragonSlayer.ID:
                    this.drawToolLimit(x, y, Resource.prop.tool_limit.dragonSlayer);
                    break;
                case Resource.prop.tool_limit.holyWater.ID:
                    this.drawToolLimit(x, y, Resource.prop.tool_limit.holyWater);
                    break;
                case Resource.weapon.category[0].sword.ID:
                    this.drawWeapon(x, y, Resource.weapon.category[0].sword);
                    break;
                case Resource.weapon.category[0].shield.ID:
                    this.drawWeapon(x, y, Resource.weapon.category[0].shield);
                    break;
                case Resource.weapon.category[1].sword.ID:
                    this.drawWeapon(x, y, Resource.weapon.category[1].sword);
                    break;
                case Resource.weapon.category[1].shield.ID:
                    this.drawWeapon(x, y, Resource.weapon.category[1].shield);
                    break;
                case Resource.weapon.category[2].sword.ID:
                    this.drawWeapon(x, y, Resource.weapon.category[2].sword);
                    break;
                case Resource.weapon.category[2].shield.ID:
                    this.drawWeapon(x, y, Resource.weapon.category[2].shield);
                    break;
                case Resource.weapon.category[3].sword.ID:
                    this.drawWeapon(x, y, Resource.weapon.category[3].sword);
                    break;
                case Resource.weapon.category[3].shield.ID:
                    this.drawWeapon(x, y, Resource.weapon.category[3].shield);
                    break;
                case Resource.weapon.category[4].sword.ID:
                    this.drawWeapon(x, y, Resource.weapon.category[4].sword);
                    break;
                case Resource.weapon.category[4].shield.ID:
                    this.drawWeapon(x, y, Resource.weapon.category[4].shield);
                    break;
                default:
                    this.drawFloor(x, y);
                    break;
            }
        },
        drawFloor: function (x, y) {
            var posX = Resource.adorn.floor.base.pos;
            this.board.drawBlockImage(this.images.floor, posX, 0, x, y);
        },
        drawFloorWall: function (x, y) {
            var posX = Resource.adorn.floor.wall.pos;
            this.board.drawBlockImage(this.images.floor, posX, 0, x, y);
        },
        drawWall: function (x, y, wall) {
            if (wall.ID !== 1) {
                this.drawFloor(x, y);
            }
            this.board.drawBlockImage(this.images.wall, wall.pos, 0, x, y);
        },
        drawScene: function (x, y, scene) {
            this.board.clear(x, y);
            this.board.drawBlockImage(this.images.scene, scene.posX, scene.posY, x, y);
        },
        drawWeapon: function (x, y, weapon) {
            this.drawFloor(x, y);
            this.board.drawBlockImage(this.images.weapon, weapon.posX, weapon.posY, x, y);
        }, drawToolAlways: function (x, y, toolAlways) {
            this.drawFloor(x, y);
            this.board.drawBlockImage(this.images.toolAlways, toolAlways.posX, toolAlways.posY, x, y);
        }, drawToolLimit: function (x, y, toolLimit) {
            this.drawFloor(x, y);
            this.board.drawBlockImage(this.images.toolLimit, toolLimit.posX, toolLimit.posY, x, y);
        }, drawStore: function (x, y, stores) {
            this.drawFloor(x, y);
            this.board.drawBlockImage(this.images.store, stores.posX, stores.posY, x, y);
        }, drawDoor: function (x, y, door) {
            this.drawFloor(x, y);
            this.board.drawBlockImage(this.images.door, door.pos, 0, x, y);
        }, drawKey: function (x, y, key) {
            this.drawFloor(x, y);
            this.board.drawBlockImage(this.images.key, key.posX, key.posY, x, y);
        }, drawGem: function (x, y, gem) {
            this.drawFloor(x, y);
            this.board.drawBlockImage(this.images.gem, gem.pos, 0, x, y);
        }, drawPotion: function (x, y, potion) {
            this.drawFloor(x, y);
            this.board.drawBlockImage(this.images.potion, potion.pos, 0, x, y);
        }, drawStairs: function (x, y, stairs) {
            this.drawFloor(x, y);
            this.board.drawBlockImage(this.images.stairs, stairs.pos, 0, x, y);
        }, drawActor: function (x, y, posX, posY) {
            //this.drawFloor(x, y);
            this.board.drawBlockImage(this.images.actor, posX, posY * 1.03, x, y);
        }, drawHelper: function (image, x, y, posX, posY) {
            this.board.clear(x, y);
            this.drawFloor(x, y);
            this.board.drawBlockImage(image, posX, posY, x, y);
        }, drawMonster: function (img, x, y, posX, posY) {
            this.board.clear(x, y);
            this.drawFloor(x, y);
            this.board.drawBlockImage(img, posX, posY, x, y);
        }, drawBigMonster: function (img, cX, cY, posX, posY) {
            var scale = 3;
            var s = this.board.blockSize;
            var size = s * scale;
            this.board.clear(cX, cY, size, size);
            this.drawFloor(cX, cY);
            this.drawFloor(cX, cY + 1);
            this.drawFloor(cX, cY + 2);
            this.drawFloor(cX + 1, cY);
            this.drawFloor(cX + 1, cY + 2);
            this.drawFloor(cX + 2, cY);
            this.drawFloor(cX + 2, cY + 1);
            this.drawFloor(cX + 2, cY + 2);
            this.board.drawImage(img, posX, posY, cX, cY, scale);
        }
    };


    function Keyboard() {
        var self = this;
        var keys = {
            13: 'enter', //弹窗关闭
            33: 'floor-up',//飞行魔杖 上
            34: 'floor-down', //飞行魔杖 下
            38: 'top', //人物移动上
            39: 'right', //人物移动右
            40: 'down', //人物移动下
            37: 'left', //人物移动左
            70: 'F', //冰冻魔法
            71: 'G',
            72: 'H',//怪物手册
            89: 'Y',//弹窗关闭并购买
            49: '1',//商店购买血液
            97: '1',//商店购买血液
            50: '2',//商店购买攻击力
            98: '2',//商店购买攻击力
            51: '3',//商店购买防御力
            99: '3',//商店购买防御力
            83: 'S',//游戏存档
            76: 'L',//游戏独挡
            82: 'R'//重新开始
        };
        this.eventHandlers = function () {
            document.addEventListener('keydown', this.keyPressEvent, true);
        };
        this.keyPressEvent = function (event) {
            console.log(event.keyCode);
            if (keys[event.keyCode])
                self.keyPress(keys[event.keyCode]);
        };
        this.keyPress = function (key) {
            if (key === 'enter') {
                self.helper.msgDlg().close();
                self.monster.manual().close();
                self.callback.recordBox.close();
            } else if (key === 'Y') {
                self.helper.msgDlg().close(1);
            } else if (key === '1' || key === '2' || key === '3') {
                self.store.msgDlg().minusGold(key);
            }
            if (self.actor.pause === 0) {
                self.actor.keyPress(key);
                switch (key) {
                    case 'S':
                        self.callback.recordBox.open("游戏进度保存", 1);
                        break;
                    case 'L':
                        self.callback.recordBox.open("游戏进度读取", 2);
                        break;
                    case 'R':
                        self.newGame();
                        break;
                    default :
                        break;
                }
            }
        };
    }

    return new Mota();
})();
