<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: [ 'options'],
  mounted() {
    this.renderChart(this.options)
  },
}
</script>

<style></style>
