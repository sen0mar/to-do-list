import './styles.css';

function app() {
  const el = document.createElement('div');
  el.id = 'app';
  el.innerText = 'Hello from the template!';
  document.body.appendChild(el);
}

app();
