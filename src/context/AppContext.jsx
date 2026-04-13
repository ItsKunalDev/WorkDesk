import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import {
  collection, doc, setDoc, getDoc,
  addDoc, updateDoc, deleteDoc, onSnapshot
} from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [profile, setProfile] = useState({ name: '', email: '' });

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const listenersRef = useRef(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);

        const userDocRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDocRef);
        if (!userSnap.exists()) {
          await setDoc(userDocRef, {
            name: user.displayName || user.email.split('@')[0],
            email: user.email,
          });
        }

        const unsubs = [];

        unsubs.push(onSnapshot(userDocRef, (snap) => {
          if (snap.exists()) {
            setProfile({
              name: snap.data().name || '',
              email: snap.data().email || ''
            });
          }
        }));

        unsubs.push(onSnapshot(collection(db, 'users', user.uid, 'projects'), (snap) => {
          setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }));

        unsubs.push(onSnapshot(collection(db, 'users', user.uid, 'clients'), (snap) => {
          setClients(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }));

        unsubs.push(onSnapshot(collection(db, 'users', user.uid, 'tasks'), (snap) => {
          setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }));

        unsubs.push(onSnapshot(collection(db, 'users', user.uid, 'invoices'), (snap) => {
          setInvoices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }));

        listenersRef.current = () => unsubs.forEach(u => u());

      } else {
        if (listenersRef.current) {
          listenersRef.current();
          listenersRef.current = null;
        }
        setIsAuthenticated(false);
        setProfile({ name: '', email: '' });
        setProjects([]);
        setClients([]);
        setTasks([]);
        setInvoices([]);
      }

      setAuthLoading(false);
    });

    return () => {
      unsubAuth();
      if (listenersRef.current) listenersRef.current();
    };
  }, []);

  const uid = () => auth.currentUser?.uid;
  const col = (name) => collection(db, 'users', uid(), name);
  const docRef = (colName, id) => doc(db, 'users', uid(), colName, id);

  const signup = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    await setDoc(doc(db, 'users', cred.user.uid), { name, email });
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateProfileData = async (data) => {
    if (uid()) await setDoc(doc(db, 'users', uid()), data, { merge: true });
    setProfile(data);
  };

  const addProject = (p) => addDoc(col('projects'), p);
  const editProject = (id, updated) => updateDoc(docRef('projects', id), updated);
  const deleteProject = (id) => deleteDoc(docRef('projects', id));

  const addClient = (c) => addDoc(col('clients'), c);
  const editClient = (id, updated) => updateDoc(docRef('clients', id), updated);
  const deleteClient = (id) => deleteDoc(docRef('clients', id));

  const addTask = (t) => addDoc(col('tasks'), t);
  const editTask = (id, updated) => updateDoc(docRef('tasks', id), updated);
  const deleteTask = (id) => deleteDoc(docRef('tasks', id));

  const addInvoice = (i) => addDoc(col('invoices'), i);
  const deleteInvoice = (id) => deleteDoc(docRef('invoices', id));

  const value = {
    isAuthenticated, authLoading,
    login, loginWithGoogle, signup, logout,
    profile, updateProfile: updateProfileData,
    projects, addProject, editProject, deleteProject,
    clients, addClient, editClient, deleteClient,
    tasks, addTask, editTask, deleteTask,
    invoices, addInvoice, deleteInvoice
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
