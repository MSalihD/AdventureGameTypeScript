//function randint(a:number,b:number):number{return Math.floor(a + Math.random() * ((b - a) + 1));}
function ceviri(name:string) : string{
	if(name === "Food")return "Yiyecek";
	else if(name === "Water")return "Su";
	else if(name === "Firewood")return "Yakacak Odun";
}
class WRITE{
	public icerik:string = "";
	public web:boolean = true;
	public WriteLine(x:string){
		this.icerik = this.icerik + (x + "\n");
	}
	public Write(x:string){
		this.icerik = this.icerik + x;
	}
	public ReadLine():string{
		let don:string = prompt(this.icerik);
		this.icerik = "";
		return don;
	}
	public Init(){
		alert(this.icerik);
		this.icerik = "";
	}
}
let IO = new WRITE();
class Inventory{
	private water:boolean;
	private food:boolean;
	private firewood:boolean;
	private wName:string;
	private aName:string;
	private damage:number;
	private armor:number;
	constructor(){
		this.water = false;
		this.food = false;
		this.firewood = false;
		this.damage = 0;
		this.armor = 0;
		this.wName = "";
		this.aName = "";
	}
	public getWater():any{return this.water;}
	public setWater(water:any){this.water = water;}
	public getFood():any{return this.food;}
	public setFood(food:any){this.food = food;}
	public getFirewood():any{return this.firewood;}
	public setFirewood(firewood:any){this.firewood = firewood;}
	public getDamage():any{return this.damage;}
	public setDamage(damage:any){this.damage = damage;}
	public getArmor():any{return this.armor;}
	public setArmor(armor:any){this.armor = armor;}
	public getWname():any{return this.wName;}
	public setWname(wName:any){this.wName = wName;}
	public getAname():any{return this.aName;}
	public setAname(aName:any){this.aName = aName;}
}
class Obstacle{
	private name:string;
	private damage:number;
	private award:number;
	private health:number;
	private maxNumber:number;
	constructor(name:string,damage:number,health:number,award:number,maxNumber:number){ //dsd
		this.name = name;
		this.damage = damage;
		this.award = award;
		this.health = health;
		this.maxNumber = maxNumber;
	}
	public count(){
		return Math.floor(1 + Math.random() * ((this.maxNumber - 1) + 1));
	}
	public getName():any{return this.name;}
	public setName(name:any){this.name = name;}
	public getDamage():any{return this.damage;}
	public setDamage(damage:any){this.damage = damage;}
	public getAward():any{return this.award;}
	public setAward(award:any){this.award = award;}
	public getHealth():any{return this.health;}
	public setHealth(health:any){this.health = health;}
	public getMaxnumber():any{return this.maxNumber;}
	public setMaxnumber(maxNumber:any){this.maxNumber = maxNumber;}
}
class Vampire extends Obstacle{
	constructor(){
		super("Vampir",4,14,7,3);
	}
}
class Zombie extends Obstacle{
	constructor(){
		super("Zombi",3,10,4,3);
	}
}
class Bear extends Obstacle{
	constructor(){
		super("Ayi",7,20,12,2);
	}
}
abstract class Location_{
	protected player:Player;
	protected name:string;
	constructor(player:Player){
		this.player = player;
	}
	public abstract getLocation() : boolean;
	public getPlayer():Player{return this.player;}
	public setPlayer(player:Player){this.player = player;}
	public getName():any{return this.name;}
	public setName(name:any){this.name = name;}
}
abstract class NormalLoc extends Location_{
	constructor(player:Player,name:string){
		super(player);
		this.name = name;
	}
	public getLocation() : boolean{

		return true;
	}
}
abstract class BattleLoc extends Location_{
	protected obstacle:Obstacle;
	protected award:string;
	constructor(player:Player,name:string,obstacle:Obstacle,award:string){
		super(player);
		this.obstacle = obstacle;
		this.name = name;
		this.award = award;
	}
	public getLocation() : boolean{
		let obsCount:number = this.obstacle.count();
		IO.WriteLine("Suan " + this.getName() + " adli yerdesin");	
		IO.WriteLine("Dikkatli ol! Burada " + obsCount + " tane " + this.obstacle.getName() + " yasiyor!");
		IO.WriteLine("<S>avas veya <K>ac");
		let selCase:string = IO.ReadLine();
		selCase = selCase.toUpperCase();
		if(selCase === "S"){
			if(this.combat(obsCount)){
				IO.WriteLine(this.getName() + " bolgesindeki butun dusmanlari temizledin!");
				if(this.award === "Food" && !(this.player.getInv().getFood())){
					IO.WriteLine("Yiyecek Kazandin!");
					this.player.getInv().setFood(true);
				}
				else if(this.award === "Water" && !(this.player.getInv().getWater())){
					IO.WriteLine("Su Kazandin!");
					this.player.getInv().setWater(true);
				}
				else if(this.award === "Firewood" && !(this.player.getInv().getFirewood())){
					IO.WriteLine("Yakacak Odun Kazandin!");
					this.player.getInv().setFirewood(true);
				}
				if(IO.web)IO.Init();
				return true;
			}
			if(this.player.getHealthy() <= 0){
				IO.WriteLine("Oldun!");
				return false;
			}
		}
		return true;
	}
	public combat(obsCount:number) : boolean{
		for(let i:number = 0;i < obsCount;i++){
			let defObsHealth:any = this.obstacle.getHealth();
			this.playerStats();
			this.enemyStats();
			while(this.player.getHealthy() > 0 && this.obstacle.getHealth() > 0){
				IO.WriteLine("<V>ur veya <K>ac");
				let selCase:string = IO.ReadLine();
				selCase = selCase.toUpperCase();
				if(selCase === "V"){
					IO.WriteLine("Vurdun!");
					this.obstacle.setHealth(this.obstacle.getHealth() - this.player.getTotalDamage());
					IO.WriteLine("Oyuncu Cani : " + (this.player.getHealthy() > 0 ? this.player.getHealthy() : 0));
					IO.WriteLine(this.obstacle.getName() + " Cani : "+ (this.obstacle.getHealth() > 0 ? this.obstacle.getHealth() : 0));
					IO.WriteLine("");
					if(this.obstacle.getHealth() > 0){
						if(IO.web)IO.Init();
						IO.WriteLine(this.obstacle.getName() + " sana vurdu!");
						let canKaydet:number = this.player.getHealthy();
						this.player.setHealthy(this.player.getHealthy() - (this.obstacle.getDamage() - this.player.getInv().getArmor()));
						this.player.setHealthy(canKaydet < this.player.getHealthy() ? canKaydet - 1 : this.player.getHealthy());
						IO.WriteLine("Oyuncu Cani : " + (this.player.getHealthy() > 0 ? this.player.getHealthy() : 0));
						IO.WriteLine(this.obstacle.getName() + " Cani : "+ (this.obstacle.getHealth() > 0 ? this.obstacle.getHealth() : 0));
					}
				}
				else return false;
			}
			if(this.obstacle.getHealth() < this.player.getHealthy()){
				IO.WriteLine("Dusmani yendin!");
				this.player.setMoney(this.player.getMoney() + this.obstacle.getAward());
				IO.WriteLine("Guncel Paran : " + this.player.getMoney());
				this.obstacle.setHealth(defObsHealth);
				if(IO.web)IO.Init();
			}
			else return false;
			if(!(IO.web))IO.WriteLine("-------------------");
		}
		return true;
	}
	public playerStats(){
		IO.WriteLine("Oyuncu Degerleri\n-------------------");
		IO.Write("Can : ");
		IO.Write(this.player.getHealthy()+"");
		IO.Write("  Hasar : " + this.player.getTotalDamage());
		IO.WriteLine("  Para : " + this.player.getMoney());
		if(this.player.getInv().getDamage() > 0)
			IO.WriteLine("Silah : " + this.player.getInv().getWname());
		if(this.player.getInv().getArmor() > 0)
			IO.WriteLine("Zirh : " + this.player.getInv().getAname());
		IO.WriteLine("");
		
	}
	public enemyStats(){
		IO.WriteLine(this.obstacle.getName() + " Degerleri\n-------------------");
		IO.Write("Can : " + this.obstacle.getHealth());
		IO.Write("  Hasar : " + this.obstacle.getDamage());
		IO.WriteLine("  Odul : " + this.obstacle.getAward());
		IO.WriteLine("");
		if(IO.web)IO.Init();
	}
}
class Forest extends BattleLoc{
	constructor(player:Player){
		super(player,"Orman",new Vampire(),"Firewood");
	}
}
class River extends BattleLoc{
	constructor(player:Player){
		super(player,"Nehir",new Bear(),"Water");
	}
}
class Cave extends BattleLoc{
	constructor(player:Player){
		super(player,"Magara",new Zombie(),"Food");
	}
}

