"use client";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  
  const [taskTitle, setTaskTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [myTasks, setMyTasks] = useState([]);

  // Tasks fetch karne ka function
  const fetchTasks = async () => {
    if (session?.user?.email) {
      try {
        const res = await fetch(`/api/tasks?email=${session.user.email}`);
        const data = await res.json();
        setMyTasks(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  
  useEffect(() => {
    if (session?.user) {
      fetchTasks();
    }
  }, [session]);

  
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        title: taskTitle, 
        assignedTo: assignee,
        status: "PENDING" 
      }),
    });

    if (res.ok) {
      alert("Task assigned successfully! ✅");
      setTaskTitle("");
      setAssignee("");
      fetchTasks(); 
    }
  };

  
  const updateTaskStatus = async (taskId: string) => {
    const res = await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId, status: "COMPLETED" }),
    });

    if (res.ok) {
      await fetchTasks();
    }
  };

  if (!session) return <div className="p-10 text-center font-bold">Loading secure session...</div>;

  
  const completedCount = myTasks.filter((t: any) => t.status?.toUpperCase() === "COMPLETED").length;
  const pendingCount = myTasks.length - completedCount;

  return (
    <div className="p-10 max-w-5xl mx-auto font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {session.user?.email}</h1>
          <p className="text-gray-600">
            Role: <span className="bg-yellow-100 px-2 font-mono text-sm rounded border border-yellow-200">{session.user?.role}</span>
          </p>
        </div>
        <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition-all active:scale-95">
          Logout
        </button>
      </div>

     
      {session.user?.role === "ADMIN" && (
        <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-blue-800">Assign New Project Task</h2>
          <form onSubmit={handleCreateTask} className="flex flex-wrap gap-3">
            <input 
              type="text" placeholder="Task description..." className="border p-3 rounded-lg flex-1 min-w-[250px] outline-none focus:ring-2 focus:ring-blue-400"
              value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required 
            />
            <input 
              type="email" placeholder="Assignee's email" className="border p-3 rounded-lg flex-1 min-w-[250px] outline-none focus:ring-2 focus:ring-blue-400"
              value={assignee} onChange={(e) => setAssignee(e.target.value)} required 
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg">Assign</button>
          </form>
        </div>
      )}

   
      {session.user?.role === "MEMBER" && (
        <div className="mt-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-center">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <p className="text-gray-400 text-xs font-bold uppercase">Total Tasks</p>
              <p className="text-3xl font-black text-gray-800">{myTasks.length}</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm">
              <p className="text-orange-500 text-xs font-bold uppercase">Pending</p>
              <p className="text-3xl font-black text-orange-700">{pendingCount}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm">
              <p className="text-green-500 text-xs font-bold uppercase">Completed</p>
              <p className="text-3xl font-black text-green-700">{completedCount}</p>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            My Task Pipeline <span className="text-sm bg-gray-200 px-2 py-0.5 rounded-full">{myTasks.length}</span>
          </h2>

          {myTasks.length === 0 ? (
            <div className="p-16 border-2 border-dashed border-gray-200 rounded-3xl text-center text-gray-400">
              <p className="text-4xl mb-2">☕</p>
              <p className="font-medium">No tasks assigned to you yet.</p>
            </div>
          ) : (
            <div className="grid gap-5">
              {myTasks.map((task: any) => {
                const isDone = task.status?.toUpperCase() === "COMPLETED";
                return (
                  <div 
                    key={task.id} 
                    className={`p-6 border rounded-2xl shadow-sm bg-white border-l-[10px] transition-all duration-300 ${
                      isDone ? "border-l-gray-300 bg-gray-50/50" : "border-l-orange-500"
                    } flex justify-between items-center`}
                  >
                    <div>
                      <h3 className={`font-bold text-lg ${isDone ? "line-through text-gray-400" : "text-gray-800"}`}>
                        {task.title}
                      </h3>
                      <p className={`text-xs font-black uppercase tracking-widest mt-1 ${isDone ? "text-green-600" : "text-orange-500"}`}>
                        {task.status || "PENDING"}
                      </p>
                    </div>
                    
                    {!isDone ? (
                      <button 
                        onClick={() => updateTaskStatus(task.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl text-sm font-black transition-all shadow-md hover:shadow-green-200 active:scale-95"
                      >
                        DONE ✅
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-green-700 bg-green-100 px-4 py-2 rounded-full border border-green-200">
                        <span className="text-xs font-black italic">FINISHED</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}