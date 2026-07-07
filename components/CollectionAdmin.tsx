'use client'

import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { COLLECTIONS, CollectionItem, fallbackItems } from '@/lib/collections'

/** Loads a collection from Supabase (falls back to built-in content) with CRUD. */
export function useCollection(name: string) {
  const [items, setItems] = useState<CollectionItem[]>(() => fallbackItems(name))
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    if (!supabase) return
    const { data, error } = await supabase
      .from('collection_items')
      .select('*')
      .eq('collection', name)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    if (!error && data && data.length > 0) setItems(data)
  }, [name])

  useEffect(() => {
    load()
  }, [load])

  const save = async (item: CollectionItem): Promise<string | null> => {
    if (!supabase) return 'Supabase not configured'
    setBusy(true)
    try {
      const result = item.id
        ? await supabase.from('collection_items').update({ data: item.data }).eq('id', item.id)
        : await supabase
            .from('collection_items')
            .insert({ collection: name, data: item.data, sort_order: items.length + 1 })
      if (result.error) return result.error.message
      await load()
      return null
    } finally {
      setBusy(false)
    }
  }

  const remove = async (item: CollectionItem) => {
    if (!supabase || !item.id) return
    setBusy(true)
    try {
      await supabase.from('collection_items').delete().eq('id', item.id)
      await load()
    } finally {
      setBusy(false)
    }
  }

  return { items, save, remove, busy }
}

/** Edit/Delete chips shown on a card in admin mode. */
export function ItemChips({
  onEdit,
  onDelete,
  deleteLabel,
  disabled,
}: {
  onEdit: () => void
  onDelete: () => void
  deleteLabel: string
  disabled?: boolean
}) {
  return (
    <div className="adm-card-actions">
      <button type="button" className="adm-chip" onClick={onEdit} disabled={disabled}>✎</button>
      <button
        type="button"
        className="adm-chip adm-chip-danger"
        disabled={disabled}
        onClick={() => {
          if (window.confirm(`Delete ${deleteLabel}? This removes it from the live site.`)) {
            onDelete()
          }
        }}
      >
        ✕
      </button>
    </div>
  )
}

/** Modal form for adding/editing a collection item, fields driven by config. */
export function ItemModal({
  collection,
  item,
  onClose,
  onSave,
}: {
  collection: string
  item: CollectionItem
  onClose: () => void
  onSave: (item: CollectionItem) => Promise<string | null>
}) {
  const config = COLLECTIONS[collection]
  const [data, setData] = useState<Record<string, string>>({ ...item.data })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const err = await onSave({ ...item, data })
    setSaving(false)
    if (err) {
      setError(err)
      return
    }
    onClose()
  }

  return (
    <div className="adm-modal-overlay" onClick={() => !saving && onClose()}>
      <form className="adm-modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h3>{item.id ? `Edit ${config.itemName}` : `Add ${config.itemName}`}</h3>
        <fieldset disabled={saving}>
          {config.fields.map((f) => (
            <div key={f.key}>
              <label className="adm-label">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  className="adm-input"
                  rows={3}
                  placeholder={f.placeholder}
                  value={data[f.key] ?? ''}
                  onChange={(e) => setData((prev) => ({ ...prev, [f.key]: e.target.value }))}
                />
              ) : (
                <input
                  className="adm-input"
                  placeholder={f.placeholder}
                  value={data[f.key] ?? ''}
                  onChange={(e) => setData((prev) => ({ ...prev, [f.key]: e.target.value }))}
                />
              )}
            </div>
          ))}
        </fieldset>
        {error && <div className="adm-error">{error}</div>}
        <div className="adm-modal-actions">
          <button type="button" className="adm-btn-ghost" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="adm-btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Update website'}
          </button>
        </div>
      </form>
    </div>
  )
}

/** Dashed "add" tile for card grids. */
export function AddCard({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" className="adm-add-card" onClick={onClick}>
      <span className="adm-add-plus">+</span>
      {label}
    </button>
  )
}

/** Small inline "add" pill for compact lists (trust bar, checklists). */
export function AddInline({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" className="adm-add-inline" onClick={onClick}>
      + {label}
    </button>
  )
}
