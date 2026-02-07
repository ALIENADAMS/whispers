const overlay = document.querySelector('.intro-scene__flash');
const music = document.getElementById('background-music');
const enterButton = document.getElementById('enter');
const enterSound = document.getElementById('enter-sound');

const fadeLogo = document.getElementById('fade-logo');

const uiWindowTitle = document.getElementsByClassName('ui-window__title')[0];

const menuButtons = document.querySelectorAll('.game-window__top-menu-item');

const characterButton = document.getElementById('character');
const hero = document.getElementById('hero_window');
const heroExitButton = document.getElementById('hero_exit__button');
const heroXPRing = document.querySelector('.hero-avatar__exp-frame');

const backpackButton = document.getElementById('backpack');
const exitButton = document.getElementById('exit_button');
const backpack = document.getElementById('backpack_window');
const backpackMain = document.getElementById('backpack_main');
const tooltip = document.getElementById('tooltip');

const notesButton = document.getElementById('notes');

const gameWindowTable = document.querySelector('.game-window__table');
const gameWindowCards = document.querySelectorAll('.game-window__cart');

const itemLimit = 42;

music.volume = 0.1;

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

function setXpRing(currentXP, maxXP)
{
    console.log(heroXPRing);
    const safeXP = Math.max(0, Math.min(currentXP, maxXP));
    const percent = safeXP / maxXP;
    const angle = percent * 360;
    console.log('Procentowo: ', percent);
    console.log('Kąt: ', angle);
    heroXPRing.style.background = `conic-gradient( #a58a14 0deg ${angle}deg, #000000 ${angle}deg 360deg )`;
    //heroXPRing.style.background = `conic-gradient($light_gold ${angle}deg, $black ${angle}deg 360deg)`;
}

if(characterButton != null)
{
    characterButton.addEventListener('click', () => {
        hero.style.display = 'block';
        uiWindowTitle.textContent = 'BOHATER';
        setXpRing(230, 300);
    });
}

if(exitButton != null)
{
    exitButton.addEventListener('click', () => {
        backpack.style.display = 'none';
        document.getElementsByClassName('game-window__city')[0].style.opacity = 1;
    });
}

if(heroExitButton != null)
{
    heroExitButton.addEventListener('click', () => {
        hero.style.display = 'none';
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

document.querySelectorAll('.special').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        tooltip.innerHTML = `<strong>${skill.dataset.title}</strong><br>${skill.dataset.desc}`;
        tooltip.style.display = 'block';
    });
    skill.addEventListener('mouseleave', e => {
        tooltip.style.display = 'none';
    });
});

async function showBackpack()
{
    try
    {
        const response = await fetch('/backpack');
        if(!response.ok) throw new Error('Nie udało się pobrać plecaka');
        const backpack = await response.json();
        console.log(backpack);
        console.log(backpack.length);
        for(let i = 1; i <= backpack.length; i++)
        {
            document.getElementById('slot' + i).innerHTML = `<img src="./img/` + backpack[i-1].image + `" alt="Item" class="backpack_image"/>`;
            document.getElementById('slot' + i).addEventListener('mouseenter', () => {
                tooltip.innerHTML = `${backpack[i-1].title}<br />${backpack[i-1].content}`;
                tooltip.style.display = 'block';
            });
        }

    }
    catch(err)
    {
        console.error(err);
    }
}

async function showItem(i)
{
    try
    {
        const response = await fetch('/backpack');
        if(!response.ok) throw new Error('Nie udało się pobrać plecaka');
        const backpack = await response.json();
        //alert(`<img src="../img/` + backpack[i-1].image + `" alt='backpack[i-1].title'"><br />` + backpack[i-1].title + `'<br />'` + backpack[i-1].content);
    }
    catch(err)
    {
        console.error(err);
    }
}

//Backpack scripts
if(backpackButton != null)
{
    backpackButton.addEventListener('click', () => {
        backpack.style.display = 'block';
        uiWindowTitle.textContent = 'PLECAK';
        showBackpack();
    });
}

//Notes scripts
async function showNotes()
{
    let screenWidth = window.screen.width;
    let screenHeight = window.screen.height;
    try
    {
        const response = await fetch('/notes');
        if(!response.ok) throw new Error('Nie udało się pobrać notatek');
        const notes = await response.json();
        console.log(notes);
        console.log(notes.length);
        for(let i = 1; i <= notes.length; i++)
        {
            document.getElementById('slot' + i).innerHTML = `<img src="./img/note.png" alt="Notatka" class="note_image"/><p class="note_title">` + notes[i-1].title + `</p>`;
            document.getElementById('slot' + i).addEventListener('click', () =>
            {
                document.getElementsByClassName('ui-window__note')[0].style.display = 'block';
                document.getElementsByClassName('ui-window__note')[0].style.left = (screenWidth / 2) - 100 + 'px';
                document.getElementsByClassName('ui-window__note')[0].style.top = (screenHeight / 2) - 100 + 'px';
                document.getElementsByClassName('ui-window__note')[0].innerHTML = notes[i-1].title + '<br /><br />' + notes[i-1].content;
                document.getElementsByClassName('ui-window__note')[0].innerHTML += '<div class="ui-window__exit" id="note-exit__button"></div>';
                const noteExitButton = document.getElementById('note-exit__button');
                noteExitButton.addEventListener('click', () => 
                {
                    document.getElementsByClassName('ui-window__note')[0].style.display = 'none';
                });
            });
        }

    }
    catch(err)
    {
        console.error(err);
    }
}

if(notesButton != null)
{
    notesButton.addEventListener('click', () => {
        backpack.style.display = 'block';
        uiWindowTitle.textContent = 'NOTATKI';
        showNotes();
    });
}

//window table effect
function table_left()
{
    const duration = 20;
    const x = (Math.random() - 0.5) * 4;
    const y = (Math.random() - 0.5) * 4;

    gameWindowTable.style.transform = `translate(${x}px, ${y}px)`;

    setTimeout(() => {
        gameWindowTable.style.transform = 'translate(0, 0)';
    }, 150);

    const next = Math.random() * 10000 + 2000;
    setTimeout(table_left, next);
}

//gameWindowBanner.style.left = '20%';
if(gameWindowTable != null)
{
    table_left();
}

//cart browser
if(gameWindowCards != null)
{
    gameWindowCards.forEach(card => {
        card.addEventListener('click', e => {
            e.stopPropagation();
            card.classList.add('active');
        });

        if(card.classList.contains('active'))
        {
            let level = document.createElement('div');
            level.width = '100px';
            level.height = '100px';
            document.getElementsByClassName('game-window__main')[0].appendChild(level);
        }
    });

    document.addEventListener('click', () => {
        gameWindowCards.forEach(card => {
            card.classList.remove('active');
        });
    });
}