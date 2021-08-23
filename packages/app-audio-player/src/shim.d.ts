declare module "*.svelte" {
    export default import("svelte").SvelteComponent;
}
declare module "*.svelte?style" {
    const contents: string;
    export default contents;
}
