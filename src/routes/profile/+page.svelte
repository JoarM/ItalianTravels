<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<main class="mx-auto w-full max-w-6xl py-12 px-6">
    <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">{ data.user?.firstname } { data.user?.lastname }</h1>
    <span class="text-sm mt-1 text-muted-foreground font-medium">{ data.user?.email }</span>

    <h2 class="border-b pb-2 text-3xl font-semibold tracking-tight transition-colors mt-6 first:mt-0">Your flights</h2>
    <ul class="mt-3">
        {#each data.flights as flight}
            <li class="flex items-center justify-between py-1 border-b">
                <span class="text-sm font-medium text-foreground">Flight { flight.id } from { flight.origin } to { flight.destination }</span>
                <a href="/flights/{flight.id}" class={buttonVariants({ variant: "link" })}>To flight</a>
            </li>
        {/each}
    </ul>
</main>