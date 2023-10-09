<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button";
	import * as Table from "$lib/components/ui/table";
	import { cn, formatTime } from "$lib/utils";
	import type { PageData } from "./$types";
    import { createPagination, melt } from '@melt-ui/svelte';
    import { ChevronLeft, ChevronRight } from 'lucide-svelte';

    export let data: PageData;

    const {
        elements: { root, pageTrigger, prevButton, nextButton },
        states: { pages, range },
    } = createPagination({
        count: data.flightCount,
        perPage: data.limit,
        defaultPage: 1,
        siblingCount: 1,
    });
</script>

<main class="mx-auto w-full max-w-6xl py-12 px-6">
    <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">Fligths</h1>

    <a href="/flights/create" class={cn(buttonVariants({ variant: "outline" }), "mt-3")}>Add flight</a>

    <Table.Root class="mt-4 p-4">
        <Table.Header>
            <Table.Row>
                <Table.Head class="w-28">Id</Table.Head>
                <Table.Head>From</Table.Head>
                <Table.Head>To</Table.Head>
                <Table.Head class="text-right">Duration</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each data.flights as flight}
                <Table.Row>
                    <Table.Cell>{ flight.id }</Table.Cell>
                    <Table.Cell>{ flight.origin }</Table.Cell>
                    <Table.Cell>{ flight.destination }</Table.Cell>
                    <Table.Cell class="text-right">{ formatTime(flight.duration) }</Table.Cell>
                    <Table.Cell class="w-24"><a href="/fligts/{flight.id}" class={cn(buttonVariants({ variant: "link" }), "mx-auto") }>Go to fligth</a></Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
    {#if data.flights.length}
        <p class="mt-2 text-sm text-muted-foreground">Showing flight { $range.start } - { $range.end } of { data.flightCount }</p>
    {:else}
        <p class="text-sm font-normal mt-4">No content for this selection.</p>
    {/if}

    <nav
    class="flex flex-col items-center gap-4"
    aria-label="pagination"
    use:melt={$root}
    >
        <div class="flex items-center gap-2">
            <button
            class={cn(buttonVariants({ variant: "outline" }))}
            use:melt={$prevButton}><ChevronLeft class="square-4" /></button>
            {#each $pages as page (page.key)}
            {#if page.type === 'ellipsis'}
                <span>...</span>
            {:else}
                <button
                class={cn(buttonVariants({ variant: "outline" }))}
                use:melt={$pageTrigger(page)}>{page.value}</button
                >
            {/if}
            {/each}
            <button
            class={cn(buttonVariants({ variant: "outline" }))}
            use:melt={$nextButton}><ChevronRight class="square-4" /></button
            >
        </div>
    </nav>
</main>