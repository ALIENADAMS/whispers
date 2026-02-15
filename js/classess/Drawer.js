class Drawer {
    constructor(id, initialState)
    {
        this.id = id;
        this.opened = initialState.opened;
    }

    toggle(gameState)
    {
        this.opened = !this.opened;
        gameState[this.id].opened = this.opened;
    }

    takeItem(gameState, player, item)
    {
        const index = this.inDrawer.indexOf(item);
        if(index !== -1)
        {
            this.inDrawer.splice(index, 1);
            player.inventory.push(item);
            gameState[this.id].inDrawer = [...this.inDrawer]; //operator spread tworzy niezależną kopię zamiast nadpisywać, ponieważ mamy osobny mechanizm zapisu i odczytu gry
        }
    }
}