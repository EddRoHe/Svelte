import { writable } from 'svelte/store';

// 1. Intentamos recuperar la sesión de sessionStorage (por si recarga la página)
// sessionStorage vive solo mientras la pestaña está abierta.
const storedUser = sessionStorage.getItem('leadconnect_user');

// 2. Creamos el store
export const user = writable(storedUser ? JSON.parse(storedUser) : null);

// 3. Nos suscribimos para guardar cambios automáticamente
user.subscribe(value => {
    if (value) {
        // Si hay usuario, lo guardamos en la sesión
        sessionStorage.setItem('leadconnect_user', JSON.stringify(value));
    } else {
        // Si es null (logout), lo borramos de la memoria
        sessionStorage.removeItem('leadconnect_user');
    }
});