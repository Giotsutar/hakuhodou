import { useState, useEffect } from 'react';

export default function App() {
  const [dogImageUrl, setDogImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchDog() {
    setIsLoading(true);
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await res.json();
    setDogImageUrl(data.message);
    setIsLoading(false);
  }

  // 初次加载时自动获取一张
  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🐶 随机狗狗生成器</h1>
      <button onClick={fetchDog} disabled={isLoading}>
        {isLoading ? '加载中...' : '再来一张！'}
      </button>
      <div style={{ marginTop: '2rem' }}>
        {dogImageUrl && <img src={dogImageUrl} alt="A Random Dog" style={{ maxWidth: '100%', height: 'auto' }} />}
      </div>
    </div>
  );
}