class SafeHouse extends NormalLoc{
	constructor(player:Player){
		super(player,"Guvenli Ev");
	}
	public getLocation() : boolean{
		this.player.setHealthy(this.player.getRhealthy()); /////
		IO.WriteLine("Iyilestin...");
		IO.WriteLine("Suan Guvenli Ev adli yerdesin.");
		if(IO.web)IO.Init();
		return true;
	}
}
class ToolStore extends NormalLoc{
	constructor(player:Player){
		super(player,"Magaza");
	}
	public getLocation() : boolean{
		IO.WriteLine("Para : " + this.player.getMoney());
		IO.WriteLine("1. Silahlar");
		IO.WriteLine("2. Zirhlar");
		IO.WriteLine("3. Cikis");
		IO.Write("Secimin : ");
		let selTool = parseInt(IO.ReadLine());
		let selItemID:number;
		switch(selTool){
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
	}
	public armorMenu() : number{
		if(IO.web)IO.WriteLine("Para : " + this.player.getMoney());
		IO.WriteLine("1. Hafif  <Para : 15 - Hasar : 1>");
		IO.WriteLine("2. Orta   <Para : 25 - Hasar : 3>");
		IO.WriteLine("3. Agir   <Para : 40 - Hasar : 5>");
		IO.WriteLine("4. Cikis");
		IO.Write("Zirh sec : ");
		let selWeaponID = parseInt(IO.ReadLine());
		return selWeaponID;
	}
	public weaponMenu() : number{
		if(IO.web)IO.WriteLine("Para : " + this.player.getMoney());
		IO.WriteLine("1. Tabanca <Para : 25 - Hasar : 2>");
		IO.WriteLine("2. Kilic   <Para : 35 - Hasar : 3>");
		IO.WriteLine("3. Tufek   <Para : 45 - Hasar : 7>");
		IO.WriteLine("4. Cikis");
		IO.Write("Silah sec : ");
		let selWeaponID = parseInt(IO.ReadLine());
		return selWeaponID;
	}
	public buyArmor(itemID:number){
		let avoid:number = 0;
		let price:number = 0;
		let aName:string = "";
		switch(itemID){
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
			if(IO.web)IO.Init();
			break;
			IO.WriteLine("Gecersiz Islem!");
			if(IO.web)IO.Init();
			break;
		}
		if(price > 0){
			if(this.player.getMoney() >= price){
				this.player.getInv().setArmor(avoid);
				this.player.getInv().setAname(aName);
				this.player.setMoney(this.player.getMoney() - price);
				IO.WriteLine(aName + " satin aldin, Engellenen Hasar : " + this.player.getInv().getArmor());
				IO.WriteLine("Kalan Para : " + this.player.getMoney());
			}
			else IO.WriteLine("Para yetersiz!");
			if(IO.web)IO.Init();
		}
	}
	public buyWeapon(itemID:number){
		let damage:number = 0;
		let price:number = 0;
		let wName:string = "";
		switch(itemID){
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
			if(IO.web)IO.Init();
			break;
			IO.WriteLine("Gecersiz Islem!");
			if(IO.web)IO.Init();
			break;
		}
		if(price > 0){
			if(this.player.getMoney() >= price){
				this.player.getInv().setDamage(damage);
				this.player.getInv().setWname(wName);
				this.player.setMoney(this.player.getMoney() - price);
				IO.WriteLine(wName + " satin aldin, Onceki hasar : " + this.player.getDamage() + ", Yeni hasar : " + (this.player.getTotalDamage()));
				IO.WriteLine("Kalan Para : " + this.player.getMoney());
			}
			else IO.WriteLine("Para yetersiz!");
			if(IO.web)IO.Init();
		}
	}
	

}

class Player{
	private damage:number;
	private healthy:number;
	private money:number;
	private rHealthy:number;
	private name:string;
	private cName:string;
	inv:Inventory;
	constructor(name:string){
		this.name = name;
		this.inv = new Inventory();
	}
	public selectCha(){
		switch(this.chaMenu()){
			case 1:
			this.initPlayer("Samuray",5,21,15);
			break;
			case 2:
			this.initPlayer("Okcu",7,18,20);
			break;
			case 3:
			this.initPlayer("Sovalye",8,24,5);
			break;
			default:
			this.initPlayer("Samuray",5,21,15);
			break;
		}
		IO.WriteLine("Karakter Olusturuldu!  \nAdi : " + this.getCname() + "    Hasar : " + this.getDamage() + "    Saglik : " + this.getHealthy() + "    Para : " + this.getMoney());
		if(IO.web)IO.Init();
	}	
	public chaMenu() : number{
		IO.WriteLine("Lutfen bir karakter sec : ");
		IO.WriteLine("1- Samuray  Hasar : 5  Saglik : 21  Para : 15");
		IO.WriteLine("2- Okcu     Hasar : 7  Saglik : 18  Para : 20");
		IO.WriteLine("3- Sovalye  Hasar : 8  Saglik : 24  Para : 5");
		IO.Write("Karakter secimin :");
		let chaID:number = parseInt(IO.ReadLine());
		while(chaID < 1 || chaID > 3){
			if(IO.web){
				IO.WriteLine("Lutfen gecerli bir karakter sec :");
				IO.WriteLine("Lutfen bir karakter sec : ");
				IO.WriteLine("1- Samuray  Hasar : 5  Saglik : 21  Para : 15");
				IO.WriteLine("2- Okcu  	  Hasar : 7  Saglik : 18  Para : 20");
				IO.WriteLine("3- Sovalye  Hasar : 8  Saglik : 24  Para : 5");
				IO.Write("Karakter secimin :");
			}
			else{
				IO.Write("Lütfen geçerli bir karakter seç : ");
			}
			chaID = parseInt(IO.ReadLine());
		}
		return chaID;
	}
	public getTotalDamage() : number{
		return this.getDamage() + this.getInv().getDamage();
	}
	public initPlayer(cName:string,dmg:number,hlthy:number,mny:number){
		this.setCname(cName);
		this.setDamage(dmg);
		this.setHealthy(hlthy);
		this.setMoney(mny);
		this.setRhealthy(hlthy);
	}
	public getDamage():any{return this.damage;}
	public setDamage(damage:any){this.damage = damage;}
	public getHealthy():any{return this.healthy;}
	public setHealthy(healthy:any){this.healthy = healthy;}
	public getMoney():any{return this.money;}
	public setMoney(money:any){this.money = money;}
	public getName():any{return this.name;}
	public setName(name:any){this.name = name;}
	public getCname():any{return this.cName;}
	public setCname(cName:any){this.cName = cName;}
	public getInv():Inventory{return this.inv;}
	public setInv(inv:Inventory){this.inv = inv;}
	public getRhealthy():any{return this.rHealthy;}
	public setRhealthy(rHealthy:any){this.rHealthy = rHealthy;}
}

class Game{
	player:Player;
	location:Location_;
	public login(){
		IO.WriteLine("Macera Oyununa Hosgeldin!");
		IO.Write("Oyuna baslamadan once adini gir:");
		let playerName:string = IO.ReadLine();
		this.player = new Player(playerName);
		this.player.selectCha();
		this.start();
	}
	public start(){
		for(;;){
			if(!(IO.web)){
				IO.WriteLine("");
				IO.WriteLine("-----------------------------------------------");
				IO.WriteLine("");
			}
			else IO.WriteLine("-----------------------------------------------");
			IO.WriteLine("Eylem gerceklestirmek icin bir yer sec :");
			IO.WriteLine("1. Guvenli Ev --> Sana ait guvenli bir mekan, dusman yok!");
			IO.WriteLine("2. Magara --> Karsina belki zombi cikabilir!");
			IO.WriteLine("3. Orman -->  Karsina belki vampir cikabilir!");
			IO.WriteLine("4. Nehir -->  Karsina belki ayi cikabilir!");
			IO.WriteLine("5. Magaza --> Silah veya Zirh alabilirsin!");
			IO.Write("Gitmek istedigin yer : ");
			let selLoc:number = parseInt(IO.ReadLine());
			while(selLoc < 0 || selLoc > 5){
				if(IO.web){
					IO.WriteLine("Lutfen gecerli bir yer sec :");
					IO.WriteLine("1. Guvenli Ev --> Sana ait guvenli bir mekan, dusman yok!");
					IO.WriteLine("2. Magara --> Karsina belki zombi cikabilir!");
					IO.WriteLine("3. Orman -->  Karsina belki vampir cikabilir!");
					IO.WriteLine("4. Nehir -->  Karsina belki ayi cikabilir!");
					IO.WriteLine("5. Magaza --> Silah veya Zirh alabilirsin!");
					IO.Write("Gitmek istedigin yer : ");
				}
				else IO.Write("Lutfen gecerli bir yer sec :");
				selLoc = parseInt(IO.ReadLine());
			}
			let evMi:boolean = false;
			switch(selLoc){
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
			if(evMi){
				if(this.player.getInv().getFood() && this.player.getInv().getWater() && this.player.getInv().getFirewood()){
					IO.WriteLine("Tebrikler Oyunu Kazandin!");
					if(IO.web)IO.Init();
					break;
				}
			}
			if(!(this.location.getLocation())){
				IO.WriteLine("Oyun Bitti!");
				if(IO.web)IO.Init();
				break;
			}
		}
	}
}
function main(){
	let game_ = new Game();
	game_.login();
}
main();