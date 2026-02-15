export function saveGame(gameState)
{
    localStorage.setItem('whispers-save', JSON.stringify(gameState));
}

export function loadGame()
{
    const saved = localStorage.getItem('whispers-save');
    return saved ? JSON.parse(saved) : null;
}