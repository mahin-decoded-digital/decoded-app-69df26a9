import { Router } from 'express'
import { db } from '../lib/db.js'

const router = Router()

// GET /api/contacts — list all
router.get('/', async (req, res) => {
  const contacts = await db.collection('contacts').find()
  res.json(contacts)
})

// GET /api/contacts/:id — get one
router.get('/:id', async (req, res) => {
  const contact = await db.collection('contacts').findById(req.params.id)
  if (!contact) return res.status(404).json({ error: 'Not found' })
  res.json(contact)
})

// POST /api/contacts — create
router.post('/', async (req, res) => {
  const newContact = {
    ...req.body,
    createdAt: req.body.createdAt || new Date().toISOString()
  }
  const id = await db.collection('contacts').insertOne(newContact)
  const contact = await db.collection('contacts').findById(id)
  res.status(201).json(contact)
})

// PUT /api/contacts/:id — update
router.put('/:id', async (req, res) => {
  const ok = await db.collection('contacts').updateOne(req.params.id, req.body)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  const contact = await db.collection('contacts').findById(req.params.id)
  res.json(contact)
})

// DELETE /api/contacts/:id — delete
router.delete('/:id', async (req, res) => {
  const ok = await db.collection('contacts').deleteOne(req.params.id)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  res.json({ success: true })
})

export default router