import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../css/CalendarContainer.css';
import '../css/Media-queries.css';
import { getAllTodos } from "../services/TodoService";
import AddTodoModal from "./AddTodoModal";
import TodoModal from "./TodoModal";

const CalendarContainer = () => {
    const [events, setEvents] = useState([]);
    const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Hämta todos från API och mappa om till rätt format för FullCalendar
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const todoLists = await getAllTodos();
                console.log("Fetched todoLists:", todoLists);

                // Kontrollera om det inte finns några Todos
                if (!todoLists || todoLists.length === 0) {
                    console.log("Inga todos hittades.");
                }

                const mappedEvents = todoLists.map(todo => {
                    // Kombinera datum och tid till ISO-format för start
                    const startDate = todo.time ? `${todo.date}T${todo.time}` : todo.date;

                    return {
                        id: todo.id,  // Lägg till id här
                        title: todo.title,
                        start: startDate, // Starttid (kombinerad från date + time)
                        description: todo.description, // Beskrivning (för detaljer)
                        allDay: todo.allDay, // Om det är en heldag
                        done: todo.done, // Om det är klart
                        extendedProps: {
                            description: todo.description,
                            start: startDate,
                            done: todo.done,
                        },
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
        setIsAddTodoModalOpen(true); // Öppna AddTodoModal
        console.log('Date clicked:', info);
    };

    // Hantera när en Todo är tillagd
    const handleTodoAdded = (newTodo) => {
        setEvents((prevEvents) => [
            ...prevEvents,
            {
                id: newTodo.id,  // Se till att id är korrekt
                title: newTodo.title,
                start: newTodo.time ? `${newTodo.date}T${newTodo.time}` : newTodo.date,
                description: newTodo.description,
                allDay: newTodo.allDay,
                done: newTodo.done,
            }
        ]);
    };

    const closeAddTodoModal = () => {
        setIsAddTodoModalOpen(false);
        setSelectedDate(null);
    }

    // Hantera klick på event (visa TodoModal)
    const handleEventClick = (info) => {
        const clickedEvent = events.find(event => event.id === info.event.id);
        setSelectedEvent(clickedEvent); // Sätt det valda eventet
        setIsModalOpen(true); // Öppna TodoModal
        console.log('Event clicked:', info.event);
    };

    // Stäng modal
    const closeTodoModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        setSelectedDate(null);
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
                    eventClick={handleEventClick} // Hantera klick på event
                    eventDisplay="block" // Visa endast titel i vyerna
                    dateClick={handleDateClick} // Hantera klick på datum öppna modal för att lägga till händelse
                    eventContent={renderEventContent} // Anpassa eventinnehåll
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    locale="sv" // Svensk lokal
                    slotMinTime="08:00" // Tidigaste tid i dagsvy
                    slotMaxTime="17:00" // Senaste tid i dagsvy
                />
                {isModalOpen && selectedEvent && (
                    <TodoModal
                        event={selectedEvent}
                        onClose={closeTodoModal}
                    />
                )}
                {isModalOpen && selectedDate && (
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

