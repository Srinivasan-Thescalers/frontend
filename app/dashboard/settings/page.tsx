import React from 'react';

const SettingsPage = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

      {/* General Settings Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">References</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">What are your normal working hours?</label>
            <input
              type="text"
              placeholder="Enter working hours"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred time to meet for work</label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mid-day Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Mid-day</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Maximum hours to meet per day</label>
            <input
              type="text"
              placeholder="Unlimited"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred time between events</label>
            <input
              type="text"
              placeholder="15 min"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum notice required for scheduling</label>
            <input
              type="text"
              placeholder="1 hour"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allow-guest-schedule"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="allow-guest-schedule" className="ml-2 block text-sm text-gray-700">
              Allow guest to schedule
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="shorten-event-durations"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="shorten-event-durations" className="ml-2 block text-sm text-gray-700">
              Shorten event durations
            </label>
          </div>
        </div>
      </div>

      {/* Event Preferences Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Event Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="unlock-video-agenda"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="unlock-video-agenda" className="ml-2 block text-sm text-gray-700">
              Unlock video, agenda and notes
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Default calendar conferencing</label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Google</option>
              <option>Microsoft</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Enter custom conference link</label>
            <input
              type="text"
              placeholder="Enter link"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;