import { getCurrenciesRateApi, getCurrrenciesListApi } from "../api/api"
import { removeCurrency } from "../tools/removeCurrency"

const SET_CURRENCIES_RATE = 'SET_CURRENCIES_RATE'
const SET_CURRENCIES_LIST = 'SET_CURRENCIES_LIST'
const SET_CUTTED_LIST = 'SET_CUTTED_LIST'
const SET_CONVERTING_CURRENCY = 'SET_CONVERTING_CURRENCY'

const initialState = {
	currenciesRates: [
	],
	currenciesList: [],
	cuttedList: [],
	convertingCurrency: { cur: '', quantity: '' },
}


const currencyReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_CURRENCIES_RATE':
			return { ...state, currenciesRates: action.rates }

		case 'SET_CURRENCIES_LIST':
			return { ...state, currenciesList: action.list }
		case 'SET_CUTTED_LIST':
			return { ...state, cuttedList: action.list }
		case 'SET_CONVERTING_CURRENCY':
			return { ...state, convertingCurrency: action.cur }

		default:
			return state
	}
}

export const setCurrensiesRate = (rates) => ({ type: SET_CURRENCIES_RATE, rates })
export const setCurrensiesList = (list) => ({ type: SET_CURRENCIES_LIST, list })
export const setCuttedList = (list) => ({ type: SET_CUTTED_LIST, list })
export const setConvertingCurrency = (cur) => ({ type: SET_CONVERTING_CURRENCY, cur })


export const getCurrenciesRateThunk = (cur) => {
	return async dispatch => {
		const response = await getCurrenciesRateApi(cur)
		if (response.status === 200) {
			dispatch(setCurrensiesRate(removeCurrency(response.data[`${cur}`])))
		}

	}
}

export const getCurrrenciesListThunk = () => {
	return async dispatch => {
		const response = await getCurrrenciesListApi()
		if (response.status === 200) {

			dispatch(setCurrensiesList(removeCurrency(response.data)))
			dispatch(setCuttedList(removeCurrency(response.data)))
		}

	}
}

export default currencyReducer