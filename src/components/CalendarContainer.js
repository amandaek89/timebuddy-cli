import React, {useEffect, useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../css/CalendarContainer.css';

const CalendarContainer = () => {
    const [events, setEvents] = useState([
        { title: 'Todo 1', date: '2024-12-01' },
        { title: 'Todo 2', date: '2024-12-02' },
        { title: 'Todo 3', date: '2024-12-03' }
    ]);

    const handleDateClick = (info) => {
        const newTodo = prompt('Ny todo');
        if (newTodo) {
            setEvents([...events, { title: newTodo, date: info.dateStr }]);
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
