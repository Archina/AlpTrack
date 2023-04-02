<script lang="ts">
    import { store } from '../store';
</script>
<pre>{JSON.stringify($store.entries, null, 2)}</pre>
<style lang='scss'>
    pre{
        padding: 10px;
        background-color: transparentize(#000000, 0.8);
        align-self: stretch;
    }
</style>