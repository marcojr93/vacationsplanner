import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Plus, Trash2, Edit3, Check, X } from 'lucide-react';

const PuntaCanaOrganizer = () => {
  const [activeTab, setActiveTab] = useState('activities');
  const [activities, setActivities] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newActivity, setNewActivity] = useState({
    name: '',
    cost: '',
    date: '',
    location: '',
    notes: ''
  });

  // Trip dates
  const tripStart = new Date('2024-09-17');
  const tripEnd = new Date('2024-09-24');
  
  const getTripDates = () => {
    const dates = [];
    const current = new Date(tripStart);
    while (current <= tripEnd) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const addActivity = () => {
    if (newActivity.name && newActivity.cost) {
      const activity = {
        id: Date.now(),
        ...newActivity,
        cost: parseFloat(newActivity.cost) || 0
      };
      setActivities([...activities, activity]);
      setNewActivity({
        name: '',
        cost: '',
        date: '',
        location: '',
        notes: ''
      });
    }
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const startEdit = (activity) => {
    setEditingId(activity.id);
    setNewActivity({ ...activity, cost: activity.cost.toString() });
  };

  const saveEdit = () => {
    setActivities(activities.map(activity => 
      activity.id === editingId 
        ? { ...newActivity, id: editingId, cost: parseFloat(newActivity.cost) || 0 }
        : activity
    ));
    setEditingId(null);
    setNewActivity({
      name: '',
      cost: '',
      date: '',
      location: '',
      notes: ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewActivity({
      name: '',
      cost: '',
      date: '',
      location: '',
      notes: ''
    });
  };

  const totalCost = activities.reduce((sum, activity) => sum + activity.cost, 0);

  const getActivitiesForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return activities.filter(activity => activity.date === dateStr);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🏝️ Punta Cana Trip Organizer
          </h1>
          <p className="text-gray-600">
            September 17-24, 2024 • Total Budget: <span className="font-bold text-green-600">${totalCost.toFixed(2)}</span>
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('activities')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === 'activities'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <MapPin className="inline-block w-5 h-5 mr-2" />
              Activities
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === 'calendar'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Calendar className="inline-block w-5 h-5 mr-2" />
              Calendar
            </button>
          </div>

          {/* Activities Tab */}
          {activeTab === 'activities' && (
            <div className="p-6">
              {/* Add Activity Form */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {editingId ? 'Edit Activity' : 'Add New Activity'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Activity name"
                    value={newActivity.name}
                    onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Cost ($)"
                    value={newActivity.cost}
                    onChange={(e) => setNewActivity({...newActivity, cost: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    value={newActivity.date}
                    onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                    min="2024-09-17"
                    max="2024-09-24"
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={newActivity.location}
                    onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Notes (optional)"
                    value={newActivity.notes}
                    onChange={(e) => setNewActivity({...newActivity, notes: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                    rows="2"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  {editingId ? (
                    <>
                      <button
                        onClick={saveEdit}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Save Changes
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={addActivity}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Activity
                    </button>
                  )}
                </div>
              </div>

              {/* Activities List */}
              <div className="space-y-4">
                {activities.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No activities planned yet. Add your first activity above!
                  </div>
                ) : (
                  activities.map((activity) => (
                    <div key={activity.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800">{activity.name}</h4>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ${activity.cost.toFixed(2)}
                            </span>
                            {activity.date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(activity.date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            )}
                            {activity.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {activity.location}
                              </span>
                            )}
                          </div>
                          {activity.notes && (
                            <p className="mt-2 text-gray-600 text-sm">{activity.notes}</p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => startEdit(activity)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteActivity(activity.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cost Summary */}
              {activities.length > 0 && (
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Cost Summary</h3>
                  <div className="text-2xl font-bold text-green-600">
                    Total: ${totalCost.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600 mt-1">
                    Average per day: ${(totalCost / 8).toFixed(2)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {getTripDates().map((date) => {
                  const dayActivities = getActivitiesForDate(date);
                  const dayTotal = dayActivities.reduce((sum, activity) => sum + activity.cost, 0);
                  
                  return (
                    <div key={date.toISOString()} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="text-center mb-3">
                        <h3 className="font-semibold text-gray-800">{formatDate(date)}</h3>
                        {dayTotal > 0 && (
                          <p className="text-sm text-green-600 font-medium">${dayTotal.toFixed(2)}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        {dayActivities.length === 0 ? (
                          <p className="text-gray-400 text-sm text-center">No activities</p>
                        ) : (
                          dayActivities.map((activity) => (
                            <div key={activity.id} className="bg-blue-50 rounded p-2">
                              <h4 className="font-medium text-sm text-gray-800">{activity.name}</h4>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-600">{activity.location}</span>
                                <span className="text-xs font-medium text-green-600">${activity.cost.toFixed(2)}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PuntaCanaOrganizer;