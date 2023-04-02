<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let value: string | null = null;

    const dispatch = createEventDispatcher<{
        change: string | null
    }>();

    function updateTime(event: { currentTarget: EventTarget & HTMLInputElement; }) {
        let nextValue = event.currentTarget.value;
        dispatch("change", nextValue.length ? nextValue : null);
    }

    function clearTime(){
        dispatch("change", null);
    }
</script>
<div class="timeInput">
    <button on:click={clearTime}>❌</button>
    <input value={value} on:change={updateTime} type="time" min="00:00" max="24:00" />
</div>
<style lang='scss'>
    .timeInput{
        position: relative;
        margin: 0px 4px;

        button{
            transition: background-color 0.3s;
            position: absolute;
            top: -9px;
            right: -9px;
            overflow: hidden;
            width: 18px;
            height: 18px;
            border: none;
            // border: 1px solid red;
            background-color: transparent;
            padding: 0px;
            cursor: pointer;
            font-size: 0.5rem;

            &:hover{
                background-color: transparentize(red, 0.2);
            }
        }
    }

    input{
        background-color: transparent;
        border: 0px;
    }
</style>