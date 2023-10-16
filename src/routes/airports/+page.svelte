<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
    import type { PageData } from "./$types";
	import Label from "$lib/components/ui/label/label.svelte";
	import * as Select from "$lib/components/ui/select";
    import { createPagination, melt } from '@melt-ui/svelte';
    import { ChevronLeft, ChevronRight } from 'lucide-svelte';

    export let data: PageData;

    $: ({
        elements: { root, pageTrigger, prevButton, nextButton },
        states: { pages, range },
    } = createPagination({
        count: data.airportCount,
        perPage: data.limit,
        defaultPage: 1,
        siblingCount: 1,
    }));
</script>

<main class="mx-auto w-full max-w-6xl py-12 px-6">
    <h1 class="text-4xl font-bold tracking-tight lg:text-5xl">Fligths</h1>

    <ul class="grid space-y-2 mt-3">
        {#each data.airports as airport}
            <a href="/airports/{airport.code}" class={cn(buttonVariants({ variant: "link" }), "justify-start")}>{ airport.city } { airport.code }</a>
        {/each}
    </ul>

    {#if data.airports.length}
        <p class="mt-2 text-sm text-muted-foreground">Showing flight { $range.start } - { $range.end } of { data.airportCount }</p>
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
                    <a href="/airports?start={data.start}&limit=10">
                        <Select.Item value="10">10</Select.Item>
                    </a>
                    <a href="/airports?start={data.start}&limit=25">
                        <Select.Item value="25">25</Select.Item>
                    </a>
                    <a href="/airports?start={data.start}&limit=50" class="w-full">
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
                <a href="/airports?start={data.start - 1}&limit={data.limit}"
                class={cn(buttonVariants({ variant: "outline" }), `${data.start <= 1 && "opacity-50 pointer-events-none"}`)}
                use:melt={$prevButton}
                ><ChevronLeft class="square-4" />
                </a>
                {#each $pages as page (page.key)}
                {#if page.type === 'ellipsis'}
                    <span>...</span>
                {:else}
                    <a href="/airports?start={page.value}&limit={data.limit}"
                    class={cn(buttonVariants({ variant: "outline" }))}
                    use:melt={$pageTrigger(page)}>{page.value}</a
                    >
                {/if}
                {/each}
                <a href="/airports?start={data.start + 1}&limit={data.limit}"
                class={cn(buttonVariants({ variant: "outline" }), `${data.start * data.limit >= data.airportCount && "opacity-50 pointer-events-none"}`)}
                use:melt={$nextButton}><ChevronRight class="square-4" /></a
                >
            </div>
        </nav>
    </div>
</main>