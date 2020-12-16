import Character from './Character';

export class Swordsman extends Character {
    constructor(level) {
        super(level, 'swordsman')
        this.attack = 100;
        this.defence = 10;
        this.rangeTravel = 4;
        this.attackRange = 1;
    }
}
export class Bowman extends Character {
    constructor(level) {
        super(level, 'bowman');
        this.attack = 25;
        this.defence = 25;
        this.rangeTravel = 2;
        this.attackRange = 2;
    }
}
export class Magician extends Character {
    constructor(level) {
        super(level, 'magician');
        this.attack = 10;
        this.defence = 40;
        this.rangeTravel = 1;
        this.attackRange = 4;
    }
}
export class Daemon extends Character {
    constructor(level) {
        super(level, 'daemon');
        this.attack = 10;
        this.defence = 40;
        this.rangeTravel = 1;
        this.attackRange = 4;
    }
}
export class Undead extends Character {
    constructor(level) {
        super(level, 'undead');
        this.attack = 40;
        this.defence = 10;
        this.rangeTravel = 4;
        this.attackRange = 1;
    }
}
export class Vampire extends Character {
    constructor(level) {
        super(level, 'vampire');
        this.attack = 25;
        this.defence = 25;
        this.rangeTravel = 2;
        this.attackRange = 2;
    }
}