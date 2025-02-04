import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"

const TextFilter = ({ onFilterChange }) => {
    const [search, setSearch] = useState('')
    const onFilterDebounce = utilService.debounce(onFilterChange, 500)

    useEffect(() => {
        onFilterDebounce(search)
    }, [search])

    return <input type='search' placeholder='Search bug...' onChange={e => setSearch(e.target.value)} value={search} name='txt' />
}

export default TextFilter;