import React, { useState, useEffect } from 'react';

const AlumniPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', year: '', course: '' });

  useEffect(() => {
    const saved = localStorage.getItem('alumni');
    if (saved) setAlumni(JSON.parse(saved));
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem('alumni', JSON.stringify(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updated = alumni.map(a => a.id === editingId ? { ...formData, id: editingId } : a);
      setAlumni(updated);
      saveToStorage(updated);
    } else {
      const newAlumni = { ...formData, id: Date.now() };
      const updated = [...alumni, newAlumni];
      setAlumni(updated);
      saveToStorage(updated);
    }
    setFormData({ name: '', year: '', course: '' });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    const updated = alumni.filter(a => a.id !== id);
    setAlumni(updated);
    saveToStorage(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Alumni Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Year"
            value={formData.year}
            onChange={(e) => setFormData({...formData, year: e.target.value})}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Course"
            value={formData.course}
            onChange={(e) => setFormData({...formData, course: e.target.value})}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-sky-500 text-white px-4 py-2 rounded">
          {isEditing ? 'Update' : 'Add'} Alumni
        </button>
      </form>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alumni.map(item => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.year}</td>
                <td className="p-3">{item.course}</td>
                <td className="p-3">
                  <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlumniPage;