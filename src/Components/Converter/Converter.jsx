import React from 'react'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getCurrrenciesListThunk, setConvertingCurrency } from '../../redux/currency-reducer'
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
			let index = 5
			const importantCurrencies = ['usd', 'eur', 'uah', 'rub', 'btc', 'czk']
			for (const key in obj) {
				if (key.includes(wordMatch)) {
					if (importantCurrencies.includes(key)) {
						list.push(addElemToList(key, obj, importantCurrencies.indexOf(key)))
					} else {
						index += 1
						list.push(addElemToList(key, obj, index))
					}
				}
			}
		}
		return list
	}

	const addElemToList = (key, obj, index) => {
		return <CurrencyListElem changeCurrency={changeCurrency} abbrevi={key.toUpperCase()} fullName={obj[key]} key={index} />
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
	}
}

export default connect(mapStateToProps, { getCurrrenciesListThunk, setConvertingCurrency })(Converter)