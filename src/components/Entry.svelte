<script lang="ts">
    import { extractDate, store, update_entry, type DayIdentifier, type IEntry } from "../store";
    import Nightmares from "./Nightmares.svelte";
    import Time from "./Time.svelte";

    export let previous: DayIdentifier | null = null;
    export let day: {
        day: number;
        date: Date;
        identifier: DayIdentifier;
    } | null;

    $: may_entry = day && extractDate($store.entries, day.identifier);

    function edit_entry(date: DayIdentifier, update: (e: IEntry) => Partial<IEntry>) {
        store.update(state => ({
            ...state,
            entries: update_entry(state.entries, date, update)
        }));
    }

    function set_medication(date: DayIdentifier, time: string | null){
        edit_entry(date, _ => time === null ? 
            { medications: [] } :
            { medications: [{name: 'Default', time}]}
        );
    }
</script>
<div class="night cell {day}">
    {#if day}
    <Nightmares date={day.identifier}></Nightmares>
    {/if}
</div>
<div class="day cell column {day}">
    {#if day}
    <em>{day.day}</em>
    <span class="row">⏰ <Time value={may_entry?.wakeup} on:change={e => day && edit_entry(day.identifier, _ => ({wakeup: e.detail}))} /></span>
    <span class="row"><span title={may_entry?.medications[0]?.name}>💊</span> <Time
        value={may_entry?.medications?.length ?? 0 > 0 ? may_entry?.medications[0].time : null}
        on:change={e => day && set_medication(day.identifier, e.detail)}
    /></span>
    <span class="row">💤 <Time value={may_entry?.bedtime} on:change={e => day && edit_entry(day.identifier, _ => ({bedtime: e.detail}))} /></span>
    {/if}
</div>
<style lang="scss">
    .cell{
        text-align: center;
        padding: 3px;

        &.null{
            opacity: 0.5;
        }
    }

    .column{
        display: flex;
        flex-direction: column;
    }

    .row{
        display: flex;
        flex-direction: row;
    }

    .day{
        background: lightblue;
    }

    .night{
        background: darken(lightblue, 30%);
    }
</style>