import React from 'react'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getCurrrenciesListThunk, setCuttedList, setConvertingCurrency, getCurrenciesRateThunk } from '../../redux/currency-reducer'
import { CurrencyListElem } from './CurrencyListElem'

const Converter = React.memo(props => {
	useEffect(() => {
		props.getCurrrenciesListThunk()
	}, [])

	const [quantityInput, changeQuantityInput] = useState('')
	const [currencyInput, changeCurrencyInput] = useState('')
	const [wordMatch, changeWordMatch] = useState('')
	let list = []

	const changeQuantity = (e) => {
		if (Number.isFinite(+(e.target.value.replace(/\s+/g, '')))) {
			changeQuantityInput(e.target.value.toString().replace(/\s+/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " "))
			sendConCurValues({ q: e.target.value.replace(/\s+/g, '') })
			// props.setConvertingCurrency({ cur: currencyInput.toLowerCase(), quantity: e.target.value })

		}
	}
	const changeCurrency = (e) => {
		changeCurrencyInput(e.target.value)
		changeWordMatch(e.target.value.toLowerCase())
		sendConCurValues({ c: e.target.value.toLowerCase() })

	}

	const sendConCurValues = ({ c = currencyInput.toLowerCase(), q = quantityInput }) => {
		if (c.length === 3 && q >= 0) {
			props.setConvertingCurrency({ cur: c, quantity: q })
		}
	}



	const showCurrencies = (obj) => {
		list = []
		if (obj) {
			let index = 4
			let importantIndex = 0
			const importantCurrencies = ['usd', 'eur', 'uah', 'rub']
			for (const key in obj) {

				if (key.includes(wordMatch)) {
					if (importantCurrencies.includes(key)) {
						importantIndex += 1
						list.push(<CurrencyListElem getCurrenciesRateThunk={getCurrenciesRateThunk} changeCurrency={changeCurrency} abbrevi={key.toUpperCase()} fullName={obj[key]} key={importantIndex} />)
					} else {
						index += 1
						list.push(<CurrencyListElem getCurrenciesRateThunk={getCurrenciesRateThunk} changeCurrency={changeCurrency} abbrevi={key.toUpperCase()} fullName={obj[key]} key={index} />)
					}
				}
			}
		}
		return list
	}

	showCurrencies(props.currenciesList)

	return (
		<div className='converter'>
			<div className='chooseCurrency'>
				<input placeholder='Choose the currency' value={currencyInput} onChange={changeCurrency} />
				<div className='currenciesList'>
					{list.sort((a, b) => a.key - b.key)}
				</div>
			</div>
			<div className='chooseQuantity'>
				<input placeholder='Choose the quantity' value={quantityInput} onChange={changeQuantity} />
			</div>


		</div>
	)
}
)
const mapStateToProps = (store) => {
	return {
		currenciesList: store.currency.currenciesList,
		cuttedList: store.currency.cuttedList
	}
}

export default connect(mapStateToProps, { getCurrrenciesListThunk, setCuttedList, setConvertingCurrency, getCurrenciesRateThunk })(Converter)