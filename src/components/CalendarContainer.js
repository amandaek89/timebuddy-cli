import React, { useEffect, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../css/CalendarContainer.css';
import { getTodosForUser } from "../services/TodoListService";

const CalendarContainer = () => {
    const [events, setEvents] = useState([]);
    const [calendarHeight, setCalendarHeight] = useState('80vh');
    const [currentDate, setCurrentDate] = useState(null);

    // Hämta todos från API och mappa om till rätt format för FullCalendar
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const todoLists = await getTodosForUser();
                console.log("Fetched todoLists:", todoLists);

                const mappedEvents = todoLists.flatMap(todoList =>
                    todoList.todos.map(todo => ({
                        id: `${todoList.date}-${todo}`, // Använd datum och titel som unik ID
                        title: todo || "Okänd Todo", // Titel på todo
                        start: todoList.date,
                        allDay: true,
                    }))
                );

                setEvents(mappedEvents); // Uppdatera events
            } catch (error) {
                console.error('Error fetching todos for calendar:', error);
            }
        };

        fetchTodos();
    }, []);

    // Hantera klick på datum
    const handleDateClick = (info) => {
        const calendarApi = info.view.calendar;
        setCurrentDate(info.dateStr); // Sätt det valda datumet
        calendarApi.changeView('timeGridDay', info.dateStr); // Byt till dagsvy
    };

    // Använd windowResize från FullCalendar
    const handleWindowResize = (arg) => {
        // Här kan du logga eller hantera ändringar i kalenderns vy
        console.log('Calendar resized, current view:', arg.view.type);
    };

    return (
        <div className={"calendar-container"}>
            <div className="calendar">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    firstDay={1}
                    aspectRatio={2}
                    events={events} // Hämta events för alla vyer
                    dateClick={handleDateClick} // Hantera klick på datum
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    views={{
                        today: { buttonText: 'Idag' },
                        timeGridMonth: { buttonText: 'Månad' },
                        timeGridWeek: { buttonText: 'Vecka' },
                        timeGridDay: { buttonText: 'Dag' },
                    }}
                    locale="sv"
                    slotMinTime="08:00:00"
                    slotMaxTime="17:00:00"
                    height={calendarHeight}
                    windowResize={handleWindowResize} // Lägg till windowResize-händelsen här
                />
            </div>
        </div>
    );
};

export default CalendarContainer;
