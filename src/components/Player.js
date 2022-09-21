import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { useSphere } from '@react-three/cannon'
import { Vector3 } from 'three'
import { useKeyBoard } from '../hooks/useKeyboard'

const Player = () => {

	const {moveBackward,moveForward,moveLeft,moveRight,jump}=useKeyBoard()


	const {camera}=useThree()
	const [ref,api]=useSphere(()=>({
		mass:1,
		type:'Dynamic',
		position:[0,1,0]
	}))

	const pos=useRef([0,0,0])
	const vel=useRef([0,0,0])
	useFrame(()=>{
		camera.position.copy(new Vector3(pos.current[0],pos.current[1],pos.current[2]))
		
		const direction=new Vector3()
		const frontVector=new Vector3(
			0,
			0,
			(moveBackward?1:0) -(moveForward?1:0)
		)

		const sideVector=new Vector3(
			(moveLeft?1:0) -(moveRight?1:0),
			0,
			0
		)

		direction
		.subVectors(frontVector,sideVector)
		.normalize()
		.multiplyScalar(4)
		.applyEuler(camera.rotation)

		api.velocity.set(direction.x,vel.current[1],direction.z)

		if(jump && Math.abs(vel.current[1])){
			api.velocity.set(vel.current[0],3,vel.current[1])
		}
		})
 
	useEffect(()=>{
		api.velocity.subscribe((x)=>vel.current=x)
	},[api.velocity])
	useEffect(()=>{
		api.position.subscribe((x)=>pos.current=x)
	},[api.position])

  return (
	<mesh ref={ref}>

	</mesh>
  )
}

export default Player