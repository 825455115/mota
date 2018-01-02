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
        this.maps = new Maps();
        this.store = new Store();
        this.door = new Door();
        this.actor = new Actor();
        Keyboard.call(this);
    }

    Mota.prototype = {
        init: function () {
            this.eventHandlers();
            this.newGame();
        },
        previous: function () {
            this.maps.previous();
        },
        next: function () {
            this.maps.next();
        },
        newGame: function () {
            var self = this;
            this.maps.tier = 1;
            this.monster.init(this);
            this.maps.init(this);
            this.store.init(this.maps.tier);
            this.door.init(this);
            this.actor.init(this);
            if (interval) {
                window.clearInterval(interval);
            }
            interval = window.setInterval(function () {
                self.monster.run();
            }, speed);
        }
    };

    var ImageView = function () {
        this.floor = new Image; //地板
        this.floor.src = Resource.adorn.floor.src;
        this.wall = new Image; //墙纸
        this.wall.src = Resource.adorn.wall.src;
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
    };

    function Maps(mota) {
        this.mota = mota;
        this.tier = 1;
        this.maps = [];
        this.actorStairsTierPos = [];
    }

    Maps.prototype = {
        init: function (mota) {
            this.mota = mota;
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
            this.maps[this.tier] = map["tier" + this.tier];
            this.mota.render.drawBoard(this.maps[this.tier]);
            var origin = this.actorStairsTierPos[this.tier - 1][1];
            this.refresh(origin)
        },
        previous: function () {
            if (this.tier > 0) {
                this.tier--;
                var origin = this.actorStairsTierPos[this.tier - 1][0];
                this.refresh(origin);
            }
        },
        setFloor: function (x, y) {
            this.maps[this.tier][y][x] = 0;
            this.mota.render.drawFloor(x, y);
        },
        next: function () {
            if (this.tier < 50) {
                var origin = this.actorStairsTierPos[this.tier][1];
                this.tier++;
                if (this.maps[this.tier] === undefined) {
                    this.maps[this.tier] = map["tier" + this.tier];
                }
                this.refresh(origin);
            }
        },
        refresh: function (origin) {
            this.mota.monster.collect = [];
            this.mota.render.drawBoard(this.maps[this.tier]);
            this.mota.actor.fromX = origin[0];
            this.mota.actor.fromY = origin[1];
            this.mota.render.drawActorText().tier();
            this.mota.render.drawActor(origin[0], origin[1], 0, Resource.figure.actor.direction.bottom.posY);
            this.mota.store.reset(this.tier);
            this.mota.monster.run();
        }
    };

    function Store() {//layer41_50 layer31_40 layer11_20 layer1_10
        this.upgrade = ["tier1_10", "tier11_20", "tier11_20", "tier31_40", "tier41_50"];
        this.level = 0;
        this.maxLevel = 0;
        this.prop = '';
        this.HP = 0;
        this.ATK = 0;
        this.DEF = 0;
        this.potion = {};
        this.gem = {};
    }

    Store.prototype = {
        init: function (tier) {
            this.prop = Resource.prop;
            this.maxLevel = this.upgrade.length;
            this.level = -1;
            this.reset(tier);
        },
        reset: function (tier) {
            var level = Math.floor(tier / 10);
            if (this.level !== level && level < this.maxLevel) {
                this.level = level;
                var params = this.prop[this.upgrade[this.level]];
                this.HP = params.store.HP;
                this.ATK = params.store.ATK;
                this.DEF = params.store.DEF;
                this.potion = params.potion;
                this.gem = params.gem;
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
        this.weapon = {sword: {}, shield: {}}; //武器
    }

    Actor.prototype = {
        init: function (mota) {
            this.isAttack = 0; //0--没有攻击  1--正在攻击
            this.mota = mota;
            this.actor = Resource.figure.actor;
            this.HP = this.actor.HP;
            this.ATK = this.actor.ATK;
            this.DEF = this.actor.DEF;
            this.gold = this.actor.gold;
            this.mota.render.drawActorBorder();
            this.mota.render.drawWeaponBorder();
            this.mota.render.drawKeyBorder();
            this.keys = 0; //人物移动关键帧
            this.direction = Resource.figure.actor.direction.bottom;
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
            this.gold += monster.gold;
            this.mota.render.drawActorText().gold();
        },
        move: function (toX, toY, direction) {
            var maps = this.mota.maps;
            switch (maps.maps[maps.tier][toY][toX]) {
                case Resource.adorn.door.yellow.id:
                    this.mota.door.open(0, this, toX, toY);
                    break;
                case Resource.adorn.door.blue.id:
                    this.mota.door.open(1, this, toX, toY);
                    break;
                case Resource.adorn.door.red.id:
                    this.mota.door.open(2, this, toX, toY);
                    break;
                case Resource.prop.key.yellow.id:
                    this.addKey(0, toX, toY);
                    break;
                case Resource.prop.key.blue.id:
                    this.addKey(1, toX, toY);
                    break;
                case Resource.prop.key.red.id:
                    this.addKey(2, toX, toY);
                    break;
                case Resource.adorn.stairs.up.id:
                    maps.next();
                    return;
                case Resource.adorn.stairs.down.id:
                    maps.previous();
                    return;
                case Resource.prop.potion.red.id:
                    this.addHP(0, toX, toY);
                    break;
                case Resource.prop.potion.blue.id:
                    this.addHP(1, toX, toY);
                    break;
                case Resource.prop.gem.red.id:
                    this.addATK(0, toX, toY);
                    break;
                case Resource.prop.gem.blue.id:
                    this.addDEF(0, toX, toY);
                    break;
                case Resource.weapon.category[0].sword.id:
                    this.weapon.sword = Resource.weapon.category[0].sword;
                    this.addATK(2, toX, toY);
                    break;
                case Resource.weapon.category[0].shield.id:
                    this.weapon.shield = Resource.weapon.category[0].shield;
                    this.addDEF(2, toX, toY);
                    break;
                case Resource.weapon.category[1].sword.id:
                    this.weapon.sword = Resource.weapon.category[1].sword;
                    this.addATK(2, toX, toY);
                    break;
                case Resource.weapon.category[1].shield.id:
                    this.weapon.shield = Resource.weapon.category[1].shield;
                    this.addDEF(2, toX, toY);
                    break;
                case Resource.weapon.category[2].sword.id:
                    this.weapon.sword = Resource.weapon.category[2].sword;
                    this.addATK(2, toX, toY);
                    break;
                case Resource.weapon.category[2].shield.id:
                    this.monster.shield = Resource.weapon.category[2].shield;
                    this.addDEF(2, toX, toY);
                    break;
                case Resource.weapon.category[3].sword.id:
                    this.weapon.sword = Resource.weapon.category[3].sword;
                    this.addATK(2, toX, toY);
                    break;
                case Resource.weapon.category[3].shield.id:
                    this.weapon.shield = Resource.weapon.category[3].shield;
                    this.addDEF(2, toX, toY);
                    break;
                case Resource.weapon.category[4].sword.id:
                    this.weapon.sword = Resource.weapon.category[4].sword;
                    this.addATK(2, toX, toY);
                    break;
                case Resource.weapon.category[4].shield.id:
                    this.weapon.shield = Resource.weapon.category[4].shield;
                    this.addDEF(2, toX, toY);
                    break;
                case Resource.prop.store.id:
                    console.log("老板你想要什么");
                    return;
                case Resource.figure.monster.SLaiTe.category[0].id:
                case Resource.figure.monster.SLaiTe.category[1].id:
                case Resource.figure.monster.SLaiTe.category[2].id:
                case Resource.figure.monster.SLaiTe.category[3].id:
                case Resource.figure.monster.Ghost.category[0].id:
                case Resource.figure.monster.Ghost.category[1].id:
                case Resource.figure.monster.Ghost.category[2].id:
                case Resource.figure.monster.Ghost.category[3].id:
                case Resource.figure.monster.Bat.category[0].id:
                case Resource.figure.monster.Bat.category[1].id:
                case Resource.figure.monster.Bat.category[2].id:
                case Resource.figure.monster.Bat.category[3].id:
                case Resource.figure.monster.SwordMan.category[0].id:
                case Resource.figure.monster.Guard.category[0].id:
                case Resource.figure.monster.Guard.category[1].id:
                case Resource.figure.monster.Guard.category[2].id:
                case Resource.figure.monster.Magician.category[0].id:
                case Resource.figure.monster.Magician.category[1].id:
                case Resource.figure.monster.Magician.category[2].id:
                case Resource.figure.monster.Magician.category[3].id:
                case Resource.figure.monster.Orcish.category[0].id:
                case Resource.figure.monster.Orcish.category[1].id:
                case Resource.figure.monster.Malphite.category[0].id:
                case Resource.figure.monster.Specter.category[0].id:
                case Resource.figure.monster.Exorcist.category[0].id:
                case Resource.figure.monster.Warrior.category[0].id:
                case Resource.figure.monster.MagicGuard.category[0].id:
                case Resource.figure.monster.BlackKnight.category[0].id:
                case Resource.figure.monster.Devil.category[0].id:
                case Resource.figure.monster.Devil.category[1].id:
                    this.isAttack = 1;
                    this.mota.monster.attack(toX, toY);
                    return;
                default:
                    break;
            }
            if (maps.maps[maps.tier][toY][toX] === Resource.adorn.floor.base.id) {
                if (this.direction === direction) {
                    this.key = this.key++ > 2 ? 0 : this.key;
                } else {
                    this.direction = direction;
                    this.key = 0;
                }
                this.mota.render.drawFloor(this.fromX, this.fromY);
                this.fromX = toX;
                this.fromY = toY;
                this.mota.render.drawActor(toX, toY, this.key, direction);
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
    }

    Monster.prototype = {
        zeroAggressor: function () {
            this.aggressor = {
                attackCount: 0,
                onceBlood: 0,
                monster: 0
            }
        },
        init: function (mota) {
            var self = this;
            this.mota = mota;
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
        run: function () {
            var len = this.collect.length;
            flag:
                for (var index = 0; index < len; index++) {
                    var monster = this.collect[index];
                    var image = '';
                    switch (monster[2].id) {
                        case Resource.figure.monster.SLaiTe.category[0].id:
                        case Resource.figure.monster.SLaiTe.category[1].id:
                        case Resource.figure.monster.SLaiTe.category[2].id:
                        case Resource.figure.monster.SLaiTe.category[3].id:
                            image = this.images.sLaiTe;
                            break;
                        case Resource.figure.monster.Ghost.category[0].id:
                        case Resource.figure.monster.Ghost.category[1].id:
                        case Resource.figure.monster.Ghost.category[2].id:
                        case Resource.figure.monster.Ghost.category[3].id:
                            image = this.images.ghost;
                            break;
                        case Resource.figure.monster.Bat.category[0].id:
                        case Resource.figure.monster.Bat.category[1].id:
                        case Resource.figure.monster.Bat.category[2].id:
                        case Resource.figure.monster.Bat.category[3].id:
                            image = this.images.bat;
                            break;
                        case Resource.figure.monster.Orcish.category[0].id:
                        case Resource.figure.monster.Orcish.category[1].id:
                            image = this.images.orcish;
                            break;
                        case Resource.figure.monster.SwordMan.category[0].id:
                            image = this.images.swordMan;
                            break;
                        case Resource.figure.monster.Guard.category[0].id:
                        case Resource.figure.monster.Guard.category[1].id:
                        case Resource.figure.monster.Guard.category[2].id:
                            image = this.images.guard;
                            break;
                        case Resource.figure.monster.Magician.category[0].id:
                        case Resource.figure.monster.Magician.category[1].id:
                        case Resource.figure.monster.Magician.category[2].id:
                        case Resource.figure.monster.Magician.category[3].id:
                            image = this.images.magician;
                            break;
                        case Resource.figure.monster.Malphite.category[0].id:
                            image = this.images.malphite;
                            break;
                        case Resource.figure.monster.Specter.category[0].id:
                            image = this.images.specter;
                            break;
                        case Resource.figure.monster.Exorcist.category[0].id:
                            image = this.images.exorcist;
                            break;
                        case Resource.figure.monster.Knight.category[0].id:
                        case Resource.figure.monster.Knight.category[1].id:
                            image = this.images.knight;
                            break;
                        case Resource.figure.monster.Devil.category[0].id:
                        case Resource.figure.monster.Devil.category[1].id:
                            image = this.images.devil;
                            break;
                        case Resource.figure.monster.BlackKnight.category[0].id:
                            image = this.images.blackKnight;
                            break;
                        case Resource.figure.monster.MagicGuard.category[0].id:
                            image = this.images.magicGuard;
                            break;
                        case Resource.figure.monster.Warrior.category[0].id:
                            image = this.images.warrior;
                            break;
                        default :
                            continue flag;
                    }
                    this.mota.render.drawMonster(image, monster[0], monster[1], this.keys, monster[2].pos);
                }
            this.keys = this.keys++ == 3 ? 0 : this.keys;
        },
        attack: function (x, y) {
            var len = this.collect.length;
            for (var index = 0; index < len; index++) {
                var monster = this.collect[index];
                if (monster[0] === x && monster[1] === y) {
                    var HP = monster[2].HP;
                    var ATK = monster[2].ATK;
                    var DEF = monster[2].DEF;
                    var attackCount = Math.floor(HP / (this.actor.ATK - DEF)); //攻击次数
                    var onceBlood = ATK - this.actor.DEF; //攻击一次扣血
                    onceBlood = onceBlood <= 0 ? 0 : onceBlood;
                    var lossBlood = onceBlood * attackCount; //减去的血量
                    if (lossBlood < this.actor.HP) {
                        this.mota.maps.setFloor(this.actor.fromX, this.actor.fromY);
                        this.mota.maps.setFloor(x, y);
                        this.actor.fromX = x;
                        this.actor.fromY = y;
                        this.collect.splice(index, 1);
                        this.aggressor.attackCount = attackCount;
                        this.aggressor.onceBlood = onceBlood;
                        this.aggressor.monster = monster[2];
                        break;
                    } else {
                        this.actor.isAttack = 0;
                    }
                }
            }
        },
        attackPayer: function () {
            if (this.aggressor.attackCount !== 0) {
                this.actor.minusHP(this.aggressor.onceBlood);
                if (this.aggressor.attackCount % 2 == 1) {
                    this.mota.render.drawFloor(this.actor.fromX, this.actor.fromY);
                    this.mota.render.drawActor(this.actor.fromX, this.actor.fromY, 0, Resource.figure.actor.direction.bottom.posY);
                } else {
                    this.mota.render.drawToolAlways(this.actor.fromX, this.actor.fromY, Resource.prop.tool_always.effects);
                }
                this.aggressor.attackCount--;
                if (this.aggressor.attackCount === 0) {
                    this.mota.render.drawFloor(this.actor.fromX, this.actor.fromY);
                    this.mota.render.drawActor(this.actor.fromX, this.actor.fromY, 0, Resource.figure.actor.direction.bottom.posY);
                    this.actor.addGold(this.aggressor.monster);
                    this.actor.isAttack = 0;
                    this.zeroAggressor();
                }
            }
        }
    };

    function Render(mota) {
        this.mota = mota;
        this.images = new ImageView();
        this.board = new Canvas("board", "352", "352");
        this.actor = new Canvas("actor", "174", "160");
        this.key = new Canvas("key", "150", "96");
        this.weapon = new Canvas("weapon", "150", "96");
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
        drawBlockImage: function (img, sx, sy, dx, dy) {
            var s = this.blockSize;
            this.ctx.drawImage(img, s * sx, s * sy, s, s, dx * s, dy * s, s, s);
        },
        drawText: function (x, y, text, scale) {
            var s = this.blockSize;
            var maxWidth = scale * s || s * 3;
            this.clear(x - 1, y - 1, maxWidth, s);
            this.ctx.font = "16px 雅黑";
            this.ctx.fillStyle = 'white';
            //this.ctx.textAlign = 'center';
            this.ctx.fillText(text, x * s, y * s - (s - 16) / 2, maxWidth);
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
        drawActorText: function () {
            var self = this;
            var actor = this.mota.actor;
            return {
                tier: function () {
                    self.actor.drawText(2, 1, "第 " + self.mota.maps.tier + " 层", 4);
                },
                HP: function () {
                    self.actor.drawText(1, 2, "生命  " + actor.HP, 4);
                },
                ATK: function () {
                    self.actor.drawText(1, 3, "攻击  " + actor.ATK, 4);
                },
                DEF: function () {
                    self.actor.drawText(1, 4, "防御  " + actor.DEF, 4);
                },
                gold: function () {
                    self.actor.drawText(1, 5, "金币  " + actor.gold, 4);
                },
                shield: function () {
                    var shield = actor.weapon.shield;
                    if (shield.id !== undefined) {
                        self.weapon.clear(1, 1.5);
                        self.weapon.drawBlockImage(self.images.weapon, shield.posX, shield.posY, 1, 1.5);
                        self.weapon.drawText(3, 2.4, shield.name, 1);
                    } else {
                        self.weapon.drawText(1.5, 2.5, "无防护", 4);
                    }
                },
                sword: function () {
                    var sword = actor.weapon.sword;
                    if (sword.id !== undefined) {
                        self.weapon.clear(1, 0.5);
                        self.weapon.drawBlockImage(self.images.weapon, sword.posX, sword.posY, 1, 0.5);
                        self.weapon.drawText(3, 1.4, sword.name, 1);
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
                    self.key.drawText(3, 1, actor.keyYellowNum + " 把");
                },
                blue: function () {
                    self.key.drawText(3, 2, actor.keyBlueNum + " 把");
                },
                red: function () {
                    self.key.drawText(3, 3, actor.keyRedNum + " 把");
                }
            }
        },
        drawBoard: function (maps) {
            this.board.clear(0, 0, 11 * blockSize, 11 * blockSize);
            for (var y = 0; y < 11; y++) {
                for (var x = 0; x < 11; x++) {
                    var index = maps[y][x];
                    switch (index) {
                        case Resource.adorn.wall.base.id:
                            this.drawWall(x, y, Resource.adorn.wall.base);
                            break;
                        case Resource.adorn.floor.base.id:
                            this.drawFloor(x, y);
                            break;
                        case Resource.adorn.door.yellow.id:
                            this.drawDoor(x, y, Resource.adorn.door.yellow);
                            break;
                        case Resource.figure.monster.SLaiTe.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.SLaiTe.category[0]]);
                            break;
                        case Resource.figure.monster.SLaiTe.category[1].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.SLaiTe.category[1]]);
                            break;
                        case Resource.figure.monster.SLaiTe.category[2].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.SLaiTe.category[2]]);
                            break;
                        case Resource.figure.monster.SLaiTe.category[3].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.SLaiTe.category[3]]);
                            break;
                        case Resource.figure.monster.Ghost.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Ghost.category[0]]);
                            break;
                        case Resource.figure.monster.Ghost.category[1].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Ghost.category[1]]);
                            break;
                        case Resource.figure.monster.Ghost.category[2].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Ghost.category[2]]);
                            break;
                        case Resource.figure.monster.Ghost.category[3].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Ghost.category[3]]);
                            break;
                        case Resource.figure.monster.Bat.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Bat.category[0]]);
                            break;
                        case Resource.figure.monster.Bat.category[1].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Bat.category[1]]);
                            break;
                        case Resource.figure.monster.Bat.category[2].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Bat.category[2]]);
                            break;
                        case Resource.figure.monster.Bat.category[3].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Bat.category[3]]);
                            break;
                        case Resource.figure.monster.Orcish.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Orcish.category[0]]);
                            break;
                        case Resource.figure.monster.Orcish.category[1].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Orcish.category[1]]);
                            break;
                        case Resource.figure.monster.SwordMan.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.SwordMan.category[0]]);
                            break;
                        case Resource.figure.monster.Guard.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Guard.category[0]]);
                            break;
                        case Resource.figure.monster.Guard.category[1].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Guard.category[1]]);
                            break;
                        case Resource.figure.monster.Guard.category[2].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Guard.category[2]]);
                            break;
                        case Resource.figure.monster.Magician.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Magician.category[0]]);
                            break;
                        case Resource.figure.monster.Magician.category[1].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Magician.category[1]]);
                            break;
                        case Resource.figure.monster.Magician.category[2].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Magician.category[2]]);
                            break;
                        case Resource.figure.monster.Magician.category[3].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Magician.category[3]]);
                            break;
                        case Resource.figure.monster.Malphite.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Malphite.category[0]]);
                            break;
                        case Resource.figure.monster.Specter.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Specter.category[0]]);
                            break;
                        case Resource.figure.monster.Exorcist.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Exorcist.category[0]]);
                            break;
                        case Resource.figure.monster.Knight.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Knight.category[0]]);
                            break;
                        case Resource.figure.monster.Knight.category[1].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Knight.category[1]]);
                            break;
                        case Resource.figure.monster.Warrior.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Warrior.category[0]]);
                            break;
                        case Resource.figure.monster.BlackKnight.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.BlackKnight.category[0]]);
                            break;
                        case Resource.figure.monster.MagicGuard.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.MagicGuard.category[0]]);
                            break;
                        case Resource.figure.monster.Devil.category[0].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Devil.category[0]]);
                            break;
                        case Resource.figure.monster.Devil.category[1].id:
                            this.drawFloor(x, y);
                            this.mota.monster.collect.push([x, y, Resource.figure.monster.Devil.category[1]]);
                            break;
                        case Resource.adorn.door.blue.id:
                            this.drawDoor(x, y, Resource.adorn.door.blue);
                            break;
                        case Resource.adorn.door.red.id:
                            this.drawDoor(x, y, Resource.adorn.door.red);
                            break;
                        case Resource.adorn.door.cyan.id:
                            this.drawDoor(x, y, Resource.adorn.door.cyan);
                            break;
                        case Resource.adorn.wall.jail.id:
                            this.drawWall(x, y, Resource.adorn.wall.jail);
                            break;
                        case Resource.adorn.stairs.down.id:
                            this.drawStairs(x, y, Resource.adorn.stairs.down);
                            break;
                        case Resource.adorn.stairs.up.id:
                            this.drawStairs(x, y, Resource.adorn.stairs.up);
                            break;
                        case Resource.prop.key.yellow.id:
                            this.drawKey(x, y, Resource.prop.key.yellow);
                            break;
                        case Resource.prop.key.blue.id:
                            this.drawKey(x, y, Resource.prop.key.blue);
                            break;
                        case Resource.prop.key.red.id:
                            this.drawKey(x, y, Resource.prop.key.red);
                            break;
                        case Resource.prop.key.magic.id:
                            this.drawKey(x, y, Resource.prop.key.magic);
                            break;
                        case Resource.prop.potion.red.id:
                            this.drawPotion(x, y, Resource.prop.potion.red);
                            break;
                        case Resource.prop.potion.blue.id:
                            this.drawPotion(x, y, Resource.prop.potion.blue);
                            break;
                        case Resource.prop.gem.red.id:
                            this.drawGem(x, y, Resource.prop.gem.red);
                            break;
                        case Resource.prop.gem.blue.id:
                            this.drawGem(x, y, Resource.prop.gem.blue);
                            break;
                        case Resource.prop.store.id:
                            this.drawStore(x, y);
                            x++;
                            break;
                        case Resource.prop.tool_always.manual.id:
                            this.drawToolAlways(x, y, Resource.prop.tool_always.manual);
                            break;
                        case Resource.prop.tool_always.notepad.id:
                            this.drawToolAlways(x, y, Resource.prop.tool_always.notepad);
                            break;
                        case Resource.prop.tool_always.luckyCoins.id:
                            this.drawToolAlways(x, y, Resource.prop.tool_always.luckyCoins);
                            break;
                        case Resource.prop.tool_always.cross.id:
                            this.drawToolAlways(x, y, Resource.prop.tool_always.cross);
                            break;
                        case Resource.prop.tool_always.flyingWand.id:
                            this.drawToolAlways(x, y, Resource.prop.tool_always.flyingWand);
                            break;
                        case Resource.prop.tool_limit.pickax.id:
                            this.drawToolLimit(x, y, Resource.prop.tool_limit.pickax);
                            break;
                        case Resource.prop.tool_limit.superMaigcMattok.id:
                            this.drawToolLimit(x, y, Resource.prop.tool_limit.superMaigcMattok);
                            break;
                        case Resource.prop.tool_limit.snowCrystal.id:
                            this.drawToolLimit(x, y, Resource.prop.tool_limit.snowCrystal);
                            break;
                        case Resource.prop.tool_limit.bomb.id:
                            this.drawToolLimit(x, y, Resource.prop.tool_limit.bomb);
                            break;
                        case Resource.prop.tool_limit.flying.center.id:
                            this.drawToolLimit(x, y, Resource.prop.tool_limit.flying.center);
                            break;
                        case Resource.prop.tool_limit.flying.up.id:
                            this.drawToolLimit(x, y, Resource.prop.tool_limit.flying.up);
                            break;
                        case Resource.prop.tool_limit.flying.down.id:
                            this.drawToolLimit(x, y, Resource.prop.tool_limit.flying.down);
                            break;
                        case Resource.prop.tool_limit.dragonSlayer.id:
                            this.drawToolLimit(x, y, Resource.prop.tool_limit.dragonSlayer);
                            break;
                        case Resource.prop.tool_limit.holyWater.id:
                            this.drawToolLimit(x, y, Resource.prop.tool_limit.holyWater);
                            break;
                        case Resource.weapon.category[0].sword.id:
                            this.drawWeapon(x, y, Resource.weapon.category[0].sword);
                            break;
                        case Resource.weapon.category[0].shield.id:
                            this.drawWeapon(x, y, Resource.weapon.category[0].shield);
                            break;
                        case Resource.weapon.category[1].sword.id:
                            this.drawWeapon(x, y, Resource.weapon.category[1].sword);
                            break;
                        case Resource.weapon.category[1].shield.id:
                            this.drawWeapon(x, y, Resource.weapon.category[1].shield);
                            break;
                        case Resource.weapon.category[2].sword.id:
                            this.drawWeapon(x, y, Resource.weapon.category[2].sword);
                            break;
                        case Resource.weapon.category[2].shield.id:
                            this.drawWeapon(x, y, Resource.weapon.category[2].shield);
                            break;
                        case Resource.weapon.category[3].sword.id:
                            this.drawWeapon(x, y, Resource.weapon.category[3].sword);
                            break;
                        case Resource.weapon.category[3].shield.id:
                            this.drawWeapon(x, y, Resource.weapon.category[3].shield);
                            break;
                        case Resource.weapon.category[4].sword.id:
                            this.drawWeapon(x, y, Resource.weapon.category[4].sword);
                            break;
                        case Resource.weapon.category[4].shield.id:
                            this.drawWeapon(x, y, Resource.weapon.category[4].shield);
                            break;
                        default:
                            break;
                    }
                }
            }
        },
        drawFloor: function (x, y) {
            this.board.drawBlockImage(this.images.floor, 0, 0, x, y);
        }, drawWall: function (x, y, wall) {
            if (wall.id !== 1) {
                this.drawFloor(x, y);
            }
            this.board.drawBlockImage(this.images.wall, wall.pos, 0, x, y);
        }, drawWeapon: function (x, y, weapon) {
            this.drawFloor(x, y);
            this.board.drawBlockImage(this.images.weapon, weapon.posX, weapon.posY, x, y);
        }, drawToolAlways: function (x, y, toolAlways) {
            this.drawFloor(x, y);
            this.board.drawBlockImage(this.images.toolAlways, toolAlways.posX, toolAlways.posY, x, y);
        }, drawToolLimit: function (x, y, toolLimit) {
            this.drawFloor(x, y);
            this.board.drawBlockImage(this.images.toolLimit, toolLimit.posX, toolLimit.posY, x, y);
        }, drawStore: function (x, y) {
            this.drawFloor(x - 1, y);
            this.drawFloor(x, y);
            this.drawFloor(x + 1, y);
            this.board.ctx.drawImage(this.images.store, 0, 0, 3 * blockSize, blockSize, (x - 1) * blockSize, y * blockSize, 3 * blockSize, blockSize);
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
        }, drawMonster: function (img, x, y, posX, posY) {
            this.board.clear(x, y);
            this.drawFloor(x, y);
            this.board.drawBlockImage(img, posX, posY, x, y);
        }
    };


    function Keyboard() {
        var self = this;
        var keys = {
            38: 'top',
            39: 'right',
            40: 'down',
            37: 'left'
        };
        this.eventHandlers = function () {
            document.addEventListener('keydown', this.keyPressEvent, true);
        };
        this.keyPressEvent = function (event) {
            if (keys[event.keyCode])
                self.keyPress(keys[event.keyCode]);
        };
        this.keyPress = function (key) {
            if (self.actor.isAttack === 0) {
                switch (key) {
                    case 'top':
                        if (this.actor.fromY > 0) {
                            self.actor.move(this.actor.fromX, this.actor.fromY - 1, this.actor.actor.direction.top.posY);
                        }
                        break;
                    case 'right':
                        if (this.actor.fromX < 10) {
                            self.actor.move(this.actor.fromX + 1, this.actor.fromY, this.actor.actor.direction.right.posY);
                        }
                        break;
                    case 'down':
                        if (this.actor.fromY < 10) {
                            self.actor.move(this.actor.fromX, this.actor.fromY + 1, this.actor.actor.direction.bottom.posY);
                        }
                        break;
                    case 'left':
                        if (this.actor.fromX > 0) {
                            self.actor.move(this.actor.fromX - 1, this.actor.fromY, this.actor.actor.direction.left.posY);
                        }
                        break;
                }
            }
        };
    }

    return new Mota();
})();
