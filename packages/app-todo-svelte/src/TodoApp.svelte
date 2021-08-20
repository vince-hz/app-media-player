<script>
    export let current = "";
    export let list = [];

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()
    $: dispatch("update:current", current)
    $: dispatch("update:list", list)

    function commit(e) {
        if (e.key === "Enter") {
            list = [...list, current];
            current = ""
        }
    }

    function remove(i) {
        list.splice(i, 1)
        list = [...list]
    }
</script>

<input type="text" bind:value={current} on:keydown={commit}>
<ol>
{#each list as item, i}
    <li>{item} <button on:click={() => remove(i)}>X</button></li>
{/each}
</ol>

<style>
    :global(.netless-todo-app-container) {
        display: flex;
        flex-direction: column;
        position: relative;
        height: 100%;
    }
</style>
