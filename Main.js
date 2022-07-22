var __extends = (this && this.__extends) || (function () { 
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//function randint(a:number,b:number):number{return Math.floor(a + Math.random() * ((b - a) + 1));}
function ceviri(name) {
    if (name === "Food")
        return "Yiyecek";
    else if (name === "Water")
        return "Su";
    else if (name === "Firewood")
        return "Yakacak Odun";
}
var WRITE = /** @class */ (function () {
    function WRITE() {
        this.icerik = "";
        this.web = true;
    }
    WRITE.prototype.WriteLine = function (x) {
        this.icerik = this.icerik + (x + "\n");
    };
    WRITE.prototype.Write = function (x) {
        this.icerik = this.icerik + x;
    };
    WRITE.prototype.ReadLine = function () {
        var don = prompt(this.icerik);
        this.icerik = "";
        return don;
    };
    WRITE.prototype.Init = function () {
        alert(this.icerik);
        this.icerik = "";
    };
    return WRITE;
}());
var IO = new WRITE();
var Inventory = /** @class */ (function () {
    function Inventory() {
        this.water = false;
        this.food = false;
        this.firewood = false;
        this.damage = 0;
        this.armor = 0;
        this.wName = "";
        this.aName = "";
    }
    Inventory.prototype.getWater = function () { return this.water; };
    Inventory.prototype.setWater = function (water) { this.water = water; };
    Inventory.prototype.getFood = function () { return this.food; };
    Inventory.prototype.setFood = function (food) { this.food = food; };
    Inventory.prototype.getFirewood = function () { return this.firewood; };
    Inventory.prototype.setFirewood = function (firewood) { this.firewood = firewood; };
    Inventory.prototype.getDamage = function () { return this.damage; };
    Inventory.prototype.setDamage = function (damage) { this.damage = damage; };
    Inventory.prototype.getArmor = function () { return this.armor; };
    Inventory.prototype.setArmor = function (armor) { this.armor = armor; };
    Inventory.prototype.getWname = function () { return this.wName; };
    Inventory.prototype.setWname = function (wName) { this.wName = wName; };
    Inventory.prototype.getAname = function () { return this.aName; };
    Inventory.prototype.setAname = function (aName) { this.aName = aName; };
    return Inventory;
}());
var Obstacle = /** @class */ (function () {
    function Obstacle(name, damage, health, award, maxNumber) {
        this.name = name;
        this.damage = damage;
        this.award = award;
        this.health = health;
        this.maxNumber = maxNumber;
    }
    Obstacle.prototype.count = function () {
        return Math.floor(1 + Math.random() * ((this.maxNumber - 1) + 1));
    };
    Obstacle.prototype.getName = function () { return this.name; };
    Obstacle.prototype.setName = function (name) { this.name = name; };
    Obstacle.prototype.getDamage = function () { return this.damage; };
    Obstacle.prototype.setDamage = function (damage) { this.damage = damage; };
    Obstacle.prototype.getAward = function () { return this.award; };
    Obstacle.prototype.setAward = function (award) { this.award = award; };
    Obstacle.prototype.getHealth = function () { return this.health; };
    Obstacle.prototype.setHealth = function (health) { this.health = health; };
    Obstacle.prototype.getMaxnumber = function () { return this.maxNumber; };
    Obstacle.prototype.setMaxnumber = function (maxNumber) { this.maxNumber = maxNumber; };
    return Obstacle;
}());
var Vampire = /** @class */ (function (_super) {
    __extends(Vampire, _super);
    function Vampire() {
        return _super.call(this, "Vampir", 4, 14, 7, 3) || this;
    }
    return Vampire;
}(Obstacle));
var Zombie = /** @class */ (function (_super) {
    __extends(Zombie, _super);
    function Zombie() {
        return _super.call(this, "Zombi", 3, 10, 4, 3) || this;
    }
    return Zombie;
}(Obstacle));
var Bear = /** @class */ (function (_super) {
    __extends(Bear, _super);
    function Bear() {
        return _super.call(this, "Ayi", 7, 20, 12, 2) || this;
    }
    return Bear;
}(Obstacle));
var Location_ = /** @class */ (function () {
    function Location_(player) {
        this.player = player;
    }
    Location_.prototype.getPlayer = function () { return this.player; };
    Location_.prototype.setPlayer = function (player) { this.player = player; };
    Location_.prototype.getName = function () { return this.name; };
    Location_.prototype.setName = function (name) { this.name = name; };
    return Location_;
}());
var NormalLoc = /** @class */ (function (_super) {
    __extends(NormalLoc, _super);
    function NormalLoc(player, name) {
        var _this = _super.call(this, player) || this;
        _this.name = name;
        return _this;
    }
    NormalLoc.prototype.getLocation = function () {
        return true;
    };
    return NormalLoc;
}(Location_));
var BattleLoc = /** @class */ (function (_super) {
    __extends(BattleLoc, _super);
    function BattleLoc(player, name, obstacle, award) {
        var _this = _super.call(this, player) || this;
        _this.obstacle = obstacle;
        _this.name = name;
        _this.award = award;
        return _this;
    }
    BattleLoc.prototype.getLocation = function () {
        var obsCount = this.obstacle.count();
        IO.WriteLine("Suan " + this.getName() + " adli yerdesin");
        IO.WriteLine("Dikkatli ol! Burada " + obsCount + " tane " + this.obstacle.getName() + " yasiyor!");
        IO.WriteLine("<S>avas veya <K>ac");
        var selCase = IO.ReadLine();
        selCase = selCase.toUpperCase();
        if (selCase === "S") {
            if (this.combat(obsCount)) {
                IO.WriteLine(this.getName() + " bolgesindeki butun dusmanlari temizledin!");
                if (this.award === "Food" && !(this.player.getInv().getFood())) {
                    IO.WriteLine("Yiyecek Kazandin!");
                    this.player.getInv().setFood(true);
                }
                else if (this.award === "Water" && !(this.player.getInv().getWater())) {
                    IO.WriteLine("Su Kazandin!");
                    this.player.getInv().setWater(true);
                }
                else if (this.award === "Firewood" && !(this.player.getInv().getFirewood())) {
                    IO.WriteLine("Yakacak Odun Kazandin!");
                    this.player.getInv().setFirewood(true);
                }
                if (IO.web)
                    IO.Init();
                return true;
            }
            if (this.player.getHealthy() <= 0) {
                IO.WriteLine("Oldun!");
                return false;
            }
        }
        return true;
    };
    BattleLoc.prototype.combat = function (obsCount) {
        for (var i = 0; i < obsCount; i++) {
            var defObsHealth = this.obstacle.getHealth();
            this.playerStats();
            this.enemyStats();
            while (this.player.getHealthy() > 0 && this.obstacle.getHealth() > 0) {
                IO.WriteLine("<V>ur veya <K>ac");
                var selCase = IO.ReadLine();
                selCase = selCase.toUpperCase();
                if (selCase === "V") {
                    /*7:11 78*/
                    IO.WriteLine("Vurdun!");
                    this.obstacle.setHealth(this.obstacle.getHealth() - this.player.getTotalDamage());
                    //afterHit();
                    IO.WriteLine("Oyuncu Cani : " + (this.player.getHealthy() > 0 ? this.player.getHealthy() : 0));
                    IO.WriteLine(this.obstacle.getName() + " Cani : " + (this.obstacle.getHealth() > 0 ? this.obstacle.getHealth() : 0));
                    IO.WriteLine("");
                    if (this.obstacle.getHealth() > 0) {
                        if (IO.web)
                            IO.Init();
                        IO.WriteLine(this.obstacle.getName() + " sana vurdu!");
                        var canKaydet = this.player.getHealthy();
                        this.player.setHealthy(this.player.getHealthy() - (this.obstacle.getDamage() - this.player.getInv().getArmor()));
                        this.player.setHealthy(canKaydet < this.player.getHealthy() ? canKaydet - 1 : this.player.getHealthy());
                        IO.WriteLine("Oyuncu Cani : " + (this.player.getHealthy() > 0 ? this.player.getHealthy() : 0));
                        IO.WriteLine(this.obstacle.getName() + " Cani : " + (this.obstacle.getHealth() > 0 ? this.obstacle.getHealth() : 0));
                        //afterHit();
                    }
                }
                else
                    return false;
            }
            if (this.obstacle.getHealth() < this.player.getHealthy()) {
                IO.WriteLine("Dusmani yendin!");
                this.player.setMoney(this.player.getMoney() + this.obstacle.getAward());
                IO.WriteLine("Guncel Paran : " + this.player.getMoney());
                this.obstacle.setHealth(defObsHealth);
                if (IO.web)
                    IO.Init();
            }
            else
                return false;
            if (!(IO.web))
                IO.WriteLine("-------------------");
        }
        return true;
    };
    BattleLoc.prototype.playerStats = function () {
        IO.WriteLine("Oyuncu Degerleri\n-------------------");
        IO.Write("Can : ");
        IO.Write(this.player.getHealthy() + "");
        IO.Write("  Hasar : " + this.player.getTotalDamage());
        IO.WriteLine("  Para : " + this.player.getMoney());
        if (this.player.getInv().getDamage() > 0)
            IO.WriteLine("Silah : " + this.player.getInv().getWname());
        if (this.player.getInv().getArmor() > 0)
            IO.WriteLine("Zirh : " + this.player.getInv().getAname());
        IO.WriteLine("");
    };
    BattleLoc.prototype.enemyStats = function () {
        IO.WriteLine(this.obstacle.getName() + " Degerleri\n-------------------");
        IO.Write("Can : " + this.obstacle.getHealth());
        IO.Write("  Hasar : " + this.obstacle.getDamage());
        IO.WriteLine("  Odul : " + this.obstacle.getAward());
        IO.WriteLine("");
        if (IO.web)
            IO.Init();
    };
    return BattleLoc;
}(Location_));
var Forest = /** @class */ (function (_super) {
    __extends(Forest, _super);
    function Forest(player) {
        return _super.call(this, player, "Orman", new Vampire(), "Firewood") || this;
    }
    return Forest;
}(BattleLoc));
var River = /** @class */ (function (_super) {
    __extends(River, _super);
    function River(player) {
        return _super.call(this, player, "Nehir", new Bear(), "Water") || this;
    }
    return River;
}(BattleLoc));
var Cave = /** @class */ (function (_super) {
    __extends(Cave, _super);
    function Cave(player) {
        return _super.call(this, player, "Magara", new Zombie(), "Food") || this;
    }
    return Cave;
}(BattleLoc));
var SafeHouse = /** @class */ (function (_super) {
    __extends(SafeHouse, _super);
    function SafeHouse(player) {
        return _super.call(this, player, "Guvenli Ev") || this;
    }
    SafeHouse.prototype.getLocation = function () {
        this.player.setHealthy(this.player.getRhealthy()); /////
        IO.WriteLine("Iyilestin...");
        IO.WriteLine("Suan Guvenli Ev adli yerdesin.");
        if (IO.web)
            IO.Init();
        return true;
    };
    return SafeHouse;
}(NormalLoc));
var ToolStore = /** @class */ (function (_super) {
    __extends(ToolStore, _super);
    function ToolStore(player) {
        return _super.call(this, player, "Magaza") || this;
    }
    ToolStore.prototype.getLocation = function () {
        IO.WriteLine("Para : " + this.player.getMoney());
        IO.WriteLine("1. Silahlar");
        IO.WriteLine("2. Zirhlar");
        IO.WriteLine("3. Cikis");
        IO.Write("Secimin : ");
        var selTool = parseInt(IO.ReadLine());
        var selItemID;
        switch (selTool) {
            case 1:
                selItemID = this.weaponMenu();
                this.buyWeapon(selItemID);
                break;
            case 2:
                selItemID = this.armorMenu();
                this.buyArmor(selItemID);
                break;
        }
        return true;
    };
    ToolStore.prototype.armorMenu = function () {
        if (IO.web)
            IO.WriteLine("Para : " + this.player.getMoney());
        IO.WriteLine("1. Hafif  <Para : 15 - Hasar : 1>");
        IO.WriteLine("2. Orta   <Para : 25 - Hasar : 3>");
        IO.WriteLine("3. Agir   <Para : 40 - Hasar : 5>");
        IO.WriteLine("4. Cikis");
        IO.Write("Zirh sec : ");
        var selWeaponID = parseInt(IO.ReadLine());
        return selWeaponID;
    };
    ToolStore.prototype.weaponMenu = function () {
        if (IO.web)
            IO.WriteLine("Para : " + this.player.getMoney());
        IO.WriteLine("1. Tabanca <Para : 25 - Hasar : 2>");
        IO.WriteLine("2. Kilic   <Para : 35 - Hasar : 3>");
        IO.WriteLine("3. Tufek   <Para : 45 - Hasar : 7>");
        IO.WriteLine("4. Cikis");
        IO.Write("Silah sec : ");
        var selWeaponID = parseInt(IO.ReadLine());
        return selWeaponID;
    };
    ToolStore.prototype.buyArmor = function (itemID) {
        var avoid = 0;
        var price = 0;
        var aName = "";
        switch (itemID) {
            case 1:
                avoid = 1;
                aName = "Hafif Zirh";
                price = 15;
                break;
            case 2:
                avoid = 3;
                aName = "Orta Zirh";
                price = 25;
                break;
            case 3:
                avoid = 5;
                aName = "Agir Zirh";
                price = 40;
                break;
            default:
            case 4:
                IO.WriteLine("Cikis Yapiliyor...");
                if (IO.web)
                    IO.Init();
                break;
                IO.WriteLine("Gecersiz Islem!");
                if (IO.web)
                    IO.Init();
                break;
        }
        if (price > 0) {
            if (this.player.getMoney() >= price) {
                this.player.getInv().setArmor(avoid);
                this.player.getInv().setAname(aName);
                this.player.setMoney(this.player.getMoney() - price);
                IO.WriteLine(aName + " satin aldin, Engellenen Hasar : " + this.player.getInv().getArmor());
                IO.WriteLine("Kalan Para : " + this.player.getMoney());
            }
            else
                IO.WriteLine("Para yetersiz!");
            if (IO.web)
                IO.Init();
        }
    };
    ToolStore.prototype.buyWeapon = function (itemID) {
        var damage = 0;
        var price = 0;
        var wName = "";
        switch (itemID) {
            case 1:
                damage = 2;
                wName = "Tabanca";
                price = 25;
                break;
            case 2:
                damage = 3;
                wName = "Kilic";
                price = 35;
                break;
            case 3:
                damage = 7;
                wName = "Tufek";
                price = 45;
                break;
            default:
            case 4:
                IO.WriteLine("Cikis Yapiliyor...");
                if (IO.web)
                    IO.Init();
                break;
                IO.WriteLine("Gecersiz Islem!");
                if (IO.web)
                    IO.Init();
                break;
        }
        if (price > 0) {
            if (this.player.getMoney() >= price) {
                this.player.getInv().setDamage(damage);
                this.player.getInv().setWname(wName);
                this.player.setMoney(this.player.getMoney() - price);
                IO.WriteLine(wName + " satin aldin, Onceki hasar : " + this.player.getDamage() + ", Yeni hasar : " + (this.player.getTotalDamage()));
                IO.WriteLine("Kalan Para : " + this.player.getMoney());
            }
            else
                IO.WriteLine("Para yetersiz!");
            if (IO.web)
                IO.Init();
        }
    };
    return ToolStore;
}(NormalLoc));
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
        this.inv = new Inventory();
    }
    Player.prototype.selectCha = function () {
        switch (this.chaMenu()) {
            case 1:
                this.initPlayer("Samuray", 5, 21, 15);
                break;
            case 2:
                this.initPlayer("Okcu", 7, 18, 20);
                break;
            case 3:
                this.initPlayer("Sovalye", 8, 24, 5);
                break;
            default:
                this.initPlayer("Samuray", 5, 21, 15);
                break;
        }
        IO.WriteLine("Karakter Olusturuldu!  \nAdi : " + this.getCname() + "    Hasar : " + this.getDamage() + "    Saglik : " + this.getHealthy() + "    Para : " + this.getMoney());
        if (IO.web)
            IO.Init();
    };
    Player.prototype.chaMenu = function () {
        IO.WriteLine("Lutfen bir karakter sec : ");
        IO.WriteLine("1- Samuray  Hasar : 5  Saglik : 21  Para : 15");
        IO.WriteLine("2- Okcu     Hasar : 7  Saglik : 18  Para : 20");
        IO.WriteLine("3- Sovalye  Hasar : 8  Saglik : 24  Para : 5");
        IO.Write("Karakter secimin :");
        var chaID = parseInt(IO.ReadLine());
        while (chaID < 1 || chaID > 3) {
            if (IO.web) {
                IO.WriteLine("Lutfen gecerli bir karakter sec :");
                IO.WriteLine("Lutfen bir karakter sec : ");
                IO.WriteLine("1- Samuray  Hasar : 5  Saglik : 21  Para : 15");
                IO.WriteLine("2- Okcu  	  Hasar : 7  Saglik : 18  Para : 20");
                IO.WriteLine("3- Sovalye  Hasar : 8  Saglik : 24  Para : 5");
                IO.Write("Karakter secimin :");
            }
            else {
                IO.Write("Lütfen geçerli bir karakter seç : ");
            }
            chaID = parseInt(IO.ReadLine());
        }
        return chaID;
    };
    Player.prototype.getTotalDamage = function () {
        return this.getDamage() + this.getInv().getDamage();
    };
    Player.prototype.initPlayer = function (cName, dmg, hlthy, mny) {
        this.setCname(cName);
        this.setDamage(dmg);
        this.setHealthy(hlthy);
        this.setMoney(mny);
        this.setRhealthy(hlthy);
    };
    Player.prototype.getDamage = function () { return this.damage; };
    Player.prototype.setDamage = function (damage) { this.damage = damage; };
    Player.prototype.getHealthy = function () { return this.healthy; };
    Player.prototype.setHealthy = function (healthy) { this.healthy = healthy; };
    Player.prototype.getMoney = function () { return this.money; };
    Player.prototype.setMoney = function (money) { this.money = money; };
    Player.prototype.getName = function () { return this.name; };
    Player.prototype.setName = function (name) { this.name = name; };
    Player.prototype.getCname = function () { return this.cName; };
    Player.prototype.setCname = function (cName) { this.cName = cName; };
    Player.prototype.getInv = function () { return this.inv; };
    Player.prototype.setInv = function (inv) { this.inv = inv; };
    Player.prototype.getRhealthy = function () { return this.rHealthy; };
    Player.prototype.setRhealthy = function (rHealthy) { this.rHealthy = rHealthy; };
    return Player;
}());
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.login = function () {
        IO.WriteLine("Macera Oyununa Hosgeldin!");
        IO.Write("Oyuna baslamadan once adini gir:");
        var playerName = IO.ReadLine();
        this.player = new Player(playerName);
        this.player.selectCha();
        this.start();
    };
    Game.prototype.start = function () {
        for (;;) {
            if (!(IO.web)) {
                IO.WriteLine("");
                IO.WriteLine("-----------------------------------------------");
                IO.WriteLine("");
            }
            else
                IO.WriteLine("-----------------------------------------------");
            IO.WriteLine("Eylem gerceklestirmek icin bir yer sec :");
            IO.WriteLine("1. Guvenli Ev --> Sana ait guvenli bir mekan, dusman yok!");
            IO.WriteLine("2. Magara --> Karsina belki zombi cikabilir!");
            IO.WriteLine("3. Orman -->  Karsina belki vampir cikabilir!");
            IO.WriteLine("4. Nehir -->  Karsina belki ayi cikabilir!");
            IO.WriteLine("5. Magaza --> Silah veya Zirh alabilirsin!");
            IO.Write("Gitmek istedigin yer : ");
            var selLoc = parseInt(IO.ReadLine());
            while (selLoc < 0 || selLoc > 5) {
                if (IO.web) {
                    IO.WriteLine("Lutfen gecerli bir yer sec :");
                    IO.WriteLine("1. Guvenli Ev --> Sana ait guvenli bir mekan, dusman yok!");
                    IO.WriteLine("2. Magara --> Karsina belki zombi cikabilir!");
                    IO.WriteLine("3. Orman -->  Karsina belki vampir cikabilir!");
                    IO.WriteLine("4. Nehir -->  Karsina belki ayi cikabilir!");
                    IO.WriteLine("5. Magaza --> Silah veya Zirh alabilirsin!");
                    IO.Write("Gitmek istedigin yer : ");
                }
                else
                    IO.Write("Lutfen gecerli bir yer sec :");
                selLoc = parseInt(IO.ReadLine());
            }
            var evMi = false;
            switch (selLoc) {
                case 1:
                    evMi = true;
                    this.location = new SafeHouse(this.player);
                    break;
                case 2:
                    this.location = new Cave(this.player);
                    break;
                case 3:
                    this.location = new Forest(this.player);
                    break;
                case 4:
                    this.location = new River(this.player);
                    break;
                case 5:
                    this.location = new ToolStore(this.player);
                    break;
                default:
                    evMi = true;
                    this.location = new SafeHouse(this.player);
                    break;
            }
            if (evMi) {
                if (this.player.getInv().getFood() && this.player.getInv().getWater() && this.player.getInv().getFirewood()) {
                    IO.WriteLine("Tebrikler Oyunu Kazandin!");
                    if (IO.web)
                        IO.Init();
                    break;
                }
            }
            if (!(this.location.getLocation())) {
                IO.WriteLine("Oyun Bitti!");
                if (IO.web)
                    IO.Init();
                break;
            }
        }
    };
    return Game;
}());
function main() {
    var game_ = new Game();
    game_.login();
}
main();
