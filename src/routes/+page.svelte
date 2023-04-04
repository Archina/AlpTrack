<script lang="ts">
    import { addMonths, subMonths, getMonth, getYear } from 'date-fns';
    import Debug from "../components/Debug.svelte";
    import Entry from "../components/Entry.svelte";
    import Export from "../components/ImExport.svelte";

    // Define an array of month names
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const week_days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Get the current year and month
    let currentDate = addMonths(new Date(),1);
    let currentYear = getYear(currentDate);
    let currentMonth = getMonth(currentDate);

    // Calculate the number of days in the current month
    let daysInMonth; let firstDay; let days: ({day: number, date: Date, identifier: [number, number, number]} | null)[];
    init();

    function init(){
        currentMonth = new Date(currentYear, currentMonth - 1.0).getMonth();

        // Calculate the number of days in the current month
        daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        firstDay = new Date(currentYear, currentMonth, 1).getDay();

        // Create an array of objects representing the days of the current month
        days = [...Array.from({length: firstDay}, _ => null),...Array.from({ length: daysInMonth }, (_, i) => ({
            day: i + 1,
            date: new Date(currentYear, currentMonth, i + 1),
            identifier: [currentYear, currentMonth, i+1] as [number, number, number]
        }))];
    }

    function previous_month(){
        currentDate = subMonths(currentDate, 1);
        if(getMonth(currentDate) === 0){
            currentMonth = getMonth(currentDate) + 12;
            currentYear--;
        } else {
            currentMonth = getMonth(currentDate);
            currentYear = getYear(currentDate);
        }
        init();
    }

    function next_month(){
        currentDate = addMonths(currentDate, 1);
        if(getMonth(currentDate) === 0){
            currentMonth = getMonth(currentDate) - 12;
            currentYear;
        } else {
            currentMonth = getMonth(currentDate);
            currentYear = getYear(currentDate);
        }
        init();
    }
</script>
<div class="flex-row">
    <h1 class="cell">AlpTrack Calendar</h1>
    <Export />
</div>
<h2 class="cell text-smol">by Desdemona, 4 Earth-Girl</h2>
<div class="calendar">
    <div class="month-indicator cell">
        <button on:click={previous_month}>&#x2039;</button>
        <span class="month">{months[currentMonth]}</span>
        <button on:click={next_month}>&#x203A;</button> {currentYear}</div>
    <div class="days-grid">
        {#each week_days as day}
        <div class="night cell">🌙</div>
        <div class="day-indicator day cell">🔆 {day}</div>
        {/each}
        {#each days as day}
        <Entry day={day}></Entry>
        {/each}
    </div>
</div>
<Debug></Debug>
<style lang="scss">
    h1{
        margin-bottom: 0px;
    }
    h2{
        font-size: 0.5rem;
        margin-top: 0px;
        margin-bottom: 2rem;
    }

    .flex-row{
        display: flex;
        flex-direction: row;
        align-items: baseline;
        column-gap: 4px;
    }

    .cell{
        text-align: center;
        padding: 3px;
    }

    .calendar{
        width: 1100px;
    }

    .month-indicator{
        font-weight: bold;
    }

    .month{
        width: 80px;
        display: inline-block;
    }

    .day-indicator{
        font-weight: bold;
    }

    .days-grid{
        color: black;
        margin: 5px;
        padding: 3px;
        display: grid;
        grid-gap: 1px;
        background-color: rgba(255,255,255,0.1);
        grid-template-columns: repeat(14, 1fr);
    }

    .day{
        background: lightblue;
    }

    .night{
        background: darken(lightblue, 30%);
    }
</style>


