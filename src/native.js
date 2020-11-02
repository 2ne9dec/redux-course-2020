import './styles.css'

const counter = document.querySelector('#counter');
const buttons = document.querySelectorAll('button');
let state = 0;

function render() {
    counter.textContent = state.toString();
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        switch (button.id) {
            case 'add':
                state++;
                render();
                break;
            case 'sub':
                state--;
                render();
                break;
            case 'async':
                setInterval(() => {
                    if (state < 5) {
                        state++;
                        render();
                    }
                }, 500)
                break;
            case 'theme':
                document.body.classList.toggle('dark');
                break;
        }
    })
});