import { useState, useEffect } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setUser(null);
      return;
    }

    setLoading(true);

    const timeoutId = setTimeout(() => {
      fetch(`https://api.github.com/users/${query}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('用户不存在');
          }
          return res.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🔍 GitHub 用户搜索</h1>
      <input
        placeholder="请输入用户名"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <div style={{ marginTop: '2rem' }}>
        {loading && <p>搜索中...</p>}

        {user && (
          <div>
            <img src={user.avatar_url} alt="头像" width={100} />
            <h2>{user.login}</h2>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              访问 GitHub 主页
            </a>
          </div>
        )}

        {!loading && query && !user && <p>未找到用户</p>}
      </div>
    </div>
  );
}