import { useEffect, useState, useRef} from 'react';

export function useFirestoreQuery(query) {
  const [docs, setDocs] = useState([]);
  const queryRef = useRef(query);

  useEffect(() => {
    if (!queryRef?.curent?.isEqual(query)) {
      queryRef.current = query;
    }
  });

  useEffect(() => {
    if (!queryRef.current) {
      return null;
    }
    const unsubscribe = queryRef.current.onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocs(data);
    });
    return unsubscribe;
  }, [queryRef]);

  return docs;
}