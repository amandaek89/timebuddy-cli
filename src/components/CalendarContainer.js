import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../css/CalendarContainer.css';
import '../css/Media-queries.css';
import { getAllTodos } from "../services/TodoService";
import AddTodoModal from "./AddTodoModal";

const CalendarContainer = () => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // Hämta todos från API och mappa om till rätt format för FullCalendar
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const todoLists = await getAllTodos();
                console.log("Fetched todoLists:", todoLists);

                const mappedEvents = todoLists.map(todo => {
                    // Kombinera datum och tid till ISO-format för start
                    const startDate = todo.time ? `${todo.date}T${todo.time}` : todo.date;

                    return {
                        title: todo.title,
                        start: startDate, // Starttid (kombinerad från date + time)
                        description: todo.description, // Beskrivning (för detaljer)
                        allDay: todo.allDay, // Om det är en heldag
                        done: todo.done // Om det är klart
                    };
                });

                setEvents(mappedEvents); // Uppdatera events
            } catch (error) {
                console.error('Error fetching todos for calendar:', error);
            }
        };

        fetchTodos().then(r => console.log("Fetched todos for calendar"));
    }, []);

    // Anpassa eventinnehåll baserat på aktuell vy
    const renderEventContent = (eventInfo) => {
        const { title } = eventInfo.event;
        const viewType = eventInfo.view.type; // Aktuell vy (t.ex., 'dayGridMonth', 'timeGridWeek')

        if (viewType === 'dayGridMonth') {
            // Visa endast titel i månadsvisningen
            return <div>{title}</div>;
        }

        // Visa både tid och titel i andra vyer
        return (
            <div>
                <div>{title}</div>
            </div>
        );
    };
    // Hantera klick på datum
    const handleDateClick = (info) => {
        console.log("Selected Date:", info.dateStr); // Kontrollera om datumet är korrekt
        setSelectedDate(info.dateStr);
        setIsModalOpen(true);
    };


    const handleTodoAdded = (newTodo) => {
        setEvents((prevEvents) => [...prevEvents, {
            title: newTodo.title,
            start: newTodo.time ? `${newTodo.date}T${newTodo.time}` : newTodo.date,
            description: newTodo.description,
            allDay: newTodo.allDay,
            done: newTodo.done
        }]);
    };

    // Hantera klick på event
    const handleEventClick = (info) => {
        console.log('Event clicked:', info.event);
        alert(`Event: ${info.event.title}\nBeskrivning: ${info.event.extendedProps.description}`);
    };

    return (
        <div className="calendar-container">
            <div className="calendar">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    firstDay={1}
                    aspectRatio={2}
                    events={events} // Eventlista
                    eventClick={handleEventClick}
                    eventDisplay="block" // Visa endast titel i vyerna
                    dateClick={handleDateClick} // Hantera klick på datum öppna modal för att lägga till händelse
                    eventContent={renderEventContent} // Anpassa eventinnehåll
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    locale="sv" // Svensk lokal
                    slotMinTime="08:00" // Tidigaste tid i dagsvy
                    slotMaxTime="17:00" // Senaste tid i dagsvy
                />
                {isModalOpen && (
                    <AddTodoModal
                        selectedDate={selectedDate}  // Skickar selectedDate som en prop
                        onClose={() => setIsModalOpen(false)}
                        onTodoAdded={handleTodoAdded}
                    />
                )}
            </div>
        </div>
    );
};

export default CalendarContainer;
