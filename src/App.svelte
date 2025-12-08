<script>
	import Router from "svelte-spa-router";

	import Home from "./routes/Home.svelte";
	import Terminos from "./routes/terminos/Terminos.svelte";
	import Contacto from "./routes/contacto/Contacto.svelte";
	import FAQ from "./routes/faq/FAQ.svelte";

	const routes = {
		"/": Home,
		"/terminos": Terminos,
		"/contacto": Contacto,
		"/faq": FAQ
	};
</script>

<nav>
	<div class="logo">LeadConnect</div>

	<div class="links">
		<a href="#/">Inicio</a>
		<a href="#/terminos">Términos</a>
		<a href="#/contacto">Contacto</a>
		<a href="#/faq">FAQ</a>
	</div>
</nav>

<main>
	<Router {routes} />
</main>

<footer>
	© {new Date().getFullYear()} LeadConnect — Todos los derechos reservados.
</footer>

<style>
	@import "./app.css";
</style>
