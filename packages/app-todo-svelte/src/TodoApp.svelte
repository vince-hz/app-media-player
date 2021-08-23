<script lang="ts">
    export let current = "";
    export let list: string[] = []

    function commit(e: KeyboardEvent) {
        if (e.key === "Enter") {
            list = [...list, current]
            current = ""
        }
    }

    function remove(i: number) {
        list.splice(i, 1)
        list = [...list]
    }

    import { createEventDispatcher } from "svelte"
    const dispatch = createEventDispatcher()
    $: dispatch("update", { current, list })
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
