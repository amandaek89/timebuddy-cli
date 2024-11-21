import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../css/CalendarContainer.css';
import '../css/Media-queries.css';
import { useTodos } from '../context/TodosContext'; // Importera contexten
import AddTodoModal from "./AddTodoModal";

const CalendarContainer = () => {
    const { todos, addNewTodo, TodoStatus } = useTodos(); // Hämta todos från contexten
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // Mappa todos till events-formatet för FullCalendar
    useEffect(() => {
        const mappedEvents = todos.map(todo => {
            const startDate = todo.time ? `${todo.date}T${todo.time}` : todo.date;
            return {
                title: todo.title,
                start: startDate,
                description: todo.description,
                allDay: todo.allDay,
                done: todo.done,
                id: todo.id
            };
        });

    }, [todos]); // Uppdatera när todos ändras

    // Hantera klick på datum
    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr);
        setIsModalOpen(true);
    };

    // Hantera klick på event
    const handleEventClick = (info) => {
        const id = info.event.id;
        const currentStatus = info.event.extendedProps.done;
        TodoStatus(id, !currentStatus);  // Växla statusen mellan klar/inte klar
    };

    // Lägg till en ny todo
    const handleTodoAdded = (newTodo) => {
        addNewTodo(selectedDate, newTodo);  // Lägg till todo genom contexten
    };

    const renderEventContent = (eventInfo) => {
        const {title} = eventInfo.event;
        return (
            <div>
                <div>{title}</div>
            </div>
        );
    };

    return (
        <div className="calendar-container">
            <div className="calendar">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    firstDay={1}
                    aspectRatio={2}
                    events={todos.map(todo => ({
                        title: todo.title,
                        start: `${todo.date}T${todo.time}`,
                        description: todo.description,
                        done: todo.done,
                        id: todo.id
                    }))} // Använd todos från contexten
                    eventClick={handleEventClick}
                    eventDisplay="block"
                    dateClick={handleDateClick}
                    eventContent={renderEventContent}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    locale="sv"
                    slotMinTime="08:00"
                    slotMaxTime="17:00"
                />
                {isModalOpen && (
                    <AddTodoModal
                        selectedDate={selectedDate}
                        onClose={() => setIsModalOpen(false)}
                        onTodoAdded={handleTodoAdded}
                    />
                )}
            </div>
        </div>
    );
};

export default CalendarContainer;
