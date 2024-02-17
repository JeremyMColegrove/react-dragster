import {useEffect, useRef} from 'react'

interface DragsterOptions {
	dragsterEnter?: (e: React.DragEvent<any>) => any
	dragsterLeave?: (e: React.DragEvent<any>) => any
	dragsterDrop?: (e: React.DragEvent<any>) => any
}

const useDragster = (props: DragsterOptions) => {
	const watcherRef = useRef<any>(null)
	let first = useRef<boolean>(false)
	let second = useRef<boolean>(false)

	const dragEnter = (event: React.DragEvent<any>) => {
		event.preventDefault()
		event.stopPropagation()

		if (first.current) {
			second.current = true
		} else {
			first.current = true

			props.dragsterEnter && props.dragsterEnter(event)
		}
	}

	const dragLeave = (event: React.DragEvent<any>) => {
		event.preventDefault()
		event.stopPropagation()

		if (second.current) {
			second.current = false
		} else if (first) {
			first.current = false
		}

		if (!first && !second) {
			props.dragsterLeave && props.dragsterLeave(event)
		}
	}

	const drop = (event: React.DragEvent<any>) => {
		event.preventDefault()
		event.stopPropagation()

		first.current = false
		second.current = false

		props.dragsterDrop && props.dragsterDrop(event)
	}

	useEffect(() => {
		const element = watcherRef.current

		if (element) {
			element.addEventListener('dragenter', dragEnter)
			return () => {
				element.removeEventListener('dragenter', dragEnter)
			}
		}
	}, [props.dragsterEnter])

	useEffect(() => {
		const element = watcherRef.current

		if (element) {
			element.addEventListener('dragleave', dragLeave)
			return () => {
				element.removeEventListener('dragleave', dragLeave)
			}
		}
	}, [props.dragsterLeave])

	useEffect(() => {
		const element = watcherRef.current

		if (element) {
			element.addEventListener('drop', drop)
			return () => {
				element.removeEventListener('drop', drop)
			}
		}
	}, [props.dragsterDrop])

	return watcherRef
}

export default useDragster
