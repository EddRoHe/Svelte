<script>
  import { onMount } from 'svelte';

  onMount(() => {
    document.querySelectorAll('.faq-header').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Cerrar todos
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

        // Abrir solo el actual si no estaba abierto
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  });
</script>

<div class="faq-wrap">
  <div class="faq-container">
    <h2 class="faq-title">Preguntas Frecuentes</h2>

    <div class="faq-item">
      <button class="faq-header" type="button">
        ¿Qué es LeadConnect?
        <span class="icon">+</span>
      </button>
      <div class="faq-content">
        <p>
          LeadConnect es una plataforma de gestión y contacto comercial especializada en la promoción, validación y activación de planes AT&T mediante procesos digitales verificados.
        </p>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-header" type="button">
        ¿LeadConnect es una empresa de AT&T?
        <span class="icon">+</span>
      </button>
      <div class="faq-content">
        <p>
          No. LeadConnect actúa como facilitador tecnológico y canal de gestión comercial autorizado para la activación de planes y portabilidades hacia AT&T.
        </p>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-header" type="button">
        ¿Me contactarán por WhatsApp?
        <span class="icon">+</span>
      </button>
      <div class="faq-content">
        <p>
          Sí. Al enviar tus datos autorizas a LeadConnect a contactarte por WhatsApp para el seguimiento de tu trámite de portabilidad, activación de SIM y soporte del servicio.
        </p>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-header" type="button">
        ¿Tiene algún costo?
        <span class="icon">+</span>
      </button>
      <div class="faq-content">
        <p>
          El uso de LeadConnect no tiene costo para el usuario. Los cargos aplicables corresponden únicamente a los planes contratados con AT&T.
        </p>
      </div>
    </div>

  </div>
</div>
