<script lang="ts">
	import { formatTime } from "$lib/utils";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>{data.airport.code} {data.airport.city} airport  - Italian flights</title>
</svelte:head>

<main class="mx-auto w-full max-w-6xl py-12 px-6">
    <h1  class="text-4xl font-bold tracking-tight lg:text-5xl">{ data.airport.city } { data.airport.code }</h1>

    <div class="grid grid-cols-2 divide-x mt-6 border rounded-lg">
        <!-- Show Arrivals -->
        <div class="py-4">
            <h2 class="border-b pb-2 px-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Arrivals</h2>
            <ul class="divide-y mt-4 px-4">
                {#each data.arrivals as arrival}
                    <li class="py-2 px-1">
                        <a href="/flights/{arrival.flightData?.id}" class="text-primary hover:underline">Flight {arrival.flightData?.id}</a>
                        from <a href="/airports/{arrival.from?.code}" class="text-primary hover:underline">{arrival.from?.city} {arrival.from?.code}</a>,
                        duration: {formatTime(arrival.flightData?.duration)}
                    </li>
                {/each}
            </ul>
        </div>

        <!-- Show departures -->
        <div class="py-4">
            <h2 class="border-b pb-2 px-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Departures</h2>
            <ul class="divide-y mt-4 px-4">
                {#each data.departures as departure}
                    <li class="py-2 px-1">
                        <a href="/flights/{departure.flightData?.id}" class="text-primary hover:underline">Flight {departure.flightData?.id}</a>
                        from <a href="/airports/{departure.to?.code}" class="text-primary hover:underline">{departure.to?.city} {departure.to?.code}</a>,
                        duration: {formatTime(departure.flightData?.duration)}
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</main>