<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>Homepage - Italian flights</title>
</svelte:head>

<main class="mx-auto w-full max-w-6xl grid place-items-center py-12 px-6">
    <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">Italian Flights</h1>
    <div class="grid md:grid-cols-2 gap-8 w-full mt-4">
        <!-- Show flights -->
        <article class="p-3 rounded-md border">
            <h2 class="border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Fligths</h2>
            <ul class="mt-2">
                {#each data.flights as flight}
                    <li>
                        <a href="/flights/{flight.id}" class={buttonVariants({ variant: "link" })}>From { flight.origin } to { flight.destination }</a>
                    </li>
                {/each}
            </ul>
            <a href="/flights" class={cn(buttonVariants({ variant: "secondary" }), "mt-2")}>View all</a>
        </article>

        <!-- Show airports -->
        <article class="p-3 rounded-md border">
            <h2 class="border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Airports</h2>
            <ul class="mt-2">
                {#each data.airports as airport}
                    <li>
                        <a href="/airports/{airport.code}" class={buttonVariants({ variant: "link" })}>{ airport.city } ({ airport.code })</a>
                    </li>
                {/each}
            </ul>
            <a href="/airports" class={cn(buttonVariants({ variant: "secondary" }), "mt-2")}>View all</a>
        </article>
    </div>
</main>