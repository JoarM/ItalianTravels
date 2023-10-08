<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/components/ui/button/button.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import * as Select from "$lib/components/ui/select";
	import { Loader2 } from "lucide-svelte";
	import type { ActionData, PageData } from "./$types";

    export let data: PageData;
    export let form: ActionData;

    let origin: HTMLInputElement;
    let destination: HTMLInputElement;
    let creating = false;
</script>

<main class="mx-auto w-full max-w-6xl py-12 px-6">
    <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">Create flight</h1>
    <form method="post" class="mt-6 grid gap-4" use:enhance={() => {
        creating = true;
        return async ({ update }) => {
            creating = false;
            update();
        }
    }}>
        <div class=" grid sm:grid-cols-3 gap-3">
            <div class="grid gap-2">
                <Label class="w-fit" for="originInput">Origin</Label>
                <Select.Root onSelectedChange={(e) => origin.value = JSON.stringify(e?.value)}>
                    <Select.Trigger id="originInput">
                        <Select.Value placeholder="Select origin" />
                    </Select.Trigger>
                    <Select.Content>
                        {#each data.airports as airport}
                            <Select.Item value={airport.code} label={`${airport.city} ${airport.code}`}>
                                {airport.city} {airport.code}
                            </Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
                <input type="hidden" bind:this={origin} name="origin">
            </div>
            
            <div class="grid gap-2">
                <Label class="w-fit" for="destinationInput">Destination</Label>
                <Select.Root onSelectedChange={(e) => destination.value = JSON.stringify(e?.value)}>
                    <Select.Trigger id="destinationInput">
                        <Select.Value placeholder="Select destination" />
                    </Select.Trigger>
                    <Select.Content>
                        {#each data.airports as airport}
                            <Select.Item value={airport.code} label={`${airport.city} ${airport.code}`}>
                                {airport.city} {airport.code}
                            </Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
                <input type="hidden" bind:this={destination} name="destination">
            </div>
            
            <div class="grid gap-2">
                <Label class="w-fit" for="duration">Duration</Label>
                <Input id="duration" name="duration" placeholder="Duration in minutes" />
            </div>
        </div>
        
        <Button disabled={creating}>
            {#if creating}
                <Loader2 class="mr-2 w-4 h-4 animate-spin" />
            {/if}
            {creating ? "Adding flight" : "Add flight"}
        </Button>
        
        {#if form?.message}
            <p class="text-destructive text-sm font-medium">{ form.message }</p>
        {/if}

        {#if form?.success}
            <p class="text-sm font-medium">Flight created succesfully</p>
        {/if}
    </form>
</main>