<script>
    import { user } from '../../store/auth';
    import { push } from 'svelte-spa-router';

    let email = '';
    let password = '';
    let error = '';
    let isLoading = false;

    async function handleLogin() {
        error = '';
        isLoading = true;
        // Simulamos delay para efecto visual
        await new Promise(r => setTimeout(r, 800));

        if (email === 'admin@leadconnect.com' && password === 'admin123') {
            user.set({ name: 'Administrador', email });
            push('/manager'); 
        } else {
            error = 'Credenciales incorrectas';
            isLoading = false;
        }
    }

    function goHome() {
        push('/');
    }
</script>

<section class="login-section">
    <button class="btn-back-home" on:click={goHome} title="Volver al inicio">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Volver al Inicio</span>
    </button>

    <div class="login-glow"></div>

    <div class="container login-container">
        <div class="glass-card login-card fade-up">
            
            <div class="login-header">
                <h2>Bienvenido</h2>
                <p>Ingresa tus credenciales de administrador</p>
            </div>

            <form on:submit|preventDefault={handleLogin}>
                
                <div class="field">
                    <label for="email">Correo Electrónico</label>
                    <div class="input-wrapper">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <input type="email" id="email" bind:value={email} placeholder="nombre@leadconnect.com" required>
                    </div>
                </div>
                
                <div class="field">
                    <label for="password">Contraseña</label>
                    <div class="input-wrapper">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <input type="password" id="password" bind:value={password} placeholder="••••••••" required>
                    </div>
                </div>

                {#if error}
                    <div class="login-error">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        {error}
                    </div>
                {/if}

                <button type="submit" class="btn btn-primary btn-block" disabled={isLoading}>
                    {#if isLoading} Cargando... {:else} Ingresar {/if}
                </button>

            </form>
        </div>
    </div>
</section>