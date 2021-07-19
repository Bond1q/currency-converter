import React from 'react'

export const Currency = (props) => {
	return (
		<div className='currency'>
			<span className='curAbbrevi'>{props.abbrevi}</span> - <span className='curName'>{props.curName}:</span> <span className='curValue'> {props.curValue}</span>
		</div>
	)
}