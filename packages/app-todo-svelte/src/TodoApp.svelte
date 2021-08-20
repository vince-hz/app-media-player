<script>
    export let current = "";
    export let list = [];

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()
    $: dispatch("update:current", current)
    $: dispatch("update:list", list)

    function commit() {
        list = [...list, current];
        current = ""
    }
</script>

<input type="text" bind:value={current} on:change={commit}>
<ul>
{#each list as item, i}
    <li>{i + 1}: {item}</li>
{/each}
</ul>

<style>
    :global(.netless-todo-app-container) {
        display: flex;
        flex-direction: column;
        position: relative;
        height: 100%;
    }
</style>
