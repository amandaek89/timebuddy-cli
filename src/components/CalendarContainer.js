import React, {useEffect, useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../css/CalendarContainer.css';
import {getTodosForUser} from "../services/TodoListService";

const CalendarContainer = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                // Hämta todos från API
                const todoLists = await getTodosForUser();

                // Mappar todo-data till FullCalendar-event-format
                const mappedEvents = todoLists.flatMap(todoList =>
                    todoList.todos.map(todo => ({
                        title: todo,
                        start: todoList.date, // Datumet för todo-listan
                        allDay: true
                    }))
                );

                setEvents(mappedEvents); // Uppdatera events
            } catch (error) {
                console.error('Error fetching todos for calendar:', error);
            }
        };

        fetchTodos().then(r => console.log('Todos fetched'));
    }, []);

    const handleDateClick = (info) => {
        const newTodo = prompt('Ny todo');
        if (newTodo && newTodo.trim() !== '') {
            setEvents([...events, { title: newTodo, date: info.dateStr }]);
        } else {
            alert('Du måste skriva något i fältet');
        }
    };

    const [calendarHeight, setCalendarHeight] = useState('80vh');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCalendarHeight('70vh');
            } else {
                setCalendarHeight('82vh');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={"calendar-container"}>
            <div className="fullcalendar-wrapper">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    dateClick={handleDateClick}
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
                />
            </div>
        </div>
    );
};


export default CalendarContainer;
