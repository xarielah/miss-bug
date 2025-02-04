import express from 'express';
const bugs = [
    {
        _id: 'bug_001',
        severity: 5,
        createdAt: 1675893127, // Unix timestamp
        title: 'Button not responsive on homepage'
    },
    {
        _id: 'bug_002',
        severity: 8,
        createdAt: 1675906727, // Unix timestamp
        title: 'Login page crashes with invalid credentials'
    },
    {
        _id: 'bug_003',
        severity: 3,
        createdAt: 1675910327, // Unix timestamp
        title: 'Minor typo in terms and conditions'
    },
    {
        _id: 'bug_004',
        severity: 7,
        createdAt: 1675913927, // Unix timestamp
        title: 'Slow page load on dashboard'
    },
    {
        _id: 'bug_005',
        severity: 10,
        createdAt: 1675917527, // Unix timestamp
        title: 'System crashes when clicking checkout button'
    }
];

const router = express.Router();



router.get("/", async (_, res) => {
    return res.json(bugs);
});

router.get('/save', async (req, res) => {
    const { _id = undefined, title = "N/A", severity = 5, createdAt = Date.now() } = req.query;
    const newBug = {
        _id: _id || crypto.randomUUID(),
        title,
        severity,
        createdAt
    };

    const bugIndex = bugs.findIndex(bug => bug._id === _id);
    if (bugIndex === -1) bugs.push(newBug);
    else bugs.splice(bugIndex, 1, newBug);

    return res.status(201).json(newBug);
})

router.get('/:bugId', async (req, res) => {
    const { bugId } = req.params;
    const bug = bugs.find(bug => bug._id === bugId);

    if (!bug) {
        return res.status(404).send("Bug not found");
    }

    const visitedBugs = JSON.parse(req.cookies.visitedBugs || "[]");

    if (visitedBugs.length >= 3) {
        return res.status(403).send("Wait for a bit");
    }

    if (!visitedBugs.includes(bugId)) {
        visitedBugs.push(bugId);
    }

    res.cookie('visitedBugs', JSON.stringify(visitedBugs), { maxAge: 1000 * 7 });

    return res.json(bug);
});

router.get('/:bugId/remove', async (req, res) => {
    const { bugId } = req.params;
    const bug = bugs.find(bug => bug._id === bugId);
    if (!bug) {
        return res.status(404).send("Bug not found");
    }

    bugs.splice(bugs.indexOf(bug), 1);
    return res.send(`bug ${bugId} was removed`);
});

export default router;