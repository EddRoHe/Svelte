<script>
    import { user } from '../../store/auth';
    import { push } from 'svelte-spa-router';
    import { tick } from 'svelte';

    // --- 1. PROTECCIÓN DE RUTA ---
    $: if (!$user) { push('/login'); }
    
    function doLogout() { 
        user.set(null); 
    }

function goHome() {
        // 1. Navegamos al Home primero
        push('/');
        
        // 2. Cerramos la sesión inmediatamente después
        // Usamos un pequeño timeout para asegurar que el router ya cambió de página
        setTimeout(() => {
            user.set(null);
        }, 50);
    }

    // --- 2. ESTADO GLOBAL ---
    let activeTab = 'templates'; 
    let selectedChatId = 1;
    let newMessage = "";
    let chatScrollContainer;

    // --- 3. ESTADO DE PROCESOS (UI) ---
    let isAnalyzing = false;
    let isSending = false;      
    let isCreating = false;     
    let showSuccessView = false;      
    let showCreateSuccess = false;    

    // --- 4. MODALS ---
    let showSummaryModal = false; 
    let showSendModal = false;    
    let showPreviewModal = false; 
    let showRejectModal = false;  
    let showCreateModal = false;  

    // --- 5. TOASTS ---
    let toast = null; 

    // --- 6. DATOS DINÁMICOS ---
    let selectedTemplate = null;
    let targetPhone = "";
    let templateParams = {}; 
    let extractedVars = []; 

    // Objeto para Nueva Plantilla
    let newTemplate = { name: "", category: "MARKETING", lang: "ES", body: "" };

    // --- DATOS MOCK ---
    const stats = [
        { label: "Mensajes Totales", value: "14.2k", trend: "+12%", icon: "message-square" },
        { label: "Leads Captados", value: "342", trend: "+5%", icon: "users" },
        { label: "Tasa Respuesta IA", value: "98.5%", trend: "+1%", icon: "cpu" },
        { label: "Plantillas Enviadas", value: "1,205", trend: "-2%", icon: "send" }
    ];

    const topTemplates = [
        { name: "Bienvenida 2025", sent: 1200, open: 90 },
        { name: "Promo Flash", sent: 850, open: 45 },
        { name: "Recordatorio Pago", sent: 600, open: 75 },
    ];

    let chats = [
        { id: 1, name: "Carlos López", role: "Lead Calificado", time: "10:42 AM", unread: 2, avatar: "C" },
        { id: 2, name: "Ana Martínez", role: "Cliente Activo", time: "Ayer", unread: 1, avatar: "A" },
        { id: 3, name: "Soporte Tech", role: "Interno", time: "Mar", unread: 0, avatar: "S" },
    ];

    let chatHistory = {
        1: [ { type: 'bot', text: 'Hola Carlos. ¿Buscas portabilidad?' }, { type: 'user', text: 'Hola, sí. ¿Tienen cobertura en CDMX?' } ],
        2: [ { type: 'user', text: 'Ya envié el pago.' }, { type: 'bot', text: 'Gracias Ana, validando...' } ],
        3: [ { type: 'bot', text: 'Ticket cerrado.' } ]
    };

    let templates = [
        { id: 1, title: "Bienvenida_2025", category: "MARKETING", lang: "ES", status: "APPROVED", sent: 1240, openRate: 85, body: "Hola {{1}}, bienvenido a LeadConnect. Tu portabilidad inicia hoy." },
        { id: 2, title: "Recordatorio_Pago", category: "UTILITY", lang: "ES", status: "APPROVED", sent: 540, openRate: 92, body: "Estimado {{1}}, recordamos que tu factura vence el {{2}}." },
        { id: 3, title: "Promo_Flash_Dic", category: "MARKETING", lang: "ES", status: "REJECTED", sent: 0, openRate: 0, body: "Oferta relámpago: {{1}}% de descuento solo hoy." },
        { id: 4, title: "Reactivacion_Lead", category: "MARKETING", lang: "ES", status: "APPROVED", sent: 890, openRate: 45, body: "Hola {{1}}, hace tiempo no sabemos de ti. ¿Sigues interesado en {{2}}?" },
    ];

    // --- 7. LÓGICA REACTIVA ---
    $: activeChat = chats.find(c => c.id === selectedChatId);
    $: currentMessages = chatHistory[selectedChatId] || [];
    
    // Vista Previa Dinámica (Reemplaza {{1}} por el valor del input)
    $: sendPreviewText = (selectedTemplate && selectedTemplate.body) 
        ? fillTemplate(selectedTemplate.body, templateParams) 
        : "";

    function fillTemplate(text, params) {
        let result = text;
        Object.keys(params).forEach(key => {
            const val = params[key] || `{{${key}}}`; 
            result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), val);
        });
        return result;
    }

    // --- 8. FUNCIONES DE ACCIÓN ---

    function showToast(message, type = 'success') {
        toast = { message, type };
        setTimeout(() => toast = null, 4000);
    }

    // --- CREAR PLANTILLA ---
    function openCreateModal() {
        newTemplate = { name: "", category: "MARKETING", lang: "ES", body: "" };
        showCreateSuccess = false;
        showCreateModal = true;
    }

    function submitNewTemplate() {
        if (!newTemplate.name || !newTemplate.body) {
            showToast("Completa todos los campos", "error");
            return;
        }
        isCreating = true;
        setTimeout(() => {
            isCreating = false;
            showCreateSuccess = true;
            
            templates = [{
                id: Date.now(),
                title: newTemplate.name,
                category: newTemplate.category,
                lang: newTemplate.lang,
                status: "PENDING",
                sent: 0,
                openRate: 0,
                body: newTemplate.body
            }, ...templates];

            setTimeout(() => { closeModal(); }, 2500);
        }, 2000);
    }

    // --- ENVIAR PLANTILLA ---
    async function openSendModal(tpl) {
        selectedTemplate = { ...tpl }; 
        
        if (selectedTemplate.status === 'REJECTED') {
            showRejectModal = true;
            return;
        }
        
        targetPhone = "";
        templateParams = {};
        extractedVars = [];
        showSuccessView = false;
        
        const regex = /\{\{(\d+)\}\}/g;
        const matches = selectedTemplate.body.match(regex);
        
        if (matches) {
            extractedVars = [...new Set(matches.map(m => m.replace(/[{}]/g, '')))];
            extractedVars.forEach(v => templateParams[v] = "");
        }

        await tick();
        showSendModal = true;
    }

    function openPreviewModal(tpl) {
        selectedTemplate = tpl;
        showPreviewModal = true;
    }

    function confirmSend() {
        if (!targetPhone || targetPhone.length < 10) {
            showToast("Ingresa un número válido (10 dígitos)", "error");
            return;
        }
        
        isSending = true;
        
        setTimeout(() => {
            isSending = false;
            showSuccessView = true;
            
            templates = templates.map(t => {
                if(t.id === selectedTemplate.id) return { ...t, sent: t.sent + 1 };
                return t;
            });
            
            setTimeout(() => { closeModal(); }, 2500);
        }, 1500);
    }

    function closeModal() {
        showSummaryModal = false;
        showSendModal = false;
        showSuccessView = false;
        showPreviewModal = false;
        showRejectModal = false;
        showCreateModal = false;
    }

    // --- CHAT INTERNO ---
    async function selectChat(id) {
        selectedChatId = id;
        chats = chats.map(c => c.id === id ? { ...c, unread: 0 } : c);
        await tick();
        scrollToBottom();
    }
    
    function scrollToBottom() {
        if (chatScrollContainer) chatScrollContainer.scrollTop = chatScrollContainer.scrollHeight;
    }

    function triggerAISummary() {
        isAnalyzing = true;
        setTimeout(() => { isAnalyzing = false; showSummaryModal = true; }, 1500);
    }
    
    async function sendMessage() {
        if (!newMessage.trim()) return;
        chatHistory[selectedChatId] = [...chatHistory[selectedChatId], { type: 'bot', text: newMessage }];
        newMessage = "";
        await tick();
        scrollToBottom();
    }
