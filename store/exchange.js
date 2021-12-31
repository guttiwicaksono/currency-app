import axios from 'axios'

export const state = () => ({
	homeBanner : null,
    listCurrencies : [
        'IDR',
        'EUR',
        'GBP',
        'SGD'
    ],
    listAvailableCurrencies : [
        'USD',
        'CAD',
        'IDR',
        'GBP',
        'CHF',
        'SGD',
        'INR',
        'MYR',
        'JPY',
        'KRW'
    ],
    listExchange : []
})

export const getters = {
    getListExchange (state) {
        return state.listExchange
	},
    getListAvailableCurrencies (state) {
        return state.listAvailableCurrencies
	},
}

export const mutations = {
    setListExchange (state, payload) {
        state.listExchange.push(payload) 
	},
    setEmptyListExchange (state){
        state.listExchange = []
    },
    setListCurrencies (state, payload) {
        state.listCurrencies.push(payload) 
	},
    setRemoveExchange (state,payload) {
        state.listExchange.splice(payload, 1);
    },
    setRemoveCurrencies (state,payload) {
        state.listCurrencies.splice(payload, 1);
    }
}

export const actions = {
    fetchInitExchange({commit,state},data){
        commit('setEmptyListExchange')
        try {
            let response

            // Define list of init Currencies from state listCurrencies 
            let listCurrencies = state.listCurrencies

            listCurrencies.forEach(async curr => {
                response = await axios.get('https://api.exchangerate.host/convert?from='+data.currency+'&to='+curr+'&amount='+data.amount+'&places=2')
                commit('setListExchange', response.data)
            });
        } catch (error) {
            console.log('err', error)
        }
    },
    async addExchange({commit,state},data){
        try {
            let response = await axios.get('https://api.exchangerate.host/convert?'+data.currency+'&to='+data.selected+'&amount='+data.amount+'&places=2')
            commit('setListExchange', response.data)
            commit('setListCurrencies', data.selected)
        } catch (error) {
            console.log('err', error)
        }
    }
}