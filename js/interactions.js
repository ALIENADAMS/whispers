import { saveGame } from './save.js';

export function toggleDrawer(gameState)
{
    const drawer = gameState.scenes[gameState.currentScene].objects.desk.drawer;
    drawer.opened = !drawer.opened;
    saveGame(gameState);
}

export function takeNote(gameState)
{
    const drawer = gameState.scenes[gameState.currentScene].objects.desk.drawer;

    if(drawer.items.includes('note'))
    {
        drawer.items = [];
        gameState.player.inventory.push('note');
        saveGame(gameState);
    }
}