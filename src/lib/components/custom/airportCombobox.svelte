<script lang="ts">
    import { createCombobox, melt } from '@melt-ui/svelte';
    import { Check, Search } from 'lucide-svelte';
    import { fly } from 'svelte/transition';

    type Airport = {
        code: string;
        city: string | null;
    }

    export let airports: Airport[];
    export let placeholder: string;
    export let name: string;

    const {
        elements: { menu, input, option },
        states: { open, inputValue, touchedInput, selected },
        helpers: { isSelected },
    } = createCombobox<any>({
        forceVisible: true,
    });
 
    $: if (!$open) {
        $inputValue = $selected?.label ?? '';
    }
 
    $: filteredAirports = $touchedInput
    ? airports.filter(({ city, code }) => {
        const normalizedInput = $inputValue.toLowerCase();
        return (
          city?.toLowerCase().includes(normalizedInput) ||
          code.toLowerCase().includes(normalizedInput)
        );
      })
    : airports;
</script>

<input type="hidden" value={$selected?.value ? $selected.value: ""} name={name}>
<div class="relative">
    <Search class="absolute top-1/2 -translate-y-1/2 left-3" size={16}/>
    <input 
    class="flex pl-9 h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
    placeholder={placeholder}
    use:melt={$input}
    >
</div>

{#if $open}
    <ul
    use:melt={$menu}
    transition:fly={{ duration: 150, y: -5 }}
    class="bg-background rounded-md px-2 py-3 border border-border"
    >
        {#each filteredAirports as airport}
            <li
            use:melt={$option({
                value: airport.code,
                label: `${airport.city} ${airport.code}`,
                disabled: false,
            })}
            class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
                {#if $isSelected(airport.code)}
                    <Check class="absolute left-2 top-1/2 -translate-y-1/2 text-foreground" size={16} />
                {/if}
                {airport.city} {airport.code}
            </li>
        {/each}
    </ul>
{/if}
