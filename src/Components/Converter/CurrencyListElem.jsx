import React from 'react'

export const CurrencyListElem = (props) => {

	return (

		<div className='currencyListElem' onMouseDown={() => props.changeCurrency({ target: { value: props.abbrevi } })} >
			<span className='abbrevi'>{props.abbrevi}</span> - {props.fullName}
		</div>
	)
}