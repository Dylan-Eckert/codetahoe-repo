var menus = [
  { id: 1, title: 'Menu 1', body: 'Menu body 1' },
  { id: 2, title: 'Menu 2', body: 'Menu body 2' },
  { id: 3, title: 'Menu 3', body: 'Menu body 3' }
];

class Menu {
  constructor(menu) {
    this.id = menu.id;
    this.title = menu.title;
    this.body = menu.body;
  }

  save() {
    this.id = 4;
    console.log('menu saved!');
  }

  static all() {
    var all = [];

    for (var i = 0; i < menus.length; i++) {
        all.push(new Menu(menus[i]));
    }

    return all;
  }

  static find(id) {
    for (var i = 0; i < menus.length; i++) {
      if (menus[i].id == id) {
        return new Menu(menus[i]);
      }
    }

    return null;
  }
}

module.exports = Menu;
