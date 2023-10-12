<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/components/ui/button/button.svelte";
    import { formatTime } from "$lib/utils";
	import type { ActionData, PageData } from "./$types";

    export let data: PageData;
    export let form: ActionData;
</script>

<main class="mx-auto w-full max-w-6xl py-12 px-6">
    <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">Flight { data.flight.id }</h1>
    <p class="text-lg font-light mt-3">Flight { data.flight.id } from { data.flight.origin?.city } { data.flight.origin?.code }  to { data.flight.destination?.city } { data.flight.destination?.code } in { formatTime(data.flight.duration) }</p>

    <h2 class="border-b pb-2 text-3xl font-semibold tracking-tight transition-colors mt-4 first:mt-0">Passengers</h2>
    
    <form method="post" class="mt-4" use:enhance>
        <Button>Book flight</Button>
        {#if form?.message}
            <p class="text-sm mt-2 font-medium text-destructive">{ form.message }</p>
        {/if}
        {#if form?.success}
            <p class="mt-2 text-sm font-medium">U are now book for this flight</p>
        {/if}
    </form>

    <ul class="mt-4 space-y-2 list-disc px-3">
        {#each data.passengers as passenger}
            <li class="text-sm">{ passenger.firstname } { passenger.lastname } ({ passenger.email })</li>
        {/each}
    </ul>
</main>