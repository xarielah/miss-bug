import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"

const SeverityFilter = ({ onFilterChange }) => {
    const [severity, setSeverity] = useState('')
    const onFilterDebounce = utilService.debounce(onFilterChange, 500)

    useEffect(() => {
        onFilterDebounce(severity)
    }, [severity])

    return <select onChange={e => setSeverity(e.target.value)} name='severity' value={severity}>
        <option value="">All</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
    </select>
}

export default SeverityFilter;