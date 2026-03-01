import { Outlet } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function GroupLayout() {
  const { user } = useAuth();

  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);

  const selectGroup = (group) => {
    setActiveGroup(group);
    localStorage.setItem("activeGroupId", group.id);
  };

  useEffect(() => {
    if (!user) return;

    const q1 = query(
      collection(db, "groups"),
      where("members", "array-contains", user.uid)
    );

    const q2 = query(
      collection(db, "groups"),
      where("ownerId", "==", user.uid)
    );

    let currentMap1 = {};
    let currentMap2 = {};

    const updateGroups = () => {
      const groupMap = { ...currentMap1, ...currentMap2 };
      const groupList = Object.values(groupMap);
      setGroups(groupList);

      const savedGroupId = localStorage.getItem("activeGroupId");

      if (savedGroupId) {
        const found = groupList.find(g => g.id === savedGroupId);
        if (found) {
          setActiveGroup(found);
        } else if (groupList.length > 0) {
          setActiveGroup(groupList[0]);
          localStorage.setItem("activeGroupId", groupList[0].id);
        }
      } else if (groupList.length > 0) {
        setActiveGroup(groupList[0]);
        localStorage.setItem("activeGroupId", groupList[0].id);
      } else {
        setActiveGroup(null);
      }
    };

    const unsub1 = onSnapshot(q1, (snap) => {
      const newMap1 = {};
      snap.docs.forEach((doc) => {
        newMap1[doc.id] = { id: doc.id, ...doc.data() };
      });
      currentMap1 = newMap1;
      updateGroups();
    });

    const unsub2 = onSnapshot(q2, (snap) => {
      const newMap2 = {};
      snap.docs.forEach((doc) => {
        newMap2[doc.id] = { id: doc.id, ...doc.data() };
      });
      currentMap2 = newMap2;
      updateGroups();
    });

    return () => {
      unsub1();
      unsub2();
    };
  }, [user]);

  return (
    <Outlet
      context={{
        group: activeGroup,
        groups,
        selectGroup
      }}
    />
  );
}

export default GroupLayout;