<script>
    import { onMount } from "svelte";
    
    onMount(() => {
        window.scrollTo(0, 0);
    });
</script>

<section class="section legal-section">
    <div class="bg-glow"></div>

    <div class="container" style="max-width: 900px; position: relative; z-index: 10;">
        <div class="glass-card legal-card">
            
            <div class="legal-header">
                <h1 class="text-gradient">Términos y Condiciones</h1>
                <div class="legal-version">
                    <span>VERSIÓN 2.1 • ACTUALIZADO: DICIEMBRE 2025</span>
                </div>
            </div>

            <div class="consent-box">
                <div class="consent-label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    <span>AVISO DE PRIVACIDAD Y CONSENTIMIENTO</span>
                </div>

                <div class="consent-content">
                    <div class="consent-icon-wa">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    <div>
                        <p>
                            Al interactuar con nuestra plataforma, usted <strong class="text-white">autoriza expresamente</strong> a LeadConnect a contactarlo vía WhatsApp para el seguimiento de su trámite.
                        </p>
                        <p class="consent-note">
                            Este consentimiento es revocable en cualquier momento escribiendo "BAJA".
                        </p>
                    </div>
                </div>
            </div>

            <article class="legal-article">
                
                <div class="clause-group">
                    <h3 class="clause-title">1. Aceptación de los Términos</h3>
                    <p>
                        El presente documento establece los términos y condiciones (en adelante, los "Términos") que rigen el uso de la plataforma tecnológica <strong>LeadConnect</strong> (en adelante, el "Servicio"), la cual facilita el proceso de Portabilidad Numérica hacia la red de AT&T México mediante el uso de Inteligencia Artificial. Al acceder o utilizar el Servicio, usted acepta estar legalmente vinculado por estos Términos.
                    </p>
                </div>

                <div class="clause-group">
                    <h3 class="clause-title">2. Descripción del Servicio</h3>
                    <p>LeadConnect actúa en calidad de intermediario tecnológico autorizado. El Servicio incluye:</p>
                    <ul class="styled-list">
                        <li>Recepción automatizada de documentos vía Chatbot.</li>
                        <li>Validación preliminar de identidad mediante <strong>IA y OCR</strong>.</li>
                        <li>Gestión de la solicitud ante el IFT y AT&T.</li>
                        <li>Seguimiento del estatus de entrega de la tarjeta SIM.</li>
                    </ul>
                </div>

                <div class="clause-group">
                    <h3 class="clause-title">3. Política de Uso de WhatsApp (Meta)</h3>
                    <p>LeadConnect utiliza la API oficial de WhatsApp Business. Para cumplir con las políticas de Meta:</p>
                    <ul class="styled-list">
                        <li><strong>Opt-In (Suscripción):</strong> El Usuario debe iniciar la conversación o aceptar explícitamente recibir mensajes.</li>
                        <li><strong>Ventana de 24 Horas:</strong> Las respuestas automáticas operan dentro de la ventana de servicio de 24h. Pasado este tiempo, solo enviaremos plantillas aprobadas.</li>
                        <li><strong>Seguridad:</strong> No se solicitará información financiera sensible (tarjetas completas) a través del chat.</li>
                    </ul>
                </div>

                <div class="clause-group">
                    <h3 class="clause-title">4. Verificación de Identidad</h3>
                    <p>Para garantizar la seguridad, el Usuario acepta:</p>
                    <ul class="styled-list">
                        <li><strong>Validación Documental:</strong> Autoriza el procesamiento de su INE/IFE o Pasaporte para extracción de datos.</li>
                        <li><strong>Coincidencia de Datos:</strong> El sistema verificará que el nombre coincida con el titular de la línea.</li>
                        <li><strong>Anti-Fraude:</strong> LeadConnect bloqueará números con comportamiento sospechoso o spam.</li>
                    </ul>
                </div>

                <div class="clause-group">
                    <h3 class="clause-title">5. Protección de Datos</h3>
                    <p>De conformidad con la LFPDPPP, garantizamos que:</p>
                    <ul class="styled-list">
                        <li><strong>Encriptación:</strong> Comunicaciones cifradas de extremo a extremo (E2E) y almacenamiento AES-256.</li>
                        <li><strong>Finalidad Única:</strong> Los datos se usan <strong>exclusivamente</strong> para el trámite de portabilidad. No se venden ni comparten con terceros ajenos.</li>
                        <li><strong>Eliminación:</strong> Documentos sensibles se eliminan de servidores activos tras 30 días.</li>
                    </ul>
                </div>

                <div class="clause-group">
                    <h3 class="clause-title">6. Derechos ARCO</h3>
                    <p>
                        Puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición enviando una solicitud a: <a href="mailto:privacidad@leadconnect.mx" class="link-highlight">privacidad@leadconnect.mx</a>.
                    </p>
                </div>

                <div class="clause-group">
                    <h3 class="clause-title">7. Limitación de Responsabilidad</h3>
                    <p>LeadConnect no se hace responsable por:</p>
                    <ul class="styled-list">
                        <li>Negativas del IFT derivadas de adeudos previos o datos incorrectos proporcionados por el usuario.</li>
                        <li>Fallas temporales en la red de WhatsApp o conectividad de internet ajenas a nuestro servicio.</li>
                        <li>Retrasos en la entrega imputables exclusivamente a los servicios de paquetería (DHL, FedEx).</li>
                    </ul>
                </div>

                <div class="clause-group">
                    <h3 class="clause-title">8. Modificaciones</h3>
                    <p>
                        Nos reservamos el derecho de modificar estos Términos para cumplir con cambios legales o mejoras en el servicio. Las modificaciones entran en vigor inmediatamente tras su publicación en este sitio.
                    </p>
                </div>

            </article>

            <div class="legal-footer">
                <p>¿Tienes dudas sobre estos términos?</p>
                <button class="btn btn-secondary" on:click={() => window.history.back()}>Volver al Inicio</button>
            </div>

        </div>
    </div>
</section>