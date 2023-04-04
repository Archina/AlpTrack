<script lang="ts">
    import {store, type IState} from '../store';
    import { z } from "zod";
    import {stateSchema} from '../schema/state'

    let fileContent: IState | null = null;

    async function handleFileInput(event: Event & {
        currentTarget: EventTarget & HTMLInputElement;
    }) {
        const files = event.currentTarget.files;
        const file = files && files[0];
        
        if (!file) {
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
        try {
            const result = fileReader.result;
            if(result){
                const data = JSON.parse(result);
            
                let output = stateSchema.safeParse(data);

                if(output.success){
                    fileContent = output.data;
                    console.log("Success");
                    console.log(output.data);
                } else{
                    throw output.error;
                }
            }
        } catch (e) {
            fileContent = null;
        }
        };

        fileReader.readAsText(file);
    }

    function downloadJson() {
        const data = JSON.stringify($store, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        a.download = `alpTrack_${year}_${month}_${day}.json`;

        a.href = url;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
</script>
<button on:click={downloadJson}>Expørt</button>
<input type="file" accept=".json" on:change={e => handleFileInput(e)} />
