<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<h1>Flights</h1>

<ul>
    {#each data.flights as flight}
        <li>{ flight.id }: From { flight.origin } to { flight.destination }</li>
    {/each}
</ul>