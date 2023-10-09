<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
    import { formatTime } from "$lib/utils";
	import type { PageData } from "./$types";

    export let data: PageData;
</script>

<main class="mx-auto w-full max-w-6xl py-12 px-6">
    <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">Flight { data.flight.id }</h1>
    <p class="text-lg font-light mt-3">Flight { data.flight.id } from { data.flight.origin?.city } { data.flight.origin?.code }  to { data.flight.destination?.city } { data.flight.destination?.code } in { formatTime(data.flight.duration) }</p>

    <h2 class="border-b pb-2 text-3xl font-semibold tracking-tight transition-colors mt-4 first:mt-0">Passengers</h2>
    
    <form method="post" class="mt-4">
        <Button>Book flight</Button>
    </form>

    <ul class="mt-4 space-y-2 list-disc">
        {#each data.passengers as passenger}
            <li class="text-sm">{ passenger.firstname } { passenger.lastname } ({ passenger.email })</li>
        {/each}
    </ul>
</main>