<script>
    const waLink = "https://wa.me/5212219190807";
</script>

<section class="section fade-up">
  <div class="container">
    <div class="contact-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;">
        
        <div>
            <h1 class="text-neon" style="margin-bottom: 24px;">Hablemos</h1>
            <p style="font-size: 1.1rem; margin-bottom: 40px;">
                Si necesitas ayuda técnica o administrativa, nuestro equipo de soporte está disponible.
            </p>

            <div style="margin-bottom: 40px;">
                <div style="margin-bottom: 24px;">
                    <h4 style="color: var(--primary); font-size: 0.9rem; text-transform: uppercase;">Email Corporativo</h4>
                    <span style="color: var(--text-main); font-size: 1.1rem;">contacto@leadconnect.mx</span>
                </div>
                <div>
                    <h4 style="color: var(--primary); font-size: 0.9rem; text-transform: uppercase;">Horario</h4>
                    <span style="color: var(--text-main); font-size: 1.1rem;">Lun - Vie: 9:00 AM - 6:00 PM</span>
                </div>
            </div>

            <div class="glass-card" style="padding: 24px; border-color: rgba(37, 211, 102, 0.4); background: rgba(37, 211, 102, 0.05);">
                <h4 style="color: #25D366; margin-bottom: 15px;">¿Necesitas respuesta rápida?</h4>
                <a href={waLink} target="_blank" class="btn" style="background: transparent; border: 1px solid #25D366; color: #25D366; width: 100%;">
                    Abrir WhatsApp
                </a>
            </div>
        </div>

        <form class="glass-card" on:submit|preventDefault>
            <h3 style="margin-bottom: 24px;">Ticket de Soporte</h3>
            
            <div class="field">
                <label>Nombre</label>
                <input type="text" placeholder="Tu nombre" />
            </div>
            
            <div class="field">
                <label>Email</label>
                <input type="email" placeholder="correo@ejemplo.com" />
            </div>

            <div class="field">
                <label>Mensaje</label>
                <textarea rows="4" placeholder="Describe tu solicitud..."></textarea>
            </div>

            <button class="btn btn-primary" style="width: 100%;">Enviar Mensaje</button>
        </form>
    </div>
  </div>
</section>

<style>
@media (max-width: 768px) {
    .contact-grid { grid-template-columns: 1fr !important; }
}
</style>