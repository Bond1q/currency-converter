import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getCurrenciesRateThunk, getCurrrenciesListThunk } from '../../redux/currency-reducer'
import { Currency } from './Currency'

const Currencies = React.memo(props => {
	useEffect(() => {
		props.getCurrenciesRateThunk(props.convCur)
	}, [props.convCur, props.convCurQuantity])
	useEffect(() => {
		props.getCurrrenciesListThunk()
	}, [])
	let list = []

	const showCurrencies = (obj) => {
		list = []
		if (Object.keys(obj).length > 0) {
			makeCurrencyList(obj)
		} else {
			makeCurrencyList(props.currenciesList)
		}
		return list
	}

	const makeCurrencyList = (obj, curList = props.currenciesList) => {
		let index = 6
		let importantIndex = 0
		const importantCurrencies = ['usd', 'eur', 'uah', 'rub', 'btc', 'czk']
		for (const key in obj) {
			let curValue = (obj[key] * props.convCurQuantity).toFixed(2)
			if (importantCurrencies.includes(key)) {
				importantIndex += 1
				list.push(addElemToList(key, curList, curValue, importantCurrencies.indexOf(key)))
			} else {
				index += 1
				list.push(addElemToList(key, curList, curValue, index))
			}
		}
	}
	const addElemToList = (key, curList, curValue, index) => {
		return <Currency abbrevi={key.toUpperCase()}
			curName={curList[key]}
			curValue={Number.isFinite(+curValue) ? curValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : '0.00'}
			key={index} />
	}

	showCurrencies(props.rates)
	return (
		<div className='currencies'>
			{list.sort((a, b) => a.key - b.key)}
		</div>
	)
})

const mapStateToProps = (store) => {
	return {
		rates: store.currency.currenciesRates,
		convCur: store.currency.convertingCurrency.cur,
		convCurQuantity: store.currency.convertingCurrency.quantity,
		currenciesList: store.currency.currenciesList,
	}
}

export default connect(mapStateToProps, { getCurrenciesRateThunk, getCurrrenciesListThunk })(Currencies)
