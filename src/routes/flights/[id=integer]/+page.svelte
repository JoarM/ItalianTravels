<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/components/ui/button/button.svelte";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { formatTime } from "$lib/utils";
	import type { ActionData, PageData } from "./$types";

    export let data: PageData;
    export let form: ActionData;
</script>

<svelte:head>
    <title>Flight {data.flight.id} - Italian flights</title>
</svelte:head>

<main class="mx-auto w-full max-w-6xl py-12 px-6">
    <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">Flight { data.flight.id }</h1>
    <p class="text-lg font-light mt-3">Flight { data.flight.id } from { data.flight.origin?.city } { data.flight.origin?.code }  to { data.flight.destination?.city } { data.flight.destination?.code } in { formatTime(data.flight.duration) }</p>

    <h2 class="border-b pb-2 text-3xl font-semibold tracking-tight transition-colors mt-4 first:mt-0">Passengers</h2>
    
    <form method="post" class="mt-4" id="book" action="?/book" use:enhance>
        {#if !data.userOnFlight}
            <Button>Book flight</Button>
        {:else}
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button variant="destructive" type="button">Unbook flight</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Header>
                        <AlertDialog.Title>Confirm unbooking of flight { data.flight.id }</AlertDialog.Title>
                        <AlertDialog.Description>
                        Unbook your flight from { data.flight.origin?.city } to { data.flight.destination?.city } you can rebook your flight later if seats are still avilable.
                        </AlertDialog.Description>
                    </AlertDialog.Header>
                    <AlertDialog.Footer>
                        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                        <AlertDialog.Action formaction="?/unbook" type="submit" form="book">Unbook flight</AlertDialog.Action>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog.Root>
        {/if}
        
        {#if form?.message}
            <p class="text-sm mt-2 font-medium text-destructive">{ form.message }</p>
        {/if}
        {#if form?.success}
            <p class="mt-2 text-sm font-medium">{ form.success }</p>
        {/if}
    </form>

    <ul class="mt-4 space-y-2 list-disc px-3">
        {#each data.passengers as passenger}
            <li class="text-sm">{ passenger.firstname } { passenger.lastname } ({ passenger.email })</li>
        {/each}
    </ul>
</main>