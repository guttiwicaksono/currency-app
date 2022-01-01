<template>
  <div class="row py-4">
    <div class="col-12 col-lg-6 border border-dark">
      <div class="row border-dark border-bottom">
        <h3>
          USD - United States Dollars 
        </h3>
        <div class="d-flex justify-content-between align-items-center">
          <h2>
            USD
          </h2>
          <div class="init-ex">
            <input type="number" name="Initial Value" v-model="exchange">
          </div>
        </div>
      </div>
      <div class="list-exchange mt-4">
        <div 
          class="border border-dark d-flex align-items-center mb-4"
          v-for="(ex,index) in listExchange" :key="index">
          <div class="detail-exchange flex-fill border-end border-dark p-2">
            <div class="d-flex justify-content-between align-items-center">
              <h3>
                {{ex.query.to}}
              </h3>
              <span class="currency">
                {{formatPrice(ex.result)}}
              </span>
            </div>
            <b>
              {{ex.query.to}} - {{symbolDescription(ex.query.to)}}
            </b>
            <p>
              1 USD = {{ex.query.to}} {{formatPrice(ex.info.rate)}}
            </p>
          </div>
          <div class="remove-exchange p-2">
            <span @click="removeExchange(index)" role="button"> 
              (-)
            </span>
          </div>
        </div>
      </div>

      <div class="add-exchange mb-4">

        <!-- drop down add currencies -->
        <div class="dropdown" v-show="!selectedAdd">
          <button class="btn btn-secondary dropdown-toggle w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            + Add More Currencies
          </button>
          <ul class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton1">
            <li
              v-for="(curr,index) in listAvailableCurrencies"
              :value="curr"
              :key="index">
              <span class="dropdown-item" @click="selectedAdd = curr">
                {{curr}}
              </span>
            </li>
          </ul>
        </div>

        <!-- Submit add currencies  -->
        <div class="input-group mb-3" v-show="selectedAdd">
          <input type="text" class="form-control" v-model="selectedAdd" aria-label="Recipient's username" aria-describedby="button-addon2">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addExchange()">Submit</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      exchange : 10,
      currency : 'USD',
      selectedAdd : '',
      delayRequest : 0,
    }
  },
  computed:{
    listExchange(){
      return this.$store.state.exchange.listExchange
    },
    listAvailableCurrencies(){
      return this.$store.state.exchange.listAvailableCurrencies
    },
    listSymbols(){
      return this.$store.state.exchange.listSymbols
    }
  },
  watch: {
    exchange: function(val) {
      if(val){
        // Clear delayrequest every change of exchange 
        if(this.delayRequest) {
            clearTimeout(this.delayRequest);
        }

        let this_ = this

        // Add delay every change of exchange 
        this.delayRequest = setTimeout(async function() {
            this_.initExchange()
        }, 500); 
      }
    },
  },
  mounted() {
    this.initExchange()
    this.getSymbols()
  },
  methods: {
    async initExchange() {
      let data = {
        'amount' : this.exchange,
        'currency' : this.currency,
      }
      await this.$store.dispatch('exchange/fetchInitExchange',data)
    },
    async addExchange() {
      let data = {
        'amount' : this.exchange,
        'currency' : this.currency,
        'selected' : this.selectedAdd
      }
      await this.$store.dispatch('exchange/addExchange',data)
      this.selectedAdd = ''
    },
    removeExchange(index) {
      this.$store.commit('exchange/setRemoveExchange',index)
      this.$store.commit('exchange/setRemoveCurrencies',index)
    },
    getSymbols(){
      this.$store.dispatch('exchange/fetchSymbols')
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    symbolDescription(value) {
      if(value && this.listSymbols){
        // Get currency description 
        let symbol = this.listSymbols[value].description
        return symbol
      } else {
        return ''
      }
    }
  }
};
</script>
