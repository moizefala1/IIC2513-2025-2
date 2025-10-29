const DB_NAME = 'TodoAppDB';
const STORE_NAME = 'todos';
const SETTINGS_STORE = 'settings';
const PENDING_STORE = 'pending_todos';
const DB_VERSION = 2;

const normalizeTodo = (todo) => ({ id: todo.id, description: todo.description, done: todo.done });


export const initDB = () => {
    return new Promise((resolve, reject) => {
        let db;
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error);
        };
        request.onupgradeneeded = (event) => {
            db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
            if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
                db.createObjectStore(SETTINGS_STORE, { keyPath: 'key' });
            }
            if (!db.objectStoreNames.contains(PENDING_STORE)) {
                db.createObjectStore(PENDING_STORE, { keyPath: 'id', autoIncrement: true });
            }                
        };
    });
};


export const saveTodos = async (todos) => {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.clear();
    todos.forEach((todo) => {
        store.add(normalizeTodo(todo));
    });
  

};

export const loadTodos = async () => {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            db.close();
            resolve(request.result);
        };
        
        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
};

export const savePendingTodo = async (todo) => {
    const db = await initDB();
    const transaction = db.transaction([PENDING_STORE], 'readwrite');
    const store = transaction.objectStore(PENDING_STORE);
    const normalizedTodo = normalizeTodo(todo);
    store.add(normalizedTodo);

};


export const loadPendingTodos = async () => {
    const db = await initDB();
 
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([PENDING_STORE], 'readonly');
        const store = transaction.objectStore(PENDING_STORE);
        const request = store.getAll();

        request.onsuccess = () => {
            db.close();
            resolve(request.result);
        };
        
        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
};


export const clearPendingTodos = async () => {
    const db = await initDB();
    const transaction = db.transaction([PENDING_STORE], 'readwrite');
    const store = transaction.objectStore(PENDING_STORE);
    store.clear();
}; 
