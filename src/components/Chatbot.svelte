<script>
    import { createEventDispatcher, afterUpdate } from 'svelte';
    
    export let isOpen = false; 
    const dispatch = createEventDispatcher();

    function close() { dispatch('close'); }

    let inputVal = "";
    let chatRef;
    let messages = [
        { id: 1, text: "Hola 👋 Soy LeadConnect IA.", sender: "bot" },
        { id: 2, text: "¿En qué puedo ayudarte hoy?", sender: "bot" }
    ];

    function send() {
        if (!inputVal.trim()) return;
        messages = [...messages, { id: Date.now(), text: inputVal, sender: "user" }];
        const txt = inputVal.toLowerCase();
        inputVal = "";

        setTimeout(() => {
            let r = "Para continuar, indícame tu número de WhatsApp.";
            if (txt.includes("costo")) r = "El trámite es gratuito.";
            messages = [...messages, { id: Date.now()+1, text: r, sender: "bot" }];
        }, 800);
    }

    afterUpdate(() => { if(chatRef) chatRef.scrollTop = chatRef.scrollHeight; });
</script>

{#if isOpen}
    <div class="chat-window">
        <div class="chat-head">
            <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:10px; height:10px; background:#4ade80; border-radius:50%; box-shadow:0 0 5px #4ade80;"></div>
                <strong>Asistente Virtual</strong>
            </div>
            <button on:click={close} style="background:none; border:none; color:white; font-size:1.5rem; cursor:pointer;">&times;</button>
        </div>

        <div class="chat-msgs" bind:this={chatRef}>
            {#each messages as msg}
                <div class="chat-bubble {msg.sender === 'bot' ? 'bubble-bot' : 'bubble-user'}">
                    {msg.text}
                </div>
            {/each}
        </div>

        <form class="chat-input-area" on:submit|preventDefault={send}>
            <input type="text" class="chat-field" placeholder="Escribe aquí..." bind:value={inputVal}>
            <button class="chat-submit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        </form>
    </div>
{/if}