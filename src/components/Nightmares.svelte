<script lang="ts">
    import { extractDate, IDream, newEntry, store, update_entry, upsert_entry, type DayIdentifier } from '../store';

    export let date: DayIdentifier;

    $: may_entry = extractDate($store.entries, date);

    function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
        return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
    }

    function add_entry() {
        store.update(state => ({
            ...state,
            entries: upsert_entry(state.entries, date, {...newEntry(), dreams: [IDream.Normal]})
        }));
    }

    function add_dream() {
        store.update(state => ({
            ...state,
            entries: update_entry(state.entries, date, entry => ({dreams: [...entry.dreams, IDream.Normal]}))
        }));
    }

    function edit_dream(idx: number, value: IDream | null) {
        if(value){
            store.update(state => ({
                ...state,
                entries: update_entry(state.entries, date, entry => ({dreams: entry.dreams.map((e, i) => i === idx ? value : e)}))
            }));
        }
    }

    function map_dreams(dream: IDream){
        switch(dream) {
            case IDream.Normal: return '😌';
            case IDream.SemiDistressing: return '😖';
            case IDream.Distressing: return '😵‍💫';
        }
    }
</script>
{#if may_entry !== null}
{#each may_entry.dreams as dream, index}
<select name="dream" id={`${dream}_${index}`} value={IDream[dream]} on:change={e => edit_dream(index, parseInt(IDream[e.target?.value]))}>
    {#each enumKeys(IDream) as severity}
    <option style="color:green;" value={severity}>{map_dreams(IDream[severity])}</option>
    {/each}
</select>
{/each}
<button on:click={add_dream}>+</button>
{:else}
<button on:click={add_entry}>+</button>
{/if}
<style lang='scss'>
    select, button{
        background-color: transparent;
        transition: background-color 0.33s;
        border: 0px;
        cursor: pointer;
        &:hover{
            background-color: transparentize(#000000, 0.8);
        }
    }
    select{
        padding: 5px;
        font-size: 1.3rem;
    }
    button{
        padding: 5px 10px;
    }
</style>