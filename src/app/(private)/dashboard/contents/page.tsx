'use client';

import { useState } from 'react';
import { useContent } from '@/hooks/useContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';

// Default data shape
const defaultData = {
  title: '',
  type: 'text',
  data: '',
  tags: [],
};

export default function ContentPage() {
  const { items, loading, create, update, remove } = useContent();

  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(defaultData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Open modal (with or without content to edit)
  const openModal = (item?: any) => {
    if (item) {
      setFormData({
        title: item.title,
        type: item.type,
        data: item.data,
        tags: item.tags || [],
      });
      setEditingId(item._id);
    } else {
      setFormData(defaultData);
      setEditingId(null);
    }
    setErrors({});
    setModalOpen(true);
  };

  // Validate and submit
  const handleSubmit = async () => {
    const newErrors: any = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.type.trim()) newErrors.type = 'Type is required';
    if (!formData.data.trim()) newErrors.data = 'Data is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      if (editingId) {
        await update(editingId, formData);
        toast.success('Content updated successfully');
      } else {
        await create(formData);
        toast.success('Content created successfully');
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete
  const handleDelete = async (id: string) => {
    try {
      await remove(id);
      toast.success('Content deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete content');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Content</h1>
        <Button onClick={() => openModal()}>+ Add New</Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold">{editingId ? 'Edit' : 'Add'} Content</h2>

            <InputField
              label="Title"
              value={formData.title}
              onChange={(v) => setFormData({ ...formData, title: v })}
              error={errors.title}
            />

            <SelectField
              label="Type"
              value={formData.type}
              onChange={(v) => setFormData({ ...formData, type: v as 'text' | 'image' | 'link' })}
              options={['text', 'image', 'link']}
              error={errors.type}
            />

            <InputField
              label="Data"
              value={formData.data}
              onChange={(v) => setFormData({ ...formData, data: v })}
              error={errors.data}
            />

            <InputField
              label="Tags (comma separated)"
              value={(formData.tags || []).join(', ')}
              onChange={(v) =>
                setFormData({ ...formData, tags: v.split(',').map((t) => t.trim()) })}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setModalOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? (editingId ? 'Updating...' : 'Creating...') : editingId ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Content List */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <p>Loading content...</p>
        ) : items.length === 0 ? (
          <p>No content found.</p>
        ) : (
          items.map((item: any) => (
            <Card key={item._id}>
              <CardContent className="space-y-2">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm">{item.type}: {item.data}</p>
                <p className="text-xs text-muted-foreground">Tags: {item.tags?.join(', ') || '—'}</p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => openModal(item)}>Edit</Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

// Reusable Input
function InputField({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="block font-medium">{label}</label>
      <input
        type="text"
        className="border rounded w-full p-2 mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

// Reusable Select
function SelectField({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  error?: string;
}) {
  return (
    <div>
      <label className="block font-medium">{label}</label>
      <select
        className="border rounded w-full p-2 mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
