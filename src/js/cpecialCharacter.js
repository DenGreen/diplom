import Character from './Character';

export class Swordsman extends Character {
    constructor(level, type) {
        super(level, type)
        this.attack = 40;
        this.defence = 10;
    }
}
export class Bowman extends Character {
    constructor(level, type) {
        super(level, type);
        this.attack = 25;
        this.defence = 25;
    }
}
export class Magician extends Character {
    constructor(level, type) {
        super(level, type);
        this.attack = 10;
        this.defence = 40;
    }
}
export class Daemon extends Character {
    constructor(level, type) {
        super(level, type);
        this.attack = 10;
        this.defence = 40;
    }
}
export class Undead extends Character {
    constructor(level, type) {
        super(level, type);
        this.attack = 40;
        this.defence = 10;
    }
}
export class Vampire extends Character {
    constructor(level, type) {
        super(level, type);
        this.attack = 25;
        this.defence = 25;
    }
}