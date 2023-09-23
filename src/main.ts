import { connectToServer } from './socketio-manager'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Web socker client</h2>

    <input id="jwt" placeholder="JSON WEB TOKEN" />
    <button type="button" id="connect">Connect</button>

    </br>
    </br>

    <span id="socket-status" ></span>

    <ul id="connected_clients"></ul>

    <form id="form-message">
      <input placeholder="Mensaje.." autocomplete="off"  type="text" id="message" />
      <button type="submit">Send</button>
    </form>

    <h3>Messages</h3>
    <ul id="messages"></ul>

    </div>
`

const jwt = document.querySelector<HTMLInputElement>('#jwt')!
const conectar = document.querySelector<HTMLButtonElement>('#connect')!

conectar.addEventListener('click', () => {
  if(jwt.value.trim().length <= 0 ) return alert('No hay token')
  connectToServer(jwt.value.trim())
})
