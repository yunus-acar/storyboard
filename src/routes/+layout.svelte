<script>
	import Header from './Header.svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	import '../app.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
	<Toaster />
</div>
