import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../css/CalendarContainer.css';
import '../css/Media-queries.css';
import { getAllTodos, deleteTodo, updateTodo } from "../services/TodoService";
import TodoModal from "./TodoModal";
import AddTodoModal from "./AddTodoModal";
import UpdateTodoModal from "./UpdateTodoModal";

const CalendarContainer = () => {
    const [events, setEvents] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(null);
    const calendarRef = useRef(null);  // Ref to FullCalendar

    // Hämta todos från API och mappa om till rätt format för FullCalendar
    const fetchTodos = async () => {
        try {
            const todoLists = await getAllTodos();

            const mappedEvents = todoLists.map(todo => ({
                id: todo.id,
                title: todo.title,
                start: todo.time ? `${todo.date}T${todo.time}` : todo.date,
                allDay: todo.allDay,
                extendedProps: {
                    description: todo.description,
                    done: todo.done,
                    date: todo.date,
                    time: todo.time,
                },
            }));

            setEvents(mappedEvents);
        } catch (error) {
            console.error('Error fetching todos for calendar:', error);
        }
    };

    useEffect(() => {
        fetchTodos().then(r => console.log("Fetched todos")); // Hämta todos när komponenten laddas
    }, []);

    const renderEventContent = (eventInfo) => {
        const { title } = eventInfo.event;
        const viewType = eventInfo.view.type;

        if (viewType === 'dayGridMonth') {
            return <div>{title}</div>;
        }

        return (
            <div>
                <div>{title}</div>
            </div>
        );
    };

    // När en event klickas på, visa TodoModal för att visa detaljer
    const handleEventClick = (info) => {
        const clickedTodo = {
            id: info.event.id,
            title: info.event.title,
            description: info.event.extendedProps.description,
            done: info.event.extendedProps.done,
            date: info.event.extendedProps.date,
            time: info.event.extendedProps.time,
            allDay: info.event.allDay,
        };
        setSelectedTodo(clickedTodo);
    };

    // När en dag klickas på, öppna modal för att lägga till en todo
    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr);
        setIsAddTodoModalOpen(true);
    };

    // Stäng TodoModal
    const closeTodoModal = () => {
        setSelectedTodo(null);
    };

    // Stäng AddTodoModal och nollställ datumet
    const closeAddTodoModal = () => {
        setIsAddTodoModalOpen(false);
        setSelectedDate(null);
    };

    // När en ny todo har lagts till, uppdatera kalendern
    const handleTodoAdded = (newTodo) => {
        setEvents((prevEvents) => [
            ...prevEvents,
            {
                id: newTodo.id,
                title: newTodo.title,
                start: newTodo.time ? `${newTodo.date}T${newTodo.time}` : newTodo.date,
                allDay: newTodo.allDay,
                description: newTodo.description,
                done: newTodo.done,
                extendedProps: {
                    description: newTodo.description,
                    done: newTodo.done,
                    date: newTodo.date,
                    time: newTodo.time,
                },
            },
        ]);
        closeAddTodoModal();
    };

    // Uppdaterar via API och lokal state
    const handleUpdateTodo = async (id, updatedTodo) => {
        try {
            console.log('Updating todo:', updatedTodo);

            // Uppdatera todo på servern
            const response = await updateTodo(id, updatedTodo);
            const updatedData = response.data;  // Se till att få den uppdaterade datan

            console.log('Updated todo:', updatedData);

            // Anropa fetchTodos för att hämta de senaste todos
            await fetchTodos(); // Fetch todos again to update calendar

            // Stäng modalen och rensa state
            setIsEditModalOpen(false);
            setTodoToEdit(null);
            setSelectedTodo(null);

        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    // Ta bort en todo (via API och lokal state)
    const handleDeleteTodo = async (id) => {
        try {
            console.log('Deleting todo with ID:', id);

            // Ta bort todo från servern
            await deleteTodo(id);

            // Anropa fetchTodos för att hämta de senaste todos
            fetchTodos(); // Fetch todos again to update calendar

            // Logga borttagningen
            console.log('Todo deleted successfully');

            // Stäng modalen
            setSelectedTodo(null);
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    // När redigera-knappen klickas, sätt todo till redigering
    const handleEditClick = (todo) => {
        setSelectedTodo(null); // Stänger detaljmodalen
        setTodoToEdit(todo);   // Sätter det valda todo-objektet för redigering
        setIsEditModalOpen(true);
    };

    return (
        <div className="calendar-container">
            <div className="calendar">
                <FullCalendar
                    ref={calendarRef}  // Använd kalender-referens
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    firstDay={1}
                    aspectRatio={2}
                    events={events}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                    eventDisplay="block"
                    eventContent={renderEventContent}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    locale="sv"
                    slotMinTime="08:00"
                    slotMaxTime="17:00"
                />

                {/* TodoModal för att visa detaljinfo om vald todo */}
                {selectedTodo && (
                    <TodoModal
                        todo={selectedTodo}
                        onClose={closeTodoModal}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteTodo}
                    />
                )}

                {/* Modal för att redigera todo */}
                {isEditModalOpen && todoToEdit && (
                    <UpdateTodoModal
                        todo={todoToEdit}
                        onClose={() => setIsEditModalOpen(false)}
                        onUpdate={handleUpdateTodo}
                    />
                )}

                {/* Modal för att lägga till todo */}
                {isAddTodoModalOpen && selectedDate && (
                    <AddTodoModal
                        selectedDate={selectedDate}
                        onClose={closeAddTodoModal}
                        onTodoAdded={handleTodoAdded}
                    />
                )}
            </div>
        </div>
    );
};

export default CalendarContainer;
