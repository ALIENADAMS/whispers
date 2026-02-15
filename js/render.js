console.log('RENDER SCENE');

export function renderScene(gameState)
{
    const scene = gameState.scenes[gameState.currentScene];

    document.querySelector('.description').textContent = scene.description;

    const drawer = scene.objects.desk.drawer;
    document.querySelector('.drawer').classList.toggle('open', drawer.opened);
    console.log('DRAWER STATE: ', drawer.opened);

    const noteEl = document.querySelector('.item-note');
    noteEl.style.display = drawer.items.includes('note') ? 'block' : 'none';
}

export function renderInventory(gameState)
{
    const list = document.getElementById('inventory-list');
    list.textContent = '';
    const items = gameState.player.inventory;
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = '<img src="img/' + item + '.png" alt="inventory" class="inventory-list__image">';
        list.appendChild(li);
    })
}