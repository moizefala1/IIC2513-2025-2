import React, { useState, useEffect, cache } from "react";
import TaskList from "./TaskList";
import FormTodo from "./FormTodo";
import { 
  saveTodos, 
  loadTodos, 
  savePendingTodo,
  loadPendingTodos,
  clearPendingTodos
} from "../db";
const cacheKey = '/cached-background-image';

const Container = () => {
  const [list, setList] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [bgUrl, setBgUrl] = useState('');

  // Load initial data and settings
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load todos
        const todos = await loadTodos();
        if (todos && todos.length > 0) {
          setList(todos);
        } else {
          setList([]);
        }

        // Load pending todos count

        
      } catch (error) {
        console.error('Error loading initial data:', error);
        setList([]);
      }
    };

    loadInitialData();
  }, []);

  // Auto-save effect
  useEffect(() => {
    if (list.length > 0) {
      saveToIndexedDB(list);
    }
  }, [list]);

  const handleListChange = (newList) => {
    setList(newList);
    saveToIndexedDB(newList);
  };

  const handleAddItem = async addItem => {
    const newList = [...list, addItem];
    setList(newList);
    
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: 'POST',
        body: JSON.stringify(addItem),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to save to API');
      }
    } catch (error) {
      console.error('Failed to save to API:', error);
      // Si falla la API, guardamos en pendientes
      await savePendingTodo(addItem);
      setPendingCount(prev => prev + 1);
    }

    saveToIndexedDB(newList);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (response.ok) {
        const data = await response.json();
        // Elegimos 5 al azar
        const filteredData = data.sort(() => Math.random() - Math.random()).slice(0, 5);
        // Parseamos los datos
        const parsedData = parseData(filteredData);
        
        // Combinamos los todos existentes con los nuevos
        const existingIds = new Set(list.map(todo => todo.id));
        const newTodos = parsedData.filter(todo => !existingIds.has(todo.id));
        const combinedList = [...list, ...newTodos];
        
        setList(combinedList);
        saveToIndexedDB(combinedList);
      } else {
        throw new Error("Something went wrong while fetching data");
      }
    } catch (error) {
      console.error(error);
      alert('Error fetching data. Please check your internet connection.');
    }
  };

  const parseData = data => {
    return data.map(item => ({
      id: item.id.toString(),
      description: item.title,
      done: item.completed
    }));
  }

  const saveToIndexedDB = async (todos) => {
    try {
      await saveTodos(todos);
    } catch (error) {
      console.error('Failed to save the list in IndexedDB', error);
    }
  };

  const syncPendingTodos = async () => {
    try {
      const pendingTodos = await loadPendingTodos();
      if (pendingTodos.length === 0) {
        alert('No pending todos to sync');
        return;
      }

      let successCount = 0;
      for (const todo of pendingTodos) {
        try {
          const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            successCount++;
          }
        } catch (error) {
          console.error('Failed to sync todo:', error);
        }
      }

      if (successCount > 0) {
        await clearPendingTodos();
        setPendingCount(0);
        alert(`Successfully synced ${successCount} todos`);
      } else {
        alert('Failed to sync todos. Please try again later.');
      }
    } catch (error) {
      console.error('Failed to sync pending todos:', error);
      alert('Error syncing pending todos');
    }
  };


  useEffect(() => {
    const loadCachedImage = async () => {
      const cache = await caches.open('background-cache');
      const response = await cache.match(cacheKey);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setBgUrl(url);
    };
    loadCachedImage();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    const cache = await caches.open('background-cache');
    const response = new Response(file);
    await cache.put(cacheKey, response);
    const url = URL.createObjectURL(file);
    setBgUrl(url);

  };

  const handleDeleteImage = async () => {
    const cache = await caches.open('background-cache');
    await cache.delete(cacheKey);
    setBgUrl('');
  };

  return (
    <div>
      <div
        className="background-container"
        style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : {}}
      >
        <FormTodo handleAddItem={handleAddItem} />
        <TaskList list={list} setList={handleListChange} autoSave={true} />
        
        <div className="button-row">
          <button 
            onClick={fetchData}
            className="button blue"
          >Call API</button>
          {pendingCount > 0 && (
            <button 
              onClick={syncPendingTodos}
              className="button blue"
            >
              Sync Pending ({pendingCount})
            </button>
          )}
        </div>

        {/* "Load from IndexedDB" button removed — app auto-loads on start */}
        <div className="button-row">
          <label htmlFor="upload-image" className="button blue">
            Subir fondo
          </label>
          <input
            type="file"
            id="upload-image"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <button
            onClick={handleDeleteImage}
            className="button pink"
          >
            Quitar fondo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Container;
