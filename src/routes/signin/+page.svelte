<script lang="ts">
    import { enhance } from "$app/forms";
	import Button from "$lib/components/ui/button/button.svelte";
	import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import { Loader2 } from "lucide-svelte";
	import type { ActionData } from "./$types";

    let showPassword = false;
    let autenticating = false;

    export let form: ActionData;
</script>

<main class="w-full max-w-lg mx-auto py-12">
    <h1 class="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">Sign in</h1>
    <form method="post" class="mt-6 grid gap-4" 
    use:enhance={() => {
        autenticating = true;
        return async ({ update }) => {
            autenticating = false;
            update();
        }
    }}
    >
        <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input 
            name="email" 
            id="email" 
            type="email" 
            autocomplete="email"
            /> 
        </div>

        <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input 
            name="password" 
            id="password" 
            type={showPassword ? "text" : "password"} 
            autocomplete="current-password"
            />
            <div class="flex gap-2 items-center">
                <Checkbox id="show-password" bind:checked={showPassword} />
                <Label for="show-password">Show password</Label>
            </div>
        </div>

        <Button disabled={autenticating}>
            {#if autenticating}
                <Loader2 class="mr-2 w-4 h-4 animate-spin" />
            {/if}
            Sign in
        </Button>
        {#if form?.message}
            <span class="text-destructive text-sm font-medium">{ form.message }</span>
        {/if}
    </form>
</main>