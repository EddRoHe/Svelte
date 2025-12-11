<script>
    let active = null;
    const faqs = [
        { q: "¿Es seguro dar mis datos?", a: "Totalmente. LeadConnect usa cifrado de extremo a extremo vía WhatsApp y solo comparte los datos necesarios con AT&T." },
        { q: "¿Tiene algún costo?", a: "No. La portabilidad es un derecho gratuito." },
        { q: "¿Cuánto tarda?", a: "Una vez entregada la SIM y validado el NIP, el proceso toma 24 horas hábiles." }
    ];

    const toggle = (i) => active = active === i ? null : i;
    const handleKey = (e, i) => { if(e.key === 'Enter') toggle(i); }
</script>

<section class="section fade-up">
    <div class="container" style="max-width: 800px;">
        <h1 class="text-neon" style="text-align: center; margin-bottom: 40px;">Preguntas Frecuentes</h1>

        <div style="display: flex; flex-direction: column; gap: 20px;">
            {#each faqs as faq, i}
                <div 
                    class="glass-card" 
                    style="padding: 0; cursor: pointer; transition: 0.3s;" 
                    role="button" 
                    tabindex="0"
                    on:click={() => toggle(i)}
                    on:keydown={(e) => handleKey(e, i)}
                >
                    <div style="padding: 24px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 600; font-size: 1.05rem; color: var(--text-main);">{faq.q}</span>
                        <span style="color: var(--primary); font-size: 1.5rem; font-weight: 700;">{active === i ? '−' : '+'}</span>
                    </div>
                    {#if active === i}
                        <div style="padding: 0 24px 24px; color: var(--text-muted); border-top: 1px solid var(--glass-border);">
                            <p style="margin-top: 16px; margin-bottom: 0;">{faq.a}</p>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</section>