import {
  getDatabase,
  ref,
  onValue,
  set,
  update,
  remove,
} from 'firebase/database';

const useDatabase = () => {
  const { $firebaseApp } = useNuxtApp();
  const db = getDatabase($firebaseApp);

  // データを取得
  const getData = <T>(path: string, key?: string) => {
    const data = useState(`${path}`); // データ全体
    const dataLength = useState(`${path}Length`, () => 0); // データの個数
    const narrowedData = useState<T>(`narrowed${path}`); // 個別データ、型を渡して取得する

    // DB参照
    onValue(ref(db, path), (snapshot) => {
      const dbData = snapshot.val();
      data.value = dbData;
      dataLength.value = Object.keys(data).length;
      if (key) narrowedData.value = dbData[key];
    });

    return { data, dataLength, narrowedData };
  };

  // データを追加
  const setData = (path: string, values: object) => {
    return set(ref(db, path), values);
  };

  // データを更新
  const updateData = (path: string, values: object) => {
    return update(ref(db, path), values);
  };

  // データを削除
  const deleteData = (path: string) => {
    return remove(ref(db, path));
  };

  return { getData, setData, deleteData, updateData };
};

export default useDatabase;
