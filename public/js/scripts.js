const overlay = document.querySelector('.intro-scene__flash');
const music = document.getElementById('background-music');
const enterButton = document.getElementById('enter');
const enterSound = document.getElementById('enter-sound');

const fadeLogo = document.getElementById('fade-logo');
const backpackButton = document.getElementById('backpack');
const exitButton = document.getElementById('exit_button');
const backpack = document.getElementById('backpack_window');

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

if(backpackButton != null)
{
    backpackButton.addEventListener('click', () => {
        backpack.style.display = 'block';
    });
}

if(exitButton != null)
{
    exitButton.addEventListener('click', () => {
        backpack.style.display = 'none';
    });
}