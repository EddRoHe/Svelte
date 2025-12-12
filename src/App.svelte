<script>
    import Router, { location } from "svelte-spa-router"; // Importamos 'location'
    import Home from "./routes/Home.svelte";
    import Terminos from "./routes/terminos/Terminos.svelte";
    import Contacto from "./routes/contacto/Contacto.svelte";
    import FAQ from "./routes/faq/FAQ.svelte";
    import Login from "./routes/login/Login.svelte";
    import Dashboard from "./routes/manager/Dashboard.svelte";
    import { user } from "./store/auth"; 
    import Chatbot from "./components/Chatbot.svelte";

    const routes = {
        "/": Home,
        "/terminos": Terminos,
        "/contacto": Contacto,
        "/faq": FAQ,
        "/login": Login,       
        "/manager": Dashboard 
    };

    const waDirect = "https://wa.me/5212219190807";
    let isChatOpen = false;

    // LÓGICA PARA OCULTAR HEADER/FOOTER
    // Si la ruta incluye 'manager' o 'login', ocultamos la navegación global
    $: isAppMode = $location.includes('/manager') || $location.includes('/login');
</script>

<style global>
    @import "./app.css";
    .highlight { color: #007bff !important; font-weight: bold; }
</style>

{#if !isAppMode}
<nav>
    <div class="container">
        <a href="#/" class="logo">Lead<span>Connect</span></a>
        <div class="nav-links">
            <a href="#/" class="nav-link">Inicio</a>
            <a href="#/faq" class="nav-link">Dudas</a>
            <a href="#/contacto" class="nav-link">Contacto</a>
            
            {#if $user}
                <a href="#/manager" class="nav-link highlight">Dashboard</a>
            {:else}
                <a href="#/login" class="nav-link" style="opacity: 0.7; font-size: 0.9em;">Manager</a>
            {/if}

            <a href={waDirect} target="_blank" class="header-wa-btn">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>WhatsApp</span>
            </a>
        </div>
    </div>
</nav>
{/if}

<main>
    <Router {routes} />
</main>

{#if !isAppMode}
    <button class="fab-chat" on:click={() => isChatOpen = !isChatOpen} title="Asistente Virtual">
        <svg class="fab-icon" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
    </button>

    <Chatbot isOpen={isChatOpen} on:close={() => isChatOpen = false} />

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>LeadConnect</h4>
                    <p>Infraestructura para portabilidad numérica a AT&T con IA.</p>
                </div>
                <div class="footer-col">
                    <h4>Legal</h4>
                    <a href="#/terminos">Términos y Condiciones</a>
                    <a href="#/terminos">Política de Privacidad</a>
                </div>
                <div class="footer-col">
                    <h4>Ayuda</h4>
                    <a href="#/faq">Preguntas Frecuentes</a>
                    <a href="#/contacto">Contáctanos</a>
                </div>
            </div>
            <div style="text-align: center; margin-top: 40px; font-size: 0.8rem; opacity: 0.5;">
                © {new Date().getFullYear()} LeadConnect.
            </div>
        </div>
    </footer>
{/if}