/**
 * Created by owjie on 12/30/2017.
 * author:欧文杰
 * QQ:825455115
 * 仅供学习交流，严禁用于商业用途
 */

/**
 * ATK--攻击值
 * DEF--防御值
 */
var Resource = {
    figure: {
        actor: {
            skin_0_src: "./img/figure/Actor01-Braver01.png",
            skin_1_src: "./img/figure/Actor01-Braver05.png",
            name: "玩家",
            HP: 1000,
            ATK: 10,
            DEF: 10,
            gold: 0,
            direction: {left: {posY: 1}, right: {posY: 2}, top: {posY: 3}, bottom: {posY: 0}}
        },
        A: {
            src: "./img/figure/NPC01-01.png",
            //seer: {id:},
            //trader:{}
        },
        monster: {
            SLaiTe: {
                src: "./img/figure/Monster01-01.png",
                category: [
                    {id: 50, name: "绿史莱姆", HP: 35, ATK: 18, DEF: 1, gold: 1, pos: 0},
                    {id: 51, name: "红色史莱姆", HP: 45, ATK: 20, DEF: 2, gold: 2, pos: 1},
                    {id: 52, name: "大史莱特", HP: 130, ATK: 60, DEF: 3, gold: 8, pos: 2},
                    {id: 53, name: "史莱特王", HP: 360, ATK: 310, DEF: 20, gold: 40, pos: 3}
                ]
            },
            Ghost: {
                src: "./img/figure/Monster02-01.png",
                category: [
                    {id: 54, name: "骷髅人", HP: 50, ATK: 42, DEF: 6, gold: 6, pos: 0},
                    {id: 55, name: "骷髅士兵", HP: 55, ATK: 52, DEF: 12, gold: 8, pos: 1},
                    {id: 56, name: "骷髅队长", HP: 100, ATK: 65, DEF: 15, gold: 30, pos: 2},
                    {id: 57, name: "鬼战士", HP: 220, ATK: 180, DEF: 30, gold: 35, pos: 3}
                ]
            },
            Bat: {
                src: "./img/figure/Monster03-01.png",
                category: [
                    {id: 58, name: "小蝙蝠", HP: 35, ATK: 38, DEF: 3, gold: 3, pos: 0},
                    {id: 59, name: "大蝙蝠", HP: 60, ATK: 100, DEF: 8, gold: 12, pos: 1},
                    {id: 60, name: "吸血蝙蝠", HP: 200, ATK: 390, DEF: 90, gold: 50, pos: 2},
                    {id: 61, name: "吸血鬼", HP: 444, ATK: 199, DEF: 66, gold: 144, pos: 3}
                ]
            },
            SwordMan: {
                src: "./img/figure/Monster04-01.png",
                category: [
                    {id: 62, name: "双手剑士", HP: 100, ATK: 680, DEF: 50, gold: 55, pos: 0}
                ]
            },
            Guard: {
                src: "./img/figure/Monster05-01.png",
                category: [
                    {id: 63, name: "初级卫兵", HP: 50, ATK: 48, DEF: 22, gold: 12, pos: 0},
                    {id: 64, name: "中级卫兵", HP: 100, ATK: 180, DEF: 110, gold: 50, pos: 1},
                    {id: 65, name: "高级卫兵", HP: 180, ATK: 460, DEF: 360, gold: 200, pos: 2}
                ]
            },
            Magician: {
                src: "./img/figure/Monster06-01.png",
                category: [
                    {id: 66, name: "初级法师", HP: 60, ATK: 32, DEF: 8, gold: 5, pos: 0},
                    {id: 67, name: "高级法师", HP: 100, ATK: 95, DEF: 30, gold: 22, pos: 1},
                    {id: 68, name: "初级巫师", HP: 220, ATK: 370, DEF: 110, gold: 80, pos: 2},
                    {id: 69, name: "高级巫师", HP: 200, ATK: 380, DEF: 130, gold: 90, pos: 3}
                ]
            },
            Orcish: {
                src: "./img/figure/Monster09-01.png",
                category: [
                    {id: 70, name: "兽人", HP: 260, ATK: 85, DEF: 5, gold: 18, pos: 0},
                    {id: 71, name: "兽人武士", HP: 320, ATK: 120, DEF: 15, gold: 30, pos: 1}
                ]
            },
            Malphite: {
                src: "./img/figure/Monster10-01.png",
                category: [
                    {id: 72, name: "石头人", HP: 20, ATK: 100, DEF: 68, gold: 28, pos: 0}
                ]
            },
            Specter: {
                src: "./img/figure/Monster11-01.png",
                category: [
                    {id: 73, name: "幽灵", HP: 320, ATK: 140, DEF: 20, gold: 30, pos: 0}
                ]
            },
            Exorcist: {
                src: "./img/figure/Monster06-05.png",
                category: [
                    {id: 74, name: "大法师", HP: 4500, ATK: 560, DEF: 310, gold: 1000, pos: 0}
                ]
            },
            Knight: {
                src: "./img/figure/Monster07-01.png",
                category: [
                    {id: 75, name: "骑士队长", HP: 120, ATK: 150, DEF: 50, gold: 100, pos: 0},
                    {id: 76, name: "骑士", HP: 160, ATK: 230, DEF: 105, gold: 65, pos: 1}
                ]
            },
            Warrior: {
                src: "./img/figure/Monster07-04.png",
                category: [
                    {id: 77, name: "战士", HP: 200, ATK: 200, DEF: 65, gold: 45, pos: 0}
                ]
            },
            MagicGuard: {
                src: "./img/figure/Monster08-01.png",
                category: [
                    {id: 78, name: "魔法警卫", HP: 230, ATK: 450, DEF: 100, gold: 100, pos: 0}
                ]
            },
            BlackKnight: {
                src: "./img/figure/Monster07-08.png",
                category: [
                    {id: 79, name: "黑暗骑士", HP: 180, ATK: 430, DEF: 210, gold: 120, pos: 0}
                ]
            },
            Devil: {
                src: "./img/figure/Monster08-02.png",
                category: [
                    {id: 80, name: "假魔王", HP: 8000, ATK: 5000, DEF: 1000, gold: 5000, pos: 0},
                    {id: 81, name: "真魔王", HP: 5000, ATK: 1580, DEF: 190, gold: 500, pos: 1}
                ]
            }
        }
    },
    adorn: {
        floor: {
            src: "./img/other/Event01-Floor01.png",
            base: {id: 0, name: "地板", pos: 1}
        },
        wall: {
            src: "./img/other/Event01-Wall01.png",
            base: {id: 1, name: "墙", pos: 1},
            jail: {id: 6, name: "铁门", pos: 3}
        },
        door: {
            src: "./img/other/Event01-Door01.png",
            yellow: {id: 2, name: "黄门", pos: 0},
            blue: {id: 3, name: "蓝门", pos: 1},
            red: {id: 4, name: "红门", pos: 2},
            cyan: {id: 5, name: "花门", pos: 3}
        },
        stairs: {
            src: "./img/other/Event01-Stairs01.png",
            down: {id: 7, name: "楼梯下", pos: 0},
            up: {id: 8, name: "楼梯上", pos: 1}
        }
    },
    prop: {
        key: {
            src: "./img/prop/prop01-01.png",
            yellow: {id: 9, name: "黄钥匙", posX: 0, posY: 0},
            blue: {id: 10, name: "蓝钥匙", posX: 1, posY: 0},
            red: {id: 11, name: "红钥匙", posX: 2, posY: 0},
            magic: {id: 12, name: "魔法钥匙", posX: 0, posY: 1}
        },
        potion: {
            src: "./img/prop/prop01-02.png",
            red: {id: 13, name: "红药水", pos: 0},
            blue: {id: 14, name: "蓝药水", pos: 1}
        },
        gem: {
            src: "./img/prop/prop01-Gem01.png",
            red: {id: 15, name: "红宝石", pos: 0},
            blue: {id: 16, name: "蓝宝石", pos: 1}
        },
        store: {id: 17, name: "商店", src: "./img/other/Event01-Store01.png"},
        tool_always: {
            src: "./img/prop/prop01-05.png",
            manual: {id: 18, name: "怪物手册", posX: 0, posY: 0},
            notepad: {id: 19, name: "记事本", posX: 1, posY: 0},
            luckyCoins: {id: 20, name: "幸运金币", posX: 3, posY: 0},
            cross: {id: 21, name: "十字架", posX: 1, posY: 2},
            flyingWand: {id: 22, name: "飞行魔杖", posX: 2, posY: 3},
            effects: {id: 100, name: "攻击特效", posX: 2, posY: 2}
        },
        tool_limit: {
            src: "./img/prop/prop01-06.png",
            pickax: {id: 41, name: "镐", posX: 0, posY: 0},
            superMaigcMattok: {id: 42, name: "地震卷轴", posX: 3, posY: 0},
            snowCrystal: {id: 43, name: "冰冻魔法", posX: 2, posY: 0},
            bomb: {id: 44, name: "炸弹", posX: 0, posY: 2},
            dragonSlayer: {id: 45, name: "屠龙匕", posX: 2, posY: 2},
            flying: {
                up: {id: 46, name: "向上飞行器", posX: 2, posY: 1},
                down: {id: 47, name: "向下飞行器", posX: 1, posY: 1},
                center: {id: 48, name: "中心飞行器", posX: 0, posY: 1}
            },
            holyWater: {id: 49, name: "圣水", posX: 3, posY: 2}
        },
        tier1_10: {
            store: {HP: 100, ATK: 2, DEF: 4},
            potion: {
                red: {HP: 50},
                blue: {HP: 200}
            },
            gem: {
                red: {ATK: 1},
                blue: {DEF: 1}
            }
        },
        tier11_20: {
            store: {HP: 200, ATK: 4, DEF: 8},
            potion: {
                red: {HP: 100},
                blue: {HP: 400}
            },
            gem: {
                red: {ATK: 2},
                blue: {DEF: 2}
            }
        },
        tier31_40: {
            store: {HP: 300, ATK: 6, DEF: 12},
            potion: {
                red: {HP: 200},
                blue: {HP: 800}
            },
            gem: {
                red: {ATK: 4},
                blue: {DEF: 4}
            }
        },
        tier41_50: {
            store: {HP: 500, ATK: 10, DEF: 20},
            potion: {
                red: {HP: 250},
                blue: {HP: 1000}
            },
            gem: {
                red: {ATK: 5},
                blue: {DEF: 5}
            }
        }
    },
    weapon: {
        src: "./img/weapon/weapon01-08.png",
        category: [
            {
                sword: {id: 31, name: "铁剑", ATK: 10, posX: 0, posY: 0},
                shield: {id: 32, name: "铁盾", DEF: 10, posX: 0, posY: 2}
            },
            {
                sword: {id: 33, name: "银剑", ATK: 20, posX: 1, posY: 0},
                shield: {id: 34, name: "银盾", DEF: 20, posX: 1, posY: 2}
            },
            {
                sword: {id: 35, name: "骑士剑", ATK: 40, posX: 2, posY: 0},
                shield: {id: 36, name: "骑士盾", DEF: 40, posX: 2, posY: 2}
            },
            {
                sword: {id: 37, name: "圣剑", ATK: 80, posX: 3, posY: 0},
                shield: {id: 38, name: "圣盾", DEF: 80, posX: 3, posY: 2}
            },
            {
                sword: {id: 39, name: "神圣剑", ATK: 100, posX: 0, posY: 1},
                shield: {id: 40, name: "神圣盾", DEF: 100, posX: 0, posY: 3}
            }
        ]
    }
};


