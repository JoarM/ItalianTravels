<script>
	import { buttonVariants } from '$lib/components/ui/button';
	import '../app.postcss';
</script>

<header class="sticky top-0 border-b backdrop-blur-sm h-14 flex items-center justify-center px-6">
	<div class="w-full max-w-6xl flex items-center justify-between">
		<div>
			<span class="font-bold text-2xl">Italian Flights</span>
			<nav>

			</nav>
		</div>
		
		<div>
			<a href="/signin" class={buttonVariants({ variant: "outline" })}>
				Sign in
			</a>
			<a href="/signup" class={buttonVariants({ variant: "default" })}>
				Sign up
			</a>
		</div>
	</div>
</header>

<slot />
