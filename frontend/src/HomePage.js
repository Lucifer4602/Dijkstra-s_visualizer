import React, {useState} from 'react';

const HomePage = () => {
  const [code, setCode] = useState({
    cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

#define INF INT_MAX

void dijkstra(vector<vector<pair<int, int>>> &graph, int source) {
  int V = graph.size();
  vector<int> dist(V, INF);
  priority_queue<pair<int, int>>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
  dist[source] = 0;
  pq.push({0, source});

  while (!pq.empty()) {
    int u = pq.top().second;
    pq.pop();

    for (auto &neighbor : graph[u]) {
      int v = neighbor.first;
      int weight = neighbor.second;

      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        pq.push({dist[v], v});
      }
    }
  }

  // Print shortest distances from source to all vertices
  cout << "Shortest distances from source " << source << ":";
  for (int i = 0; i < V; ++i)
    cout << "Vertex " << i << ": " << dist[i] << "";
}

int main() {
  int V = 5;
  vector<vector<pair<int, int>>> graph(V);

  // Example graph setup
  graph[0].push_back({1, 2});
  graph[0].push_back({2, 4});
  graph[1].push_back({2, 1});
  graph[1].push_back({3, 7});
  graph[2].push_back({3, 3});
  graph[3].push_back({4, 1});

  dijkstra(graph, 0);

  return 0;
}`,
  });

  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');

  const handleCodeChange = e => {
    setCode({...code, [selectedLanguage]: e.target.value});
  };

  const runCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/${selectedLanguage}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({code: code[selectedLanguage]}),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);

      if (result.status === 'success') {
        setOutput(result.stdout);
      } else {
        setOutput(result.stderr || result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setOutput('Error executing code. Please check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <section className="intro">
        <h2>What is Dijkstra's Algorithm?</h2>
        <p>
          Dijkstra's algorithm is a famous algorithm used for finding the
          shortest paths between nodes in a graph. It was conceived by computer
          scientist Edsger W. Dijkstra in 1956 and is widely used in various
          applications, including GPS navigation systems and network routing
          protocols.
        </p>
        <p>
          The algorithm works by iteratively selecting the vertex with the
          smallest known distance from the source vertex and updating the
          distances to its neighboring vertices. This process continues until
          the shortest path to all vertices is determined.
        </p>
      </section>
      <section className="code-editor">
        <h2>Code Editor</h2>
        <textarea
          className="code-input"
          value={code[selectedLanguage]}
          onChange={handleCodeChange}
          placeholder="Enter your code here..."
        />
        <div className="language-select">
          <label htmlFor="language">Select Language:</label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={e => setSelectedLanguage(e.target.value)}>
            <option value="cpp">C++</option>
          </select>
        </div>
        <button onClick={runCode} disabled={loading}>
          {loading ? 'Running...' : 'Run Code'}
        </button>
      </section>
      <section className="output">
        <h2>Output</h2>
        <pre>{output}</pre>
      </section>
      <section className="applications">
        <h2>Applications</h2>
        <p>
          Dijkstra's algorithm is used in various fields such as transportation
          networks, computer networks, and even in biology for analyzing
          metabolic pathways. Its efficiency and simplicity make it a
          fundamental algorithm in graph theory and computer science.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
