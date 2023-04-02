<script lang="ts">
    import Debug from "../components/Debug.svelte";
    import Entry from "../components/Entry.svelte";
    import Nightmares from "../components/Nightmares.svelte";
    import Time from "../components/Time.svelte";

    // Define an array of month names
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const week_days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Get the current year and month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Calculate the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    // Create an array of objects representing the days of the current month
    const days = [...Array.from({length: firstDay}, _ => null),...Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        date: new Date(currentYear, currentMonth, i + 1),
        identifier: [currentYear, currentMonth, i+1] as [number, number, number]
    }))];
</script>
<h1 class="cell">AlpTrack Calendar</h1>
<h2 class="cell text-smol">by Desdemona, 4 Earth-Girl</h2>
<div class="calendar">
    <div class="month-indicator cell">{months[currentMonth]} {currentYear}</div>
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


