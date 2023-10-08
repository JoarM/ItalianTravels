<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import type { PageData } from "./$types";
	import '../app.postcss';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';

	export let data: PageData;
</script>

<header class="sticky top-0 border-b backdrop-blur-sm h-16 flex items-center justify-center">
	<div class="w-full max-w-6xl px-6 flex items-center justify-between">
		<div>
			<a href="/" class="font-bold text-2xl">Italian Flights</a>
			<nav>

			</nav>
		</div>
		
		<form method="post">
			{#if data.user}
				<span class="mr-3 text-lg font-semibold">{ data.user.firstname }</span>
				<Button variant="secondary" formaction="/signout" type="submit" role="button">Signout</Button>
			{:else}
				<a href="/signin" class={cn(buttonVariants({ variant: "outline" }), "mr-2")}>
					Sign in
				</a>
				<a href="/signup" class={buttonVariants({ variant: "default" })}>
					Sign up
				</a>
			{/if}
			</form>
	</div>
</header>

<slot />
