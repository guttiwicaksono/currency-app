import Vue from "vue";

Vue.filter("currency",  function(value)  {
    if (value) {
      return value.toLocaleString('id-ID', {maximumFractionDigits:0})
    }
});