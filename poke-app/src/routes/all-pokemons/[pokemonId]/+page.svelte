<script lang="ts">

    const { data } = $props();

    const processStatColor = (statMark: number) => {
        if (statMark <= 85) {
            return '#D2222D'
        } else if (statMark <= 170) {
            return '#FFBF00'
        } else if (statMark <= 260) {
            return '#238823'
        }
    }

</script>

<div class="pokemon_container">
    <div class="pokemon_content">
        {#if data}
            <img src={data.gif} alt="" class="pokemon_content_img" />
            <ul class="pokemon_content_stats">
                {#each data.stats as stat}
                    <li class="pokemon_content_stat_item">
                        <span class="pokemon_content_stat_name">{stat.stat.name}</span>
                        <span class="pokemon_content_stat_mark" style={`color: ${processStatColor(stat.base_stat)}`}>{stat.base_stat}</span>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>

<style>
    .pokemon_container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 20px 0;
    }

    .pokemon_content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 80px;
        background: antiquewhite;
        border: 4px solid chocolate;
        border-radius: 20px;
        padding: 30px;
    }

    .pokemon_content .pokemon_content_img {
        width: 250px;
        height: auto;
    }

    .pokemon_content_stats {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .pokemon_content_stat_item {
        display: flex;
        justify-content: space-between;
        gap: 50px;
    }

    .pokemon_content_stat_item span {
        font-size: 25px;
    }
</style>