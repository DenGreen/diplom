import Character from "../Character";

test("new Character должен выбрасывать ошибку 'Запрещено создавать экземпляры класса Character'", () => {
  function received() {
    new Character();
  }
  expect(received).toThrowError(
    new Error("Запрещено создавать экземпляры класса Character")
  );
});

test("new Character должен", () => {
  class Swordsman extends Character {
    constructor(level) {
      super(level, "swordsman");
      this.attack = 40;
      this.defence = 10;
    }
  };
  const response = new Swordsman();
  const result = {"attack": 40, "defence": 10, "health": 50, "level": undefined, "type": "swordsman"};
  expect(response).toEqual(result);
});
