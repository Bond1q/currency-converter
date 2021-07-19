import axios from "axios";

export const getCurrenciesRateApi = async (cur) => {

	try {
		const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${cur}.json`)
		return response

	} catch (error) {
		return {
			status: 0
		}
	}

}

export const getCurrrenciesListApi = async () => {
	try {
		const response = await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json')
		return response

	} catch (error) {
		return {
			status: 0
		}
	}
}