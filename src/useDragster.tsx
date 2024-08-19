import {useEffect, useRef} from 'react'

export interface DragsterOptions {
	/**
	 * Should the hook prevent the default behavior of the events?
	 * @alias preventDefault()
	 * @default true
	 */
	preventDefault?: boolean
	/**
	 * Should the hook stop the propagation of the events?
	 * @default true
	 */
	stopPropagation?: boolean
}

interface DragsterProps {
	/**
	 * The event that fires when a 'dragenter' event fires.
	 * @param e React.DragEvent<any>
	 * @returns any
	 */
	dragsterEnter?: (e: React.DragEvent<any>) => any
	/**
	 * The event that fires when a 'dragleave' event fires.
	 * @param e React.DragEvent<any>
	 * @returns any
	 */
	dragsterLeave?: (e: React.DragEvent<any>) => any
	/**
	 * The event that fires when a 'drop' event fires.
	 * @param e React.DragEvent<any>
	 * @returns any
	 */
	dragsterDrop?: (e: React.DragEvent<any>) => any
	/**
	 * Options to modify hook default behavior.
	 */
	options?: DragsterOptions
}

const defaultOptions: DragsterOptions = {
	preventDefault: true,
	stopPropagation: true,
}

/**
 *
 * @param props DragsterProps
 * @returns React.MutableRefObject<any>
 */
const useDragster = (props: DragsterProps) => {
	const options = Object.assign(defaultOptions, props.options)

	const watcherRef = useRef<any>(null)
	let first = useRef<boolean>(false)
	let second = useRef<boolean>(false)

	const dragEnter = (event: React.DragEvent<any>) => {
		options.preventDefault && event.preventDefault()
		options.stopPropagation && event.stopPropagation()

		if (first.current) {
			second.current = true
		} else {
			first.current = true

			props.dragsterEnter && props.dragsterEnter(event)
		}
	}

	const dragLeave = (event: React.DragEvent<any>) => {
		options.preventDefault && event.preventDefault()
		options.stopPropagation && event.stopPropagation()

		if (second.current) {
			second.current = false
		} else if (first.current) {
			first.current = false
		}

		if (!first.current && !second.current) {
			props.dragsterLeave && props.dragsterLeave(event)
		}
	}

	const drop = (event: React.DragEvent<any>) => {
		options.preventDefault && event.preventDefault()
		options.stopPropagation && event.stopPropagation()

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
