<script>
  export let title = "Título";
  export let value = "0";
</script>

<div class="card">
  <h3>{title}</h3>
  <p class="number">{value}</p>
</div>

<style>
  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    text-align: center;
  }
  .number {
    font-size: 2.5rem;
    font-weight: bold;
    color: #007bff;
    margin: 0;
  }
  h3 {
    margin-top: 0;
    font-size: 1.1rem;
    color: #666;
  }
</style>