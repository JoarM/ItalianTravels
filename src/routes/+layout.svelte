<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import type { PageData } from "./$types";
	import '../app.postcss';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';

	export let data: PageData;
</script>

<svelte:head>
	<title>Italian flights</title>
</svelte:head>

<header class="sticky top-0 border-b backdrop-blur-sm h-16 flex items-center justify-center bg-background/50">
	<div class="w-full max-w-6xl px-6 flex items-center justify-between">
		<div class="flex gap-4 items-center justify-center">
			<a href="/" class="font-bold text-2xl">Italian Flights</a>
			<nav>
				<ul class="flex items-center justify-center gap-2">
					<li>
						<a href="/flights" class={cn(buttonVariants({ variant: "outline" }))}>Flights</a>
					</li>
					<li>
						<a href="/airports" class={cn(buttonVariants({ variant: "outline" }))}>Airports</a>
					</li>
				</ul>
			</nav>
		</div>
		
		<form method="post">
			{#if data.user}
				<span class="mr-3 text-lg font-semibold">{ data.user.firstname }</span>
				<Button variant="secondary" formaction="/signout?previous={$page.url.pathname}" type="submit" role="button">Signout</Button>
			{:else}
				<a href="/signin?previous={$page.url.pathname}" class={cn(buttonVariants({ variant: "outline" }), "mr-2")}>
					Sign in
				</a>
				<a href="/signup?previous={$page.url.pathname}" class={buttonVariants({ variant: "default" })}>
					Sign up
				</a>
			{/if}
		</form>
	</div>
</header>

<slot />
