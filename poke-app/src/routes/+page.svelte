<script>
    import "../app.css"
    import Pagination from '../components/Pagination.svelte';

    const homeButtonsArray = [
        {
            route: "/all-pokemons?page=1",
            label: "All Pokemons"
        },
        {
            route: "/find-pokemon",
            label: "Find pokemon"
        }
    ]
</script>

<div class="home-page">
    <div class="home-block">
        <h1 class="home-page-title">
            Poke app, finally...
        </h1>
        <ul class="home-page-buttons">
            {#each homeButtonsArray as button}
                <li>
                    <a href={button.route}>{button.label}</a>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .home-page {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .home-block {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .home-page-title {
        font-size: 30px;
        font-weight: 600;
    }

    .home-page-buttons {
        display: flex;
        gap: 10px;
        height: 40px;
    }

    .home-page-buttons li a{
        display: inline-block;
        padding: 10px;
        border-radius: 5px;
        background: beige;
        transition: ease-in-out 0.3s;
    }

    .home-page-buttons li a:hover{
        color: beige;
        background: cadetblue;
    }
</style>
