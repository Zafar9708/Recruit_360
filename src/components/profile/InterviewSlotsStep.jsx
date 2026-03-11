import { useState } from 'react';

export default function InterviewSlotsStep({ data, updateData }) {
  const [selectedSlots, setSelectedSlots] = useState(
    data.interviewSlots || []
  );

  const timeSlots = {
    morning: [
      "9:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
    ],
    afternoon: [
      "1:00 PM - 2:00 PM",
      "2:00 PM - 3:00 PM",
      "3:00 PM - 4:00 PM",
      "4:00 PM - 5:00 PM",
    ],
  };

  const toggleSlot = (slot) => {
    const updated = selectedSlots.includes(slot)
      ? selectedSlots.filter((s) => s !== slot)
      : [...selectedSlots, slot];

    setSelectedSlots(updated);
    updateData({ interviewSlots: updated });
  };

  const SlotGroup = ({ title, slots }) => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {slots.map((slot) => {
          const selected = selectedSlots.includes(slot);

          return (
            <label
              key={slot}
              className={`flex items-center justify-center px-4 py-3 rounded-xl border cursor-pointer text-sm font-medium transition
                ${
                  selected
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggleSlot(slot)}
                className="hidden"
              />
              {slot}
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <SlotGroup title="Morning Shift" slots={timeSlots.morning} />
      <SlotGroup title="Afternoon Shift" slots={timeSlots.afternoon} />

      {/* Validation Message */}
      {selectedSlots.length < 2 && selectedSlots.length > 0 && (
        <p className="text-sm text-red-500">
          Please select at least 2 interview time slots.
        </p>
      )}
      {selectedSlots.length === 0 && (
        <p className="text-sm text-gray-500">
          Select at least 2 preferred time slots for your interview
        </p>
      )}
    </div>
  );
}