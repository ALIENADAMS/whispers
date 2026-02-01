const overlay = document.querySelector('.intro-scene__flash');
const music = document.getElementById('background-music');
const enterButton = document.getElementById('enter');
const enterSound = document.getElementById('enter-sound');

const fadeLogo = document.getElementById('fade-logo');

const uiWindowTitle = document.getElementsByClassName('ui-window__title')[0];

const menuButtons = document.querySelectorAll('.game-window__top-menu-item');

const characterButton = document.getElementById('character');

const backpackButton = document.getElementById('backpack');
const exitButton = document.getElementById('exit_button');
const backpack = document.getElementById('backpack_window');
const backpackMain = document.getElementById('backpack_main');

const notesButton = document.getElementById('notes');

const itemLimit = 42;

function flash()
{
    const duration = 20;
    overlay.style.opacity = '1';

    setTimeout(() => {
        overlay.style.opacity = '0';
        const nextFlash = Math.random() * 5000 + 500;
        setTimeout(flash, nextFlash);
    }, duration);
}

if(enterButton != null)
{
    enterButton.addEventListener('click', async() =>
    {
        try
        {
            await enterSound.play();
            enterSound.addEventListener('ended', () => {
                window.location.href = '/main';
            });
        }
        catch(err)
        {
            console.log('We could not play sound ', err);
        }
    });
}

if(overlay != null)
{
    flash();
}

if(fadeLogo != null)
{
    setTimeout(() => {
        fadeLogo.style.opacity = 1;
    }, 1000);
}

if(menuButtons != null)
{
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.getElementsByClassName('game-window__city')[0].style.opacity = 0.5;
        });
    });
}

if(characterButton != null)
{
    characterButton.addEventListener('click', () => {
        alert('Nowe okno bohatera');
    });
}

//Backpack scripts
if(backpackButton != null)
{
    backpackButton.addEventListener('click', () => {
        backpack.style.display = 'block';
        uiWindowTitle.textContent = 'PLECAK';
    });
}

if(exitButton != null)
{
    exitButton.addEventListener('click', () => {
        backpack.style.display = 'none';
        document.getElementsByClassName('game-window__city')[0].style.opacity = 1;
    });
}

for(var i = 1; i <= 42; i++)
{
    const slot = document.createElement('div');
    slot.classList.add('ui-window__item');
    slot.id = 'slot' + i;
    document.getElementById('backpack_main').appendChild(slot);
}

//Notes scripts
if(notesButton != null)
{
    notesButton.addEventListener('click', () => {
        backpack.style.display = 'block';
        uiWindowTitle.textContent = 'NOTATKI';
    });
}