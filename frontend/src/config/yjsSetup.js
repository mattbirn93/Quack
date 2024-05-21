// src/config/yjsSetup.js
import io from 'socket.io-client';
import * as Y from 'yjs';

const socket = io('http://192.168.0.211:5001');
const ydoc = new Y.Doc();
const yText = ydoc.getText('rich-text');

// Apply updates received from the server
socket.on('update', (update) => {
  Y.applyUpdate(ydoc, new Uint8Array(update));
});

// Send local updates to the server
ydoc.on('update', (update) => {
  socket.emit('update', Array.from(new Uint8Array(update)));
});

// Request the initial document state from the server
socket.on('document-state', (state) => {
  Y.applyUpdate(ydoc, new Uint8Array(state));
});

export { yText };
