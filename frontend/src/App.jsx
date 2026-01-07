import { useEffect, useState } from "react"
import { api } from "./api"
import GraphCanvas from "./GraphCanvas"

const COLORS = {
  pending: "text-gray-400",
  in_progress: "text-blue-400",
  completed: "text-green-400",
  blocked: "text-red-400",
}

export default function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")

  const load = async () => {
    const res = await api.get("tasks/")
    setTasks(res.data)
  }

  useEffect(() => { load() }, [])

  const addTask = async () => {
    if (!title) return
    await api.post("tasks/", { title })
    setTitle("")
    load()
  }

  const updateStatus = async (id, status) => {
    await api.patch(`tasks/${id}/`, { status })
    load()
  }

  const addDependency = async (taskId, dependsOnId) => {
    if (!dependsOnId) return
    try {
      setError("")
      await api.post(`tasks/${taskId}/dependencies/`, {
        depends_on_id: dependsOnId
      })
      load()
    } catch (e) {
      setError(
        e.response.data.error +
        " → " +
        e.response.data.path.join(" → ")
      )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl mb-4">Task Dependency Tracker</h1>

      {error && <div className="bg-red-800 p-2 mb-4">{error}</div>}

      <input
        className="text-black p-2 mr-2"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={addTask} className="bg-purple-600 px-3 py-2">
        Add Task
      </button>

      <ul className="mt-6 space-y-3">
        {tasks.map(t => (
          <li key={t.id} className="border p-3">
            <div className="flex justify-between items-center">
              <span className={COLORS[t.status]}>
                #{t.id} {t.title}
              </span>

              <select
                value={t.status}
                onChange={e => updateStatus(t.id, e.target.value)}
                className="text-black"
              >
                <option value="pending">pending</option>
                <option value="in_progress">in_progress</option>
                <option value="completed">completed</option>
                <option value="blocked">blocked</option>
              </select>
            </div>

            <select
              className="text-black mt-2"
              defaultValue=""
              onChange={e => addDependency(t.id, e.target.value)}
            >
              <option value="">Add dependency</option>
              {tasks.filter(x => x.id !== t.id).map(x => (
                <option key={x.id} value={x.id}>
                  #{x.id} {x.title}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>

      <GraphCanvas tasks={tasks} />
    </div>
  )
}
