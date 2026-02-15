import { renderInventory, renderScene } from './render.js';
import { loadGame, saveGame } from './save.js';
import { takeNote, toggleDrawer } from './interactions.js';

let gameState;
const drawer = document.querySelector('.drawer');
const note = document.querySelector('.item-note');
const noteView = document.querySelector('#note-view');
const noteContent = document.querySelector('#note-content');
const closeNote = document.querySelector('#close-note');
const info = document.querySelector('.info');
const inventoryButton = document.querySelector('.inventory-button');
const inventory = document.querySelector('.inventory');
const inventoryXButton = document.querySelector('.inventory-x__button');

const drawerSound = new Audio('../sounds/drawer-open.mp3');
const noteSound = new Audio('../sounds/notes.mp3');
const infoSound = new Audio('../sounds/info.mp3');

async function startGame()
{
    const saved = loadGame();

    if(saved)
    {
        gameState = saved;
    }
    else
    {
        const response = await fetch('../data/gameState.json');
        gameState = await response.json();
        console.log('GAME STATE LOADED: ', gameState);
        saveGame(gameState);
    }

    renderScene(gameState);
    console.log(gameState.player.inventory.length);

    drawer.addEventListener('click', () => {
        drawerSound.currentTime = 0;
        drawerSound.play();
        toggleDrawer(gameState);
        renderScene(gameState);
    });

    note.addEventListener('click', (event) => {
        noteSound.currentTime = 0;
        noteSound.play();
        event.stopPropagation();
        noteContent.textContent = "Jestem już zmęczony tym domem. To co się tu dzieje, jest niewytłumaczalne. Próbowałem już wszystkiego...";
        noteView.classList.remove('hidden');

    });

    closeNote.addEventListener('click', (event) => {
        noteSound.currentTime = 0;
        noteSound.play();
        event.stopPropagation();
        noteView.classList.add('hidden');
        takeNote(gameState);
        infoSound.currentTime = 0;
        infoSound.play();
        info.classList.add('view');
        info.textContent = "Dodano nową notatkę";
        setTimeout(() => {
            info.classList.remove('view');
        }, 5000);
    });

    inventoryButton.addEventListener('click', () => {
        inventory.classList.remove('hidden');
        renderInventory(gameState);
    });

    inventoryXButton.addEventListener('click', () => {
        inventory.classList.add('hidden');
    });
}

startGame();