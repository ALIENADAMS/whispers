class Inventory {
    constructor(gameState)
    {
        this.gameState = gameState;
    }

    getItems()
    {
        if(!this.gameState?.player?.inventory)
        {
            return [];
        }
        return [...this.gameState.player.inventory];
    }

    addItem(item)
    {
        if(!this.gameState.player.inventory.includes(item))
        {
            this.gameState.player.inventory.push(item);
        }
    }

    removeItem(item)
    {
        this.gameState.player.inventory = this.gameState.player.inventory.filter(i => i !== item)
    }
}