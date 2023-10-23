<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button";
	import Label from "$lib/components/ui/label/label.svelte";
	import * as Select from "$lib/components/ui/select";
	import * as Table from "$lib/components/ui/table";
	import { cn, formatTime } from "$lib/utils";
	import type { PageData } from "./$types";
    import { createPagination, melt } from '@melt-ui/svelte';
    import { ChevronLeft, ChevronRight } from 'lucide-svelte';

    export let data: PageData;
    
    //Define reactive paginator
    $: ({
        elements: { root, pageTrigger, prevButton, nextButton },
        states: { pages, range },
    } = createPagination({
        count: data.flightCount,
        perPage: data.limit,
        defaultPage: 1,
        siblingCount: 1,
    }));
</script>

<svelte:head>
    <title>Flights - Italian flights</title>
</svelte:head>

<main class="mx-auto w-full max-w-6xl py-12 px-6">
    <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">Fligths</h1>

    <a href="/flights/create" class={cn(buttonVariants({ variant: "outline" }), "mt-3")}>Add flight</a>

    <!-- Table to show flights list -->
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
                    <Table.Cell class="w-24"><a href="/flights/{flight.id}" class={cn(buttonVariants({ variant: "link" }), "mx-auto") }>Go to fligth</a></Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>

    <!-- Paginator -->
    {#if data.flights.length}
        <p class="mt-2 text-sm text-muted-foreground">Showing flight { $range.start } - { $range.end } of { data.flightCount }</p>
    {:else}
        <p class="text-sm font-normal mt-4">No content for this selection.</p>
    {/if}

    <div class="grid grid-cols-3 gap-4 place-items-center mt-2">
        <div class="flex items-center justify-center justify-self-start gap-2">
            <Label for="limit">Items on this page</Label>
            <Select.Root>
                <Select.Trigger class="w-20" id="limit">
                    <Select.Value placeholder={data.limit.toString()}/>
                </Select.Trigger>
                <Select.Content>
                    <a href="/flights?start={data.start}&limit=10">
                        <Select.Item value="10">10</Select.Item>
                    </a>
                    <a href="/flights?start={data.start}&limit=25">
                        <Select.Item value="25">25</Select.Item>
                    </a>
                    <a href="/flights?start={data.start}&limit=50" class="w-full">
                        <Select.Item value="50">50</Select.Item>
                    </a>
                </Select.Content>
            </Select.Root>
        </div>
        
        
        <nav
        class="flex flex-col items-center gap-4"
        aria-label="pagination"
        use:melt={$root}
        >
            <div class="flex items-center gap-2">
                <a href="/flights?start={data.start - 1}&limit={data.limit}"
                class={cn(buttonVariants({ variant: "outline" }), `${data.start <= 1 && "opacity-50 pointer-events-none"}`)}
                use:melt={$prevButton}
                ><ChevronLeft class="square-4" />
                </a>
                {#each $pages as page (page.key)}
                {#if page.type === 'ellipsis'}
                    <span>...</span>
                {:else}
                    <a href="/flights?start={page.value}&limit={data.limit}"
                    class={cn(buttonVariants({ variant: "outline" }))}
                    use:melt={$pageTrigger(page)}>{page.value}</a
                    >
                {/if}
                {/each}
                <a href="/flights?start={data.start + 1}&limit={data.limit}"
                class={cn(buttonVariants({ variant: "outline" }), `${data.start * data.limit >= data.flightCount && "opacity-50 pointer-events-none"}`)}
                use:melt={$nextButton}><ChevronRight class="square-4" /></a
                >
            </div>
        </nav>
    </div>
</main>