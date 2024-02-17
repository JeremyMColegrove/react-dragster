// ... (previous code)

import {useEffect, useRef} from 'react'

interface Props {
	children: (elementRef: any) => React.ReactNode
	dragsterEnter?: (e: React.DragEvent<HTMLDivElement>) => any
	dragsterLeave?: (e: React.DragEvent<HTMLDivElement>) => any
	dragsterDrop?: (e: React.DragEvent<HTMLDivElement>) => any
}

function Dragster(props: Props) {
	const elementRef = useRef<any>(null)
	let first = useRef<boolean>(false)
	let second = useRef<boolean>(false)

	const dragEnter = (event: React.DragEvent<HTMLDivElement>) => {
		event.stopPropagation()
		event.preventDefault()

		if (first.current) {
			second.current = true
		} else {
			first.current = true
			props.dragsterEnter && props.dragsterEnter(event)
		}
	}

	const dragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.stopPropagation()
		event.preventDefault()

		if (second.current) {
			second.current = false
		} else if (first.current) {
			first.current = false
		}

		if (!first.current && !second.current) {
			props.dragsterLeave && props.dragsterLeave(event)
		}
	}

	const drop = (event: React.DragEvent<HTMLDivElement>) => {
		event.stopPropagation()
		event.preventDefault()

		first.current = false
		second.current = false
		props.dragsterDrop && props.dragsterDrop(event)
	}

	useEffect(() => {
		const element = elementRef.current

		if (element) {
			element.addEventListener('dragenter', dragEnter)
			return () => {
				element.removeEventListener('dragenter', dragEnter)
			}
		}
	}, [props.dragsterEnter])

	useEffect(() => {
		const element = elementRef.current

		if (element) {
			element.addEventListener('dragleave', dragLeave)
			return () => {
				element.removeEventListener('dragleave', dragLeave)
			}
		}
	}, [props.dragsterLeave])

	useEffect(() => {
		const element = elementRef.current

		if (element) {
			element.addEventListener('drop', drop)
			return () => {
				element.removeEventListener('drop', drop)
			}
		}
	}, [props.dragsterDrop])

	return props.children(elementRef)
}

export default Dragster
