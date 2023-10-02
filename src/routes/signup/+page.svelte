<script lang="ts">
    import { enhance } from "$app/forms";
	import Button from "$lib/components/ui/button/button.svelte";
	import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";

    let showPassword = false;
</script>

<main class="w-full max-w-lg mx-auto mt-12">
    <h1 class="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">Sign up</h1>
    <form method="post" use:enhance class="mt-6 grid gap-4">
        <div class="grid gap-2">
            <Label for="firstname">Firstname</Label>
            <Input name="firstname" id="firstname" />
        </div>

        <div class="grid gap-2">
            <Label for="lastname">Lastname</Label>
            <Input name="lastname" id="lastname" />
        </div>

        <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input name="email" id="email" type="email" />
        </div>

        <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input name="password" id="password" type={showPassword ? "text" : "password"} />
            <div class="flex gap-2 items-center">
                <Checkbox id="show-password" bind:checked={showPassword} />
                <Label for="show-password">Show password</Label>
            </div>
        </div>

        <Button>Sign up</Button>
    </form>
</main>