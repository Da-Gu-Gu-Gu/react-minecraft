import { useCallback, useEffect, useState } from "react"

const actionByKey=(key)=>{
	const keyActionMap={
		KeyW:'moveForward',
		KeyS:'moveBackward',
		KeyA:'moveLeft',
		KeyD:'moveRight',
		Space:'jump',
		Digit1:'dirt',
		Digit2:'grass',
		Digit3:'glass',
		Digit4:'wood',
		Digit5:'log',
	}
	return keyActionMap[key]
}

export const useKeyBoard=()=>{
	const [action,setAction]=useState({
		moveForward:false,
		moveBackward:false,
		moveLeft:false,
		moveRight:false,
		jump:false,
		texture1:false,
		texture2:false,
		texture3:false,
		texture4:false,
		texture5:false,
	})

	const handleDown=useCallback((e)=>{
		const action=actionByKey(e.code)
			if(action){
				setAction((prev)=>{
					return {
						...prev,
						[action]:true
					}
				})
			}
		}
		,[])

	const handleUp=useCallback((e)=>{
		const action=actionByKey(e.code)
		if(action){
			setAction((prev)=>{
				return {
					...prev,
					[action]:false
				}
			})
		}
	},[])

	useEffect(()=>{
		document.addEventListener('keydown',handleDown)
		document.addEventListener('keyup',handleUp)
		return ()=>{
			document.removeEventListener('keydown',handleDown)
		document.removeEventListener('keyup',handleUp)
		}
	},[handleUp,handleDown])

	return action
	

}