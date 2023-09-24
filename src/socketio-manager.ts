import { Manager, Socket } from "socket.io-client";

let socket: Socket

export const connectToServer = (token: string) => {
    const manager = new Manager('http://localhost:3000', {
        extraHeaders: {
            authentication: token
        }
    });
    socket?.removeAllListeners();
    socket = manager.socket('/');
    addListeners();
}

const addListeners = () => {
    socket.on('connect', () => {
        document.querySelector<HTMLSpanElement>('#socket-status')!.innerText = 'Online';
    });

    socket.on('disconnect', () => {
        document.querySelector<HTMLSpanElement>('#socket-status')!.innerText = 'Offline';
    });

    socket.on('connected_clients', (clients) => {
        let clients_html = '';
        clients.forEach((client: string) => {
            clients_html += `<li>${client}</li>`;
        });
        document.querySelector('#connected_clients')!.innerHTML = clients_html;
    });

    document.querySelector<HTMLFormElement>('#form-message')!.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.querySelector<HTMLInputElement>('#message')!.value;
        if(!message) return;
        socket.emit('message-from-client', {
            id: 'YOO',
            message
        });
        document.querySelector<HTMLInputElement>('#message')!.value = '';
    });

    socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
        const {fullName, message} = payload;
        const message_html = `<li><strong>${fullName}</strong>: ${message}</li>`;
        document.querySelector('#messages')!.innerHTML += message_html;
    });
}
