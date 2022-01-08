import { createApp } from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'

const socket = window.socket || SocketIO('http://localhost:3000')

createApp(App)
	.use(
		new VueSocketIO({
			debug: true,
			connection: socket
		})
	)
	.mount('#app')
