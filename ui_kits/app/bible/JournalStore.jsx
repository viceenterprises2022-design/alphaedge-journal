// JournalStore.jsx — journal entries CRUD
const JOURNAL_KEY = 'alphaedge-journal-v1';

const readJournal = () => {
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};
const writeJournal = (l) => {
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(l));
  window.dispatchEvent(new Event('tj-journal-changed'));
};

const useJournal = () => {
  const [items, setItems] = React.useState(readJournal);
  React.useEffect(() => {
    const h = () => setItems(readJournal());
    window.addEventListener('tj-journal-changed', h);
    return () => window.removeEventListener('tj-journal-changed', h);
  }, []);
  return items;
};

const createEntry = (partial = {}) => {
  const id = `j-${Date.now().toString(36)}`;
  const e = {
    id,
    title: partial.title || 'Untitled entry',
    body: partial.body || '',
    tags: partial.tags || [],
    createdAt: partial.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  writeJournal([e, ...readJournal()]);
  return e;
};
const updateEntry = (id, patch) => {
  writeJournal(readJournal().map(e => e.id === id ? { ...e, ...patch, updatedAt: new Date().toISOString() } : e));
};
const deleteEntry = (id) => writeJournal(readJournal().filter(e => e.id !== id));

Object.assign(window, { useJournal, createEntry, updateEntry, deleteEntry, readJournal });