</script>

<div class="dash-layout">
    
    {#if toast}
        <div class="toast-notification slide-up">
            <div class="toast-icon">{toast.type === 'success' ? '✅' : '⚠️'}</div>
            <div class="toast-content">{toast.message}</div>
        </div>
    {/if}

    <aside class="dash-sidebar expanded">
        <div class="dash-brand">LC<span>.</span>Manager</div>
        
        <button class="dash-back-btn" on:click={goHome}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            <span>Volver al Inicio</span>
        </button>

        <nav class="dash-nav">
            <button class="dash-nav-item" class:active={activeTab === 'stats'} on:click={() => activeTab = 'stats'}>
                <span class="nav-label">Métricas</span>
            </button>
            <button class="dash-nav-item" class:active={activeTab === 'chat'} on:click={() => activeTab = 'chat'}>
                <span class="nav-label">Mensajes</span>
            </button>
            <button class="dash-nav-item" class:active={activeTab === 'templates'} on:click={() => activeTab = 'templates'}>
                <span class="nav-label">Plantillas</span>
            </button>
        </nav>
        
        <div class="dash-user">
            <button class="dash-logout" on:click={doLogout}>Cerrar Sesión</button>
        </div>
    </aside>

    <main class="dash-main">
        <header class="dash-header">
            <h2 class="section-title">
                {#if activeTab === 'templates'} Biblioteca de Plantillas
                {:else if activeTab === 'stats'} Reportes de Rendimiento
                {:else} Panel de Control {/if}
            </h2>
            <div class="user-badge"><div class="status-dot"></div> {$user.name}</div>
        </header>

        <div class="dash-content">
            {#if activeTab === 'templates'}
                <div class="templates-header">
                    <button class="btn btn-primary" on:click={openCreateModal}>+ Nueva Plantilla</button>
                </div>
                
                <div class="templates-grid-modern">
                    {#each templates as tpl}
                        <div class="tpl-modern-card">
                            <div class="tpl-top">
                                <div class="tpl-icon-category">{tpl.category === 'MARKETING' ? '📢' : '🔔'}</div>
                                <span class="status-badge" class:approved={tpl.status==='APPROVED'} class:rejected={tpl.status==='REJECTED'} class:pending={tpl.status==='PENDING'}>{tpl.status}</span>
                            </div>
                            
                            <h3 class="tpl-title">{tpl.title}</h3>
                            <div class="tpl-mini-stats">
                                <div class="stat-item"><span class="stat-lbl">Envíos</span><span class="stat-num">{tpl.sent}</span></div>
                                <div class="stat-item"><span class="stat-lbl">Apertura</span><span class="stat-num" style="color: {tpl.openRate > 80 ? '#4ade80' : '#fbbf24'}">{tpl.openRate}%</span></div>
                            </div>
                            <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: {tpl.openRate}%; background: {tpl.openRate > 80 ? '#4ade80' : '#fbbf24'}"></div></div>
                            <p class="tpl-body-preview">{tpl.body}</p>
                            <div class="tpl-footer">
                                <button class="tpl-action-btn" on:click={() => openSendModal(tpl)}>Enviar ➜</button>
                                <button class="tpl-action-btn outline" on:click={() => openPreviewModal(tpl)}>Vista Previa</button>
                            </div>
                        </div>
                    {/each}
                </div>

            {:else if activeTab === 'chat'}
                <div class="chat-interface">
                    <div class="chat-list glass-card">
                        <div class="chat-search"><input type="text" placeholder="Buscar..."></div>
                        <div class="chat-scroller">
                            {#each chats as chat}
                                <div class="chat-item" class:active={selectedChatId === chat.id} on:click={() => selectChat(chat.id)}>
                                    <div class="chat-avatar">{chat.avatar}</div>
                                    <div class="chat-info">
                                        <div class="chat-top"><span class="chat-name">{chat.name}</span></div>
                                        <p class="chat-preview">{chatHistory[chat.id] ? chatHistory[chat.id].slice(-1)[0].text : '...'}</p>
                                    </div>
                                    {#if chat.unread > 0} <span class="unread-badge">{chat.unread}</span> {/if}
                                </div>
                            {/each}
                        </div>
                    </div>
                    <div class="chat-window-panel glass-card">
                        <div class="chat-panel-header">
                            <div class="chat-user-details"><h3>{activeChat.name}</h3><span class="tag-lead">{activeChat.role}</span></div>
                            <button class="btn-ai-summary" on:click={triggerAISummary} disabled={isAnalyzing}>
                                {#if isAnalyzing} <span class="spinner-sm"></span> Analizando... {:else} ✨ Ver Resumen IA {/if}
                            </button>
                        </div>
                        <div class="chat-messages-area" bind:this={chatScrollContainer}>
                            {#each currentMessages as msg}
                                <div class="message-row {msg.type === 'user' ? 'msg-incoming' : 'msg-outgoing'}">
                                    <div class="message-bubble">{msg.text}<span class="msg-time">10:00</span></div>
                                </div>
                            {/each}
                        </div>
                        <div class="chat-input-row">
                            <form on:submit|preventDefault={sendMessage} style="flex:1; display:flex; gap:10px;">
                                <input type="text" placeholder="Escribe..." bind:value={newMessage}>
                                <button type="submit" class="btn-send">></button>
                            </form>
                        </div>
                    </div>
                </div>

            {:else if activeTab === 'stats'}
                 <div class="kpi-grid">
                    {#each stats as stat}
                        <div class="glass-card kpi-card">
                            <div class="kpi-icon-box">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                            </div>
                            <div>
                                <span class="kpi-label">{stat.label}</span>
                                <h3 class="kpi-value">{stat.value}</h3>
                                <span class="kpi-change positive">{stat.trend} vs mes anterior</span>
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="charts-row">
                    <div class="glass-card chart-card">
                        <h3>🏆 Top Plantillas (Apertura)</h3>
                        <div class="css-bar-chart-horizontal">
                            {#each topTemplates as t}
                                <div class="chart-row">
                                    <div class="chart-label">{t.name}</div>
                                    <div class="chart-bar-bg"><div class="chart-bar-fill" style="width: {t.open}%"></div></div>
                                    <div class="chart-value">{t.open}%</div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <div class="glass-card chart-card">
                        <h3>💰 Desglose de Costos (Meta)</h3>
                        <div class="cost-breakdown">
                            <div class="cost-item">
                                <div class="cost-header"><span>Marketing</span><span>$0.06 / msg</span></div>
                                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 70%; background: #a855f7;"></div></div>
                                <span class="cost-total">$840.00 este mes</span>
                            </div>
                            <div class="cost-item">
                                <div class="cost-header"><span>Utilidad (Utility)</span><span>$0.03 / msg</span></div>
                                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 30%; background: #0EA5E9;"></div></div>
                                <span class="cost-total">$210.00 este mes</span>
                            </div>
                            <div class="velocity-widget"><span>⚡ Tiempo promedio respuesta IA: <strong>1.2 seg</strong></span></div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </main>

    {#if showSummaryModal}
        <div class="modal-backdrop fade-in" on:click={closeModal}>
            <div class="modal-glass slide-up" on:click|stopPropagation>
                <div class="modal-header">
                    <h3>✨ Análisis de Inteligencia Artificial</h3>
                    <button class="modal-close" on:click={closeModal}>&times;</button>
                </div>
                <div class="modal-body">
                    <div class="ai-content">
                        📌 <strong>Resumen del Cliente:</strong><br>
                        - Interés: Portabilidad numérica a AT&T.<br>
                        - Estatus: Pendiente de documentos.<br><br>
                        💡 <strong>Sugerencia:</strong> Enviar plantilla de requisitos.
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" on:click={closeModal}>Cerrar</button>
                    <button class="btn btn-primary" on:click={() => { closeModal(); showToast('Guardado en CRM'); }}>Guardar</button>
                </div>
            </div>
        </div>
    {/if}

    {#if showCreateModal}
        <div class="modal-backdrop fade-in" on:click={closeModal}>
            <div class="modal-glass modal-large slide-up" on:click|stopPropagation>
                {#if showCreateSuccess}
                    <div class="success-view">
                        <div class="success-icon-anim" style="background: rgba(99, 102, 241, 0.1);">
                            <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path class="checkmark" d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline class="checkmark" points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h2>¡Enviado a Meta!</h2>
                        <p>La plantilla está en revisión. Te notificaremos cuando sea aprobada.</p>
                    </div>
                {:else}
                    <div class="modal-header">
                        <h3>Nueva Plantilla de WhatsApp</h3>
                        <button class="modal-close" on:click={closeModal}>&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-grid">
                            <div class="form-group-modal">
                                <label>Nombre de la Plantilla</label>
                                <input type="text" bind:value={newTemplate.name} placeholder="ej: promo_diciembre">
                            </div>
                            <div class="form-row">
                                <div class="form-group-modal">
                                    <label>Categoría</label>
                                    <select class="modal-select" bind:value={newTemplate.category}>
                                        <option value="MARKETING">Marketing</option>
                                        <option value="UTILITY">Utilidad</option>
                                    </select>
                                </div>
                                <div class="form-group-modal">
                                    <label>Idioma</label>
                                    <select class="modal-select" bind:value={newTemplate.lang}>
                                        <option value="ES">Español</option>
                                        <option value="EN">Inglés</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group-modal">
                                <label>Cuerpo del Mensaje (Usa &#123;&#123;1&#125;&#125; para variables)</label>
                                <textarea class="modal-textarea" bind:value={newTemplate.body} placeholder={'Hola {{1}}, gracias por tu compra...'}></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" on:click={closeModal} disabled={isCreating}>Cancelar</button>
                        <button class="btn btn-primary" on:click={submitNewTemplate} disabled={isCreating}>
                            {#if isCreating} <span class="spinner-sm"></span> Enviando... {:else} Crear y Enviar {/if}
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    {/if}

    {#if showSendModal && selectedTemplate}
        <div class="modal-backdrop fade-in" on:click={closeModal}>
            <div class="modal-glass modal-large slide-up" on:click|stopPropagation>
                {#if showSuccessView}
                    <div class="success-view">
                        <div class="success-icon-anim">
                            <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="#25D366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path class="checkmark" d="M20 6L9 17l-5-5"/>
                            </svg>
                        </div>
                        <h2>¡Enviado Exitosamente!</h2>
                        <p>La plantilla se ha entregado a {targetPhone}</p>
                    </div>
                {:else}
                    <div class="modal-header">
                        <h3>Configurar Envío: {selectedTemplate.title}</h3>
                        <button class="modal-close" on:click={closeModal}>&times;</button>
                    </div>
                    <div class="modal-body-grid">
                        <div class="modal-form-col">
                            <div class="form-group-modal">
                                <label>Número de WhatsApp (Destino)</label>
                                <input type="tel" placeholder="ej. 52155..." bind:value={targetPhone} autofocus>
                            </div>
                            {#if extractedVars.length > 0}
                                <div class="vars-divider">Variables Dinámicas</div>
                                {#each extractedVars as v}
                                    <div class="form-group-modal">
                                        <label>Variable {`{{${v}}}`}</label>
                                        <input type="text" placeholder="Valor..." bind:value={templateParams[v]}>
                                    </div>
                                {/each}
                            {:else}
                                <p style="font-size: 0.9rem; color: #94a3b8; margin-top: 10px;">Sin variables.</p>
                            {/if}
                        </div>
                        <div class="modal-preview-col">
                            <label style="display:block; margin-bottom:10px; color:#94a3b8; font-size:0.85rem;">Vista Previa</label>
                            <div class="phone-mockup">
                                <div class="phone-screen">
                                    <div class="phone-msg-bubble">
                                        <p>{sendPreviewText}</p> 
                                        <span class="phone-time">10:30 AM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" on:click={closeModal} disabled={isSending}>Cancelar</button>
                        <button class="btn btn-primary" on:click={confirmSend} disabled={isSending}>
                            {#if isSending} <span class="spinner-sm"></span> Enviando... {:else} Confirmar Envío {/if}
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    {/if}

    {#if showRejectModal && selectedTemplate}
        <div class="modal-backdrop fade-in" on:click={closeModal}>
            <div class="modal-glass slide-up" style="max-width: 400px; text-align: center;" on:click|stopPropagation>
                <div class="success-view">
                    <div class="success-icon-anim" style="background: rgba(239, 68, 68, 0.1);">
                        <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                    <h2 style="color: #ef4444;">Plantilla Rechazada</h2>
                    <p>Meta ha rechazado esta plantilla por violar políticas. No se puede enviar.</p>
                    <button class="btn btn-secondary" style="margin-top: 20px;" on:click={closeModal}>Entendido</button>
                </div>
            </div>
        </div>
    {/if}

    {#if showPreviewModal && selectedTemplate}
        <div class="modal-backdrop fade-in" on:click={closeModal}>
            <div class="modal-glass slide-up" style="max-width: 400px;" on:click|stopPropagation>
                <div class="modal-header">
                    <h3>Vista Previa: {selectedTemplate.title}</h3>
                    <button class="modal-close" on:click={closeModal}>&times;</button>
                </div>
                <div class="modal-body">
                    <div class="phone-mockup">
                        <div class="phone-screen">
                            <div class="phone-msg-bubble">
                                <p>{selectedTemplate.body}</p>
                                <span class="phone-time">10:30 AM</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" on:click={closeModal}>Cerrar</button>
                </div>
            </div>
        </div>
    {/if}

</div>