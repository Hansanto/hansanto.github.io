<script lang="ts">
    let count = $state(0);
    const increment = () => {
        count += 1;
    };
</script>

<button onclick={increment}>
    count is {count}
</button>

<style lang="scss">
    button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border: none;
        border-radius: 0.25rem;
        background-color: #007bff;
        color: white;
        cursor: pointer;

        &:hover {
            background-color: #0056b3;
        }
    }
</style>
