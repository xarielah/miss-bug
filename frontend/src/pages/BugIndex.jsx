import { useEffect, useRef, useState } from 'react'
import { BugList } from '../cmps/BugList.jsx'
import SeverityFilter from '../cmps/SeverityFilter.jsx'
import TextFilter from '../cmps/TextFilter.jsx'
import { bugService } from '../services/bug.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { generateSimpleBugPDF } from '../services/pdf.service.js'


export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState({ txt: '', severity: '' })

  const bugsRef = useRef(bugs)

  const onFilterChange = (field, value) => {
    setFilterBy(filterBy => ({ ...filterBy, [field]: value }));
  }

  const handleExportToPDF = () => {
    generateSimpleBugPDF(bugs);
  }

  useEffect(() => {
    loadBugs()
  }, [])

  useEffect(() => {
    if (!filterBy.txt && !filterBy.severity) {
      setBugs(bugsRef.current)
      return
    }

    let filteredBugs = [...bugsRef.current];

    if (filterBy.txt) {
      filteredBugs = filteredBugs.filter(bug => bug.title.toLowerCase().includes(filterBy.txt.toLowerCase()))
    }

    if (filterBy.severity) {
      filteredBugs = filteredBugs.filter(bug => bug.severity == filterBy.severity)
    }

    setBugs(filteredBugs)
  }, [filterBy])

  async function loadBugs() {
    const bugs = await bugService.query()
    bugsRef.current = bugs
    setBugs(bugs)
  }

  async function onRemoveBug(bugId) {
    try {
      await bugService.remove(bugId)
      console.log('Deleted Succesfully!')
      setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
      showSuccessMsg('Bug removed')
    } catch (err) {
      console.log('Error from onRemoveBug ->', err)
      showErrorMsg('Cannot remove bug')
    }
  }


  async function onAddBug() {
    const bug = {
      title: prompt('Bug title?'),
      severity: +prompt('Bug severity?'),
    }
    try {
      const savedBug = await bugService.save(bug)
      console.log('Added Bug', savedBug)
      setBugs(prevBugs => [...prevBugs, savedBug])
      showSuccessMsg('Bug added')
    } catch (err) {
      console.log('Error from onAddBug ->', err)
      showErrorMsg('Cannot add bug')
    }
  }

  async function onEditBug(bug) {
    const severity = +prompt('New severity?')
    const bugToSave = { ...bug, severity }

    try {

      const savedBug = await bugService.save(bugToSave)
      console.log('Updated Bug:', savedBug)
      setBugs(prevBugs => prevBugs.map((currBug) =>
        currBug._id === savedBug._id ? savedBug : currBug
      ))
      showSuccessMsg('Bug updated')
    } catch (err) {
      console.log('Error from onEditBug ->', err)
      showErrorMsg('Cannot update bug')
    }
  }

  return (
    <main className="main-layout">
      <h3>Bugs App</h3>
      <main>
        <div>
          <button onClick={onAddBug}>Add Bug ⛐</button>
          <button onClick={handleExportToPDF}>Export ⛐ to PDF</button>
          <TextFilter onFilterChange={(value) => onFilterChange('txt', value)} />
          <SeverityFilter onFilterChange={(value) => onFilterChange('severity', value)} />
        </div>

        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
      </main>
    </main>
  )
}
