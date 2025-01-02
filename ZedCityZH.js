// ==UserScript==
// @name         Zed City 汉化
// @namespace    http://tampermonkey.net/
// @version      4.2
// @description  网页游戏 Zed City 的汉化插件。Chinese translation for the web game Zed City.
// @author       bot740
// @match        https://www.zed.city/*
// @match        https://wiki.zed.city/*
// @icon         https://www.zed.city/favicon.ico
// @grant        none
// ==/UserScript==

(() => {
    const unmatchedTexts = [];

    const excludes = ["K", "M", "B", "D", "H", "S", "Lv", "MAX", "wiki", "discord", "XP", "N/A", "x"];

    const excludeRegs = [
        // 一个字母都不包含
        /^[^a-zA-Z]*$/,
        // 版本号
        /^v\d+\.\d+\.\d+$/,
        /^Alpha V\d+\.\d+\.\d+$/,
        // 含中文
        /[\u4e00-\u9fff]/,
    ];

    // 词典
    const dictCommon = {
        purge: "大清洗",
        stronghold: "据点",
        "Unlock at level": "解锁等级",
        Version: "版本",
        City: "城市",
        Inventory: "背包",
        Quests: "任务",
        Hunting: "狩猎",
        Scavenge: "拾荒",
        Explore: "探索",
        Skills: "技能",
        Help: "帮助",
        "Release Notes": "更新日志",
        Forums: "论坛",
        "Report Bug": "报告错误",
        Faction: "帮派",
        "Medical Bay": "医疗间",
        "Crafting Bench": "制作台",
        Furnace: "熔炉",
        Kitchen: "厨房",
        "Radio Tower": "广播塔",
        "Weapon Bench": "武器台",
        "Ammo Bench": "弹药台",
        "Armour Bench": "盔甲台",
        Garage: "车库",
        Camp: "营地",
        Storage: "仓库",
        Farm: "农场",
        Distillery: "酒厂",
        Refinery: "精炼厂",
        Base: "基地",
        "Upcoming Server Reset and Open Release": "即将到来的服务器重置与公开发布",
        "load more": "加载更多",
        "Final Reset": "最终重置",
        gym: "健身房",
        "Train your stats to become more effective in combat": "训练你的属性，以在战斗中更有效",
        train: "训练",
        "The damage you make on impact": "你命中时造成的伤害",
        "Your ability to resist damage": "你抵抗伤害的能力",
        "The chance of hitting your target": "击中目标的概率",
        Raids: "突袭",
        Activity: "活动日志",
        Rank: "排名",
        Members: "成员",
        Respect: "声望",
        Trading: "交易",
        "Donator House": "捐赠者之家",
        Market: "市场",
        Info: "信息",
        "Hall Of Fame": "名人堂",
        "City Stats": "城市统计",
        Survivors: "幸存者",
        Retail: "零售",
        Glockbuster: "Glock杀手",
        "Junk Store": "废品店",
        "Zed Mart": "僵尸商场",
        "Donator Store": "捐赠商店",
        Factions: "帮派",
        Incinerator: "焚烧炉",
        "No Items": "没有物品",
        "Energy Vial": "能量瓶",
        Buy: "购买",
        "Health Vial": "生命瓶",
        "Morale Vial": "士气瓶",
        "Radiation Vial": "辐射瓶",
        "Detox Vial": "解毒瓶",
        Sell: "出售",
        "Booster (Medical)": "增强剂（医疗）",
        "Booster (Energy Drink)": "增强剂（能量饮料）",
        "A massive incinerator stands in the middle of the city, billowing out smoke as the fire within burns hot enough to turn anything into ash":
            "一个巨大的焚烧炉屹立在城市的中央，浓烟四起，炉内的火焰足以将任何物品烧成灰烬",
        Weight: "重量",
        kg: "千克",
        "Booster (Food)": "增强剂（食物）",
        "Booster (Alcohol)": "增强剂（酒精）",
        "Effect: Increases energy by": "效果：增加能量",
        "Effect: Reduce recovery time by 10 minutes and increases life by": "效果：减少恢复时间10分钟并增加生命值",
        "Effect: Increases morale by": "效果：增加士气",
        "Effect: Increases rad immunity by": "效果：增加辐射免疫力",
        "Effect: Resets cooldown booster by 12 hours": "效果：重置冷却时间增强剂12小时",
        Vehicle: "车辆",
        "No Vehicle": "没有车辆",
        Weapons: "武器",
        Armour: "护甲",
        Resources: "资源",
        Ammo: "弹药",
        Medical: "医疗",
        Boosters: "增强剂",
        Equipment: "装备",
        Misc: "杂项",
        Trophy: "奖杯",
        "Select a quest to continue": "选择一个任务继续",
        "Welcome to the End": "欢迎来到末日",
        "Getting started at the end of the world": "在世界末日时开始你的冒险",
        "A stranger appears": "一个陌生人出现",
        "Who is this dark figure, quiet and still, under the moonlight": "月光下，这个安静的黑暗身影是谁。",
        "The Purge is Upon Us": "大清洗即将来临",
        "As Ash blankets the city, a raspy chuckle attracts your notice": "当灰烬覆盖城市时，一阵沙哑的笑声引起了你的注意。",
        "Select a location to continue": "选择一个地点继续",
        Arcade: "游戏厅",
        Cinema: "电影院",
        "Shopping Mall": "购物中心",
        Warehouse: "仓库",
        Restaurant: "餐馆",
        Wasteland: "荒原",
        Forest: "森林",
        "Coal Mine": "煤矿",
        Scrapyard: "废品场",
        "Min Level": "最低等级",
        Lake: "湖泊",
        "You need a vehicle to explore": "你需要一辆车来探索",
        "Fuel Depot": "燃料库",
        "Reclaim Zone": "回收区",
        "The Reserve": "保护区",
        "Military Base": "军事基地",
        "Demolition Site": "拆除现场",
        "Construction Yard": "建筑工地",
        Stats: "统计",
        Forging: "锻造",
        Farming: "耕作",
        Distilling: "蒸馏",
        Scavenging: "拾荒",
        Crafting: "制作",
        Fishing: "钓鱼",
        Refining: "精炼",
        "Active Perks": "生效技能",
        Perks: "技能",
        "Skill Points": "技能点",
        Immunity: "免疫",
        "Increase Max Rad Immunity by": "增加最大辐射免疫力",
        "Skill Point": "技能点",
        Morale: "士气",
        "Increase Max Morale by": "增加最大士气",
        Life: "生命",
        "Increase Max Life by": "增加最大生命值",
        Luck: "幸运",
        "Increase chance of finding better items": "增加找到更好物品的机会",
        Strength: "力量",
        "Increase strength by": "增加力量",
        Defense: "防御",
        "Increase defense by": "增加防御",
        Speed: "速度",
        "Increase speed by": "增加速度",
        Agility: "敏捷",
        "Increase agility by": "增加敏捷",
        Guide: "指南",
        FAQ: "常见问题",
        Forum: "论坛",
        "Welcome to Zed City, a thrilling zombie apocalypse survival game. Navigate through the city to gather resources, fend off zombies, and fortify your stronghold. Your initial goal is to enhance your character and strengthen your base":
            "欢迎来到Zed City，一款刺激的末日求生游戏。穿越城市，收集资源，抵御僵尸，并加固你的据点。你的初步目标是提升角色并强化基地",
        "Scavenging and hunting will be the best way for you to thrive in the wasteland, gathering all the scraps and valuables you can lay your hands on. With some work you can turn them into valuable resources and epic weapons to take down even the biggest of zeds":
            "拾荒和狩猎将是你在荒原中生存下去的最佳方法，收集所有你能找到的垃圾和宝贵物品。通过一些努力，你可以将这些转化为宝贵的资源和史诗级武器，打倒最大的僵尸",
        "Start your journey by diving into the": "开始你的旅程，进入",
        quest: "任务",
        "For a more detailed guide, check out the wiki": "欲了解更详细的指南，请查看wiki",
        "Visit Wiki": "访问wiki",
        Support: "支持",
        "For more help, reach out to the community in discord": "如需更多帮助，请加入Discord社区",
        "Join Discord": "加入Discord",
        "How do i heal": "我如何恢复生命值",
        "Life points are regenerated over time, you can see the statistics in your Medical Bay. You can use medical items to heal instantly":
            "生命点数会随着时间恢复，你可以在医疗间查看统计数据。你可以使用医疗物品进行即时治疗",
        "How do I earn money": "我如何赚取金钱",
        "Scavenging or hunting for items to sell to the stores is the main way to earn money early in the game. After some time you will discover other ways to transform items into more valuable ones":
            "拾荒或狩猎物品并卖给商店是游戏初期赚取金钱的主要方式。过一段时间，你将发现其他方法将物品转化为更有价值的物品",
        "How do i gain Experience": "我如何获得经验",
        "Experience is gained through commiting scavenge actions, completing quest objectives & winning battles. The more Experience gained you will level up":
            "通过执行拾荒行动、完成任务目标和赢得战斗来获得经验。获得的经验越多，你的等级就越高",
        "How can i fulfill Energy & Rad Immunity  bars": "我如何填充能量和辐射免疫条",
        "Energy regenerates +5 every 15 minutes, Rad Immunity regenerates +1 every 5 minutes. You can take consumables found in-game that will help regain these besides waiting on timers":
            "能量每15分钟恢复+5，辐射免疫力每5分钟恢复+1。你可以使用游戏中找到的消耗品来帮助恢复这些，而不仅仅是等待时间",
        "What happens if i lose fight": "如果我输掉战斗会怎样",
        "You dont die. You become temporarily injured for a moment then your health will restart from low":
            "你不会死。你会暂时受伤片刻，然后你的健康值会从低值恢复",
        "How do i get stronger in fights": "我如何在战斗中变得更强",
        "Using energy to train in the gym is the best way to be more effective in combat and making sure you have the best weapon available. Some mutations and consumables are available which may temporily boost your gym stats":
            "使用能量在健身房训练是提高战斗效率的最佳方法，确保你拥有最好的武器。一些突变和消耗品可以临时提升你的健身数据",
        General: "综合",
        "A place for general discussions": "一个进行综合讨论的地方",
        Ideas: "创意",
        "Ideas & Suggestions for alpha": "Alpha测试的创意与建议",
        "Items Crafted": "制作的物品",
        "Items Forged": "锻造的物品",
        "Hunting Attempts": "狩猎尝试",
        "Scavenge Attempts": "拾荒尝试",
        "Fight Stats": "战斗统计",
        "Go Back": "返回",
        ATTEMPTS: "尝试",
        SUCCESS: "成功",
        FAILS: "失败",
        "Loot Discovered": "发现战利品",
        Logs: "原木",
        Resource: "资源",
        Scrap: "废品",
        Nails: "钉子",
        "Iron Bar": "铁条",
        "Advanced Tools": "高级工具",
        Take: "拿取",
        "AK-74u": "AK-74u",
        "Weapon (Ranged)": "武器（远程）",
        Durability: "耐久度",
        Medium: "中等",
        Condition: "状况",
        Attack: "攻击",
        Accuracy: "精度",
        Type: "类型",
        Rifle: "步枪",
        "Fire Rate": "射速",
        "Ammo Type": "弹药类型",
        "Rifle Ammo": "步枪弹药",
        Angelfish: "天使鱼",
        "Raw Fish": "生鱼",
        "Animal Meat": "动物肉",
        "Effect: Increases morale by 50 and booster cooldown by 30 minutes": "效果：增加士气50，增强剂冷却时间30分钟",
        Ash: "灰烬",
        Barley: "大麦",
        "Baseball Bat": "棒球棒",
        Weapon: "武器",
        Blunt: "钝器",
        Beer: "啤酒",
        "Effect: Increases rad immunity by 1 and booster cooldown by 1 hour": "效果：增加辐射免疫力1，增强剂冷却时间1小时",
        Bow: "弓",
        Piercing: "穿刺",
        Arrows: "箭",
        "Add Items": "添加物品",
        "Heal to attack more crawlers": "治疗以攻击更多爬行者",
        Upgrade: "升级",
        Regen: "回复",
        "Per 15 Min": "每15分钟",
        Recovery: "恢复",
        "Create Bandage": "制作绷带",
        LVL: "等级",
        Menu: "菜单",
        Submit: "提交",
        energy: "能量",
        "Rad Immunity": "辐射免疫力",
        "Membership Expires": "会员到期",
        Notifications: "通知",
        "No activity found": "无活动日志",
        am: "上午",
        "View Profile": "查看个人资料",
        Settings: "设置",
        Logout: "登出",
        Online: "在线",
        Level: "等级",
        "Days Survived": "生存天数",
        Location: "位置",
        "Update Avatar": "更新头像",
        Update: "更新",
        "Update Email": "更新电子邮件",
        Email: "电子邮件",
        "Update Password": "更新密码",
        "Current Password": "当前密码",
        "New Password": "新密码",
        "Repeat Password": "重复密码",
        Quantity: "数量",
        Cancel: "取消",
        "Your ability to dodge an attack": "你的闪避能力",
        "Gym upgrade": "健身房升级",
        Bandage: "绷带",
        "Medical Bay Level": "医疗间等级",
        "Weapon (Ranged": "武器（远程）",
        "Cloth Pants": "布裤",
        "Armour (Legs": "护甲（腿部）",
        "Hockey Mask": "冰球面罩",
        "Armour (Head": "护甲（头部）",
        Brick: "砖块",
        Cement: "水泥",
        "A bag of Cement mix": "一袋水泥混合料",
        Cloth: "布料",
        Coal: "煤炭",
        "Dirty Water": "脏水",
        Flux: "助焊剂",
        "Desert Eagle": "沙漠之鹰",
        Pistol: "手枪",
        "Pistol Ammo": "手枪子弹",
        Handmade: "手工手枪",
        "Simple Ammo": "简单弹药",
        "Canned Food": "罐装食物",
        "Cooked Fish": "熟鱼",
        "Dino Egg": "恐龙蛋",
        "e-Cola": "原子可乐",
        "Booster (Easter": "增强剂（复活节）",
        Chocolate: "巧克力",
        Eyebellini: "眼球鸡尾酒",
        "Mixed Vegetables": "混合蔬菜",
        Pickaxe: "镐",
        "Wooden Fishing Rod": "木质钓鱼竿",
        Low: "低",
        "Buddys Pass": "伙伴通行证",
        Miscellaneous: "杂项",
        "Generals RFID": "将军的射频ID",
        "Security Card": "安保卡",
        "Silver key": "银钥匙",
        "Take Item": "拿取物品",
        "A patch of slightly fertile soil": "一块稍微肥沃的土壤",
        Farmers: "农民",
        "Team Efficiency": "团队效率",
        "Farming Barley": "种植大麦",
        "Total Time Left": "剩余总时间",
        "Barley Seeds": "大麦种子",
        Build: "建造",
        "Hot enough to melt things": "热度足以融化物品",
        "Complete building to access furnace": "完成建筑以访问炉子",
        "Forge Nails": "锻造钉子",
        "Smelt Scrap": "熔炼废品",
        "Smelt Iron Ore": "熔炼铁矿",
        "Purify Water": "净化水",
        Discoverable: "可发现物品",
        "Hot enough to cook things": "热度足以烹饪食物",
        "Complete building to access kitchen": "完成建筑以访问厨房",
        "Cooked Angelfish": "熟天使鱼",
        "Cooked Barnaclefish": "熟藤壶鱼",
        "Cooked Carp": "熟鲤鱼",
        "Cooked Perch": "熟鲈鱼",
        "Cooked Sandfish": "熟沙鱼",
        "Cooked Meat": "熟肉",
        "Fish Kebab": "鱼肉串",
        Sandwich: "三明治",
        "Complete building to access radio tower": "完成建筑以访问广播塔",
        "Fabricate firearms": "制造枪械",
        "Complete building to access weapon bench": "完成建筑以访问武器台",
        Handgun: "手枪",
        MP: "MP",
        Shotgun: "霰弹枪",
        AK: "AK",
        "For packin heat": "装填火药",
        "Complete building to access ammo bench": "完成建筑以访问弹药台",
        "Gun Powder": "火药",
        "Designer and craft designer outfits": "设计并制作设计师服装",
        "Complete building to access armour bench": "完成建筑以访问护甲台",
        "Craft Cloth Pants": "制作布裤",
        "Craft Cloth Jacket": "制作布夹克",
        "Complete building to access garage": "完成建筑以访问车库",
        Stinger: "毒刺",
        Efficiency: "效率",
        Capacity: "容量",
        "Active Raids": "活跃袭击",
        "Raid a Store": "袭击商店",
        "Awaiting Team": "等待团队",
        View: "查看",
        Raid: "袭击",
        "Team Size": "团队大小",
        "Raid a Farm": "袭击农场",
        Setup: "筹备",
        "Raid a Hospital": "袭击医院",
        "Manage Roles": "管理角色",
        Status: "状态",
        Role: "角色",
        Leader: "领导者",
        Manage: "管理",
        "Distilling Beer": "蒸馏啤酒",
        Distillers: "蒸馏器",
        pm: "下午",
        "Set up Raid on Farm": "筹备袭击农场",
        "Are you sure you want to set up raid on farm?": "你确定要筹备袭击农场吗",
        Team: "团队",
        Empty: "空",
        Join: "加入",
        "Cancel Raid": "取消袭击",
        Membership: "会员",
        "Membership lasts 31 days and is free during alpha": "会员将持续31天，并且在Alpha测试中是免费的",
        "Max Energy": "最大能量",
        "Energy Regeneration Rate": "能量恢复速度",
        "Receive Special Items Monthly": "每月获取特殊物品",
        "Support Us": "支持我们",
        "Everything is free during alpha": "在Alpha测试中，一切都是免费的",
        "If you'd like to support us and help with server and development costs, you can use the button below":
            "如果您愿意支持我们，帮助支付一些托管和开发费用，您可以使用下面的按钮",
        Deals: "优惠",
        Fuel: "燃料",
        Gears: "齿轮",
        Plastic: "塑料",
        Rope: "绳子",
        Steel: "钢铁",
        Oilcloth: "油布",
        Back: "返回",
        "Market Deals": "市场优惠",
        Gameplay: "游戏玩法",
        "Total Factions": "全部帮派",
        "Farm Items": "耕作物品",
        "Distill Items": "蒸馏物品",
        "Complete Raid": "完成袭击",
        "st January 2025 6PM": "日1月2025年 6PM",
        "Hello to all the Survivors of Zed City! Be it those who have been with us for years, or those who have joined just recently, we would like to thank every single one of you for participating in the closed alpha stage of Zed City. Despite the frankly inconvenient method of registration, so many have joined us over the years and helped bring the game to the state it is now":
            "致所有Zed City的幸存者们！无论是那些陪伴我们多年的玩家，还是最近加入的玩家，我们都要感谢你们每一位，感谢你们参与Zed City的封闭Alpha测试阶段。尽管注册方式确实不太方便，然而，依然有许多人加入我们，帮助游戏发展至今天的模样。",
        "Thanks to all of you, we can now move on to the open release stage of the game": "感谢你们，我们现在可以进入游戏的公开发布阶段。",
        "This means the server will be reset, and everything will be turned back to zero": "这意味着服务器将会重置，所有数据将被清空。",
        "Not to worry though, everything you have in the trophy section will be kept, including a little extra you will find post-reset as thanks for being with us in the alpha":
            "不过不必担心，奖杯部分的所有内容将被保留，并且作为对你们在Alpha阶段陪伴我们的感谢，重置后你们还会发现一些额外的奖励。",
        "With that said, enjoy the Purge for all it's worth, as the server will be closed and reset directly after the event is finished":
            "话虽如此，尽情享受这次大清洗活动吧，因为活动结束后，服务器将会关闭并重置。",
        "Once again, thank you all for being with us, and see you on the other side": "再次感谢你们的陪伴，期待在另一端再见。",
        "Seemingly out of nowhere, ash plumes cover the sky as a constant ashfall covers the surroundings in a bleak gray color":
            "似乎是突然之间，灰烬云覆盖了天空，持续的灰尘落下，把周围的环境染成了一片灰色。",
        "Fires in the wilderness spread as the few remaining signs of life in the world are snuffed out":
            "荒野中的火灾蔓延，世界上为数不多的生命迹象被扑灭。",
        "The Purge is upon you Survivor; do all you can because there is not much time left":
            "大清洗行动即将到来，幸存者们；尽你所能，因为时间所剩无几。",
        "You will find Gray Gary in the alleyways, or rather, he will find you. He will be your quest giver this event, leading you to discover all the unique items introduced for this event only, culminating in the special trophy for this event":
            "你将会在小巷里找到灰袍Gary，或者说，他会找到你。他将是这次活动的任务发布者，带领你发现本次活动专属的独特物品，最终将带来这次活动的特别奖杯。",
        "Event Time (UTC) : 20th December 2024 18:00:00 - 1st January": "活动时间（UTC）：2024年12月20日18:00:00 - 2025年1月1日",
        "Weapons and armour will be destroyed when it reaches 0% condition": "当武器和护甲的耐久度降至0%时，它们将被销毁。",
        "Trophy items have been made not tradable": "奖杯物品已被设置为不可交易。",
        "Messages icon has been removed from top menu until the feature is added": "顶部菜单中的消息图标已移除，直到该功能加入。",
        "Changes have been made to balance your fight stats growth, they will now improve more slowly at first but will accelerate as time goes on":
            "已对战斗数据增长做出平衡性调整，现在初期的战斗数据提升会较慢，但随着时间的推移将加速增长。",
        "The building level will now have less immediate impact but will offer more significant benefits in the long run":
            "建筑等级的影响现在不会那么直接，但长期来看将带来更为显著的益处。",
        "Requirements for each level upgrade have been adjusted": "每个等级升级的要求已做出调整。",
        "NPC Balancing": "NPC平衡性调整",
        "We have adjusted the stats of each zed to match the changes made to the fight stats growth":
            "我们已调整每个僵尸的属性，以适应战斗数据增长的变化。",
        "Difficulty Rating": "难度等级",
        "Each NPC will now have a difficulty rating so you can make a better decision on your ability to defeat them":
            "每个NPC现在都有一个难度等级，帮助你更好地评估自己是否能够击败它们。",
        Weakness: "弱点",
        "Choose your weapon wisely, zeds will now have a weakness to specific types of weapons":
            "选择武器时要谨慎，僵尸现在会对特定类型的武器有弱点。",
        "A detailed list of all the items in the game can be found in the wiki": "游戏中所有物品的详细列表可以在wiki中找到。",
        "Crafting will show a total time if you are crafting more than 1x": "如果你制作多个物品，制作时间将会显示总时长。",
        "Explore list has been ordered by travel time & difficulty rating": "探索列表将按照旅行时间和难度等级排序。",
        "The help page has been updated to include links to wiki + discord": "帮助页面已更新，包含了指向wiki和Discord的链接。",
        "XP Balancing": "XP平衡性调整",
        "Balancing changes have been made to xp payouts, gym training has been reduced slightly and more xp is given for hunting. Winning fights will give extra xp. Every quest objective will give at least 25xp":
            "XP奖励的平衡性调整已经做出，健身训练的XP稍微减少，而狩猎获得的XP更多。赢得战斗会额外获得XP。每个任务目标至少会奖励25XP。",
        'Tutorial Quest "Welcome to the end" has been re-written': "教程任务《欢迎来到末日》已重新编写。",
        "Difficulty has been reduced for new players in the Forest & Lake": "森林和湖泊地区的难度已减少，以帮助新玩家。",
        "Changed order of stronghold buildings (will only apply to new players": "强盗据点建筑的顺序已更改（仅对新玩家有效）。",
        "Adjusted the unlock level of Kitchen, Ammo Bench & Armour Bench": "厨房、弹药台和护甲台的解锁等级已调整。",
        "Fixed a bug where the explore landing page would show in the city": "修复了探索登陆页面在城市中显示的问题。",
        "Fixed a display bug on the locked message when you dont have a vehicle (inventory": "修复了当你没有车辆时，锁定信息显示的错误(仓库",
        "Added tooltip on locked blueprints to make it more obvious that you need to upgrade the building":
            "为锁定的蓝图添加了提示，以更明显地提醒你需要升级建筑。",
        "Fuel Depot (Explore Location": "燃料站（探索地点）",
        "Discover a new area packed with massive, abandoned fuel tankers, offering a prime opportunity to replenish your fuel reserves":
            "发现一个全新的区域，里面堆满了废弃的巨大油罐车，为补充你的燃料储备提供了绝佳的机会。",
        "Fuel weight has been reduced to 0.75kg": "燃料重量已减少至0.75kg。",
        "Bug causing tools to be taken with 1 use has been fixed": "修复了工具只可使用一次的问题。",
        "Foundation Pit will now cost rad immunity": "基础坑现在需要辐射免疫力。",
        Mission: "任务",
        "Welcome to the end, survivor. If you're still breathing, then you've got a chance—slim as it may be. But out here, everyone starts somewhere. Your first task? Head down to the old arcade. The place is crawling with zeds, mostly slow-moving crawlers, but don't get too comfortable. Even the weakest can tear you apart if you’re not careful":
            "欢迎来到末日，幸存者。如果你还活着，那么你还有机会——尽管微乎其微。但在这里，每个人都有一个起点。你的第一个任务？去旧的街机厅。那地方挤满了僵尸，大部分是缓慢爬行的怪物，但别太放松。即便是最弱的僵尸，如果你不小心，也能将你撕裂。",
        "Consider this your initiation. Clear out a few of those walkers, get a feel for how things are now. Survive this, and we’ll see if you’ve got what it takes to go further. Good luck—you’re gonna need it":
            "把这当作你的入门任务。清理掉一些那些行尸走肉，感受一下现在的局势。坚持下来，我们再看看你是否有能力走得更远。祝你好运——你会需要它的。",
        "Objective: Hunt a zed in the Arcade (Darkened Restrooms": "目标：在游戏厅（昏暗的洗手间）狩猎一只僵尸",
        Progress: "进度",
        Myena: "Myena",
        "You walk into a dark alley surrounded by street lamps on either side, hanging down from the street lamps is a spaghetti mess of entangled wires attached to powered bug zappers providing little light to the alley along with the faint buzzing noise of the power circulating around. The intrigue of other humans possibly surviving here draws you in, until you notice the hidden shadow of a slender woman sat against the walls of the alleyway. The shadowy figure begins to become clear as she lifts to her to look you up and down":
            "你走进一条黑暗的巷子，街灯两旁被杂乱的电线缠绕着，电击器发出的微弱光线照亮着巷道，同时伴随着电力流动时的嗡嗡声。你开始对这里可能还有其他幸存者产生兴趣，直到你注意到巷子墙角隐藏的身影，一位瘦削的女人坐在那里。她抬头看你，逐渐显现出她的模样。",
        "Another survivor eh? … It’s been a while since I’ve seen someone new around here. You must have got into the city just recently, I’m Myena - a ‘nightwalker’ of sorts, trading in information, scouting different locations and just generally surviving this forsaken wasteland":
            "另一个幸存者，嗯？……我很久没见到新面孔了。你应该是最近才进城的，我是Myena——某种意义上的‘夜行者’，交易信息、侦察不同的地点，反正就是在这个被遗弃的废土上生存。",
        "You stare for a moment waiting to see if you can offer anything in exchange for something of value":
            "你凝视着她，等待着看看自己是否能用什么交换一些有价值的东西。",
        "So, wanna make yourself useful? I need some fuel to help start fixing up my bike. Just a little will do. If you can go find some for me, I'll let you in on some valuable information. So what'ya say":
            "那么，想让自己变得有用吗？我需要一些燃料来修理我的摩托车，稍微一点就行。如果你能帮我找到一些，我就会告诉你一些有价值的信息。怎么样？",
        "Objective: Find fuel at Scrapyard": "目标：在废品场找到燃料",
        "Making your way through the city, a stray shadow catches your eye": "你穿行在城市中，一道漂浮的阴影吸引了你的注意。",
        "There, in an alley, stands a very tall man. Clad in all gray, from toe to wide-brimmed hat, he  looks very at home in the ash-covered surroundings. Even the sunglasses he's wearing are a slate gray that show no hint of the eyes behind them":
            "在那里，在一条巷子里，站着一个非常高大的男人。全身灰色打扮，从脚到宽边帽，看起来非常适应这片灰烬覆盖的环境。即便是他戴的太阳镜也是石板灰色，完全遮掩了眼睛。",
        "A raspy chuckle escapes him as he notices your attention, followed by the worst smoker's voice you have ever heard":
            "他注意到你的目光，发出沙哑的笑声，接着是你听过的最糟糕的烟民声音。",
        "Nice weather we're having, eh": "我们现在的天气真不错，嗯？",
        "The stranger puts a cigarette in his mouth and shields it as he goes to light it, taking a long drag from it right after":
            "那陌生人把烟塞进嘴里，遮住它点燃，随即深吸了一口。",
        "You know what, I like you, I can tell there is a strong fire burning inside you, or at least a stronger one than most of the yellowbellies around here... Call me Gray, Gray Gary. I think we will be good friends":
            "你知道吗，我喜欢你，我能看出你内心有着强烈的火焰，或者至少比这里大多数胆小鬼要强烈……叫我灰袍Gary吧。我觉得我们会是好朋友。",
        "A shiver runs down your spine but Gray continues right away": "一阵寒意袭过你的脊背，但Gray立刻继续说道。",
        "I have a special little reward that I think you will like. Bring me some Ash and I'll tell you more about it, hmm":
            "我有一个特别的奖励，我想你会喜欢。带些灰烬给我，我会告诉你更多，嗯。",
        "You look around you at all the ash falling from the sky and raise an eyebrow at him": "你四下环顾，看到满天的灰烬落下，不禁扬起一眉。",
        "Gray gives out another raspy chuckle and then speaks": "Gray再次发出沙哑的笑声，然后说道",
        "Not this regular, useless stuff, no. I need something a bit more special, fresh, in a sense. You'll know it when you see it, I assure you":
            "不是这种普通、没用的东西，不。我要的是一些更特别、更新鲜的东西。你看到时会知道的，我敢保证。",
        "Gray takes another long drag of his cigarette, nearly done with it already, and nods his head towards a direction behind you":
            "Gray再次深吸了一口烟，几乎快抽完了，他朝你身后点了点头。",
        "In fact, there is a nice new place in the city that should help you out": "实际上，城市里有个新地方，应该能帮到你。",
        "You instinctively glance behind you in the direction he nodded, and when you glance back he's already gone":
            "你本能地回头看向他点头的方向，转身时发现他已经不见了。",
        "Objective: Find enough ash to satisfy Gray Gary": "目标：找到足够的灰烬满足灰袍Gary",
        "Membership will last 31 days and is": "会员有效期为31天，并且是",
        "FREE in Alpha": "在Alpha阶段免费",
        "Energy Regeneration Speed": "能量恢复速度",
        "Recieve a special items every month": "每月接收一个特殊物品",
        "During alpha everything will be": "在Alpha阶段，一切都将是",
        FREE: "免费",
        "If you wish to support us by helping to cover some hosting & development costs, you can use the button below":
            "如果你希望通过帮助覆盖一些主机和开发费用来支持我们，可以使用下面的按钮。",
        Baton: "警棍",
        Bladed: "带刃",
        Switchblade: "弹簧刀",
        "Army Helmet": "军用头盔",
        Wrench: "扳手",
        "Loading Bay": "装载区",
        Hunt: "狩猎",
        "Storage Area": "储藏区",
        "Chemical Storage": "化学品储存",
        "Boiler Room": "锅炉房",
        "Refill Energy": "补充能量",
        "Refill Rad Immunity": "补充辐射免疫力",
        "Rusty machine that smells of fish oil and burnt plastic": "一台生锈的机器，散发着鱼油和烧焦塑料的味道",
        refiners: "精炼器",
        "Complete upgrade to access workers": "完成升级以解锁工人",
        "Extract Materials": "提取材料",
        Craft: "制作",
        "Extract Oils": "提取油料",
        "Refine Plastic": "精炼塑料",
        "Maintenance Room": "维修室",
        "Projection Room": "放映室",
        "Ticket Booths": "售票亭",
        "Main Theater Room": "主剧院室",
        "Toxic Dump Site": "有毒垃圾场",
        "Sewage Plant": "污水处理厂",
        Overpass: "天桥",
        "Sector-Z": "Z区",
        "Dining Area": "餐饮区",
        Restrooms: "洗手间",
        "Wine Cellar": "酒窖",
        "Kitchen Area": "厨房区",
        "Darkened Restrooms": "昏暗洗手间",
        "Concession Stand": "小吃摊",
        "Arcade Office": "游戏厅办公室",
        "Hall of Mirrors": "镜厅",
        "Parking Lot": "停车场",
        "Central Atrium": "中央中庭",
        "Food Court": "美食广场",
        "Sports Store": "体育用品店",
        Refill: "补充",
        Name: "名字",
        Topics: "话题",
        Replies: "回复",
        Author: "作者",
        "Last Post": "最后发布",
        "No topics were found": "无话题",
        "click here to create one": "点击此处创建一个话题",
        "Add Topic": "添加话题",
        of: "共",
        "Create Topic": "创建话题",
        Title: "标题",
        Write: "编写",
        Preview: "预览",
        Markdown: "Markdown",
        WYSIWYG: "所见即所得",
        Blockquote: "引用",
        Strike: "删除线",
        "Inline code": "内联代码",
        "Insert image": "插入图片",
        Italic: "斜体",
        Bold: "粗体",
        "Add Reply": "添加回复",
        Post: "发布",
        "months ago": "个月前",
        "Active a day ago": "1 天前在线",
        "Active a minute ago": "1 分钟前在线",
        "Active a month ago": "1 月前在线",
        "Active a year ago": "1 年前在线",
        "Active an hour ago": "1 小时前在线",
        "Active an hour ago": "1 小时前在线",
        leave: "离开",
        "Purge Event": "清洗活动",
        visit: "查看",
        "You gained": "你获得了",
        "Your rad is already full": "你的辐射值已经满了",
        "Your energy has been refilled": "你的能量已经重新填充",
        "Unrefined Plastic": "未精炼塑料",
        "Pumpkin Pie": "南瓜派",
        Revolver: "左轮手枪",
        Spear: "长矛",
        Wire: "铁丝",
        "Iron Ore": "铁矿石",
        Explosives: "爆炸物",
        Thread: "线",
        "Zed Juice": "僵尸汁",
        Water: "水",
        ZedBull: "僵尸红牛",
        Perch: "栖木",
        Tarp: "防水布",
        Lighter: "打火机",
        "Barracks key": "军营钥匙",
        "Police RFID": "警用射频ID",
        "A crafting bench is a sturdy table where manual work is done": "制作工作台是一个坚固的桌子，用来进行手工制作",
        "Complete building to access crafting bench": "完成建筑以访问制作工作台",
        Kwizine: "烹饪",
        None: "无",
        "Steel Fishing Rod": "钢制钓鱼竿",
        "Pro Fishing Rod": "专业钓鱼竿",
        "Items Farmed": "耕种的物品",
        "Items Distilled": "蒸馏的物品",
        "Raids Completed": "已完成的突袭",
        Search: "搜索",
        ID: "ID",
        "No survivors found": "未找到幸存者",
        "Top Crafter": "顶级工匠",
        "Top Forger": "顶级锻造者",
        "Top Hunter": "顶级猎人",
        "Top Scavenger": "顶级拾荒者",
        Offers: "出售订单",
        Carp: "鲤鱼",
        "Zen Egg": "禅蛋",
        "ZedBull Egg": "僵尸红牛蛋",
        "Witch's Brew": "巫师饮品",
        "Survivor Egg": "幸存者蛋",
        SMG: "冲锋枪",
        News: "新闻",
        "Create Account": "创建账户",
        "Logging Out": "登出",
        "Can You Survive": "你能生存吗",
        "Alpha in progress": "Alpha 测试进行中",
        "Join the discussion": "加入讨论",
        "We are currently in a closed alpha stage, you can get an access code from our discord server. We have a growing community on discord and would love for you to join us in creating the best Multiplayer Zombie Survival Simulator":
            "我们目前处于封闭的 Alpha 测试阶段，您可以通过我们的 Discord 服务器获取访问代码。我们在 Discord 上有一个不断壮大的社区，非常希望您加入我们，一起打造最好的多人僵尸生存模拟游戏",
        Register: "注册",
        Password: "密码",
        "Access Code": "访问代码",
        "You can request an access code on our discord server": "您可以在我们的 Discord 服务器上请求访问代码",
        "Display Name": "显示名称",
        "This field is required": "此字段为必填项",
        "Forgot password": "忘记密码",
        "Remember Me": "记住我",
        "Faction Base": "帮派基地",
        "Help Guide": "帮助",
        "Zed City": "Zed City",
        "Zed City | The Survival MMORPG": "Zed City | 生存MMORPG",
        "Loot Found Recently": "最近找到的战利品",
        "YOU LEVELED UP": "你升级了",
        Continue: "继续",
        "Canvas is not supported in your browser": "你的浏览器不支持Canvas",
        "Unknown Loot": "未知战利品",
        "Your scavenging skill level needs to be": "你的拾荒技能等级需要达到",
        Fish: "钓鱼",
        "gained every": "每",
        minutes: "分钟",
        "Booster (Energy Drink": "增强剂（能量饮料）",
        "Booster (Medical": "增强剂（医疗）",
        "Booster (Food": "增强剂（食物）",
        "Booster (Alcohol": "增强剂（酒精）",
        "Effect: Increases morale by 20 and booster cooldown by 30 minutes": "效果：增加士气20，增强剂冷却时间30分钟",
        "Effect: Increases morale by 100 and booster cooldown by 30 minutes": "效果：增加士气100，增强剂冷却时间30分钟",
        "Effect: Increases morale by 65 and booster cooldown by 30 minutes": "效果：增加士气65，增强剂冷却时间30分钟",
        "Effect: Increases morale by 10 and booster cooldown by 30 minutes": "效果：增加士气10，增强剂冷却时间30分钟",
        "Effect: Increases morale by 100, rad immunity by 10 and booster cooldown by 30 minutes":
            "效果：增加士气100，辐射免疫力10，增强剂冷却时间30分钟",
        "Effect: Increases energy by 25 and booster cooldown by 2 hours": "效果：增加能量25，增强剂冷却时间2小时",
        "Scuff Shotgun": "钝口霰弹枪",
        Sawnoff: "锯口霰弹枪",
        "angela deposited 9x Ash": "angela存入9个灰烬",
        "Your membership will expire in": "您的会员将在",
        "a month": "一个月后到期",
        "Effect: Increases morale by 50 and booster cooldown by 1 hour": "效果：增加50点士气和1小时的增益冷却时间",
        "Effect: Increases morale by 50, energy by 10, rad immunity by 5 and booster cooldown by 30 minutes":
            "效果：增加50点士气、10点能量、5点辐射免疫力和30分钟的增益冷却时间",
        "A long, thin strand of cotton used in sewing": "一条用于缝纫的长而细的棉线",
        "Made by carefully crushing the head of Zeds between two rocks": "通过小心地将僵尸的头部夹在两块岩石之间来制作",
        "Effect: Increases energy by 30 and booster cooldown by 2 hours": "效果：增加30点能量和2小时的增益冷却时间",
        "Effect: Increases morale by 100, energy by 25 and booster cooldown by 30 minutes": "效果：增加100点士气、25点能量和30分钟的增益冷却时间",
        "Effect: Increases morale by 500 and booster cooldown by 30 minutes": "效果：增加500点士气和30分钟的增益冷却时间",
        "Effect: Reduce recovery time by 10 minutes, increases life by 10 and medical cooldown by 5 minutes":
            "效果：减少10分钟的恢复时间，增加10点生命值和5分钟的医疗冷却时间",
        "Setup Raid a Farm": "筹备突袭农场",
        "Are you sure you want to setup Raid a Farm": "你确定要筹备突袭农场吗",
        "Join Raid": "加入突袭",
        "Are you sure you want to join this raid": "你确定要加入这次突袭吗",
        "You are already assigned to another activity": "你已经分配到另一个活动中",
        "Faction Activity": "帮派活动",
        "You already have an active membership": "你已经拥有会员资格",
        "You are no longer able to load ammo into your vehicle (all ammo can be fired without loading it into your vehicle":
            "你不再需要将弹药加载到车辆中（所有弹药可以直接发射，而无需先加载到车辆中）",
        "Ranged Weapons": "远程武器",
        "Expand your arsenal with the inclusion of weapons featuring ammo. Engage in the art of archery by crafting bows and arrows at your dedicated crafting bench":
            "通过加入具有弹药的武器来扩展你的武器库。在专用的制作工作台上制作弓箭，参与射箭艺术。",
        "Delve into the culinary arts by gathering ingredients in the kitchen to concoct delectable recipes. Savor the fruits of your labor as food items provide substantial morale boosts":
            "通过在厨房收集食材，制作美味的食谱，深入烹饪艺术。品尝你努力的成果，食物可以显著提升士气。",
        "A dedicated weapon bench has been established for the creation of firearms, offering survivors a new dimension in their arsenal":
            "已建立专用的武器台，用于制作火器，为幸存者的武器库增添了新的维度。",
        "Explore the intricacies of combat by crafting various ammo types at the specialized Ammo Bench. Each gun now demands specific ammunition, adding strategic depth to your battles":
            "在专门的弹药工作台上制作各种类型的弹药，深入探索战斗的细节。每把枪现在都需要特定的弹药，增加了战斗的战略深度。",
        Blueprints: "蓝图",
        "Unlock the secrets of the game with not all blueprints automatically revealed. Some must be discovered or purchased, adding an element of mystery and excitement to your journey":
            "解锁游戏的秘密，部分蓝图并非自动揭示，某些蓝图必须通过发现或购买，给你的旅程增添神秘和刺激的元素。",
        "Venture into revamped hunting locations, now featuring distinct rooms and an array of challenging NPCs with escalating difficulty levels":
            "探索重新设计的狩猎地点，现有独特的房间和一系列难度逐渐增加的挑战NPC。",
        "A donator store has been added where you can spend points on energy + rad immunity refills. A refill will be added to your account for every 1 week of inactivity":
            "新增了一个捐赠商店，你可以用积分购买能量和辐射免疫重置。每一周的不活跃都会为你的账户添加一次重置。",
        "Immerse yourself in the community with enhanced forums boasting improved post formatting and user-friendly layouts, ensuring a seamless and enjoyable interaction with fellow survivors":
            "沉浸在社区中，体验改进后的论坛，拥有更好的帖子格式和用户友好的布局，确保与其他幸存者的互动更加流畅愉快。",
        "The issue preventing workers from gaining farming/distillery XP has been successfully resolved": "解决了阻止工人获得农耕/酿酒经验的问题。",
        "Action names in farm, distillery & furnace have been fixed": "已修复农场、酿酒厂和熔炉中的动作名称。",
        "Number formatting has been fixed on team efficiency boost": "已修复团队效率提升中的数字格式。",
        "Create faction will not show if you are already in one": "如果你已经在一个派系中，将不会显示创建派系选项。",
        "Faction Roles": "派系角色",
        "Roles have been added to factions, allowing leaders to delegate and assign permissions to members. Custom names can be used which will be visible on the faction profile":
            "已为派系添加角色，允许领导者委派和分配权限给成员。可以使用自定义名称，这些名称将在派系资料页中显示。",
        "Daily Rations": "每日配给",
        "Factions now have the ability to allocate rations to members with roles, any member with rations assigned will be able to claim their allowance once per day":
            "派系现在可以分配配给给具有角色的成员，任何分配了配给的成员每天可以领取一次。",
        "Farm & Distillery": "农场与酿酒厂",
        "The farm and distillery are now upgradable allowing for a maximum of 5 workers to join when fully upgraded":
            "农场和酿酒厂现在可以升级，最大允许5名工人加入，升级完成后。",
        "Player Profiles": "玩家资料",
        "Basic profiles have been created, you can click on any display name in-game to see the players stats":
            "已创建基本的玩家资料，你可以点击游戏中的任何显示名称查看该玩家的统计数据。",
        "Resource bars will refill when activating membership": "激活会员后，资源条将自动填充。",
        "Fixed some layout issues on public homepage": "修复了公共主页上的一些布局问题。",
        "Radio tower bugs have been resolved": "已解决无线电塔的错误。",
        "Accepting / declining faction applications has been fixed": "接受/拒绝派系申请的功能已修复。",
        "Scavenges will not fail now if your morale is": "拾荒将不会失败，当士气为",
        "Players will be automatically logged in after creating an account": "创建账户后，玩家将自动登录。",
        "Improved number formatting on factions": "已改进派系中的数字格式。",
        "Active page on the menu has been fixed and should now work in most sub-pages": "菜单中的活动页面已修复，现在应在大多数子页面中正常工作。",
        "Clicking train in gym too fast would cause an error - this has been fixed": "在健身房点击训练过快会导致错误，这个问题已修复。",
        "Some pages have added caching so once it has been loaded it will not need to load again":
            "一些页面已添加缓存，加载完成后将不再需要重新加载。",
        "Added a link in donator house to help support us with development / hosting costs":
            "在捐赠者之家添加了一个链接，帮助我们支持开发/托管费用。",
        "Chance of success is now based on your scavenge level": "成功的几率现在基于你的垃圾捡拾技能等级。",
        "Morale will have a small boost to the chance of success": "士气将对成功几率产生小幅提升。",
        "A min level has been added to scrapyard": "垃圾场已添加最低等级要求。",
        'Scavenges will show a list of "Discovered Loot", the list of items will unlock as you find them':
            "垃圾捡拾将显示“已发现的战利品”列表，物品列表将在你找到它们时解锁。",
        "Luck skill maths have been changed to apply to all types of loot": "幸运技能的计算方式已更改，适用于所有类型的战利品。",
        "When a hunt is completed, you will be returned back to the same area": "完成狩猎后，你将返回同一地点。",
        "Bug has been fixed when ordering faction members by level or last active": "修复了按等级或最后活跃时间排序派系成员时出现的错误。",
        "Fixed a bug where leveling up would give the wrong energy if you have membership": "修复了拥有会员时升级给出错误能量的bug。",
        "Zed Wiki": "Zed 维基",
        "A community led wiki has been created to give a more detailed guide to the games features. You can access this by using the menu in the top left and going to Wiki. We would like to thank LadyGuenevere for her help on this":
            "已创建由社区主导的维基，提供更详细的游戏功能指南。你可以通过左上角的菜单访问维基。我们要感谢LadyGuenevere的帮助。",
        "The quest system has been refactored to meet the requirements of the upcoming explore feature, this will mean that your quest progress has been reset":
            "任务系统已重构，以适应即将发布的探索功能，这将意味着你的任务进度已被重置。",
        "Some other bug fixes and improvements for quests are": "一些其他关于任务的bug修复和改进：",
        "Fixed a bug when completing a quest without any rewards": "修复了完成任务时没有任何奖励的bug。",
        "Progress will now show on quest objectives": "任务目标的进度现在会显示出来。",
        "Membership will give you some points, increased max energy and regeneration times with more benefits to be added":
            "会员将给予你一些积分、增加最大能量和恢复次数，未来将增加更多福利。",
        "Survivors list & faction members will now show how long ago a player was last active": "幸存者列表和派系成员现在会显示玩家上次活跃的时间。",
        "Radio tower error on first load has been fixed": "首次加载时无线电塔的错误已修复。",
        "Radio tower & collecting from furnace / crafting bench will no longer add to notifications log":
            "无线电塔和从炉子/制作台收集物品将不再添加到通知日志中。",
        "Notifications will now work as expected when in a fight / injured": "在战斗中或受伤时，通知将按预期工作。",
        "Fixed a bug with limits on leaderboard counters": "修复了排行榜计数器的限制bug。",
        "Discord bot fixed a bug causing roles to be set incorrectly if the player had DM blocked":
            "Discord机器人修复了一个bug，解决了当玩家阻止私信时角色设置不正确的问题。",
        "A server migration has been completed to more efficient hardware and various security patches have been applied":
            "服务器迁移已完成，迁移到了更高效的硬件，并应用了各种安全补丁。",
        "Fixed broken error messages when trying to craft / smelt with not enough resources": "修复了在资源不足时尝试制作/熔炼时出现的错误信息。",
        "Fixed typo on notification sent when being kicked from a faction": "修复了被踢出派系时发送的通知中的拼写错误。",
        V: "V",
        "Added direct link for easier sign up with access code": "新增了直接链接，以便通过访问码更轻松地注册。",
        "Discord bot has been created to give out access codes": "已创建Discord机器人，发放访问码。",
        "Nicknames on discord will be set to your in-game username after you sign up using the code given to you":
            "在Discord上的昵称将在你使用给定的访问码注册后设置为你在游戏中的用户名。",
        "Added water as a requirement for brewing beer": "增加了水作为酿造啤酒的必要材料。",
        "Added city stats": "新增了城市统计数据。",
        "Fixed member leaving faction activity log": "修复了成员离开派系时活动日志的问题。",
        "Faction members will display in order of level with the leader first": "派系成员将按等级顺序显示，领导者排在最前面。",
        "Fixed avatar upload": "修复了头像上传的问题。",
        "Fixed mobile layout issue with faction stats": "修复了移动设备上派系统计数据的布局问题。",
        "Changed hover information for morale": "更改了士气的悬停信息。",
        "Fixed a bug where timers would disappear from the stats bar": "修复了计时器从统计条中消失的bug。",
        "Fixed a bug with pages on the survivors list": "修复了幸存者列表页面的bug。",
        "Added number formatting to hall of fame": "为名人堂添加了数字格式。",
        "Added detection of a new version with a notice to reload (this will be visible from the next update":
            "添加了新版本的检测和重新加载通知（将从下一个更新开始可见）。",
        "You can now create or join a faction to with other survivors, this will enable you to grow and brew new resources with the addition of Farm and Distillery. Teamwork will be required to produce resources more efficiently, new player skills have been added (Farming & Distilling), completing these actions will help you level up and give bigger efficiency boosts":
            "你现在可以创建或加入派系，与其他幸存者一起成长，并利用农场和酿酒厂生产新资源。团队合作将是提高资源生产效率的关键，新增了玩家技能（农耕和酿酒），完成这些行动将帮助你升级，并提供更大的效率提升。",
        "Complete raids with your faction to gain loot & faction respect": "与派系一起完成突袭，获得战利品和派系尊敬。",
        "Added notification system": "新增了通知系统。",
        "Gym pays out xp when training": "在健身房训练时，会发放经验值。",
        "A list of players can be found in City -> Survivors": "玩家列表可以在城市 -> 幸存者中找到。",
        "Quantity amounts now display correctly on Crafting & Furnace": "制作和炉子中的物品数量现在正确显示。",
        "Crawlers are easier to defeat": "爬行者更容易被击败。",
        "Resource bars will refill when leveling up": "升级时，资源条将自动填充。",
        "Page title (tab name) will change on different pages": "不同页面上的标签名将发生变化。",
        "Skills have been added to actions Scavenging, Hunting, Crafting & Forging. You will gain skill XP everytime you complete an action":
            "技能已添加到垃圾捡拾、狩猎、制作和锻造行动中。每次完成行动时，你将获得技能经验。",
        "Upgrade & progress bars should run smoothly now": "升级和进度条现在应该运行顺畅。",
        "Perks will allow you to upgrade your max rad immunity, max morale, max life, luck and all fight stats. Skill Points are gained for each level up, there will be more ways to gain them in the future. Your game stats will be available with your current hall of fame rank and a list of your active perks":
            "特权将允许你提升最大辐射免疫、最大士气、最大生命、幸运以及所有战斗统计数据。每次升级都会获得技能点，未来将有更多获得技能点的方法。你的游戏统计数据将与当前名人堂排名和活跃特权列表一起显示。",
        "News is available on the homepage": "新闻将在首页上显示。",
        "Updated homepage layout": "更新了首页布局。",
        "Added discord invite link to homepage": "在首页添加了Discord邀请链接。",
        "Hall of fame has been added to the city": "名人堂已添加到城市。",
        "Formatting has been added to stats bar": "已为统计条添加了格式。",
        "Added fix with recovering HP after being injured": "修复了受伤后恢复生命值的问题。",
        "On the login page, if you have an active session then you will be able to continue without logging in again":
            "在登录页面，如果你有一个活跃的会话，你将能够继续而不需要重新登录。",
        "Cleaned up old code": "清理了旧代码。",
        "Fixed bug stopping all apple devices working": "修复了阻止所有Apple设备正常工作的bug。",
        "Added report a bug to sub menu": "在子菜单中添加了报告bug功能。",
        "Halloween Event": "万圣节活动",
        "Happy Halloween": "万圣节快乐",
        "To celebrate the seasonal event, we have added a range of special items for you to find across zed city":
            "为了庆祝季节性活动，我们在Zed城添加了一系列特别物品供你寻找",
        "You can also check in with quest giver called Crazy Hari, who will reward you for finding them all with a special trophy item":
            "你还可以去找名为Crazy Hari的任务发布者，她会奖励你特别的奖杯物品，作为你找到所有物品的奖励",
        "Event Time (GMT): 30th October 2024 22:00:00 - 6th November": "活动时间（GMT）：2024年10月30日22:00:00 - 11月6日",
        Outposts: "前哨基地",
        PvP: "玩家对战",
        "Fight other players to gain control of key outposts scattered throughout Zed City. Outposts can be found in the Military Base, Demolition Site and Construction Yard. You can control up to 3 outposts, with each offering unique actions and new crafting recipes":
            "与其他玩家战斗，争夺分布在Zed城的关键前哨基地。前哨基地可以在军事基地、拆除场和建筑工地找到。你可以控制最多3个前哨基地，每个前哨基地提供独特的行动和新的制作配方",
        "Take over outposts and battle for dominance over the best land": "占领前哨基地，争夺最佳土地的统治权",
        "Take position in your outpost to defend it and defeat anyone attacking": "在你的前哨基地占据位置，防守并击败任何攻击者",
        "Be a contributor to war by manufacturing explosives or a defender of the peace by constructing defences":
            "通过制造炸药成为战争的贡献者，或者通过建造防御设施成为和平的捍卫者",
        "Explore Zones": "探索区域",
        "Visit the Demolition Site and Construction Yard to clear hoards of zombies and use new craftable picklocks to open locked gates. Explore through multiple zones to access increasingly rare loot drops":
            "前往拆除场和建筑工地，清除成群的僵尸，使用新的可制作开锁器打开锁住的门。通过多个区域探索，获取越来越稀有的战利品掉落",
        "New multi-zone environments, get lost and explore new lands": "新的多区域环境，迷失其中，探索新土地",
        "Key mechanics and respawning zeds in unique locations": "关键机制和在独特位置重生的僵尸",
        "Some blueprints will now require a minimum skill level": "一些蓝图现在需要最低技能等级",
        "Layout improvement has been made to fill in empty spaces on some pages": "已对一些页面进行了布局改进，以填补空白区域",
        "The order of permissions has been fixed when creating a faction role": "创建派系角色时，权限顺序已修复",
        "Faction profiles can now be visited while exploring": "在探索时可以查看派系档案",
        Login: "登录",
        'Added a "remember me" feature to ensure you stay logged in': "添加了“记住我”功能，以确保你保持登录状态",
        "Reduced amount of Advanced Tools required to craft a level 1 vehicle from 10 to": "减少了制作1级车辆所需的高级工具数量，从10个减少到",
        "When you attempt to craft a blueprint you don't have enough quantity for, it will now show how many items you have":
            "当你尝试制作一个蓝图而数量不足时，现在会显示你有多少物品",
        "Fishing has been expanded, train your new skill by catching a range of new fish, which can be found in various spots across the game. Three fishing rods have been added and they can be obtained in the crafting bench":
            "钓鱼系统已扩展，通过捕捉新的鱼类来训练你的新技能，鱼类可以在游戏中的不同地点找到。添加了三种钓鱼竿，可以在制作台获得",
        "A new building has been added to factions. Team up with faction members to produce new materials and train up your refinery skills":
            "派系中添加了一座新建筑。与派系成员组队，生产新材料并训练你的炼油技能",
        "Explore the reserve and try to catch some fish at the new spots, you may need to defeat some zeds before you are safe to explore":
            "探索保护区，并尝试在新地点捕捉一些鱼，在你安全探索之前，可能需要击败一些僵尸",
        "A new location to explore, gain access to new materials after you defeat the zeds lingering around the place":
            "一个新的探索地点，击败周围徘徊的僵尸后，你将能够获得新材料",
        "Various new trades have been made available in the radio tower": "无线电塔提供了各种新的交易",
        "Removed extra message when destroying / unloading items to reduce clicks": "删除了销毁/卸载物品时的额外信息，减少点击次数",
        "Health will no longer regenerate while you are in a fight": "在战斗中，健康将不再恢复",
        "Vehicle weight will now show to 2 decimal places": "车辆重量现在显示到小数点后两位",
        "Vehicle weight with easter eggs has been fixed": "复活节彩蛋的车辆重量已修复",
        "Fixed bug with radiation immunity not regenerating": "修复了辐射免疫无法恢复的漏洞",
        "Fixed issue showing incorrect quantity in scavenge": "修复了搜索中显示数量不正确的问题",
        "Fixed layout issue on market": "修复了市场布局问题",
        "Quest UI": "任务界面",
        "The quest layout has been updated, you can now see the progress on your objectives from the main quest list. You can click on completed objectives to view more information about them":
            "任务布局已更新，你现在可以从主任务列表查看目标进度。你可以点击已完成的任务来查看更多信息",
        "Travel time to Military Base has been increased to 1 hour": "前往军事基地的旅行时间已增加至1小时",
        "Flux has been added to some loot drops": "某些战利品掉落中已加入Flux",
        "Fixed a bug stopping you from adding the maximum items you have to the market": "修复了一个漏洞，导致你无法将所有物品添加到市场",
        "A bug causing radiation immunity to show 1 when you have none left has been resolved": "修复了一个漏洞，导致在辐射免疫耗尽时显示为1",
        "The page you are on will no longer be lost when you view an item in the market": "在市场查看物品时，当前页面将不会丢失",
        "An issue causing some old weapons to be lost has been fixed": "修复了导致一些旧武器丢失的问题",
        "Fixed a bug which allowed items to be repaired by loading them into a vehicle": "修复了允许通过将物品加载到车辆中来修复物品的漏洞",
        "Resolved a bug where some items bought from market / store would not be stacked": "解决了从市场/商店购买的一些物品无法堆叠的漏洞",
        "Item Market": "物品市场",
        "You can now trade with other survivors using the Market, browse through 100s of offers from other survivors and create up to 6 listings to sell your unwanted items":
            "你现在可以通过市场与其他幸存者交易，浏览来自其他幸存者的100多个报价，并创建最多6个列表来出售你不需要的物品",
        "Fixed layout issues with radio tower trades on mobile": "修复了在移动设备上无线电塔交易的布局问题",
        "Fixed bug which was selling the wrong items in stores": "修复了商店出售错误物品的漏洞",
        "Weapons for sale in store will now stack again": "商店出售的武器现在将再次堆叠",
        "A bug causing weapons to use durability with no ammo has been fixed": "修复了一个漏洞，导致武器在没有弹药的情况下消耗耐久度",
        "Fixed an issue where faction crafting was not showing items from faction storage": "修复了派系制作未显示来自派系储存物品的问题",
        "Inventory will now handle multiple pages without taking up a lot of space": "库存现在可以处理多页数据，而不会占用大量空间",
        "Item Durability": "物品耐久度",
        "Weapons, armour and equipment will now break after their condition reaches 0%. Weapons and armour will remain in your inventory, in a future update we will add ways for these to be dismantled / repaired":
            "武器、护甲和设备在其耐久度达到0%后将会损坏。武器和护甲将保留在你的库存中，在未来的更新中，我们将添加这些物品被拆解/修复的方法",
        "Scavenge Loot": "搜寻战利品",
        "Loot scavenged will no longer dispaly notifications, a new section has been added to show loot recently gained":
            "搜寻到的战利品将不再显示通知，已添加新部分来显示最近获得的战利品",
        "Fixed layout issues with item filters on inventory": "修复了库存中物品过滤器的布局问题",
        "Zed Bot has been updated to handle the full discord sign up process": "Zed Bot已更新，能够处理完整的Discord注册流程",
        'You can now use "Auto-Attack" in fights to automate the battle': "你现在可以在战斗中使用“自动攻击”来自动化战斗",
        "Easter Event": "复活节活动",
        "To all our dear players": "致所有亲爱的玩家",
        "As part of our ongoing improvements and features being rolled out during alpha, we have decided this Easter would be a great first candidate for a special holiday event. So with that said may we introduce to you the Great Easter Egg Hunt of 2024 in Zed City":
            "作为我们在alpha阶段推出的持续改进和新功能的一部分，我们决定这次复活节将是第一个特殊节日活动的绝佳候选者。我们很高兴向您介绍2024年Zed城的大复活节彩蛋狩猎",
        "Collect all these yummy eggs to receive special buffs and bonuses": "收集所有这些美味的彩蛋，获得特殊的增益效果和奖励",
        "You can also check in with a new holiday quest giver called Crazy Hari, who can find nothing better to do in the apocalypse but collect all the eggs for her collection":
            "你还可以去找一个新的节日任务发布者，名叫Crazy Hari，她在末日中找不到更好的事情做，只能为她的收藏收集所有彩蛋",
        "Throughout the event you can expect to find lots of common eggs in different scavenges and hunts. These can then be traded using the radio tower to get more rare eggs":
            "在活动过程中，你可以期待在不同的搜寻和狩猎中找到很多普通彩蛋。然后，你可以通过无线电塔交易这些彩蛋，获取更多稀有彩蛋",
        "If you collect an entire set, you can even trade it for the much prized and precious golden egg":
            "如果你收集了整套彩蛋，你甚至可以将其交易为珍贵的金蛋",
        "Event Time (GMT): 27th March 2024 22:00:00 - 2nd April": "活动时间（GMT）：2024年3月27日22:00:00 - 4月2日",
        "Crafting arrows and advanced tools can now be queued": "现在可以排队制作箭矢和高级工具",
        "Crafting time for advanced tools has been reduced to 15 mins": "高级工具的制作时间已减少至15分钟",
        "A bug causing new quests to show as completed has been resolved": "修复了一个漏洞，导致新任务显示为已完成",
        "Time formatting on farm & distillery for team efficiency have been fixed": "农场和酒厂的时间格式已修复，以提高团队效率",
        "A bug has been resolved which was stopping a full stack of items being loaded into a vehicle":
            "已解决一个漏洞，阻止了将完整堆叠的物品加载到车辆中",
        "Travel times will now be displayed on the explore locations": "旅行时间现在将在探索位置上显示",
        "You are no longer able to load ammo into your vehicle (all ammo can be fired without loading it into your vehicle)":
            "你现在无法将弹药加载到你的车辆中（所有弹药可以在没有加载到车辆中的情况下开火）",
        "Population counter has been added to explore locations": "已在探索位置添加人口计数器",
        "Quantity inputs will now use the numpad on mobile and tablet devices": "数量输入现在将在移动设备和平板设备上使用数字小键盘",
        "Quantity selector on all crafting benches has been replaced and now allows you to input a number":
            "所有制作台上的数量选择器已被替换，现在允许你输入数字",
        "Alpha introduction will be hidden if you are above level": "alpha介绍将被隐藏如果你的等级超过",
        "You can now explore remote locations in the pursuit of better resources and loot. Once your garage is built and the vehicle repaired, you will be able to travel to the military base. Your vehicle will have a weight capacity, so you will need to decide what valuable loot to transport back":
            "你现在可以探索偏远的地点，寻找更好的资源和战利品。一旦你的车库建好并修理好车辆，你就可以前往军事基地。你的车辆将有一个重量限制，因此你需要决定哪些有价值的战利品需要带回",
        "Garbo Quests": "Garbo任务",
        "To get started with explore and your new vehicle, head over to Garbo and finish up all his quests":
            "要开始探索和使用新车辆，请前往Garbo并完成他的所有任务",
        "Armour Crafting": "盔甲制作",
        "Craft your very own garb to defend yourself in the wasteland. Explore the military base and discover new blueprints to expand your fashionable collection":
            "制作你自己的盔甲，保卫自己在荒原中的安全。探索军事基地并发现新的蓝图，扩展你的时尚收藏",
        "Mini Boss NPC": "迷你Boss NPC",
        "Find a mini boss in the form of the Undead General, a small challenge for newer players to overcome while exploring the new military base":
            "找到一个迷你Boss，形态为不死将军，对于新手玩家来说，这是一个小挑战，在探索新的军事基地时，你将克服它",
        "Morale Boost": "士气提升",
        "Fixes have been made to morale boosting, when your player is over the morale limit you will now see a red timer indicating when your morale will reset":
            "已修复士气提升的问题，当你的玩家超过士气限制时，你将看到一个红色计时器，指示士气将何时重置",
        "Layout when consuming boosters has been updated": "消费增益时的布局已更新",
        "Fixed pagination on stores": "修复了商店中的分页问题",
        "Fixed issue causing page to reload when consuming items": "修复了消费物品时导致页面重新加载的问题",
        "Updated the quantity input to make the + and - buttons easier to click": "更新了数量输入，使+和-按钮更容易点击",
        "Response message will display when adding rations to a role": "添加配给到角色时将显示响应消息",
        "An issue stopping members being assigned to roles has been resolved": "已解决阻止成员分配角色的问题",
        "Fixed a bug where faction leaders were showing as members": "修复了派系领导显示为成员的漏洞",
        Food: "食物",
        "Morale gained from fish and other cooked items has been balanced": "从鱼和其他烹饪食物中获得的士气已平衡",
        "Restock times and max stock have been adjusted for Carp": "已调整鲤鱼的补货时间和最大库存",
        "Skills page has been split into a seperate page for Stats": "技能页面已拆分为单独的属性页面",
        "Fixed ammo not working on Handgun & Desert Eagle": "修复了手枪和沙漠之鹰无法使用弹药的问题",
        "Added level checks when building Kitchen, Ammo Bench & Weapon Bench": "在建造厨房、弹药台和武器台时已添加等级检查",
        "A bug where the menu would disappear in a fight has been resolved": "已解决在战斗中菜单消失的漏洞",
        "Embark on thrilling new adventures with the introduction of carefully crafted quests, each accompanied by specialized NPCs that promise a richer and more immersive storyline":
            "踏上激动人心的新冒险，介绍精心设计的任务，每个任务都伴随着专门的NPC，承诺提供更丰富和更沉浸的故事情节",
        "NPC Scaling": "NPC等级缩放",
        "Prepare for a heightened challenge as NPCs now boast levels ranging from 1 to 100. Witness their stats evolve in tandem with their levels, and reap the rewards of superior loot at higher tiers":
            "准备迎接更高的挑战，因为NPC现在拥有从1到100的等级。见证他们的属性随着等级的提升而变化，并在更高层次获得更好的战利品",
        "Scavanges will not fail now if your morale is": "现在如果你的士气足够，拾荒不会失败",
        "Clicking train in gym too fast would casue an error - this has been fixed": "在健身房点击训练过快会导致错误 - 已修复",
        "Fixed a bug with limits on leaderbord counters": "修复了排行榜计数器限制的错误",
        "Quest Progress": "任务进度",
        Fight: "战斗",
        Crawler: "爬行者",
        "Weakness: Blunt": "弱点：钝器",
        "Auto Attack": "自动攻击",
        "Fight Log": "战斗日志",
        "started an attack on": "开始攻击",
        Fists: "拳头",
        missed: "未击中",
        "with their": "用",
        "tried to bite": "试图咬",
        "but missed": "但未击中",
        hit: "击中",
        "and took": "并造成",
        "used its teeth to bite": "用牙齿咬",
        "Stop Auto": "停止自动攻击",
        "was defeated by": "被击败于",
        Complete: "完成",
        "Objective Completed": "目标完成",
        "So, you made it out in one piece. Not bad—for a beginner. But don’t get cocky; that was just a Crawler, the easiest of the lot. Out here, there are things way nastier waiting to tear into you. If you want to survive, you’re going to need a lot more than luck":
            "所以，你全身而退了。不算太差——对于一个新手来说。但别得意忘形；那只是爬行者，最简单的一个。在这里，有更可怕的东西等着撕碎你。如果你想生存下来，你需要的不只是运气",
        "I’d suggest you start training, get those instincts sharp. Strength alone won’t keep you alive in this wasteland. Prove to me you’re serious, and maybe, just maybe, you’ll stand a chance":
            "我建议你开始训练，磨砺你的本能。仅靠力量无法让你在这片荒原中存活。向我证明你是认真的，也许，仅仅是也许，你会有一线生机",
        "Objective: Train your skills in the Stronghold (Gym": "目标：在据点（健身房）训练你的技能",
        Completed: "已完成",
        "So, you’re starting to find your strength, huh? Good. But strength alone won’t keep you fed, warm, or armed out here. If you want a real chance at survival, you’ll need to gather resources—learn to live off this wasteland, bit by bit":
            "所以，你开始发现自己的力量了，是吗？很好。但仅靠力量无法让你在这里吃饱、保暖或武装起来。如果你想真正活下去，你需要收集资源——一点一点地学会依赖这片荒原生存",
        "Head into the Forest and keep an eye out for some logs. They’re scattered around, if you know where to look. Bring back a decent haul, and you’ll be one step closer to surviving another day":
            "进入森林，寻找一些原木。它们散落在四处，如果你知道该去哪里找。带回足够的收获，你就离再多活一天更近了一步",
        "Objective: Scavenge the Forest": "目标：搜寻森林",
        "Items Gained": "获得物品",
        "You’ve been out there—you know the risks of scavenging. Every time you step into the wasteland, you’re gambling with the radiation, the elements, and who knows what else. So while you’re taking a breather, let’s make sure you’re better prepared for the next run":
            "你已经在外面——你知道搜寻的风险。每次踏入荒原，你都在与辐射、自然环境以及未知事物赌博。所以在你喘口气的时候，让我们确保你为下一次行动做好更充分的准备",
        "Head back to your stronghold and set up a crafting bench. With that, you’ll be able to make use of whatever scraps and resources you bring back. It’s a small step, but trust me, it’ll make a big difference in keeping you alive out there":
            "回到你的据点，建立一个制作台。有了它，你就可以利用你带回的任何碎片和资源。这是一个小步骤，但相信我，它会对你在外面生存有很大的帮助",
        "Objective: Build crafting bench": "目标：建造制作台",
        Building: "建造中",
        Burn: "燃烧",
        "You’ve seen what you can create on the crafting bench, right? Those weapons and survival tools? Well, to keep making them, you need resources—and that means more scavenging":
            "你已经看到可以在制作台上制作什么了，对吧？那些武器和生存工具？不过，要继续制作它们，你需要资源——这意味着更多的搜寻",
        "Head into the Forest and gather some more logs. You’ll need plenty to keep your supplies stocked and your gear in top shape. Stay sharp, and don’t take any chances while you're out there":
            "进入森林，再收集一些原木。你需要大量的原木来保持物资充足和装备完好。保持警觉，不要冒险",
        "Upgrade Immunity": "升级免疫力",
        "Immunity Perk": "免疫力加成",
        "Max Rad Immunity": "最大辐射免疫",
        "Great! You’ve got the logs. Now, it’s time to turn them into something useful. Head to your crafting bench and craft yourself a baseball bat. It’s simple, but it’ll be a solid tool when you’re out there facing whatever comes your way":
            "很好！你已经拿到了原木。现在，是时候把它们变成有用的东西了。前往你的制作台，制作一根棒球棒。这很简单，但在面对外面的危险时，它会是一个可靠的工具",
        "Gear up, and get ready. You’ll be glad you have it": "装备起来，准备好。你会很庆幸拥有它",
        "Objective: Craft a baseball bat": "目标：制作棒球棒",
        Collect: "收集",
        "Now that you’ve crafted yourself a baseball bat, it’s time to put it to good use. Head back into the Arcade and take out more zeds. They’re still crawling around, but with your new weapon, you’ll have a much better shot at clearing them out":
            "现在你已经制作了一根棒球棒，是时候好好利用它了。回到游戏厅，清除更多的僵尸。它们仍然四处爬行，但有了你的新武器，你清除它们的机会会大得多",
        "Just remember: Always go equipped. The more prepared you are, the better your chances of making it out in one piece. Good luck":
            "记住：永远要做好装备准备。你准备得越充分，全身而退的机会就越大。祝你好运",
        "Objective: Kill 2 zeds in the Arcade (Darkened Restrooms": "目标：在游戏厅（昏暗的洗手间）杀死2个僵尸",
        INJURED: "受伤",
        "Fight Outcome": "战斗结果",
        "You are injured for": "你受伤",
        DEFEATED: "战败",
        VS: "VS",
        WINNER: "胜利",
        "will show a total time if you are crafting more than 1x": "如果你制作超过1个，将显示总时间",
        "Medical Bay Upgrade": "医疗间升级",
        "Item added to your inventory": "物品已添加到你的库存",
        Use: "使用",
        "Consume Item": "消耗物品",
        "Are you sure you want to use this": "你确定要使用这个吗",
        "Medical Cooldown": "医疗冷却时间",
        "Yeah, it's a lot easier to take down zeds with a weapon, but don’t get too caught up in the fighting. I need you to take a break from the hunt and head over to the Scrapyard. There’s scrap scattered around in there—metal, parts, whatever you can find":
            "是的，用武器击倒僵尸容易多了，但不要太沉迷于战斗。我需要你暂停狩猎，前往废料场。那里散落着废料——金属、零件，以及任何你能找到的东西",
        "Search the area and bring back any scrap you can collect. It’s all useful, and you’re gonna need it for what’s coming next":
            "搜索该区域，带回任何你能收集到的废料。这些都很有用，你将需要它们来应对接下来的挑战",
        "Objective: Scavenge the scrapyard 3x": "目标：在废品场搜寻3次",
        "Every piece of scrap metal you find can be more than just useful—it can be your ticket to survival and even a way to make a living. Melt it down into nails for building, forge it into weapons, or trade it for cash to get what you need":
            "你找到的每一块废金属不仅仅是有用——它可以是你生存的关键，甚至是谋生的方式。将它熔炼成建筑用的钉子，锻造成武器，或者用来交易换取你需要的东西",
        "Head back to your Stronghold and build a Furnace. With it, you’ll be able to refine all that scrap into something valuable, whether you're crafting or trading to keep yourself going":
            "回到你的据点，建造一个熔炉。有了它，你可以将所有废料精炼成有价值的东西，无论是用于制作还是交易，帮助你继续生存",
        "Objective: Build the Furnace": "目标：建造熔炉",
        "Now that you've gathered some scrap, it’s time to smelt it down into nails. These little things are essential for building and crafting, but don’t waste them—resources aren’t exactly easy to come by in this world. What you choose to do with them is up to you":
            "现在你已经收集了一些废料，是时候将它们熔炼成钉子了。这些小东西对建筑和制作至关重要，但不要浪费它们——在这个世界上资源并不容易获得。你决定如何使用它们",
        "You’ve learned the basics of survival, but there’s much more ahead. Build, hunt, explore—there’s a whole world out there still waiting to be discovered. Good luck... you're going to need it":
            "你已经学会了生存的基础知识，但前方还有更多挑战。建造、狩猎、探索——外面还有一个等待被发现的广阔世界。祝你好运……你会需要的",
        "Objective: Craft Nails": "目标：制作钉子",
        "Bench Level": "制作台等级",
        "Are you sure you want to cancel this raid": "你确定要取消这次突袭吗",
        Abort: "中止",
        "Setup Raid a Hospital": "筹备突袭医院",
        "Are you sure you want to setup Raid a Hospital": "你确定要筹备突袭医院吗",
        "You are already in a raid": "你已经在一次突袭中",
        "Setup Raid a Store": "筹备突袭商店",
        "Are you sure you want to setup Raid a Store": "你确定要筹备突袭商店吗",
        "Add Role": "添加角色",
        Roles: "角色",
        Edit: "编辑",
        "Manage Member": "管理成员",
        Kick: "踢出",
        "Camp Upgrade": "营地升级",
        "Update Role": "更新角色",
        "Role Name": "角色名称",
        Permissions: "权限",
        Management: "管理",
        "Allows the player to oversee and manage the agricultural activities within the community. They can start new crops and manage workers":
            "允许玩家监督和管理社区内的农业活动。他们可以种植新作物并管理工人",
        "Distillery Management": "酿酒厂管理",
        "Gives the player the authority to oversee and manage the distillery operations. They can produce beverages and manage workers":
            "赋予玩家监督和管理酿酒厂运作的权限。他们可以生产饮品并管理工人",
        "Refinery Management": "炼油厂管理",
        "Allows the player to oversee and manage the refinery activities within the community. They can start new refining processes and manage workers":
            "允许玩家监督和管理社区内的炼油活动。他们可以启动新的炼油流程并管理工人",
        "Storage Management": "仓库管理",
        "Allows the player to take items from the faction storage": "允许玩家从派系仓库取物品",
        "Manage Raids": "管理突袭",
        "Gives the player the authority to cancel raids and remove players from pending raids": "赋予玩家取消突袭和移除待处理突袭中玩家的权限",
        "Manage Applications": "管理申请",
        "Grants the ability to accept or decline applications": "授予接受或拒绝申请的能力",
        "Manage Buildings": "管理建筑",
        "Allows the player to initiate upgrades on any building with resources allocated from the faction storage":
            "允许玩家使用派系仓库分配的资源启动任何建筑的升级",
        "Kick Member": "踢出成员",
        "Grants the ability to kick members from the faction. The leader can not be kicked": "授予踢出派系成员的权限。领导者不能被踢出",
        Administrator: "管理员",
        "Gives the player full access to all permissions": "赋予玩家对所有权限的完全访问权限",
        Rations: "配给",
        "Add Rations": "添加配给",
        "Adrenaline Booster": "肾上腺素助推器",
        "Add Item": "添加物品",
        Barnaclefish: "藤壶鱼",
        "Effect: Increases energy by 250 and booster cooldown by 2 hours": "效果：增加250点能量，助推器冷却时间延长2小时",
        "Shotgun Slug": "霰弹枪弹丸",
        "Med Booster": "医疗助推器",
        "Effect: Reduce recovery time by 20 minutes, increases life by 20 and medical cooldown by 15 minutes":
            "效果：减少20分钟恢复时间，增加20点生命值，医疗冷却时间延长15分钟",
        "Med Kit": "医疗包",
        "Effect: Reduce recovery time by 1 hour, increases life by 50 and medical cooldown by 30 minutes":
            "效果：减少1小时恢复时间，增加50点生命值，医疗冷却时间延长30分钟",
        Morphine: "吗啡",
        "Small Med Kit": "小型医疗包",
        "Effect: Reduce recovery time by 30 minutes, increases life by 20 and medical cooldown by 10 minutes":
            "效果：减少30分钟恢复时间，增加20点生命值，医疗冷却时间延长10分钟",
        Coffee: "咖啡",
        "Effect: Increases morale by 75 and booster cooldown by 30 minutes": "效果：增加75点士气，助推器冷却时间延长30分钟",
        "Effect: Increases morale by 300 and booster cooldown by 30 minutes": "效果：增加300点士气，助推器冷却时间延长30分钟",
        "Effect: Increases morale by 125 and booster cooldown by 30 minutes": "效果：增加125点士气，助推器冷却时间延长30分钟",
        Vodka: "伏特加",
        "Effect: Increases rad immunity by 2 and booster cooldown by 1 hour": "效果：增加2点辐射免疫，助推器冷却时间延长1小时",
        Whiskey: "威士忌",
        "Effect: Increases rad immunity by 3 and booster cooldown by 1 hour": "效果：增加3点辐射免疫，助推器冷却时间延长1小时",
        Oil: "油",
        Rock: "岩石",
        Rockfish: "石鱼",
        Sandfish: "沙鱼",
        Tape: "胶带",
        Barricade: "路障",
        Bass: "鲈鱼",
        "Fishing Reel": "鱼线轮",
        "An essential item to make your rod work": "使鱼竿运作的必需品",
        High: "高",
        Binoculars: "双筒望远镜",
        "Helps you see": "帮助你看得更清楚",
        "Bronze Key": "青铜钥匙",
        Compass: "指南针",
        Crowbar: "撬棍",
        Flashlight: "手电筒",
        "Fuel Injector": "燃料喷射器",
        Lockpick: "开锁器",
        "Lucky coin": "幸运硬币",
        Map: "地图",
        Shovel: "铲子",
        Transceiver: "无线电收发器",
        "Donator Pack": "捐赠者礼包",
        "Role Updated": "角色已更新",
        "Raging Bloater": "狂怒膨胀者",
        "Weakness: Rifle": "弱点：步枪",
        Equip: "装备",
        "Equip Item": "装备物品",
        "Are you sure you want to equip this": "你确定要装备这个吗",
        "Item has been equipped": "物品已装备",
        Unequip: "卸下",
        Zombie: "僵尸",
        Drink: "饮用",
        "Raging Crawler": "狂怒爬行者",
        "Frenzied Zombie": "狂暴僵尸",
        "Weakness: Pistol": "弱点：手枪",
        "Frenzied Spitter": "狂暴喷吐者",
        "Weakness: Piercing": "弱点：穿刺",
        "Are you sure you want to drink this": "你确定要喝这个吗",
        "Booster Cooldown": "增强剂冷却时间",
        "Unequip Item": "卸下物品",
        "Are you sure you want to unequip this": "你确定要卸下这个吗",
        "Item has been unequipped": "物品已卸下",
        "Are you sure you want to cancel": "你确定要取消吗",
        Close: "关闭",
        "Market Offers": "市场报价",
        "Market Listings": "市场上架",
        "Create Listing": "创建上架",
        Select: "选择",
        Price: "价格",
        "fee will be deducted from the sale price": "费用将从销售价格中扣除",
        "Create Offer": "创建报价",
        "Your market offer has been created": "你的市场报价已创建",
        "Are you sure you want to remove this market listing": "你确定要移除这个市场上架吗",
        "Remove Listing": "移除上架",
        Points: "点数",
        "Faction Profile": "帮派资料",
        "You cannot buy your own item": "你不能购买自己的物品",
        money: "金钱",
        "Loaded with a good amount of the weird ash, you walk back to the alleyway you saw Gray": "带着大量奇怪的灰烬，你走回了你见到Gray的巷子",
        "Not even a few moments into your journey you hear the familiar raspy chuckle coming from a completely different alleyway. Turning your head, you see Gary standing there, staring at you with a grin on his face and lit cigarette in his lips":
            "刚开始几步，你就听到从完全不同的巷子里传来熟悉的沙哑笑声。你转过头，看到Gary站在那里，脸上带着笑容，嘴里叼着点燃的香烟",
        "Well look at that, seems you have some ash. Were you going to look for me? Well, then it's a happy coincidence I was in the area, eh":
            "哟，看起来你有些灰烬。你是来找我的吗？那真是巧了，我正好在附近",
        "Waving you towards the alley you cautiously follow him in, only going in far enough to be out of the view of the main street":
            "他向你挥手示意走进巷子，你小心地跟随他进去，只走到足够远以便不被主街看到",
        "Gary turns around and makes a 'gimme' gesture with a smirk on his face": "Gary转过身，露出一丝得意的笑容，做出“给我”手势",
        "You give him the ash and watch as he pokes it a bit with his finger before nodding in satisfaction":
            "你把灰烬递给他，看到他用手指戳了戳，然后满意地点点头",
        "Not bad, not bad at all. Now, about that reward of yours": "不错，不错。现在，关于你的奖励",
        "Humming, he takes a small drag of his cigarette before continuing": "他哼着歌，吸了一小口香烟，然后继续说道",
        "Now, there's a beautiful lil' memorabilia I have to give you, but I'll need you to do a bit more for me to part with it. The old guy in the new place has been working on some fancy new things and I can't get them from him myself. Be a dear and grab me one each of his vials so I can take a looksie at them, hmm":
            "现在，我有个漂亮的小纪念品要给你，但你得为我做点事才能得到它。那个新地方的老家伙在做一些花哨的新东西，而我自己拿不到。帮我拿一瓶他的新瓶子来，我好看看，怎么样",
        "Gary punctuates the request with a very long drag of his cigarette, enough to finish all that was left of it, and he blows out a massive cloud of smoke in your face":
            "Gary在说完请求后长时间吸了一口香烟，足够把它吸完，然后他朝你脸上吐出一大团烟雾",
        "By the time you wave it away, he's gone": "当你挥手把烟雾赶走时，他已经不见了",
        "Objective: Find the vials to satisfy Gray Gary": "目标：找到瓶子满足灰袍Gary",
        "Passing one more alleyway, you are ready to deliver the vials to Gray, and as soon as you have the thought the familiar raspy chuckle rings out from the empty alleyway you just passed. You turn back and there Gray is, leaning on the wall with a lit cigarette in his fingers":
            "经过另一条巷子，你准备把瓶子交给Gray，就在你有这个念头时，熟悉的沙哑笑声从你刚刚经过的空巷传来。你回头一看，Gray正靠在墙上，手指间夹着点燃的香烟",
        "Fancy seeing you here, eh? Now about them vials": "真巧在这儿见到你，怎么样，瓶子呢",
        "You hand them over one by one and watch the interest in his expression grow": "你一瓶一瓶地交给他，看着他脸上兴趣愈发浓厚",
        "Gray holds one up in the air and looks at it. Some trick in the light made it seem like there is a red glow behind his shades for a moment, but aside from just watching the vial he seems to do nothing":
            "Gray举起一瓶看着它。光线的某种折射让它看起来像是他的墨镜后面闪烁着红光，但除了看着瓶子，他似乎什么也没做",
        "Well, Mr Wrinkly-With-An-Attitude has outdone himself this time, this is good stuff":
            "好吧，这次那个态度十足的皱皮老头真是出乎意料，这可是好东西",
        "Satisfied with his inspection, Gray pockets all the vials and turns to you with a odd smile and a raised eyebrow":
            "Gray对他的检查很满意，把所有瓶子收进口袋，然后转身看着你，带着一丝奇怪的微笑和挑起的眉毛",
        "Now, I know exactly what you can do to earn yourself that nice reward. Get me two dozen of each different vial and a lot more of that ash from before and you'll we well rewarded, hmm":
            "现在，我知道你可以做什么来获得那份奖励。给我每种瓶子各拿两打，再加上更多的灰烬，你会得到很丰厚的奖励，怎么样",
        "Gray flicks the spent cigarette past you and walks away casually into the alleyway, his footsteps oddly loud":
            "Gray把用完的香烟弹过你，随意地走进巷子里，他的脚步声奇怪地响亮",
        "Don't worry about finding me, just get the stuff and you'll get your reward": "不用担心怎么找到我，只要拿到东西，你就能得到奖励",
        "You watch him walk away until he turns a corner and finally go back yourself as well, the empty alleyway still echoing with Gray's footsteps":
            "你看着他走到拐角处，直到他消失，你自己也回去了，空旷的巷子里依然回响着Gray的脚步声",
        "Objective: Procure a large number of vials and ash for Gray": "目标：为Gray获取大量瓶子和灰烬",
        Offline: "离线",
        "Offline for maintenance": "离线维护中",
        Retry: "重试",
        "Green Lab Games Ltd": "Green Lab Games有限公司",
        "Privacy Policy": "隐私政策",
        "Terms of Service": "服务条款",
        "Play Now": "立即游戏",
        "Learn More": "了解更多",
        "Deep Exploration": "深度探索",
        "Explore dark and infested locations around the map, working through each challenge and unlocking the next rooms until you find the supplies you're in need of to survive":
            "探索地图上黑暗且感染的地点，完成每个挑战并解锁下一间房间，直到找到你需要的生存物资。",
        "Develop your stronghold into a fully equipped base, with crafting stations, resources, and everything you need to thrive":
            "将你的据点发展成一个设施齐全的基地，配备制作站、资源和一切你需要的物资。",
        Alliances: "联盟",
        "Join forces with factions, building alliances and growing alongside other survivors": "与帮派联手，建立联盟，与其他幸存者共同成长。",
        "PvP Dominance": "PvP主宰",
        "Face off against other players in high-stakes PvP encounters to prove your dominance":
            "在高风险的PvP对战中与其他玩家对决，证明你的主宰地位。",
        "Trade and Prosper": "交易与繁荣",
        "Trade goods and rare items with others to grow your influence and wealth": "与他人交易商品和稀有物品，扩大你的影响力和财富。",
        "Blueprint Mastery": "蓝图精通",
        "Discover and craft blueprints to expand your abilities and customize your approach": "发现并制作蓝图，拓展你的能力，定制你的策略。",
        "Skillful Survival": "熟练的生存",
        "Shape your path by mastering skills like fishing, hunting, and many others essential for survival":
            "通过掌握钓鱼、狩猎等多种生存技能，塑造你的生存之路。",
        "We have a growing community on discord and would love for you to join us in creating the best Multiplayer Zombie Survival Simulator":
            "我们在Discord上有一个不断壮大的社区，欢迎你加入我们，共同打造最好的多人僵尸生存模拟器。",
        "Create a Survivor": "创建幸存者",
        "I agree to the Terms of Service": "我同意服务条款",
        "You must only register one account per person": "每人只能注册一个账户。",
        "Sign in with Discord": "通过Discord登录",
        "Survivor Name": "幸存者名称",
        "Your Stronghold": "你的据点",
        "Continue Playing": "继续游戏",
        "Open Release is now live": "公开发布现已上线",
        "We've been saying thank you left and right, so all that's left is this": "我们已经四处致谢，现在只剩下这一件事了",
        "Welcome to Zed City, everyone, and we hope you enjoy the full release as much as we enjoyed bringing it to you":
            "欢迎来到Zed City，我们希望你能像我们享受带来这款游戏一样，享受完整的发布内容。",
        "This is the final reset, any progress you make from here will be persistent": "这是最终的重置，从现在开始，你的所有进度都会被保存。",
        "Best of luck, Survivors": "祝你好运，幸存者们",
        "Economy Changes": "经济变动",
        "Value of most items changed by a factor of x": "大多数物品的价值变动了倍数 x",
        "Most stronghold building upgrades now require cash": "大多数据点建筑升级现在需要现金。",
        "Gym upgrade material costs changed": "健身房升级材料成本已更改。",
        "Scrap restock in junk store adjusted": "废品店的补货已调整。",
        "Faction creation now costs": "创建帮派现在需要花费",
        "Character level required to create faction increased from 5 to": "创建派系所需的角色等级从5提升到",
        Homepage: "主页",
        "New homepage look": "全新的主页界面",
        "Access codes no longer required": "不再需要邀请码。",
        "Login with discord account now possible": "现在可以通过Discord账号登录。",
        "Donator house temporarily offline": "捐赠者之家暂时下线。",
        "You need to be level": "你需要达到等级",
        "We thank you for taking part in alpha, your account has been reset and you have been awarded a special trophy for your help":
            "感谢你参与Alpha测试，你的账号已被重置，并为你的帮助颁发了一座特殊奖杯。",
        "Alpha Survivor": "Alpha测试幸存者",
        "Wow you already got that fuel huh! You're a real useful type huh. Alright well look let me tell you a bit more about the city and the who's who around these parts":
            "哇，你已经拿到那些燃料了？你真是个有用的人啊。好吧，让我跟你多讲讲这座城市和这里的那些人。",
        "You sit down while watching Myena refilling her bikes petrol tank": "你坐下来，看着Myena为她的摩托车加满油箱。",
        "So, I guess the first person you should go and see is Garbo. He's a real piece of work but if you got the parts then he's got the time":
            "所以，我想你应该先去见见Garbo。他是个古怪的人，但如果你有零件，他就有时间。",
        "Myena gives the bike a once over and tries the ignition": "Myena检查了一遍摩托车并尝试启动引擎。",
        "Things still not working, guess I'll be looking at the sparkies next then. Alright listen, Garbo is just around the corner from here. Has a workshop setup on top of the bridge. And hey, when you get back here, maybe could you bring me a water? I'm melting from all this work on the bike and that sure would wet my lips, if you know what I mean":
            "东西还是不能用，看来我接下来要检查火花塞了。好了听着，Garbo就在这附近。他在桥顶上建了一个作坊。对了，当你回来时，能不能给我带瓶水？修这辆摩托车让我快热化了，喝点水就能解渴了，你懂我的意思吧。",
        "Objective: Visit Garbo and Get Water": "目标：拜访Garbo并带回水",
        "Garbo's Junkyard": "Garbo的垃圾场",
        "Shady part of the City where we might find a blacksmith": "城市里一个阴暗的角落，我们可能会在那里找到一个铁匠。",
        "Upgrade Luck": "提升幸运值",
        "Luck Perk": "幸运技能",
        Garbo: "Garbo",
        "A large man stands by a hand made metal forge and an anvil. He looks over his tools and equipment, handling different objects, picking them up inspecting quickly and then placing them back down again, fiddling with a random assort of items while speaking to himself in confused muddled sentences":
            "一个大块头男人站在手工打造的金属炉和铁砧旁。他查看着自己的工具和设备，拿起不同的物品快速检查后再放回原位，一边摆弄着各种乱七八糟的物件，一边自言自语着一些混乱不清的句子。",
        "Scrap? Metals? Titanium!!! Ohhhh titanium, I love titanium. Ohhhhh what I’d do to rub my fingers across some titanium. Oh. Huh. Oh, I see you. Come here, what have you got in your pockets":
            "废料？金属？钛！！！哦，钛，我爱钛。哦，我多想摸摸钛。哦。嗯？哦，我看到你了。过来，你口袋里有什么？",
        "He pulls you in and rifles through your pockets": "他把你拉过去，翻找你的口袋。",
        "Oh no no no, all pretty useless. You’re not a very good hoarder are you": "哦，不不不，都是些没用的东西。你可不是个合格的囤货者，对吧。",
        "He pushes you away in disinterest": "他失去兴趣地把你推开。",
        "Come back when you've got something of value to me": "等你有对我有价值的东西再回来吧。",
        "Objective: Provide iron bars": "目标：提供铁锭",
        "Upgrade Morale": "提升士气",
        "Upgrade Life": "提升生命值",
        "Upgrade Strength": "提升力量",
        "Upgrade Defense": "提升防御",
        "Upgrade Speed": "提升速度",
        "Upgrade Agility": "提升敏捷",
        "Coming Soon": "即将推出",
        "Donator House is coming soon": "捐赠者之家即将推出",
        "Create Faction": "创建帮派",
        "No factions found": "未找到帮派",
        "Faction Name": "帮派名称",
        Create: "创建",
        "Please enter a faction name": "请输入帮派名称",
        Lockpicks: "撬锁工具",
        "Cloth Jacket": "布质夹克",
        "Social Logins": "社交帐号登录",
        "An unknown error occurred": "发生未知错误",
        Chainsaw: "电锯",
        Drill: "钻机",
        "Fire Axe": "消防斧",
        Machete: "砍刀",
        "Meat Cleaver": "剁肉刀",
        "Magazine Size": "弹匣容量",
        "Chain Shotgun": "链式霰弹枪",
        "Camo Hat": "迷彩帽",
        "Cowboy Hat": "牛仔帽",
        "Gas Mask": "防毒面具",
        "Riot Helmet": "防暴头盔",
        Sunglasses: "太阳镜",
        "Barrel Vest": "桶形背心",
        "Body Vest": "防护背心",
        "Camo Vest": "迷彩背心",
        "Hazmat Jacket": "防护服夹克",
        "Leather Jacket": "皮夹克",
        "Padded Vest": "衬垫背心",
        "Armoured Pants": "装甲裤",
        "Army Pants": "军裤",
        "Camo Pants": "迷彩裤",
        "Cargo Pants": "工装裤",
        "Cargo Shorts": "工装短裤",
        "Heavily Armoured Pants": "重装甲裤",
        Jeans: "牛仔裤",
        "Jogging Bottoms": "跑步裤",
        "Knee Pads": "护膝",
        "Padded Pants": "衬垫裤",
        "Sweat Pants": "运动裤",
        "Swim Shorts": "游泳短裤",
        "Army Boots": "军靴",
        "Camo Boots": "迷彩靴",
        "Hazmat Boots": "防护靴",
        Sandals: "凉鞋",
        "Soldier Boots": "士兵靴",
        "Trekking Boots": "徒步靴",
        "Work Boots": "工作靴",
        "Giant Pufferfish": "巨型河豚",
        "Golden Egg": "金蛋",
        "Golden Skull": "金色头骨",
        "Monster Catfish": "怪物鲶鱼",
        "Viper Barnaclefish": "毒蛇藤壶鱼",
        "Unlock with membership": "会员解锁",
        "Item not found": "未找到物品",
        "Invalid price": "价格无效",
        "Offer not found": "未找到出售订单",
    };

    // 词典：待处理
    const dictPending = {
        Seach: "搜索",
        consumable_special: "consumable_special",
    };

    // 词典：wiki网站专用，请勿混放
    const dictWiki = {};

    const dictAll = { ...dictCommon, ...dictPending, ...dictWiki };
    const dictAllLowerCase = {};
    for (const key in dictAll) {
        dictAllLowerCase[key.toLowerCase()] = dictAll[key];
    }

    // 翻译网页标题
    // document.querySelector("title").textContent

    startTranslatePage();

    function startTranslatePage() {
        translateNode(document.body);

        const observerConfig = {
            attributes: false,
            characterData: true,
            childList: true,
            subtree: true,
        };

        const observer = new MutationObserver(function (e) {
            observer.disconnect();
            for (const mutation of e) {
                if (mutation.type === "childList") {
                    for (const node of mutation.addedNodes) {
                        translateNode(node);
                    }
                } else {
                    if (mutation.target) {
                        translateNode(mutation.target);
                    }
                }
            }
            observer.observe(document.body, observerConfig);
        });

        observer.observe(document.body, observerConfig);
    }

    function translateNode(node) {
        if (node.nodeName === "SCRIPT" && node.nodeName === "STYLE" && node.nodeName === "TEXTAREA") {
            return;
        }

        if (node.placeholder) {
            translatePlaceholder(node);
        }

        if ((!node.childNodes || node.childNodes.length === 0) && node.textContent) {
            translateTextNode(node);
        }

        if (node.childNodes) {
            for (const subnode of node.childNodes) {
                translateNode(subnode);
            }
        }
    }

    function translatePlaceholder(node) {
        node.placeholder = dict(node.placeholder);
    }

    function translateTextNode(node) {
        if (!node.parentNode) {
            return;
        }

        // 排除个人资料页中帮派名
        if (node.parentNode.classList.contains("username")) {
            return;
        }

        // 排除右上角菜单中人物ID
        if (node.parentNode.classList.contains("text-subtitle1") && node.parentNode.parentNode.querySelector(".zed-avatar.non-selectable")) {
            return;
        }

        if (
            window.location.href.includes("www.zed.city/factions/") ||
            (window.location.href.includes("www.zed.city/faction/") && !window.location.href.includes("/activity"))
        ) {
            // 排除帮派成员页面中帮派名
            if (node.parentNode.matches("div.text-center.text-h4.text-uppercase.text-no-bg")) {
                return;
            }
            // 排除帮派成员页面中帮派职位
            if (
                node.parentNode.classList.contains("col-shrink") &&
                (node.parentNode.closest("tr")?.querySelector(".status-online") || node.parentNode.closest("tr")?.querySelector(".status-offline"))
            ) {
                return;
            }
        } else if (window.location.href === "https://www.zed.city/factions") {
            if (node.parentNode.parentNode.matches("td.q-td.text-left")) {
                return;
            }
        } else if (window.location.href.includes("www.zed.city/forum/")) {
            // 排除论坛
            if (node.parentNode.closest(".q-tr.topic-row")) {
                return;
            }
            if (node.parentNode.closest(".title") && node.parentNode.closest(".title").parentNode.querySelector(".forum-text")) {
                return;
            }
            if ((node.parentNode.closest(".markdown-text") && node.parentNode.closest(".forum-text")) || node.parentNode.closest(".forum-username")) {
                return;
            }
            if (node.parentNode.closest(".toastui-editor-main-container")) {
                return;
            }
        } else if (window.location.href.includes("www.zed.city/profile/")) {
            // 排除个人资料页中人物ID
            if (
                node.parentNode.classList.contains("text-h4") &&
                (node.parentNode.parentNode.querySelector(".status-online") || node.parentNode.parentNode.querySelector(".status-offline"))
            ) {
                return;
            }
        }

        let dictResult = null;
        // 战斗日志中，可能有人物ID
        if (node.parentNode.matches(".log-name") || node.parentNode.matches(".player-name")) {
            dictResult = dict(node.textContent, true);
        } else {
            dictResult = dict(node.textContent);
        }

        if (dictResult !== node.textContent) {
            node.parentNode.setAttribute("script_translated_from", node.textContent);
            node.textContent = dictResult;
        }
    }

    function dict(oriText, ignoreUnmatchDueToBeingPossiblePlayerID = false) {
        if (!oriText) {
            return;
        }
        let text = oriText;

        // 排除规则
        for (const exclude of excludes) {
            if (exclude.toLowerCase() === text.toLocaleLowerCase()) {
                return text;
            }
        }
        for (const excludeReg of excludeRegs) {
            if (excludeReg.test(text)) {
                return text;
            }
        }

        // XX时间前在线
        if (/^Active (\d+) minutes ago$/.test(text)) {
            let res = /^Active (\d+) minutes ago$/.exec(text);
            return res[1] + " 分钟前在线";
        }
        if (/^Active (\d+) hours ago$/.test(text)) {
            let res = /^Active (\d+) hours ago$/.exec(text);
            return res[1] + " 小时前在线";
        }
        if (/^Active (\d+) days ago$/.test(text)) {
            let res = /^Active (\d+) days ago$/.exec(text);
            return res[1] + " 天前在线";
        }
        if (/^Active (\d+) months ago$/.test(text)) {
            let res = /^Active (\d+) months ago$/.exec(text);
            return res[1] + " 月前在线";
        }
        if (/^Active (\d+) years ago$/.test(text)) {
            let res = /^Active (\d+) years ago$/.exec(text);
            return res[1] + " 年前在线";
        }

        // 帮派日志
        if (/^([\w\s]+) has joined the faction$/.test(text)) {
            let res = /^([\w\s]+) has joined the faction$/.exec(text);
            return res[1] + " 加入了帮派";
        }
        if (/^([\w\s]+) has been kicked from the faction$/.test(text)) {
            let res = /^([\w\s]+) has been kicked from the faction$/.exec(text);
            return res[1] + " 被踢出了帮派";
        }
        if (/^([\w\s]+) upgraded ([\w\s]+) to level (\d+)$/.test(text)) {
            let res = /^([\w\s]+) upgraded ([\w\s]+) to level (\d+)$/.exec(text);
            return res[1] + " 将" + dict(res[2]) + " 升级至 " + res[3] + " 级";
        }
        if (/^([\w\s]+) deposited (\d+)x ([\w\s-']+)$/.test(text)) {
            let res = /^([\w\s]+) deposited (\d+)x ([\w\s-']+)$/.exec(text);
            return res[1] + " 存入了 " + res[2] + "x " + dict(res[3]);
        }
        if (/^([\w\s]+) took (\d+)x ([\w\s-']+)$/.test(text)) {
            let res = /^([\w\s]+) took (\d+)x ([\w\s-']+)$/.exec(text);
            return res[1] + " 取出了 " + res[2] + "x " + dict(res[3]);
        }
        if (/^(\d+)x ([\w\s-']+) added to faction storage$/.test(text)) {
            let res = /^(\d+)x ([\w\s-']+) added to faction storage$/.exec(text);
            return res[1] + "x " + dict(res[2]) + " 加入了帮派仓库";
        }
        if (/^([\w\s,-]+) completed ([\w\s-]+) gaining (\d+) respect, (.+)$/.test(text)) {
            let res = /^([\w\s,-]+) completed ([\w\s-]+) gaining (\d+) respect, (.+)$/.exec(text);
            return res[1].replaceAll(" and", ", ") + " 完成了 " + dict(res[2]) + " 获得了 " + res[3] + " 声望, " + parseReceiveItemsLog(res[4]);
        }
        function parseReceiveItemsLog(text) {
            let input = text;
            let result = "";
            if (input.endsWith("!")) {
                input = input.substring(0, input.length - 1);
            }
            for (const s of input.replaceAll(", ", " & ").split(" & ")) {
                if (/^(\d+)x ([\w\s-']+)$/.test(s)) {
                    let res = /^(\d+)x ([\w\s-']+)$/.exec(s);
                    result += res[1] + "x " + dict(res[2]) + " & ";
                } else {
                    result += s;
                }
            }
            if (result.endsWith(" & ")) {
                result = result.substring(0, result.length - 3);
            }
            return result + "!";
        }

        // 通知
        if (/^Your application for ([\w\s]+) has been accepted$/.test(text)) {
            let res = /^Your application for ([\w\s]+) has been accepted$/.exec(text);
            return "您的申请 " + res[1] + " 已通过";
        }
        if (/^([\w]+) bought (\d+)x ([\w\s-']+) and you gained \$(\d{1,3}(?:,\d{3})*), your market listing has sold out$/.test(text)) {
            let res = /^([\w]+) bought (\d+)x ([\w\s-']+) and you gained \$(\d{1,3}(?:,\d{3})*), your market listing has sold out$/.exec(text);
            return `${res[1]} 购买了 ${res[2]}x ${dict(res[3])}，你获得了 $${res[4]}，你的市场上架已售空`;
        }
        if (/^([\w]+) bought (\d+)x ([\w\s-']+) and you gained \$(\d{1,3}(?:,\d{3})*), your market listing has sold$/.test(text)) {
            let res = /^([\w]+) bought (\d+)x ([\w\s-']+) and you gained \$(\d{1,3}(?:,\d{3})*), your market listing has sold$/.exec(text);
            return `${res[1]} 购买了 ${res[2]}x ${dict(res[3])}，你获得了 $${res[4]}，你的市场上架已售出`;
        }
        if (/^([\w\s]+) skill level increased$/.test(text)) {
            let res = /^([\w\s]+) skill level increased$/.exec(text);
            return dict(res[1]) + "技能等级提升";
        }

        // 你没有足够的XX
        if (/^You do not have enough ([\w\s-']+)$/.test(text)) {
            let res = /^You do not have enough ([\w\s-']+)$/.exec(text);
            return "你没有足够的" + dict(res[1]);
        }

        // 制作XX
        if (/^Craft ([\w\s-']+)$/.test(text)) {
            let res = /^Craft ([\w\s-']+)$/.exec(text);
            return "制作" + dict(res[1]);
        }
        if (
            !text.toLowerCase().startsWith("crafting bench") &&
            !text.toLowerCase().startsWith("crafting bench upgrade") &&
            /^Crafting ([\w\s-']+)$/.test(text)
        ) {
            let res = /^Crafting ([\w\s-']+)$/.exec(text);
            return "正在制作" + dict(res[1]);
        }
        if (/^Forge ([\w\s-']+)$/.test(text)) {
            let res = /^Forge ([\w\s-']+)$/.exec(text);
            return "锻造" + dict(res[1]);
        }
        if (/^Forging ([\w-']+)$/.test(text)) {
            let res = /^Forging ([\w\s-']+)$/.exec(text);
            return "正在锻造" + dict(res[1]);
        }
        if (/^Farm ([\w\s-']+)$/.test(text)) {
            let res = /^Farm ([\w\s-']+)$/.exec(text);
            return "种植" + dict(res[1]);
        }

        // 拾荒
        if (/^You scavenged the ([\w\s-']+) but didn't manage to find anything$/.test(text)) {
            let res = /^You scavenged the ([\w\s-']+) but didn't manage to find anything$/.exec(text);
            return "你在" + dict(res[1]) + "中搜寻但没有找到任何东西";
        }
        if (/^You scavenged the ([\w\s-']+) and found$/.test(text)) {
            let res = /^You scavenged the ([\w\s-']+) and found$/.exec(text);
            return "你在" + dict(res[1]) + "中搜寻并发现了";
        }
        if (/^x ([\w\s-']+)$/.test(text)) {
            let res = /^x ([\w\s-']+)$/.exec(text);
            return "x " + dict(res[1]);
        }
        if (/^You do not have a ([\w\s-']+)$/.test(text)) {
            let res = /^You do not have a ([\w\s-']+)$/.exec(text);
            return "你没有" + dict(res[1]);
        }
        if (/^You gained ([\d+])([\w\s-']+)$/.test(text)) {
            let res = /^You gained ([\d+])([\w\s-']+)$/.exec(text);
            return "你获得了 " + res[1] + dict(res[2]);
        }

        // 战斗
        if (/^You defeated the ([\w\s-']+) and gained$/.test(text)) {
            let res = /^You defeated the ([\w\s-']+) and gained$/.exec(text);
            return "你击败了 " + res[1] + "并获得";
        }

        // 未分类
        if (/^Build ([\w\s-']+)$/.test(text)) {
            let res = /^Build ([\w\s-']+)$/.exec(text);
            return "建造" + dict(res[1]);
        }
        if (/^You have ran out of ([\w\s-']+)!$/.test(text)) {
            let res = /^You have ran out of ([\w\s-']+)!$/.exec(text);
            return "你已经用完了" + res[1] + "！";
        }
        if (/^You bought ([\d+])([\w\s-']+)$/.test(text)) {
            let res = /^You bought ([\d+])([\w\s-']+)$/.exec(text);
            return "你购买了 " + res[1] + dict(res[2]);
        }
        if (/^Kick ([\w]+)$/.test(text)) {
            let res = /^Kick ([\w]+)$/.exec(text);
            return "踢除" + res[1];
        }
        if (/^Are you sure you want to kick ([\w]+)$/.test(text)) {
            let res = /^Are you sure you want to kick ([\w]+)$/.exec(text);
            return "是否确定踢除" + res[1];
        }
        if (/^([\w\s-']+) Upgrade$/.test(text)) {
            let res = /^([\w\s-']+) Upgrade$/.exec(text);
            return dict(res[1]) + "升级";
        }

        // 消除后面空格
        if (/^(.+?)(\s+)$/.test(text)) {
            let res = /^(.+?)(\s+)$/.exec(text);
            return dict(res[1]) + res[2];
        }

        // 消除前面空格
        if (/^(\s+)(.+)$/.test(text)) {
            let res = /^(\s+)(.+)$/.exec(text);
            return res[1] + dict(res[2]);
        }

        // 消除后面的非字母
        if (/^(.+?)([^a-zA-Z]+)$/.test(text)) {
            let res = /^(.+?)([^a-zA-Z]+)$/.exec(text);
            const dict1 = dict(res[1], ignoreUnmatchDueToBeingPossiblePlayerID);
            if (res[2] === "." && dict1.endsWith("。")) {
                return dict1;
            } else if (dict1.endsWith("。") && !res[2].endsWith(".")) {
                return dict1;
            } else if (!dict1.endsWith("。") && res[2].endsWith(".")) {
                return dict1 + res[2].replaceAll(".", "。");
            } else if (!dict1.endsWith("。") && res[2].endsWith(")")) {
                return dict1;
            } else if (res[2] === '."' && dict1.endsWith("。")) {
                return dict1 + res[2].charAt(1);
            } else if (res[2] === '?"' && dict1.endsWith("？")) {
                return dict1 + res[2].charAt(1);
            } else if (res[2] === ")" && (dict1.endsWith("）") || dict1.endsWith("）。"))) {
                return dict1;
            } else if (res[2] === ")." && dict1.endsWith("）。")) {
                return dict1;
            } else if (res[2] === "!" && dict1.endsWith("。")) {
                return dict1.substring(0, dict1.length - 1) + res[2];
            } else if (res[2] === ":" && dict1.endsWith("：")) {
                return dict1;
            } else {
                return dict1 + res[2];
            }
        }

        // 消除前面的非字母
        if (/^([^a-zA-Z]+)(.+)$/.test(text)) {
            let res = /^([^a-zA-Z]+)(.+)$/.exec(text);
            return res[1] + dict(res[2], ignoreUnmatchDueToBeingPossiblePlayerID);
        }

        // 结尾复数
        if (text.toLowerCase().endsWith("es") && dict[text.toLowerCase().slice(0, -2)]) {
            return dict[text.toLowerCase().slice(0, -2)];
        }
        if (text.toLowerCase().endsWith("s") && dict[text.toLowerCase().slice(0, -1)]) {
            return dict[text.toLowerCase().slice(0, -1)];
        }

        if (dictAllLowerCase[text.toLowerCase()]) {
            return dictAllLowerCase[text.toLowerCase()];
        } else {
            if (window.location.href.includes("www.zed.city") && !ignoreUnmatchDueToBeingPossiblePlayerID) {
                if (!unmatchedTexts.includes(text)) {
                    unmatchedTexts.push(text);
                }
                console.log(unmatchedTexts);
            }
            return oriText;
        }
    }
})();
